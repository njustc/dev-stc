###空开始事件
####描述
空开始事件技术上意味着没有指定启动流程实例的触发条件。 这就是说引擎不能预计什么时候流程实例会启动。 空开始事件用于，当流程实例要通过API启动的场景， 比如通过调用startProcessInstanceByXXX方法。 
####图形标记
空开始事件显示成一个圆圈，没有内部图表（没有触发类型） 
####XML结构
空开始事件的XML结构是普通的开始事件定义，没有任何子元素 （其他开始事件类型都有一个子元素来声明自己的类型）
```
<startEvent id="start" name="my start event" />
```

###空结束事件
####描述
空结束事件意味着到达事件时不会指定抛出的结果。 这样，引擎会直接结束当前执行的分支，不会做其他事情。
####图形标记
空结束事件是一个粗边圆圈，内部没有小图表（无结果类型）
####XML内容
空结束事件的XML内容是普通结束事件定义，不包含子元素 （其他结束事件类型都会包含声明类型的子元素）
```
<endEvent id="end" name="my end event" />
```

###顺序流
####描述
顺序流是连接两个流程节点的连线。 流程执行完一个节点后，会沿着节点的所有外出顺序流继续执行。 就是说，BPMN 2.0默认的行为就是并发的： 两个外出顺序流会创造两个单独的，并发流程分支。
####图形标记
顺序流显示为从起点到终点的箭头。 箭头总是指向终点。
####XML内容
顺序流需要流程范围内唯一的id， 以及对起点与 终点元素的引用
```
<sequenceFlow id="flow1" sourceRef="theStart" targetRef="theTask" />
```

###网关
网关用来控制流程的流向（或像BPMN 2.0里描述的那样，流程的tokens。） 网关可以消费也可以生成token。
网关显示成菱形图形，内部有有一个小图标。 图标表示网关的类型。
###排他网关
####描述
排他网关（也叫异或（XOR）网关，或更技术性的叫法 基于数据的排他网关）， 用来在流程中实现决策。 当流程执行到这个网关，所有外出顺序流都会被处理一遍。 其中条件解析为true的顺序流（或者没有设置条件，概念上在顺序流上定义了一个'true'） 会被选中，让流程继续运行。
注意这里的外出顺序流 与BPMN 2.0通常的概念是不同的。通常情况下，所有条件结果为true的顺序流 都会被选中，以并行方式执行，但排他网关只会选择一条顺序流执行。 就是说，虽然多个顺序流的条件结果为true， 那么XML中的第一个顺序流（也只有这一条）会被选中，并用来继续运行流程。 如果没有选中任何顺序流，会抛出一个异常。
####图形标记
排他网关显示成一个普通网关（比如，菱形图形）， 内部是一个“X”图标，表示异或（XOR）语义。 注意，没有内部图标的网关，默认为排他网关。 BPMN 2.0规范不允许在同一个流程定义中同时使用没有X和有X的菱形图形。
####XML内容
排他网关的XML内容是很直接的：用一行定义了网关， 条件表达式定义在外出顺序流中。 参考条件顺序流 获得这些表达式的可用配置。
参考下面模型实例：
它对应的XML内容如下：
```
<exclusiveGateway id="exclusiveGw" name="Exclusive Gateway" />

<sequenceFlow id="flow2" sourceRef="exclusiveGw" targetRef="theTask1">
  <conditionExpression xsi:type="tFormalExpression">${input == 1}</conditionExpression>
</sequenceFlow>

<sequenceFlow id="flow3" sourceRef="exclusiveGw" targetRef="theTask2">
  <conditionExpression xsi:type="tFormalExpression">${input == 2}</conditionExpression>
</sequenceFlow>

<sequenceFlow id="flow4" sourceRef="exclusiveGw" targetRef="theTask3">
  <conditionExpression xsi:type="tFormalExpression">${input == 3}</conditionExpression>
</sequenceFlow>
```

