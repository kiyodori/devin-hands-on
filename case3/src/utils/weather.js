/**
 * Weather utility functions
 * This module provides functions for weather data processing
 */

/**
 * Get current weather information
 * @param {string} location - Location to get weather for
 * @returns {Promise<Object>} Weather data object
 */
async function getCurrentWeather(location) {
  if (!location) {
    throw new Error('Location is required');
  }
  
  return {
    location: location,
    temperature: 0,
    condition: 'unknown',
    humidity: 0,
    timestamp: new Date().toISOString()
  };
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
