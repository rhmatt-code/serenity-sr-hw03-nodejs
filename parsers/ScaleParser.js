function parseScaleData(raw) {
    const text = raw.trim();

    const fields = text.split(';');
    const data = {};

    for (const field of fields){
        const [key, value] = field.split('=');

        if (!key || value === undefined){
            throw new Error(`Format data tidak valid: ${field}`);
            
        }

        data[key.trim().toUpperCase()] = Number(value.trim());

        if (!Number.isFinite(data[key.trim().toUpperCase()])){
            throw new Error(`Nilai bukan angka: ${field}`);
        }
    }

    const requiredFields = [
        'WEIGHT',
        'HEIGHT',
        'FAT',
        'WATER',
        'MUSCLE',
        'BONE',
    ];

    for (const field of requiredFields){
        if (!(field in data)){
            throw new Error(`Field ${field} tidak ditemukan`);
        }
    }

    if (data.WEIGHT <= 0 || data.HEIGHT <= 0){
        throw new Error('Berat dan tinggi harus lebih dari 0');
    }

    return {
        weight: data.WEIGHT,
        height: data.HEIGHT,
        body_fat: data.FAT,
        body_water: data.WATER,
        muscle: data.MUSCLE,
        bone: data.BONE,
    };
}

module.exports = { parseScaleData };