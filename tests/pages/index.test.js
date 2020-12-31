import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router';

import Index from '@/pages';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

useRouter.mockReturnValue(mockRouter);

jest.useFakeTimers();

describe('Index', () => {
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
      render(<Index />, container);
    });
    expect(container).toMatchSnapshot();
  });

});
