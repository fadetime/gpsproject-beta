<template>
    <div id="customer">
        <div class="customer_top">
            <div>
                <vue-datepicker-local v-model="selectedDate" />
            </div>
            <div>
                <div class="customer_white_button" @click="openAddDialogMethod()">
                    <span>+添加</span>
                </div>
            </div>
        </div>
        <div v-if="missionArray.length != 0" class="customer_center">
            <div class="customer_center_box">
                <div class="customer_center_title">
                    <div class="customer_center_title_item" style="width:60px;">
                        <span>No.</span>
                    </div>
                    <div class="customer_center_title_item" style="width:120px;">
                        <span>餐厅名称</span>
                    </div>
                    <div class="customer_center_title_item">
                        <span>订单类型</span>
                    </div>
                    <div class="customer_center_title_item" style="width:220px;">
                        <span>订单信息</span>
                    </div>
                    <div class="customer_center_title_item">
                        <span>配送司机</span>
                    </div>
                    <div class="customer_center_title_item">
                        <span>订单状态</span>
                    </div>
                </div>
                <div class="customer_center_body">
                    <div v-for="(item,index) in missionArray" :key="index" class="customer_center_body_frame" @click="openMissionDetailMethod(item)">
                        <div class="customer_center_body_frame_item" style="width:60px;">
                            <span>{{index}}</span>
                        </div>
                        <div class="customer_center_body_frame_item" style="width:120px;">
                            <span>{{item.clientName}}</span>
                        </div>
                        <div class="customer_center_body_frame_item">
                            <span v-if="item.isIncreaseOrder === 'true'">加单</span>
                            <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                            <span v-else>退单</span>
                        </div>
                        <div class="customer_center_body_frame_item" style="width:220px;">
                            <span>{{item.note}}</span>
                        </div>
                        <div class="customer_center_body_frame_item">
                            <span v-if="item.driverName">{{item.driverName}}</span>
                            <span v-else>未分配</span>
                        </div>
                        <div class="customer_center_body_frame_item">
                            <span v-if="item.isFinish" style="color:green">已完成</span>
                            <span v-else-if="item.driverName === null">未分配</span>
                            <span v-else>未完成</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- new day shift customer mission start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowNewDialog" class="customer_addDialog_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowNewDialog" class="customer_addDialog_front" @click.self.prevent="isShowNewDialog = false">
                <div class="customer_addDialog_box">
                    <div class="customer_addDialog_box_title">
                        <span>添加白班退菜任务</span>
                    </div>
                    <div class="customer_addDialog_box_body">
                        <div class="customer_addDialog_box_body_right">
                            <div class="customer_addDialog_box_body_right_item">
                                <div class="customer_addDialog_box_body_right_item_text">
                                    <span>客户名称</span>
                                </div>
                                <div class="customer_addDialog_box_body_right_item_content" @click="openChoiseClientDialogMethod()" style="cursor:pointer">
                                    <span v-if="clientName">{{clientName}}</span>
                                    <div v-else class="customer_addDialog_box_body_right_item_content_border">
                                        <span>请选择</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="customer_changetype_top" style="margin-top: 8px;">
                                    <div v-if="choiseMode === 'true'" class="customer_addDialog_box_body_right_item_frame" style="border:1px solid #d74342" @click="changeMode('true')">
                                        <div>
                                            <div class="increaseorderimg1-red"></div>
                                        </div>
                                        <div>
                                            <span>加单</span>
                                        </div>
                                    </div>
                                    <div v-else class="customer_addDialog_box_body_right_item_frame" @click="changeMode('true')">
                                        <div>
                                            <div class="increaseorderimg1"></div>
                                        </div>
                                        <div style="color:#e0e0e0">
                                            <span>加单</span>
                                        </div>
                                    </div>
                                    <div v-if="choiseMode === 'false'" class="customer_addDialog_box_body_right_item_frame" style="border:1px solid #d74342" @click="changeMode('false')">
                                        <div>
                                            <div class="increaseorderimg2-red"></div>
                                        </div>
                                        <div>
                                            <span>补单</span>
                                        </div>
                                    </div>
                                    <div v-else class="customer_addDialog_box_body_right_item_frame" @click="changeMode('false')">
                                        <div>
                                            <div class="increaseorderimg2"></div>
                                        </div>
                                        <div style="color:#e0e0e0">
                                            <span>补单</span>
                                        </div>
                                    </div>
                                    <div v-if="choiseMode === 'return'" class="customer_addDialog_box_body_right_item_frame" style="border:1px solid #d74342" @click="changeMode('return')">
                                        <div>
                                            <div class="increaseorderimg3-red"></div>
                                        </div>
                                        <div>
                                            <span>退单</span>
                                        </div>
                                    </div>
                                    <div v-else class="customer_addDialog_box_body_right_item_frame" @click="changeMode('return')">
                                        <div>
                                            <div class="increaseorderimg3"></div>
                                        </div>
                                        <div style="color:#e0e0e0">
                                            <span>退单</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="customer_changetype_bottom" style="margin-top: 8px;">
                                    <div v-if="choiseMode === 'change'" class="customer_addDialog_box_body_right_item_frame" style="border:1px solid #d74342" @click="changeMode('change')">
                                        <div>
                                            <div class="increaseorderimg_change-red"></div>
                                        </div>
                                        <div>
                                            <span>换货</span>
                                        </div>
                                    </div>
                                    <div v-else class="customer_addDialog_box_body_right_item_frame" @click="changeMode('change')">
                                        <div>
                                            <div class="increaseorderimg_change"></div>
                                        </div>
                                        <div style="color:#e0e0e0">
                                            <span>换货</span>
                                        </div>
                                    </div>
                                    <div v-if="choiseMode === 'delivery'" class="customer_addDialog_box_body_right_item_frame" style="border:1px solid #d74342" @click="changeMode('delivery')">
                                        <div>
                                            <div class="increaseorderimg5-red"></div>
                                        </div>
                                        <div>
                                            <span>运输</span>
                                        </div>
                                    </div>
                                    <div v-else class="customer_addDialog_box_body_right_item_frame" @click="changeMode('delivery')">
                                        <div>
                                            <div class="increaseorderimg5"></div>
                                        </div>
                                        <div style="color:#e0e0e0">
                                            <span>运输</span>
                                        </div>
                                    </div>
                                    <div v-if="choiseMode === 'other'" class="customer_addDialog_box_body_right_item_frame" style="border:1px solid #d74342" @click="changeMode('other')">
                                        <div>
                                            <div class="increaseorderimg4-red"></div>
                                        </div>
                                        <div>
                                            <span>其他</span>
                                        </div>
                                    </div>
                                    <div v-else class="customer_addDialog_box_body_right_item_frame" @click="changeMode('other')">
                                        <div>
                                            <div class="increaseorderimg4"></div>
                                        </div>
                                        <div style="color:#e0e0e0">
                                            <span>其他</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="customer_addDialog_box_body_right_item" style="margin-top:12px;">
                                <div class="customer_addDialog_box_body_right_item_text">
                                    <span>详细信息</span>
                                </div>
                                <textarea class="customer_addDialog_box_body_right_item_textarea" v-model="customerNote"></textarea>
                            </div>
                        </div>
                        <div class="customer_addDialog_box_body_left">
                            <div class="customer_addDialog_box_body_left_frame" @click="openChoiseClientDialogMethod()">
                                <div v-if="clientImage && clientName" class="customer_addDialog_box_body_left_frame_image">
                                    <img :src="clientImage | imgurl">
                                </div>
                                <div v-else-if="clientName" class="customer_addDialog_box_body_left_frame_image">
                                    <img src="../../public/img/ebuyLogo.png">
                                </div>
                                <div class="customer_addDialog_box_body_left_frame_text" v-else>
                                    <span>请选择客户</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="customer_addDialog_box_bottom">
                        <div class="customer_white_button" @click="isShowNewDialog = false">
                            <span>取消</span>
                        </div>
                        <div class="customer_white_button" style="margin-left:10px;margin-bottom:12px;" @click="addDayShiftMission()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- new day shift customer mission end -->

        <!-- choise client dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowClientChoiseDialog" class="customer_addDialog_back" style="z-index:25"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowClientChoiseDialog" class="customer_addDialog_front" style="z-index:26" @click.self.prevent="isShowClientChoiseDialog = false">
                <div class="customer_addDialog_box">
                    <div class="customer_addDialog_box_title">
                        <span>客户搜索</span>
                    </div>
                    <div class="customer_addDialog_box_body" style="margin:8px;">
                        <div>
                            <div class="customer_clientDialog_box_body_input">
                                <input type="text" @keyup.enter="findClientMethod()" v-model="keyWord">
                                <div v-if="isShowClientList" class="customer_clientDialog_box_body_list_frame">
                                    <div v-for="(item,index) in clientArray" :key="index" class="customer_clientDialog_box_body_list" @click="choiseClientMethod(item)">
                                        <span style="font-size:16px;">{{item.clientbname}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="customer_clientDialog_box_body_item">
                                <div class="customer_clientDialog_box_body_item_text">
                                    <span>客户名称</span>
                                </div>
                                <div class="customer_clientDialog_box_body_item_content">
                                    <span v-if="choiseClient">{{choiseClient.clientbname}}</span>
                                </div>
                            </div>
                            <div class="customer_clientDialog_box_body_item">
                                <div class="customer_clientDialog_box_body_item_text">
                                    <span>英文名称</span>
                                </div>
                                <div class="customer_clientDialog_box_body_item_content">
                                    <span v-if="choiseClient">{{choiseClient.clientbname}}</span>
                                </div>
                            </div>
                            <div class="customer_clientDialog_box_body_item">
                                <div class="customer_clientDialog_box_body_item_text">
                                    <span>客户电话</span>
                                </div>
                                <div class="customer_clientDialog_box_body_item_content">
                                    <span v-if="choiseClient">{{choiseClient.clientbphone}}</span>
                                </div>
                            </div>
                            <div class="customer_clientDialog_box_body_item">
                                <div class="customer_clientDialog_box_body_item_text">
                                    <span>客户地址</span>
                                </div>
                                <div class="customer_clientDialog_box_body_item_content">
                                    <span v-if="choiseClient">{{choiseClient.clientbaddress}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="customer_addDialog_box_bottom">
                        <div class="customer_white_button" style="margin-bottom:12px;" @click="isShowClientChoiseDialog = false">
                            <span>取消</span>
                        </div>
                        <div class="customer_white_button" style="margin-bottom:12px;margin-left:10px;" @click="confirmChoiseClientMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- choise client dialog end -->

        <!-- mission detail dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowDetailDialog" class="customer_addDialog_back" style="z-index:25"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowDetailDialog" class="customer_addDialog_front" style="z-index:26" @click.self.prevent="isShowDetailDialog = false">
                <div class="customer_addDialog_box">
                    <div class="customer_addDialog_box_title">
                        <div class="customer_addDialog_box_title_frame">
                            <span>详细信息</span>
                        </div>
                    </div>
                    <div class="customer_detail_box_body" style="margin:8px;">
                        <div class="customer_addDialog_box_body_title">
                            <div class="customer_addDialog_box_body_title_frame">
                                <span>{{tempShipping.clientName}}</span>
                            </div>
                        </div>
                        <div class="customer_detail_box_body_center">
                            <div class="customer_detail_box_body_center_left">
                                <div class="customer_detail_box_body_center_left_item">
                                    <div class="customer_detail_box_body_center_left_item_text">
                                        <span>客户电话</span>
                                    </div>
                                    <div class="customer_detail_box_body_center_left_item_content">
                                        <span>{{tempShipping.clientPhone}}</span>
                                    </div>
                                </div>
                                <div class="customer_detail_box_body_center_left_item">
                                    <div class="customer_detail_box_body_center_left_item_text">
                                        <span>客户邮编</span>
                                    </div>
                                    <div class="customer_detail_box_body_center_left_item_content">
                                        <span>{{tempShipping.clientPostcode}}</span>
                                    </div>
                                </div>
                                <div class="customer_detail_box_body_center_left_item">
                                    <div class="customer_detail_box_body_center_left_item_text">
                                        <span>订单类型</span>
                                    </div>
                                    <div class="customer_detail_box_body_center_left_item_content">
                                        <span v-if="tempShipping.isIncreaseOrder === 'true'">加单</span>
                                        <span v-else-if="tempShipping.isIncreaseOrder === 'false'">补单</span>
                                        <span v-else>退单</span>
                                    </div>
                                </div>
                                <div class="customer_detail_box_body_center_left_item">
                                    <div class="customer_detail_box_body_center_left_item_text">
                                        <span>客户地址</span>
                                    </div>
                                    <div class="customer_detail_box_body_center_left_item_content" style="height: 94px;overflow-x:hidden;overflow-y:auto;text-align:left;line-height: 20px;padding:0 2px">
                                        <span>{{tempShipping.clientAddress}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="customer_detail_box_body_center_right">
                                <div class="customer_detail_box_body_center_right_frame">
                                    <div v-if="tempShipping.image" class="customer_addDialog_box_body_left_frame_image">
                                        <img :src="tempShipping.image | imgurl">
                                    </div>
                                    <div v-else class="customer_addDialog_box_body_left_frame_image">
                                        <img src="../../public/img/ebuyLogo.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="customer_detail_box_body_center">
                            <div class="customer_detail_box_body_center_left">
                                <div class="customer_detail_box_body_center_left_item">
                                    <div class="customer_detail_box_body_center_left_item_text">
                                        <span>生成日期</span>
                                    </div>
                                    <div class="customer_detail_box_body_center_left_item_content">
                                        <span>{{tempShipping.orderDate | datefilter}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="customer_detail_box_body_center_right">
                                <div class="customer_detail_box_body_center_left_item">
                                    <div class="customer_detail_box_body_center_left_item_text">
                                        <span>生成时间</span>
                                    </div>
                                    <div class="customer_detail_box_body_center_left_item_content">
                                        <span>{{tempShipping.orderDate | timefilter}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="customer_detail_box_body_center" style="margin-top: 0;">
                            <div class="customer_detail_box_body_center_left">
                                <div class="customer_detail_box_body_center_left_item">
                                    <div class="customer_detail_box_body_center_left_item_text">
                                        <span>司机姓名</span>
                                    </div>
                                    <div class="customer_detail_box_body_center_left_item_content">
                                        <span v-if="tempShipping.driverName">{{tempShipping.driverName}}</span>
                                        <span v-else>未分配</span>
                                    </div>
                                </div>
                            </div>
                            <div class="customer_detail_box_body_center_right">
                                <div class="customer_detail_box_body_center_left_item">
                                    <div class="customer_detail_box_body_center_left_item_text">
                                        <span>完成时间</span>
                                    </div>
                                    <div class="customer_detail_box_body_center_left_item_content">
                                        <span v-if="tempShipping.finishDate">{{tempShipping.finishDate | timefilter}}</span>
                                        <span v-else>未完成</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="customer_detail_box_body_center" style="margin-top: 0;">
                            <div class="customer_detail_box_body_center_left_item" style="height:unset">
                                <div class="customer_detail_box_body_center_left_item_text">
                                    <span>订单信息</span>
                                </div>
                                <div class="customer_detail_box_body_center_left_item_content" style="width: 404px;height:60px;text-align:left;line-height:20px;padding:0 4px;overflow-x:hidden;overflow-y:auto">
                                    <span>{{tempShipping.note}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="customer_addDialog_box_bottom">
                        <div class="customer_white_button" style="margin-bottom:12px;" @click="isShowDetailDialog = false">
                            <span>取消</span>
                        </div>
                        <!-- <div class="customer_white_button" style="margin-bottom:12px;margin-left:10px;">
                            <span>确定</span>
                        </div> -->
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission detail dialog end -->

        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import VueDatepickerLocal from "vue-datepicker-local"; //时间选择组件
import axios from "axios";
import config from "../../public/js/config.js";
import tipsBox from "@/components/tipsBox.vue"

export default {
    components: {
        VueDatepickerLocal,
        tipsBox
    },

    mounted(){
        this.getDayShiftMission()
    },

    data(){
        return{
            selectedDate:new Date(),
            isShowNewDialog:false,
            isShowClientChoiseDialog:false,
            keyWord:null,
            clientArray:[],
            missionArray:[],
            tipsShowColor:null,
            tipsInfo:null,
            isShowTipsBox:null,
            isShowClientList:false,
            choiseClient:null,
            client_id:null,
            clientImage:null,
            clientName:null,
            clientNameEN:null,
            choiseMode:null,
            customerNote:null,
            tempShipping:null,
            isShowDetailDialog:false
        }
    },
    
    watch:{
        selectedDate: function() {
            console.log(this.selectedDate)
            this.getDayShiftMission()
        },
    },

    methods:{
        openMissionDetailMethod(item){
            this.tempShipping = item
            this.isShowDetailDialog = true
        },

        getDayShiftMission(){
            axios
                .post(config.server + "/dayShiftmission/find",{
                    orderDate:this.selectedDate
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.missionArray = doc.data.doc
                    }else if(doc.data.code === 1){
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '未找到当日数据'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '获取信息失败'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        addDayShiftMission(){
            if(!this.choiseClient){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择客户'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else if(!this.choiseMode){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选订单所属类型'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else if(!this.customerNote){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请填写详细信息'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else{
                let tempDate = new Date().toISOString()
                axios
                    .post(config.server + "/dayShiftmission/create",{
                        client_id:this.client_id,
                        clientName:this.clientName,
                        clientNameEN:this.clientNameEN,
                        note:this.customerNote,
                        clientAddress:this.choiseClient.clientbaddress,
                        clientPhone:this.choiseClient.clientbphone,
                        clientPostcode:this.choiseClient.clientbpostcode,
                        image:this.clientImage,
                        isIncreaseOrder:this.choiseMode,
                        orderDate:tempDate
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.getDayShiftMission()
                            this.isShowNewDialog = false
                            this.tipsShowColor = 'green'
                            this.tipsInfo = '创建成功'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '创建失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

        changeMode(mode){
            this.choiseMode = mode
        },

        confirmChoiseClientMethod(){
            if(this.choiseClient === null){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择客户'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else{
                this.isShowClientChoiseDialog = false
                this.client_id = this.choiseClient._id
                this.clientImage = this.choiseClient.image
                this.clientName = this.choiseClient.clientbname
                this.clientNameEN = this.choiseClient.clientbnameEN
            }
        },

        choiseClientMethod(item){
            this.isShowClientList = false
            this.choiseClient = item
        },

        findClientMethod(){
            if(this.keyWord){
                axios
                    .post(config.server + "/customerService/findClient",{
                        word:this.keyWord
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.clientArray = doc.data.doc
                            this.isShowClientList = true
                        }else if(doc.data.code === 1){
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '未找到符合关键字的客户'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '查找时出现问题'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请输入要查找的关键字'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        openChoiseClientDialogMethod(){
            this.keyWord = null
            this.isShowClientChoiseDialog = true
            this.choiseClient = null
        },

        openAddDialogMethod(){
            this.clientName = null
            this.choiseMode = null
            this.clientImage = null
            this.customerNote = null
            this.choiseClient = null
            this.isShowNewDialog = true
        }
    }
}
</script>

<style scoped>
.customer_white_button{
    border: 1px solid #eee;
    cursor: pointer;
    height: 30px;
    width: 100px;
    font-size: 16px;
    line-height: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    background-color: #fff;
}

.customer_white_button:active{
    box-shadow:none;
}

.customer_top {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    height: 48px;
}

.customer_center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
}

.customer_center_box{
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    padding: 12px 12px;
}

.customer_center_title{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 26px;
    padding: 3px 0;
    border-bottom: 1px solid #eee;
}

.customer_center_title_item{
    font-size: 16px;
    border-left: 3px solid #d74342;
    padding-left: 8px;
    width: 100px;
    text-align: left;
}

.customer_center_body_frame{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    border-radius: 5px;
}

.customer_center_body_frame:hover{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.customer_center_body_frame_item{
    padding-left: 11px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100px;
}

.customer_addDialog_back{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.customer_addDialog_front{
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

.customer_addDialog_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    overflow: hidden;
}

.customer_addDialog_box_title{
    background-color: #d74342;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.customer_addDialog_box_body{
    margin: 12px 24px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    padding: 12px;
    border-radius: 10px;
    display: flex;
    display: -webkit-flex;
    background-color: #fff;
}

.customer_addDialog_box_body_left_frame{
    height: 200px;
    width: 200px;
    background-color: #eee;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid #eee;
    overflow: hidden;
}

.customer_addDialog_box_body_left_frame_image{
    height: 100%;
    width: 100%;
}

.customer_addDialog_box_body_left_frame_image img{
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.customer_addDialog_box_body_left_frame_text{
    line-height: 30px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    height: 28px;
    width: 92px;
}

.customer_addDialog_box_body_right_item{
    display: flex;
    display: -webkit-flex;
}

.customer_addDialog_box_body_right_item_buttonarea{
    margin-top: 12px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
}

.customer_addDialog_box_body_right_item_frame{
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    width: 66px;
    cursor: pointer;
    margin-right: 4px;
}

.customer_addDialog_box_body_right_item_text{
    font-size: 16px;
    line-height: 30px;
    width: 88px;
}

.customer_addDialog_box_body_right_item_textarea{
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 220px;
    height: 80px;
}

.customer_addDialog_box_body_left{
    margin-left: 10px;
}

.customer_addDialog_box_body_right_item_content{
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    font-size: 16px;
    width: 220px;
    height: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.customer_addDialog_box_body_right_item_content_border{
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    height: 20px;
    line-height: 20px;
    width: 60px;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.2)
}

.increaseorderimg1 {
    background: #e0e0e0;
    mask-image: url(../../public/img/icons/increaseOrder1.svg);
    -webkit-mask-image: url(../../public/img/icons/increaseOrder1.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 10px;
    transition: 0.2s;
}

.increaseorderimg1-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/increaseOrder1.svg);
    -webkit-mask-image: url(../../public/img/icons/increaseOrder1.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 10px;
    transition: 0.2s;
}

.increaseorderimg2 {
    background: #e0e0e0;
    mask-image: url(../../public/img/icons/increaseOrder2.svg);
    -webkit-mask-image: url(../../public/img/icons/increaseOrder2.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 10px;
    transition: 0.2s;
}

.increaseorderimg2-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/increaseOrder2.svg);
    -webkit-mask-image: url(../../public/img/icons/increaseOrder2.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 10px;
    transition: 0.2s;
}

.increaseorderimg3 {
    background: #e0e0e0;
    mask-image: url(../../public/img/icons/baseline-reply_all-24px.svg);
    -webkit-mask-image: url(../../public/img/icons/baseline-reply_all-24px.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 10px;
    transition: 0.2s;
}

.increaseorderimg3-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/baseline-reply_all-24px.svg);
    -webkit-mask-image: url(../../public/img/icons/baseline-reply_all-24px.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 10px;
    transition: 0.2s;
}

.increaseorderimg4 {
    background: #e0e0e0;
    mask-image: url(../../public/img/icons/icon_other.svg);
    -webkit-mask-image: url(../../public/img/icons/icon_other.svg);
    width: 32px;
    height: 32px;
    mask-size: 48px 48px;
    -webkit-mask-size: 48px 48px;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    margin-top: 10px;
    transition: 0.2s;
}

.increaseorderimg4-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/icon_other.svg);
    -webkit-mask-image: url(../../public/img/icons/icon_other.svg);
    width: 32px;
    height: 32px;
    mask-size: 48px 48px;
    -webkit-mask-size: 48px 48px;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    margin-top: 10px;
    transition: 0.2s;
}

.increaseorderimg5 {
    background: #e0e0e0;
    mask-image: url(../../public/img/icons/icon_transport.svg);
    -webkit-mask-image: url(../../public/img/icons/icon_transport.svg);
    width: 36px;
    height: 36px;
    mask-size: 42px;
    -webkit-mask-size: 42px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg5-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/icon_transport.svg);
    -webkit-mask-image: url(../../public/img/icons/icon_transport.svg);
    width: 36px;
    height: 36px;
    mask-size: 42px;
    -webkit-mask-size: 42px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg_change {
    background: #e0e0e0;
    mask-image: url(../../public/img/icons/icon_change.svg);
    -webkit-mask-image: url(../../public/img/icons/icon_change.svg);
    width: 36px;
    height: 36px;
    mask-size: 36px;
    -webkit-mask-size: 36px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg_change-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/icon_change.svg);
    -webkit-mask-image: url(../../public/img/icons/icon_change.svg);
    width: 36px;
    height: 36px;
    mask-size: 36px;
    -webkit-mask-size: 36px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.customer_addDialog_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.customer_clientDialog_box_body_input{
    position: relative;
}

.customer_clientDialog_box_body_input input{
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 16px;
    width: 220px;
}

.customer_clientDialog_box_body_list_frame{
    background-color: #fff;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    width: 220px;
    left: 0;
    right: 0;
    margin: 0 auto;
}

.customer_clientDialog_box_body_list{
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    width: 220px;
    border-radius: 10px;
}

.customer_clientDialog_box_body_list:hover{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border: 1px solid #eee;
}

.customer_clientDialog_box_body_item{
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    margin-top: 10px;
}

.customer_clientDialog_box_body_item_text{
    height: 30px;
    line-height: 30px;
    width: 66px;
    text-align: right;
}

.customer_clientDialog_box_body_item_content{
    margin-left: 10px;
    width: 180px;
    height: 30px;
    line-height: 30px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.customer_detail_box_body{
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    background-color: #fff;
    padding: 12px;
}

.customer_addDialog_box_body_title{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.customer_addDialog_box_body_title_frame{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 16px;
    padding: 0 8px;
}

.customer_detail_box_body_center{
    display: flex;
    display: -webkit-flex;
    margin-top: 10px;
}

.customer_detail_box_body_center_left_item{
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    margin: 4px 0;
}

.customer_detail_box_body_center_left_item_text{
    margin-right: 10px;
    
}

.customer_detail_box_body_center_left_item_content{
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 160px;
    border-radius: 10px;
}

.customer_detail_box_body_center_right{
    margin-left: 10px;
}

.customer_detail_box_body_center_right_frame{
    width: 234px;
    height: 200px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #eee;
}

.customer_changetype_top{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.customer_changetype_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}
</style>
