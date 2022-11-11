import { metodosPaginacion, variablesPaginacion } from "./paginacion.js";

// (() => {
export const variables = {
  fechts: {
    url: "https://api.mercadolibre.com/sites/MLC/search",
    page: 1,
    q: "libros",
  },
  products: {
    state: null,
  },
  modal: {},
  main: document.body,
  productsContainer: document.getElementById("products-container"),
  carrito: {
    boton: document.querySelector("div.cart-conatiner"),
    data: [],
    countCart: document.querySelector("sup.count--cart"),
  },
  page: 1,
  btnNext: document.querySelector("#btnNext"),
  btnBack: document.querySelector("#btnPrev"),
};
let pagina = 1;
export const metodos = {

  init: function () {
    metodosPaginacion.init();

    document.addEventListener("DOMContentLoaded", () => {
      metodos.fetchProducts();
    });
    this.renderInit();
    variables.carrito.boton.addEventListener(
      "click",
      () => {
        metodos.clickBtn("renderModal");
      },
      false
    );
  },
  renderInit: function () {
    variables.modal.dialog = document.createElement("dialog");
    variables.modal.dialog.setAttribute("class", "modal");
    variables.modal.header = document.createElement("div");
    variables.modal.header.classList.add("modal--header");
    variables.modal.header.titulo = document.createElement("h3");
    variables.modal.header.titulo.setAttribute(
      "class",
      "modal--header--titulo"
    );
    variables.modal.header.icon = document.createElement("span");
    variables.modal.header.icon.textContent = "x";
    variables.modal.header.icon.setAttribute("class", "modal--header--icon");
    variables.modal.header.icon.addEventListener(
      "click",
      () => this.clickBtn("cerrarModal"),
      false
    );
    variables.modal.content = document.createElement("section");
    variables.modal.content.setAttribute("class", "modal--content");
    variables.modal.header.append(variables.modal.header.titulo);
    variables.modal.header.append(variables.modal.header.icon);
    variables.modal.dialog.append(variables.modal.header);
    variables.modal.dialog.append(variables.modal.content);

    // variables.modal.header.innerHTML = `<h3>hola soy un modal</h3><span class='icon' onClick='document.querySelector("dialog.modal").close()'>x</span>`
    variables.main.append(variables.modal.dialog);
  },
  clickBtn: function (action) {
    if (action === "cerrarModal") {
      variables.modal.dialog.close();
      variables.modal.content.textContent = "";
    }
    if (action === "renderModal") {
      variables.modal.dialog.showModal();
      metodos.renderContentModal("Lista De Compras");
    }
  },
  renderContentModal: function (title) {
    variables.modal.header.titulo.textContent = title;
    variables.modal.content.replaceChildren(metodos.renderCartProduct());
  },
  setCartProduct: function (product, e) {
    // console.log(product, e.target)
    console.log(variables.carrito.data.length);
    const dataa = variables.carrito.data.find((item) => item.id === product.id);
    console.log(dataa, "dataa");
    if (!dataa) {
      console.log("indefinido");
      let prev = variables.carrito.data.push({ ...product, cantidad: 1 });
      // console.log(variables.carrito.data[prev--])
      variables.carrito.data[prev--];
      document.querySelector(
        `a[dataid="${product.id}"]`
      ).innerHTML = `añadir al carrito 🛒 ${variables.carrito.data[prev].cantidad}`;
    } else {
      console.log("esta", dataa);
      dataa.cantidad++;
      document.querySelector(
        `a[dataid="${product.id}"]`
      ).innerHTML = `añadir al carrito 🛒 ${dataa.cantidad}`;
    }
    variables.carrito.countCart.textContent = variables.carrito.data.length;
  },
  renderCartProduct: function () {
    variables.carrito.contenedor = document.createElement("section");
    variables.carrito.contenedor.setAttribute("class", "card-items");
    if (variables.carrito.data.length === 0) this.clickBtn("cerrarModal");
    variables.carrito.data.forEach((item, i) => {
      variables.carrito.contenedor.item = document.createElement("div");
      variables.carrito.contenedor.item.classList.add("item");
      variables.carrito.contenedor.item.id = item.id;
      variables.carrito.contenedor.item.setAttribute("data", item.id);
      variables.carrito.contenedor.count = document.createElement("h5");
      variables.carrito.contenedor.count.classList.add("index");
      variables.carrito.contenedor.count.textContent = i + 1;
      variables.carrito.contenedor.item.append(
        variables.carrito.contenedor.count
      );

      variables.carrito.contenedor.img = document.createElement("img");
      variables.carrito.contenedor.img.classList.add("img");
      variables.carrito.contenedor.img.src = item.thumbnail;
      variables.carrito.contenedor.img.setAttribute("alt", item.title);
      variables.carrito.contenedor.item.append(
        variables.carrito.contenedor.img
      );
      variables.carrito.contenedor.itemConten = document.createElement("div");
      variables.carrito.contenedor.item.append(
        variables.carrito.contenedor.itemConten
      );

      variables.carrito.contenedor.itemConten.titulo =
        document.createElement("div");
      variables.carrito.contenedor.itemConten.titulo.classList.add(
        "item-content"
      );
      variables.carrito.contenedor.itemConten.titulo.innerHTML = `<h5>${item.title}</h5>`;
      variables.carrito.contenedor.item.append(
        variables.carrito.contenedor.itemConten.titulo
      );
      variables.carrito.contenedor.itemConten.price =
        document.createElement("div");
      variables.carrito.contenedor.itemConten.price.classList.add(
        "item-content"
      );
      variables.carrito.contenedor.itemConten.price.innerHTML = `<div><h4 class="cart-price" data='${
        item.id
      }'>${item.price * item.cantidad}</h4></div>`;
      variables.carrito.contenedor.item.append(
        variables.carrito.contenedor.itemConten.price
      );
      variables.carrito.contenedor.itemConten.cantidad =
        document.createElement("div");
      variables.carrito.contenedor.itemConten.cantidad.setAttribute(
        "class",
        "item-content"
      );
      variables.carrito.contenedor.itemConten.cantidadTotal =
        document.createElement("h6");
      variables.carrito.contenedor.itemConten.cantidadTotal.textContent =
        item.cantidad;
      variables.carrito.contenedor.itemConten.cantidadTotal.setAttribute(
        "data",
        item.id
      );
      variables.carrito.contenedor.itemConten.rest =
        document.createElement("span");
      variables.carrito.contenedor.itemConten.rest.innerText = "➖";
      variables.carrito.contenedor.itemConten.rest.setAttribute(
        "class",
        "btn rest"
      );

      variables.carrito.contenedor.itemConten.rest.addEventListener(
        "click",
        () => this.modCart(i, "resta", item.id),
        false
      );
      // variables.carrito.contenedor.itemConten.modCart.rest.addEventListener('click', () => this.modCart(i), false)

      variables.carrito.contenedor.itemConten.plus =
        document.createElement("span");
      variables.carrito.contenedor.itemConten.plus.setAttribute(
        "class",
        "btn plus"
      );
      variables.carrito.contenedor.itemConten.plus.textContent = "➕";
      variables.carrito.contenedor.itemConten.plus.addEventListener(
        "click",
        () => this.modCart(i, "suma", item.id),
        false
      );
      // add botn de boorado
      variables.carrito.contenedor.itemConten.deleteItem =
        document.createElement("span");
      variables.carrito.contenedor.itemConten.deleteItem.setAttribute(
        "class",
        "btn delete"
      );

      variables.carrito.contenedor.itemConten.deleteItem.textContent = "❌";
      variables.carrito.contenedor.itemConten.deleteItem.addEventListener(
        "click",
        () => this.modCart(i, "borrar", item.id),
        false
      );

      // add al contenedor de las cantidades
      variables.carrito.contenedor.itemConten.cantidad.append(
        variables.carrito.contenedor.itemConten.rest
      );
      variables.carrito.contenedor.itemConten.cantidad.append(
        variables.carrito.contenedor.itemConten.cantidadTotal
      );
      variables.carrito.contenedor.itemConten.cantidad.append(
        variables.carrito.contenedor.itemConten.plus
      );
      variables.carrito.contenedor.itemConten.cantidad.append(
        variables.carrito.contenedor.itemConten.deleteItem
      );

      // variables.carrito.contenedor.itemConten.cantidad.innerHTML = `<div>${variables.carrito.contenedor.itemConten.rest}<h6 id="${item.id}">cant: ${item.cantidad} </h6><span>➕</span></div>`
      variables.carrito.contenedor.item.append(
        variables.carrito.contenedor.itemConten.cantidad
      );

      variables.carrito.contenedor.append(variables.carrito.contenedor.item);
    });
    variables.carrito.contenedor.total = document.createElement("div");
    /*let elh2Total = document.createElement("h2");
    variables.carrito.contenedor.total.append(elh2Total);*/
    variables.carrito.contenedor.total.classList.add("modal--total");
    variables.carrito.contenedor.total.innerHTML = `<h4 class="total">Total: $ ${Number(
      metodos.getTotal()
    ).toLocaleString("es-CL")} </h4>`;
    //variables.carrito.contenedor.total.textContent = metodos.getTotal();
    variables.carrito.contenedor.append(variables.carrito.contenedor.total);
    return variables.carrito.contenedor;
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
        </div>`;
  },
  modCart: function (element, action, id) {
    console.log(element);
    // console.log(variables.carrito.data[element])
    console.log(variables.carrito.data[element]);
    if (action === "resta") {
      // console.log(document.querySelector(`h6[data="${id}"]`))
      // console.log(document.querySelector(`h4[data="${id}"].cart-price`))
      variables.carrito.data[element].cantidad--;
      if (variables.carrito.data[element].cantidad !== 0) {
        // console.log(variables.carrito.data[element])
 add_cart_modal_styles
        metodos.renderContentModal("Lista De Compras");
        document.querySelector(
          `a[dataid="${variables.carrito.data[element].id}"]`
        ).innerHTML = `añadir al carrito 🛒 ${variables.carrito.data[element].cantidad}`;
        // this.setCartProduct(variables.carrito.data[element])
        // document.querySelector(`h6[data="${id}"]`).textContent = variables.carrito.data[element].cantidad
        // document.querySelector(`h4[data="${id}"].cart-price`).textContent = variables.carrito.data[element].cantidad * variables.carrito.data[element].price
      } else {
        // variables.carrito.data.delete(element)
        document.querySelector(
          `a[dataid="${variables.carrito.data[element].id}"]`
        ).innerHTML = `añadir al carrito`;
        variables.carrito.data = variables.carrito.data.filter(
          (ele, index) => index !== parseInt(element)
        );
        // metodos.renderCartProduct()
        metodos.renderContentModal("Lista De Compras");
        variables.carrito.countCart.textContent =
          variables.carrito.data.length === 0
            ? ""
            : variables.carrito.data.length;

        // let data_new = delete(variables.carrito.data[element])
        // console.log(data_new);
        console.log(variables.carrito.data);
        console.log(
          document.querySelector(`div[data="${id.toString()}"].item`)
        );
      }
      // variables.carrito.contenedor.itemConten.cantidadTotal.textContent = variables.carrito.data[element].cantidad
    }
    if (action === "suma") {
      variables.carrito.data[element].cantidad++;
      console.log(variables.carrito.data[element]);
      // this.setCartProduct(variables.carrito.data[element])
      document.querySelector(
        `a[dataid="${variables.carrito.data[element].id}"]`
      ).innerHTML = `añadir al carrito 🛒 ${variables.carrito.data[element].cantidad}`;

      metodos.renderContentModal("Lista De Compras");

      // document.querySelector(`h6[data="${id}"]`).textContent = variables.carrito.data[element].cantidad
      // document.querySelector(`h4[data="${id}"].cart-price`).textContent = variables.carrito.data[element].cantidad * variables.carrito.data[element].price

      // variables.carrito.contenedor.itemConten.cantidadTotal.textContent = variables.carrito.data[element].cantidad
    }
    if (action === "borrar") {
      document.querySelector(
        `a[dataid="${variables.carrito.data[element].id}"]`
      ).innerHTML = `añadir al carrito`;
      variables.carrito.data = variables.carrito.data.filter(
        (ele, index) => index !== parseInt(element)
      );
      // metodos.renderCartProduct()
      metodos.renderContentModal("Lista De Compras");
      variables.carrito.countCart.textContent =
        variables.carrito.data.length === 0
          ? ""
          : variables.carrito.data.length;
    }
  },
  getTotal: function (data) {
    return variables.carrito.data
      .map((price) => price.price * price.cantidad)
      .reduce((acc, price) => acc + price, 0);
  },
  fetchProducts: async () => {
    try {
      const response = await fetch("products.json");
      // const dataMeli = await axios.get(apiUrl, {
      //     params: {
      //         q: "juguetes",
      //         limit: 10,
      //         offset: variables.page || pagina,
      //     },
      // });
      const dataMeli = await fetch(
        `${variables.fechts.url}?q=${variables.fechts.q}&offset=${variables.fechts.page}`
      );
      const getDatameli = await dataMeli.json();

      console.log(getDatameli, "dataMeli");

      const data = await response.json();
      console.log(data, "data");

      /* fusionar productos*/
      const products = [...data, ...getDatameli.results];

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
      elBoton.setAttribute("dataid", id);
      // console.log(variables.carrito.data.find(item => item.id === div.id),'prueba');
      // elBoton.innerHTML = variables.carrito.data.find(item => item.id === div.id) ? `añadir al carrito 🛒 ${item.cantidad}` : "añadir al carrito ";
      elBoton.innerHTML = "añadir al carrito ";
      elBoton.addEventListener(
        "click",
        (e) => {
          metodos.setCartProduct(product, e);
        },
        false
      );
      div.append(elBoton);

      variables.productsContainer.append(div);
    });
  },
};
metodos.init();
// }
// )()

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
      <a href="" data-id="1" class="btn-add-cart">Añadir al Carrito</a>
  </div>
*
*
* */
