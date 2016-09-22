import test from "tape"
import ReviewBot from "../src"

test("review bot", (t) => {
  t.plan(1)
  const reviewbot = new ReviewBot();
  const candidates = [
    {a: 1, b: 0, c: 1, value: 1},
    {a: 1, b: 0, c: 1, value: 1},
    {a: 1, b: 0, c: 0, value: 1},
    {a: 0, b: 0, c: 1, value: 0},
    {a: 0, b: 1, c: 1, value: 0},
    {a: 1, b: 0, c: 0, value: 0},
  ]
  t.equal(6, reviewbot.load(candidates), "should return count of data which is loaded successfully")
})
