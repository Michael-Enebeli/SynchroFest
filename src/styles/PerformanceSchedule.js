import styled, { keyframes } from "styled-components";

export const ScheduleContainer = styled.div`
  padding: 20px;
  margin: auto;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  margin: 5px 0px 15px 0;
`;

export const TimeFrameContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
`;

export const TimeFrameButton = styled.button`
  padding: 7px;
  font-size: 0.9rem;
  border: 2px solid rgb(27, 152, 224);
  background-color: transparent;
  color: rgb(27, 152, 224);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #ff9800;
    border: 2px solid #ff9800;
    color: #fff;
  }

  &.active {
    background-color: #FF007F;
    border: 2px solid  #FF007F;
    color: white;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (min-width: 720px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 2px solid rgb(27, 152, 224);
  border-radius: 5px;
  background: #1e1e2f;
  color: white;
  transition: background 0.35s ease-in-out;

  &:focus {
    background: #fff;
    color: black;
    outline: none;
    border: 3px solid rgb(27, 152, 224);
  }
`;

export const SearchIcon = styled.i`
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
  color:rgb(27, 152, 224);
  cursor: pointer;
  background: #FF007F;
  padding: 9px 10px 10px 12px;
 border-radius : 0 5px 5px 0px;
`;

export const PerformanceCard = styled.div`
  font-family: 'Exo', sans-serif;
  color: #FFD700; 
  padding: 10px;
  max-height: 700px;
  width: 270px;
  border-radius: 8px;
  text-align: center;
  flex: 0 0 100%;
  scroll-snap-align: center;
  transition: transform 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);

  @media (min-width: 1024px) {
    flex: initial;
    width: auto;
  }
`;

export const ArtistImage = styled.img`
  width: 100%;
  max-width: 700px;
  height: 240px;
  max-height: 250px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5)
`;

export const DescriptionText = styled.p`
  font-size: 0.8rem;
  margin: 10px 0 15px 0;
  padding-bottom: 30px;
  padding-top: 20px;
  height: 50px;

`;

export const ArtistName = styled.h3`
  height: 40px;
  margin-top: 5%;
  margin-bottom: 10%;
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease-in-out;
  margin-top: 40px;
  transition: 0.3s;
  

  ${({ variant }) =>
    variant === "details"
      ? `
        background: linear-gradient(10deg, #00FFFF, #7D00FF);
        color: white;
      

        &:hover {
          box-shadow: 0 0 30px #00FFFF;
          animation: pulse 0.5s infinite;
        }
      `
      : `
        background: linear-gradient(10deg, #FFD700, #FF007F);
        color: white;

        &:hover {
          box-shadow: 0 0 20px gold;
          animation: pulse 0.5s infinite;
        }
      `}
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 0;
  right: 15px;
  font-size: 2rem;
  border: none;
  padding: 1px;

  @media (min-width: 1024px) {
    cursor: pointer;
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
    transform: translateY(5px);
    opacity: 0;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
`;

export const ModalContent = styled.div`
  background: white;
   background: linear-gradient(135deg, #1A002B, #3A0CA3, #6100FF);
  padding: 25px;
  border-radius: 8px;
  width: 300px;
  text-align: left;
  position: relative;
  color: white;
  animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.3s ease-in-out;
`;


export const PerformancesWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 20px;
  
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    overflow: visible;
  }
`;
