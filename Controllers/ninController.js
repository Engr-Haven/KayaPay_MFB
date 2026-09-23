const NIN = require("../Models/CreateNIN");

// CREATE A NEW NIN FOR CUSTOMERS >>>
exports.createNIN = async (req, res) => {
  try {
    const { nin, firstName, lastName, dob } = req.body;

    // VALIDATION >>>
    if (!nin || !firstName || !lastName || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const namePattern = /^[A-Za-z]{2,50}$/;

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      !namePattern.test(firstName) ||
      !namePattern.test(lastName)
    ) {
      return res.status(400).json({
        message: "First name and last name must contain letters only",
      });
    }

    if (typeof nin !== "string" || !/^\d{11}$/.test(nin)) {
      return res.status(400).json({ message: "NIN must be exactly 11 digits" });
    }

    // Check if NIN already exists in the database >>>
    const existingNIN = await NIN.findOne({ where: { nin } });
    if (existingNIN) {
      return res.status(400).json({ message: "NIN already exists" });
    }

    // Date Validation - to check if a date is real and not in the future >>>
    const inputDate = new Date(dob);
    const currentDate = new Date();

    if (Number.isNaN(inputDate.getTime()) || inputDate > currentDate) {
      return res
        .status(400)
        .json({ message: "Date of birth must be a valid date" });
    }

    const response = await fetch(
      "https://nibssbyphoenix.onrender.com/api/insertNin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nin,
          firstName,
          lastName,
          dob,
        }),
      },
    );

    if (!response.ok) {
      console.error("External service status:", response.status);
    //   console.log(await response.text());

      return res.status(502).json({
        message: "External NIN service failed",
      });
    }

    const data = await response.json();

    if (data.success === false) {
      console.error("External NIN service error:", data.message);

      return res.status(502).json({
        message: data.message || "External NIN service rejected the request",
      });
    }

    // save NIN to the MySQL database >>>
    const newNIN = await NIN.create({ nin, firstName, lastName, dob });

    // Masked the NIN for response (a fn to mask it) >>>
    const maskedNIN = (nin) => `*******${nin.slice(-4)}`;

    return res.status(201).json({
      message: "NIN created successfully",
      data: {
        id: newNIN.id,
        nin: maskedNIN(nin),
      },
    });
  } catch (error) {
    console.error("Error creating NIN:", error);
    return res.status(503).json({ message: "Internal server error" });
  }
};

//
// UPDATE CUSTORMER'S DATA USING NIN >>>
exports.updateCustomersData = async (req, res) => {
  try {
    const { nin } = req.params;
    const { firstName, lastName } = req.body;

    // VALIDATION >>>
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }

    const namePattern = /^[A-Za-z]{2,50}$/;

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      !namePattern.test(firstName) ||
      !namePattern.test(lastName)
    ) {
      return res.status(400).json({
        message: "First name and last name must contain letters only",
      });
    }

    if (!/^\d{11}$/.test(nin)) {
      return res.status(400).json({
        message: "NIN must be exactly 11 digits",
      });
    }

    // Check if NIN exists in the database >>>
    const existingNIN = await NIN.findOne({ where: { nin } });
    if (!existingNIN) {
      return res.status(404).json({ message: "NIN not found" });
    }

    // Update customer data >>>
    await NIN.update({ firstName, lastName }, { where: { nin } });
    return res
      .status(200)
      .json({ message: "Customer data updated successfully" });
  } catch (error) {
    console.error("Error updating customer data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//
// GET ALL CUSTOMER'S NIN >>>
exports.getAllNIN = async (req, res) => {
  try {
    const databaseNIN = await NIN.findAll();

    return res.status(200).json({
      message: `${databaseNIN.length} customers NIN retrieved successfully`,
      data: databaseNIN.map((nin) => ({
        id: nin.id,
        nin: `*******${nin.nin.slice(-4)}`, // Masked NIN
        firstName: nin.firstName,
        lastName: nin.lastName,
      })),
    });
  } catch (error) {
    console.error("Error retrieving customers NIN:", error);
    return res.status(503).json({ message: "Internal server error" });
  }
};

//
// DELETE NIN USING NIN >>>
exports.deleteNIN = async (req, res) => {
  try {
    const { nin } = req.params;
    const existingNIN = await NIN.findOne({ where: { nin } });

    if (!existingNIN) {
      return res.status(404).json({ message: "NIN not found" });
    }

    await NIN.destroy({ where: { nin } });
    return res.status(200).json({ message: "NIN deleted successfully!" });
  } catch (error) {
    console.error("Error deleting NIN:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
