const selectedWord = document.getElementById("word");
const meaning = document.getElementById("meaning");

async function getRandomWord() {
    const url = 'https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword?type=verb';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e0423a74f0msh4031942f3352525p13811cjsn2cf151afb886',
            'X-RapidAPI-Host': 'random-word-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.word;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Re-throw the error to handle it further in the calling function
    }
}

async function getWordMeaning(word) {
    const url = `https://urban-dictionary7.p.rapidapi.com/v0/define?term=${word}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e0423a74f0msh4031942f3352525p13811cjsn2cf151afb886',
            'x-rapidapi-host': 'urban-dictionary7.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Re-throw the error to handle it further in the calling function
    }
}

async function fetchRandomWordAndUpdate() {
    try {
        const word = await getRandomWord();
        selectedWord.innerText = word;
        const data = await getWordMeaning(word);
        const meanings = data.list.map(item => item.definition); // Extract meanings
        meaning.innerText = meanings.join('\n'); // Display meanings separated by line breaks
    } catch (error) {
        console.error('Error fetching and displaying random word:', error);
    }
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

