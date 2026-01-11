/**
 * Snake Game - Mini Game for Portfolio Website
 * Styled to match the neon/cyberpunk theme
 */

class SnakeGame {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.gridSize = 20;
    this.tileCount = 20;
    this.snake = [{ x: 10, y: 10 }];
    this.food = { x: 15, y: 15 };
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.gameRunning = false;
    this.gameLoop = null;
    this.gameSpeed = 150;
    
    this.init();
  }

  init() {
    this.canvas = document.getElementById('snake-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.tileCount * this.gridSize;
    this.canvas.height = this.tileCount * this.gridSize;
    
    this.setupEventListeners();
    this.draw();
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (!this.gameRunning) return;
      
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      
      const keyPressed = e.keyCode;
      const goingUp = this.dy === -1;
      const goingDown = this.dy === 1;
      const goingRight = this.dx === 1;
      const goingLeft = this.dx === -1;

      if (keyPressed === LEFT_KEY && !goingRight) {
        this.dx = -1;
        this.dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        this.dx = 0;
        this.dy = -1;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        this.dx = 1;
        this.dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        this.dx = 0;
        this.dy = 1;
      }
    });

    // Touch controls for mobile
    let touchStartX = null;
    let touchStartY = null;

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    this.canvas.addEventListener('touchend', (e) => {
      if (!touchStartX || !touchStartY || !this.gameRunning) return;
      e.preventDefault();
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      
      const goingUp = this.dy === -1;
      const goingDown = this.dy === 1;
      const goingRight = this.dx === 1;
      const goingLeft = this.dx === -1;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0 && !goingLeft) {
          this.dx = 1;
          this.dy = 0;
        } else if (dx < 0 && !goingRight) {
          this.dx = -1;
          this.dy = 0;
        }
      } else {
        // Vertical swipe
        if (dy > 0 && !goingUp) {
          this.dx = 0;
          this.dy = 1;
        } else if (dy < 0 && !goingDown) {
          this.dx = 0;
          this.dy = -1;
        }
      }
      
      touchStartX = null;
      touchStartY = null;
    });
  }

  start() {
    if (this.gameRunning) return;
    
    this.gameRunning = true;
    this.score = 0;
    this.snake = [{ x: 10, y: 10 }];
    this.dx = 0;
    this.dy = 0;
    this.generateFood();
    this.updateScore();
    
    this.gameLoop = setInterval(() => {
      this.update();
      this.draw();
    }, this.gameSpeed);
  }

  stop() {
    this.gameRunning = false;
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
  }

  reset() {
    this.stop();
    this.snake = [{ x: 10, y: 10 }];
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.generateFood();
    this.updateScore();
    this.draw();
  }

  update() {
    if (!this.gameRunning) return;

    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

    // Check wall collision
    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      this.gameOver();
      return;
    }

    // Check self collision
    for (let segment of this.snake) {
      if (head.x === segment.x && head.y === segment.y) {
        this.gameOver();
        return;
      }
    }

    this.snake.unshift(head);

    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.updateScore();
      this.generateFood();
      
      // Increase speed slightly
      if (this.score % 50 === 0 && this.gameSpeed > 80) {
        this.gameSpeed -= 5;
        this.stop();
        this.gameLoop = setInterval(() => {
          this.update();
          this.draw();
        }, this.gameSpeed);
      }
    } else {
      this.snake.pop();
    }
  }

  generateFood() {
    do {
      this.food = {
        x: Math.floor(Math.random() * this.tileCount),
        y: Math.floor(Math.random() * this.tileCount)
      };
    } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= this.tileCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.gridSize, 0);
      this.ctx.lineTo(i * this.gridSize, this.canvas.height);
      this.ctx.stroke();
      
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.gridSize);
      this.ctx.lineTo(this.canvas.width, i * this.gridSize);
      this.ctx.stroke();
    }

    // Draw snake
    this.snake.forEach((segment, index) => {
      const x = segment.x * this.gridSize;
      const y = segment.y * this.gridSize;
      
      // Head has different color
      if (index === 0) {
        this.ctx.fillStyle = '#00ffff';
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#00ffff';
      } else {
        this.ctx.fillStyle = '#00ffff';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = '#00ffff';
      }
      
      this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
    });
    this.ctx.shadowBlur = 0;

    // Draw food
    const foodX = this.food.x * this.gridSize;
    const foodY = this.food.y * this.gridSize;
    this.ctx.fillStyle = '#ff00ff';
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = '#ff00ff';
    this.ctx.beginPath();
    this.ctx.arc(
      foodX + this.gridSize / 2,
      foodY + this.gridSize / 2,
      this.gridSize / 2 - 2,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  updateScore() {
    const scoreElement = document.getElementById('snake-score');
    if (scoreElement) {
      scoreElement.textContent = this.score;
    }
  }

  gameOver() {
    this.stop();
    const gameOverElement = document.getElementById('snake-game-over');
    const finalScoreElement = document.getElementById('final-score');
    if (gameOverElement) {
      gameOverElement.style.display = 'block';
    }
    if (finalScoreElement) {
      finalScoreElement.textContent = this.score;
    }
  }
}

// Game modal management
let snakeGameInstance = null;

function openSnakeGame() {
  const modal = document.getElementById('snake-game-modal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize game if not already done
    if (!snakeGameInstance) {
      setTimeout(() => {
        snakeGameInstance = new SnakeGame();
      }, 100);
    } else {
      snakeGameInstance.reset();
    }
  }
}

function closeSnakeGame() {
  const modal = document.getElementById('snake-game-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (snakeGameInstance) {
      snakeGameInstance.stop();
    }
  }
}

function startSnakeGame() {
  if (snakeGameInstance) {
    snakeGameInstance.start();
    const startBtn = document.getElementById('snake-start-btn');
    const gameOverElement = document.getElementById('snake-game-over');
    if (startBtn) startBtn.style.display = 'none';
    if (gameOverElement) gameOverElement.style.display = 'none';
  }
}

function restartSnakeGame() {
  if (snakeGameInstance) {
    snakeGameInstance.reset();
    const startBtn = document.getElementById('snake-start-btn');
    const gameOverElement = document.getElementById('snake-game-over');
    if (startBtn) startBtn.style.display = 'block';
    if (gameOverElement) gameOverElement.style.display = 'none';
  }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('snake-game-modal');
  if (modal && e.target === modal) {
    closeSnakeGame();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('snake-game-modal');
    if (modal && modal.classList.contains('active')) {
      closeSnakeGame();
    }
  }
});
