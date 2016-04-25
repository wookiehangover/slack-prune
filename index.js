'use strict'

const _ = require('lodash')
const slack = require('slack')
const inquirer = require('inquirer')

exports.list = (options, done) => {
  slack.channels.list({ token: options.token }, (err, data) => {
    if (err) {
      return done(err)
    }

    const channels = _.filter(data.channels, (channel) =>
      channel.is_archived === false && channel.num_members < options.limit)
    done(null, channels)
  })
}

exports.archive = (options, channel, done) => {
    slack.channels.archive({ token: options.token, channel: channel.id }, done)
}
