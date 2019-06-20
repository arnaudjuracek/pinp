import Box from './Box'
import autobind from '../utils/class-autobind'

export default class Cluster {
  constructor ({
    container = document.documentElement,
    boundaries = {
      top: 'none', // 'none', 'soft', 'hard'
      left: 'none',
      right: 'none',
      bottom: 'none'
    },
    debug = false,
    maxSolverIterations = 999,
    pushDirection = 'both' // 'horizontal', 'vertical' or 'both'
  } = {}) {
    this.boxes = []

    this.debug = debug
    this.container = container
    this.maxSolverIterations = maxSolverIterations
    this.pushDirection = pushDirection

    this.boundaries = Object.assign({
      top: 'none',
      left: 'none',
      right: 'none',
      bottom: 'none'
    }, boundaries)

    if (Object.values(this.boundaries).filter(b => b === 'hard').length > 2) {
      console.warn([
        `A pinp.Cluster has been initialized with more than two 'hard' boundaries`,
        `As this may cause some packing issues when running out of space, we recommand setting at least two boundaries as either 'soft' or 'none'.`
      ].join('\n'))
    }

    autobind(this)
  }

  add (box) {
    if (!Box.isBox(box)) throw Box.TypeError(box)
    this.boxes.push(box)
  }

  remove (box) {
    if (!Box.isBox(box)) throw Box.TypeError(box)

    const index = this.boxes.indexOf(box)
    if (index > -1) {
      box.destroy()
      this.boxes.splice(index, 1)
    }
  }

  freeze () {
    if (this.frozen) return
    this.frozen = true
    this.boxes.forEach(box => box.freeze())
  }

  unfreeze () {
    if (!this.frozen) return
    this.frozen = false
    this.boxes.forEach(box => box.unfreeze())
  }

  static computeBoundingBox (boxes) {
    let x = Number.POSITIVE_INFINITY
    let y = Number.POSITIVE_INFINITY
    let width = Number.NEGATIVE_INFINITY
    let height = Number.NEGATIVE_INFINITY

    boxes.forEach(box => {
      if (!box.boundingBox) box.update()

      x = Math.min(x, box.xmin)
      y = Math.min(y, box.ymin)
      width = Math.max(width, box.xmax)
      height = Math.max(height, box.ymax)
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

  // NOTE: Cluster.pack can punctually take options different than thoses passed at Cluster instanciation
  pack ({
    maxSolverIterations = this.maxSolverIterations,
    debug = this.debug,
    pushDirection = this.pushDirection
  } = {}) {
    this._prepareBoxes({ debug })
    this._getContainerSize()

    let _itercount = 0
    let woke = this.boxes.filter(box => this.boxes.some(box.collide))
    while (woke.length && ++_itercount < maxSolverIterations) {
      const current = woke.shift()

      const movedBoxes = this._solveFor(current, { debug, pushDirection })
      if (!movedBoxes || !movedBoxes.length) continue
      woke = woke.concat(movedBoxes)
    }

    if (this.frozen) return

    this._updateBoundingBox()
  }

  _prepareBoxes ({ debug = this.direction } = {}) {
    if (!this.boxes.length) return

    // Sort all boxes from most recent moved to oldest move
    this.boxes = this.boxes.sort((a, b) => b.lastMove - a.lastMove)

    // As we want to preserve the frozen state upon packing,
    // we ensure that the box will stay where it has been frozen
    this.boxes.forEach((box, index) => {
      if (box.frozen) box.move(box.frozenBoundingBox.x, box.frozenBoundingBox.y)
      else box.update()

      box.packingOrder = index
      if (debug) box.element.setAttribute('data-packing-order', index)
    })
  }

  _getContainerSize () {
    const { width, height } = this.container.getBoundingClientRect()
    this.containerWidth = width
    this.containerHeight = height
  }

  _solveFor (current, {
    debug = this.debug,
    pushDirection = this.pushDirection
  } = {}) {
    const movedBoxes = []
    const colliding = this.boxes.filter(current.collide)

    colliding.forEach(box => {
      const delta = current.delta(box)
      const collideFrom = {
        LEFT: delta[0] <= 0,
        RIGHT: delta[0] > 0,
        TOP: delta[1] <= 0,
        BOTTOM: delta[1] > 0
      }

      const preferedDirection = (pushDirection === 'both')
        ? Math.abs(delta[0]) >= Math.abs(delta[1]) ? 'horizontal' : 'vertical'
        : pushDirection

      let x = box.x
      let y = box.y

      const move = {
        LEFT: () => { x = current.xmin - box.width; y = box.y },
        RIGHT: () => { x = current.xmax; y = box.y },
        UP: () => { x = box.x; y = current.ymin - box.height },
        DOWN: () => { x = box.x; y = current.ymax },
        HORIZONTAL: () => collideFrom.LEFT ? move.RIGHT() : move.LEFT(),
        VERTICAL: () => collideFrom.TOP ? move.DOWN() : move.UP()
      }

      if (debug) console.log({ current: current.packingOrder, collide: box.packingOrder, delta, preferedDirection })

      // Push box to one direction, based on its collider relative position
      if (preferedDirection === 'horizontal') move.HORIZONTAL()
      if (preferedDirection === 'vertical') move.VERTICAL()

      // Correct box position before moving it if colliding with a hard boundary
      // TODO: handle cornered box
      if (this.boundaries['top'] === 'hard' && y < 0) move.HORIZONTAL()
      if (this.boundaries['left'] === 'hard' && x < 0) move.VERTICAL()
      if (this.boundaries['bottom'] === 'hard' && y + box.height > this.containerHeight) move.HORIZONTAL()
      if (this.boundaries['right'] === 'hard' && x + box.width > this.containerWidth) move.VERTICAL()

      // The box stays where it is
      if (x === box.x && y === box.y) return

      box.move(x, y)
      movedBoxes.push(box)
    })

    return movedBoxes
  }

  _updateBoundingBox () {
    const bb = Cluster.computeBoundingBox(this.boxes)
    Object.entries(bb).forEach(([key, value]) => {
      this[key] = value
    })
  }

  move (x, y) {
    if (!x && !y) return

    this.boxes.forEach(box => box.move(box.x + x, box.y + y))
    this._updateBoundingBox()
  }
}
