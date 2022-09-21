const menu = document.querySelector('.navigation-nemu');

window.onscroll = function(e) {
  menu.style.backgroundColor = "#fff";
  // menu.addClass('shadow-sm')
  menu.classList.add("shadow-sm")
  // menu.style.boxShadow: "0px 5px 50px rgb(50 112 252 / 8%)"; 
}



// var flkty = new Flickity( '.main-gallery', {
//   cellAlign: 'left',
//   contain: true,
//   wrapAround: true,
//   prevNextButtons: false,
//   autoPlay: 5000
// });

let nameFormInput = "";
let emailFormInput = "";
let phoneFormInput = "";
let dateFormInput = "";
let addressFormInput = "";

const sendMessage = document.getElementById('sendMessage');
const nameForm = document.getElementById('nameForm');
const emailForm = document.getElementById('emailForm');
const phoneForm = document.getElementById('phoneForm');
const dateForm = document.getElementById('dateForm');
const addressForm = document.getElementById('addressForm');
const yourMessageIsSent = document.getElementById('yourMessageIsSent');

nameForm.addEventListener('input', function(event) {
  nameFormInput = event.target.value;
})

emailForm.addEventListener('input', function(event) {
  emailFormInput = event.target.value;
})

phoneForm.addEventListener('input', function(event) {
  phoneFormInput = event.target.value;
})

dateForm.addEventListener('input', function(event) {
  dateFormInput = event.target.value;
})

addressForm.addEventListener('input', function(event) {
  addressFormInput = event.target.value;
})

const lengthInputRadio = 10;

const inputRadio = [];
const commentsRadio = [];

for (let j = 1; j <= lengthInputRadio; j++) {
  inputRadio.push(`flexRadioDefault${j}`);
  commentsRadio.push(`#comments${j}`);
}

let valueInputRadio = [];
let valueCommentsRadio = [];


sendMessage.addEventListener('click', function(event) {
  let avoidError = "";
  for (let i = 0; i < lengthInputRadio; i++){
      try {
        avoidError = document.querySelector(`input[name="${inputRadio[i]}"]:checked`).value;
      } catch(e) {
        avoidError = "";
      }
      valueInputRadio.push(avoidError);
      valueCommentsRadio.push(document.querySelector(`${commentsRadio[i]}`).value);
  }

  let messageObject = {
    name: nameFormInput,
    emailAddress: emailFormInput,
    phone: phoneFormInput,
    date: dateFormInput,
    address: addressFormInput,
    valueInputRadio: valueInputRadio,
    valueCommentsRadio: valueCommentsRadio
  }

  fetch("https://bcs.babaccm.com:8443/survey", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageObject)
  })
  .then(response => response.text())
  .then(result => {
    console.log("result: ",result);
    if (result) {
      yourMessageIsSent.textContent = `Your patient survey is sent, thank you so much!`;
      nameForm.value = "";
      emailForm.value = "";
      phoneForm.value = "";
      dateForm.value = "";
      addressForm.value = "";

      nameFormInput = "";
      emailFormInput = "";
      phoneFormInput = "";
      dateFormInput = "";
      addressFormInput = "";
    }

  })

  valueInputRadio = [];
  valueCommentsRadio = [];


})