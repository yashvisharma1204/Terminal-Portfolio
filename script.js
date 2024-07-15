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
                commandOutput = '<p class="command-output">education command executed: Showing education background...</p>';
                break;
            case 'experience':
                commandOutput = '<p class="command-output">experience command executed: Showing work experience...</p>';
                break;
            case 'skills':
                commandOutput = '<p class="command-output">skills command executed: Listing skills...</p>';
                break;
            case 'projects':
                commandOutput = '<p class="command-output">projects command executed: Showing projects...</p>';
                break;
            case 'GUI':
                commandOutput = '<p class="command-output">Redirecting to GUI Website...</p>';
                setTimeout(() => {
                    window.location.href = 'https://yashvisharma1204.github.io/Portfolio/'; // Replace with your actual GUI website URL
                }, 2000); // 2 seconds delay before redirecting
                break;
            case 'contact':
                commandOutput = '<p class="command-output">contact command executed: Showing contact information...</p>';
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
