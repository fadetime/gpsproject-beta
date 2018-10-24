<template>
    <div id="logpage">
        <div class="topbutton">
            <div class="topbutton-left">
                <md-datepicker v-model="selectedDate" md-immediately />
            </div>
            <div class="topbutton-right">
            </div>
        </div>

        <div class="centerinfo">
            <div class="infotitle" style="line-height:40px">
                <div style="width:106px">
                    <span>日期</span>
                </div>
                <div style="width:106px">
                    <span>操作人</span>
                </div>
                <div style="width:100px">
                    <span>模块</span>
                </div>
                <div style="width:100px">
                    <span>模式</span>
                </div>
                <div style="width:600px">
                    <span>信息</span>
                </div>
            </div>
            <div class="infobody">
                <md-card md-with-hover v-for="(item,index) in logArray" :key="index">
                    <div class="infobody-row">
                        <div class="infobody-item" style="width:100px">
                            <div>
                                <span class="tabletitle-item">{{item.logDate | datefilter}}</span>
                            </div>
                            <div>
                                <span class="tabletitle-item">{{item.logDate | timefilter}}</span>
                            </div>
                        </div>
                        <div class="infobody-item" style="width:100px;line-height:40px">
                            <span>{{item.logOperator}}</span>
                        </div>
                        <div class="infobody-item" style="width:100px;line-height:40px">
                            <span>{{item.logPlace}}</span>
                        </div>
                        <div class="infobody-item" style="width:100px;line-height:40px">
                            <span>{{item.logMode}}</span>
                        </div>
                        <div class="infobody-item" style="width:600px">
                            <span>{{item.logInfo}}</span>
                        </div>
                    </div>

                </md-card>
            </div>
        </div>

        <!-- <div class="centertable">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle" style="font-size:18px">
                        <div style="width:100px">
                            <span>操作日期</span>
                        </div>
                        <div style="width:100px">
                            <span>操作模块</span>
                        </div>
                        <div style="width:100px">
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
                        <div class="tablebody-item">
                            <div class="tablebody-item-box" style="width:100px">
                                <div>
                                    <span class="tabletitle-item">{{item.logDate | datefilter}}</span>
                                </div>
                                <div>
                                    <span class="tabletitle-item">{{item.logDate | timefilter}}</span>
                                </div>
                            </div>
                            <div class="tablebody-item-box" style="width:100px;line-height:40px">
                                <span>{{item.logPlace}}</span>
                            </div>
                            <div class="tablebody-item-box" style="width:100px;line-height:40px">
                                <span class="tabletitle-item">{{item.logMode}}</span>
                            </div>
                            <div class="tablebody-item-box">
                                <span class="tabletitle-item">{{item.logInfo}}</span>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div> 
        </div>-->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";

export default {
    mounted() {},
    data() {
        return {
            selectedDate: new Date(),
            logArray: []
        };
    },
    watch: {
        selectedDate: function() {
            axios
                .post(config.server + "/log", {
                    startdate: this.selectedDate
                })
                .then(res => {
                    this.logArray = res.data;
                })
                .catch(err => {
                    console.log("获取数据失败");
                    console.log(err);
                });
        }
    },
    methods: {}
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

.tablebody-item {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.centerinfo {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column;
    flex-flow: column;
}

.infotitle {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    color: #616161;
    width: 900px;
    font-size: 18px;
    font-weight: 500;
    margin: 0 auto;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)
}

.infotitle div {
    /* border:1px solid #e0e0e0; */
    background-color: #eee;
}

.infobody-item {
    border: 1px solid #e0e0e0;
}

.infobody{
    width: 900px;
    margin: 0 auto;
}

.infobody-row {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}
</style>
