// 打分系统，初始为0分
let score = {
  yeast: 0,      // 酵母
  ecoli: 0,      // 大肠杆菌
  lacto: 0,      // 乳酸菌
  bacillus: 0,   // 枯草芽孢杆菌
  penicillium: 0,// 青霉
  aspergillus: 0 // 黑曲霉
};

// 问题部分，每个问题对应加分
const questions = [

  // ① 活跃 vs 稳定
  {
    q: "你更喜欢哪种生活节奏？",
    A: {
      text: "行动快，想到就做",
      score: { yeast: 2, ecoli: 2, aspergillus: 1 }
    },
    B: {
      text: "慢一点，但更稳",
      score: { bacillus: 2, lacto: 2, penicillium: 1 }
    }
  },

  // ② 社交 vs 独处
  {
    q: "你更喜欢哪种工作方式？",
    A: {
      text: "团队合作，交流频繁",
      score: { yeast: 2, lacto: 2, ecoli: 1 }
    },
    B: {
      text: "一个人安静完成",
      score: { bacillus: 2, penicillium: 2, aspergillus: 1 }
    }
  },

  // ③ 适应能力
  {
    q: "遇到新环境时你通常：",
    A: {
      text: "很快适应并融入",
      score: { ecoli: 2, yeast: 1, aspergillus: 2 }
    },
    B: {
      text: "需要时间慢慢调整",
      score: { bacillus: 2, lacto: 2, penicillium: 1 }
    }
  },

  // ④ 压力反应
  {
    q: "面对压力时你更倾向：",
    A: {
      text: "越压越兴奋，继续冲",
      score: { ecoli: 2, yeast: 2, aspergillus: 2 }
    },
    B: {
      text: "先稳定下来再处理",
      score: { bacillus: 2, lacto: 2, penicillium: 1 }
    }
  },

  // ⑤ 决策方式
  {
    q: "你做决定时更依赖：",
    A: {
      text: "直觉和速度",
      score: { yeast: 2, ecoli: 2, aspergillus: 1 }
    },
    B: {
      text: "分析和长期稳定",
      score: { bacillus: 2, penicillium: 2, lacto: 2 }
    }
  },

  // ⑥ 能量来源
  {
    q: "什么更让你有动力？",
    A: {
      text: "新鲜刺激的变化",
      score: { yeast: 2, ecoli: 2, aspergillus: 2 }
    },
    B: {
      text: "稳定安全的环境",
      score: { bacillus: 2, lacto: 2, penicillium: 1 }
    }
  },

  // ⑦ 人际关系
  {
    q: "你在人群中通常是：",
    A: {
      text: "活跃中心，带动气氛",
      score: { yeast: 2, lacto: 2, ecoli: 1 }
    },
    B: {
      text: "安静观察者",
      score: { bacillus: 2, penicillium: 2, aspergillus: 1 }
    }
  },

  // ⑧ 工作风格
  {
    q: "你更倾向于：",
    A: {
      text: "快速迭代，不断尝试",
      score: { ecoli: 2, yeast: 2, aspergillus: 2 }
    },
    B: {
      text: "一步一步稳扎稳打",
      score: { bacillus: 2, lacto: 2, penicillium: 1 }
    }
  },

  // ⑨ 风险偏好
  {
    q: "面对风险你会：",
    A: {
      text: "愿意尝试新的可能",
      score: { yeast: 2, ecoli: 2, aspergillus: 2 }
    },
    B: {
      text: "尽量避免不确定性",
      score: { bacillus: 2, lacto: 2, penicillium: 1 }
    }
  },

  // ⑩ 成就感来源
  {
    q: "什么最能让你有成就感？",
    A: {
      text: "影响别人或带动变化",
      score: { yeast: 2, lacto: 2, ecoli: 1 }
    },
    B: {
      text: "稳定完成长期目标",
      score: { bacillus: 2, penicillium: 2, aspergillus: 1 }
    }
  }

];

// 页面切换函数
function startTest() {
  document.getElementById("start-page").style.display = "none";
  document.getElementById("test-page").style.display = "flex";
  showAllQuestions();
}

// 显示所有题目
function showAllQuestions() {
  const container = document.getElementById("questions-container");
  
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-item";
    
    const questionText = document.createElement("h3");
    questionText.textContent = `${index + 1}. ${q.q}`;
    questionDiv.appendChild(questionText);
    
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    
    // 选项A
    const optionA = document.createElement("label");
    optionA.className = "option-label";
    const radioA = document.createElement("input");
    radioA.type = "radio";
    radioA.name = `q${index}`;
    radioA.value = "A";
    radioA.addEventListener('change', updateProgress);
    optionA.appendChild(radioA);
    optionA.appendChild(document.createTextNode(q.A.text));
    optionsDiv.appendChild(optionA);
    
    
    // 选项B
    const optionB = document.createElement("label");
    optionB.className = "option-label";
    const radioB = document.createElement("input");
    radioB.type = "radio";
    radioB.name = `q${index}`;
    radioB.value = "B";
    radioB.addEventListener('change', updateProgress);
    optionB.appendChild(radioB);
    optionB.appendChild(document.createTextNode(q.B.text));
    optionsDiv.appendChild(optionB);
    
    questionDiv.appendChild(optionsDiv);
    container.appendChild(questionDiv);
  });
}

