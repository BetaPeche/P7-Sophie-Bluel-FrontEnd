const URL_API = "http://localhost:5678/api"



main()




/////////////////////////////////////////// DECLARATION FONCTIONS ////////////////////////////////////////////////////

//Fonction principale, récupère et affiche les catégories et les travaux
async function main() { 
    const works = await fetchWorks()
    showWorks(works) 
    const category = await fetchCategories()
    showFilterCategories(category, works)
    isConnected()
    showModal(works)
    closeModal()
}

// Récupère les catégories via l'API
async function fetchWorks() {
        let reponse
        try { reponse = await fetch(`${URL_API}/works`) }
        catch (err) {
            console.error(err.message)
        }
        let jobs = await reponse.json()
        const stringJobs = JSON.stringify(jobs)

        if(!localStorage.getItem("works")){
            localStorage.setItem("works", stringJobs) 
        }else{
            const localJobs = localStorage.getItem("works")

            if (stringJobs !== localJobs){
                localStorage.setItem("works", stringJobs)
            }
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
    divCat.innerHTML = ''
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
    const token = localStorage.getItem("token")
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
    localStorage.removeItem("token")

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
        showPageOne()
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

//Affiche la première page de la modale
function showPageOne(){
    let modalBtn = document.querySelector(".modal-btn")
    const content = document.querySelector(".modal-works")
    const contentHide = document.querySelector(".upload-block")
    const title = document.querySelector(".modal-content h3")
    const works = JSON.parse(localStorage.getItem("works"))

    modalBtn.innerHTML = ''
    let button = document.createElement("button")
    modalBtn.appendChild(button)
    contentHide.style.display = "none"
    content.style.display = "grid"
    //content.innerHTML = ''
    title.innerText = "Galerie photo"
    button.innerText = "Ajouter une photo"

    showWorksInModal(works)
    button.addEventListener("click", () => {
        showPageTwo()
    }, {once : true})
}

//Affiche la deuxième page de la modale
function showPageTwo(){
    let modalBtn = document.querySelector(".modal-btn")
    const content = document.querySelector(".upload-block")
    const contentHide = document.querySelector(".modal-works")
    const title = document.querySelector(".modal-content h3")
    const inputTitle = document.getElementById("title-upload")
    const inputCategory = document.getElementById("category-upload")
    let inputImage = document.getElementById("input-image")

    modalBtn.innerHTML = ''
    inputTitle.value = ''
    let button = document.createElement("button")
    modalBtn.appendChild(button)

    contentHide.style.display = "none"
    content.style.display = "block"
    title.innerText = "Ajout photo"
    button.innerText = "Valider"
    showImage()
    showErrorInModal("")
    showCategoryInModal(inputCategory)

    button.addEventListener("click", () => {
        if(!inputImage.files[0] || !inputTitle.value){
            showErrorInModal("Un champ est vide")
        }else if(inputImage.files[0].size > 4194304) {
            showErrorInModal("Le poids de l'image doit être inférieur à 4Mo")
        }
        else if(inputImage.files[0].type !== "image/png" && inputImage.files[0].type !== "image/jpeg"){
            showErrorInModal("Mauvais format")
        }
        else{
            uploadWorks(inputImage.files[0], inputTitle.value, inputCategory.value)
            const modal = document.querySelector(".modal")
            modal.style.display = "none"
        }
    })
}

// Upload le projet
async function uploadWorks(img, title, categoryId) {
    const token = localStorage.getItem("token")
    let formData = new FormData()
    formData.append("title", title);
    formData.append("category", categoryId);
    formData.append("image", img);

    let reponse
    try { reponse = await fetch(`${URL_API}/works/`, { 
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    }) }
    catch (err) {
        console.error(err.message)
    }
    if (reponse.ok) {
        await fetchWorks()
        let works = JSON.parse(localStorage.getItem("works"))
        let category = JSON.parse(localStorage.getItem("category"))
        //showWorksInModal(works)
        showWorks(works)
        showFilterCategories(category, works)
    }
}

// Affiche les travaux dans la modale
function showWorksInModal(tableau) {
    const contentWorks = document.querySelector('.modal-works')
    contentWorks.innerHTML = ''

    for (let i = 0; i < tableau.length; i++) {
        const mainDiv = document.createElement("div")
        const img = document.createElement("img")
        const deleteBtn = document.createElement("div")
        const iconBtn = document.createElement("i")

        mainDiv.classList.add("works-img-modal")
        deleteBtn.classList.add("delete-btn")
        iconBtn.classList.add("fa-solid", "fa-trash-can")

        img.setAttribute("src", tableau[i].imageUrl)
        img.setAttribute("alt", tableau[i].title)

        mainDiv.setAttribute("data-id", tableau[i].id)

        contentWorks.appendChild(mainDiv)
        mainDiv.appendChild(img)
        mainDiv.appendChild(deleteBtn)
        deleteBtn.appendChild(iconBtn)

        deleteBtn.addEventListener("click", (event) => {
            const idWork = mainDiv.getAttribute("data-id")
            const token = localStorage.getItem("token")
            deleteWorks(idWork, token)
        })

    }
}

//Affiche la liste des catégories dans la modale
function showCategoryInModal (parent) {
    let category = JSON.parse(localStorage.getItem("category"))
    parent.innerHTML = ''
    for (let i = 0; i < category.length; i++) {
        let inputOption = document.createElement("option")
        inputOption.setAttribute("value", category[i].id)
        inputOption.innerText = category[i].name
        parent.appendChild(inputOption)  
    }
}

// Supprime les travaux dans la modale 
async function deleteWorks(id, token) {
    let reponse
    try { reponse = await fetch(`${URL_API}/works/${id}`, { 
        method: 'DELETE',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
        }
    }) }
    catch (err) {
        console.error(err.message)
    }
    if (reponse.ok) {
        await fetchWorks()
        let works = JSON.parse(localStorage.getItem("works"))
        let category = JSON.parse(localStorage.getItem("category"))
        showWorksInModal(works)
        showWorks(works)
        showFilterCategories(category, works)
    }
}

//Affiche l'image sur le formulaire d'upload
function showImage(){
    let inputImage = document.getElementById("input-image")
    const image = document.querySelector(".upload-image img")
    const svg = document.querySelector(".upload-image svg")
    const p = document.querySelector(".upload-image p")
    const btnUpload = document.querySelector(".label-input-image")


    inputImage.value = ""
    svg.style.display = "block"
    p.style.display = "block"
    btnUpload.style.display = "block"
    image.style.display = "none"
    

    inputImage.addEventListener("change", () => {
        svg.style.display = "none"
        p.style.display = "none"
        btnUpload.style.display = "none"
        image.style.display = "block"
        image.src = URL.createObjectURL(inputImage.files[0])
    })
}

//Affiche les messages d'erreur dans la modale
function showErrorInModal(text) {
    const testSpan = document.querySelector(".upload-form span")
    testSpan.innerText = text
}





