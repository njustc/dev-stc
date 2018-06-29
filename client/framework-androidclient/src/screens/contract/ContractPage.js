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
    ScrollableTab,
    Textarea
} from "native-base";

import styles from "./styles";

export  default class ContractPage extends Component{
    constructor(props){
        super(props);
        this.state={
            projectName:"",
            consignA:"",
            consignB:"",
            consignPlace:"",
            consignDate:"",
            ProjectName:"",
            qualityChar:"",
            testFee:"",
            ConsignA:{
                unitName:"",
                authRepresent:"",
                signData:"",
                contact:"",
                poAddress:"",
                phone:"",
                fax:"",
                accountBank:"",
                accountNum:"",
                postCode:"",
            },
            ConsignB:{
                unitName:"",
                authRepresent:"",
                signData:"",
                contact:"",
                poAddress:"",
                phone:"",
                fax:"",
                accountBank:"",
                accountNum:"",
                postCode:"",
            },
    }
    }
  render(){
    return(
        <Container>
            <Header hasTabs>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                <Title>合同详情</Title>
                </Body>
                <Right />
            </Header>

            <Tabs renderTabBar={() => <ScrollableTab />}>
                <Tab heading="合同基本信息">
                    <Content padder style={{ marginTop: 0 }}>
                        <Card style={{ flex: 0 }}>
                            <CardItem>
                                <Body>
                                <Text>
                                    项目名称：{this.state.projectName}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                            <CardItem>
                                <Body>
                                <Text>
                                    委托方（甲方）：{this.state.consignA}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                            <CardItem>
                                <Body>
                                <Text>
                                    委托方（乙方）：{this.state.consignB}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                            <CardItem>
                                <Body>
                                <Text>
                                    签订地点：{this.state.consignPlace}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                            <CardItem>
                                <Body>
                                <Text>
                                    签订日期：{this.state.consignDate}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>

                    </Content>
                </Tab>

                <Tab heading="合同内容（一）">
                    <Content padder style={{ marginTop: 0 }}>
                        <Card style={{ flex: 0 }}>
                            <CardItem>
                                <Body>
                                <Text>
                                    本合同由作为委托方的{this.state.ConsignA.unitName}（以下简称“甲方”）
                                    与作为受托方的{this.state.ConsignB.unitName}（以下简称“乙方”）在平等自愿的基础上，
                                    依据《中华人民共和国合同法》有关规定就项目的执行， 经友好协商后订立。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>一、任务表述</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件
                                    {this.state.ProjectName}(下称受测软件)的质量特性
                                    {this.state.qualityChar}，进行测试，并出具相应的测试报告
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>二、双方的主要义务</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    1. 甲方的主要义务：{"\n"}
                                    （1）	按照合同约定支付所有费用。{"\n"}
                                    （2）	按照乙方要求以书面形式出具测试需求，包括测试子特性、测试软硬件环境等。{"\n"}
                                    （3）	提供符合交付要求的受测软件产品及相关文档，包括软件功能列表、需求分析、设计文档、用户文档至乙方。{"\n"}
                                    （4）	指派专人配合乙方测试工作，并提供必要的技术培训和技术协助。{"\n"}{"\n"}
                                    2. 乙方的主要义务：{"\n"}
                                    （1）	设计测试用例，制定和实施产品测试方案。{"\n"}
                                    （2）	在测试过程中，定期知会甲方受测软件在测试过程中出现的问题。{"\n"}
                                    （3）	按期完成甲方委托的软件测试工作。{"\n"}
                                    （4）	出具正式的测试报告。{"\n"}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>三、履约地点</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    由甲方将受测软件产品送到乙方实施测试。如果由于被测软件本身特点或其它乙方认可的原因，需要在甲方所在地进行测试时，甲方应负担乙方现场测试人员的差旅和食宿费用。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>四、合同价款</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    本合同软件测试费用为人民币{this.state.testFee}（￥   元）。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Tab>

                <Tab heading="合同内容（二）">
                    <Content padder style={{ marginTop: 0 }}>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>五、测试费用支付方式</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    本合同签定后，十个工作日内甲方合同价款至乙方帐户。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>六、履行的期限</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    1.	本次测试的履行期限为合同生效之日起 30 个自然日内完成。{"\n"}
                                    2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。{"\n"}
                                    3.	如因甲方原因，导致测试进度延迟、应由甲方负责,乙方不承担责任，若涉及赔偿责任，甲方所负担的赔偿总额不超过本合同总金额。{"\n"}
                                    4.	如因乙方原因，导致测试进度延迟，双方经协商一致后另行签订书面协议，作为本合同的补充。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>七、资料的保密</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    对于一方向另一方提供使用的秘密信息，另一方负有保密的责任，不得向任何第三方透露。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>八、 风险责任的承担</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    乙方人员在本协议有效期间（包括可能的到甲方出差）发生人身意外或罹患疾病时由乙方负责处理。
                                    甲方人员在本协议有效期间（包括可能的到乙方出差）发生人身意外或罹患疾病时由甲方负责处理。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>九、验收方法</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    由乙方向甲方提交软件产品鉴定测试报告正本一份，甲方签收鉴定测试报告后，完成验收。本合同签订知识产权归属保持不变。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>十、 争议解决</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    双方因履行本合同所发生的一切争议，应通过友好协商解决；如协商解决不成，就提交北京仲裁委员会进行仲裁。裁决对双方当事人具有同等约束力。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>十一、 其他</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    本合同自双方授权代表签字盖章之日起生效，自受托方的主要义务履行完毕之日起终止。 本合同未尽事宜由双方协商解决。 本合同的正本一式肆份，双方各执两份，具有同等法律效力。
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Tab>

                <Tab heading="签章">
                    <Content padder style={{ marginTop: 0 }}>
                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>委托方</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    单位全称：{this.state.ConsignA.unitName}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    授权代表：{this.state.ConsignA.authRepresent}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    签章日期：{this.state.ConsignA.signData}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    联系人：{this.state.ConsignA.contact}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    通讯地址：{this.state.ConsignA.poAddress}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    电话：{this.state.ConsignA.phone}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    传真：{this.state.ConsignA.fax}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    开户银行：{this.state.ConsignA.accountBank}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    账号：{this.state.ConsignA.accountNum}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    邮编：{this.state.ConsignA.postCode}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>

                        <Card style={styles.mb}>
                            <CardItem header bordered>
                                <Text>受托方</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    单位全称：{this.state.ConsignB.unitName}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    授权代表：{this.state.ConsignB.authRepresent}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    签章日期：{this.state.ConsignB.signData}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    联系人：{this.state.ConsignB.contact}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    通讯地址：{this.state.ConsignB.poAddress}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    电话：{this.state.ConsignB.phone}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    传真：{this.state.ConsignB.fax}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    开户银行：{this.state.ConsignB.accountBank}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    账号：{this.state.ConsignB.accountNum}
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                <Text>
                                    邮编：{this.state.ConsignB.postCode}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Tab>
            </Tabs>

            <Textarea rowSpan={5} bordered placeholder="请输入评审内容" />
        </Container>
    );
  }

}
