import { describe, test, expect } from '@jest/globals';
import { getWeatherData } from './weather.js';

describe('Weather CLI', () => {
  test('should return weather data for Tokyo', () => {
    const result = getWeatherData('Tokyo');
    
    expect(result).toHaveProperty('location', 'Tokyo');
    expect(result).toHaveProperty('coords');
    expect(result.coords).toHaveProperty('lat', 35.6895);
    expect(result.coords).toHaveProperty('lon', 139.6917);
    expect(result).toHaveProperty('weather', '快晴');
    expect(result).toHaveProperty('temp');
    expect(result.temp).toHaveProperty('current', 26.3);
  });

  test('should return weather data for any city', () => {
    const result = getWeatherData('Osaka');
    
    expect(result).toHaveProperty('location', 'Osaka');
    expect(result).toHaveProperty('coords');
    expect(result).toHaveProperty('weather', '快晴');
  });

  test('should have all required properties', () => {
    const result = getWeatherData('Tokyo');
    
    expect(result).toHaveProperty('location');
    expect(result).toHaveProperty('coords');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('weather');
    expect(result).toHaveProperty('temp');
    expect(result).toHaveProperty('humidity');
    expect(result).toHaveProperty('pressure');
    expect(result).toHaveProperty('wind');
    expect(result).toHaveProperty('clouds');
    expect(result).toHaveProperty('sunrise');
    expect(result).toHaveProperty('sunset');
  });

  test('should return correct data structure', () => {
    const result = getWeatherData('Tokyo');
    
    expect(typeof result.location).toBe('string');
    expect(typeof result.coords).toBe('object');
    expect(typeof result.timestamp).toBe('number');
    expect(typeof result.weather).toBe('string');
    expect(typeof result.temp).toBe('object');
    expect(typeof result.humidity).toBe('number');
    expect(typeof result.pressure).toBe('number');
    expect(typeof result.wind).toBe('object');
    expect(typeof result.clouds).toBe('number');
    expect(typeof result.sunrise).toBe('number');
    expect(typeof result.sunset).toBe('number');
  });
});
