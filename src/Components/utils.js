export const getUser = () => {
    return JSON.parse(sessionStorage.getItem('user'))
}

export const setUser = (data) => {
    return sessionStorage.setItem('user', JSON.stringify(data))
}

export const deleteSession = () => {
    sessionStorage.removeItem('user')
}

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken }
    } else {
        return {}
    }
}

export function getToken() {
    console.log("Hi")
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
        return user.accessToken
    } else {
        return null
    }
}

export function restoreSession() {
    fetch(process.env.API,{headers: authHeader})
        .then(data => setUser(data))
}

export const DesignPalette = {
    1: {
        name: "Cherry Red",
        startColor: "#FF0C0C",
        endColor: "#FF9DC1",
        fontColor: "#F20D0D",
        specialFontColor: "#FFFFFF",
        accentColor: "",
        backgroundGradientCSS: "var(--gradient1-45)"
    },
    2: {
        name: "Aqua Sky",
        startColor: "#8E40FF",
        endColor: "#00BAFF",
        fontColor: "#8547FF",
        specialFontColor: "#FFFFFF",
        accentColor: "",
        backgroundGradientCSS: "var(--gradient2-45)"
    },
    3: {
        name: "Lime Glacier",
        startColor: "#6FFFD8",
        endColor: "#D5FFA3",
        fontColor: "#65FF7E",
        specialFontColor: "#000000",
        accentColor: "",
        backgroundGradientCSS: "var(--gradient6-45)"
    }
}