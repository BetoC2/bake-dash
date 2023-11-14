
import React from "react";
import { ImCross } from "react-icons/im";
import styled from "styled-components";
import "./styles/Modal.css";

export default function Modal({
  children,
  modalState,
  changeModalState,
  isMobile,
  width = '46%',
  title = 'Modal',
}) {
  // TODO: Manejar cuando es un dispositivo movil

  return (

    <>
      {modalState && (
        <Overlay>
          <ModalContainer width={width}>
            <ModalHeader>
              <h3 className='font-medium text-5xl text-[#222222] text-center'>
                {title}
              </h3>
            </ModalHeader>
            <CloseButton onClick={() => changeModalState(false)}>
              <ImCross className='hover:bg-gray-200' />
            </CloseButton>
            <ModalContent>{children}</ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: ${props => props.width};
  height: 97%;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Evitar el desplazamiento horizontal si hay contenido grande */
`;

const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #222222;
`;

const ModalContent = styled.div`
  width: 66%;
  margin: 0 auto;
  box-sizing: border-box;
  flex: 1;
  overflow: auto;
  scrollbar-gutter: stable;
`;
