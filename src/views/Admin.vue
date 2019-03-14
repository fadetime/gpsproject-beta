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
        <div class="itemflex">
            <div :class="boxborder1">
                <div :class="titleclass1" style="text-align: left;">
                    <span>
                        修改管理员密码
                    </span>
                </div>
                <div class="itemflex">
                    <md-field style="width:400px" :class="oldpasswordErrClass">
                        <label>原始密码</label>
                        <md-input v-model="oldpassword" type="password" @focus="getfocus('l1')" @blur="lossfocus('l1')" @change="checkDisable"></md-input>
                        <span class="md-error">请输入原始密码</span>
                    </md-field>
                </div>
                <div class="itemflex">
                    <md-field style="width:400px" :class="newpasswordErrClass">
                        <label>新密码</label>
                        <md-input v-model="newpassword" type="password" @focus="getfocus('l1')" @blur="lossfocus('l1')" @change="checkDisable"></md-input>
                        <span class="md-error">请输入新密码</span>
                    </md-field>
                </div>
                <div class="itemflex">
                    <md-field style="width:400px" :class="confirmpasswordErrClass">
                        <label>密码确认</label>
                        <md-input v-model="confirmpassword" type="password" @focus="getfocus('l1')" @blur="lossfocus('l1')" @change="checkDisable"></md-input>
                        <span class="md-error">{{newPswErrText}}</span>
                    </md-field>
                </div>
                <div class="itemflex" style="height:20px">
                    <!-- 底部占位符 -->
                </div>

            </div>
        </div>

		<div class="itemflex" style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2" style="text-align: left;">
                    <span>
                        车辆检查
                    </span>
                </div>

                <div class="item_carcheck" style="color:#696969;line-height:52px;flex-direction: column;">
                    <div style="display:flex;justify-content:space-between;align-items: center;">
                        <div style="text-align:left">
                            <span style="font-size:16px;">机油报警值(Km)</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <input type="number" class="engineOilValve" v-model="kilometer" @change="changeStatus()">
                        </div>
                    </div>
					<div style="display:flex;justify-content:space-between;align-items: center;">
                        <div style="text-align:left">
                            <span style="font-size:16px;">新机油可运行(Km)</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <input type="number" class="engineOilValve" v-model="oilProperty" @change="changeStatus()">
                        </div>
                    </div>
                </div>
                <div class="itemflex" style="height:20px">
                    <!-- 底部占位符 -->
                </div>
            </div>
        </div>

        <div class="itemflex" style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2" style="text-align: left;">
                    <span>
                        页面设置
                    </span>
                </div>

                <div class="itemflex" style="color:#696969;line-height:52px">
                    <div style="width:400px;display:flex;justify-content:space-between">
                        <div style="text-align:left">
                            <span style="font-size:16px;">动态LOGO显示</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <md-switch v-model="showLogo" style="margin:16px 5px 16px 0" @change="checkDisable('switch')">
                                <span v-if="showLogo" style="font-size:18px;color:#448aff">开启</span>
                                <span v-else style="font-size:18px;">关闭</span>
                                <md-icon style="color:#448aff;padding-left:10px" class="tipstart">contact_support</md-icon>
                                <div class="tipbox">
                                    <span style="top:30px">右下角LOGO</span>
                                </div>
                            </md-switch>
                        </div>
                    </div>
                </div>
                <div class="itemflex" style="height:20px">
                    <!-- 底部占位符 -->
                </div>
            </div>
        </div>

        <div class="itemflex" style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2" style="text-align: left;">
                    <span>
                        日志设置
                    </span>
                </div>
                <div class="itemflex" style="color:#696969;line-height:52px">
                    <div style="width:400px;display:flex;justify-content:space-between">
                        <div style="text-align:left">
                            <span style="font-size:16px;">日志查看</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <md-button class="md-raised" @click="goLogPage('journal')">开启</md-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="itemflex" style="margin:10px 0 0 0">
            <div :class="boxborder2">
                <div :class="titleclass2" style="text-align: left;">
                    <span>
                        初始化
                    </span>
                </div>
                <div class="itemflex" style="color:#696969;line-height:52px">
                    <div style="width:400px;display:flex;justify-content:space-between">
                        <div style="text-align:left">
                            <span style="font-size:16px;">初始化设置(初装或新功能缺失时使用)</span>
                        </div>
                        <div style="display:flex;justify-content:right;">
                            <md-button class="md-raised" @click="setInitMethod">启动</md-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin:10px 0 0 0">
            <md-button class="md-raised md-accent" @click="logout">
                <span style="font-size:20px">退出登陆</span>
            </md-button>
        </div>
        <div style="margin:10px 0 0 0">
            <md-button class="md-raised">
                <span style="font-size:20px" @click="cancelbutton">取消</span>
            </md-button>
            <md-button class="md-raised md-primary" :disabled="disableButton" @click="submitbutton">
                <span style="font-size:20px">修改</span>
            </md-button>
        </div>
        <!-- error dialog start-->
        <md-dialog-alert :md-active.sync="errorDialog" :md-content="errorMessage" md-confirm-text="关闭" />
        <!-- error dialog end-->
    </div>
