import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Markdown from '@/components/functional/Markdown/Markdown';

describe('Markdown', () => {
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
      render(<Markdown />, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render a', () => {
    act(() => {
      render(<Markdown>
        {"[#](#)"}
      </Markdown>, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render h1', () => {
    act(() => {
      render(<Markdown>
        {"# h1"}
      </Markdown>, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render h2', () => {
    act(() => {
      render(<Markdown>
        {"## h2"}
      </Markdown>, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render h3', () => {
    act(() => {
      render(<Markdown>
        {"### h3"}
      </Markdown>, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render h4', () => {
    act(() => {
      render(<Markdown>
        {"#### h4"}
      </Markdown>, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render p', () => {
    act(() => {
      render(<Markdown>
        {"p"}
      </Markdown>, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render span', () => {
    act(() => {
      render(<Markdown>
        {"<span>span</span>"}
      </Markdown>, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render li', () => {
    act(() => {
      render(<Markdown>
        {" - li"}
      </Markdown>, container);
    });
    expect(container).toMatchSnapshot();
  });
});
