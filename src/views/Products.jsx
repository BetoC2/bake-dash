import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DashboardLayout } from "../components";
import { CiCirclePlus } from "react-icons/ci";
import { Modal } from "../components";

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
  // Editar producto
  const handleEditModal = async (id) => {
    setEditModal(true);
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
      ></Modal>
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
