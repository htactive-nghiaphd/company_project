import axios from 'axios'

const defaultOptions = {
  baseURL: 'https://admin-htactive.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `BearerToken ${localStorage.getItem('token')}`
  }
}

const request = axios.create(defaultOptions)

async function get (url) {
  try {
    const response = await request.get(url)
    return response.data
  } catch (e) {
    throw e
  }
}
async function remove (url, payload) {
  try {
    const response = await request.delete(url, payload)
    return response.data
  } catch (e) {
    throw e
  }
}
async function post (url, data) {
  try {
    const response = await request.post(url, data)
    return response.data
  } catch (e) {
    throw e
  }
}

async function patch (url, data) {
  try {
    const response = await request.patch(url, data)
    return response.data
  } catch (e) {
    throw e
  }
}

async function put (url, data) {
  try {
    const response = await request.put(url, data)
    return response.data
  } catch (e) {
    throw e
  }
}

async function sleep (time = 500) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time)
  })
}

// function createAxiosRequest(baseUrl) {
//   const defaultOptions = {
//     baseURL: baseUrl
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `BearerToken ${localStorage.getItem('token')}`
//     }
//   }

//   return { get, post, patch, sleep, remove, put }
// }

export { get, post, patch, sleep, remove, put }
