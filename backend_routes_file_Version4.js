const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('excel'), (req, res) => {
    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        res.json({ columns: Object.keys(data[0]), data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;