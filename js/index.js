const endPoint = "https://qr-server-191.herokuapp.com";
var socket = io(endPoint);
fetch(endPoint + "/getQR")
  .then((res) => res.json())
  .then((result) => {
    new QRCode(document.getElementById("qrcode"), result.data);
  });

const personList = document.querySelector("#personList");
let roleStatus;

const row = (number, personID, name, role) => {
  if (role == "Student") roleStatus = "status-student";
  else if (role == "Teacher") roleStatus = "status-teacher";
  return `<tr>
    <td>${number}</td>
    <td>${personID}</td>
    <td>${name}</td>
    <td><p class="status ${roleStatus}">${role}</p></td>
    <td class="delete"><i class="fas fa-times-circle"></i></i></td>
</tr>`;
};

const insertRow = (data) => {
  personList.insertAdjacentHTML(
    "beforeend",
    row(++number, data.studentID, data.name, data.role, "", "")
  );
};
let number = 0;

fetch(endPoint + "/getAllScanned")
  .then((res) => res.json())
  .then((result) => {
    if (result.success) {
      result.data.forEach((data) => {
        insertRow(data);
      });
    }
  });

socket.on("scan", (data) => {
  insertRow(data);
});

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
