import React, { useState, useEffect } from "react";
import { DashboardLayout, Modal } from "../components";
import styled from "styled-components";

import { IoIosAddCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

const data = [
  {
    id: "01",
    name: "Carlos Ramirez",
    type: "Vendedor",
    email: "carlos900@gmail.com",
    phone: "3321984309",
  },
  {
    id: "02",
    name: "Ana Martinez",
    type: "Cliente",
    email: "ana.m@gmail.com",
    phone: "5551234567",
  },
  {
    id: "03",
    name: "Juan Lopez",
    type: "Proveedor",
    email: "juan.lopez@gmail.com",
    phone: "3339876543",
  },
  {
    id: "04",
    name: "Maria Garcia",
    type: "Vendedor",
    email: "maria.garcia@gmail.com",
    phone: "7771112233",
  },
  {
    id: "05",
    name: "Pedro Perez",
    type: "Cliente",
    email: "pedro.perez@gmail.com",
    phone: "9998887776",
  },
  {
    id: "06",
    name: "Luisa Fernandez",
    type: "Proveedor",
    email: "luisa.fernandez@gmail.com",
    phone: "1112223334",
  },
  {
    id: "07",
    name: "Luisa Fernandez",
    type: "Proveedor",
    email: "luisa.fernandez@gmail.com",
    phone: "1112223334",
  },
  {
    id: "08",
    name: "Luisa Fernandez",
    type: "Proveedor",
    email: "luisa.fernandez@gmail.com",
    phone: "1112223334",
  },
  {
    id: "09",
    name: "Luisa Fernandez",
    type: "Proveedor",
    email: "luisa.fernandez@gmail.com",
    phone: "1112223334",
  },
  {
    id: "01",
    name: "Carlos Ramirez",
    type: "Vendedor",
    email: "carlos900@gmail.com",
    phone: "3321984309",
  },
  {
    id: "02",
    name: "Ana Martinez",
    type: "Cliente",
    email: "ana.m@gmail.com",
    phone: "5551234567",
  },
  {
    id: "03",
    name: "Juan Lopez",
    type: "Proveedor",
    email: "juan.lopez@gmail.com",
    phone: "3339876543",
  },
  {
    id: "04",
    name: "Maria Garcia",
    type: "Vendedor",
    email: "maria.garcia@gmail.com",
    phone: "7771112233",
  },
  {
    id: "05",
    name: "Pedro Perez",
    type: "Cliente",
    email: "pedro.perez@gmail.com",
    phone: "9998887776",
  },
  {
    id: "06",
    name: "Luisa Fernandez",
    type: "Proveedor",
    email: "luisa.fernandez@gmail.com",
    phone: "1112223334",
  },
  {
    id: "07",
    name: "Luisa Fernandez",
    type: "Proveedor",
    email: "luisa.fernandez@gmail.com",
    phone: "1112223334",
  },
  {
    id: "08",
    name: "Luisa Fernandez",
    type: "Proveedor",
    email: "luisa.fernandez@gmail.com",
    phone: "1112223334",
  },
  {
    id: "09",
    name: "Luisa Fernandez",
    type: "Proveedor",
    email: "luisa.fernandez@gmail.com",
    phone: "1112223334",
  },
];

const inputClasses = "w-full bg-[#E6E6E6] border-0 rounded-md p-[6px] focus:outline-none focus:border-[#222222] focus:border-2"

export default function Users() {
  //Set current page
  const [currentPage, setCurrentPage] = useState("Usuarios");

  useEffect(() => {
    setCurrentPage("Usuarios");
  }, []);

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

  // Search Bar
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    console.log(event.target.value);
    // TODO: buscar usuarios



  }
  return (
    <>
      {/* Modal de usuario :) */}
      <Modal
        modalState={modalState}
        changeModalState={setModalState}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        title="Agregar nuevo usuario"
      >
        <form onSubmit="" className="mt-10 text-md font-semibold">
          <div className="p-1 mb-3">
            <p className="mb-1">Nombre del usuario:</p>
            <input
              className={inputClasses}
              type="text"
              id="nameInput"
              name="name"
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">  Tipo:</p>
            <select
              id="typeInput"
              name="type"
              className={`${inputClasses} font-light`}

            >
              <option className="text-sm" value="">Seleccionar tipo</option>
              <option className="text-sm" value="Vendedor">Vendedor</option>
              <option className="text-sm" value="Cliente">Cliente</option>
              <option className="text-sm" value="Proveedor">Proveedor</option>
            </select>
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Email:</p>
            <input
              className={inputClasses}
              type="email"
              id="emailInput"
              name="email"
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Contraseña:</p>
            <input
              className={inputClasses}
              type="password"
              id="passwordInput"
              name="password"
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Teléfono:</p>
            <input
              className={inputClasses}
              type="tel"
              id="phoneInput"
              name="phone"
            />
          </div>
          <div className="p-1 bottom-0 mt-6 absoulte items-center justify-items-center text-center ">
            <button type="submit" className="bottom-0 pt-3 pb-3 w-full bg-[#DFFDE1] rounded-md">Guardar usuario</button>
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
        <div className="flex flex-col h-[100%] p-2">
          <ToolsSection
            className={`${isMobile ? "mt-[8vh] h-[20vh]" : "h-[32vh]"}`}
          >
            <UserButton
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
                Nuevo Usuario
              </p>
            </UserButton>
            <br />
            <SearchBar>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar usuarios por nombre o ID"
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
          <UsersSection className={`bg-white rounded-xl`}>
            <div
              className={"h-[100%] overflow-hidden overflow-y-auto overflow-x-auto"}
            >
              <table
                className={"w-full border-collapse rounded-xl"}
              >
                <thead
                  className={"border-b border-[F9F9F9] sticky top-0 z-[1] bg-white"}
                >
                  <tr className={`${isMobile ? "m-2" : "p-4"}`}>
                    <th>ID</th>
                    <th>Nombre</th>
                    {isMobile && <th></th>}
                    <th>Tipo</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    {!isMobile && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="p-1">
                      <td className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"}`}>{item.id}</td>
                      <td className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"}`}>{item.name}</td>
                      {isMobile && (
                        <td className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2 pr-4"}`}>
                          <button className="bg-[#CCE1FE] pt-[3] pb-[3] pl-2 pr-2 rounded-xl">
                            <RiPencilFill />
                          </button>
                        </td>
                      )}
                      <td className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"}`}>{item.type}</td>
                      <td className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"}`}>{item.email}</td>
                      <td className={`${isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"}`}>{item.phone}</td>
                      {!isMobile && (
                        <td className="pt-2 pr-4">
                          <button className="bg-[#CCE1FE] pt-[3] pb-[3] pl-2 pr-2 rounded-xl">
                            <RiPencilFill />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </UsersSection>
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

const UsersSection = styled.div`
  height: 58vh;
  overflow-x: 'scroll';
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
  background-color: var(--main-blue);
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
