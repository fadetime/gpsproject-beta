<template>
    <div id="dirver">
        <div class="topbutton">
            <div class="topbutton-left">
                <input type="text" v-model="searchDirver" @keyup.enter="search" placeholder="搜索司机信息">
            </div>
            <div class="topbutton-right">
                <md-button class="md-raised md-primary" @click="adddirverbutton" style="font-size:16px;width:80px;height:35px;">+ 添加</md-button>
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
            <!-- 司机页码 -->
            <div class="page-bar">
                <div class="page-bar-body" v-if="pageCount!=1">
                    <ul style="width:410px">
                        <li @click="pageButton('A')">
                            <span>上一页</span>
                        </li>
                        <li v-for="(item,index) in pages" :key="index" @click="pageButton(item)" :class="{'active':pageNow == item}">
                            <span>{{item}}</span>
                        </li>
                        <li @click="pageButton('B')">
                            <span>下一页</span>
                        </li>
                        <li>
                            <span>共
                                <i>{{pageCount}}</i>页</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Dialog start-->
        <md-dialog :md-active.sync="showDialog" style="width:700px">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:12px">
                <span style="color:#fff">司机管理</span>
            </md-dialog-title>
            <md-dialog-content style="padding: 0 24px;">
                <div style="border: 3px dashed #eee">
                    <div class="dialog-body">
                        <div class="dialog-body-item" style="padding-top:24px">
                            <input type="file" style="display:none" id="upload_file" @change="fileChange($event)" accept="image/*">
                            <div class="photoarea" @click="uploadFile" v-if="!driverImage">
                                <md-icon class="md-size-3x" style="padding-top:110px" v-if="!updateImagePreview">add_a_photo</md-icon>
                                <img :src="updateImagePreview" alt="newimg" v-else>
                            </div>
                            <div class="photoarea" @click="uploadFile" v-else>
                                <img :src="driverImage | imgurl" alt="newimg">
                            </div>
                        </div>
                        <div class="dialog-body-item">
                            <md-field style="margin:0 auto" :class="nameclass">
                                <label style="font-size:20px">司机姓名</label>
                                <md-input v-model="dirvername" style="border-bottom: 1px solid #000;font-size:18px;height:50px;text-align:center"></md-input>
                                <span class="md-error" style="font-size:15px;margin: -10px auto;">标识人员姓名</span>
                            </md-field>

                            <md-field style="margin:20px auto" :class="cardclass">
                                <label for="dirvercard" style="font-size:20px">驾照类型</label>
                                <md-select v-model="dirvercard" name="dirvercard" id="dirvercard" style="border-bottom: 1px solid #000;font-size:18px;height:55px;max-width: 500px;padding-top:21px">
                                    <md-option value="Class 3A">Class 3A</md-option>
                                    <md-option value="Class 3">Class 3</md-option>
                                    <md-option value="Class 4A">Class 4A</md-option>
                                    <md-option value="Class 4">Class 4</md-option>
                                    <md-option value="Class 5">Class 5</md-option>
                                </md-select>
                            </md-field>

                            <md-field style="margin:30px auto" :class="phonclass">
                                <label style="font-size:20px">联系方式</label>
                                <md-input v-model="dirverphone" style="border-bottom: 1px solid #000;font-size:18px;height:50px;text-align:center" @change="check_phone($event)"></md-input>
                                <span class="md-error" style="font-size:15px;margin: -10px auto;">请输入8位整数</span>
                            </md-field>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <div class="dialog-body-item">
                            <md-field style="margin:0 auto" :class="userclass">
                                <label style="font-size:20px">用户名</label>
                                <md-input v-model="dirverusername" style="border-bottom: 1px solid #000;font-size:18px;height:50px;text-align:center"></md-input>
                                <span class="md-error" style="font-size:15px;margin: -10px auto;">登陆用户名</span>
                            </md-field>

                            <md-field style="margin:20px auto" :class="pswclass">
                                <label style="font-size:20px">密码</label>
                                <md-input v-model="dirverpsw" type="password" style="border-bottom: 1px solid #000;font-size:18px;height:50px;text-align:center"></md-input>
                                <span class="md-error" style="font-size:15px;margin: -10px auto;">标识密码</span>
                            </md-field>
                        </div>

                        <div class="dialog-body-item">
                            <md-field style="margin:0 auto" :class="passclass">
                                <label style="font-size:20px">准证号码</label>
                                <md-input v-model="dirverid" style="border-bottom: 1px solid #000;font-size:18px;height:50px;text-align:center"></md-input>
                                <span class="md-error" style="font-size:15px;margin: -10px auto;">人员标识信息，必填项目</span>
                            </md-field>

                            <md-field style="margin:20px auto">
                                <label style="font-size:20px">备注</label>
                                <md-input v-model="dirvernote" style="border-bottom: 1px solid #000;font-size:18px;height:50px;text-align:center"></md-input>
                            </md-field>
                        </div>
                    </div>

                </div>
            </md-dialog-content>
            <md-dialog-actions style="margin:0 auto 10px auto">
                <md-button class="md-raised md-primary" @click="showDialog = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
                <md-button class="md-raised md-primary" v-if="savemode" @click="adddirver" style="font-size:20px;width:100px;height:40px">保存</md-button>
                <md-button class="md-raised md-primary" v-else @click="confirmedit" style="font-size:20px;width:100px;height:40px">修改</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- Dialog end-->

        <!-- deleteDialog start-->
        <md-dialog :md-active.sync="deleteDialog" class="editdialog">
            <md-dialog-title style="font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">删除司机</span>
            </md-dialog-title>
            <div style="padding:0 10px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;overflow-x:hidden;overflow-y:auto;margin:0 20px 20px" class="deldialog">
                <div class="deldialog-left">
                    <div class="photoarea">
                        <img src="../../public/img/ebuyLogo.png" alt="ebuylogo" style="object-fit:unset;padding:50px 0" v-if="!driverImage">
                        <img :src="driverImage | imgurl" alt="newimg" v-else>
                    </div>
                </div>
                <div class="deldialog-right">
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

            </div>
            <div style="justify-content: center;display: flex;box-shadow:0 -1px 5px #000">
                <md-dialog-actions style="margin:5px auto">
                    <md-button class="md-raised md-primary" @click="deleteDialog = false" style="font-size:20px;width:100px;height:40px">关闭</md-button>
                    <md-button class="md-raised md-accent" @click="confirmdelete" style="font-size:20px;width:100px;height:40px">删除</md-button>
                </md-dialog-actions>
            </div>
        </md-dialog>
        <!-- deleteDialog end-->
        <!-- successd mesage start -->
        <md-dialog-alert :md-active.sync="successdmsg" md-content="操作成功" md-confirm-text="关闭" />
        <!-- successd mesage end -->
        <!-- error start -->
        <md-dialog-alert :md-active.sync="error" :md-content="errormsg" md-confirm-text="关闭" />
        <!-- error end -->
        <!-- tip box start -->
		<transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutLeft">
			<div class="tipDialog" v-if="showTipDialog">
				<div>
					<span> {{tipMsg}}</span>
				</div>
			</div>
		</transition>
		<!-- tip box end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";
