export default class Cluster {
  constructor (boxes) {
    this.boxes = boxes
    this.update()
  }

  update () {
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

  pack () {
    const boxesLeftToRight = this.boxes.sort((a, b) => a.xmax - b.xmax)

    boxesLeftToRight.forEach((current, index) => {
      const hasCollisions = this.boxes.some(current.collide)
      if (!hasCollisions) return

      const boxesOnLeft = boxesLeftToRight.slice(0, index)
      const boxesOnLeftOnSameAxis = boxesOnLeft.filter(current.collideOnXAxis.bind(current))
      const leftCluster = new Cluster(boxesOnLeftOnSameAxis)

      const x = (leftCluster.xmax || current.xmin)
      current.move(x, current.y)
    })

    this.update()
  }
}
