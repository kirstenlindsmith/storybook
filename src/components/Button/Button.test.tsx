import React from 'react';
import { render, cleanup, queryByAttribute } from '@testing-library/react';

import Button from './Button';

const getById = queryByAttribute.bind(null, 'id');

afterEach(cleanup);

describe('<Button />', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Button>Default Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders child text', () => {
    const { getByText } = render(<Button>Child Text</Button>);
    expect(getByText('Child Text')).not.toBeNull();
  });
  it('renders loading icon if loading true', () => {
    const { container } = render(<Button loading={true}>Loading</Button>);
    expect(getById(container, 'loading-svg')).not.toBeNull();
    expect(getById(container, 'success-svg')).toBeNull();
    expect(getById(container, 'warning-svg')).toBeNull();
  });
  it('renders warning icon if error true', () => {
    const { container } = render(<Button error={true}>Error</Button>);
    expect(getById(container, 'loading-svg')).toBeNull();
    expect(getById(container, 'success-svg')).toBeNull();
    expect(getById(container, 'warning-svg')).not.toBeNull();
  });
  it('renders success icon if success true', () => {
    const { container } = render(<Button success={true}>Success</Button>);
    expect(getById(container, 'loading-svg')).toBeNull();
    expect(getById(container, 'success-svg')).not.toBeNull();
    expect(getById(container, 'warning-svg')).toBeNull();
  });
});