import lrz from "lrz";

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
            pageCount: 0, // 总页码
            pageNow: 1, // 当前页码
            pageSize: 10, //每页显示条数
            showItem: 5, // 最少显示5个页码
            findMode: false,
            updateImagePreview: "",
            updateImage: "",
            driverImage: "",
            showTipDialog:false,
            tipMsg:''
        };
    },
    mounted() {
        this.getalldirver();
    },
    computed: {
        pages: function() {
            let pag = [];
            if (this.pageNow < this.showItem) {
                //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                let i = Math.min(this.showItem, this.pageCount);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                //当前页数大于显示页数了
                let middle = this.pageNow - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > this.pageCount - this.showItem) {
                    middle = this.pageCount - this.showItem + 1;
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag;
        },
        nameclass() {
            return {
                "md-invalid": this.nameErr
            };
        },
        passclass() {
            return {
                "md-invalid": this.passErr
            };
        },
        phonclass() {
            return {
                "md-invalid": this.phonErr
            };
        },
        cardclass() {
            return {
                "md-invalid": this.cardErr
            };
        },
        userclass() {
            return {
                "md-invalid": this.userdErr
            };
        },
        pswclass() {
            return {
                "md-invalid": this.pswdErr
            };
        }
    },
    methods: {
        check_phone(event) {
            let value = event.target.value;
            if (!/^[0-9]{8}$/.test(value)) {
                this.phonErr = true;
            } else {
                this.phonErr = false;
            }
        },
        fileChange(el) {
            if (typeof FileReader === "undefined") {
                return alert("浏览器不支持上传图片");
            }
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            );
            this.updateImage = el.target.files[0];
            this.driverImage = "";
            el.target.value = "";
        },

        uploadFile() {
            document.getElementById("upload_file").click();
        },

        search(item) {
            this.pageNow = 1;
            if (this.searchDirver == "") {
                this.findMode = false;
                this.getalldirver();
            } else {
                this.findMode = true;
                axios
                    .post(config.server + "/dirver/find", {
                        word: this.searchDirver,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.alldirverinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                        if (res.data.code === 1) {
                            this.showTipDialog = true;
                            this.tipMsg = res.data.msg;
                            this.searchDirver = "";
                            this.getalldirver();
                            setTimeout(() => {
                                this.showTipDialog = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        adddirverbutton() {
            this.updateImagePreview = "";
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
            this.driverImage = item.image;
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
            this.updateImagePreview = "";
            this.savemode = false;
            this._id = item._id;
            this.dirvername = item.dirvername;
            this.dirverid = item.dirverid;
            this.dirverphone = item.dirverphone;
            this.dirvercard = item.dirvercard;
            this.dirverusername = item.dirverusername;
            this.dirverpsw = "";
            this.dirvernote = item.dirvernote;
            this.driverImage = item.image;
            this.showDialog = true;
        },

        pageButton(item) {
            if (item === "A") {
                if (this.pageNow > 1) {
                    this.pageNow = this.pageNow - 1;
                }
            } else if (item === "B") {
                if (this.pageNow < this.pageCount) {
                    this.pageNow = this.pageNow + 1;
                }
            } else {
                this.pageNow = item;
            }
            if (this.findMode === false) {
                axios
                    .post(config.server + "/dirver/get", {
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.alldirverinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios
                    .post(config.server + "/dirver/find", {
                        word: this.searchDirver,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.alldirverinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        confirmedit() {
            if (
                !this.dirvername ||
                !this.dirverid ||
                !this.dirverusername ||
                !this.dirverphone ||
                !this.dirvercard ||
                this.phonErr ||
                !this.dirverusername
            ) {
                if (!this.dirvername) {
                    this.nameErr = true;
                } else {
                    this.nameErr = false;
                }
                if (!this.dirverid) {
                    this.passErr = true;
                } else {
                    this.passErr = false;
                }
                if (!this.dirverphone) {
                    this.phonErr = true;
                }
                if (!this.dirvercard) {
                    this.cardErr = true;
                } else {
                    this.cardErr = false;
                }
                if (!this.dirverusername) {
                    this.userdErr = true;
                } else {
                    this.userdErr = false;
                }
            } else {
                let payload = new FormData();
                let maxSize = 200 * 1024; //200KB

                if (this.dirverpsw != "") {
                    payload.append("dirverpsw", this.dirverpsw);
                }
                if (this.updateImagePreview != "") {
                    lrz(this.updateImage, {
                        quality: 0.5
                    }).then(res => {
                        if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                        }
                        let payloadImg = new FormData();
                        payloadImg.append("_id", this._id);
                        payloadImg.append("image", this.updateImage);
                        axios({
                            method: "post",
                            url: config.server + "/dirver/edit/img",
                            data: payloadImg,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                            .then(response => {
                                // console.log(response)
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    });
                }
                payload.append("_id", this._id);
                payload.append("dirvername", this.dirvername);
                payload.append("dirverid", this.dirverid);
                payload.append("dirverphone", this.dirverphone);
                payload.append("dirvercard", this.dirvercard);
                payload.append("dirverusername", this.dirverusername);
                payload.append("dirvernote", this.dirvernote);

                axios({
                    method: "post",
                    url: config.server + "/dirver/edit",
                    data: payload,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
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
        },
        getalldirver() {
            axios
                .post(config.server + "/dirver/get", {
                    pageSize: this.pageSize,
                    pageNow: this.pageNow
                })
                .then(res => {
                    this.alldirverinfo = res.data.doc;
                    this.pageCount = Math.ceil(res.data.count / this.pageSize);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        adddirver() {
            if (
                !this.dirvername ||
                !this.dirverid ||
                !this.dirverusername ||
                !this.dirverpsw ||
                !this.dirverphone ||
                this.phonErr ||
                !this.dirvercard ||
                !this.dirverusername
            ) {
                if (!this.dirvername) {
                    this.nameErr = true;
                } else {
                    this.nameErr = false;
                }
                if (!this.dirverid) {
                    this.passErr = true;
                } else {
                    this.passErr = false;
                }
                if (!this.dirverphone) {
                    this.phonErr = true;
                }
                if (!this.dirvercard) {
                    this.cardErr = true;
                } else {
                    this.cardErr = false;
                }
                if (!this.dirverusername) {
                    this.userdErr = true;
                } else {
                    this.userdErr = false;
                }
                if (!this.dirverpsw) {
                    this.pswdErr = true;
                } else {
                    this.pswdErr = false;
                }
            } else {
                this.nameErr = false;
                this.passErr = false;
                this.phonErr = false;
                this.cardErr = false;
                this.userdErr = false;
                this.pswdErr = false;
                let payload = new FormData();
                let maxSize = 200 * 1024; //200KB

                if (this.updateImage) {
                    lrz(this.updateImage, {
                        quality: 0.5
                    }).then(res => {
                        if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                        }
                        payload.append("image", this.updateImage);
                        payload.append("dirvername", this.dirvername);
                        payload.append("dirverid", this.dirverid);
                        payload.append("dirverphone", this.dirverphone);
                        payload.append("dirvercard", this.dirvercard);
                        payload.append("dirverusername", this.dirverusername);
                        payload.append("dirverpsw", this.dirverpsw);
                        payload.append("dirvernote", this.dirvernote);
                        axios({
                            method: "post",
                            url: config.server + "/dirver",
                            data: payload,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
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
                    });
                } else {
                    payload.append("dirvername", this.dirvername);
                    payload.append("dirverid", this.dirverid);
                    payload.append("dirverphone", this.dirverphone);
                    payload.append("dirvercard", this.dirvercard);
                    payload.append("dirverusername", this.dirverusername);
                    payload.append("dirverpsw", this.dirverpsw);
                    payload.append("dirvernote", this.dirvernote);
                    axios({
                        method: "post",
                        url: config.server + "/dirver",
                        data: payload,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
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
    }
};
</script>

<style scoped>
#dirver {
    width: 80%;
    margin: 15px auto;
}

.dialog-title {
    text-align: left;
    padding: 20px 0 0 15px;
}

.dialog-title span {
    font-size: 30px;
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
    height: 35px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 16px;
}

.topbutton-right {
    margin: 0 auto;
    flex-basis: 50%;
    text-align: right;
}

.centertable {
    margin: 15px auto;
}

.tabletitle {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    font-size: 18px;
    font-weight: 600;
    height: 40px;
    line-height: 35px;
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
    font-size: 18px;
    line-height: 29px;
}

.editdialog {
    width: 600px;
}

.rmDialog-center {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 20px;
    font-size: 20px;
    width: 100%;
}

.rmDialog-center-left {
    flex-basis: 35%;
    text-align: left;
}

.rmDialog-center-right {
    flex-basis: 60%;
    text-align: left;
}

.photoarea {
    margin: 0 auto;
    text-align: center;
    border: 3px dashed #696969;
    width: 250px;
    height: 250px;
    background-color: #eee;
}

.photoarea img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.deldialog {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.deldialog-left {
    flex-basis: 50%;
    padding: 12px 0;
}

.deldialog-right {
    flex-basis: 50%;
}
</style>
