/** Textual markov chain generator */
class MarkovMachine {
	// make array of individual words from text
	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter(c => c !== "");
		this.chains = this.makeChains(this.words);
	}

	// set markov chains:
	// loop through array. for each word as key, set add next word to value array 
	makeChains(wordsArr) {
		const chains = {};
		wordsArr.forEach((word, idx, arr) => {
			if (chains[word]) chains[word].push(arr[idx + 1]);
			else chains[word] = [arr[idx + 1]];
		});
		return chains;
	}

	getRandomKey() {
		return this.words[Math.floor(Math.random() * this.words.length)];
	}

	getRandomWord(key) {
		const words = this.chains[key];
		const randomIdx = Math.floor(Math.random() * (words.length));
		return this.chains[key][randomIdx];
	}

	/** return random text from chains */
	makeText(numWords = 100) {
		let currentKey = this.getRandomKey();
		let sentence = currentKey;
		for (let i = 0; i < numWords; i++) {
			const currentWord = this.getRandomWord(currentKey);
			if (!currentWord) break;
			sentence += (' ' + currentWord);
			currentKey = currentWord;
		}
		return sentence;
	}
}