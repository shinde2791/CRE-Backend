const UserData = require('../model/userDataModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// POST /api/user-data
const addUserData = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save data to MongoDB
    const newUser = new UserData({ name, email, message });
    await newUser.save();

    res.status(201).json({ message: 'User data added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to add user data' });
  }
};

// GET /api/user-data
const getUserData = async (req, res) => {
  try {
    const users = await UserData.find();

    // Check if data exists
    if (users.length === 0) {
      return res.status(404).json({ error: 'No user data found' });
    }

    // Generate PDF
    const doc = new PDFDocument();
    const filePath = './user_data_report.pdf';
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Add data to PDF
    doc.fontSize(16).text('User Data Report', { align: 'center' }).moveDown(2);
    users.forEach((user, index) => {
      doc.text(`User ${index + 1}:`);
      doc.text(`Name: ${user.name}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Message: ${user.message}`);
      doc.moveDown(1);
    });

    doc.end();

    // Wait for the PDF file to be written before responding
    writeStream.on('finish', () => {
      res.status(200).json({
        message: 'User data fetched successfully, and PDF generated',
        filePath: filePath,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

module.exports = { addUserData, getUserData };