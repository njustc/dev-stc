import React, { Component } from "react";
import { View,DeviceEventEmitter } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Item,
  Input,
  Content,
  Text,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Accordion,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Tabs,
  Tab,
  ScrollableTab
} from "native-base";

import styles from "./styles";

/**
 * TestingWorkCheckTablePagePage 实现类
 */
class TestingWorkCheckTablePagePage extends Component {
    /**
     * constructor
     * 其中有变量的初始值及定义
     * @param props
     */
  constructor(props) {
    super(props);
    this.state = {
      softwareName:"",
      versionModel:"",
      consignUnit:"",
      masterTestPerson:"",
      checker:"",
      startingDate:"",
      estimatedFinishTime:"",
      actualFinishTime:"",

      item1:"",
      item2:"",
      item3:"",
      item4:"",
      item5:"",
      item6:"",
      item7:"",
      item8:"",
      item9:"",
      item10:"",
      item11:"",
      item12:"",
      item13:"",
      item14:"",
      item15:"",
      item16:"",
      item17:"",
      item18:"",
      item19:"",
      item20:"",
      item21:"",
      item22:"",
      item23:"",
      item24:"",

    };
  }

  componentDidMount(){
    this.listener_softwareName = DeviceEventEmitter.addListener('softwareName',(events)=>{
      this.setState({softwareName : events.SOFTWARE_NAME });
    });
    this.listener_versionModel = DeviceEventEmitter.addListener('versionModel',(events)=>{
      this.setState({versionModel : events.VERSION_MODEL });
    });
    this.listener_consignUnit = DeviceEventEmitter.addListener('consignUnit',(events)=>{
      this.setState({consignUnit : events.CONSIGN_UNIT });
    });
    this.listener_masterTestPerson = DeviceEventEmitter.addListener('masterTestPerson',(events)=>{
      this.setState({masterTestPerson : events.MASTER_TEST_PERSON });
    });
    this.listener_checker = DeviceEventEmitter.addListener('checker',(events)=>{
      this.setState({checker : events.CHECKER });
    });
    this.listener_startingDate = DeviceEventEmitter.addListener('startingDate',(events)=>{
      this.setState({startingDate : events.START_TIME });
    });
    this.listener_estimatedFinishTime = DeviceEventEmitter.addListener('estimatedFinishTime',(events)=>{
      this.setState({estimatedFinishTime : events.ESTIMATED_FINISH_TIME });
    });
    this.listener_actualFinishTime = DeviceEventEmitter.addListener('actualFinishTime',(events)=>{
      this.setState({actualFinishTime : events.ACTUAL_FINISH_TIME });
    });

    this.listener_item1 = DeviceEventEmitter.addListener('item1',(events)=>{
      this.setState({item1 : events.ITEM1 });
    });
    this.listener_item2 = DeviceEventEmitter.addListener('item2',(events)=>{
      this.setState({item2 : events.ITEM2 });
    });
    this.listener_item3 = DeviceEventEmitter.addListener('item3',(events)=>{
      this.setState({item3 : events.ITEM3 });
    });
    this.listener_item4 = DeviceEventEmitter.addListener('item4',(events)=>{
      this.setState({item4 : events.ITEM4 });
    });
    this.listener_item5 = DeviceEventEmitter.addListener('item5',(events)=>{
      this.setState({item5 : events.ITEM5 });
    });
    this.listener_item6 = DeviceEventEmitter.addListener('item6',(events)=>{
      this.setState({item6 : events.ITEM6 });
    });

    this.listener_item7 = DeviceEventEmitter.addListener('item7',(events)=>{
      this.setState({item7 : events.ITEM7 });
    });
    this.listener_item8 = DeviceEventEmitter.addListener('item8',(events)=>{
      this.setState({item8 : events.ITEM8 });
    });
    this.listener_item9 = DeviceEventEmitter.addListener('item9',(events)=>{
      this.setState({item9 : events.ITEM9 });
    });
    this.listener_item10 = DeviceEventEmitter.addListener('item10',(events)=>{
      this.setState({item10 : events.ITEM10 });
    });
    this.listener_item11 = DeviceEventEmitter.addListener('item11',(events)=>{
      this.setState({item11 : events.ITEM11 });
    });
    this.listener_item12 = DeviceEventEmitter.addListener('item12',(events)=>{
      this.setState({item12 : events.ITEM12 });
    });

    this.listener_item13 = DeviceEventEmitter.addListener('item13',(events)=>{
      this.setState({item13 : events.ITEM13 });
    });
    this.listener_item14 = DeviceEventEmitter.addListener('item14',(events)=>{
      this.setState({item14 : events.ITEM14 });
    });
    this.listener_item15 = DeviceEventEmitter.addListener('item15',(events)=>{
      this.setState({item15 : events.ITEM15 });
    });
    this.listener_item16 = DeviceEventEmitter.addListener('item16',(events)=>{
      this.setState({item16 : events.ITEM16 });
    });
    this.listener_item17 = DeviceEventEmitter.addListener('item17',(events)=>{
      this.setState({item17 : events.ITEM17 });
    });
    this.listener_item18 = DeviceEventEmitter.addListener('item18',(events)=>{
      this.setState({item18 : events.ITEM18 });
    });

    this.listener_item19 = DeviceEventEmitter.addListener('item19',(events)=>{
      this.setState({item19 : events.ITEM19 });
    });
    this.listener_item20 = DeviceEventEmitter.addListener('item20',(events)=>{
      this.setState({item20 : events.ITEM20 });
    });
    this.listener_item21 = DeviceEventEmitter.addListener('item21',(events)=>{
      this.setState({item21 : events.ITEM21 });
    });
    this.listener_item22 = DeviceEventEmitter.addListener('item22',(events)=>{
      this.setState({item22 : events.ITEM22 });
    });
    this.listener_item23 = DeviceEventEmitter.addListener('item23',(events)=>{
      this.setState({item23 : events.ITEM23 });
    });
    this.listener_item24 = DeviceEventEmitter.addListener('item24',(events)=>{
      this.setState({item24 : events.ITEM24 });
    });

  }

