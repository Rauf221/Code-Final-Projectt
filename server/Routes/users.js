const express = require("express");
const { GetUsers, GetUserById, UpdateUserById, DeleteUserById } = require("../Controllers/user");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res) => {
    res.send("Hello user, you authenticated, logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res) => {
    res.send("Hello user, you are logged in and you can delete your account!");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
    res.send("Hello admin, you are logged in and you can delete all accounts");
});

router.get("/", verifyAdmin, GetUsers);
router.get("/:id", verifyUser, GetUserById);
router.put("/:id", verifyUser, UpdateUserById);
router.delete("/:id", verifyUser, DeleteUserById);

module.exports = router;
