const BVN = require("../Models/CreateBVN");

// CREATE A NEW BVN FOR CUSTOMERS >>>
exports.createBVN = async (req, res) => {
  try {
    const { bvn, firstname, lastname, dob, phone } = req.body;

    // VALIDATION >>>
    if (!bvn || !firstname || !lastname || !dob || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\d{11}$/.test(bvn)) {
      return res.status(400).json({ message: "BVN must be exactly 11 digits" });
    }

    if (!/^\d{11}$/.test(phone)) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 11 digits" });
    }

    // Check if BVN already exists in the database >>>
    const existingBVN = await BVN.findOne({ where: { bvn } });
    if (existingBVN) {
      return res.status(400).json({ message: "BVN already exists" });
    }

    const response = await fetch(
      "https://nibssbyphoenix.onrender.com/api/insertBvn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bvn,
          firstName: firstname,
          lastName: lastname,
          dob,
          phone,
        }),
      },
    );

    if (!response.ok) {
      console.error("External service status:", response.status);

      return res.status(502).json({
        message: "External BVN service failed",
      });
    }

    const data = await response.json();

    if (data.success === false) {
      console.error("External BVN service error:", data.message);

      return res.status(502).json({
        message: data.message || "External BVN service rejected the request",
      });
    }

    // save BVN to the database >>>
    const newBVN = await BVN.create({ bvn, firstname, lastname, dob, phone });

    // Masked the BVN for response (a fn to mask it) >>>
    const maskedBVN = (bvn) => `*******${bvn.slice(-4)}`;

    return res.status(201).json({
      message: "BVN created successfully",
      data: {
        id: newBVN.id,
        bvn: maskedBVN(bvn),
      },
    });
  } catch (error) {
    console.error("Error creating BVN:", error);
    return res.status(503).json({ message: "Internal server error" });
  }
};

//
// UPDATE CUSTOMERS DATA USING BVN >>>
exports.updateCustomersData = async (req, res) => {
  try {
    const { bvn } = req.params;
    const { firstname, lastname } = req.body;

    // VALIDATION >>>
    if (!firstname || !lastname) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }

    // Check if BVN exists in the database >>>
    const existingBVN = await BVN.findOne({ where: { bvn } });
    if (!existingBVN) {
      return res.status(404).json({ message: "BVN not found" });
    }

    // Update customer data >>>
    await BVN.update({ firstname, lastname }, { where: { bvn } });

    return res
      .status(200)
      .json({ message: "Customer data updated successfully" });
  } catch (error) {
    console.error("Error updating customers data:", error);
    return res.status(503).json({ message: "Internal server error" });
  }
};

//
// GET ALL CUSTOMER'S BVN >>>
exports.getAllBVN = async (req, res) => {
  try {
    const databaseBVN = await BVN.findAll();

    return res.status(200).json({
      message: `${databaseBVN.length} customers BVN retrieved successfully`,
      data: databaseBVN.map((bvn) => ({
        id: bvn.id,
        bvn: `*******${bvn.bvn.slice(-4)}`, // Masked BVN
        firstname: bvn.firstname,
        lastname: bvn.lastname,
      })),
    });
  } catch (error) {
    console.error("Error retrieving customers BVN:", error);
    return res.status(503).json({ message: "Internal server error" });
  }
};
