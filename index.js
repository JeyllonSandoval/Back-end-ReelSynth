const pelicula = {
    titulo: "UNCHARTED",
    descripcion: "pelicula de aventura sobre caza de tesoros",
    categoria: ["accion", "aventura", "terror"]
}

// import {titulo, descripcion} from "./models/pelicula"

//const {edad} = persona

// peliculas.find((pelicula)=>{
//     return pelicula.id == 103
// })
// presentar(pelicula)

const like = 20
const autor = "Jose"

const newPelicula = {
    ...pelicula,
    like,
    autor
}

function presentar({titulo, categoria, like}){ 
    console.log(titulo, categoria[1], like || "")
}
presentar(newPelicula)

// console.log(newPelicula)

// console.log(edad)

// const numeros = [1,2,3,4,5,6]

// const [,,tres] = numeros

// console.log(tres)