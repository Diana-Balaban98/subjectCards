import { TResponseData, TSubgroups } from '@/api'
import { upgradeAllValueInObj } from '@/helpers'
import { CommonActions } from '@/state'

const SubjectState = {
  isLoading: false,
  subjectInfo: { data: [], teachers: [] } as TResponseData,
}

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
          data: state.subjectInfo.data.map(el => {
            if (el.uniqueId === action.idCard) {
              return {
                ...el,
                podgroups: el.podgroups.map((subgroup, i) => {
                  if (i === action.indexPodgroup) {
                    return {
                      ...subgroup,
                      [action.podgroupName]: action.teacherId,
                    }
                  }

                  return subgroup
                }),
              }
            }

            return el
          }),
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
                podgroups: el.podgroups.map((subgroup, i) => {
                  if (i === action.indexPodgroup) {
                    upgradeAllValueInObj<TSubgroups>(
                      el.podgroups,
                      action.teacherId,
                      action.indexPodgroup
                    )
                  }

                  return subgroup
                }),
              }
            }

            return el
          }),
        },
      }
    case 'REMOVE-PODGROUP':
      return {
        ...state,
        subjectInfo: {
          ...state.subjectInfo,
          data: state.subjectInfo.data.map(el => {
            if (el.uniqueId === action.idCard) {
              return {
                ...el,
                countPodgroups: String(Number(el.countPodgroups) - 1),
                podgroups: el.podgroups.splice(action.indexPodgroup, 1),
              }
            }

            return el
          }),
        },
      }
    case 'UPDATE-ADDITIONAL-INFO': {
      return {
        ...state,
        subjectInfo: {
          ...state.subjectInfo,
          data: state.subjectInfo.data.map(el => {
            if (el.uniqueId === action.idCard) {
              return {
                ...el,
                additionalInfo: action.newValue,
              }
            }

            return el
          }),
        },
      }
    }

    default:
      return state
  }
}
