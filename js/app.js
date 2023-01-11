function iniciarApp(){
    const selectCategorias = document.querySelector('#categorias')
    selectCategorias.addEventListener('change',seleccionarCategoria)

    obtenerCategorias()
   function obtenerCategorias(){
        const url= 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
            .then(result =>  result.json())
            .then(datos => mostrarCategorias(datos.categories))
   }

   function mostrarCategorias(categorias = []){

        categorias.forEach(categoria =>{
            const option = document.createElement('OPTION')
            option.value = categoria.strCategory
            option.textContent = categoria.strCategory
            selectCategorias.appendChild(option)
          
           
        })
   }

   function seleccionarCategoria(e){
    const categoria =  e.target.value
     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`
     fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => console.log(resultado))
   }
}


document.addEventListener('DOMContentLoaded',iniciarApp)