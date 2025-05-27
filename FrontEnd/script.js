async function fetchComToken(url, options = {}) {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  options.headers = {
    ...options.headers,
    'Authorization': token,
    'Content-Type': 'application/json',
  };

  const resposta = await fetch(url, options);

  if (resposta.status === 401 || resposta.status === 403) {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    return;
  }

  return resposta.json();
}