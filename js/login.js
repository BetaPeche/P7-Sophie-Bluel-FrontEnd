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
        const connectDB = JSON.stringify(connect)


        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: connectDB
        })
        .then(response => response.json())
        .then(result => { 
            if(result.userId){
                console.log("connection ok")
                const token = result.token
                console.log(token)
                window.localStorage.setItem("token", token)
                window.location.href = "index.html"
            }
            else{
                afficherErreur("Mauvaise combinaison Email/mot de passe")
            }
        })
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