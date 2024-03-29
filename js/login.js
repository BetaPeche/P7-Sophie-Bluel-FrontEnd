const URL_API = "http://localhost:5678/api"
const form = document.querySelector("#contact form")

validateButton()

// Gère le clic sur le bouton 
function validateButton(){
    form.addEventListener("submit", (event)=> {
        event.preventDefault()
        let mail = document.getElementById("email")
        let mailValue = mail.value 

        let password = document.getElementById("password")
        let passwordValue = password.value.trim()
        if(passwordValue === "" || mailValue === ""){
            showError("Veuillez remplir tous les champs")
        }
        else{
            const connect = {
                email: mailValue,
                password: passwordValue
            }
            connexionDB(connect)
        }
    })
}

// Affiche les messages d'erreur sur le formulaire
function showError(text) {
    const testSpan = document.querySelector("#contact form span")
    const button = document.querySelector('#contact input[type="submit"]')
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
async function connexionDB(obj){
    const connectDB = JSON.stringify(obj)
        try { 
            let respons = await fetch(`${URL_API}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: connectDB
            })  
            const jobs = await respons.json()
    
            if(jobs.userId){
                const token = jobs.token
                localStorage.setItem("token", token)
                location.href = "index.html"
            }
            else{
                showError("Erreur dans l’identifiant ou le mot de passe")
            }
        }
        catch (err) {
            console.error(err.message)
        }
    
}