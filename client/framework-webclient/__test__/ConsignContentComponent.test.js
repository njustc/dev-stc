import React from 'react';
import { shallow } from 'enzyme';
import Content from '../src/routes/Consign/components/ConsignContentComponent';

const setup = () => {
    const props = {
        values : jest.fn(),
        consignData : jest.fn(),
        disable: jest.fn(),
        buttons: jest.fn(),
        form: jest.fn()
    }
    const wrapper = shallow(<Content {...props} />)
    return {
        props,
        wrapper
    }
}


describe('ConsignContentComponent', () => {
    const { wrapper, props } = setup();
    it('ConsignContentComponent Form should render', () =>  {
        expect(wrapper.find('Form').exists())
    });

});