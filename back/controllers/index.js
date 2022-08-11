const indexRouter = require("express").Router()

indexRouter.get("/",(req,res)=>{
    res.send("e")
})

module.exports = indexRouter