import { post } from './base'
async function getListSaralyBasic (data) {
  const result = await post(`api/salary-employee/get`, data)
  return result
}
async function addSalaryBasic (data) {
  const result = await post(`api/salary-employee/create`, data)
  return result
}
export default {
  getListSaralyBasic,
  addSalaryBasic
}
