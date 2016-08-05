
import { START_RENAME_PANEL, END_RENAME_PANEL } from '../actions/renamePanel'

const initData = ''

export default (state, action) => {
    if(state === undefined) {
        state = initData
    }
    switch(action.type) {
    case START_RENAME_PANEL:
        return 'editing'
    case END_RENAME_PANEL:
        return ''
    default:
        return state
    }
}