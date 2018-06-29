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

export  default class TestingWorkCheckTablePagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softwareName:"",
      versionModel:"",
      consignUnit:"",
      masterMeasuringMan:"",
      Checker:"",
      startTime:"",
      hopeFinisheTime:"",
      finishTime:""
    };
  }

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
              主测人：{this.state.masterMeasuringMan}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              检查人：{this.state.Checker}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              起始时间：{this.state.startTime}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              预计完成时间：{this.state.hopeFinisheTime}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              实际完成时间：{this.state.finishTime}
            </Text>
            </Body>
          </CardItem>
        </Card>
        </Tab>

          <Tab heading="可预见问题及注意事项">

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
                  为委托单位提供详尽的有关软件项目委托测试的相关法律法规、优惠政策、业务办理流程等事项。：{this.state.finishTime}
                </Text>

                <Text>
                  建议委托单位阅读《软件项目委托测试流程图和工作介绍》，了解申报流程。：{this.state.finishTime}
                </Text>

                <Text>
                  根据《软件项目委托测试提交材料》，指导委托单位提交申报资料。：{this.state.finishTime}
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
                  确保委托方应填内容正确、完备；纸质材料已盖公章。：{this.state.finishTime}
                </Text>

                <Text>
                  明确委托方按《软件项目委托测试提交材料》提交材料。：{this.state.finishTime}
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
                  合同及保密协议内容、数量符合要求。：{this.state.finishTime}
                </Text>

                <Text>
                  合同编号方式符合要求。：{this.state.finishTime}
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
                  实验室在收到委托单位的有关资料后，即成立测试项目小组，该项目小组的任务是消化用户提供的有关资料，对委托软件的可测状态进行评估， 若委托软件未达到可测状态，则向委托方提出改进建议，直到委托软件达到可测状态为止。 项目小组的任务包括负责编制测试方案，搭建测试环境，执行测试过程，记录测试结果，编制测试报告，提交测试报告，将有关资料归档等。 ：{this.state.finishTime}
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
                  测试方案必须经实验室质量负责人审核，技术负责人批准方能生效。：{this.state.finishTime}
                </Text>

                <Text>
                  委托测试软件介绍：简要介绍委托测试软件的功能特点、应用行业及技术特性等。：{this.state.finishTime}
                </Text>

                <Text>
                  软件功能：以委托单位提供的功能列表为依据，以表格形式列出所有功能项目，并对功能列表的各功能项目按照层次关系进行编号，以便于标识。：{this.state.finishTime}
                </Text>

                <Text>
                  资源需求：资源需求要列出人员需求和软硬件设备需求。人员需求要列出人员名单、职称及所承担的角色（项目组长或成员）； 软硬件设备需求要根据委托测试软件要求的运行环境及实验室的设备情况，列出硬件设备的名称、型号、配置、机身编号、用途，软件的名称、版本号、用途等。：{this.state.finishTime}
                </Text>

                <Text>
                  参考文档：列出编制本方案所参考的标准、规范及用户文档等的名称、作者、类型、版本/标识号。 ：{this.state.finishTime}
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
                  实验室按照委托方提供的委托测试软件运行环境搭建测试环境。：{this.state.finishTime}
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
                  测试过程主要以测试方案为依据，按照用户手册所述的操作方法运行软件，考察软件是否具有用户手册所描述的操作界面， 对功能列表的主要功能逐项进行符合性测试并作记录，对未测的次要功能或细节部分，应作出说明。：{this.state.finishTime}
                </Text>


                <Text>
                  对文档的测试：要从完整性、正确性、一致性、易理解性、易浏览性和外观质量六个方面，对用户文档进行评审。：{this.state.finishTime}
                </Text>

                 <Text>
                   对测试过程观察到的结果进行如实记录，对发现的问题整理成问题清单：{this.state.finishTime}
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
                  检查测试报告，并填写《测试报告检查表》：{this.state.finishTime}
                </Text>

                <Text>
                  测试报告的编码请参阅《程序文件》。：{this.state.finishTime}
                </Text>

                <Text>
                  报告审查：在分发报告前，应按实验室质量管理程序对报告进行严格审查。 ：{this.state.finishTime}
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
                  委托测试的软件产品及测试相关文件、原始记录等能够随时复现测试过程所需的材料，也同测试报告一并交由实验室资料室的材料管理员归档， 以作为日后对测试结果产生异议时进行复核或仲裁的依据。上述材料由实验室保存三年后，实验室根据委托申请时要求进行处理。：{this.state.finishTime}
                </Text>

                <Text>
                  该检查表与本次委托测试归档资料一同归档。：{this.state.finishTime}
                </Text>

                <Text>
                  确保归档资料方便查找取阅。 ：{this.state.finishTime}
                </Text>

                </Body>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem>
                <Body>
                <Text>
                  实际完成时间：{this.state.finishTime}
                </Text>
                </Body>
              </CardItem>
            </Card>



          </Tab>

        </Tabs>
      </Container>
    );
  }
}
