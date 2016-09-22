/**
 * @param {Type}
 * @return {Type}
 */
export default function () {
  let experience = {}
  return {
    load(dataset) {
      let count = 0
      dataset.forEach((data) => {
        count++
      })

      return count
    } 
  }
}
