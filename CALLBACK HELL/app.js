function fetchJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status, 400) {
            callback(null, xhr.response);
        }
        else {
            callback(new Error('Network error'), null);
        }
    };

    xhr.onerror = () => {
        callback(new Error(`HTTP error status code ${xhr.status}`), null)

    }

    xhr.open('GET', url);
    xhr.send();
}

//CALLBACK HELL USAGE
 
fetchJSON('https://www.randomuser.me/api', (error, data) => {
    if (error) {
        console.log("error")
    }
    else {
        console.log(data.results[0].email);
        fetchJSON('https://www.randomuser.me/api', (error2, data2) => {
            if (error2) {
                console.log("error")
            }
            else {
                console.log(data2.results[0].email);
                fetchJSON('https://www.randomuser.me/api', (error3, data3) => {
                    if (error3) {
                        console.log("error")
                    }
                    else {
                        console.log(data3.results[0].email);
                    }
                })
            }
        })
    }
})
