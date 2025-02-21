import styled, { keyframes } from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
`;

export const ModalContent = styled.div`
  background: linear-gradient(135deg, #1A002B, #3A0CA3, #6100FF);
  padding: 20px;
  border-radius: 8px;
  width: 85%;
  max-width: 800px;
  position: relative;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  color: white;
  animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.3s ease-in-out;
`;

export const ScrollableSeats = styled.div`
  width: 100%;
  max-height: 420px;
  overflow-x: auto;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  
  &:hover {
    opacity: 0.75;
  }
`;

export const CheckoutButton = styled.button`
   background: linear-gradient(10deg, #FFD700, #FF007F, gold);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 30px;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 30px #FF007F;
    animation: pulse 0.5s infinite;
  }
`;


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(200px);
    opacity: 0;
  }
`;
