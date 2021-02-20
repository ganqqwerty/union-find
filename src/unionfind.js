/**
 * @typedef {id: number, payload: any} UFId
 */
export class UnionFind {
  
  constructor() {
    /**
     * @var UFId[]
     */
    this.ids = []
  }
  
  /**
   *
   * @param {any[]} points
   * @return {void}
   */
  addPoints(points) {
    const firstId = this.ids.length
    this.ids.push(...points.map((point, index) => {
      return {
        id: firstId + index,
        payload: point
      }
    }))
  }
  isSelfRef(id){
    return this.ids[id].id === id
  }

  getRoot(id) {
    console.log(id, this.ids[id].id)
    debugger
    while (!this.isSelfRef(id)) {
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
    const [min, max] = [Math.min(left, right), Math.max(left, right)]
    this.ids[this.getRoot(min)].id = this.ids[this.getRoot(max)].id
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
