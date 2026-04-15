import { score, questions } from "./data.js";

// 重置计分模块
export function resetScore() {
  for (let key in score) {
    score[key] = 0;
  }
}

// 计分模块
export function calculateScore() {
  resetScore();

  questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);

    if (selectedOption) {
      const option = selectedOption.value;
      for (let key in q[option].score) {
        score[key] += q[option].score[key];
      }
    }
  });

  return score;
}

// 寻找最大值及其对应的人格
export function getMaxType(score) {
  let maxType = "";
  let maxScore = -1;

  for (let key in score) {
    if (score[key] > maxScore) {
      maxScore = score[key];
      maxType = key;
    }
  }

  return maxType;
}