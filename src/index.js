import Cluster from './abstractions/Cluster'
import isDomElement from './utils/object-is-dom-element'
import Box from './abstractions/Box'
import noop from './utils/noop'

export default ({
  boxSelector = '.pinp-box',
  container = '.pinp-container',
  debug = false,
  grid = [50, 50],
  maxSolverIterations = 999,
  noOOB = true,
  updateContainerWidth = true,
  updateContainerHeight = true,
  willUpdate = noop,
  didUpdate = noop
} = {}) => {
  container = isDomElement(container)
    ? container
    : document.querySelector(container)

  const cluster = new Cluster([], { debug, maxSolverIterations, noOOB })

  const boxElements = container.querySelectorAll(boxSelector)
  for (let i = 0; i < boxElements.length; i++) {
    add(boxElements[i])
  }

  const api = {
    add,
    update,
    get boxes () { return cluster.boxes },
    get width () { return cluster.xmax },
    get height () { return cluster.ymax }
  }

  return api

  function add (el) {
    const box = new Box(el, {
      container,
      onMove: update,
      grid
    })

    box.dragInstance.on('dragStart', () => {
      cluster.freeze()
      window.requestAnimationFrame(cluster.pack)
    })

    box.dragInstance.on('dragMove', () => {
      willUpdate()
      box.unfreeze()
      // NOTE: forcing debug to `false` to avoid flooding the console
      window.requestAnimationFrame(() => cluster.pack({ debug: false }))
      didUpdate()
    })

    box.dragInstance.on('dragEnd', () => {
      cluster.unfreeze()
      update()
    })

    cluster.boxes.push(box)
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
}
