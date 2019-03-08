export const RECEIVE_AUTH_USER = 'RECEIVE_AUTH_USER'

export function receive_auth_user(user) {
    return {
        type: RECEIVE_AUTH_USER,
        user
    }

}