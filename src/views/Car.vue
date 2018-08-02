<template>
<div id="car">
    <div class="topbutton">
        <div class="topbutton-left">
            <input type="text" v-model="selectedCar" @keyup.enter="search" placeholder="搜索车牌信息">
        </div>
        <div class="topbutton-right">
            <md-button class="md-raised md-primary" @click="showDialog = true,addmode=true" style="font-size:20px;width:100px;height:40px;">+ 添加</md-button>
        </div>
    </div>
    <div class="centertable">
        <md-card style="background-color: #eff3f5">
            <md-card-content>
                <div class="tabletitle">
                    <div class="tabletitle-item">
                        <span>车牌</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>车型</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>尺寸</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>出车次数</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>备注</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>操作</span>
                    </div>
                </div>
            </md-card-content>
        </md-card>

        <md-card md-with-hover v-for="(item,index) in allcarinfo" :key="index" style="background-color: #eff3f5;">
            <md-card-content>
                <div class="tablebody">
                    <div class="tabletitle-item">
                        <span>{{item.carid}}</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>{{item.cartype}}</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>{{item.carsize}}</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>{{item.cartimes}}</span>
                    </div>
                    <div class="tabletitle-item">
                        <span>{{item.carnote}}</span>
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
    <md-dialog :md-active.sync="showDialog" style="width:600px">
        <div class="dialog-title">
            <span>车辆管理</span>
        </div>
        <div class="dialog-body">
            <div class="dialog-body-item">
                <md-field style="margin:30px auto">
                    <label style="font-size:20px;color:#000">车牌号码</label>
                    <md-input v-model="carid" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-helper-text" style="font-size:15px;margin: -2px auto;" v-if="!carid">车辆标识信息，必填项目</span>
                </md-field>

                <md-field style="margin:30px auto">
                    <label style="font-size:20px;color:#000">车型</label>
                    <md-input v-model="cartype" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-helper-text" style="font-size:15px;margin: -2px auto;" v-if="!cartype">请填写车型信息</span>
                </md-field>

                <md-field style="margin:30px auto">
                    <label style="font-size:20px;color:#000">尺寸</label>
                    <md-input v-model="carsize" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-helper-text" style="font-size:15px;margin: -2px auto;" v-if="!carsize">请填写车辆尺寸</span>
                </md-field>
            </div>
            <div class="dialog-body-item">
                <md-field style="margin:30px auto">
                    <label style="font-size:20px;color:#000">出车次数</label>
                    <md-input v-model="cartimes" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-helper-text" style="font-size:15px;margin: -2px auto;" v-if="!cartimes">如不填写默认为0</span>
                </md-field>

                <md-field style="margin:30px auto">
                    <label style="font-size:20px;color:#000">备注</label>
                    <md-input v-model="carnote" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                </md-field>
            </div>
        </div>
        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="showDialog = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
            <md-button class="md-raised md-primary" v-if="addmode" @click="addcar" style="font-size:20px;width:100px;height:40px">保存</md-button>
            <md-button class="md-raised md-primary" v-else @click="confirmedit" style="font-size:20px;width:100px;height:40px">修改</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog end-->

    <!-- remove dialog start-->
    <md-dialog :md-active.sync="removeDialog" class="editdialog">
        <md-dialog-title style="font-size:30px">删除车辆</md-dialog-title>
        <div style="margin:20px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;">
            <div class="rmDialog-center">
                <span style="text-align:left">车牌号码:</span><span>{{carid}}</span>
            </div>
            <div class="rmDialog-center">
                <span>车辆类型:</span><span>{{cartype}}</span>
            </div>
            <div class="rmDialog-center">
                <span>车辆尺寸:</span><span>{{carsize}}</span>
            </div>
            <div class="rmDialog-center">
                <span>出车次数:</span><span>{{cartimes}}</span>
            </div>
            <div class="rmDialog-center">
                <span>车辆备注:</span><span>{{carnote}}</span>
            </div>
            <div class="rmDialog-center">
                <span>加入时间:</span><span>{{cardate}}</span>
            </div>
        </div>

        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="removeDialog = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
            <md-button class="md-raised md-primary" @click="confirmremove" style="font-size:20px;width:100px;height:40px">删除</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- remove dialog end-->

    <!-- error start -->
    <md-dialog-alert :md-active.sync="error" :md-content="errormsg" md-confirm-text="关闭" style="font-size:25px" />
    <!-- error end -->

