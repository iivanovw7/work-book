import { css, keyframes } from 'styled-components';

const keyframesSpin = keyframes`
  0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

export const spin = css`
  animation: ${keyframesSpin} 1s ease-in-out infinite;
`;
