
const express = require('express');
const router = express.Router();

const { readScaleData } = require('../simulators/scaleSimulator');
const { sendMeasurement } = require('../services/laravelClient');
const {
    validateMeasurement,
} = require('../services/measurementServices');

// GET /api/measurement
// Mengambil data dari simulator.
router.get('/', (req, res) => {
    const measurement = readScaleData();

    res.json({
        success: true,
        data: measurement,
    });
});

// POST /api/measurement/send
// Mengirim data simulator ke Laravel.
router.post('/send', async (req, res) => {
    try {
        const measurement = readScaleData();
        const validation = validateMeasurement(measurement);

        if (!validation.valid) {
            return res.status(422).json({
                success: false,
                message: validation.message,
            });
        }

        const result = await sendMeasurement(measurement);

        return res.status(200).json({
            success: true,
            message: 'Data berhasil dikirim ke Laravel',
            laravel: result,
        });
    } catch (error) {
        console.error('Gagal mengirim pengukuran:', error.message);

        return res.status(502).json({
            success: false,
            message: 'Gagal mengirim data ke Laravel',
            error: error.message,
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const measurement = req.body;
        const validation = validateMeasurement(measurement);

        if (!validation.valid) {
            return res.status(422).json({
                success: false,
                message: validation.message,
            });
        }

        const result = await sendMeasurement(measurement);

        return res.status(201).json({
            success: true,
            message: 'Data pengukuran diterima dan diteruskan ke Laravel',
            laravel: result,
        });
    } catch (error) {
        console.error('Gagal meneruskan data:', error.message);

        return res.status(502).json({
            success: false,
            message: 'Gagal meneruskan data ke Laravel',
            error: error.message,
        });
    }
});

module.exports = router;
