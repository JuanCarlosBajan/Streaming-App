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

export const deleteMoviesAdmin = async (movieCode, adminId) => {
    await fetch(`http://localhost:8080/api/content/movies/${movieCode}/${adminId.userCode}`, { method: 'DELETE' })
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

export const getAdvertisersAdmin = async () => {
    const res = await fetch(`http://localhost:8080/api/ads/advertisers`);
    const data = await res.json();
    return data;
}

export const postAdvertisersAdmin = async (advertiser, adminId) => {
    const URL = `http://localhost:8080/api/ads/advertisers/${adminId.userCode}`;
    let bodyData = {
        ...advertiser
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

export const getAdvertiserAds = async (advertiserCode) => {
    const res = await fetch(`http://localhost:8080/api/ads/advertisers/${advertiserCode}/ads`);
    const data = await res.json();
    return data
}

export const createAd = async (advertiserCode, ad, adminId) => {
    const URL = `http://localhost:8080/api/ads/advertisers/${advertiserCode}/ads/${adminId.userCode}`;
    let bodyData = {
        ...ad
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

export const removeAdAdmin = async (advertiserCode, adCode, adminId) => {
    const URL = `http://localhost:8080/api/ads/advertisers/${advertiserCode}/ads/${adCode}/${adminId.userCode}`;
    const otherPram = {
        method: "DELETE",
        headers: headers(),

    }
    const res = await fetch(URL, otherPram);
    const data = await res.json();
    return data;
}

export const linkAdAdmin = async (ad) => {
    const URL = `http://localhost:8080/api/ads/link`;
    let bodyData = {
        ...ad
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

export const modifyAdvertiserAdmin = async (advertiserCode, advertiser, adminId) => {
    const URL = `http://localhost:8080/api/ads/advertisers/${advertiserCode}/${adminId.userCode}`;
    let bodyData = {
        ...advertiser
    };
    const otherPram = {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(bodyData),
    }
    const res = await fetch(URL, otherPram);
    const data = await res.json();
    return data;
}

export const deleteSeriesAdmin = async (seriesCode) => {
    await fetch(`http://localhost:8080/api/content/series/${seriesCode}`, { method: 'DELETE' })
}

export const deleteUserAdmin = async (userCode, adminId) => {
    await fetch(`http://localhost:8080/api/users/${userCode}/${adminId.userCode}`, { method: 'DELETE' })
}

export const deleteAdvertisersAdmin = async (advertisersCode, adminId) => {
    await fetch(`http://localhost:8080/api/ads/advertisers/${advertisersCode}/${adminId.userCode}`, { method: 'DELETE' })
}

export const getResult = async (userInput) => {
    const res = await fetch(`http://localhost:8080/api/content/${userInput}/search`);
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
    console.log(profileCode, seriesCode)
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
 * Get the featured movies for this profile
 * @param {number} profileCode 
 * @returns 
 */
export const getFeaturedMovies = async (profileCode) => {
    const res = await fetch(`http://localhost:8080/api/content/movies/${profileCode}/featured`);
    const data = await res.json();
    return data;
}

/**
 * Add a movie
 * @param {*} movie 
 * @returns 
 */
export const createMovie = async (movie, adminId) => {
    let body = {
        ...movie
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/movies/${adminId.userCode}`, otherPram);
    const data = await res.json();
    return data;
}

/**
 * Get the featured series for this profile
 * @param {number} profileCode 
 * @returns 
 */
export const getFeaturedSeries = async (profileCode) => {
    const res = await fetch(`http://localhost:8080/api/content/series/${profileCode}/featured`);
    const data = await res.json();
    return data;
}
export const createEpisode = async (seriesCode, episode) => {
    let body = {
        ...episode
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/series/${seriesCode}/episodes`, otherPram);
    const data = await res.json();
    return data;
}

export const removeEpisode = async (seriesCode, episodeCode) => {
    const otherPram = {
        method: "DELETE",
        headers: headers(),
    }
    const res = await fetch(`http://localhost:8080/api/content/series/${seriesCode}/episodes/${episodeCode}`, otherPram);
    const data = await res.json();
    return data;
}


/**
 * Add a movie
 */
export const modifyMovie = async (movieCode, movie, adminId) => {
    let body = {
        ...movie
    };
    const otherPram = {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/content/movies/${movieCode}/${adminId.userCode}`, otherPram);
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

export const modifyUser = async (userCode, user, adminId) => {
    let body = {
        ...user
    };

    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/users/${userCode}/${adminId.userCode}`, otherPram);
    const data = await res.json();
    return data;
}
export const postUserAdmin = async (user, adminId) => {
    let body = {
        ...user
    };

    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/users/${adminId.userCode}`, otherPram);
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
 * Simulates views for movies
 * @param {number} quantity 
 * @param {string} date 
 */
export const simulateMovieViews = async (quantity, date) => {
    let body = {
        quantity,
        date
    }
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    }
    const res = await fetch(`http://localhost:8080/api/simulation`, otherPram);
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