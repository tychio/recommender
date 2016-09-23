const _ = require('lodash')

export default function () {
  let experience = {}
  const INVALID = NaN
  const INIT = null
  const _calPercent = function (target, sum) {
    return _.multiply(_.round(_.divide(target, sum) || 0, 2), 100)
  }
  const _calSum = function (data) {
    return _.reduce(data, (result, value) => { 
      if (_.isNumber(value)) {
        return result + value
      } else {
        return result
      }
    }, 0)
  }
  const _nextValue = function (probilities, proportion) {
    let wrappedProbilities = _(_.slice(probilities, proportion))
    let length = 0
    let value = INVALID
    let next = {}
    do {
      length++
      next = wrappedProbilities.next()
      value = next.value
    } while (!(next.done || (value !== INIT))) 
    return {
      length: length,
      value: value
    }
  }
  const _flatten = function (results) {
    return _.reduce(results, function (flatten, proportions) {
      _.forEach(proportions, function (proportion, key) {
        flatten[key] = flatten[key] || 0
        flatten[key] += proportion
      })
      return flatten
    }, {})
  }
  return {
    learn(dataset) {
      let count = 0
      _.forEach(dataset, (data) => {
        const size = _.size(data) - 1
        if (size > 0) {
          count++
        }

        _.forEach(data, (value, key) => {
          if (size > 0 && key != 'value') {
            if (!experience[key]) {
              experience[key] = _.fill(Array(100), INIT)
            }
            let experienceForKey = experience[key]

            const proportion = _calPercent(value, _calSum(data))
            if (experienceForKey[proportion] != INVALID) {
              if (experienceForKey[proportion] == INIT) {
                experienceForKey[proportion] = data['value']
              } else if (experienceForKey[proportion] != data['value']) {
                experienceForKey[proportion] = INVALID
              }
            }
          }
        })
      })
      return count
    },
    review(target) {
      const results = _.map(target, (value, key) => {
        if (experience[key]) {
          const proportion = _calPercent(value, _calSum(target))
          let prognosis = {}
          if (experience[key][proportion] == INIT) {
            const lowProportion = _nextValue(_.reverse(experience[key], experience[key].length - proportion))
            const highProportion = _nextValue(experience[key], proportion)
            const allProportion = lowProportion.length + highProportion.length
            prognosis[lowProportion.value] = _calPercent(lowProportion.length, allProportion)
            prognosis[highProportion.value] = _calPercent(highProportion.length, allProportion)
          } else if (experience[key][proportion] != INVALID) {
            prognosis[experience[key][proportion]] = 100
          }
          return prognosis
        }
      })
      let maxProperty = INIT
      let maxProportion = 0
      _.forEach(_flatten(results), function (proportion, property) {
        if (property != 'undefined' && property != 'NaN'
          && maxProportion < proportion) {
          maxProportion = proportion
          maxProperty = property
        }
      })
      return maxProperty
    }
  }
}
