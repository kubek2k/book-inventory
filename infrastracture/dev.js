const heroin = require('heroin-js')

const configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator({ name: 'another-book-inventory-dev',
      region: 'us',
      maintenance: false,
      stack: 'cedar-14',
      config_vars: { MONGOLAB_URI: 'mongodb://heroku_qckxfzx2:d6ghbp1uu43mcpm4kadulvg64g@ds037185.mongolab.com:37185/heroku_qckxfzx2' },
      collaborators: 
       [ 'plan3-labs@herokumanager.com',
         'michal.kucharzyk@schibsted.pl',
         'wojciech.kabala@schibsted.pl',
         'jakub@plan3.se' ],
      formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
      log_drains: [],
      domains: [ 'another-book-inventory-dev.herokuapp.com' ] })
