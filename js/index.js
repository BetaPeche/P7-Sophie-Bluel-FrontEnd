const reponse = await fetch("http://localhost:5678/api/works")
const jobs = await reponse.json()
    console.log(jobs)
    afficherTravaux(jobs)

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
// Récupère et affiche les catégories via l'API 
const resp = await fetch("http://localhost:5678/api/categories")
const category = await resp.json()            
const divCat = document.querySelector(".category")
for (let i = 0; i < category.length; i++) {
    if(!i){
        const link = document.createElement("a")
        
        link.classList.add("category__link")
        link.classList.add("link-selected")
        link.innerText="Tous"
        link.setAttribute("href", "#")
        divCat.appendChild(link)
        link.addEventListener("click", (event)=> {
            effacerClassCategorie()
            afficherTravaux(jobs)
            const lienActif = event.currentTarget
            lienActif.classList.add("link-selected")
        })
    }

    const link = document.createElement("a")

    link.setAttribute("data-category-id", category[i].id)
    link.classList.add("category__link")
    link.innerText=category[i].name
    link.setAttribute("href", "#")
    divCat.appendChild(link)

    link.addEventListener("click", (event)=> {
        effacerClassCategorie()
        const lienActif = event.currentTarget
        const numbCat = lienActif.getAttribute("data-category-id")
        const newArray = jobs.filter(function (jobs) {
            return jobs.categoryId == numbCat
        })
        afficherTravaux(newArray)
        lienActif.classList.add("link-selected")
    })
}



// Supprime la classe "link-selected" sur les liens
function effacerClassCategorie() {
    const links = document.querySelectorAll(".category a")
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("link-selected")
    }
}

function filtrerCategorie(id, tableau) {
    const piecesFiltrees = tableau.filter(function (piece) {
        return piece.prix <= 35;
    })
}

const ages = [32, 33, 16, 40];
const result = ages.filter(checkAdult);

function checkAdult(age) {
  return age >= 18;
}

// event.currentTarget sur un eventListener pour avoir le click sur l'element


