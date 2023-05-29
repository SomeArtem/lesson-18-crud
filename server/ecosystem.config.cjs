module.exports = {
  apps : [{
    script: 'app.cjs',
    watch: './**',
    env: {
      NODE_PORT:3001
   },
    type:'commonjs'
  },
  {
    script: 'users-sqlite.cjs',
    max_restarts:3,
    env: {
      NODE_PORT:3002
   },
    type:'commonjs'
  },],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
