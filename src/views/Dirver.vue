<template>
<div id="dirver">
    <div class="topbutton">
        <div class="findbutton">
            <md-autocomplete v-model="selecteddirver" :md-options="dirvers">
                <label>查询</label>
            </md-autocomplete>
        </div>
        <div class="addbutton">
            <md-button class="md-accent" @click="adddirverbutton">+ 添加</md-button>
        </div>
    </div>

    <div class="centertable">
        <div class="tabletitle">
            <div class="tabletitle-item">
                <span>姓名</span>
            </div>
            <div class="tabletitle-item">
                <span>准证号码</span>
            </div>
            <div class="tabletitle-item">
                <span>联系方式</span>
            </div>
            <div class="tabletitle-item">
                <span>驾照类型</span>
            </div>
            <div class="tabletitle-item">
                <span>操作</span>
            </div>
        </div>
        <div class="tablebody" v-for="(item,index) in alldirverinfo" :key="index">
            <div class="tabletitle-item">
                <span>{{item.dirvername}}</span>
            </div>
            <div class="tabletitle-item">
                <span>{{item.dirverid}}</span>
            </div>
            <div class="tabletitle-item">
                <span>{{item.dirverphone}}</span>
            </div>
            <div class="tabletitle-item">
                <span>{{item.dirvercard}}</span>
            </div>
            <div class="tabletitle-item">
                <img src="../../public/img/icons/edit.png" alt="edit" @click="editbutton(item)">
                <img src="../..//public/img/icons/dele.png" alt="delete" @click="deletebutton(item)">
            </div>
        </div>
    </div>
    <!-- Dialog start-->
    <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>司机管理</md-dialog-title>

        <md-tabs md-dynamic-height>
            <md-tab md-label="添加司机">
                <md-field>
                    <label>司机姓名</label>
                    <md-input v-model="dirvername"></md-input>
                    <span class="md-helper-text" v-if="!dirvername">标识人员姓名</span>
                </md-field>

                <md-field>
                    <label>准证号码</label>
                    <md-input v-model="dirverid"></md-input>
                    <span class="md-helper-text" v-if="!dirverid">人员标识信息，必填项目</span>
                </md-field>

                <md-field>
                    <label>联系方式</label>
                    <md-input v-model="dirverphone"></md-input>
                    <span class="md-helper-text" v-if="!dirverphone">标识联系方式</span>
                </md-field>

                <md-field>
                    <label for="dirvercard">驾照类型</label>
                    <md-select v-model="dirvercard" name="dirvercard" id="dirvercard">
                        <md-option value="C1">C1</md-option>
                        <md-option value="C2">C2</md-option>
                        <md-option value="C3">C3</md-option>
                    </md-select>
                </md-field>

                <md-field>
                    <label>用户名</label>
                    <md-input v-model="dirverusername"></md-input>
                    <span class="md-helper-text" v-if="!dirverusername">标识联系方式</span>
                </md-field>

                <md-field>
                    <label>密码</label>
                    <md-input v-model="dirverpsw" type="password"></md-input>
                    <span class="md-helper-text" v-if="!dirverpsw">标识联系方式</span>
                </md-field>

                <md-field>
                    <label>备注</label>
                    <md-input v-model="dirvernote"></md-input>
                </md-field>
            </md-tab>
        </md-tabs>

        <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">关闭</md-button>
            <md-button class="md-primary" v-if="savemode" @click="adddirver()">保存</md-button>
            <md-button class="md-primary" v-if="!savemode" @click="confirmedit()">修改</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog end-->
    <!-- deleteDialog start-->
    <md-dialog :md-active.sync="deleteDialog">
        <md-dialog-title>删除司机</md-dialog-title>
        <div>
            <span>司机姓名:</span><span>{{dirvername}}</span>
        </div>
        <div>
            <span>车辆类型:</span><span>{{dirverid}}</span>
        </div>
        <div>
            <span>车辆尺寸:</span><span>{{dirverphone}}</span>
        </div>
        <div>
            <span>出车次数:</span><span>{{dirvercard}}</span>
        </div>
        <div>
            <span>车辆备注:</span><span>{{dirverusername}}</span>
        </div>
        <div>
            <span>加入时间:</span><span>{{dirvernote}}</span>
        </div>
        <md-dialog-actions>
            <md-button class="md-primary" @click="deleteDialog = false">关闭</md-button>
            <md-button class="md-primary" @click="confirmdelete">删除</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- deleteDialog end-->
    <!-- successd mesage start -->
    <md-dialog-alert :md-active.sync="successdmsg" md-content="操作成功" md-confirm-text="关闭" />
    <!-- successd mesage end -->
    <!-- error start -->
    <md-dialog-alert :md-active.sync="error" :md-content="errormsg" md-confirm-text="关闭" />
    <!-- error end -->
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            selecteddirver: '',
            dirvers: [],
            showDialog: false,
            deleteDialog: false,
            _id: '',
            dirvername: '',
            dirverid: '',
            dirverphone: '',
            dirvercard: '',
            dirverusername: '',
            dirverpsw: '',
            dirvernote: '',
            alldirverinfo: [],
            successdmsg: false,
            error: false,
            errormsg: '发生未知错误',
            savemode: true
        }
    },
    mounted() {
        this.getalldirver()
    },
    methods: {
        adddirverbutton() {
            this.showDialog = true
            this.savemode = true
            this._id = ''
            this.dirvername = ''
            this.dirverid = ''
            this.dirverphone = ''
            this.dirvercard = ''
            this.dirverusername = ''
            this.dirverpsw = ''
            this.dirvernote = ''
        },
        deletebutton(item) {
            this.deleteDialog = true
            this._id = item._id
            this.dirvername = item.dirvername
            this.dirverid = item.dirverid
            this.dirverphone = item.dirverphone
            this.dirvercard = item.dirvercard
            this.dirverusername = item.dirverusername
            this.dirverpsw = item.dirverpsw
            this.dirvernote = item.dirvernote
        },
        confirmdelete() {
            axios.post('//127.0.0.1:3000/dirver/remove', {
                    _id: this._id
                })
                .then((res) => {
                    this.errormsg = res.data.msg
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                    if (res.data.code == 0) {
                        this.getalldirver()
                        this.deleteDialog = false
                    }
                })
                .catch((err) => {
                    this.error = true
                    this.errormsg = err
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                })
        },
        editbutton(item) {
            this.savemode = false
            this._id = item._id
            this.dirvername = item.dirvername
            this.dirverid = item.dirverid
            this.dirverphone = item.dirverphone
            this.dirvercard = item.dirvercard
            this.dirverusername = item.dirverusername
            this.dirverpsw = item.dirverpsw
            this.dirvernote = item.dirvernote
            this.showDialog = true
        },
        confirmedit() {
            if (!this.dirvername || !this.dirverid || !this.dirverusername || !this.dirverpsw || !this.dirverphone) {
                this.error = true
                this.errormsg = '请填写必要信息'
                setTimeout(() => {
                    this.error = false
                }, 3000)
            } else {
                axios.post('//127.0.0.1:3000/dirver/edit', {
                        _id: this._id,
                        dirvername: this.dirvername,
                        dirverid: this.dirverid,
                        dirverphone: this.dirverphone,
                        dirvercard: this.dirvercard,
                        dirverusername: this.dirverusername,
                        dirverpsw: this.dirverpsw,
                        dirvernote: this.dirvernote
                    })
                    .then((response) => {
                        if (response.data.code == 1) {
                            this.error = true
                            this.errormsg = response.data.msg
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        } else {
                            this.successdmsg = true
                            this.showDialog = false
                            this.carid = ''
                            this.cartype = ''
                            this.carsize = ''
                            this.cartimes = ''
                            this.carnote = ''
                            this.getalldirver()
                            setTimeout(() => {
                                this.successdmsg = false
                            }, 3000)
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        this.error = true
                        this.errormsg = response.data.msg
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    });
            }
        },
        getalldirver() {
            axios.get('//127.0.0.1:3000/dirver')
                .then((res) => {
                    this.alldirverinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        adddirver() {
            if (!this.dirvername || !this.dirverid || !this.dirverusername || !this.dirverpsw) {
                this.error = true
                this.errormsg = '请填写必要信息'
                setTimeout(() => {
                    this.error = false
                }, 3000)
            } else {
                axios.post('//127.0.0.1:3000/dirver', {
                        dirvername: this.dirvername,
                        dirverid: this.dirverid,
                        dirverphone: this.dirverphone,
                        dirvercard: this.dirvercard,
                        dirverusername: this.dirverusername,
                        dirverpsw: this.dirverpsw,
                        dirvernote: this.dirvernote
                    })
                    .then((response) => {
                        if (response.data.code == 1) {
                            this.error = true
                            this.errormsg = response.data.msg
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        } else {
                            this.successdmsg = true
                            this.showDialog = false
                            this.carid = ''
                            this.cartype = ''
                            this.carsize = ''
                            this.cartimes = ''
                            this.carnote = ''
                            this.getalldirver()
                            setTimeout(() => {
                                this.successdmsg = false
                            }, 3000)
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        this.error = true
                        this.errormsg = response.data.msg
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
#dirver {
    width: 80%;
    margin: 20px auto;
}

.topbutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row-reverse wrap;
    flex-flow: row-reverse wrap;
}

.centertable {
    background-color: #eff3f5;
}

.findbutton {
    flex-basis: 20%;
    order: 2;
}

.addbutton {
    flex-basis: 20%;
    order: 1;
}

.tabletitle {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.tabletitle-item {
    margin: 0 auto;
    width: 300px;
}

.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}
</style>
