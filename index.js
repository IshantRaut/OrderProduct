let totalcost = 0;

async function storeToLocal(e) {
  e.preventDefault();
  const ProductPrice = document.getElementById("price").value;
  const ProductName = document.getElementById("name").value;

  const obj1 = {
    ProductPrice,
    ProductName,
  };

  try {
    const res = await axios.post(
      "https://crudcrud.com/api/39f53fa1eb8749739fe684d194c3c002/ProductData",
      obj1
    );
    showOnScreen(res.data);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/39f53fa1eb8749739fe684d194c3c002/ProductData"
    );
    for (let i = 0; i < res.data.length; i++) {
      showOnScreen(res.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});

function showOnScreen(products) {
  document.getElementById("price").value = "";
  document.getElementById("name").value = "";

  const productId = products._id;
  const parentNode = document.getElementById("list");
  const childHTML = `<li id=${products._id}> ${products.ProductPrice} - ${products.ProductName} 
                            <button onclick=deleteUser('${products._id}')> Delete product</button>
                            <button onclick=editUserDetails('${products.ProductPrice}','${products.ProductName}','${products._id}')>Edit Product</button>
                         </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
  totalcost += Number(products.ProductPrice);

  document.getElementById("TotalCost").innerText = "Total Cost: " + totalcost;
}

async function editUserDetails(ProductPrice, ProductName, productId) {
  document.getElementById("price").value = ProductPrice;
  document.getElementById("name").value = ProductName;
  await deleteUser(productId);
}

async function deleteUser(productId) {
  try {
    const productToDelete = document
      .getElementById(productId)
      .innerText.split("-");
    const ProductPrice = productToDelete[0].trim();

    const response = await axios.delete(
      `https://crudcrud.com/api/39f53fa1eb8749739fe684d194c3c002/ProductData/${productId}`
    );
    removeFromScreen(productId, ProductPrice);
  } catch (err) {
    console.log(err);
  }
}

function removeFromScreen(productId, ProductPrice) {
  const parentNode = document.getElementById("list");
  const childNodeToBeDeleted = document.getElementById(productId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }

  totalcost -= Number(ProductPrice);
  document.getElementById("TotalCost").innerText = "Total Cost: " + totalcost;
  console.log(totalcost);
}
