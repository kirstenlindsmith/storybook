import React from 'react';

export default ({
  color,
  ...rest
}: { color?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg
    {...rest}
    id='loading-svg'
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
  >
    <g fill='none' fillRule='evenodd'>
      <path
        fill={color || '#FFF'}
        fillRule='nonzero'
        d='M12 20v3l-4-4 4-4v3c3.31 0 6-2.69 6-6 0-1.01-.25-1.97-.7-2.8l1.46-1.46A7.93 7.93 0 0 1 20 12c0 4.42-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6 0 1.01.25 1.97.7 2.8l-1.46 1.46A7.93 7.93 0 0 1 4 12c0-4.42 3.58-8 8-8V1l4 4-4 4V6z'
      />
      <path d='M0 24h24V0H0z' />
    </g>
  </svg>
);
