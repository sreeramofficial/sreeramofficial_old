import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Splash from '@/components/functional/Splash/Splash';

jest.useFakeTimers();

describe('Splash', () => {
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

  it("renders without props", () => {
    act(() => {
      render(<Splash />, container)
    });
    expect(container).toMatchSnapshot();
  });

  it("renders with props", () => {
    const props = {
      duration: 1000,
      onLoad: jest.fn(),
    }
    act(() => {
      render(<Splash {...props} />, container)
    });
    expect(container).toMatchSnapshot();
  });

  it("calls onLoad after 1 second", () => {
    const props = {
      duration: 1000,
      onLoad: jest.fn(),
    };

    act(() => {
      render(<Splash {...props} />, container);
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(props.onLoad).not.toHaveBeenCalled();

    act(() => {
      render(null, container);
    });

    act(() => {
      render(<Splash {...props} />, container);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(props.onLoad).toHaveBeenCalled();
  });
});
