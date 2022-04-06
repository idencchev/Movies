const verifyUser = (verifyData) => {
    return (dispatch) => {
        dispatch({
            type: 'VERIFY',
            payload: verifyData
        });
    }
}

const login = (loginData) => {
    return (dispatch) => {
        dispatch({
            type: 'LOGIN',
            payload: loginData
        });
    }
}

const logout = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT'
        });
    }
}

export default {
    verifyUser,
    login,
    logout
}