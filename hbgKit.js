var hbgKit = function () {
  // default to general midi; might later add volume to each drum to keep levels balanced
  let drums = {
    'kick': { pitch: 'C2' },
    'snare': { pitch: 'D2' },
    'openhat': { pitch: 'F#2' },
    'closedhat': { pitch: 'A#2' },
    'clap': { pitch: 'D#2' },
    'shaker': { pitch: 'A4' },
    'ride': { pitch: 'D#3' },
    'perc1': { pitch: 'D#4' },
    'perc2': { pitch: 'E4' }
  }

  this.selectRandomDrums = function (drumMap) {
    console.log('DRUM KIT')

    for (var identifier in drums) {
      if (!drums.hasOwnProperty(identifier)) {
        continue
      }

      selectRandomDrum(identifier, drumMap)
    }
  }

  function selectRandomDrum (identifier, drumMap) {
    if (typeof drumMap[identifier] === 'undefined') {
      return
    }

    let pitch = drumMap[identifier][Math.floor(Math.random() * drumMap[identifier].length)]
    drums[identifier].pitch = pitch
    console.log(' - ' + identifier + ': ' + drums[identifier].pitch)
  }

  this.getDrums = function () {
    return drums
  }
}

module.exports = hbgKit
