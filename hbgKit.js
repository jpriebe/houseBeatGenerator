var hbgKit = function () {
  let _drumMap = null

  // default to general midi; might later add volume to each drum to keep levels balanced
  let _drums = {
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

  this.setDrumMap = function (drumMap) {
    _drumMap = drumMap
  }

  this.selectRandomDrums = function () {
    if (_drumMap === null) {
      return
    }

    for (var identifier in _drums) {
      if (!_drums.hasOwnProperty(identifier)) {
        continue
      }

      this.selectRandomDrum(identifier)
    }
  }

  this.selectRandomDrum = function (identifier) {
    if ((_drumMap === null) || (typeof _drumMap[identifier] === 'undefined')) {
      return
    }

    let pitch = _drumMap[identifier][Math.floor(Math.random() * _drumMap[identifier].length)]
    _drums[identifier].pitch = pitch
  }

  this.getDrums = function () {
    return _drums
  }
}

module.exports = hbgKit
