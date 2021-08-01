import { createApplication } from 'graphql-modules';

import statisticsModule from './statistics';

export default createApplication({
  modules: [
    statisticsModule
  ],
})
