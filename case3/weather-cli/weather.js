#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

const weatherData = {
  "location": "Tokyo",
  "coords": { "lat": 35.6895, "lon": 139.6917 },
  "timestamp": 1718179200,
  "weather": "快晴",
  "temp": {
    "current": 26.3,
    "feels_like": 27.1,
    "min": 24.0,
    "max": 29.0
  },
  "humidity": 58,
  "pressure": 1013,
  "wind": { "speed": 3.5, "deg": 180 },
  "clouds": 0,
  "sunrise": 1718145600,
  "sunset": 1718196000
};

function getWeatherData(city) {
  const data = { ...weatherData };
  data.location = city;
  return data;
}

program
  .name('weather-cli')
  .description('Simple weather CLI tool')
  .version('1.0.0')
  .argument('<city>', 'city name to get weather for')
  .action((city) => {
    const weather = getWeatherData(city);
    console.log(JSON.stringify(weather, null, 2));
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse();
}

export { getWeatherData };
