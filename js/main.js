(function () {
  "use strict";
// Use github api token for development purposes
// Will not be present in production
var headers = {};
if (GITHUB_TOKEN) {
  //Set the AJAX to send the token
  headers['Authorization'] = 'token ' + GITHUB_TOKEN;
}

var profileElement = document.querySelector('.profile');
var repoElement = document.querySelector('.repoElement');




var urlProfile = 'https://api.github.com/users/tkbell51';
var urlRepo = 'https://api.github.com/users/tkbell51/repos?sort=updated';

var repos = {};
fetch(urlRepo).then((resp) => resp.json())
.then(function(data){
  for (var i = 0; i < data.length; i++) {
    repos = data[i];
    var repoList = document.createElement('li');
    var repoTitle = document.createElement('a');
    repoTitle.classList.add('repoTitle');
    repoTitle.href = repos.url;
    repoTitle.textContent = repos.name;
    repoList.appendChild(repoTitle);
    var repoLanguage = document.createElement('span');
    repoLanguage.classList.add('repoLanguage');
    repoLanguage.textContent = repos.language;
    repoList.appendChild(repoLanguage);
    var circleNode = document.createElement('span');
    circleNode.height = "5";
    circleNode.width = '5';
    repoList.appendChild(circleNode);
    var circle = document.createElement('span');
    circle.height = '10';
    circle.width = '10';
    if (repoLanguage.textContent === "JavaScript"){
      circle.background = 'yellow';
    } else if (repoLanguage.textContent === "HTML"){
      circle.background = 'red';
    } else if (repoLanguage.textContent === "CSS"){
      circle.background = '#563D7C';
    }
    circleNode.appendChild(circle);
    var repoUpdate = document.createElement('span');
    repoUpdate.classList.add('repoUpdate');
    var formattedDate = moment(repos.updated_at).fromNow();
    repoUpdate.textContent = formattedDate;
    repoList.appendChild(repoUpdate);
    repoElement.appendChild(repoList);
  }
});


fetch(urlProfile, {headers: headers}).then((resp) => resp.json())
.then(function(input){
    var profPic = document.createElement('img');
    profPic.classList.add('profPic');
    profPic.src = input.avatar_url;
    profPic.alt = "My Picture";
    profileElement.appendChild(profPic);
    var profName = document.createElement('h3');
    profName.classList.add('name');
    profName.className = 'name';
    profName.textContent = input.name;
    profileElement.appendChild(profName);
    var profUser = document.createElement('h3');
    profUser.classList.add('User');
    profUser.textContent = input.login;
    profileElement.appendChild(profUser);
    var profBio = document.createElement('h3');
    profBio.classList.add('bio');
    profBio.textContent = input.bio;
    profileElement.appendChild(profBio);
    var profLocation= document.createElement('h3');
    profLocation.classList.add('location');
    profLocation.textContent = input.location;
    profileElement.appendChild(profLocation);
    var profEmail = document.createElement('a');
    profEmail.classList.add('email');
    profEmail.href = input.email;
    profEmail.textContent = input.email;
    console.log(input.email);
    profileElement.appendChild(profEmail);
    // var profHTML = document.createElement('h3');
    // profHTML.classList.add('HTML');
    // profHTML.textContent = input.html_url;
    // profileElement.appendChild(profHTML);
});

}());
