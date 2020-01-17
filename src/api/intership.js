import {post, remove} from "./base";

async function getAllInterShipFromApi(data) {
  return await post(`/api/interShip/get`, data)
}
async function deleteIntership(id) {
  // console.log(id)
  return await remove(`api/interShip/remove/${id}`)
}
async function addIntership(data) {
  return await post(`api/interShip/create`, data)
}
export default {
  getAllInterShipFromApi,
  deleteIntership,
  addIntership
}
