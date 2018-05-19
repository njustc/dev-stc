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
        path: '/StaffConsignList',
        component: StaffConsignListView
    },
    {
    	path: '/StaffConsignContent',
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
        path: '/StaffContrastList',
        component: StaffContrastListView
    },
    {
        path: '/StaffContrastContent',
        component: StaffContrastContentView
    }
];

export default tabsMap
