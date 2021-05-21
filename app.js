async function getWords(word) {
	let data = await fetch(
	  `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`,
	  {
		method: "GET",
		headers: {
		  "x-rapidapi-key": "72997b89c7msh971f60900745054p1110f0jsna4560cd5945d",
		  "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
		},
	  }
	)
	  .then((response) => response.json())
	  .then((data) => {
		return data.entries;
	  })
	  .catch((err) => {
		console.log(err);
	  });
  
	return data;
  }
  
  const displayWordData = (word, definition, example) => {
	const wordNode = document.querySelector("#word");
	const defNode = document.querySelector("#definition");
	const exampleNode = document.querySelector("#example");
  
	wordNode.innerHTML = word;
	defNode.innerHTML = definition;
	exampleNode.innerHTML = example;
  };
  
  async function renderWords(word) {
	let wordsObj = await getWords(word);
	console.log(wordsObj);
	let searchWord = word;
	let definition = (examples = "");
  
	if (wordsObj !== undefined && wordsObj.length > 0) {
	  wordsObj.forEach((element) => {
		console.log(element.lexemes);
		element.lexemes.forEach((item) => {
		  item.senses.forEach((def) => {
			definition += `<p>* (${item.partOfSpeech}): ${def.definition}</p>`;
			if (def.usageExamples) {
			  examples += `<p>${def.usageExamples}</p>`;
			}
		  });
		});
	  });
	} else {
	  definition = examples = `<p>No Match Found</p>`;
	}
  
	displayWordData(searchWord, definition, examples);
  }
  
  document.getElementById("main-form").addEventListener("submit", (e) => {
	e.preventDefault();
  });
  
  document.getElementById("btn").addEventListener("click", () => {
	let word = document.getElementById("word-input").value;
	renderWords(word);
  });
  
  document
	.getElementById("word-input")
	.addEventListener("keyup", function (event) {
	  if (KeyboardEvent.key === 13) {
		event.preventDefault();
  
		document.getElementById("btn").click();
	  }
	});