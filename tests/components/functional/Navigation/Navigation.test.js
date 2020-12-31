import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Navigation from '@/components/functional/Navigation/Navigation';

describe('Navigation', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('section');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Should render without props', () => {
    act(() => {
      render(<Navigation />, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render with props', () => {
    act(() => {
      const props = {
        next: {
          title: 'title',
          route: '/route',
        },
        prev: {
          title: 'title',
          route: '/route',
        },
      };
      render(<Navigation {...props} />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
