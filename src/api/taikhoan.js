
import { put, post } from './base'

// const axios = createAxiosRequest("abdffdsg")
// const {put} = axios

async function getDataListTaiKhoan (data) {
  const result = await post('/api/user', data)
  // console.log('chay qua', result)
  return result
}
async function deleteDataTaiKhoan (id) {
  const removes = await remove(`/api/user/remove-account/${id}`)
  return removes
}
async function editDataTaiKhoan (body) {
  const result = await put(`/api/user/update-profile/${body._id}`, body)
  return result
}
async function addDataTaiKhoan (data) {
  const result = await post(`/api/user/create-account`, data)
  return result
}
// async function timTaiKhoan (data) {
//   const result = await get(`api/user/get-me`, data)
//   return result
// }
export default {
  getDataListTaiKhoan,
  deleteDataTaiKhoan,
  editDataTaiKhoan,
  addDataTaiKhoan,
  // timTaiKhoan
}
