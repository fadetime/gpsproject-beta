<template>
    <div id="topbar">
        <!-- 大屏幕显示 start-->
        <div class="fullscreenstyle" style="height:80px">
            <div class="imagearea">
                <img src="../../public/img/ca177c09eb82f45c6d42ce00c2f48450.png"
                     alt="toplogo"
                     class="img600">
            </div>
            <div class="buttomarea">
                <div v-if="role === 'admin'">
                    <router-link to="/"
                             class="buttomarea-item"
                             style="color: aliceblue;">
                    <span v-if="lang === 'en'" class="titlefont">MISSION</span>
                    <span v-else class="titlefont">今日任务</span>
                    </router-link>
                    <router-link to="/times"
                                class="buttomarea-item"
                                style="color: aliceblue;">
                        <span v-if="lang === 'en'" class="titlefont">TRIPS</span>
                        <span v-else class="titlefont">车次管理</span>
                    </router-link>
                    <router-link to="/client"
                                class="buttomarea-item"
                                style="color: aliceblue;">
                        <span v-if="lang === 'en'" class="titlefont">CLIENT</span>
                        <span v-else class="titlefont">客户管理</span>
                    </router-link>
                    <router-link to="/dirver"
                                class="buttomarea-item"
                                style="color: aliceblue;">
                        <span v-if="lang === 'en'" class="titlefont">DRIVER</span>
                        <span v-else class="titlefont">人员管理</span>
                    </router-link>
                    <router-link to="/car"
                                class="buttomarea-item"
                                style="color: aliceblue;">
                        <span v-if="lang === 'en'" class="titlefont">CAR</span>
                        <span v-else class="titlefont">车辆管理</span>
                    </router-link>
                    <router-link to="/announcement"
                                class="buttomarea-item"
                                style="color: aliceblue;">
                        <span v-if="lang === 'en'" class="titlefont">NOTIFICATION</span>
                        <span v-else class="titlefont">公告管理</span>
                    </router-link>
                    <router-link to="/table"
                                class="buttomarea-item"
                                style="color: aliceblue;">
                        <span v-if="lang === 'en'" class="titlefont">REPORT</span>
                        <span v-else class="titlefont">报表统计</span>
                    </router-link>
                </div>
                <div v-else class="topbar_topuserinfo">
                    <div style="font-size:16px;line-height:30px;color:#fff;">
                        <span>{{role}}</span>
                    </div>
                    <div class="icon_logout" style="margin-left:10px" @click="logoutMethod()"></div>
                </div>
            </div>
        </div>
        <!-- 大屏幕显示 end-->

        <div class="buttomarea600"
             @click="showLeftMenuMethod">
            <img src="../../public/img/ca177c09eb82f45c6d42ce00c2f48450.png"
                 alt="toplogo"
                 class="img600">
        </div>
        <!-- left menu start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showLeftMenu"
                 @click.self.prevent="showLeftMenu = false"
                 class="leftmenu-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInLeft faster"
                    leave-active-class="animated slideOutLeft faster">
            <div v-if="showLeftMenu"
                 class="leftmenu-front">
                <div v-if="role === 'admin'">
                    <div class="leftmenu-title">
                        <span>管理后台</span>
                    </div>
                    <div class="leftmenu-item"
                        style="padding-top: 20px;"
                        @click="routerPushMethod('home')">
                        今日任务
                    </div>
                    <!-- <div class="leftmenu-item"
                        @click="routerPushMethod('searchOrder')">
                        来单查询
                    </div> -->
                    <div class="leftmenu-item"
                        @click="routerPushMethod('line')">
                        车次管理
                    </div>
                    <div class="leftmenu-item"
                        @click="routerPushMethod('client')">
                        客户管理
                    </div>
                    <div class="leftmenu-item"
                        @click="routerPushMethod('driver')">
                        司机管理
                    </div>
                    <div class="leftmenu-item"
                        @click="routerPushMethod('car')">
                        车辆管理
                    </div>
                </div> 
                
            </div>
        </transition>
        <!-- left menu end -->
    </div>
</template>

<script>
export default {
    name: "TopBar",
    computed:{
        lang(){
            return this.$store.state.language
        }
    },
    data() {
        return {
            showLeftMenu: false,
            role:null
        };
    },
    mounted(){
        this.role = localStorage.name
    },
    methods: {
        logoutMethod(){
            this.$router.push("/login");
            let item = null;
            this.$store.dispatch("setToken", item);
            localStorage.removeItem("token");
        },

        routerPushMethod(item) {
            if (item === "home") {
                this.$router.push("/");
            } else if (item === "searchOrder") {
                this.$router.push("/searchorder");
            } else if (item === "line") {
                this.$router.push("/times");
            } else if (item === "client") {
                this.$router.push("/client");
            } else if (item === "driver") {
                this.$router.push("/dirver");
            } else {
                this.$router.push("/car");
            }
            this.showLeftMenu = false;
        },
        showLeftMenuMethod() {
            this.showLeftMenu = true;
        }
    }
};
</script>

<style scoped>
#topbar {
    width: 100%;
    background-color: #d74342;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.imagearea {
    height: 100px;
    width: 100px;
    background: #ffffffc4;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    position: absolute;
    margin-top: 5px;
    z-index: 5;
}
.buttomarea {
    width: 80%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    padding-top: 30px;
    margin-left: 120px;
    position: relative;
}

.buttomarea-item {
    /* flex-basis: 20%; */
    margin-left: 25px;
    font-size: 20px;
    padding: 25px 0;
}

.buttomarea a {
    color: aliceblue;
    text-decoration: none;
}

#topbar a.router-link-exact-active {
    font-weight: bold;
    font-size: 22px;
}

.buttomarea-item:hover {
    background: -prefix-linear-zgradient(
        top,
        rgba(240, 248, 255, 0),
        rgba(240, 248, 255, 0.2)
    );
    background: linear-gradient(
        to bottom,
        rgba(240, 248, 255, 0),
        rgba(240, 248, 255, 0.2)
    );
    border-radius: 40px;
    -moz-border-radius: 40px; /* Old Firefox */
}

.leftmenu-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.leftmenu-front {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 200px;
    background: rgba(255, 255, 255, 0.9);
    z-index: 23;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.leftmenu-title {
    font-weight: 600;
    margin-top: 40px;
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
    line-height: 40px;
}

.leftmenu-item {
    padding-top: 10px;
    padding-bottom: 10px;
}

.icon_logout{
    background: #fff;
    mask-image: url(../../public/img/icons/icon_logout.svg);
    -webkit-mask-image: url(../../public/img/icons/icon_logout.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
    cursor: pointer;
}

.topbar_topuserinfo{
    display:flex;
    display:-webkit-flex;
    position: absolute;
    right: 0;
    top: 20px;
}

@media screen and (min-width: 1025px) {
    .fullscreenstyle{
        width: 80%;
        display: flex;
        display: -webkit-flex;
        margin: 0 auto;
        position: relative;
    }

    .buttomarea600 {
        display: none;
    }
}
@media screen and (max-width: 1024px) {
    .buttomarea600 {
        width: 0;
        height: 0;
    }
}
@media screen and (max-width: 600px) {
    #topbar {
        height: 40px;
    }

    .imagearea {
        display: none;
    }

    .buttomarea {
        display: none;
    }

    .titlefont {
        font-size: 20px;
    }

    .buttomarea600 {
        z-index: 11;
        background: #e0e0e0d4;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        position: absolute;
        margin-top: 5px;
        margin-left: 5px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
            rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
            rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
        top: 0;
    }

    .img600 {
        width: 60px;
        height: 60px;
    }
}
</style>
