import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import Bottombar from '@/components/functional/Bottombar/Bottombar';

describe('Bottombar', () => {

  let container;

  let props = {
    value: 0,
    className: 'class',
    onChange: jest.fn(),
    list: {
      'a': {
        img: 'content',
        title: 'title',
        route: '/route',
      },
    },
  };

  beforeEach(() => {
    container = document.createElement("section");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders without props', () => {
    act(() => {
      render(<Bottombar />, container);
    });

    expect(container).toMatchSnapshot();
  });

  it('renders with props', () => {
    act(() => {
      render(<Bottombar {...props} />, container);
    });

    expect(container).toMatchSnapshot();
  });

  it('should call onChange when button is clicked', () => {
    act(() => {
      render(<Bottombar {...props} />, container);
      const button = Array.from(document.querySelectorAll("button"))[0];
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(props.onChange).toHaveBeenCalled();
  });

});
