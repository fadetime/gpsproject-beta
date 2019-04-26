<template>
    <div id="backitem">
        <div class="backitem_toparea">
            <div class="toparea">
                <div class="backitem_toparea_button_area">
                    <div class="backitem_white_button" style="margin-right:12px" @click="isShowBackMission = !isShowBackMission">
                        <span>退菜统计</span>
                    </div>
                </div>
                <div  v-if="isShowBackMission" class="backitem_toparea_timepicker_area_frame">
                    <div class="backitem_toparea_timepicker_area">
                        <vue-datepicker-local v-model="startDate"
                                        placeholder="开始时间" />
                        <span> ~ </span>
                        <vue-datepicker-local v-model="endDate"
                                            placeholder="结束时间" />
                        <div class="backitem_white_button" @click="findBackMissionReport" style="margin-left:10px">
                            <span>查询</span>
                        </div>
                    </div>
                    <div class="backitem_toparea_radio_frame">
                        <div class="backitem_toparea_radio_item">
                            <div>
                                <input id="backitem_radio_type_all" value="all" type="radio" v-model="findType">
                            </div>
                            <label for="backitem_radio_type_all">
                                <div>
                                    <span>全 部</span>
                                </div>
                            </label>
                        </div>
                        <div class="backitem_toparea_radio_item">
                            <div>
                                <input id="backitem_radio_type_notget" value="notget" type="radio" v-model="findType">
                            </div>
                            <label for="backitem_radio_type_notget">
                                <div style="color:rgb(255, 152, 0)">
                                    <span>未发送</span>
                                </div>
                            </label>
                        </div>
                        <div class="backitem_toparea_radio_item">
                            <div>
                                <input id="backitem_radio_type_notfinish" value="notfinish" type="radio" v-model="findType">
                            </div>
                            <label for="backitem_radio_type_notfinish">
                                <div>
                                    <span>未完成</span>
                                </div>
                            </label>
                        </div>
                        <div class="backitem_toparea_radio_item">
                            <div>
                                <input id="backitem_radio_type_notsee" value="notsee" type="radio" v-model="findType">
                            </div>
                            <label for="backitem_radio_type_notsee">
                                <div style="color:rgb(215, 67, 66)">
                                    <span>未取回</span>
                                </div>
                            </label>
                        </div>
                        <div class="backitem_toparea_radio_item">
                            <div>
                                <input id="backitem_radio_type_finish" value="finish" type="radio" v-model="findType">
                            </div>
                            <label for="backitem_radio_type_finish">
                                <div style="color:green">
                                    <span>已完成</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 退菜统计报表 start -->
        <transition name="backitem_toparea-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea" v-if="backMissionArray.length != 0" style="max-width: 886px;">
                <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="backMissionArray = []">
                    <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>退菜数据报表</span>
                </div>
                <div style="padding: 24px;">
                    <div class="report_backmission_title">
                        <div class="report_backmission_title_frame" style="width:50px">
                            <div class="report_backmission_title_frame_box" >
                                <span>序号</span>
                            </div>
                        </div>
                        <div class="report_backmission_title_frame" >
                            <div class="report_backmission_title_frame_box" style="width:120px;text-align: left;">
                                <span>客户名称</span>
                            </div>
                        </div>
                        <div class="report_backmission_title_frame">
                            <div class="report_backmission_title_frame_box">
                                <span>创建日期</span>
                            </div>
                        </div>
                        <div class="report_backmission_title_frame">
                            <div class="report_backmission_title_frame_box" style="width:360px;text-align: left;">
                                <span>客服留言</span>
                            </div>
                        </div>
                        <div class="report_backmission_title_frame">
                            <div class="report_backmission_title_frame_box">
                                <span>完成日期</span>
                            </div>
                        </div>
                        <div class="report_backmission_title_frame">
                            <div class="report_backmission_title_frame_box">
                                <span>任务状态</span>
                            </div>
                        </div>
                    </div>
                    <div class="report_backmission_body" v-for="(item,index) in backMissionArray" :key="index" @click="openBackMissionDetail(item)">
                        <div class="report_backmission_body_item" style="text-align:center;width:50px">
                            <span>{{index + 1}}</span>
                        </div>
                        <div class="report_backmission_body_item" style="width:130px">
                            <span style="padding:0 4px">{{item.clientName}}</span>
                        </div>
                        <div class="report_backmission_body_item" style="width:82px">
                            <span>{{item.createDate | datefilter}}</span>
                        </div>
                        <div class="report_backmission_body_item" style="width:368px">
                            <span>{{item.note}}</span>
                        </div>
                        <div class="report_backmission_body_item" style="width:80px">
                            <span v-if="item.finishiDate">{{item.finishiDate | datefilter}}</span>
                            <span v-else>Null</span>
                        </div>   
                        <div class="report_backmission_body_item" >
                            <span v-if="!item.isFinish" style="color: rgb(255, 152, 0);">未发送</span>
                            <span v-else-if="item.isFinish && !item.finishiDate" style="color: rgb(255, 152, 0);">未完成</span>
                            <span v-else-if="item.isFinish && item.isReturnDone === 'false'" style="color: green;">未取回</span>
                            <span v-else style="color: green;">已完成</span>
                        </div>  
                    </div>
                </div>
            </div>
        </transition>
        <!-- 退菜统计报表 end -->

        <!-- back mission detail report box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowBackMissionDetail"
                 class="checkditailbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowBackMissionDetail"
                 class="checkditailbox-front"
                 @click.self.prevent="isShowBackMissionDetail = false">
                <div class="report_backdetail_front_box">
                    <div class="report_backdetail_front_box_title">
                        <span>退菜详细信息</span>
                    </div>
                    <div class="report_backdetail_front_box_body">
                        <div class="report_backdetail_front_box_body_item">
                            <div class="report_backdetail_front_box_body_item_left">
                                <span>客户姓名</span>
                            </div>
                            <div class="report_backdetail_front_box_body_item_right">
                                <span>{{shippingMission.clientName}}</span>
                            </div>
                        </div>
                        <div class="report_backdetail_front_box_body_item">
                            <div class="report_backdetail_front_box_body_item_left">
                                <span>创建日期</span>
                            </div>
                            <div class="report_backdetail_front_box_body_item_right">
                                <span>{{shippingMission.createDate | datefilter}}</span>
                            </div>
                        </div>
                        <div class="report_backdetail_front_box_body_item">
                            <div class="report_backdetail_front_box_body_item_left">
                                <span>创建时间</span>
                            </div>
                            <div class="report_backdetail_front_box_body_item_right">
                                <span>{{shippingMission.createDate | timefilter}}</span>
                            </div>
                        </div>
                        <div class="report_backdetail_front_box_body_item" v-if="shippingMission.finishiDate">
                            <div class="report_backdetail_front_box_body_item_left">
                                <span>取回日期</span>
                            </div>
                            <div class="report_backdetail_front_box_body_item_right">
                                <span>{{shippingMission.finishiDate | datefilter}}</span>
                            </div>
                        </div>
                        <div class="report_backdetail_front_box_body_item" v-if="shippingMission.finishiDate">
                            <div class="report_backdetail_front_box_body_item_left">
                                <span>取回时间</span>
                            </div>
                            <div class="report_backdetail_front_box_body_item_right">
                                <span>{{shippingMission.finishiDate | timefilter}}</span>
                            </div>
                        </div>
                        <div class="report_backdetail_front_box_body_item">
                            <div class="report_backdetail_front_box_body_item_left">
                                <span>取回司机</span>
                            </div>
                            <div class="report_backdetail_front_box_body_item_right">
                                <span>{{shippingMission.driver}}</span>
                            </div>
                        </div>
                        <div class="report_backdetail_front_box_body_item">
                            <div class="report_backdetail_front_box_body_item_left">
                                <span>任务状态</span>
                            </div>
                            <div class="report_backdetail_front_box_body_item_right">
                                <span v-if="!shippingMission.isFinish" style="color: rgb(255, 152, 0);">未发送</span>
                                <span v-else-if="shippingMission.isFinish && shippingMission.isReturnDone === 'false'" style="color:#d74342">未取回</span>
                                <span v-else-if="shippingMission.isFinish" style="color:green">已完成</span>
                                <span v-else style="color:#ff9800">未完成</span>
                            </div>
                        </div>
                    </div>
                    <div class="report_backdetail_front_box_bottom">
                        <div class="white_button" @click="isShowBackMissionDetail = false">
                            <span>取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- back mission detail report box start -->

        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import VueDatepickerLocal from "vue-datepicker-local"; 
