const initialState = ''

const notificationReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type) {
        case 'SHOW_NOTIFICATION':
            return action.notification
        case 'HIDE_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

export const showNotification = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        notification: message
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION',
        data: initialState
    }
}

export const setNotification = (message, seconds) => {
    return async dispatch => {
        dispatch(showNotification(message))
        setTimeout(()=> {
            dispatch(hideNotification())
        }, 1000 * seconds)
    }
}

export default notificationReducer