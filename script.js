const tasks = [
    { question: "Hast du die Nachricht bekommen, _____ ich dir geschickt habe?", answer: "die" },
    { question: "Das ist ein Tag, _____ ich nie vergessen werde.", answer: "den" },
    { question: "Hast du einen Freund, _____ gut Deutsch spricht?", answer: "der" },
    { question: "Bitte bring den Brief, _____ auf dem Tisch liegt, zur Post.", answer: "der" },
    { question: "Das Auto, _____ sie gekauft haben, hat 50.000 Euro gekostet.", answer: "das" },
    { question: "Wo ist denn die Brille, _____ ich gerade hier auf den Tisch gelegt habe?", answer: "die" },
    { question: "Ich möchte mit dem Mechaniker sprechen, _____ mein Auto repariert hat.", answer: "der" },
    { question: "Das Buch gehört der Schülerin, _____ hier am Fenster sitzt.", answer: "die" },
    { question: "Da ist ja der Schirm, _____ ich die ganze Zeit gesucht habe.", answer: "den" },
    { question: "Der Brief, _____ du geschrieben hast, ist sehr interessant.", answer: "den" },
    { question: "Der Ring, _____ ich verloren habe, war ein Geschenk meiner Oma.", answer: "den" },
    { question: "Der Kuchen, _____ du gestern mitgebracht hast, war total lecker.", answer: "den" },
    { question: "Weißt du, wie der Maler heißt, _____ dieses Bild gemalt hat?", answer: "der" },
    { question: "Wo sind eigentlich die Fotos, _____ ich dir zeigen wollte?", answer: "die" },
    { question: "Ich kenne eine Frau, _____ sieben Sprachen spricht.", answer: "die" },
    { question: "Gestern habe ich ein Handy gesehen, _____ ich gern kaufen möchte.", answer: "das" },
    { question: "Das ist meine Tante, _____ in den USA lebt.", answer: "die" },
    { question: "Ein Glückspilz ist ein Mensch, _____ immer Glück hat.", answer: "der" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);