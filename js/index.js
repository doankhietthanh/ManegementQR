const endPoint = "https://qr-server-191.herokuapp.com";
var socket = io(endPoint);
fetch(endPoint + "/getQR")
  .then((res) => res.json())
  .then((result) => {
    new QRCode(document.getElementById("qrcode"), result.data);
  });

const personList = document.querySelector("#personList");
const row = (number, personID, name, role, checkIn, checkOut) => {
  return `<tr>
    <th scope="row">${number}</th>
    <td>${personID}</td>
    <td>${name}</td>
    <td class="table-primary">${role}</td>
    <td>${checkIn}</td>
    <td>${checkOut}</td>
    <td class="delete"><i class="fas fa-times-circle"></i></i></td>
</tr>`;
};

const insertRow = (data) => {
  personList.insertAdjacentHTML(
    "beforeend",
    row(++number, data.studentID, data.name, "", "", "")
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
