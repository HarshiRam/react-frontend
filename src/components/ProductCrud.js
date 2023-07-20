import axios from "axios";
import { useEffect, useState } from "react";


function ProductCrud() {
    const [id, setId] = useState("");
const [productname, setproductName] = useState("");
const [price, setPrice] = useState("");
const [qty, setQty] = useState([]);
const [products, setProducts] = useState([]);

 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {
    
    const result = await axios.get("https://localhost:7212/api/Product/GetProducts");
    setProducts(result.data);
    console.log(result.data);
  }
 
  async function save(event) {
   
    event.preventDefault();
    try {
      await axios.post("https://localhost:7212/api/Product/PostProducts", {
        
      productName: productname,
      price: price,
      qty: qty, 

      });
      alert("Product loaded Successfully");
          setId("");
          setproductName("");
          setPrice("");
          setQty("");
     
      Load();
    } catch (err) {
      alert(err);
    }
  }
  async function editProduct(products) {
    setproductName(products.productName);
    setPrice(products.price);
    setQty(products.qty);
 
    setId(products.id);
  }
 
  async function DeleteProduct(id) {
  await axios.delete("https://localhost:7212/api/Product/DeleteProducts/" + id);
   alert("Product deleted Successfully");
   setId("");
   setproductName("");
   setPrice("");
   setQty("");
   Load();
  }
 
  async function update(event) {
    event.preventDefault();
    try {

  await axios.put("https://localhost:7212/api/Product/UpdateProduct/"+ products.find((u) => u.id === id).id || id,
        {
        id: id,
        productName: productname,
        price: price,
        qty: qty,
        }
      );
      alert("Product Updated");
      setId("");
      setproductName("");
      setPrice("");
      setQty("");

      Load();
    } catch (err) {
      alert(err);
    }
  }
    return (

      
      <div>
        <h3>Product Details</h3>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Product Name : </label>
            <input
              type="text"
              class="form-control"
              id="productname"
              value={productname}
              onChange={(event) => {
                setproductName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Price : </label>
            <input
              type="text"
              class="form-control"
              id="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Quantity : </label>
            <input
              type="text"
              class="form-control"
              id="qty"
              value={qty}
              onChange={(event) => {
                setQty(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Add Product
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Product Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {products.map(function fn(product) {
          return (
            <tbody>
              <tr>
                <th scope="row">{product.id} </th>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.qty}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default ProductCrud;