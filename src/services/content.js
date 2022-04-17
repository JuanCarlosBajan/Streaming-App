export const getAllMovies = async () => {
    const res = await fetch(`http://localhost:8080/api/content/movies`);
    const data = await res.json();
    return data
}

export const getMoviesAdmin = async () => {
    const res = await fetch(`http://localhost:8080/api/content/movies/all`);
    const data = await res.json();
    return data
}

export const deleteMoviesAdmin = async (movieCode) => {
    await fetch(`http://localhost:8080/api/content/movies/${movieCode}`, { method: 'DELETE' })
}

/**
 * Get all series from the system
 * @returns 
 */
export const getAllSeries = async () => {
    const res = await fetch(`http://localhost:8080/api/content/series`);
    const data = await res.json();
    return data
}

export const getSeriesAdmin = async () => {
    const res = await fetch(`http://localhost:8080/api/content/series/all`);
    const data = await res.json();
    return data
}

export const deleteSeriesAdmin = async (seriesCode) => {
    await fetch(`http://localhost:8080/api/content/series/${seriesCode}`, { method: 'DELETE' })
}

export const getResult = async (userInput) => {
    const res = await fetch(`http://localhost:8080/api/content/${userInput}/search`);
    const data = await res.json();
    return data
}


//addFavoriteMovies, getAllMovies, getFavoriteMovies, removeFavoriteMovies

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

export const addFavoriteMovies = async (profileCode, movieCode) => {
    const URL = `http://localhost:8080/api/content/movies/${profileCode}/favorites`;
    let bodyData = {
        movieCode
    };
    console.log(bodyData);
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



export const removeFavoriteMovies = async (profileCode, movieCode) => {
    const URL = `http://localhost:8080/api/content/movies/${profileCode}/favorites`;
    let body = {
        movieCode
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

export const getFavoriteMovies = async (profileCode) => {
    const res = await fetch(`http://localhost:8080/api/content/movies/${profileCode}/favorites`);
    const data = await res.json();
    return data
}



/**
 * Gets a single series
 * @param {number} seriesCode 
 * @returns 
 */
export const getSeries = async (seriesCode) => {
    const res = await fetch(`http://localhost:8080/api/content/series/single/${seriesCode}`);
    const data = await res.json();
    return data
}


/**
 * Gets a single movie
 * @param {number} movieCode 
 * @returns 
 */
export const getMovie = async (movieCode) => {
    const res = await fetch(`http://localhost:8080/api/content/movies/single/${movieCode}`);
    const data = await res.json();
    return data
}


/**
 * Mark a movie as finished
 * @param {number} movieCode 
 * @param {number} profileCode 
 */
export const markMovieFinished = async (movieCode, profileCode) => {
    let body = {
        movieCode
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/movies/${profileCode}/finished`, otherPram);
    const data = await res.json();
    return data;
}

/**
 * Get the finished movies for a profile
 * @param {number} profileCode 
 */
export const getFinishedMovies = async (profileCode) => {
    const res = await fetch(`http://localhost:8080/api/content/movies/${profileCode}/finished`);
    const data = await res.json();
    return data;
}

/**
 * Mark a movie as started
 * @param {number} movieCode 
 * @param {number} profileCode 
 */
export const markMovieStarted = async (movieCode, profileCode) => {
    let body = {
        movieCode
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/movies/${profileCode}/started`, otherPram);
    const data = await res.json();
    return data;
}

/**
 * Get the finished movies for a profile
 * @param {number} profileCode 
 */
export const getInProgressMovies = async (profileCode) => {
    const res = await fetch(`http://localhost:8080/api/content/movies/${profileCode}/in-progress`);
    const data = await res.json();
    return data;
}



/**
 * Get finished series for a profile
 * @param {*} profileCode 
 */
export const getFinishedSeries = async (profileCode) => {
    const res = await fetch(`http://localhost:8080/api/content/series/${profileCode}/finished`);
    const data = await res.json();
    return data;
}

/**
 * Mark a series as finished
 * @param {*} episodeCode 
 * @param {*} profileCode 
 * @returns 
 */
export const markSeriesFinished = async (episodeCode, profileCode) => {
    let body = {
        episodeCode
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/series/${profileCode}/finished`, otherPram);
    const data = await res.json();
    return data;
}

/**
 * Mark a series as started
 * @param {*} episodeCode 
 * @param {*} profileCode 
 * @returns 
 */
export const markSeriesAsStarted = async (episodeCode, profileCode) => {
    let body = {
        episodeCode
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/series/${profileCode}/started`, otherPram);
    const data = await res.json();
    return data;
}


/**
 * Get the in progress series for a profile
 * @param {number} profileCode 
 */
export const getInProgressSeries = async (profileCode) => {
    const res = await fetch(`http://localhost:8080/api/content/series/${profileCode}/in-progress`);
    const data = await res.json();
    return data;
}

/**
 * Add a movie
 */
export const createMovie = async (movie) => {
    let body = {
        ...movie
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/movies`, otherPram);
    const data = await res.json();
    return data;
}


/**
 * Add a movie
 */
export const modifyMovie = async (movieCode, movie) => {
    let body = {
        ...movie
    };
    const otherPram = {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/movies/${movieCode}`, otherPram);
    const data = await res.json();
    return data;
}

/**
 * Modify a series
 */
export const modifySeries = async (seriesCode, series) => {
    let body = {
        ...series
    };
    const otherPram = {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/series/${seriesCode}`, otherPram);
    const data = await res.json();
    return data;
}

/**
 * Add series
 */
export const createSeries = async (series) => {
    let body = {
        ...series
    };
    console.log(body);
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/series`, otherPram);
    const data = await res.json();
    return data;
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