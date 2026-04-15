import { showAllQuestions, renderResult, updateProgress, getCurrentResultType } from "./ui.js";

// 开始界面
window.startTest = function () {
  document.getElementById("start-page").style.display = "none";
  document.getElementById("test-page").style.display = "flex";

  showAllQuestions(updateProgress);
};

// 返回首页
window.goBack = function () {
  document.getElementById("test-page").style.display = "none";
  document.getElementById("start-page").style.display = "flex";

  // 清空已选择的答案
  const checkedInputs = document.querySelectorAll('input[type="radio"]:checked');
  checkedInputs.forEach(input => input.checked = false);

  // 重置进度条
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = "0%";
  }
};

// 答题界面，判断是否全部做完
window.calculateResult = function () {
  const answered = document.querySelectorAll('input[type="radio"]:checked').length;

  if (answered < 10) {
    alert("请回答所有问题后再查看结果！");
    return;
  }

  renderResult();
};

// 显示了解更多模态框
window.showLearnMore = function () {
  const currentType = getCurrentResultType();
  const modalContent = document.querySelector("#learn-more-modal p");
  const modalTitle = document.querySelector("#learn-more-modal h2");

  // 根据当前结果类型显示不同的标题
  const typeNames = {
    yeast: "酵母菌",
    ecoli: "大肠杆菌",
    lacto: "乳酸菌",
    bacillus: "芽孢杆菌",
    penicillium: "青霉",
    aspergillus: "黑曲霉"
  };

  // 更新模态框标题
  if (modalTitle && typeNames[currentType]) {
    modalTitle.textContent = typeNames[currentType];
  }

  // 根据当前结果类型显示不同的内容
  switch(currentType) {
    case "yeast":
      modalContent.textContent = "酵母菌是一类广泛用于发酵的微生物，最常见于面包和啤酒的制作过程中。它们能够快速分解糖类并释放能量，同时产生二氧化碳和酒精。酵母菌生长迅速、适应能力强，在合适条件下可以迅速占据环境并发挥作用。在合成生物学中，酵母常被用作“细胞工厂”，用于生产蛋白质、药物和生物燃料。";
      break;
    case "ecoli":
      modalContent.textContent = "大肠杆菌是分子生物学中最常用的模式生物之一。它生长速度快、遗传背景清晰、易于改造，是基因工程和合成生物学实验的核心工具。科学家可以通过修改其基因，让它表达特定蛋白或执行特定功能，因此被称为“生物学中的瑞士军刀”。";
      break;
    case "lacto":
      modalContent.textContent = "乳酸菌是一类能够产生乳酸的微生物，常见于酸奶、泡菜等发酵食品中。它们通常生长温和、稳定，并且有助于维持微生物环境的平衡。在合成生物学和食品科学中，乳酸菌常用于构建稳定、安全的生物系统。";
      break;
    case "bacillus":
      modalContent.textContent = "枯草芽孢杆菌具有很强的抗逆能力，在恶劣环境中可以形成“芽孢”进入休眠状态，从而长期存活。这种能力使它成为研究生物抗压机制的重要模型。在工业和合成生物学中，它也常被用于蛋白分泌和酶生产。";
      break;
    case "penicillium":
      modalContent.textContent = "青霉是一类真菌，最著名的贡献是产生青霉素——人类历史上第一种抗生素之一。它通常通过分泌化学物质影响周围环境，从而抑制其他微生物的生长。在生物技术中，青霉代表了一类“通过产物改变环境”的系统。";
      break;
    case "aspergillus":
      modalContent.textContent = "黑曲霉是一种在工业中广泛应用的真菌，尤其用于生产柠檬酸和多种酶。它具有极高的代谢效率和稳定的产出能力，因此在工业发酵中非常重要。在合成生物学中，它代表“高效生产型生物系统”。";
      break;
    default:
      modalContent.textContent = "待施工";
  }

  document.getElementById("learn-more-modal").style.display = "flex";
};

// 关闭了解更多模态框
window.closeLearnMore = function () {
  document.getElementById("learn-more-modal").style.display = "none";
};

// 确保DOM加载完成后绑定事件
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("start-btn").addEventListener("click", startTest);
  document.getElementById("back-btn").addEventListener("click", goBack);
  document.getElementById("submit-btn").addEventListener("click", calculateResult);
  document.getElementById("restart-btn").addEventListener("click", function() {
    location.reload();
  });
  document.getElementById("learn-more-btn").addEventListener("click", showLearnMore);
  document.querySelector(".close-btn").addEventListener("click", closeLearnMore);

  // 点击模态框背景也可以关闭
  document.getElementById("learn-more-modal").addEventListener("click", function(e) {
    if (e.target === this) {
      closeLearnMore();
    }
  });
});