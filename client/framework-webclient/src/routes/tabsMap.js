import {
    StaffConsignContentView,
    StaffConsignListView,
    UserConsignContentView,
    UserConsignListView
} from './Consign'

const tabsMap =
[
	{
		path: '/UserConsignList',
		component: UserConsignListView
	},
    {
        path: '/UserConsignContent',
        component: UserConsignContentView
    },
    {
        path: '/StaffConsignList',
        component: StaffConsignListView
    },
    {
    	path: '/StaffConsignContent',
    	component: StaffConsignContentView
    }
];

export default tabsMap