// 计算结果
function calculateResult() {
  // 重置分数
  for (let key in score) {
    score[key] = 0;
  }
  
  // 遍历所有题目，收集用户选择并计算分数
  questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
    if (selectedOption) {
      const option = selectedOption.value;
      for (let key in q[option].score) {
        score[key] += q[option].score[key];
      }
    }
  });
  
  // 检查是否所有题目都已回答
  const answeredCount = document.querySelectorAll('input[type="radio"]:checked').length;
  if (answeredCount < questions.length) {
    alert("请回答所有问题后再查看结果！");
    return;
  }
  
  showResult();
}

// 初始化页面 - 不再自动显示题目，等待用户点击开始测试按钮

// 结果页面
function showResult() {
    // 初始化数据
  let maxType = "";
  let maxScore = -1;
    // 遍历得到最大分数和分数最大值对应的类型
  for (let key in score) {
    if (score[key] > maxScore) {
      maxScore = score[key];
      maxType = key;
    }
  }

  let result = {
  yeast: {
    name: "酵母菌型人格 🍞",
    desc: "你是典型的“发酵型人格”。你充满活力，喜欢与人互动，在群体中往往是气氛的带动者。就像酵母菌在环境中不断发酵、释放能量一样，你的存在会让周围变得更加活跃和有生气。你适应变化的能力强，面对新环境往往能迅速融入，但有时也可能因为过于冲动而缺乏耐心。你的优势在于感染力和行动力，而需要注意的是在关键决策时多一点冷静思考。"
  },

  ecoli: {
    name: "大肠杆菌型人格 🧪",
    desc: "你是典型的“全能适应型人格”。你拥有极强的环境适应能力，无论在什么情况下都能找到自己的生存方式。就像大肠杆菌可以在多种环境中快速繁殖一样，你擅长利用资源、快速调整策略。你思维灵活、执行力强，是团队中的问题解决者。但有时候你可能会显得过于功利或缺乏稳定性。你的优势在于效率和适应，而成长方向是建立更长期、稳定的规划。"
  },

  lacto: {
    name: "乳酸菌型人格 🥛",
    desc: "你是“温和协作型人格”。你性格温和，重视关系，善于在团队中维持稳定与和谐。就像乳酸菌在环境中缓慢而稳定地发挥作用一样，你不追求张扬，而是持续输出价值。你让人感到安心，是值得信赖的伙伴。但有时你可能会过于保守，不愿意冒险或表达自己。你的优势在于稳定与亲和力，而可以尝试在适当的时候更主动表达自己的想法。"
  },

  bacillus: {
    name: "芽孢杆菌型人格 💪",
    desc: "你是“极强抗压型人格”。你拥有极高的耐受力，在压力环境中反而更加稳定。就像芽孢杆菌能够在极端条件下形成芽孢存活一样，你在困难中依然可以坚持下来。你做事稳重、可靠，是团队中的“底盘”。但有时你可能不够灵活，或者对变化反应较慢。你的优势在于坚韧和稳定，而可以尝试提升对变化的敏感度。"
  },

  penicillium: {
    name: "青霉型人格 🍄",
    desc: "你是“低调影响型人格”。你可能不是最显眼的那一个，但你的存在会在不知不觉中改变环境。就像青霉能产生抗生素一样，你往往通过自己的方式解决问题、影响他人。你独立、安静、有深度，但有时也可能过于内向或不愿表达。你的优势在于独特价值和深度思考，而可以尝试让更多人看到你的能力。"
  },

  aspergillus: {
    name: "黑曲霉型人格 🏭",
    desc: "你是“高效执行型人格”。你重视效率、结果和持续输出，就像黑曲霉在工业中被广泛利用一样，你在任务中能够持续稳定地产出成果。你做事有条理、执行力强，是非常可靠的行动派。但有时你可能会忽略过程中的情感或细节。你的优势在于效率与产出，而可以尝试在效率之外关注体验与创新。"
  }
};

  let r = result[maxType];

  document.body.innerHTML = `
    <div class="container">
      <div class="card result-card">
        <h1>${r.name}</h1>
        <p>${r.desc}</p>
        <button onclick="location.reload()">再测一次</button>
      </div>
    </div>
  `;
}


// 实时更新进度条
function updateProgress() {
  const answeredCount = document.querySelectorAll('input[type="radio"]:checked').length;
  const totalQuestions = questions.length;
  
  // 计算百分比
  const percentage = (answeredCount / totalQuestions) * 100;
  
  // 更新 DOM
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = percentage + '%';
  }
}
