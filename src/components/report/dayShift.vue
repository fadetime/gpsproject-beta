<template>
    <div id="dayshift">
        <div class="dayshift_toparea_button">
            <div class="dayshift_toparea_button_area">
                <div class="whiteButton" style="margin-right:12px" @click="isShowDayShiftMission = !isShowDayShiftMission,isShowDayShiftCheckCar = false">
                    <span>任务统计</span>
                </div>
                <div class="whiteButton" @click="isShowDayShiftCheckCar = !isShowDayShiftCheckCar,isShowDayShiftMission = false">
                    <span>车辆检查</span>
                </div>
            </div>
            <div v-if="isShowDayShiftMission" style="position: relative;z-index:23;background:#fff;    border-radius: 10px;">
                <div class="dayshift_radio_frame">
                    <div class="dayshift_radio_item">
                        <div class="dayshift_radio_item_left">
                            <input id="dayshift_all" type="radio" value="all" v-model="searchType">
                        </div>
                        <label for="dayshift_all" class="dayshift_radio_item_right">
                            <span>全部</span>
                        </label>
                    </div>
                    <div class="dayshift_radio_item">
                        <div class="dayshift_radio_item_left">
                            <input id="dayshift_true" type="radio" value="true" v-model="searchType">
                        </div>
                        <label for="dayshift_true" class="dayshift_radio_item_right">
                            <span>加单</span>
                        </label>
                    </div>
                    <div class="dayshift_radio_item">
                        <div class="dayshift_radio_item_left">
                            <input id="dayshift_false" type="radio" value="false" v-model="searchType">
                        </div>
                        <label for="dayshift_false" class="dayshift_radio_item_right">
                            <span>补单</span>
                        </label>
                    </div>
                    <div class="dayshift_radio_item">
                        <div class="dayshift_radio_item_left">
                            <input id="dayshift_return" type="radio" value="return" v-model="searchType">
                        </div>
                        <label for="dayshift_return" class="dayshift_radio_item_right">
                            <span>退单</span>
                        </label>
                    </div>
                    <div class="dayshift_radio_item">
                        <div class="dayshift_radio_item_left">
                            <input id="dayshift_delivery" type="radio" value="change" v-model="searchType">
                        </div>
                        <label for="dayshift_delivery" class="dayshift_radio_item_right">
                            <span>换货</span>
                        </label>
                    </div>
                    <div class="dayshift_radio_item">
                        <div class="dayshift_radio_item_left">
                            <input id="dayshift_delivery" type="radio" value="delivery" v-model="searchType">
                        </div>
                        <label for="dayshift_delivery" class="dayshift_radio_item_right">
                            <span>运输</span>
                        </label>
                    </div>
                    <div class="dayshift_radio_item">
                        <div class="dayshift_radio_item_left">
                            <input id="dayshift_other" type="radio" value="other" v-model="searchType">
                        </div>
                        <label for="dayshift_other" class="dayshift_radio_item_right">
                            <span>其他</span>
                        </label>
                    </div>
                </div>
                <div class="dayshift_toparea_button_area_bottom ">
                    <div>
                        <vue-datepicker-local v-model="startDate" placeholder="开始时间" />
                        <span> ~ </span>
                        <vue-datepicker-local v-model="endDate" placeholder="结束时间" />
                    </div>
                    <div style="padding-left:8px">
                        <div class="dayshift_bluebutton" @click="findDayReport()">
                            <span>查询</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="isShowDayShiftCheckCar" class="dayshift_toparea_button_area_bottom" style="padding-top:8px">
                <div>
                    <vue-datepicker-local v-model="startDate" placeholder="开始时间" />
                    <span> ~ </span>
                    <vue-datepicker-local v-model="endDate" placeholder="结束时间" />
                </div>
                <div style="padding-left:8px">
                    <div class="dayshift_bluebutton" @click="findDayShiftCheckCarMethod()">
                        <span>查询</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- dayShift report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea" v-if="dayShiftInfo.length != 0">
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="dayShiftInfo=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>白班任务情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 5%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>客户</span>
                    </div>
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>类型</span>
                    </div>
                    <div style="flex-basis: 15%;text-align: center;">
                        <span>任务日期</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>生成时间</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>结束时间</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in dayShiftInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 5%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 10%;text-align: center;">
                            <span>{{item.driverName}}</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;overflow:hidden">
                            <span>{{item.clientName}}</span>
                        </div>
                        <div style="flex-basis: 10%;text-align: center;">
                            <span v-if="item.isIncreaseOrder === 'true'">加单</span>
                            <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                            <span v-else-if="item.isIncreaseOrder === 'change'">换货</span>
                            <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                            <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                            <span v-else>退单</span>
                        </div>
                        <div style="flex-basis: 15%;text-align: center;">
                            <span>{{item.orderDate | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
                            <span v-if="item.orderDate">{{item.orderDate | timefilter}}</span>
                            <span v-else>未分配</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
                            <span v-if="item.finishDate">{{item.finishDate | timefilter}}</span>
                            <span v-else>未送达</span>
                        </div>
                    </div>
                </div>
                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{dayShiftInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- dayShift report end -->

        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import VueDatepickerLocal from "vue-datepicker-local";
import tipsBox from "@/components/tipsBox.vue"
import axios from "axios";
import config from "../../../public/js/config.js";

export default {
    components:{
        VueDatepickerLocal,
        tipsBox
    },

    data(){
        return {
            isShowDayShiftMission: false,
            isShowDayShiftCheckCar:false,
            startDate: null,
            endDate: null,
            searchType: 'all',
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            dayShiftInfo: [],
            checkerArray: []
        }
    },

    methods:{
        findDayReport() {
            if (!this.startDate || !this.endDate) {
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择开始时间和结束时间'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            } else {
                let start = new Date(this.startDate).toDateString();
                start = new Date(start).getTime();
                let end = new Date(this.endDate).toDateString();
                end = new Date(end).getTime();
                axios
                    .post(config.server + "/dayShiftmission/findall", {
                        startDate: start, 
                        endDate: end,
                        searchType: this.searchType
                    })
                    .then(doc => {
                        if (doc.data.code === 1) {
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '未找到该数据'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        } else if (doc.data.code === 0) {
                            this.dayShiftInfo = doc.data.doc;
                        } else {
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '查找时出现错误'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        findDayShiftCheckCarMethod(){
            console.log('123')
            if (!this.startDate || !this.endDate) {
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择开始时间和结束时间'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else{
                axios
                    .post(config.server + "/checkWorkerDayShift/find", {
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                    .then(doc => {
                        let errPartNum = []; //统计错误部件数量
                        if (doc.data.code === 0) {
                            this.checkerArray = doc.data.doc;
                            let brakeLightErrNum = 0;
                            let headlightErrNum = 0;
                            let petrolCardErrNum = 0;
                            let tyreErrNum = 0;
                            let otherErrNum = 0;
                            this.checkerArray.forEach(element => {
                                let tempWrongNum = 0;
                                element.missionList.forEach(element2 => {
                                    let tempCarInfo = {
                                        carPlate: null,
                                        wrongNum: 0
                                    };
                                    let thisCarErrNum = 0;
                                    //记录当天检查错误总数 start
                                    if (!element2.brakeLight) {
                                        tempWrongNum++;
                                        thisCarErrNum++;
                                        brakeLightErrNum++;
                                    }
                                    if (!element2.headlight) {
                                        tempWrongNum++;
                                        thisCarErrNum++;
                                        headlightErrNum++;
                                    }
                                    if (!element2.petrolCard) {
                                        tempWrongNum++;
                                        thisCarErrNum++;
                                        petrolCardErrNum++;
                                    }
                                    if (!element2.tyre) {
                                        tempWrongNum++;
                                        thisCarErrNum++;
                                        tyreErrNum++;
                                    }
                                    if (element2.note) {
                                        tempWrongNum++;
                                        thisCarErrNum++;
                                        otherErrNum++;
                                    }
                                    //记录当天检查错误总数 end
                                    tempCarInfo.carPlate =
                                        element2.carPlate;
                                    tempCarInfo.wrongNum = thisCarErrNum;
                                    this.tempCar.push(tempCarInfo);
                                });
                                this.wrongNumArray.push(tempWrongNum);
                            });
                            let newArray = combination(this.tempCar);
                            let newTitle = [];
                            let newContent = [];
                            newArray.forEach(element => {
                                newTitle.push(element.carPlate);
                                newContent.push(element.wrongNum);
                            });
                            errPartNum.push(brakeLightErrNum);
                            errPartNum.push(headlightErrNum);
                            errPartNum.push(petrolCardErrNum);
                            errPartNum.push(tyreErrNum);
                            errPartNum.push(otherErrNum);
                            //show chart method start
                            setTimeout(() => {
                                let checkertleft = document.getElementById(
                                    "checkertleft"
                                );
                                let myChart2 = new Chart(checkertleft, {
                                    type: "doughnut",
                                    data: {
                                        labels: newTitle,
                                        datasets: [
                                            {
                                                label: "carErrorNum",
                                                backgroundColor:
                                                    "rgba(225,10,10,0.3)",
                                                borderColor:
                                                    "rgba(225,103,110,1)",
                                                borderWidth: 1,
                                                pointStrokeColor: "#fff",
                                                pointStyle: "crossRot",
                                                data: newContent,
                                                cubicInterpolationMode:
                                                    "monotone",
                                                spanGaps: "false",
                                                fill: "false",
                                                backgroundColor: [
                                                    "aqua",
                                                    "#36a2eb",
                                                    "fuchsia",
                                                    "rgb(255, 99, 132)",
                                                    "rgb(255, 205, 86)",
                                                    "lime",
                                                    "#393939",
                                                    "#f5b031",
                                                    "#fad797",
                                                    "#59ccf7",
                                                    "#c3b4df"
                                                ],
                                                borderColor: ["#fff"],
                                                borderWidth: 2
                                            }
                                        ]
                                    },
                                    options: {
                                        legend: {
                                            display: true,
                                            labels: {
                                                fontColor:
                                                    "rgb(255, 99, 132)"
                                            }
                                        }
                                    }
                                });
                            }, 100);

                            setTimeout(() => {
                                let checkertRight = document.getElementById(
                                    "checkertright"
                                );
                                let myChart2 = new Chart(checkertRight, {
                                    type: "bar",
                                    data: {
                                        labels: [
                                            "刹车灯",
                                            "大灯",
                                            "油卡",
                                            "轮胎",
                                            "其他"
                                        ],
                                        datasets: [
                                            {
                                                label: "损坏部件统计",
                                                backgroundColor:
                                                    "rgba(225,10,10,0.3)",
                                                borderColor:
                                                    "rgba(225,103,110,1)",
                                                borderWidth: 1,
                                                pointStrokeColor: "#fff",
                                                pointStyle: "crossRot",
                                                data: errPartNum,
                                                cubicInterpolationMode:
                                                    "monotone",
                                                spanGaps: "false",
                                                fill: "false",
                                                backgroundColor: [
                                                    "aqua",
                                                    "#36a2eb",
                                                    "fuchsia",
                                                    "rgb(255, 99, 132)",
                                                    "rgb(255, 205, 86)",
                                                    "lime"
                                                ],
                                                borderColor: ["#fff"],
                                                borderWidth: 2
                                            }
                                        ]
                                    },
                                    options: {}
                                });
                            }, 200);
                            //show chart method end
                        } else {
                            this.tipsMsg = "查询数据出现错误";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
    }
}
</script>

<style scoped>
.dayshift_toparea_button{
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 660px;
    margin: 0 auto;
}

.dayshift_toparea_button_area{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    height: 60px;
}

.dayshift_radio_frame{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    line-height: 30px;
}

.dayshift_radio_item{
    font-size: 14px;
    padding-right: 10px;
    display: flex;
    display: -webkit-flex;
}

.dayshift_radio_item_left{
    padding-top: 3px;
}

.dayshift_radio_item input{
    width: 18px;
    height: 18px;
}

.dayshift_bluebutton{
    height: 30px;
    line-height: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 80px;
    border-radius: 5px;
    background-color: #448aff;
    color: #fff;
    cursor: pointer;
}

.dayshift_toparea_button_area_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-bottom: 8px;
}

.dayshift_toparea_datepicker_area{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
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
</style>

