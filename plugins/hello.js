exports.Plugin = Hello;

function Hello(client, from, to, message) {
	if(/!songtipp/i.test(message)) {
		client.say(to, 'Empfehlung des Tages: spotify:track:2SlYagOVtuA9oedhKMq6lI');
		return;
	}

	if(!/hallo alfred/i.test(message)) {
		return;
	}

	client.say(to, 'Oh, hallo, ' + from + ' :)');
}
