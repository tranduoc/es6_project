import {
  getListProductService,
  deleteProductService,
  addProductService,
  getProductService,
  updateProductService,
} from "./utils/callapi.js";

import Product from "./model/product.js";

let renderHTML = () => {
  const content = `<div class="card text-white bg-dark">
  <div class="card-body">
    <h4 class="card-title">Danh sách sản phẩm</h4>
    <div class='container'>
      <div class="row">
        <div class="col-md-3">
          <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
        </div>
        <div class="col-md-3">
          <input id="name" class="form-control" placeholder="Tên SP" />
        </div>
        <div class="col-md-3">
          <input id="price" class="form-control" placeholder="Giá" />
        </div>
        <div class="col-md-3">
          <input id="image" class="form-control" placeholder="Link hình" />
        </div>
      </div>
      <br />
      <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
      <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
    </div>
  </div>
</div>
<div class="container">
  <table class="table">
    <thead>
      <tr>
        <th>Mã SP</th>
        <th>Tên SP</th>
        <th>Giá </th>
        <th>Hình ảnh</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="tblDanhSachSanPham">

    </tbody>
  </table>
</div> `;

  document.getElementById("root").innerHTML = content;
};

const renderTable = (listProduct) => {
  if (listProduct && listProduct.length > 0) {
    let contentHtml = "";
    listProduct.map((product) => {
      contentHtml += `

      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
          <img src="${product.image}" width="50">
        </td>
        <td>
          <button class="btn btn-success" onClick ="editProduct(${product.id})">Edit</button>
          <button class="btn btn-danger" onClick ="deleteProduct(${product.id})">Delete</button>
        </td>

      </tr>
      
      `;
    });
    return contentHtml;
  }
};

const renderListProduct = () => {
  getListProductService()
    .then((result) => {
      document.getElementById("tblDanhSachSanPham").innerHTML = renderTable(
        result.data
      );
    })
    .catch((err) => {});
};

window.deleteProduct = deleteProduct;

function deleteProduct(id) {
  deleteProductService(id)
    .then((result) => {
      renderListProduct();
    })
    .catch((err) => {});
}

window.editProduct = editProduct;

function editProduct(id) {
  getProductService(id)
    .then((result) => {
      document.getElementById("maSP").value = result.data.id;
      document.getElementById("name").value = result.data.name;
      document.getElementById("price").value = result.data.price;
      document.getElementById("image").value = result.data.image;
    })
    .catch((err) => {});
}

renderHTML();

renderListProduct();

document.getElementById("btnThem").addEventListener("click", () => {
  let id = document.getElementById("maSP").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value;

  let product = new Product("", name, price, image);

  addProductService(product)
    .then(() => {
      renderListProduct();
    })
    .catch((err) => {});
});

document.getElementById("btnCapNhat").addEventListener("click", () => {
  let id = document.getElementById("maSP").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value;

  let product = new Product(id, name, price, image);

  updateProductService(product)
    .then(() => {
      renderListProduct();
    })
    .catch((err) => {});
});

// chú ý từ khóa module do vậy đối tượng lớn nhất của js chưa nhận dạng được function, do đụng chạm tới import và type module;
// vậy để giải quyết hàm delete thì cần thực thi thêm thao tác;
