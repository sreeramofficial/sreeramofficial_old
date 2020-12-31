import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import SidebarContent from '@/components/functional/SidebarContent/SidebarContent';

describe('SidebarContent', () => {
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
      render(<SidebarContent />, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render with props', () => {
    const props = {
      links: [{
        title: 'title',
        route: '/route',
      }],
    };

    act(() => {
      render(<SidebarContent {...props} />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
