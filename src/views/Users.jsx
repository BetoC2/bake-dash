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
];

export default function Users() {
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
  };
  return (
    <>
      <Modal
        modalState={modalState}
        changeModalState={setModalState}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        title="Agregar nuevo usuario"
      ></Modal>
      <DashboardLayout isMobile={isMobile} setIsMobile={setIsMobile}>
        <div className="flex flex-col h-[100%] p-2">
          <ToolsSection>
            <UserButton onClick={() => setModalState(!modalState)}>
              <IoIosAddCircleOutline />
              <p className="pl-2 pb-1">Nuevo Usuario</p>
            </UserButton>{" "}
            <br />
            <SearchBar>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar producto"
                  className="p-2 pl-8 w-full rounded-3xl text-lg bg-main-white border-0"
                  style={{ paddingLeft: "3rem" }}
                />
                <div className="absolute inset-y-0 left-2 pl-2 flex items-center pointer-events-none">
                  <FaSearch className="text-xl" />
                </div>
              </div>
            </SearchBar>
          </ToolsSection>
          <UsersSection className="bg-white">
            {/* Si es mobil, se muestra el boton primero, si es desktop, se muestra al final */}
            {isMobile ? (
              <div className="overflow-x-auto overflow-y-auto max-h-[60vh]">
                <table className="w-full border-collapse rounded-md">
                  <thead className="border-b border-[F9F9F9]">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th></th>
                      <th>Tipo</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className="p-1">
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                          <button className="bg-[#CCE1FE] pt-[3] pb-[3] pl-2 pr-2 rounded-xl">
                            <RiPencilFill />
                          </button>
                        </td>
                        <td>{item.type}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-hidden overflow-y-auto">
                <table className="w-full border-collapse rounded-md">
                  <thead className="border-b border-[F9F9F9]">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className="p-1">
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <button className="bg-[#CCE1FE] pt-[3] pb-[3] pl-2 pr-2 rounded-xl">
                            <RiPencilFill />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
  height: 32vh;
  position: relative; /* Añadido para el posicionamiento */
  margin-bottom: 20px;
`;

const UsersSection = styled.div`
  height: 58vh;
  thead {
    tr {
      th {
        padding: 10px 10px;
        text-align: center;
      }
    }
  }
  tbody {
    tr {
      td {
        font-size: 18px;
        text-align: center;
      }
    }
  }
`;

const UserButton = styled.button`
  background-color: var(--main-blue);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  border-radius: 10px;
`;

const SearchBar = styled.div`
  position: absolute;
  bottom: 0; /* Lo posicionamos en la parte inferior */
  width: 100%; /* Ocupará todo el ancho del contenedor */
`;
