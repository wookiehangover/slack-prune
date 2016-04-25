module.exports = require('yargs')
  .usage('slack-prune --token [slack_api_token] [options]')
  .env('SLACK_PRUNE')
  .option('token', {
    alias: 't',
    describe: 'a valid slack oauth token',
    demand: true
  })
  .option('limit', {
    alias: 'l',
    describe: 'member threshold to remove channels',
    default: 1,
    type: 'number'
  })
  .option('force', {
    alias: 'f',
    describe: 'Do not prompt before archiving',
    default: false,
    boolean: true
  })
  .option('verbose', {
    alias: 'v',
    default: false,
    boolean: true
  })
  .help()
  .strict()
  .epilogue('For more information about how to obtain a Slack API token, visit https://api.slack.com/docs/oauth-test-tokens')
  .argv
