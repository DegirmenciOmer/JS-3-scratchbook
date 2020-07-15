'use strict';
//WEEK 1 XHR
{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        cb(null, xhr.response);
        console.log(xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed.'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.innerHTML = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, ul) {
    createAndAppend('li', ul, { 
      text: `
      <div class="repoInfo">
      <p class="repoLine"><span class="bold">Repository: </span> <a href=${repo.html_url}>${repo.name}</a></p>
      <p class="repoLine"><span class="bold">Description: </span>${repo.description}</p>
      <p class="repoLine"><span class="bold">Forks: </span> ${repo.forks}</p>
      <p class="repoLine"><span class="bold">Updated: </span> ${repo.updated_at}</p>
    </div>
    `});
  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, { 
          text: `          
          <h3 class="heading">HYF Repositories</h3>
          <p class="error">${err.message}</p>  `,  
          class: "alert-error"         
      }
        );
        return;
      }
      const h3 = createAndAppend('h3', root, {
        text: 'HYF Repositories',
        class: 'heading'
      });
      const ul = createAndAppend('ul', root);
      repos.slice(0, 10).sort((a, b) =>a.name
      .localeCompare(b.name, 'en', { numeric: true }, { sensitivity: 'base' }))
      .forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}




///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\





/*Wouldn't it cool to make a new friend with just the click of a button?

Write a function that makes an API call to https://www.randomuser.me/api

Inside the same file write two functions: one with XMLHttpRequest, and the other with axios
Each function should make an API call to the given endpoint: https://www.randomuser.me/api
Log the received data to the console
Incorporate error handling */


const url = 'https://www.randomuser.me/api'

function makeFriend() { 
    const xhr = new XMLHttpRequest();
       
    xhr.responseType = 'json';
    
    xhr.onload = function () {
      if(xhr.status < 400){
        const friendData = xhr.response;
        console.log(friendData.results[0].name);

      }else {
        console.log("HTTP Error ", xhr.status);
      }
    }
    xhr.onerror = function() {
      console.log('Something went wrong.');
    }
    xhr.open('GET', url, true);
    xhr.send();
}
window.onload = function() {
  document.getElementById('myButton').onclick = function () {
    makeFriend();
  }
  document.getElementById('myButton2').onclick = function () {
    makeFriend2();
  }
}


// Make a request for a user with a given ID
function makeFriend2() {axios.get(url)
  .then(function (response) {
    // handle success
        console.log(response.data.results[0].name);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log('Alles klaar!');

  });
}

///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\


/* Exercise 2: Programmer humor

Who knew programmers could be funny?

Write an function that makes an API call to https://xkcd.now.sh/?comic=latest

Inside the same file write two programs: one with XMLHttpRequest, and the other with axios
Each function should make an API call to the given endpoint: https://xkcd.now.sh/?comic=latest
Log the received data to the console
Render the img property into an <img> tag in the DOM
Incorporate error handling*/

const url = 'https://xkcd.now.sh/?comic=latest';
const img = document.getElementById("img");

function humor() { 
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function () {
      if(xhr.status < 400){
        const data = xhr.response;
        console.log(data.img);
        const src = document.createAttribute("src"); 
        src.value = data.img;          
        img.setAttributeNode(src);

      }else {
        console.log("HTTP Error ", xhr.status);
      }
    }
    xhr.open('GET', url);
    xhr.send();
} 

// Make a request for a user with a given ID
function humor2() {axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response.data.img);
    const src = document.createAttribute("src"); 
    src.value = response.data.img;          
    img.setAttributeNode(src);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log('Alles klaar!');

  });
}


humor();
humor2();

///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\

/* Dog photo gallery

Let's make a randomized dog photo gallery!
Write a function that makes an API call to https://dog.ceo/api/breeds/image/random. 
It should trigger after clicking a button in your webpage. Every time the button is 
clicked it should append a new dog image to the DOM.
Create an index.html file that will display your random image
Add 2 <button> and 1 <ul> element, either in the HTML or through JavaScript
Write two versions for the button functionality: one with XMLHttpRequest, and the other with axios
When any one of the 2 buttons is clicked it should make an API call to https://dog.ceo/api/breeds/image/random
After receiving the data, append to the <ul> a <li> that contains an <img> element with the dog image
Incorporate error handling */


//console.log("button");
const url = 'https://dog.ceo/api/breeds/image/random';
const body = document.querySelector('body');
const ul = document.createElement('ul');
const click1 = document.querySelector('button');
body.appendChild(ul);

function dogCall() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = () => {
      if(xhr.status < 400){
        const data = xhr.response;
        console.log(data.message);
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        li.innerHTML += `<img src="${data.message}">`;
        ul.appendChild(li);
      } else {
        console.log("Error", xhr.statusText);
      }
    };
    xhr.open('GET', url);
    xhr.send();
}

function dogCallAxios() {axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response.data);
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.innerHTML += `<img src="${response.data.message}">`;
    ul.appendChild(li);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log('Alles klaar!');
  });
}


///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\

'use strict';
//WEEK 2 PROMISES

