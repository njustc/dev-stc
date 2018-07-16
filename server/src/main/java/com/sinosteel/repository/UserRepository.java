package com.sinosteel.repository;

import com.sinosteel.domain.User;
import org.springframework.stereotype.Repository;

/**
 * 账号的仓库接口类
 */

@Repository
public interface UserRepository extends BaseRepository<User>
{
	/**
	 * 通过用户名查找对应的账号
	 * @param username 待查询的账号的用户名
	 * @return 对应的账号
	 */
	User findByUsername(String username);

	/**
	 * 通过ID查找对应的账号
	 * @param id 待查询账号的ID
	 * @return 对应的账号
	 */
	User findById(String id);
}
