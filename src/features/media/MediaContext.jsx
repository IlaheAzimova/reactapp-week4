import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchMediaApi, addMediaApi, updateFavoriteApi, deleteMediaApi } from './mediaApi';

const MediaContext = createContext();

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

    useEffect(() => {
        fetchMediaApi()
            .then(data => dispatch({ type: 'SET_MEDIA', payload: data }))
            .catch(err => console.error("Fetch xətası:", err));
    }, []);

    const addMedia = async (title, type) => {
        const tempId = Date.now().toString();
        const newItem = { id: tempId, title, type, year: new Date().getFullYear(), favorite: false };

        dispatch({ type: 'ADD_MEDIA', payload: newItem });

        setTimeout(async () => {
            const currentListSnapshot = state.mediaList;
            console.log("Stale closure test - Cari siyahının uzunluğu:", currentListSnapshot.length);

            try {
                const savedItem = await addMediaApi({ title, type, year: newItem.year, favorite: false });
                if (savedItem.id !== tempId) {
                    dispatch({ type: 'DELETE_MEDIA', payload: tempId });
                    dispatch({ type: 'ADD_MEDIA', payload: savedItem });
                }
            } catch {
                dispatch({ type: 'DELETE_MEDIA', payload: tempId });
                alert('Yaradılmadı, server xətası!');
            }
        }, 500);
    };

    const toggleFavorite = async (id, currentStatus) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
        try {
            await updateFavoriteApi(id, !currentStatus);
        } catch {
            dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
        }
    };

    const deleteMedia = async (id) => {
        dispatch({ type: 'DELETE_MEDIA', payload: id });
        if (!isNaN(id) && String(id).length < 5) return;

        try {
            await deleteMediaApi(id);
        } catch {
            // Xəta olarsa
        }
    };

    return (
        <MediaContext.Provider value={{ mediaList: state.mediaList, addMedia, deleteMedia, toggleFavorite }}>
            {children}
        </MediaContext.Provider>
    );
}

export const useMedia = () => useContext(MediaContext);