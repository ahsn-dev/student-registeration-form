"use strict";

const form = document.getElementById("main-form");
const firstName = document.getElementById("firstname");
const middleName = document.getElementById("middlename");
const lastName = document.getElementById("lastname");
const course = document.getElementById("course");
const phone = document.getElementById("tel");
const gender = document.querySelectorAll("#gender");
const email = document.getElementById("email");
const password = document.getElementById("password");
const retypePass = document.getElementById("retype-pass");

function checkValidate(e) {
  e.preventDefault();

  const errors = document.querySelectorAll(".error");
  errors.forEach((message) => {
    message.remove();
  });

  let counter = 0;

  nameValidate(firstName, firstName.value) && counter++;
  nameValidate(middleName, middleName.value) && counter++;
  nameValidate(lastName, lastName.value) && counter++;
  courseValidate(course, course.value) && counter++;
  phoneValidate(phone, phone.value) && counter++;
  genderValidate(gender, gender.value) && counter++;
  emailValidate(email.value) && counter++;
  passwordValidate(password, password.value) && counter++;
  retypePassValidate(retypePass, retypePass.value, password.value) && counter++;

  counter === 9 &&
    console.log(
      `firstName:${firstName.value}\nmiddleName:${middleName.value}\nlastName:${
        lastName.value
      }\ncourse:${course.value}\nphoneNumber:${
        phone.value
      }\ngender:${genderValidate(gender)}\nemail:${email.value}\npassword:${
        password.value
      }\naddress:${address.value}`
    );
}

form.addEventListener("submit", checkValidate);

function errorMessage(message) {
  const error = document.createElement("p");
  error.className = "error";
  error.innerHTML = message;
  return error;
}

function nameValidate(element, input) {
  if (input.length < 3) {
    element.after(
      errorMessage(
        `${element.previousElementSibling.innerHTML} must be atleast 3 characters`
      )
    );
  } else {
    return true;
  }
}

function courseValidate(element, input) {
  if (input === "Course") {
    element.parentElement.after(errorMessage("please select your course"));
  } else {
    return true;
  }
}

function phoneValidate(element, input) {
  let regex = /^[0-9]+$/;
  if (!input.match(regex) || input.length < 10) {
    element.after(
      errorMessage(
        "phone number must be at least 10 characters and just numbers"
      )
    );
  } else {
    return true;
  }
}

function genderValidate(elements) {
  let genderType;
  elements.forEach((element) => {
    if (element.checked === true) {
      genderType = element.nextElementSibling.innerHTML;
    }
  });
  return genderType;
}

function emailValidate(inputEmail) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!inputEmail.match(mailformat)) {
    const error = document.createElement("p");
    error.className = "error";
    error.innerHTML = "invalid email address";
    email.after(error);
  } else {
    return true;
  }
}

function passwordValidate(element, input) {
  if (input.search(/[0-9]/) || input.search(/[a-z]/) < 0 || input.length < 6) {
    element.after(
      errorMessage(
        "password must be atleast 6 characters and contain atleast one letter"
      )
    );
  } else {
    return true;
  }
}

function retypePassValidate(element, input, pass) {
  if (!(input === pass)) {
    element.after(errorMessage("password not match"));
  } else {
    return true;
  }
}
