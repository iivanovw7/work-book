import { css, keyframes } from 'styled-components';

const keyframesFadeIn = keyframes`
  0% {
    opacity: 0;
    transform:  translate(0px,-20px);
  }
  100% {
    opacity: 1;
    transform:  translate(0px, 0px);
  }
`;

export const fadeInTop = css`
  animation: ${keyframesFadeIn} ease 0.5s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  animation-fill-mode: forwards;
`;
