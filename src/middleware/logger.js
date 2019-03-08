const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('Action is ', action.type)
        const nextState = next(action)
        console.log('New State is', store.getState())
    console.groupEnd()

    return nextState
}

export default logger