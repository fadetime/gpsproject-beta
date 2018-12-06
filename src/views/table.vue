<template>
    <div id="tablepage">
        <div class="toparea">
            <div style="height: 58px;position: relative;z-index:23;padding-left:6px;background:#fff">
                <vue-datepicker-local v-model="startDate"
                                      style="margin-top: 12px;"
                                      placeholder="开始时间" />
                <span>~</span>
                <vue-datepicker-local v-model="endDate"
                                      style="margin-top: 12px;"
                                      placeholder="结束时间" />
                <md-button class="md-raised md-primary"
                           @click="findReport"
                           style="font-size:18px;width:80px;height:30px;margin-top:13px">查询</md-button>
                <md-button class="md-raised md-primary"
                           @click="moreSearchInfo = !moreSearchInfo"
                           style="font-size:18px;width:80px;height:30px;margin-top:13px">更多</md-button>
            </div>
            <transition name="custom-classes-transition"
                        enter-active-class="animated slideInDown faster"
                        leave-active-class="animated slideOutUp faster">
                <div v-if="moreSearchInfo"
                     style="display:flex;display:-webkit-flex;justify-content: center;padding-bottom:10px">
                    <div>
                        <span style="font-size:18px;color:#6a6a6a;line-height: 34px;">选择司机：</span>
                    </div>
                    <div style="border:1px solid #e0e0e0;width:218px;height:34px;line-height:34px;cursor: pointer;"
                         @click="openDriverBox">
                        <span style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{driverText}}</span>
                    </div>
                </div>
            </transition>
        </div>

        <!-- check car report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="tableInfo.length != 0">
                <div class="centerarea-head">
                    <span>出车收车情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>出车时间</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>收车时间</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>框数(前)</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>框数(后)</span>
                    </div>
                    <div style="flex-basis: 7%;text-align: center;">
                        <span>干净</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in tableInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 4%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 10%;text-align: center;">
                            <span>{{item.driver}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.date | timefilter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.finishDate | timefilter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.boxNum}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.boxNumAgain}}</span>
                        </div>
                        <div style="flex-basis: 7%;text-align: center;">
                            <span>{{item.clean}}</span>
                        </div>
                    </div>
                </div>
                <div class="centerarea-bottom">
                    <span>带出框数{{startBox}};</span>
                    <span>带回框数{{endBox}};</span>
                    <span>共</span>
                    <span>{{tableInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- check car report end -->

        <!-- mission report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="missionInfo.length != 0">
                <div class="centerarea-head">
                    <span>司机任务情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>任务日期</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>使用车辆</span>
                    </div>
                    <div style="flex-basis: 7%;text-align: center;">
                        <span>客户数</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in missionInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 4%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 10%;text-align: center;">
                            <span>{{item.missiondirver}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.missiondate | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.missioncar}}</span>
                        </div>
                        <div style="flex-basis: 7%;text-align: center;">
                            <span>{{item.missionclient.length}}</span>
                        </div>
                    </div>
                </div>
                <div class="centerarea-bottom">
                    <span>客户总数{{countClient}};</span>
                    <span>客户平均数{{averageClient}};</span>
                    <span>共</span>
                    <span>{{missionInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- mission report end -->

        <!-- driver choise box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isOpenDriverBox"
                 class="driverbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isOpenDriverBox"
                 class="driverbox-front"
                 @click.self.prevent="isOpenDriverBox = false">
                <div class="driver-front-box">
                    <div class="driver-front-box-title">
                        <span>司机选择</span>
                    </div>
                    <div class="driver-front-box-body"
                         style="width:300px">
                        <div class="driver-front-box-body-title">
                            <div class="driver-front-box-body-left">
                                <span>No.</span>
                            </div>
                            <div class="driver-front-box-body-right">
                                <span>司机姓名</span>
                            </div>
                        </div>
                        <div class="driver-front-box-body-center"
                             v-for="(item,index) in driverArray"
                             :key="index"
                             @click="choiseDriverMethod(item)">
                            <div class="driver-front-box-body-left">
                                <span>{{index + 1}}</span>
                            </div>
                            <div class="driver-front-box-body-right">
                                <span>{{item.dirvername}}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="moreSearchInfo = !moreSearchInfo"
                                   style="font-size:18px;width:80px;height:30px;margin-top:13px">
                            <span>关闭</span>
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- driver choise box end -->

        <!-- tips box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated bounceIn"
                    leave-active-class="animated bounceOut faster">
            <div v-if="isOpenTipBox"
                 class="tipBox-front"
                 @click.self.prevent="isOpenTipBox = false">
                <div class="tip-front-box"
                     style="display: flex;display:-webkit-flex;">
                    <div>
                        <md-icon class="md-size-2x"
                                 style="color:#ffab40">report_problem</md-icon>
                    </div>
                    <div style="font-size:16px;line-height:48px">
                        <span>{{tipsMsg}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- tips box end -->
    </div>
</template>

<script>
import VueDatepickerLocal from "vue-datepicker-local"; //时间选择组件
import axios from "axios";
import config from "../../public/js/config.js";

export default {
    name: "tablePage",
    components: {
        VueDatepickerLocal
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            tableInfo: [],
            missionInfo:[],
            startBox: 0,
            countClient:0,
            averageClient:0,
            endBox: 0,
            moreSearchInfo: false,
            isOpenDriverBox: false,
            driverArray: [],
            choiseDriver: null,
            driverText: "请点击选择",
            isOpenTipBox: false,
            tipsMsg: null
        };
    },
    methods: {
        choiseDriverMethod(item) {
            this.choiseDriver = item;
            this.driverText = item.dirvername;
            this.isOpenDriverBox = false;
        },
        openDriverBox() {
            this.isOpenDriverBox = true;
            axios
                .get(config.server + "/dirver")
                .then(doc => {
                    console.log(doc);
                    this.driverArray = doc.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        findReport() {
            if (!this.startDate || !this.endDate) {
                this.tipsMsg = "请选择开始时间和结束时间！！！";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            } else {
                let start = new Date(this.startDate).toDateString();
                start = new Date(start).getTime();
                let end = new Date(this.endDate).toDateString();
                end = new Date(end).getTime();
                if (this.moreSearchInfo) {
                    if (this.driverText === "请点击选择") {
                        this.tipsMsg = "请选择司机！！！";
                        this.isOpenTipBox = true;
                        setTimeout(() => {
                            this.isOpenTipBox = false;
                        }, 3000);
                    } else {
                        axios
                            .post(config.server + "/report/bydriver", {
                                startDate: start,
                                endDate: end,
                                driverName: this.driverText
                            })
                            .then(doc => {
                                if (doc.data.code === 1) {
                                    this.tipsMsg = "未找到该数据！！！";
                                    this.isOpenTipBox = true;
                                    setTimeout(() => {
                                        this.isOpenTipBox = false;
                                    }, 3000);
                                } else {
                                    this.tableInfo = doc.data.doc;
                                    this.startBox = 0;
                                    this.endBox = 0;
                                    doc.data.doc.forEach(element => {
                                        this.startBox += element.boxNum;
                                        this.endBox += element.boxNumAgain;
                                    });
                                }
                                this.findMissionReport();
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                } else {
                    axios
                        .post(config.server + "/report/check", {
                            startDate: start,
                            endDate: end
                        })
                        .then(doc => {
                            if (doc.data.code === 1) {
                                this.tipsMsg = "未找到该数据！！！";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            } else {
                                console.log(doc);
                                this.tableInfo = doc.data.doc;
                                this.startBox = 0;
                                this.endBox = 0;
                                doc.data.doc.forEach(element => {
                                    this.startBox += element.boxNum;
                                    this.endBox += element.boxNumAgain;
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        },

        findMissionReport() {
            let start = new Date(this.startDate).toDateString();
            start = new Date(start).getTime();
            let end = new Date(this.endDate).toDateString();
            end = new Date(end).getTime();
            axios
                .post(config.server + "/report/findmission", {
                    startDate: start,
                    endDate: end,
                    driverName: this.driverText
                })
                .then(doc => {
                    this.missionInfo = doc.data.doc
                    doc.data.doc.forEach(element => {
                       this.countClient += element.missionclient.length
                    });
                    this.averageClient = Math.ceil(this.countClient/doc.data.doc.length)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
#tablepage {
    padding-top: 20px;
    width: 80%;
    margin: 0 auto;
}

.toparea {
    width: 660px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.centerarea {
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.centerarea-head {
    font-size: 18px;
    padding-top: 12px;
    padding-bottom: 12px;
    color: #6a6a6a;
}

.centerarea-title {
    font-size: 18px;
    display: flex;
    display: -webkit-flex;
    color: #6a6a6a;
    border-bottom: 1px solid #e0e0e0;
    height: 25px;
    margin: auto 10px;
    justify-content: space-around;
}

.centerarea-body {
    color: #212121;
    margin: auto 10px;
    height: 40vh;
    overflow-y: auto;
    overflow-y: hidden;
}

.centerarea-body-item {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
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

.driverbox-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.driverbox-front {
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

.tipBox-front {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}
.driver-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
}

.tip-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
    border-top: 1px solid #ffab40;
}

.driver-front-box-title {
    height: 40px;
    color: #fff;
    background: #ff5252;
    font-size: 18px;
    line-height: 40px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.driver-front-box-body {
    padding-top: 10px;
}

.driver-front-box-body-title {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    color: #6a6a6a;
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
    line-height: 40px;
}

.driver-front-box-body-center {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
}

.driver-front-box-body-center:hover {
    background: #e0e0e0;
}
.driver-front-box-body-left {
    flex-basis: 20%;
}

.driver-front-box-body-right {
    flex-basis: 80%;
}
</style>
