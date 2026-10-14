function readScaleData() {
  return {
    member_id: 123,
    weight: 70.8,
    height: 170,
    body_fat: 19.9,
    body_water: 55.2,
    muscle: 30.9,
    bone: 3.1,
    measured_at: new Date().toLocaleString('sv-SE', {timeZone: 'Asia/Jakarta'}).replace(' ', 'T')
  };
}

module.exports = { readScaleData };
