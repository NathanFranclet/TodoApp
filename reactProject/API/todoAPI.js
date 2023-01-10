const API_URL = 'http://127.0.0.1:4000'

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const CREATE_TODO =
  'mutation($title:String!, $done:Boolean!, $username:String!){createTasks(input:{title:$title, done:$done, owner:{connect:{where:{username:$username}}}}){tasks{id, title, done}}}'

const GET_TODO =
  'query($username:String!){tasks(where:{owner:{username:$username}}){id, title, done}}'

const UPDATE_TITLE_TODO =
  'mutation($id:ID!, $title:String!){updateTasks(update:{title:$title}where:{id:$id}) {tasks{id, title, done}}}'

const UPDATE_DONE_TODO =
  'mutation($id:ID!, $done:Boolean!){updateTasks(update:{done:$done}where:{id:$id}) {tasks{id, title, done}}}'

const DELETE_TODO =
  'mutation($id:ID!){deleteTasks(where:{id:$id}){nodesDeleted}}'

export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

export function signUp (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    })
}

export function createTodo (title, done, username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: CREATE_TODO,
      variables: {
        title: title,
        done: done,
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createTasks
    })
    .catch(error => {
      throw error
    })
}

export function getTodo (username, token) {

  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: GET_TODO,
      variables: {
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.tasks
    })
    .catch(error => {
      throw error
    })
}

export function updateDoneTodo(id, done,token) {

  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: UPDATE_DONE_TODO,
      variables: {
        id: id,
        done: done
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.updateTasks
    })
    .catch(error => {
      throw error
    })
}

export function updateTitleTodo(id, title,token) {

  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: UPDATE_TITLE_TODO,
      variables: {
        id: id,
        title: title
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.updateTasks
    })
    .catch(error => {
      throw error
    })
}

export function deleteTodo(id, token) {

  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: DELETE_TODO,
      variables: {
        id: id
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.deleteTasks
    })
    .catch(error => {
      throw error
    })
}