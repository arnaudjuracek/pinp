import Item from './abstractions/Item'
import isDomElement from './utils/object-is-dom-element'

export default ({
  grid = [50, 50],
  container = '.pinp-container',
  itemSelector = '.pinp-item'
} = {}) => {
  container = isDomElement(container)
    ? container
    : document.querySelector(container)

  const itemElements = container.querySelectorAll(itemSelector)
  const items = []
  for (let i = 0; i < itemElements.length; i++) add(itemElements[i])

  const api = {
    add,
    update
  }

  return api

  function add (el) {
    const item = new Item(el, {
      container,
      onMove: update,
      grid
    })
    items.push(item)
  }

  function update () {
    window.requestAnimationFrame(() => {
      updatePosition(items)
      updateContainerSize(items)
    })
  }

  function updatePosition (items, forceLeft = false) {
    const itemsSortedLeftToRight = items.sort((a, b) => a.box.xmax - b.box.xmax)
    for (let index = 0; index < itemsSortedLeftToRight.length; index++) {
      const current = itemsSortedLeftToRight[index]
      const leftOfCurrent = itemsSortedLeftToRight.slice(0, index)
      const leftOfCurrentOnSameAxis = leftOfCurrent.filter(current.collideOnXAxis.bind(current))
      const previous = getClusterBox(leftOfCurrentOnSameAxis)

      const noCollide = !itemsSortedLeftToRight.some(current.collide.bind(current))
      if (noCollide) {
        current.index = ''
        continue
      }

      current.index = index

      const x = forceLeft
        ? previous.xmax
        : (previous.xmax || current.box.xmin)
      current.move(x, current.box.ymin)
    }
  }

  function getClusterBox (items) {
    let x = 0
    let y = 0
    let width = 0
    let height = 0

    items.forEach(({ box }) => {
      x = Math.min(x, box.x)
      y = Math.min(y, box.y)
      width = Math.max(width, box.x + box.width)
      height = Math.max(height, box.y + box.height)
    })

    return {
      x,
      y,
      width,
      height,
      xmin: x,
      xmax: x + width,
      ymin: y,
      ymax: y + height
    }
  }

  function updateContainerSize (items) {
    container.style.width = getClusterBox(items).width + 'px'
  }
}
