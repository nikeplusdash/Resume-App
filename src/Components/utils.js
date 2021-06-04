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

// Changed due to speed concerns
export async function verifyUser2() {
    let token = getUser()
    if (!token) return false
    if (!token.accessToken) {localStorage.removeItem("user");return false}
    let api = process.env.REACT_APP_API + '/api/user'
    let options = {
        method: 'GET',
        headers: {
            'Authorization': token.accessToken,
            'G-Auth': localStorage.getItem("google"),
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

export async function verifyUser() {
    let token = getUser()
    if (!token) return false
    if (!token.accessToken) {localStorage.removeItem("user");return false}
    return true;
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

export const dummyUserData = {
    name: "Lorem Ipsum",
    current: "Lorem Ipsum",
    image: {
        shape: 0,
        data: "",
        isDisplayed: true
    },
    description: "Lorem Ipsum",
    highlight: [
        {
            type:"github",
            data:"Lorem Ipsum"
        },
        {
            type:"email",
            data:"Lorem Ipsum"
        },
        {
            type:"phone",
            data:"Lorem Ipsum",
        },
    ],
    education: [
        {
            place:"Lorem Ipsum",
            desc: "Lorem Ipsum",
            type:"Lorem Ipsum",
            scale: "gpa", // 4point/5point/10point/100percent
            marks: "10",
            from: "2019",
            to: "2021",
            isCurrent: false
        }
    ],
    experience: [
        {
            place:"Lorem Ipsum",
            desc: "Lorem Ipsum",
            referal:"Lorem Ipsum",
            from: "2019",
            to: "2021",
            isCurrent: false
        }
    ],
    languages: [
        {
            name: "English",
            proficiency: 0.9,
            scale: 10
        }
    ],
    skills: ["Listening","Speaking","Analysing"],
    interests: ["Playing","Reading","Singing"]
}