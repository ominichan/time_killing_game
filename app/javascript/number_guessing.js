document.addEventListener("DOMContentLoaded", () => {
    let answer = "";
    let attempts = 0;

    document.getElementById("start").addEventListener("click", () => {
      answer = generateAnswer();
      console.log("答え（デバッグ用）:", answer);
      attempts = 0;
      document.getElementById("guess").value = "";
      document.getElementById("attempts").textContent = attempts;
      document.getElementById("history").innerHTML = "";
      document.getElementById("game-area").style.display = "block";
    });

    document.getElementById("submit").addEventListener("click", () => {
      let guess = document.getElementById("guess").value;
      if (isValidGuess(guess)) {
        attempts++;
        document.getElementById("attempts").textContent = attempts;
        let result = checkGuess(guess, answer);
        let history = document.getElementById("history");
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = `${guess} : ${result.hits} HIT, ${result.blows} BLOW`;
        history.prepend(li);
        if (result.hits === 3) {
          alert(`正解！おめでとう！${attempts}回目でクリア！`);
        }
      } else {
        alert("異なる数字を組み合わせた3桁を入力してください");
      }
    });

    function generateAnswer() {
      let numbers = "0123456789".split("");
      let answer = "";
      while (answer.length < 3) {
        let index = Math.floor(Math.random() * numbers.length);
        answer += numbers.splice(index, 1);
      }
      return answer;
    }

    function isValidGuess(guess) {
      return /^\d{3}$/.test(guess) && new Set(guess).size === 3;
    }

    function checkGuess(guess, answer) {
      let hits = 0, blows = 0;
      for (let i = 0; i < 3; i++) {
        if (guess[i] === answer[i]) {
          hits++;
        } else if (answer.includes(guess[i])) {
          blows++;
        }
      }
      return { hits, blows };
    }
  });