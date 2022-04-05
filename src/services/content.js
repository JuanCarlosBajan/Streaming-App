

/**
 * Get all series from the system
 * @returns 
 */
export const getAllSeries = async () => {
    const res = await fetch(`http://localhost:8080/api/content/series`);
    const data = await res.json();
    return data
}

/**
 * Add a favorite series on the system
 * @param {number} profileCode
 * @param {number} seriesCode
 */
export const addFavoriteSeries = async (profileCode, seriesCode) => {
    const URL = `http://localhost:8080/api/content/series/${profileCode}/favorites`;
    let bodyData = {
        seriesCode
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(bodyData),
    }
    const res = await fetch(URL, otherPram);
    const data = await res.json();
    return data;
}

/**
 * Remove a favorite series from the system
 * @param {number} profileCode
 * @param {number} seriesCode
 */
export const removeFavoriteSeries = async (profileCode, seriesCode) => {
    const URL = `http://localhost:8080/api/content/series/${profileCode}/favorites`;
    let body = {
        seriesCode
    };
    const otherPram = {
        method: "DELETE",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(URL, otherPram);
    const data = await res.json();
    return data;
}



/**
 * Get all the favorite series from profile
 * @param {number} profileCode 
 * @returns 
 */
export const getFavoriteSeries = async (profileCode) => {
    const res = await fetch(`http://localhost:8080/api/content/series/${profileCode}/favorites`);
    const data = await res.json();
    return data
}

/**
 * Headers for the system
 * @returns 
 */
const headers = () => {
    return {
        "Content-Type": "application/json",
    };
}