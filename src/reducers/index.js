import { combineReducers } from 'redux'
import categories from './categories'
import comments from './comments'
import posts from './posts'
import { loadingBarReducer } from 'react-redux-loading-bar'



export default combineReducers({
    categories,
    posts,
    comments,
    loadingBar: loadingBarReducer
})
