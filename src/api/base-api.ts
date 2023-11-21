import { TResponseData } from '@/api/types.ts'
import axios from 'axios'

export const baseApi = {
  async getSubjectData() {
    const result = await axios.get<TResponseData>('https://bgaa.by/test')

    return result.data
  },
}
