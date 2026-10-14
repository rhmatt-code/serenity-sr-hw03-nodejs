
async function sendMeasurement(measurement) {
    const apiBaseUrl = process.env.LARAVEL_API_URL;

    if (!apiBaseUrl) {
        throw new Error('LARAVEL_API_URL belum diatur di .env');
    }

    const payload = {
        weight: measurement.weight,
        height: measurement.height,
        body_fat: measurement.body_fat,
        body_water: measurement.body_water,
        muscle: measurement.muscle,
        bone: measurement.bone,
        measured_at: measurement.measured_at,
    };

    console.log('URL Laravel:', `${apiBaseUrl}/body-measurements`);
    console.log('Payload:', JSON.stringify(payload, null, 2));

    let response;

    try {
        response = await fetch(
            `${apiBaseUrl.replace(/\/$/, '')}/scale/current`,
            {
                method: 'POST',
              headers: {
                Authorization: `Bearer ${process.env.SCALE_API_TOKEN}`,
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        );
    } catch (error) {
        throw new Error(
            `Tidak dapat terhubung ke Laravel: ${error.message}`
        );
    }

  const responseText = await response.text();
  const token = process.env.SCALE_API_TOKEN;
    console.log("Ini harusnya token: ", token);
    console.log('HTTP Status:', response.status);
    console.log('Respons mentah:', responseText);

    let result;

    try {
        result = JSON.parse(responseText);
    } catch {
        throw new Error(
            `Laravel mengirim respons bukan JSON. HTTP ${response.status}`
        );
    }

    if (!response.ok) {
        throw new Error(
            `Laravel HTTP ${response.status}: ${JSON.stringify(result)}`
        );
    }

    return result;
}

module.exports = { sendMeasurement };
