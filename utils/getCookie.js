export function getCookie(cookieName) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return decodeURIComponent(value); // Return the decoded value
    }
  }

  return null; // Cookie not found
}