{
  const selectMenu = document.querySelector('select');
  const contributorsContainer = document.querySelector('.contributors-container');

  function fetchJSON(url, cb) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Error: ${response.status} - ${response.statusText}.`
          );
        }
        return response.json();
      })
      .then((data) => {
        cb(null, data)
      })
      .catch((error) => cb(error, null));
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul);
    repoCreator(repo, li)
  }

   function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      selectMenuCreator(repos);
    });
  }

  //CREATES REPO
  function repoCreator(repo, li) {
    const repoInfos = [repo.name, repo.description, repo.forks, new Date(repo.updated_at).toDateString()];
    const names = ['Repository', 'Description', 'Forks', 'Updated'];

    repoInfos.forEach((repoInfo, index) => {
      const p = createAndAppend('p', li);
      const span1 = createAndAppend('span', p, {
        text: names[index],
        class: 'repo-span bold'
      })
      const span2 = createAndAppend('span', p, {
        text: `: ${repoInfo}`,
        class: 'repo-span'
      });
    })
  }

  //SELECT MENU CREATOR
  function selectMenuCreator(repos) {
    const repoContainer = document.querySelector('.repo-container');
    const repoUl = createAndAppend('ul', repoContainer);
    renderRepoDetails(repos[0], repoUl);
    getContributor(repos[0]);
    repos
      .sort((a, b) => a.name.localeCompare(b.name, 'en', {
        numeric: true,
        ignorePunctuation: true
      }, {
        sensitivity: 'base'
      }))
      .forEach((repo, index) => {
        createAndAppend('option', selectMenu, {
          text: `${repo.name}`,
          value: index
        })
        selectMenu.addEventListener('change', (e) => {
          if (e.target.value == index) {
            repoUl.innerText= '';
            contributorsContainer.innerText= '';
            renderRepoDetails(repo, repoUl);
            getContributor(repo);
          }
        });
      })
  }

  //CONTRIBUTOR SECTION
  function getContributor(repo) {
    const contributorURL = repo.contributors_url;
    fetchJSON(contributorURL, (errorContributor, contributorInfos) => {
      if (errorContributor) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      console.log(contributorInfos)
     
      const contributorUl = createAndAppend('ul', contributorsContainer);
      contributorInfos.forEach(personObj => {
        const li = createAndAppend('li', contributorUl, {
          class: 'contributors'
        });
        createAndAppend('img', li, {
          src: `${personObj.avatar_url}`
          
        });
        createAndAppend('a', li, {
          text: `${personObj.login}`,
          href: `${personObj.html_url}`
        });
        createAndAppend('span', li, {
          text: `${personObj.contributions}`,
          class: 'forks'
        })
      })


    })
  }
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}



///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\

'use strict';

{
  const selectMenu = document.querySelector('select');
  const contributorsContainer = document.querySelector('.contributors-container');

 

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul);
    repoCreator(repo, li)
  }

   function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      selectMenuCreator(repos);
    });
  }

  //CREATES REPO
  function repoCreator(repo, li) {
    const repoInfos = [repo.name, repo.description, repo.forks, new Date(repo.updated_at).toDateString()];
    const names = ['Repository', 'Description', 'Forks', 'Updated'];

    repoInfos.forEach((repoInfo, index) => {
      const p = createAndAppend('p', li);
      const span1 = createAndAppend('span', p, {
        text: names[index],
        class: 'repo-span bold'
      })
      const span2 = createAndAppend('span', p, {
        text: `: ${repoInfo}`,
        class: 'repo-span'
      });
    })
  }

  //SELECT MENU CREATOR
  function selectMenuCreator(repos) {
    const repoContainer = document.querySelector('.repo-container');
    const repoUl = createAndAppend('ul', repoContainer);
    renderRepoDetails(repos[0], repoUl);
    getContributor(repos[0]);
    repos
      .sort((a, b) => a.name.localeCompare(b.name, 'en', {
        numeric: true,
        ignorePunctuation: true
      }, {
        sensitivity: 'base'
      }))
      .forEach((repo, index) => {
        createAndAppend('option', selectMenu, {
          text: `${repo.name}`,
          value: index
        })
        selectMenu.addEventListener('change', (e) => {
          if (e.target.value == index) {
            repoUl.innerText= '';
            contributorsContainer.innerText= '';
            renderRepoDetails(repo, repoUl);
            getContributor(repo);
          }
        });
      })
  }

  //CONTRIBUTOR SECTION
  function getContributor(repo) {
    const contributorURL = repo.contributors_url;
    fetchJSON(contributorURL, (errorContributor, contributorInfos) => {
      if (errorContributor) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      console.log(contributorInfos)
     
      const contributorUl = createAndAppend('ul', contributorsContainer);
      contributorInfos.forEach(personObj => {
        const li = createAndAppend('li', contributorUl, {
          class: 'contributors'
        });
        createAndAppend('img', li, {
          src: `${personObj.avatar_url}`
          
        });
        createAndAppend('a', li, {
          text: `${personObj.login}`,
          href: `${personObj.html_url}`
        });
        createAndAppend('span', li, {
          text: `${personObj.contributions}`,
          class: 'forks'
        })
      })


    })
  }
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}


///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\///\\\\////\\\\////\\\\
