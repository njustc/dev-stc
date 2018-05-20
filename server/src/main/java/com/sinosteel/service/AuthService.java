package com.sinosteel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sinosteel.framework.mybatis.DeleteAuthorizationMapper;
import com.sinosteel.framework.mybatis.EditAuthorizationMapper;
import com.sinosteel.framework.mybatis.QueryAuthorizationMapper;
import com.sinosteel.framework.mybatis.RoleMapper;

@Service
public class AuthService
{
	@Autowired
	private QueryAuthorizationMapper queryAuthorizationMapper;
	
	@Autowired
	private DeleteAuthorizationMapper deleteAuthorizationMapper;
	
	@Autowired
	private EditAuthorizationMapper editAuthorizationMapper;


}
