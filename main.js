// open tab
function preOrderTab() {
  window.open("/html/preorder.html", "_self");
}
function readMoreTab() {
  window.open("/html/readmore.html", "_self");
}
function seeMoreProducts() {
  window.open("/html/products.html", "_self");
}
function signIn() {
  const left = (window.screen.width - 800) / 2;
  const top = (window.screen.height - 500) / 2;

  window.open(
    "/html/signin.html",
    "_blank",
    "width=800,height=500,left=" + left + ",top=" + top
  );
}

// filtering button
let col_btn = document.querySelectorAll(".btn-col");
let col_item = document.querySelectorAll(".collection-item");

col_btn.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    col_btn.forEach((col_bt, ind) => {
      col_bt.classList.remove("btn");
    });
    e.target.classList.add("btn");
    let data_btn = btn.getAttribute("data-btn");
    col_item.forEach((col, inde) => {
      if (col.getAttribute("data-item") == data_btn || data_btn == "all") {
        col.classList.remove("hide");
      } else {
        col.classList.add("hide");
      }
    });
  });
});

// burger icon
let ul = document.querySelector("ul");
let burger_icon = document.querySelector(".burger_icon");

burger_icon.addEventListener("click", () => {
  if (burger_icon.classList.contains("bi-list")) {
    burger_icon.classList.add("bi-x-lg");
    burger_icon.classList.remove("bi-list");
    ul.classList.add("active");
  } else {
    burger_icon.classList.remove("bi-x-lg");
    burger_icon.classList.add("bi-list");
    ul.classList.remove("active");
  }
});

// Variables to store cart icon and item count
const cartIcon = document.querySelector(".nav-icon #cartIcon");
const cartItemCount = document.querySelector(".nav-icon #cartItemCount");
const popup = document.getElementById("cartPopup"); // Ensure that the cartPopup exists in your HTML

let itemCount = 0;

// Function to update cart counter
function updateCartCounter() {
  if (itemCount > 0) {
    cartItemCount.style.display = "inline-block"; // Show counter
    cartItemCount.textContent = itemCount; // Update counter value
  } else {
    cartItemCount.style.display = "none"; // Hide counter when count is zero
  }
}

// Function to toggle popup
function togglePopup() {
  var popup = document.getElementById("cartPopup");
  var body = document.body;
  if (popup.style.display === "block") {
    popup.style.display = "none";
    body.style.overflow = ""; // Re-enable scrolling on body
  } else {
    popup.style.display = "block";
    body.style.overflow = "hidden"; // Disable scrolling on body
  }
}

// Function to add item to cart with "Add" button
function addToCart(itemName, price) {
  // Check if the item already exists in the cart
  var existingItem = document.querySelector(
    "#cartItems > div[data-item-name='" + itemName + "']"
  );
  if (existingItem) {
    // If the item already exists, increment its quantity instead of adding a new one
    var quantityElement = existingItem.querySelector(".quantity");
    var quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
  } else {
    // If the item doesn't exist, create a new cart item
    var cartItems = document.getElementById("cartItems");
    var newItem = document.createElement("div");
    newItem.dataset.itemName = itemName;
    newItem.innerHTML = `
            <span>${itemName} - ${price}</span>
            <button class="remove-btn" onclick="removeItem(this.parentNode)">Remove</button>
            <button class="add-btn" onclick="addItem(this.parentNode)">Add</button>
            <span class="quantity">1</span>
        `;
    cartItems.appendChild(newItem);
  }

  // Increment item count
  itemCount++;
  updateCartCounter();

  // Update total price
  updateTotalPrice();
}

// Function to increment item quantity
function addItem(item) {
  var quantityElement = item.querySelector(".quantity");
  var quantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = quantity + 1;

  // Update total price
  updateTotalPrice();
}

// Function to remove one item from cart
function removeItem(item) {
  var quantityElement = item.querySelector(".quantity");
  var quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    // If quantity is more than 1, decrement quantity
    quantityElement.textContent = quantity - 1;
  } else {
    // If quantity is 1, remove the item from cart
    item.parentNode.removeChild(item);
  }
  // Decrement item count
  itemCount--;
  updateCartCounter();

  // Update total price
  updateTotalPrice();
}

// Function to update total price
function updateTotalPrice() {
  var cartItems = document.querySelectorAll("#cartItems > div");
  var totalPrice = 0;
  cartItems.forEach(function (item) {
    var priceText = item.textContent.match(/PHP (\d+(,\d{3})*(\.\d+)?)/); // Updated regex to match price format
    if (priceText) {
      var quantity = parseInt(item.querySelector(".quantity").textContent);
      totalPrice += parseFloat(priceText[1].replace(/,/g, "")) * quantity; // Convert comma-separated string to number
    }
  });

  // Format totalPrice with commas for thousands, ten thousands, etc., and ensure two decimal places
  var formattedTotalPrice = totalPrice
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  document.getElementById("totalPrice").textContent =
    "Total Price: PHP " + formattedTotalPrice;
}

// Initialize cart counter
updateCartCounter();
