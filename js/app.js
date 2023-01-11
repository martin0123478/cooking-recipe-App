function iniciarApp(){
    const selectCategorias = document.querySelector('#categorias')

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
}


document.addEventListener('DOMContentLoaded',iniciarApp)