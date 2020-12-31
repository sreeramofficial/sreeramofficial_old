import { render, unmountComponentAtNode } from 'react-dom';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { Input } from '@/source/input';

describe('Index with act', () => {
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
      render(<Input />, container);
    });
    expect(container).toMatchSnapshot();
  });

});

describe('Input with enzyme', () => {
  it('Should set value to state when input is changed', () => {
    const container = shallow(<Input />);
    const input = container.find('input');
    input.simulate('change', { preventDefault: jest.fn, target: { value: "foo" } });
    expect(container).toMatchSnapshot();
  });
});
