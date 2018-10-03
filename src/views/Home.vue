<template>
    <div id="home">
        <div class="topbutton">
            <div class="topbutton-left">
                <md-datepicker v-model="selectedDate" md-immediately md-closed="getMission()" style="border-radius: 0;" />
            </div>
            <div class="topbutton-right" style="padding-top:10px">
                <md-button class="md-raised md-primary" @click="addMission" style="font-size:20px;width:100px;height:40px;">新建任务</md-button>
            </div>
        </div>
        <div class="centertable" v-if="allmission.length != 0">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item">
                            <span>车次</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>司机</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>车牌号</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>已送</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>总量</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>联系方式</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <div class="tablebody">
                <md-card md-with-hover v-for="(item,index) in allmission" :key="index" style="background-color: #eff3f5">
                    <md-card-content>
                        <div @click="openMissionInfo(item)" class="tabletitle2">
                            <span class="tabletitle-item">{{item.missionline}}</span>
                            <span class="tabletitle-item">{{item.missiondirver}}</span>
                            <span class="tabletitle-item">{{item.missioncar}}</span>
                            <span class="tabletitle-item">{{item.count}}</span>
                            <span class="tabletitle-item">{{item.missionclient.length}}</span>
                            <span class="tabletitle-item">{{item.missionphone}}</span>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <div v-else>
            <img src="../../public/img/ebuyLogo.png" alt="easylogo" style="margin:100px auto;width:500px">
        </div>
            <!-- add dialog start -->
            <md-dialog :md-active.sync="addDialog" style="width:900px">
                <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:4px">
                    <span style="color:#fff">添加今日任务</span>
                </md-dialog-title>
                <md-steppers md-linear :md-active-step.sync="active">
                    <md-step id="first" md-label="选择车次" :md-done.sync="first" :md-error="firstStepError">
                        <div class="dialog-first-body">
                            <div class="dialog-first-body-left">
                                <div class="container">
                                    <div class="custom-selector">
                                        <div class="selector-header" style="position:relative" @click="callBody">
                                            <div style="background:#eee;padding:10px;text-align:center;font-size:20px">{{selectorText}}</div>
                                            <div style="position:absolute;top:0;right:0">
                                                <img src="../../public/img/icons/arrowDown.png" alt="" style="width:40px" class="arrow">
                                        </div>
                                            </div>
                                            <div class="selector-body">
                                                <div class="box" v-for="(item,index) in alltimesinfo" :key="index" @click="choseitem(item)">
                                                    <span style="font-size:20px">{{item.timesname}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="dialog-first-body-right">
                                    <md-card md-with-hover style="width:90%;background-color: #eee">
                                        <md-card-header>
                                            <div class="md-title" style="font-size:20px;text-align:left">
                                                <span>线路信息</span>
                                            </div>
                                            <div class="md-subhead" style="font-size:15px;text-align:left">
                                                <span>请确认详细信息</span>
                                            </div>
                                        </md-card-header>

                                        <md-card-content v-if="aLineInfo">
                                            <div style="margin:0 20px">
                                                <div style="text-align:left;margin:10px 0">
                                                    <span style="font-size:20px">线路名称：{{aLineInfo.timesname}}</span>
                                                </div>
                                                <div style="text-align:left;margin:10px 0">
                                                    <span style="font-size:20px">线路备注：{{aLineInfo.timesnote}}</span>
                                                </div>
                                            </div>
                                        </md-card-content>

                                    </md-card>
                                </div>
                            </div>

                            <div style="text-align:center">
                                <md-button class="md-raised md-primary " @click="setDone('first', 'second')">下一步</md-button>
                            </div>

                    </md-step>

                    <md-step id="second" md-label="司机车辆" :md-done.sync="second" :md-error="secondStepError">
                        <div>
                            <div class="step-second" id="addmissionsecond">
                                <div class="step-second-item">

                                    <div class="container">
                                        <div class="custom-selector">
                                            <div class="selector-header" style="position:relative" @click="callDriver">
                                                <div style="background:#eee;padding:10px;text-align:center;font-size:20px">{{selectorDriver.dirvername}}</div>
                                                <div style="position:absolute;top:0;right:0">
                                                    <img src="../../public/img/icons/arrowDown.png" alt="" style="width:40px" class="arrow" id="selector-arrow-driver">
                                            </div>
                                                </div>
                                                <div class="selector-body" id="selector-body-driver">
                                                    <div class="box" id="selector-box-driver" v-for="(item,index) in alldirverinfo" :key="index" @click="choseDriverItem(item)">
                                                        <span style="font-size:20px">{{item.dirvername}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <md-card md-with-hover style="background-color: #eee">
                                            <md-card-header>
                                                <div class="md-title" style="font-size:20px;text-align:left">司机信息</div>
                                                <div class="md-subhead" style="font-size:15px;text-align:left">请确认详细信息</div>
                                            </md-card-header>

                                            <md-card-content v-if="aLineInfo">
                                                <div style="margin:0 20px">
                                                    <p style="font-size:20px">司机姓名：{{selectorDriver.dirvername}}</p>
                                                    <p style="font-size:20px">司机电话：{{selectorDriver.dirverphone}}</p>
                                                    <p style="font-size:20px">司机驾照：{{selectorDriver.dirvercard}}</p>
                                                    <p style="font-size:20px">司机备注：{{selectorDriver.dirvernote}}</p>
                                                </div>
                                            </md-card-content>

                                        </md-card>
                                    </div>

                                    <div class="step-second-item">

                                        <div class="container">
                                            <div class="custom-selector">
                                                <div class="selector-header" style="position:relative" @click="callCar">
                                                    <div style="background:#eee;padding:10px;text-align:center;font-size:20px">{{selectorCar.carid}}</div>
                                                    <div style="position:absolute;top:0;right:0">
                                                        <img src="../../public/img/icons/arrowDown.png" alt="arrowDown" style="width:40px" class="arrow" id="selector-arrow-car">
                                            </div>
                                                    </div>
                                                    <div class="selector-body" id="selector-body-car">
                                                        <div class="box" id="selector-box-car" v-for="(item,index) in allcarinfo" :key="index" @click="choseCarItem(item)">
                                                            <span style="font-size:20px">{{item.carid}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <md-card md-with-hover style="background-color: #eee">
                                                <md-card-header>
                                                    <div class="md-title" style="font-size:20px;text-align:left">车辆信息</div>
                                                    <div class="md-subhead" style="font-size:15px;text-align:left">请确认详细信息</div>
                                                </md-card-header>

                                                <md-card-content v-if="aLineInfo">
                                                    <div style="margin:0 20px">
                                                        <p style="font-size:20px">车牌号码：{{selectorCar.carid}}</p>
                                                        <p style="font-size:20px">车辆型号：{{selectorCar.cartype}}</p>
                                                        <p style="font-size:20px">有无尾门：{{selectorCar.tailgate}}</p>
                                                        <p style="font-size:20px">车辆备注：{{selectorCar.carnote}}</p>
                                                    </div>
                                                </md-card-content>

                                            </md-card>
                                        </div>

                                    </div>
                                    <div style="text-align:center">
                                        <md-button class="md-raised md-primary" @click="setDone('second', 'third')">下一步</md-button>
                                    </div>
                                </div>

                    </md-step>

                    <md-step id="third" md-label="确认客户" style="padding:0 24px">
                        <div style="display:flex;display: -webkit-flex;padding-bottom: 8px;justify-content: space-between;">
                            <div>
                                <input class="clientsearch" type="text" v-model="searchClient" @keyup.enter="searClientMethods" placeholder="搜索客户名称">
                            </div>
                                <div style="display: -webkit-flex;display: flex;">
                                    <div style="width:160px;padding-left: 10px;">
                                        <md-field style="padding-top:16px;margin: 0;">
                                            <md-select v-model="clientServe" name="clientServe" id="clientServe" placeholder="筛选服务商">
                                                <md-option :value="item._id" v-for="(item,index) in allclientainfo" :key="index">{{item.clientaname}}</md-option>
                                            </md-select>
                                        </md-field>
                                    </div>

                                    <div style="width:160px;padding-left: 10px;">
                                        <md-field style="padding-top:16px;margin: 0;">
                                            <md-select v-model="clientArea" name="clientArea" id="clientArea" placeholder="筛选客户地区">
                                                <md-option :value="item._id" v-for="(item,index) in areaArray" :key="index">{{item.areaName}}</md-option>
                                            </md-select>
                                        </md-field>
                                    </div>
                                </div>

                            </div>

                            <div class="step-third" style="border: 3px dashed #eee;padding: 5px;">

                                <div class="step-third-title">
                                    <div class="step-third-title-item">
                                        客户名称
                                    </div>
                                    <div class="step-third-title-item">
                                        客户电话
                                    </div>
                                    <div class="step-third-title-item">
                                        客户邮编
                                    </div>
                                    <div class="step-third-title-item">
                                        服务商
                                    </div>
                                    <div class="step-third-title-item">
                                        区域
                                    </div>
                                </div>
                                <div style="overflow:auto;height:300px">
                                    <md-card md-with-hover v-for="(item,index) in allclientbinfo" :key="index" style="background-color: #f4f4f4">
                                        <md-card-content>
                                            <div class="step-third-title-body">
                                                <label :for="index" class="step-third-title">
                                                    <input type="checkbox" :id="index" :value="item" v-model="aLineInfo.timesclientb" style="width:25px;height:25px">
                                                    <span class="step-third-title-item">{{item.clientbname}}</span>
                                                    <span class="step-third-title-item">{{item.clientbphone}}</span>
                                                    <span class="step-third-title-item">{{item.clientbpostcode}}</span>
                                                    <span class="step-third-title-item">{{item.clientbserve.clientaname}}</span>
                                                    <span class="step-third-title-item">{{item.clientbarea.areaName}}</span>
                                                </label>
                                            </div>
                                        </md-card-content>
                                    </md-card>
                                </div>
                                <div style="display:flex;justify-content: center;">
                                    <div class="client-page-bar" v-if=" clientTablePageCount != 1 && clientTablePageCount">
                                        <ul style="width:435px">
                                            <li @click="clientTablePageButton('A')">
                                                <span>上一页</span>
                                            </li>
                                            <li v-for="(item,index) in clientPages" :key="index" @click="clientTablePageButton(item)" :class="{'active':clientTablePageNow == item}">
                                                <span>{{item}}</span>
                                            </li>
                                            <li @click="clientTablePageButton('B')">
                                                <span>下一页</span>
                                            </li>
                                            <li>
                                                <span>共
                                                    <i>{{clientTablePageCount}}</i>页</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <div style="text-align:center">
                                <md-button class="md-raised md-primary" @click="saveMission">保存</md-button>
                            </div>
                    </md-step>
                </md-steppers>
            </md-dialog>
            <!-- add dialog end -->

            <!-- detail dialog start -->
            <md-dialog :md-active.sync="detaildialog" style="width: 800px;font-size:20px">
                <div style="text-align:center;font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:20px">
                    <span style="color:#fff">出车报表</span>
                </div>
                <div style="overflow:hidden auto">
                    <div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;width:90%;margin:0 auto;padding:5px 0">
                        <div style="flex-basis:30%;text-align:left;margin:0 auto" :title="missiondriver">
                            <span>司机:{{missiondriver}}</span>
                        </div>
                        <div style="flex-basis:30%;text-align:left;margin:0 auto;">
                            <span>车次:{{missionline}}</span>
                        </div>
                    </div>

                    <div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;width:90%;margin:0 auto;border-bottom:1px solid;padding:5px 0">
                        <div style="flex-basis:30%;text-align:left;margin:0 auto">
                            日期:{{missiondate}}
                        </div>
                        <div style="flex-basis:30%;text-align:left;margin:0 auto">
                            总单数:{{missioncount}}
                        </div>
                    </div>

                    <div style="padding:5px 0;border:1px solid #989898;width:90%;margin:10px auto">
                        <div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;font-weight:600;padding:5px 0">
                            <div style="flex-basis:30%;text-align:center;margin:0 auto">
                                <span>序号</span>
                            </div>
                            <div style="flex-basis:30%;text-align:center;margin:0 auto">
                                <span>名字</span>
                            </div>
                            <div style="flex-basis:30%;text-align:center;margin:0 auto">
                                <span>时间</span>
                            </div>
                        </div>
                        <div style="height:400px;overflow:auto;">
                            <div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;padding:5px 0" v-for="(item,index) in missionclient" :key="index">
                                <div style="flex-basis:30%;text-align:center;margin:0 auto">
                                    <span>{{index+1}}</span>
                                </div>
                                <div style="flex-basis:30%;text-align:center;margin:0 auto">
                                    {{item.clientbname}}
                                </div>
                                <div style="flex-basis:30%;text-align:center;margin:0 auto">
                                    <span v-if="item.finishdate">{{item.finishdate | timefilter}}</span>
                                    <span v-else style="color:#f9cf97">未送达</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <md-dialog-actions style="margin:0 auto 10px auto">
                    <md-button class="md-raised md-primary" @click="detaildialog = false" style="font-size:20px;width:100px;height:40px">关闭</md-button>
                    <md-button class="md-raised md-accent" @click="removeMission" style="font-size:20px;width:100px;height:40px">删除</md-button>
                </md-dialog-actions>
            </md-dialog>
            <!-- detail dialog start -->

            <!-- error dialog start -->
            <md-dialog-alert :md-active.sync="error" :md-content="errormsg" md-confirm-text="关闭" />
            <!-- error dialog end -->

            <!-- confirm dialog start -->
            <md-dialog :md-active.sync="confirmDialog">
                <md-dialog-title>确认删除此任务</md-dialog-title>

                <md-dialog-actions>
                    <md-button class="md-raised md-primary" @click="confirmDialog = false" style="font-size:20px;width:100px;height:40px">关闭</md-button>
                    <md-button class="md-raised md-accent" @click="confirmRemoveMission" style="font-size:20px;width:100px;height:40px">确认</md-button>
                </md-dialog-actions>
            </md-dialog>

            <!-- confirm dialog end -->
        </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";
import _ from "lodash";

export default {
    name: "home",
    data() {
        return {
            selectedDate: new Date(),
            active: "first",
            addDialog: false,
            confirmDialog: false,
            first: false,
            second: false,
            third: false,
            choseLine: "",
            allmission: [],
            allclientbinfo: [],
            alldirverinfo: [],
            allcarinfo: [],
            choseClientB: [],
            alltimesinfo: [],
            areaArray: [],
            aLineInfo: "",
            dirvername: "",
            selected: [],
            allclientainfo: [],
            detaildialog: false,
            error: false,
            errormsg: "发生未知错误",
            firstStepError: null,
            secondStepError: null,
            missionline: "",
            missiondriver: "",
            missioncar: "",
            missioncount: "",
            missionfinish: "",
            missionphone: "",
            missiondate: "",
            missionclient: [],
            missionid: "",
            selectorText: "请选择",
            selectorDriver: "",
            selectorCar: "",
            bodyShowFlag: false,
            driverShowFlag: false,
            clientArea: "",
            clientServe: "",
            testValue: [2],
            pageSize: 10,
            showItem: 5,
            searchClient: "",
            clientTablePageNow: 1,
            clientTablePageCount: 10,
            clientTableMode: ""
        };
    },
    computed: {
        clientPages: function() {
            let pag = [];
            if (this.clientTablePageNow < this.showItem) {
                //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                let i = Math.min(this.showItem, this.clientTablePageCount);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                //当前页数大于显示页数了
                let middle =
                        this.clientTablePageNow - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > this.clientTablePageCount - this.showItem) {
                    middle = this.clientTablePageCount - this.showItem + 1;
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag;
        }
    },
    watch: {
        selectedDate: function() {
            axios
                .post(config.server + "/mission", {
                    startdate: this.selectedDate
                })
                .then(res => {
                    this.allmission = res.data;
                })
                .catch(err => {
                    console.log("获取数据失败");
                    console.log(err);
                });
        },
        clientArea: function() {
            if (this.clientArea) {
                this.clientServe = "";
                this.searchClient = "";
                this.clientTableMode = "area";
                this.areaFilterMethod();
                // let newArray = this.allclientbinfo.filter(item => {
                //     return item.clientbarea._id === this.clientArea;
                // });
                // let longArray = _.concat(newArray, this.allclientbinfo);
                // this.allclientbinfo = _.uniq(longArray);
            }
        },
        clientServe: function() {
            if (this.clientServe) {
                this.clientArea = "";
                this.searchClient = "";
                this.clientTableMode = "serve";
                this.serveFilterMethod();
                // let newArray = this.allclientbinfo.filter(item => {
                //     return item.clientbserve._id === this.clientServe;
                // });
                // let longArray = _.concat(newArray, this.allclientbinfo);
                // this.allclientbinfo = _.uniq(longArray);
            }
        }
    },
    mounted() {
        this.getLineInfo();
        this.getallclienta();
        this.getMission();
        this.getAllArea();
    },
    methods: {
        searClientMethods() {
            this.clientArea = "";
            this.clientServe = "";
            if (!this.searchClient) {
                this.clientTablePageNow = 1;
                this.clientTableMode = "";
                this.getallclientb();
            } else {
                this.clientTableMode = "search";
                axios
                    .post(config.server + "/clientb/page", {
                        keyWord: this.searchClient,
                        pageSize: this.pageSize,
                        pageNow: this.clientTablePageNow
                    })
                    .then(res => {
                        this.allclientbinfo = res.data.doc;
                        this.clientTablePageCount = Math.ceil(
                            res.data.countNum / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        areaFilterMethod() {
            axios
                .post(config.server + "/clientb/filterpage", {
                    pageSize: this.pageSize,
                    pageNow: this.clientTablePageNow,
                    clientArea: this.clientArea
                })
                .then(res => {
                    this.allclientbinfo = res.data.doc;
                    this.ClientTablePageCount = Math.ceil(
                        res.data.countNum / this.pageSize
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        },

        serveFilterMethod() {
            axios
                .post(config.server + "/clientb/filterpage", {
                    pageSize: this.pageSize,
                    pageNow: this.clientTablePageNow,
                    clientServe: this.clientServe
                })
                .then(res => {
                    this.allclientbinfo = res.data.doc;
                    this.ClientTablePageCount = Math.ceil(
                        res.data.countNum / this.pageSize
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        },

        clientTablePageButton(item) {
            if (item === "A") {
                if (this.clientTablePageNow > 1) {
                    this.clientTablePageNow = this.clientTablePageNow - 1;
                }
            } else if (item === "B") {
                if (this.clientTablePageNow < this.clientTablePageCount) {
                    this.clientTablePageNow = this.clientTablePageNow + 1;
                }
            } else {
                this.clientTablePageNow = item;
            }
            if (this.clientTableMode === "search") {
                this.searClientMethods();
            } else if (this.clientTableMode === "area") {
                this.areaFilterMethod();
            } else if (this.clientTableMode === "serve") {
                this.serveFilterMethod();
            } else {
                axios
                    .post(config.server + "/clientb/active", {
                        pageSize: this.pageSize,
                        pageNow: this.clientTablePageNow
                    })
                    .then(res => {
                        this.allclientbinfo = res.data.doc;
                        this.clientTablePageCount = Math.ceil(
                            res.data.countNum / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        //remove mission start
        removeMission() {
            this.confirmDialog = true;
        },
        //remove mission end

        //confirm remove mission start
        confirmRemoveMission() {
            axios
                .post(config.server + "/mission/remove", {
                    missionid: this.missionid
                })
                .then(doc => {
                    this.confirmDialog = false;
                    if (doc.data.code == 0) {
                        this.getMission();
                        this.detaildialog = false;
                    }
                    this.error = true;
                    this.errormsg = doc.data.msg;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //confirm remove mission start

        // 下拉选择框部分 start

        callCar() {
            if (this.driverShowFlag) {
                this.bodyHideCar();
            } else {
                this.bodyShowCar();
            }
        },

        callDriver() {
            if (this.driverShowFlag) {
                this.bodyHideDriver();
            } else {
                this.bodyShowDriver();
            }
        },

        callBody() {
            if (this.bodyShowFlag) {
                this.bodyHide();
            } else {
                this.bodyShow();
            }
        },

        bodyShowCar() {
            let body = document.querySelector("#selector-body-car");
            let boxes = document.querySelectorAll("#selector-box-car");
            let arrow = document.querySelector("#selector-arrow-car");
            arrow.style.transform = "rotate(0deg)";
            body.style.height = "180px";
            arrow.style.transition = "0.25s";
            let height = 4;
            boxes.forEach(box => {
                height += box.clientHeight;
            });
            body.style.transition = "0.25s";
            body.style.display = "block";
            this.driverShowFlag = true;
        },

        bodyHideCar() {
            let body = document.querySelector("#selector-body-car");
            body.style.height = "0px";
            body.style.transition = "0.25s";
            let arrow = document.querySelector("#selector-arrow-car");
            arrow.style.transform = "rotate(-90deg)";
            arrow.style.transition = "0.25s";
            this.driverShowFlag = false;
        },

        bodyShowDriver() {
            let body = document.querySelector("#selector-body-driver");
            let boxes = document.querySelectorAll("#selector-box-driver");
            let arrow = document.querySelector("#selector-arrow-driver");
            arrow.style.transform = "rotate(0deg)";
            body.style.height = "180px";
            arrow.style.transition = "0.25s";
            let height = 4;
            boxes.forEach(box => {
                height += box.clientHeight;
            });
            body.style.transition = "0.25s";
            body.style.display = "block";
            this.driverShowFlag = true;
        },

        bodyHideDriver() {
            let body = document.querySelector("#selector-body-driver");
            body.style.height = "0px";
            body.style.transition = "0.25s";
            let arrow = document.querySelector("#selector-arrow-driver");
            arrow.style.transform = "rotate(-90deg)";
            arrow.style.transition = "0.25s";
            this.driverShowFlag = false;
        },

        bodyShow() {
            let body = document.querySelector(".selector-body");
            let boxes = document.querySelectorAll(".box");
            let arrow = document.querySelector(".arrow");
            arrow.style.transform = "rotate(0deg)";
            body.style.height = "180px";
            arrow.style.transition = "0.25s";
            let height = 4;
            boxes.forEach(box => {
                height += box.clientHeight;
            });
            body.style.transition = "0.25s";
            body.style.display = "block";
            this.bodyShowFlag = true;
        },
        bodyHide() {
            let body = document.querySelector(".selector-body");
            body.style.height = "0px";
            body.style.transition = "0.25s";
            let arrow = document.querySelector(".arrow");
            arrow.style.transform = "rotate(-90deg)";
            arrow.style.transition = "0.25s";
            this.bodyShowFlag = false;
        },

        choseCarItem(item) {
            this.bodyHideCar();
            this.selectorCar = item;
        },

        choseDriverItem(item) {
            this.bodyHideDriver();
            this.selectorDriver = item;
        },

        choseitem(item) {
            this.choseLine = item;
            this.bodyHide();
            this.aLineInfo = item;
            this.selectorText = item.timesname;

            if (this.choseLine.timescar == null) {
                this.choseLine.timescar = {
                    carid: "信息错误请更新",
                    tailgate: "信息错误请更新",
                    cartype: "信息错误请更新"
                };
            }

            if (this.choseLine.timesdirver == null) {
                this.choseLine.timesdirver = {
                    dirvername: "信息错误请更新",
                    dirverphone: "信息错误请更新",
                    dirvercard: "信息错误请更新"
                };
            }

            this.aLineInfo.timesclientb.forEach(element => {
                if (element.clientbserve == null) {
                    element.clientbserve = {
                        clientaname: "客户未包含服务商"
                    };
                }
            });
        },
        // 下拉选择框部分 end

        //获取所有司机数据 start
        getalldirver() {
            axios
                .get(config.server + "/dirver")
                .then(res => {
                    this.alldirverinfo = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取所有司机数据 end
        openMissionInfo(item) {
            let time = new Date(item.missiondate).toLocaleDateString();
            this.detaildialog = true;
            this.missionline = item.missionline;
            this.missiondriver = item.missiondirver;
            this.missioncar = item.missioncar;
            this.missioncount = item.missionclient.length;
            this.missionclient = item.missionclient;
            this.missionfinish = "finish";
            this.missionphone = item.missionphone;
            this.missiondate = time;
            this.missionid = item._id;
        },
        getMission() {
            setTimeout(() => {
                axios
                    .post(config.server + "/mission", {
                        startdate: this.selectedDate
                    })
                    .then(res => {
                        this.allmission = res.data;
                        this.countfinish();
                    })
                    .catch(err => {
                        console.log("获取数据失败");
                        console.log(err);
                    });
            }, 100);
        },

        countfinish() {
            this.allmission.forEach(x => {
                x.count = 0;
                x.missionclient.forEach(y => {
                    if (y.finishdate) {
                        x.count += 1;
                    }
                });
            });
        },
        setDone(id, index) {
            if (id == "first") {
                if (this.choseLine == "") {
                    this.firstStepError = " ";
                } else {
                    this[id] = true;
                    this.selectorDriver = {
                        dirvername: this.aLineInfo.timesdirver.dirvername,
                        dirverphone: this.aLineInfo.timesdirver.dirverphone,
                        dirvercard: this.aLineInfo.timesdirver.dirvercard,
                        dirvernote: this.aLineInfo.timesdirver.dirvernote
                    };
                    this.selectorCar = {
                        carid: this.aLineInfo.timescar.carid,
                        cartype: this.aLineInfo.timescar.cartype,
                        tailgate: this.aLineInfo.timescar.tailgate,
                        carnote: this.aLineInfo.timescar.carnote
                    };
                    this.firstStepError = null;
                    if (index) {
                        this.active = index;
                    }
                }
            }
            if (id == "second") {
                if (this.choseLine.timesdirver.dirvername == "信息错误请更新") {
                    this.secondStepError = " ";
                    this.error = true;
                    this.errormsg = "请更新司机信息";
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                }

                if (this.choseLine.timescar.carid == "信息错误请更新") {
                    this.secondStepError = " ";
                    this.error = true;
                    this.errormsg = "请更新车辆信息";
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                } else {
                    this[id] = true;
                    this.secondStepError = null;
                    if (index) {
                        this.active = index;
                    }
                }
            }
        },

        addMission() {
            this.getallclientb();
            this.getalltimes();
            this.getalldirver();
            this.getallcar();
            this.addDialog = true;
        },
        getAllArea() {
            axios
                .get(config.server + "/area")
                .then(doc => {
                    this.areaArray = doc.data.doc;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getalltimes() {
            axios
                .get(config.server + "/times")
                .then(res => {
                    this.alltimesinfo = res.data.doc;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getallcar() {
            axios
                .get(config.server + "/car")
                .then(res => {
                    this.allcarinfo = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getLineInfo(item) {
            this.aLineInfo = {
                timesname: "请选择线路",
                timesnote: "请选择线路",
                timesdirver: {
                    dirvername: "请选择线路",
                    dirverphone: "请选择线路",
                    dirvercard: "请选择线路",
                    dirvernote: "请选择线路"
                },
                timescar: {
                    carid: "请选择线路",
                    carnote: "请选择线路",
                    tailgate: "请选择线路",
                    cartype: "请选择线路"
                }
            };
        },
        getallclienta() {
            axios
                .get(config.server + "/clienta")
                .then(res => {
                    this.allclientainfo = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getallclientb() {
            axios
                .post(config.server + "/clientb/active", {
                    pageSize: this.pageSize,
                    pageNow: 1
                })
                .then(res => {
                    this.allclientbinfo = res.data.doc;
                    this.clientTablePageCount = Math.ceil(
                        res.data.countNum / this.pageSize
                    );
                    this.allclientbinfo.forEach(element => {
                        if (element.clientbserve == null) {
                            element.clientbserve = {
                                clientaname: "客户未包含服务商"
                            };
                        }
                        if (element.clientbarea == null) {
                            element.clientbarea = {
                                areaName: "客户未包含地区"
                            };
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        saveMission() {
            this.aLineInfo.timesclientb.forEach(element => {
                if (element.clientbserve == null) {
                    element.clientbserve = {
                        clientaname: "客户未包含服务商"
                    };
                }
            });
            let query = {
                missionline: this.aLineInfo.timesname,
                missionnote: this.aLineInfo.timesnote,
                missiondirver: this.selectorDriver.dirvername,
                missionphone: this.aLineInfo.timesdirver.dirverphone,
                missioncar: this.selectorCar.carid,
                missionclient: this.aLineInfo.timesclientb.map(item => {
                    let obj = {
                        clientbname: item.clientbname,
                        clientbaddress: item.clientbaddress,
                        clientbphone: item.clientbphone,
                        clientbpostcode: item.clientbpostcode,
                        clientbserve: item.clientbserve.clientaname,
                        image: item.image
                    };
                    return obj;
                })
            };
            axios
                .post(config.server + "/mission/create", query)
                .then(res => {
                    this.error = true;
                    this.errormsg = res.data.msg;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                    if (res.data.code == 0) {
                        this.addDialog = false;
                        this.getMission();
                    }
                })
                .catch(err => {
                    this.error = true;
                    this.errormsg = err;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                });
        }
    }
};
</script>

<style scoped>
#home {
    width: 80%;
    margin: 15px auto;
}

.topbutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.topbutton-left {
    flex-basis: 20%;
    text-align: left;
    margin: 0 auto;
}

.topbutton-right {
    margin: 0 auto;
    flex-basis: 70%;
    text-align: right;
}

.centertable {
    margin: 5px auto;
}

.tabletitle {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.tabletitle2 {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.tabletitle-item {
    margin: 0 auto;
    width: 250px;
    font-size: 20px;
    line-height: 50px;
}

.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column;
    flex-flow: column;
}

.step-second {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.step-second-item {
    margin: 10px auto;
    flex-basis: 45%;
    /* text-align: right; */
}

.step-third-title {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.step-third-title-item {
    margin: 0 auto;
    flex-basis: 16%;
    text-align: center;
    font-size: 18px;
}

.detailDialog-center {
    margin: 20px;
    font-size: 20px;
    width: 100%;
}

.detail-text-left {
    margin: 0 20px 0 0;
}

.detail-text-right {
    background-color: #f4f4f4;
}

.container {
    /* width: 30%; */
    margin: auto;
}

#addmissionsecond .container {
    margin: 0 auto 10px auto;
}

.arrow {
    transform: rotate(-90deg);
    transition: 0.25s;
}

.selector-header {
    cursor: pointer;
    width: 300px;
}

.selector-body {
    height: 0;
    transition: 0.25s;
    overflow: hidden;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    overflow: auto;
    position: absolute;
    z-index: 100;
    background-color: #eee;
}

.box {
    cursor: pointer;
    padding: 7px;
    border-bottom: 1px solid #eee;
    transition: 0.5s;
    width: 300px;
}

.box:hover {
    background-color: dodgerblue;
    color: white;
    transition: 0.5s;
}

.dialog-first-body {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 20px 0;
}

.dialog-first-body-left {
    margin: 0 auto;
    flex-basis: 30%;
    text-align: left;
}

.dialog-first-body-right {
    margin: 0 auto;
    flex-basis: 50%;
    text-align: center;
}

.clientsearch {
    margin: 16px auto 0 auto;
    border-radius: 10px;
    width: 300px;
    height: 32px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 16px;
}

.client-page-bar ul li {
    margin: 0;
    padding: 0;
}

.client-page-bar li {
    list-style: none;
    font-size: 14px;
}

.client-page-bar span {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer;
}

.client-page-bar span:hover {
    background-color: #eee;
}

.client-page-bar .active span {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}

.client-page-bar i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}

/*.step-third-title-body {
     display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
} */
</style>
