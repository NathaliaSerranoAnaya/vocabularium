const selectedWord = document.getElementById("word");
const meaning = document.getElementById("meaning");

const getRandomWord = async () => {
    const url = 'https://api.api-ninjas.com/v1/randomword';

    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': 'sM4fq9JmfPOzM33o0f53cw==Jw1cnHcu0PK1zIiR',
        }
    };

    try {
        let validWordFound = false; // Flag to track if a valid word is found
        let randomWord;

        while (!validWordFound) { // Loop until a valid word is found
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            // Assuming the response contains the random word
            randomWord = result.word;

            // Check if the word is valid by calling getWordMeaning function
            const wordValidity = await getWordMeaning(randomWord);

            if (wordValidity) {
                validWordFound = true;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

const getWordMeaning = async (word) => {
    const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e0423a74f0msh4031942f3352525p13811cjsn2cf151afb886',
            'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        // Check if the word is valid
        if (result.valid) {
            // Update the word and meaning spans
            const word = result.word;
            const wordMeaning = result.definition; // Changed variable name to avoid conflict
            selectedWord.innerText = word;
            meaning.innerText = wordMeaning; // Corrected to update the meaning span
            return true; // Return true if word is valid
        } else {
            return false; // Return false if word is not valid
        }
    } catch (error) {
        console.error(error);
        return false; // Return false if there's an error
    }
}

function fetchRandomWordAndUpdate() {
    getRandomWord();
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
