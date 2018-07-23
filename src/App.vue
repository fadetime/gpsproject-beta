<template>
<div id="app">
	<top-bar v-if="$store.state.token"></top-bar>
    <router-view/>
</div>
</template>

<script>
import TopBar from './components/TopBar'
export default {
    components: {
        TopBar
    },
    computed:{
        checkLogin(){
            return this.$store.state.token
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
body{
	margin: 0;
}
/* 日期选择框左半颜色 */
.md-datepicker-header {
    background-color: #d74342
}
/* 日期选择框选中日期背景 */
.md-datepicker-selected{
    background-color: rgba(215, 67, 66, 0.9)
}
#test a{
    color: black;
}
</style>
