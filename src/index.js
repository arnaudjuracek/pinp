import Cluster from './abstractions/Cluster'
import isDomElement from './utils/object-is-dom-element'
import Box from './abstractions/Box'
import noop from './utils/noop'

export default (container, {
  debug = false,
  grid = [0, 0],
  maxSolverIterations = 999,
  boundaries = {
    top: 'none', // 'none', 'soft', 'hard'
    left: 'none',
    right: 'none',
    bottom: 'none'
  },
  pushDirection = 'both', // 'horizontal', 'vertical' or 'both'

  lastDraggedClassname = 'last-dragged',

  willUpdate = noop,
  didUpdate = noop
} = {}) => {
  container = isDomElement(container) ? container : document.querySelector(container)
  if (!container) throw new Error('Cannot find container')

  const cluster = new Cluster({
    container,
    debug,
    maxSolverIterations,
    boundaries,
    pushDirection
  })

  const api = {
    add,
    remove,
    update,
    get boxes () { return cluster.boxes },
    get width () { return cluster.xmax },
    get height () { return cluster.ymax }
  }

  return api

  function add (DomElement, draggabillyAdditionalOptions = {}) {
    const box = new Box(DomElement, { container, debug, grid, draggabillyAdditionalOptions })

    box.dragInstance.on('dragStart', () => {
      setLastDragged(box)
      cluster.freeze()
    })

    box.dragInstance.on('dragMove', () => {
      window.requestAnimationFrame(() => {
        willUpdate()
        // NOTE: forcing debug to `false` to avoid flooding the console
        box.unfreeze()
        cluster.pack({ debug: false })
        didUpdate()
      })
    })

    box.dragInstance.on('dragEnd', () => {
      cluster.unfreeze()
      update()
    })

    cluster.add(box)
    return box
  }

  function remove (box) {
    if (isDomElement(box)) {
      box = cluster.boxes.find(b => b.element === box)
    }
    cluster.remove(box)
  }

  function update () {
    window.requestAnimationFrame(() => {
      willUpdate()
      cluster.pack()

      const dx = boundaries['left'] === 'soft' ? -cluster.x : 0
      const dy = boundaries['top'] === 'soft' ? -cluster.y : 0
      cluster.move(dx, dy)

      if (boundaries['left'] === 'soft' || boundaries['right'] === 'soft') {
        container.style.width = cluster.width + 'px'
      }

      if (boundaries['top'] === 'soft' || boundaries['bottom'] === 'soft') {
        container.style.height = cluster.height + 'px'
      }

      didUpdate()
    })
  }

  function setLastDragged (box) {
    if (!box) return

    const lastDragged = container.querySelectorAll(`.${lastDraggedClassname}`)
    for (let i = 0; i < lastDragged.length; i++) {
      lastDragged[i].classList.remove(lastDraggedClassname)
    }

    box.element.classList.add(lastDraggedClassname)
  }
}
