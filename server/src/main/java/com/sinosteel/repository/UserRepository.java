package com.sinosteel.repository;

import com.sinosteel.domain.User;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends BaseRepository<User>
{
	User findByUsername(String username);
}
