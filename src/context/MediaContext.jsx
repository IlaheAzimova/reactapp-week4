import React, { createContext, useContext, useReducer } from 'react';

const MediaContext = createContext();

const initialState = {
    mediaList: [
        { id: 1, title: 'Interstellar', type: 'Film', year: 2014, favorite: true },
        { id: 2, title: 'Clean Code', type: 'Kitab', year: 2008, favorite: false },
        { id: 3, title: 'Inception', type: 'Film', year: 2010, favorite: false }
    ]
};


function mediaReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            return {
                ...state,
                mediaList: state.mediaList.map(item =>
                    item.id === action.payload ? { ...item, favorite: !item.favorite } : item
                )
            };
        case 'ADD_MEDIA':
            return {
                ...state,
                mediaList: [action.payload, ...state.mediaList]
            };
        default:
            return state;
    }
}

export function MediaProvider({ children }) {
    const [state, dispatch] = useReducer(mediaReducer, initialState);


    const toggleFavorite = (id) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    };

    const addMedia = (title, type) => {
        const newItem = {
            id: Date.now(),
            title,
            type,
            year: new Date().getFullYear(),
            favorite: false
        };
        dispatch({ type: 'ADD_MEDIA', payload: newItem });
    };

    return (
        <MediaContext.Provider value={{ mediaList: state.mediaList, toggleFavorite, addMedia }}>
            {children}
        </MediaContext.Provider>
    );
}

export const useMedia = () => useContext(MediaContext);