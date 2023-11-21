import { TResponseData } from '@/api'

export const setData = (data: TResponseData) => ({
  data,
  type: 'SET-DATA' as const,
})

export const toggleIsLoading = (isLoading: boolean) =>
  ({ isLoading, type: 'TOGGLE-IS-LOADING' }) as const

export const setIdTeacher = (
  idCard: string,
  teacherId: string,
  podgroupName: string,
  indexPodgroup: number
) =>
  ({
    idCard,
    indexPodgroup,
    podgroupName,
    teacherId,
    type: 'SET-ID-TEACHER',
  }) as const

export const updateAllTeachers = (idCard: string, teacherId: string, indexPodgroup: number) =>
  ({
    idCard,
    indexPodgroup,
    teacherId,
    type: 'UPDATE-ALL-TEACHERS',
  }) as const

export const removePodgroup = (idCard: string, indexPodgroup: number) =>
  ({
    idCard,
    indexPodgroup,
    type: 'REMOVE-PODGROUP',
  }) as const

export const updateAdditionalInfo = (idCard: string, newValue: string) =>
  ({
    idCard,
    newValue,
    type: 'UPDATE-ADDITIONAL-INFO',
  }) as const

// types actions
export type CommonActions =
  | ReturnType<typeof removePodgroup>
  | ReturnType<typeof setData>
  | ReturnType<typeof setIdTeacher>
  | ReturnType<typeof toggleIsLoading>
  | ReturnType<typeof updateAdditionalInfo>
  | ReturnType<typeof updateAllTeachers>
