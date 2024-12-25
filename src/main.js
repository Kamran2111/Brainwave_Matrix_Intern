import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("downloadButton");

  const androidLink =
    "https://play.google.com/store/apps/details?id=com.example.app";
  const iosLink = "https://apps.apple.com/app/id123456789";
  const desktopLink =
    "https://play.google.com/store/apps/details?id=com.example.app";

  downloadButton.addEventListener("click", () => {
    const userAgent = navigator.userAgent;

    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    const isDesktop = !isAndroid && !isIOS;

    if (isAndroid) {
      window.location.href = androidLink;
    } else if (isIOS) {
      window.location.href = iosLink;
    } else if (isDesktop) {
      window.location.href = desktopLink;
    } else {
      alert("Your device is not supported.");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const currentHash = window.location.hash;

  const updateActiveLink = (hash) => {
    links.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.classList.add("bg-gray-700", "scale-110");
      } else {
        link.classList.remove("bg-gray-700", "scale-110");
      }
    });
  };

  updateActiveLink(currentHash);

  window.addEventListener("hashchange", () => {
    updateActiveLink(window.location.hash);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;

    const increment = target / 50;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.innerText =
          Math.ceil(current) + (counter.innerText.includes("K") ? "K+" : "+");
        setTimeout(updateCounter, 30);
      } else {
        counter.innerText =
          target + (counter.innerText.includes("K") ? "K+" : "+");
      }
    };

    updateCounter();
  });
});

async function loadCryptoSuggestions() {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets");

    if (response.status !== 200) {
      console.error("Ошибка загрузки данных");
      return;
    }

    const cryptos = response.data.data;
    const cryptoSuggestions = document.getElementById("crypto-suggestions");
    cryptoSuggestions.innerHTML = "";

    cryptos.forEach((crypto) => {
      const option = document.createElement("option");
      option.value = crypto.name;
      cryptoSuggestions.appendChild(option);
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
}
loadCryptoSuggestions();

document.getElementById("search-button").addEventListener("click", async () => {
  const input = document
    .getElementById("crypto-input")
    .value.trim()
    .toLowerCase();
  const cryptoResult = document.getElementById("crypto-result");
  const cryptoName = document.getElementById("crypto-name");
  const cryptoPrice = document.getElementById("crypto-price");
  const cryptoChange = document.getElementById("crypto-change");
  const cryptoSymbol = document.getElementById("crypto-symbol");

  if (!input) {
    alert("Enter the name of the cryptocurrency!");
    return;
  }

  try {
    const response = await axios.get(
      `https://api.coincap.io/v2/assets/${input}`
    );

    if (response.status !== 200) {
      alert("Cryptocurrency not found!");
      return;
    }

    const data = response.data.data;

    cryptoName.textContent = data.name;
    cryptoSymbol.textContent = `Symbol: ${data.symbol}`;
    cryptoPrice.textContent = `Price: $${parseFloat(data.priceUsd).toFixed(2)}`;
    cryptoChange.textContent = `Change in 24h: ${parseFloat(
      data.changePercent24Hr
    ).toFixed(2)}%`;

    cryptoResult.classList.remove("hidden");
  } catch (error) {
    console.error("Error loading data:", error);
    alert("Failed to load data. Please try again later.");
  }
});
