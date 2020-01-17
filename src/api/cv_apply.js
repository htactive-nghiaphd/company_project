import { post, remove, put } from './base'
async function ListCvApply(data) {
  const result = await post(`/api/cv-apply/get`,data)
  return result
}
async function addCvApply(data) {
  const response = await post(`/api/cv-apply/create`, data)
  // console.log(result,8989)
  return response.result
}
async function deleteCvApply(id) {
  const result = await remove(`/api/cv-apply/${id}`)
  return result
}
async function editCvApply(body) {
  return await put(`/api/cv-apply/${body._id}`, body)
}
export default {
  ListCvApply,
  addCvApply,
  deleteCvApply,
  editCvApply
}
