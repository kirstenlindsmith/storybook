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
        <path d="M0 0h24v24H0z" />
        <path
          fill={color || '#B1B1B1'}
          d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z"
        />
        <path fill={color || '#B1B1B1'} d="M13 9h-2V7h2zM13 17h-2v-6h2z" />
      </g>
    </svg>
  );
