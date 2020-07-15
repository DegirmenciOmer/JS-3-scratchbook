/**
 * Create a promise from setTimeout function.
 */

const randomUserAPIURL = 'https://www.randomuser.me/api';


wait(1000).then(() => {
    console.log('One second has passed...')
})

/**
 * Call randomuser api 
 * Wait for two seconds
 * cal  random user api again
 */

 fetchJSONPromise(randomUserAPIURL).then(response =>{
    console.log("Got the first person")
    console.log("wait for two secs")
    return wait(2000);
 })
 .then(() => {
    console.log("Finished waiting for two secs")
     return fetchJSONPromise(randomUserAPIURL)
 })
 .then(()=>{
     console.log('Got the second person')
 });


 