var irc = require('irc');

var config = require('./config');

var plugins = new (require('./PluginManager').PluginManager)();
plugins.scan(config.plugins);

var client = new irc.Client(config.host, config.nick, {
	debug : config.debug,
	password: config.password,
	channels : config.channels,
});

client.addListener('message', function(from, to, message) {
	console.log('<' + from +  ':' + to + '> ' + message);

	plugins.iterate(client, from, to, message);	
});

