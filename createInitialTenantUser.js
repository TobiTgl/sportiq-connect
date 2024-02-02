const util = require("node:util");

async function main() {
  // ↓↓↓↓↓↓↓↓ config ↓↓↓↓↓↓↓↓
  const payload = {
    adminPassword: "", // see backend/.env

    // details of the user, which should be created
    displayName: "",
    email: "",
    tenant: "",
  };

  // the url where the website is hosted e.q. "https://sportiq-connect.de" or "http://localhost:4000"
  const domain = "https://sportiq-connect.de";

  // ↑↑↑↑↑↑↑↑ config ↑↑↑↑↑↑↑↑

  try {
    let response = await fetch(`${domain}/auth/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let data = await response.json();

    console.log("Successfully created user:\n", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
