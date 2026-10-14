
function getMeasurement() {
    return {
        member_id: 123,
        weight: 70.5,
        height: 172,
        body_fat: 19.9,
        muscle: 30.9,
    };
}

function validateMeasurement(data) {
    const requiredFields = [
        'member_id',
        'weight',
        'height',
        'body_fat',
        'muscle',
    ];

    for (const field of requiredFields) {
        if (data[field] === undefined || data[field] === null) {
            return {
                valid: false,
                message: `Field ${field} wajib diisi`,
            };
        }
    }

    if (!Number.isInteger(data.member_id) || data.member_id <= 0) {
        return {
            valid: false,
            message: 'member_id harus berupa bilangan bulat positif',
        };
    }

    for (const field of ['weight', 'height', 'body_fat', 'muscle']) {
        if (!Number.isFinite(Number(data[field]))) {
            return {
                valid: false,
                message: `Field ${field} harus berupa angka`,
            };
        }
    }

    if (data.weight <= 0 || data.height <= 0) {
        return {
            valid: false,
            message: 'Berat dan tinggi harus lebih besar dari nol',
        };
    }

    if (data.body_fat < 0 || data.body_fat > 100) {
        return {
            valid: false,
            message: 'body_fat harus berada di antara 0 dan 100',
        };
    }

    if (data.muscle < 0) {
        return {
            valid: false,
            message: 'muscle tidak boleh negatif',
        };
    }

    return {
        valid: true,
        message: 'Data pengukuran valid',
    };
}

module.exports = {
    getMeasurement,
    validateMeasurement,
};