###用户任务
####描述
用户任务用来设置必须由人员完成的工作。 当流程执行到用户任务，会创建一个新任务， 并把这个新任务加入到分配人或群组的任务列表中。
####图形标记
用户任务显示成一个普通任务（圆角矩形），左上角有一个小用户图标。
####XML内容
XML中的用户任务定义如下。id属性是必须的。 name属性是可选的。
```
<userTask id="theTask" name="Important task" />
```                                
用户任务也可以设置描述。实际上所有BPMN 2.0元素都可以设置描述。 添加documentation元素可以定义描述。
```
<userTask id="theTask" name="Schedule meeting" >
  <documentation>
          Schedule an engineering meeting for next week with the new hire.
  </documentation>
```
描述文本可以通过标准的java方法来获得：
```
task.getDescription()
```
####持续时间
任务可以用一个字段来描述任务的持续时间。可以使用查询API来对持续时间进行搜索， 根据在时间之前或之后进行搜索。
我们提供了一个节点扩展，在任务定义中设置一个表达式， 这样在任务创建时就可以为它设置初始持续时间。表达式应该是java.util.Date， java.util.String (ISO8601格式)，ISO8601 持续时间 (比如PT50M)或null。 例如：你可以在流程中使用上述格式输入日期，或在前一个服务任务中计算一个时间。 这里使用了持续时间，持续时间会基于当前时间进行计算，再通过给定的时间段累加。 比如，使用"PT30M"作为持续时间，任务就会从现在开始持续30分钟。
```
<userTask id="theTask" name="Important task" activiti:dueDate="${dateVariable}"/>
```
任务的持续时间也可以通过TaskService修改， 或在TaskListener中通过传入的DelegateTask参数修改。
####用户分配
用户任务可以直接分配给一个用户。 这可以通过humanPerformer元素定义。 humanPerformer定义需要一个 resourceAssignmentExpression来实际定义用户。 当前，只支持formalExpressions。
```
<process ... >

  ...

  <userTask id='theTask' name='important task' >
    <humanPerformer>
      <resourceAssignmentExpression>
        <formalExpression>kermit</formalExpression>
      </resourceAssignmentExpression>
    </humanPerformer>
  </userTask>
```
只有一个用户可以坐拥任务的执行者分配给用户。 在activiti中，用户叫做执行者。 拥有执行者的用户不会出现在其他人的任务列表中， 只能出现执行者的个人任务列表中。
直接分配给用户的任务可以通过TaskService像下面这样获取：
```
List<Task> tasks = taskService.createTaskQuery().taskAssignee("kermit").list();
```
任务也可以加入到人员的候选任务列表中。 这时，需要使用potentialOwner元素。 用法和humanPerformer元素类似。注意它需要指定表达式中的每个项目是人员还是群组 （引擎猜不出来）。
```
<process ... >

  ...

  <userTask id='theTask' name='important task' >
    <potentialOwner>
      <resourceAssignmentExpression>
        <formalExpression>user(kermit), group(management)</formalExpression>
      </resourceAssignmentExpression>
    </potentialOwner>
  </userTask>
```
使用potentialOwner元素定义的任务，可以像下面这样获取 （使用TaskQuery的发那个发与查询设置了执行者的任务类似）：
```
 List<Task> tasks = taskService.createTaskQuery().taskCandidateUser("kermit");
```
这会获取所有kermit为候选人的任务， 例如：表达式中包含user(kermit)。 这也会获得所有分配包含kermit这个成员的群组 （比如，group(management)，前提是kermit是这个组的成员， 并且使用了activiti的账号组件）。 用户所在的群组是在运行阶段获取的，它们可以通过 IdentityService进行管理。
如果没有显示指定设置的是用户还是群组， 引擎会默认当做群组处理。所以下面的设置与使用group(accountancy)效果一样。
```
<formalExpression>accountancy</formalExpression>
```
####Activiti对任务分配的扩展
当分配不复杂时，用户和组的设置非常麻烦。 为避免复杂性，可以使用用户任务的自定义扩展。
* assignee属性：这个自定义扩展可以直接把用户任务分配给指定用户。
```
    <userTask id="theTask" name="my task" activiti:assignee="kermit" />
```
它和使用上面定义的humanPerformer 效果完全一样。
* candidateUsers属性：这个自定义扩展可以为任务设置候选人。
```
    <userTask id="theTask" name="my task" activiti:candidateUsers="kermit, gonzo" />
```
它和使用上面定义的potentialOwner 效果完全一样。 注意它不需要像使用potentialOwner通过user(kermit)声明， 因为这个属性只能用于人员。
* candidateGroups属性：这个自定义扩展可以为任务设置候选组。
```
    <userTask id="theTask" name="my task" activiti:candidateGroups="management, accountancy" />
```
它和使用上面定义的potentialOwner 效果完全一样。 注意它不需要像使用potentialOwner通过group(management)声明， 因为这个属性只能用于群组。
注：
candidateUsers 和 candidateGroups 可以同时设置在同一个用户任务中。 

如果上面的方式还不满足需求，还可以使用创建事件的任务监听器 来实现自定义的分配逻辑：
```
<userTask id="task1" name="My task" >
  <extensionElements>
    <activiti:taskListener event="create" class="org.activiti.MyAssignmentHandler" />
  </extensionElements>
</userTask>
```
DelegateTask会传递给TaskListener的实现， 通过它可以设置执行人，候选人和候选组：
```
public class MyAssignmentHandler implements TaskListener {
  public void notify(DelegateTask delegateTask) {
    // Execute custom identity lookups here
    // and then for example call following methods:
    delegateTask.setAssignee("kermit");
    delegateTask.addCandidateUser("fozzie");
    delegateTask.addCandidateGroup("management");
    ...
  }
}
```
使用spring时，可以使用向上面章节中介绍的自定义分配属性， 使用表达式 把任务监听器设置为spring代理的bean， 让这个监听器监听任务的创建事件。 下面的例子中，执行者会通过调用ldapService这个spring bean的findManagerOfEmployee方法获得。 流程变量emp会作为参数传递给bean。
```
<userTask id="task" name="My Task" activiti:assignee="${ldapService.findManagerForEmployee(emp)}"/>
```
也可以用来设置候选人和候选组：
```
<userTask id="task" name="My Task" activiti:candidateUsers="${ldapService.findAllSales()}"/>
```
注意方法返回类型只能为String或Collection<String> （对应候选人和候选组）：
```
public class FakeLdapService {
  public String findManagerForEmployee(String employee) {
    return "Kermit The Frog";
  }
  public List<String> findAllSales() {
    return Arrays.asList("kermit", "gonzo", "fozzie");
  }
}
```

