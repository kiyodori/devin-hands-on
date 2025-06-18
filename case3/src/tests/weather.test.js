const { getCurrentWeather, formatTemperature, isSevereWeather } = require('../utils/weather.js');
const axios = require('axios');

jest.mock('axios');
const mockedAxios = axios;

describe('Weather utility functions', () => {
  describe('getCurrentWeather', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should throw error when location is not provided', async () => {
      await expect(getCurrentWeather()).rejects.toThrow('Location is required');
      await expect(getCurrentWeather('')).rejects.toThrow('Location is required');
      await expect(getCurrentWeather(null)).rejects.toThrow('Location is required');
    });

    test('should return weather object with valid location', async () => {
      const mockResponse = {
        data: {
          current_condition: [{
            temp_C: '25',
            weatherDesc: [{ value: 'Partly cloudy' }],
            humidity: '60',
            FeelsLikeC: '27',
            pressure: '1013',
            visibility: '10',
            uvIndex: '5'
          }]
        }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      const result = await getCurrentWeather('Tokyo');
      
      expect(result).toHaveProperty('location', 'Tokyo');
      expect(result).toHaveProperty('temperature', 25);
      expect(result).toHaveProperty('condition', 'Partly cloudy');
      expect(result).toHaveProperty('humidity', 60);
      expect(result).toHaveProperty('feelsLike', 27);
      expect(result).toHaveProperty('pressure', 1013);
      expect(result).toHaveProperty('visibility', 10);
      expect(result).toHaveProperty('uvIndex', 5);
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('raw');
      expect(typeof result.timestamp).toBe('string');
    });

    test('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      networkError.code = 'ENOTFOUND';
      mockedAxios.get.mockRejectedValue(networkError);
      
      await expect(getCurrentWeather('Tokyo')).rejects.toThrow('Network error: Unable to connect to weather service');
    });

    test('should handle location not found errors', async () => {
      const notFoundError = new Error('Not Found');
      notFoundError.response = { status: 404 };
      mockedAxios.get.mockRejectedValue(notFoundError);
      
      await expect(getCurrentWeather('InvalidCity')).rejects.toThrow('Location not found: InvalidCity');
    });

    test('should handle timeout errors', async () => {
      const timeoutError = new Error('Timeout');
      timeoutError.code = 'ECONNABORTED';
      mockedAxios.get.mockRejectedValue(timeoutError);
      
      await expect(getCurrentWeather('Tokyo')).rejects.toThrow('Request timeout: Weather service is not responding');
    });

    test('should handle generic API errors', async () => {
      const genericError = new Error('API Error');
      mockedAxios.get.mockRejectedValue(genericError);
      
      await expect(getCurrentWeather('Tokyo')).rejects.toThrow('Failed to fetch weather data: API Error');
    });

    test('should properly encode location with special characters', async () => {
      const mockResponse = {
        data: {
          current_condition: [{
            temp_C: '20',
            weatherDesc: [{ value: 'Clear' }],
            humidity: '50',
            FeelsLikeC: '22',
            pressure: '1015',
            visibility: '15',
            uvIndex: '3'
          }]
        }
      };
      
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await getCurrentWeather('São Paulo');
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://wttr.in/S%C3%A3o%20Paulo?format=j1',
        expect.objectContaining({
          timeout: 10000,
          headers: {
            'User-Agent': 'weather-cli/1.0.0'
          }
        })
      );
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
