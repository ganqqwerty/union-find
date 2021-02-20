import { UF } from "./unionfind"

let testUf;

describe("Union Find", () => {
  beforeEach(() => {
    testUf = new UF([0,1,2])
  })
  it("all points must be self connected", () => {
      testUf.ids.forEach((point) =>
        expect(testUf.isConnected( point, point)).toBeTruthy()
      )
    })

    it("connects two components", () => {
      // expect(testUf.isConnected(0,1)).toBeFalsy()
      testUf.union(0, 1)
      expect(testUf.isConnected( 0, 1)).toBeTruthy()
      expect(testUf.isConnected(1, 0)).toBeTruthy()
      testUf.ids
        .filter((point) => point > 1)
        .forEach((id) => {
          expect(testUf.isConnected( id, 0)).toBeFalsy()
          expect(testUf.isConnected( 0, id)).toBeFalsy()
          expect(testUf.isConnected( id, 1)).toBeFalsy()
          expect(testUf.isConnected( id, 1)).toBeFalsy()
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

  describe("more complex connections",  () => {
  beforeEach( () => {
    testUf = new UF([0,1,2,3,4,5])
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
