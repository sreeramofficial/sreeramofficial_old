import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import Blinkingcursor from '@/components/functional/Blinkingcursor/Blinkingcursor';

describe('Blinkingcursor', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("section");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should render without props', () => {
    act(() => {
      render(<Blinkingcursor />, container);
    });
    expect(container).toMatchSnapshot();
  });

});
