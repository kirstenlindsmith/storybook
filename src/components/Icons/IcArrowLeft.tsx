import React from 'react';

export default ({
  color,
  ...rest
}: { color?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill={color || '#333'}
        fillRule="nonzero"
        d="M15.41 17.09l-4.58-4.59 4.58-4.59L14 6.5l-6 6 6 6z"
      />
      <path d="M0 .5h24v24H0z" />
    </g>
  </svg>
);
