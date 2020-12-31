import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Content from '@/components/functional/Content/Content';

describe('Content', () => {
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
      render(<Content />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
