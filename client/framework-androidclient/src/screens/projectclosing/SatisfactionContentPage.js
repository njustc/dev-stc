import React, { Component } from "react";
import { ScrollView,View,DeviceEventEmitter } from "react-native";
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
import styles from "./styles"
import StarRating from "react-native-star-rating"


export default class SatisfactionContentPage extends Component{
  constructor(props){
    super(props);
    this.state={
      consignUnit:"",
      softwareName:"",
      contact:"",
      contactNumber:"",
      Email:"",
      mobilePhone:"",
      reflectTime:1,
      charge:2,
      standard:3.5,
      capability:4,
      understanding:4.5,
      communication:5,
      advice:"",

      satisfactionDegree:"",
      satisfactionLevel:"",
      //rate:0,
    }
  }

  componentDidMount(){
    this.listener_consignUnit = DeviceEventEmitter.addListener('consignUnit',(events)=>{
      this.setState({consignUnit : events.CONSIGN_UNIT });
    });
    this.listener_softwareName = DeviceEventEmitter.addListener('softwareName',(events)=>{
      this.setState({softwareName : events.SOFTWARE_NAME });
    });
    this.listener_contact = DeviceEventEmitter.addListener('contact',(events)=>{
      this.setState({contact : events.CONTACT });
    });

    this.listener_contactNumber = DeviceEventEmitter.addListener('contactNumber',(events)=>{
      this.setState({contactNumber : events.CONTACTNUMBER });
    });
    this.listener_Email = DeviceEventEmitter.addListener('Email',(events)=>{
      this.setState({Email: events.EMAIL });
    });
    this.listener_mobilePhone = DeviceEventEmitter.addListener('mobilePhone',(events)=>{
      this.setState({mobilePhone : events.MOBILEPHONE });
    });

    this.listener_reflectTime= DeviceEventEmitter.addListener('reflectTime',(events)=>{
      this.setState({reflectTime : events.REFLECTTIME });
    });
    this.listener_charge = DeviceEventEmitter.addListener('charge',(events)=>{
      this.setState({charge : events.CHARGE });
    });
    this.listener_standard = DeviceEventEmitter.addListener('standard',(events)=>{
      this.setState({standard : events.STANDARD });
    });

    this.listener_capability = DeviceEventEmitter.addListener('capability',(events)=>{
      this.setState({capability : events.CAPABILITY });
    });
    this.listener_understanding = DeviceEventEmitter.addListener('understanding',(events)=>{
      this.setState({understanding : events.UNDERSTANDING });
    });
    this.listener_communication = DeviceEventEmitter.addListener('communication',(events)=>{
      this.setState({communication : events.COMMUNICATION });
    });

    this.listener_advice = DeviceEventEmitter.addListener('advice',(events)=>{
      this.setState({advice : events.ADVICE });
    });
    this.listener_satisfactionDegree = DeviceEventEmitter.addListener('satisfactionDegree',(events)=>{
      this.setState({satisfactionDegree : events.SATISFACTION_DEGREE });
    });
    this.listener_satisfactionLevel = DeviceEventEmitter.addListener('satisfactionLevel',(events)=>{
      this.setState({satisfactionLevel : events.SATISFACTION_LEVEL });
    });
  }

