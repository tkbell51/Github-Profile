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

    var circle = document.createElement('span');
    circle.classList.add('circle')
    if (repoLanguage.textContent === "JavaScript"){
      circle.style.backgroundColor = '#F1E05A';
    } else if (repoLanguage.textContent === "HTML"){
      circle.style.backgroundColor = '#E34C26';
    } else if (repoLanguage.textContent === "CSS"){
      circle.style.backgroundColor = '#563D7C';
    }
    repoList.appendChild(circle);
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
    profName.classList.add('profName');
    profName.textContent = input.name;
    profileElement.appendChild(profName);
    var profUser = document.createElement('h3');
    profUser.classList.add('profUser');
    profUser.textContent = input.login;
    profileElement.appendChild(profUser);
    var profBio = document.createElement('h3');
    profBio.classList.add('profBio');
    profBio.textContent = input.bio;
    profileElement.appendChild(profBio);
    var profLocation= document.createElement('h3');
    profLocation.classList.add('profLocation');
    profLocation.textContent = input.location;
    profileElement.appendChild(profLocation);
    var profEmail = document.createElement('a');
    profEmail.classList.add('profEmail');
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
