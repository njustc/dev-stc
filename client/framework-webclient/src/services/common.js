
export const baseAddress = 'http://localhost:8000';
export const baseServiceAddress = baseAddress + '/services';

/**
 * @module services/common
 */

export const STATUS = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};

/**
 * TobeWrite 待编写
 * TobeSubmit 待提交
 * TobeReview 待评审
 * TobeConfirm 待确认
 * Canceled 已取消
 * FINISHED 已完成
 * TO_IMPLEMENT 待实施
 * TO_APPROVE 待批准
 * TO_SEND 待发放
 * SATISFACTION 已完成
 */
export const STATE = {
    TO_WRITE: 'TobeWrite',
    TO_SUBMIT: 'TobeSubmit',    //待提交
    TO_REVIEW: 'TobeReview',    //待评审
    TO_CONFIRM: 'TobeConfirm',  //待确认
    CANCELED: 'Canceled',   //已取消
    FINISHED: 'Finished',   //已完成
    TO_IMPLEMENT: 'TobeImplement',  //待实施
    TO_APPROVE: 'TobeApprove',  //待批准
    TO_SEND: 'TobeSend',    //待发放
    SATISFACTION: 'Satisfaction',   //已完成
};
