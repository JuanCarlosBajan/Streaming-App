

export const getReport1 = async (startDate, endDate) => {
    const res = await fetch(`http://localhost:8080/api/reports/1?startDate=${startDate}&endDate=${endDate}`);
    const data = await res.json();
    return data
}
export const getReport2 = async (startDate, endDate) => {
    const res = await fetch(`http://localhost:8080/api/reports/2?startDate=${startDate}&endDate=${endDate}`);
    const data = await res.json();
    return data
}
export const getReport4 = async (startDate, endDate) => {
    const res = await fetch(`http://localhost:8080/api/reports/4`);
    const data = await res.json();
    return data
}
export const getReport5 = async (date) => {
    const res = await fetch(`http://localhost:8080/api/reports/5?date=${date}`);
    const data = await res.json();
    return data
}
export const getReport3Director = async () => {
    const res = await fetch(`http://localhost:8080/api/reports/3/director`);
    const data = await res.json();
    return data
}
export const getReport3Actors = async () => {
    const res = await fetch(`http://localhost:8080/api/reports/3/actores`);
    const data = await res.json();
    return data
}
export const getReport6 = async (month) => {
    const res = await fetch(`http://localhost:8080/api/reports/6?month=${month}`);
    const data = await res.json();
    return data
}
export const getReport7 = async () => {
    const res = await fetch(`http://localhost:8080/api/reports/7`);
    const data = await res.json();
    return data
}

export const getReport9 = async (startDate, endDate) => {
    const res = await fetch(`http://localhost:8080/api/reports/9?startDate=${startDate}&endDate=${endDate}`);
    const data = await res.json();
    return data
}

export const getReportEvent = async () => {
    const res = await fetch(`http://localhost:8080/api/reports/events`);
    const data = await res.json()
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