import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MediaContext = createContext();

const API_URL = 'https://6a8219a2400f94b23c6fcba7.mockapi.io/media';

const initialState = {
    mediaList: [],
    loading: true
};

function mediaReducer(state, action) {
    switch (action.type) {
        case 'SET_MEDIA':
            return { ...state, mediaList: action.payload, loading: false };
        case 'ADD_MEDIA':
            return { ...state, mediaList: [action.payload, ...state.mediaList] };
        case 'DELETE_MEDIA':
            return { ...state, mediaList: state.mediaList.filter(item => item.id !== action.payload) };
        case 'TOGGLE_FAVORITE':
            return {
                ...state,
                mediaList: state.mediaList.map(item =>
                    item.id === action.payload ? { ...item, favorite: !item.favorite } : item
                )
            };
        default:
            return state;
    }
}

export function MediaProvider({ children }) {
    const [state, dispatch] = useReducer(mediaReducer, initialState);

    // READ (GET)
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => dispatch({ type: 'SET_MEDIA', payload: data }))
            .catch(err => console.error("Fetch xətası:", err));
    }, []);

    // CREATE (POST)
    const addMedia = async (title, type) => {
        const tempId = Date.now().toString();
        const newItem = { id: tempId, title, type, year: new Date().getFullYear(), favorite: false };

        dispatch({ type: 'ADD_MEDIA', payload: newItem });

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, type, year: newItem.year, favorite: false })
            });
            const savedItem = await res.json();
            if (savedItem.id !== tempId) {
                dispatch({ type: 'DELETE_MEDIA', payload: tempId });
                dispatch({ type: 'ADD_MEDIA', payload: savedItem });
            }
        } catch {
            dispatch({ type: 'DELETE_MEDIA', payload: tempId });
            alert('Yaradılmadı, server xətası!');
        }
    };

    // UPDATE 
    const toggleFavorite = async (id, currentStatus) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ favorite: !currentStatus })
            });
        } catch {
            dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
        }
    };


    // DELETE 

    const deleteMedia = async (id) => {
        dispatch({ type: 'DELETE_MEDIA', payload: id });
        if (!isNaN(id) && String(id).length < 5) {
            return;
        }

        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        } catch {

        }
    };
    return (
        <MediaContext.Provider value={{ mediaList: state.mediaList, addMedia, deleteMedia, toggleFavorite }}>
            {children}
        </MediaContext.Provider>
    );
}

export const useMedia = () => useContext(MediaContext);