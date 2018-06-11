import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
import {ConsignListData} from "./Consignation"
import { ToastAndroid } from "react-native";

const consignBase = baseServiceAddress + '/consign?username=admin&clientDigest=qqq';
// const consignActivitiBase = baseServiceAddress + '/processInstance';

// export const getConsignList = () => {
//   httpGet(consignBase,(result) => {
//     const {status, data} = result;
//     if (status === STATUS.SUCCESS) {
//       var num = 0;
//       for(var i in data){
//         ConsignListData[num].route = "ConsignPage";
//         ConsignListData[num].text = i.id;
//         num++;
//       }
//
//       let toastMsg2 = 'emmmm';
//       ToastAndroid.showWithGravity(toastMsg2, 1000, ToastAndroid.CENTER);
//     }
//     // callback && callback(status);
//   });
// };

// export const getConsign = (dispatch, id, callback) => {
//   httpGet(consignBase + '/' + id, (result) => {
//     const {status, data} = result;
//     if (status === STATUS.SUCCESS) {
//       dispatch(setConsignContent(data));
//     }
//     callback && callback(status);
//   });
// };
//
// export const deleteConsign = (dispatch, id, callback) => {
//   httpDelete(consignBase, {id:id}, (result) => {
//     // console.log("before remove");
//     // dispatch(removeConsign(id));
//     const {status} = result;
//     if(status === STATUS.SUCCESS)
//       dispatch(removeConsign(id));
//     callback && callback(status);
//   });
// };
//
// export const newConsign = (dispatch, callback) => {
//   httpPost(consignBase, {consignation:null,}, (result) => {
//     const {data, status} = result;
//     if (status === STATUS.SUCCESS) {
//       dispatch(setConsignContent(data));
//     }
//     callback && callback(status);
//   });
// };
//
// export const updateConsign = (dispatch, data, callback) => {
//   //console.log(data);
//   httpPut(consignBase, data, (result) => {
//     const {status, data} = result;
//     if (status === STATUS.SUCCESS) {
//       dispatch(setConsignContent(data));
//     }
//     callback && callback(status);
//   });
// };

// export const putConsignState = (dispatch, processInstanceID, data, id, callback) => {
//   httpPut(consignActivitiBase + '/' + processInstanceID, data, (result) => {
//     const {status,data} = result;
//     if (status === STATUS.SUCCESS) {
//       const newData = {
//         ...data,
//         id: id,
//       };
//       dispatch(setConsignContent(newData));
//     }
//     callback && callback(status);
//   });
// };

// export const setConsignList = (data) => {
//   var num = 0;
//   for(var i in data){
//     datas[num].route = "ConsignPage";
//     datas[num].text = i.id;
//     num++;
//   }
//   this.props.navigation.navigate(data.route);
//   let toastMsg = 'rsndm';
//   ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
// }