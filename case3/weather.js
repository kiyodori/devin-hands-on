#!/usr/bin/env node

const { Command } = require('commander');
const { getCurrentWeather } = require('./src/utils/weather.js');

const program = new Command();

program
  .name('weather')
  .description('Get current weather information for a city')
  .version('1.0.0')
  .argument('<city>', 'City name to get weather for')
  .action(async (city) => {
    try {
      const weather = await getCurrentWeather(city);
      console.log(JSON.stringify(weather, null, 2));
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
