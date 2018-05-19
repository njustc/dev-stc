import {
    StaffConsignContentView,
    StaffConsignListView,
    UserConsignContentView,
    UserConsignListView
} from './Consign'
import {
    StaffContrastContentView,
    StaffContrastListView,
    UserContrastContentView,
    UserContrastListView
} from "./Contrast"

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
        path: '/AdminConsignList',
        component: StaffConsignListView
    },
    {
    	path: '/AdminConsignContent',
    	component: StaffConsignContentView
    },
    {
        path: '/UserContrastList',
        component: UserContrastListView
    },
    {
        path: '/UserContrastContent',
        component: UserContrastContentView
    },
    {
        path: '/AdminContrastList',
        component: StaffContrastListView
    },
    {
        path: '/AdminContrastContent',
        component: StaffContrastContentView
    }
];

export default tabsMap
