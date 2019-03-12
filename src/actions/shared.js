import { getInitialData } from '../utils/api'
import { receive_posts } from './posts'
import { receive_categories } from './categories'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData() {
    return (dispatch) => {
        getInitialData().then(({categories, posts}) => {
            dispatch(showLoading())
            dispatch(receive_categories(categories))
            dispatch(receive_posts(posts))
            dispatch(hideLoading())
        })
    }
}