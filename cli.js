#! /usr/bin/env node

'use strict'

const _ = require('lodash')
const prune = require('./index')
const options = require('./options')
const inquirer = require('inquirer')

function handleErrors(err) {
  if (err) {
    console.error(err.toString())
    process.exit(1)
  }
}

function hr() {
  console.log(`\n---------\n`)
}

function createPrompts(channels) {
  return _.map(channels, (channel, index) => {
    const members = channel.num_members > 0
      ? ` with ${channel.num_members} active members`
      : ''

    return {
      type: 'confirm',
      name: channel.name,
      message: `(${index + 1}/${channels.length}) Would you like to archive #${channel.name}${members} ?`,
      default: options.force,
      when: options.force === false
    }
  })
}

function archive(channel) {
  return new Promise((fulfill, reject) => {
    prune.archive(options, channel, (err, data) => {
      if (err) {
        reject(err)
      } else {
        fulfill(data)
      }
    })
  })
}

function archiveChannels(channels, confirmed) {
    if (options.force && confirmed.length === 0) {
      confirmed = _.map(channels, 'name')
    }

    const confirmedChannels = _.filter(channels,
      (channel) => confirmed.indexOf(channel.name) > -1)

    return Promise.all(_.map(confirmedChannels, archive))
}

const users = `user${options.limit === 1 ? '' : 's'}`
console.log(`\nSearching for Slack Channels with less than ${options.limit} ${users}...`)

prune.list(options, (err, channels) => {
  handleErrors(err)

  console.log(`\n--> Found ${channels.length} channels ready to be pruned!`)
  hr()
  inquirer.prompt(createPrompts(channels))
    .then((data) => {
      const confirmed = _.keys(_.pickBy(data))
      const question = {
        type: 'confirm',
        name: 'ok',
        message: 'Are you sure you want to continue?',
        default: true,
        when: options.force === false
      }

      hr()
      console.log(`Warning: ${confirmed.length} channel(s) will be archived!`)
      return inquirer.prompt(question).then(() => confirmed)
    })
    .then((confirmed) => {
      return archiveChannels(channels, confirmed).then(() => {
        console.log(`Successfully archived ${confirmed.length} channels`)
      })
    })
    .catch((err) => {
      console.error(err)
      exit(1)
    })
})
