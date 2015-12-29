const heroin = require('heroin-js')

const configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator({ name: 'another-book-inventory-prod',
      region: 'us',
      maintenance: false,
      stack: 'cedar-14',
      collaborators: 
       [ 'plan3-labs@herokumanager.com',
         'michal.kucharzyk@schibsted.pl',
         'wojciech.kabala@schibsted.pl',
         'jakub@plan3.se' ],
      formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
      log_drains: [],
      domains: [ 'another-book-inventory-prod.herokuapp.com' ] })
