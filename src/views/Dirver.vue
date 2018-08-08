<template>
<div id="dirver">
    <div class="topbutton">
        <div class="topbutton-left">
            <input type="text" v-model="searchDirver" @keyup.enter="search" placeholder="搜索司机信息">
        </div>
        <div class="topbutton-right">
            <md-button class="md-raised md-primary" @click="adddirverbutton" style="font-size:20px;width:100px;height:40px;">+ 添加</md-button>
        </div>
    </div>

    <div class="centertable">

        <md-card style="background-color: #eff3f5">
            <md-card-content>
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
            </md-card-content>
        </md-card>

        <md-card md-with-hover v-for="(item,index) in alldirverinfo" :key="index" style="background-color: #eff3f5;">
            <md-card-content>
                <div class="tablebody">
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
                        <img src="../../public/img/icons/edit.png" alt="edit" @click="editbutton(item)" style="width:20px;margin:0 10px">
                        <img src="../..//public/img/icons/dele.png" alt="delete" @click="deletebutton(item)" style="width:30px;margin:0 10px">
                    </div>
                </div>
            </md-card-content>
        </md-card>

    </div>
    <!-- Dialog start-->
    <md-dialog :md-active.sync="showDialog" style="width:700px">
        <div class="dialog-title">
            <span>司机管理</span>
        </div>
        <div class="dialog-body">
            <div class="dialog-body-item">
                <md-field style="margin:20px auto" :class="nameclass">
                    <label style="font-size:20px">司机姓名</label>
                    <md-input v-model="dirvername" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error" style="font-size:15px;margin: -10px auto;">标识人员姓名</span>
                </md-field>

                <md-field style="margin:30px auto" :class="passclass">
                    <label style="font-size:20px">准证号码</label>
                    <md-input v-model="dirverid" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error" style="font-size:15px;margin: -10px auto;">人员标识信息，必填项目</span>
                </md-field>

                <md-field style="margin:30px auto" :class="phonclass">
                    <label style="font-size:20px">联系方式</label>
                    <md-input v-model="dirverphone" type="number" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error" style="font-size:15px;margin: -10px auto;">标识联系方式</span>
                </md-field>

                <md-field style="margin:20px auto" :class="cardclass">
                    <label for="dirvercard" style="font-size:20px">驾照类型</label>
                    <md-select v-model="dirvercard" name="dirvercard" id="dirvercard" style="border-bottom: 1px solid #000;font-size:20px;height:55px;max-width: 500px;padding-top:21px">
                        <md-option value="C1">C1</md-option>
                        <md-option value="C2">C2</md-option>
                        <md-option value="C3">C3</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="dialog-body-item">
                <md-field style="margin:20px auto" :class="userclass">
                    <label style="font-size:20px">用户名</label>
                    <md-input v-model="dirverusername" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error" style="font-size:15px;margin: -10px auto;">标识联系方式</span>
                </md-field>

                <md-field style="margin:30px auto" :class="pswclass">
                    <label style="font-size:20px">密码</label>
                    <md-input v-model="dirverpsw" type="password" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error" style="font-size:15px;margin: -10px auto;">标识密码</span>
                </md-field>

                <md-field style="margin:30px auto">
                    <label style="font-size:20px">备注</label>
                    <md-input v-model="dirvernote" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                </md-field>
            </div>
        </div>
        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="showDialog = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
            <md-button class="md-raised md-primary" v-if="savemode" @click="adddirver" style="font-size:20px;width:100px;height:40px">保存</md-button>
            <md-button class="md-raised md-primary" v-else @click="confirmedit" style="font-size:20px;width:100px;height:40px">修改</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog end-->

    <!-- deleteDialog start-->
    <md-dialog :md-active.sync="deleteDialog" class="editdialog">
        <md-dialog-title style="font-size:30px">删除司机</md-dialog-title>
        <div style="margin:20px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;">
            <div class="rmDialog-center">
                <div class="rmDialog-center-left">
                    <span>司机姓名:</span>
                </div>
                <div class="rmDialog-center-right">
                    <span>{{dirvername}}</span>
                </div>
            </div>
            <div class="rmDialog-center">
                <div class="rmDialog-center-left">
                    <span>车辆类型:</span>
                </div>
                <div class="rmDialog-center-right">
                    <span>{{dirverid}}</span>
                </div>
            </div>
            <div class="rmDialog-center">
                <div class="rmDialog-center-left">
                    <span>车辆尺寸:</span>
                </div>
                <div class="rmDialog-center-right">
                    <span>{{dirverphone}}</span>
                </div>
            </div>
            <div class="rmDialog-center">
                <div class="rmDialog-center-left">
                    <span>出车次数:</span>
                </div>
                <div class="rmDialog-center-right">
                    <span>{{dirvercard}}</span>
                </div>
            </div>
            <div class="rmDialog-center">
                <div class="rmDialog-center-left">
                    <span>车辆备注:</span>
                </div>
                <div class="rmDialog-center-right">
                    <span>{{dirverusername}}</span>
                </div>
            </div>
            <div class="rmDialog-center">
                <div class="rmDialog-center-left">
                    <span>司机备注:</span>
                </div>
                <div class="rmDialog-center-right">
                    <span>{{dirvernote}}</span>
                </div>
            </div>
        </div>
        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="deleteDialog = false" style="font-size:20px;width:100px;height:40px">关闭</md-button>
            <md-button class="md-raised md-accent" @click="confirmdelete" style="font-size:20px;width:100px;height:40px">删除</md-button>
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
import axios from "axios";
import config from "../../public/js/config.js";

