import UserConsignContentView from 'routes/Consign/components/UserConsignContentView';
import UserConsignListView from 'routes/Consign/components/UserConsignListView';
import StaffConsignContentView from 'routes/Consign/components/StaffConsignContentView';
import StaffConsignListView from 'routes/Consign/components/StaffConsignListView';

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
