var HBG = require('../hbgDefs.js')

module.exports = [
  {
    name: 'perc-0',
    weight: 2,
    length: HBG.M1,
    notes: [
    ]
  },
  {
    name: 'perc-1',
    length: HBG.M1,
    notes: [
      { drum: 'perc1', velocity: 25, start: HBG.B112, duration: HBG.D16 },
      { drum: 'perc1', velocity: 25, start: HBG.B132, duration: HBG.D16 }
    ]
  },
  {
    name: 'perc-2',
    length: HBG.M2,
    notes: [
      { drum: 'perc1', velocity: 25, start: HBG.B112, duration: HBG.D16 },
      { drum: 'perc1', velocity: 25, start: HBG.B124, duration: HBG.D16 },
      { drum: 'perc1', velocity: 25, start: HBG.B212, duration: HBG.D16 },
      { drum: 'perc1', velocity: 25, start: HBG.B224, duration: HBG.D16 },
      { drum: 'perc1', velocity: 25, start: HBG.B232, duration: HBG.D16 }
    ]
  },
  {
    name: 'perc-3',
    length: HBG.M1,
    notes: [
      { drum: 'perc1', velocity: 35, start: HBG.B112, duration: HBG.D16 },
      { drum: 'perc2', velocity: 25, start: HBG.B113, duration: HBG.D16 },
      { drum: 'perc1', velocity: 35, start: HBG.B132, duration: HBG.D16 },
      { drum: 'perc2', velocity: 25, start: HBG.B133, duration: HBG.D16 }
    ]
  },
  {
    name: 'perc-4',
    length: HBG.M2,
    notes: [
      { drum: 'perc1', velocity: 35, start: HBG.B112, duration: HBG.D16 },
      { drum: 'perc2', velocity: 25, start: HBG.B113, duration: HBG.D16 },
      { drum: 'perc2', velocity: 25, start: HBG.B133, duration: HBG.D16 },
      { drum: 'perc1', velocity: 35, start: HBG.B212, duration: HBG.D16 },
      { drum: 'perc2', velocity: 25, start: HBG.B213, duration: HBG.D16 },
      { drum: 'perc2', velocity: 25, start: HBG.B233, duration: HBG.D16 }
    ]
  }
]
