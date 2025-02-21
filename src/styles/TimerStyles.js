import styled, { keyframes } from "styled-components";

const animateTimer = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const TimerContainer = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  padding: 10px 10px 0 10px;
  color: white;
  background: transparent;
  width: fit-content;
  margin: 10px auto;
  animation: ${animateTimer} 2s infinite;
  color: #00D8FF;
`;
