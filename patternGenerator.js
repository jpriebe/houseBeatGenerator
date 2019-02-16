var HBG = require('./hbgDefs.js')
var MidiWriter = require('midi-writer-js')
var sprintf = require('sprintf-js').sprintf

const _patterns = {
  'kick': require('./patterns/kick'),
  'mid-primary': require('./patterns/mid-primary'),
  'mid-secondary': require('./patterns/mid-secondary'),
  'tops-primary': require('./patterns/tops-primary'),
  'tops-secondary': require('./patterns/tops-secondary'),
  'tops-power': require('./patterns/tops-power'),
  'perc': require('./patterns/perc')
}

const _sections = {
  'mixin': [
    'kick',
    'tops-primary'
  ],
  'hardtrack1': [
    'kick',
    'mid-primary',
    'tops-primary',
    'tops-secondary',
    'perc'
  ],
  'breakdown': [
    'kick'
  ],
  'hardtrack2': [
    'kick',
    'mid-primary',
    'mid-secondary',
    'tops-primary',
    'tops-secondary',
    'perc'
  ],
  'breakdown2': [
    'mid-primary',
    'tops-primary'
  ],
  'hardtrack3': [
    'kick',
    'mid-primary',
    'mid-secondary',
    'tops-primary',
    'tops-secondary',
    'perc',
    'tops-power'
  ],
  'mixout': [
    'kick',
    'mid-primary',
    'tops-primary'
  ]
}

// TODO:
//  - add support for bar-4 / bar-8 fills?  like you could take a 1-bar fill and replace all the notes in the
//    mid-primary's last bar with the notes from the fill; or do you just put more patterns in, some with
//    fills and some without?
//  - perc pairs -- sometimes it's fun to try random combinations of percussion, but sometimes it would be nice to have
//    two tuned toms or two congas, etc.
//  - more percussion options: perc1, perc2, percsharp, percdeep, percsyn (then perc patterns could call for different ones)
//  - support for pattern groups, where they are variants of a single pattern, but some harder than others; you could use
//    the lighter one in hardtrack1, harder one in hardtrack3
//  - maybe add markers or cue points with these labels?
function patternGenerator (kit) {
  let _shiftMsg = ''
  let _drums = {}
  let _selectedPatterns = []
  let _selectedPatternNames = []
  let _track = null
  let _swingInterval = 32
  let _swingPercentage = 50

  _drums = kit.getDrums()

  this.getSections = function () {
    return JSON.parse(JSON.stringify(_sections))
  }

  this.getPatternIdentifiers = function () {
    let xary = []
    for (var identifier in _patterns) {
      if (!_patterns.hasOwnProperty(identifier)) {
        continue
      }

      xary.push(identifier)
    }

    return xary
  }

  this.getPatternList = function () {
    let xary = []
    for (var p in _selectedPatternNames) {
      xary.push(sprintf('%-14s %-4s', p, _selectedPatternNames[p]))
    }

    return xary.join('\n')
  }

  this.selectPatterns = function () {
    _selectedPatterns = []

    for (var identifier in _patterns) {
      if (!_patterns.hasOwnProperty(identifier)) {
        continue
      }

      this.selectPattern(identifier)
    }
  }

  this.selectPattern = function (identifier) {
    let availPatterns = _patterns[identifier]

    if (!availPatterns) {
      console.error('No available patterns for drum "' + identifier + '"')
      return
    }

    let i = 0
    let xary = []
    for (i = 0; i < availPatterns.length; i++) {
      let p = availPatterns[i]
      if (typeof p.weight === 'undefined') {
        p.weight = 10
      }

      for (let j = 0; j < p.weight; j++) {
        xary.push(p)
      }
    }

    let selPattern = xary[Math.floor(Math.random() * xary.length)]

    let notes = JSON.parse(JSON.stringify(selPattern.notes))

    _selectedPatternNames[identifier] = selPattern.name

    // some pattern types we can shift by fixed amounts to provide extra variation
    if (identifier.match(/perc|tops-secondary/)) {
      if (typeof selPattern.shiftProbability === 'undefined') {
        selPattern.shiftProbability = 0.2
      }

      notes = shift(notes, selPattern.shiftProbability, selPattern.length)
      selPattern.notes = notes
      _selectedPatternNames[identifier] += ' (shifted)'
    }

    _selectedPatterns[identifier] = selPattern
  }

  this.setSwing = function (swingInterval, swingPercentage) {
    _swingInterval = swingInterval
    _swingPercentage = swingPercentage
  }

  this.generate = function (sections, sectionBars) {
    _track = new MidiWriter.Track()
    let section = null

    if (sections === null) {
      sections = []
      for (section in _sections) {
        sections.push(section)
      }
    }

    let i = 0; let j = 0
    let sectionOffset = 0
    for (i = 0; i < sections.length; i++) {
      section = sections[i]
      let patterns = _sections[section]
      for (j = 0; j < patterns.length; j++) {
        if (typeof _selectedPatterns[patterns[j]] === 'undefined') {
          continue
        }
        addNotes(_selectedPatterns[patterns[j]], sectionOffset, sectionBars)
      }

      sectionOffset += sectionBars * HBG.M1
    }

    return _track
  }

  function addNotes (pattern, sectionOffset, sectionBars) {
    let notes = pattern.notes

    let sectionLen = sectionBars * HBG.M1

    let offset = 0
    while (offset < sectionLen) {
      for (let i = 0; i < notes.length; i++) {
        let note = JSON.parse(JSON.stringify(notes[i]))
        note.start += offset
        if (note.start > sectionLen) {
          continue
        }

        if (typeof _drums[note.drum] === 'undefined') {
          continue
        }

        note.start += sectionOffset
        note = addSwing(note)
        let o = convertNoteToMidi(note, _drums[note.drum])
        _track.addEvent(o)
      }
      offset += pattern.length
    }
  }

  function shift (notes, shiftProb, patternLen) {
    let shiftOffsets = []
    if (patternLen === HBG.M1) {
      shiftOffsets = [HBG.B121, HBG.B131, HBG.B141]
    }
    if (patternLen === HBG.M2) {
      shiftOffsets = [HBG.B131, HBG.B211, HBG.B231]
    }
    if (patternLen === HBG.M3) {
      shiftOffsets = [HBG.B211, HBG.B311]
    }
    if (patternLen === HBG.M4) {
      shiftOffsets = [HBG.B211, HBG.B311, HBG.B411]
    }

    _shiftMsg = ''
    if (Math.random() > shiftProb) {
      return notes
    }

    let shiftOffset = shiftOffsets[Math.floor(Math.random() * shiftOffsets.length)]
    _shiftMsg = ' - shifting by ' + shiftOffset + ' ticks (mod ' + patternLen + ')'
    let xary = []
    for (let i = 0; i < notes.length; i++) {
      let note = notes[i]
      note.start = (note.start + shiftOffset) % patternLen
      xary.push(note)
    }

    return xary
  }

  function addSwing (note) {
    if (_swingPercentage === 50) {
      return note
    }

    if (((note.start / _swingInterval) % 2) === 1) {
      let delta = Math.round((_swingPercentage - 50) / 100 * 2 * _swingInterval)
      note.start += delta
      note.duration -= delta
    }

    return note
  }

  function convertNoteToMidi (note, drum) {
    return new MidiWriter.NoteEvent({
      pitch: [drum.pitch],
      startTick: note.start,
      duration: 'T' + note.duration,
      velocity: note.velocity
    })
  }
}

module.exports = patternGenerator
