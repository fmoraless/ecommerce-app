import { metodos, variables } from "./app.js"

export const variablesPaginacion = {
    btnNext: document.querySelector('#btnNext'),
    btnBack: document.querySelector('#btnPrev')
}
export const metodosPaginacion = {
    init: function () {
        variables.btnNext.addEventListener('click', () => {
            variables.fechts.page++
            console.log(variables.fechts.page)
            if(variables.fechts.page > 1) variables.btnBack.disabled = false
            variables.productsContainer.textContent = '';
            metodos.fetchProducts();
        }, false)
        variables.btnBack.addEventListener('click', () => {
            if(variables.fechts.page !==1){
                variables.fechts.page--
                variables.productsContainer.textContent = '';
                metodos.fetchProducts();  
            }else{
                variables.btnBack.disabled = true
            }
        },false)
    }
}
