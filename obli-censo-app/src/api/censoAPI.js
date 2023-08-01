const BASE_URL = 'https://censo.develotion.com';

const fetchLogin = async (user, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usuario: user,
      password: password
    })
  };
  try {
    const response = await fetch(`${BASE_URL}/login.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { apiKey, id } = data;
        return Promise.resolve({
          apiKey,
          id
        });
      });
    }

    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrido un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchRegister = async (user, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usuario: user,
      password: password
    })
  };
  try {
    const response = await fetch(`${BASE_URL}/usuarios.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { apiKey, id } = data;
        return Promise.resolve({
          apiKey,
          id
        });
      });
    }

    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrido un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchStates = async (apiKey, idUser) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apiKey,
      idUser
    }
  };
  try {
    const response = await fetch(`${BASE_URL}/departamentos.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { departamentos } = data;
        return Promise.resolve({
          departamentos
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrio un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchCitiesForState = async ({ idDepto, apiKey, idUser }) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apiKey,
      idUser
    }
  };
  try {
    const response = await fetch(
      `${BASE_URL}/ciudades.php?idDepartamento=${idDepto}`,
      requestOptions
    );
    if (response.status === 200) {
      return response.json().then((data) => {
        const { ciudades } = data;
        return Promise.resolve({
          ciudades
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrio un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchAllCities = async ({ apiKey, idUser }) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apiKey,
      idUser
    }
  };
  try {
    const response = await fetch(`${BASE_URL}/ciudades.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { ciudades } = data;
        return Promise.resolve({
          ciudades
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrio un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchGetPerson = async ({ apiKey, idUser }) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apiKey,
      idUser
    }
  };
  try {
    const response = await fetch(`${BASE_URL}/personas.php?idUsuario=${idUser}`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { personas } = data;
        return Promise.resolve({
          personas
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrio un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchAddPerson = async ({
  apiKey,
  idUser,
  name,
  idState,
  idCity,
  birthDate,
  idOccupation
}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apiKey,
      idUser
    },
    body: JSON.stringify({
      idUsuario: idUser,
      nombre: name,
      departamento: idState,
      ciudad: idCity,
      fechaNacimiento: birthDate,
      ocupacion: idOccupation
    })
  };
  try {
    const response = await fetch(`${BASE_URL}/personas.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { idCenso, mensaje } = data;
        return Promise.resolve({
          idCenso,
          mensaje
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrio un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchDeletePerson = async ({ apiKey, idUser, idCenso }) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      apiKey,
      idUser
    }
  };
  try {
    const response = await fetch(`${BASE_URL}/personas.php?idCenso=${idCenso}`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { mensaje } = data;
        return Promise.resolve({
          mensaje
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrio un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchGetOccupations = async (apiKey, idUser) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apiKey,
      idUser
    }
  };
  try {
    const response = await fetch(`${BASE_URL}/ocupaciones.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { ocupaciones } = data;
        return Promise.resolve({
          ocupaciones
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrio un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

const fetchTotalRegistered = async (apiKey, idUser) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apiKey,
      idUser
    }
  };
  try {
    const response = await fetch(`${BASE_URL}/totalCensados.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((data) => {
        const { total, mensaje } = data;
        return Promise.resolve({
          total,
          mensaje
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: 'Ha ocurrio un error'
    });
  } catch (error) {
    return Promise.reject({
      message: error
    });
  }
};

export {
  fetchLogin,
  fetchRegister,
  fetchStates,
  fetchCitiesForState,
  fetchAllCities,
  fetchGetPerson,
  fetchAddPerson,
  fetchDeletePerson,
  fetchGetOccupations,
  fetchTotalRegistered
};
