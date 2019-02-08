var HBG = require('./hbgDefs.js')
var MidiWriter = require('midi-writer-js')

const patterns = {
  'kick': require('./patterns/kick'),
  'mid-primary': require('./patterns/mid-primary'),
  'mid-secondary': require('./patterns/mid-secondary'),
  'tops-primary': require('./patterns/tops-primary'),
  'tops-secondary': require('./patterns/tops-secondary'),
  'tops-power': require('./patterns/tops-power'),
  'perc': require('./patterns/perc')
}

const sections = {
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
//  - add support for bar-4 / bar-8 fills?  or do you just put more patterns in?
//  - support for pattern groups, where they are variants of a single pattern, but some harder than others; you could use
//    the lighter one in hardtrack1, harder one in hardtrack3
//  - more percussion options: perc1, perc2, percsharp, percdeep, percsyn (then perc patterns could call for different ones)
//  - maybe add markers or cue points with these labels?
//  - interactive mode:
//      - keep the same pattern, try new kit
//      - keep the same kit, try new variants
function patternGenerator (kit) {
  let _shiftMsg = ''
  let _drums = {}
  let _track = null

  this.generate = function () {
    _track = new MidiWriter.Track()
    _drums = kit.getDrums()

    let selectedPatterns = []

    console.log('PATTERNS')
    for (var identifier in patterns) {
      if (!patterns.hasOwnProperty(identifier)) {
        continue
      }

      selectedPatterns[identifier] = selectPattern(identifier)
    }

    console.log('SECTIONS')
    let i = 0
    let sectionOffset = 0
    for (var section in sections) {
      console.log(' - ' + section)
      let patterns = sections[section]
      for (i = 0; i < patterns.length; i++) {
        if (typeof selectedPatterns[patterns[i]] === 'undefined') {
          continue
        }
        console.log('    - ' + patterns[i])
        addNotes(selectedPatterns[patterns[i]], sectionOffset)
      }

      sectionOffset += HBG.M8
    }

    return _track
  }

  function selectPattern (identifier) {
    let availPatterns = patterns[identifier]
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

    console.log(' - ' + identifier + ': ' + selPattern.name + _shiftMsg)

    let notes = selPattern.notes

    // some pattern types we can shift by fixed amounts to provide extra variation
    if (identifier.match(/perc|tops-secondary/)) {
      if (typeof selPattern.shiftProbability === 'undefined') {
        selPattern.shiftProbability = 0.2
      }

      notes = shift(notes, selPattern.shiftProbability, selPattern.length)
      selPattern.notes = notes
    }

    return selPattern
  }

  function addNotes (pattern, sectionOffset) {
    let notes = pattern.notes

    let offset = 0
    while (offset < HBG.M8) {
      for (let i = 0; i < notes.length; i++) {
        let note = JSON.parse(JSON.stringify(notes[i]))
        note.start += offset
        if (note.start > HBG.M8) {
          continue
        }

        if (typeof _drums[note.drum] === 'undefined') {
          continue
        }

        note.start += sectionOffset
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
      let note = JSON.parse(JSON.stringify(notes[i]))
      let oldStart = note.start
      note.start = (note.start + shiftOffset) % patternLen
      xary.push(note)
    }

    return xary
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
