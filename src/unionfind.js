/**
 * @typedef {id: number, payload: any} UFId
 */
export class UnionFind {
  constructor() {
    this.ids = []
  }

  addPoints(points) {
    let lastId = this.ids.length
    for (let point of points) {
      this.ids.push({
        id: lastId++,
        payload: point,
      })
    }
  }
  getRoot(id) {
    while(this.ids[id].id !== id) {
      id = this.ids[id].id
    }
    return id
  }
  /**
   * 0,1,2,3,4,5,6
   * 0,1,2,3,4,5,6
   * @param {number} left id
   * @param {number} right id
   * @returns {void}
   */
  union(left, right) {
    if (left !== right) {
      this.ids[this.getRoot(right)].id = this.getRoot(left)
    }
  }
  /**
   *
   * @param {number} left
   * @param {number} right
   * @returns {boolean}
   */
  isConnected(left, right) {
    return this.getRoot(left) === this.getRoot(right)
  }
}
