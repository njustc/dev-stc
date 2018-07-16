package com.sinosteel.framework.utils.list;

import java.util.ArrayList;
import java.util.List;

public class ListUtil
{
	//判断contents中是否包含content
	public static boolean contains(List<String> contents, String content)
	{
		for(int i = 0; i < contents.size(); i++)
		{
			if(contents.get(i).equals(content))
			{
				return true;
			}
		}
		
		return false;
	}
	
	public static boolean contains(List<Object> contents, Object content)
	{
		for(int i = 0; i < contents.size(); i++)
		{
			if(contents.get(i).equals(content))
			{
				return true;
			}
		}
		
		return false;
	}
	

	public static List<String> getDifference(List<String> list1, List<String> list2)
	{
		List<String> difference = new ArrayList<String>();
		
		for(String content : list1)
		{
			if(!contains(list2, content))
			{
				difference.add(content);
			}
		}
		
		return difference;
	}
}
