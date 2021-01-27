import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
`;

export const Main = styled.div`
  width: auto;
  padding: 10px 20px;
`;

export const Title = styled.p`
  margin: 10px 0;
  font-size: 36px;
  font-weight: 500;
  color: var(--font-color-primary);
  background-color: white;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--color-secondary);
`;
