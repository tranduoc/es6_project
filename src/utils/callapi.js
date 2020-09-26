import API_URL from "./../config/index.js";

const callApi = (uri, method = "get", data) => {
  return axios({
    url: API_URL + uri,
    method,
    data,
  });
};

const getListProductService = () => {
  return axios({
    url: "https://5f5c7a4e5e3a4d0016249462.mockapi.io/products",
    method: "Get",
  });
};

const deleteProductService = (id) => {
  return axios({
    url: `https://5f5c7a4e5e3a4d0016249462.mockapi.io/products/${id}`,
    method: "delete",
  });
};

const addProductService = (product) => {
  return axios({
    url: `https://5f5c7a4e5e3a4d0016249462.mockapi.io/products`,
    method: "post",
    data: product,
  });
};

const getProductService = (id) => {
  return axios({
    url: `https://5f5c7a4e5e3a4d0016249462.mockapi.io/products/${id}`,
    method: "get",
  });
};

const updateProductService = (product) => {
  return axios({
    url: `https://5f5c7a4e5e3a4d0016249462.mockapi.io/products/${product.id}`,
    method: "put",
    data: product,
  });
};

export {
  getListProductService,
  deleteProductService,
  addProductService,
  getProductService,
  updateProductService,
};
