import React from 'react';

export default ({
  color,
  ...rest
}: { color?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill={color || '#333'}
        fillRule="nonzero"
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
      />
      <path d="M0 0h24v24H0z" />
    </g>
  </svg>
);
