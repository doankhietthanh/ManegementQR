const showMenu = (toggleId, navbarId, bodyId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId);

  if (toggle && navbar) {
    toggle.addEventListener("click", () => {
      // APARECER MENU
      navbar.classList.toggle("show");
      // ROTATE TOGGLE
      toggle.classList.toggle("rotate");
      // PADDING BODY
      bodypadding.classList.toggle("expander");
    });
  }
};
showMenu("nav-toggle", "navbar", "body");

// Change active link when clicked
const linkColor = document.querySelectorAll(".nav-link");
function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}

linkColor.forEach((l) => l.addEventListener("click", colorLink));
const mainScreen = document.querySelector("#main-screen");
const slide = document.querySelector(".slide");

let currentIndex = 0;
const totalScreen = 3;

const moveTo = (id) => {
  const w = id - currentIndex;

  slide.setAttribute("style", `transform:translateY(-${Math.abs(w)}00vh)`);
};

const link = document.querySelectorAll(".nav-link").forEach((v) => {
  v.addEventListener("click", (e) => {
    e.preventDefault();
    moveTo(v.getAttribute("screenID"));
  });
});
