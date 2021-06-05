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
    if (!token.accessToken) { localStorage.removeItem("user"); return false }
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
    if (!token.accessToken) { localStorage.removeItem("user"); return false }
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
    name: "Rick Astley",
    current: "Artist",
    image: {
        shape: 0,
        data: ""
    },
    description: "I am a British singer, songwriter and radio personality who started singing at the age of 10 and gained widespread popularity through 1987 recording of my song \"Never Gonna Give You Up\" that was a number 1 hit single in 25 countries. Experienced in singing, drums and have won various local talent competitions",
    highlight: [
        {
            id: 0,
            type: "github",
            data: "Lorem Ipsum"
        },
        {
            id: 1,
            type: "instagram",
            data: "officialrickastley"
        },
        {
            id: 2,
            type: "envelope",
            data: "reallyrickastley@gmail.com"
        },
        {
            id: 3,
            type: "phone",
            data: "(+040) xxxyyyzz",
        },
    ],
    education: [
        {
            id: 0,
            place: "Lorem Ipsum",
            desc: "Astley was performing as a drummer with a soul band named FBI, with Morris on guitar. Astley was taught about the recording process and groomed for his future career",
            keypoints: [],
            type: "Lorem Ipsum",
            scale: "gpa", // 4point/5point/10point/100percent
            marks: "10",
            from: "2019",
            to: "2021",
            isCurrent: false
        },
        {
            id: 1,
            place: "Lorem Ipsum",
            desc: "Lorem Ipsum",
            keypoints: [],
            type: "Lorem Ipsum",
            scale: "gpa", // 4point/5point/10point/100percent
            marks: "10",
            from: "2019",
            to: "2021",
            isCurrent: false
        }
    ],
    experience: [
        {
            id: 0,
            place: "Lorem Ipsum",
            desc: "His first solo offering was \"Never Gonna Give You Up\", recorded on New Year's Day 1987, and released eight months later, in August. Astley's distinctive rich, deep voice combined with dance-pop made the song an immediate success, spending five weeks at the top of the British charts and becoming the year's highest-selling single. The song was also a worldwide number-one hit, topping the charts in 24 other countries, including the US, Australia, and West Germany. It was the first of 13 (worldwide) top 30 hit singles for him. \"Never Gonna Give You Up\" won Best British Single at the 1988 BPI awards (now called the BRIT Awards), and he performed it in front of a global audience of 100 million.",
            keypoints: [],
            referal: "Lorem Ipsum",
            from: "2019",
            to: "2021",
            isCurrent: false
        },
        {
            id: 1,
            place: "Lorem Ipsum",
            desc: "His first solo offering was \"Never Gonna Give You Up\", recorded on New Year's Day 1987, and released eight months later, in August. Astley's distinctive rich, deep voice combined with dance-pop made the song an immediate success, spending five weeks at the top of the British charts and becoming the year's highest-selling single. The song was also a worldwide number-one hit, topping the charts in 24 other countries, including the US, Australia, and West Germany. It was the first of 13 (worldwide) top 30 hit singles for him. \"Never Gonna Give You Up\" won Best British Single at the 1988 BPI awards (now called the BRIT Awards), and he performed it in front of a global audience of 100 million.",
            keypoints: [],
            referal: "Lorem Ipsum",
            from: "2019",
            to: "2021",
            isCurrent: false
        }
    ],
    languages: {
        scale: 10,
        items: [{
            id: 0,
            name: "English",
            proficiency: 0.9,
        },
        {
            id: 0,
            name: "Hindi",
            proficiency: 1,
        },
        {
            id: 0,
            name: "Urdu",
            proficiency: 0.5,
        },
        {
            id: 0,
            name: "French",
            proficiency: 0.7,
        },
        {
            id: 0,
            name: "Chinese",
            proficiency: 0.2,
        }
    ]},
    skills: ["Listening", "Speaking", "Analysing"],
    interests: ["Playing", "Reading", "Singing"],
    display: {
        highlight: ["phone", "instagram", "envelope"],
        main: ["education","experience","interests","languages","skills"]
    }
}