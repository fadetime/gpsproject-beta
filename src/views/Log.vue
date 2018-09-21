<template>
    <div id="logpage">
        <div class="topbutton">
            <div class="topbutton-left">
                <md-datepicker v-model="selectedDate" md-immediately />
            </div>
            <div class="topbutton-right">
            </div>
        </div>

        <div class="centertable">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item">
                            <span>操作日期</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>操作模块</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>操作模式</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>操作信息</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <div class="tablebody">
                <md-card md-with-hover v-for="(item,index) in logArray" :key="index" style="background-color: #eff3f5">
                    <md-card-content>
                        <div class="tabletitle2">
                            <span class="tabletitle-item">{{item.missionline}}</span>
                            <span class="tabletitle-item">{{item.missiondirver}}</span>
                            <span class="tabletitle-item">{{item.missioncar}}</span>
                            <span class="tabletitle-item">{{item.count}}</span>
                            <span class="tabletitle-item">{{item.missionclient.length}}</span>
                            <span class="tabletitle-item">{{item.missionphone}}</span>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {},
    data() {
        return {
            selectedDate: "",
            logArray: []
        };
    },
    methods: {
        choseDate() {
            axios
                .post(config.server + "/log", {
                    startdate: this.selectedDate
                })
                .then(res => {
                    this.allmission = res.data;
                    this.countfinish();
                })
                .catch(err => {
                    console.log("获取数据失败");
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
#logpage {
    width: 80%;
    margin: 15px auto;
}

.topbutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.topbutton-left {
    flex-basis: 20%;
    text-align: left;
    margin: 0 auto;
}

.topbutton-right {
    margin: 0 auto;
    flex-basis: 70%;
    text-align: right;
}
</style>
