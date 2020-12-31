import { shallow } from 'enzyme';

import Navbar from '@/components/functional/Navbar/Navbar';

describe('Navbar', () => {
  const props = {
    title: 'a',
    description: 'b',
    onTitlebarClick: jest.fn(),
    onLeftButtonClick: jest.fn(),
  };

  test('should render without props', () => {
    const component = shallow(<Navbar />);
    expect(component).toMatchSnapshot();
  });

  test('should render with props', () => {
    const component = shallow(<Navbar {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('should call onLeftButtonClicked when left button is clicked', () => {
    const component = shallow(<Navbar {...props} />);
    component.find('.Navbar__leftbutton').simulate('click');
    expect(props.onLeftButtonClick).toHaveBeenCalled();
  });

  test('should call onTitlebarClick when title bar is clicked', () => {
    const component = shallow(<Navbar {...props} />);
    component.find('.Navbar__titlebar').simulate('click');
    expect(props.onTitlebarClick).toHaveBeenCalled();
  });
});
