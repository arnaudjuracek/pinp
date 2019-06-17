import Cluster from './abstractions/Cluster'
import isDomElement from './utils/object-is-dom-element'
import Box from './abstractions/Box'
import noop from './utils/noop'

export default ({
  container = '.pinp-container',

  debug = false,
  grid = [50, 50],
  maxSolverIterations = 999,
  noOOB = true,
  pushBehavior = 'both', // 'horizontal', 'vertical' or 'both'
  updateContainerHeight = true,
  updateContainerWidth = true,

  lastDraggedClassname = 'last-dragged',

  willUpdate = noop,
  didUpdate = noop
} = {}) => {
  container = isDomElement(container) ? container : document.querySelector(container)
  if (!container) throw new Error('Cannot find container')

  const cluster = new Cluster({
    debug,
    maxSolverIterations,
    noOOB,
    pushBehavior
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

  function add (DomElement) {
    const box = new Box(DomElement, { container, debug, grid })

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

      if (updateContainerWidth) container.style.width = cluster.xmax + 'px'
      if (updateContainerHeight) container.style.height = cluster.ymax + 'px'
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
