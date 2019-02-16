var HBG = require('../hbgDefs.js')

module.exports = [
  {
    name: 't-pri-1',
    length: HBG.M1,
    notes: [
      { drum: 'closedhat', velocity: 90, start: HBG.B113, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B123, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B133, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B143, duration: HBG.D16 }
    ]
  },
  {
    name: 't-pri-2',
    weight: 4,
    length: HBG.M1,
    notes: [
      { drum: 'closedhat', velocity: 90, start: HBG.B113, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 25, start: HBG.B114, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B123, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 25, start: HBG.B124, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B133, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 25, start: HBG.B134, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B143, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 25, start: HBG.B144, duration: HBG.D16 }
    ]
  },
  {
    name: 't-pri-3',
    length: HBG.M1,
    notes: [
      { drum: 'openhat', velocity: 90, start: HBG.B113, duration: HBG.D16 },
      { drum: 'openhat', velocity: 90, start: HBG.B123, duration: HBG.D16 },
      { drum: 'openhat', velocity: 90, start: HBG.B133, duration: HBG.D16 },
      { drum: 'openhat', velocity: 90, start: HBG.B143, duration: HBG.D16 }
    ]
  }
]
