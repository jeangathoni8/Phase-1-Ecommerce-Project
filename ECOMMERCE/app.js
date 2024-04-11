const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

let products = [];
let choosenProduct = {};

//DOM Elements
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

// Fetch products from server
async function fetchProducts() {
  try {
    const response = await fetch('https://json-server-r18k.onrender.com/images');
    const data = await response.json();
    products = data;
    choosenProduct = products[0]; // Initialize choosenProduct with the first product
    updateUI(); // Update UI with fetched products data
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to update the UI with the fetched products data
function updateUI() {
  // Update the UI elements with the first product's data as default
  currentProductTitle.textContent = choosenProduct.title;
  currentProductPrice.textContent = "$" + choosenProduct.price;
  currentProductImg.src = choosenProduct.colors[0].img;

  // Assign new colors
  currentProductColors.forEach((color, index) => {
    if (index < choosenProduct.colors.length) {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    }
  });
  
  // Attach event listeners to menu items
  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Change the current slide
      wrapper.style.transform = `translateX(${-100 * index}vw)`;

      // Change the chosen product
      choosenProduct = products[index];

      // Change texts of currentProduct
      currentProductTitle.textContent = choosenProduct.title;
      currentProductPrice.textContent = "$" + choosenProduct.price;
      currentProductImg.src = choosenProduct.colors[0].img;

      // Assign new colors
      currentProductColors.forEach((color, index) => {
        color.style.backgroundColor = choosenProduct.colors[index].code;
      });
    });
  });

  // Color selection event listeners
  currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
      if (index < choosenProduct.colors.length) {
        currentProductImg.src = choosenProduct.colors[index].img;
      }
    });
  });

  // Size selection event listeners
  currentProductSizes.forEach((size) => {
    size.addEventListener("click", () => {
      currentProductSizes.forEach((size) => {
        size.style.backgroundColor = "white";
        size.style.color = "black";
      });
      size.style.backgroundColor = "black";
      size.style.color = "white";
    });
  });
}

// Payment modal event listeners
productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// Initial fetch of products from the server
fetchProducts();


