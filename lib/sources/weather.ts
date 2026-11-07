import { count, getJson, isRecord } from '@/lib/http';

/**
 * Current weather at the reader's location.
 *
 * Asking for a position is part of the same read: a refusal comes back as a
 * failed load with a reason a person can read, not as a second state the
 * widget has to handle.
 */

export type Weather = {
  temperature: number;
  windSpeed: number;
};

function locate(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, () => {
      reject(new Error('Location access denied'));
    });
  });
}

export async function loadWeather(signal: AbortSignal): Promise<Weather> {
  const { coords } = await locate();
  const payload = await getJson(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`,
    signal,
  );

  const current = isRecord(payload) ? payload.current_weather : undefined;
  if (!isRecord(current)) throw new Error('Weather unavailable');

  return {
    temperature: count(current.temperature),
    windSpeed: count(current.windspeed),
  };
}
