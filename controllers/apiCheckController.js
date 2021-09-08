const checkApi = (req, res) => {
    res.send({
        message: 'Api is working'
    })
}

const postApi = (req, res) => {
    res.send({
        message: 'Post Api is working'
    })
}


module.exports = {
    checkApi,
    postApi,
}