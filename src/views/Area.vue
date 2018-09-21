<template>
    <div id="area">
        <div class="topbutton">

            <div class="topbutton-left">
            </div>

            <div class="topbutton-center">
            </div>

            <div class="topbutton-right">
                <div class="addbutton">
                    <md-button class="md-raised md-primary" @click="showDialog" style="font-size:20px;width:100px;height:40px;">+ 添加</md-button>
                </div>
            </div>

        </div>

        <div class="centerarea">

            <div class="card" style="width:350px;height:140px;margin:10px 10px;box-shadow: 1px 1px 5px;" v-for="(item , index) in areaArray" :key="index">
                <div class="card-left">
                    <img src="../../public/img/card-weather.jpg" alt="weather" style="width:120px;padding:10px 0 0 0">
                </div>
                <div class="card-right">
                    <div style="font-size:20px;padding-top:24px">
                        <span>{{item.areaName}}</span>
                    </div>
                    <div style="font-size:14px;padding-top:10px">
                        <span style="color:rgba(0,0,0,0.5)">{{item.areaDescription}}</span>
                    </div>
                    <div class="card-right-bottom" style="padding-top: 16px;font-size:18px;">
                        <div>
                            <md-button @click="removeArea(item)">
                                <span>删除</span>
                            </md-button>
                        </div>
                        <div>
                            <md-button @click="editArea(item)">
                                <span>修改</span>
                            </md-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 弹出框 -->
        <md-dialog :md-active.sync="infoDialog">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">{{areaTitle}}</span>
            </md-dialog-title>
            <md-dialog-content style="padding: 0 15px 0px;">
                <div style="border: 3px dashed #eee">
                    <div style="padding:0 8px">
                        <md-field style="margin:30px auto">
                            <label style="font-size:18px">地区名称</label>
                            <md-input v-model="areaName" style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align: center;"></md-input>
                            <span class="md-error">必填标识信息</span>
                        </md-field>
                    </div>
                    <div style="padding:0 8px">
                        <md-field style="margin:30px auto">
                            <label style="font-size:18px">地区描述</label>
                            <md-input v-model="areaDescription" style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align: center;"></md-input>
                        </md-field>
                    </div>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-raised" @click="infoDialog = false">关闭</md-button>
                <md-button class="md-raised md-primary" @click="confirmEditArea" v-if="editMode">修改</md-button>
                <md-button class="md-raised md-primary" @click="saveArea" v-else>保存</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- 弹出框 -->
        <!-- 提示框 -->
        <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutLeft">
            <div class="tipDialog" v-if="showTipDialog">
                <div>
                    <span> {{tipMsg}}</span>
                </div>
            </div>
        </transition>
        <!-- 提示框 -->
        <!-- 删除确认框 -->
        <md-dialog :md-active.sync="confirmRemove">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">确认删除</span>
            </md-dialog-title>
            <md-dialog-content style="padding: 0 15px 0px;">
                <div style="border: 3px dashed #eee">
                    <div class="removeDialog-body">
                        <div class="removeDialog-body-left">
                            <span>地区名称</span>
                        </div>
                        <div class="removeDialog-body-right">
                            <span>{{areaName}}</span>
                        </div>
                    </div>
                    <div class="removeDialog-body">
                        <div class="removeDialog-body-left">
                            <span>地区描述</span>
                        </div>
                        <div class="removeDialog-body-right">
                            <span>{{areaDescription}}</span>
                        </div>
                    </div>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-raised" @click="confirmRemove = false">关闭</md-button>
                <md-button class="md-raised md-accent" @click="confirmRemoveArea">删除</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- 删除确认框 -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";

export default {
    data() {
        return {
            infoDialog: false,
            showTipDialog: false,
            confirmRemove: false,
            areaTitle: "添加地区",
            areaName: "",
            areaDescription: "",
            _id: "",
            areaArray: [],
            editMode: false,
            tipMsg: ""
        };
    },
    mounted() {
        this.getAllArea();
    },
    methods: {
        showDialog() {
            this.areaTitle = "添加地区";
            this.areaName = "";
            this.areaDescription = "";
            this.editMode = false;
            this.infoDialog = true;
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
        saveArea() {
            axios
                .post(config.server + "/area/post", {
                    areaName: this.areaName,
                    areaDescription: this.areaDescription
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.getAllArea();
                        this.tipMsg = "新增区域成功";
                        this.showTipDialog = true;
                        this.infoDialog = false;
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 2000);
                    } else {
                        console.log(doc);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        editArea(item) {
            this.areaName = item.areaName;
            this.areaDescription = item.areaDescription;
            this._id = item._id;
            this.areaTitle = "修改区域";
            this.infoDialog = true;
            this.editMode = true;
        },
        confirmEditArea() {
            axios
                .post(config.server + "/area/update", {
                    areaName: this.areaName,
                    areaDescription: this.areaDescription,
                    _id: this._id
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.tipMsg = "区域修改成功";
                        this.infoDialog = false;
                    } else if (doc.data.code === 1) {
                        this.tipMsg = doc.data.msg;
                    } else {
                        this.tipMsg = "出现错误";
                        this.infoDialog = false;
                        console.log(doc.data.error);
                    }
                    this.showTipDialog = true;
                    this.getAllArea();
                    setTimeout(() => {
                        this.showTipDialog = false;
                    }, 2000);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        removeArea(item) {
            this.areaName = item.areaName;
            this.areaDescription = item.areaDescription;
            this._id = item._id;
            this.confirmRemove = true;
        },
        confirmRemoveArea() {
            axios
                .post(config.server + "/area/remove", {
                    _id: this._id
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.tipMsg = "区域删除成功";
                        this.confirmRemove = false;
                    } else {
                        this.tipMsg = "出现错误";
                        this.confirmRemove = false;
                        console.log(doc.data.error);
                    }
                    this.showTipDialog = true;
                    this.getAllArea();
                    setTimeout(() => {
                        this.showTipDialog = false;
                    }, 2000);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
#area {
    width: 80%;
    margin: 20px auto;
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

.topbutton-center {
    flex-basis: 30%;
    text-align: center;
    margin: 0 auto;
}

.topbutton-right {
    flex-basis: 30%;
    text-align: right;
}

.centerarea {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.card {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.card-left {
    margin: 0 auto;
}

.card-right {
    margin: 0 auto;
}

.card-right-bottom {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.tipDialog {
    position: fixed;
    left: 0;
    bottom: 40px;
    background-color: rgba(192, 230, 22, 0.6);
    width: 200px;
    height: 40px;
    line-height: 40px;
    box-shadow: 1px 1px 5px;
    z-index: 20;
}

.removeDialog-body {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    margin: 5px 5px;
}

.removeDialog-body-left {
    flex-basis: 35%;
}
.removeDialog-body-right {
    flex-basis: 60%;
}
</style>
