import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootState } from '../state/store'

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
