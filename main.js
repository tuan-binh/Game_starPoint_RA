let players = document.querySelector(".count-player");
let totalPoints = document.querySelector(".count-point");

let btn = document.querySelector("button");
let input = document.querySelector(".action input[type='text']");
let list = document.querySelector(".result");

let totalPlayer = [];

let start = document.querySelector(".start");
let stop = document.querySelector(".stop");
let reset = document.querySelector(".reset");
let time = document.querySelector(".time");

let timing = 0;
let id;
// start button
start.onclick = function () {
  start.style.display = "none";
  stop.style.display = "inline-block";
  id = setInterval(function () {
    ++timing;
    time.innerHTML = timing + " s";
  }, 1000);
};
// stop button
stop.onclick = function () {
  start.style.display = "inline-block";
  start.innerText = "pause";
  stop.style.display = "none";
  clearInterval(id);
  time.innerHTML = timing + " s";
};
// reset button
reset.onclick = function () {
  clearInterval(id);
  start.style.display = "inline-block";
  start.innerText = "start";
  stop.style.display = "none";
  timing = 0;
  time.innerHTML = "0 s";
};

render();

btn.onclick = function () {
  let user = input.value;
  totalPlayer.push({ name: user, point: 0 });
  input.value = "";
  if (totalPlayer.length === 0) {
    players.innerText = 0;
  } else {
    players.innerText = totalPlayer.length;
  }
  render();
};

list.addEventListener("click", handleClick);

function handleClick(event) {
  let number = document.querySelectorAll(".number");
  // let number = parseInt(a.innerText);
  let e = event.target;
  let index = e.dataset.id;
  // console.log(index);
  let type = e.dataset.type;
  // console.log(type);
  // Trường hợp bấm vào close
  if (type === "del") {
    if (totalPlayer.length !== 0) {
      totalPlayer.splice(index, 1);
      players.innerText = totalPlayer.length;
      render();
      render2();
    }
  }
  // Trường hợp bấm vào dấu trừ
  if (type === "minus") {
    --totalPlayer[index].point;
    // render();
    if (totalPlayer[index].point < 0) {
      totalPlayer[index].point = 0;
    }
    number.forEach(function (e, i) {
      e.innerText = `${totalPlayer[i].point}`;
    });
    render2();
  }
  // Trường hợp bấm vào dấu cộng
  if (type === "add") {
    ++totalPlayer[index].point;
    // render();
    if (totalPlayer[index].point < 0) {
      totalPlayer[index].point = 0;
    }
    number.forEach(function (e, i) {
      e.innerText = `${totalPlayer[i].point}`;
    });
    render2();
  }
  totalPoints.innerText = totalPoint();
}

// trả về index có điểm cao nhất và style cho hình vương miện
function totalPoint() {
  let sum = 0;
  totalPlayer.forEach((e) => {
    sum += e.point;
  });
  return sum;
}
// function so sánh điểm và trả về index
function maxPoint() {
  let max = 0;
  let output = [];
  for (let i = 0; i < totalPlayer.length; i++) {
    if (max < totalPlayer[i].point) {
      max = totalPlayer[i].point;
    }
  }
  for (let i = 0; i < totalPlayer.length; i++) {
    if (max === totalPlayer[i].point && max !== 0) {
      output.push(i);
    }
  }
  return output;
}
// hàm thay đổi màu vương miện

// render by map
function render() {
  let html = totalPlayer.map(function (e, i) {
    return `<li>
              <div class="name-player">
                <i data-id="${i}" data-type="del" class="fa-solid fa-xmark"></i>
                <i class="fa-solid fa-crown"></i>
                <p><b>${e.name}</b></p>
              </div>
              <div class="result-action">
                <i data-id="${i}" data-type="minus" class="fa-solid fa-minus cal"></i>
                <p class="number">${e.point}</p>
                <i data-id="${i}" data-type="add" class="fa-solid fa-plus cal"></i>
              </div>
            </li>`;
  });
  list.innerHTML = html.join("");
}
function render2() {
  let ulElement = document.querySelectorAll(".result li");
  let arr = maxPoint();
  console.log(arr);
  if (!arr.length) {
    for (let i = 0; i < ulElement.length; i++) {
      let b = ulElement[i].firstElementChild.children;
      b[1].style.color = "black";
    }
  }
  if (arr.length === 1) {
    for (let i = 0; i < ulElement.length; i++) {
      let b = ulElement[i].firstElementChild.children;
      b[1].style.color = "black";
    }
    let a = ulElement[arr[0]].firstElementChild.children;
    a[1].style.color = "red";
  } else {
    for (let i = 0; i < arr.length; i++) {
      let a = ulElement[arr[i]].firstElementChild.children;
      a[1].style.color = "red";
    }
  }
}
