

export const getReport1 = async (startDate, endDate) => {
    const res = await fetch(`http://localhost:8080/api/reports/1?startDate=${startDate}&endDate=${endDate}`);
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



/**
 * Headers for the system
 * @returns 
 */
const headers = () => {
    return {
        "Content-Type": "application/json",
    };
}