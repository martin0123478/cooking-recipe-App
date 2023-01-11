function iniciarApp(){
    const selectCategorias = document.querySelector('#categorias')
    selectCategorias.addEventListener('change',seleccionarCategoria)
    const resultado = document.querySelector('#resultado')
    const modal = new bootstrap.Modal('#modal',{})

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
        .then(resultado => mostrarRecetas(resultado.meals))
   }

   function mostrarRecetas(recetas = []){
     limpiarHTML(resultado)

     const heading = document.createElement('H2')
     heading.classList.add('text-center','text-black','my-5')
     heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados'
     resultado.appendChild(heading)

        //iterar en los resultados
        

        recetas.forEach(receta => {
            const {idMeal,strMeal,strMealThumb} = receta
            const recetaContenedor = document.createElement('DIV')
            recetaContenedor.classList.add('col-md-4')
            const recetaCard = document.createElement('DIV')
            recetaCard.classList.add('card','mb-4')

            const recetaImagen = document.createElement('IMG')
            recetaImagen.classList.add('card-img-top')
            recetaImagen.alt = `Imagen de la receta ${strMeal}`
            recetaImagen.src = strMealThumb

            const recetaCardBody = document.createElement('DIV')
            recetaCardBody.classList.add('card-body')

            const recetaHeading = document.createElement('h3')
            recetaHeading.classList.add('card-title','mb-3')
            recetaHeading.textContent = strMeal

            const recetaButon = document.createElement('button')
            recetaButon.classList.add('btn','btn-danger','w-100')
            recetaButon.textContent = 'Ver receta'
                recetaButon.dataset.bsTarget = "#modal"
                 recetaButon.dataset.bsToogle = "modal"

            recetaButon.onclick = function(){
                seleccionarReceta(idMeal)
            }

            //inyectar en HTML
            recetaCardBody.appendChild(recetaHeading)
            recetaCardBody.appendChild(recetaButon)
            recetaCard.appendChild(recetaImagen)
            recetaCard.appendChild(recetaCardBody)

            recetaContenedor.appendChild(recetaCard)

            resultado.appendChild(recetaContenedor)



        });
        

   }

   function seleccionarReceta(id){
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0]))
   }


   function mostrarRecetaModal(receta){
        //Muestra el modal
        const {idMeal,strInstructions,strMeal,strMealThumb} = receta
        const modalTitle = document.querySelector('.modal-title')
        const modalBody = document.querySelector('.modal-body')  
        
        modalTitle.textContent = strMeal

        modalBody.innerHTML = `
        
            <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}"/>

            <h3 class="my-3">Instrucciones</h3>
            <p>${strInstructions}</p>
            `
        modal.show()

   }

   function limpiarHTML(selector){
    while(selector.firstChild){
        selector.removeChild(selector.firstChild)
    }
   }
}


document.addEventListener('DOMContentLoaded',iniciarApp)