import React, { useState, useEffect } from "react";
import { DashboardLayout, Modal } from "../components";
import styled from "styled-components";

import { IoIosAddCircleOutline } from "react-icons/io";
import { IoChevronBack, IoChevronForward, IoTrashBin } from "react-icons/io5";
import { FaSearch, FaEye } from "react-icons/fa";
import { RiAddLine, RiArrowUpLine, RiArrowDownLine, RiDeleteBinLine } from 'react-icons/ri';

const inputClasses =
  "w-full bg-[#E6E6E6] border-0 rounded-md p-[6px] focus:outline-none focus:border-[#222222] focus:border-2";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [inputIdValue, setInputIdValue] = useState('');
  const [currentPage, setCurrentPage] = useState("Ventas");
  useEffect(() => {
    setCurrentPage("Ventas");
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // Responsive openning
  const [isMobile, setIsMobile] = useState(false);
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
  // Togabble modal
  const [modalState, setModalState] = React.useState(false);

  const handleSearch = async (event) => {
    if (inputIdValue.trim() === "") {
      alert("Input vacío");
    } else {
      await fetch(`http://localhost:3000/product/barcode/${inputIdValue}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (data) {

            alert(`Producto ${data.productFound.name} con barcode ${inputIdValue} encontrado`);
            addProduct(data.productFound);
          }
        })
        .catch((error) => {
          alert('Producto no encontrado');
          setInputIdValue('');
        });
    }
  };

  const addProduct = (data) => {
    // Verificar si el ID ya existe en la lista de productos
    const productIndex = products.findIndex(product => product.barcode === data.barcode);

    if (productIndex !== -1) {
      // El producto ya existe, actualizamos la cantidad sumando 1
      const updatedProducts = [...products];
      updatedProducts[productIndex].quantity += 1;
      setProducts(updatedProducts);
      setInputIdValue('');
    } else {
      // El producto no existe, lo agregamos a la lista con cantidad 1
      const newProduct = { barcode: data.barcode, name: data.name, quantity: 1, price: data.price };
      setProducts(prevProducts => [...prevProducts, newProduct]);
      setInputIdValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();

    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const deleteProduct = (barcode) => {
    const newProducts = products.filter((product) => product.barcode !== barcode);
    setProducts(newProducts);
  };

  const decreaseQuantity = (barcode) => {
    const newProducts = products.map((product) => {
      if (product.barcode === barcode && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    setProducts(newProducts);
  };

  const increaseQuantity = (barcode) => {
    const newProducts = products.map((product) => {
      if (product.barcode === barcode) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    setProducts(newProducts);
  };



  const [paymentMethod, setPaymentMethod] = useState('');
  const [advance, setAdvance] = useState('');
  const [extraCost, setExtraCost] = useState('');
  const [comments, setComments] = useState('');
  const sesion = JSON.parse(sessionStorage.getItem('sesion'));


  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAdvanceChange = (event) => {
    let value = event.target.value;

    value = value === null || value === undefined ? 0 : value.trim();

    setAdvance(value === null ? 0 : parseFloat(value));
  };

  const handleExtraCostChange = (event) => {
    let value = event.target.value;

    value = value === null || value === undefined ? 0 : value.trim();

    setExtraCost(value === null ? 0 : parseFloat(value)); // Establecer en 0 si está vacío, de lo contrario, convertir a flotante
  };


  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const calculateSubtotal = () => {
    const productsTotal = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    return productsTotal;
  };

  const calculateTotal = () => {
    const productsTotal = calculateSubtotal();
    const total = productsTotal + extraCost - advance;
    return total;
  };


  const handleCreateSubmit = async () => {
    const validationResult = validateFields();

    if (!validationResult.valid) {

      alert(validationResult.message);
    }

    const saleData = {
      products: products.map(product => ({
        barcode: product.barcode,
        name: product.name,
        quantity: product.quantity,
        price: product.price
      })),
      vendor: {
        id: sesion.id,
        name: sesion.name
      },
      paymentMethod: paymentMethod,
      advance: advance,
      extraCost: extraCost,
      comments: comments,
      subtotal: calculateSubtotal(),
      total: calculateTotal(),
    };
    console.log(saleData);

    try {
      response = await fetch('http://localhost:3000/sale/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
      }

      const responseData = await response.json();
      console.log('Venta creada exitosamente:', responseData);

      clearFields();

      alert('Venta creada exitosamente');
    } finally {
      if (response && !response.ok) {
        console.error('Error al crear la venta');
        alert('Error al crear la venta. Por favor, inténtalo de nuevo');
      }
    }
  };

  const validateFields = () => {
    if (products.length === 0) {
      return {
        valid: false,
        message: 'No hay productos en la venta. Agrega al menos un producto para realizar la venta.',
      };
    }

    if (!sesion || !sesion.id || !sesion.name) {
      return {
        valid: false,
        message: 'No se pudo identificar al vendedor. Por favor, inicia sesión nuevamente.',
      };
    }

    if (!paymentMethod) {
      return {
        valid: false,
        message: 'El método de pago no es válido. Selecciona un método de pago para continuar.',
      };
    }

    return { valid: true };
  };

  const clearFields = () => {
    setProducts([]);
    setPaymentMethod('');
    setAdvance('');
    setExtraCost('');
    setComments('');
  };

  const [sales, setSales] = useState([]);

  const fetchSalesData = async () => {
    try {
      const response = await fetch('http://localhost:3000/sale');
      if (response.ok) {
        const responseData = await response.json();
        const salesData = responseData.sales; // Accediendo a la propiedad 'sales' del objeto
        setSales(salesData);
      } else {
        throw new Error('Error al obtener los datos de ventas');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  //Format Date Time
  const formatDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = `${addZero(dateTime.getDate())}/${addZero(
      dateTime.getMonth() + 1
    )}/${dateTime.getFullYear()}`;
    const formattedTime = `${addZero(dateTime.getHours())}:${addZero(
      dateTime.getMinutes()
    )}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const addZero = value => {
    return value < 10 ? `0${value}` : value;
  };


  // Addtional method to display sales
  // Función de filtrado basada en el tipo de usuario
  const filteredSales = sesion && sesion.employment !== "Admin"
    ? sales.filter(sale => sale.vendor[0].id === sesion.id)
    : sales;

  // Ordenar ventas filtradas por fecha
  const sortedSales = filteredSales.slice().sort((a, b) => {
    const dateA = new Date(a.datetime).getTime();
    const dateB = new Date(b.datetime).getTime();
    return dateB - dateA;
  });


  return (
    <>
      {/* Modal de venta :) */}
      <Modal
        modalState={modalState}
        changeModalState={setModalState}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        title="Nueva venta"
      >
        <form onSubmit={handleCreateSubmit} className="mt-10 text-md font-semibold">
          {/* Productos */}
          <div className="p-1 mb-3 relative">
            <p className="mb-1">Productos</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Ingrese el barcode del producto"
                className={`relative ${inputClasses}`}
                value={inputIdValue}
                onChange={(e) => setInputIdValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <RiAddLine
                className="absolute right-3 top-0 pt-2 text-3xl cursor-pointer"
                onClick={handleClick}
              />
            </div>


            {/* Mostrar las tarjetas de productos */}
            {products.map((product) => (
              <div
                className="w-full bg-main-dark mt-4 flex items-center justify-between px-4 py-2 rounded-md"
                key={product.barcode}
              >
                <h4 className="text-main-white text-sm">{product.name}</h4>
                <div className="flex items-center ml-auto mr-4">
                  <IoChevronBack
                    className="text-white mr-2 cursor-pointer"
                    onClick={() => decreaseQuantity(product.barcode)}
                  />
                  <input
                    type="text"
                    value={product.quantity}
                    className="border px-2 py-1 rounded-md focus:outline-none w-12"
                    readOnly
                  />
                  <IoChevronForward
                    className="text-white ml-2 cursor-pointer"
                    onClick={() => increaseQuantity(product.barcode)}
                  />
                </div>
                <IoTrashBin
                  className="text-white cursor-pointer text-2xl"
                  onClick={() => deleteProduct(product.barcode)}
                />
              </div>
            ))}
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1"> Metodo de pago</p>
            <select
              id="products"
              name="type"
              className={`${inputClasses} font-light`}
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option className="text-sm" value="">
                Seleccionar método
              </option>
              <option className="text-sm" value="Efectivo">
                Efectivo
              </option>
              <option className="text-sm" value="Tarjeta">
                Tarjeta
              </option>
            </select>
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Descuento ($)</p>
            <input
              className={inputClasses}
              type="text"
              id="AnticipoInput"
              name="anticipo"
              value={advance}
              onChange={handleAdvanceChange}
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Costo extra ($)</p>
            <input
              className={inputClasses}
              type="text"
              id="costoExtraInput"
              name="costoExtra"
              value={extraCost}
              onChange={handleExtraCostChange}
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Comentarios</p>
            <input
              className={inputClasses + " pt-3 pb-3"}
              type="text"
              id="comentariosInput"
              name="comentarios"
              value={comments}
              onChange={handleCommentsChange}
            />
          </div>
          <div className="p-1">
            <p className="mb-1">Total</p>
            <p className="text-xl">$ {calculateTotal()}</p>
          </div>
          <div className="p-1 bottom-0 mt-2 absoulte items-center justify-items-center text-center ">
            <button
              type="submit"
              className="bottom-0 pt-3 pb-3 w-full bg-[#DFFDE1] rounded-md"
            >
              Guardar e imprimir ticket
            </button>
          </div>
        </form>
      </Modal>
      {/* Layout Principal */}
      <DashboardLayout
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        currentPage={currentPage}
        className="pl-8 pr-8"
      >
        {/* Parte del boton modal y la barra de búsqueda */}
        <div className="flex flex-col h-[100%] p-2 justify-center">
          <ToolsSection
            className={`${isMobile ? "mt-[8vh] h-[20vh]" : "h-[32vh]"}`}
          >
             <h1 className="text-4xl mb-8">Ventas</h1>
            {/* <UserButton
              className={`p-4 ${isMobile ? "w-[100%]" : ""}`}
              onClick={() => setModalState(!modalState)}
            >
              <IoIosAddCircleOutline
                className={`${isMobile ? "text-2xl" : ""}`}
              />
              <p
                className={`${isMobile ? "pl-2 pb-1 text-lg font-semibold" : "pl-2 pb-1"
                  }`}
              >
                Nueva venta
              </p>
            </UserButton> */}
            <button
              className="flex items-center bg-main-dark text-main-white py-2 px-4 rounded-xl mb-8 text-xl lg:text-lg xl:text-lg "
              onClick={() => {
                setModalState(!modalState);
              }}
            >
              Nueva Venta
            </button>
            <br />
            <SearchBar>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar una venta pasada"
                  className={`p-2 pl-8 w-full rounded-3xl ${isMobile ? "text-md" : "text-lg"
                    } bg-main-white border-0`}
                  style={{ paddingLeft: "3rem" }}
                />
                <div className="absolute inset-y-0 left-2 pl-2 flex items-center pointer-events-none">
                  <FaSearch className={`${isMobile ? "text-xl" : ""}`} />
                </div>
              </div>
            </SearchBar>
          </ToolsSection>

          {/* Parte de la seleccion de usuarios */}
          <SellsSection className={`bg-white rounded-xl`}>
            <div
              className={
                "h-[100%] overflow-hidden overflow-y-auto overflow-x-auto"
              }
            >
              <table className={"w-full border-collapse rounded-xl"}>
                <thead
                  className={
                    "border-b border-[F9F9F9] sticky top-0 z-[1] bg-white"
                  }
                >
                  <tr className={`${isMobile ? "m-2" : "p-4"}`}>
                    <th></th>
                    <th>Fecha & Hora</th>
                    {isMobile && <th></th>}
                    <th>Total</th>
                    <th>Vendedor</th>
                    <th>Método de pago</th>
                    {!isMobile && <th></th>}
                  </tr>
                </thead>
                <tbody className="font-semibold">
                  {sortedSales.map((sale, index) => (
                    <tr key={index} className="p-1">
                      <td
                        className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                          }`}
                      >
                        {sale._id}
                      </td>
                      <td
                        className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                          }`}
                      >
                        {formatDateTime(sale.datetime)}
                      </td>
                      {isMobile && (
                        <td
                          className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2 pr-4"
                            }`}
                        >
                          <button className="bg-[#E0D9F2] pt-[3] pb-[3] pl-2 pr-2 rounded-xl">
                            <FaEye />
                          </button>
                        </td>
                      )}
                      <td
                        className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                          }`}
                      >
                        ${sale.total}
                      </td>
                      <td
                        className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                          }`}
                      >
                        {sale.vendor[0].name}
                      </td>
                      <td
                        className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                          }`}
                      >
                        {sale.paymentMethod}
                      </td>
                      {!isMobile && (
                        <td className="pt-2 pr-4">
                          <button className="bg-[#E0D9F2] pt-[3] pb-[3] pl-2 pr-2 rounded-xl">
                            <FaEye />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SellsSection>
        </div>
      </DashboardLayout>
    </>
  );
}

const ToolsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; /* Añadido para el posicionamiento */
  margin-bottom: 20px;
`;

const SellsSection = styled.div`
  height: 58vh;
  overflow-x: "scroll";
  thead {
    tr {
      th {
        padding: 10px 10px;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
  tbody {
    tr {
      td {
        font-size: 18px;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
`;

const UserButton = styled.button`
  background-color: var(--main-purple);
  padding: 15px 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  border-radius: 15px;
`;

const SearchBar = styled.div`
  position: absolute;
  bottom: 0; /* Lo posicionamos en la parte inferior */
  width: 100%; /* Ocupará todo el ancho del contenedor */
`;
