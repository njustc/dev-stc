import {
    StaffConsignContentView,
    StaffConsignListView,
    UserConsignContentView,
    UserConsignListView
} from "ROUTES/Consign";

const tabsMap =
[
	{
		path: '/user_list',
		component: UserConsignListView
	},
    {
        path: '/user_content',
        component: UserConsignContentView
    },
    {
        path: '/admin_list',
        component: StaffConsignListView
    },
    {
    	path: '/admin_content',
    	component: StaffConsignContentView
    }
]

export default tabsMap
