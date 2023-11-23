import React, { useState, useEffect } from "react";
import { DashboardLayout, Modal } from "../components";
import styled from "styled-components";

import { IoIosAddCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

const inputClasses =
  "w-full bg-[#E6E6E6] border-0 rounded-md p-[6px] focus:outline-none focus:border-[#222222] focus:border-2";

export default function Users() {
  const [isMobile, setIsMobile] = useState(false);
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

  //Set current page
  const [currentPage, setCurrentPage] = useState("Usuarios");

  useEffect(() => {
    setCurrentPage("Usuarios");
  }, []);

  // Togabble modal
  const [modalState, setModalState] = React.useState(false);
  const [modalState2, setModalState2] = React.useState(false);

  // Fetching data
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data
    fetch("http://localhost:3000/user/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        setData(userData.users);
      })
      .catch((error) => {
        console.error("Hubo un problema con la solicitud fetch:", error);
      });
  }, []);

  // Search Bar
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() === "") {
        // Si la cadena de búsqueda está vacía, obtener todos los usuarios
        fetch("http://localhost:3000/user/")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((userData) => {
            setData(userData.users);
          })
          .catch((error) => {
            console.error("Hubo un problema con la solicitud fetch:", error);
            setData([]); // Si hay un error, establecer los datos como vacíos
          });
      } else {
        fetch("http://localhost:3000/user/search/" + searchTerm)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((userData) => {
            if (userData.usersFound && userData.usersFound.length > 0) {
              setData(userData.usersFound);
            } else {
              setData([]); // Si no hay resultados, establecer los datos como vacíos
            }
          })
          .catch(() => {
            setData([]); // Si hay un error, establecer los datos como vacíos
          });
      }
    }
  };

  // Creación de usuario
  const [formData, setFormData] = useState({
    name: "",
    type: "Vendedor",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    saveUser(formData); // Llama a saveUser con los datos del formulario
    setModalState(false);
    setFormData({
      name: "",
      type: "Vendedor",
      email: "",
      password: "",
      phone: "",
    });
  };

  const saveUser = async (userData) => {
    const newUser = {
      name: userData.name,
      email: userData.email,
      pass: userData.password,
      employment: userData.type,
      phone: userData.phone,
    };
    try {
      const sesion = JSON.parse(sessionStorage.getItem("sesion"));
      console.log(sesion.employment);
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: sesion.employment,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("Usuario guardado con éxito:", data);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };
  // Modal 2
  // edición de usuario
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    type: "Vendedor",
    email: "",
    password: "",
    phone: "",
  });

  const handleEditModal = async (id) => {
    setModalState2(!modalState2);
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));
    try {
      const response = await fetch("http://localhost:3000/user/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: sesion.employment,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("Usuario encontrado con éxito:", data);
      setEditData({
        id: data.userFound._id,
        name: data.userFound.name,
        type: data.userFound.employment,
        email: data.userFound.email,
        password: "",
        phone: data.userFound.phone,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const removeUser = async () => {
    //const newData = editData;
    const userToDelete = { ...editData }; // Evitar mutaciones
    setModalState2(false);
    setEditData({
      id: "",
      name: "",
      type: "Vendedor",
      email: "",
      password: "",
      phone: "",
    });
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));
    try {
      const response = await fetch("http://localhost:3000/user/" + newData.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: sesion.employment,
        },
      });

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

  const editUser = async (userData) => {
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));
    const newUser = {
      name: userData.name,
      email: userData.email,
      pass: userData.password,
      employment: userData.type,
      phone: userData.phone,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/user/" + editData.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            auth: sesion.employment,
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("Usuario editado con éxito:", data);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const newData = editData;
    editUser(newData); // Llama a saveUser con los datos del formulario
    setModalState2(false);
    setEditData({
      id: "",
      name: "",
      type: "Vendedor",
      email: "",
      password: "",
      phone: "",
    });
  };

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
        <form onSubmit={handleSubmit} className="mt-10 text-md font-semibold">
          <div className="p-1 mb-3">
            <p className="mb-1">Nombre:</p>
            <input
              className={inputClasses}
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1"> Tipo:</p>
            <select
              name="type"
              className={`${inputClasses} font-light`}
              value="Vendedor"
              onChange={(e) => setFormData({ ...formData, type: "Vendedor" })}
            >
              <option className="text-sm" value="Vendedor">
                Vendedor
              </option>
            </select>
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Email:</p>
            <input
              className={inputClasses}
              type="email"
              id="emailInput"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Contraseña:</p>
            <input
              className={inputClasses}
              type="password"
              id="passwordInput"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Teléfono:</p>
            <input
              className={inputClasses}
              type="tel"
              id="phoneInput"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="p-1 bottom-0 mt-6 absoulte items-center justify-items-center text-center ">
            <button
              type="submit"
              className="bottom-0 pt-3 pb-3 w-full bg-[#DFFDE1] rounded-md"
            >
              {" "}
              Guardar usuario
            </button>
          </div>
        </form>
      </Modal>
      {/* Modal de edición de usuario */}
      <Modal
        modalState={modalState2}
        changeModalState={setModalState2}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        title="Modificar usuario"
      >
        <form
          onSubmit={handleEditSubmit}
          className="mt-10 text-md font-semibold"
        >
          <div className="p-1 mb-3">
            <p className="mb-1">Nombre:</p>
            <input
              className={inputClasses}
              type="text"
              name="name"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1"> Tipo:</p>
            <select
              name="type"
              className={`${inputClasses} font-light`}
              value="Vendedor"
              onChange={(e) => setEditData({ ...editData, type: "Vendedor" })}
            >
              <option className="text-sm" value="Vendedor">
                Vendedor
              </option>
            </select>
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Email:</p>
            <input
              className={inputClasses}
              type="email"
              id="emailInput"
              name="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Contraseña:</p>
            <input
              className={inputClasses}
              type="password"
              id="passwordInput"
              name="password"
              value={editData.password}
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
            />
          </div>
          <div className="p-1 mb-3">
            <p className="mb-1">Teléfono:</p>
            <input
              className={inputClasses}
              type="tel"
              id="phoneInput"
              name="phone"
              value={editData.phone}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
            />
          </div>
          <div className="p-1 flex justify-between mt-6 text-lg">
            <button
              type="submit"
              className="pt-3 pb-3 w-[45%] bg-[#ffbab5] rounded-md"
              onClick={removeUser}
            >
              Eliminar <br /> usuario
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
      {/* Layout Principal */}
      <DashboardLayout
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        currentPage={currentPage}
        className="pl-8 pr-8"
      >
        <h1 className="text-4xl mb-8">Usuarios</h1>
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
                className={`${
                  isMobile ? "pl-2 pb-1 text-lg font-semibold" : "pl-2 pb-1"
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
                  placeholder="Buscar usuarios por nombre"
                  className={`p-2 pl-8 w-full rounded-3xl ${
                    isMobile ? "text-md" : "text-lg"
                  } bg-main-white border-0`}
                  style={{ paddingLeft: "3rem" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
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
                    <tr key={item._id} className="p-1">
                      <td
                        className={`${
                          isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td
                        className={`${
                          isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                        }`}
                      >
                        {item.name}
                      </td>
                      {isMobile && item.employment != "Admin" && (
                        <td
                          className={`${
                            isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2 pr-4"
                          }`}
                        >
                          <button
                            className="bg-[#CCE1FE] pt-[3] pb-[3] pl-2 pr-2 rounded-xl"
                            onClick={() => handleEditModal(item._id)}
                          >
                            <RiPencilFill />
                          </button>
                        </td>
                      )}
                      {isMobile && item.employment == "Admin" && <td />}
                      <td
                        className={`${
                          isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                        }`}
                      >
                        {item.employment}
                      </td>
                      <td
                        className={`${
                          isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                        }`}
                      >
                        {item.email}
                      </td>
                      <td
                        className={`${
                          isMobile ? "pl-4 pr-4 pt-3 pb-3" : "p-2"
                        }`}
                      >
                        {item.phone}
                      </td>
                      {!isMobile && item.employment != "Admin" && (
                        <td className="pt-2 pr-4">
                          <button
                            className="bg-[#CCE1FE] pt-[3] pb-[3] pl-2 pr-2 rounded-xl"
                            onClick={() => handleEditModal(item._id)}
                          >
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
