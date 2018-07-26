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
                <div class="card-title">Easybuy车辆管理系统</div>
            </md-card-header>

            <md-card-content>
                <input type="text" v-model="email" class="inputbox">
                <br>
                <input type="text" class="inputbox" v-model="password">
                <br>
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
export default {
    data() {
        return {
            email: 'admin@admin.com',
            password: '1'
        }
    },
    methods: {
        login() {
            console.log('###')
            console.log(this.email)
            console.log(this.password)
            axios.post('//192.168.1.5:3000/clerks', {
                    email: this.email,
                    password: this.password
                })
                .then(doc => {
                    console.log(doc.data.msg)
                    localStorage.token = this.email
                    let item = this.email
                    this.$store.dispatch('setToken', item)
                    console.log(this.$store.state.token)
                    this.$router.push('/')
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
    outline:0;
}

.card-title{
    font-family:sans-serif;
    font-size: 35px;
    font-weight: 700;
    margin: 40px auto;
}
</style>
