import test from 'tape'
import ReviewBot from '../src'

test('review bot', (assert) => {
  assert.plan(3)
  const reviewbot = new ReviewBot();
  const dataset = [
    {good: 0, bad: 0, common: 0, value: 'bad'},
    {good: 0, bad: 0, common: 1, value: 'good'},
    {good: 0, bad: 1, common: 1, value: 'bad'},
    {good: 1, bad: 0, common: 0, value: 'good'},
    {good: 1, bad: 0, common: 1, value: 'good'},
    {good: 1, bad: 1, common: 1, value: 'good'},
  ]

  assert.equal(reviewbot.learn(dataset), 6, 'should return count of data which is loaded successfully')

  assert.equal(reviewbot.review({good:0, bad: 1, common: 0}), 'bad', 'should be bad item')
  assert.equal(reviewbot.review({good:1, bad: 1, common: 0}), 'good', 'should be good item')
})
