<template>
    <div id="tablepage">
        <div class="topbuttonarea">
            <div :class="leftButtonStyle"
                 style="border-top-left-radius:10px;border-bottom-left-radius:10px;"
                 @click="reportModeButtonMethod('night')">
                <span>夜班统计</span>
            </div>
            <div :class="centerButtonStyle"
                 style="margin-left:10px"
                 @click="reportModeButtonMethod('day')">
                <span>白班统计</span>
            </div>
            <div :class="checkCarButtonStyle"
                 style="margin-left:10px;"
                 @click="reportModeButtonMethod('checkCar')">
                <span>车辆检查</span>
            </div>
            <div :class="basketButtonStyle"
                 style="margin-left:10px;margin-right:10px"
                 @click="reportModeButtonMethod('basket')">
                <span>框数统计</span>
            </div>
            <div :class="rightButtonStyle"
                 style="border-top-right-radius:10px;border-bottom-right-radius:10px;"
                 @click="reportModeButtonMethod('bill')">
                <span>账单统计</span>
            </div>
        </div>
        <div v-if="showWindow === 'night'"
             class="toparea">

            <div style="height: 58px;position: relative;z-index:23;padding-left:6px;background:#fff">
                <vue-datepicker-local v-model="startDate"
                                      style="margin-top: 12px;"
                                      placeholder="开始时间" />
                <span> ~ </span>
                <vue-datepicker-local v-model="endDate"
                                      style="margin-top: 12px;"
                                      placeholder="结束时间" />
                <md-button class="md-raised md-primary"
                           @click="findReport"
                           style="font-size:18px;width:80px;height:30px;margin-top:13px">查询</md-button>
                <md-button class="md-raised md-primary"
                           @click="moreSearchInfo = !moreSearchInfo"
                           style="font-size:18px;width:80px;height:30px;margin-top:13px">更多</md-button>
            </div>
            <transition name="custom-classes-transition"
                        enter-active-class="animated slideInDown faster"
                        leave-active-class="animated slideOutUp faster">
                <div v-if="moreSearchInfo"
                     style="display:flex;display:-webkit-flex;justify-content: center;padding-bottom:10px">
                    <div>
                        <span style="font-size:18px;color:#6a6a6a;line-height: 34px;">选择司机：</span>
                    </div>
                    <div style="border:1px solid #e0e0e0;width:218px;height:34px;line-height:34px;cursor: pointer;"
                         @click="openDriverBox">
                        <span style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{driverText}}</span>
                    </div>
                    <md-button class="md-raised md-primary"
                               @click="moreSearchInfo = !moreSearchInfo"
                               style="font-size:18px;width:80px;height:30px;margin-top:13px"></md-button>
                </div>
            </transition>
        </div>
        <div v-else-if="showWindow === 'day'"
             class="toparea">

            <div style="height: 58px;position: relative;z-index:23;padding-left:6px;background:#fff">
                <vue-datepicker-local v-model="startDate"
                                      style="margin-top: 12px;"
                                      placeholder="开始时间" />
                <span> ~ </span>
                <vue-datepicker-local v-model="endDate"
                                      style="margin-top: 12px;"
                                      placeholder="结束时间" />
                <md-button class="md-raised md-primary"
                           @click="findDayReport"
                           style="font-size:18px;width:80px;height:30px;margin-top:13px">查询</md-button>
            </div>
        </div>

        <div v-else-if="showWindow === 'bill'"
             class="toparea">
            <div style="height: 58px;position: relative;z-index:23;padding-left:6px;background:#fff">
                <vue-datepicker-local v-model="startDate"
                                      style="margin-top: 12px;"
                                      placeholder="开始时间" />
                <span> ~ </span>
                <vue-datepicker-local v-model="endDate"
                                      style="margin-top: 12px;"
                                      placeholder="结束时间" />
                <md-button class="md-raised md-primary"
                           @click="findBillReport"
                           style="font-size:18px;width:80px;height:30px;margin-top:13px">查询</md-button>
            </div>
        </div>

        <div v-else-if="showWindow === 'checkCar'"
             class="toparea">
            <div style="height: 58px;position: relative;z-index:23;padding-left:6px;background:#fff;display: flex;display:-webkit-flex;justify-content: space-around;">
                <div>
                    <vue-datepicker-local v-model="startDate"
                                          style="margin-top: 12px;"
                                          placeholder="开始时间" />
                    <span> ~ </span>
                    <vue-datepicker-local v-model="endDate"
                                          style="margin-top: 12px;"
                                          placeholder="结束时间" />
                </div>
                <div style="display: flex;display:-webkit-flex;justify-content: space-around;">
                    <div class="whiteButton"
                         @click="checkCarMethod('driver')"
                         style="margin-top: 12px;margin-left: 10px;width:80px">
                        <span>司机记录</span>
                    </div>
                    <div class="whiteButton"
                         @click="checkCarMethod('checker')"
                         style="margin-top: 12px;margin-left: 10px;width:80px">
                        <span>检查记录</span>
                    </div>
                </div>

            </div>
            <transition name="custom-classes-transition"
                        enter-active-class="animated slideInDown faster"
                        leave-active-class="animated slideOutUp faster">
                <div v-if="isOpenCheckCarDriverMode"
                     style="display:flex;display:-webkit-flex;padding-bottom:10px;justify-content: space-evenly;">
                    <div style="display:flex;display:-webkit-flex">
                        <div>
                            <span style="font-size:18px;color:#6a6a6a;line-height: 34px;">选择司机：</span>
                        </div>
                        <div style="border:1px solid #e0e0e0;width:218px;height:34px;line-height:34px;cursor: pointer;"
                             @click="openDriverBox">
                            <span style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{driverText}}</span>
                        </div>
                    </div>
                    <div class="whiteButton"
                         @click="checkCarMethod('checker')"
                         style="margin-top: 0px;margin-right: 6px;;width:80px;background: #448aff;color: #fff;border:none">
                        <span>开始查询</span>
                    </div>
                </div>
            </transition>
        </div>

        <div v-else
             class="toparea">
            <div style="height: 58px;position: relative;z-index:23;display: flex;display:-webkit-flex;justify-content: center;;background:#fff">
                <div class="whiteButton"
                     @click="basketTopMethod()">
                    <span>TOP 5</span>
                </div>
            </div>
        </div>
        <!-- check car report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="tableInfo.length != 0">
                <div class="centerarea-head">
                    <span>出车收车情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>出车日期</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>出车时间</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>收车时间</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>框数(前/Out)</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>框数(后/In)</span>
                    </div>
                    <div style="flex-basis: 7%;text-align: center;">
                        <span>干净</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in tableInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 4%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 10%;text-align: center;">
                            <span>{{item.driver}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.date | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.date | timefilter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.finishDate === null">未提交</span>
                            <span v-else>{{item.finishDate | timefilter}}</span>

                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.boxNum}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.boxNumAgain}}</span>
                        </div>
                        <div style="flex-basis: 7%;text-align: center;">
                            <md-icon v-if="item.clean"
                                     style="color:green">check_circle</md-icon>
                            <md-icon v-else
                                     style="color:red">cancel</md-icon>
                        </div>
                    </div>
                </div>
                <div class="centerarea-bottom">
                    <span>带出框数(Out){{startBox}};</span>
                    <span>带回框数(In){{endBox}};</span>
                    <span>共</span>
                    <span>{{tableInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- check car report end -->

        <!-- mission report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="missionInfo.length != 0">
                <div class="centerarea-head">
                    <span>司机任务情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>任务日期</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>使用车辆</span>
                    </div>
                    <div style="flex-basis: 7%;text-align: center;">
                        <span>客户数</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in missionInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 4%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 10%;text-align: center;">
                            <span>{{item.missiondirver}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.missiondate | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.missioncar}}</span>
                        </div>
                        <div style="flex-basis: 7%;text-align: center;">
                            <span>{{item.missionclient.length}}</span>
                        </div>
                    </div>
                </div>
                <div class="centerarea-bottom">
                    <span>客户总数{{countClient}};</span>
                    <span>客户平均数{{averageClient}};</span>
                    <span>共</span>
                    <span>{{missionInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- mission report end -->

        <!-- driver choise box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isOpenDriverBox"
                 class="driverbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isOpenDriverBox"
                 class="driverbox-front"
                 @click.self.prevent="isOpenDriverBox = false">
                <div class="driver-front-box">
                    <div class="driver-front-box-title">
                        <span>司机选择</span>
                    </div>
                    <div class="driver-front-box-body"
                         style="width:300px">
                        <div class="driver-front-box-body-title">
                            <div class="driver-front-box-body-left">
                                <span>No.</span>
                            </div>
                            <div class="driver-front-box-body-right">
                                <span>司机姓名</span>
                            </div>
                        </div>
                        <div style="height:40vh;overflow-y: auto;">
                            <div class="driver-front-box-body-center"
                                 v-for="(item,index) in driverArray"
                                 :key="index"
                                 @click="choiseDriverMethod(item)">
                                <div class="driver-front-box-body-left">
                                    <span>{{index + 1}}</span>
                                </div>
                                <div class="driver-front-box-body-right">
                                    <span>{{item.dirvername}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="moreSearchInfo = !moreSearchInfo"
                                   style="font-size:18px;width:80px;height:30px;margin-top:13px">
                            <span>关闭</span>
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- driver choise box end -->

        <!-- dayShift report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="dayShiftInfo.length != 0">
                <div class="centerarea-head">
                    <span>白班任务情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 3%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 8%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 14%;text-align: center;">
                        <span>客户</span>
                    </div>
                    <div style="flex-basis: 8%;text-align: center;">
                        <span>类型</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>任务日期</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>出车时间</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>收车时间</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in dayShiftInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 3%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 8%;text-align: center;">
                            <span>{{item.driverName}}</span>
                        </div>
                        <div style="flex-basis: 14%;text-align: center;">
                            <span>{{item.clientName}}</span>
                        </div>
                        <div style="flex-basis: 8%;text-align: center;">
                            <span v-if="item.isIncreaseOrder">加单</span>
                            <span v-else>补单</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.orderDate | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.goTime">{{item.goTime | timefilter}}</span>
                            <span v-else>未送达</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.backTime">{{item.backTime | timefilter}}</span>
                            <span v-else>未送达</span>
                        </div>
                    </div>
                </div>
                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{dayShiftInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- dayShift report end -->

        <!-- bill report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="billInfo.length != 0">
                <div class="centerarea-head">
                    <span>账单情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 3%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 8%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>获取数量</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>剩余数量</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>统计日期</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>统计时间</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in billInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 3%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 8%;text-align: center;">
                            <span>{{item.driverName}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.startNum}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.endNum">{{item.endNum}}</span>
                            <span v-else>未完成</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.date | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.date | timefilter}}</span>
                        </div>
                    </div>
                </div>
                <div class="centerarea-bottom">
                    <!-- <span>客户总数{{countClient}};</span>
                    <span>客户平均数{{averageClient}};</span> -->
                    <span>共</span>
                    <span>{{billInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- bill report end -->

        <!-- basket report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="basketInfo.length != 0">
                <div class="centerarea-head">
                    <span>拖欠 TOP5</span>
                </div>
                <div class="centerarea-title">
                    <div style="min-width: 60px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span class="centerarea-title-item">No.</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>客户名称</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>拖欠框数</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>客户电话</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="flex-basis: 300px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>客户地址</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in basketInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="min-width: 60px;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.clientbname}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">未归还{{item.basket}}个</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.clientbphone}}</span>
                        </div>
                        <div style="flex-basis: 100%;text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                            <span style="padding-left:16px;padding-right:12px">{{item.clientbaddress}}</span>
                        </div>
                    </div>
                </div>
                <div style="display:flex;justify-content: space-around;display:-webkit-flex;padding: 20px 0;">
                    <div class="chartBox">
                        <canvas id="basketleft"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                    <div class="chartBox">
                        <canvas id="basketright"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                </div>

                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{basketInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- basket report end -->

        <!-- checker report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="checkerArray.length != 0">
                <div class="centerarea-head">
                    <span>车辆检查报告</span>
                </div>
                <div class="centerarea-title">
                    <div style="min-width: 60px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span class="centerarea-title-item">No.</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>检查员</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 120px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>创建日期</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>创建时间</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>结束日期</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>结束时间</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 70px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>车数</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="flex-basis: 300px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>错误</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in checkerArray"
                         @click="detailCheckInfo(item)"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="min-width: 60px;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missionCreator}}</span>
                        </div>
                        <div style="min-width: 120px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.createDate | datefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.createDate | timefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.finishDate | datefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.finishDate | timefilter}}</span>
                        </div>
                        <div style="min-width: 70px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missionList.length}}辆</span>
                        </div>
                        <div style="flex-basis: 100%;text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                            <span style="padding-left:16px;padding-right:12px">{{wrongNumArray[index]}}</span>
                        </div>
                    </div>
                </div>
                <div style="display:flex;justify-content: space-around;display:-webkit-flex;padding: 20px 0;">
                    <div class="chartBox">
                        <canvas id="checkertleft"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                    <div class="chartBox">
                        <canvas id="checkertright"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                </div>

                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{checkerArray.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- checker report end -->

        <!-- check detail information box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showDetailCheckInfo"
                 class="checkditailbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showDetailCheckInfo"
                 class="checkditailbox-front"
                 @click.self.prevent="showDetailCheckInfo = false">
                <div class="checkditailbox-front-box">
                    <div class="checkditailbox-front-box-top">
                        <span>详细信息</span>
                    </div>
                    <div>
                        <div class="checkditailbox-body-title">
                            <span>{{tempInfo.missionCreator}}</span>
                        </div>
                        <div>
                            {{tempInfo.createDate | datefilter}}
                            {{tempInfo.createDate | timefilter}}
                        </div>
                        <div class="checkditailbox-body-center">
                            <div class="checkditailbox-body-center-title">
                                <div class="checkditailbox-body-center-title-content"
                                     style="min-width:120px">
                                    <span>车牌</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="min-width:80px">
                                    <span>刹车灯</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="min-width:80px">
                                    <span>大灯</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="min-width:80px">
                                    <span>油卡</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="min-width:80px">
                                    <span>轮胎</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="min-width:110px">
                                    <span>检查日期</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="min-width:110px">
                                    <span>检查时间</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="min-width:300px">
                                    <span>备注</span>
                                </div>
                            </div>
                            <div v-for="(item,index) in tempInfo.missionList "
                                 class="checkditailbox-body-center-item"
                                 :key="index">
                                <div class="checkditailbox-body-center-item-content"
                                     style="min-width:120px;margin-left:4px">
                                    <span>{{item.carPlate}}</span>
                                </div>
                                <div class="checkditailbox-body-center-item-content"
                                     style="min-width:80px;">
                                    <md-icon v-if="item.brakeLight"
                                             style="color:green">check_circle</md-icon>
                                    <md-icon v-else
                                             style="color:red">cancel</md-icon>
                                </div>
                                <div class="checkditailbox-body-center-item-content"
                                     style="min-width:80px">
                                    <md-icon v-if="item.headlight"
                                             style="color:green">check_circle</md-icon>
                                    <md-icon v-else
                                             style="color:red">cancel</md-icon>
                                </div>
                                <div class="checkditailbox-body-center-item-content"
                                     style="min-width:80px">
                                    <md-icon v-if="item.petrolCard"
                                             style="color:green">check_circle</md-icon>
                                    <md-icon v-else
                                             style="color:red">cancel</md-icon>
                                </div>
                                <div class="checkditailbox-body-center-item-content"
                                     style="min-width:80px">
                                    <md-icon v-if="item.tyre"
                                             style="color:green">check_circle</md-icon>
                                    <md-icon v-else
                                             style="color:red">cancel</md-icon>
                                </div>
                                <div class="checkditailbox-body-center-item-content"
                                     style="min-width:110px">
                                    <span>{{item.checkDate | datefilter}}</span>
                                </div>
                                <div class="checkditailbox-body-center-item-content"
                                     style="min-width:110px">
                                    <span>{{item.checkDate | timefilter}}</span>
                                </div>
                                <div class="checkditailbox-body-center-item-content"
                                     style="min-width:300px">
                                    <span v-if="item.note === null">无备注</span>
                                    <span v-else>{{item.note}}</span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showDetailCheckInfo = false"
                                   style="font-size:18px;width:80px;height:30px">取消</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check detail information box end -->

        <!-- tips box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated bounceIn"
                    leave-active-class="animated bounceOut faster">
            <div v-if="isOpenTipBox"
                 class="tipBox-front"
                 @click.self.prevent="isOpenTipBox = false">
                <div class="tip-front-box"
                     style="display: flex;display:-webkit-flex;">
                    <div>
                        <md-icon class="md-size-2x"
                                 style="color:#ffab40">report_problem</md-icon>
                    </div>
                    <div style="font-size:16px;line-height:48px">
                        <span>{{tipsMsg}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- tips box end -->
    </div>
</template>

<script>
import VueDatepickerLocal from "vue-datepicker-local"; //时间选择组件
import axios from "axios";
import config from "../../public/js/config.js";
import Chart from "chart.js";

function combination(arr) {
    let obj = {};
    arr.forEach(item => {
        if (!obj[item.carPlate]) {
            obj[item.carPlate] = {
                carPlate: item.carPlate,
                wrongNum: item.wrongNum
            };
        } else {
            obj[item.carPlate].wrongNum += item.wrongNum;
        }
    });
    let output = [];
    for (let key in obj) {
        output.push(obj[key]);
    }
    return output;
}

export default {
    name: "tablePage",
    components: {
        VueDatepickerLocal
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            tableInfo: [],
            missionInfo: [],
            dayShiftInfo: [],
            billInfo: [],
            basketInfo: [],
            startBox: 0,
            countClient: 0,
            averageClient: 0,
            endBox: 0,
            moreSearchInfo: false,
            isOpenDriverBox: false,
            driverArray: [],
            checkerArray: [],
            choiseDriver: null,
            driverText: "请点击选择",
            isOpenTipBox: false,
            tipsMsg: null,
            showWindow: "night",
            isOpenCheckCarDriverMode: false,
            leftButtonStyle: "topbuttonarea-item-blue",
            centerButtonStyle: "topbuttonarea-item",
            checkCarButtonStyle: "topbuttonarea-item",
            basketButtonStyle: "topbuttonarea-item",
            rightButtonStyle: "topbuttonarea-item",
            showDetailCheckInfo: false,
            tempInfo: null,
            wrongNumArray: [],
            tempCar: [],
            tempCarError: []
        };
    },

    methods: {
        detailCheckInfo(item) {
            this.showDetailCheckInfo = true;
            this.tempInfo = item;
        },
        checkCarMethod(mode) {
            if (!this.startDate || !this.endDate) {
                this.tipsMsg = "请选择查询的开始-结束时间";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            } else {
                if (mode === "driver") {
                    this.isOpenCheckCarDriverMode = !this
                        .isOpenCheckCarDriverMode;
                } else {
                    this.isOpenCheckCarDriverMode = false;
                    axios
                        .post(config.server + "/checkworker/find", {
                            startDate: this.startDate,
                            endDate: this.endDate
                        })
                        .then(doc => {
                            let errPartNum = []; //统计错误部件数量
                            if (doc.data.code === 0) {
                                this.checkerArray = doc.data.doc;
                                let brakeLightErrNum = 0;
                                let headlightErrNum = 0;
                                let petrolCardErrNum = 0;
                                let tyreErrNum = 0;
                                let otherErrNum = 0;
                                this.checkerArray.forEach(element => {
                                    let tempWrongNum = 0;
                                    element.missionList.forEach(element2 => {
                                        let tempCarInfo = {
                                            carPlate: null,
                                            wrongNum: 0
                                        };
                                        let thisCarErrNum = 0;
                                        //记录当天检查错误总数 start
                                        if (!element2.brakeLight) {
                                            tempWrongNum++;
                                            thisCarErrNum++;
                                            brakeLightErrNum++;
                                        }
                                        if (!element2.headlight) {
                                            tempWrongNum++;
                                            thisCarErrNum++;
                                            headlightErrNum++;
                                        }
                                        if (!element2.petrolCard) {
                                            tempWrongNum++;
                                            thisCarErrNum++;
                                            petrolCardErrNum++;
                                        }
                                        if (!element2.tyre) {
                                            tempWrongNum++;
                                            thisCarErrNum++;
                                            tyreErrNum++;
                                        }
                                        if (element2.note) {
                                            tempWrongNum++;
                                            thisCarErrNum++;
                                            otherErrNum++;
                                        }
                                        //记录当天检查错误总数 end
                                        tempCarInfo.carPlate =
                                            element2.carPlate;
                                        tempCarInfo.wrongNum = thisCarErrNum;
                                        this.tempCar.push(tempCarInfo);
                                    });
                                    this.wrongNumArray.push(tempWrongNum);
                                });
                                let newArray = combination(this.tempCar);
                                let newTitle = [];
                                let newContent = [];
                                newArray.forEach(element => {
                                    newTitle.push(element.carPlate);
                                    newContent.push(element.wrongNum);
                                });
                                errPartNum.push(brakeLightErrNum);
                                errPartNum.push(headlightErrNum);
                                errPartNum.push(petrolCardErrNum);
                                errPartNum.push(tyreErrNum);
                                errPartNum.push(otherErrNum);
                                //show chart method start
                                setTimeout(() => {
                                    let checkertleft = document.getElementById(
                                        "checkertleft"
                                    );
                                    let myChart2 = new Chart(checkertleft, {
                                        type: "doughnut",
                                        data: {
                                            labels: newTitle,
                                            datasets: [
                                                {
                                                    label: "carErrorNum",
                                                    backgroundColor:
                                                        "rgba(225,10,10,0.3)",
                                                    borderColor:
                                                        "rgba(225,103,110,1)",
                                                    borderWidth: 1,
                                                    pointStrokeColor: "#fff",
                                                    pointStyle: "crossRot",
                                                    data: newContent,
                                                    cubicInterpolationMode:
                                                        "monotone",
                                                    spanGaps: "false",
                                                    fill: "false",
                                                    backgroundColor: [
                                                        "aqua",
                                                        "#36a2eb",
                                                        "fuchsia",
                                                        "rgb(255, 99, 132)",
                                                        "rgb(255, 205, 86)",
                                                        "lime",
                                                        "#393939",
                                                        "#f5b031",
                                                        "#fad797",
                                                        "#59ccf7",
                                                        "#c3b4df"
                                                    ],
                                                    borderColor: ["#fff"],
                                                    borderWidth: 2
                                                }
                                            ]
                                        },
                                        options: {
                                            legend: {
                                                display: true,
                                                labels: {
                                                    fontColor:
                                                        "rgb(255, 99, 132)"
                                                }
                                            }
                                        }
                                    });
                                }, 100);

                                setTimeout(() => {
                                    let checkertRight = document.getElementById(
                                        "checkertright"
                                    );
                                    let myChart2 = new Chart(checkertRight, {
                                        type: "bar",
                                        data: {
                                            labels: ['刹车灯','大灯','油卡','轮胎','其他'],
                                            datasets: [
                                                {
                                                    label: "损坏部件统计",
                                                    backgroundColor:
                                                        "rgba(225,10,10,0.3)",
                                                    borderColor:
                                                        "rgba(225,103,110,1)",
                                                    borderWidth: 1,
                                                    pointStrokeColor: "#fff",
                                                    pointStyle: "crossRot",
                                                    data: errPartNum,
                                                    cubicInterpolationMode:
                                                        "monotone",
                                                    spanGaps: "false",
                                                    fill: "false",
                                                    backgroundColor: [
                                                        "aqua",
                                                        "#36a2eb",
                                                        "fuchsia",
                                                        "rgb(255, 99, 132)",
                                                        "rgb(255, 205, 86)",
                                                        "lime"
                                                    ],
                                                    borderColor: ["#fff"],
                                                    borderWidth: 2
                                                }
                                            ]
                                        },
                                        options: {}
                                    });
                                }, 200);
                                //show chart method end
                            } else {
                                this.tipsMsg = "查询数据出现错误";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        },

        openBasketLeftChartMethod() {
            let basketUser = [];
            let basketNum = [];
            this.basketInfo.forEach(element => {
                basketUser.push(element.clientbname);
            });
            this.basketInfo.forEach(element => {
                basketNum.push(element.basket);
            });
            setTimeout(() => {
                var ctx2 = document.getElementById("basketleft");
                var myChart2 = new Chart(ctx2, {
                    type: "pie",
                    data: {
                        labels: basketUser,
                        datasets: [
                            {
                                label: "test1",
                                backgroundColor: "rgba(225,10,10,0.3)",
                                borderColor: "rgba(225,103,110,1)",
                                borderWidth: 1,
                                pointStrokeColor: "#fff",
                                pointStyle: "crossRot",
                                data: basketNum,
                                cubicInterpolationMode: "monotone",
                                spanGaps: "false",
                                fill: "false",
                                backgroundColor: [
                                    "aqua",
                                    "#36a2eb",
                                    "fuchsia",
                                    "rgb(255, 99, 132)",
                                    "rgb(255, 205, 86)",
                                    "lime"
                                ],
                                borderColor: ["#fff"],
                                borderWidth: 2
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: true,
                            labels: {
                                fontColor: "rgb(255, 99, 132)"
                            }
                        }
                    }
                });
            }, 100);

            setTimeout(() => {
                var ctx2 = document.getElementById("basketright");
                var myChart2 = new Chart(ctx2, {
                    type: "bar",
                    data: {
                        labels: basketUser,
                        datasets: [
                            {
                                label: "欠框统计",
                                backgroundColor: "rgba(225,10,10,0.3)",
                                borderColor: "rgba(225,103,110,1)",
                                borderWidth: 1,
                                pointStrokeColor: "#fff",
                                pointStyle: "crossRot",
                                data: basketNum,
                                cubicInterpolationMode: "monotone",
                                spanGaps: "false",
                                fill: "false",
                                backgroundColor: [
                                    "aqua",
                                    "#36a2eb",
                                    "fuchsia",
                                    "rgb(255, 99, 132)",
                                    "rgb(255, 205, 86)",
                                    "lime"
                                ],
                                borderColor: ["#fff"],
                                borderWidth: 2
                            }
                        ]
                    },
                    options: {}
                });
            }, 200);
        },

        basketTopMethod() {
            axios
                .get(config.server + "/report/basket")
                .then(doc => {
                    if (doc.data.code === 1) {
                        this.tipsMsg = "未找到该数据！！！";
                        this.isOpenTipBox = true;
                        setTimeout(() => {
                            this.isOpenTipBox = false;
                        }, 3000);
                    } else {
                        this.basketInfo = doc.data.doc;
                        this.openBasketLeftChartMethod();
                        console.log(doc);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        reportModeButtonMethod(mode) {
            if (mode === "night") {
                this.showWindow = "night";
                this.leftButtonStyle = "topbuttonarea-item-blue";
                this.centerButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
            } else if (mode === "bill") {
                this.showWindow = "bill";
                this.leftButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item-blue";
            } else if (mode === "day") {
                this.showWindow = "day";
                this.leftButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item-blue";
                this.basketButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
            } else if (mode === "basket") {
                this.showWindow = "basket";
                this.leftButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item-blue";
                this.rightButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
            } else {
                this.showWindow = "checkCar";
                this.leftButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item-blue";
            }
        },

        choiseDriverMethod(item) {
            this.choiseDriver = item;
            this.driverText = item.dirvername;
            this.isOpenDriverBox = false;
        },
        openDriverBox() {
            this.isOpenDriverBox = true;
            axios
                .get(config.server + "/dirver")
                .then(doc => {
                    console.log(doc);
                    this.driverArray = doc.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        findBillReport() {
            if (!this.startDate || !this.endDate) {
                this.tipsMsg = "请选择开始时间和结束时间！！！";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            } else {
                let start = new Date(this.startDate).toDateString();
                start = new Date(start).getTime();
                let end = new Date(this.endDate).toDateString();
                end = new Date(end).getTime();
                axios
                    .post(config.server + "/bill/findall", {
                        startDate: start,
                        endDate: end
                    })
                    .then(doc => {
                        if (doc.data.code === 1) {
                            this.tipsMsg = "未找到该数据！！！";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        } else if (doc.data.code === 0) {
                            this.billInfo = doc.data.doc;
                        } else {
                            this.tipsMsg = "查找时出现错误";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        findDayReport() {
            if (!this.startDate || !this.endDate) {
                this.tipsMsg = "请选择开始时间和结束时间！！！";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            } else {
                let start = new Date(this.startDate).toDateString();
                start = new Date(start).getTime();
                let end = new Date(this.endDate).toDateString();
                end = new Date(end).getTime();
                axios
                    .post(config.server + "/dayShiftmission/findall", {
                        startDate: start,
                        endDate: end
                    })
                    .then(doc => {
                        console.log(doc);
                        if (doc.data.code === 1) {
                            this.tipsMsg = "未找到该数据！！！";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        } else if (doc.data.code === 0) {
                            this.dayShiftInfo = doc.data.doc;
                        } else {
                            this.tipsMsg = "查找时出现错误";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        findReport() {
            if (!this.startDate || !this.endDate) {
                this.tipsMsg = "请选择开始时间和结束时间！！！";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            } else {
                let start = new Date(this.startDate).toDateString();
                start = new Date(start).getTime();
                let end = new Date(this.endDate).toDateString();
                end = new Date(end).getTime();
                if (this.moreSearchInfo) {
                    if (this.driverText === "请点击选择") {
                        this.tipsMsg = "请选择司机！！！";
                        this.isOpenTipBox = true;
                        setTimeout(() => {
                            this.isOpenTipBox = false;
                        }, 3000);
                    } else {
                        axios
                            .post(config.server + "/report/bydriver", {
                                startDate: start,
                                endDate: end,
                                driverName: this.driverText
                            })
                            .then(doc => {
                                if (doc.data.code === 1) {
                                    this.tipsMsg = "未找到该数据！！！";
                                    this.isOpenTipBox = true;
                                    this.tableInfo = [];
                                    setTimeout(() => {
                                        this.isOpenTipBox = false;
                                    }, 3000);
                                } else {
                                    this.tableInfo = doc.data.doc;
                                    this.startBox = 0;
                                    this.endBox = 0;
                                    doc.data.doc.forEach(element => {
                                        this.startBox += element.boxNum;
                                        this.endBox += element.boxNumAgain;
                                    });
                                }
                                this.findMissionReport();
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                } else {
                    axios
                        .post(config.server + "/report/check", {
                            startDate: start,
                            endDate: end
                        })
                        .then(doc => {
                            if (doc.data.code === 1) {
                                this.tipsMsg = "未找到该数据！！！";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            } else {
                                console.log(doc);
                                this.tableInfo = doc.data.doc;
                                this.startBox = 0;
                                this.endBox = 0;
                                doc.data.doc.forEach(element => {
                                    this.startBox += element.boxNum;
                                    this.endBox += element.boxNumAgain;
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        },

        findMissionReport() {
            let start = new Date(this.startDate).toDateString();
            start = new Date(start).getTime();
            let end = new Date(this.endDate).toDateString();
            end = new Date(end).getTime();
            axios
                .post(config.server + "/report/findmission", {
                    startDate: start,
                    endDate: end,
                    driverName: this.driverText
                })
                .then(doc => {
                    if (doc.data.code === 1) {
                        this.tipsMsg = "未找到该数据！！！";
                        this.isOpenTipBox = true;
                        this.missionInfo = [];
                        setTimeout(() => {
                            this.isOpenTipBox = false;
                        }, 3000);
                    } else {
                        this.missionInfo = doc.data.doc;
                        this.countClient = 0;
                        doc.data.doc.forEach(element => {
                            this.countClient += element.missionclient.length;
                        });
                        this.averageClient = Math.ceil(
                            this.countClient / doc.data.doc.length
                        );
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
#tablepage {
    padding-top: 20px;
    width: 80%;
    margin: 0 auto;
}

.topbuttonarea {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 10px;
}

.topbuttonarea-item {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 100px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid #e0e0e0;
    transition: 0.2s;
}

.topbuttonarea-item:active {
    box-shadow: none;
    transition: 0.2s;
}

.topbuttonarea-item-blue {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 100px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    background: #448aff;
    color: #fff;
    transition: 0.2s;
}

.topbuttonarea-item-blue:active {
    box-shadow: none;
    transition: 0.2s;
}

.toparea {
    width: 660px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.centerarea {
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
}

.centerarea-head {
    font-size: 18px;
    color: #6a6a6a;
    border-bottom: 2px solid #448aff;
    height: 40px;
    line-height: 40px;
    width: 240px;
    margin: 0 auto;
}

.centerarea-title {
    font-size: 18px;
    display: flex;
    display: -webkit-flex;
    color: #6a6a6a;
    border-bottom: 1px solid #e0e0e0;
    margin: 20px 12px 0 12px;
    padding: 0 12px;
}

.centerarea-title-item {
    padding-left: 12px;
    padding-right: 12px;
}

.centerarea-body {
    color: #212121;
    margin: auto 12px;
    overflow-y: auto;
    overflow-x: hidden;
}

.centerarea-body-item {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 12px;
    cursor: pointer;
    transition: 0.2s;
}

.centerarea-body-item:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    transition: 0.2s;
}

.centerarea-bottom {
    margin: 0 10px;
    border-top: 1px solid #e0e0e0;
    font-size: 18px;
    color: #6a6a6a;
    text-align: right;
    height: 30px;
    line-height: 30px;
}

.driverbox-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.driverbox-front {
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

.tipBox-front {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}
.driver-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
}

.tip-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
    border-top: 1px solid #ffab40;
}

.driver-front-box-title {
    height: 40px;
    color: #fff;
    background: #ff5252;
    font-size: 18px;
    line-height: 40px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.driver-front-box-body {
    padding-top: 10px;
}

.driver-front-box-body-title {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    color: #6a6a6a;
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
    line-height: 40px;
}

.driver-front-box-body-center {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
}

.driver-front-box-body-center:hover {
    background: #e0e0e0;
}
.driver-front-box-body-left {
    flex-basis: 20%;
}

.driver-front-box-body-right {
    flex-basis: 80%;
}

.whiteButton {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 100px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid #e0e0e0;
    transition: 0.2s;
    border-radius: 10px;
    margin-top: 10px;
}

.whiteButton:active {
    box-shadow: none;
    transition: 0.2s;
}

.chartBox {
    width: 400px;
    height: 400px;
    position: relative;
}

.checkditailbox-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.checkditailbox-front {
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

.checkditailbox-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
}

.checkditailbox-front-box-top {
    height: 35px;
    font-size: 18px;
    line-height: 35px;
    background: #d44950;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.checkditailbox-body-title {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #448aff;
    width: 200px;
    margin: 0 auto;
}

.checkditailbox-body-center {
    font-size: 16px;
    margin-top: 10px;
    margin-left: 12px;
    margin-right: 12px;
}

.checkditailbox-body-center-title {
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
}

.checkditailbox-body-center-title-content {
    padding-left: 12px;
    padding-right: 12px;
    border-left: 4px solid #e0e0e0;
    text-align: left;
}

.checkditailbox-body-center-item {
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
}

.checkditailbox-body-center-item-content {
    padding-left: 12px;
    text-align: left;
}
</style>
