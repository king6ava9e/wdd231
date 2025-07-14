const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json"; // url for the prophets info in a form of a string.
const cards = document.querySelector("#cards");

 async function getProphetData(params) {
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data)
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement("section");
        const fullName = document.createElement("h2");

        const portrait = document.createElement("img");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`// setting the propehts name
        // building the image
        portrait.setAttribute("src",prophet.imageurl);
        portrait.setAttribute("alt", "portrait of ${prophet.imageurl}");
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        // Append the selection cards with the created element
        card.appendChild(portrait);
        card.appendChild(fullName);

        cards.appendChild(card);

        fullName.classList.add("prophet_name");
        card.classList.add("card");


    });
}