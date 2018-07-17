package com.njustc.domain;

import javax.persistence.*;


/**
 * 这个类是用来权限管理
 */
@Entity
@Table(name = "TBL_SYS_FUNCTIONS")
public class Function extends BaseEntity
{

//	@Column(name = "FUNCTION_PATH")
//	@JSONField(serialize = false)
//	private String functionPath;
//
//	@Column(name = "FUNCTION_STRING")
//	private String functionString;
//
//	@Column(name = "FUNCTION_CODE")
//	private String functionCode;

	/**
	 * 权限类型
	 */
	@Column(name = "FUNCTION_TYPE")
	@Enumerated(EnumType.STRING)
	private FunctionType functionType;

	public FunctionType getFunctionType(){
		return functionType;
	}

	public void setFunctionType(FunctionType functionType){
		this.functionType = functionType;
	}

	/**
	 * 权限对应文档
	 */
	@Column(name = "FUNCTION_OBJECT")
	private String object;

	public String getObject(){
		return object;
	}

	public void setObject(String object){
		this.object = object;
	}



//	@ManyToOne
//	@JoinColumn(name = "MENU_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
//	@JSONField(serialize = false)
//	private Menu menu;
//
//	public Menu getMenu() {
//		return menu;
//	}
//
//	public void setMenu(Menu menu) {
//		this.menu = menu;
//	}
//
//	public String getFunctionPath() {
//		return functionPath;
//	}
//
//	public void setFunctionPath(String functionPath) {
//		this.functionPath = functionPath;
//	}
//
//	public String getFunctionString() {
//		return functionString;
//	}
//
//	public void setFunctionString(String functionString) {
//		this.functionString = functionString;
//	}
//
//	public String getFunctionCode() {
//		return functionCode;
//	}
//
//	public void setFunctionCode(String functionCode) {
//		this.functionCode = functionCode;
//	}
}
