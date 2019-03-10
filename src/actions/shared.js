import { getInitialData } from '../utils/api'
import { receive_posts } from './posts'
import { receive_categories } from './categories'
import { receive_auth_user } from './autheduser'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const autheduser = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        getInitialData().then(({categories, posts}) => {
            dispatch(showLoading())
            dispatch(receive_categories(categories))
            dispatch(receive_posts(posts))
            dispatch(receive_auth_user(autheduser))
            dispatch(hideLoading())
        })
    }
}