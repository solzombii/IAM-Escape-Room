// Helper: Hide the submit button associated with the given function name.
function hideSubmitButton(fnName) {
  const btn = document.querySelector(`button[onclick="${fnName}()"]`);
  if (btn) {
    btn.style.display = 'none';
  }
}

// START GAME FUNCTIONALITY
function startGame() {
  const playerNameInput = document.getElementById('playerName');
  const playerName = playerNameInput.value.trim();
  
  if (playerName === "") {
    alert("Please enter your name to start the game.");
    return;
  }
  
  // Save the player's name and start time in localStorage
  localStorage.setItem('playerName', playerName);
  localStorage.setItem('startTime', Date.now());
  
  // Redirect to the first puzzle page
  window.location.href = "puzzle1.html";
}

// Puzzle 1: Role Confusion
function submitPuzzle1() {
  const aliceRole = document.getElementById('alice-role').value;
  const bobRole = document.getElementById('bob-role').value;
  let resultText = '';

  // Correct configuration: Alice should be an Intern and Bob should be HR_Admin
  if (aliceRole === 'Intern' && bobRole === 'HR_Admin') {
    resultText = 'Correct! Your code is 3729. <br>';
    resultText += '<a href="puzzle2.html" class="btn">Next Puzzle</a>';
    hideSubmitButton("submitPuzzle1");
  } else {
    resultText = 'Incorrect configuration, please try again.';
  }
  document.getElementById('puzzle-result').innerHTML = resultText;
}

// Puzzle 2: MFA Madness
function submitPuzzle2() {
  const ceoMFA = document.getElementById('ceo-mfa').value;
  const customerMFA = document.getElementById('customer-mfa').value;
  let resultText = '';

  // Correct answers: CEO should use Security Key, customer Officer should use Authenticator App
  if (ceoMFA === 'Hardware Token' && customerMFA === 'Passwordless') {
    resultText = 'Correct! Your code fragment is 5841. <br>';
    resultText += '<a href="puzzle3.html" class="btn">Next Puzzle</a>';
    hideSubmitButton("submitPuzzle2");
  } else {
    resultText = 'Incorrect selections, please try again.';
  }
  document.getElementById('puzzle-result').innerHTML = resultText;
}

// Puzzle 3: Permission Maze
function submitPuzzle3() {
  const radios = document.getElementsByName('path');
  let selectedPath = '';
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedPath = radios[i].value;
      break;
    }
  }
  
  let resultText = '';
  // Correct answer: Path B (Grants only user permissions)
  if (selectedPath === 'B') {
    resultText = 'Correct! Your code fragment is 3072. <br>';
    resultText += '<a href="puzzle4.html" class="btn">Next Puzzle</a>';
    hideSubmitButton("submitPuzzle3");
  } else {
    resultText = 'Incorrect choice, please try again.';
  }
  document.getElementById('puzzle-result').innerHTML = resultText;
}

// Puzzle 4: Audit Log Mystery
function submitPuzzle4() {
  const radios = document.getElementsByName('log');
  let selectedEntry = '';
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedEntry = radios[i].value;
      break;
    }
  }
  
  let resultText = '';
  // Correct answer: Entry 2 is the suspicious activity
  if (selectedEntry === '2') {
    resultText = 'Correct! Your code fragment from Puzzle 4 is 9117. <br>';
    resultText += '<a href="finalValidation.html" class="btn">Proceed to Final Validation</a>';
    hideSubmitButton("submitPuzzle4");
  } else {
    resultText = 'That doesn’t seem right, please review the logs and try again.';
  }
  document.getElementById('puzzle-result').innerHTML = resultText;
}

// Final Code Validation
function validateCodes() {
  // Expected code fragments (should match those given in puzzles)
  const expectedCode1 = "3729";  // Puzzle 1
  const expectedCode2 = "5841";  // Puzzle 2
  const expectedCode3 = "3072";  // Puzzle 3
  const expectedCode4 = "9117";  // Puzzle 4
  
  const code1 = document.getElementById("code1").value.trim();
  const code2 = document.getElementById("code2").value.trim();
  const code3 = document.getElementById("code3").value.trim();
  const code4 = document.getElementById("code4").value.trim();
  
  let resultMessage = "";
  
  if (code1 === expectedCode1 && code2 === expectedCode2 && code3 === expectedCode3 && code4 === expectedCode4) {
    // Retrieve the start time and calculate elapsed time
    const startTime = localStorage.getItem('startTime');
    const endTime = Date.now();
    const elapsedTime = endTime - startTime; // in milliseconds
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const storedName = localStorage.getItem('playerName');
    
    resultMessage = `<span style='color: green;'>Congratulations, ${storedName}! All code fragments are correct. You've completed the IAM Escape Room! Total time: ${minutes} minutes and ${seconds} seconds.</span>`;
    hideSubmitButton("validateCodes");
  } else {
    resultMessage = "<span style='color: red;'>One or more code fragments are incorrect. Please check and try again.</span>";
  }
  
  document.getElementById("validationResult").innerHTML = resultMessage;
}
