var ProductNameInput = document.getElementById("ProductNameInput");
var ProductPriceInput = document.getElementById("ProductPriceInput");
var ProductCategoryInput = document.getElementById("ProductCategoryInput");
var ProductDescriptionInput = document.getElementById("ProductDescriptionInput");
var submitBtn = document.getElementById("submitBtn");
var productContainer = [];
var updateIndex = -1;

if (localStorage.getItem('product') != null) {
    productContainer = JSON.parse(localStorage.getItem('product'));
    displayProduct();
}

function addProduct() {
    if (validateProductName()) {
        var product = {
            name: ProductNameInput.value,
            price: ProductPriceInput.value,
            category: ProductCategoryInput.value,
            description: ProductDescriptionInput.value
        };

        if (updateIndex === -1) {
            productContainer.push(product);
        } else {
            productContainer[updateIndex] = product;
            submitBtn.innerHTML = "Add Product";
            updateIndex = -1;
        }

        localStorage.setItem('product', JSON.stringify(productContainer));
        clearForm();
        displayProduct();
    } else {
        alert("Invalid product name. Name must start with an uppercase letter and be 3-8 characters long.");
    }
}

function clearForm() {
    ProductNameInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDescriptionInput.value = "";
}

function displayProduct() {
    var cartona = '';
    for (var i = 0; i < productContainer.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].description}</td>
                <td>
                    <button onclick="deleteProducts(${i});" class="btn btn-sm btn-outline-danger">Delete</button>
                    <button onclick="editProduct(${i});" class="btn btn-sm btn-outline-info">Update</button>
                </td>
            </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function deleteProducts(deleteIndex) {
    productContainer.splice(deleteIndex, 1);
    localStorage.setItem('product', JSON.stringify(productContainer));
    displayProduct();
}

function editProduct(index) {
    ProductNameInput.value = productContainer[index].name;
    ProductPriceInput.value = productContainer[index].price;
    ProductCategoryInput.value = productContainer[index].category;
    ProductDescriptionInput.value = productContainer[index].description;
    submitBtn.innerHTML = "Update Product";
    updateIndex = index;
}

function searchProducts(term) {
    var cartona = '';
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            cartona += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${productContainer[i].name}</td>
                    <td>${productContainer[i].price}</td>
                    <td>${productContainer[i].category}</td>
                    <td>${productContainer[i].description}</td>
                    <td>
                        <button onclick="deleteProducts(${i});" class="btn btn-sm btn-outline-danger">Delete</button>
                        <button onclick="editProduct(${i});" class="btn btn-sm btn-outline-info">Update</button>
                    </td>
                </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{2,7}$/;
    return regex.test(ProductNameInput.value);
}