  componentWillUnmount(){
    this.listener_consignUnit.remove();
    this.listener_softwareName.remove();
    this.listener_contact.remove();
    this.listener_contactNumber.remove();
    this.listener_Email.remove();

    this.listener_mobilePhone.remove();
    this.listener_reflectTime.remove();
    this.listener_charge.remove();
    this.listener_standard.remove();
    this.listener_capability.remove();

    this.listener_understanding.remove();
    this.listener_communication.remove();
    this.listener_advice.remove();
    this.listener_satisfactionDegree.remove();
    this.listener_satisfactionLevel.remove();

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
          <Title>满意度调查表详情</Title>
          </Body>
          <Right />
        </Header>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="客户方填写">
            <Content padder style={{ marginTop: 0 }}>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>基本信息</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    单位名称：{this.state.consignUnit}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    被测软件名称：{this.state.softwareName}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    联系人：{this.state.contact}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    联系电话：{this.state.contactNumber}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    Email：{this.state.Email}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    手机：{this.state.mobilePhone}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>其他意见和建议</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    {this.state.advice}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Tab>

          <Tab heading="客户方评分">
            <Content>
              <View style={styles.intro}>
                <View style={styles.intro_two}>
                  <Text style={styles.intro_two_left} numberOfLines={1}>测试服务响应时间</Text>
                  <StarRating
                    disabled={false}
                    rating={this.state.reflectTime}
                    maxStars={5}
                    halfStarEnabled={false}
                    emptyStar={require('./img/icon_unselect.png')}
                    halfStar={require('./img/icon_half_select.png')}
                    fullStar={require('./img/icon_selected.png')}
                    starStyle={{width: 20, height: 20}}
                    selectedStar={(rating)=>{
                      this.setState({
                       reflectTime:rating,
                      })
                    }}/>
                </View>
                <View style={styles.intro_two}>
                  <Text style={styles.intro_two_left} numberOfLines={1}>测试服务收费合理性</Text>
                  <StarRating
                    disabled={false}
                    rating={this.state.charge}
                    maxStars={5}
                    halfStarEnabled={false}
                    emptyStar={require('./img/icon_unselect.png')}
                    halfStar={require('./img/icon_half_select.png')}
                    fullStar={require('./img/icon_selected.png')}
                    starStyle={{width: 20, height: 20}}
                    selectedStar={(rating)=>{
                      this.setState({
                        charge:rating,
                      })
                    }}/>
                </View>
                <View style={styles.intro_two}>
                  <Text style={styles.intro_two_left} numberOfLines={1}>测试服务规范性</Text>
                  <StarRating
                    disabled={false}
                    rating={this.state.standard}
                    maxStars={5}
                    halfStarEnabled={false}
                    emptyStar={require('./img/icon_unselect.png')}
                    halfStar={require('./img/icon_half_select.png')}
                    fullStar={require('./img/icon_selected.png')}
                    starStyle={{width: 20, height: 20}}
                    selectedStar={(rating)=>{
                      this.setState({
                        standard:rating,
                      })
                    }}/>
                </View>
                <View style={styles.intro_two}>
                  <Text style={styles.intro_two_left} numberOfLines={1}>测试服务技术能力</Text>
                  <StarRating
                    disabled={false}
                    rating={this.state.capability}
                    maxStars={5}
                    halfStarEnabled={false}
                    emptyStar={require('./img/icon_unselect.png')}
                    halfStar={require('./img/icon_half_select.png')}
                    fullStar={require('./img/icon_selected.png')}
                    starStyle={{width: 20, height: 20}}
                    selectedStar={(rating)=>{
                      this.setState({
                        capability:rating,
                      })
                    }}/>
                </View>
                <View style={styles.intro_two}>
                  <Text style={styles.intro_two_left} numberOfLines={1}>客户需求的了解</Text>
                  <StarRating
                    disabled={false}
                    rating={this.state.understanding}
                    maxStars={5}
                    halfStarEnabled={false}
                    emptyStar={require('./img/icon_unselect.png')}
                    halfStar={require('./img/icon_half_select.png')}
                    fullStar={require('./img/icon_selected.png')}
                    starStyle={{width: 20, height: 20}}
                    selectedStar={(rating)=>{
                      this.setState({
                        understanding:rating,
                      })
                    }}/>
                </View>
                <View style={styles.intro_two}>
                  <Text style={styles.intro_two_left} numberOfLines={1}>服务时的沟通能力</Text>
                  <StarRating
                    disabled={false}
                    rating={this.state.communication}
                    maxStars={5}
                    halfStarEnabled={false}
                    emptyStar={require('./img/icon_unselect.png')}
                    halfStar={require('./img/icon_half_select.png')}
                    fullStar={require('./img/icon_selected.png')}
                    starStyle={{width: 20, height: 20}}
                    selectedStar={(rating)=>{
                      this.setState({
                        communication:rating,
                      })
                    }}/>
                </View>
              </View>
            </Content>
          </Tab>
          <Tab heading="测试中心填写">
            <Content padder style={{ marginTop: 0 }}>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>基本信息</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    单位名称：{this.state.consignUnit}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    被测软件名称：{this.state.softwareName}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>满意度计算总值</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    {this.state.satisfactionDegree}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>客户满意情况</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    {this.state.satisfactionLevel}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>满意度调查说明</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    满意度调查说明
                    1. 顾客满意度调查表须有客户签名才算有效；{"\n"}

                    2. 分值表示满意程度：90-100很满意，80-89满意，70-79较满意，50-69不满意，49以下很不满意，≥80分计入满意范畴；{"\n"}

                    3. 满意度的统计：满意度 = 获得满意的调查表总数 / 有效的调查表总数 × 100%{"\n"}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

