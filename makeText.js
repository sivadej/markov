/** Command-line tool to generate Markov text. */
const argv = process.argv;
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

// iterate over args array, ignore index 0 and 1
// when keyphrase '-file' is found, set next index value to argvFile var
for (let i=2; i<argv.length; i++) {
	if (argv[i] === '-file') {
		getTextFromFile(argv[i+1]);
	}
	else if (argv[i] === '-url') {
		getTextFromUrl(argv[i+1]);
	}
}

function getTextFromFile(file) {
	fs.readFile(file, 'utf8', (err,data) => {
		if (err) {
			console.log(`Unable to read the file: ${file}`);
			process.exit(1);
		}
		displayMarkov(data);
	});
}

async function getTextFromUrl(url) {
	try {
		const response = await axios.get(url);
		if (response.status === 200) {
			displayMarkov(response.data);
		}
		else console.log('Invalid url response.', url);
	} catch(e) {
		console.log('An error occurred. Check the URL and try again!', url);
	}
}

function displayMarkov(text) {
	const m = new MarkovMachine(text);
	console.log(m.makeText());
}