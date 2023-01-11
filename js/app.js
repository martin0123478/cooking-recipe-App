function iniciarApp(){

    obtenerCategorias()
   function obtenerCategorias(){
        const url= 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
            .then(result =>  result.json())
            .then(datos => console.log(datos))
   }
}


document.addEventListener('DOMContentLoaded',iniciarApp)