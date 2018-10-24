<template>
<div>
    <div style="width:1px;height:1px;position: fixed;left: 50%;z-index: 97">
        <div style="position: relative;">

            <div class="toplogo">
                <img src="./../../public/img/ebuyLogo.png" alt="easybuylogo">
            </div>
        </div>
    </div>

    <md-card md-with-hover style="width:500px;margin:220px auto">
        <md-ripple>
            <md-card-header style="padding:10px">
                <div class="card-title">DELIVERY TO
                    <br>
                    物流管理系统</div>
            </md-card-header>

            <md-card-content>
                
                <input type="text" v-model="email" class="inputbox" @keyup.enter="login">
                <br>
                <input type="password" class="inputbox" v-model="password" @keyup.enter="login">
                <div v-if="errmsg" style="color:#d74342">
                    <span>{{errmsg}}</span>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button class="md-raised md-primary" style="margin:0px auto 20px auto" @click="login">登陆</md-button>
            </md-card-actions>
        </md-ripple>
    </md-card>
</div>
</template>

<script>
import axios from 'axios'
import config from "../../public/js/config.js"

export default {
    data() {
        return {
            email: '',
            password: '',
            errmsg: ''
        }
    },
    methods: {
        login() {
            axios.post(config.server + '/clerks', {
                    email: this.email,
                    password: this.password
                })
                .then(doc => {
                    this.errmsg = doc.data.msg
                    if (doc.data.status == 0) {
                        localStorage.token = this.email
                        localStorage.name = doc.data.userName
                        let item = this.email
                        this.$store.dispatch('setToken', item)
                        console.log(this.$store.state.token)
                        this.$router.push('/')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>
.toplogo {
    border: 1px solid;
    border-radius: 50%;
    width: 190px;
    height: 190px;
    line-height: 200px;
    position: absolute;
    right: 171px;
    top: -96px;
    box-shadow: 1px 1px 10px 0px;
    background-color: #ffffff;
    border: 3px solid #f7a1a1;
}

.inputbox {
    margin: 10px auto;
    border-radius: 10px;
    width: 300px;
    height: 50px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
}

.card-title {
    font-family: sans-serif;
    font-size: 35px;
    font-weight: 700;
    margin: 10px auto;
    line-height: 40px;
}
</style>
