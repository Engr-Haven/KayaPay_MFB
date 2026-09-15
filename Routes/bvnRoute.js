const express = require("express");
const router = express.Router();

const bvnController = require("../Controllers/bvnController");

// CREATE A NEW BVN FOR CUSTOMERS >>>
router.post("/create-bvn", bvnController.createBVN);

// UPDATE CUSTOMER'S DATA ON BVN TABLE USING BVN >>>
router.put("/updatebvn/:bvn", bvnController.updateCustomersData);

// GET ALL CUSTOMER'S BVN >>>
router.get("/getallbvn", bvnController.getAllBVN);

module.exports = router;
