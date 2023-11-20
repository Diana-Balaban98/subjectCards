import axios from 'axios'

export const baseApi = {
  async getSubjectData() {
    const result = await axios.get<TResponseData>('https://bgaa.by/test')

    return result.data
  },
}

export type TResponseData = {
  data: TSubjectInfo[]
  teachers: Teachers[]
}

export type TSubjectInfo = {
  additionalInfo: string
  countPodgroups: string
  course: string
  exam: boolean
  groupName: string
  laboratoryHours: string
  lecturesHours: string
  offset: boolean
  podgroups: TSubgroups[]
  practicHours: string
  semestr: string
  seminarHours: string
  studentsNumber: string
  subjectName: string
  uniqueId: string
}

export type TSubgroups = {
  [key: string]: string
}

export type Teachers = {
  id: string
  name: string
}
