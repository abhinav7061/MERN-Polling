// Function to retrieve and parse JSON data from localStorage
const getLocalValue = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

// Function to stringify and store data in localStorage
const setLocalValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export default getLocalValue;
export { setLocalValue };
