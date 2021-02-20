import { UnionFind } from "./unionfind"
/**
 * @var {UnionFind}
 */
let testUf

function fill(uf) {
  uf.addPoints(["bla0", "bla1", "bla2"])
}
const fillResult = [
  {
    payload: "bla0",
    id: 0
  },
  {
    id: 1,
    payload: "bla1"
  },
  {
    id: 2,
    payload: "bla2"
  }
]
describe("Union Find", () => {
  beforeEach(() => {
    testUf = new UnionFind()
  })

  it("should create union find", () => {
    console.log("yo")
    expect(testUf.ids).toStrictEqual([])
  })

  it("should fill union find", () => {
    fill(testUf)
    expect(testUf.ids).toStrictEqual(fillResult)
    testUf.addPoints(["bla3"])
    expect(testUf.ids).toStrictEqual(
      fillResult.concat({ id: 3, payload: "bla3" })
    )
  })

  describe("simple connections", () => {
    beforeEach(() => {
      fill(testUf)
    })

    it("all points must be self connected", () => {
      fill(testUf)
      testUf.ids.forEach((point) =>
        expect(testUf.isConnected(point.id, point.id)).toBeTruthy()
      )
    })

    it("connects two components", () => {
      // expect(testUf.isConnected(0,1)).toBeFalsy()
      testUf.union(0, 1)
      expect(testUf.isConnected(0, 1)).toBeTruthy()
      expect(testUf.isConnected(1, 0)).toBeTruthy()
      testUf.ids
        .filter((point) => point.id > 1)
        .map((point) => point.id)
        .forEach((id) => {
          expect(testUf.isConnected(id, 0)).toBeFalsy()
          expect(testUf.isConnected(0, id)).toBeFalsy()
          expect(testUf.isConnected(id, 1)).toBeFalsy()
          expect(testUf.isConnected(id, 1)).toBeFalsy()
        })
    })
    it("connects two components - then self-connect", () => {
      // expect(testUf.isConnected(0,1)).toBeFalsy()
      testUf.union(0, 1)
      testUf.union(0, 0)
      testUf.union(1, 1)
      expect(testUf.isConnected(0, 1)).toBeTruthy()
      expect(testUf.isConnected(1, 0)).toBeTruthy()
      testUf.ids
        .filter((point) => point.id > 1)
        .map((point) => point.id)
        .forEach((id) => {
          expect(testUf.isConnected(id, 0)).toBeFalsy()
          expect(testUf.isConnected(0, id)).toBeFalsy()
          expect(testUf.isConnected(id, 1)).toBeFalsy()
          expect(testUf.isConnected(id, 1)).toBeFalsy()
        })
    })

    it("connects three components - different order", () => {
      expect(testUf.isConnected(2,1)).toBeFalsy()
      testUf.union(0, 1)
      testUf.union(0, 2)
      expect(testUf.isConnected(2, 1)).toBeTruthy()
      expect(testUf.isConnected(1, 2)).toBeTruthy()
    })

    it("connects three components", () => {
      //0 1 2 3
      //1 1 2 3
      expect(testUf.isConnected(2,1)).toBeFalsy()
      testUf.union(1, 0)
      testUf.union(2, 0)
      expect(testUf.isConnected(2, 1)).toBeTruthy()
      expect(testUf.isConnected(1, 2)).toBeTruthy()
    })

  })
  describe("more complex connections",  () => {
  beforeEach( () => {
    testUf.addPoints(["bla0", "bla1", "bla2", "bla3", "bla4", "bla5"])
  }) 
    it("connects two trees", () => {
      testUf.union(0, 1)
      testUf.union(2, 1)

      testUf.union(3, 4)
      
      testUf.union(4, 0)

      for (let i of [0, 1, 2, 3, 4]) {
        for (let j of [0, 1, 2, 3, 4]) {
          expect(testUf.isConnected(i, j)).toBeTruthy()
          expect(testUf.isConnected(j, i)).toBeTruthy()

        }
        expect(testUf.isConnected(i, 5)).toBeFalsy()
      }
    })
    it("connects two trees - different order", () => {
      testUf.union(1, 0)
      testUf.union(1, 2)

      testUf.union(4, 3)
      
      testUf.union(0, 4)

      for (let i of [0, 1, 2, 3, 4]) {
        for (let j of [0, 1, 2, 3, 4]) {
          expect(testUf.isConnected(i, j)).toBeTruthy()
          expect(testUf.isConnected(j, i)).toBeTruthy()

        }
        expect(testUf.isConnected(i, 5)).toBeFalsy()
      }
    })
  
  })
})