  componentWillUnmount(){
    this.listener_softwareName.remove();
    this.listener_versionModel.remove();
    this.listener_consignUnit.remove();
    this.listener_masterTestPerson.remove();
    this.listener_checker.remove();
    this.listener_startingDate.remove();
    this.listener_estimatedFinishTime.remove();
    this.listener_actualFinishTime.remove();

    this.listener_item1.remove();
    this.listener_item2.remove();
    this.listener_item3.remove();
    this.listener_item4.remove();
    this.listener_item5.remove();
    this.listener_item6.remove();

    this.listener_item7.remove();
    this.listener_item8.remove();
    this.listener_item9.remove();
    this.listener_item10.remove();
    this.listener_item11.remove();
    this.listener_item12.remove();

    this.listener_item13.remove();
    this.listener_item14.remove();
    this.listener_item15.remove();
    this.listener_item16.remove();
    this.listener_item17.remove();
    this.listener_item18.remove();

    this.listener_item19.remove();
    this.listener_item20.remove();
    this.listener_item21.remove();
    this.listener_item22.remove();
    this.listener_item23.remove();
    this.listener_item24.remove();
  }

    /**
     * 移动端显示html代码
     * @returns {*}
     */
  render(){
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>测试工作检查表详情</Title>
          </Body>
          <Right />
        </Header>

        <Tabs renderTabBar={() => <ScrollableTab />}>

        <Tab heading="检查实现">
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              软件名称：{this.state.softwareName}
            </Text>
            </Body>
          </CardItem>
        </Card>


        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              版本号：{this.state.versionModel}
            </Text>
            </Body>
          </CardItem>
        </Card>


        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              委托单位：{this.state.consignUnit}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              主测人：{this.state.masterTestPerson}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              检查人：{this.state.checker}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              起始时间：{this.state.startingDate}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              预计完成时间：{this.state.estimatedFinishTime}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              实际完成时间：{this.state.actualFinishTime}
            </Text>
            </Body>
          </CardItem>
        </Card>
        </Tab>

          <Tab heading="可预见问题及注意事项">
            <Content padder style={{ marginTop: 0 }}>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>
                <Text>
                  一、前期指导工作
                </Text>

                <Text>
                  1. 接受委托单位委托测试申请
                </Text>

                <Text>
                  为委托单位提供详尽的有关软件项目委托测试的相关法律法规、优惠政策、业务办理流程等事项。：{this.state.item1}
                </Text>

                <Text>
                  建议委托单位阅读《软件项目委托测试流程图和工作介绍》，了解申报流程。：{this.state.item2}
                </Text>

                <Text>
                  根据《软件项目委托测试提交材料》，指导委托单位提交申报资料。：{this.state.item3}
                </Text>

                </Body>
              </CardItem>
            </Card>


            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>

                <Text>
                  2. 填写《软件项目委托测试申请表》、《委托测试软件功能列表》，按《软件项目委托测试提交材料》提交材料
                </Text>

                <Text>
                  确保委托方应填内容正确、完备；纸质材料已盖公章。：{this.state.item4}
                </Text>

                <Text>
                  明确委托方按《软件项目委托测试提交材料》提交材料。：{this.state.item5}
                </Text>

                </Body>
              </CardItem>
            </Card>




            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>

                <Text>
                  3. 签订《软件项目委托测试合同》、《软件项目委托测试保密协议》
                </Text>

                <Text>
                  合同及保密协议内容、数量符合要求。：{this.state.item6}
                </Text>

                <Text>
                  合同编号方式符合要求。：{this.state.item7}
                </Text>

                </Body>
              </CardItem>
            </Card>


            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>

                <Text>
                  二、对委托测试软件的可测状态进行评估
                </Text>

                <Text>
                  4. 接受委托单位委托测试申请
                </Text>

                <Text>
                  实验室在收到委托单位的有关资料后，即成立测试项目小组，该项目小组的任务是消化用户提供的有关资料，对委托软件的可测状态进行评估， 若委托软件未达到可测状态，则向委托方提出改进建议，直到委托软件达到可测状态为止。 项目小组的任务包括负责编制测试方案，搭建测试环境，执行测试过程，记录测试结果，编制测试报告，提交测试报告，将有关资料归档等。 ：{this.state.item8}
                </Text>

                </Body>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>

                <Text>
                  三、实施测试
                </Text>

                <Text>
                  5. 编制测试方案
                </Text>

                <Text>
                  测试方案必须经实验室质量负责人审核，技术负责人批准方能生效。：{this.state.item9}
                </Text>

                <Text>
                  委托测试软件介绍：简要介绍委托测试软件的功能特点、应用行业及技术特性等。：{this.state.item10}
                </Text>

                <Text>
                  软件功能：以委托单位提供的功能列表为依据，以表格形式列出所有功能项目，并对功能列表的各功能项目按照层次关系进行编号，以便于标识。：{this.state.item11}
                </Text>

                <Text>
                  资源需求：资源需求要列出人员需求和软硬件设备需求。人员需求要列出人员名单、职称及所承担的角色（项目组长或成员）； 软硬件设备需求要根据委托测试软件要求的运行环境及实验室的设备情况，列出硬件设备的名称、型号、配置、机身编号、用途，软件的名称、版本号、用途等。：{this.state.item12}
                </Text>

                <Text>
                  参考文档：列出编制本方案所参考的标准、规范及用户文档等的名称、作者、类型、版本/标识号。 ：{this.state.item13}
                </Text>

                </Body>
              </CardItem>
            </Card>


            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>

                <Text>
                  6. 搭建测试环境
                </Text>


                <Text>
                  实验室按照委托方提供的委托测试软件运行环境搭建测试环境。：{this.state.item14}
                </Text>

                </Body>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>

                <Text>
                  7. 实施测试
                </Text>

                <Text>
                  测试过程主要以测试方案为依据，按照用户手册所述的操作方法运行软件，考察软件是否具有用户手册所描述的操作界面， 对功能列表的主要功能逐项进行符合性测试并作记录，对未测的次要功能或细节部分，应作出说明。：{this.state.item15}
                </Text>


                <Text>
                  对文档的测试：要从完整性、正确性、一致性、易理解性、易浏览性和外观质量六个方面，对用户文档进行评审。：{this.state.item16}
                </Text>

                 <Text>
                   对测试过程观察到的结果进行如实记录，对发现的问题整理成问题清单：{this.state.item17}
                 </Text>

                </Body>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>

                <Text>
                  8. 编制测试报告
                </Text>

                <Text>
                  根据《软件项目委托测试报告编制作业指导书》和测试结果编制测试报告。
                </Text>

                <Text>
                  检查测试报告，并填写《测试报告检查表》：{this.state.item18}
                </Text>

                <Text>
                  测试报告的编码请参阅《程序文件》。：{this.state.item19}
                </Text>

                <Text>
                  报告审查：在分发报告前，应按实验室质量管理程序对报告进行严格审查。 ：{this.state.item20}
                </Text>

                </Body>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>

                <Text>
                  9. 评测资料归档
                </Text>


                <Text>
                  委托测试的软件产品及测试相关文件、原始记录等能够随时复现测试过程所需的材料，也同测试报告一并交由实验室资料室的材料管理员归档， 以作为日后对测试结果产生异议时进行复核或仲裁的依据。上述材料由实验室保存三年后，实验室根据委托申请时要求进行处理。：{this.state.item21}
                </Text>

                <Text>
                  该检查表与本次委托测试归档资料一同归档。：{this.state.item22}
                </Text>

                <Text>
                  确保归档资料方便查找取阅。 ：{this.state.item23}
                </Text>

                </Body>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>
                <Text>
                  实际完成时间：{this.state.item24}
                </Text>
                </Body>
              </CardItem>
            </Card>

            </Content>


          </Tab>

        </Tabs>
      </Container>
    );
  }
}
export  default TestingWorkCheckTablePagePage;
