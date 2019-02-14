var HBG = require('../hbgDefs.js')

module.exports = [
  {
    name: 'mid-secondary-0',
    length: HBG.M1,
    weight: 2,
    notes: [
    ]
  },
  {
    name: 'clap-1',
    length: HBG.M4,
    weight: 2,
    notes: [
      { drum: 'clap', velocity: 60, start: HBG.B242, duration: HBG.D16 },
      { drum: 'clap', velocity: 60, start: HBG.B442, duration: HBG.D16 }
    ]
  },
  {
    name: 'clap-2',
    length: HBG.M4,
    weight: 2,
    notes: [
      { drum: 'clap', velocity: 60, start: HBG.B244, duration: HBG.D16 },
      { drum: 'clap', velocity: 60, start: HBG.B444, duration: HBG.D16 }
    ]
  },
  {
    name: 'snare-1',
    length: HBG.M4,
    weight: 2,
    notes: [
      { drum: 'snare', velocity: 60, start: HBG.B214, duration: HBG.D16 }
    ]
  },
  {
    name: 'snare-2',
    length: HBG.M4,
    weight: 2,
    notes: [
      { drum: 'snare', velocity: 60, start: HBG.B214, duration: HBG.D16 },
      { drum: 'snare', velocity: 60, start: HBG.B234, duration: HBG.D16 },
      { drum: 'snare', velocity: 60, start: HBG.B242, duration: HBG.D16 }
    ]
  }
]
