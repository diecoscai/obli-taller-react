const CENSO_API_USER = 'censoAppUser';

const setUserToLocalStorage = (userData) => {
    localStorage.setItem(CENSO_API_USER, JSON.stringify(userData));
};

const removeUserFromLocalStorage = () => {
    localStorage.removeItem(CENSO_API_USER);
};

const getItemFromLocalSotrage = (key) => {
    return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : null;
};

export {
    setUserToLocalStorage,
    removeUserFromLocalStorage,
    getItemFromLocalSotrage,
};
