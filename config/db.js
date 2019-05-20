const fs = require('fs');

module.exports = {

  'development': {
    username: 'hfxtsnyxfoktse',
    password: '2a348570030a038e7b358a49370d1b7718a093bbbb671539959930dd8e2e10e8',
    database: 'd1im5b5t0mehrn',
    host: 'ec2-46-137-188-105.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  },
  test: {
    username: 'hfxtsnyxfoktse',
    password: '2a348570030a038e7b358a49370d1b7718a093bbbb671539959930dd8e2e10e8',
    database: 'd1im5b5t0mehrn',
    host: 'ec2-46-137-188-105.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres'
  },
  production: {
    username: 'hfxtsnyxfoktse',
    password: '2a348570030a038e7b358a49370d1b7718a093bbbb671539959930dd8e2e10e8',
    database: 'd1im5b5t0mehrn',
    host: 'ec2-46-137-188-105.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
};
