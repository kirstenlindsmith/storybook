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
          d="M8.59 7.91l4.58 4.59-4.58 4.59L10 18.5l6-6-6-6z"
        />
        <path d="M24 24.5H0V.5h24z" />
      </g>
    </svg>
  );