</div>
</template>

<script>
import axios from 'axios'
import config from "../../public/js/config.js"

export default {
    name: 'Car',
    data() {
        return {
            addmode: true,
            successdmsg: false,
            error: false,
            errormsg: '发生未知错误请联系更牛逼的人',
            error2: false,
            error3: false,
            carid: '',
            cartype: '',
            carsize: '',
            cartimes: '',
            carnote: '',
            cardate: '',
            _id: '',
            showDialog: false,
            removeDialog: false,
            selectedCar: '',
            searchCar: [],
            allcarinfo: [],
            employees: [
                'Algeria',
                'Argentina',
                'Brazil',
                'Canada',
                'Italy',
                'Japan',
                'United Kingdom',
                'United States'
            ],
            searching: false
        }
    },
    mounted() {
        this.getallcar()
    },
    methods: {
        search(item) {
            if (this.selectedCar == '') {
                this.getallcar()
            } else {
                this.searchCar = this.allcarinfo.filter(element => {
                    return element.carid.toLowerCase().indexOf(this.selectedCar.toLowerCase()) !== -1
                })
                this.allcarinfo = this.searchCar
            }

        },
        editbutton(item) {
            this.addmode = false
            this._id = item._id
            this.carid = item.carid
            this.cartype = item.cartype
            this.carsize = item.carsize
            this.cartimes = item.cartimes
            this.carnote = item.carnote
            this.showDialog = true
        },
        removebutton(item) {
            this._id = item._id
            this.carid = item.carid
            this.cartype = item.cartype
            this.carsize = item.carsize
            this.cartimes = item.cartimes
            this.carnote = item.carnote
            this.removeDialog = true

        },
        confirmedit() {
            axios.post(config.server + '/car/update', {
                    _id: this._id,
                    carid: this.carid,
                    cartype: this.cartype,
                    carsize: this.carsize,
                    cartimes: this.cartimes,
                    carnote: this.carnote
                })
                .then((res) => {
                    if (res.data.code == 0) {
                        this.error = true
                        this.errormsg = res.data.msg
                        this.showDialog = false
                        this.getallcar()
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    } else {
                        this.error = true
                        this.errormsg = res.data.msg
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        confirmremove() {
            axios.post(config.server + '/car/remove', {
                    _id: this._id
                })
                .then((res) => {
                    if (res.data.code == 0) {
                        this.error = true
                        this.errormsg = res.data.msg
                        this.removeDialog = false
                        this.getallcar()
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    } else {
                        this.error = true
                        this.errormsg = res.data.msg
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getallcar() {
            axios.get(config.server + '/car')
                .then((res) => {

                    this.allcarinfo = res.data

                }).catch((err) => {
                    console.log(err)
                })
        },
        addcar() {
            if (!this.carid || !this.cartype || !this.carsize || !this.cartimes) {
                this.error = true
                this.errormsg = res.data.msg
                setTimeout(() => {
                    this.error = false
                }, 3000)
            } else {
                axios.post(config.server + '/car', {
                        carid: this.carid,
                        cartype: this.cartype,
                        carsize: this.carsize,
                        cartimes: this.cartimes,
                        carnote: this.carnote,
                    })
                    .then((response) => {
                        if (response.data.code == 1 || response.data.code == 2) {
                            this.error = true
                            this.errormsg = response.data.msg
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        } else {
                            this.getallcar()
                            this.error = true
                            this.errormsg = response.data.msg
                            this.showDialog = false
                            this.carid = ''
                            this.cartype = ''
                            this.carsize = ''
                            this.cartimes = ''
                            this.carnote = ''
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        error = true
                        errormsg = error
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    });
            }
        }
    }
}
</script>

<style scoped>
#car {
    width: 80%;
    margin: 20px auto;
}

.dialog-title {
    text-align: left;
    padding: 20px 0 0 15px;
}

.dialog-title span {
    font-size: 30px
}

.dialog-body {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.dialog-body-item {
    flex-basis: 40%;
    text-align: left;
    margin: 0 auto;
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

.tabletitle {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    font-size: 20px;
    font-weight: 600;
    height: 50px;
    line-height: 50px;
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
    -webkit-flex-flow: row;
    flex-flow: row;
    font-size: 25px;
    line-height: 50px;
}

.editdialog {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    width: 500px;
}

.rmDialog-center {
    margin: 20px;
    font-size: 20px;
    width: 100%
}
</style>
