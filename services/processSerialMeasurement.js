
const { parseScaleData } = require('../parsers/ScaleParser');
const { validateMeasurement } = require('./measurementServices');
const { sendMeasurement } = require('./laravelClient');

async function processSerialMeasurement(rawLine, memberId) {
    // 1. Parsing data mentah menjadi data pengukuran.
    const parsed = parseScaleData(rawLine);

    // 2. Tambahkan ID anggota dan waktu pengukuran.
    const measurement = {
        member_id: memberId,
        ...parsed,
        measured_at: new Date().toLocaleString('sv-SE', {
            timeZone: 'Asia/Jakarta',
        }).replace(' ', 'T') + '+07:00',
    };

    // 3. Validasi data.
    const validation = validateMeasurement(measurement);

    if (!validation.valid) {
        throw new Error(validation.message);
    }

    // 4. Kirim ke Laravel.
    return await sendMeasurement(measurement);
}

module.exports = { processSerialMeasurement };