# Weather CLI

A command-line tool to fetch and display weather information for any city using the OpenWeatherMap API.

## Features

- 🌤️ Fetch current weather data for any city
- 🎨 Colorful terminal output with emojis
- 📋 Display both formatted and raw JSON data
- ⚡ Fast and lightweight
- 🛡️ Proper error handling for invalid cities and API issues

## Installation

1. Clone this repository
2. Navigate to the weather-cli directory
3. Install dependencies:

```bash
npm install
```

## Setup

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Add your API key to the `.env` file:

```
OPENWEATHER_API_KEY=your_api_key_here
```

## Usage

### Basic Usage

```bash
node weather.js <city_name>
```

### Examples

```bash
# Get weather for Tokyo
node weather.js Tokyo

# Get weather for New York
node weather.js "New York"

# Get weather for London
node weather.js London
```

### Help

```bash
node weather.js --help
```

## Sample Output

```
🔍 Fetching weather data for Tokyo...

🌤️  Weather Information
══════════════════════════════════════════════════
📍 Location: Tokyo, JP
🌡️  Temperature: 25.5°C (feels like 27.2°C)
☁️  Condition: Clear - clear sky
💨 Wind Speed: 3.2 m/s
💧 Humidity: 65%
🔽 Pressure: 1013 hPa
👁️  Visibility: 10.0 km
══════════════════════════════════════════════════

📋 Raw JSON Data:
{
  "name": "Tokyo",
  "sys": {
    "country": "JP"
  },
  "main": {
    "temp": 25.5,
    "feels_like": 27.2,
    "humidity": 65,
    "pressure": 1013
  },
  "weather": [
    {
      "main": "Clear",
      "description": "clear sky"
    }
  ],
  "wind": {
    "speed": 3.2
  },
  "visibility": 10000
}
```

## Error Handling

The CLI handles various error scenarios:

- **Invalid API Key**: Prompts to set the `OPENWEATHER_API_KEY` environment variable
- **City Not Found**: Shows a clear error message for invalid city names
- **Network Issues**: Displays appropriate error messages for connection problems

## Testing

Run the test suite:

```bash
npm test
```

## Demo Mode

For testing without an API key, you can use the demo mode:

```bash
DEMO_MODE=true node weather.js Tokyo
```

This will display sample weather data with the same colorful formatting.

## Dependencies

- **axios**: HTTP client for API requests
- **chalk**: Terminal styling and colors
- **commander**: Command-line argument parsing
- **dotenv**: Environment variable management

## API

This tool uses the [OpenWeatherMap Current Weather Data API](https://openweathermap.org/current).

## License

MIT License
