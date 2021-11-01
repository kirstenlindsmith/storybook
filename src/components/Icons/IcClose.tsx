import * as React from 'react';

export default ({
  color,
  ...rest
}: { color?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='25'
    viewBox='0 0 25 25'
    {...rest}
  >
    <g fill='none' fillRule='evenodd'>
      <path d='M24 0L0 0 0 24 24 24z' transform='matrix(1 0 0 -1 1 24)' />
      <path
        fill={color || '#FFF'}
        d='M19 17.6L17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12z'
        transform='matrix(1 0 0 -1 1 24)'
      />
    </g>
  </svg>
);
