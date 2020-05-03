import cipher from "./cipher.js";

const message = document.querySelector("#message");
const finalMessage = document.querySelector("#final-message");
const messageDecode = document.querySelector("#message-decode");
const finalMessageDecode = document.querySelector("#final-message-decode");
const offset = document.querySelector("#offset");
const encodeBtn = document.querySelector("#encode-btn");
const decodeBtn = document.querySelector("#decode-btn");
const offsetAndOptions = document.querySelector("#offset-and-options");
const writeLetter = document.querySelector("#write-letter");
const decodeLetter = document.querySelector("#decode-letter");
const returnToOptions = document.querySelector("#return-to-options");
const clear = document.querySelector("#clear");
const returnToOptionsDecode = document.querySelector("#return-to-options-decode");
const clearDecode = document.querySelector("#clear-decode");
const errorMessage = document.querySelector("#error");
const sendWP = document.querySelector("#send-to-wp");
const sendTG = document.querySelector("#send-to-tg");

const showFinalMessage = (message) => finalMessage.innerHTML = message;
const showFinalMessageDecode = (messageDecode) => finalMessageDecode.innerHTML = messageDecode.replace("cartadeamor.github.io", "");

const openAndCloseOptions = (visibilityOne, visibilityTwo, visibilityThree) => {
  offsetAndOptions.classList.remove(...offsetAndOptions.classList);
  offsetAndOptions.classList.add(visibilityOne);

  writeLetter.classList.remove(...writeLetter.classList);
  writeLetter.classList.add(visibilityTwo);

  decodeLetter.classList.remove(...decodeLetter.classList);
  decodeLetter.classList.add(visibilityThree);
}

const validateOffset = (offset) => {
  const parsedOffset = Number(offset);

  if (isNaN(parsedOffset) || parsedOffset === "" || parsedOffset === -0) {
    errorMessage.innerHTML = "Insira um número";
    return;
  }

  if (parsedOffset >= 0) {
    openAndCloseOptions("invisible", "visible", "invisible");
  } else if (parsedOffset < 0) {
    openAndCloseOptions("invisible", "invisible", "visible");
  } else {
    openAndCloseOptions("visible", "invisible", "invisible");
  }

  startCipher(parsedOffset);
}

const startCipher = (offset) => {
  message.addEventListener("input", () => {
    const cipheredMessage = cipher(offset, message.value);
    showFinalMessage(cipheredMessage)
  });

  messageDecode.addEventListener("input", () => {
    const cipheredMessage = cipher(offset, messageDecode.value);
    showFinalMessageDecode(cipheredMessage)
  });
}

const clearInputs = () => {
  message.value = "";
  finalMessage.innerHTML = "";
  errorMessage.innerHTML = "";
  offset.value = "";

  messageDecode.value = "";
  finalMessageDecode.innerHTML = "";
}

const sendWhatsApp = () => {
  window.open("https://wa.me/?text=cartadeamor.github.io%0A" + finalMessage.innerHTML);
}

const sendTelegram = () => {
  window.open("https://t.me/share/url?url=cartadeamor.github.io&text=" + finalMessage.innerHTML);
}

encodeBtn.addEventListener("click", () => validateOffset(offset.value))
decodeBtn.addEventListener("click", () => validateOffset(-offset.value))

returnToOptions.addEventListener("click", () => {
  openAndCloseOptions("visible", "invisible", "invisible");
  clearInputs();
});

returnToOptionsDecode.addEventListener("click", () => {
  openAndCloseOptions("visible", "invisible", "invisible");
  clearInputs();
});

clear.addEventListener("click", clearInputs);
clearDecode.addEventListener("click", clearInputs);

sendWP.addEventListener("click", sendWhatsApp);
sendTG.addEventListener("click", sendTelegram);
