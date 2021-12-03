const endPoint = "https://qr-server-191.herokuapp.com";
// const endPoint = "http://127.0.0.1:3000";

var socket = io(endPoint);
fetch(endPoint + "/getQR")
  .then((res) => res.json())
  .then((result) => {
    new QRCode(document.getElementById("qrcode"), result.data);
  });

const personList = document.querySelector("#personList");
let roleStatus;

const row = (number, personID, name, role, id, time) => {
  if (role == "Student") roleStatus = "status-student";
  else if (role == "Teacher") roleStatus = "status-teacher";
  return `<tr>
  <td>${number}</td>
  <td>${personID}</td>
  <td>${name}</td>
  <td><p class="status ${roleStatus}">${role}</p></td>
  <td><p class="">${time}</p></td>
  <td class="delete"><i onclick="deleteScanner(${id})" class="fas fa-times-circle"></i></i></td>
  </tr>`;
};
let number = 0;
const deleteScanner = (id) => {
  fetch(endPoint + "/deleteScanner", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      personList.innerHTML = "";
      if (result.success) {
        number = 0;
        result.data.forEach((data) => {
          insertRow(data);
        });
      }
    });
};

const tbody = document.querySelector("tbody");
const insertRow = (data) => {
  const date = new Date(data.time);

  personList.insertAdjacentHTML(
    "beforeend",
    row(
      ++number,
      data.studentID,
      data.name,
      data.role,
      data.id,
      date.toLocaleTimeString()
    )
  );
  tbody.scrollTo(0, tbody.scrollHeight);
};

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
