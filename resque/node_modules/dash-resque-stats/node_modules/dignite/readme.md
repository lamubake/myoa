# dignite

Open a direct socket connection to your [Dash](https://www.thedash.com) custom push widget and sends `stdin` to the widget.

## Installation

Install this module globally, so use the `-g` flag when installing:

```
npm install -g dignite
```

## Usage
This module uses [rc](https://www.npmjs.com/package/rc) for configuration, and requires the widget's url, which is of the form:
https://push.thedash.com/custom/v1/:dashboardId/:widgetUuid

You can pass in the env variable:
```
$ dignite_url=<widget push url> dignite
```

Or a command line arg
```
$ dignite --url <widget push url>
```

Or throw a config file in `$HOME/.digniterc`
```javascript
{
  "url": "<widget push url>"
}
```

You can then pipe stdout into dignite, and watch your widgets update.

$ while true; do echo $RANDOM; sleep 1; done | dignite

## License

ISC
