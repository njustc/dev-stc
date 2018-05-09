import UserTreeView from 'routes/System/subviews/UserList/components/UserTreeView';
import UserListView from 'routes/System/subviews/UserList/components/UserListView';
import OrganizationTreeView from 'routes/System/subviews/OrganizationTree/components/OrganizationTreeView';
import OrganizationListView from 'routes/System/subviews/OrganizationTree/components/OrganizationListView';

const tabsMap =
[
	{
		path: '/user_list',
		component: UserListView
	},
    {
        path: '/user_content',
        component: UserTreeView
    },
    {
        path: '/admin_list',
        component: OrganizationListView
    },
    {
    	path: '/admin_content',
    	component: OrganizationTreeView
    }
]

export default tabsMap