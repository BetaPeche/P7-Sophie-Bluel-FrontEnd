const form = document.querySelector("#contact form")
const button = document.querySelector('#contact input[type="submit"]')


form.addEventListener("submit", (event)=> {
    event.preventDefault()
    let mail = document.getElementById("email")
    let mailValue = mail.value 

    let password = document.getElementById("password")
    let passwordValue = password.value.trim()
    if(passwordValue === ""){
        afficherErreur()
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
            console.log(result);
        })
    }
})

function afficherErreur() {
    const span = document.createElement('span')
    const testSpan = document.querySelector("#contact form span")
    if(!testSpan){
        span.innerText = "Mot de passe vide"
        form.insertBefore(span, button)
    }
}