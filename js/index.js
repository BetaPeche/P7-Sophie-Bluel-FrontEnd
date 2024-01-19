const URL_API = "http://localhost:5678/api"

main()




/////////////////////////////////////////// FONCTIONS ////////////////////////////////////////////////////

//Fonction principale, récupère et affiche les catégories et les travaux
async function main() { 
    const works = await fetchWorks()
    showWorks(works) 
    const category = await fetchCategories()
    showFilterCategories(category, works)
    isConnected()
    showModal()
    closeModal()
}

// Récupère les catégories via l'API
async function fetchWorks() {
    if(!localStorage.getItem("works")){
        let reponse
        try { reponse = await fetch(`${URL_API}/works`) }
        catch (err) {
            console.error(err.message)
        }
        let jobs = await reponse.json()
            
        localStorage.setItem("works", JSON.stringify(jobs)) 
    }
    return JSON.parse(localStorage.getItem("works"))
}

// Récupère les catégories via l'API
async function fetchCategories(){  
    if (!localStorage.getItem("category")) {
        let resp
        try { resp = await fetch(`${URL_API}/categories`) }
        catch (err) {
            console.error(err.message)
        }
        let cate =  await resp.json() 
        
        localStorage.setItem("category", JSON.stringify(cate)) 
    }
    return JSON.parse(localStorage.getItem("category"))
}

// Affiche les categories
function showFilterCategories(category, works){
    const divCat = document.querySelector(".category")
    for (let i = 0; i < category.length; i++) {
        if(!i){
            const link = document.createElement("button")

            link.classList.add("category__link")
            link.classList.add("link-selected")
            link.innerText="Tous"
            divCat.appendChild(link)
            link.addEventListener("click", (event)=> {
                deleteCategoryClass()
                showWorks(works)
                const activeLink = event.currentTarget
                activeLink.classList.add("link-selected")
            })
        }

        const link = document.createElement("button")

        link.setAttribute("data-category-id", category[i].id)
        link.classList.add("category__link")
        link.innerText=category[i].name
        divCat.appendChild(link)

        link.addEventListener("click", (event)=> {
            deleteCategoryClass()
            const activeLink = event.currentTarget
            const numbCat = activeLink.getAttribute("data-category-id")
            const newArray = works.filter(function (works) {
                return works.categoryId == numbCat
            })
            showWorks(newArray)
            activeLink.classList.add("link-selected")
        })
    }
}

// Affiche les travaux via un tableau
function showWorks(tableau) {
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''

    for (let i = 0; i < tableau.length; i++) {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")

        img.setAttribute("src", tableau[i].imageUrl)
        img.setAttribute("alt", tableau[i].title)
        figcaption.innerText = tableau[i].title

        gallery.appendChild(figure)
        figure.appendChild(img)
        figure.appendChild(figcaption)
    }
}

// Supprime la classe "link-selected" sur les liens
function deleteCategoryClass() {
    const links = document.querySelectorAll(".category button")
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("link-selected")
    }
}

// Vérifie si l'utilisateur est connecté
function isConnected() {
    const token = window.localStorage.getItem("token")
    if(token){
        logIn()
    }
}

// Connecte l'utilisateur
function logIn(){
    const liLink = document.querySelectorAll("header nav ul li")
    const loginLink = liLink[2]

    const editBar = document.querySelector(".edit-mode")
    editBar.style.display = "flex"

    const header = document.querySelector("header")
    header.style.marginTop = "109px"

    const category = document.querySelector(".category")
    category.style.display = "none"

    const gallery = document.querySelector(".gallery")
    gallery.style.marginTop = "92px"

    const editButton = document.querySelector(".edit-button")
    editButton.style.display = "block"

    loginLink.innerText = "logout"
    loginLink.addEventListener("click", (event)=> {
        if(loginLink.innerText === "logout") {
            loginLink.innerHTML = '<a href="login.html">login</a>'
            logOut()
        }
    })
}

// Deconnecte l'utilisateur
function logOut(){
    window.localStorage.removeItem("token") // @TODO : remove window.

    const editBar = document.querySelector(".edit-mode")
    editBar.style.display = "none"

    const header = document.querySelector("header")
    header.style.marginTop = "50px"

    const category = document.querySelector(".category")
    category.style.display = "flex"

    const gallery = document.querySelector(".gallery")
    gallery.style.marginTop = "0px"

    const editButton = document.querySelector(".edit-button")
    editButton.style.display = "none"
}

// Affiche la modale
function showModal() {
    const button = document.querySelector(".edit-button button")
    const modal = document.querySelector(".modal")

    button.addEventListener("click", () => {
        modal.style.display = "flex"
    })
}

// Ferme la modale
function closeModal() {
    const modal = document.querySelector(".modal")
    const windowModal = document.querySelector(".window-modal")
    const closeBtn = document.querySelector(".fa-xmark")

    closeBtn.addEventListener("click", (event) => {
        modal.style.display = "none"
    })

    modal.addEventListener("click", (event) => {
        modal.style.display = "none"
    })
    windowModal.addEventListener("click", (event) => {
        event.stopPropagation()
    })
}





