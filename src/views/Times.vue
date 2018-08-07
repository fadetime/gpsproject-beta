<template>
<div id="times">
    <div class="topbutton">
        <div class="topbutton-left">
            <input type="text" v-model="selectCar" @keyup.enter="search" placeholder="搜索车次信息">
        </div>
        <div class="topbutton-right">
            <md-button class="md-raised md-primary" @click="addbutton" style="font-size:20px;width:100px;height:40px;">+ 添加</md-button>
        </div>
    </div>

    <div class="centertable">
        <md-card style="background-color: #eff3f5">
            <md-card-content>
                <div class="tabletitle">
                    <div class="tabletitle-item">
                        <span>路线名称</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>包含客户数量</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>备注</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>出车次数</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>操作</span>
                    </div>
                </div>
            </md-card-content>
        </md-card>

        <md-card md-with-hover v-for="(item,index) in alltimesinfo" :key="index" style="background-color: #eff3f5;">
            <md-card-content>
                <div class="tablebody">
                    <div class="tabletitle-item">
                        <span>{{item.timesname}}</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>{{item.timesclientb.length}}</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>{{item.timesnote}}</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>{{item.timescount}}</span>
                    </div>
                    <div class="tabletitle-item">
                        <img src="../../public/img/icons/edit.png" alt="edit" @click="editbutton(item)" style="width:20px;margin:0 10px">
                        <img src="../..//public/img/icons/dele.png" alt="delete" @click="removebutton(item)" style="width:30px;margin:0 10px">
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>

    <!-- Dialog start-->
    <md-dialog :md-active.sync="showDialog" style="width:700px">
        <md-dialog-title style="font-size:20px">车次管理</md-dialog-title>

        <md-tabs md-dynamic-height>
            <md-tab md-label="添加车次" style="font-size:20px;color:#000">
                <md-field style="margin:45px auto;width:60%">
                    <label style="font-size:20px;color:#000">路线名称</label>
                    <md-input v-model="timesname" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-helper-text" style="font-size:20px;margin: -10px auto;" v-if="!timesname">车次标识信息，必填项目</span>
                </md-field>

                <md-field style="margin:45px auto;width:60%">
                    <label style="font-size:20px;color:#000">备注</label>
                    <md-input v-model="timesnote" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                </md-field>
            </md-tab>
            <md-tab md-label="配置车辆" style="font-size:20px;color:#000">
                <div class="dialog-3">
                    <div class="dialog-3-left">
                        <md-field style="margin:45px auto">
                            <label for="choicecar" style="font-size:20px;color:#000">选择车辆</label>
                            <md-select v-model="choicecar" name="choicecar" id="choicecar" @md-selected="getacar" style="border-bottom: 1px solid #000;font-size:25px;height:55px">
                                <md-option :value="item._id" v-for="(item,index) in allcarinfo" :key="index">{{item.carid}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="dialog-3-right">
                        <md-card md-with-hover style="width:350px;background-color: #eee;margin:0 auto">
                            <md-card-header>
                                <div class="md-title" style="font-size:20px;text-align:left">
                                    <span>线路信息</span>
                                </div>
                                <div class="md-subhead" style="font-size:15px;text-align:left">
                                    <span>请确认详细信息</span>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <div style="margin:20px">
                                    <div style="text-align:left;margin:10px 0"><span style="font-size:20px">所选车牌号码：{{acarinfo.carid}}</span></div>
                                    <div style="text-align:left;margin:10px 0"><span style="font-size:20px">所选有无尾门：{{acarinfo.tailgate}}</span></div>
                                    <div style="text-align:left;margin:10px 0"><span style="font-size:20px">所选出车次数：{{acarinfo.cartimes}}</span></div>
                                    <div style="text-align:left;margin:10px 0"><span style="font-size:20px">所选车辆类型：{{acarinfo.cartype}}</span></div>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                </div>

            </md-tab>
            <md-tab md-label="配置司机" style="font-size:20px;color:#000">
                <div class="dialog-3">
                    <div class="dialog-3-left">
                        <md-field style="margin:45px auto">
                            <label for="choicedirver" style="font-size:20px;color:#000">选择司机</label>
                            <md-select v-model="choicedirver" name="choicedirver" id="choicedirver" @md-selected="getadirver">
                                <md-option :value="item._id" v-for="(item,index) in alldirverinfo" :key="index">{{item.dirvername}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="dialog-3-right">
                        <md-card md-with-hover style="width:350px;background-color: #eee;margin:0 auto">
                            <md-card-header>
                                <div class="md-title" style="font-size:20px;text-align:left">
                                    <span>线路信息</span>
                                </div>
                                <div class="md-subhead" style="font-size:15px;text-align:left">
                                    <span>请确认详细信息</span>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <div style="margin:20px">
                                    <div style="text-align:left;margin:10px 0"><span style="font-size:20px">所选司机姓名：{{adirverinfo.dirvername}}</span></div>
                                    <div style="text-align:left;margin:10px 0"><span style="font-size:20px">司机准证号码：{{adirverinfo.dirverid}}</span></div>
                                    <div style="text-align:left;margin:10px 0"><span style="font-size:20px">司机驾照配型：{{adirverinfo.dirvercard}}</span></div>
                                    <div style="text-align:left;margin:10px 0"><span style="font-size:20px">司机电话号码：{{adirverinfo.dirverphone}}</span></div>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                </div>

            </md-tab>
            <md-tab md-label="配置客户">
                <md-field style="margin:45px auto;width:80%">
                    <label for="choiceclient" style="font-size:20px;color:#000">选择客户</label>
                    <md-select v-model="choiceclientb" name="choiceclientb" id="choiceclientb" md-dense multiple>
                        <md-option :value="item._id" v-for="(item,index) in allclientbinfo" :key="index">{{item.clientbname}}</md-option>
                    </md-select>
                </md-field>
            </md-tab>
        </md-tabs>

        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="showDialog = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
            <md-button class="md-raised md-primary" v-if="savemode" @click="addtimes" style="font-size:20px;width:100px;height:40px">保存</md-button>
            <md-button class="md-raised md-primary" v-else @click="confirmEdit" style="font-size:20px;width:100px;height:40px">修改</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog end-->

    <!-- remove dialog start-->
    <md-dialog :md-active.sync="removeDialog" style="width:500px" class="editdialog">
        <md-dialog-title style="font-size:30px;color:#d74342">删除路线信息</md-dialog-title>
        <div style="margin:20px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;">
            <div class="rmDialog-center">
                <span>路线名称:</span><span>{{timesname}}</span>
            </div>
            <div class="rmDialog-center">
                <span>路线备注:</span><span>{{timesnote}}</span>
            </div>
            <div class="rmDialog-center">
                <span>匹配车辆:</span><span>{{choicecar}}</span>
            </div>
            <div class="rmDialog-center">
                <span>匹配司机:</span><span>{{choicedirver}}</span>
            </div>
            <div class="rmDialog-center">
                <span>客户数量:</span><span>{{timesclientnumber}}</span>
            </div>
        </div>
        <md-dialog-actions>
            <md-button class="md-raised md-primary" @click="removeDialog = false">关闭</md-button>
            <md-button class="md-raised md-primary" @click="confirmremove">删除</md-button>
            
        </md-dialog-actions>
    </md-dialog>
    <!-- remove dialog end-->

    <!-- error start -->
    <md-dialog-alert :md-active.sync="error" :md-content="errorMessage" md-confirm-text="关闭" />
    <!-- error end -->
</div>
</template>

<script>
import axios from 'axios'
import config from '../../public/js/config.js'

export default {
    data() {
        return {
            selectedTimes: '',
            times: [],
            showDialog: false,
            error: false,
            errorMessage: '未知错误请联系更牛逼的人',
            timesname: '',
            timesclientnumber: '',
            timesnote: '',
            choicecar: '',
            choicedirver: '',
            choiceclientb: [],
            allcarinfo: [],
            alldirverinfo: [],
            allclientbinfo: [],
            alltimesinfo: [],
            acarinfo: '',
            adirverinfo: '',
            aclientainfo: '',
            _id: '',
            savemode: true,
            removeDialog: false,
            selectCar: ''
        }
    },
    mounted() {
        this.getallcar()
        this.getalldirver()
        this.getallclientb()
        this.getalltimes()
    },
    methods: {
        addbutton() {
            this.savemode = true
            this.showDialog = true
            this._id = ''
            this.timesname = ''
            this.timesnote = ''
            this.choicecar = ''
            this.choicedirver = ''
            this.adirverinfo =''
            this.choiceclientb = []
        },
        getalldirver() {
            axios.get(config.server +'/dirver')
                .then((res) => {
                    this.alldirverinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getallcar() {
            axios.get(config.server +'/car')
                .then((res) => {
                    this.allcarinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getallclientb() {
            axios.get(config.server +'/clientb')
                .then((res) => {
                    this.allclientbinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getalltimes() {
            axios.get(config.server +'/times')
                .then((res) => {
                    this.alltimesinfo = res.data.doc
                }).catch((err) => {
                    console.log(err)
                })
        },
        getacar() {

            if (this.choicecar == '') {
                //不做操作
            } else {
                this.acarinfo = this.allcarinfo.find((element) => (
                    element._id == this.choicecar
                ))
            }

        },
        getadirver() {
            if (this.choicedirver == '') {
                //不做操作
            } else {
                this.adirverinfo = this.alldirverinfo.find((element) => (
                    element._id == this.choicedirver
                ))
            }

        },
        addtimes() {
            if (!this.timesname) {
                this.errorMessage = '请填写必要信息'
                this.error = true
                setTimeout(() => {
                    this.error = false
                }, 3000)
            } else {
                axios.post(config.server +'/times', {
                        timesname: this.timesname,
                        timescar: this.choicecar,
                        timesnote: this.timesnote,
                        timesdirver: this.choicedirver,
                        timesclientb: this.choiceclientb,
                    })
                    .then((response) => {
                        if (response.data.code == 1) {
                            this.errorMessage = response.data.msg
                            this.error = true
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        } else {
                            this.changeclientb()
                            this.errorMessage = response.data.msg
                            this.error = true
                            this.showDialog = false
                            this.timesname = ''
                            this.getalltimes()
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.errorMessage = response.data.msg
                        this.error = true
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    });
            }
        },
        changeclientb() {
            axios.post(config.server +'/clientb/changeline', {
                choiceclientb: this.choiceclientb,
                timesname: this.timesname
            }).then((res) => {
                if (res.data.code == 1 || res.data.code == 2) {
                    this.errorMessage = res.data.msg
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                } else {
                    console.log(res.data.msg)
                    this.errorMessage = res.data.msg
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                }
            })
        },
        editbutton(item) {
            console.log(item)
            this.savemode = false
            this.showDialog = true
            this._id = item._id
            this.timesname = item.timesname
            this.timesnote = item.timesnote
            this.choicecar = item.timescar._id
            this.choicedirver = item.timesdirver._id
            let data = []
            item.timesclientb.forEach(element => {
                data.push(element._id)
            });
            this.choiceclientb = data
        },
        confirmEdit() {
            if (!this.timesname) {
                this.errorMessage = '请填写必要信息'
                this.error = true
                setTimeout(() => {
                    this.error = false
                }, 3000)
            } else {
                axios.post(config.server +'/times/edit', {
                        _id: this._id,
                        timesname: this.timesname,
                        timescar: this.choicecar,
                        timesdirver: this.choicedirver,
                        timesclientb: this.choiceclientb,
                        timesclientnumber: this.choiceclientb.length,
                        timesnote: this.timesnote
                    })
                    .then(res => {
                        this.errorMessage = res.data.msg
                        this.error = true
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                        if (res.data.code == 0) {
                            this.getalltimes()
                            this.showDialog = false
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.errorMessage = err
                        this.error = true
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    })
            }
        },
        removebutton(item) {
            this.removeDialog = true
            this._id = item._id
            this.timesname = item.timesname
            this.timesnote = item.timesnote
            this.choicecar = item.timescar.carid
            this.choicedirver = item.timesdirver.dirvername
            this.timesclientnumber = item.timesclientnumber
        },
        confirmremove() {
            axios.post(config.server +'/times/remove', {
                    _id: this._id
                })
                .then((res) => {
                    this.errorMessage = res.data.msg
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                    if (res.data.code == 0) {
                        this.removeDialog = false
                        this.getalltimes()
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.errorMessage = err
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                })
        }
    }
}
</script>

<style scoped>
#times {
    width: 80%;
    margin: 20px auto;
}

.topbutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.topbutton-left {
    flex-basis: 30%;
    text-align: left;
    margin: 0 auto;
}

.topbutton-left input {
    margin: 5px auto;
    border-radius: 10px;
    width: 300px;
    height: 40px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 20px;
}

.topbutton-right {
    margin: 0 auto;
    flex-basis: 50%;
    text-align: right;
}

.centertable {
    margin: 20px auto;
}

.dialog-3 {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 0 auto;
    width: 90%;
}

.dialog-3-left {
    flex-basis: 30%;
    text-align: center;
    margin: 0 auto;
}

.dialog-3-right {
    flex-basis: 60%;
    text-align: center;
    margin: 0 auto;
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

.tabletitle-item {
    margin: 0 auto;
    width: 250px;
    font-size: 20px;
    line-height: 50px;
}
.rmDialog-center {
    margin: 20px;
    font-size: 20px;
    width: 100%
}
</style>
