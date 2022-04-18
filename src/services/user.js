import { decodeToken } from "../utils/decodeToken";

/**
 * Gets the current user from the token stored
 */
export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    const userCode = decodeToken(token).userCode;
    if (!userCode) {
        return null;
    }
    return { userCode };
}

/*
fds
*/


/**
 * Gets the user profiles
 */
export const getUserProfiles = async (userCode) => {
    const res = await fetch(`http://localhost:8080/api/users/${userCode}/profiles`, {
        headers: headers(),
    });
    const data = await res.json();
    return data
}

export const getUsers = async () => {
    const res = await fetch('http://localhost:8080/api/users', {
        headers: headers(),
    });
   
    const data = await res.json();
    return data
}

/**
 * Gets a single user
 * @param {number} userCode 
 * @returns 
 */
export const getUser = async (userCode) => {
    const res = await fetch(`http://localhost:8080/api/users/${userCode}`, {
        headers: headers(),
    });
    const data = await res.json();
    return data
}


/**
 * Creates a profile for the user specified
 * @param {number} userCode 
 * @param {string} name 
 */
export const createProfile = async (userCode, name) => {
    const URL = `http://localhost:8080/api/users/${userCode}/profiles`;
    let Data = {
        name
    };
    const otherPram = {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(Data),
    }

    const res = await fetch(URL, otherPram);
    const data = await res.json();
    return data;

}

/**
 * Activates a profile
 * @param {number} profileCode 
 * @returns 
 */
export const lockProfile = async (profileCode) => {
    const URL = `http://localhost:8080/api/users/lock/${profileCode}`;
    const otherPram = {
        method: "GET",
        headers: headers(),
    }
    const res = await fetch(URL, otherPram);
    const data = await res.json();
    return data;
}

/**
 * Deactivates a profile
 * @param {number} profileCode 
 * @returns 
 */
export const unlockProfile = async (profileCode) => {
    const URL = `http://localhost:8080/api/users/unlock/${profileCode}`;
    const otherPram = {
        method: "GET",
        headers: headers(),
    }
    const res = await fetch(URL, otherPram);
    const data = await res.json();
    return data;
}


const headers = () => {
    return {
        "Content-Type": "application/json",
        "x-token": JSON.parse(localStorage.getItem('token'))
    };
}
