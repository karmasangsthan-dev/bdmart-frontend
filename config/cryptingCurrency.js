const CryptoJS = require("crypto-js");
const algorithm = "AES";

// Define the static fixed passphrase
const staticPassphrase = "MyStaticPassphrase123!@#";

// Generate the key from the passphrase
const secretKey = CryptoJS.enc.Utf8.parse(staticPassphrase);

export const encryptCurrency = (currencyRate) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(currencyRate?.toString(), secretKey, {
    iv: iv,
  }).toString();

  localStorage.setItem(
    "currencyRate",
    JSON.stringify({ encrypted: encrypted, iv: iv.toString() })
  );
};

export const decryptCurrency = () => {
  const storedData = JSON.parse(localStorage.getItem("currencyRate"));
  if (!storedData) return null;

  const iv = CryptoJS.enc.Hex.parse(storedData.iv);
  const decrypted = CryptoJS.AES.decrypt(storedData.encrypted, secretKey, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);

  return parseFloat(decrypted);
};
