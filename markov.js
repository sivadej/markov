/** Textual markov chain generator */


class MarkovMachine {

	/** build markov machine; read in text.*/
  
	// instantiate array of individual words from string arg
	constructor(text) {
	  let words = text.split(/[ \r\n]+/);
	  this.words = words.filter(c => c !== "");
	  this.makeChains();
	}
  
  
	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
	// loop through array. for each word as key, set add next word to value array 
	makeChains() {
	  const chains = {};
	  this.words.forEach((word,idx,arr)=>{
      //console.log(`${idx}: ${word} ${arr[idx+1]}`);
      //if key exists, add word to array. 
      //else assign a new word array to key
      if (chains[word]) {
        chains[word].push(arr[idx+1]);
      }
      else {
        chains[word] = [arr[idx+1]];
      }
      
    })
    console.log(chains);
    return chains;
	}
  
  
	/** return random text from chains */
  
	makeText(numWords = 100) {
	  // TODO
	}
  }
  