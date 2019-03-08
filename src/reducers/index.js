import { combineReducers } from 'redux'
import categories from './users'
import comments from './comments'
import posts from './tweets'
import autheduser from './autheduser'
import { loadingBarReducer } from 'react-redux-loading-bar'



export default combineReducers({
    categories,
    posts,
    comments,
    autheduser,
    loadingBar: loadingBarReducer
})
