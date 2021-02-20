export class UF {
  constructor(ids) {
    this.ids = ids
  }

  find(id) {
    while(id !== this.ids[id]) {
      id = this.ids[id]
    }
    return id
  }

  union(id1, id2) {
    this.ids[this.find(id1)] = this.find(id2)
  }

  isConnected(id1, id2) {
    return this.find(id1) === this.find(id2)
  }
}