import React from 'react';

export default ({
  color,
  ...rest
}: { color?: string } & React.SVGProps<SVGSVGElement>) => (
    <svg
      {...rest}
      id="success-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          fill={color || '#FFF'}
          fillRule="nonzero"
          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        />
      </g>
    </svg>
  );
