const { getCurrentWeather, formatTemperature, isSevereWeather } = require('../utils/weather.js');

describe('Weather utility functions', () => {
  describe('getCurrentWeather', () => {
    test('should throw error when location is not provided', async () => {
      await expect(getCurrentWeather()).rejects.toThrow('Location is required');
      await expect(getCurrentWeather('')).rejects.toThrow('Location is required');
      await expect(getCurrentWeather(null)).rejects.toThrow('Location is required');
    });

    test('should return weather object with valid location', async () => {
      const result = await getCurrentWeather('Tokyo');
      
      expect(result).toHaveProperty('location', 'Tokyo');
      expect(result).toHaveProperty('temperature');
      expect(result).toHaveProperty('condition');
      expect(result).toHaveProperty('humidity');
      expect(result).toHaveProperty('timestamp');
      expect(typeof result.temperature).toBe('number');
      expect(typeof result.condition).toBe('string');
      expect(typeof result.humidity).toBe('number');
    });
  });

  describe('formatTemperature', () => {
    test('should format temperature in Celsius by default', () => {
      expect(formatTemperature(25)).toBe('25.0°C');
      expect(formatTemperature(0)).toBe('0.0°C');
      expect(formatTemperature(-10)).toBe('-10.0°C');
    });

    test('should format temperature in Fahrenheit when specified', () => {
      expect(formatTemperature(0, 'F')).toBe('32.0°F');
      expect(formatTemperature(25, 'F')).toBe('77.0°F');
      expect(formatTemperature(-10, 'F')).toBe('14.0°F');
    });

    test('should handle decimal temperatures', () => {
      expect(formatTemperature(25.5)).toBe('25.5°C');
      expect(formatTemperature(25.7, 'F')).toBe('78.3°F');
    });

    test('should throw error for non-number temperature', () => {
      expect(() => formatTemperature('25')).toThrow('Temperature must be a number');
      expect(() => formatTemperature(null)).toThrow('Temperature must be a number');
      expect(() => formatTemperature(undefined)).toThrow('Temperature must be a number');
    });
  });

  describe('isSevereWeather', () => {
    test('should return true for severe weather conditions', () => {
      expect(isSevereWeather('storm')).toBe(true);
      expect(isSevereWeather('Hurricane winds')).toBe(true);
      expect(isSevereWeather('Tornado warning')).toBe(true);
      expect(isSevereWeather('Blizzard conditions')).toBe(true);
      expect(isSevereWeather('Flash flood')).toBe(true);
    });

    test('should return false for normal weather conditions', () => {
      expect(isSevereWeather('sunny')).toBe(false);
      expect(isSevereWeather('cloudy')).toBe(false);
      expect(isSevereWeather('light rain')).toBe(false);
      expect(isSevereWeather('partly cloudy')).toBe(false);
    });

    test('should handle case insensitive matching', () => {
      expect(isSevereWeather('STORM')).toBe(true);
      expect(isSevereWeather('Storm')).toBe(true);
      expect(isSevereWeather('SUNNY')).toBe(false);
    });

    test('should return false for non-string input', () => {
      expect(isSevereWeather(null)).toBe(false);
      expect(isSevereWeather(undefined)).toBe(false);
      expect(isSevereWeather(123)).toBe(false);
      expect(isSevereWeather({})).toBe(false);
    });
  });
});
