const validUser = (user, pass) => {
  const objUser = {
    usuario: user,
    password: pass
  };

  return fetch('https://censo.develotion.com/login.php', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(objUser)
  }).then((response) => response.json());
};

export { validUser };
