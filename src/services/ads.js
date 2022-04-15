export const getMovieAd = async (movieCode) => {
    const res = await fetch(`http://localhost:8080/api/ads/movies/${movieCode}`);
    const data = await res.json();
    return data
}

export const getSeriesAd = async (seriesCode) => {
    const res = await fetch(`http://localhost:8080/api/ads/series/${seriesCode}`);
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