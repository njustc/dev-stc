package com.sinosteel.domain;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "TBL_STANDARD")
public class Standard extends BaseEntity
{
	private static final long serialVersionUID = -7239923911792108248L;

	@Column(name = "ISSUE_DATE")
	private String issueDate;
	
	@Column(name = "SUMMARY")
	private String summary;
	
	@Column(name = "STATUS")
	private String status; //1:在执行   0:废止
	
	@Column(name = "TYPE")
	private String type; //0:强制  1:行业  2:推荐


	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}
}
