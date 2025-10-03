
    function cleanString(str) {
      return str.toLowerCase().replace(/[\W_]/g, '');
    }

    function isPalindrome(str) {
      const cleaned = cleanString(str);
      const reversed = cleaned.split('').reverse().join('');
      return cleaned === reversed;
    }

    document.getElementById('check-btn').addEventListener('click', () => {
      const input = document.getElementById('text-input').value;

      if (!input) {
        alert('Please input a value.');
        return;
      }

      const resultEl = document.getElementById('result');
      if (isPalindrome(input)) {
        resultEl.textContent = `${input} is a palindrome.`;
      } else {
        resultEl.textContent = `${input} is not a palindrome.`;
      }
    });
  