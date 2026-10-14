const { SerialPort } = require('serialport');
const PORT_PATH = process.env.SCALE_PORT || '/dev/ttyUSB0';

const BAUD_RATE = Number(process.env.SCALE_BAUD_RATE || 9600)

const port = new SerialPort({ path: PORT_PATH, baudRate: BAUD_RATE, autoOpen: false })

port.on('open', () => {
  console.log('Port serial berhasil dibuka: ', PORT_PATH)
  console.log('Menunggu data dari timbangan...');
});

port.on('data', (buffer) => {
  console.log('Data mentah: ', buffer);
  console.log('Teks: ', JSON.stringify(buffer.toString('utf8')));
});

port.on('error', (error) => {
  console.error('Kesalahan serial: ', error.message);
});

port.open((error) => {
  if (error) {
    console.error('Gagal membuka port: ', error.message)
  }
})
