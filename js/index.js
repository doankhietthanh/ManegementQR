const endPoint = "https://qr-server-191.herokuapp.com";
// const endPoint = "http://127.0.0.1:3000";

//Use socket.io to connect to the server by endPoint
var socket = io(endPoint);

//getQR from server
fetch(endPoint + "/getQR")
  .then((res) => res.json())
  .then((result) => {
    new QRCode(document.getElementById("qrcode"), result.data);
  });

//Declare variables from html file
const loading = document.querySelector(".cover-loading");
const personList = document.querySelector(".personList");
const personList2 = document.querySelector(".personList2");
const table = document.querySelector("table");

//When person scan app, this function will add data to each row on the Management table
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

//function deleteScanner
let number = 0;
const deleteScanner = (id) => {
  loading.setAttribute("style", "display: flex");
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
      loading.setAttribute("style", "display: none");
      personList.innerHTML = "";
      personList2.innerHTML = "";
      if (result.success) {
        number = 0;
        result.data
          .sort((a, b) => {
            return a.time - b.time;
          })
          .forEach((data) => {
            insertRow(data);
          });
      }
    });
};

//When you scan QRCode, Management table will update data in here and push on server
const insertRow = (data) => {
  const date = new Date(data.time);
  const n = ++number;
  personList.insertAdjacentHTML(
    "beforeend",
    row(
      n,
      data.studentID,
      data.name,
      data.role,
      data.id,
      date.toLocaleTimeString()
    )
  );
  personList2.insertAdjacentHTML(
    "beforeend",
    row(
      n,
      data.studentID,
      data.name,
      data.role,
      data.id,
      date.toLocaleTimeString()
    )
  );
  table.scrollTo(0, table.scrollHeight);
};

//getAllScanned from server
fetch(endPoint + "/getAllScanned")
  .then((res) => res.json())
  .then((result) => {
    if (result.success) {
      result.data
        .sort((a, b) => {
          return a.time - b.time;
        })
        .forEach((data) => {
          insertRow(data);
        });
    }
  });
//Client receive data from server by event "scan"
socket.on("scan", (data) => {
  insertRow(data);
});
