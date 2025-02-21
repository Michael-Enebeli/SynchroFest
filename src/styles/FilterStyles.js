import styled from "styled-components";

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; /* Stack on mobile */
  margin-bottom: 20px;
  
  @media (min-width: 720px) {
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
  }
`;

export const FilterHeading = styled.h2`
  font-size: 1.19rem;
  font-weight: bold;
  color: rgb(27, 152, 224);
  margin: 10px 0;
  text-align: center;
  
  @media (min-width: 1024px) {
    text-align: left;
    width: 50%;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: center;
  width: 100%;
  
  @media (min-width: 720px) {
    justify-content: flex-end;
    width: 50%;
  }
`;

export const FilterLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(27, 152, 224);
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid rgb(27, 152, 224);
  border-radius: 5px;
  background: #2A194e;
  color: rgb(27, 152, 224);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    border: 2px solid #ff9800;
    color: #fff;
  }

  &:focus {
    outline: none;
    border-color: #FF007F;
  }
`;
