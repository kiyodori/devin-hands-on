/**
 * Weather utility functions
 * This module provides functions for weather data processing
 */

const axios = require('axios');

/**
 * Get current weather information from wttr.in API
 * @param {string} location - Location to get weather for
 * @returns {Promise<Object>} Weather data object
 */
async function getCurrentWeather(location) {
  if (!location) {
    throw new Error('Location is required');
  }
  
  try {
    const response = await axios.get(`https://wttr.in/${encodeURIComponent(location)}?format=j1`, {
      timeout: 10000,
      headers: {
        'User-Agent': 'weather-cli/1.0.0'
      }
    });
    
    const data = response.data;
    const currentCondition = data.current_condition[0];
    
    return {
      location: location,
      temperature: parseInt(currentCondition.temp_C),
      condition: currentCondition.weatherDesc[0].value,
      humidity: parseInt(currentCondition.humidity),
      feelsLike: parseInt(currentCondition.FeelsLikeC),
      pressure: parseInt(currentCondition.pressure),
      visibility: parseInt(currentCondition.visibility),
      uvIndex: parseInt(currentCondition.uvIndex),
      timestamp: new Date().toISOString(),
      raw: data
    };
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      throw new Error('Network error: Unable to connect to weather service');
    } else if (error.response && error.response.status === 404) {
      throw new Error(`Location not found: ${location}`);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout: Weather service is not responding');
    } else {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }
}

/**
 * Format temperature value
 * @param {number} temperature - Temperature in Celsius
 * @param {string} unit - Temperature unit ('C' or 'F')
 * @returns {string} Formatted temperature string
 */
function formatTemperature(temperature, unit = 'C') {
  if (typeof temperature !== 'number') {
    throw new Error('Temperature must be a number');
  }
  
  if (unit === 'F') {
    const fahrenheit = (temperature * 9/5) + 32;
    return `${fahrenheit.toFixed(1)}°F`;
  }
  
  return `${temperature.toFixed(1)}°C`;
}

/**
 * Check if weather condition is severe
 * @param {string} condition - Weather condition
 * @returns {boolean} True if severe weather condition
 */
function isSevereWeather(condition) {
  if (typeof condition !== 'string') {
    return false;
  }
  
  const severeConditions = ['storm', 'hurricane', 'tornado', 'blizzard', 'flood'];
  return severeConditions.some(severe => 
    condition.toLowerCase().includes(severe)
  );
}

module.exports = {
  getCurrentWeather,
  formatTemperature,
  isSevereWeather
};
