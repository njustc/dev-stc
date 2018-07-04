import { Dimensions } from "react-native";
const {width} = Dimensions.get('window');
export default {
  container: {
    backgroundColor: "#FFF"
  },
  mb10: {
    marginBottom: 10
  },
  intro: {
    padding:16,
    height: 400,
    width:width,
    borderBottomWidth:1,
    borderBottomColor: '#ffffff',
  },
  intro_two_left: {
    fontSize:16,
    color:'#666666',
    fontWeight:'500',
    marginRight:10,
  },
  intro_two: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ffcc33',
    marginLeft:10,
    marginRight:10,
    marginTop:20,
    borderWidth:1,
    borderRadius:4,
  },
  intro_one_right: {
    width:100,
    height:100,
    elevation:6,
    shadowRadius:6,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  intro_one_right_title: {
    fontSize:12,
    color:'#9D9D9D',
  },
  intro_one_right_score: {
    fontSize: 20,
    color: '#666666',
    fontWeight:'500',
  },
  intro_one_right_number: {
    fontSize:12,
    color:'#9D9D9D'
    ,
  },
};
