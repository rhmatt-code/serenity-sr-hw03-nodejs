
require("dotenv").config({quiet: true});

const express = require("express");
const { SerialPort } = require("serialport");
const measurementRoutes = require("./routes/measurement");

const app = express();
const PORT = process.env.PORT || 3000;
const CHECK_INTERVAL = 2000;

let serialStatus = {
    connected: false,
    port: null,
    message: "Belum diperiksa",
};

let isChecking = false;

app.use(express.json());

// Memeriksa adapter USB-to-Serial
async function checkSerialConnection() {
    if (isChecking) return serialStatus;

    isChecking = true;

    try {
        const ports = await SerialPort.list();

        const usbPorts = ports.filter((port) => {
            const path = port.path;


            const isLinux = /^\/dev\/tty(USB|ACM)\d+$/i.test(path);

            const isWindows = /^COM\d+$/i.test(path);

            return isLinux || isWindows;
        });


        const nextStatus = usbPorts.length > 0
            ? {
                connected: true,
                port: usbPorts[0].path,
                message: "Adapter USB-Serial terdeteksi",
            }
            : {
                connected: false,
                port: null,
                message: "Adapter USB-Serial belum terdeteksi",
            };

        if (
          nextStatus.connected !== serialStatus.connected ||
          nextStatus.port !== serialStatus.port
        ) {
          console.log(
            nextStatus.connected
              ? `[USB] Adapter terdeteksi: ${nextStatus.port}`
              : "[USB] Adapter belum terdeteksi"
          );
        }

        serialStatus = nextStatus;
        return serialStatus;
    } catch (error) {
        serialStatus = {
            connected: false,
            port: null,
            message: `Gagal memeriksa port: ${error.message}`,
        };

        console.error("[Serial]", serialStatus.message);
        return serialStatus;
    } finally {
        isChecking = false;
    }
}

app.get("/", (req, res) => {
    res.json({
        message: "Server Node.js Express berjalan!",
        serial: serialStatus,
    });
});


app.get("/api/serial/status", (req, res) => {
    res.json({
        success: true,
        ...serialStatus,
    });
});


app.get("/api/serial/check", async (req, res) => {
    const status = await checkSerialConnection();

    res.json({
        success: true,
        ...status,
    });
});

// Route pengukuran yang sudah ada
app.use("/api/measurement", measurementRoutes);

// Jalankan server
async function startServer() {
    await checkSerialConnection();

    app.listen(PORT, () => {
      console.log("");
      console.log("================================");
      console.log("  SERENITY SR-HW03");
      console.log("  Body Measurement System");
      console.log("================================");  
      console.log(`  USB-Serial : ${serialStatus.connected ? serialStatus.port : "Menunggu adapter"}`);
      console.log("  Status     : Berjalan");
      console.log("================================");
      console.log("");
    });

    setInterval(checkSerialConnection, CHECK_INTERVAL);
}

startServer();  