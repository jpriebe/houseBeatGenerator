var HBG = require('../hbgDefs.js')

module.exports = [
  {
    name: 'closedhats',
    length: HBG.M1,
    notes: [
      { drum: 'closedhat', velocity: 90, start: HBG.B113, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B123, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B133, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B143, duration: HBG.D16 }
    ]
  },
  {
    name: 'closedhats-2',
    length: HBG.M1,
    notes: [
      { drum: 'closedhat', velocity: 90, start: HBG.B113, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 45, start: HBG.B114, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B123, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 45, start: HBG.B124, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B133, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 45, start: HBG.B134, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 90, start: HBG.B143, duration: HBG.D16 },
      { drum: 'closedhat', velocity: 45, start: HBG.B144, duration: HBG.D16 }
    ]
  },
  {
    name: 'openhats',
    length: HBG.M1,
    notes: [
      { drum: 'openhat', velocity: 90, start: HBG.B113, duration: HBG.D16 },
      { drum: 'openhat', velocity: 90, start: HBG.B123, duration: HBG.D16 },
      { drum: 'openhat', velocity: 90, start: HBG.B133, duration: HBG.D16 },
      { drum: 'openhat', velocity: 90, start: HBG.B143, duration: HBG.D16 }
    ]
  }
]
