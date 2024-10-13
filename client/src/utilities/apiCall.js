const getData = async (endPoint, options) => {
    try {
        const res = await fetch(`${endPoint}`, options);
        const data = await res.json();
        if (data.success) {
            return data;
        } else {
            throw new Error(data.message || "Server Error");
        }
    } catch (error) {
        console.log('Error while fetching the data: ', error.message);
        throw new Error(error);
    }
}

export { getData }