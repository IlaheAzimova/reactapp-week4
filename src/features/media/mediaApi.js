const API_URL = 'https://6a8219a2400f94b23c6fcba7.mockapi.io/media';

export async function fetchMediaApi() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function addMediaApi(itemData) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
    });
    return await res.json();
}

export async function updateFavoriteApi(id, favorite) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite })
    });
}

export async function deleteMediaApi(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}