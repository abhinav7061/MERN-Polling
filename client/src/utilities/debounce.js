const debounce = (func, delay) => {
    let timeout;
    const debouncedFunction = (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
    debouncedFunction.cancel = () => {
        if (timeout) clearTimeout(timeout);
    };
    return debouncedFunction;
};

export default debounce;