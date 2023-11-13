import { ResponseData, Subgroups, baseApi } from '@/api'
import { AppThunk } from '@/state'
import { Dispatch } from 'redux'

const SubjectState = {
  isLoading: false,
  subjectInfo: { data: [], teachers: [] } as ResponseData,
}

export const fetchData = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(toggleIsLoading(true))
  try {
    const response = await baseApi.getSubjectData()

    dispatch(setData(response))
    dispatch(toggleIsLoading(false))
  } catch (err) {
    console.log(err)
  }
}

const upgradeAllPodgroups = (podgroups: Subgroups[], newValue: string) => {
  const podgroup = podgroups[0]

  for (const key in podgroup) {
    podgroup[key] = newValue
  }

  return [podgroup, ...podgroups]
}

const setData = (data: ResponseData) => ({
  data,
  type: 'SET-DATA' as const,
})

export const toggleIsLoading = (isLoading: boolean) =>
  ({ isLoading, type: 'TOGGLE-IS-LOADING' }) as const

export const setIdTeacher = (idCard: string, teacherId: string, label: string) =>
  ({
    idCard,
    label,
    teacherId,
    type: 'SET-ID-TEACHER',
  }) as const

export const updateAllTeachers = (idCard: string, teacherId: string, label: string) =>
  ({
    idCard,
    label,
    teacherId,
    type: 'UPDATE-ALL-TEACHERS',
  }) as const

type CommonActions =
  | ReturnType<typeof setData>
  | ReturnType<typeof setIdTeacher>
  | ReturnType<typeof toggleIsLoading>
  | ReturnType<typeof updateAllTeachers>

export const subjectInfoReducer = (state = SubjectState, action: CommonActions) => {
  switch (action.type) {
    case 'SET-DATA':
      return { ...state, subjectInfo: action.data }
    case 'TOGGLE-IS-LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'SET-ID-TEACHER': {
      return {
        ...state,
        subjectInfo: {
          ...state.subjectInfo,
          data: state.subjectInfo.data.map(el =>
            el.uniqueId === action.idCard
              ? {
                  ...el,
                  podgroups: el.podgroups.map(subgroup => {
                    if (Object.prototype.hasOwnProperty.call(subgroup, action.label)) {
                      return {
                        ...subgroup,
                        [action.label]: action.teacherId,
                      }
                    }

                    return subgroup
                  }),
                }
              : el
          ),
        },
      }
    }
    case 'UPDATE-ALL-TEACHERS':
      return {
        ...state,
        subjectInfo: {
          ...state.subjectInfo,
          data: state.subjectInfo.data.map(el => {
            if (el.uniqueId === action.idCard) {
              return {
                ...el,
                podgroups: upgradeAllPodgroups(el.podgroups, action.teacherId),
              }
            }

            return el
          }),
        },
      }
    default:
      return state
  }
}
