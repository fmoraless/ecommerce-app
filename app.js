document.addEventListener("DOMContentLoaded", () => {
  fetchLocalProducts();
});

let productsContainer = document.getElementById("products-container");

const fetchLocalProducts = async () => {
  try {
    const response = await fetch("products.json");

    const data = await response.json();
    console.log(data, "data");
    pintaProductos(data);
  } catch (error) {
    console.log(error);
  }
};

/*
*
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
    const { id, name, price, stock, image } = product;

    const div = document.createElement("div");
    div.classList.add("carts");

    let divImg = document.createElement("div");
    let img = document.createElement("img");
    img.src = image;
    divImg.appendChild(img);

    div.innerHTML = `
            <div>
                <img src="${image}" alt="">
             
                <p><span>${price}</span>$</p>
            </div>
            <p class="title">${name}</p>
            <p class="title">${stock}</p>
            <a href="" data-id="${id}" class="btn-add-cart">add to cart</a>
        `;

    productsContainer.appendChild(div);
  });
};
