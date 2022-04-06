/**
 * Get all series from the system
 * @returns 
 */
 export const getAllSeries = async () => {
    const res = await fetch(`http://localhost:8080/api/content/series`);
    const data = await res.json();
    return data
}

export const getAllMovies = async () => {
    const res = await fetch(`http://localhost:8080/api/content/movies`);
    const data = await res.json();
    return data
}