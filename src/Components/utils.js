import axios from "axios"

export const getUser = () => {
    let x = sessionStorage.getItem('user')
    if (!x) return x;
    return JSON.parse(x)
}

export const setUser = (data) => {
    return sessionStorage.setItem('user', JSON.stringify(data))
}

export const deleteSession = () => {
    sessionStorage.removeItem('user')
}

export async function verifyUser() {
    let token = getUser()
    if (!token) return false
    if (!token.accessToken) {localStorage.removeItem("user");return false}
    let api = process.env.REACT_APP_API + '/api/user'
    let options = {
        method: 'POST',
        data: {
            google: localStorage.getItem("google")
        },
        headers: {
            'Authorization': token.accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return axios(api + '/auth', options)
        .then((res) => {
            return res.data.auth
        })
        .catch(err => { console.log(err); return false })
}

export function restoreUser(id, token) {

    // this is INCOMPLETE & probably not needed

    let api = process.env.REACT_APP_API + '/api/user'
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': token },
        data: { id: id }
    }
    axios(api + '/restore', options)
        .then((res) => {
            setUser(res)
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        })
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