<template>
<div id="topbar">
    <div class="buttomarea">
            <router-link to="/" class="buttomarea-item" style="color: aliceblue;">
                <span class="titlefont">今日任务</span>
            </router-link>
            <router-link to="/times" class="buttomarea-item" style="color: aliceblue;">
                <span class="titlefont">车次管理</span>
            </router-link>
            <router-link to="/client" class="buttomarea-item" style="color: aliceblue;">
                <span class="titlefont">客户管理</span>
            </router-link>
            <router-link to="/dirver" class="buttomarea-item" style="color: aliceblue;">
                <span class="titlefont">司机管理</span>
            </router-link>
            <router-link to="/car" class="buttomarea-item" style="color: aliceblue;">
                <span class="titlefont">车辆管理</span>
            </router-link>
        
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
    padding-top: 10px;
}

.buttomarea-item {
    flex-basis: 20%;
    font-size: 25px;
    padding: 20px 0;
}

.buttomarea a {
    color: aliceblue;
    text-decoration: none;
}

#topbar a.router-link-exact-active {
    font-weight: bold;
    font-size: 30px;
}

.buttomarea-item:hover {
    background: -prefix-linear-zgradient(top, rgba(240, 248, 255, 0), rgba(240, 248, 255, 0.2));
    background: linear-gradient(to bottom, rgba(240, 248, 255, 0), rgba(240, 248, 255, 0.2));
	border-radius: 40px;
    -moz-border-radius:40px; /* Old Firefox */
}

@media screen and (max-width: 600px) {
    .titlefont{
        font-size: 20px;
    }

}
</style>
