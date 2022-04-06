export const initialState = {
    isVerified: false,
    username: null,
    id: null,
    favoriteMovies: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isVerified: action.payload.isVerified,
                username: action.payload.username,
                id: action.payload.id,
                favoriteMovies: action.payload.favoriteMovies
            };

        case 'LOGOUT':
            return {
                ...state,
                isVerified: false,
                username: null,
                id: null,
                favoriteMovies: null
            };

        case 'VERIFY':
            return {
                ...state,
                isVerified: action.payload.isVerified,
                username: action.payload.username,
                id: action.payload.id,
                favoriteMovies: action.payload.favoriteMovies
            };

        default:
            return state;
    }
};

export default reducer;