import axios from "axios";
import config from "../../../public/js/config.js";
import tipsBox from "@/components/tipsBox.vue"

export default {
    components: {
        VueDatepickerLocal,
        tipsBox
    },

    data(){
        return {
            isShowBackMission:false,
            startDate: null,
            endDate: null,
            backMissionArray:[],
            tipsShowColor:null,
            tipsInfo:null,
            isShowTipsBox:null,
            findType:'all',
            isShowBackMissionDetail:false
        }
    },

    methods:{
        openBackMissionDetail(item){
            this.shippingMission = item
            axios
                .post(config.server + "/report/backFindDriver",{
                    mission_id:item.mission_id
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.shippingMission.driver = doc.data.doc.missiondirver
                    }else if(doc.data.code === 1){
                        this.shippingMission.driver = '数据丢失'
                    }else{
                        this.shippingMission.driver = '数据错误'
                    }
                    this.isShowBackMissionDetail = true
                })
                .catch(err => {
                    console.log(err)
                })
        },

        findBackMissionReport(){
            if (!this.startDate || !this.endDate) {
                this.tipsShowColor = 'yellow'
                this.tipsInfo = "请选择开始时间和结束时间！！！";
                this.isShowTipsBox = true;
                setTimeout(() => {
                    this.isShowTipsBox = false;
                }, 3000);
            } else {
                let start = new Date(this.startDate).toDateString();
                start = new Date(start).getTime();
                let end = new Date(this.endDate).toDateString();
                end = new Date(end).getTime();
                axios
                    .post(config.server + "/report/backMission", {
                        startDate: start,
                        endDate: end,
                        findType: this.findType
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.backMissionArray = doc.data.doc
                        }else if(doc.data.code === 1){
                            this.tipsMsg = "为找到符合条件的数据";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        }else{
                            this.tipsMsg = "查找时出现错误";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
    }
}
</script>

<style scoped>
.backitem_white_button{
    font-size: 14px;
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    background-color: #fff;
    width: 80px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
}

.backitem_toparea {
    width: 660px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.backitem_toparea_button_area{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;
    height: 60px;
}

.backitem_toparea_timepicker_area_frame{
    height: 72px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.backitem_toparea_timepicker_area{
    position: relative;
    z-index:23;
    padding-left:6px;
    background:#fff;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.centerarea {
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    position:relative;
}

.centerarea-head {
    font-size: 18px;
    color: #6a6a6a;
    border-bottom: 2px solid #448aff;
    height: 40px;
    line-height: 40px;
    width: 240px;
    margin: 0 auto;
}

.centerarea-title {
    font-size: 18px;
    display: flex;
    display: -webkit-flex;
    color: #6a6a6a;
    border-bottom: 1px solid #e0e0e0;
    margin: 20px 12px 0 12px;
    padding: 0 12px;
}

.centerarea-title-item {
    padding-left: 12px;
    padding-right: 12px;
}

.centerarea-body {
    color: #212121;
    margin: auto 12px;
    overflow-y: auto;
    overflow-x: hidden;
}

.centerarea-body-item {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 12px;
    cursor: pointer;
    transition: 0.2s;
}

.centerarea-body-item:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    transition: 0.2s;
}

.centerarea-bottom {
    margin: 0 10px;
    border-top: 1px solid #e0e0e0;
    font-size: 18px;
    color: #6a6a6a;
    text-align: right;
    height: 30px;
    line-height: 30px;
}

.report_backmission_title{
    display: flex;
    display: -webkit-flex;    
}

.report_backmission_title_frame{
    height: 40px;
    background-color: #eee;
    border-radius: 10px;
    padding: 0 4px;
    margin: 0 4px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
}

.report_backmission_title_frame_box{
    height: 30px;
    line-height: 30px;
    border-bottom: 2px solid #e31d65;
    font-size: 16px;
    padding: 0 4px;
}

.report_backmission_body{
    display: flex;
    display: -webkit-flex;
    border-radius: 10px;
    overflow: hidden;
}

.report_backmission_body:hover{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.report_backmission_body_item{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    text-align: left;
    margin: 0 4px;
    padding: 0 4px;
    cursor: pointer;
}

.backitem_toparea_radio_frame{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-top: 4px;
}

.backitem_toparea_radio_item{
    display: flex;
    display: -webkit-flex;
    padding-right: 10px;
}

.checkditailbox-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.checkditailbox-front {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.report_backdetail_front_box{
    background: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.report_backdetail_front_box_title{
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #d74342;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.report_backdetail_front_box_body{
    margin: 8px 12px;
    padding: 8px 12px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
}

.report_backdetail_front_box_body_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
}

.report_backdetail_front_box_body_item_left{
    width: 60px;
    text-align: right;
}

.report_backdetail_front_box_body_item_right{
    margin-left: 8px;
    width: 136px;
    text-align: left;
}

.report_backdetail_front_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-bottom: 8px;
}

.white_button{
    border-radius: 10px;
    border: 1px solid #eee;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    cursor: pointer;
}
</style>
