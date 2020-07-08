
export default (state = { isAllRead: false, count: 8 }, action) => {
    switch (action.type) {
        case 'READ_ALL':
            return { ...state, isAllRead: !state.isAllRead }
        default:
            return state
    }
}