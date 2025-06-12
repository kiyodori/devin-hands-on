#!/usr/bin/env node

import { Command } from 'commander';
import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();

const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const DEMO_MODE = process.env.DEMO_MODE === 'true';

const demoWeatherData = {
  name: 'Tokyo',
  sys: { country: 'JP' },
  main: {
    temp: 25.5,
    feels_like: 27.2,
    humidity: 65,
    pressure: 1013
  },
  weather: [{ main: 'Clear', description: 'clear sky' }],
  wind: { speed: 3.2 },
  visibility: 10000
};

async function getWeather(city) {
  if (DEMO_MODE) {
    console.log(chalk.yellow('🎭 Demo mode enabled - showing sample data'));
    return { ...demoWeatherData, name: city };
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please set OPENWEATHER_API_KEY environment variable.');
    } else if (error.response?.status === 404) {
      throw new Error(`City "${city}" not found.`);
    } else {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }
}

function displayWeather(weatherData) {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main: weatherMain, description }],
    wind: { speed },
    visibility
  } = weatherData;

  console.log(chalk.blue.bold('\n🌤️  Weather Information'));
  console.log(chalk.yellow('═'.repeat(50)));
  
  console.log(chalk.green.bold(`📍 Location: ${name}, ${country}`));
  console.log(chalk.cyan(`🌡️  Temperature: ${temp}°C (feels like ${feels_like}°C)`));
  console.log(chalk.magenta(`☁️  Condition: ${weatherMain} - ${description}`));
  console.log(chalk.blue(`💨 Wind Speed: ${speed} m/s`));
  console.log(chalk.white(`💧 Humidity: ${humidity}%`));
  console.log(chalk.gray(`🔽 Pressure: ${pressure} hPa`));
  console.log(chalk.gray(`👁️  Visibility: ${visibility ? (visibility / 1000).toFixed(1) + ' km' : 'N/A'}`));
  
  console.log(chalk.yellow('═'.repeat(50)));
  
  console.log(chalk.dim('\n📋 Raw JSON Data:'));
  console.log(JSON.stringify(weatherData, null, 2));
}

program
  .name('weather')
  .description('CLI tool to fetch weather information')
  .version('1.0.0')
  .argument('<city>', 'city name to get weather for')
  .action(async (city) => {
    try {
      console.log(chalk.blue(`🔍 Fetching weather data for ${city}...`));
      const weatherData = await getWeather(city);
      displayWeather(weatherData);
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();
