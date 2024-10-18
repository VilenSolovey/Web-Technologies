const API_URL = 'http://localhost:3001/shoes';

export async function fetchShoes({ sortBy, search } = {}) {
    let url = API_URL;

    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    if (sortBy) {
        url += search ? `&sort=${encodeURIComponent(sortBy)}` : `?sort=${encodeURIComponent(sortBy)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Не вдалося отримати взуття');
    }
    return await response.json();
}

export async function addShoe(shoe) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoe)
    });

    if (!response.ok) {
        throw new Error('Не вдалося додати взуття');
    }

    return await response.json();
}

export async function updateShoe(id, shoe) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoe)
    });

    if (!response.ok) {
        throw new Error('Не вдалося оновити взуття');
    }

    return await response.json();
}

export async function deleteShoe(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Не вдалося видалити взуття');
    }
}
