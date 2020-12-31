import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router';

import Layout from '@/components/functional/Layout/Layout';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockRouter = {
  push: jest.fn(),
};

useRouter.mockReturnValue(mockRouter);

describe('Layout', () => {
  let container;
  const sections = [{
    title: 'title',
    route: '/route',
    content: 'content',
  }];

  let props = {
    sections,
    bottomBarProps: {
      list: sections,
    },
  };

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
      render(<Layout />, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should redirect to home when titlebar is clicked', () => {
    act(() => {
      render(<Layout />, container);
      const titlebar = document.querySelector(".Navbar__titlebar");
      // titleBar.dispatchEvent(new MouseEvent("click"), { bubbles: true });
      titlebar.click();
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('Should call onBottomNavItemChange when button in the bottom nav is clicked', () => {
    act(() => {
      render(<Layout {...props} />, container);
      const button = Array.from(document.querySelectorAll(".MuiBottomNavigationAction-root"))[0];
      button.click();
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/route');
  });

  it('Should open sidebar when left button in navbar is clicked', () => {
    act(() => {
      render(<Layout />, container);
      const button = document.querySelector(".Navbar__leftbutton");
      button.click();
    });
    expect(container).toMatchSnapshot();
  });

  it('Should close sidebar when clicked outside sidebar', () => {
    act(() => {
      render(<Layout />, container);
      const button = document.querySelector(".Navbar__leftbutton");
      button.click();
    });
    act(() => {
      document.querySelector('.MuiBackdrop-root').click();
    });
    expect(container).toMatchSnapshot();
  });

});
