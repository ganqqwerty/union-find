export class UF {
  constructor(ids) {
    this.ids = ids
  }

  find(id) {
    let newId = id
    while(newId !== this.ids[newId]) {
      newId = this.ids[newId]
    }
    this.ids[id] = newId //path compression
    return newId
  }

  union(id1, id2) {
    this.ids[this.find(id1)] = this.find(id2)
  }

  isConnected(id1, id2) {
    return this.find(id1) === this.find(id2)
  }
}