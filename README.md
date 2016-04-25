# 💁🗑 slack-prune

A command line tool for archiving your empty and unused Slack channels.

## 🚀Usage

Install with npm:

```
npm install slack-prune
```

Provide a valid API token and the tool with guide you through the rest.

```
slack-prune --token [slack_api_token] [options]

Options:
  --token, -t    a valid slack oauth token                            [required]
  --limit, -l    member threshold to remove channels       [number] [default: 1]
  --dry          dry run without archiving rooms                       [boolean]
  --force, -f    Do not prompt before archiving       [boolean] [default: false]
  --help         Show help                                             [boolean]
  --verbose, -v                                       [boolean] [default: false]

```

For more information about how to obtain a Slack API token, visit
https://api.slack.com/docs/oauth-test-tokens
