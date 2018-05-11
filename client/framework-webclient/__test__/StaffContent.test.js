import React from 'react';
import { shallow} from 'enzyme';
import Staff from '../src/routes/Consign/components/StaffConsignContentView';

describe('StaffContent Title', function () {
  it('StaffContent\'s title should be EnjoyCoding', function () {
    let staff = shallow(<Staff/>);
    expect(staff.find('h1').text()).toEqual('Enjoy Coding!');
  });
});