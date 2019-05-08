<template>
    <div id="tablepage">
        <div class="topbuttonarea">
            <div :class="leftButtonStyle"
                 style="border-top-left-radius:10px;border-bottom-left-radius:10px;"
                 @click="reportModeButtonMethod('night')">
                <span>夜班统计</span>
            </div>
            <div :class="tripsButtonStyle"
                 style="margin-left:10px"
                 @click="reportModeButtonMethod('trips')">
                <span>车次统计</span>
            </div>
            <div :class="centerButtonStyle"
                 style="margin-left:10px"
                 @click="reportModeButtonMethod('day')">
                <span>白班统计</span>
            </div>
            <div :class="backButtonStyle"
                 style="margin-left:10px"
                 @click="reportModeButtonMethod('backMission')">
                <span>退还统计</span>
            </div>
            <div :class="missionButtonStyle"
                 style="margin-left:10px;"
                 @click="reportModeButtonMethod('mission')">
                <span>任务统计</span>
            </div>
            <div :class="checkCarButtonStyle"
                 style="margin-left:10px;"
                 @click="reportModeButtonMethod('checkCar')">
                <span>车辆检查</span>
            </div>
            <div :class="repairCarButtonStyle"
                 style="margin-left:10px;"
                 @click="reportModeButtonMethod('repairCar')">
                <span>车辆维修</span>
            </div>
            <div :class="basketButtonStyle"
                 style="margin-left:10px;margin-right:10px"
                 @click="reportModeButtonMethod('basket')">
                <span>菜框统计</span>
            </div>
            <div :class="carWashButtonStyle"
                 style="margin-right:10px"
                 @click="reportModeButtonMethod('carWash')">
                <span>洗车统计</span>
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
                </div>
            </transition>
        </div>
        <!-- 车次统计部分 start -->
        <div v-else-if="showWindow === 'trips'" class="new_toparea">
            <div style="height: 58px;position: relative;z-index:23;padding-left:6px;display:flex;display: -webkit-flex;justify-content: center;">
                <div class="whiteButton" style="margin-right:12px" @click="isShowRepairCarSingleDay = !isShowRepairCarSingleDay,isShowRepairCarMoreDay = false">
                    <span>单日查询</span>
                </div>
                <div class="whiteButton" @click="isShowRepairCarMoreDay = !isShowRepairCarMoreDay,isShowRepairCarSingleDay = false">
                    <span>多日查询</span>
                </div>
            </div>
            <div v-if="isShowRepairCarSingleDay"
                     style="display:flex;display:-webkit-flex;justify-content: center;padding-bottom:10px">
                <vue-datepicker-local v-model="startDate"
                                      style="margin-top: 12px;"
                                      placeholder="开始时间" />
                <md-button class="md-raised md-primary"
                           @click="findTripsReportByOneDayMethod"
                           style="font-size:18px;width:80px;height:30px;margin-top:13px">查询</md-button>
            </div>
            <div v-if="isShowRepairCarMoreDay"
                     style="display:flex;display:-webkit-flex;justify-content: center;padding-bottom:10px">
                <vue-datepicker-local v-model="startDate"
                                      style="margin-top: 12px;"
                                      placeholder="开始时间" />
                <span style="line-height:56px"> ~ </span>
                <vue-datepicker-local v-model="endDate"
                                      style="margin-top: 12px;"
                                      placeholder="结束时间" />
                <md-button class="md-raised md-primary"
                           @click="findTripsReportByMoreDayMethod"
                           style="font-size:18px;width:80px;height:30px;margin-top:13px">查询</md-button>
            </div>
        </div>
        <!-- 车次统计部分 end -->

        <!-- 白班统计部分 start -->
        <div v-else-if="showWindow === 'day'"
             class="toparea">
            <div class="table_toparea_button_area">
                <div class="whiteButton" style="margin-right:12px" @click="isShowDayShiftMission = !isShowDayShiftMission,isShowDayShiftCheckCar = false">
                    <span>任务统计</span>
                </div>
                <div class="whiteButton" @click="isShowDayShiftCheckCar = !isShowDayShiftCheckCar,isShowDayShiftMission = false">
                    <span>车辆检查</span>
                </div>
            </div>
            
            <div v-if="isShowDayShiftMission" style="height: 58px;position: relative;z-index:23;padding-left:6px;background:#fff">
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
            <div v-else-if="isShowDayShiftCheckCar" style="height: 58px;position: relative;z-index:23;padding-left:6px;background:#fff" class="table_toparea_button_area">
                <div>
                    <vue-datepicker-local v-model="startDate"
                                      style="margin-top: 12px;"
                                      placeholder="开始时间" />
                    <span> ~ </span>
                    <vue-datepicker-local v-model="endDate"
                                        style="margin-top: 12px;"
                                        placeholder="结束时间" />
                </div>
                <div class="white_button" @click="findDayShiftCheckCarMethod" style="margin-top: 10px;margin-left: 10px;">
                    <span>查询</span>
                </div>
            </div>
        </div>
        <!-- 白班统计部分 end -->
        
        <!-- 退还统计部分 start -->
        <backItem v-else-if="showWindow === 'backMission'"></backItem>
        
        <!-- 退还统计部分 end -->

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

        <div v-else-if="showWindow === 'mission'"
             class="toparea">
            <div style="height: 58px;position: relative;z-index:23;padding-left:6px;background:#fff;display:flex;display: -webkit-flex;">
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
                         @click="missionChartMethod('allChart')"
                         style="margin-top: 12px;margin-left: 10px;width:80px">
                        <span>任务查询</span>
                    </div>
                    <div class="whiteButton"
                         @click="missionChartMethod('driverChart')"
                         style="margin-top: 12px;margin-left: 10px;width:80px">
                        <span>更多查询</span>
                    </div>
                </div>
            </div>
            <transition name="custom-classes-transition"
                        enter-active-class="animated slideInDown faster"
                        leave-active-class="animated slideOutUp faster">
                <div v-if="isOpenMissionMode"
                     style="display:flex;display:-webkit-flex;padding-bottom:10px;justify-content: flex-end;">
                    <div style="display:flex;display:-webkit-flex;margin-right: 20px;">
                        <div>
                            <span style="font-size:18px;color:#6a6a6a;line-height: 34px;">选择司机：</span>
                        </div>
                        <div style="border:1px solid #e0e0e0;width:218px;height:34px;line-height:34px;cursor: pointer;"
                             @click="openDriverBox">
                            <span style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{driverText}}</span>
                        </div>
                    </div>
                    <div style="display:flex;display:-webkit-flex;width:192px">
                        <div class="whiteButton"
                             @click="missionRepotForDriver()"
                             style="margin-top: 0px;margin-right: 6px;;width:80px;background: #448aff;color: #fff;border:none">
                            <span>司机查询</span>
                        </div>
                    </div>

                </div>
            </transition>
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
                     style="display:flex;display:-webkit-flex;padding-bottom:10px;justify-content: flex-end;">
                    <div style="display:flex;display:-webkit-flex;margin-right: 20px;">
                        <div>
                            <span style="font-size:18px;color:#6a6a6a;line-height: 34px;">选择司机：</span>
                        </div>
                        <div style="border:1px solid #e0e0e0;width:218px;height:34px;line-height:34px;cursor: pointer;"
                             @click="openDriverBox">
                            <span style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{driverText}}</span>
                        </div>
                    </div>
                    <div style="display:flex;display:-webkit-flex;width:175px">
                        <div class="whiteButton"
                             @click="driverCheckCarMethod()"
                             style="margin-top: 0px;margin-right: 6px;;width:80px;background: #448aff;color: #fff;border:none">
                            <span>司机查询</span>
                        </div>
                        <div class="whiteButton"
                             @click="allDriverCheckCarMethod()"
                             style="margin-top: 0px;margin-right: 6px;;width:80px;background: #448aff;color: #fff;border:none">
                            <span>全部查询</span>
                        </div>
                    </div>

                </div>
            </transition>
        </div>

        <div v-else-if="showWindow === 'repairCar'" class="toparea">
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
                         @click="repairCarMethod('find')"
                         style="margin-top: 12px;margin-left: 10px;width:80px">
                        <span>维修记录</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="showWindow === 'carWash'"
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
                         @click="carWashMethod('find')"
                         style="margin-top: 12px;margin-left: 10px;width:80px">
                        <span>洗车记录</span>
                    </div>
                    <div class="whiteButton"
                         @click="carWashMethod('more')"
                         style="margin-top: 12px;margin-left: 10px;width:80px">
                        <span>更多查询</span>
                    </div>
                </div>
            </div>
            <transition name="custom-classes-transition"
                        enter-active-class="animated slideInDown faster"
                        leave-active-class="animated slideOutUp faster">
                <div v-if="isOpenCarWashDriverMode"
                     style="display:flex;display:-webkit-flex;padding-bottom:10px;justify-content: flex-end;">
                    <div style="display:flex;display:-webkit-flex;margin-right: 20px;">
                        <div>
                            <span style="font-size:18px;color:#6a6a6a;line-height: 34px;">选择司机：</span>
                        </div>
                        <div style="border:1px solid #e0e0e0;width:218px;height:34px;line-height:34px;cursor: pointer;"
                             @click="openDriverBox">
                            <span style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{driverText}}</span>
                        </div>
                    </div>
                    <div style="display:flex;display:-webkit-flex;width:175px">
                        <div class="whiteButton"
                             @click="driverCarWashMethod()"
                             style="margin-top: 0px;margin-right: 6px;;width:80px;background: #448aff;color: #fff;border:none">
                            <span>司机查询</span>
                        </div>
                    </div>

                </div>
            </transition>
        </div>


        <div v-else
             class="toparea" ref="basketbox">
            <div style="height: 58px;position: relative;z-index:23;display: flex;display:-webkit-flex;justify-content: center;;background:#fff">
                <div class="whiteButton"
                     @click="basketTopMethod()">
                    <span>总统计</span>
                </div>
                <div class="whiteButton" style="margin-left:10px"
                     @click="basketArrayReport()">
                    <span>区域框数</span>
                </div>
                <div class="whiteButton" style="margin-left:10px"
                     @click="openDetailBasketBox()">
                    <span>详细统计</span>
                </div>
                <div class="whiteButton" style="margin-left:10px"
                     @click="breakBarketReport()">
                    <span>坏框申报</span>
                </div>
            </div>

                <div v-if="isShowDetailBasketReport"
                     style="padding-bottom:10px;justify-content: flex-end;">
                     <div style="border-top:1px solid #eee">
                        <vue-datepicker-local v-model="startDate"
                                            style="margin-top: 12px;"
                                            placeholder="开始时间" />
                        <span> ~ </span>
                        <vue-datepicker-local v-model="endDate"
                                            style="margin-top: 12px;"
                                            placeholder="结束时间" />
                    </div>
                    <div style="display:flex;display:-webkit-flex;justify-content: center;margin-top:10px">
                        <!-- part 1 -->
                        <div style="display:flex;display:-webkit-flex;margin-right: 10px;margin-left: 10px">
                            <div style="background-color: #eee;border-top-left-radius: 10px;border-bottom-left-radius: 10px;width: 80px;">
                                <span style="font-size:16px;color:#6a6a6a;line-height: 34px;">选择司机</span>
                            </div>
                            <div style="border:1px solid #e0e0e0;width:120px;height:34px;line-height:34px;cursor: pointer;border-top-right-radius: 10px;border-bottom-right-radius: 10px"
                                @click="openDriverBox">
                                <span style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{driverText}}</span>
                            </div>
                        </div>

                        <!-- part 2 -->
                        <div style="display:flex;display:-webkit-flex;margin-right: 10px;">
                            <div style="background-color: #eee;border-top-left-radius: 10px;border-bottom-left-radius: 10px;width: 80px;">
                                <span style="font-size:16px;color:#6a6a6a;line-height: 34px;">任务线路</span>
                            </div>
                            <div style="border:1px solid #e0e0e0;width:120px;height:34px;line-height:34px;cursor: pointer;border-top-right-radius: 10px;border-bottom-right-radius: 10px"
                                @click="openLineBox">
                                <span v-if="lineText" style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{lineText}}</span>
                                <span v-else style="font-size:16px;color:#6a6a6a;text-decoration: underline;">请选择线路</span>
                            </div>
                        </div>

                        <!-- part 3 -->
                        <div style="display:flex;display:-webkit-flex;margin-right: 10px;">
                            <div style="background-color: #eee;border-top-left-radius: 10px;border-bottom-left-radius: 10px;width: 80px;">
                                <span style="font-size:16px;color:#6a6a6a;line-height: 34px;">客户名称</span>
                            </div>
                            <div style="border:1px solid #e0e0e0;width:120px;height:34px;line-height:34px;cursor: pointer;border-top-right-radius: 10px;border-bottom-right-radius: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                                @click="openClientBox">
                                <span v-if="clientText" style="font-size:16px;color:#6a6a6a;text-decoration: underline;">{{clientText}}</span>
                                <span v-else style="font-size:16px;color:#6a6a6a;text-decoration: underline;">请选择客户</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display:flex;display:-webkit-flex;margin-top: 10px;justify-content: center;">
                        <div class="whiteButton"
                             @click="detailBasketReport"
                             style="margin-top: 0px;width:100px;background: #448aff;color: #fff;border:none">
                            <span>开始查询</span>
                        </div>
                    </div>
                </div>

                <!-- 坏框申报 start -->
                <div v-else-if="isShowBreakBasketReport" class="arraybasket_searchbar">
                    <div style="margin-bottom:10px">
                        <div style="border-top:1px solid #eee">
                            <vue-datepicker-local v-model="startDate"
                                                style="margin-top: 12px;"
                                                placeholder="开始时间" />
                            <span> ~ </span>
                            <vue-datepicker-local v-model="endDate"
                                                style="margin-top: 12px;"
                                                placeholder="结束时间" />
                        </div>
                    </div>
                    <div class="arraybasket_searchbar_frame_button">
                        <div class="arraybasket_searchbar_button" @click="searchBreakBasketReportByDate">
                            <span>搜索</span>
                        </div>
                    </div>
                </div>
                <!-- 坏框申报 end -->

                <!-- 区域框数统计部分 start -->
                <div v-else-if="isShowAreaBasketReport" class="arraybasket_searchbar">
                    <div style="margin-bottom:10px">
                        <div style="border-top:1px solid #eee">
                            <vue-datepicker-local v-model="startDate"
                                                style="margin-top: 12px;"
                                                placeholder="开始时间" />
                            <span> ~ </span>
                            <vue-datepicker-local v-model="endDate"
                                                style="margin-top: 12px;"
                                                placeholder="结束时间" />
                        </div>
                    </div>
                    <div class="arraybasket_searchbar_frame_button">
                        <div class="arraybasket_searchbar_button" @click="searchAreaBasketReportByDate">
                            <span>搜索</span>
                        </div>
                    </div>
                </div>
                <!-- 区域框数统计部分 end -->
        </div>

        <!-- 车次框数一天报表 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea" v-if="tripsByDay">
                <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="tripsByDay=null">
                    <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>车次数据报表</span>
                </div>
                <div class="tripday_infos">
                    <div class="tripday_info">
                        <div class="tripday_info_left">
                            <span>任务日期</span>
                        </div>
                        <div class="tripday_info_right">
                            <span>{{tripsByDay.missionDate | datefilter}}</span>
                        </div>
                    </div>
                    <div class="tripday_info">
                        <div class="tripday_info_left">
                            <span>生成人员</span>
                        </div>
                        <div class="tripday_info_right">
                            <span>{{tripsByDay.creater}}</span>
                        </div>
                    </div>
                    <div class="tripday_info">
                        <div class="tripday_info_left">
                            <span>生成日期</span>
                        </div>
                        <div class="tripday_info_right">
                            <span>{{tripsByDay.createDate | datefilter}}</span>
                        </div>
                    </div>
                    <div class="tripday_info">
                        <div class="tripday_info_left">
                            <span>生成时间</span>
                        </div>
                        <div class="tripday_info_right">
                            <span>{{tripsByDay.createDate | timefilter}}</span>
                        </div>
                    </div>
                </div>
                <div class="centerarea-title" style="height:30px;line-height:30px;">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 6%;text-align: center;">
                        <span>车次</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>车牌号码</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>司机姓名</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>带走框数</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>起始里程</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>带回框数</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>结束里程</span>
                    </div>
                    <div style="flex-basis: 18%;text-align: center;">
                        <span>最后修改时间</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in tripsByDay.missionArray" :key="index" class="centerarea-body-item" style="overflow: hidden;" @click="openTripsDetailBoxMethod(item)">
                        <div style="flex-basis: 4%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 6%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.carNo">{{item.carNo}}</span>
                            <span v-else>未选择</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.driverNameCh">{{item.driverNameCh}}</span>
                            <span v-else>未选择</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.out">{{item.out}}</span>
                            <span v-else>未填写</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.outKm">{{item.outKm}}</span>
                            <span v-else>未填写</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.in">{{item.in}}</span>
                            <span v-else>未填写</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.inKm">{{item.inKm}}</span>
                            <span v-else>未填写</span>
                        </div>
                        <div style="flex-basis: 18%;text-align: center;">
                            <span v-if="item.lastEditDate">{{item.lastEditDate | timefilter}}</span>
                            <span v-else>未修改</span>
                        </div>
                    </div>
                </div>
                <div class="tripday_bottom">
                    <div class="tripday_info">
                        <div class="tripday_info_left">
                            <span>完成日期</span>
                        </div>
                        <div class="tripday_info_right">
                            <span v-if="tripsByDay.finishDate">{{tripsByDay.finishDate | timefilter}}</span>
                            <span v-else>未完成</span>
                        </div>
                    </div>
                    <div class="tripday_info">
                        <div class="tripday_info_left">
                            <span>完成时间</span>
                        </div>
                        <div class="tripday_info_right">
                            <span v-if="tripsByDay.finishDate">{{tripsByDay.finishDate | timefilter}}</span>
                            <span v-else>未完成</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 车次框数一天报表 end -->

        <!-- 一天详细数据窗口 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="report_bigpic_back" v-if="isShowTripsDetail"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="report_bigpic_front" v-if="isShowTripsDetail" @click.self.prevent="isShowTripsDetail = false">
                <div class="report_bigpic_box">
                    <div class="report_bigpic_box_title">
                        <span>车次检查</span>
                    </div>
                    <div class="report_trips_detial_box_body">
                        <div class="report_trips_detial_box_body_item">
                            <div class="report_trips_detial_box_body_item_left">
                                <span>车牌</span>
                            </div>
                            <div class="report_trips_detial_box_body_item_right" @click="getAllCarInfoMethod()">
                                <span v-if="tripsDate.carNo">{{tripsDate.carNo}}</span>
                                <span v-else>请选择</span>
                            </div>
                        </div>
                        <div class="report_trips_detial_box_body_item">
                            <div class="report_trips_detial_box_body_item_left">
                                <span>司机</span>
                            </div>
                            <div class="report_trips_detial_box_body_item_right" @click="getAllDriverInfoMethod()">
                                <span v-if="tripsDate.driverNameCh">{{tripsDate.driverNameCh}}</span>
                                <span v-else>请选择</span>
                            </div>
                        </div>
                        <div class="report_trips_detial_box_body_item">
                            <div class="report_trips_detial_box_body_item_left">
                                <span>Out</span>
                            </div>
                            <input type="number" class="report_trips_detial_box_body_item_right" v-model="tripsDate.out" placeholder="未填写">
                        </div>
                        <div class="report_trips_detial_box_body_item">
                            <div class="report_trips_detial_box_body_item_left">
                                <span>OutKm</span>
                            </div>
                            <input type="number" class="report_trips_detial_box_body_item_right" v-model="tripsDate.outKm" placeholder="未填写">
                        </div>
                        <div class="report_trips_detial_box_body_item">
                            <div class="report_trips_detial_box_body_item_left">
                                <span>In</span>
                            </div>
                            <input type="number" class="report_trips_detial_box_body_item_right" v-model="tripsDate.in" placeholder="未填写">
                        </div>
                        <div class="report_trips_detial_box_body_item">
                            <div class="report_trips_detial_box_body_item_left">
                                <span>InKm</span>
                            </div>
                            <input type="number" class="report_trips_detial_box_body_item_right" v-model="tripsDate.inKm" placeholder="未填写">
                        </div>
                    </div>
                    <div class="report_detial_box_foot">
                        <div class="white_button" @click="isShowTripsDetail = false">取消</div>
                        <div class="white_button" @click="editTripsInfo">确认</div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 一天详细数据窗口 end -->

        <!-- 车辆、司机选择窗口 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="report_bigpic_back" style="z-index:26" v-if="isShowCarDriverChoiseBox"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="report_bigpic_front" style="z-index:27" v-if="isShowCarDriverChoiseBox">
                <div class="report_bigpic_box">
                    <div class="report_bigpic_box_title">
                        <span v-if="isShowCarDriverChoiseBox">车辆选择</span>
                        <span v-else>司机选择</span>
                    </div>
                    <div v-if="carList.length != 0" class="report_car_driver_frame">
                        <div v-for="(item,index) in carList" :key="index" @click="tripsChoiseCarOrDriverMethod(item)">
                            <div class="report_car_driver_body">
                                <span>{{item.carid}}</span>
                                <div v-if="tripsChoiseData === item" class="icon_check_circle"></div>
                            </div>
                        </div>
                    </div>
                    <div v-if="dirverList.length != 0" class="report_car_driver_frame">
                        <div v-for="(item,index) in dirverList" :key="index" @click="tripsChoiseCarOrDriverMethod(item)">
                            <div class="report_car_driver_body">
                                <span>{{item.dirvername}}</span>
                                <div v-if="tripsChoiseData === item" class="icon_check_circle"></div>
                            </div>
                        </div>
                    </div>
                    <div class="report_detial_box_foot" style="margin:8px 8px;">
                        <div class="white_button" @click="isShowCarDriverChoiseBox = false">取消</div>
                        <div class="white_button" style="margin-left:8px" @click="confirmCarDriverChoiseMethod()">确认</div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 车辆、司机选择窗口 end -->

        <!-- 车次框数多天报表 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea" v-if="moreDayTripsArray.length != 0">
                <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="moreDayTripsArray = []">
                    <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>车次数据报表</span>
                </div>
                <div class="moredaytrips_body">
                    <div style="margin-right: 4px;">
                        <div class="moredaytrips_body_index_name">
                            <span>车次</span>
                        </div>
                        <div class="moredaytrips_body_index_item" v-for="(item,index) in tripsNum" :key="index">
                            <span>{{index + 1}}</span>
                        </div>
                    </div>
                    <div class="moredaytrips_body_frame">
                        <div class="moredaytrips_body_frame_item" v-for="(item,index) in moreDayTripsArray" :key="index">
                            <div class="moredaytrips_body_frame_date">
                                <span>{{item.missionDate | dayFilter}}日</span>
                            </div>
                            <div class="moredaytrips_body_frame_title">
                                <div class="moredaytrips_body_frame_box">
                                    <span>CarNo.</span>
                                </div>
                                <div class="moredaytrips_body_frame_box">
                                    <span>Out</span>
                                </div>
                                <div class="moredaytrips_body_frame_box">
                                    <span>In</span>
                                </div>
                                <div class="moredaytrips_body_frame_box">
                                    <span>Km/Trip</span>
                                </div>
                            </div>
                            <div class="moredaytrips_body_frame_content" v-for="(trips,index) in item.missionArray" :key="index">
                                <div class="moredaytrips_body_frame_box">
                                    <span v-if="trips.carNo">{{trips.carNo}}</span>
                                    <span v-else>Null</span>
                                </div>
                                <div class="moredaytrips_body_frame_box">
                                    <span v-if="trips.out">{{trips.out}}</span>
                                    <span v-else>Null</span>
                                </div>
                                <div class="moredaytrips_body_frame_box">
                                    <span v-if="trips.in">{{trips.in}}</span>
                                    <span v-else>Null</span>
                                </div>
                                <div class="moredaytrips_body_frame_box">
                                    <span v-if="trips.inKm && trips.outKm">{{trips.inKm - trips.outKm}}</span>
                                    <span v-else>Null</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="moredaytrips_rightbody">
                        <div class="moredaytrips_rightbody_title">
                            <div class="moredaytrips_rightbody_title_top">
                                <span>平均值</span>
                            </div>
                            <div class="moredaytrips_rightbody_title_bottom">
                                <div class="moredaytrips_rightbody_title_bottom_item">
                                    <span>Basket</span>
                                </div>
                                <div class="moredaytrips_rightbody_title_bottom_item">
                                    <span>Km</span>
                                </div>
                            </div>
                            <div v-for="(item,index) in averageValue" :key="index" class="averagevalue_box">
                                <div class="averagevalue_box_item">
                                    <span>{{item.num/item.count}}</span>
                                </div>
                                <div class="averagevalue_box_item">
                                    <span>{{item.km/item.indexKm}}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                
            </div>
        </transition>
        <!-- 车次框数多天报表 end -->

        <!-- 车辆维修 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea" v-if="repairCarArray.length != 0">
                <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="repairCarArray=[]">
                    <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>车辆维修记录</span>
                </div>
                <div class="centerarea-title" style="height:30px;line-height:30px;">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>车牌号码</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>提交日期</span>
                    </div>
                    <div style="flex-basis: 25%;text-align: center;">
                        <span>包含问题</span>
                    </div>
                    <div style="flex-basis: 16%;text-align: center;">
                        <span>描述照片</span>
                    </div>
                    <div style="flex-basis: 16%;text-align: center;">
                        <span>描述文字</span>
                    </div>
                    <div style="flex-basis: 8%;text-align: center;">
                        <span>维修员</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in repairCarArray" :key="index" class="centerarea-body-item" style="overflow: hidden;">
                        <div style="flex-basis: 4%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.car_id.carid}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.logStartTime | datefilter}}</span>
                        </div>
                        <div class="areabasketimg" style="flex-basis: 25%;text-align: center;">
                            <span v-if="item.wiper === 1">'雨刷'</span>
                            <span v-if="item.headlight === 1">'大灯'</span>
                            <span v-if="item.mirror === 1">'倒车镜'</span>
                            <span v-if="item.tyre === 1">'车胎'</span>
                            <span v-if="item.backup === 1">'备胎'</span>
                            <span v-if="item.brake === 1">'刹车'</span>
                            <span v-if="item.other === 1">'其他'</span>
                        </div>
                        <div v-if="item.image" class="areabasketimg" style="flex-basis: 16%;text-align: center;" @click.stop="openBigPic(item.image,'single')">
                            <img :src="item.image | imgurl">
                        </div>
                        <div v-else class="areabasketimg" style="flex-basis: 16%;text-align: center;">
                            <span>无</span>
                        </div>
                        <div v-if="item.note" class="areabasketimg" style="flex-basis: 16%;text-align: center;">
                            <span>{{item.note}}</span>
                        </div>
                        <div v-else class="areabasketimg" style="flex-basis: 16%;text-align: center;">
                            <span>无</span>
                        </div>
                        <div style="flex-basis: 8%;text-align: center;">
                            <span v-if="item.worker">{{item.worker}}</span>
                            <span v-else>未处理</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 车辆维修 end -->

        <!-- 坏框申报 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea" v-if="breakBasketArray.length != 0">
                <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="breakBasketArray=[]">
                    <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>坏框申报审批统计</span>
                </div>
                <div class="centerarea-title" style="height:30px;line-height:30px;">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>提交人</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>日期</span>
                    </div>
                    <div style="flex-basis: 16%;text-align: center;">
                        <span>描述图片</span>
                    </div>
                    <div style="flex-basis: 16%;text-align: center;">
                        <span>描述文字</span>
                    </div>
                    <div style="flex-basis: 8%;text-align: center;">
                        <span>审批人</span>
                    </div>
                    <div style="flex-basis: 16%;text-align: center;">
                        <span>审批时间</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in breakBasketArray" :key="index" class="centerarea-body-item" style="overflow: hidden;" @click="OpenDetailBreakBasket(item)">
                        <div style="flex-basis: 4%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.submitter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.date | datefilter}}</span>
                        </div>
                        <div class="areabasketimg" style="flex-basis: 16%;text-align: center;" @click.stop="openBigPic(item.image,'single')">
                            <img :src="item.image | imgurl">
                        </div>
                        <div class="areabasketimg" style="flex-basis: 16%;text-align: center;">
                            <span>{{item.note}}</span>
                        </div>
                        <div style="flex-basis: 8%;text-align: center;">
                            <span v-if="item.approver">{{item.approver}}</span>
                            <span v-else>未审批</span>
                        </div>
                        <div class="areabasketimg" style="flex-basis: 16%;text-align: center;">
                            <span v-if="item.finishDate">{{item.finishDate | datefilter}}</span>
                            <span v-else>未审批</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 坏框申报 end -->

        <!-- 区域框数统计部分 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea" v-if="areaBasketArray.length != 0">
                <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="areaBasketArray=[]">
                    <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>区域框数情况统计</span>
                </div>
                <div class="centerarea-title" style="height:30px;line-height:30px;">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>提交人</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>日期</span>
                    </div>
                    <div style="flex-basis: 8%;text-align: center;">
                        <span>卸货区</span>
                    </div>
                    <div style="flex-basis: 16%;text-align: center;">
                        <span>卸货区图片</span>
                    </div>
                    <div style="flex-basis: 8%;text-align: center;">
                        <span>冷房区</span>
                    </div>
                    <div style="flex-basis: 16%;text-align: center;">
                        <span>冷房区图片</span>
                    </div>
                    <div style="flex-basis: 8%;text-align: center;">
                        <span>配货区</span>
                    </div>
                    <div style="flex-basis: 16%;text-align: center;">
                        <span>配货区图片</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in areaBasketArray" :key="index" class="centerarea-body-item" style="overflow: hidden;" @click="OpenDetailAreaBasket(item)">
                        <div style="flex-basis: 4%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.submitter}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.date | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 8%;text-align: center;">
                            <span>{{item.area1number}}</span>
                        </div>
                        <div v-if="item.area1imageArray != 0" class="areabasketimg_array" style="flex-basis: 16%;text-align: center;">
                            <div v-for="(pics , picIndex) in item.area1imageArray" :key="picIndex" v-show="picIndex < 4" class="areabasketimg_array_div" @click.stop="openBigPic(pics,'array')">
                                <img :src="'uploads/countBox/'+ pics| imgurl">
                            </div>
                        </div>
                        <div v-else class="areabasketimg" style="flex-basis: 16%;text-align: center;" @click.stop="openBigPic(item.area1image,'single')">
                            <img :src="item.area1image| imgurl">
                        </div>
                        <div style="flex-basis: 8%;text-align: center;">
                            <span>{{item.area2number}}</span>
                        </div>
                        <div v-if="item.area2imageArray != 0" class="areabasketimg_array" style="flex-basis: 16%;text-align: center;">
                            <div v-for="(pics , picIndex) in item.area2imageArray" :key="picIndex" v-show="picIndex < 4" class="areabasketimg_array_div" @click.stop="openBigPic(pics,'array')">
                                <img :src="'uploads/countBox/'+ pics | imgurl">
                            </div>
                        </div>
                        <div v-else class="areabasketimg" style="flex-basis: 16%;text-align: center;" @click.stop="openBigPic(item.area2image,'single')">
                            <img :src="item.area2image| imgurl">
                        </div>
                        <div style="flex-basis: 8%;text-align: center;">
                            <span>{{item.area3number}}</span>
                        </div>
                        <div v-if="item.area3imageArray != 0" class="areabasketimg_array" style="flex-basis: 16%;text-align: center;">
                            <div v-for="(pics , picIndex) in item.area3imageArray" :key="picIndex" v-show="picIndex < 4" class="areabasketimg_array_div" @click.stop="openBigPic(pics,'array')">
                                <img :src="'uploads/countBox/'+ pics| imgurl">
                            </div>
                        </div>
                        <div v-else class="areabasketimg" style="flex-basis: 16%;text-align: center;" @click.stop="openBigPic(item.area3image,'single')">
                            <img :src="item.area3image| imgurl">
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 区域框数统计部分 end -->

        <!-- 区域框数统计部分-图片放大 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
                    <div v-if="isShowBigPic" class="report_bigpic_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
                    <div v-if="isShowBigPic" class="report_bigpic_front" @click="isShowBigPic = false">
                        <img :src="picSrc | imgurl">
                    </div>
        </transition>
        <!-- 区域框数统计部分-图片放大 end -->

        <!-- 坏框申报-详细信息 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
                    <div v-if="isShowDetailBreakBasket" class="report_bigpic_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
                    <div v-if="isShowDetailBreakBasket" class="report_bigpic_front" @click.self.prevent="isShowDetailBreakBasket = false">
                        <div class="report_bigpic_box">
                            <div class="report_bigpic_box_title">
                                <span>坏框申报审批详细信息</span>
                            </div>
                            <div class="report_detial_box_body">
                                <div class="report_detial_box_body_top">
                                    <div class="report_detial_box_body_top_title">
                                        <div class="report_detial_box_body_top_title_frame">
                                            <span>详细信息</span>
                                        </div>
                                    </div>
                                    <div class="report_detial_box_body_top_item">
                                        <div class="report_detial_box_body_top_item_left">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>申请人员</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.submitter}}</span>
                                            </div>
                                        </div>
                                        <div class="report_detial_box_body_top_item_right">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>申请日期</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.date | datefilter}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="report_detial_box_body_top_item">
                                        <div class="report_detial_box_body_top_item_left">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>申请时间</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.date | timefilter}}</span>
                                            </div>
                                        </div>
                                        <div class="report_detial_box_body_top_item_right">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>审批人员</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span v-if="tempInfo.approver">{{tempInfo.approver}}</span>
                                                <span v-else>未审批</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="report_detial_box_body_top_item">
                                        <div class="report_detial_box_body_top_item_left">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>审批日期</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span v-if="tempInfo.finishDate">{{tempInfo.finishDate | datefilter}}</span>
                                                <span v-else>未审批</span>
                                            </div>
                                        </div>
                                        
                                        <div class="report_detial_box_body_top_item_right">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>审批时间</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span v-if="tempInfo.finishDate">{{tempInfo.finishDate | timefilter}}</span>
                                                <span v-else>未审批</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="report_detial_box_body_top_item">
                                    </div>
                                </div>
                                <div class="report_detial_box_body_center">
                                    <div class="report_detial_box_body_top_title">
                                        <div class="report_detial_box_body_top_title_frame">
                                            <span>描述图片</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="report_detial_box_body_center_pic" style="width:340px;overflow:hidden;justify-content: center;">
                                            <div class="report_detial_box_body_center_pic_frame">
                                                <img :src="tempInfo.image | imgurl">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="report_detial_box_body_center">
                                    <div class="report_detial_box_body_top_title">
                                        <div class="report_detial_box_body_top_title_frame">
                                            <span>描述文字</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div style="padding:18px 12px 12px;height:120px;overflow:auto;width: 340px;text-align:left">
                                            <span>{{tempInfo.note}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="report_detial_box_foot">
                                <div class="arraybasket_searchbar_button" @click="isShowDetailBreakBasket = false">
                                    <span>关闭</span>
                                </div>
                            </div>
                        </div>
                    </div>
        </transition>
        <!-- 坏框申报-详细信息 end -->

        <!-- 区域框数统计部分-详细信息 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
                    <div v-if="isShowDetailAreaBasket" class="report_bigpic_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
                    <div v-if="isShowDetailAreaBasket" class="report_bigpic_front" @click.self.prevent="isShowDetailAreaBasket = false">
                        <div class="report_bigpic_box">
                            <div class="report_bigpic_box_title">
                                <span>区域框数统计详细信息</span>
                            </div>
                            <div class="report_detial_box_body">
                                <div class="report_detial_box_body_top">
                                    <div class="report_detial_box_body_top_title">
                                        <div class="report_detial_box_body_top_title_frame">
                                            <span>详细信息</span>
                                        </div>
                                    </div>
                                    <div class="report_detial_box_body_top_item">
                                        <div class="report_detial_box_body_top_item_left">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>创建人员</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.submitter}}</span>
                                            </div>
                                        </div>
                                        <div class="report_detial_box_body_top_item_right">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>创建日期</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.date | datefilter}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="report_detial_box_body_top_item">
                                        <div class="report_detial_box_body_top_item_left">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>创建时间</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.date | timefilter}}</span>
                                            </div>
                                        </div>
                                        <div class="report_detial_box_body_top_item_right">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>结束日期</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.finishDate | datefilter}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="report_detial_box_body_top_item">
                                        <div class="report_detial_box_body_top_item_left">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>结束时间</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.finishDate | timefilter}}</span>
                                            </div>
                                        </div>
                                        <div class="report_detial_box_body_top_item_right">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>装卸区域</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.area1number}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="report_detial_box_body_top_item">
                                        <div class="report_detial_box_body_top_item_left">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>冷库区域</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.area2number}}</span>
                                            </div>
                                        </div>
                                        <div class="report_detial_box_body_top_item_right">
                                            <div class="report_detial_box_body_top_item_left_name">
                                                <span>配货区域</span>
                                            </div>
                                            <div class="report_detial_box_body_top_item_left_content">
                                                <span>{{tempInfo.area3number}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="report_detial_box_body_center">
                                    <div class="report_detial_box_body_top_title">
                                        <div class="report_detial_box_body_top_title_frame">
                                            <span>装卸区图片</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div v-if="tempInfo.area1imageArray != 0" class="report_detial_box_body_center_pic">
                                            <div v-for="(item,index) in tempInfo.area1imageArray" :key="index" class="report_detial_box_body_center_pic_frame">
                                                <img :src="'uploads/countBox/'+item | imgurl">
                                            </div>
                                        </div>
                                        <div v-else class="report_detial_box_body_center_pic">
                                            <div class="report_detial_box_body_center_pic_frame">
                                                <img :src="tempInfo.area1image | imgurl">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="report_detial_box_body_center">
                                    <div class="report_detial_box_body_top_title">
                                        <div class="report_detial_box_body_top_title_frame">
                                            <span>冷库区图片</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div v-if="tempInfo.area1imageArray != 0" class="report_detial_box_body_center_pic">
                                            <div v-for="(item,index) in tempInfo.area2imageArray" :key="index" class="report_detial_box_body_center_pic_frame">
                                                <img :src="'uploads/countBox/'+item | imgurl">
                                            </div>
                                        </div>
                                        <div v-else class="report_detial_box_body_center_pic">
                                            <div class="report_detial_box_body_center_pic_frame">
                                                <img :src="tempInfo.area2image | imgurl">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="report_detial_box_body_center">
                                    <div class="report_detial_box_body_top_title">
                                        <div class="report_detial_box_body_top_title_frame">
                                            <span>配货区图片</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div v-if="tempInfo.area1imageArray.length != 0" class="report_detial_box_body_center_pic">
                                            <div v-for="(item,index) in tempInfo.area3imageArray" :key="index" class="report_detial_box_body_center_pic_frame">
                                                <img :src="'uploads/countBox/'+item | imgurl">
                                            </div>
                                        </div>
                                        <div v-else class="report_detial_box_body_center_pic">
                                            <div class="report_detial_box_body_center_pic_frame">
                                                <img :src="tempInfo.area3image | imgurl">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="report_detial_box_foot">
                                <div class="arraybasket_searchbar_button" @click="isShowDetailAreaBasket = false">
                                    <span>关闭</span>
                                </div>
                            </div>
                        </div>
                    </div>
        </transition>
        <!-- 区域框数统计部分-详细信息 end -->

        <!-- check car report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="tableInfo.length != 0">
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="tableInfo=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>出车收车情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>出车日期</span>
                    </div>
                    <div style="flex-basis: 14%;text-align: center;">
                        <span>出车时间</span>
                    </div>
                    <div style="flex-basis: 14%;text-align: center;">
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
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.driver}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.date | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 14%;text-align: center;">
                            <span>{{item.date | timefilter}}</span>
                        </div>
                        <div style="flex-basis: 14%;text-align: center;">
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
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="missionInfo=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>司机任务情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 4%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>任务日期</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>使用车辆</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
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
                        <div style="flex-basis: 20%;text-align: center;">
                            <span>{{item.missiondirver}}</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
                            <span>{{item.missiondate | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
                            <span>{{item.missioncar}}</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
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
                         style="width:260px">
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
                    <div class="driver-front-box-bottom">
                        <div class="white_button" @click="isOpenDriverBox = false">
                            <span>关闭</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- driver choise box end -->

        <!-- line choise box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isOpenLineBox"
                 class="driverbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isOpenLineBox"
                 class="driverbox-front"
                 @click.self.prevent="isOpenLineBox = false">
                <div class="driver-front-box">
                    <div class="driver-front-box-title">
                        <span>线路选择</span>
                    </div>
                    <div class="driver-front-box-body"
                         style="width:300px;margin:0 12px">
                        <div class="driver-front-box-body-title">
                            <div class="driver-front-box-body-left">
                                <span>No.</span>
                            </div>
                            <div class="driver-front-box-body-right">
                                <span>线路名称</span>
                            </div>
                        </div>
                        <div style="height:40vh;overflow-y: auto;">
                            <div class="driver-front-box-body-center"
                                 v-for="(item,index) in driverArray"
                                 :key="index"
                                 @click="choiseLineMethod(item)">
                                <div class="driver-front-box-body-left">
                                    <span>{{index + 1}}</span>
                                </div>
                                <div class="driver-front-box-body-right">
                                    <span>{{item.timesname}}</span>
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
        <!-- line choise box end -->

        <!-- client choise box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isOpenClientBox"
                 class="driverbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isOpenClientBox"
                 class="driverbox-front"
                 @click.self.prevent="isOpenClientBox = false">
                <div class="driver-front-box">
                    <div class="driver-front-box-title">
                        <span>客户选择</span>
                    </div>
                    <div class="driver-front-box-body"
                         style="width:300px;margin:0 12px;height:40vh;">
                         <div>
                             <input type="text" placeholder="搜索客户" class="searchclientinput" v-model="keyWord" @keyup.enter="searchClientMethod">
                         </div>
                        <div class="driver-front-box-body-title" style="justify-content: center;">
                            <span>搜索结果</span>
                        </div>
                        <div style="overflow-y: auto;height: 260px;">
                            <div class="driver-front-box-body-center"
                                 v-for="(item,index) in clientArray"
                                 :key="index"
                                 @click="choiseClientMethod(item)"
                                 style="justify-content: center;">
                                    <span>{{item.clientbname}}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="isOpenClientBox = false"
                                   style="font-size:18px;width:80px;height:30px;margin-top:13px">
                            <span>关闭</span>
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- client choise box end -->

        <!-- dayShift report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="dayShiftInfo.length != 0">
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="dayShiftInfo=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>白班任务情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 5%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>客户</span>
                    </div>
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>类型</span>
                    </div>
                    <div style="flex-basis: 15%;text-align: center;">
                        <span>任务日期</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>出车时间</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>收车时间</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in dayShiftInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 5%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 10%;text-align: center;">
                            <span>{{item.driverName}}</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;overflow:hidden">
                            <span>{{item.clientName}}</span>
                        </div>
                        <div style="flex-basis: 10%;text-align: center;">
                            <span v-if="item.isIncreaseOrder">加单</span>
                            <span v-else>补单</span>
                        </div>
                        <div style="flex-basis: 15%;text-align: center;">
                            <span>{{item.orderDate | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
                            <span v-if="item.goTime">{{item.goTime | timefilter}}</span>
                            <span v-else>未送达</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
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
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="billInfo=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>账单情况统计</span>
                </div>
                <div class="centerarea-title">
                    <div style="flex-basis: 10%;text-align: center;">
                        <span>No.</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>司机</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>获取数量</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>发出数量</span>
                    </div>
                    <div style="flex-basis: 12%;text-align: center;">
                        <span>剩余数量</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>统计日期</span>
                    </div>
                    <div style="flex-basis: 20%;text-align: center;">
                        <span>统计时间</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in billInfo"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="flex-basis: 10%;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.driverName}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span>{{item.startNum}}</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.endNum">{{item.startNum - item.endNum}}</span>
                            <span v-else>未完成</span>
                        </div>
                        <div style="flex-basis: 12%;text-align: center;">
                            <span v-if="item.endNum">{{item.endNum}}</span>
                            <span v-else>未完成</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
                            <span>{{item.date | datefilter}}</span>
                        </div>
                        <div style="flex-basis: 20%;text-align: center;">
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
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="basketInfo=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>客户欠框统计</span>
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
                        <div style="min-width: 140px;text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
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
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="checkerArray=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
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
                            <span v-if="item.finishDate" style="padding-left:16px;padding-right:12px">{{item.finishDate | datefilter}}</span>
                            <span v-else style="padding-left:16px;padding-right:12px">未完成</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span v-if="item.finishDate" style="padding-left:16px;padding-right:12px">{{item.finishDate | timefilter}}</span>
                            <span v-else style="padding-left:16px;padding-right:12px">未完成</span>
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

        <!-- car wash report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="carWashArray.length != 0">
                <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="carWashArray=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>洗车检查报告</span>
                </div>
                <div class="centerarea-title">
                    <div style="min-width: 60px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span class="centerarea-title-item">No.</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>司机姓名</span>
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
                         style="min-width: 120px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>车牌号码</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in carWashArray"
                         @click="detailCheckInfo(item)"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="min-width: 60px;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.creator}}</span>
                        </div>
                        <div style="min-width: 120px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.createDate | datefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.createDate | timefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span v-if="item.finishDate" style="padding-left:16px;padding-right:12px">{{item.finishDate | datefilter}}</span>
                            <span v-else style="padding-left:16px;padding-right:12px">未执行</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span v-if="item.finishDate" style="padding-left:16px;padding-right:12px">{{item.finishDate | timefilter}}</span>
                            <span v-else style="padding-left:16px;padding-right:12px">未执行</span>
                        </div>
                        <div style="min-width: 120px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.carPlate}}</span>
                        </div>
                    </div>
                </div>

                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{carWashArray.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- car wash report end -->

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
                                     style="width:220px">
                                    <span>检查结果</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="width:100px">
                                    <span>是否检查</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="width:120px">
                                    <span>检查日期</span>
                                </div>
                                <div class="checkditailbox-body-center-title-content"
                                     style="width:300px">
                                    <span>备注</span>
                                </div>
                            </div>
                            <div style="overflow:auto;height:500px">
                                <div v-for="(item,index) in tempInfo.missionList "
                                    class="checkditailbox-body-center-item"
                                    :key="index">
                                    <div class="checkditailbox-body-center-item-carid"
                                        style="min-width:120px;margin-left:4px">
                                        <span>{{item.carPlate}}</span>
                                    </div>
                                    <div class="checkditailbox-body-center-item-check_res">
                                        <div class="checkditailbox-body-center-item-check_res_frame">
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="刹车灯">
                                                <div v-if="item.brakeLight" class="brakeLights_icon"></div>
                                                <div v-else class="brakeLights_icon_red"></div>
                                            </div>
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="前大灯"> 
                                                <div v-if="item.headlight" class="light_icon"></div>
                                                <div v-else class="light_icon_red"></div>
                                            </div>
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="油卡">
                                                <div v-if="item.petrolCard" class="card_icon"></div>
                                                <div v-else class="card_icon_red"></div>
                                            </div>
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="轮胎">
                                                <div v-if="item.tyre" class="tyre_icon"></div>
                                                <div v-else class="tyre_icon_red"></div>
                                            </div>
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="手推车">
                                                <div v-if="item.cart" class="cart_icon"></div>
                                                <div v-else class="cart_icon_red"></div>
                                            </div>
                                        </div>
                                        <div class="checkditailbox-body-center-item-check_res_frame">
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="记录仪">
                                                <div v-if="item.drivingRecorder" class="drivingRecorder"></div>
                                                <div v-else class="drivingRecorder_red"></div>
                                            </div>
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="车窗">
                                                <div v-if="item.carWindow" class="carWindow"></div>
                                                <div v-else class="carWindow_red"></div>
                                            </div>
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="尾灯">
                                                <div v-if="item.taillight" class="headlight"></div>
                                                <div v-else class="headlight_red"></div>
                                            </div>
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="后视镜">
                                                <div v-if="item.sideMirror" class="side_mirror"></div>
                                                <div v-else class="side_mirror-red"></div>
                                            </div>
                                            <div class="checkditailbox-body-center-item-check_res_frame_item"
                                                title="内存卡">
                                                <div v-if="item.sideMirror" class="SD_card"></div>
                                                <div v-else class="SD_card-red"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="checkditailbox-body-center-state"
                                        style="min-width:93px">
                                        <span v-if="item.isFinish && item.checkDate === null" style="color:#ff9800">已跳过</span> 
                                        <span v-else-if="item.isFinish" style="color:#2f9514">已检查</span>
                                        <span v-else>未检查</span>
                                    </div>
                                    <div class="checkditailbox-body-center-item-content"
                                        style="width:120px;line-height: 30px;text-align: left;padding-left:12px">
                                        <div v-if="item.isFinish && item.checkDate === null" style="line-height: 60px;">
                                            <span>未记录</span> 
                                        </div> 
                                        <div v-else-if="item.checkDate" >
                                            <div style="height:30px">
                                                <span>{{item.checkDate | datefilter}}</span>
                                            </div>
                                            <div style="height:30px">
                                                <span>{{item.checkDate | timefilter}}</span>
                                            </div>
                                            
                                        </div> 
                                        <div v-else style="line-height: 60px;">
                                            <span>未提交</span>
                                        </div>
                                        
                                    </div>
                                    <div class="checkditailbox-body-center-item-content"
                                        style="width:300px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
                                        <span v-if="item.note === null">无备注</span>
                                        <span v-else>{{item.note}}</span>
                                    </div>
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

        <!-- driver check car report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="driverCheckCarInfo.length != 0">
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="driverCheckCarInfo=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>司机检查报告</span>
                </div>
                <div class="centerarea-title">
                    <div style="min-width: 60px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span class="centerarea-title-item">No.</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>司机</span>
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
                        <span>结束时间</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>车牌号码</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="flex-basis: 300px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>错误数</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in driverCheckCarInfo"
                         @click="openDriverCheckCarInfoDetailMethod(item)"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="min-width: 60px;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.driver}}</span>
                        </div>
                        <div style="min-width: 120px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.date | datefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.date | timefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.finishDate | timefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.car_id.carid}}</span>
                        </div>
                        <div style="flex-basis: 100%;text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                            <span style="padding-left:16px;padding-right:12px">{{tempDriverCheckCarInfo[index]}}</span>
                        </div>
                    </div>
                </div>
                <div style="display:flex;justify-content: space-around;display:-webkit-flex;padding: 20px 0;">
                    <div class="chartBox">
                        <canvas id="drivercheckertleft"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                    <div class="chartBox">
                        <canvas id="drivercheckertright"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                </div>

                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{driverCheckCarInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- driver check car report end -->

        <!-- all driver check car report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="allDriverCheckCarInfo.length != 0">
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="allDriverCheckCarInfo=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>司机检查报告</span>
                </div>
                <div class="centerarea-title">
                    <div style="min-width: 60px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span class="centerarea-title-item">No.</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>司机</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 120px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>创建日期</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>车牌号码</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>损坏位置</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>其他信息</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in allDriverCheckCarInfo"
                         @click="openDriverCheckCarInfoDetailMethod(item)"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="min-width: 60px;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.driver}}</span>
                        </div>
                        <div style="min-width: 120px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.date | datefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.car_id.carid}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;padding-left: 4px;">
                            <span style="display: -webkit-flex;display: flex;">
                                <p v-if="!item.brake" style="margin-left: 4px;"> 刹车 </p>
                                <p v-if="!item.clean" style="margin-left: 4px;"> 清洁 </p>
                                <p v-if="!item.headlight" style="margin-left: 4px;"> 大灯 </p>
                                <p v-if="!item.mirror" style="margin-left: 4px;"> 车镜 </p>
                                <p v-if="!item.petrolCard" style="margin-left: 4px;"> 油卡 </p>
                                <p v-if="!item.tyre" style="margin-left: 4px;"> 轮胎 </p>
                                <p v-if="!item.wiper" style="margin-left: 4px;"> 雨刷 </p>
                                <p v-if="!item.backup" style="margin-left: 4px;"> 备胎 </p>
                            </span>
                        </div>
                        <div style="min-width: 140px;text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                            <span v-if="item.text" style="padding-left:16px;padding-right:12px">{{item.text}}</span>
                            <span v-else style="padding-left:16px;padding-right:12px">无</span>
                        </div>
                    </div>
                </div>
                <div style="display:flex;justify-content: space-around;display:-webkit-flex;padding: 20px 0;">
                    <div class="chartBox">
                        <canvas id="alldrivercheckertleft"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                    <div class="chartBox">
                        <canvas id="alldrivercheckertright"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                </div>

                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{allDriverCheckCarInfo.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- all driver check car report end -->

        <!-- mission report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="missionReportArray.length != 0">
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="missionReportArray=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>任务统计报告</span>
                </div>
                <div class="centerarea-title">
                    <div style="min-width: 60px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span class="centerarea-title-item">No.</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>线路名称</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>司机</span>
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
                        <span>客户数量</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>任务状态</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in missionReportArray"
                         @click="openMissionDetailMethod(item)"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="min-width: 60px;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="width: 140px;text-align: left;;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missionline}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missiondirver}}</span>
                        </div>
                        <div style="min-width: 120px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missiondate | datefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missiondate | timefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: center;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missionclient.length}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span v-if="item.complete"
                                  style="padding-left:16px;padding-right:12px">已完成</span>
                            <span v-else
                                  style="padding-left:16px;padding-right:12px">未完成</span>
                        </div>
                    </div>
                </div>
                <div style="display:flex;justify-content: space-around;display:-webkit-flex;padding: 20px 0;">
                    <div class="chartBox">
                        <canvas id="missionreportleft"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                    <div class="chartBox">
                        <canvas id="missionreportright"
                                width="400px"
                                height="400px"></canvas>
                    </div>
                </div>

                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{missionReportArray.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- mission report end -->

        <!-- mission-driver report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="missionDriverReportArray.length != 0">
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="missionDriverReportArray=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>任务统计报告</span>
                </div>
                <div class="centerarea-title">
                    <div style="min-width: 60px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span class="centerarea-title-item">No.</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>线路名称</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>司机</span>
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
                        <span>客户数量</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 140px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>任务状态</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in missionDriverReportArray"
                         @click="openMissionDetailMethod(item)"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="min-width: 60px;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="width: 140px;text-align: left;;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missionline}}</span>
                        </div>
                        <div style="min-width:140px;text-align:left">
                            <span style="padding-left:16px;padding-right:12px">{{item.missiondirver}}</span>
                        </div>
                        <div style="min-width: 120px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missiondate | datefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missiondate | timefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: center;">
                            <span style="padding-left:16px;padding-right:12px">{{item.missionclient.length}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span v-if="item.complete"
                                  style="padding-left:16px;padding-right:12px">已完成</span>
                            <span v-else
                                  style="padding-left:16px;padding-right:12px">未完成</span>
                        </div>
                    </div>
                </div>

                <div class="centerarea-bottom">
                    <span>共</span>
                    <span>{{countMissionClient}}</span>
                    <span>个客户;</span>

                    <span>平均每次任务</span>
                    <span>{{averageCountMissionClient}}</span>
                    <span>个客户;</span>

                    <span>共</span>
                    <span>{{missionDriverReportArray.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- mission-driver report end -->

        <!-- basket-client report start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="centerarea"
                 v-if="basketClientReportArray.length != 0">
                 <div style="position:absolute;top: 10px;right: 10px;cursor: pointer;" @click="basketClientReportArray=[]">
                     <md-icon class="md-size-2x" style="color:red">highlight_off</md-icon>
                </div>
                <div class="centerarea-head">
                    <span>框数统计报告</span>
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
                        <span>司机姓名</span>
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
                        <span>所属线路</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 100px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>出框数</span>
                    </div>
                    <div class="centerarea-title-item"
                         style="min-width: 100px;text-align: left;border-left: 4px solid #e0e0e0;height: 30px;line-height: 30px;">
                        <span>收框数</span>
                    </div>
                </div>
                <div class="centerarea-body">
                    <div v-for="(item,index) in basketClientReportArray"
                         :key="index"
                         class="centerarea-body-item">
                        <div style="min-width: 60px;text-align: center;">
                            <span>{{index + 1}}</span>
                        </div>
                        <div style="width: 140px;text-align: left;;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">
                            <span style="padding-left:16px;padding-right:12px">{{item.clientName}}</span>
                        </div>
                        <div style="min-width:140px;text-align:left">
                            <span style="padding-left:16px;padding-right:12px">{{item.driverName}}</span>
                        </div>
                        <div style="min-width: 120px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.date | datefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.date | timefilter}}</span>
                        </div>
                        <div style="min-width: 140px;text-align: left;">
                            <span style="padding-left:16px;padding-right:12px">{{item.lineName}}</span>
                        </div>
                        <div style="min-width: 100px;text-align: center;">
                            <span style="padding-left:16px;padding-right:12px">{{item.outBasket}}</span>
                        </div>
                        <div style="min-width: 100px;text-align: center;">
                            <span style="padding-left:16px;padding-right:12px">{{item.inBasket}}</span>
                        </div>
                    </div>
                </div>

                <div class="centerarea-bottom">
                    <span>送出框数</span>
                    <span>{{tempOutBasketNum}}</span>
                    <span>个|</span>
                    <span>收回框数</span>
                    <span>{{tempInBasketNum}}</span>
                    <span>个|</span>
                    <span>共</span>
                    <span>{{basketClientReportArray.length}}</span>
                    <span>条数据</span>
                </div>
            </div>
        </transition>
        <!-- basket-client report end -->

        <!-- driver check car detail report box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showDriverCheckCarDetailInfo"
                 class="checkditailbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showDriverCheckCarDetailInfo"
                 class="checkditailbox-front"
                 @click.self.prevent="showDriverCheckCarDetailInfo = false">
                <div class="checkditailbox-front-box">
                    <div class="checkditailbox-front-box-top">
                        <span>详细信息</span>
                    </div>
                    <div class="checkditailbox-front-box-center">
                        <div class="checkditailbox-body-title">
                            <span>{{tempInfo.car_id.carid}}</span>
                        </div>
                        <div>
                            {{tempInfo.date | datefilter}}
                            {{tempInfo.date | timefilter}}
                        </div>
                        <div class="checkditailbox-body-center">
                            <div style="display:flex;display:-webkit-flex">
                                <div style="display:flex;display:-webkit-flex;margin-right:20px">
                                    <div class="checkdetail-left">
                                        <span>备用车胎</span>
                                    </div>
                                    <div>
                                        <md-icon v-if="tempInfo.backup"
                                                 style="color:green">check_circle</md-icon>
                                        <md-icon v-else
                                                 style="color:red">cancel</md-icon>
                                    </div>
                                </div>
                                <div style="display:flex;display:-webkit-flex">
                                    <div class="checkdetail-left">
                                        <span>刹车系统</span>
                                    </div>
                                    <div>
                                        <md-icon v-if="tempInfo.brake"
                                                 style="color:green">check_circle</md-icon>
                                        <md-icon v-else
                                                 style="color:red">cancel</md-icon>
                                    </div>
                                </div>
                            </div>

                            <div style="display:flex;display:-webkit-flex;margin-top:10px">
                                <div style="display:flex;display:-webkit-flex;margin-right:20px">
                                    <div class="checkdetail-left">
                                        <span>车内清洁</span>
                                    </div>
                                    <div>
                                        <md-icon v-if="tempInfo.clean"
                                                 style="color:green">check_circle</md-icon>
                                        <md-icon v-else
                                                 style="color:red">cancel</md-icon>
                                    </div>
                                </div>
                                <div style="display:flex;display:-webkit-flex">
                                    <div class="checkdetail-left">
                                        <span>车灯系统</span>
                                    </div>
                                    <div>
                                        <md-icon v-if="tempInfo.headlight"
                                                 style="color:green">check_circle</md-icon>
                                        <md-icon v-else
                                                 style="color:red">cancel</md-icon>
                                    </div>
                                </div>
                            </div>

                            <div style="display:flex;display:-webkit-flex;margin-top:10px">
                                <div style="display:flex;display:-webkit-flex;margin-right:20px">
                                    <div class="checkdetail-left">
                                        <span>倒车镜</span>
                                    </div>
                                    <div>
                                        <md-icon v-if="tempInfo.mirror"
                                                 style="color:green">check_circle</md-icon>
                                        <md-icon v-else
                                                 style="color:red">cancel</md-icon>
                                    </div>
                                </div>
                                <div style="display:flex;display:-webkit-flex">
                                    <div class="checkdetail-left">
                                        <span>车用油卡</span>
                                    </div>
                                    <div>
                                        <md-icon v-if="tempInfo.petrolCard"
                                                 style="color:green">check_circle</md-icon>
                                        <md-icon v-else
                                                 style="color:red">cancel</md-icon>
                                    </div>
                                </div>
                            </div>

                            <div style="display:flex;display:-webkit-flex;margin-top:10px">
                                <div style="display:flex;display:-webkit-flex;margin-right:20px">
                                    <div class="checkdetail-left">
                                        <span>车胎检查</span>
                                    </div>
                                    <div>
                                        <md-icon v-if="tempInfo.tyre"
                                                 style="color:green">check_circle</md-icon>
                                        <md-icon v-else
                                                 style="color:red">cancel</md-icon>
                                    </div>
                                </div>
                                <div style="display:flex;display:-webkit-flex">
                                    <div class="checkdetail-left">
                                        <span>雨刷检查</span>
                                    </div>
                                    <div>
                                        <md-icon v-if="tempInfo.wiper"
                                                 style="color:green">check_circle</md-icon>
                                        <md-icon v-else
                                                 style="color:red">cancel</md-icon>
                                    </div>
                                </div>
                            </div>

                            <div style="display:flex;display:-webkit-flex;margin-top:10px">
                                <div class="checkdetail-left">
                                    <span>其他问题</span>
                                </div>
                                <div>
                                    <md-icon v-if="!tempInfo.text"
                                             style="color:green">check_circle</md-icon>
                                    <md-icon v-else
                                             style="color:red">cancel</md-icon>
                                </div>
                            </div>

                            <div v-if="tempInfo.text"
                                 style="display:flex;display:-webkit-flex;margin-top:10px;margin-bottom:10px">
                                <div style="border:1px solid #e0e0e0;padding:12px;width:100%">
                                    {{tempInfo.text}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showDriverCheckCarDetailInfo = false"
                                   style="font-size:18px;width:80px;height:30px">取消</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- driver check car detail report box end -->

        <!-- mission detail report box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showMissionDetailInfo"
                 class="checkditailbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showMissionDetailInfo"
                 class="checkditailbox-front"
                 @click.self.prevent="showMissionDetailInfo = false">
                <div class="checkditailbox-front-box">
                    <div class="checkditailbox-front-box-top">
                        <span>任务详情</span>
                    </div>
                    <div>
                        <div class="checkditailbox-body-title">
                            <div style="height: 30px;line-height: 30px;margin-top: 10px;">
                                <span>{{shippingMission.missionline}}</span>
                            </div>
                        </div>
                        <div>{{shippingMission.missiondate | datefilter}}{{shippingMission.missiondate | timefilter}}</div>
                        <div style="margin: 0 12px;display:flex;display:-webkit-flex">
                            <div class="missiondetailleft" style="margin-top: 12px;">
                                <div class="missiondetailleftbox">
                                    <div class="missiondetailleftbox-left">线路名(中)</div>
                                    <div style="margin: 0 auto;">
                                        <span>{{shippingMission.missionline}}</span>
                                    </div>
                                </div>

                                <div class="missiondetailleftbox">
                                    <div class="missiondetailleftbox-left">线路名(英)</div>
                                    <div style="margin: 0 auto;">
                                        <span>{{shippingMission.missionLineEN}}</span>
                                    </div>
                                </div>

                                <div style="display:flex;display:-webkit-flex">
                                    <div class="missiondetailleftbox">
                                        <div class="missiondetailleftbox-left">应出时间</div>
                                        <div style="width:60px">
                                            <span>{{shippingMission.goTime}}</span>
                                        </div>
                                    </div>

                                    <div class="missiondetailleftbox" style="margin-left:10px">
                                        <div class="missiondetailleftbox-left">实出时间</div>
                                        <div style="width:60px">
                                            <span>{{missionCreateDate}}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="display:flex;display:-webkit-flex">
                                    <div class="missiondetailleftbox">
                                        <div class="missiondetailleftbox-left">应收时间</div>
                                        <div style="width:60px">
                                            <span>{{shippingMission.finishDate}}</span>
                                        </div>
                                    </div>

                                    <div class="missiondetailleftbox" style="margin-left:10px">
                                        <div class="missiondetailleftbox-left">实收时间</div>
                                        <div style="width:60px">
                                            <span>{{missionFinishDate}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="missiondetailright" style="margin-left:10px;margin-top: 20px;">
                                <div style="border:3px solid #eee;position: relative;">
                                    <div style="background: #eee;border-top-left-radius: 10px;border-top-right-radius: 10px;position: absolute;width: 100px;top: -26px;height: 24px;line-height: 24px;right: 12px;">
                                        <span>任务客户</span>
                                    </div>
                                    <div style="padding:12px;height: 200px;overflow: auto;">
                                        <div class="missiondetailright-card" v-for="(item,index) in shippingMission.missionclient" :key="index">
                                            <div style="margin-left:12px;width:100%;height:100px">
                                                <div style="border-bottom:1px solid #eee;text-align: left;padding-top:10px;font-size:16px">
                                                    {{item.clientbname}}
                                                </div>
                                                <div v-if="item.finishphoto" style="text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width:180px">
                                                    {{item.clientbnameEN}}
                                                </div>
                                                <div v-else style="text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis">
                                                    {{item.clientbnameEN}}
                                                </div>
                                                <div style="text-align: left;padding-top:10px;">
                                                    完成时间:{{item.finishdate | timefilter}}
                                                </div>
                                            </div>
                                            <div v-if="item.finishphoto" style="min-width:100px" @click="openViewPicMethod(item.finishphoto)">
                                                <img :src="item.finishphoto | imgurl"
                                                    style="width: 100px;height:100px;object-fit: cover;"
                                                     alt="carphoto">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showMissionDetailInfo = false"
                                   style="font-size:18px;width:80px;height:30px">取消</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission detail report box end -->

        <!-- view pic start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showMissionImg"
                 class="checkditailbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showMissionImg"
                 class="checkditailbox-front"
                 @click.self.prevent="showMissionImg = false">
                 <div class="viewbox">
                     <img :src="missionImgSrc | imgurl" alt="viewImg">
                 </div>
            </div>
        </transition>
        <!-- view pic start -->

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
import backItem from "@/components/report/backItem.vue"

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
        VueDatepickerLocal,
        backItem
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            tableInfo: [],
            missionInfo: [],
            dayShiftInfo: [],
            backMissionArray: [],
            billInfo: [],
            basketInfo: [],
            startBox: 0,
            countClient: 0,
            averageClient: 0,
            endBox: 0,
            moreSearchInfo: false,
            isOpenDriverBox: false,
            driverArray: [],
            clientArray:[],
            checkerArray: [],
            carWashArray:[],
            choiseDriver: null,
            driverText: "请点击选择",
            lineText:null,
            clientText:null,
            isOpenTipBox: false,
            tipsMsg: null,
            showWindow: "night",
            isOpenCheckCarDriverMode: false,
            isOpenCarWashDriverMode:false,
            leftButtonStyle: "topbuttonarea-item-blue",
            tripsButtonStyle:"topbuttonarea-item",
            centerButtonStyle: "topbuttonarea-item",
            checkCarButtonStyle: "topbuttonarea-item",
            repairCarButtonStyle: "topbuttonarea-item",
            missionButtonStyle: "topbuttonarea-item",
            basketButtonStyle: "topbuttonarea-item",
            carWashButtonStyle: "topbuttonarea-item",
            rightButtonStyle: "topbuttonarea-item",
            showDetailCheckInfo: false,
            showDriverCheckCarDetailInfo: false,
            tempInfo: null,
            wrongNumArray: [],
            tempCar: [],
            tempCarError: [],
            driverCheckCarInfo: [],
            tempDriverCheckCarInfo: [],
            tempAllDriverCheckCarInfo: [],
            tempDriverCheckCarChartLeft: [],
            tempAllDriverCheckCarChartLeft: [],
            allDriverCheckCarInfo: [],
            missionReportArray: [],
            missionDriverReportArray:[],
            basketClientReportArray:[],
            tempWrongInfoForCar: {},
            isOpenMissionMode: false,
            countMissionClient:0,
            averageCountMissionClient:0,
            showMissionDetailInfo:false,
            shippingMission : null,
            missionCreateDate:null,
            missionFinishDate:null,
            missionImgSrc:null,
            showMissionImg:false,
            isShowDetailBasketReport:false,
            isShowAreaBasketReport:false,
            isShowBreakBasketReport:false,
            isOpenLineBox:false,
            isOpenClientBox:false,
            keyWord:null,
            tempInBasketNum:0,
            tempOutBasketNum:0,
            areaBasketArray:[],
            breakBasketArray:[],
            repairCarArray:[],
            moreDayTripsArray:[],
            tripsByDay:null,
            isShowBigPic:false,
            picSrc:null,
            isShowDetailAreaBasket:false,
            isShowDetailBreakBasket:false,
            isShowRepairCarSingleDay:false,
            isShowRepairCarMoreDay:false,
            tripsNum:0,
            averageValue:[],
            isShowCarDriverChoiseBox:false,
            carList:[],
            dirverList:[],
            isShowTripsDetail:false,
            tripsDate:null,
            tripsChoiseData:null,
            isShowDayShiftMission:false,
            isShowDayShiftCheckCar:false,
            backButtonStyle : "topbuttonarea-item",
            isShowBackMission:false,
            isShowBackMissionDetail:false
        };
    },

    methods: {
        editTripsInfo(){
            axios
                .post(config.server + "/report/editTripByDay",{
                    mission_id:this.tripsByDay._id,
                    array_id:this.tripsDate._id,
                    carNo:this.tripsDate.carNo,
                    driverNameCh:this.tripsDate.driverNameCh,
                    driverNameEn:this.tripsDate.driverNameEn,
                    out:this.tripsDate.out,
                    outKm:this.tripsDate.outKm,
                    in:this.tripsDate.out,
                    inKm:this.tripsDate.outKm,
                    lastEditDate:new Date().toISOString()
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.tipsMsg = '修改成功'
                        this.isOpenTipBox = true
                        this.isShowTripsDetail = false
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }else{
                        this.tipsMsg = '修改数据时出现错误'
                        this.isOpenTipBox = true
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                })
        },

        confirmCarDriverChoiseMethod(){
            if(this.tripsChoiseData.carid){
                this.tripsDate.carNo = this.tripsChoiseData.carid
            }else{
                this.tripsDate.driverNameCh = this.tripsChoiseData.dirvername
                this.tripsDate.driverNameEn = this.tripsChoiseData.name_en
            }
            this.isShowCarDriverChoiseBox = false
        },

        tripsChoiseCarOrDriverMethod(item){
            this.tripsChoiseData = item
        },

        openTripsDetailBoxMethod(item){
            this.tripsDate = item
            this.isShowTripsDetail = true
        },

        getAllDriverInfoMethod(){
            this.carList = []
            axios
                .post(config.server + "/dirver/name")
                .then(doc => {
                    if(doc.data.code === 0){
                        this.isShowCarDriverChoiseBox = true
                        this.dirverList = doc.data.doc
                    }else{
                        this.tipsMsg = '获取数据时出现错误'
                        this.isOpenTipBox = true
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                    this.tipsMsg = '获取司机信息时出现错误'
                    this.isOpenTipBox = true
                    setTimeout(() => {
                        this.isOpenTipBox = false
                    }, 2000);
                })
        },

        getAllCarInfoMethod(){
            this.dirverList = []
            axios
                .get(config.server + "/car/allplate")
                .then(doc => {
                    if(doc.data.code === 0){
                        this.isShowCarDriverChoiseBox = true
                        this.carList = doc.data.doc
                    }else{
                        this.tipsMsg = '获取数据时出现错误'
                        this.isOpenTipBox = true
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                    this.tipsMsg = '获取车辆信息时出现错误'
                    this.isOpenTipBox = true
                    setTimeout(() => {
                        this.isOpenTipBox = false
                    }, 2000);
                })
        },

        repairCarMethod(){
            axios
                .post(config.server + "/report/repairCar", {
                    startDate:this.startDate,
                    endDate:this.endDate,
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.repairCarArray = doc.data.doc
                    }else if(doc.data.code === 1){
                        this.tipsMsg = '未找到符合条件的数据'
                        this.isOpenTipBox = true
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }else{
                        this.tipsMsg = '获取维修信息时出现错误'
                        this.isOpenTipBox = true
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                    this.tipsMsg = '获取维修信息时出现错误'
                    this.isOpenTipBox = true
                    setTimeout(() => {
                        this.isOpenTipBox = false
                    }, 2000);
                })
        },

        findTripsReportByMoreDayMethod(){
            axios
                .post(config.server + "/report/tripByMoreDay", {
                    startDate:this.startDate,
                    endDate:this.endDate,
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.moreDayTripsArray = doc.data.doc
                        this.tripsNum = doc.data.tripsNum
                        let tempBasketNum = 0
                        let tempBasketArrary = []
                        let tempBasketCount = 1
                        let tempKmCount = 0
                        doc.data.doc.forEach(element => {
                            let index = -1
                            let indexKm = -1
                            element.missionArray.forEach(item => {
                                tempBasketNum = 0
                                index ++
                                if(item.out && item.in){
                                    if(tempBasketArrary[index]){
                                        tempBasketArrary[index].count ++
                                        tempBasketNum = item.in - item.out + tempBasketArrary[index].num
                                    }else{
                                        tempBasketNum = item.in - item.out
                                        tempBasketArrary[index]={
                                            count: 1
                                        }
                                    }
                                    tempBasketArrary[index].num = tempBasketNum
                                    this.averageValue = tempBasketArrary
                                    console.log(tempBasketArrary)
                                }else{
                                    if(tempBasketArrary[index]){
                                        console.log('pass')
                                    }else{
                                        tempBasketArrary[index] = {
                                            num :0,
                                            count:1
                                        }
                                    }
                                    
                                }
                                indexKm ++
                                if(item.outKm && item.inKm){
                                    console.log('have km both')
                                    if(this.averageValue[indexKm].km){
                                        this.averageValue[indexKm].km = item.inKm - item.outKm + this.averageValue[indexKm].km
                                        this.averageValue[indexKm].indexKm ++
                                    }else{
                                        console.log('new km')
                                        this.averageValue[indexKm].km = item.inKm - item.outKm
                                        this.averageValue[indexKm].indexKm= 1
                                    }
                                }else{
                                    if(this.averageValue[indexKm]){
                                        console.log('pass')
                                    }else{
                                        this.averageValue[indexKm] = {
                                            km:0,
                                            indexKm:1,
                                            num :0,
                                            count:1
                                        }
                                    }
                                }
                            });
                            
                        });
                        
                    }else if(doc.data.code === 1){
                        this.isOpenTipBox = true
                        this.tipsMsg = '未找到符合条件的数据'
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }else if(doc.data.code === 3){
                        this.isOpenTipBox = true
                        this.tipsMsg = '查找时间范围过大'
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }else{
                        this.isOpenTipBox = true
                        this.tipsMsg = '出现未知错误'
                        setTimeout(() => {
                            this.isOpenTipBox = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        findDayShiftCheckCarMethod(){
            this.isOpenCheckCarDriverMode = false;
            axios
                .post(config.server + "/checkWorkerDayShift/find", {
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
                                    labels: [
                                        "刹车灯",
                                        "大灯",
                                        "油卡",
                                        "轮胎",
                                        "其他"
                                    ],
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
        },

        findTripsReportByOneDayMethod(){
            let tempDate = new Date(this.startDate).toDateString()
            tempDate = new Date(tempDate).toISOString()
            axios
                .post(config.server + "/report/tripByDay", {
                    findDate:tempDate
                })
                .then(doc =>{
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.tripsByDay = doc.data.doc
                    }else if(doc.data.code === 1){
                        console.log('未找到符合条件的数据')
                    }else{
                        console.log('查询出错')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        OpenDetailBreakBasket(item){
            this.tempInfo = item
            console.log(item)
            this.isShowDetailBreakBasket = true
        },

        searchBreakBasketReportByDate(){
            axios
                .post(config.server + "/report/breakBasket", {
                    startDate:this.startDate,
                    endDate:this.endDate,
                })
                .then(doc =>{
                    if(doc.data.code === 0){
                        this.breakBasketArray = doc.data.doc
                    }else if(doc.data.code === 1){
                        console.log('未找到符合条件的数据')
                    }else{
                        console.log('查询出错')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        breakBarketReport(){
            this.isShowDetailBasketReport = false
            this.isShowBreakBasketReport = true
        },

        OpenDetailAreaBasket(item){
            console.log(item)
            this.isShowDetailAreaBasket = true
            this.tempInfo = item
        },

        openBigPic(src,mode){
            if(mode === 'array'){
                this.picSrc = 'uploads/countBox/'+ src
            }else{
                this.picSrc = src
            }
            this.isShowBigPic = true
        },

        searchAreaBasketReportByDate(){
            axios
                .post(config.server + "/report/areaBasket", {
                    startDate:this.startDate,
                    endDate:this.endDate,
                })
                .then(doc => {
                    console.log(doc)
                    this.areaBasketArray = doc.data.doc
                })
                .catch(err => {
                    console.log(err)
                })
        },

        basketArrayReport(){
            this.isShowAreaBasketReport = !this.isShowAreaBasketReport
            this.isShowDetailBasketReport = false
        },

        driverCarWashMethod(){
            if(!this.startDate || !this.endDate){
                this.tipsMsg = "请填写开始结束时间";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            }else{
                if(this.choiseDriver){
                    axios
                        .post(config.server + "/report/carwash", {
                            startDate:this.startDate,
                            endDate:this.endDate,
                            creator:this.driverText
                        })
                        .then(doc => {
                            if(doc.data.code === 0){
                                console.log(doc)
                                this.carWashArray = doc.data.doc
                            }else if(doc.data.code === 1){
                                this.tipsMsg = "未找到对应数据";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            }else if(doc.data.code === 3){
                                this.tipsMsg = "查询最大不能超过31天";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            }else{
                                this.tipsMsg = "获取数据出现错误";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }else{
                    this.tipsMsg = "请选择相应司机";
                    this.isOpenTipBox = true;
                    setTimeout(() => {
                        this.isOpenTipBox = false;
                    }, 3000);
                }
            }
        },

        carWashMethod(mode){
            if(!this.startDate || !this.endDate){
                this.tipsMsg = "请填写开始结束时间";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            }else{
                if(mode === 'find'){
                    console.log('find')
                    axios
                        .post(config.server + "/report/carwash", {
                            startDate:this.startDate,
                            endDate:this.endDate
                        })
                        .then(doc => {
                            if(doc.data.code === 0){
                                console.log(doc)
                                this.carWashArray = doc.data.doc
                            }else if(doc.data.code === 1){
                                this.tipsMsg = "未找到对应数据";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            }else if(doc.data.code === 3){
                                this.tipsMsg = "查询最大不能超过31天";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            }else{
                                this.tipsMsg = "获取数据出现错误";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }else{
                    console.log('more')
                    this.isOpenCarWashDriverMode = !this.isOpenCarWashDriverMode
                }
            }
        },

        searchClientMethod(){
            let pageNow = 1;
            let pageSize = 10
            if (!this.keyWord) {
                this.tipsMsg = "请填客户名";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            } else {
                axios
                    .post(config.server + "/clientb/find", {
                        word: this.keyWord,
                        pageSize: pageSize,
                        pageNow: pageNow
                    })
                    .then(doc => {
                        console.log(doc)
                        this.clientArray = doc.data.doc
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        openClientBox(){
            this.isOpenClientBox = true
        },

        openDetailBasketBox(){
            this.isShowAreaBasketReport = false
            if(this.isShowDetailBasketReport){
                // this.$refs.basketbox.style.overflow='hidden'
                this.isShowDetailBasketReport = false
            }else{
                // setTimeout(() => {
                //     this.$refs.basketbox.style.overflow='unset'
                // }, 1000);
                this.isShowDetailBasketReport = true
            }
        },

        detailBasketReport(){
            if(!this.startDate || !this.endDate){
                this.tipsMsg = "请填写开始结束时间";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            }else{
                if(!this.choiseDriver && !this.lineText && !this.clientText){
                    this.tipsMsg = "请选择筛选条件";
                    this.isOpenTipBox = true;
                    setTimeout(() => {
                        this.isOpenTipBox = false;
                    }, 3000);
                }else{
                    let shippingData = {}
                    shippingData['startDate'] = this.startDate
                    shippingData['endDate'] = this.endDate
                    if(this.choiseDriver){
                        shippingData['driverName'] = this.driverText
                    }
                    if(this.lineText){
                        shippingData['lineName'] = this.lineText
                    }
                    if(this.clientText){
                        shippingData['clientName'] = this.clientText
                    }
                    axios
                    .post(config.server + "/report/basket", shippingData)
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.basketClientReportArray = doc.data.doc
                            this.tempInBasketNum = 0
                            this.tempOutBasketNum = 0
                            doc.data.doc.forEach(element => {
                                this.tempOutBasketNum += element.outBasket
                                this.tempInBasketNum +=element.inBasket
                            });
                        }else{
                            this.tipsMsg = "未找到对应数据";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        }
                        
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                
            }
        },

        openViewPicMethod(src){
            this.missionImgSrc = src
            this.showMissionImg = true
        },

        openMissionDetailMethod(item){
            axios
                .post(config.server + "/checkcar/getone", {
                    checkCar_id: item.carCheck_id
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        if(doc.data.doc.date){
                            let tempHours = new Date(doc.data.doc.date).getHours()
                            if(tempHours < 10){
                                tempHours = '0' + tempHours
                            }
                            let tempMinutes = new Date(doc.data.doc.date).getMinutes()
                            if(tempMinutes < 10){
                                tempMinutes = '0' + tempMinutes
                            }
                            this.missionCreateDate = tempHours + ':' + tempMinutes
                        }else{
                            this.missionCreateDate = '未提交'
                        }

                        if(doc.data.doc.finishDate){
                            let tempHours = new Date(doc.data.doc.finishDate).getHours()
                            if(tempHours < 10){
                                tempHours = '0' + tempHours
                            }
                            let tempMinutes = new Date(doc.data.doc.finishDate).getMinutes()
                            if(tempMinutes < 10){
                                tempMinutes = '0' + tempMinutes
                            }
                            this.missionFinishDate = tempHours + ':' + tempMinutes
                        }else{
                            this.missionFinishDate = '未提交'
                        }
                    }else{
                        this.missionCreateDate = 'Null'
                        this.missionFinishDate = 'Null'
                        this.tipsMsg = "获取检查信息失败";
                        this.isOpenTipBox = true;
                        setTimeout(() => {
                            this.isOpenTipBox = false;
                        }, 3000);
                    }
                    this.shippingMission = item
                    console.log(item)
                    this.showMissionDetailInfo = true
                })
                .catch(err => {
                    console.log(err)
                })
            
        },

        missionRepotForDriver(){
            if(!this.startDate || !this.endDate){
                this.tipsMsg = "请填写开始结束时间";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            }else if(this.choiseDriver === null){
                this.tipsMsg = "请选择司机";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            }else{
                axios
                    .post(config.server + "/report/missionwithdriver", {
                        startDate: this.startDate,
                        endDate: this.endDate,
                        driver:this.choiseDriver.dirvername
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.missionDriverReportArray = doc.data.doc
                            this.countMissionClient = 0
                            doc.data.doc.forEach(element => {
                                this.countMissionClient += element.missionclient.length
                            });
                            this.averageCountMissionClient = Math.ceil(this.countMissionClient / this.missionDriverReportArray.length)
                        }else if(doc.data.code === 3){
                            this.tipsMsg = "搜索时间范围过大";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        }else{
                            this.tipsMsg = "获取数据失败";
                            this.isOpenTipBox = true;
                            setTimeout(() => {
                                this.isOpenTipBox = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

        missionChartMethod(mode) {
            if (!this.startDate || !this.endDate) {
                this.tipsMsg = "请填写开始结束时间";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            } else {
                if (mode === "driverChart") {
                    this.isOpenMissionMode = !this.isOpenMissionMode;
                } else {
                    axios
                        .post(config.server + "/report/mission", {
                            startDate: this.startDate,
                            endDate: this.endDate
                        })
                        .then(doc => {
                            if (doc.data.code === 0) {
                                this.missionReportArray = doc.data.doc;
                                let tempSortArray = {}
                                doc.data.doc.forEach(element => {
                                    if(!tempSortArray[element.missionline]){
                                        tempSortArray[element.missionline]={
                                            lineName:element.missionline,
                                            lineClientCount:element.missionclient.length
                                        }
                                    }else{
                                        tempSortArray[element.missionline].lineClientCount += element.missionclient.length
                                    }
                                });
                                let tempLabels = []
                                let tempDatas = []
                                
                                for(let item in tempSortArray){
                                    tempLabels.push(item)
                                    tempDatas.push(tempSortArray[item].lineClientCount)
                                }
                                //show left shart
                                setTimeout(() => {
                                    let driverCheckLeft = document.getElementById(
                                        "missionreportleft"
                                    );
                                    let myChartLeft = new Chart(
                                        driverCheckLeft,
                                        {
                                            type: "bar",
                                            data: {
                                                labels: tempLabels,
                                                datasets: [
                                                    {
                                                        label: "车次客户数量统计",
                                                        backgroundColor:
                                                            "rgba(225,10,10,0.3)",
                                                        borderColor:
                                                            "rgba(225,103,110,1)",
                                                        borderWidth: 1,
                                                        pointStrokeColor:
                                                            "#fff",
                                                        pointStyle: "crossRot",
                                                        data: tempDatas,
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
                                        }
                                    );
                                }, 100);
                                let driverSortArray = {}
                                doc.data.doc.forEach(element => {
                                    if(!driverSortArray[element.missiondirver]){
                                        driverSortArray[element.missiondirver]={
                                            lineDriver:element.missiondirver,
                                            lineClientCount:element.missionclient.length
                                        }
                                    }else{
                                        driverSortArray[element.missiondirver].lineClientCount += element.missionclient.length
                                    }
                                });
                                let rightLabels = []
                                let rightDatas =[]
                                for(let item in driverSortArray){
                                    rightLabels.push(item)
                                    rightDatas.push(driverSortArray[item].lineClientCount)
                                }
                                //show left shart
                                setTimeout(() => {
                                    let driverCheckLeft = document.getElementById(
                                        "missionreportright"
                                    );
                                    let myChartLeft = new Chart(
                                        driverCheckLeft,
                                        {
                                            type: "bar",
                                            data: {
                                                labels: rightLabels,
                                                datasets: [
                                                    {
                                                        label: "司机任务数",
                                                        backgroundColor:
                                                            "rgba(225,10,10,0.3)",
                                                        borderColor:
                                                            "rgba(225,103,110,1)",
                                                        borderWidth: 1,
                                                        pointStrokeColor:
                                                            "#fff",
                                                        pointStyle: "crossRot",
                                                        data: rightDatas,
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
                                        }
                                    );
                                }, 200);
                            }else if (doc.data.code === 3){
                                this.tipsMsg = "搜索时间范围过大";
                                this.isOpenTipBox = true;
                                setTimeout(() => {
                                    this.isOpenTipBox = false;
                                }, 3000);
                            }else {
                                this.tipsMsg = "未找到符合日期的任务";
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

        openDriverCheckCarInfoDetailMethod(checkInfo) {
            console.log(checkInfo)
            this.showDriverCheckCarDetailInfo = true;
            this.tempInfo = checkInfo;
        },

        allDriverCheckCarMethod() {
            axios
                .post(config.server + "/report/alldriver", {
                    startDate: this.startDate,
                    endDate: this.endDate
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.allDriverCheckCarInfo = doc.data.doc;
                        let backupNum = 0;
                        let brakeNum = 0;
                        let cleanNum = 0;
                        let headlightNum = 0;
                        let mirrorNum = 0;
                        let petrolCardNum = 0;
                        let otherNum = 0;
                        let tyreNum = 0;
                        let wiperNum = 0;
                        this.tempAllDriverCheckCarInfo = [];
                        this.tempWrongInfoForCar = {};
                        doc.data.doc.forEach(element => {
                            let countWrongNum = 0;
                            if (!element.backup) {
                                countWrongNum++;
                                backupNum++;
                            }
                            if (!element.brake) {
                                countWrongNum++;
                                brakeNum++;
                            }
                            if (!element.clean) {
                                countWrongNum++;
                                cleanNum++;
                            }
                            if (!element.headlight) {
                                countWrongNum++;
                                headlightNum++;
                            }
                            if (!element.mirror) {
                                countWrongNum++;
                                mirrorNum++;
                            }
                            if (!element.petrolCard) {
                                countWrongNum++;
                                petrolCardNum++;
                            }
                            if (element.text) {
                                countWrongNum++;
                                otherNum++;
                            }
                            if (!element.tyre) {
                                countWrongNum++;
                                tyreNum++;
                            }
                            if (!element.wiper) {
                                countWrongNum++;
                                wiperNum++;
                            }
                            //相同车牌错误数
                            if (
                                !this.tempWrongInfoForCar[element.car_id.carid]
                            ) {
                                this.tempWrongInfoForCar[
                                    element.car_id.carid
                                ] = {
                                    carPlate: element.car_id.carid,
                                    wrongNum: countWrongNum
                                };
                            } else {
                                this.tempWrongInfoForCar[
                                    element.car_id.carid
                                ].wrongNum += countWrongNum;
                            }
                            //相同车牌错误数
                            this.tempAllDriverCheckCarInfo.push(countWrongNum);
                        });
                        this.tempAllDriverCheckCarChartLeft = [];
                        this.tempAllDriverCheckCarChartLeft.push(backupNum);
                        this.tempAllDriverCheckCarChartLeft.push(brakeNum);
                        this.tempAllDriverCheckCarChartLeft.push(cleanNum);
                        this.tempAllDriverCheckCarChartLeft.push(headlightNum);
                        this.tempAllDriverCheckCarChartLeft.push(mirrorNum);
                        this.tempAllDriverCheckCarChartLeft.push(petrolCardNum);
                        this.tempAllDriverCheckCarChartLeft.push(otherNum);
                        this.tempAllDriverCheckCarChartLeft.push(tyreNum);
                        this.tempAllDriverCheckCarChartLeft.push(wiperNum);
                        //show left shart
                        setTimeout(() => {
                            let driverCheckLeft = document.getElementById(
                                "alldrivercheckertleft"
                            );
                            let myChartLeft = new Chart(driverCheckLeft, {
                                type: "doughnut",
                                data: {
                                    labels: [
                                        "备胎",
                                        "刹车",
                                        "干净",
                                        "大灯",
                                        "后视镜",
                                        "油卡",
                                        "轮胎",
                                        "雨刷",
                                        "其他"
                                    ],
                                    datasets: [
                                        {
                                            label: "carErrorNum",
                                            backgroundColor:
                                                "rgba(225,10,10,0.3)",
                                            borderColor: "rgba(225,103,110,1)",
                                            borderWidth: 1,
                                            pointStrokeColor: "#fff",
                                            pointStyle: "crossRot",
                                            data: this
                                                .tempAllDriverCheckCarChartLeft,
                                            cubicInterpolationMode: "monotone",
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
                                            fontColor: "rgb(255, 99, 132)"
                                        }
                                    }
                                }
                            });
                        }, 100);

                        //show right shart
                        let rightLabels = [];
                        let rightDate = [];
                        for (let item in this.tempWrongInfoForCar) {
                            rightLabels.push(item);
                            rightDate.push(
                                this.tempWrongInfoForCar[item].wrongNum
                            );
                        }
                        setTimeout(() => {
                            let driverCheckLeft = document.getElementById(
                                "alldrivercheckertright"
                            );
                            let myChartRight = new Chart(driverCheckLeft, {
                                type: "bar",
                                data: {
                                    labels: rightLabels,
                                    datasets: [
                                        {
                                            label: "车辆损坏统计",
                                            backgroundColor:
                                                "rgba(225,10,10,0.3)",
                                            borderColor: "rgba(225,103,110,1)",
                                            borderWidth: 1,
                                            pointStrokeColor: "#fff",
                                            pointStyle: "crossRot",
                                            data: rightDate,
                                            cubicInterpolationMode: "monotone",
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
                                            fontColor: "rgb(255, 99, 132)"
                                        }
                                    }
                                }
                            });
                        }, 200);
                    } else if (doc.data.code === 1) {
                        this.tipsMsg = "未找到对应数据";
                        this.isOpenTipBox = true;
                        setTimeout(() => {
                            this.isOpenTipBox = false;
                        }, 3000);
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
        },

        driverCheckCarMethod() {
            axios
                .post(config.server + "/report/drivercheckbydate", {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    driverName: this.driverText
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.driverCheckCarInfo = doc.data.doc;
                        let backupNum = 0;
                        let brakeNum = 0;
                        let cleanNum = 0;
                        let headlightNum = 0;
                        let mirrorNum = 0;
                        let petrolCardNum = 0;
                        let otherNum = 0;
                        let tyreNum = 0;
                        let wiperNum = 0;
                        this.tempDriverCheckCarInfo = [];
                        doc.data.doc.forEach(element => {
                            let countWrongNum = 0;
                            if (!element.backup) {
                                countWrongNum++;
                                backupNum++;
                            }
                            if (!element.brake) {
                                countWrongNum++;
                                brakeNum++;
                            }
                            if (!element.clean) {
                                countWrongNum++;
                                cleanNum++;
                            }
                            if (!element.headlight) {
                                countWrongNum++;
                                headlightNum++;
                            }
                            if (!element.mirror) {
                                countWrongNum++;
                                mirrorNum++;
                            }
                            if (!element.petrolCard) {
                                countWrongNum++;
                                petrolCardNum++;
                            }
                            if (element.text) {
                                countWrongNum++;
                                otherNum++;
                            }
                            if (!element.tyre) {
                                countWrongNum++;
                                tyreNum++;
                            }
                            if (!element.wiper) {
                                countWrongNum++;
                                wiperNum++;
                            }
                            this.tempDriverCheckCarInfo.push(countWrongNum);
                        });
                        this.tempDriverCheckCarChartLeft = [];
                        this.tempDriverCheckCarChartLeft.push(backupNum);
                        this.tempDriverCheckCarChartLeft.push(brakeNum);
                        this.tempDriverCheckCarChartLeft.push(cleanNum);
                        this.tempDriverCheckCarChartLeft.push(headlightNum);
                        this.tempDriverCheckCarChartLeft.push(mirrorNum);
                        this.tempDriverCheckCarChartLeft.push(petrolCardNum);
                        this.tempDriverCheckCarChartLeft.push(otherNum);
                        this.tempDriverCheckCarChartLeft.push(tyreNum);
                        this.tempDriverCheckCarChartLeft.push(wiperNum);
                        //show shart left
                        setTimeout(() => {
                            let checkertleft = document.getElementById(
                                "drivercheckertleft"
                            );
                            let myChart2 = new Chart(checkertleft, {
                                type: "doughnut",
                                data: {
                                    labels: [
                                        "备胎",
                                        "刹车",
                                        "干净",
                                        "大灯",
                                        "后视镜",
                                        "油卡",
                                        "轮胎",
                                        "雨刷",
                                        "其他"
                                    ],
                                    datasets: [
                                        {
                                            label: "carErrorNum",
                                            backgroundColor:
                                                "rgba(225,10,10,0.3)",
                                            borderColor: "rgba(225,103,110,1)",
                                            borderWidth: 1,
                                            pointStrokeColor: "#fff",
                                            pointStyle: "crossRot",
                                            data: this
                                                .tempDriverCheckCarChartLeft,
                                            cubicInterpolationMode: "monotone",
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
                                            fontColor: "rgb(255, 99, 132)"
                                        }
                                    }
                                }
                            });
                        }, 100);
                    } else if (doc.data.code === 1) {
                        this.tipsMsg = "未找到对应数据";
                        this.isOpenTipBox = true;
                        setTimeout(() => {
                            this.isOpenTipBox = false;
                        }, 3000);
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
        },

        detailCheckInfo(item) {
            this.showDetailCheckInfo = true;
            this.tempInfo = item;
        },

        checkCarMethod(mode) {
            //车辆检查方法
            if (!this.startDate || !this.endDate) {
                this.tipsMsg = "请选择查询的开始-结束时间";
                this.isOpenTipBox = true;
                setTimeout(() => {
                    this.isOpenTipBox = false;
                }, 3000);
            } else {
                if (mode === "driver") {
                    this.isOpenCheckCarDriverMode = !this.isOpenCheckCarDriverMode;
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
                                            labels: [
                                                "刹车灯",
                                                "大灯",
                                                "油卡",
                                                "轮胎",
                                                "其他"
                                            ],
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
                this.backButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
            } else if (mode === "bill") {
                this.showWindow = "bill";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item-blue";
            }else if (mode === "trips") {
                this.showWindow = "trips";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item-blue";
                this.centerButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
            } else if (mode === "mission") {
                this.showWindow = "mission";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item-blue";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
            } else if (mode === "backMission") {
                this.showWindow = "backMission";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item-blue";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
            } else if (mode === "day") {
                this.showWindow = "day";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item-blue";
                this.missionButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
            } else if (mode === "basket") {
                this.showWindow = "basket";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item-blue";
                this.rightButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item";
            } else if (mode === "carWash") {
                this.showWindow = "carWash";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item-blue";
                this.checkCarButtonStyle = "topbuttonarea-item";
            }else if (mode === "repairCar") {
                this.showWindow = "repairCar";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item-blue";
                this.checkCarButtonStyle = "topbuttonarea-item";
            }else {
                this.showWindow = "checkCar";
                this.leftButtonStyle = "topbuttonarea-item";
                this.backButtonStyle = "topbuttonarea-item";
                this.tripsButtonStyle = "topbuttonarea-item";
                this.centerButtonStyle = "topbuttonarea-item";
                this.missionButtonStyle = "topbuttonarea-item";
                this.basketButtonStyle = "topbuttonarea-item";
                this.rightButtonStyle = "topbuttonarea-item";
                this.carWashButtonStyle = "topbuttonarea-item";
                this.repairCarButtonStyle = "topbuttonarea-item";
                this.checkCarButtonStyle = "topbuttonarea-item-blue";
            }
        },

        choiseClientMethod(item){
            this.clientText = item.clientbname
            this.isOpenClientBox = false;
        },

        choiseLineMethod(item){
            this.lineText = item.timesname
            this.isOpenLineBox = false;
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
                    this.driverArray = doc.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        openLineBox() {
            this.isOpenLineBox = true;
            axios
                .get(config.server + "/times/name")
                .then(doc => {
                    console.log(doc)
                    this.driverArray = []
                    if(doc.data.code === 0){
                        this.driverArray = doc.data.doc;
                    }else{
                        this.tipsMsg = "获取数据失败";
                        this.isOpenTipBox = true;
                        setTimeout(() => {
                            this.isOpenTipBox = false;
                        }, 3000);
                    }
                    
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

.new_toparea{
    width: 660px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    border: 1px solid #eee;
}

.centerarea {
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    position:relative;
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
    border-radius: 10px;
    overflow: hidden;
}

.tip-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
    border-top: 1px solid #ffab40;
    padding: 0 8px;
}

.driver-front-box-title {
    height: 30px;
    color: #fff;
    background: #ff5252;
    font-size: 16px;
    line-height: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.driver-front-box-body {
    margin: 8px 12px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    border: 1px solid #eee;
}

.driver-front-box-body-title {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    color: #6a6a6a;
    border-bottom: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
}

.driver-front-box-body-center {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
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

.driver-front-box-bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-bottom: 8px;
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
    border-radius: 10px;
    overflow: hidden;
}

.checkditailbox-front-box-top {
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    background: #d74342;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.checkditailbox-front-box-center{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    margin: 8px 12px;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 4px 8px;
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
    border: 1px solid #eee;
    height: 42px;
    line-height: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    padding: 6px 12px;
    border-radius: 10px;
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
    height: 68px;
    line-height: 60px;
    padding: 4px 12px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 5px;
    margin: 6px 0;
    border: 1px solid #eee;
}

.checkditailbox-body-center-item-carid{
    width: 120px;
    line-height: 60px;
    text-align: left;
    padding-left: 12px;
}

.checkditailbox-body-center-item-check_res{
    width: 220px;
    padding-left: 12px;
}

.checkditailbox-body-center-item-check_res_frame{
    display: flex;
    display: -webkit-flex;
    height: 30px;
}

.checkditailbox-body-center-item-check_res_frame_item{
    margin-left: 4px;
    margin-right: 4px;
}

.checkditailbox-body-center-state{
    width: 100px;
    text-align: left;
    padding-left: 12px;
}

.checkdetail-left {
    height: 24px;
    line-height: 24px;
    padding-right: 10px;
    width: 80px;
}

.missiondetailleftbox{
    border:1px solid #e6e6e6;
    display: flex;
    display: -webkit-flex;
    height:30px;
    line-height:30px;
    border-radius: 10px;
    margin-top: 10px;
}

.missiondetailleftbox-left{
    background: #eee;
    width:80px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.missiondetailright-card{
    display:flex;
    display:-webkit-flex;
    width: 300px;
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.viewbox{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.searchclientinput {
    text-align: center;
    font-size: 16px;
    height: 40px;
    outline: none;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
}

.arraybasket_searchbar{
    padding-bottom: 1px;
}

.arraybasket_searchbar_frame_button{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 12px;
}

.arraybasket_searchbar_button{
    width: 100px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #fff;
}

.areabasketimg{
    height: 30;
    overflow: hidden;
}

.areabasketimg img{
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.areabasketimg_array{
    height: 30px;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
}

.areabasketimg_array_div{
    flex-basis: 25%;
}

.areabasketimg_array_div img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.report_bigpic_back{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.12);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
}

.report_bigpic_front{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 25;
    display: flex;
    justify-content: center;
    align-items: center;
}

.report_bigpic_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.report_bigpic_box_title{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.report_detial_box_body_top{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background-color: #fff;
    margin: 24px 24px 12px 24px;
    padding: 14px 10px 4px;
    border-radius: 10px;
    position: relative;
}

.report_detial_box_body_top_title{
    position: absolute;
    top: -15px;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.report_detial_box_body_top_title_frame{
    border-radius: 10px;
    border: 1px solid #eee;
    background-color: #fff;
    width: 100px;
    height: 30px;
    line-height: 30px;
}

.report_detial_box_body_top_item{
    height: 30px;
    line-height: 30px;
    display: flex;
    display: -webkit-flex;
}

.report_detial_box_body_center{
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    margin: 24px 24px 12px 24px;
    padding: 14px 10px 4px;
    position: relative;
}

.report_detial_box_body_center_pic{
    margin-top: 8px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    width: 400px;
    overflow-y: hidden;
    overflow-x: scroll;
}

.report_detial_box_body_center_pic_frame{
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 10px;
    min-width: 100px;
}

.report_detial_box_body_center_pic_frame img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.report_detial_box_body_top_item_left{
    display: flex;
    display: -webkit-flex;
    flex-basis: 50%
}

.report_detial_box_body_top_item_left_content{
    margin-left: 10px;
}

.report_detial_box_body_top_item_right{
    flex-basis: 50%;
    display: flex;
    display: -webkit-flex;
}

.report_detial_box_foot{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    margin-bottom: 10px;
}

.tripday_infos{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.tripday_info{
    display: flex;
    display: -webkit-flex;
    margin-right: 24px;
}

.tripday_info_left{
    color: #6a6a6a;
}

.tripday_info_right{
    margin-left: 8px;
}

.tripday_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding: 12px 0;
}

.brakeLights_icon {
    background: #2f9514;
    mask-image: url(../../public/img/icons/brakeLights.svg);
    -webkit-mask-image: url(../../public/img/icons/brakeLights.svg);
    width: 30px;
    height: 30px;
    margin: 0 auto;
}

.brakeLights_icon_red {
    background: #d74342;
    mask-image: url(../../public/img/icons/brakeLights.svg);
    -webkit-mask-image: url(../../public/img/icons/brakeLights.svg);
    width: 30px;
    height: 30px;
    margin: 0 auto;
}

.light_icon {
    background: #2f9514;
    mask-image: url(../../public/img/icons/light.svg);
    -webkit-mask-image: url(../../public/img/icons/light.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.light_icon_red {
    background: #d74342;
    mask-image: url(../../public/img/icons/light.svg);
    -webkit-mask-image: url(../../public/img/icons/light.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.card_icon {
    background: #2f9514;
    mask-image: url(../../public/img/icons/card.svg);
    -webkit-mask-image: url(../../public/img/icons/card.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.card_icon_red {
    background: #d74342;
    mask-image: url(../../public/img/icons/card.svg);
    -webkit-mask-image: url(../../public/img/icons/card.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.tyre_icon {
    background: #2f9514;
    mask-image: url(../../public/img/icons/tyre.svg);
    -webkit-mask-image: url(../../public/img/icons/tyre.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.tyre_icon_red {
    background: #d74342;
    mask-image: url(../../public/img/icons/tyre.svg);
    -webkit-mask-image: url(../../public/img/icons/tyre.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.cart_icon {
    background: #2f9514;
    mask-image: url(../../public/img/icons/cart.svg);
    -webkit-mask-image: url(../../public/img/icons/cart.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.cart_icon-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/cart.svg);
    -webkit-mask-image: url(../../public/img/icons/cart.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.drivingRecorder {
    background: #2f9514;
    mask-image: url(../../public/img/icons/drivingRecorder.svg);
    -webkit-mask-image: url(../../public/img/icons/drivingRecorder.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.drivingRecorder_red {
    background: #d74342;
    mask-image: url(../../public/img/icons/drivingRecorder.svg);
    -webkit-mask-image: url(../../public/img/icons/drivingRecorder.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.carWindow {
    background: #2f9514;
    mask-image: url(../../public/img/icons/carWindow.svg);
    -webkit-mask-image: url(../../public/img/icons/carWindow.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.carWindow_red {
    background: #d74342;
    mask-image: url(../../public/img/icons/carWindow.svg);
    -webkit-mask-image: url(../../public/img/icons/carWindow.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.headlight {
    background: #2f9514;
    mask-image: url(../../public/img/icons/headlight.svg);
    -webkit-mask-image: url(../../public/img/icons/headlight.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.headlight_red {
    background: #d74342;
    mask-image: url(../../public/img/icons/headlight.svg);
    -webkit-mask-image: url(../../public/img/icons/headlight.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.side_mirror {
    background: #2f9514;
    mask-image: url(../../public/img/icons/side_mirror.svg);
    -webkit-mask-image: url(../../public/img/icons/side_mirror.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.side_mirror-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/side_mirror.svg);
    -webkit-mask-image: url(../../public/img/icons/side_mirror.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.SD_card {
    background: #2f9514;
    mask-image: url(../../public/img/icons/SD_card.svg);
    -webkit-mask-image: url(../../public/img/icons/SD_card.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.SD_card-red {
    background: #d74342;
    mask-image: url(../../public/img/icons/SD_card.svg);
    -webkit-mask-image: url(../../public/img/icons/SD_card.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
}

.icon_check_circle{
    background: #2f9514;
    mask-image: url(../../public/img/icons/baseline-check_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/img/icons/baseline-check_circle_outline-24px.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    -webkit-mask-size: 30px 30px;
    position: absolute;
    top: 0;
    right: 4px;
}

.moredaytrips_body{
    display: flex;
    display: -webkit-flex;
    padding: 24px 12px;
}

.moredaytrips_body_index_name{
    height: 60px;
    line-height: 60px;
    width: 60px;
    font-size: 18px;
    background-color: #eee;
    border-radius: 5px;
}

.moredaytrips_body_index_item{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
}

.moredaytrips_body_frame{
    overflow: auto;
    display: flex;
    display: -webkit-flex;
}

.moredaytrips_body_frame_item{
    margin: 0 4px;
}
.moredaytrips_body_frame_date{
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border-bottom: 2px solid #e31d65;
    border-top-left-radius: 5px;
    background-color: #eee;
    border-top-right-radius: 5px;
}

.moredaytrips_body_frame_title{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    background-color: #eee;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.moredaytrips_body_frame_box{
    width: 80px;
}

.moredaytrips_body_frame_content{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
}

.moredaytrips_rightbody{
    margin-left: 8px;
}

.moredaytrips_rightbody_title_top{
    height: 30px;
    line-height: 30px;
    background-color: #eee;
    border-bottom: 2px solid #e31d65;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.moredaytrips_rightbody_title_bottom{
    height: 30px;
    line-height: 30px;
    background-color: #eee;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
}

.moredaytrips_rightbody_title_bottom_item{
    width: 60px;
}

.averagevalue_box{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
}

.averagevalue_box_item{
    width: 60px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.report_trips_detial_box_body{
    background-color: #fff;
    margin: 8px 12px;
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    padding: 8px 12px;
}

.report_trips_detial_box_body_item{
    height: 30px;
    line-height: 30px;
    display: flex;
    display: -webkit-flex;
    margin-top: 4px;
}

.report_trips_detial_box_body_item_left{
    width: 60px;
    text-align: right;
}

.report_trips_detial_box_body_item_right{
    width: 120px;
    text-align: left;
    margin-left: 8px;
    padding-left: 8px;
    border-radius: 5px;
    border: 1px solid #eee;
    cursor: pointer;
}

.white_button{
    border-radius: 10px;
    border: 1px solid #eee;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    cursor: pointer;
}

.report_car_driver_frame{
    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
}

.report_car_driver_body{
    line-height: 30px;
    height: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background-color: #fff;
    cursor: pointer;
    border-radius: 10px;
    margin: 8px 12px;
    position: relative;
}

.table_toparea_button_area{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
}

.report_backmission_title{
    display: flex;
    display: -webkit-flex;    
}

.report_backmission_title_frame{
    height: 40px;
    background-color: #eee;
    border-radius: 10px;
    padding: 0 4px;
    margin: 0 4px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
}

.report_backmission_title_frame_box{
    height: 30px;
    line-height: 30px;
    border-bottom: 2px solid #e31d65;
    font-size: 16px;
    padding: 0 4px;
}

.report_backmission_body{
    display: flex;
    display: -webkit-flex;
    border-radius: 10px;
    overflow: hidden;
}

.report_backmission_body:hover{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.report_backmission_body_item{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    text-align: left;
    margin: 0 4px;
    padding: 0 4px;
    cursor: pointer;
}
</style>
