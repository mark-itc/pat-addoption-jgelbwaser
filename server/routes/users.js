const router = require("express").Router();

router.get("/", (req,res) => {
    res.status(200).send("welcome to user route");
})

module.exports = router 