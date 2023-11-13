import axios from 'axios'

export const baseApi = {
  async getSubjectData() {
    const result = await axios.get<ResponseData>('https://bgaa.by/test')

    return result.data
  },
}

export type ResponseData = {
  data: SubjectInfo[]
  teachers: Teachers[]
}

type SubjectInfo = {
  additionalInfo: string
  countPodgroups: string
  course: string
  exam: boolean
  groupName: string
  laboratoryHours: string
  lecturesHours: string
  offset: boolean
  podgroups: Subgroups[]
  practicHours: string
  semestr: string
  seminarHours: string
  studentsNumber: string
  subjectName: string
  uniqueId: string
}

export type Subgroups = {
  [key: string]: string
}

export type Teachers = {
  id: string
  name: string
}
