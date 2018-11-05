<template>
    <div>
        <div style="height:30px">
            <button @click="testMethod">test button</button>
        </div>
        <div class="center">
            <div class="box">
                <div class="box-toptitle">
                    <span>员工列表</span>
                </div>
                <div class="box-title">
                    <div class="box-title-item" style="width:60px">
                        <span>No.</span>
                    </div>
                    <div class="box-title-item" style="width:100px">
                        <span>姓名</span>
                    </div>
                    <div class="box-title-item" style="width:100px">
                        <span>电话</span>
                    </div>
                    <div class="box-title-item" style="width:100px">
                        <span>角色</span>
                    </div>
                    <div class="box-title-item" style="width:100px">
                        <span>账户</span>
                    </div>
                    <div class="box-title-item" style="width:60px">
                        <span>操作</span>
                    </div>
                </div>
                <div class="box-body">
                    <div class="box-body-item" style="width:60px">
                        <span>1</span>
                    </div>
                    <div class="box-body-item" style="width:100px">
                        <span>潇洒强</span>
                    </div>
                    <div class="box-body-item" style="width:100px">
                        <span>01</span>
                    </div>
                    <div class="box-body-item" style="width:100px">
                        <span>操作员</span>
                    </div>
                    <div class="box-body-item" style="width:100px">
                        <span>123</span>
                    </div>
                    <div class="box-body-item" style="width:60px">
                        <img src="../../public/img/icons/edit.png" alt="edit" style="width:20px;margin:0 10px">
                    </div>
                </div>
            </div>
        </div>
        <!-- dialog box  -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div class="dialog-back" v-if="isDialog"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div class="dialog-front" v-if="isDialog" @click.self.prevent="isDialog = false">
                <div class="dialog-box">
                    <div class="dialog-box-title">
                        <span>添加人员</span>
                    </div>
                    <div class="dialog-box-body">
                        <div class="dialog-box-body-item">
                            <div class="dialog-box-body-item-left">
                                <span>姓名</span>
                            </div>
                            <div class="dialog-box-body-item-right">
                                <input type="text" v-model="name">
                            </div>
                        </div>
                        <div class="dialog-box-body-item">
                            <div class="dialog-box-body-item-left">
                                <span>电话</span>
                            </div>
                            <div class="dialog-box-body-item-right">
                                <input type="text" v-model="phone">
                            </div>
                        </div>
                        <div class="dialog-box-body-item">
                            <div class="dialog-box-body-item-left">
                                <span>角色</span>
                            </div>
                            <div class="dialog-box-body-item-right">
                                <button @click="setStaff" disabled>管理员</button>
                                <button @click="setStaff" style="background:#448aff;color:#fff;margin-left:10px">操作员</button>
                            </div>
                        </div>
                        <div class="dialog-box-body-item">
                            <div class="dialog-box-body-item-left">
                                <span>账户</span>
                            </div>
                            <div class="dialog-box-body-item-right">
                                <input type="text" v-model="email">
                            </div>
                        </div>
                        <div class="dialog-box-body-item">
                            <div class="dialog-box-body-item-left">
                                <span>密码</span>
                            </div>
                            <div class="dialog-box-body-item-right">
                                <input type="password" v-model="password">
                            </div>
                        </div>
                    </div>
                    <div class="dialog-box-bottom">
                        <div class="dialog-box-bottom-left">
                            <button @click="isDialog = false">取消</button>
                        </div>
                        <div class="dialog-box-bottom-right">
                            <button @click="setStaff">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- dialog box  -->
    </div>
</template>

<script>
import axios from 'axios'
import config from '../../public/js/config.js'

export default {
  data() {
    return {
      isDialog: false,
      name: '',
      phone: '',
      email: '',
      password: ''
    }
  },
  methods: {
    testMethod() {
      this.isDialog = true
    },
    setStaff() {
      axios.post(config.server + '/clerks/create', {
        name: this.name,
        phone:this.phone,
        email:this.email,
        password:this.password
      })
      .then(doc => {
          console.log(doc)
      })
      .catch(err => {
          console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.center {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
}

.box {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border: 1px solid #e0e0e0;
}

.box-toptitle {
  height: 64px;
  line-height: 64px;
  padding: 0 16px;
  text-align: left;
}

.box-toptitle span {
  font-size: 20px;
  font-weight: 600;
}

.box-title {
  display: flex;
  display: -webkit-flex;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 16px;
}

.box-title-item {
  text-align: left;
}
.box-title span {
  font-size: 18px;
  color: #6a6a6a;
}

.box-body {
  display: flex;
  display: -webkit-flex;
  height: 48px;
  line-height: 48px;
  padding: 0 16px;
}

.box-body-item {
  text-align: left;
}

.box-body span {
  font-size: 16px;
  color: #2d2d2d;
}

.dialog-back {
  position: fixed;
  background: rgba(0, 0, 0, 0.12);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 23;
}

.dialog-front {
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

.dialog-box {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background: #fff;
}

.dialog-box-title {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background: #ff5252;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: #fff;
  text-align: left;
  padding: 0 16px;
}

.dialog-box-body {
  font-size: 16px;
}

.dialog-box-body-item {
  display: flex;
  display: -webkit-flex;
  padding: 0 16px;
  height: 40px;
  line-height: 40px;
}

.dialog-box-body-item-left {
  text-align: right;
}

.dialog-box-body-item-right {
  padding-left: 20px;
}

.dialog-box-body-item-right input {
  width: 150px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 16px;
}

.dialog-box-body-item-right button {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  width: 60px;
  font-size: 14px;
  background: #fff;
}
.dialog-box-bottom {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  height: 40px;
  line-height: 40px;
}

.dialog-box-bottom-left button {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background: #fff;
  width: 60px;
  height: 30px;
  font-size: 16px;
}

.dialog-box-bottom-right button {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background: #448aff;
  color: #fff;
  width: 60px;
  height: 30px;
  font-size: 16px;
  margin-left: 10px;
}
</style>

