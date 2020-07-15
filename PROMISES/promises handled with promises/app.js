
const randomUserAPIURL = 'https://www.randomuser.me/api';
/**
fetchJSONPromise(randomUserAPIURL).then((response) => {
    console.log(response)
})
.catch((error) => {
    console.log(error)
})


//How to use Promise.all

const promise1 = axios.get(randomUserAPIURL);
const promise2 = axios.get(randomUserAPIURL);
const promise3 = axios.get(randomUserAPIURL);

const combinedPromises = Promise.all([promise1, promise2, promise3]); 

combinedPromises.then((arrayOfResults) => {
    console.log('All promiss resolved');
    console.log(arrayOfResults);
})
.catch((error) => {
    console.log('Some of the promises rejected')
    console.log(error)
})



/**
 * Call random user API twice in parallel (promise.all).
 * If both users are females, make another two API requests in serial!
 * Otherwise, do nothing
 */

const person1Promise = fetchJSONPromise(randomUserAPIURL);
const person2Promise = fetchJSONPromise(randomUserAPIURL); 

Promise.all([person1Promise, person2Promise]).then((responses) => {
        //the result of the two promises
        console.log(responses[0].results[0].gender, responses[1].results[0].gender );
        const gender1 = responses[0].results[0].gender; 
        const gender2 = responses[1].results[0].gender; 
        console.log(`gender1 is ${gender1}, gender2 is ${gender2}`)
        if(gender1 === 'female' && gender2 === 'female') {
            return fetchJSONPromise(randomUserAPIURL);
        }
})
.then((person3Result) => {
    if (person3Result){
        console.log("3rd person")
        return fetchJSONPromise(randomUserAPIURL);
    }
    else {
        //we didnt get females, so theres is no 3rd responses
        console.log('Done...')
    }
})
.then((person4Result) => {
    if (person4Result){
        console.log("4rd person")
    }


})