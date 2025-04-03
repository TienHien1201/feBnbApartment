import { SuccessResponse } from '../types/untils.type'
import { GroupType } from '../types/group.type'
import http from '../utils/http'

const URL = 'phan-khu'
const groupAPI = {
  getGroupList() {
    return http.get<SuccessResponse<GroupType[]>>(URL)
  }
}

export default groupAPI