</template>

<script>
import config from '../../public/js/config.js'
import axios from 'axios'
export default {
  data() {
    return {
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      showNumber: '',
      buttonNumber: '',
      boxborder1: 'item1',
      titleclass1: 'item1-title',
      boxborder2: 'item1',
      titleclass2: 'item1-title',
      showLogo: true,
      disableButton: true,
      oldpswErrMsg: false,
      newpswErrMsg: false,
      comfirmpswErrMsg: false,
      newPswErrText: '请确认新密码',
      softVersion: '',
      softText: '',
      errorMessage: '',
	  errorDialog: false,
	  kilometer:0,
	  oilProperty:0,
	  haveChangeCheckCar:false
    }
  },
  mounted() {
    this.softVersion = config.version
    this.softText = config.text
    if (localStorage.showLogo) {
      this.showLogo = false
	}
	this.findOilValve()
  },
  computed: {
    oldpasswordErrClass() {
      return {
        'md-invalid': this.oldpswErrMsg
      }
    },
    newpasswordErrClass() {
      return {
        'md-invalid': this.newpswErrMsg
      }
    },
    confirmpasswordErrClass() {
      return {
        'md-invalid': this.comfirmpswErrMsg
      }
    }
  },
  methods: {
	changeStatus(){
		this.disableButton = false
		this.haveChangeCheckCar = true
	},

	findOilValve(){
		axios
			.get(config.server + '/setting/find')
			.then(doc => {
				if(doc.data.code === 0){
					this.kilometer = doc.data.doc.engineOilValve
					this.oilProperty = doc.data.doc.oilProperty
				}else if(doc.data.code === 1){
					console.log('请初始化软件')
				}else{
					console.log('error')
				}
			})
			.catch(err => {
				console.log(err)
			})
	},

	settingOilValve(){
		axios
			.get(config.server + '/setting/create')
			.then(doc => {
				console.log(doc)
				if(doc.data.code === 0){
					console.log('临界值初始化成功')
				}else if(doc.data.code === 1){
					console.log('临界值已存在')
				}else{
					console.log('临界值出现错误')
				}
			})
			.catch(err => {
				console.log(err)
			})
	},

    setInitMethod() {
		this.settingOilValve()//初始化机油临界值	
      axios
        .get(config.server + '/admin/init1')
        .then(doc => {
          console.log('初始化1')
          console.log(doc)
        })
        .catch(err => {
          console.log(err)
        })
      
      axios
        .get(config.server + '/admin/init2')
        .then(doc => {
          console.log('初始化2')
          console.log(doc)
        })
        .catch(err => {
          console.log(err)
        })

      //创建剩余订单计数
      axios
        .get(config.server + '/admin/init3')
        .then(doc => {
          console.log('初始化3')
          console.log(doc)
        })
        .catch(err => {
          console.log(err)
        })
    },
    goLogPage(item) {
      if (item === 'journal') {
        this.$router.push('/log')
      } else {
        this.$router.push('/staff')
      }
    },
    getfocus(floor) {
      if (floor === 'l1') {
        this.titleclass1 = 'item1-title2'
        this.boxborder1 = 'item1focus'
      } else {
        this.titleclass2 = 'item1-title2'
        this.boxborder2 = 'item1focus'
      }
    },
    lossfocus(floor) {
      if (floor === 'l1') {
        this.titleclass1 = 'item1-title'
        this.boxborder1 = 'item1'
      } else {
        this.titleclass2 = 'item1-title'
        this.boxborder2 = 'item1'
      }
    },
    checkDisable(item) {
      if (item === 'switch') {
        this.disableButton = false
        if (this.showLogo) {
          localStorage.removeItem('showLogo')
        } else {
          localStorage.setItem('showLogo', this.showLogo)
        }
      } else {
        if (
          this.oldpassword ||
          this.newpassword ||
          this.confirmpassword ||
          this.showNumber ||
          this.buttonNumber
        ) {
          this.disableButton = false
        } else {
          this.disableButton = true
        }
      }
    },
    logout() {
      this.$router.push('/login')
      let item = null
      this.$store.dispatch('setToken', item)
      localStorage.removeItem('token')
    },
    submitbutton() {
      if (this.oldpassword || this.newpassword || this.confirmpassword) {
        if (!this.oldpassword) {
          this.oldpswErrMsg = true
        } else {
          this.oldpswErrMsg = false
        }
        if (!this.newpassword) {
          this.newpswErrMsg = true
        } else {
          this.newpswErrMsg = false
        }
        if (!this.confirmpassword) {
          this.comfirmpswErrMsg = true
        } else {
          this.comfirmpswErrMsg = false
        }
        if (this.newpassword != this.confirmpassword) {
          this.newPswErrText = '确认密码不一致'
          this.comfirmpswErrMsg = true
        } else {
          this.comfirmpswErrMsg = false
          this.newPswErrText = '请确认新密码'
        }
        if (
          this.oldpswErrMsg === false &&
          this.newpswErrMsg === false &&
          this.comfirmpswErrMsg === false
        ) {
          console.log('send msg to server')
          axios
            .post(config.server + '/admin', {
              oldpassword: this.oldpassword,
              newpassword: this.newpassword
            })
            .then(doc => {
              console.log(doc)
              this.errorMessage = doc.data.msg
              this.errorDialog = true
              setTimeout(() => {
                this.errorDialog = false
              }, 2000)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }else if(this.haveChangeCheckCar){
		  console.log('change kilometer')
		  axios
            .post(config.server + '/setting/update', {
              engineOilValve: this.kilometer,
              oilProperty: this.oilProperty
			})
			.then(doc => {
				console.log(doc)
				if(doc.data.code === 0){
					this.errorMessage = '修改成功'
					this.errorDialog = true
					setTimeout(() => {
						this.errorDialog = false
					}, 2000)
				}else{
					this.errorMessage = '修改失败'
					this.errorDialog = true
					setTimeout(() => {
						this.errorDialog = false
					}, 2000)
				}
			})
			.catch(err => {
				console.log(err)
			})
	  } else {
        window.location.reload()
        console.log('not change psw')
      }
    },
    cancelbutton() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.itemflex {
  display: flex;
  justify-content: center;
}

.item_carcheck{
	margin: 0 24px;
}
.item1 {
  border: 3px dashed #696969;
  width: 500px;
}

.item1focus {
  border: 3px dashed #448aff;
  width: 500px;
}

.item1-title {
  font-size: 20px;
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

.engineOilValve{
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


</style>
