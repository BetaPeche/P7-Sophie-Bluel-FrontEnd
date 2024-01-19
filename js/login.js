const form = document.querySelector("#contact form")
const button = document.querySelector('#contact input[type="submit"]')


form.addEventListener("submit", (event)=> {
    event.preventDefault()
    let mail = document.getElementById("email")
    let mailValue = mail.value 

    let password = document.getElementById("password")
    let passwordValue = password.value.trim()
    if(passwordValue === "" || mailValue === ""){
        afficherErreur("Veuillez remplir tous les champs")
    }
    else{
        const connect = {
            email: mailValue,
            password: passwordValue
        }
        connectionDB(connect)
    }
})

function afficherErreur(text) {
    const testSpan = document.querySelector("#contact form span")
    if(!testSpan){
        const span = document.createElement('span')
        span.innerText = text
        form.insertBefore(span, button)
    }
    else{
        if (text !== testSpan.innerText){
            testSpan.remove()
            const span = document.createElement('span')
            span.innerText = text
            form.insertBefore(span, button)
        }
    }
}

// Connection à l'API
async function connectionDB(obj){
    const connectDB = JSON.stringify(obj)
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: connectDB
    })
    const jobs = await reponse.json()
    if(jobs.userId){
        const token = jobs.token
        localStorage.setItem("token", token)
        location.href = "index.html"
    }
    else{
        afficherErreur("Mauvaise combinaison Email/mot de passe")
    }
}