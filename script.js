const textInput = document.getElementById("text");
const sizeSelect = document.getElementById("size");
const levelSelect = document.getElementById("level");
const fgInput = document.getElementById("fg");
const bgInput = document.getElementById("bg");
const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const qrBox = document.getElementById("qr");
const message = document.getElementById("message");

let qrcode = null;

function generateQR() {
  const text = textInput.value.trim();
  message.textContent = "";

  if (!text) {
    message.textContent = "Please enter some text or a URL.";
    downloadBtn.disabled = true;
    qrBox.innerHTML = "";
    qrcode = null;
    return;
  }

  const size = parseInt(sizeSelect.value, 10);

  // Clear the previous QR code
  qrBox.innerHTML = "";

  try {
    qrcode = new QRCode(qrBox, {
      text: text,
      width: size,
      height: size,
      colorDark: fgInput.value,
      colorLight: bgInput.value,
      correctLevel: QRCode.CorrectLevel[levelSelect.value],
    });
    downloadBtn.disabled = false;
  } catch (err) {
    message.textContent = "Text is too long for this error-correction level. Try a lower level.";
    downloadBtn.disabled = true;
  }
}

function downloadQR() {
  const canvas = qrBox.querySelector("canvas");
  const img = qrBox.querySelector("img");
  let dataUrl = "";

  if (img && img.src) {
    dataUrl = img.src;
  } else if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  }

  if (!dataUrl) return;

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "qrcode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    generateQR();
  }
});