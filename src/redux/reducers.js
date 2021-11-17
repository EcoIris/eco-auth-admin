import { combineReducers } from 'redux';

const defaultState = {
    footerCollapsed: false,
}

function footerCollapsed (state = defaultState.footerCollapsed, action) {
    switch (action.type) {
        case 'SET_FOOTER_WITCH':
            return action.data
        default:
            return state
    }
}

// 导出所有reducer
export default combineReducers({
    footerCollapsed,
})
