const { SerialPort } = require('serialport');
async function main() {
  try {
    const ports = await SerialPort.list();
    console.log('\n === DAFTAR PORT SERIAL ===');
    if (ports.length === 0) {
      console.log('Tidak ada port serial terdeteksi.');
      return;
    }

    console.table(
      ports.map((port) => ({
        path: port.path,
        manufacturer: port.manufacturer ?? '-',
        vendorId: port.vendorId ?? '-',
        productId: port.productId ?? '-',
        serialNumber: port.serialNumber ?? '-',
      }))
    );
  } catch (error) {
    console.error('Gagal membaca port:', error.message);
  }
}


main();
