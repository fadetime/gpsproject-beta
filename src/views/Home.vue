<template>
<div id="home">
    <div class="topbutton">
        <div class="topbutton-left">
            <md-datepicker v-model="selectedDate" md-immediately md-closed="getMission()" />
        </div>
        <div class="topbutton-right">
            <md-button class="md-raised" @click="addMission">新建任务</md-button>
        </div>
    </div>
    <div class="centertable" v-if="allmission.length != 0">
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
            <div class="tabletitle-item">
                <span>报表</span>
            </div>
        </div>
        <div class="tablebody">
            <md-card md-with-hover v-for="(item,index) in allmission" :key="index" style="background-color: #eff3f5">
                <md-card-content>
                    <div @click="test" class="tabletitle2">
                        <span class="tabletitle-item">{{item.missionline}}</span>
                        <span class="tabletitle-item">{{item.missiondirver}}</span>
                        <span class="tabletitle-item">{{item.missioncar}}</span>
                        <span class="tabletitle-item">已送数量</span>
                        <span class="tabletitle-item">{{item.missionclient.length}}</span>
                        <span class="tabletitle-item">{{item.missionphone}}</span>
                        <span class="tabletitle-item">报表</span>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
    <div v-else>
        <img src="../../public/img/ebuyLogo.png" alt="easylogo" style="margin:200px auto">
    </div>
    <!-- add dialog start -->
    <md-dialog :md-active.sync="addDialog">
        <md-dialog-title>添加今日任务</md-dialog-title>
        <md-steppers md-linear :md-active-step.sync="active">
            <md-step id="first" md-label="选择车次" :md-done.sync="first" :md-error="firstStepError">

                <div>
                    <md-field>
                        <label for="choseLine">选择出车线路</label>
                        <md-select v-model="choseLine" name="choseLine" id="choseLine" md-dense @md-selected="getLineInfo">
                            <md-option :value="item._id" v-for="(item,index) in alltimesinfo" :key="index">{{item.timesname}}</md-option>
                        </md-select>
                    </md-field>
                </div>

                <div>
                    <p>线路名称：{{aLineInfo.timesname}}</p>
                    <p>线路备注：{{aLineInfo.timesnote}}</p>
                </div>

                <div style="text-align:center">
                    <md-button class="md-raised md-primary " @click="setDone('first', 'second')">Continue</md-button>
                </div>

            </md-step>

            <md-step id="second" md-label="司机车辆" :md-done.sync="second">
                <div>
                    <div class="step-second">
                        <div class="step-second-item">
                            <md-card md-with-hover>
                                <md-card-header>
                                    <div class="md-title">司机信息</div>
                                    <div class="md-subhead">请确认详细信息</div>
                                </md-card-header>

                                <md-card-content v-if="aLineInfo">
                                    <p>司机姓名：{{aLineInfo.timesdirver.dirvername}}</p>
                                    <p>司机电话：{{aLineInfo.timesdirver.dirverphone}}</p>
                                    <p>司机驾照：{{aLineInfo.timesdirver.dirvercard}}</p>
                                    <p>司机备注：{{aLineInfo.timesdirver.dirvernote}}</p>
                                </md-card-content>

                            </md-card>
                        </div>

                        <div class="step-second-item">
                            <md-card md-with-hover>
                                <md-card-header>
                                    <div class="md-title">车辆信息</div>
                                    <div class="md-subhead">请确认详细信息</div>
                                </md-card-header>

                                <md-card-content v-if="aLineInfo">
                                    <p>车牌号码：{{aLineInfo.timescar.carid}}</p>
                                    <p>车牌型号：{{aLineInfo.timescar.cartype}}</p>
                                    <p>车牌尺寸：{{aLineInfo.timescar.carsize}}</p>
                                    <p>车牌备注：{{aLineInfo.timescar.carnote}}</p>
                                </md-card-content>

                            </md-card>
                        </div>

                    </div>
                    <div style="text-align:center">
                        <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Continue</md-button>
                    </div>
                </div>

            </md-step>

            <md-step id="third" md-label="确认客户">
                <div class="step-third">

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
                            客户地址
                        </div>
                        <div class="step-third-title-item">
                            服务商
                        </div>
                    </div>
                    <div style="overflow:auto;height:500px">
                        <md-card md-with-hover v-for="(item,index) in allclientbinfo" :key="index" style="background-color: #f4f4f4">
                            <md-card-content>
                                <input type="checkbox" :id="index" :value="item" v-model="aLineInfo.timesclientb">
                                <label :for="index" class="step-third-title">
                                        <span class="step-third-title-item">{{item.clientbname}}</span>
                                        <span class="step-third-title-item">{{item.clientbphone}}</span>
                                        <span class="step-third-title-item">{{item.clientbpostcode}}</span>
                                        <span class="step-third-title-item">{{item.clientbaddress}}</span>
                                        <span class="step-third-title-item">{{item.clientbserve.clientaname}}</span>
                                    </label>

                            </md-card-content>
                        </md-card>
                    </div>
                    <div style="text-align:center">
                        <md-button class="md-raised md-primary" @click="saveMission">SAVE</md-button>
                    </div>

                </div>
            </md-step>
        </md-steppers>
    </md-dialog>
    <!-- add dialog end -->

    <!-- detail dialog start -->
    <md-dialog :md-active.sync="detaildialog">
        <md-dialog-title>任务详情</md-dialog-title>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>

        <md-dialog-actions>
            <md-button class="md-primary" @click="detaildialog = false">Close</md-button>
            <md-button class="md-primary" @click="detaildialog = false">Save</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- detail dialog start -->

    <!-- error dialog start -->
    <md-dialog-alert :md-active.sync="error" :md-content="errormsg" md-confirm-text="关闭" />
    <!-- error dialog end -->
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'home',
    data() {
        return {
            selectedDate: new Date(),
            active: 'first',
            addDialog: false,
            first: false,
            second: false,
            third: false,
            choseLine: '',
            allmission: [],
            allclientbinfo: [],
            choseClientB: [],
            alltimesinfo: [],
            aLineInfo: '',
            dirvername: '',
            selected: [],
            allclientainfo: [],
            detaildialog: false,
            error: false,
            errormsg: '发生未知错误',
            firstStepError: null
        }
    },
    watch: {
        selectedDate: function () {
            axios.post('//127.0.0.1:3000/mission', {
                    startdate: this.selectedDate
                })
                .then(res => {
                    this.allmission = res.data
                })
                .catch(err => {
                    console.log('获取数据失败')
                    console.log(err)
                })
        }
    },
    mounted() {
        this.getLineInfo()
        this.getallclienta()
        this.getMission()
    },
    methods: {
        testset(item) {
            console.log(item)
        },
        test() {
            this.detaildialog = true
            console.log('#####')
        },
        getMission() {
            setTimeout(() => {
                axios.post('//127.0.0.1:3000/mission', {
                        startdate: this.selectedDate
                    })
                    .then(res => {
                        console.log('数据获取成功')
                        console.log(res.data)
                        this.allmission = res.data
                    })
                    .catch(err => {
                        console.log('获取数据失败')
                        console.log(err)
                    })
            }, 100)
        },

        setDone(id, index) {

            if (this.choseLine == '') {
                this.firstStepError = ' '
            } else {
                this[id] = true
                this.firstStepError = null
                if (index) {
                    this.active = index
                }
            }
        },

        addMission() {
            this.getallclientb()
            this.getalltimes()
            this.addDialog = true

        },

        getalltimes() {
            axios.get('//127.0.0.1:3000/times')
                .then((res) => {
                    this.alltimesinfo = res.data.doc
                }).catch((err) => {
                    console.log(err)
                })
        },

        getLineInfo() {
            if (this.choseLine == '') {
                this.aLineInfo = {
                    timesname: '请选择线路',
                    timesnote: '请选择线路',
                    timesdirver: {
                        dirvername: '请选择线路',
                        dirverphone: '请选择线路',
                        dirvercard: '请选择线路',
                        dirvernote: '请选择线路'
                    },
                    timescar: {
                        carid: '请选择线路',
                        carnote: '请选择线路',
                        carsize: '请选择线路',
                        cartype: '请选择线路'
                    }
                }
            } else {
                this.aLineInfo = this.alltimesinfo.find((element) => (
                    element._id == this.choseLine
                ))
                this.aLineInfo.timesclientb.forEach(element => {
                    if (element.clientbserve == null) {
                        element.clientbserve = {
                            clientaname: '客户未包含服务商'
                        }
                    }
                });
            }
        },
        getallclienta() {
            axios.get('//127.0.0.1:3000/clienta')
                .then((res) => {
                    this.allclientainfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getallclientb() {
            axios.get('//127.0.0.1:3000/clientb')
                .then((res) => {
                    this.allclientbinfo = res.data
                    this.allclientbinfo.forEach(element => {
                        if (element.clientbserve == null) {
                            element.clientbserve = {
                                clientaname: '客户未包含服务商'
                            }
                        }
                    });
                    console.log(this.allclientbinfo)
                }).catch((err) => {
                    console.log(err)
                })
        },

        saveMission() {
            this.aLineInfo.timesclientb.forEach(element => {
                if (element.clientbserve == null) {
                    element.clientbserve = {
                        clientaname: '客户未包含服务商'
                    }
                }
            });
            let query = {
                missionline: this.aLineInfo.timesname,
                missionnote: this.aLineInfo.timesnote,
                missiondirver: this.aLineInfo.timesdirver.dirvername,
                missionphone: this.aLineInfo.timesdirver.dirverphone,
                missioncar: this.aLineInfo.timescar.carid,
                missionclient: this.aLineInfo.timesclientb.map((item) => {
                    let obj = {
                        clientbname: item.clientbname,
                        clientbaddress: item.lientbaddress,
                        clientbphone: item.clientbphone,
                        clientbpostcode: item.clientbpostcode,
                        clientbserve: item.clientbserve.clientaname
                    }
                    return obj
                })
            }
            console.log(query)
            axios.post('//127.0.0.1:3000/mission/create', query)
                .then(res => {
                    this.error = true
                    this.errormsg = res.data.msg
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                    if (res.data.code == 0) {
                        this.addDialog = false
                    }
                })
                .catch(err => {
                    this.error = true
                    this.errormsg = err
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                })
        }
    }
}
</script>

<style scoped>
.testclass {
    border: none;
    border-bottom: 1px solid;
}

#home {
    width: 80%;
    margin: 0 auto;
}

.topbutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.topbutton-left {
    flex-basis: 30%;
    text-align: left;
    margin: 0 auto;
}

.topbutton-right {
    margin: 0 auto;
    flex-basis: 50%;
    text-align: right;
}

.centertable {
    background-color: #eff3f5;
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
    width: 100px;
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
    margin: 0 auto;
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
    flex-basis: 20%;
    text-align: center;
}
</style>
