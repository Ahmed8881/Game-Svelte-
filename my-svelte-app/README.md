# My Svelte Snake Game

This project is a simple Snake game built using Svelte. The game allows players to control a snake that grows in length as it consumes food, while avoiding collisions with the walls and itself.

## Project Structure

```
my-svelte-app
├── public
│   └── index.html        # Main HTML file for the application
├── src
│   ├── App.svelte       # Main Svelte component containing game logic
│   ├── main.js          # Entry point of the application
│   └── styles.css       # CSS styles for the application
├── package.json          # npm configuration file
├── rollup.config.js      # Rollup configuration for building the app
└── README.md             # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-svelte-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5000` to see the game in action.

## Game Controls

- Use the arrow keys to control the direction of the snake.
- Press the "Start Game" button to begin playing.
- The game will end if the snake collides with the walls or itself.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.