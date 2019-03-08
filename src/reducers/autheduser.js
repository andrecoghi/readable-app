import { RECEIVE_AUTH_USER } from '../actions/autheduser'

export default function autheduser(state = null, action) {
    switch (action.type) {
        case RECEIVE_AUTH_USER:
            return action.user
        default:
            return state
    }
}