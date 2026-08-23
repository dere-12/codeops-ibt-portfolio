// Exercise - 1
async function getRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) {
      return new Error("HTTP " + res.status);
    }

    const data = await res.json();
    console.log(data.rates);
  } catch (err) {
    console.log("Could not get exchange rate: ", err.message);
  }
}

// getRate()

// Exercise - 2
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  // .then(users => console.log("Using .then: ", users))
  .catch((error) => console.error(error));

async function loadUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const users = await res.json();

    console.log("Using aysnc function: ", users);
  } catch (error) {
    console.error(error);
  }
}

// loadUsers()

// Exercis - 3
async function testWrongUrl() {
  try {
    const res = await fetch(
      "https://this-domain-definitely-does-not-exist-12345.com",
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log("Caught error:", error.message);
  }
}

// testWrongUrl();

async function test404() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/99999");

    console.log("fetch resolved");

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log("Caught error:", error.message);
  }
}

// test404();

// Exercise - 4
async function getFirstTwoPostDetails() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const posts = await res.json();

    const firstTwo = posts.slice(0, 2);

    const details = await Promise.all(
      firstTwo.map(async (post) => {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        );

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        return res.json();
      }),
    );

    console.log(details);
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

// getFirstTwoPostDetails();

// Exercise - 5
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const dataList = document.querySelector("#data");

async function loadUsers() {
  loading.style.display = "block";
  error.style.display = "none";
  dataList.style.display = "none";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const users = await res.json();

    dataList.textContent = "";

    users.forEach((user) => {
      const li = document.createElement("li");

      li.textContent = `${user.name} — ${user.email}`;

      dataList.append(li);
    });

    loading.style.display = "none";
    dataList.style.display = "block";
  } catch (err) {
    loading.style.display = "none";

    error.textContent = `Error: ${err.message}`;
    error.style.display = "block";
  }
}

loadUsers();
