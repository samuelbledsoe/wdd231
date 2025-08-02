document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const fname = params.get("fname");
  const lname = params.get("lname");
  const email = params.get("email");
  const phone = params.get("phone");
  const orgname = params.get("orgname");
  const timestamp = params.get("timestamp");

  const output = `
    <p><strong>First Name:</strong> ${fname}</p>
    <p><strong>Last Name:</strong> ${lname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Organization Name:</strong> ${orgname}</p>
    <p><strong>Submitted At:</strong> ${new Date(timestamp).toLocaleString()}</p>
  `;

  document.getElementById("submitted-data").innerHTML = output;
});
