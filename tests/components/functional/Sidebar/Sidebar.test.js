import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Sidebar from '@/components/functional/Sidebar/Sidebar';

describe('Sidebar', () => {
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
      render(<Sidebar />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
