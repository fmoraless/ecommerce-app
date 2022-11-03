document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

let productsContainer = document.getElementById("products-container");
const apiUrl = "https://api.mercadolibre.com/sites/MLC/search";

const fetchProducts = async () => {
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

    pintaProductos(products);
  } catch (error) {
    console.log(error);
  }
};

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
const pintaProductos = (data) => {
  data.forEach((product) => {
    const { id, title, price, available_quantity, thumbnail } = product;

    const div = document.createElement("div");
    div.classList.add("carts");

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
    elBoton.innerHTML = "add to cart";
    div.append(elBoton);

    productsContainer.append(div);
  });
};
