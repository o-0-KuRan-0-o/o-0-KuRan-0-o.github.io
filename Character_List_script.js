const thumbnails = document.querySelectorAll(".thumbnail");
const mainDisplay = document.getElementById("mainDisplay");
const mainImage = document.getElementById("mainImage");
const mainPlaceholder = document.getElementById("mainPlaceholder");

function showTicketStack(startNumber) {
  mainDisplay.querySelector(".ticket-stack")?.remove();
  mainImage.style.display = "none";
  mainPlaceholder.style.display = "none";

  const endNumber = startNumber + 4;
  const stack = document.createElement("div");
  stack.className = "ticket-stack";
  stack.style.top = "100px";
  stack.setAttribute("aria-label", `チケット${String(startNumber).padStart(3, "0")}から${String(endNumber).padStart(3, "0")}`);

  // 後ろの番号から作成し、通常時は先頭の番号を一番前にする
  for (let number = endNumber; number >= startNumber; number--) {
    const ticketLink = document.createElement("a");
    ticketLink.className = "ticket-link";
    ticketLink.href = `Page_Characters/Character${String(number).padStart(3, "0")}.html`;
    ticketLink.setAttribute("aria-label", `キャラクター${String(number).padStart(3, "0")}のページへ`);

    const ticket = document.createElement("img");
    ticket.src = `images/Page_Character_List/Ticket_${String(number).padStart(3, "0")}.png`;
    ticket.alt = `チケット${String(number).padStart(3, "0")}`;
    ticketLink.style.setProperty("--ticket-rotation", `${(number - startNumber) * 10}deg`);

    const originalZIndex = endNumber - number + 1;
    ticketLink.style.zIndex = String(originalZIndex);
    ticketLink.addEventListener("mouseenter", () => {
      ticketLink.style.zIndex = "10";
    });
    ticketLink.addEventListener("mouseleave", () => {
      ticketLink.style.zIndex = String(originalZIndex);
    });

    ticket.onerror = () => ticketLink.remove();
    ticketLink.appendChild(ticket);
    stack.appendChild(ticketLink);
  }

  mainDisplay.appendChild(stack);
}

function showSingleImage(imagePath, altText) {
  mainDisplay.querySelector(".ticket-stack")?.remove();
  mainPlaceholder.style.display = "none";
  mainImage.style.display = "block";
  mainImage.onerror = () => {
    mainImage.style.display = "none";
    mainPlaceholder.style.display = "grid";
  };
  mainImage.src = imagePath;
  mainImage.alt = altText || "Ticket";
}

thumbnails.forEach((button, index) => {
  button.addEventListener("click", () => {
    thumbnails.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    // 各タブで対応する5枚のチケットを表示
    showTicketStack(index * 5 + 1);
  });
});
