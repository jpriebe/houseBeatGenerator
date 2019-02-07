var HBG = require('../hbgDefs.js')

module.exports = [
  {
    name: 'clap-1',
    length: HBG.M4,
    weight: 2,
    notes: [
      { drum: 'clap', velocity: 90, start: HBG.B242, duration: HBG.D16 },
      { drum: 'clap', velocity: 90, start: HBG.B442, duration: HBG.D16 }
    ]
  },
  {
    name: 'clap-2',
    length: HBG.M4,
    weight: 2,
    notes: [
      { drum: 'clap', velocity: 90, start: HBG.B244, duration: HBG.D16 },
      { drum: 'clap', velocity: 90, start: HBG.B444, duration: HBG.D16 }
    ]
  }
]
