const getToken = req => {
    const authorization = req.get("authorization")
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        const token = authorization.substring(7)
        return token
    }
}

module.exports = {getToken}