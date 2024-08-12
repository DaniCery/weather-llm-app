// rest-client.ts
import axios from "axios";
export const getWeatherData = async (longitude: string, latitude: string, timezone: string) => {
    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                longitude,
                latitude,
                timezone,
                current: 'weather_code,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m',
                daily: 'apparent_temperature_max,apparent_temperature_min,sunrise,sunset,temperature_2m_max,temperature_2m_min,uv_index_max',
                hourly: 'apparent_temperature,dew_point_2m,precipitation_probability,relative_humidity_2m,temperature_2m,uv_index,rain,snowfall'
            }
        });
        console.log("Response URL:", response.config.url); // Mostra l'URL completo
        console.log("Response Data:", response.data); // Mostra i dati della risposta
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error; // Rilancia l'errore per la gestione nel componente
    }
};
