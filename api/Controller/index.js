const getHomepage = (req, res) => {
    res.json({ msg: "good morning" })
}

const getLogin = (req, res) => {
    const data = req.body;
    console.log(data);
    res.json({ data: data })
}

module.exports = { getHomepage, getLogin };