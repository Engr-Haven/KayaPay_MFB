const express = require("express");
const router = express.Router();

const ninController = require("../Controllers/ninController");

// CREATE A NEW NIN FOR CUSTOMERS >>>
router.post("/create-nin", ninController.createNIN);

// UPDATE CUSTOMER'S DATA ON NIN TABLE USING NIN >>>
router.put("/updatenin/:nin", ninController.updateCustomersData);

// GET ALL CUSTOMER'S NIN >>>
router.get("/getallnin", ninController.getAllNIN);

// DEELETE CUSTOMER'S NIN >>>
router.delete("/deletenin/:nin", ninController.deleteNIN);

module.exports = router;
