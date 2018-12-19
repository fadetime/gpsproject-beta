<template>
<div id="app">
    <top-bar v-if="$store.state.token"></top-bar>
    <keep-alive>
        <router-view/>
    </keep-alive>
    <div id="logout" style="text-align:right" @click="changePage" v-if="$store.state.token" v-show="!showLogo">
        <h1><a href="#" class="home" style="color:#d74342"><b><img src="../public/img/mLogo.png" style="width:60px" alt="logo"></b><span>easy buy</span></a></h1>
    </div>
</div>
</template>

<script>
import TopBar from './components/TopBar'
export default {
    components: {
        TopBar
    },
    mounted() {
        if (localStorage.token) {
            let item = localStorage.token
            this.$store.dispatch('setToken', item)
            this.$router.push('/')
        } else {
            this.$router.push('/login')
        }
    },
    computed: {
        checkLogin() {
            return this.$store.state.token
        },
        showLogo() {
            return localStorage.getItem('showLogo')
        }
    },
    methods:{
        changePage(){
            this.$router.push('/admin')
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#page-body-title-picker input{
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

body {
    margin: 0;
}

h1{
    font-size: 20px;
}

h2{
    font-size: 18px;
}

h3{
    font-size: 16px;
    margin: 0;
}

p {
    font-size: 16px;
    margin: 0;
}

/* 日期选择框左半颜色 */

.md-datepicker-header {
    background-color: #d74342
}

/* 日期选择框选中日期背景 */

.md-datepicker-selected {
    background-color: rgba(215, 67, 66, 0.9)
}

/* #test a {
    color: black;
} */

#logout {
    position: fixed;
    bottom: 0;
    right: 20px;
    z-index: 3;
}

#logout h1 {
    text-align: center;
    font-weight: bold;
    line-height: 40px;
    margin: 20px;
}

#logout h1 a {
    display: inline-block;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-decoration: none;
}

#logout h1 a::after,
#logout h1 a::before {
    font-size: 72px;
    position: relative;
    top: 5px;
    letter-spacing: 13px;
    left: 11px;
}

#logout h1 a::after {
    content: ")";
}

#logout h1 a::before {
    content: "(";
}

#logout h1 a b,
#logout h1 a span {
    -webkit-transition: all 300ms;
    -moz-transition: all 300ms;
    -o-transition: all 300ms;
    transition: all 300ms;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: -94px;
    font-size: 60px;
}

#logout h1 a span {
    opacity: 0;
}

#logout h1 a b {
    letter-spacing: -0.16em;
}

#logout h1 a:hover span {
    opacity: 1;
}

#logout h1 a:hover b,
#logout h1 a:hover span {
    letter-spacing: 0;
    text-decoration: none;
}

@media screen and (max-width: 600px) {
    #logout {
        display: none
    }

    .datepicker-popup {
        font-size: 14px !important;
    }

    .calendar-body{
        width:290px !important;
        height: 290px !important;
    }
}
</style>
