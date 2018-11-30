<template>
    <div id="car">
        <div class="topbutton">
            <div class="topbutton-left">
                <input type="text"
                       v-model="selectedCar"
                       @keyup.enter="search"
                       placeholder="搜索车牌信息">
            </div>
            <div class="topbutton-right">
                <md-button class="md-raised md-primary"
                           @click="newCar"
                           style="font-size:16px;width:80px;height:35px;">+ 添加</md-button>
            </div>
        </div>
        <div class="centertable">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>车牌</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>车型</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>包含尾门</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>包含冷藏</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>备注</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>检查记录</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>操作</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card md-with-hover
                     v-for="(item,index) in allcarinfo"
                     :key="index"
                     style="background-color: #eff3f5;">
                <md-card-content>
                    <div class="tablebody">
                        <div class="tabletitle-item">
                            <span>{{item.carid}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.cartype}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.tailgate}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.coolstore}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.carnote}}</span>
                        </div>
                        <div class="tabletitle-item"
                             @click="openClickCarLog(item)">
                            <md-icon style="font-size: 34px!important;">list_alt</md-icon>
                        </div>
                        <div class="tabletitle-item">
                            <img src="../../public/img/icons/edit.png"
                                 alt="edit"
                                 @click="editbutton(item)"
                                 style="width:20px;margin:0 10px">
                            <img src="../..//public/img/icons/dele.png"
                                 alt="delete"
                                 @click="removebutton(item)"
                                 style="width:30px;margin:0 10px">
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- 客户页码 -->
            <div class="page-bar"
                 style="display: flex;justify-content: center;">
                <div class="page-bar-body"
                     v-if="pageCount!=1">
                    <ul style="width:410px">
                        <li @click="pageButton('A')">
                            <span>上一页</span>
                        </li>
                        <li v-for="(item,index) in pages"
                            :key="index"
                            @click="pageButton(item)"
                            :class="{'active':pageNow == item}">
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
        <!-- New car dialog start -->
        <md-dialog :md-active.sync="newCarDialog"
                   class="editdialog">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:12px">
                <span style="color:#fff">车辆管理</span>
            </md-dialog-title>
            <md-dialog-content>
                <div style="border: 3px dashed #eee">

                    <div class="dialog-body">
                        <div class="dialog-body-item"
                             style="padding-top:24px">
                            <input type="file"
                                   style="display:none"
                                   id="upload_file"
                                   @change="fileChange($event)"
                                   accept="image/*">
                            <div class="photoarea"
                                 @click="uploadFile"
                                 v-if="!carImage">
                                <md-icon class="md-size-3x"
                                         style="padding-top:110px"
                                         v-if="!updateImagePreview">add_a_photo</md-icon>
                                <img :src="updateImagePreview"
                                     alt="newimg"
                                     v-else>
                            </div>
                            <div class="photoarea"
                                 @click="uploadFile"
                                 v-else>
                                <img :src="carImage | imgurl"
                                     alt="newimg">
                            </div>

                        </div>
                        <div class="dialog-body-item">
                            <md-field style="margin:0 auto"
                                      :class="idclass">
                                <label style="font-size:20px">车牌号码</label>
                                <md-input v-model="carid"
                                          style="border-bottom: 1px solid #000;font-size:18px;height:50px;text-align:center"></md-input>
                                <span class="md-error"
                                      style="font-size:15px;margin: -2px auto">车辆标识信息，必填项目</span>
                            </md-field>

                            <!-- 下拉框 -->
                            <div class="container">
                                <div class="custom-selector">
                                    <div class="selector-header"
                                         style="position:relative"
                                         @click="callCarType">
                                        <div style="text-align:left;font-size:20px;color:rgba(0,0,0,0.54);position:absolute;padding-top:24px"
                                             v-if="!cartype">车型</div>
                                        <div style="border-bottom: 1px solid;padding:37px 0;text-align:left;font-size:18px;color:rgba(0,0,0,0.54);">{{cartype}}</div>
                                        <div style="position:absolute;top:32px;right:0">
                                            <img src="../../public/img/icons/arrowDown.png"
                                                 alt=""
                                                 style="width:40px"
                                                 class="arrow"
                                                 id="selector-arrow-type">
                                        </div>
                                    </div>
                                    <div class="selector-body"
                                         id="selector-body-type">
                                        <div class="box"
                                             id="selector-box-type"
                                             v-for="(item,index) in allCarType"
                                             :key="index"
                                             @click="choseTypeItem(item)">
                                            <span style="font-size:20px">{{item}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 下拉框 -->
                            <div class="dialog-body-item">
                                <div style="margin:16px auto">
                                    <span style="font-size:20px;color:rgba(0,0,0,0.54)">有无尾门</span>
                                </div>
                                <div class="dialog-body-radio">
                                    <div class="dialog-body-radio-item">
                                        <div>
                                            <input type="radio"
                                                   name="cartailgate"
                                                   v-model="tailgate"
                                                   value="yes">
                                        </div>
                                        <div style="font-size:15px;color:#000;padding-top:3px">
                                            <span>有</span>
                                        </div>

                                    </div>
                                    <div class="dialog-body-radio-item">
                                        <div>
                                            <input type="radio"
                                                   name="cartailgate"
                                                   v-model="tailgate"
                                                   value="no">
                                        </div>
                                        <div style="font-size:15px;color:#000;padding-top:3px">
                                            <span>无</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <div class="dialog-body-item">
                            <md-field style="margin:20px auto">
                                <label style="font-size:20px">备注</label>
                                <md-input v-model="carnote"
                                          style="border-bottom: 1px solid #000;font-size:18px;height:55px;text-align:center"></md-input>
                            </md-field>
                        </div>

                        <div class="dialog-body-item">
                            <div style="margin:8px auto">
                                <span style="font-size:20px;color:rgba(0,0,0,0.54)">有无冷藏</span>
                            </div>
                            <div class="dialog-body-radio">
                                <div class="dialog-body-radio-item">
                                    <div>
                                        <input type="radio"
                                               name="carstore"
                                               v-model="coolstore"
                                               value="yes">
                                    </div>
                                    <div style="font-size:15px;color:#000;padding-top:3px">
                                        <span>有</span>
                                    </div>

                                </div>
                                <div class="dialog-body-radio-item">
                                    <div>
                                        <input type="radio"
                                               name="carstore"
                                               v-model="coolstore"
                                               value="no">
                                    </div>
                                    <div style="font-size:15px;color:#000;padding-top:3px">
                                        <span>无</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </md-dialog-content>
            <div style="margin:8px auto 10px auto">
                <md-button class="md-raised md-primary"
                           @click="closeDialog"
                           style="font-size:18px;width:80px;height:30px">取消</md-button>
                <md-button class="md-raised md-primary"
                           v-if="addmode"
                           @click="addcar"
                           style="font-size:18px;width:80px;height:30px">保存</md-button>
                <md-button class="md-raised md-primary"
                           v-else
                           @click="confirmedit"
                           style="font-size:18px;width:80px;height:30px">修改</md-button>
            </div>
        </md-dialog>
        <!-- New car dialog start -->

        <!-- remove dialog start-->
        <md-dialog :md-active.sync="removeDialog"
                   class="removedialog">
            <md-dialog-title style="font-size:18px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">删除车辆</span>
            </md-dialog-title>
            <div style="margin:0 20px 20px 20px;box-shadow: 2px 2px 5px #636363;overflow-x:hidden;overflow-y:auto">
                <div class="deldialog">
                    <div class="deldialog-left">
                        <div class="photoarea">
                            <img src="../../public/img/ebuyLogo.png"
                                 alt="ebuylogo"
                                 style="object-fit:unset;padding:50px 0"
                                 v-if="!carImage">
                            <img :src="carImage | imgurl"
                                 alt="newimg"
                                 v-else>
                        </div>
                    </div>
                    <div class="deldialog-right">
                        <div class="rmDialog-center">
                            <div class="rmDialog-center-left">
                                <span>车牌号码:</span>
                            </div>
                            <div class="rmDialog-center-right">
                                <span>{{carid}}</span>
                            </div>
                        </div>
                        <div class="rmDialog-center">
                            <div class="rmDialog-center-left">
                                <span>车辆类型:</span>
                            </div>
                            <div class="rmDialog-center-right">
                                <span>{{cartype}}</span>
                            </div>
                        </div>
                        <div class="rmDialog-center">
                            <div class="rmDialog-center-left">
                                <span>有无尾门:</span>
                            </div>
                            <div class="rmDialog-center-right">
                                <span>{{tailgate}}</span>
                            </div>
                        </div>
                        <div class="rmDialog-center">
                            <div class="rmDialog-center-left">
                                <span>出车次数:</span>
                            </div>
                            <div class="rmDialog-center-right">
                                <span>{{cartimes}}</span>
                            </div>
                        </div>
                        <div class="rmDialog-center">
                            <div class="rmDialog-center-left">
                                <span>车辆备注:</span>
                            </div>
                            <div class="rmDialog-center-right">
                                <span>{{carnote}}</span>
                            </div>
                        </div>
                        <div class="rmDialog-center">
                            <div class="rmDialog-center-left">
                                <span>加入时间:</span>
                            </div>
                            <div class="rmDialog-center-right">
                                <span>{{cardate | datefilter}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="justify-content: center;display: flex;box-shadow:0 -1px 5px #000">
                <md-dialog-actions style="margin:5px auto">
                    <md-button class="md-raised md-primary"
                               @click="removeDialog = false"
                               style="font-size:18px;width:80px;height:30px">取消</md-button>
                    <md-button class="md-raised md-accent"
                               @click="confirmremove"
                               style="font-size:18px;width:80px;height:30px">删除</md-button>
                </md-dialog-actions>
            </div>

        </md-dialog>
        <!-- remove dialog end-->

        <!-- error start -->
        <md-dialog-alert :md-active.sync="error"
                         :md-content="errormsg"
                         md-confirm-text="关闭"
                         style="font-size:25px;z-index:999" />
        <!-- error end -->
        <!-- tip box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutLeft">
            <div class="tipDialog"
                 v-if="showTipDialog">
                <div>
                    <span> {{tipMsg}}</span>
                </div>
            </div>
        </transition>
        <!-- tip box end -->
        <!-- check car log box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="checkcar-back"
                 v-if="showCheckCarBox"
                 @click="showCheckCarBox=false"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div class="checkcar-front"
                 v-if="showCheckCarBox"
                 @click="showCheckCarBox=false">
                <div class="checkcar-front-box">
                    <div class="checkcar-front-box-top">
                        <span>检查记录</span>
                    </div>
                    <div v-if="carLog.length===0"
                         style="padding: 24px 100px;font-size: 16px;">
                        <span>~暂无记录~</span>
                    </div>
                    <div v-else
                         class="checkcar-front-box-body">
                        <div class="checkcar-front-box-body-title">
                            <div class="checkcar-front-box-body-title-item"
                                 style="width:160px">
                                <span>时间</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>司机</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>雨刷</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>大灯</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item"
                                 style="width:80px">
                                <span>后视镜</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>车胎</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item"
                                 style="width:90px">
                                <span>备用车胎</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>刹车</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>其他</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>框数(前)</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>框数(后)</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>清洁</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>描述</span>
                            </div>
                        </div>
                        <div class="checkcar-front-box-body-item"
                             v-for="(item , index) in carLog"
                             :key="index">
                            <div style="width:160px;text-align:left">
                                <span>{{item.date | datefilter}}{{item.date | timefilter}}</span>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:32px">
                                <span>{{item.driver}}</span>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:63px">
                                <md-icon v-if="item.wiper"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:59px">
                                <md-icon v-if="item.headlight"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:77px">
                                <md-icon v-if="item.mirror"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:65px">
                                <md-icon v-if="item.tyre"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:92px">
                                <md-icon v-if="item.backup"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <md-icon v-if="item.brake"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <md-icon v-if="!item.text"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <span>{{item.boxNum}}</span>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <span>{{item.boxNumAgain}}</span>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <md-icon v-if="item.clean"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:140px;text-align:center">
                                <span>{{item.text}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="checkcar-front-box-bottom">
                        <md-button class="md-raised md-primary"
                                   @click="showCheckCarBox=false"
                                   style="font-size:16px;width:80px;height:35px;">关闭</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check car log box end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";
import lrz from "lrz";

export default {
    name: "Car",
    data() {
        return {
            addmode: true,
            successdmsg: false,
            error: false,
            errormsg: "发生未知错误请联系更牛逼的人",
            error2: false,
            error3: false,
            carid: "",
            cartype: "",
            cartimes: "",
            carnote: "",
            cardate: "",
            _id: "",
            removeDialog: false,
            newCarDialog: false,
            selectedCar: "",
            tailgate: "no",
            coolstore: "no",
            searchCar: [],
            allcarinfo: [],
            searching: false,
            idErr: false,
            typeErr: false,
            pageCount: 0, // 总页码
            pageNow: 1, // 当前页码
            pageSize: 15, //每页显示条数
            showItem: 5, // 最少显示5个页码
            findMode: false,
            updateImagePreview: "",
            updateImage: "",
            carImage: "",
            callFlag: false,
            allCarType: ["Van", "10ft Lorry", "14ft Lorry", "24ft Lorry"],
            selectorCarType: "车型",
            showTipDialog: false,
            tipMsg: "",
            showCheckCarBox: false,
            carLog: []
        };
    },

    mounted() {
        this.getallcar();
    },

    activated() {
        this.getallcar();
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

        idclass() {
            return {
                "md-invalid": this.idErr
            };
        },

        typeclass() {
            return {
                "md-invalid": this.typeErr
            };
        }
    },
    methods: {
        openClickCarLog(item) {
            axios
                .post(config.server + "/checkcar/get", {
                    car_id: item._id
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.carLog = doc.data.item;
                        this.showCheckCarBox = true;
                        console.log(this.carLog);
                    } else {
                        console.log(doc);
                        this.tipMsg = "出现未知错误";
                        this.showTipDialog = true;
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 下拉框部分 start
        callCarType() {
            if (this.callFlag) {
                this.bodyHideCarType();
            } else {
                this.bodyShowCarType();
            }
        },

        bodyHideCarType() {
            let body = document.querySelector("#selector-body-type");
            body.style.height = "0px";
            body.style.transition = "0.25s";
            let arrow = document.querySelector("#selector-arrow-type");
            arrow.style.transform = "rotate(-90deg)";
            arrow.style.transition = "0.25s";
            this.callFlag = false;
        },

        bodyShowCarType() {
            let body = document.querySelector("#selector-body-type");
            let boxes = document.querySelectorAll("#selector-box-type");
            let arrow = document.querySelector("#selector-arrow-type");
            arrow.style.transform = "rotate(0deg)";
            body.style.height = "180px";
            arrow.style.transition = "0.25s";
            let height = 4;
            boxes.forEach(box => {
                height += box.clientHeight;
            });
            body.style.transition = "0.25s";
            body.style.display = "block";
            this.callFlag = true;
        },

        choseTypeItem(item) {
            this.selectorCarType = item;
            this.cartype = item;
            this.bodyHideCarType();
        },
        // 下拉框部分 end
        uploadFile() {
            document.getElementById("upload_file").click();
        },

        fileChange(el) {
            if (typeof FileReader === "undefined") {
                return alert("浏览器不支持上传图片");
            }
            console.log("###");
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            );
            this.updateImage = el.target.files[0];
            this.carImage = "";
            el.target.value = "";
        },

        closeDialog() {
            this.callFlag = false;
            this.newCarDialog = false;
            this.updateImagePreview = null;
        },

        newCar() {
            this.addmode = true;
            this.carid = "";
            this.cartype = "";
            this.carnote = "";
            this.carImage = "";
            this.newCarDialog = true;
            this.tailgate = "no";
            this.coolstore = "no";
        },
        search(item) {
            if (this.selectedCar == "") {
                this.findMode = false;
                this.getallcar();
            } else {
                this.findMode = true;
                axios
                    .post(config.server + "/car/find", {
                        word: this.selectedCar,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allcarinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                        if (res.data.code === 1) {
                            this.showTipDialog = true;
                            this.tipMsg = res.data.msg;
                            this.selectedCar = "";
                            this.getallcar();
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
        editbutton(item) {
            this.addmode = false;
            this._id = item._id;
            this.carid = item.carid;
            this.cartype = item.cartype;
            this.tailgate = item.tailgate;
            this.coolstore = item.coolstore;
            this.carnote = item.carnote;
            this.carImage = item.image;
            this.newCarDialog = true;
        },
        removebutton(item) {
            this._id = item._id;
            this.carid = item.carid;
            this.cartype = item.cartype;
            this.tailgate = item.tailgate;
            this.cartimes = item.cartimes;
            this.carnote = item.carnote;
            this.carImage = item.image;
            this.cardate = item.cardate;
            this.removeDialog = true;
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
            if (this.findmode === false) {
                axios
                    .post(config.server + "/car/get", {
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allcarinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios
                    .post(config.server + "/car/find", {
                        word: this.selectedCar,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allcarinfo = res.data.doc;
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
            if (this.updateImagePreview) {
                let payload = new FormData();
                let maxSize = 200 * 1024; //200KB
                lrz(this.updateImage, {
                    quality: 0.5
                }).then(res => {
                    if (this.updateImage.size > maxSize) {
                        this.updateImage = res.file;
                    }
                    payload.append("image", this.updateImage);
                    payload.append("_id", this._id);
                    payload.append("logOperator", localStorage.getItem("name"));
                    axios({
                        method: "post",
                        url: config.server + "/car/update/img",
                        data: payload,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                        .then(doc => {
                            // console.log(doc)
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            }
            axios
                .post(config.server + "/car/update", {
                    _id: this._id,
                    carid: this.carid,
                    cartype: this.cartype,
                    tailgate: this.tailgate,
                    coolstore: this.coolstore,
                    carnote: this.carnote,
                    logOperator: localStorage.getItem("name")
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.error = true;
                        this.errormsg = res.data.msg;
                        this.getallcar();
                        this.closeDialog();
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    } else {
                        this.error = true;
                        this.errormsg = res.data.msg;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        confirmremove() {
            axios
                .post(config.server + "/car/remove", {
                    _id: this._id,
                    logOperator: localStorage.getItem("name")
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.error = true;
                        this.errormsg = res.data.msg;
                        this.removeDialog = false;
                        this.getallcar();
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    } else {
                        this.error = true;
                        this.errormsg = res.data.msg;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getallcar() {
            axios
                .post(config.server + "/car/get", {
                    pageSize: this.pageSize,
                    pageNow: this.pageNow
                })
                .then(res => {
                    this.allcarinfo = res.data.doc;
                    this.pageCount = Math.ceil(res.data.count / this.pageSize);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        addcar() {
            if (!this.carid || !this.cartype) {
                if (!this.carid) {
                    this.idErr = true;
                } else {
                    this.idErr = false;
                }
                if (!this.cartype) {
                    this.typeErr = true;
                } else {
                    this.typeErr = false;
                }
            } else {
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
                        payload.append("carid", this.carid);
                        payload.append("cartype", this.cartype);
                        payload.append("tailgate", this.tailgate);
                        payload.append("coolstore", this.coolstore);
                        payload.append("carnote", this.carnote);
                        payload.append(
                            "logOperator",
                            localStorage.getItem("name")
                        );
                        axios({
                            method: "post",
                            url: config.server + "/car",
                            data: payload,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                            .then(response => {
                                if (
                                    response.data.code == 1 ||
                                    response.data.code == 2
                                ) {
                                    this.error = true;
                                    this.errormsg = response.data.msg;
                                    setTimeout(() => {
                                        this.error = false;
                                    }, 3000);
                                } else {
                                    this.getallcar();
                                    this.error = true;
                                    this.errormsg = response.data.msg;
                                    this.closeDialog();
                                    this.carid = "";
                                    this.cartype = "";
                                    this.tailgate = "";
                                    this.carnote = "";
                                    this.selectorCarType = "车型";
                                    setTimeout(() => {
                                        this.error = false;
                                    }, 3000);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                error = true;
                                errormsg = error;
                                setTimeout(() => {
                                    this.error = false;
                                }, 3000);
                            });
                    });
                } else {
                    payload.append("carid", this.carid);
                    payload.append("cartype", this.cartype);
                    payload.append("tailgate", this.tailgate);
                    payload.append("coolstore", this.coolstore);
                    payload.append("carnote", this.carnote);
                    payload.append("logOperator", localStorage.getItem("name"));
                    axios({
                        method: "post",
                        url: config.server + "/car",
                        data: payload,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                        .then(response => {
                            if (
                                response.data.code == 1 ||
                                response.data.code == 2
                            ) {
                                this.error = true;
                                this.errormsg = response.data.msg;
                                setTimeout(() => {
                                    this.error = false;
                                }, 3000);
                            } else {
                                this.getallcar();
                                this.error = true;
                                this.errormsg = response.data.msg;
                                this.closeDialog();
                                this.carid = "";
                                this.cartype = "";
                                this.tailgate = "";
                                this.carnote = "";
                                this.selectorCarType = "车型";
                                setTimeout(() => {
                                    this.error = false;
                                }, 3000);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            error = true;
                            errormsg = error;
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
#car {
    width: 80%;
    margin: 15px auto;
}

.dialog-title {
    text-align: left;
    padding: 26px 0 0 26px;
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
    width: 250px;
    font-size: 16px;
    line-height: 29px;
}

.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    line-height: 50px;
}

.editdialog {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.removedialog{
	display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
	width: 600px;
	height: 426px;
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
    flex-basis: 65%;
    text-align: left;
}

.dialog-body-radio {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    border-bottom: 1px solid;
    padding: 12px 0;
}

.dialog-body-radio input {
    width: 20px;
    height: 20px;
}

.dialog-body-radio-item {
    flex-basis: 45%;
    margin: 0 auto;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.windowdialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 20;
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
    width: 243px;
}

.box:hover {
    background-color: dodgerblue;
    color: white;
    transition: 0.5s;
}

.checkcar-back {
    background: rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 23;
}

.checkcar-front {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    justify-content: center;
    align-items: center;
}

.checkcar-front-box {
    background: #fff;
}

.checkcar-front-box-top {
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    background: #ff5252;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
    text-align: left;
    padding-left: 24px;
}

.checkcar-front-box-body {
    padding: 20px 24px;
}

.checkcar-front-box-body-title {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    color: #6a6a6a;
    border-bottom: 1px solid #696969;
    height: 30px;
}

.checkcar-front-box-body-title-item {
    width: 60px;
    text-align: left;
}

.checkcar-front-box-body-item {
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
}

.checkcar-front-box-body-center-item {
    width: 50px;
    text-align: right;
}

@media screen and (min-width: 1025px) {
	.editdialog{
		width: 600px;
	}	
}
</style>
