<template>
    <div id="home">
        <div class="topbutton">
            <div class="topbutton-left">
                <vue-datepicker-local v-model="selectedDate" />
            </div>
            <div class="topbutton-right"
                 style="padding-top:5px">
                <md-button class="md-raised md-primary"
                           @click="addMission"
                           style="font-size:18px;width:100px;height:40px;">新建任务</md-button>
            </div>
        </div>
        <div class="centertable"
             v-if="allmission.length != 0">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item-wide class600">
                            <span>车次</span>
                        </div>
                        <div class="tabletitle-item-wide class600">
                            <span>司机</span>
                        </div>
                        <div class="tabletitle-item-wide class600tonone">
                            <span>车牌号</span>
                        </div>
                        <div class="tabletitle-item-narrow class600">
                            <span>已送</span>
                        </div>
                        <div class="tabletitle-item-narrow class600">
                            <span>总量</span>
                        </div>
                        <div class="tabletitle-item-wide class600">
                            <span>联系方式</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <div class="tablebody">
                <md-card md-with-hover
                         v-for="(item,index) in allmission"
                         :key="index"
                         style="background-color: #eff3f5">
                    <md-card-content>
                        <div @click="openMissionInfo(item)"
                             class="tabletitle2">
                            <span class="tabletitle-item-wide class600">{{item.missionline}}</span>
                            <span class="tabletitle-item-wide class600">{{item.missiondirver}}</span>
                            <span class="tabletitle-item-wide class600tonone">{{item.missioncar}}</span>
                            <span class="tabletitle-item-narrow class600">{{item.count}}</span>
                            <span class="tabletitle-item-narrow class600">{{item.missionclient.length}}</span>
                            <span class="tabletitle-item-wide class600">{{item.missionphone}}</span>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <div v-else>
            <img src="../../public/img/ebuyLogo.png"
                 alt="easylogo"
                 style="margin:100px auto;width:500px">
        </div>
        <!-- add dialog start -->
        <md-dialog :md-active.sync="addDialog"
                   :md-click-outside-to-close="false"
                   id="newmission">
            <!-- style="width:878px" -->
            <md-dialog-title style="font-size:18px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:0;margin-bottom:4px">
                <div style="display:flex;display:-webkit-flex;justify-content: space-between;">
                    <div style="line-height: 48px;padding-left:24px">
                        <span style="color:#fff">添加今日任务</span>
                    </div>
                    <div class="adddialog-top-button">
                        <md-button class="md-raised"
                                   style="background: #ff5252;color:#fff;font-size: 16px"
                                   @click="closeAddDialogMethod">关闭</md-button>
                    </div>
                </div>
            </md-dialog-title>
            <md-dialog-content style="padding:0">
                <md-steppers md-linear
                             :md-active-step.sync="active">
                    <md-step id="first"
                             md-label="选择车次"
                             :md-done.sync="first"
                             :md-error="firstStepError"
                             style="padding:0 24px">
                        <div class="dialog-first-body">
                            <div class="dialog-first-body-left">
                                <div class="container"
                                     style="box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;">
                                    <div class="custom-selector">
                                        <div class="selector-header"
                                             style="position:relative"
                                             @click="callBody">
                                            <div style="padding:10px;text-align:center;font-size:18px">{{selectorText}}</div>
                                            <div style="position:absolute;top:0;right:0">
                                                <img src="../../public/img/icons/arrowDown.png"
                                                     alt
                                                     style="width:40px"
                                                     class="arrow">
                                            </div>
                                        </div>
                                        <div class="selector-body">
                                            <div class="box"
                                                 v-for="(item,index) in alltimesinfo"
                                                 :key="index"
                                                 @click="choseitem(item)">
                                                <span style="font-size:20px">{{item.timesname}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <md-card md-with-hover
                                         style="width:100%;margin-top:8px">
                                    <div style="border-bottom: 1px solid rgba(0, 0, 0, 0.2);height: 40px;line-height: 41px;text-align:center">
                                        <h3>线路信息</h3>
                                    </div>
                                    <md-card-content v-if="aLineInfo">
                                        <div style="margin:0 20px;padding-top: 14px;">
                                            <div style="text-align:left;margin:10px 0">
                                                <span style="font-size:16px">线路名称：{{aLineInfo.timesname}}</span>
                                            </div>
                                            <div style="text-align:left;margin:10px 0">
                                                <span style="font-size:16px">线路备注：{{aLineInfo.timesnote}}</span>
                                            </div>
                                        </div>
                                    </md-card-content>
                                </md-card>
                            </div>

                            <div class="dialog-first-body-right">
                                <div>
                                    <md-button class="md-raised"
                                               :style="missionDateModeButtonCSS1"
                                               @click="missionDateModeButton('today')">
                                        <p>今日任务</p>
                                    </md-button>
                                    <md-button class="md-raised"
                                               :style="missionDateModeButtonCSS2"
                                               @click="missionDateModeButton('tomorrow')">
                                        <p>明日任务</p>
                                    </md-button>
                                    <md-button class="md-raised"
                                               :style="missionDateModeButtonCSS3"
                                               @click="missionDateModeButton('other')">
                                        <p>选择日期</p>
                                    </md-button>
                                </div>
                                <div style="box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;">
                                    <div style="border-bottom: 1px solid rgba(0,0,0,.2);height:40px;line-height:41px">
                                        <h3>任务日期</h3>
                                    </div>
                                    <div style="color:#448aff;padding:10px 0 10px 20px;text-align:left">
                                        <p v-if="missionDateModeButtonCSS1">今日任务</p>
                                        <p v-else-if="missionDateModeButtonCSS2">明日任务</p>
                                        <p v-else>选择日期</p>
                                    </div>
                                    <div style="display:flex;display:-webkit-flex;padding:0px 0 10px 20px"
                                         v-if="missionDateModeButtonCSS3">
                                        <div id="testref"
                                             ref="testref">
                                            <p>任务日期：</p>
                                        </div>
                                        <div>
                                            <md-datepicker v-model="missionDateModePacker"
                                                           md-immediately
                                                           style="margin-top: -24px;margin-bottom:0" />
                                        </div>
                                        <div></div>
                                    </div>
                                    <div style="display:flex;display:-webkit-flex;padding:0px 0 10px 20px"
                                         v-else>
                                        <div>
                                            <p>任务日期：</p>
                                        </div>
                                        <div>
                                            <p>{{missionDateModePacker}}</p>
                                        </div>
                                    </div>
                                    <div style="display:flex;display:-webkit-flex;padding:0px 0 10px 20px">
                                        <div>
                                            <p>有效时间：</p>
                                        </div>
                                        <div>
                                            <p>00:00-23:59</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dialog-first-body-bottom"
                             style="text-align:center">
                            <md-button class="md-raised md-primary"
                                       @click="setDone('first', 'second')">下一步</md-button>
                        </div>
                    </md-step>

                    <md-step id="second"
                             md-label="司机车辆"
                             :md-done.sync="second"
                             :md-error="secondStepError">
                        <div>
                            <div class="step-second"
                                 id="addmissionsecond">
                                <div class="dialog-3"
                                     style="padding: 5px;">
                                    <div @click="openChoiceList('driver')"
                                         style="margin:0 auto">
                                        <div style="width:370px;height:282px;position: relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);overflow: hidden;">
                                            <div>
                                                <img v-if="!selectorDriver.image"
                                                     src="../../public/img/ebuyLogo.png"
                                                     alt="logo"
                                                     style="width:100%;height:100%;object-fit: contain;">
                                                <img v-else
                                                     :src="selectorDriver.image | imgurl"
                                                     alt="carphoto"
                                                     style="width:100%;height:100%;object-fit: contain;">
                                            </div>
                                            <div style="position: absolute;bottom: 0;background: rgba(0,0,0,0.7);width: 100%;height: 75px;color:#fff">
                                                <div v-if="!selectorDriver"
                                                     style="text-align: center;">
                                                    <span style="font-size:20px;line-height:100px;">{{setDriverText}}</span>
                                                </div>
                                                <div v-else>
                                                    <div style="font-size:16px;display:-webkit-flex;display: flex;padding-top:10px">
                                                        <div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
                                                            <div style="flex-basis:30%;text-align: right;">
                                                                <span>姓名:</span>
                                                            </div>
                                                            <div style="flex-basis:70%;text-align: center;">
                                                                <span>{{selectorDriver.dirvername}}</span>
                                                            </div>
                                                        </div>
                                                        <div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
                                                            <div style="flex-basis:30%;text-align: right;">
                                                                <span>电话:</span>
                                                            </div>
                                                            <div style="flex-basis:70%;text-align: center;">
                                                                <span>{{selectorDriver.dirverphone}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="font-size:16px;display:-webkit-flex;display: flex;padding-top:10px">
                                                        <div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
                                                            <div style="flex-basis:30%;text-align: right;">
                                                                <span>驾照:</span>
                                                            </div>
                                                            <div style="flex-basis:70%;text-align: center;">
                                                                <span>{{selectorDriver.dirvercard}}</span>
                                                            </div>
                                                        </div>
                                                        <div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
                                                            <div style="flex-basis:30%;text-align: right;">
                                                                <span>备注:</span>
                                                            </div>
                                                            <div style="flex-basis:70%;text-align: center;">
                                                                <span>{{selectorDriver.dirvernote}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="dialog-3"
                                     style="padding: 5px;">
                                    <div @click="openChoiceList('car')"
                                         style="margin:0 auto">
                                        <div style="width:370px;height:282px;position: relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);overflow: hidden;">
                                            <div>
                                                <img v-if="!selectorCar.image"
                                                     src="../../public/img/ebuyLogo.png"
                                                     alt="logo"
                                                     style="width:100%;height:100%;object-fit: contain;">
                                                <img v-else
                                                     :src="selectorCar.image | imgurl"
                                                     alt="carphoto"
                                                     style="width:100%;height:100%;object-fit: contain;">
                                            </div>
                                            <div style="position: absolute;bottom: 0;background: rgba(0,0,0,0.7);width: 100%;height: 75px;color:#fff">
                                                <div v-if="!selectorCar"
                                                     style="text-align: center;">
                                                    <span style="font-size:20px;line-height:100px;">{{setCarText}}</span>
                                                </div>
                                                <div v-else>
                                                    <div style="font-size:16px;display:-webkit-flex;display: flex;padding-top:10px">
                                                        <div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
                                                            <div style="flex-basis:30%;text-align: right;">
                                                                <span>车牌:</span>
                                                            </div>
                                                            <div style="flex-basis:70%;text-align: center;">
                                                                <span>{{selectorCar.carid}}</span>
                                                            </div>
                                                        </div>
                                                        <div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
                                                            <div style="flex-basis:30%;text-align: right;">
                                                                <span>型号:</span>
                                                            </div>
                                                            <div style="flex-basis:70%;text-align: center;">
                                                                <span>{{selectorCar.cartype}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="font-size:16px;display:-webkit-flex;display: flex;padding-top:10px">
                                                        <div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
                                                            <div style="flex-basis:30%;text-align: right;">
                                                                <span>尾门:</span>
                                                            </div>
                                                            <div style="flex-basis:70%;text-align: center;">
                                                                <span>{{selectorCar.tailgate}}</span>
                                                            </div>
                                                        </div>
                                                        <div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
                                                            <div style="flex-basis:30%;text-align: right;">
                                                                <span>备注:</span>
                                                            </div>
                                                            <div style="flex-basis:70%;text-align: center;">
                                                                <span>{{selectorCar.carnote}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="step-second-button"
                                 style="text-align:center">
                                <md-button class="md-raised md-primary"
                                           @click="setDone('second', 'first')">上一步</md-button>
                                <md-button class="md-raised md-primary"
                                           @click="setDone('second', 'third')">下一步</md-button>
                            </div>
                        </div>
                    </md-step>

                    <md-step id="third"
                             md-label="确认客户"
                             style="padding:0 24px">
                        <div style="display:flex;display: -webkit-flex;padding-bottom: 8px;justify-content: space-between;">
                            <div style="padding-top: 10px;">
                                <md-button class="md-raised"
                                           style="font-size:16px;margin:0"
                                           @click="changeSortModeMethod">
                                    <md-icon>swap_horiz</md-icon>
                                    <span>客服排序</span>
                                </md-button>
                            </div>

                            <div class="third-body-search">
                                <input class="clientsearch"
                                       type="text"
                                       v-model="searchClient"
                                       @keyup.enter="searClientMethods"
                                       placeholder="搜索客户名称">
                            </div>
                            <div class="third-body-top-right"
                                 style="display: -webkit-flex;display: flex;">
                                <div style="width:160px;padding-left: 10px;">
                                    <md-field style="padding-top:16px;margin: 0;">
                                        <md-select v-model="clientServe"
                                                   name="clientServe"
                                                   id="clientServe"
                                                   placeholder="筛选服务商">
                                            <md-option :value="item._id"
                                                       v-for="(item,index) in allclientainfo"
                                                       :key="index">{{item.clientaname}}</md-option>
                                        </md-select>
                                    </md-field>
                                </div>

                                <div style="width:160px;padding-left: 10px;">
                                    <md-field style="padding-top:16px;margin: 0;">
                                        <md-select v-model="clientArea"
                                                   name="clientArea"
                                                   id="clientArea"
                                                   placeholder="筛选客户地区">
                                            <md-option :value="item._id"
                                                       v-for="(item,index) in areaArray"
                                                       :key="index">{{item.areaName}}</md-option>
                                        </md-select>
                                    </md-field>
                                </div>
                                <div style="padding-top: 2px;">
                                    <md-button class="md-raised"
                                               style="font-size:16px"
                                               @click="isShowChoiseClient = !isShowChoiseClient">
                                        <md-icon>swap_horiz</md-icon>
                                        <span>切换数据</span>
                                    </md-button>
                                </div>
                            </div>
                        </div>
                        <div class="third-body"
                             style="display:flex;display:-webkit-flex;padding-top:20px;">
                            <!-- left window start -->
                            <div>
                                <div class="step-third"
                                     style="border: 3px dashed #448aff;padding:10px;position: relative;">
                                    <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 90px;top:-24px">
                                        <span style="line-height:32px;margin:0 auto;margin: 10px 64px;padding-left: 4px;color:#fff;font-size:16px">{{leftWindowInfo}}</span>
                                    </div>
                                    <div class="step-third-title"
                                         style="background-color: #f4f4f4">
                                        <div class="step-third-title-item"
                                             style="width:40px;"></div>
                                        <div class="step-third-title-item"
                                             style="width:160px">客户名称</div>
                                        <div class="step-third-title-item"
                                             style="width:60px">服务商</div>
                                        <div class="step-third-title-item"
                                             style="width:65px">区域</div>
                                        <div class="step-third-title-item"
                                             style="width:40px">信息</div>
                                    </div>
                                    <div class="third-body-leftbox"
                                         style="overflow-y:auto">
                                        <md-card md-with-hover
                                                 v-for="(item,index) in leftBoxArray"
                                                 :key="index">
                                            <md-card-content>
                                                <div class="step-third-title-body">
                                                    <label :for="index"
                                                           class="step-third-title"
                                                           @click="autoSortMethod">
                                                        <input type="checkbox"
                                                               :id="index"
                                                               :value="item"
                                                               v-model="choiceClient"
                                                               style="width:25px;height:25px">
                                                        <span class="step-third-title-item"
                                                              style="width:150px">{{item.clientbname}}</span>
                                                        <span class="step-third-title-item"
                                                              style="width:80px">{{item.clientbserve.clientaname}}</span>
                                                        <span class="step-third-title-item"
                                                              style="width:50px">{{item.clientbarea.areaName}}</span>
                                                    </label>
                                                    <div @click="clientInfoMethod(item)">
                                                        <md-icon class="step-third-title-item"
                                                                 style="width:50px">info</md-icon>
                                                    </div>
                                                </div>
                                            </md-card-content>
                                        </md-card>
                                    </div>
                                </div>
                            </div>
                            <!-- left window end -->
                            <!-- right window start -->
                            <div>
                                <div style="padding-left:10px">
                                    <div style="border: 3px dashed #448aff;">
                                        <div v-if="isShowChoiseClient"
                                             style="padding:10px;position: relative;display: flex;flex-direction: column;align-items: center;">
                                            <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;top:-24px">
                                                <span style="line-height:32px;margin:0 auto;margin: 10px 64px;padding-left: 4px;color:#fff;font-size:16px">已选客户</span>
                                            </div>
                                            <div class="tab4-title"
                                                 style="height:32px;line-height:30px;margin-bottom: 2px;background-color: #f4f4f4">
                                                <div class="step-third-title-item"
                                                     style="width:142px;padding-left:16px;text-align:left">
                                                    <span>客户名称</span>
                                                </div>
                                                <div style="width:45px;">
                                                    <span>拍照</span>
                                                </div>
                                                <div style="width:45px;padding-left:5px">
                                                    <span>置顶</span>
                                                </div>
                                                <div style="width:45px;padding-left:5px">
                                                    <span>置底</span>
                                                </div>
                                                <div class="step-third-title-item"
                                                     style="width:50px">
                                                    <span>信息</span>
                                                </div>
                                                <div class="step-third-title-item"
                                                     style="width:40px">
                                                    <span>删除</span>
                                                </div>
                                            </div>
                                            <div id="tab4-body"
                                                 class="tab4-body"
                                                 style="overflow-y:auto;">
                                                <draggable v-model="choiceClient"
                                                           :options="{group:'timesclientb'}"
                                                           @start="drag=true"
                                                           @end="drag=false">
                                                    <md-card md-with-hover
                                                             v-for="(item,index) in choiceClient"
                                                             :key="index"
                                                             class="choiceClientCard">
                                                        <md-card-content>
                                                            <div style="display:flex">
                                                                <div class="step-third-title-item"
                                                                     style="width:142px;padding-left:16px;text-align:left"
                                                                     @click="clientInfoMethod(item)">
                                                                    <span>{{item.clientbname}}</span>
                                                                </div>
                                                                <div style="width:45px;">
                                                                    <md-switch v-model="item.isNeedPic"
                                                                               style="margin:0"
                                                                               @change="changeNeedPicMethod(item)"></md-switch>
                                                                </div>
                                                                <div style="width:45px;padding-left:5px"
                                                                     @click="toTheTop(item,index)">
                                                                    <md-icon>vertical_align_top</md-icon>
                                                                </div>
                                                                <div style="width:40px;padding-left:5px"
                                                                     @click="toTheBottom(item,index)">
                                                                    <md-icon>vertical_align_bottom</md-icon>
                                                                </div>
                                                                <div @click="clientInfoMethod(item)">
                                                                    <md-icon class="step-third-title-item"
                                                                             style="width:50px">info</md-icon>
                                                                </div>
                                                                <div @click="removeChoseClient(index)">
                                                                    <md-icon class="step-third-title-item"
                                                                             style="width:40px">block</md-icon>
                                                                </div>
                                                            </div>
                                                        </md-card-content>
                                                    </md-card>
                                                </draggable>
                                            </div>
                                        </div>
                                        <div v-else
                                             style="padding:10px;position: relative;display: flex;flex-direction: column;align-items: center;">
                                            <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;top:-24px">
                                                <span style="line-height:32px;margin:0 auto;margin: 10px 64px;padding-left: 4px;color:#fff;font-size:16px">客服数据</span>
                                            </div>
                                            <div class="tab4-title"
                                                 style="height:32px;line-height:30px;margin-bottom: 2px;background-color: #f4f4f4">
                                                <div class="step-third-title-item"
                                                     style="width:40px;padding-left:8px;text-align:left">
                                                    <span>No.</span>
                                                </div>
                                                <div style="width:237px;padding-left:20px">
                                                    <span>客户名称</span>
                                                </div>
                                                <div style="width:90px;">
                                                    <span>客服车次</span>
                                                </div>
                                            </div>
                                            <div id="tab4-body"
                                                 class="tab4-body"
                                                 style="overflow-y:auto;">
                                                <md-card md-with-hover
                                                         v-for="(item,index) in comparedClient.customers"
                                                         :key="index"
                                                         class="choiceClientCard">
                                                    <md-card-content>
                                                        <div style="display:flex">
                                                            <div class="step-third-title-item"
                                                                 style="width:37px;padding-left:14px;text-align:left">
                                                                <span>{{index}}</span>
                                                            </div>
                                                            <div style="width:249px;padding-left:24px;font-size: 16px;">
                                                                <span v-if="!redBoxArray[index]"
                                                                      style="background:red;color:#fff">{{item}}</span>
                                                                <span v-else>{{item}}</span>
                                                            </div>
                                                            <div style="width:60px;font-size: 16px;">
                                                                <span>第</span>
                                                                <span>{{comparedClient.carNumber}}</span>
                                                                <span>车</span>
                                                            </div>
                                                        </div>
                                                    </md-card-content>
                                                </md-card>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- right window end -->
                        </div>
                        <!-- <div style="display:flex;justify-content: center;">
							<div class="client-page-bar" v-if=" clientTablePageCount != 1 && clientTablePageCount">
								<ul style="width:455px;margin-top: 5px;">
									<li @click="clientTablePageButton('A')">
										<span>上一页</span>
									</li>
									<li v-for="(item,index) in clientPages" :key="index" @click="clientTablePageButton(item)" :class="{'active':clientTablePageNow == item}">
										<span>{{item}}</span>
									</li>
									<li @click="clientTablePageButton('B')">
										<span>下一页</span>
									</li>
									<li>
										<span>共<i>{{clientTablePageCount}}</i>页</span>
									</li>
								</ul>
							</div>
						</div>-->
                        <div class="third-body-button"
                             style="text-align:center">
                            <md-button class="md-raised md-primary"
                                       @click="setDone('third', 'second')">上一步</md-button>
                            <md-button class="md-raised md-primary"
                                       @click="saveMission">保存</md-button>
                        </div>
                    </md-step>
                </md-steppers>
            </md-dialog-content>
        </md-dialog>
        <!-- add dialog end -->
        <!-- detail dialog start -->
        <md-dialog class="detaildialog"
                   :md-active.sync="detaildialog">
            <div style="text-align:center;box-shadow:0px 1px 5px #000;background-color:#d74342;height:40px;line-height:40px;margin-bottom:20px;font-size:18px">
                <div class="detaildialog-title-www">
                    <span style="color:#fff">{{missionline}}</span>
                </div>
                <div class="detaildialog-title-ipad"
                     style="display:flex;display:-webkit-flex;justify-content: space-between;">
                    <div style="line-height: 40px;padding-left:24px">
                        <span style="color:#fff">出车报表</span>
                    </div>
                    <div class="adddialog-top-button detaildialogbutton">
                        <md-button class="md-raised"
                                   style="background: #ff5252;color:#fff;font-size: 16px;height:30px;line-height:30px"
                                   @click="detaildialog=false">关闭</md-button>
                    </div>
                </div>
            </div>
            <div class="class600"
                 style="overflow:hidden auto;font-size:16px">
                <div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row wrap;flex-flow:row wrap;width:90%;margin:0 auto;padding:5px 0">
                    <div class="oldertitle"
                         style="flex-basis:25%;text-align:left;margin:0 auto"
                         :title="missiondriver">
                        <span>车次司机:{{missiondriver}}</span>
                    </div>
                    <div class="oldertitle"
                         style="flex-basis:25%;text-align:left;margin:0 auto;">
                        <span>预计出车:{{goTime}}</span>
                    </div>
                    <div class="oldertitle"
                         style="flex-basis:25%;text-align:left;margin:0 auto;">
                        <span v-if="checkCarInfo.date">出车时间:{{checkCarInfo.date | timefilter}}</span>
                        <span v-else>出车时间:未提交</span>
                    </div>
                    <div class="oldertitle"
                         style="flex-basis:25%;text-align:left;margin:0 auto;">
                        <span v-if="checkCarInfo.boxNum">出车框数:{{checkCarInfo.boxNum}}</span>
                        <span v-else>出车框数:未提交</span>
                    </div>

                </div>

                <div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row wrap;flex-flow:row wrap;width:90%;margin:0 auto;border-bottom:1px solid;padding:5px 0">
                    <div class="oldertitle"
                         style="flex-basis:25%;text-align:left;margin:0 auto">
                        <span>任务日期:{{missiondate}}</span>
                    </div>
                    <div class="oldertitle"
                         style="flex-basis:25%;text-align:left;margin:0 auto">
                        <span>预计收车:{{backTime}}</span>
                    </div>
                    <div class="oldertitle"
                         style="flex-basis:25%;text-align:left;margin:0 auto">
                        <span v-if="checkCarInfo.finishDate">收车时间:{{checkCarInfo.finishDate | timefilter}}</span>
                        <span v-else>收车时间:未提交</span>
                    </div>
                    <div class="oldertitle"
                         style="flex-basis:25%;text-align:left;margin:0 auto">
                        <span v-if="checkCarInfo.boxNumAgain">收车框数:{{checkCarInfo.boxNumAgain}}</span>
                        <span v-else>收车框数:未提交</span>
                    </div>

                </div>
                <div style="padding:5px 0;border:1px solid #989898;width:90%;margin:5px auto">
                    <div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;font-weight:600;padding:5px 0">
                        <div style="flex-basis:15%;text-align:center;margin:0 auto">
                            <span>序号</span>
                        </div>
                        <div style="flex-basis:30%;text-align:center;margin:0 auto">
                            <span>名字</span>
                        </div>
                        <div style="flex-basis:15%;text-align:center;margin:0 auto">
                            <span>备注</span>
                        </div>
                        <div style="flex-basis:20%;text-align:center;margin:0 auto">
                            <span>时间</span>
                        </div>
                        <div style="flex-basis:20%;text-align:center;margin:0 auto">
                            <span>要求时间</span>
                        </div>
                        <!-- 位置需ssl -->
                        <!-- <div style="flex-basis:15%;text-align:center;margin:0 auto">
							<span>位置</span>
						</div>-->
                    </div>
                    <div class="detaildialog-body"
                         style="overflow:auto;">
                        <div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;padding:5px 0"
                             v-for="(item,index) in missionclient"
                             :key="index">
                            <div style="flex-basis:15%;text-align:center;margin:0 auto">
                                <span>{{index+1}}</span>
                            </div>
                            <div style="flex-basis:30%;text-align:center;margin:0 auto;text-overflow: ellipsis;overflow: hidden;">{{item.clientbname}}</div>
                            <div style="flex-basis:15%;text-align:center;margin:0 auto">
                                <span v-if="item.note">{{item.note}}</span>
                                <span v-else>无备注</span>
                            </div>
                            <div style="flex-basis:20%;text-align:center;margin:0 auto">
                                <span v-if="item.finishdate">{{item.finishdate | timefilter}}</span>
                                <span v-else
                                      style="color:#f9cf97">未送达</span>
                            </div>
                            <div style="flex-basis:20%;text-align:center;margin:0 auto">
                                <span v-if="item.timeLimit">{{item.timeLimit}}</span>
                                <span v-else>无要求</span>
                            </div>
                            <!-- <div v-if="item.position" style="flex-basis:15%;text-align:center;margin:0 auto" @click="openMapMethod(item)">
								<md-icon style="color:green">map</md-icon>
							</div> 
							<div v-else style="flex-basis:15%;text-align:center;margin:0 auto" @click="noMapMethod">
								<md-icon style="color:rgb(249,207,151)">map</md-icon>
							</div>-->
                        </div>
                        <div style="height:40px">
                            <!-- 底部占位符 -->
                        </div>
                    </div>
                </div>

            </div>
            <div class="rightbottom"
                 style="text-align:right;margin:0 40px;color:#6a6a6a">
                <span>总单数:{{missioncount}}</span>
            </div>
            <md-dialog-actions class="buttonarea600"
                               style="margin:0 auto">
                <md-button class="md-raised md-primary"
                           @click="detaildialog = false"
                           style="font-size:16px;width:80px;height:30px">关闭</md-button>
                <md-button class="md-raised md-primary"
                           @click="showEditMissionBox = true"
                           style="font-size:16px;width:80px;height:30px">修改</md-button>
                <md-button class="md-raised md-accent"
                           @click="removeMission"
                           style="font-size:16px;width:80px;height:30px">删除</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- detail dialog start -->
        <!-- error dialog start -->
        <md-dialog-alert :md-active.sync="error"
                         :md-content="errormsg"
                         md-confirm-text="关闭" />
        <!-- error dialog end -->
        <!-- confirm dialog start -->
        <md-dialog :md-active.sync="confirmDialog">
            <md-dialog-title>
                <span style="font-size:16px">确认删除此任务?</span>
            </md-dialog-title>
            <md-dialog-actions>
                <md-button class="md-raised md-primary"
                           @click="confirmDialog = false"
                           style="font-size:16px;width:80px;height:30px">关闭</md-button>
                <md-button class="md-raised md-accent"
                           @click="confirmRemoveMission"
                           style="font-size:16px;width:80px;height:30px">确认</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- confirm dialog end -->
        <!-- client info window start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutRight">
            <div v-if="clientInfoWindow"
                 class="clientInfoWindowclass">
                <div style="border: 3px dashed #eee;margin:5px;padding:5px">
                    <div style="display:flax;display: -webkit-flex;">
                        <div style="width:71px;text-align: right;">
                            <span>客户名：</span>
                        </div>
                        <div style="width: 150px;text-align:left;">
                            <span>{{tempClientInfo.clientbname}}</span>
                        </div>
                    </div>
                    <div style="display:flax;display: -webkit-flex;">
                        <div style="width:71px;text-align: right;">
                            <span>所属地区：</span>
                        </div>
                        <div style="width: 150px;text-align:left;">
                            <span>{{tempClientInfo.clientbarea.areaName}}</span>
                        </div>
                    </div>
                    <div style="display:flax;display: -webkit-flex;">
                        <div style="width:71px;text-align: right;">
                            <span>电话号码：</span>
                        </div>
                        <div style="width: 150px;text-align:left;">
                            <span>{{tempClientInfo.clientbphone}}</span>
                        </div>
                    </div>
                    <div style="display:flax;display: -webkit-flex;">
                        <div style="width:71px;text-align: right;">
                            <span>邮政编码：</span>
                        </div>
                        <div style="width: 150px;text-align:left;">
                            <span>{{tempClientInfo.clientbpostcode}}</span>
                        </div>
                    </div>
                    <div style="display:flax;display: -webkit-flex;">
                        <div style="width:71px;text-align: right;">
                            <span>服务商：</span>
                        </div>
                        <div style="width: 150px;text-align:left;">
                            <span>{{tempClientInfo.clientbserve.clientaname}}</span>
                        </div>
                    </div>
                    <div style="display:flax;display: -webkit-flex;">
                        <div style="width:71px;text-align: right;">
                            <span>地址：</span>
                        </div>
                        <div style="width: 150px;text-align:left;">
                            <span>{{tempClientInfo.clientbaddress}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- client info window end -->
        <!-- chose list dialog start -->
        <transition name="custom-classes-transition1"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="choseListDialog"
                 style="background: rgba(0,0,0,.6);z-index:20;position: fixed;top:0;bottom:0;left:0;right:0"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="choseListDialog"
                 style="z-index:21;position: fixed;top:0;bottom:0;left:0;right:0;display: flex;justify-content: center;align-items: center;"
                 @click.self.prevent="closeListDialog">
                <div style="width:370px;background:#fff;">
                    <div style="background:#ff5252;box-shadow: rgb(0, 0, 0) 0px 1px 5px;height:30px;line-height: 30px;">
                        <span style="font-size:18px;color:#fff">选择列表</span>
                    </div>
                    <div style="padding:10px 20px;">
                        <div v-if="isCarList">
                            <div class="choseListDialog-body"
                                 style="background-color:#eeeeee;font-weight: bold;">
                                <div style="width:30px"
                                     class="choseListDialog-item">
                                    <span></span>
                                </div>
                                <div style="width:100px"
                                     class="choseListDialog-item">
                                    <span>车牌</span>
                                </div>
                                <div style="width:100px"
                                     class="choseListDialog-item">
                                    <span>尾门</span>
                                </div>
                                <div style="width:100px"
                                     class="choseListDialog-item">
                                    <span>冷藏</span>
                                </div>
                            </div>
                            <div class="choseListDialog-body"
                                 v-for="(item,index) in allcarinfo"
                                 :key="index">
                                <div style="width:30px"
                                     class="choseListDialog-item">
                                    <md-radio :id="item._id"
                                              v-model="radioCar"
                                              :value="item._id"
                                              style="margin:0"
                                              @change="shippingTempData(item)"></md-radio>
                                </div>
                                <label :for="item._id"
                                       style="width:100px"
                                       class="choseListDialog-item">
                                    <span>{{item.carid}}</span>
                                </label>

                                <label :for="item._id"
                                       style="width:100px"
                                       class="choseListDialog-item">
                                    <span>{{item.tailgate}}</span>
                                </label>
                                <label :for="item._id"
                                       style="width:100px"
                                       class="choseListDialog-item">
                                    <span>{{item.coolstore}}</span>
                                </label>
                            </div>
                        </div>
                        <div v-else
                             style="position:relative;overflow-x:hidden;height:320px">
                            <div style="text-align:center;height:25px;line-height:25px;border-bottom:1px solid rgba(0,0,0,.12);margin-bottom:10px">
                                <div v-if="dirverChangePageFlag">常用司机</div>
                                <div v-if="!dirverChangePageFlag">所有司机</div>
                            </div>
                            <transition name="custom-classes-transition"
                                        enter-active-class="animated slideInLeft faster"
                                        leave-active-class="animated slideOutLeft faster">
                                <div v-if="dirverChangePageFlag"
                                     style="position:absolute">
                                    <div v-if="usedDriverInfo.length != 0">
                                        <div class="choseListDialog-body"
                                             style="background-color:#eeeeee;font-weight: bold;">
                                            <div style="width:30px"
                                                 class="choseListDialog-item">
                                                <span></span>
                                            </div>
                                            <div style="width:90px"
                                                 class="choseListDialog-item">
                                                <span>姓名</span>
                                            </div>
                                            <div style="width:90px"
                                                 class="choseListDialog-item">
                                                <span>驾照</span>
                                            </div>
                                            <div style="width:100px"
                                                 class="choseListDialog-item">
                                                <span>删除</span>
                                            </div>
                                        </div>
                                        <div class="choseListDialog-body"
                                             v-for="(item,index) in usedDriverInfo"
                                             :key="index">
                                            <div style="width:30px"
                                                 class="choseListDialog-item">
                                                <md-radio :id="item._id"
                                                          v-model="radioDriver"
                                                          :value="item._id"
                                                          style="margin:0"
                                                          @change="shippingTempData(item)"></md-radio>
                                            </div>
                                            <label :for="item._id"
                                                   style="width:90px"
                                                   class="choseListDialog-item">
                                                <span>{{item.dirvername}}</span>
                                            </label>

                                            <label :for="item._id"
                                                   style="width:90px"
                                                   class="choseListDialog-item">
                                                <span>{{item.dirvercard}}</span>
                                            </label>
                                            <div style="width:100px"
                                                 class="choseListDialog-item"
                                                 @click="removeUsedDriverMethod(item._id,index)">
                                                <md-icon style="color:red">clear</md-icon>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-else
                                         style="width: 330px;">
                                        <div style="text-align: center;">
                                            <span>~暂无数据~</span>
                                        </div>
                                        <div>
                                            <img src="../../public/img/fatCat.gif"
                                                 alt="emptyGif"
                                                 style="width:200px">
                                        </div>
                                    </div>
                                </div>
                            </transition>

                            <transition name="custom-classes-transition"
                                        enter-active-class="animated slideInRight faster"
                                        leave-active-class="animated slideOutRight faster">
                                <div v-if="!dirverChangePageFlag"
                                     style="position:absolute">
                                    <div class="choseListDialog-body"
                                         style="background-color:#eeeeee;font-weight: bold;">
                                        <div style="width:30px"
                                             class="choseListDialog-item">
                                            <span></span>
                                        </div>
                                        <div style="width:90px"
                                             class="choseListDialog-item">
                                            <span>姓名</span>
                                        </div>
                                        <div style="width:90px"
                                             class="choseListDialog-item">
                                            <span>驾照</span>
                                        </div>
                                        <div style="width:100px"
                                             class="choseListDialog-item">
                                            <span>电话</span>
                                        </div>
                                    </div>
                                    <div class="choseListDialog-body"
                                         v-for="(item,index) in alldirverinfo"
                                         :key="index">
                                        <div style="width:30px"
                                             class="choseListDialog-item">
                                            <md-radio :id="item._id"
                                                      v-model="radioDriver"
                                                      :value="item._id"
                                                      style="margin:0"
                                                      @change="shippingTempData(item)"></md-radio>
                                        </div>
                                        <label :for="item._id"
                                               style="width:90px"
                                               class="choseListDialog-item">
                                            <span>{{item.dirvername}}</span>
                                        </label>

                                        <label :for="item._id"
                                               style="width:90px"
                                               class="choseListDialog-item">
                                            <span>{{item.dirvercard}}</span>
                                        </label>
                                        <label :for="item._id"
                                               style="width:100px"
                                               class="choseListDialog-item">
                                            <span>{{item.dirverphone}}</span>
                                        </label>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div>
                        <div v-if="!isCarList">
                            <md-button class="md-raised md-primary"
                                       @click="dirverChangePageFlag=!dirverChangePageFlag"
                                       style="font-size:18px;width:110px;height:30px">
                                <span v-if="dirverChangePageFlag">查看全部</span>
                                <span v-else>查看常用</span>
                            </md-button>
                        </div>
                        <div>
                            <md-button class="md-raised md-primary"
                                       @click="choseListDialog = false"
                                       style="font-size:18px;width:80px;height:30px">取消</md-button>
                            <md-button class="md-raised md-primary"
                                       style="font-size:18px;width:80px;height:30px"
                                       @click="confirmeChangeCarOrDriver">选择</md-button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- chose list dialog end -->
        <!-- tip box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutLeft">
            <div class="tipDialog"
                 v-if="showTipDialog">
                <div>
                    <span>{{errormsg}}</span>
                </div>
            </div>
        </transition>
        <!-- tip box end -->
        <!-- map box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showMapBox"
                 class="mapbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showMapBox"
                 class="mapbox-front"
                 @click.self.prevent="showMapBox = false">
                <div class="mapbox-front-box">
                    <div class="mapbox-front-box-top">
                        <span>货运地图</span>
                    </div>
                    <div style="width:400px;height:400px">
                        <div id="driverMap"
                             style="height:400px"></div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showMapBox = false"
                                   style="font-size:18px;width:80px;height:30px">取消</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- map box end -->
        <!-- edit mission start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showEditMissionBox"
                 class="mapbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showEditMissionBox"
                 class="mapbox-front"
                 @click.self.prevent="showEditMissionBox = false">
                <div class="mapbox-front-box">
                    <div class="mapbox-front-box-top">
                        <span>修改任务</span>
                    </div>
                    <div>
                        <md-button class="md-raised"
                                   @click="editMissionClientMethod"
                                   style="font-size:18px;width:80px;height:30px">修改客户</md-button>
                    </div>
                    <div>
                        <md-button class="md-raised"
                                   @click="editMissionDateMethod"
                                   style="font-size:18px;width:80px;height:30px">修改时间</md-button>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showEditMissionBox = false"
                                   style="font-size:18px;width:80px;height:30px">关闭</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- edit mission end -->
        <!-- edit mission-client start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showEditMissionClientBox"
                 class="mapbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showEditMissionClientBox"
                 class="mapbox-front"
                 @click.self.prevent="showEditMissionClientBox = false">
                <div class="mapbox-front-box">
                    <div class="mapbox-front-box-top">
                        <span>客户修改</span>
                    </div>
                    <!-- search input box -->
                    <div>
                        <input class="clientsearch"
                               type="text"
                               v-model="searchClient"
                               @keyup.enter="searClientMethods"
                               placeholder="搜索客户名称">
                    </div>

                    <div style="display:flex;display:-webkit-flex;padding-top:30px;padding-left:10px;padding-right:10px">
                        <!-- left window start -->
                        <div style="width:420px">
                            <div class="step-third"
                                 style="border: 3px dashed #448aff;padding:10px;position: relative;">
                                <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 90px;top:-24px">
                                    <span style="line-height:32px;margin:0 auto;margin: 10px 64px;padding-left: 4px;color:#fff;font-size:16px">{{leftWindowInfo}}</span>
                                </div>
                                <div class="step-third-title"
                                     style="background-color: #f4f4f4">
                                    <div class="step-third-title-item"
                                         style="width:160px">搜索用户</div>
                                    <div class="step-third-title-item"
                                         style="width:60px">服务商</div>
                                    <div class="step-third-title-item"
                                         style="width:65px">区域</div>
                                    <div class="step-third-title-item"
                                         style="width:40px">信息</div>
                                    <div class="step-third-title-item"
                                         style="width:40px">添加</div>
                                </div>
                                <div style="height:404px;overflow-y:auto">
                                    <md-card md-with-hover
                                             v-for="(item,index) in leftBoxArray"
                                             :key="index">
                                        <md-card-content>
                                            <div class="step-third-title-body">
                                                <label :for="index"
                                                       class="step-third-title">
                                                    <span class="step-third-title-item"
                                                          style="width:143px">{{item.clientbname}}</span>
                                                    <span class="step-third-title-item"
                                                          style="width:80px">{{item.clientbserve.clientaname}}</span>
                                                    <span class="step-third-title-item"
                                                          style="width:50px">{{item.clientbarea.areaName}}</span>
                                                </label>
                                                <div @click="clientInfoMethod(item)">
                                                    <md-icon class="step-third-title-item"
                                                             style="width:55px">info</md-icon>
                                                </div>
                                                <div @click="addToChoiseClientMethod(item)">
                                                    <md-icon>forward</md-icon>
                                                </div>
                                            </div>
                                        </md-card-content>
                                    </md-card>
                                </div>
                            </div>
                        </div>
                        <!-- left window end -->
                        <!-- right window start -->
                        <div>
                            <div style="padding-left:10px">
                                <div style="border: 3px dashed #448aff;padding:10px;position: relative;display: flex;flex-direction: column;align-items: center;">
                                    <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;top:-24px">
                                        <span style="line-height:32px;margin:0 auto;margin: 10px 64px;padding-left: 4px;color:#fff;font-size:16px">已选客户</span>
                                    </div>
                                    <div class="tab4-title"
                                         style="height:32px;line-height:30px;margin-bottom: 2px;background-color: #f4f4f4">
                                        <div class="step-third-title-item"
                                             style="width:120px;padding-left:16px;text-align:left">
                                            <span>客户名称</span>
                                        </div>
                                        <div>
                                            <span style="font-size:16px">拍照</span>
                                        </div>
                                        <div class="step-third-title-item"
                                             style="width:40px">
                                            <span>删除</span>
                                        </div>
                                    </div>
                                    <div class="tab4-body"
                                         style="height:398px;overflow-y:auto">
                                        <!-- <md-card md-with-hover v-for="(item,index) in choiceClient" :key="index" class="choiceClientCard">
												<div style="height: 38px;line-height:38px;font-size:16px;border: 1px dashed #6a6a6a;color: #6a6a6a;" >
													<md-icon>add_circle</md-icon>
													<span>添加新客户</span>
												</div>
										</md-card>-->
                                        <md-card md-with-hover
                                                 v-for="(item,index) in choiceClient"
                                                 :key="index"
                                                 class="choiceClientCard">
                                            <md-card-content>
                                                <div style="display:flex">
                                                    <div class="step-third-title-item"
                                                         style="width:120px;padding-left:16px;text-align:left"
                                                         @click="clientInfoMethod(item)">
                                                        <span>{{item.clientbname}}</span>
                                                    </div>
                                                    <div>
                                                        <md-switch v-model="item.isNeedPic"
                                                                   style="margin:0"
                                                                   @change="changeNeedPicMethod(item)"></md-switch>
                                                    </div>
                                                    <div @click="removeChoiseClientMethod(item,index)">
                                                        <md-icon class="step-third-title-item"
                                                                 style="width:40px">block</md-icon>
                                                    </div>
                                                </div>
                                            </md-card-content>
                                        </md-card>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- right window end -->
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showEditMissionClientBox = false"
                                   style="font-size:18px;width:80px;height:30px">关闭</md-button>
                        <md-button class="md-raised md-primary"
                                   @click="showEditMissionClientBox = false"
                                   style="font-size:18px;width:80px;height:30px">保存</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- edit mission-client end -->

        <!-- edit mission-date start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showEditMissionDateBox"
                 class="mapbox-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showEditMissionDateBox"
                 class="mapbox-front"
                 @click.self.prevent="showEditMissionDateBox = false">
                 <div class="mapbox-front-box">
                    <div class="mapbox-front-box-top">
                        <span>日期修改</span>
                    </div>
                    <div style="font-size: 16px;padding-top: 16px;">
                        <div style="border: 1px solid #e0e0e0;position:relative;width: 160px;margin: 0 auto;">
                            <div style="position:absolute;top: -10px;left:0;right:0">
                                <span style="background:#fff">当前日期</span>
                            </div>
                            <div style="padding-top:12px;padding-bottom:10px">
                                <span>{{dateNow | datefilter}}</span>
                            </div>
                        </div>
                        <div style="border: 1px solid #e0e0e0;position:relative;width: 160px;margin: 16px auto 0 auto;">
                            <div style="position:absolute;top: -10px;left:0;right:0">
                                <span style="background:#fff">任务日期</span>
                            </div>
                            <div style="padding-top:12px;padding-bottom:10px;padding-left: 10px;padding-right: 10px;">
                                <vue-datepicker-local v-model="dateEdit" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showEditMissionDateBox = false"
                                   style="font-size:18px;width:80px;height:30px">关闭</md-button>
                        <md-button class="md-raised md-primary"
                                   @click="confirmEditMissionDate"
                                   style="font-size:18px;width:80px;height:30px">保存</md-button>
                    </div>
                 </div>
            </div>
        </transition>
        <!-- edit mission-date end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";
import _ from "lodash";
import draggable from "vuedraggable";
import VueDatepickerLocal from "vue-datepicker-local"; //时间选择组件

export default {
    name: "home",
    components: {
        draggable,
        VueDatepickerLocal
    },
    data() {
        return {
            selectedDate: new Date(),
            active: "first",
            addDialog: false,
            confirmDialog: false,
            first: false,
            second: false,
            third: false,
            choseLine: "",
            allmission: [],
            allclientbinfo: [],
            alldirverinfo: [],
            allcarinfo: [],
            choseClientB: [],
            alltimesinfo: [],
            areaArray: [],
            aLineInfo: "",
            dirvername: "",
            selected: [],
            allclientainfo: [],
            detaildialog: false,
            error: false,
            errormsg: "发生未知错误",
            firstStepError: null,
            secondStepError: null,
            missionline: "",
            missiondriver: "",
            goTime: "",
            backTime: "",
            missioncar: "",
            missioncount: "",
            missionfinish: "",
            missionphone: "",
            missiondate: "",
            missionclient: [],
            missionid: "",
            selectorText: "请选择",
            selectorDriver: "",
            selectorCar: "",
            bodyShowFlag: false,
            driverShowFlag: false,
            clientArea: "",
            clientServe: "",
            testValue: [2],
            pageSize: 10,
            showItem: 5,
            searchClient: "",
            clientTablePageNow: 1,
            clientTablePageCount: 10,
            clientTableMode: "",
            clientInfoWindow: false,
            tempClientInfo: "",
            setDriverText: "请选择司机",
            setCarText: "请选择车辆",
            isCarList: false,
            choseListDialog: false,
            radioCar: "",
            radioDriver: "",
            tempData: "",
            missionDateModeButtonCSS1: "background:#448aff;color:#fff",
            missionDateModeButtonCSS2: "",
            missionDateModeButtonCSS3: "",
            missionDateModePacker: new Date().toLocaleDateString(),
            showTipDialog: false,
            showMapBox: false,
            dirverChangePageFlag: true,
            usedDriverInfo: [],
            latlng: { lat: -34.397, lng: 150.644 },
            map: null,
            _id: "",
            missionShipping: null,
            editMode: false,
            newLine: [],
            NCDate: null,
            leftWindowInfo: "线路客户",
            choiceClient: [], //与ebuy后台对比后的客户数据
            comparedClient: [], //ebuy后台获取的单条线路数据
            leftBoxArray: [],
            showEditMissionBox: false,
            showEditMissionClientBox: false,
            isShowChoiseClient: true,
            checkCarInfo: "",
            isShowNcSort: false,
            tempArrayData: [],
            redBoxArray: [],
            showEditMissionDateBox:false,
            dateNow:new Date(),
            dateEdit:new Date()
        };
    },
    computed: {
        clientPages: function() {
            let pag = [];
            if (this.clientTablePageNow < this.showItem) {
                //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                let i = Math.min(this.showItem, this.clientTablePageCount);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                //当前页数大于显示页数了
                let middle =
                        this.clientTablePageNow - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > this.clientTablePageCount - this.showItem) {
                    middle = this.clientTablePageCount - this.showItem + 1;
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag;
        }
    },
    watch: {
        selectedDate: function() {
            this.selectedDate = new Date(this.selectedDate).toDateString();
            this.selectedDate = new Date(this.selectedDate).toISOString();
            axios
                .post(config.server + "/mission", {
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
        },
        clientArea: function() {
            if (this.clientArea) {
                this.clientServe = "";
                this.searchClient = "";
                this.clientTableMode = "area";
                this.areaFilterMethod();
            }
        },
        clientServe: function() {
            if (this.clientServe) {
                this.clientArea = "";
                this.searchClient = "";
                this.clientTableMode = "serve";
                this.serveFilterMethod();
            }
        }
    },
    mounted() {
        this.getLineInfo();
        this.getallclienta();
        this.getMission();
        this.getAllArea();
    },

    activated() {
        this.getMission();
    },

    methods: {
        testMethod() {
            console.log("123123");
        },
        autoSortMethod() {
            setTimeout(() => {
                this.choiceClient = _.orderBy(
                    this.choiceClient,
                    ["driverSortNum"],
                    ["asc"]
                );
            }, 30);
        },
        changeSortModeMethod() {
            if (!this.isShowNcSort) {
                this.leftBoxArray = _.orderBy(
                    this.leftBoxArray,
                    ["NcSortNum"],
                    ["asc"]
                );
                this.isShowNcSort = true;
            } else {
                this.leftBoxArray = _.orderBy(
                    this.leftBoxArray,
                    ["driverSortNum"],
                    ["asc"]
                );
                this.isShowNcSort = false;
            }
        },
        closeAddDialogMethod() {
            this.addDialog = false;
        },
        removeChoiseClientMethod(item, index) {
            let obj = {
                clientbname: item.clientbname,
                clientbnameEN: item.clientbnameEN,
                clientbaddress: item.clientbaddress,
                clientbphone: item.clientbphone,
                clientbpostcode: item.clientbpostcode,
                clientbserve: item.clientbserve.clientaname,
                image: item.image,
                isNeedPic: item.isNeedPic,
                timeLimit: item.timeLimit
            };
            axios
                .post(config.server + "/mission/delclient", {
                    obj: obj,
                    mission_id: this.missionShipping._id
                })
                .then(doc => {
                    console.log(doc);
                    if (doc.data.code === 0) {
                        this.choiceClient.splice(index, 1);
                        //refresh left box line client while remove choise client
                        // axios.post(config.server + '/times/one',{
                        // 	line_id:this.missionShipping.line_id
                        // })
                        // .then(doc => {

                        // 	this.leftBoxArray = []
                        // 	let tempArray = doc.data.doc.timesclientb
                        // 	console.log(tempArray)
                        // 	let countNum = 0
                        // 	tempArray.forEach(elementX => {
                        // 		this.choiceClient.forEach(elementY => {
                        // 			if(elementX.clientbname === elementY.clientbname){
                        // 				tempArray.splice(countNum,1)
                        // 			}
                        // 		})
                        // 		countNum += 1
                        // 	});
                        // 	setTimeout(() => {
                        // 			this.leftBoxArray = tempArray
                        // 	}, 200);

                        // })
                        // .catch(err => {
                        // 	console.log(err)
                        // })
                    } else {
                        this.errormsg = "删除任务客户出错";
                        this.showTipDialog = true;
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addToChoiseClientMethod(item) {
            console.log(this.choiceClient);
            let tempFlag = true;
            this.choiceClient.some(element => {
                if (item.clientbname === element.clientbname) {
                    console.log(element.clientbname);
                    tempFlag = false;
                    return true;
                }
            });
            if (tempFlag) {
                let obj = {
                    clientbname: item.clientbname,
                    clientbnameEN: item.clientbnameEN,
                    clientbaddress: item.clientbaddress,
                    clientbphone: item.clientbphone,
                    clientbpostcode: item.clientbpostcode,
                    clientbserve: item.clientbserve.clientaname,
                    image: item.image,
                    isNeedPic: item.isNeedPic,
                    timeLimit: item.timeLimit
                };
                axios
                    .post(config.server + "/mission/addclient", {
                        obj: obj,
                        mission_id: this.missionShipping._id
                    })
                    .then(doc => {
                        console.log(doc);
                        if (doc.data.code === 0) {
                            //refresh choised client table while add client success
                            axios
                                .post(config.server + "/mission/one", {
                                    _id: this.missionShipping._id
                                })
                                .then(doc => {
                                    this.missionShipping = doc.data;
                                    this.choiceClient = this.missionShipping.missionclient;
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        } else {
                            this.errormsg = "添加任务客户出错";
                            this.showTipDialog = true;
                            setTimeout(() => {
                                this.showTipDialog = false;
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.errormsg = "选择客户已存在";
                this.showTipDialog = true;
                setTimeout(() => {
                    this.showTipDialog = false;
                }, 2000);
            }
        },

        confirmEditMissionDate(){
            axios
                .post(config.server + "/mission/editdate", {
                    _id: this._id,
                    dateEdit:this.dateEdit
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.getMission();
                        this.showEditMissionDateBox = false
                        this.errormsg = "修改任务时间成功";
                        this.showTipDialog = true;
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 2000);
                    }else{
                        this.showEditMissionDateBox = false
                        this.errormsg = "出现错误，请联系管理员";
                        this.showTipDialog = true;
                        console.log(doc)
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 2000);
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                });
        },
        
        editMissionDateMethod(){
            this.showEditMissionDateBox = true
            this.detaildialog = false;
            this.showEditMissionBox = false;

            axios
                .post(config.server + "/mission/getdate", {
                    _id: this._id
                })
                .then(doc => {
                    console.log(doc)
                    this.dateEdit = new Date(doc.data)
                })
                .catch(err => {
                    console.log(err);
                });
        },

        editMissionClientMethod() {
            this.showEditMissionClientBox = true;
            this.detaildialog = false;
            this.showEditMissionBox = false;
            this.choiceClient = this.missionShipping.missionclient;
            axios
                .post(config.server + "/times/one", {
                    line_id: this.missionShipping.line_id
                })
                .then(doc => {
                    this.leftBoxArray = [];
                    let tempArray = doc.data.doc.timesclientb
                    // let countNum = 0;
                    // tempArray.forEach(elementX => {
                    // 	this.missionShipping.missionclient.forEach(elementY => {
                    // 		if(elementX.clientbname == elementY.clientbname){
                    // 			tempArray.splice(countNum,1)
                    // 			console.log('!!!!!')
                    // 			console.log(elementX.clientbname)
                    // 			console.log('!!!!!')
                    // 		}
                    // 	})
                    // 	countNum += 1
                    // });
                    setTimeout(() => {
                        this.leftBoxArray = tempArray;
                        this.aLineInfo.timesclientb = this.leftBoxArray;
                    }, 200);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        toTheTop(item, index) {
            this.choiceClient.splice(index, 1);
            this.choiceClient.unshift(item);
        },
        toTheBottom(item, index) {
            this.choiceClient.splice(index, 1);
            this.choiceClient.push(item);
        },
        getNewControllerLine(item) {
            let tempDate;
            if (item === "today") {
                tempDate = new Date().toDateString();
            } else if (item === "tomorrow") {
                tempDate = new Date().getTime() + 86400000;
                tempDate = new Date(tempDate).toDateString();
            } else {
                tempDate = new Date(this.missionDateModePacker).toDateString();
            }
            axios
                .post(config.newC + "/suppliers/getVegCarsCustomers", {
                    dateQuery: {
                        start: tempDate,
                        end: tempDate
                    }
                })
                .then(doc => {
                    if (doc.data.status === 0) {
                        this.newLine = doc.data.payload;
                    } else {
                        console.log("获取管理后台数据失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        noMapMethod() {
            this.showTipDialog = true;
            this.errormsg = "该客户还未送达";
            setTimeout(() => {
                this.showTipDialog = false;
            }, 3000);
        },

        removeUsedDriverMethod(usedDriver, index) {
            axios
                .post(config.server + "/times/useddriverdel", {
                    _id: this._id,
                    usedDriver: usedDriver
                })
                .then(doc => {
                    console.log(doc);
                    if (doc.data.code === 0) {
                        this.usedDriverInfo.splice(index, 1);
                    } else {
                        this.errormsg = "删除常用司机时出现错误";
                        this.showTipDialog = true;
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        openMapMethod(item) {
            this.showMapBox = true;
            // test map start
            this.latlng = item.position;
            let infowindow = new google.maps.InfoWindow({
                content: item.clientbname + "的货物位置"
            });
            setTimeout(() => {
                let map = new google.maps.Map(
                    document.getElementById("driverMap"),
                    {
                        center: this.latlng,
                        zoom: 14
                    }
                );
                let marker = new google.maps.Marker({
                    position: this.latlng,
                    // icon:'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
                    map: map
                });
                infowindow.open(map, marker);
                google.maps.event.addListener(marker, "click", () => {
                    infowindow.open(map, marker);
                });
            }, 200);

            // test map end
        },
        changeNeedPicMethod(item) {
            axios
                .post(config.server + "/clientb/needpic", {
                    _id: item._id,
                    isNeedPic: item.isNeedPic
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.errormsg = "客户状态更新成功";
                        this.showTipDialog = true;
                        this.clientTablePageButton(this.clientTablePageNow);
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        missionDateModeButton(item) {
            if (item === "today") {
                this.missionDateModeButtonCSS1 =
                    "background:#448aff;color:#fff";
                this.missionDateModeButtonCSS2 = "";
                this.missionDateModeButtonCSS3 = "";
                this.missionDateModePacker = new Date().toLocaleDateString();
            } else if (item === "tomorrow") {
                this.missionDateModeButtonCSS2 =
                    "background:#448aff;color:#fff";
                this.missionDateModeButtonCSS1 = "";
                this.missionDateModeButtonCSS3 = "";
                this.missionDateModePacker = new Date().toLocaleDateString();
                this.missionDateModePacker = new Date(
                    this.missionDateModePacker
                ).getTime();
                this.missionDateModePacker += 86400000;
                this.missionDateModePacker = new Date(
                    this.missionDateModePacker
                ).toLocaleDateString();
            } else {
                this.missionDateModePacker = "";
                this.missionDateModeButtonCSS3 =
                    "background:#448aff;color:#fff";
                this.missionDateModeButtonCSS2 = "";
                this.missionDateModeButtonCSS1 = "";
            }
        },
        confirmeChangeCarOrDriver() {
            if (this.isCarList) {
                if (this.tempData) {
                    this.selectorCar = this.tempData;
                    this.tempData = "";
                }
            } else {
                if (this.tempData) {
                    this.selectorDriver = this.tempData;

                    axios
                        .post(config.server + "/times/useddriveradd", {
                            _id: this._id,
                            usedDriver: this.tempData._id
                        })
                        .then(doc => {
                            console.log("添加常用成功");
                        })
                        .catch(err => {
                            console.log(err);
                        });

                    this.tempData = "";
                }
            }
            this.choseListDialog = false;
        },
        shippingTempData(item) {
            this.tempData = item;
        },
        closeListDialog() {
            this.choseListDialog = false;
        },
        openChoiceList(item) {
            if (item === "car") {
                this.radioCar = this.selectorCar._id;
                this.isCarList = true;
            } else {
                this.radioDriver = this.selectorDriver._id;
                this.isCarList = false;
            }
            this.choseListDialog = true;
            //   this.radioCar = this.selectorCar._id
        },
        removeChoseClient(item) {
            this.choiceClient.splice(item, 1);
        },
        clientInfoMethod(item) {
            clearTimeout(this.timeOutName);
            this.clientInfoWindow = true;
            this.tempClientInfo = item;
            this.timeOutName = setTimeout(() => {
                this.clientInfoWindow = false;
            }, 10000);
        },

        searClientMethods() {
            if (this.searchClient) {
                this.leftWindowInfo = "搜索结果";
            } else {
                this.leftWindowInfo = "线路客户";
            }
            this.clientArea = "";
            this.clientServe = "";
            if (!this.searchClient) {
                this.clientTablePageNow = 1;
                this.clientTableMode = "";
                this.leftBoxArray = this.aLineInfo.timesclientb;
            } else {
                this.clientTableMode = "search";
                axios
                    .post(config.server + "/clientb/page", {
                        keyWord: this.searchClient,
                        pageSize: this.pageSize,
                        pageNow: this.clientTablePageNow
                    })
                    .then(res => {
                        this.leftBoxArray = res.data.doc;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        areaFilterMethod() {
            axios
                .post(config.server + "/clientb/filterpage", {
                    pageSize: this.pageSize,
                    pageNow: this.clientTablePageNow,
                    clientArea: this.clientArea
                })
                .then(res => {
                    this.allclientbinfo = res.data.doc;
                    this.ClientTablePageCount = Math.ceil(
                        res.data.countNum / this.pageSize
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        },

        serveFilterMethod() {
            axios
                .post(config.server + "/clientb/filterpage", {
                    pageSize: this.pageSize,
                    pageNow: this.clientTablePageNow,
                    clientServe: this.clientServe
                })
                .then(res => {
                    this.allclientbinfo = res.data.doc;
                    this.ClientTablePageCount = Math.ceil(
                        res.data.countNum / this.pageSize
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        },

        clientTablePageButton(item) {
            if (item === "A") {
                if (this.clientTablePageNow > 1) {
                    this.clientTablePageNow = this.clientTablePageNow - 1;
                }
            } else if (item === "B") {
                if (this.clientTablePageNow < this.clientTablePageCount) {
                    this.clientTablePageNow = this.clientTablePageNow + 1;
                }
            } else {
                this.clientTablePageNow = item;
            }
            if (this.clientTableMode === "search") {
                this.searClientMethods();
            } else if (this.clientTableMode === "area") {
                this.areaFilterMethod();
            } else if (this.clientTableMode === "serve") {
                this.serveFilterMethod();
            } else {
                axios
                    .post(config.server + "/clientb/active", {
                        pageSize: this.pageSize,
                        pageNow: this.clientTablePageNow
                    })
                    .then(res => {
                        this.allclientbinfo = res.data.doc;
                        this.clientTablePageCount = Math.ceil(
                            res.data.countNum / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        //remove mission start
        removeMission() {
            this.confirmDialog = true;
        },
        //remove mission end

        //confirm remove mission start
        confirmRemoveMission() {
            axios
                .post(config.server + "/mission/remove", {
                    missionid: this.missionid,
                    logOperator: localStorage.getItem("name")
                })
                .then(doc => {
                    this.confirmDialog = false;
                    if (doc.data.code == 0) {
                        this.getMission();
                        this.detaildialog = false;
                    }
                    this.showTipDialog = true;
                    this.errormsg = doc.data.msg;
                    setTimeout(() => {
                        this.showTipDialog = false;
                    }, 3000);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //confirm remove mission start

        // 下拉选择框部分 start

        callCar() {
            if (this.driverShowFlag) {
                this.bodyHideCar();
            } else {
                this.bodyShowCar();
            }
        },

        callDriver() {
            if (this.driverShowFlag) {
                this.bodyHideDriver();
            } else {
                this.bodyShowDriver();
            }
        },

        callBody() {
            if (this.bodyShowFlag) {
                this.bodyHide();
            } else {
                this.bodyShow();
            }
        },

        bodyShowCar() {
            let body = document.querySelector("#selector-body-car");
            let boxes = document.querySelectorAll("#selector-box-car");
            let arrow = document.querySelector("#selector-arrow-car");
            arrow.style.transform = "rotate(0deg)";
            body.style.height = "180px";
            arrow.style.transition = "0.25s";
            let height = 4;
            boxes.forEach(box => {
                height += box.clientHeight;
            });
            body.style.transition = "0.25s";
            body.style.display = "block";
            this.driverShowFlag = true;
        },

        bodyHideCar() {
            let body = document.querySelector("#selector-body-car");
            body.style.height = "0px";
            body.style.transition = "0.25s";
            let arrow = document.querySelector("#selector-arrow-car");
            arrow.style.transform = "rotate(-90deg)";
            arrow.style.transition = "0.25s";
            this.driverShowFlag = false;
        },

        bodyShowDriver() {
            let body = document.querySelector("#selector-body-driver");
            let boxes = document.querySelectorAll("#selector-box-driver");
            let arrow = document.querySelector("#selector-arrow-driver");
            arrow.style.transform = "rotate(0deg)";
            body.style.height = "180px";
            arrow.style.transition = "0.25s";
            let height = 4;
            boxes.forEach(box => {
                height += box.clientHeight;
            });
            body.style.transition = "0.25s";
            body.style.display = "block";
            this.driverShowFlag = true;
        },

        bodyHideDriver() {
            let body = document.querySelector("#selector-body-driver");
            body.style.height = "0px";
            body.style.transition = "0.25s";
            let arrow = document.querySelector("#selector-arrow-driver");
            arrow.style.transform = "rotate(-90deg)";
            arrow.style.transition = "0.25s";
            this.driverShowFlag = false;
        },

        bodyShow() {
            let body = document.querySelector(".selector-body");
            let boxes = document.querySelectorAll(".box");
            let arrow = document.querySelector(".arrow");
            arrow.style.transform = "rotate(0deg)";
            body.style.height = "180px";
            arrow.style.transition = "0.25s";
            let height = 4;
            boxes.forEach(box => {
                height += box.clientHeight;
            });
            body.style.transition = "0.25s";
            body.style.display = "block";
            this.bodyShowFlag = true;
        },
        bodyHide() {
            let body = document.querySelector(".selector-body");
            body.style.height = "0px";
            body.style.transition = "0.25s";
            let arrow = document.querySelector(".arrow");
            arrow.style.transform = "rotate(-90deg)";
            arrow.style.transition = "0.25s";
            this.bodyShowFlag = false;
        },

        choseCarItem(item) {
            this.bodyHideCar();
            this.selectorCar = item;
        },

        choseDriverItem(item) {
            this.bodyHideDriver();
            this.selectorDriver = item;
        },

        choseitem(item) {
            this._id = item._id;
            this.usedDriverInfo = [];
            this.alldirverinfo.forEach(element => {
                item.usedDriver.forEach(element2 => {
                    if (element2 === element._id) {
                        this.usedDriverInfo.push(element);
                    }
                });
            });
            this.choseLine = item;
            this.bodyHide();
            this.aLineInfo = item;
            this.selectorText = item.timesname;

            if (this.choseLine.timescar == null) {
                this.choseLine.timescar = {
                    carid: "信息错误请更新",
                    tailgate: "信息错误请更新",
                    cartype: "信息错误请更新"
                };
            }

            if (this.choseLine.timesdirver == null) {
                this.choseLine.timesdirver = {
                    dirvername: "信息错误请更新",
                    dirverphone: "信息错误请更新",
                    dirvercard: "信息错误请更新"
                };
            }

            this.aLineInfo.timesclientb.forEach(element => {
                if (element.clientbserve == null) {
                    element.clientbserve = {
                        clientaname: "客户未包含服务商"
                    };
                }
            });
        },
        // 下拉选择框部分 end

        //获取所有司机数据 start
        getalldirver(item) {
            axios
                .get(config.server + "/dirver")
                .then(res => {
                    if (item === "nameFindDriver") {
                        //如果需要司机反查
                        console.log("enter find driver");
                        this.alldirverinfo = res.data;
                        this.alldirverinfo.forEach(element => {
                            if (
                                element.dirvername ===
                                this.missionShipping.missiondirver
                            ) {
                                this.selectorDriver = element;
                            }
                        });
                    } else {
                        this.alldirverinfo = res.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取所有司机数据 end

        openMissionInfo(item) {
            this.getMission();
            this._id = item._id
            axios
                .post(config.server + "/mission/one", {
                    _id: item._id
                })
                .then(doc => {
                    if (doc.data.carCheck_id) {
                        this.getOneCheckCarInfoMethod(doc.data.carCheck_id);
                    } else {
                        this.checkCarInfo = "";
                    }
                    this.missionShipping = doc.data;
                    let time = new Date(
                        doc.data.missiondate
                    ).toLocaleDateString();
                    this.detaildialog = true;
                    this.missionline = doc.data.missionline;
                    this.missiondriver = doc.data.missiondirver;
                    this.goTime = doc.data.goTime;
                    this.backTime = doc.data.backTime;
                    this.missioncar = doc.data.missioncar;
                    this.missioncount = doc.data.missionclient.length;
                    this.missionclient = doc.data.missionclient;
                    this.missionfinish = "finish";
                    this.missionphone = doc.data.missionphone;
                    this.missiondate = time;
                    this.missionid = doc.data._id;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getOneCheckCarInfoMethod(item) {
            axios
                .post(config.server + "/checkcar/getone", {
                    checkCar_id: item
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.checkCarInfo = doc.data.doc;
                    } else {
                        this.checkCarInfo = {
                            date: false
                        };
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getMission() {
            setTimeout(() => {
                this.selectedDate = new Date(this.selectedDate).toDateString();
                this.selectedDate = new Date(this.selectedDate).toISOString();
                axios
                    .post(config.server + "/mission", {
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
            }, 100);
        },

        countfinish() {
            this.allmission.forEach(x => {
                x.count = 0;
                x.missionclient.forEach(y => {
                    if (y.finishdate) {
                        x.count += 1;
                    }
                });
            });
        },
        setDone(id, index) {
            if (id == "first") {
                if (this.missionDateModeButtonCSS1) {
                    this.getNewControllerLine("today");
                } else if (this.missionDateModeButtonCSS2) {
                    this.getNewControllerLine("tomorrow");
                } else {
                    this.getNewControllerLine("other");
                }

                if (this.choseLine == "") {
                    this.firstStepError = "未选择线路";
                } else if (
                    this.missionDateModeButtonCSS3 &&
                    !this.missionDateModePacker
                ) {
                    this.firstStepError = "未选日期";
                } else {
                    this[id] = true;
                    if (!this.editMode) {
                        this.selectorDriver = {
                            dirvername: this.aLineInfo.timesdirver.dirvername,
                            dirverphone: this.aLineInfo.timesdirver.dirverphone,
                            dirvercard: this.aLineInfo.timesdirver.dirvercard,
                            dirvernote: this.aLineInfo.timesdirver.dirvernote,
                            _id: this.aLineInfo.timesdirver._id,
                            image: this.aLineInfo.timesdirver.image
                        };
                        this.selectorCar = {
                            carid: this.aLineInfo.timescar.carid,
                            cartype: this.aLineInfo.timescar.cartype,
                            tailgate: this.aLineInfo.timescar.tailgate,
                            carnote: this.aLineInfo.timescar.carnote,
                            _id: this.aLineInfo.timescar._id,
                            image: this.aLineInfo.timescar.image
                        };
                    } else {
                        this.choseLine = {
                            timesdirver: {
                                dirvername: this.missionShipping.missiondirver
                            },
                            timescar: {
                                carid: this.missionShipping.carid
                            }
                        };
                        this.aLineInfo = {
                            timesclientb: this.missionShipping.missionclient
                        };
                    }

                    this.firstStepError = null;
                    if (index) {
                        this.active = index;
                    }
                }
            }
            if (id == "second") {
                if (this.choseLine.timesdirver.dirvername == "信息错误请更新") {
                    this.secondStepError = " ";
                    this.error = true;
                    this.errormsg = "请更新司机信息";
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                }

                if (this.choseLine.timescar.carid == "信息错误请更新") {
                    this.secondStepError = " ";
                    this.error = true;
                    this.errormsg = "请更新车辆信息";
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                } else {
                    this[id] = true;
                    this.secondStepError = null;
                    if (index) {
                        if (index === "third") {
                            this.leftBoxArray = this.aLineInfo.timesclientb.concat();
                            //if have NcNumber
                            if (this.aLineInfo.NcNumber) {
                                // let tempLine
                                this.newLine.forEach(element => {
                                    if (
                                        element.carNumber ==
                                        this.aLineInfo.NcNumber
                                    ) {
                                        this.comparedClient = element;
                                    }
                                });
                                this.choiceClient = [];
                                this.redBoxArray = [];
                                this.aLineInfo.timesclientb.forEach(
                                    element1 => {
                                        let redindex = 0;
                                        this.comparedClient.customers.forEach(
                                            element2 => {
                                                if (
                                                    element1.clientbname ==
                                                    element2
                                                ) {
                                                    this.choiceClient.push(
                                                        element1
                                                    );
                                                    this.redBoxArray[
                                                        redindex
                                                    ] = true;
                                                }
                                                redindex += 1;
                                            }
                                        );
                                    }
                                );
                            } else {
                                console.log("enter else");
                                this.choiceClient = this.aLineInfo.timesclientb;
                                this.showTipDialog = true;
                                this.errormsg = "获取ebuy后台数据失败";
                                this.comparedClient = {
                                    carNumber: "n/a",
                                    customers: ["未绑定客服线路"]
                                };
                                setTimeout(() => {
                                    this.showTipDialog = false;
                                }, 3000);
                            }
                        }
                        this.active = index;
                    }
                }
            }
            if (id == "third") {
                this.active = index;
            }
        },

        addMission() {
            this.editMode = false;
            this.selectorText = "请选择";
            this.active = "first";
            this.aLineInfo = "";
            this["second"] = false;
            this.getallclientb();
            this.getalltimes();
            this.getalldirver();
            this.getallcar();
            this.addDialog = true;
            this.getNewControllerLine();
        },
        getAllArea() {
            axios
                .get(config.server + "/area")
                .then(doc => {
                    this.areaArray = doc.data.doc;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getalltimes() {
            axios
                .get(config.server + "/times")
                .then(res => {
                    this.alltimesinfo = res.data.doc;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getallcar(item) {
            axios
                .get(config.server + "/car")
                .then(res => {
                    if (item === "idFindCar") {
                        console.log(res.data);
                        res.data.forEach(element => {
                            if (element._id === this.missionShipping.Car_id) {
                                this.selectorCar = element;
                            }
                        });
                    } else {
                        this.allcarinfo = res.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getLineInfo(item) {
            this.aLineInfo = {
                timesname: "请选择线路",
                timesnote: "请选择线路",
                timesdirver: {
                    dirvername: "请选择线路",
                    dirverphone: "请选择线路",
                    dirvercard: "请选择线路",
                    dirvernote: "请选择线路"
                },
                timescar: {
                    carid: "请选择线路",
                    carnote: "请选择线路",
                    tailgate: "请选择线路",
                    cartype: "请选择线路"
                }
            };
        },
        getallclienta() {
            axios
                .get(config.server + "/clienta")
                .then(res => {
                    this.allclientainfo = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getallclientb() {
            axios
                .post(config.server + "/clientb/active", {
                    pageSize: this.pageSize,
                    pageNow: 1
                })
                .then(res => {
                    this.allclientbinfo = res.data.doc;
                    this.clientTablePageCount = Math.ceil(
                        res.data.countNum / this.pageSize
                    );
                    this.allclientbinfo.forEach(element => {
                        if (element.clientbserve == null) {
                            element.clientbserve = {
                                clientaname: "客户未包含服务商"
                            };
                        }
                        if (element.clientbarea == null) {
                            element.clientbarea = {
                                areaName: "客户未包含地区"
                            };
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        saveMission() {
            this.$set(this.aLineInfo, "timesclientb", this.choiceClient);
            let query = {};
            this.aLineInfo.timesclientb.forEach(element => {
                if (element.clientbserve == null) {
                    element.clientbserve = {
                        clientaname: "客户未包含服务商"
                    };
                }
            });
            if (this.missionDateModeButtonCSS1) {
                query = {
                    missionline: this.aLineInfo.timesname,
                    line_id: this.aLineInfo._id,
                    goTime: this.aLineInfo.goTime,
                    backTime: this.aLineInfo.backTime,
                    missionnote: this.aLineInfo.timesnote,
                    missiondirver: this.selectorDriver.dirvername,
                    missionphone: this.aLineInfo.timesdirver.dirverphone,
                    missioncar: this.selectorCar.carid,
                    Car_id: this.selectorCar._id,
                    logOperator: localStorage.getItem("name"),
                    missionclient: this.aLineInfo.timesclientb.map(item => {
                        let obj = {
                            clientbname: item.clientbname,
                            clientbnameEN: item.clientbnameEN,
                            clientbaddress: item.clientbaddress,
                            clientbphone: item.clientbphone,
                            clientbpostcode: item.clientbpostcode,
                            clientbserve: item.clientbserve.clientaname,
                            image: item.image,
                            isNeedPic: item.isNeedPic,
                            note: item.note,
                            timeLimit: item.timeLimit
                        };
                        return obj;
                    })
                };
            } else if (this.missionDateModeButtonCSS2) {
                let nextDay = new Date().getTime() + 86400000;
                query = {
                    missiondate: new Date(nextDay).toISOString(),
                    missionline: this.aLineInfo.timesname,
                    line_id: this.aLineInfo._id,
                    missionnote: this.aLineInfo.timesnote,
                    missiondirver: this.selectorDriver.dirvername,
                    missionphone: this.aLineInfo.timesdirver.dirverphone,
                    missioncar: this.selectorCar.carid,
                    Car_id: this.selectorCar._id,
                    logOperator: localStorage.getItem("name"),
                    missionclient: this.aLineInfo.timesclientb.map(item => {
                        let obj = {
                            clientbname: item.clientbname,
                            clientbnameEN: item.clientbnameEN,
                            clientbaddress: item.clientbaddress,
                            clientbphone: item.clientbphone,
                            clientbpostcode: item.clientbpostcode,
                            clientbserve: item.clientbserve.clientaname,
                            image: item.image,
                            isNeedPic: item.isNeedPic,
                            note: item.note,
                            timeLimit: item.timeLimit
                        };
                        return obj;
                    })
                };
            } else {
                let otherDay = new Date(
                    this.missionDateModePacker
                ).toISOString();
                query = {
                    missiondate: otherDay,
                    missionline: this.aLineInfo.timesname,
                    line_id: this.aLineInfo._id,
                    missionnote: this.aLineInfo.timesnote,
                    missiondirver: this.selectorDriver.dirvername,
                    missionphone: this.aLineInfo.timesdirver.dirverphone,
                    missioncar: this.selectorCar.carid,
                    Car_id: this.selectorCar._id,
                    logOperator: localStorage.getItem("name"),
                    missionclient: this.aLineInfo.timesclientb.map(item => {
                        let obj = {
                            clientbname: item.clientbname,
                            clientbnameEN: item.clientbnameEN,
                            clientbaddress: item.clientbaddress,
                            clientbphone: item.clientbphone,
                            clientbpostcode: item.clientbpostcode,
                            clientbserve: item.clientbserve.clientaname,
                            image: item.image,
                            isNeedPic: item.isNeedPic,
                            note: item.note,
                            timeLimit: item.timeLimit
                        };
                        return obj;
                    })
                };
            }
            axios
                .post(config.server + "/mission/create", query)
                .then(res => {
                    this.missionDateModePacker = "";
                    if (this.missionDateModeButtonCSS2) {
                        this.errormsg = "明日任务已建立完成";
                    } else if (this.missionDateModeButtonCSS1) {
                        this.errormsg = res.data.msg;
                    } else {
                        this.errormsg = "指定任务已建立完成";
                    }
                    this.showTipDialog = true;
                    setTimeout(() => {
                        this.showTipDialog = false;
                    }, 3000);
                    if (res.data.code == 0) {
                        this.addDialog = false;
                        this.getMission();
                    }
                })
                .catch(err => {
                    this.error = true;
                    this.errormsg = err;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                });
        }
    }
};
</script>

<style scoped>
#home {
    width: 80%;
    margin: 20px auto;
}

.topbutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.topbutton-left {
    padding-top: 10px;
    flex-basis: 50%;
    text-align: left;
    margin: 0 auto;
}

.topbutton-right {
    margin: 0 auto;
    flex-basis: 50%;
    text-align: right;
}

.centertable {
    margin: 5px auto;
}

.tabletitle {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.tabletitle2 {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.tabletitle-item-narrow {
    margin: 0 auto;
    flex-basis: 10%;
    font-size: 18px;
    line-height: 39px;
}
.tabletitle-item-wide {
    margin: 0 auto;
    flex-basis: 20%;
    font-size: 18px;
    line-height: 39px;
}
.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column;
    flex-flow: column;
}

.step-second {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    justify-content: center;
}

.step-second-item {
    margin: 10px auto;
    flex-basis: 45%;
    /* text-align: right; */
}

.step-third-title {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.step-third-title-item {
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 28px;
}

.detailDialog-center {
    margin: 20px;
    font-size: 20px;
    width: 100%;
}

.detail-text-left {
    margin: 0 20px 0 0;
}

.detail-text-right {
    background-color: #f4f4f4;
}

.container {
    /* width: 30%; */
    margin: auto;
}

#addmissionsecond .container {
    margin: 0 auto 10px auto;
}

.arrow {
    transform: rotate(-90deg);
    transition: 0.25s;
}

.selector-header {
    cursor: pointer;
    width: 300px;
}

.selector-body {
    height: 0;
    transition: 0.25s;
    overflow: hidden;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    overflow: auto;
    position: absolute;
    z-index: 100;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.box {
    cursor: pointer;
    padding: 7px;
    border-bottom: 1px solid #eee;
    transition: 0.5s;
    width: 300px;
    font-size: 16px;
}

.box:hover {
    background-color: dodgerblue;
    color: white;
    transition: 0.5s;
}

.dialog-first-body {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 20px 0;
}

.dialog-first-body-left {
    margin: 0 auto;
    flex-basis: 30%;
    text-align: left;
}

.dialog-first-body-right {
    margin: 0 auto;
    flex-basis: 50%;
    text-align: center;
}

.clientsearch {
    margin: 16px auto 0 auto;
    border-radius: 10px;
    width: 265px;
    height: 32px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 16px;
}

.client-page-bar ul li {
    margin: 0;
    padding: 0;
}

.client-page-bar li {
    list-style: none;
    font-size: 14px;
}

.client-page-bar span {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer;
}

.client-page-bar span:hover {
    background-color: #eee;
}

.client-page-bar .active span {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}

.client-page-bar i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}

.step-third-title-body {
    display: -webkit-flex;
    display: flex;
}

.clientInfoWindowclass {
    z-index: 30;
    position: fixed;
    background-color: #fff;
    right: 0;
    bottom: 10px;
}

.tab4-title {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.choseListDialog-body {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    font-size: 16px;
    color: #616161;
    text-align: center;
    height: 36px;
    line-height: 36px;
}

.choseListDialog-item {
    border: 1px solid #e0e0e0;
}

.tipDialog {
    position: fixed;
    left: 0;
    bottom: 40px;
    background-color: rgba(192, 230, 22, 0.6);
    width: 200px;
    height: 40px;
    line-height: 40px;
    box-shadow: 1px 1px 5px;
    z-index: 20;
}

.mapbox-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.mapbox-front {
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

.mapbox-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
}

.mapbox-front-box-top {
    height: 35px;
    font-size: 18px;
    line-height: 35px;
    background: #d44950;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.choiceClientCard:hover {
    background-color: #eee !important;
}

.third-body-leftbox {
    height: 404px;
}

.tab4-body {
    height: 398px;
}

#tab4-body::-webkit-scrollbar {
    width: 16px;
    height: 16px;
}

#tab4-body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
}

#tab4-body::-webkit-scrollbar-thumb {
    /*width: 10px;*/
    height: 20px;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
}

.detaildialog-body {
    height: 400px;
}
@media screen and (min-width: 1025px) {
    #newmission {
        max-width: 878px;
    }
    .adddialog-top-button {
        display: inline;
    }

    .detaildialogbutton {
        display: none;
    }

    .detaildialog-title-ipad {
        display: none;
    }

    .detaildialog {
        width: 800px;
    }
}

@media screen and (max-width: 1024px) {
    .dialog-first-body {
        margin-top: 60px;
    }

    .dialog-first-body-bottom {
        margin-top: 60px;
    }

    .step-second {
        margin-top: 60px;
    }

    .step-second-button {
        margin-top: 60px;
    }

    .third-body {
        justify-content: space-around;
    }
    .third-body-leftbox {
        height: 445px;
    }

    .third-body-button {
        margin-top: 24px;
    }

    .third-body-search {
        padding-left: 90px;
    }

    .third-body-top-right {
        padding-right: 90px;
    }

    .tab4-body {
        height: 440px;
    }

    .detaildialog-title-www {
        display: none;
    }

    .detaildialog-body {
        height: 390px;
    }
}

@media screen and (max-width: 600px) {
    #home {
        width: 100%;
        margin: 0;
    }
    .topbutton-right {
        text-align: center;
        padding-top: 0 !important;
    }

    .class600 {
        font-size: 14px !important;
    }

    .class600tonone {
        display: none;
    }

    .buttonarea600 {
        justify-content: center;
        bottom: 0;
        width: 100%;
        background: #fff;
        position: fixed;
        padding: 0 !important;
        min-height: 40px !important;
    }

    .oldertitle {
        flex-basis: 50% !important;
        white-space: nowrap;
    }

    .rightbottom {
        margin: 0 20px !important;
    }

    /* .bottomemptey{
        display: block !important;
        height: 1000px;
        width: 100px;
        position: relative;
    } */
}
</style>
