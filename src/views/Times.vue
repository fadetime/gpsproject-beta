<template>
<div id="times">
    <div class="topbutton">
        <div class="topbutton-left">
            <input type="text" v-model="selectCar" @keyup.enter="search" placeholder="搜索车次信息">
        </div>
        <div class="topbutton-right">
            <md-button class="md-raised md-primary" @click="addbutton" style="font-size:30px;width:140px;height:50px">+ 添加</md-button>
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
                        <img src="../../public/img/icons/edit.png" alt="edit" @click="editbutton(item)" style="width:30px;margin:0 10px">
                        <img src="../..//public/img/icons/dele.png" alt="delete" @click="removebutton(item)" style="width:40px;margin:0 10px">
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
    <!-- Dialog start-->
    <md-dialog :md-active.sync="showDialog" style="height:500px">
        <md-dialog-title style="font-size:30px">车次管理</md-dialog-title>

        <md-tabs md-dynamic-height>
            <md-tab md-label="添加车次" style="font-size:25px;color:#000">
                <md-field style="margin:45px auto">
                    <label style="font-size:25px;color:#000">路线名称</label>
                    <md-input v-model="timesname" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-helper-text" style="font-size:20px;margin: -10px auto;" v-if="!timesname">车次标识信息，必填项目</span>
                </md-field>

                <md-field style="margin:45px auto">
                    <label style="font-size:25px;color:#000">备注</label>
                    <md-input v-model="timesnote" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                </md-field>
            </md-tab>
            <md-tab md-label="配置车辆" style="font-size:25px;color:#000">
                <md-field style="margin:45px auto">
                    <label for="choicecar" style="font-size:25px;color:#000">选择车辆</label>
                    <md-select v-model="choicecar" name="choicecar" id="choicecar" @md-selected="getacar" style="border-bottom: 1px solid #000;font-size:25px;height:55px">
                        <md-option :value="item._id" v-for="(item,index) in allcarinfo" :key="index">{{item.carid}}</md-option>
                    </md-select>
                </md-field>
                <div style="font-size:25px;color:#000;margin:20px auto">所选车牌号码：{{acarinfo.carid}}</div>
                <div style="font-size:25px;color:#000;margin:20px auto">所选车辆型号：{{acarinfo.carsize}}</div>
                <div style="font-size:25px;color:#000;margin:20px auto">所选出车次数：{{acarinfo.cartimes}}</div>
                <div style="font-size:25px;color:#000;margin:20px auto">所选车辆类型：{{acarinfo.cartype}}</div>
            </md-tab>
            <md-tab md-label="配置司机" style="font-size:25px;color:#000">
                <md-field style="margin:45px auto">
                    <label for="choicedirver" style="font-size:25px;color:#000">选择司机</label>
                    <md-select v-model="choicedirver" name="choicedirver" id="choicedirver" @md-selected="getadirver">
                        <md-option :value="item._id" v-for="(item,index) in alldirverinfo" :key="index">{{item.dirvername}}</md-option>
                    </md-select>
                </md-field>
                <div style="font-size:25px;color:#000;margin:20px auto">所选司机姓名：{{adirverinfo.dirvername}}</div>
                <div style="font-size:25px;color:#000;margin:20px auto">司机准证号码：{{adirverinfo.dirverid}}</div>
                <div style="font-size:25px;color:#000;margin:20px auto">司机驾照配型：{{adirverinfo.dirvercard}}</div>
                <div style="font-size:25px;color:#000;margin:20px auto">司机电话号码：{{adirverinfo.dirverphone}}</div>
            </md-tab>
            <md-tab md-label="配置客户">
                <md-field style="margin:45px auto">
                    <label for="choiceclient" style="font-size:25px;color:#000">选择客户</label>
                    <md-select v-model="choiceclientb" name="choiceclientb" id="choiceclientb" md-dense multiple>
                        <md-option :value="item._id" v-for="(item,index) in allclientbinfo" :key="index">{{item.clientbname}}</md-option>
                    </md-select>
                </md-field>
            </md-tab>
        </md-tabs>

        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="showDialog = false" style="font-size:30px;width:140px;height:50px">取消</md-button>
            <md-button class="md-raised md-primary" v-if="savemode" @click="addtimes" style="font-size:30px;width:140px;height:50px">保存</md-button>
            <md-button class="md-raised md-primary" v-else @click="confirmEdit" style="font-size:30px;width:140px;height:50px">修改</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog end-->

    <!-- remove dialog start-->
    <md-dialog :md-active.sync="removeDialog" style="width:60%" class="editdialog">
        <md-dialog-title>修改路线信息</md-dialog-title>
        <div>
            <span>路线名称:</span><span>{{timesname}}</span>
        </div>
        <div>
            <span>路线备注:</span><span>{{timesnote}}</span>
        </div>
        <div>
            <span>匹配车辆:</span><span>{{choicecar}}</span>
        </div>
        <div>
            <span>匹配司机:</span><span>{{choicedirver}}</span>
        </div>
        <div>
            <span>客户数量:</span><span>{{timesclientnumber}}</span>
        </div>
        <md-dialog-actions>
            <md-button class="md-primary" @click="removeDialog = false">Close</md-button>
            <md-button class="md-primary" @click="confirmremove">remove</md-button>
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
            this.choiceclientb = []
        },
        getalldirver() {
            axios.get('//127.0.0.1:3000/dirver')
                .then((res) => {
                    this.alldirverinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getallcar() {
            axios.get('//127.0.0.1:3000/car')
                .then((res) => {
                    this.allcarinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getallclientb() {
            axios.get('//127.0.0.1:3000/clientb')
                .then((res) => {
                    this.allclientbinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getalltimes() {
            axios.get('//127.0.0.1:3000/times')
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
                axios.post('//127.0.0.1:3000/times', {
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
            axios.post('//127.0.0.1:3000/clientb/changeline', {
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
                axios.post('//127.0.0.1:3000/times/edit', {
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
            axios.post('//127.0.0.1:3000/times/remove', {
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
    margin: 10px auto;
    border-radius: 10px;
    width: 300px;
    height: 50px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 30px;
}

.topbutton-right {
    margin: 0 auto;
    flex-basis: 50%;
    text-align: right;
}

.centertable {
    margin: 20px auto;
}
</style>
