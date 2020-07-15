//Creating a promise
function fetchJSONPromise(url) {
    const promise = new Promise((rseolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status <400) {
                rseolve(xhr.response);
            }
            else {
                reject(new Error(`HTTP error status code: ${xhr.status}`));

            }
        };

        xhr.onerror = () => {
            reject(new Error(`Network error`));
        }
        xhr.open('GET', url);
        xhr.send();
    });
    
    return promise;
}

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            //No call to reject since setTimeout() never fails.

        }, ms);
    })
}