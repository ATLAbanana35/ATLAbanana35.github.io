let obstacles = [];
let score = 0;
let dinausaure_y = 0;
let dinausaure_html = document.querySelector(".game img");
function generate_sprite() {
  let spriteHTML = document.createElement("div");
  spriteHTML.style.left = "350px";
  spriteHTML.classList.add("sprite");
  document.querySelector(".game").appendChild(spriteHTML);
  obstacles.push(spriteHTML);
  setTimeout(() => {
    generate_sprite();
  }, 1000+Math.floor(Math.random() * 2000))
}
document.addEventListener("click", () => {
  let id = setInterval(() => {
    if (dinausaure_y > 40) {
      clearInterval(id);
    }
    dinausaure_y++;
  }, 1);
    setTimeout(() => {
      let id = setInterval(() => {
        if (dinausaure_y <= 0) {
          clearInterval(id);
        }
        dinausaure_y--;
      }, 1);
    }, 1000)
})
function update() {
  score++;
  for (var i = 0; i < obstacles.length; i++) {
    const current_obstacle = obstacles[i];
    current_obstacle.style.left = Number((current_obstacle.style.left.replace("px", ""))-3)+"px";
      if (Number((current_obstacle.style.left.replace("px", ""))-3) < 65 && Number((current_obstacle.style.left.replace("px", ""))-3) > 0 && dinausaure_y <= 30) {
        document.body.innerHTML = "<h1>Game Over<h1><br> <button onclick='location.reload()'>restart</button>"
        return;
      }
  }
  document.querySelector("span").textContent = score;
  dinausaure_html.style.bottom = dinausaure_y-10 + "px";
  requestAnimationFrame(update);
}
generate_sprite();
update();