require('dotenv').config();

const { readScaleData } = require('./simulators/scaleSimulator');
const { sendMeasurement } = require('./services/laravelClient');

async function main() {
  try {
    const measurement = readScaleData();
    console.log("Data dari simulator:");
    console.log(measurement);

    console.log('\nMengirim data ke laravel...');

    const result = await sendMeasurement(measurement);

    console.log('\nRespons dari laravel:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('\nGagal Mengirim data:');
    console.error(error.stack || error);
    process.exitcode = 1;
  }
}

main();
