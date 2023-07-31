export function setCookie(name, value, daysToExpire) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    cookieString += `; expires=${expirationDate.toUTCString()}`;
  }

  // Set the cookie
  document.cookie = cookieString;
}
