const socket = io();
const productsList = document.getElementById("productsList");
// const addForm = document.getElementById("addForm");
// const deleteForm = document.getElementById("deleteForm");

// Recibir los productos
socket.on("products", (data) => {
    productsList.innerHTML = "";
    data.forEach((product) => {
        const card = document.createElement("div");
        card.className="col-md-3"
        card.innerHTML = `
                <div class="card producto-card">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" />
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">ID: ${product.id}</h5>
                        <h5 class="card-title font-weight-bold">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="d-flex justify-content-between">
                            <span class="card-price font-weight-bold">$ ${product.price}</span>
                        </div>
                    </div>
                </div>
            `;
        productsList.appendChild(card);
        })
    })


// Agregar productos
// addForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const title = document.getElementById("title").value;
//     const price = document.getElementById("price").value;
//     const description = document.getElementById("description").value;
  
//     await fetch("/realtimeproducts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({title, price, description})
//     })
  
//     addForm.reset();
  
//   })
  
  // Eliminar productos
//   deleteForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const id = document.getElementById("id").value;
//     await fetch("/realtimeproducts", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     });
  
//     deleteForm.reset();
//   })
  