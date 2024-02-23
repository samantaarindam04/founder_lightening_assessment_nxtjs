"use server"
export async function getAllPhoto(albumId) {
    if (albumId) {
        try {
            let data = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + albumId, { next: { revalidate: 120 } });
            data = await data.json()
            if (data.length > 0) {
                return data
            } else {
                return []
            }
        } catch (error) {
            return []
        }

    } else {
        return []
    }
}

export async function getAllAlbums(userId) {
    if (userId) {
        try {
            let data = await fetch('https://jsonplaceholder.typicode.com/albums?userId=' + userId, { next: { revalidate: 120 } });
            data = await data.json()
            if (data.length > 0) {
                return data
            } else {
                return []
            }
        } catch (error) {
            return []
        }

    } else {
        return []
    }
}

export async function getAllUsers() {
    try {
        let data = await fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 120 } });
        data = await data.json()
        if (data.length > 0) {
            return data
        } else {
            return []
        } 
    } catch (error) {
        return []
    }
    

}