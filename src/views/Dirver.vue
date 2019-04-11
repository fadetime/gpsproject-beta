<template>
    <div id="dirver">
        <div class="topbutton">
            <div class="topbutton-left">
                <input type="text"
                       v-model="searchDirver"
                       @keyup.enter="search"
                       placeholder="搜索司机信息">
            </div>
            <div class="topbutton-right">
                <button @click="isShowStaffInfo = true">testbutton</button>
                <md-button class="md-raised md-primary"
                           @click="adddirverbutton"
                           style="font-size:16px;width:80px;height:35px;">+ 添加</md-button>
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

            <md-card md-with-hover
                     v-for="(item,index) in alldirverinfo"
                     :key="index"
                     style="background-color: #eff3f5;">
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
                            <img src="../../public/img/icons/edit.png"
                                 alt="edit"
                                 @click="editbutton(item)"
                                 style="width:20px;margin:0 10px">
                            <img src="../..//public/img/icons/dele.png"
                                 alt="delete"
                                 @click="deletebutton(item)"
                                 style="width:30px;margin:0 10px">
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- 司机页码 -->
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
                                <i>{{pageCount}}</i>页
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Dialog start-->
        <md-dialog :md-active.sync="showDialog"
                   class="driverdialog">
            <md-dialog-title style="font-size:18px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:12px;line-height: 20px;">
                <span style="color:#fff">人员管理</span>
            </md-dialog-title>
            <md-dialog-content style="padding: 0 24px;">
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
                                 v-if="!driverImage">
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
                                <img :src="driverImage | imgurl"
                                     alt="newimg">
                            </div>
                        </div>
                        <div class="dialog-body-item">
                            <md-field style="margin:0 auto"
                                      :class="nameclass">
                                <label style="font-size:16px">司机姓名</label>
                                <md-input v-model="dirvername"
                                          style="border-bottom: 1px solid #000;font-size:16px;height:32px;text-align:center"></md-input>
                                <span class="md-error"
                                      style="font-size:15px;margin: -10px auto;">标识人员姓名</span>
                            </md-field>

                            <md-field style="margin:10px auto 0 auto"
                                      :class="nameclass">
                                <label style="font-size:16px">英文姓名</label>
                                <md-input v-model="name_en"
                                          style="border-bottom: 1px solid #000;font-size:16px;height:32px;text-align:center"></md-input>
                                <span class="md-error"
                                      style="font-size:15px;margin: -10px auto;">标识人员姓名</span>
                            </md-field>

                            <md-field style="margin:20px auto"
                                      :class="cardclass">
                                <label for="dirvercard"
                                       style="font-size:16px">驾照类型</label>
                                <md-select v-model="dirvercard"
                                           name="dirvercard"
                                           id="dirvercard"
                                           style="border-bottom: 1px solid #000;font-size:16px;height:33px;max-width: 500px;text-align: center;">
                                    <md-option value="Class 3A">Class 3A</md-option>
                                    <md-option value="Class 3">Class 3</md-option>
                                    <md-option value="Class 4A">Class 4A</md-option>
                                    <md-option value="Class 4">Class 4</md-option>
                                    <md-option value="Class 5">Class 5</md-option>
                                </md-select>
                            </md-field>

                            <md-field style="margin:30px auto"
                                      :class="phonclass">
                                <label style="font-size:16px">联系方式</label>
                                <md-input v-model="dirverphone"
                                          style="border-bottom: 1px solid #000;font-size:16px;height:32px;text-align:center"
                                          @change="check_phone($event)"></md-input>
                                <span class="md-error"
                                      style="font-size:15px;margin: -10px auto;">请输入8位整数</span>
                            </md-field>
                            <div @click="choiseRoleMethod" class="choiseroleclass">
                                <div style="border: 2px dashed #696969;text-align: center;height: 40px;line-height: 40px;">
                                    <span v-if="userRole === 'leader'">主 管</span>
                                    <span v-else-if="userRole === 'user'">司 机</span>
                                    <span v-else-if="userRole === 'dayshift'">白 班</span>
                                    <span v-else-if="userRole === 'dayshiftLeader'">白班主管</span>
                                    <span v-else-if="userRole === 'maintain'">维修员</span>
                                    <span v-else-if="userRole === 'checker'">检查员</span>
                                    <span v-else-if="userRole === 'bill'">账单管理</span>
                                    <span v-else-if="userRole === 'countBox'">框数检查</span>
                                    <span v-else-if="userRole === 'breakbox'">坏框申报</span>
                                    <span v-else-if="userRole === 'dayShiftChecker'">白班检查员</span>
                                    
                                    <span v-else style="color:#e0e0e0">点击选择角色</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <div class="dialog-body-item">
                            <md-field style="margin:0 auto"
                                      :class="userclass">
                                <label style="font-size:16px">用户名</label>
                                <md-input v-model="dirverusername"
                                          style="border-bottom: 1px solid #000;font-size:16px;height:32px;text-align:center"></md-input>
                                <span class="md-error"
                                      style="font-size:15px;margin: -10px auto;">登陆用户名</span>
                            </md-field>

                            <md-field style="margin:20px auto"
                                      :class="pswclass">
                                <label style="font-size:16px">密码</label>
                                <md-input v-model="dirverpsw"
                                          type="password"
                                          style="border-bottom: 1px solid #000;font-size:16px;height:32px;text-align:center"></md-input>
                                <span class="md-error"
                                      style="font-size:15px;margin: -10px auto;">标识密码</span>
                            </md-field>
                        </div>

                        <div class="dialog-body-item">
                            <md-field style="margin:0 auto"
                                      :class="passclass">
                                <label style="font-size:16px">准证号码</label>
                                <md-input v-model="dirverid"
                                          style="border-bottom: 1px solid #000;font-size:16px;height:32px;text-align:center"></md-input>
                                <span class="md-error"
                                      style="font-size:15px;margin: -10px auto;">人员标识信息，必填项目</span>
                            </md-field>

                            <md-field style="margin:20px auto">
                                <label style="font-size:16px">备注</label>
                                <md-input v-model="dirvernote"
                                          style="border-bottom: 1px solid #000;font-size:16px;height:32px;text-align:center"></md-input>
                            </md-field>
                        </div>
                    </div>

                </div>
            </md-dialog-content>
            <md-dialog-actions style="margin:0 auto 10px auto">
                <md-button class="md-raised md-primary"
                           @click="showDialog = false"
                           style="font-size:16px;width:100px;height:30px;width:80">取消</md-button>
                <md-button class="md-raised md-primary"
                           v-if="savemode"
                           @click="adddirver"
                           style="font-size:16px;width:100px;height:30px;width:80">保存</md-button>
                <md-button class="md-raised md-primary"
                           v-else
                           @click="confirmedit"
                           style="font-size:16px;width:100px;height:30px;width:80">修改</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- Dialog end-->
        <!-- staff info dialog start -->
        <transition name="show-choise-role-box-back"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowStaffInfo" class="rolebox-back"></div>
        </transition>
        <transition name="show-choise-role-box-back"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowStaffInfo" class="rolebox-front" @click.self.prevent="isShowStaffInfo = false">
                <div class="rolebox-front-box">
                    <div class="rolebox-front-box-title">
                        <span>人员管理</span>
                    </div>
                    <div class="staffinfo_body">
                        <div class="staffinfo_body_top">
                            <div class="staffinfo_body_top_left">
                                <div class="staffinfo_body_top_left_item">
                                    <div class="staffinfo_body_top_left_item_left">
                                        <span>人员姓名</span>
                                    </div>
                                    <div class="staffinfo_body_top_left_item_right">
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="staffinfo_body_top_left_item">
                                    <div class="staffinfo_body_top_left_item_left">
                                        <span>英文姓名</span>
                                    </div>
                                    <div class="staffinfo_body_top_left_item_right">
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="staffinfo_body_top_left_item">
                                    <div class="staffinfo_body_top_left_item_left">
                                        <span>驾照类型</span>
                                    </div>
                                    <div class="staffinfo_body_top_left_item_right">
                                        <div>
                                            <span style="border-bottom: 1px solid rgb(44, 62, 80);">点击获取</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="staffinfo_body_top_left_item">
                                    <div class="staffinfo_body_top_left_item_left">
                                        <span>联系方式</span>
                                    </div>
                                    <div class="staffinfo_body_top_left_item_right">
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="staffinfo_body_top_left_item">
                                    <div class="staffinfo_body_top_left_item_left">
                                        <span>所属权限</span>
                                    </div>
                                    <div class="staffinfo_body_top_left_item_right">
                                        <div>
                                            <span style="border-bottom: 1px solid rgb(44, 62, 80);">点击获取</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="staffinfo_body_top_right">
                                <div class="dialog-body-item">
                                    <input type="file"
                                        style="display:none"
                                        id="upload_file"
                                        @change="fileChange($event)"
                                        accept="image/*">
                                    <div class="staffinfo_photoarea"
                                        @click="uploadFile"
                                        v-if="!driverImage">
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
                                        <img :src="driverImage | imgurl"
                                            alt="newimg">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="staffinfo_body_bottom">
                            <div class="staffinfo_body_bottom_item" >
                                <div class="staffinfo_body_bottom_item_frame" style="margin-right: 24px;">
                                    <div class="staffinfo_body_bottom_item_frame_title">
                                        <span>用户名</span>
                                    </div>
                                    <div class="staffinfo_body_bottom_item_frame_content">
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="staffinfo_body_bottom_item_frame">
                                    <div class="staffinfo_body_bottom_item_frame_title">
                                        <span>准证号码</span>
                                    </div>
                                    <div class="staffinfo_body_bottom_item_frame_content">
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="staffinfo_body_bottom_item">
                                <div class="staffinfo_body_bottom_item_frame" style="margin-right: 24px;">
                                    <div class="staffinfo_body_bottom_item_frame_title">
                                        <span>登录密码</span>
                                    </div>
                                    <div class="staffinfo_body_bottom_item_frame_content">
                                        <input type="password">
                                    </div>
                                </div>
                                <div class="staffinfo_body_bottom_item_frame">
                                    <div class="staffinfo_body_bottom_item_frame_title">
                                        <span>人员备注</span>
                                    </div>
                                    <div class="staffinfo_body_bottom_item_frame_content">
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="staffinfo_body_bottom_footer" >
                        <div class="white_button" @click="isShowStaffInfo = false">
                            <span>取消</span>
                        </div>
                        <div class="white_button" style="margin-left:12px">
                            <span>确定</span>
                        </div>
                     </div>
                </div>
            </div>
        </transition>
        <!-- staff info dialog end -->
        <!-- deleteDialog start-->
        <md-dialog :md-active.sync="deleteDialog"
                   class="editdialog">
            <md-dialog-title style="font-size:18px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">删除司机</span>
            </md-dialog-title>
            <div style="padding:0 10px;box-shadow: 2px 2px 5px #636363;overflow-x:hidden;overflow-y:auto;margin:0 20px 20px"
                 class="deldialog">
                <div class="deldialog-left">
                    <div class="photoarea">
                        <img src="../../public/img/ebuyLogo.png"
                             alt="ebuylogo"
                             style="object-fit:unset;padding:50px 0"
                             v-if="!driverImage">
                        <img :src="driverImage | imgurl"
                             alt="newimg"
                             v-else>
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
                            <span>准证号码:</span>
                        </div>
                        <div class="rmDialog-center-right">
                            <span>{{dirverid}}</span>
                        </div>
                    </div>
                    <div class="rmDialog-center">
                        <div class="rmDialog-center-left">
                            <span>联系方式:</span>
                        </div>
                        <div class="rmDialog-center-right">
                            <span>{{dirverphone}}</span>
                        </div>
                    </div>
                    <div class="rmDialog-center">
                        <div class="rmDialog-center-left">
                            <span>驾照类型:</span>
                        </div>
                        <div class="rmDialog-center-right">
                            <span>{{dirvercard}}</span>
                        </div>
                    </div>
                    <div class="rmDialog-center">
                        <div class="rmDialog-center-left">
                            <span>登录账户:</span>
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
                    <md-button class="md-raised md-primary"
                               @click="deleteDialog = false"
                               style="font-size:18px;width:80px;height:30px">关闭</md-button>
                    <md-button class="md-raised md-accent"
                               @click="confirmdelete"
                               style="font-size:18px;width:80px;height:30px">删除</md-button>
                </md-dialog-actions>
            </div>
        </md-dialog>
        <!-- deleteDialog end-->
        <!-- successd mesage start -->
        <md-dialog-alert :md-active.sync="successdmsg"
                         md-content="操作成功"
                         md-confirm-text="关闭" />
        <!-- successd mesage end -->
        <!-- error start -->
        <md-dialog-alert :md-active.sync="error"
                         :md-content="errormsg"
                         md-confirm-text="关闭" />
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

        <!-- choise role box start -->
        <transition name="show-choise-role-box-back"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showChoiseRoleBox"
                 class="rolebox-back"></div>
        </transition>
        <transition name="show-choise-role-box-front"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showChoiseRoleBox"
                 class="rolebox-front"
                 @click.self.prevent="showChoiseRoleBox = false">
                 <div class="rolebox-front-box">
                     <div class="rolebox-front-box-title">
                         <span>选择角色</span>
                     </div>
                     <div class="rolebox-front-box-body">
                        <div class="rolebox-front-box-body-item_frame">
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('leader')">
                                <span>主 管</span>
                            </div> 
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('d')">
                                <span>司 机</span>
                            </div>
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('b')">
                                <span>白 班</span>
                            </div>
                        </div>
                        <div class="rolebox-front-box-body-item_frame">
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('dLeader')">
                                <span>白班主管</span>
                            </div>
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('w')">
                                <span>维修员</span>
                            </div>
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('c')">
                                <span>检察员</span>
                            </div>
                        </div>
                        <div class="rolebox-front-box-body-item_frame">
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('bill')">
                                <span>账单管理</span>
                            </div>
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('countBox')">
                                <span>框数检查</span>
                            </div>
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('breakbox')">
                                <span>坏框申报</span>
                            </div>
                        </div>
                        <div class="rolebox-front-box-body-item_frame">
                            <div class="rolebox-front-box-body-item" @click="choiseRoleEventMethod('dayShiftChecker')">
                                <span>白班检察员</span>
                            </div>
                        </div>
                     </div>
                     <div class="rolebox-front-box-footer" @click="showChoiseRoleBox = false">
                         <div class="rolebox-button">取消</div>
                     </div>
                 </div>
            </div>
        </transition>
        <!-- choise role box end -->
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
            name_en:null,
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
            pageSize: 15, //每页显示条数
            showItem: 5, // 最少显示5个页码
            findMode: false,
            updateImagePreview: "",
            updateImage: "",
            driverImage: "",
            showTipDialog: false,
            tipMsg: "",
            userRole:null,
            showChoiseRoleBox:false,
            isShowStaffInfo:false
        };
    },
    mounted() {
        this.getalldirver();
    },
    activated() {
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
        choiseRoleEventMethod(role){
            
            if(role === 'd') {
                this.userRole = 'user'
            }else if(role === 'leader'){
                this.userRole = 'leader'
            }else if( role === 'b') {
                this.userRole = 'dayshift'
            }else if( role === 'dLeader') {
                this.userRole = 'dayshiftLeader'
            }else if( role === 'w') {
                this.userRole = 'maintain'
            }else if( role === 'bill') {
                this.userRole = 'bill'
            }else if( role === 'breakbox'){
                this.userRole = 'breakbox'
            }else if(role === 'countBox'){
                this.userRole = 'countBox'
            }else if(role === 'dayShiftChecker'){
                this.userRole = 'dayShiftChecker'
            }else{
                this.userRole = 'checker'
            }
            this.showChoiseRoleBox = false
        },

        choiseRoleMethod(){
            this.showChoiseRoleBox = true
        },

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
            this.name_en = null
            this.dirverid = "";
            this.dirverphone = "";
            this.dirvercard = "";
            this.dirverusername = "";
            this.dirverpsw = "";
            this.dirvernote = "";
            this.userRole = null
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
                    _id: this._id,
                    logOperator: localStorage.getItem("name")
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
            this.name_en = item.name_en
            this.dirverid = item.dirverid;
            this.dirverphone = item.dirverphone;
            this.dirvercard = item.dirvercard;
            this.dirverusername = item.dirverusername;
            this.dirverpsw = "";
            this.dirvernote = item.dirvernote;
            this.driverImage = item.image;
            this.showDialog = true;
            this.userRole = item.role
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
                payload.append("name_en", this.name_en);
                payload.append("dirverid", this.dirverid);
                payload.append("dirverphone", this.dirverphone);
                payload.append("dirvercard", this.dirvercard);
                payload.append("dirverusername", this.dirverusername);
                payload.append("dirvernote", this.dirvernote);
                payload.append("role", this.userRole);
                payload.append("logOperator", localStorage.getItem("name"));

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
                payload.append("logOperator", localStorage.getItem("name"));

                if (this.updateImage) {
                    lrz(this.updateImage, {
                        quality: 0.5
                    }).then(res => {
                        if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                        }
                        payload.append("image", this.updateImage);
                        payload.append("dirvername", this.dirvername);
                        payload.append("name_en", this.name_en);
                        payload.append("dirverid", this.dirverid);
                        payload.append("dirverphone", this.dirverphone);
                        payload.append("dirvercard", this.dirvercard);
                        payload.append("dirverusername", this.dirverusername);
                        payload.append("dirverpsw", this.dirverpsw);
                        payload.append("dirvernote", this.dirvernote);
                        payload.append("role", this.userRole);
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
                    payload.append("name_en", this.name_en);
                    payload.append("dirverid", this.dirverid);
                    payload.append("dirverphone", this.dirverphone);
                    payload.append("dirvercard", this.dirvercard);
                    payload.append("dirverusername", this.dirverusername);
                    payload.append("dirverpsw", this.dirverpsw);
                    payload.append("dirvernote", this.dirvernote);
                    payload.append("role", this.userRole);
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
    font-size: 16px;
    line-height: 29px;
}

.editdialog {
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

.choiseroleclass{
    cursor: pointer;
}

.rolebox-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.rolebox-front {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.rolebox-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
}

.rolebox-front-box-title {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    background: #d44950;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.rolebox-front-box-body{
    margin: 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    padding: 4px 8px;
    border: 1px solid #eee;
    background-color: #fff;
}

.rolebox-front-box-body-item_frame{
    display: flex;
    display: -webkit-flex;
}

.rolebox-front-box-body-item{
    border: 1px solid #e0e0e0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    padding:5px 0;
    margin: 5px 4px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
    width: 80px;
}

.rolebox-front-box-body-item:active{
    background: #eee;   
    box-shadow: none;
    transition: 0.2s;
}
.rolebox-front-box-footer{
    display: flex;
    display: -webkit-flex;
    padding: 0 10px 10px 10px;
}

.rolebox-button{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 100px;
    margin: 0 auto;
    border-radius: 5px;
    background: #448aff;
    color: #fff;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
    cursor: pointer;
    font-size: 16px;
}

.rolebox-button:active{
    box-shadow:none;
    transition: 0.2s;
}



.staffinfo_body{
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    margin: 12px 24px;
    padding: 12px;
    border-radius: 10px;
    -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.staffinfo_body_top{
    display: flex;
    display: -webkit-flex;
}

.staffinfo_body_top_left{
    margin-right: 24px;
}

.staffinfo_body_top_left_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    margin: 12px 0;
}

.staffinfo_body_top_left_item_left{
    font-size: 16px;
    margin-right: 12px;
    width: 66px;
}

.staffinfo_body_top_left_item_right input{
    height: 30px;
    border-radius: 5px;
    width: 160px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 16px;
    color: #2c3e50;
}

.staffinfo_body_top_left_item_right div{
    height: 30px;
    border-radius: 5px;
    width: 160px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 16px;
    color: #2c3e50;
    cursor: pointer;
}

.staffinfo_photoarea{
    margin: 0 auto;
    text-align: center;
    border: 3px dashed #696969;
    border-radius: 10px;
    width: 234px;
    height: 234px;
    background-color: #eee;
}

.staffinfo_photoarea img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.staffinfo_body_bottom_item{
    height: 30px;
    line-height: 30px;
    display: flex;
    display: -webkit-flex;
    margin: 12px 0;
}

.staffinfo_body_bottom_item_frame{
    display: flex;
    display: -webkit-flex;
}

.staffinfo_body_bottom_item_frame_title{
    font-size: 16px;
    margin-right: 12px;
    width: 66px;
    text-align: right;
}

.staffinfo_body_bottom_item_frame_content input{
    height: 30px;
    border-radius: 5px;
    width: 160px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 16px;
    color: #2c3e50;
}

.staffinfo_body_bottom_footer{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 12px;
    justify-content: center;
}

.white_button{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 100px;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #eee;
    background-color: #fff;
}

.white_button:active{
    box-shadow:none;
    transition: 0.2s;
}

@media screen and (min-width: 1025px) {
    .driverdialog {
        width: 700px;
    }
}
</style>
