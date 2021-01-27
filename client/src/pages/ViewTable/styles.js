import styled from "styled-components";

export const Main = styled.div`
  width: auto;
  padding: 10px 20px;
`;

export const Title = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 36px;
  font-weight: 500;
  color: var(--font-color-primary);
  background-color: white;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--color-secondary);

  button {
    padding: 0 10px;
    width: auto;
    align-self: center;
    height: 50px;
    background-color: #e9eafa;
    border-radius: 8px;
    color: var(--color-secondary);
    transition: all 0.3s;
    font-weight: 600;
    font-size: 20px;

    &:hover {
      cursor: pointer;
      background-color: var(--color-primary);
      transition: all 0.3s;
    }
  }

  @media (max-width: 510px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;
