console.log("loading js..");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  const url = `http://localhost:3000/weather?address=${location}`;

  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = "";
        messageTwo.textContent = `${data.forecast}, ${data.location} `;
      }
    });
  });
});
