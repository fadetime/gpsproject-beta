<template>
<div id="topbar">
    <div class="buttomarea">
            <router-link to="/" class="buttomarea-item">今日任务</router-link>
            <router-link to="/times" class="buttomarea-item">车次管理</router-link>
            <router-link to="/client" class="buttomarea-item">客户管理</router-link>
            <router-link to="/dirver" class="buttomarea-item">司机管理</router-link>
            <router-link to="/car" class="buttomarea-item">车辆管理</router-link>
        
    </div>
</div>
</template>

<script>
export default {
    name: 'TopBar'
}
</script>

<style scoped>
#topbar {
    width: 100%;
    background-color: #d74342;
	box-shadow: 0 3px 5px 0;
}

.buttomarea {
    width: 80%;
    margin: 0 auto;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    padding-top: 30px;
}

.buttomarea-item {
    flex-basis: 20%;
    font-size: 40px;
    color: aliceblue;
    padding: 30px 0;
}

.buttomarea a {
    color: aliceblue;
    text-decoration: none;
}

#topbar a.router-link-exact-active {
    font-weight: bold;
    font-size: 45px;
}

.buttomarea-item:hover {
    background: -prefix-linear-zgradient(top, rgba(240, 248, 255, 0), rgba(240, 248, 255, 0.2));
    background: linear-gradient(to bottom, rgba(240, 248, 255, 0), rgba(240, 248, 255, 0.2));
	border-radius: 40px;
    -moz-border-radius:40px; /* Old Firefox */
}
</style>
