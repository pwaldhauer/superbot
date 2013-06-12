var fs = require('fs');
var p = require('path');

function PluginManager() {
	this.plugins = {};
}

PluginManager.prototype.scan = function scan(path) {	
	var that = this;

	fs.readdirSync(path).forEach(function(plugin) {
		var fullPath = p.resolve(path, plugin);

		that.loadPlugin(plugin, fullPath);

		fs.watchFile(fullPath, function(cur, prev) {
			that.loadPlugin(plugin, fullPath);
		});
	});
}

PluginManager.prototype.loadPlugin = function loadPlugin(name, path) {
	delete require.cache[path];
	this.plugins[name] = require(path);

	console.log('[Plugin] Loaded ' + name);
}

PluginManager.prototype.iterate = function iterate(client, from, to, message) {
	for(plugin in this.plugins) {
		this.plugins[plugin].Plugin(client, from, to, message);
	}
}

exports.PluginManager = PluginManager;
