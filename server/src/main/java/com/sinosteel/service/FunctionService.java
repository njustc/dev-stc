package com.sinosteel.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.sinosteel.domain.Function;
import com.sinosteel.domain.Menu;
import com.sinosteel.domain.Module;
import com.sinosteel.framework.mybatis.FunctionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.sinosteel.framework.helpers.hierarchy.helper.HierarchyHelper;

import com.sinosteel.repository.FunctionRepository;
import com.sinosteel.repository.MenuRepository;
import com.sinosteel.repository.ModuleRepository;
import com.sinosteel.framework.utils.json.JsonUtil;

@Service
public class FunctionService extends BaseService<Function>
{
	@Autowired
	private FunctionRepository functionRepository;
	
	@Autowired
	private FunctionMapper functionMapper;
	
	@Autowired
	private MenuRepository menuRepository;
	
	@Autowired
	private ModuleRepository moduleRepository;
	
//	public JSONArray getAllFunctionsHierarchies()
//	{
//		List<Function> allFunctions = functionRepository.findAll();
//
//		List<Menu> leafMenus = new ArrayList<Menu>();
//		for(Function function : allFunctions)
//		{
//			Menu menu = function.getMenu();
//
//			if(!leafMenus.contains(menu))
//			{
//				leafMenus.add(menu);
//			}
//		}
//
//		List<Menu> menuHierarchies = HierarchyHelper.getHierarchiesBottomUp(leafMenus, menuRepository);
//
//		List<Module> modules = new ArrayList<Module>();
//		for(Menu menuHierarchy : menuHierarchies)
//		{
//			Module module = menuHierarchy.getModule();
//
//			if(!modules.contains(module))
//			{
//				module.setMenus(new ArrayList<Menu>());
//				module.getMenus().add(menuHierarchy);
//				modules.add(module);
//			}
//			else
//			{
//				module = modules.get(modules.indexOf(module));
//				module.getMenus().add(menuHierarchy);
//			}
//		}
//
//		return JsonUtil.toJSONArray(modules);
//	}
//
//	public JSONArray getFunctionsHierarchies(List<Function> functions)
//	{
//		//根据用户的功能查出这些功能所属的所有menu
//		List<Menu> leafMenus = new ArrayList<Menu>();
//		for(Function function : functions)
//		{
//			Menu menu = function.getMenu();
//
//			if(!leafMenus.contains(menu))
//			{
//				leafMenus.add(menu);
//			}
//		}
//
//		//找到menus所有的根节点
//		List<Menu> menuHierarchies = HierarchyHelper.getHierarchiesBottomUp(leafMenus, menuRepository);
//
//		/*
//		对所有menu根节点，找到他们所属的modules
//		 */
//		List<Module> modules = new ArrayList<Module>();
//		for(Menu menuHierarchy : menuHierarchies)
//		{
//			Module module = menuHierarchy.getModule();
//
//			if(!modules.contains(module))
//			{
//				module.setMenus(new ArrayList<Menu>());
//				module.getMenus().add(menuHierarchy);
//				modules.add(module);
//			}
//			else
//			{
//				module = modules.get(modules.indexOf(module));
//				module.getMenus().add(menuHierarchy);
//			}
//		}
//
//		JSONArray modulesJsonArray = JsonUtil.toJSONArray(modules);
//		return modulesJsonArray;
//	}


	//返回给前端的JSON数据，由AuthController的login函数调用
	public JSONArray getFunctionsHierarchies(List<Function> functions)
	{
		JSONArray functionJsonArray = JsonUtil.toJSONArray(functions);
		return functionJsonArray;
	}
	
//	public void syncStructure() throws Exception
//	{
//		File structureFile = new File("src/main/resources/structure.json");
//		InputStreamReader reader = null;
//
//		if(!structureFile.exists())
//		{
//			reader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream("structure.json"));
//		}
//		else
//		{
//			reader = new InputStreamReader(new FileInputStream(structureFile));
//		}
//
//		StringBuilder jsonStringBuilder = new StringBuilder("");
//		int readChar = 0;
//		while((readChar = reader.read()) != -1)
//		{
//			jsonStringBuilder.append((char)readChar);
//		}
//		reader.close();
//
//		String jsonString = jsonStringBuilder.toString();
//		JSONArray modulesJsonArray = JSONArray.parseArray(jsonString);
//		List<Module> modulesConfig = JsonUtil.toObjects(modulesJsonArray, Module.class);
//
//		//每次
//		functionRepository.deleteAll();
//		menuRepository.deleteAll();
//		moduleRepository.deleteAll();
//
//		syncModules(modulesConfig);
//		functionMapper.deleteNonExistentRoleFunction();
//	}

//	private void syncModules(List<Module> modulesConfig)
//	{
//		for(Module moduleConfig : modulesConfig)
//		{
//			moduleRepository.save(moduleConfig);
//
//			List<Menu> menusConfig = moduleConfig.getMenus();
//			syncMenus(menusConfig, moduleConfig);
//		}
//	}

//	private void syncMenus(List<Menu> menusConfig, Module moduleConfig)
//	{
//		for(Menu menuConfig : menusConfig)
//		{
//			if(menuConfig.getChildren() != null)
//			{
//				syncMenus(menuConfig.getChildren(), moduleConfig);
//			}
//			else
//			{
//				List<Function> functionsConfig = menuConfig.getFunctions();
//				syncFunctions(functionsConfig);
//			}
//
//			menuConfig.setModule(moduleConfig);
//			menuRepository.save(menuConfig);
//		}
//	}

//	private void syncFunctions(List<Function> functionsConfig)
//	{
//		for(Function functionConfig : functionsConfig)
//		{
//			functionRepository.saveAndFlush(functionConfig);
//		}
//	}
}
