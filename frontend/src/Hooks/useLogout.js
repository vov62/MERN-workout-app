import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutContext'


export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutsContext();


    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user',)

        // dispatch logout action
        // reset the user to be null
        dispatch({ type: 'LOGOUT' })
        workoutDispatch({ type: 'SET_WORKOUTS', payload: null })
    }
    return { logout }
}

