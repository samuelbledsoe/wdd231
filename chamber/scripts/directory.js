async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  const directory = document.querySelector('#directory');
  directory.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = `Logo of ${member.name}`;
    img.loading = 'lazy';

    const name = document.createElement('h3');
    name.textContent = member.name;

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.textContent = member.phone;

    const link = document.createElement('a');
    link.href = member.website;
    link.target = '_blank';
    link.textContent = 'Visit Website';

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(link);

    directory.appendChild(card);
  });
}

document.querySelector("#grid").addEventListener("click", () => {
  document.querySelector("#directory").classList.add("grid-view");
  document.querySelector("#directory").classList.remove("list-view");
});

document.querySelector("#list").addEventListener("click", () => {
  document.querySelector("#directory").classList.add("list-view");
  document.querySelector("#directory").classList.remove("grid-view");
});

document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

getMembers();
