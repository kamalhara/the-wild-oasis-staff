import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f8f9fa;
  --color-grey-100: #f1f3f5;
  --color-grey-200: #e9ecef;
  --color-grey-300: #dee2e6;
  --color-grey-400: #adb5bd;
  --color-grey-500: #6c757d;
  --color-grey-600: #495057;
  --color-grey-700: #343a40;
  --color-grey-800: #212529;
  --color-grey-900: #121416;

  --color-blue-100: #dbeafe;
  --color-blue-700: #1d4ed8;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 1.6rem 3.2rem rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.08);
  

    --image-grayscale: 0;
  --image-opacity: 100%;
  }
  
  &.dark-mode {
    --color-grey-0: #161b22;
    --color-grey-50: #0d1117;
    --color-grey-100: #1c2128;
    --color-grey-200: #2d333b;
    --color-grey-300: #444c56;
    --color-grey-400: #768390;
    --color-grey-500: #8b949e;
    --color-grey-600: #c9d1d9;
    --color-grey-700: #e6edf3;
    --color-grey-800: #f0f3f6;
    --color-grey-900: #f8f9fa;

    --color-blue-100: #0c2d6b;
    --color-blue-700: #79b8ff;
    --color-green-100: #0d3320;
    --color-green-700: #7ee787;
    --color-yellow-100: #4b2e05;
    --color-yellow-700: #e3b341;
    --color-silver-100: #2d333b;
    --color-silver-700: #e6edf3;
    --color-indigo-100: #251e5c;
    --color-indigo-700: #a5b4fc;

    --color-red-100: #3d1113;
    --color-red-700: #f97583;
    --color-red-800: #da3633;

    --backdrop-color: rgba(0, 0, 0, 0.5);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.25);
    --shadow-lg: 0 1.6rem 3.2rem rgba(0, 0, 0, 0.35);
    --shadow-hover: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }
  
  /* Brand — indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;
  
  --border-radius-tiny: 4px;
  --border-radius-sm: 6px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Inter", "Poppins", system-ui, -apple-system, sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.4rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  transition: all 0.2s ease;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* Smooth scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-grey-300);
  border-radius: 100px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-grey-400);
}

`;

export default GlobalStyles;
