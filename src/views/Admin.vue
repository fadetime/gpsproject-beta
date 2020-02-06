<template>
    <div id="admin">
        <div style="padding-top:10px">
            <img src="../../public/img/ebuyLogo.png" alt="ebuylogo" style="width:300px">
        </div>
        <div style="padding-top:10px">
            <span>{{softText}}</span>
        </div>
        <div style="padding-bottom:10px">
            <span>{{softVersion}}</span>
        </div>
        <div class="itemflex"
             style="margin-bottom:10px">
            <div class="item1">
                <div class="item1-title" style="text-align: left;">
                    <span v-if="lang === 'en'">CS Control</span>
                    <span v-else>客服管理</span>
                </div>
                <div style="display:flex;display:-webkit-flex;justify-content:center">
                    <div class="admin_userbox">
                        <div class="admin_userbox_title">
                            <div style="width:100px;">
                                <span v-if="lang === 'en'">User</span>
                                <span v-else>用户姓名</span>
                            </div>
                            <div style="width:100px;border-left:1px solid #eee;border-right:1px solid #eee;">
                                <span v-if="lang === 'en'">UserName</span>
                                <span v-else>用户名</span>
                            </div>
                            <div style="width:100px;">
                                <span v-if="lang === 'en'">Date</span>
                                <span v-else>生成时间</span>
                            </div>
                        </div>
                        <div class="admin_userbox_body">
                            <div class="admin_userbox_body_frame" v-for="(item,index) in userArray" :key="index" @click="editUserInfoMethod(item)">
                                <div style="width:100px;">
                                    <span>{{item.name}}</span>
                                </div>
                                <div style="width:100px;">
                                    <span>{{item.email}}</span>
                                </div>
                                <div style="width:100px;">
                                    <span>{{item.entryDate | datefilter}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display:flex;display:-webkit-flex;justify-content:center">
                    <div class="admin_white_button" @click="openAddUserBox()">
                        <span v-if="lang === 'en'">New</span>
                        <span v-else>增加</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="itemflex">
            <div :class="boxborder1">
                <div :class="titleclass1" style="text-align: left;">
                    <span v-if="lang === 'en'">Change password</span>
                    <span v-else>修改管理员密码</span>
                </div>
                <div class="itemflex">
                    <md-field style="width:400px"
                              :class="oldpasswordErrClass">
                        <label>
                            <span v-if="lang === 'en'">Old password</span>
                            <span v-else>原始密码</span>
                        </label>
                        <md-input v-model="oldpassword"
                                  type="password"
                                  @focus="getfocus('l1')"
                                  @blur="lossfocus('l1')"
                                  @change="checkDisable"></md-input>
                        <span class="md-error">请输入原始密码</span>
                    </md-field>
                </div>
                <div class="itemflex">
                    <md-field style="width:400px"
                              :class="newpasswordErrClass">
                        <label>
                            <span v-if="lang === 'en'">New password</span>
                            <span v-else>新密码</span>
                        </label>
                        <md-input v-model="newpassword"
                                  type="password"
                                  @focus="getfocus('l1')"
                                  @blur="lossfocus('l1')"
                                  @change="checkDisable"></md-input>
                        <span class="md-error">请输入新密码</span>
                    </md-field>
                </div>
                <div class="itemflex">
                    <md-field style="width:400px"
                              :class="confirmpasswordErrClass">
                        <label>
                            <span v-if="lang === 'en'">Confirm password</span>
                            <span v-else>密码确认</span>
                        </label>
                        <md-input v-model="confirmpassword"
                                  type="password"
                                  @focus="getfocus('l1')"
                                  @blur="lossfocus('l1')"
                                  @change="checkDisable"></md-input>
                        <span class="md-error">{{newPswErrText}}</span>
                    </md-field>
                </div>
                <div class="itemflex"
                     style="height:20px">
                    <!-- 底部占位符 -->
                </div>

            </div>
        </div>

        <div class="itemflex"
             style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2" style="text-align: left;">
                    <span v-if="lang === 'en'">Car check</span>
                    <span v-else>车辆检查</span>
                </div>

                <div class="item_carcheck"
                     style="color:#696969;line-height:52px;flex-direction: column;">
                    <div style="display:flex;justify-content:space-between;align-items: center;">
                        <div style="text-align:left">
                            <span v-if="lang === 'en'" style="font-size:16px;">Engine oil(Km)</span>
                            <span v-else style="font-size:16px;">机油报警值(Km)</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <input type="number"
                                   class="engineOilValve"
                                   v-model="kilometer"
                                   @change="changeStatus()">
                        </div>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items: center;">
                        <div style="text-align:left">
                            <span v-if="lang === 'en'" style="font-size:16px;">Value(Km)</span>
                            <span v-else style="font-size:16px;">新机油可运行(Km)</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <input type="number"
                                   class="engineOilValve"
                                   v-model="oilProperty"
                                   @change="changeStatus()">
                        </div>
                    </div>
                </div>
                <div class="itemflex"
                     style="height:20px">
                    <!-- 底部占位符 -->
                </div>
            </div>
        </div>

        <div class="itemflex"
             style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2"
                     style="text-align: left;">
                    <span v-if="lang === 'en'" >Page setup</span>
                    <span v-else >页面设置</span>
                </div>

                <div class="itemflex"
                     style="color:#696969;line-height:52px">
                    <div style="width:400px;display:flex;justify-content:space-between">
                        <div style="text-align:left">
                            <span v-if="lang === 'en'" style="font-size:16px;">Show logo</span>
                            <span v-else style="font-size:16px;">动态LOGO显示</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <md-switch v-model="showLogo"
                                       style="margin:16px 5px 16px 0"
                                       @change="checkDisable('switch')">
                                <span v-if="showLogo" style="font-size:18px;color:#448aff">
                                    <span v-if="lang === 'en'">ON</span>
                                    <span v-else>开启</span>
                                </span>
                                <span v-else style="font-size:18px;">
                                    <span v-if="lang === 'en'">OFF</span>
                                    <span v-else>关闭</span>
                                </span>
                                <md-icon style="color:#448aff;padding-left:10px"
                                         class="tipstart">contact_support</md-icon>
                                <div class="tipbox">
                                    <span style="top:30px">右下角LOGO</span>
                                </div>
                            </md-switch>
                        </div>
                    </div>
                </div>
                <div class="itemflex"
                     style="height:20px">
                    <!-- 底部占位符 -->
                </div>
            </div>
        </div>
        
        <div class="itemflex"
             style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2" style="text-align: left;">
                    <span v-if="lang === 'en'">Language</span>
                    <span v-else>语言设置</span>
                </div>
                <div class="itemflex"
                     style="color:#696969;line-height:52px">
                    <div style="width:400px;display:flex;justify-content:space-between">
                        <div style="text-align:left">
                            <span v-if="lang === 'en'" style="font-size:16px;">Display language</span>
                            <span v-else style="font-size:16px;">显示语言</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <md-button class="md-raised" @click="changeLanguageMethod()">
                                <span v-if="lang === 'en'">中文</span>
                                <span v-else>English</span>
                            </md-button>
                        </div>
                    </div>
                </div>
                <div class="itemflex"
                     style="height:20px">
                    <!-- 底部占位符 -->
                </div>
            </div>
        </div>

        <div class="itemflex"
             style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2" style="text-align: left;">
                    <span v-if="lang === 'en'">Log setup</span>
                    <span v-else>日志设置</span>
                </div>
                <div class="itemflex"
                     style="color:#696969;line-height:52px">
                    <div style="width:400px;display:flex;justify-content:space-between">
                        <div style="text-align:left">
                            <span style="font-size:16px;">
                                <span v-if="lang === 'en'">Show Log</span>
                                <span v-else>日志查看</span>
                            </span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <md-button class="md-raised" @click="goLogPage('journal')">
                                <span v-if="lang === 'en'">Open</span>
                                <span v-else>开启</span>
                            </md-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="itemflex"
             style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2"
                     style="text-align: left;">
                    <span v-if="lang === 'en'">Initialization</span>
                    <span v-else>初始化</span>
                </div>
                <div class="itemflex"
                     style="color:#696969;line-height:52px">
                    <div style="width:400px;display:flex;justify-content:space-between">
                        <div style="text-align:left">
                            <span v-if="lang === 'en'" style="font-size:16px;">If its first times you can run this button</span>
                            <span v-else style="font-size:16px;">初始化设置(初装或新功能缺失时使用)</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <md-button class="md-raised"  @click="setInitMethod">
                                <span v-if="lang === 'en'">Start</span>
                                <span v-else>启动</span>
                            </md-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin:10px 0 0 0">
            <md-button class="md-raised md-accent" @click="logout">
                <span v-if="lang === 'en'" style="font-size:20px">Logout</span>
                <span v-else style="font-size:20px">退出登陆</span>
            </md-button>
        </div>
        <div style="margin:10px 0 0 0">
            <md-button class="md-raised" @click="cancelbutton">
                <span v-if="lang === 'en'" style="font-size:20px">Cancel</span>
                <span v-else style="font-size:20px">取消</span>
            </md-button>
            <md-button class="md-raised md-primary" :disabled="disableButton" @click="submitbutton">
                <span v-if="lang === 'en'" style="font-size:20px">Edit</span>
                <span v-else style="font-size:20px">修改</span>
            </md-button>
        </div>

        <!-- add user box start -->
        <transition name="admin-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowUserBox"
                 class="customer_addDialog_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowUserBox"
                 class="customer_addDialog_front"
                 style="z-index:26"
                 @click.self.prevent="isShowUserBox = false">
                <div class="customer_addDialog_box">
                    <div class="customer_addDialog_box_title">
                        <span>用户信息</span>
                    </div>
                    <div class="admin_userdialog_body">
                        <div class="admin_userdialog_body_item">
                            <div class="admin_userdialog_body_item-left">
                                <span>用户姓名</span>
                            </div>
                            <div class="admin_userdialog_body_item-right">
                                <input type="text" v-model="staffName">
                            </div>
                        </div>
                        <div class="admin_userdialog_body_item">
                            <div class="admin_userdialog_body_item-left">
                                <span>用户名</span>
                            </div>
                            <div class="admin_userdialog_body_item-right">
                                <input type="text" v-model="userName">
                            </div>
                        </div>
                        <div class="admin_userdialog_body_item">
                            <div class="admin_userdialog_body_item-left">
                                <span>用户密码</span>
                            </div>
                            <div class="admin_userdialog_body_item-right">
                                <input type="password" v-model="userPassword">
                            </div>
                        </div>
                        <div class="admin_userdialog_body_item">
                            <div class="admin_userdialog_body_item-left">
                                <span>确认密码</span>
                            </div>
                            <div class="admin_userdialog_body_item-right">
                                <input type="password" v-model="confirmPassword">
                            </div>
                        </div>
                    </div>
                    <div class="admin_userdialog_bottom">
                        <div class="admin_white_button"
                             style="margin-top:0"
                             @click="isShowUserBox = false">
                            <span>取消</span>
                        </div>
						<div v-if="isEditMode" class="admin_white_button" style="margin-top:0;margin-left:10px;" @click="openRemoveBoxMethod()">
                            <span>删除</span>
                        </div>
                        <div v-if="isEditMode" class="admin_white_button"
                             style="margin-top:0;margin-left:10px;"
                             @click="confirmEditUserInfo()">
                            <span>修改</span>
                        </div>
						<div v-else class="admin_white_button"
                             style="margin-top:0;margin-left:10px;"
                             @click="createNewUserMethod()">
                            <span>确认</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- add user box end -->

		<!-- remove box start -->
        <transition name="admin-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowRemoveBox" class="customer_addDialog_back" style="z-index:26"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowRemoveBox" class="customer_addDialog_front" style="z-index:27" @click.self.prevent="isShowRemoveBox = false">
                <div class="customer_addDialog_box">
                    <div class="customer_addDialog_box_title">
                        <span>确认删除</span>
                    </div>
					<div class="admin_userdialog_body">
						<span>是否确认删除？</span>
					</div>
					<div class="admin_userdialog_bottom" style="margin:0 8px">
						<div class="admin_white_button" style="margin-top:0" @click="isShowRemoveBox = false">
                            <span>取消</span>
                        </div>
						<div class="admin_white_button" style="margin-top:0;margin-left:10px" @click="confirmRemoveUserMethod()">
                            <span>确定</span>
                        </div>
					</div>
                </div>
            </div>
        </transition>
		<!-- remove box end -->

        <!-- error dialog start-->
        <md-dialog-alert :md-active.sync="errorDialog"
                         :md-content="errorMessage"
                         md-confirm-text="关闭" />
        <!-- error dialog end-->

		<!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import config from "../../public/js/config.js";
import axios from "axios";
import tipsBox from "@/components/tipsBox.vue"

export default {
	components: {
        tipsBox
	},
	
    data() {
        return {
            oldpassword: "",
            newpassword: "",
            confirmpassword: "",
            showNumber: "",
            buttonNumber: "",
            boxborder1: "item1",
            titleclass1: "item1-title",
            boxborder2: "item1",
            titleclass2: "item1-title",
            showLogo: true,
            disableButton: true,
            oldpswErrMsg: false,
            newpswErrMsg: false,
            comfirmpswErrMsg: false,
            newPswErrText: "请确认新密码",
            softVersion: "",
            softText: "",
            errorMessage: "",
            errorDialog: false,
            kilometer: 0,
            oilProperty: 0,
            haveChangeCheckCar: false,
			isShowUserBox: false,
			staffName:null,
			userName:null,
			userPassword:null,
			confirmPassword:null,
			tipsShowColor:null,
			tipsInfo:null,
			isShowTipsBox:null,
			userArray:[],
			isShowRemoveBox:false,
			user_id:null,
			isEditMode:false
        };
	},
	
    mounted() {
        this.softVersion = config.version;
        this.softText = config.text;
        if (localStorage.showLogo) {
            this.showLogo = false;
        }
		this.findOilValve();
		this.findUserInfo()
	},
	
    computed: {
        oldpasswordErrClass() {
            return {
                "md-invalid": this.oldpswErrMsg
            };
        },
        newpasswordErrClass() {
            return {
                "md-invalid": this.newpswErrMsg
            };
        },
        confirmpasswordErrClass() {
            return {
                "md-invalid": this.comfirmpswErrMsg
            };
        },
        lang(){
            return this.$store.state.language
        }
    },
    methods: {
        changeLanguageMethod(){
            if(this.lang == 'en'){
				this.$store.dispatch('setLanguage', 'ch')
			}else{
				this.$store.dispatch('setLanguage', 'en')
			}
        },
		confirmEditUserInfo(){
			console.log(this.user_id)
			axios
				.post(config.server + "/setting/editUser",{
					staffName:this.staffName,
					userName:this.userName,
					user_id:this.user_id,
					userPassword:this.userPassword
				})
				.then(doc => {
					if(doc.data.code === 0){
						this.tipsShowColor = 'green'
						this.tipsInfo = '修改成功'
						this.isShowTipsBox = true
						this.isShowUserBox = false
						this.findUserInfo()
						setTimeout(() => {
							this.isShowTipsBox = false
						}, 2000);
					}else{
						this.tipsShowColor = 'yellow'
						this.tipsInfo = '删除失败'
						this.isShowTipsBox = true
						this.findUserInfo()
						setTimeout(() => {
							this.isShowTipsBox = false
						}, 3000);
					}
				})
				.catch(err => {
					console.log(err)
				})
		},

		confirmRemoveUserMethod(){
			axios
				.post(config.server + "/setting/removeUser",{
					user_id:this.user_id
				})
				.then(doc => {
					if(doc.data.code === 0){
						this.tipsShowColor = 'green'
						this.tipsInfo = '删除成功'
						this.isShowTipsBox = true
						this.isShowRemoveBox = false
						this.isShowUserBox = false
						this.findUserInfo()
						setTimeout(() => {
							this.isShowTipsBox = false
						}, 2000);
					}else{
						this.tipsShowColor = 'yellow'
						this.tipsInfo = '删除失败'
						this.isShowTipsBox = true
						setTimeout(() => {
							this.isShowTipsBox = false
						}, 3000);
					}
				})
				.catch(err => {
					console.log(err)
				})
		},

		openRemoveBoxMethod(item){
			this.isShowRemoveBox = true
		},

		editUserInfoMethod(item){
			this.isEditMode = true
			this.staffName = item.name
			this.userName = item.email
			this.user_id = item._id
			this.userPassword = null
			this.confirmPassword = null
			this.isShowUserBox = true
		},

		findUserInfo(){
			axios
				.post(config.server + "/setting/findUser")
				.then(doc => {
					console.log(doc)
					if(doc.data.code === 0){
						this.userArray = doc.data.doc
					}else if(doc.data.code === 1){
						this.tipsShowColor = 'yellow'
						this.tipsInfo = '未找到客服账户'
						this.isShowTipsBox = true
						setTimeout(() => {
							this.isShowTipsBox = false
						}, 3000);
					}else{
						this.tipsShowColor = 'yellow'
						this.tipsInfo = '查找账户时发生错误'
						this.isShowTipsBox = true
						setTimeout(() => {
							this.isShowTipsBox = false
						}, 3000);
					}
				})
				.catch(err => {
					console.log(err)
				})
		},

        createNewUserMethod() {
			if(this.userPassword === this.confirmPassword){
				axios
					.post(config.server + "/setting/createUser",{
						staffName:this.staffName,
						userName:this.userName,
						userPassword:this.userPassword
					})
					.then(doc => {
						if(doc.data.code === 0){
							this.tipsShowColor = 'green'
							this.tipsInfo = '创建成功'
							this.isShowTipsBox = true
							this.isShowUserBox = false
							this.findUserInfo()
							setTimeout(() => {
								this.isShowTipsBox = false
							}, 2000);
						}else if(doc.data.code === 1){
							this.tipsShowColor = 'yellow'
							this.tipsInfo = '创建失败'
							this.isShowTipsBox = true
							setTimeout(() => {
								this.isShowTipsBox = false
							}, 3000);
						}else if(doc.data.code === 3){
							this.tipsShowColor = 'yellow'
							this.tipsInfo = '用户名已存在'
							this.isShowTipsBox = true
							setTimeout(() => {
								this.isShowTipsBox = false
							}, 3000);
						}else{
							this.tipsShowColor = 'yellow'
							this.tipsInfo = '创建时发生错误'
							this.isShowTipsBox = true
							setTimeout(() => {
								this.isShowTipsBox = false
							}, 3000);
						}
					})
					.catch(err => {
						console.log(err)
					})
			}else{
				this.tipsShowColor = 'yellow'
				this.tipsInfo = '两次密码不相同'
				this.isShowTipsBox = true
				setTimeout(() => {
					this.isShowTipsBox = false
				}, 3000);
			}
		},

        openAddUserBox() {
			this.isEditMode = false
			this.isShowUserBox = true
			this.staffName = null
			this.userName = null
			this.userPassword = null
			this.confirmPassword = null
        },

        changeStatus() {
            this.disableButton = false;
            this.haveChangeCheckCar = true;
        },

        findOilValve() {
            axios
                .get(config.server + "/setting/find")
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.kilometer = doc.data.doc.engineOilValve;
                        this.oilProperty = doc.data.doc.oilProperty;
                    } else if (doc.data.code === 1) {
                        console.log("请初始化软件");
                    } else {
                        console.log("error");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        settingOilValve() {
            axios
                .get(config.server + "/setting/create")
                .then(doc => {
                    console.log(doc);
                    if (doc.data.code === 0) {
                        console.log("临界值初始化成功");
                    } else if (doc.data.code === 1) {
                        console.log("临界值已存在");
                    } else {
                        console.log("临界值出现错误");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        setInitMethod() {
            this.settingOilValve(); //初始化机油临界值
            axios
                .get(config.server + "/admin/init1")
                .then(doc => {
                    console.log("初始化1");
                    console.log(doc);
                })
                .catch(err => {
                    console.log(err);
                });

            axios
                .get(config.server + "/admin/init2")
                .then(doc => {
                    console.log("初始化2");
                    console.log(doc);
                })
                .catch(err => {
                    console.log(err);
                });

            //创建剩余订单计数
            axios
                .get(config.server + "/admin/init3")
                .then(doc => {
                    console.log("初始化3");
                    console.log(doc);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        goLogPage(item) {
            if (item === "journal") {
                this.$router.push("/log");
            } else {
                this.$router.push("/staff");
            }
        },
        getfocus(floor) {
            if (floor === "l1") {
                this.titleclass1 = "item1-title2";
                this.boxborder1 = "item1focus";
            } else {
                this.titleclass2 = "item1-title2";
                this.boxborder2 = "item1focus";
            }
        },
        lossfocus(floor) {
            if (floor === "l1") {
                this.titleclass1 = "item1-title";
                this.boxborder1 = "item1";
            } else {
                this.titleclass2 = "item1-title";
                this.boxborder2 = "item1";
            }
        },
        checkDisable(item) {
            if (item === "switch") {
                this.disableButton = false;
                if (this.showLogo) {
                    localStorage.removeItem("showLogo");
                } else {
                    localStorage.setItem("showLogo", this.showLogo);
                }
            } else {
                if (
                    this.oldpassword ||
                    this.newpassword ||
                    this.confirmpassword ||
                    this.showNumber ||
                    this.buttonNumber
                ) {
                    this.disableButton = false;
                } else {
                    this.disableButton = true;
                }
            }
        },
        logout() {
            this.$router.push("/login");
            let item = null;
            this.$store.dispatch("setToken", item);
            localStorage.removeItem("token");
        },
        submitbutton() {
            if (this.oldpassword || this.newpassword || this.confirmpassword) {
                if (!this.oldpassword) {
                    this.oldpswErrMsg = true;
                } else {
                    this.oldpswErrMsg = false;
                }
                if (!this.newpassword) {
                    this.newpswErrMsg = true;
                } else {
                    this.newpswErrMsg = false;
                }
                if (!this.confirmpassword) {
                    this.comfirmpswErrMsg = true;
                } else {
                    this.comfirmpswErrMsg = false;
                }
                if (this.newpassword != this.confirmpassword) {
                    this.newPswErrText = "确认密码不一致";
                    this.comfirmpswErrMsg = true;
                } else {
                    this.comfirmpswErrMsg = false;
                    this.newPswErrText = "请确认新密码";
                }
                if (
                    this.oldpswErrMsg === false &&
                    this.newpswErrMsg === false &&
                    this.comfirmpswErrMsg === false
                ) {
                    console.log("send msg to server");
                    axios
                        .post(config.server + "/admin", {
                            oldpassword: this.oldpassword,
                            newpassword: this.newpassword
                        })
                        .then(doc => {
                            console.log(doc);
                            this.errorMessage = doc.data.msg;
                            this.errorDialog = true;
                            setTimeout(() => {
                                this.errorDialog = false;
                            }, 2000);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            } else if (this.haveChangeCheckCar) {
                console.log("change kilometer");
                axios
                    .post(config.server + "/setting/update", {
                        engineOilValve: this.kilometer,
                        oilProperty: this.oilProperty
                    })
                    .then(doc => {
                        console.log(doc);
                        if (doc.data.code === 0) {
                            this.errorMessage = "修改成功";
                            this.errorDialog = true;
                            setTimeout(() => {
                                this.errorDialog = false;
                            }, 2000);
                        } else {
                            this.errorMessage = "修改失败";
                            this.errorDialog = true;
                            setTimeout(() => {
                                this.errorDialog = false;
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                window.location.reload();
                console.log("not change psw");
            }
        },
        cancelbutton() {
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
.itemflex {
    display: flex;
    justify-content: center;
}

.item_carcheck {
    margin: 0 24px;
}
.item1 {
    border: 3px dashed #696969;
    width: 500px;
    border-radius: 10px;
}

.item1focus {
    border: 3px dashed #448aff;
    width: 500px;
}

.item1-title {
    font-size: 16px;
    color: #696969;
    padding: 10px 0 10px 10px;
    transition: 1s;
}

.item1-title2 {
    font-size: 20px;
    color: #448aff;
    padding: 10px 0 10px 10px;
    transition: 1s;
}

.tipbox span {
    display: none;
}

.tipbox:hover span {
    display: block;
}

.tipstart:hover + .tipbox span {
    display: block;
    position: absolute;
    width: 150px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 20px;
    top: 50px;
    right: 0px;
}

.engineOilValve {
    text-align: center;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.4);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}

.admin_userbox {
    background-color: #eee;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    overflow: hidden;
}

.admin_userbox_title {
    background-color: #fff;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    display: flex;
    display: -webkit-flex;
}

.admin_userbox_body {
    height: 120px;
    overflow-x: hidden;
    overflow-y: auto;
}

.admin_userbox_body_frame {
    display: flex;
    display: -webkit-flex;
    background-color: #fff;
    margin: 4px 0;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
	cursor: pointer;
}

.admin_white_button {
    height: 30px;
    line-height: 30px;
    width: 80px;
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background-color: #fff;
    margin: 12px 0;
    cursor: pointer;
}

.customer_addDialog_back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.customer_addDialog_front {
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

.customer_addDialog_box {
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    overflow: hidden;
}

.customer_addDialog_box_title {
    background-color: #d74342;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.admin_userdialog_body {
    margin: 12px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background-color: #fff;
}

.admin_userdialog_body_item {
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    margin: 4px 0;
}

.admin_userdialog_body_item-left {
    width: 72px;
    text-align: right;
}

.admin_userdialog_body_item-right {
    margin-left: 10px;
}

.admin_userdialog_body_item-right input {
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    height: 30px;
    line-height: 30px;
	text-align: center;
}

.admin_userdialog_bottom {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}
</style>
