const { readScaleData } = require("./simulators/scaleSimulator");

const data = readScaleData();

console.log("Data simulasi timbangan:");
console.log(JSON.stringify(data, null, 2));
