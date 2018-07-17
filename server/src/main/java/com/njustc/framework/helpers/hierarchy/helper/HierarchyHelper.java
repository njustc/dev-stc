package com.njustc.framework.helpers.hierarchy.helper;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;
import com.njustc.framework.helpers.hierarchy.domain.Hierarchy;
import com.njustc.framework.helpers.hierarchy.domain.HierarchyRepository;
import com.njustc.framework.utils.string.StringUtil;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class HierarchyHelper
{
	public static <T extends Hierarchy<T>> List<T> getHierarchiesBottomUp(List<T> nodes, HierarchyRepository<T> hierarchyRepository)
	{
		try
		{
			boolean root = true;
			List<T> layer = new ArrayList<T>();

			//nodes是一组menus
			for(T node : nodes)
			{
				String parentId = node.getParentId();
				/*
				如果node存在父节点，则将父节点加入layer中，并将node加入parent的子节点上；将root置为false，表示node不是根节点
				如果不存在父节点，即node就是根节点，将node加入到layer中，root依然为true
				 */
				if(!StringUtil.isEmpty(parentId))
				{
					T parent = findHierarchyById(parentId, layer);
					if(parent == null)
					{
						parent = hierarchyRepository.findOne(parentId);
						layer.add(parent);
					}

					root = false;
					
					List<T> children = (List<T>) parent.getChildren();
					if(children == null)
					{
						children = new ArrayList<T>();
						parent.setChildren(children);
					}
					
					children.add(node);
				}
				else
				{
					layer.add(node);
				}
			}
			//如果root为true，则nodes中所有menus都是根节点，则返回layer；否则继续找根节点
			return root ? layer : getHierarchiesBottomUp(layer, hierarchyRepository);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			return null;
		}
	}
	
	public static <T extends Hierarchy<T>> List<T> getAllHierarchies(HierarchyRepository<T> hierarchyRepository)
	{
		return getHierarchies(hierarchyRepository, null);
	}
	
	private static <T extends Hierarchy<T>> List<T> getHierarchies(HierarchyRepository<T> hierarchyRepository, String parentId)
	{
		List<T> hierarchies = hierarchyRepository.findByParentId(parentId);
		
		for(T hierarchy : hierarchies)
		{
			List<T> children = getHierarchies(hierarchyRepository, hierarchy.getId());
			
			hierarchy.setChildren(children);
		}
		
		return hierarchies;
	}
	
	public static <T extends Hierarchy<T>> List<String> getHierarchyIds(HierarchyRepository<T> hierarchyRepository, String parentId)
	{
		List<String> hierarchyIds = new ArrayList<String>();
		hierarchyIds.add(parentId);
		
		List<T> hierarchies = hierarchyRepository.findByParentId(parentId);
		
		for(T hierarchy : hierarchies)
		{
			hierarchyIds.addAll(getHierarchyIds(hierarchyRepository, hierarchy.getId()));
		}
		
		return hierarchyIds;
	}
	
	@SuppressWarnings("unused")
	private static <T extends Hierarchy<T>> List<T> getHierarchies(List<T> allHierarchies, String parentId)
	{
		if(allHierarchies.size() == 0)
		{
			return null;
		}
		else
		{
			List<T> hierarchies = new ArrayList<T>();
			
			synchronized(allHierarchies)
			{
				Iterator<T> iter = allHierarchies.iterator();
				
				while(iter.hasNext())
				{
					T hierarchy = iter.next();
					
					if((parentId == null && parentId == hierarchy.getParentId()) || (parentId != null && parentId.equals(hierarchy.getParentId())))
					{
						iter.remove();
						
						List<T> children = getHierarchies(allHierarchies, hierarchy.getId());
						if(children != null)
						{
							hierarchy.setChildren(children);
						}
					}
				}
			}
			
			return hierarchies;
		}
	}
	
	public static <T extends Hierarchy<T>> T findHierarchyById(String id, List<T> hierarchies)
	{
		for(T hierarchy : hierarchies)
		{
			if(hierarchy.getId().equals(id))
			{
				return hierarchy;
			}
		}
		
		return null;
	}
	
	public static <T extends Hierarchy<T>> JSONArray getHierarchiesJsonArray(List<T> hierarchies)
	{
		SimplePropertyPreFilter filter = new SimplePropertyPreFilter();
		filter.getExcludes().add("parent");
		filter.getExcludes().add("children");
		
		JSONArray hierarchiesJsonArray = new JSONArray();
		for(T hierarchy : hierarchies)
		{
			JSONObject hierarchyJson = JSONObject.parseObject(JSONObject.toJSONString(hierarchy, filter));
			
			List<T> children = (List<T>) hierarchy.getChildren();
			if(children != null && children.size() != 0)
			{
				hierarchyJson.put("children", getHierarchiesJsonArray(children));
			}
			
			hierarchiesJsonArray.add(hierarchyJson);
		}
		
		return hierarchiesJsonArray;
	}
	
	public static <T extends Hierarchy<T>> void printHierarchies(List<T> hierarchies)
	{
		for(T hierarchy : hierarchies)
		{
			System.out.println(hierarchy.getName());
			
			if(hierarchy.getChildren() != null && hierarchy.getChildren().size() != 0)
			{
				printHierarchies(hierarchy.getChildren());
			}
		}
	}
}
