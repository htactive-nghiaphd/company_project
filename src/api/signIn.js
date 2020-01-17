import axios from 'axios'
import route from '../router'

async function signIn (data) {
  await axios
    .post('https://admin-htactive.herokuapp.com/api/auth/signIn/ ', data)
    .then((response) => {
      console.log(1)
      let token = response.data.token
      localStorage.setItem('token', token)
      route.push('/interfaceAdmin')
    })
    .catch((error) => {
      // console.log(2)
      // throw error
      throw error
    })
}
export default {
  signIn
}
