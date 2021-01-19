'use strict'

module.exports = {
  info: {
    key: 'python',
    title: 'Python',
    extname: '.py',
    default: 'requests'
  },

  python3: require('./python3'),
  requests: require('./requests')
}
