import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
`;

export const ParametersForm = styled.form`
  padding: 20px;
  max-width: 500px;
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  div.field {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    label {
      width: 45%;
      display: flex;

      small {
        margin-left: 5px;
        font-size: 8px;
        align-self: center;
      }
    }

    input {
      width: 55%;
      border: 1.5px solid var(--color-primary);
      border-radius: 8px;
      height: 40px;
      margin: 10px 0;
      padding: 0 10px;
      height: 50px;

      &:focus {
        border: 2px solid var(--color-primary);
      }
    }
  }

  button {
    margin: 10px 0;
    width: 150px;
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
`;

export const Title = styled.p`
  margin: 10px 0;
  font-size: 36px;
  font-weight: 500;
  color: var(--font-color-primary);
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #2c3236;
  text-align: justify;
  margin-bottom: 10px;
`;
