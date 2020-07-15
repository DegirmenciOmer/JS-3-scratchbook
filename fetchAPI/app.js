/**
 * create a function called 'serachShow(query)'.
 * The function will use the fetch API to search 'tv maze API' for the query;

function searchShow(query) {
    const tvAPI = `http://api.tvmaze.com/search/shows?q=${query}`;
    fetch(tvAPI).then((response) => {
        console.log('We got a response, but the body is not ready yet.');
        console.log(response);
        //To get the body, we need to get response.json
        //response.json returns a promise
        return response.json();
    }).then((jsonData) => {
        console.log(jsonData);
        console.log(jsonData[0].show.name);
        console.log(jsonData[0].show.rating.average);
    });
}
 */
/**
 * add textinput to your document
 * attach keyup event to the textinput and call searchshow with the input
 * convert the result json to a string array using map
 * display the string results on the page below the text input
 * 
 * BONUS: make the results as clickable linksthat go to the show's page 
 */

function searchShow(query) {
    const tvAPI = `http://api.tvmaze.com/search/shows?q=${query}`;
    fetch(tvAPI)
        .then(response => {
            if (response.status >= 200 && response.status < 400) {
                return response.json()
            }
            else{
               throw "HTTP ERROR"; 
            }
        }).then((jsonData) => {
            const results = jsonData.map(element => element.show.name);
            renderResults(results);
            document.getElementById('errorMessage').textContent = ``;
            //how can we increase or decrease the number of results?
        }).catch((error) => {
            document.getElementById('errorMessage').textContent = `Something went wrong... ${error}`;
            renderResults([]);
        })
}

function renderResults(results) {
    const list = document.getElementById('resultsList');
    list.innerHTML = '';
    if (results.length === 0) {
        list.innerHTML = '<span>There is no result... </span>'
    };
    results.forEach(result => {
        const li = document.createElement('li');
        li.innerText = result;
        list.appendChild(li);
    });
}





window.onload = () => {
    const searchFieldElement = document.getElementById('searchField');
    searchFieldElement.onkeydown = event => {
        if (event.isComposing || event.keyCode === 13) {
            let inputValue = searchFieldElement.value;
            searchShow(inputValue);
        }
    }
}

