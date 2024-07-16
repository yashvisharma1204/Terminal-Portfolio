document.getElementById('command-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim();
        const output = document.getElementById('output');

        // Process the command
        let commandOutput = '';
        switch (input) {
            case 'help':
                commandOutput = `
                    <p>Welcome to the Help Menu!</p>
                    <p>Here are some commands to try out:</p>
                    <ul>
                        <li><span class='one'>whoami -</span> <span class='two'>display information about me</span></li>
                        <li><span class='one'>education -</span> <span class='two'>show my education background</span></li>
                        <li><span class='one'>experience -</span> <span class='two'>show my work experience</span></li>
                        <li><span class='one'>skills -</span> <span class='two'>list my skills</span></li>
                        <li><span class='one'>projects -</span> <span class='two'>show my projects</span></li>
                        <li><span class='one'>GUI -</span> <span class='two'>switch to GUI mode</span></li>
                        <li><span class='one'>contact -</span> <span class='two'>show my contact information</span></li>
                        <li><span class='one'>bore -</span> <span class='two'>play a snake game</span></li>
                    </ul>
                `;
                break;
            case 'whoami':
                commandOutput = `
                    <p><span style='color:#8CC63F'>Hello, I'm Yashvi Sharma!</p>
                    <ul>
                        <li><span class='three'>> Second-year Computer Science and Engineering student</span> </li>
                        <li><span class='three'>> Specializing in AI and Data Engineering</span> </li>
                        <li><span class='three'>> Studying at Lovely Professional University</span> </li>
                        <li><span class='three'>> Excited about the intersection of technology and innovation</span> </li>
                    </ul>
                `;
                break;
            case 'education':
                commandOutput = `
                    <p><span class="command-output">Education:</span></p>
                    <ul>
                        <li><span class="three">> 2023-Present: B.Tech in CSE, Lovely Professional University, Phagwara, Punjab</span></li>
                        <li><span class="three">> 2019-2021: Senior Secondary Certificate, Delhi International School, Delhi</span></li>
                        <li><span class="three">> 2017-2019: Secondary Certificate, Delhi International School, Delhi</span></li>
                    </ul>
                `;
                break;
            case 'experience':
                commandOutput = `
                    <p><span class="command-output">Experience:</span></p>
                    <ul>
                        <li><span class="three">> Strategy and Operations Intern</span> <b>Chamberly AB</b>, Started in July 2024</li>
                    </ul>
                `;
                break;
            case 'skills':
                commandOutput = `
                    <p><span class="command-output">Skills:</span></p>
                    <ul>
                        <li><span class="three">> HTML, CSS, JavaScript</span></li>
                        <li><span class="three">> C, C++, Python</span></li>
                        <li><span class="three">> MySQL</span></li>
                        <li><span class="three">> Machine Learning</span></li>
                        <li><span class="three">> Data Analysis and Visualization</span></li>
                        <li><span class="three">> Restful APIs</span></li>
                        <li><span class="three">> Langchain</span></li>
                        <li><span class="three">> Generative AI</span></li>
                    </ul>
                `;
                break;
            case 'projects':
                commandOutput = `
                    <p><span class="command-output">Projects:</span></p>
                    <ul>
                        <li><span class="three">> Medical Assistance System using Langchain, OpenAI API, and Tkinter</span></li>
                        <li><span class="three">> LMS using Python and SQL</span></li>
                        <li><span class="three">> To-do App using Python and Tkinter</span></li>
                        <li><span class="three">> Sustainable Land Website using HTML, CSS, and JavaScript</span></li>
                    </ul>
                    <p>For more projects, check my GitHub: <a href="https://github.com/yashvisharma1204" target="_blank">https://github.com/yashvisharma1204</a></p>
                `;
                break;
            case 'GUI':
                commandOutput = '<p class="command-output">Redirecting to GUI Website...</p>';
                setTimeout(() => {
                    window.location.href = 'https://yashvisharma1204.github.io/Portfolio/'; // Replace with your actual GUI website URL
                }, 2000); // 2 seconds delay before redirecting
                break;
            case 'contact':
                commandOutput = `
                    <p><span class="command-output">Contact Information:</span></p>
                    <ul>
                        <li><span class="three">Email: yashvisharma503@gmail.com</span></li>
                        <li><span class="three">LinkedIn: <a href="https://www.linkedin.com/in/yashvi-sharma-150863220/" target="_blank">https://www.linkedin.com/in/yashvi-sharma-150863220/</a></span></li>
                    </ul>
                `;
                break;
            case 'bore':
                commandOutput = '<p class="command-output">Starting Snake Game...<br>> Press "X" to close the game <br>> Write "bore" again to restart the game after closing</p>';
                showSnakeGame();
                break;
            default:
                commandOutput = `<p class="command-output">>command not found: ${input}</p>`;
        }

        // Append the command and its output to the output div
        output.innerHTML += `<span class="prompt">root/ $</span> ${input}`;
        output.innerHTML += `<div>${commandOutput}</div>`;

        // Add a new command line for the next command
        const newCommandLine = document.createElement('div');
        newCommandLine.classList.add('command-line');
        newCommandLine.innerHTML = '<span class="prompt">root/ $</span> <input type="text" autofocus>';
        output.appendChild(newCommandLine);

        // Focus on the new input field
        newCommandLine.querySelector('input').addEventListener('keydown', arguments.callee);
        newCommandLine.querySelector('input').focus();

        // Scroll to the bottom
        window.scrollTo(0, document.body.scrollHeight);

        // Remove the current command line
        event.target.parentElement.remove();
    }
});

function showSnakeGame() {
    const gameOverlay = document.createElement('div');
    gameOverlay.classList.add('game-overlay');

    gameOverlay.innerHTML = `
        <div class="game-header">
            <span>Snake Game</span>
            <button class="close-button">&times;</button>
        </div>
        <canvas id="gameCanvas" width="200" height="200"></canvas>
    `;

    document.body.appendChild(gameOverlay);

    document.querySelector('.close-button').addEventListener('click', function() {
        document.body.removeChild(gameOverlay);
    });

    startSnakeGame();
}

function startSnakeGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const box = 10;
    let snake = [];
    snake[0] = { x: 5 * box, y: 5* box };

    let food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };

    let d;
    document.addEventListener('keydown', direction);

    function direction(event) {
        if (event.keyCode === 37 && d !== 'RIGHT') d = 'LEFT';
        else if (event.keyCode === 38 && d !== 'DOWN') d = 'UP';
        else if (event.keyCode === 39 && d !== 'LEFT') d = 'RIGHT';
        else if (event.keyCode === 40 && d !== 'UP') d = 'DOWN';
    }

    function collision(newHead, snake) {
        for (let i = 0; i < snake.length; i++) {
            if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? 'green' : 'green';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            ctx.strokeStyle = 'black';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d === 'LEFT') snakeX -= box;
        if (d === 'UP') snakeY -= box;
        if (d === 'RIGHT') snakeX += box;
        if (d === 'DOWN') snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            alert('Game Over');
        }

        snake.unshift(newHead);
    }

    let game = setInterval(draw, 100);
}
