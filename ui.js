import { questions, result } from "./data.js";
import { calculateScore, getMaxType } from "./engine.js";

// 存储当前结果类型
let currentResultType = "";

// 选项部分
export function showAllQuestions(updateProgress) {
  const container = document.getElementById("questions-container");

  // 清空容器中的现有内容
  container.innerHTML = '';

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-item";

    const questionText = document.createElement("h3");
    questionText.textContent = `${index + 1}. ${q.q}`;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    ["A", "B"].forEach(opt => {
      const label = document.createElement("label");
      label.className = "option-label";
      const input = document.createElement("input");

      input.type = "radio";
      input.name = `q${index}`;
      input.value = opt;
      input.addEventListener("change", updateProgress);

      label.appendChild(input);
      label.appendChild(document.createTextNode(q[opt].text));

      optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(optionsDiv);
    container.appendChild(questionDiv);
  });
}

// 结果部分
export function renderResult() {
  const score = calculateScore();
  const maxType = getMaxType(score);

  // 存储当前结果类型
  currentResultType = maxType;

  const r = result[maxType];

  // 隐藏测试页面
  document.getElementById("test-page").style.display = "none";

  // 显示结果页面
  const resultPage = document.getElementById("result-page");
  if (resultPage) {
    resultPage.style.display = "flex";
    resultPage.querySelector("h1").textContent = r.name;
    resultPage.querySelector("p").textContent = r.desc;
  }
}

// 获取当前结果类型
export function getCurrentResultType() {
  return currentResultType;
}

// 进度条部分
export function updateProgress() {
  const answered = document.querySelectorAll('input[type="radio"]:checked').length;
  const total = questions.length;

  const bar = document.getElementById("progress-bar");
  if (bar) {
    bar.style.width = (answered / total) * 100 + "%";
  }
}