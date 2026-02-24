import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  margin: 4.8rem auto;

  width: 4.8rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid var(--color-grey-200);
  border-top-color: var(--color-brand-600);
  animation: ${rotate} 0.8s infinite linear;
`;

export default Spinner;
