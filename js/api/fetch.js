const URL_API = "http://localhost:5678/api"

export async function fetchWorks() {
        if(!localStorage.getItem("works")){
        try { const reponse = await fetch(`${URL_API}/works`) }
        catch (err) {
            console.error(err.message)
            // displaying some infos on the screen indicatinf there is an ongoing issue...
        }
            let jobs = await reponse.json()
            
        localStorage.setItem("works", JSON.stringify(jobs)) 
    }
    return JSON.parse(localStorage.getItem("works"))
}