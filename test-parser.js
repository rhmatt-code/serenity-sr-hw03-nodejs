const { parseScaleData } = require('./parsers/ScaleParser');

const testCases = [
    {
        name: 'Data valid',
        input: 'WEIGHT=70.8;HEIGHT=172;FAT=19.9;WATER=55.2;MUSCLE=30.9;BONE=3.1',
    },
    {
        name: 'Berat bukan angka',
        input: 'WEIGHT=abc;HEIGHT=172;FAT=19.9;WATER=55.2;MUSCLE=30.9;BONE=3.1',
    },
    {
        name: 'Data tidak lengkap',
        input: 'WEIGHT=70.8;HEIGHT=172;FAT=19.9',
    },
];

for (const test of testCases) {
    console.log(`\n=== ${test.name} ===`);

    try {
        const result = parseScaleData(test.input);
        console.log('BERHASIL:', result);
    } catch (error) {
        console.log('DITOLAK:', error.message);
    }
}