export default {
    data() {
        return {
            selecteddirver: "",
            searchDirver: "",
            searchedDriver: [],
            dirvers: [],
            showDialog: false,
            deleteDialog: false,
            _id: "",
            dirvername: "",
            dirverid: "",
            dirverphone: "",
            dirvercard: "",
            dirverusername: "",
            dirverpsw: "",
            dirvernote: "",
            alldirverinfo: [],
            successdmsg: false,
            error: false,
            errormsg: "发生未知错误",
            savemode: true,
            nameErr: false,
            passErr: false,
            phonErr: false,
            cardErr: false,
            userdErr: false,
            pswdErr: false,
        };
    },
    mounted() {
        this.getalldirver();
    },
    computed: {
        nameclass() {
            return {
                'md-invalid': this.nameErr
            }
        },
        passclass() {
            return {
                'md-invalid': this.passErr
            }
        },
        phonclass() {
            return {
                'md-invalid': this.phonErr
            }
        },
        cardclass() {
            return {
                'md-invalid': this.cardErr
            }
        },
        userclass() {
            return {
                'md-invalid': this.userdErr
            }
        },
        pswclass() {
            return {
                'md-invalid': this.pswdErr
            }
        },
    },
    methods: {
        search(item) {
            if (this.searchDirver == "") {
                this.getalldirver();
            } else {
                this.searchedDriver = this.alldirverinfo.filter(element => {
                    return (
                        element.dirvername
                        .toLowerCase()
                        .indexOf(this.searchDirver.toLowerCase()) !== -1
                    );
                });
                this.alldirverinfo = this.searchedDriver;
            }
        },
        adddirverbutton() {
            this.showDialog = true;
            this.savemode = true;
            this._id = "";
            this.dirvername = "";
            this.dirverid = "";
            this.dirverphone = "";
            this.dirvercard = "";
            this.dirverusername = "";
            this.dirverpsw = "";
            this.dirvernote = "";
        },
        deletebutton(item) {
            this.deleteDialog = true;
            this._id = item._id;
            this.dirvername = item.dirvername;
            this.dirverid = item.dirverid;
            this.dirverphone = item.dirverphone;
            this.dirvercard = item.dirvercard;
            this.dirverusername = item.dirverusername;
            this.dirverpsw = item.dirverpsw;
            this.dirvernote = item.dirvernote;
        },
        confirmdelete() {
            axios
                .post(config.server + "/dirver/remove", {
                    _id: this._id
                })
                .then(res => {
                    this.errormsg = res.data.msg;
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                    if (res.data.code == 0) {
                        this.getalldirver();
                        this.deleteDialog = false;
                    }
                })
                .catch(err => {
                    this.error = true;
                    this.errormsg = err;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                });
        },
        editbutton(item) {
            this.savemode = false;
            this._id = item._id;
            this.dirvername = item.dirvername;
            this.dirverid = item.dirverid;
            this.dirverphone = item.dirverphone;
            this.dirvercard = item.dirvercard;
            this.dirverusername = item.dirverusername;
            this.dirverpsw = ''
            this.dirvernote = item.dirvernote;
            this.showDialog = true;
        },
        confirmedit() {
            if (!this.dirvername || !this.dirverid || !this.dirverusername ||
                !this.dirverphone || !this.dirvercard || !this.dirverusername
            ) {
                if (!this.dirvername) {
                    this.nameErr = true
                } else {
                    this.nameErr = false
                }
                if (!this.dirverid) {
                    this.passErr = true
                } else {
                    this.passErr = false
                }
                if (!this.dirverphone) {
                    this.phonErr = true
                } else {
                    this.phonErr = false
                }
                if (!this.dirvercard) {
                    this.cardErr = true
                } else {
                    this.cardErr = false
                }
                if (!this.dirverusername) {
                    this.userdErr = true
                } else {
                    this.userdErr = false
                }
            } else {
                let editinfo
                if (this.dirverpsw == '') {
                    editinfo = {
                        _id: this._id,
                        dirvername: this.dirvername,
                        dirverid: this.dirverid,
                        dirverphone: this.dirverphone,
                        dirvercard: this.dirvercard,
                        dirverusername: this.dirverusername,
                        dirvernote: this.dirvernote
                    }
                } else {
                    editinfo = {
                        _id: this._id,
                        dirvername: this.dirvername,
                        dirverid: this.dirverid,
                        dirverphone: this.dirverphone,
                        dirvercard: this.dirvercard,
                        dirverusername: this.dirverusername,
                        dirverpsw: this.dirverpsw,
                        dirvernote: this.dirvernote
                    }
                }
                axios
                    .post(config.server + "/dirver/edit", editinfo)
                    .then(response => {
                        if (response.data.code == 1) {
                            this.error = true;
                            this.errormsg = response.data.msg;
                            setTimeout(() => {
                                this.error = false;
                            }, 3000);
                        } else {
                            this.successdmsg = true;
                            this.showDialog = false;
                            this.getalldirver();
                            setTimeout(() => {
                                this.successdmsg = false;
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.error = true;
                        this.errormsg = response.data.msg;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    });
            }
        },
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
        adddirver() {
            if (!this.dirvername || !this.dirverid || !this.dirverusername ||
                !this.dirverpsw || !this.dirverphone ||
                !this.dirvercard || !this.dirverusername
            ) {
                if (!this.dirvername) {
                    this.nameErr = true
                } else {
                    this.nameErr = false
                }
                if (!this.dirverid) {
                    this.passErr = true
                } else {
                    this.passErr = false
                }
                if (!this.dirverphone) {
                    this.phonErr = true
                } else {
                    this.phonErr = false
                }
                if (!this.dirvercard) {
                    this.cardErr = true
                } else {
                    this.cardErr = false
                }
                if (!this.dirverusername) {
                    this.userdErr = true
                } else {
                    this.userdErr = false
                }
                if (!this.dirverpsw) {
                    this.pswdErr = true
                } else {
                    this.pswdErr = false
                }
            } else {
                this.nameErr = false
                this.passErr = false
                this.phonErr = false
                this.cardErr = false
                this.userdErr = false
                this.pswdErr = false
                axios
                    .post(config.server + "/dirver", {
                        dirvername: this.dirvername,
                        dirverid: this.dirverid,
                        dirverphone: this.dirverphone,
                        dirvercard: this.dirvercard,
                        dirverusername: this.dirverusername,
                        dirverpsw: this.dirverpsw,
                        dirvernote: this.dirvernote
                    })
                    .then(response => {
                        if (response.data.code == 1) {
                            this.error = true;
                            this.errormsg = response.data.msg;
                            setTimeout(() => {
                                this.error = false;
                            }, 3000);
                        } else {
                            this.successdmsg = true;
                            this.showDialog = false;
                            this.getalldirver();
                            setTimeout(() => {
                                this.successdmsg = false;
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.error = true;
                        this.errormsg = response.data.msg;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    });
            }
        }
    }
};
</script>

<style scoped>
#dirver {
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
    width: 300px;
}

.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    font-size: 20px;
    line-height: 50px;
}

.editdialog {
    width: 500px;
}

.rmDialog-center {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 20px;
    font-size: 20px;
    width: 100%
}

.rmDialog-center-left {
    flex-basis: 25%;
    text-align: left;
}

.rmDialog-center-right {
    flex-basis: 60%;
    text-align: left;
}
</style>
