<script>
    import { onMount, onDestroy } from 'svelte';

    const GRID_SIZE = 20;
    const CELL_SIZE = 20;
    const INITIAL_SNAKE = [{ x: 10, y: 10 }];
    const INITIAL_DIRECTION = { dx: 1, dy: 0 };

    let snake = [...INITIAL_SNAKE];
    let direction = { ...INITIAL_DIRECTION };
    let food = generateFood();
    let score = 0;
    let gameOver = false;
    let intervalId;

    function startGame() {
        snake = [...INITIAL_SNAKE];
        direction = { ...INITIAL_DIRECTION };
        score = 0;
        gameOver = false;
        food = generateFood();
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(moveSnake, 150);
    }

    function generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }

    function moveSnake() {
        if (gameOver) return;

        const head = { ...snake[0] };
        const newHead = {
            x: head.x + direction.dx,
            y: head.y + direction.dy
        };

        // Wall collision check
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || 
            newHead.y < 0 || newHead.y >= GRID_SIZE) {
            gameOver = true;
            return;
        }

        // Self collision check
        if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            gameOver = true;
            return;
        }

        const newSnake = [newHead, ...snake];

        // Food consumption check
        if (newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            food = generateFood();
        } else {
            newSnake.pop();
        }

        snake = newSnake;
    }

    function handleKeydown(event) {
        if (gameOver) return;

        switch(event.key) {
            case 'ArrowUp':
                if (direction.dy === 1) return;
                direction = { dx: 0, dy: -1 };
                break;
            case 'ArrowDown':
                if (direction.dy === -1) return;
                direction = { dx: 0, dy: 1 };
                break;
            case 'ArrowLeft':
                if (direction.dx === 1) return;
                direction = { dx: -1, dy: 0 };
                break;
            case 'ArrowRight':
                if (direction.dx === -1) return;
                direction = { dx: 1, dy: 0 };
                break;
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        window.removeEventListener('keydown', handleKeydown);
        if (intervalId) clearInterval(intervalId);
    });
</script>

<main>
    <div class="game-container">
        <div class="score">Score: {score}</div>
        <button on:click={startGame}>{gameOver ? 'Restart' : 'Start Game'}</button>
        
        <div class="board">
            {#each Array(GRID_SIZE * GRID_SIZE) as _, i}
                {@const x = i % GRID_SIZE}
                {@const y = Math.floor(i / GRID_SIZE)}
                <div
                    class:cell={true}
                    class:snake={snake.some(segment => segment.x === x && segment.y === y)}
                    class:food={food.x === x && food.y === y}
                />
            {/each}
        </div>

        {#if gameOver}
            <div class="game-over">Game Over!</div>
        {/if}
    </div>
</main>

<style>
    .game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px;
        background-color: #2c3e50;
        min-height: 100vh;
    }

    .score {
        font-size: 32px;
        color: #ecf0f1;
        font-weight: bold;
    }

    button {
        padding: 12px 24px;
        font-size: 18px;
        background-color: #27ae60;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #219a52;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(20, 20px);
        gap: 1px;
        background-color: #34495e;
        padding: 2px;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
    }

    .cell {
        width: {CELL_SIZE}px;
        height: {CELL_SIZE}px;
        background-color: #2c3e50;
        transition: background-color 0.1s;
    }

    .snake {
        background-color: #2ecc71 !important;
        border-radius: 3px;
    }

    .food {
        background-color: #e74c3c !important;
        border-radius: 50%;
        transform: scale(0.8);
        animation: pulse 1s infinite;
    }

    .game-over {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 72px;
        color: #e74c3c;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        font-weight: bold;
    }

    @keyframes pulse {
        0% { transform: scale(0.8); }
        50% { transform: scale(1); }
        100% { transform: scale(0.8); }
    }
</style>