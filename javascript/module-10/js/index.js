'use strict'

const usersList = document.querySelector('.js-get-users');
const userById =  document.querySelector('.js-get-by-id');
const userByIdInput = document.querySelector('.get-by-id');
const addingUser = document.querySelector('.js-add-user');
const addingName = document.querySelector('.add-user-name');
const addingAge = document.querySelector('.add-user-age');
const userRemove = document.querySelector('.js-remove-user');
const userRemoveId = document.querySelector('.remove-user');
const userEdit = document.querySelector('.js-edit-user');
const userEditId = document.querySelector('.edit-user-id');
const userEditName = document.querySelector('.edit-user-name');
const userEditAge = document.querySelector('.edit-user-age');
const results = document.querySelector('.js-results');

usersList.addEventListener('click', getAllUsers);
userById.addEventListener('click', getUserById);
addingUser.addEventListener('click', addUser);
userRemove.addEventListener('click', removeUser);
userEdit.addEventListener('click', editUser);



function getUserById (event) {
  event.preventDefault();
  let id = userByIdInput.value;
  return fetch(`https://test-users-api.herokuapp.com/users/${id}`,{
    method: 'GET'})
    .then(response => {
      if(response.ok) return response.json();
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => userInfo(data)
      //console.log(data)
    ).catch(error => alert('sorry, error happened'));
}
  
function userInfo (user) {
      results.innerHTML = `<li> User Data:</li> 
      <li>ID: ${user.data.id} </li> 
      <li>NAME: ${user.data.name} </li> 
      <li>AGE: ${user.data.age}</li>`
}

function getAllUsers (event)  { 
  flatList();
  event.preventDefault();
  fetch('https://test-users-api.herokuapp.com/users/', {
  method: 'GET'})
  .then(response => {
    if(response.ok) return response.json();
    throw new Error(`Error while fetching: ${response.statusText}`);
  })
  //.then(data => data.data)
  .then( data => forAllUsers(data))
     //console.log(data))
  .catch(error => alert('sorry, error happened'));
 }

function addUser (event) {
  event.preventDefault();
  const newUser = {
    name: addingName.value,
    age: addingAge.value
  };
  fetch(`https://test-users-api.herokuapp.com/users/`, {
  method: 'POST',
  body: JSON.stringify(newUser),
  headers: {Accept: 'application/json','Content-Type': 'application/json',}
}).then(response => {
  if(response.ok) return response.json();
  throw new Error('error while adding')})
  .then( () => results.innerHTML = 'USER WAS ADDED')
  .then (() => alert('user added'))
  .catch(error => alert('sorry, error happened'));
}

function removeUser (event) {
  event.preventDefault();
  let id = userRemoveId.value;
  fetch(`https://test-users-api.herokuapp.com/users/${id}`, 
  { method: 'DELETE',})
.then(response => {
  if(response.ok) return response.json();
  throw new Error(alert('error while process'))})
.then( () => results.innerHTML = 'USER WAS DELETED')
.then( () => alert('the user was deleted'))
.catch(error => alert('sorry, error happened'));
 
}

function editUser (event){
  event.preventDefault();
  let id = userEditId.value;
  const userForEdit = {
  name: userEditName.value,
  age: userEditAge.value,
  }
  fetch(`https://test-users-api.herokuapp.com/users/${id}`,
 {method: 'PUT',
 body: JSON.stringify(userForEdit),
 headers: {"Content-type": "application/json; charset=UTF-8"}
})
 .then(response => {
 if(response.ok) return response.json()
 throw new Error(alert('error while process'))})
 .then( () => results.innerHTML = 'USER WAS EDITED')
 .then(() => alert('user edited'))
 .catch(error => alert('sorry, error happened'));
}

function forAllUsers(allUsers){
  const table = document.createElement('table');
  const tableHead = document.createElement('tr');
  const headId = document.createElement('th');
  const headName = document.createElement('th');
  const headAge = document.createElement('th');
  headId.textContent = 'ID:';
  headName.textContent = 'NAME:';
  headAge.textContent = 'AGE:';
  table.classList.add('table');
  tableHead.append(headId, headName, headAge);
  table.appendChild(tableHead);
  allUsers.data.forEach(element => {
    const row = document.createElement('tr');
    const userId = document.createElement('td');
    const userName = document.createElement('td');
    const userAge = document.createElement('td');
    userId.textContent = element.id;
    userName.textContent = element.name;
    userAge.textContent = element.age;
    row.append(userId, userName, userAge);
    table.appendChild(row);
  });
  results.appendChild(table);
}

function flatList() {
  results.innerHTML = '';
}