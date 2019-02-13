var cursed = require('blessed')

function ui (sections, components, drums, callback) {
  let _screen = null

  let _sections = sections
  let _components = components
  let _drums = drums
  let _callback = callback
  let _buttons = []

  this.create = function () {
    let tabOrder = 0
    // Create a screen object.
    _screen = cursed.screen({
      smartCSR: true
    })

    let form = cursed.form({
      parent: _screen,
      width: '100%',
      left: 'center',
      keys: true,
      vi: true
    })

    let i = 0
    let x = 2
    let y = 3

    let l = cursed.text({
      name: 'text-actions',
      content: 'actions',
      top: y,
      left: x,
      shrink: true,
      bold: true,
      padding: {
        top: 1,
        bottom: 1
      }
    })
    _screen.append(l)

    x = 14
    addButton(form, tabOrder, x, y, 'play', 'play')
    tabOrder++
    x += 20
    addButton(form, tabOrder, x, y, 'stop', 'stop')
    tabOrder++
    x += 20
    addButton(form, tabOrder, x, y, 'save', 'save')
    tabOrder++
    x += 20

    y += 3
    x = 14
    addButton(form, tabOrder, x, y, 'regen-kit', 'regen-kit')
    tabOrder++
    x += 20
    addButton(form, tabOrder, x, y, 'regen-pat', 'regen-pat')
    tabOrder++
    x += 20
    addButton(form, tabOrder, x, y, 'regen-all', 'regen-all')
    tabOrder++
    x += 20

    x = 2
    y += 5

    l = cursed.text({
      name: 'text-sections',
      content: 'sections',
      top: y,
      left: x,
      shrink: true,
      bold: true,
      padding: {
        top: 1,
        bottom: 1
      }
    })
    _screen.append(l)

    i = 0
    x = 14
    for (i = 0; i < _sections.length; i++) {
      let s = _sections[i]

      addButton(form, tabOrder, x, y, s, 'new-section')
      tabOrder++

      if (tabOrder % 3) {
        x += 20
      } else {
        x = 14
        y += 3
      }
    }

    x = 2
    y += 2

    l = cursed.text({
      name: 'text-drums',
      content: 'drums',
      top: y,
      left: x,
      shrink: true,
      bold: true,
      padding: {
        top: 1,
        bottom: 1
      }
    })
    _screen.append(l)

    i = 0
    x = 14
    for (i = 0; i < _drums.length; i++) {
      let d = _drums[i]

      addButton(form, tabOrder, x, y, d, 'new-sound')
      tabOrder++

      if (tabOrder % 3) {
        x += 20
      } else {
        x = 14
        y += 3
      }
    }

    x = 2
    y += 2
    l = cursed.text({
      name: 'text-components',
      content: 'components',
      top: y,
      left: x,
      bold: true,
      shrink: true,
      padding: {
        top: 1,
        bottom: 1
      }
    })
    _screen.append(l)

    x = 14
    for (i = 0; i < _components.length; i++) {
      let c = _components[i]

      addButton(form, tabOrder, x, y, c, 'new-pattern')
      tabOrder++

      if (tabOrder % 3) {
        x += 20
      } else {
        x = 14
        y += 3
      }
    }

    _buttons[0].focus()

    // Quit on Escape, q, or Control-C.
    _screen.key(['escape', 'q', 'C-c'], function (ch, key) {
      return process.exit(0)
    })

    _screen.render()
  }

  let navRight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 0]
  let navLeft = [24, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  let navUp = [24, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  let navDown = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 1, 2, 0]

  function addButton (form, tabOrder, x, y, v, action) {
    let b = cursed.button({
      parent: form,
      name: 'btn-' + v + '-' + action,
      content: v,
      top: y,
      left: x,
      width: 18,
      shrink: true,
      padding: {
        top: 1,
        right: 2,
        bottom: 1,
        left: 2
      },
      style: {
        fg: 'green',
        bg: 'black',
        border: {
          type: 'line',
          fg: 'green'
        },
        focus: {
          fg: 'black',
          bg: 'green'
        }
      }
    })

    b.key('up', function (ch, key) {
      setFocus(navUp)
    })

    b.key('down', function (ch, key) {
      setFocus(navDown)
    })

    b.key(['tab', 'right'], function (ch, key) {
      setFocus(navRight)
    })

    b.key(['S-tab', 'left'], function (ch, key) {
      setFocus(navLeft)
    })

    function setFocus (offsets) {
      let idx = offsets[tabOrder]
      _buttons[idx].focus()
    }

    b.key(['enter', 'space'], function (ch, key) {
      cb()
    })

    b.on('click', function (data) {
      cb()
    })

    function cb () {
      let e = {
        action: action,
        val: v
      }
      _callback(e)
    }

    _screen.append(b)
    _buttons.push(b)
  }
}

module.exports = ui
