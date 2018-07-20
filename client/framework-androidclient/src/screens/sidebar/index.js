import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";
import { SIDEBAR_DISABLE } from "../../common";
// import { getConsignList } from "../consign/ConsignService";

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo-kitchen-sink.png");

/**
 * 侧边栏具体内容
 * @const
 */
const datas = [
  {
    name: "委托",
    route: "Consign",
    icon: "person",
    bg: "#C5F442",
    disable:SIDEBAR_DISABLE.CONSIGN,
    // setfunction: setConsignList,
  },
  {
    name: "合同",
    route: "Contract",
    icon: "chatbubbles",
    bg: "#C5F442",
    disable:SIDEBAR_DISABLE.CONTRACT,
  },
  {
    name: "测试",
    route: "Testing",
    icon: "paper",
    bg: "#C5F442",
    disable:SIDEBAR_DISABLE.TESTING,
  },
  {
    name: "报告",
    route: "Report",
    icon: "clipboard",
    bg: "#C5F442",
    disable:SIDEBAR_DISABLE.REPORT,
  },
  {
    name: "结项",
    route: "ProjectClosing",
    icon: "happy",
    bg: "#C5F442",
    disable:SIDEBAR_DISABLE.PROJECTCLOSING,
  }

];

// export const setConsignList = (data) => {
//   getConsignList();
//   this.props.navigation.navigate(data.route);
// }

/**
 * 侧边栏
 */
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  // setConsignList = (data) => {
  //   getConsignList();
  //   this.props.navigation.navigate(data.route);
  // }

  /**
   * 侧边栏渲染函数
   * @return {*}
   * @func
   */
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List
            dataArray={datas}
            renderRow={data =>
              !data.disable?
              <ListItem
                button
                noBorder
                disabled={data.disable}
                // onPress={()=> setConsignList(data)}
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem> :null
            }
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
