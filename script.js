const thumbnails = document.querySelectorAll(".thumbnail");
const mainImage = document.getElementById("mainImage");
const mainPlaceholder = document.getElementById("mainPlaceholder");

// 小さな画像をクリックすると、中央の画像を切り替えます。
thumbnails.forEach((button) => {
  button.addEventListener("click", () => {
    const imagePath = button.dataset.image;

    thumbnails.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    mainImage.style.display = "block";
    mainPlaceholder.style.display = "none";
    mainImage.onerror = () => {
      mainImage.style.display = "none";
      mainPlaceholder.style.display = "grid";
    };
    mainImage.src = imagePath;
    mainImage.alt = button.querySelector("img")?.alt || "チケット";
  });
});

// 下部ボタンのリンク先は index.html の href="#" を変更してください。
// # のままだとページ内の先頭へ移動するだけです。
