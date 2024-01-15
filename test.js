async function afficherTravaux (){
    const reponse = await fetch("http://localhost:5678/api/works")
    const avis = await reponse.json()
    console.log(avis)

    const gallery = document.querySelector('.gallery')

    for (let i = 0; i < avis.length; i++) {
        console.log(avis[i].title)
        console.log(avis[i].imageUrl)
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        gallery.appendChild(figure)
        figure.appendChild(img)
        figure.appendChild(figcaption)
    }
}

afficherTravaux()