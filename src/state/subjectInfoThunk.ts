import {baseApi} from '@/api'
import {AppThunk, setData, toggleIsLoading} from '@/state'
import {Dispatch} from 'redux'

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



