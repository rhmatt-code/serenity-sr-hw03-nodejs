const {SerialBuffer} = require('./parsers/SerialBuffer');
const {parseScaleData} = require('./parsers/ScaleParser');

const receiver = new SerialBuffer((line) => {
    console.log('\nBaris Lengkap diterima: ', line);
    try{
        const measurement = parseScaleData(line);
        console.log('Hasil Parsing: ', measurement);
    }catch (error) {
        console.error('Gagal Parsing: ', error.message);
    }
});

receiver.push('WEIGHT=70.8;HEIGHT=172;');
receiver.push('FAT=19.9;WATER=55.2;');
receiver.push('MUSCLE=30.9;BONE=3.1\n');