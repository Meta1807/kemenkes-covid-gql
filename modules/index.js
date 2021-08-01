const { createApplication } = require('graphql-modules');

const statisticsModule = require('./Statistics');

module.exports = createApplication({
  modules: [
    statisticsModule
  ],
})
