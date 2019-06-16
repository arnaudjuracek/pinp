import Cluster from './abstractions/Cluster'
import isDomElement from './utils/object-is-dom-element'
import Box from './abstractions/Box'

export default ({
  boxSelector = '.pinp-box',
  container = '.pinp-container',
  grid = [50, 50],
  updateContainerWidth = true
} = {}) => {
  container = isDomElement(container)
    ? container
    : document.querySelector(container)

  const boxes = []
  const boxElements = container.querySelectorAll(boxSelector)
  for (let i = 0; i < boxElements.length; i++) add(boxElements[i])

  const api = {
    add,
    update
  }

  return api

  function add (el) {
    const box = new Box(el, {
      container,
      onMove: update,
      grid
    })
    boxes.push(box)
  }

  function update () {
    window.requestAnimationFrame(() => {
      boxes.forEach(box => box.update())

      const cluster = new Cluster(boxes)
      cluster.pack()

      if (updateContainerWidth) {
        container.style.width = cluster.width + 'px'
      }
    })
  }
}
