const midi = require('midi')
const MidiPlayer = require('midi-player-js')

function midiEngine () {
  let _output = null
  let _player = null

  init()

  function init () {
    _output = new midi.output()

    // Initialize player and register event handler
    _player = new MidiPlayer.Player(function (event) {
      if (event.name === 'Note on') {
        _output.sendMessage([144, event.noteNumber, event.velocity])
      }
      if (event.name === 'Note off') {
        _output.sendMessage([128, event.noteNumber, event.velocity])
      }
    })
  }

  this.listMidiPorts = function () {
    let numPorts = _output.getPortCount()
    if (numPorts === 0) {
      console.log('No available MIDI ports.')
      return
    }

    console.log('Available MIDI ports:')
    for (let i = 0; i < numPorts; i++) {
      console.log('[' + i + '] ' + _output.getPortName(i))
    }
  }

  this.openPort = function (portNum) {
    portNum = parseInt(portNum)
    let numPorts = _output.getPortCount()

    if (portNum > numPorts) {
      console.error('Error: only ' + numPorts + ' ports available.')
      process.exit(1)
    }

    console.log('opening port ' + portNum)
    _output.openPort(portNum)
  }

  this.playFile = function (filename, tempo) {
    _player.loadFile(filename)
    _player.setTempo(tempo)
    _player.play()
  }
}

module.exports = midiEngine
