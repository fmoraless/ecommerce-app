(() => {
    const variables = {
        products: {
            state: null
        },
        modal: {

        },
        main: document.body,
        carrito: {
            boton: document.querySelector('div.cart-conatiner'),
            data: [],
            countCart: document.querySelector('sup.count--cart')
        }
    };
    const metodos = {
        init: function() {
            document.addEventListener("DOMContentLoaded", () => {
                metodos.fetchProducts();
            });
            this.renderInit()
            variables.carrito.boton.addEventListener('click', () => {
                metodos.clickBtn('renderModal')
            }, false)

        },
        renderInit: function() {
            variables.modal.dialog = document.createElement("dialog");
            variables.modal.dialog.setAttribute('class', "modal")
            variables.modal.header = document.createElement("div")
            variables.modal.header.classList.add("modal--header")
            variables.modal.header.titulo = document.createElement("h3")
            variables.modal.header.titulo.setAttribute('class', "modal--header--titulo")
            variables.modal.header.icon = document.createElement("span")
            variables.modal.header.icon.textContent = 'x'
            variables.modal.header.icon.setAttribute("class", "modal--header--icon")
            variables.modal.header.icon.addEventListener('click', () => this.clickBtn('cerrarModal'), false)
            variables.modal.content = document.createElement("section")
            variables.modal.content.setAttribute('class', 'modal--content')
            variables.modal.header.append(variables.modal.header.titulo)
            variables.modal.header.append(variables.modal.header.icon)
            variables.modal.dialog.append(variables.modal.header)
            variables.modal.dialog.append(variables.modal.content)


            // variables.modal.header.innerHTML = `<h3>hola soy un modal</h3><span class='icon' onClick='document.querySelector("dialog.modal").close()'>x</span>`
            variables.main.append(variables.modal.dialog)
        },
        clickBtn: function(action) {
            if (action === 'cerrarModal') {
                variables.modal.dialog.close()
                variables.modal.content.textContent = ''
            }
            if (action === 'renderModal') {
                variables.modal.dialog.showModal()
                metodos.renderContentModal('carrito de productos', `<h2>content</h2>`)
            }
        },
        renderContentModal: function(title, content) {
            variables.modal.header.titulo.textContent = title
            variables.modal.content.replaceChildren(metodos.renderCartProduct())

        },
        setCartProduct: function(product, e) {
            console.log(product, e.target)
            console.log(variables.carrito.data.length);
            const dataa = variables.carrito.data.find(item => item.id === product.id)
            console.log(dataa, "dataa")
            if (!dataa) {
                console.log('indefinido');
                let prev = variables.carrito.data.push({...product, cantidad: 1 })
                console.log(variables.carrito.data[prev--])
                e.target.innerHTML = `add to cart 🛒 ${variables.carrito.data[prev].cantidad}`
            } else {
                console.log('esta', dataa)
                dataa.cantidad++
                    e.target.innerHTML = `add to cart 🛒 ${dataa.cantidad}`


            }
            variables.carrito.countCart.textContent = variables.carrito.data.length
        },
        deleteCartProduct: function(product) {
          console.log(product);
        },
        renderCartProduct: function() {
            variables.carrito.contenedor = document.createElement("section")
            variables.carrito.contenedor.setAttribute('class', 'card-items')
            variables.carrito.data.forEach((item, i) => {
                variables.carrito.contenedor.item = document.createElement("div")
                variables.carrito.contenedor.item.classList.add('item')

                variables.carrito.contenedor.count = document.createElement("h5")
                variables.carrito.contenedor.count.classList.add('index')
                variables.carrito.contenedor.count.textContent = i + 1
                variables.carrito.contenedor.item.append(variables.carrito.contenedor.count)

                variables.carrito.contenedor.img = document.createElement("img")
                variables.carrito.contenedor.img.classList.add('img')
                variables.carrito.contenedor.img.src = item.thumbnail
                variables.carrito.contenedor.img.setAttribute('alt', item.title)
                variables.carrito.contenedor.item.append(variables.carrito.contenedor.img)
                variables.carrito.contenedor.itemConten = document.createElement("div")
                variables.carrito.contenedor.item.append(variables.carrito.contenedor.itemConten)

                variables.carrito.contenedor.itemConten.titulo = document.createElement("div")
                variables.carrito.contenedor.itemConten.titulo.classList.add('item-content')
                variables.carrito.contenedor.itemConten.titulo.innerHTML = `<h5>${item.title}</h5>`
                variables.carrito.contenedor.item.append(variables.carrito.contenedor.itemConten.titulo)
                variables.carrito.contenedor.itemConten.price = document.createElement("div")
                variables.carrito.contenedor.itemConten.price.classList.add('item-content')
                variables.carrito.contenedor.itemConten.price.innerHTML = `<div><h4 class="cart-price">${item.price * item.cantidad}</h4></div>`
                variables.carrito.contenedor.item.append(variables.carrito.contenedor.itemConten.price)
                variables.carrito.contenedor.itemConten.cantidad = document.createElement("div")
                variables.carrito.contenedor.itemConten.cantidad.setAttribute('class', 'item-content')
                variables.carrito.contenedor.itemConten.cantidad.innerHTML = `<div><h6>cant: ${item.cantidad}</h6></div>`
                variables.carrito.contenedor.item.append(variables.carrito.contenedor.itemConten.cantidad)
                variables.carrito.contenedor.itemConten.trashContent = document.createElement("span")
                variables.carrito.contenedor.itemConten.trash = document.createElement("i")
                variables.carrito.contenedor.itemConten.trash.classList.add('fa-solid', 'fa-trash')
                variables.carrito.contenedor.itemConten.trash.addEventListener("click", () => {
                  this.deleteCartProduct(item)
                })
                variables.carrito.contenedor.itemConten.trashContent.append(variables.carrito.contenedor.itemConten.trash)
                variables.carrito.contenedor.item.append(variables.carrito.contenedor.itemConten.trashContent)

                variables.carrito.contenedor.append(variables.carrito.contenedor.item)
            })
            variables.carrito.contenedor.total = document.createElement("div")
            variables.carrito.contenedor.total.classList.add('modal--total')
            variables.carrito.contenedor.total.textContent = metodos.getTotal()
            variables.carrito.contenedor.append(variables.carrito.contenedor.total)

            return variables.carrito.contenedor
            let template = `<div class="item">
            <h5>2. </h5>
            <img src="https://picsum.photos/10/10?random=2" alt="">
            <div class="item-content">
                <div>
                    <h5>Nombre de producto</h5>
                </div>
            </div>
            <div class="item-content">

                <div>
                    <h5 class="cart-price">$ 40.000</h5>
                </div>

            </div>
            <div class="item-content">

                <div>
                    <h6>cant: 1</h6>
                </div>

            </div>

            <span><i class="fa-solid fa-trash"></i></span>
        </div>`
        },
        getTotal: function(data) {

            return variables.carrito.data.map(price => (price.price * price.cantidad)).reduce((acc, price) => acc + price)
        },
        fetchProducts: async() => {
            try {
                const response = await fetch("products.json");
                const dataMeli = await axios.get(apiUrl, {
                    params: {
                        q: "juguetes",
                        limit: 10,
                    },
                });

                console.log(dataMeli, "dataMeli");

                const data = await response.json();
                console.log(data, "data");

                /* fusionar productos*/
                const products = [...data, ...dataMeli.data.results];

                console.log(products, "MERGE products");

                metodos.pintaProductos(products);
            } catch (error) {
                console.log(error);
            }
        },
        pintaProductos: (data) => {
            data.forEach((product) => {
                const { id, title, price, available_quantity, thumbnail } = product;

                const div = document.createElement("div");
                div.classList.add("carts");
                div.id = id;


                let divImg = document.createElement("div");

                divImg.classList.add("product-img");

                let img = document.createElement("img");
                img.src = thumbnail;
                divImg.append(img);

                let p = document.createElement("p");
                p.innerHTML = `<span>${price}</span>$`;
                divImg.append(p);
                div.append(divImg);

                let pTitle = document.createElement("p");
                pTitle.classList.add("title");
                pTitle.innerHTML = title;
                div.append(pTitle);

                let pStock = document.createElement("p");
                pStock.classList.add("stock");
                pStock.innerHTML = `Stock: ${available_quantity}`;
                div.append(pStock);

                let elBoton = document.createElement("a");
                elBoton.classList.add("btn-add-cart");
                elBoton.setAttribute("data-id", id);
                console.log(variables.carrito.data.find(item => item.id === div.id));
                elBoton.innerHTML = variables.carrito.data.find(item => item.id === div.id) ? "add" : "add to cart ";
                elBoton.addEventListener("click", (e) => { metodos.setCartProduct(product, e) }, false)
                div.append(elBoton);

                productsContainer.append(div);
            });
        }
    };
    metodos.init();
})()


let productsContainer = document.getElementById("products-container");
const apiUrl = "https://api.mercadolibre.com/sites/MLC/search";



/*
* Estrucutra de productos
* <div class="carts">
      <div>
          <img src="https://picsum.photos/300?random=1" alt="">
          <p><span>20</span>$</p>
      </div>
      <p class="title">Aceite Motor</p>
      <a href="" data-id="1" class="btn-add-cart">add to cart</a>
  </div>
*
*
* */