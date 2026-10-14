
const { SerialPort } = require("serialport");

async function listSerialPorts() {
    try {
        const ports = await SerialPort.list();

        if (ports.length === 0) {
            console.log("Belum ada port serial yang terdeteksi.");
            return;
        }

        console.log("Daftar port serial:");

        for (const port of ports) {
            console.log("------------------------");
            console.log("Path:", port.path);
            console.log("Manufacturer:", port.manufacturer || "Tidak diketahui");
            console.log("Serial Number:", port.serialNumber || "Tidak diketahui");
            console.log("Vendor ID:", port.vendorId || "Tidak diketahui");
            console.log("Product ID:", port.productId || "Tidak diketahui");
        }
    } catch (error) {
        console.error("Gagal membaca daftar port:", error.message);
    }
}

listSerialPorts();
