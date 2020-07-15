/** 
const randomUserAPIURL = 'https://www.randomuser.me/api';
//axios.get(randomUserAPIURL).then().catch().finally();
const randomUserPromise = axios.get(randomUserAPIURL);

randomUserPromise.then(() =>{
//when the promise is resolved
})

randomUserPromise.catch(() =>{
 //when the promise is rejected

    })
randomUserPromise.finally(() =>{
//runs the function in both cases
})
*/

const randomUserAPIURL = 'https://www.randomuser.me/api';
//axios.get(randomUserAPIURL).then().catch().finally();
let randomUserPromise = axios.get(randomUserAPIURL);

randomUserPromise.then((response) => {
    //get person 1
    console.log(response.data.results[0].email);
    console.log(response.data.results[0].gender)
    if (response.data.results[0].gender === 'male') {
        return axios.get(randomUserAPIURL);
    }
    else { 

        return null }
})
    .then((result) => {
        if (result === null) {
            console.log('You got a female...')
        } else {
            console.log(result.data.results[0].email)

        }
    })

randomUserPromise.catch((error) => {
    console.log("Error: ", error);

})
randomUserPromise.finally(() => {
    //runs the function in both cases
})

