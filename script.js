const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');

inputElement.readOnly = true; // Make the input field read-only

const codeSnippets = [
  "Get-ChildItem -Path C:\Users\UserName\Documents -Filter *.txt -Recurse | Select-Object FullName, Length | Sort-Object Length -Descending | Export-Csv C:\Users\UserName\Desktop\files.csv",
  "grep -r search term /path/to/search/in | awk '{print $1}' | sort | uniq -c | sort -nr",
  "git log --pretty=format:%h %ad | %s%d [%an] --date=short --all --graph",
  "docker run --name my-mongodb -d mongo:latest --auth --bind_ip_all",
  "kubectl create deployment nginx --image=nginx --replicas=3 --port=80 && kubectl expose deployment nginx --type=LoadBalancer --port=80 --target-port=80",
  "aws s3 cp s3://my-bucket/my-folder/ s3://my-bucket/my-other-folder/ --recursive --exclude *.jpg --include *.png --metadata x-amz-meta-custom-header=foo --acl public-read",
  ":%s/search/replace/gc",
  "[=======>] 22% 1.20MB/s eta 17s",
  "const user = getUserDetails();",
  "let transactions = getTransactions();"
];

const successMessages = [
  "Execution successful",
  "Operation completed",
  "Code executed successfully",
  "Packages successfully installed"
];

const failureMessages = [
  "Execution failed",
  "Operation failed",
  "Error occurred",
  "Could not complete download"
];

function generateRandomCharacters(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/=(){}[]';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function typeCharacters(text, element, delay, callback) {
  let currentCharIndex = 0;

  function typeNextChar() {
    if (currentCharIndex < text.length) {
      element.value += text[currentCharIndex];
      currentCharIndex++;
      setTimeout(typeNextChar, delay);
    } else {
      callback();
    }
  }

  typeNextChar();
}

function typeWrappedText(text, delay, callback) {
    let currentCharIndex = 0;
    const containerWidth = outputElement.clientWidth;
    const charWidth = outputElement.offsetWidth / outputElement.cols;
    const maxCharsPerLine = Math.floor(containerWidth / charWidth);
  
    function typeNextChar() {
      if (currentCharIndex < text.length) {
        outputElement.textContent += text[currentCharIndex];
  
        // Add a newline character if the current line reaches the maximum characters per line
        if ((currentCharIndex + 1) % maxCharsPerLine === 0) {
          outputElement.textContent += '\n';
        }
  
        currentCharIndex++;
        setTimeout(typeNextChar, delay);
      } else {
        callback();
      }
    }
  
    typeNextChar();
  }
  
  function executeCode() {
    // Choose a random code snippet
    const codeSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  
    // Type the code snippet in the input field
    typeCharacters(codeSnippet, inputElement, 25, () => {
      // Move the code snippet to the output window and clear the input field
      outputElement.textContent += inputElement.value + '\n';
      inputElement.value = '';
  
      const executionCode = generateRandomCharacters(60);
  
      // Add the code execution in the output window using typeWrappedText
      typeWrappedText(executionCode, 1, () => {
        outputElement.textContent += '\n';
  
        const isSuccess = Math.random() < 0.8; // 80% chance of success
        const message = isSuccess
          ? successMessages[Math.floor(Math.random() * successMessages.length)]
          : failureMessages[Math.floor(Math.random() * failureMessages.length)];
  
        // Add the success or failure message in the output window
        outputElement.textContent += '> ' + message + '\n';
  
        // Scroll to the bottom
        outputElement.scrollTop = outputElement.scrollHeight;
  
        // Add a random hesitation before starting the next line
        const hesitation = Math.random() * 1000 + 500;
        setTimeout(executeCode, hesitation);
      });
    });
  }
  
  // Start code execution
  executeCode();

  // Add this function to scroll the terminal automatically when its content changes
function autoScrollTerminal() {
    const config = { childList: true, subtree: true, characterData: true };
    const observer = new MutationObserver(() => {
      outputElement.scrollTop = outputElement.scrollHeight;
    });
    observer.observe(outputElement, config);
  }
  
  // Call the autoScrollTerminal function
  autoScrollTerminal();