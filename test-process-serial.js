
require('dotenv').config();

const {
    processSerialMeasurement,
} = require('./services/processSerialMeasurement');

const rawLine =
    'WEIGHT=70.8;HEIGHT=172;FAT=19.9;WATER=55.2;MUSCLE=30.9;BONE=3.1';

async function main() {
    try {
        const result = await processSerialMeasurement(rawLine, 123);

        console.log('\nPengukuran berhasil diproses.');
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('\nPengukuran gagal:', error.message);
        process.exitCode = 1;
    }
}

main();