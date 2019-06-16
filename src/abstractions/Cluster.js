export default class Cluster {
  constructor (boxes, {
    noOOB = true,
    debug = false,
    maxSolverIterations = 999
  } = {}) {
    this.boxes = boxes

    this.noOOB = noOOB
    this.debug = debug
    this.maxSolverIterations = maxSolverIterations

    this.update()
  }

  update () {
    this._updateBoundingBox()
    if (this.noOOB) this.ensureInBounds()
  }

  _updateBoundingBox () {
    const bb = Cluster.computeBoundingBox(this.boxes)
    Object.entries(bb).forEach(([key, value]) => {
      this[key] = value
    })
  }

  static computeBoundingBox (boxes) {
    let x = 0
    let y = 0
    let width = 0
    let height = 0

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

  // TODO: for now, only top and left boundaries are taken in account
  ensureInBounds () {
    const dx = -Math.min(0, this.xmin)
    const dy = -Math.min(0, this.ymin)

    if (!dx && !dy) return
    this.boxes.forEach(box => box.move(box.x + dx, box.y + dy))
    this._updateBoundingBox()
  }

  pack ({
    maxSolverIterations = this.maxSolverIterations,
    debug = this.debug
  } = {}) {
    this.boxes = this.boxes.sort((a, b) => b.lastMove - a.lastMove)
    this.boxes.forEach((box, index) => {
      // Get latest bounding box
      box.update()
      if (debug) {
        box.packingOrder = index
        box.element.setAttribute('data-packing-order', index)
      }
    })

    let woke = this.boxes.filter(box => this.boxes.some(box.collide))

    let _itercount = 0
    while (woke.length && ++_itercount < maxSolverIterations) {
      const current = woke.shift()
      const colliding = this.boxes.filter(current.collide)
      if (!colliding || !colliding.length) continue

      colliding.forEach(box => {
        const delta = current.delta(box)
        const horizontal = Math.abs(delta[0]) >= Math.abs(delta[1])

        if (debug) {
          console.log('pinp.Cluster.pack', {
            current: current.packingOrder,
            collide: box.packingOrder,
            detla: delta,
            direction: horizontal ? 'horizontal' : 'vertical'
          })
        }

        if (horizontal && delta[0] <= 0) box.move(current.xmax, box.y)
        if (horizontal && delta[0] > 0) box.move(current.xmin - box.width, box.y)
        if (!horizontal && delta[1] <= 0) box.move(box.x, current.ymax)
        if (!horizontal && delta[1] > 0) box.move(box.x, current.ymin - box.height)
        woke.push(box)
      })
    }

    this.update()
  }
}
