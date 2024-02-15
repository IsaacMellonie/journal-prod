import { createContext } from 'react'

export default function reducer(state, action) {
    switch (action.type) {
        case 'set categories':
            return {
                ...state,
                categories: action.data
            }
        case 'set entries':
        return {
            ...state,
            entries: action.data
        }
        case 'add entry':
        return {
            ...state,
            entries: [...state.entries, action.data]
        }
    }
    return state
}

export const journalContext = createContext() 