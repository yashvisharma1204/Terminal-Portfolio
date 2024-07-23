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
                        <li><span class='one'>bore -</span> <span class='two'>play a snake game</span></li>
                    </ul>
                `;
                break;
            case 'whoami':
                commandOutput = `
                    <p><span style='color:#8CC63F'>Hello, I'm Yashvi Sharma!</span></p>
                    <ul>
                        <li><span class='three'>&gt; Second-year Computer Science and Engineering student at Lovely Professional University</span></li>
                        <li><span class='three'>&gt; Specializing in Artificial Intelligence and Data Engineering</span></li>
                        <li><span class='three'>&gt; Currently exploring advanced AI algorithms and machine learning models</span></li>
                        <li><span class='three'>&gt; Excited about leveraging technology for innovative solutions</span></li>
                    </ul>
                `;
                break;
                case 'education':
                    commandOutput = `
                        <p><span class="command-output">Education:</span></p>
                        <ul>
                            <li><span class="three">> 2023-Present: B.Tech in Computer Science and Engineering</span><br>
                                <span class="three">   Institution: Lovely Professional University</span><br>
                                <span class="three">   CGPA: 8.7</span>
                            </li>
                            <li><span class="three">> 2019-2021: Senior Secondary Certificate (Class 12)</span><br>
                                <span class="three">   Institution: Delhi International School, Delhi</span><br>
                            </li>
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
            case 'bore':
                commandOutput = '<p class="command-output">Starting Snake Game...<br>> Press "X" to close the game <br>> Write "bore" again to restart the game after closing</p>';
                showSnakeGame();
                break;
            default:
                commandOutput = `<p class="command-output">> command not found: ${input}</p>`;
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
            <button class="close-button-one">&times;</button>
        </div>
        <canvas id="gameCanvas" width="200" height="200"></canvas>
    `;

    document.body.appendChild(gameOverlay);

    document.querySelector('.close-button-one').addEventListener('click', function() {
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
document.getElementById('clickable-image').addEventListener('click', function() {
    const box = document.createElement('div');
    box.classList.add('box-appear');
    box.innerHTML = `
        <div class="box-header">
            <span><b>Message</b></span>
            <button class="close-button">&times;</button>
        </div>
        <p>This is my personal website. <i>To experience it better, use <b>LAPTOPS or PCs</b></i><p>
        Another <a href= "https://yashvisharma1204.github.io/Portfolio/">portfolio</a> you can explore!
    `;

    // Close button functionality
    const closeButton = box.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
        box.remove();
    });

    document.body.appendChild(box);

    // Add event listener to remove the box on click outside of it
    document.addEventListener('click', function(event) {
        if (!box.contains(event.target) && event.target !== document.getElementById('clickable-image')) {
            box.remove();
        }
    });

    // Toggle box visibility (optional)
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener('DOMContentLoaded', function () {
    const contactButton = document.querySelector('.contact-button');
    const formContainer = document.querySelector('.form-container');
    const closeButton = document.querySelector('.close-form');
    const phonescreen = document.querySelector('.phonescreen');

    // Show the form when "Contact me" button is clicked
    contactButton.addEventListener('click', function () {
        phonescreen.innerHTML = ''; // Clear phonescreen content
        formContainer.style.display = 'flex'; // Show the contact form
    });

    // Close the form when close button is clicked
    closeButton.addEventListener('click', function () {
        formContainer.style.display = 'none'; // Hide the contact form
        phonescreen.innerHTML = `
            <div class="circle"></div>
            <h1><span>Hello</span><img src="waving-hand.png" alt="Waving Hand"><br> I am Yashvi Sharma</h1>
            <img src="image.jpg">
            <button class="contact-button">Contact me</button>
            <div class="line"></div>
        `; // Restore phonescreen content
    });

    // Handle form submission (you can customize this part)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Here you can add your logic to handle form submission (e.g., send data via AJAX)
        alert('Form submitted!'); // Example alert, replace with your logic
        // Optionally, hide the form after submission
        formContainer.style.display = 'none';
        phonescreen.innerHTML = `
            <div class="circle"></div>
            <h1><span>Hello</span><img src="waving-hand.png" alt="Waving Hand"><br> I am Yashvi Sharma</h1>
            <img src="image.jpg">
            <button class="contact-button">Contact me</button>
            <div class="line"></div>
        `; // Restore phonescreen content
    });
});
