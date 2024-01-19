async function recuperationTravaux(){
    if(!localStorage.getItem("works")){
        const reponse = await fetch("http://localhost:5678/api/works")
        let jobs = await reponse.json()
        
        jobs = JSON.stringify(jobs)
        localStorage.setItem("works", jobs) 
    }
    let works = localStorage.getItem("works")
    works = JSON.parse(works)
    console.log(works)
    afficherTravaux(works)

    // Récupère et affiche les catégories via l'API  
    if(!localStorage.getItem("category")){
        const resp = await fetch("http://localhost:5678/api/categories")
        let cate= await resp.json() 
        
        cate = JSON.stringify(cate)
        localStorage.setItem("category", cate) 
    }
    let category = localStorage.getItem("category")
    category = JSON.parse(category)
    
    
    const divCat = document.querySelector(".category")
    for (let i = 0; i < category.length; i++) {
        if(!i){
            const link = document.createElement("button")

            link.classList.add("category__link")
            link.classList.add("link-selected")
            link.innerText="Tous"
            divCat.appendChild(link)
            link.addEventListener("click", (event)=> {
                effacerClassCategorie()
                afficherTravaux(works)
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
            effacerClassCategorie()
            const activeLink = event.currentTarget
            const numbCat = activeLink.getAttribute("data-category-id")
            const newArray = works.filter(function (works) {
                return works.categoryId == numbCat
            })
            afficherTravaux(newArray)
            activeLink.classList.add("link-selected")
        })
    }
}

recuperationTravaux()
estConnecte()
afficherModale()
fermerModale()





// Créer et affiche les travaux via un tableau
function afficherTravaux(tableau) {
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
function effacerClassCategorie() {
    const links = document.querySelectorAll(".category button")
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("link-selected")
    }
}

// Vérifie si l'utilisateur est connecté
function estConnecte() {
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
    window.localStorage.removeItem("token")

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
function afficherModale() {
    const button = document.querySelector(".edit-button button")
    const modal = document.querySelector(".modal")

    button.addEventListener("click", () => {
        modal.style.display = "flex"
    })
}

// Ferme la modale
function fermerModale() {
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





