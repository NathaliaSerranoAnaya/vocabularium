const selectedWord = document.getElementById("word");
const meaning = document.getElementById("meaning");

function getRandomWord() {
    const url = 'https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword?type=verb';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e0423a74f0msh4031942f3352525p13811cjsn2cf151afb886',
            'X-RapidAPI-Host': 'random-word-by-api-ninjas.p.rapidapi.com'
        }
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Return the random word from the API response
            return data.word;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function getWordMeaning(word) {
    const url = `https://dictionary-data-api.p.rapidapi.com/definition/${word}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e0423a74f0msh4031942f3352525p13811cjsn2cf151afb886',
            'X-RapidAPI-Host': 'dictionary-data-api.p.rapidapi.com'
        }
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function fetchRandomWordAndUpdate() {
    getRandomWord()
        .then(word => {
            selectedWord.innerText = word;
            return getWordMeaning(word);
        })
        .then(data => {
            // Extract the meaning from the API response
            const meanings = data.meaning.map(item => item.values[0]); // Extracting the first meaning
            meaning.innerText = meanings.join('\n'); // Display meanings separated by line breaks
        })
        .catch(error => {
            console.error('Error fetching and displaying random word:', error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display a random word when the page loads
    fetchRandomWordAndUpdate();

    var button = document.getElementById("new-word");
    if (button) {
        button.addEventListener("click", fetchRandomWordAndUpdate);
    } else {
        console.error("No button found with id 'new-word'");
    }
});
