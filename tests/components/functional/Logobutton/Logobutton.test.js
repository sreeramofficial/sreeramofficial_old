import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Logobutton from '@/components/functional/Logobutton/Logobutton';

describe('Logobutton', () => {
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
      render(<Logobutton />, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render inverted logo', () => {
    act(() => {
      render(<Logobutton invert />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
