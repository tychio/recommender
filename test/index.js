import test from "tape"
import reviewbot from "../src"

test("reviewbot", (t) => {
  t.plan(1)
  t.equal(true, reviewbot(), "return true")
})
