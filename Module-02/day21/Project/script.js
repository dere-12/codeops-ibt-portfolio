const form = document.getElementById("form");
const signupCountDisplay = document.getElementById("signupCount");
const messageArea = document.getElementById("messageArea");

function updateSignupCount() {
  const storedSignups = JSON.parse(localStorage.getItem("signups")) || [];
  signupCountDisplay.textContent = `Total signed up: ${storedSignups.length}`;
}

window.addEventListener("DOMContentLoaded", updateSignupCount);

const handleSubmit = (e) => {
  e.preventDefault();
  messageArea.textContent = "";
  messageArea.className = "";

  const name = document.getElementById("name").value.trim();
  const phoneNumber = Number(document.getElementById("phoneNo").value.trim());
  const ethPhoNo = /^(?:\+251|0)9|\d{8}$/;

  if (name.length < 2) {
    messageArea.textContent = "Name must be at least 2 characters long.";
    messageArea.className = "error";
    return;
  }

  if (!ethPhoNo.test(phoneNumber)) {
    messageArea.textContent =
      "Please enter a valid Ethiopian phone number (e.g., 0912345678 or +251912345678).";
    messageArea.className = "error";

    return;
  }

  const newUser = {
    name,
    phoneNumber,
  };

  const storedUsers = JSON.parse(localStorage.getItem("signups")) || [];

  storedUsers.push(newUser);
  localStorage.setItem("signups", JSON.stringify(storedUsers));

  messageArea.textContent = "Form submitted successfully!";
  messageArea.className = "success";
  form.reset();

  updateSignupCount();
};

form.addEventListener("submit", handleSubmit);
