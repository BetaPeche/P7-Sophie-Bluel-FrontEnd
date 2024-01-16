// Récupère et affiche les travaux via l'API 
async function afficherTravaux(){
    const reponse = await fetch("http://localhost:5678/api/works")
    if (reponse.ok){
        const jobs = await reponse.json()
        console.log(jobs)

        const gallery = document.querySelector('.gallery')

        for (let i = 0; i < jobs.length; i++) {
            const figure = document.createElement("figure")
            const img = document.createElement("img")
            const figcaption = document.createElement("figcaption")

            figure.setAttribute("data-category-id", jobs[i].categoryId)
            img.setAttribute("src", jobs[i].imageUrl)
            img.setAttribute("alt", jobs[i].title)
            figcaption.innerText = jobs[i].title

            gallery.appendChild(figure)
            figure.appendChild(img)
            figure.appendChild(figcaption)
        }
    }
    else{
        console.log("Pas de réponse du serveur")
    }
}

// Récupère et affiche les catégories via l'API 
async function afficherCategories(){
    const reponse = await fetch("http://localhost:5678/api/categories")
    if (reponse.ok){
        const category = await reponse.json()
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
                    event.currentTarget.classList.add("link-selected")
                })
            }
            const link = document.createElement("a")

            link.classList.add("category__link")
            link.innerText=category[i].name
            link.setAttribute("href", "#")
            divCat.appendChild(link)

            link.addEventListener("click", (event)=> {
                effacerClassCategorie()
                event.currentTarget.classList.add("link-selected")
            })
        }
    }
    else{
        console.log("Pas de réponse du serveur")
    }
}

function effacerClassCategorie() {
    const links = document.querySelectorAll(".category a")
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("link-selected")
    }
}

// event.currentTarget sur un eventListener pour avoir le click sur l'element