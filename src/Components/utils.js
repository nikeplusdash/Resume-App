export const getUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
}

export const setUser = (data) => {
    return sessionStorage.setItem('user', JSON.stringify(data));
}

export const deleteSession = () => {
    sessionStorage.removeItem('user');
}

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

export function getToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return user.accessToken;
    } else {
        return null;
    }
}

export function restoreSession() {
    fetch(process.env.API,{headers: authHeader})
        .then(data => setUser(data));;
}