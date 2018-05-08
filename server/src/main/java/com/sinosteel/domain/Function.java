package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

@Entity
@Table(name = "TBL_SYS_FUNCTION")
public class Function extends BaseEntity
{
	private static final long serialVersionUID = -5461914450646641917L;
	
	@Column(name = "FUNCTION_PATH")
	@JSONField(serialize = false)
	private String functionPath;
	
	@Column(name = "FUNCTION_STRING")
	private String functionString;

	@Column(name = "FUNCTION_CODE")
	private String functionCode;
	
	@ManyToOne
	@JoinColumn(name = "MENU_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	@JSONField(serialize = false)
	private Menu menu;

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public String getFunctionPath() {
		return functionPath;
	}

	public void setFunctionPath(String functionPath) {
		this.functionPath = functionPath;
	}

	public String getFunctionString() {
		return functionString;
	}

	public void setFunctionString(String functionString) {
		this.functionString = functionString;
	}

	public String getFunctionCode() {
		return functionCode;
	}

	public void setFunctionCode(String functionCode) {
		this.functionCode = functionCode;
	}
}
