
export const baseAddress = 'http://localhost:8000';
export const baseServiceAddress = baseAddress + '/services';

export const STATUS = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};

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
