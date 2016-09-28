import test from 'tape'
import Recommender from '../src'

test('review bot', (assert) => {
  assert.plan(3)
  const recommender = new Recommender();
  const dataset = [
    {good: 0, bad: 0, common: 0, value: 'bad'},
    {good: 0, bad: 0, common: 1, value: 'good'},
    {good: 0, bad: 1, common: 1, value: 'bad'},
    {good: 1, bad: 0, common: 0, value: 'good'},
    {good: 1, bad: 0, common: 1, value: 'good'},
    {good: 1, bad: 1, common: 1, value: 'good'},
  ]

  assert.equal(recommender.learn(dataset), 6, 'should return count of data which is loaded successfully')

  assert.equal(recommender.review({good:0, bad: 1, common: 0}), 'bad', 'should be bad item')
  assert.equal(recommender.review({good:1, bad: 1, common: 0}), 'good', 'should be good item')
})
