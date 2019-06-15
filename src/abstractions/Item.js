import Draggabilly from 'draggabilly'
import noop from '../utils/noop'
import roundTo from '../utils/math-round-to'

export default class Item {
  constructor (element, {
    container = document.documentElement,
    grid = [1, 1],
    onMove = noop
  } = {}) {
    if (!element) {
      throw new TypeError(`Item constructor expects HTMLElement, ${typeof element} given`)
    }

    this.grid = grid
    this.onMove = onMove.bind(this)

    this.element = element
    this.element.style.position = 'absolute'
    this.container = container

    this.dragInstance = new Draggabilly(element, { grid, containment: container })
    this.dragInstance.on('dragEnd', this.onMove)
  }

  destroy () {
    this.dragInstance.destroy()
  }

  collide (item) {
    return this.collideOnXAxis(item) && this.collideOnYAxis(item)
  }

  collideOnYAxis (item) {
    if (!item) return
    if (item === this) return false

    return this.box.xmax > item.box.xmin && this.box.xmin < item.box.xmax
  }

  collideOnXAxis (item) {
    if (!item) return
    if (item === this) return false

    return this.box.ymax > item.box.ymin && this.box.ymin < item.box.ymax
  }

  move (x, y) {
    if (this.isDragged) return
    this.dragInstance.setPosition(x, y)
  }

  get box () {
    const { width, height } = this.element.getBoundingClientRect()
    const x = this.dragInstance.position.x
    const y = this.dragInstance.position.y
    return {
      x,
      y,
      width,
      height,
      xmin: x,
      ymin: y,
      xmax: x + width,
      ymax: y + height,
      center: {
        x: x + width / 2,
        y: y + height / 2
      }
    }
  }

  get index () { return this._index }
  set index (i) { // DEBUG
    this._index = i
    this.element.innerHTML = `#${i}`
  }

  write (text, append = false) {
    this._text = append
      ? this._text + ' ' + text
      : text
    this.element.innerHTML = this._text
  }
}
