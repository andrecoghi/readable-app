import { getAllCategories } from '../utils/api'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function receive_categories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }

}

export function fetchCategories() {
    return (dispatch) => {
        getAllCategories().then(({categories}) => {
            dispatch(receive_categories(categories))
        })
    }
}