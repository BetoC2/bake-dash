import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DashboardLayout } from "../components";
import { CiCirclePlus } from "react-icons/ci";
import { Modal } from "../components";
import { removeProduct } from "../../api/controllers/product_controller";
import { set } from "mongoose";

const inputClasses =
  "w-full bg-[#E6E6E6] border-0 rounded-md p-[6px] focus:outline-none focus:border-[#222222] focus:border-2";

function Products() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState("Productos");
  const [products, setProducts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProduct, setEditProduct] = useState({
    id: "",
    imageURL: "",
    name: "",
    description: "",
    price: "",
  });
  const [createProduct, setCreateProduct] = useState({
    imageURL: "",
    name: "",
    description: "",
    price: "",
  });
  // Responsive openning
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Fetch products
  useEffect(() => {
    setCurrentPage("Productos");
    fetch("http://localhost:3000/product/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  // crear producto
  const handleCreateSubmit = async () => {
    const data = createProduct;
    setProducts({
      imageURL: "",
      name: "",
      description: "",
      price: "",
    });
    setCreateModal(false);
    if (!data.imageURL || !data.name || !data.description || !data.price) {
      alert("Por favor, rellene todos los campos");
      return window.location.reload();
    }
    if (parseInt(data.price) <= 0) {
      alert("Precio invalido");
      return window.location.reload();
    }
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));
    try {
      const response = await fetch("http://localhost:3000/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: sesion.employment,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(data.statusText);
      }
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };
  // Buscar producto
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() === "") {
        // Si la cadena de búsqueda está vacía, obtener todos los usuarios
        fetch("http://localhost:3000/product/")
          .then((response) => {
            if (!response.ok) {
              alert(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            setProducts(data.products);
          });
      } else {
        fetch("http://localhost:3000/product/search/" + searchTerm)
          .then((response) => {
            if (!response.ok) {
              alert(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            if (data.productsFound && data.productsFound.length > 0) {
              setProducts(data.productsFound);
            } else {
              setProducts([]); // Si no hay resultados, establecer los datos como vacíos
            }
          });
      }
    }
  };
  // Manejar el modal de edición
  const handleEditModal = async (id) => {
    setEditModal(true);
    try {
      const response = await fetch("http://localhost:3000/product/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("producto encontrado con éxito:", data);
      setEditProduct({
        id: data._id,
        name: data.name,
        description: data.description,
        price: data.price,
        imageURL: data.imageURL,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  // Editar producto
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    productEdit(editProduct.id);
    setEditModal(false);
    setEditProduct({
      id: "",
      imageURL: "",
      name: "",
      description: "",
      price: "",
    });
  };

  const productEdit = async (id) => {
    const data = {
      imageURL: editProduct.imageURL,
      name: editProduct.name,
      description: editProduct.description,
      price: editProduct.price,
    };
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));
    setEditModal(false);
    if (!data.imageURL || !data.name || !data.description || !data.price) {
      alert("Por favor, rellene todos los campos");
      return window.location.reload();
    }
    if (parseInt(data.price) <= 0) {
      alert("Precio invalido");
      return window.location.reload();
    }
    try {
      const response = await fetch("http://localhost:3000/product/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: sesion.employment,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };
  // Eliminar producto
  const removeProduct = async () => {
    const newData = editProduct;
    setEditModal(false);
    setEditProduct({
      id: "",
      imageURL: "",
      name: "",
      description: "",
      price: "",
    });
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));
    try {
      const response = await fetch(
        "http://localhost:3000/product/" + newData.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            auth: sesion.employment,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("Usuario eliminado con éxito:", data);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Modal
        modalState={createModal}
        changeModalState={setCreateModal}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        title="Agregar nuevo producto"
      >
        <form
          onSubmit={handleCreateSubmit}
          className="mt-10 text-md font-semibold"
        >
          <div className="p-1 mb-3">
            <p className="mb-1">Imagen del producto</p>
            <input
              className={inputClasses}
              type="text"
              name="imageURL"
              value={createProduct.imageURL}
              onChange={(e) =>
                setCreateProduct({ ...createProduct, imageURL: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Nombre del producto</p>
            <input
              className={inputClasses}
              type="text"
              name="name"
              value={createProduct.name}
              onChange={(e) =>
                setCreateProduct({ ...createProduct, name: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Precio de venta</p>
            <input
              className={`${inputClasses}`}
              type="number"
              name="price"
              value={createProduct.price}
              onChange={(e) =>
                setCreateProduct({ ...createProduct, price: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Descripcion</p>
            <input
              className={`${inputClasses} h-28`}
              type="text"
              name="description"
              value={createProduct.description}
              onChange={(e) =>
                setCreateProduct({
                  ...createProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="p-1 bottom-0 mt-6 absoulte items-center justify-items-center text-center ">
            <button
              type="submit"
              className="bottom-0 pt-3 pb-3 w-full bg-[#DFFDE1] rounded-md"
            >
              {" "}
              Guardar producto
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        modalState={editModal}
        changeModalState={setEditModal}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        title="Editar/Eliminar producto"
      >
        <form
          onSubmit={handleEditSubmit}
          className="mt-10 text-md font-semibold"
        >
          <div className="p-1 mb-3">
            <p className="mb-1">Imagen del producto</p>
            <input
              className={inputClasses}
              type="text"
              name="imageURL"
              value={editProduct.imageURL}
              onChange={(e) =>
                setEditProduct({ ...editProduct, imageURL: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Nombre del producto</p>
            <input
              className={inputClasses}
              type="text"
              name="name"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Precio de venta</p>
            <input
              className={`${inputClasses}`}
              type="number"
              name="price"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Descripcion</p>
            <input
              className={`${inputClasses} h-28`}
              type="text"
              name="description"
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="p-1 flex justify-between mt-6 text-lg">
            <button
              type="submit"
              className="pt-3 pb-3 w-[45%] bg-[#ffbab5] rounded-md"
              onClick={removeProduct}
            >
              Eliminar <br /> producto
            </button>
            <button
              type="submit"
              className="pt-3 pb-3 w-[45%] bg-[#DFFDE1] rounded-md"
            >
              Guardar <br /> cambios
            </button>
          </div>
        </form>
      </Modal>
      <DashboardLayout currentPage={currentPage}>
        <div className="mb-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl mb-8">Productos</h1>
          <button
            className="flex items-center bg-main-dark text-main-white py-2 px-4 rounded-xl mb-8 text-xl lg:text-lg xl:text-lg "
            onClick={() => {
              setCreateModal(true);
            }}
          >
            {/* <FaPlus className="mr-2" /> */}
            Nuevo Producto
          </button>
          <div className="relative w-3/4">
            <input
              type="text"
              placeholder="Buscar producto"
              className="p-2 pl-8 w-full rounded-3xl text-lg bg-main-white border-0 "
              style={{ paddingLeft: "3rem", outline: "none" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="absolute inset-y-0 left-2 pl-2 flex items-center pointer-events-none">
              <FaSearch className="text-xl" />
            </div>
          </div>
        </div>
        <div className="p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full sm:p-8 lg:p-0 xl:p-0">
          {products.map((item) => (
            <div
              key={item._id}
              className="w-full h-52 rounded-3xl flex flex-col items-center justify-center"
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="object-cover w-full h-3/4 rounded-xl"
                onClick={() => handleEditModal(item._id)}
              />
              <p className="text-center mt-2 text-sm ">{item.name}</p>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}

export default Products;
