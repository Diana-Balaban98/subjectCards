import {TResponseData, TSubjectInfo} from '@/api/types.ts'
import axios from 'axios'

export const baseApi = {
  async getSubjectData() {
    const result = await axios.get<TResponseData>('https://bgaa.by/test')

    return result.data
  },
  async createSubjectData(data: TSubjectInfo[]) {
    const result = await axios.patch<TSubjectInfo[]>('https://bgaa.by/test_result', data)

    return result.data
  }
}
