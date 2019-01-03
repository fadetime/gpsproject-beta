<template>
    <div id="times">
        <div class="topbutton">
            <div class="topbutton-left">
                <div style="position:relative">
                    <input type="text"
                           class="findbox"
                           v-model="selectCar"
                           @keyup.enter="search"
                           placeholder="搜索车次信息">
                    <div class="findmore-button"
                         @click="findlinebyclient">
                        <span>more</span>
                    </div>
                </div>
            </div>
            <div class="topbutton-right">
                <md-button class="md-raised md-primary"
                           @click="sortLineMethod"
                           style="font-size:16px;width:80px;height:35px;">
                    <md-icon style="margin-bottom: 1px;">swap_vert</md-icon>
                    <span>排序</span>
                </md-button>
                <md-button class="md-raised md-primary"
                           @click="addbutton"
                           style="font-size:16px;width:80px;height:35px;">
                    <md-icon style="margin-bottom: 1px;">add</md-icon>
                    <span>添加</span>
                </md-button>
            </div>
        </div>

        <div class="centertable">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item"
                             style="flex-basis:150px">
                            <span>路线名称</span>
                        </div>
                        <div class="tabletitle-item"
                             style="flex-basis:100px">
                            <span>客户数量</span>
                        </div>
                        <div class="tabletitle-item"
                             style="flex-basis:200px">
                            <span>备注</span>
                        </div>
                        <div class="tabletitle-item"
                             style="flex-basis:100px">
                            <span>出车次数</span>
                        </div>
                        <div class="tabletitle-item"
                             style="flex-basis:100px">
                            <span>操作</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card md-with-hover
                     v-for="(item,index) in alltimesinfo"
                     :key="index"
                     style="background-color: #eff3f5;">
                <md-card-content>
                    <div class="tablebody">
                        <div class="tabletitle-item"
                             style="flex-basis:150px">
                            <span>{{item.timesname}}</span>
                        </div>
                        <div class="tabletitle-item"
                             style="flex-basis:100px">
                            <span>{{item.timesclientb.length}}</span>
                        </div>
                        <div class="tabletitle-item"
                             style="flex-basis:200px">
                            <span>{{item.timesnote}}</span>
                        </div>
                        <div class="tabletitle-item"
                             style="flex-basis:100px">
                            <span>{{item.timescount}}</span>
                        </div>
                        <div class="tabletitle-item"
                             style="flex-basis:100px">
                            <img src="../../public/img/icons/edit.png"
                                 alt="edit"
                                 @click="editbutton(item)"
                                 style="width:20px;margin:0 10px">
                            <img src="../..//public/img/icons/dele.png"
                                 alt="delete"
                                 @click="removebutton(item)"
                                 style="width:30px;margin:0 10px">
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>

        <div class="page-bar"
             style="display:flex;justify-content: center;">
            <div class="page-bar-body"
                 v-if="pageCount>1">
                <ul style="width:410px">
                    <li @click="pageButton('A')">
                        <span>上一页</span>
                    </li>
                    <li v-for="(item,index) in pages"
                        :key="index"
                        @click="pageButton(item)"
                        :class="{'active':pageNow == item}">
                        <span>{{item}}</span>
                    </li>
                    <li @click="pageButton('B')">
                        <span>下一页</span>
                    </li>
                    <li>
                        <span>共<i>{{pageCount}}</i>页</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- Dialog start-->
        <md-dialog :md-active.sync="showDialog"
                   class="linedialog">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:4px">
                <span style="color:#fff">车次管理</span>
            </md-dialog-title>
            <md-dialog-content style="padding: 0 24px 0px 24px;">
                <md-tabs md-dynamic-height>
                    <md-tab md-label="添加车次"
                            style="color:#000">
                        <div style="display:flex;display:-webkit-flex;justify-content: space-evenly;">
                            <div style="border: 3px dashed #448aff;flex-basis: 45%;">
                                <div class="inputboxclass" style="margin-top:10px">
                                    <span>线路名(CH)</span>
                                    <input type="text" v-model="timesname">
                                </div>
                                <div class="inputboxclass">
                                    <span>线路名(EN)</span>
                                    <input type="text" v-model="timesNameEN">
                                </div>
                                <!-- <md-field style="margin:15px auto;width:80%">
                                    <label style="font-size:16px;color: rgba(0, 0, 0, 0.54);">路线名称</label>
                                    <md-input v-model="timesname"
                                              style="border-bottom: 1px solid #000;font-size:16px;height:55px;text-align:center"></md-input>
                                    <span class="md-helper-text"
                                          style="font-size:14px;margin: -10px auto;"
                                          v-if="!timesname">车次标识信息，必填项目</span>
                                </md-field> -->
                                
                                <div class="inputboxclass">
                                    <span>线路备注</span>
                                    <input type="text" v-model="timesnote">
                                </div>

                                <!-- <md-field style="margin:15px auto;width:80%">
                                    <label style="font-size:16px;color: rgba(0, 0, 0, 0.54);">备注</label>
                                    <md-input v-model="timesnote"
                                              style="border-bottom: 1px solid #000;font-size:16px;height:55px;text-align:center"></md-input>
                                </md-field> -->

                                <div style="display:flex;display:-webkit-flex;justify-content: space-evenly;margin-bottom:10px">
                                    <div class="inputboxwithiconclass" @click="openTimePickMethod('start')">
                                        <span class="inputboxwithiconclass-left">预计出车</span>
                                        <!-- <input type="text" v-model="startTimeLimit" disabled> -->
                                        <div>{{startTimeLimit}}</div>
                                        <span class="inputboxwithiconclass-right"><md-icon style="font-size:24px!important">access_time</md-icon></span>
                                    </div>
                                    <div class="inputboxwithiconclass" @click="openTimePickMethod('end')">
                                        <span class="inputboxwithiconclass-left">预计收车</span>
                                        <!-- <input type="text" v-model="endTimeLimit"> -->
                                        <div>{{endTimeLimit}}</div>
                                        <span class="inputboxwithiconclass-right"><md-icon style="font-size:24px!important">access_time</md-icon></span>
                                    </div>
                                </div>
                                

                                <!-- <div style="margin:8px auto;width: 268px;display:flex;display:-webkit-flex;justify-content: space-between;">
                                    <div style="flex-basis:45%;border-bottom: 1px solid rgb(0, 0, 0);">
                                        <div style="font-size:16px;color: rgba(0, 0, 0, 0.54);padding-bottom: 7px;">
                                            <span>预计出车</span>
                                        </div>
                                        <div style="display:flex;display:-webkit-flex;height:32px;cursor: pointer;"
                                             @click="openTimePickMethod('start')">
                                            <div style="font-size:18px;flex-basis: 80%;text-align: center;line-height: 32px;">
                                                <span style="padding-left: 10px;"
                                                      v-if="startTimeLimit">{{startTimeLimit}}</span>
                                                <span style="padding-left: 10px;"
                                                      v-else>Null</span>
                                            </div>
                                            <div style="flex-basis: 20%;text-align:center;line-height: 32px;">
                                                <md-icon style="font-size:30px!important">access_time</md-icon>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="flex-basis:45%;border-bottom: 1px solid rgb(0, 0, 0); */">
                                        <div style="font-size:16px;color: rgba(0, 0, 0, 0.54);padding-bottom: 7px;">
                                            <span>预计收车</span>
                                        </div>
                                        <div style="display:flex;display:-webkit-flex;height:32px;cursor: pointer;"
                                             @click="openTimePickMethod('end')">
                                            <div style="font-size:18px;flex-basis: 80%;text-align: center;line-height: 32px;">
                                                <span style="padding-left: 10px;"
                                                      v-if="endTimeLimit">{{endTimeLimit}}</span>
                                                <span style="padding-left: 10px;"
                                                      v-else>Null</span>
                                            </div>
                                            <div style="flex-basis: 20%;text-align:center;line-height: 32px;">
                                                <md-icon style="font-size:30px!important">access_time</md-icon>
                                            </div>
                                        </div>
                                    </div>

                                </div> -->
                            </div>
                            <div style="border: 3px dashed #448aff;flex-basis: 45%;">
                                <div>
                                    <div style="background:#448aff;color:#fff;text-align: center;">
                                        <span>对应客服后台车次</span>
                                    </div>
                                </div>
                                <div style="display:flex;display:-webkit-flex;flex-wrap: wrap;">
                                    <div v-for="(item,index) in newLine"
                                         :key="index">
                                        <md-button v-if="NcNumber === 0 && item.carNumber === '暂无车次'"
                                                   class="md-raised md-accent"
                                                   style="font-size:16px;min-width:66px;height:30px;"
                                                   @click="choiceNCNum(0)">暂无</md-button>
                                        <md-button v-else-if="item.carNumber === '暂无车次'"
                                                   class="md-raised md-primary"
                                                   style="font-size:16px;min-width:66px;height:30px;"
                                                   @click="choiceNCNum(0)">暂无</md-button>
                                        <md-button v-else-if="NcNumber == item.carNumber"
                                                   class="md-raised md-accent"
                                                   style="font-size:16px;min-width:66px;height:30px;"
                                                   @click="choiceNCNum(item.carNumber)">{{item.carNumber}}</md-button>
                                        <md-button v-else
                                                   class="md-raised md-primary"
                                                   style="font-size:16px;min-width:66px;height:30px;"
                                                   @click="choiceNCNum(item.carNumber)">{{item.carNumber}}</md-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </md-tab>
                    <md-tab md-label="配置车辆"
                            style="font-size:18px;color:#000">
                        <div class="dialog-3"
                             style="border: 3px dashed #448aff;padding: 5px;">
                            <div @click="openChoiceList('car')"
                                 style="margin:0 auto">
                                <div style="width:500px;height:282px;position: relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);overflow: hidden;">
                                    <div>
                                        <img v-if="!acarinfo.image"
                                             src="../../public/img/ebuyLogo.png"
                                             alt="logo"
                                             style="width:100%;height:100%;object-fit: contain;">
                                        <img v-else
                                             :src="acarinfo.image | imgurl"
                                             alt="carphoto"
                                             style="width:100%;height:100%;object-fit: contain;">
                                    </div>
                                    <div style="position: absolute;bottom: 0;background: rgba(0,0,0,0.7);width: 100%;height: 100px;color:#fff">
                                        <div v-if="!acarinfo"
                                             style="text-align: center;">
                                            <span style="font-size:20px;line-height:100px;">{{setCarText}}</span>
                                        </div>
                                        <div v-else>
                                            <div style="font-size:20px;padding: 16px 0 16px 16px;">
                                                <span>车牌：</span>
                                                <span>{{acarinfo.carid}}</span>
                                            </div>
                                            <div style="font-size:18px;display:-webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;">
                                                <div style="padding: 0 36px 0 16px;">
                                                    <span>尾门：</span>
                                                    <span>{{acarinfo.tailgate}}</span>
                                                </div>
                                                <div>
                                                    <span>冷藏：</span>
                                                    <span>{{acarinfo.coolstore}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </md-tab>
                    <md-tab md-label="配置司机"
                            style="font-size:18px;color:#000">
                        <div class="dialog-3"
                             style="border: 3px dashed #448aff;padding: 5px;">

                            <div @click="openChoiceList('driver')"
                                 style="margin:0 auto">
                                <div style="width:500px;height:282px;position: relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);overflow: hidden;">
                                    <div>
                                        <img v-if="!adirverinfo.image"
                                             src="../../public/img/ebuyLogo.png"
                                             alt="logo"
                                             style="width:100%;height:100%;object-fit: contain;">
                                        <img v-else
                                             :src="adirverinfo.image | imgurl"
                                             alt="driverphoto"
                                             style="width:100%;height:100%;object-fit: contain;">
                                    </div>
                                    <div style="position: absolute;bottom: 0;background: rgba(0,0,0,0.7);width: 100%;height: 100px;color:#fff">
                                        <div v-if="!adirverinfo"
                                             style="text-align: center;">
                                            <span style="font-size:20px;line-height:100px;">{{setDriverText}}</span>
                                        </div>
                                        <div v-else>
                                            <div style="font-size:20px;padding: 16px 0 16px 16px;">
                                                <span>姓名：</span>
                                                <span>{{adirverinfo.dirvername}}</span>
                                            </div>
                                            <div style="font-size:18px;display:-webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;">
                                                <div style="padding: 0 36px 0 16px;">
                                                    <span>驾照：</span>
                                                    <span>{{adirverinfo.dirvercard}}</span>
                                                </div>
                                                <div>
                                                    <span>电话：</span>
                                                    <span>{{adirverinfo.dirverphone}}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </md-tab>
                    <md-tab md-label="配置客户"
                            style="padding: 0;">
                        <div style="display:flex;display: -webkit-flex;padding-bottom: 8px;justify-content: space-between;">
                            <div>
                                <input class="clientsearch"
                                       type="text"
                                       v-model="searchClient"
                                       @keyup.enter="searClientMethods"
                                       placeholder="搜索客户名称">
                            </div>

                            <div style="display: -webkit-flex;display: flex;">
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

                                <div style="padding-top:17px">
                                    <md-button class="md-raised"
                                               @click="changeSortModeMethod"
                                               style="font-size:16px;width:80px;height:30px;margin:0">
                                        <span v-if="isShowNcSort">出车排序</span>
                                        <span v-else>客服排序</span>
                                    </md-button>
                                </div>
                            </div>
                        </div>
                        <div style="display: -webkit-flex;display: flex;padding-top:20px;justify-content:space-around">
                            <!-- left window start-->
                            <div style="width:400px">

                                <div style="border: 3px dashed #448aff;padding:10px;position: relative;">
                                    <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 90px;top:-24px">
                                        <span style="line-height:32px;margin:0 auto;margin: 10px 64px;color:#fff;font-size:16px">所有客户</span>
                                    </div>
                                    <div class="tab4-title"
                                         style="height:32px;line-height:30px;margin-bottom: 2px;">
                                        <div class="tab4-title-item"
                                             style="width:40px;">
                                        </div>
                                        <div class="step-third-title-item"
                                             style="width:170px">
                                            <span>客户名称</span>
                                        </div>
                                        <div class="step-third-title-item"
                                             style="width:50px">
                                            <span>服务商</span>
                                        </div>
                                        <div class="step-third-title-item"
                                             style="width:50px">
                                            <span>区域</span>
                                        </div>
                                        <div class="step-third-title-item"
                                             style="width:50px">
                                            <span>信息</span>
                                        </div>
                                    </div>

                                    <div class="tab4-body">
                                        <md-card md-with-hover
                                                 v-for="(item,index) in clientBInfoTable"
                                                 :key="index"
                                                 style="background-color: #f4f4f4">
                                            <md-card-content>
                                                <div style="display:flex">
                                                    <label :for="index"
                                                           class="step-third-title">
                                                        <input type="checkbox"
                                                               :id="index"
                                                               :value="item"
                                                               v-model="choiceclientb"
                                                               style="width:25px;height:25px">
                                                        <span class="step-third-title-item"
                                                              style="width:180px">{{item.clientbname}}</span>
                                                        <span class="step-third-title-item"
                                                              style="width:50px">{{item.clientbserve.clientaname}}</span>
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
                            <!-- left window end-->
                            <!-- right window end-->
                            <div style="padding-left:10px">
                                <div style="border: 3px dashed #448aff;padding:10px;position: relative;">
                                    <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 86px;top:-24px">
                                        <span v-if="!isShowNcSort"
                                              style="line-height:32px;margin:0 auto;margin: 10px 64px;color:#fff">已选客户</span>
                                        <span v-else
                                              style="line-height:32px;margin:0 auto;margin: 10px 64px;color:#fff">客服顺序</span>
                                    </div>
                                    <div class="tab4-title"
                                         style="height:32px;line-height:30px;margin-bottom: 2px;">

                                        <div class="step-third-title-item"
                                             style="width:120px;padding-left:16px;text-align:left">
                                            <span>客户名称</span>
                                        </div>
                                        <div style="width:45px;padding-left:5px">
                                            <span>拍照</span>
                                        </div>
                                        <div style="width:45px;padding-left:5px">
                                            <span>置顶</span>
                                        </div>
                                        <div style="width:45px;padding-left:5px">
                                            <span>置底</span>
                                        </div>
                                        <div style="width:45px;padding-left:5px">
                                            <span>信息</span>
                                        </div>
                                        <div style="width:45px;padding-left:5px">
                                            <span>删除</span>
                                        </div>
                                    </div>
                                    <div class="tab4-body"
                                         style="height:411px;overflow-y:auto;overflow-x: hidden;position:relative;">
                                        <draggable v-model="choiceclientb"
                                                   :options="{group:'choiceclientb'}"
                                                   :move="hasMoved"
                                                   @start="drag=true"
                                                   @end="drag=false">
                                            <md-card md-with-hover
                                                     v-for="(item,index) in choiceclientb"
                                                     :key="index"
                                                     class="choiceClientCard">
                                                <md-card-content>
                                                    <div style="display:flex">
                                                        <div class="step-third-title-item"
                                                             style="width:120px;padding-left:16px;text-align:left">
                                                            <span>{{item.clientbname}}</span>
                                                        </div>
                                                        <div style="width:45px">
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
                                                        <div @click="clientInfoMethod(item)"
                                                             style="width:34px">
                                                            <md-icon class="step-third-title-item"
                                                                     style="width:50px">info</md-icon>
                                                        </div>
                                                        <div @click="removeChoseClient(index)"
                                                             style="width:34px;padding-left:10px">
                                                            <md-icon class="step-third-title-item"
                                                                     style="width:50px">block</md-icon>
                                                        </div>
                                                    </div>
                                                </md-card-content>
                                            </md-card>
                                        </draggable>
                                    </div>
                                </div>
                            </div>
                            <!-- right window end-->
                        </div>
                        <div style="display:flex;justify-content: center;">
                            <div class="client-page-bar"
                                 v-if=" ClientTablePageCount != 1 && ClientTablePageCount">
                                <ul style="width:455px;margin-top: 5px;">
                                    <li @click="clientTablePageButton('A')">
                                        <span>上一页</span>
                                    </li>
                                    <li v-for="(item,index) in clientPages"
                                        :key="index"
                                        @click="clientTablePageButton(item)"
                                        :class="{'active':ClientTablePageNow == item}">
                                        <span>{{item}}</span>
                                    </li>
                                    <li @click="clientTablePageButton('B')">
                                        <span>下一页</span>
                                    </li>
                                    <li>
                                        <span>共<i>{{ClientTablePageCount}}</i>页</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </md-tab>
                </md-tabs>
            </md-dialog-content>
            <md-dialog-actions style="margin:0 auto">
                <md-button class="md-raised md-primary"
                           @click="showDialog = false"
                           style="font-size:18px;width:80px;height:30px">取消</md-button>
                <md-button class="md-raised md-primary"
                           v-if="savemode"
                           @click="addtimes"
                           style="font-size:18px;width:80px;height:30px">保存</md-button>
                <md-button class="md-raised md-primary"
                           v-else
                           @click="confirmEdit"
                           style="font-size:18px;width:80px;height:30px">修改</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- Dialog end-->
        <!-- sort dialog start -->
        <md-dialog :md-active.sync="sortDialog"
                   style="width:500px"
                   class="editdialog">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:4px">
                <span style="color:#fff">车次管理</span>
            </md-dialog-title>
            <md-dialog-content>

                <div style="box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);margin-top: 10px;">
                    <div style="display:flex;display:-webkit-flex;font-size:18px;height:40px;line-height:40px;border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
                        <div style="width:60px;text-align: center;">
                            <span>序号</span>
                        </div>
                        <div style="width:200px;text-align: center;">
                            <span>线路名称</span>
                        </div>
                        <div style="width:200px;text-align: center;">
                            <span>线路备注</span>
                        </div>
                    </div>
                    <div>
                        <draggable v-model="tempAllLineInfo"
                                   :options="{group:'alltimesinfo'}"
                                   @start="drag=true"
                                   @end="drag=false">
                            <md-card md-with-hover
                                     v-for="(item,index) in tempAllLineInfo"
                                     :key="index">
                                <div style="display:flex;display:-webkit-flex;height:40px;line-height:40px">
                                    <div style="width:60px;text-align: center;">
                                        <span>{{index+1}}</span>
                                    </div>
                                    <div style="width:200px;text-align: center;">
                                        <span>{{item.timesname}}</span>
                                    </div>
                                    <div style="width:200px;text-align: center;">
                                        <span>{{item.timesnote}}</span>
                                    </div>
                                </div>
                            </md-card>
                        </draggable>
                    </div>
                </div>

            </md-dialog-content>
            <md-dialog-actions style="margin:0 auto">
                <md-button class="md-raised md-primary"
                           @click="sortDialog = false"
                           style="font-size:18px;width:80px;height:30px">关闭</md-button>
                <md-button class="md-raised md-primary"
                           @click="saveSortMethod"
                           style="font-size:18px;width:80px;height:30px">存储</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- sort dialog end -->
        <!-- remove dialog start-->
        <md-dialog :md-active.sync="removeDialog"
                   style="width:500px;height:376px"
                   class="editdialog">
            <md-dialog-title style="font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">删除路线信息</span>
            </md-dialog-title>
            <div style="margin:0 20px 20px 20px;box-shadow: 2px 2px 5px #636363;overflow:hidden auto">
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>路线名称:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{timesname}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>路线备注:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{timesnote}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>匹配车辆:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{choicecar}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>匹配司机:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{choicedirver}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>客户数量:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{timesclientnumber}}</span>
                    </div>
                </div>
            </div>
            <div style="justify-content: center;display: flex;box-shadow:0 -1px 5px #000">
                <md-dialog-actions style="margin:0 auto 10px auto">
                    <md-button class="md-raised md-primary"
                               @click="removeDialog = false"
                               style="font-size:20px;width:100px;height:40px">关闭</md-button>
                    <md-button class="md-raised md-accent"
                               @click="confirmremove"
                               style="font-size:20px;width:100px;height:40px">删除</md-button>
                </md-dialog-actions>
            </div>
        </md-dialog>
        <!-- remove dialog end-->

        <!-- chose car list dialog start -->
        <md-dialog :md-active.sync="choseCarListDialog">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:4px">
                <span style="color:#fff">车次管理</span>
            </md-dialog-title>
            <md-dialog-content style="padding:5px 24px">
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
                        <div style="width:50px"
                             class="choseListDialog-item">
                            <span>尾门</span>
                        </div>
                        <div style="width:50px"
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
                                      v-model="choicecar"
                                      :value="item._id"
                                      style="margin:0"></md-radio>
                        </div>
                        <label :for="item._id"
                               style="width:100px"
                               class="choseListDialog-item">
                            <span>{{item.carid}}</span>
                        </label>

                        <label :for="item._id"
                               style="width:50px"
                               class="choseListDialog-item">
                            <span>{{item.tailgate}}</span>
                        </label>
                        <label :for="item._id"
                               style="width:50px"
                               class="choseListDialog-item">
                            <span>{{item.coolstore}}</span>
                        </label>
                    </div>
                </div>
            </md-dialog-content>
            <md-dialog-actions style="margin:0 auto;flex-direction:column">
                <!-- <div style="padding-bottom: 8px;">
					<md-button class="md-raised md-primary" @click="dirverChangePageFlag=!dirverChangePageFlag" style="font-size:18px;width:110px;height:30px">查看全部</md-button>
				</div> -->
                <div>
                    <md-button class="md-raised md-primary"
                               @click="choseCarListDialog = false"
                               style="font-size:18px;width:80px;height:30px">取消</md-button>
                    <md-button class="md-raised md-primary"
                               @click="choseACar"
                               style="font-size:18px;width:80px;height:30px">选择</md-button>
                </div>
            </md-dialog-actions>
        </md-dialog>
        <!-- chose car list dialog end -->

        <!-- chose driver list dialog start -->
        <md-dialog :md-active.sync="choseDriverListDialog"
                   style="min-width: 380px;">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:4px">
                <span style="color:#fff">司机选择</span>
            </md-dialog-title>
            <md-dialog-content style="padding:5px 24px">
                <div style="overflow-x:hidden;position:relative;height:320px">
                    <div style="text-align:center;height:25px;line-height:25px;border-bottom:1px solid rgba(0,0,0,.12);margin-bottom:10px">
                        <div v-if="dirverChangePageFlag">常用司机</div>
                        <div v-if="!dirverChangePageFlag">所有司机</div>
                    </div>
                    <transition name="custom-classes-transition"
                                enter-active-class="animated slideInLeft faster"
                                leave-active-class="animated slideOutLeft faster">
                        <div v-if="dirverChangePageFlag"
                             style="position:absolute;left:0;right:0">
                            <div v-if="usedDriverInfo.length != 0">
                                <div class="choseListDialog-body"
                                     style="background-color:#eeeeee;font-weight: bold;">
                                    <div style="width:30px"
                                         class="choseListDialog-item">
                                        <span></span>
                                    </div>
                                    <div style="width:100px"
                                         class="choseListDialog-item">
                                        <span>姓名</span>
                                    </div>
                                    <div style="width:100px"
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
                                                  v-model="choicedirver"
                                                  :value="item._id"
                                                  style="margin:0"></md-radio>
                                    </div>
                                    <label :for="item._id"
                                           style="width:100px"
                                           class="choseListDialog-item"><span>{{item.dirvername}}</span></label>
                                    <label :for="item._id"
                                           style="width:100px"
                                           class="choseListDialog-item"><span>{{item.dirvercard}}</span></label>
                                    <div style="width:100px"
                                         class="choseListDialog-item"
                                         @click="removeUsedDriverMethod(item._id,index)">
                                        <md-icon style="color:red">clear</md-icon>
                                    </div>
                                </div>
                            </div>
                            <div v-else
                                 style="text-align:center">
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
                                <div style="width:100px"
                                     class="choseListDialog-item">
                                    <span>姓名</span>
                                </div>
                                <div style="width:100px"
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
                                              v-model="choicedirver"
                                              :value="item._id"
                                              style="margin:0"></md-radio>
                                </div>
                                <label :for="item._id"
                                       style="width:100px"
                                       class="choseListDialog-item"><span>{{item.dirvername}}</span></label>
                                <label :for="item._id"
                                       style="width:100px"
                                       class="choseListDialog-item"><span>{{item.dirvercard}}</span></label>
                                <label :for="item._id"
                                       style="width:100px"
                                       class="choseListDialog-item"><span>{{item.dirverphone}}</span></label>
                            </div>
                        </div>
                    </transition>
                </div>
            </md-dialog-content>
            <md-dialog-actions style="margin:0 auto;flex-direction:column">
                <div style="padding-bottom: 8px;">
                    <md-button class="md-raised md-primary"
                               @click="dirverChangePageFlag=!dirverChangePageFlag"
                               style="font-size:18px;width:110px;height:30px">
                        <span v-if="dirverChangePageFlag">查看全部</span>
                        <span v-else>查看常用</span>
                    </md-button>
                </div>
                <div>
                    <md-button class="md-raised md-primary"
                               @click="choseDriverListDialog = false"
                               style="font-size:18px;width:80px;height:30px">取消</md-button>
                    <md-button class="md-raised md-primary"
                               @click="choseADriver"
                               style="font-size:18px;width:80px;height:30px">选择</md-button>
                </div>
            </md-dialog-actions>
        </md-dialog>
        <!-- chose driver list dialog end -->

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
        <!-- error start -->
        <md-dialog-alert :md-active.sync="error"
                         :md-content="errorMessage"
                         md-confirm-text="关闭" />
        <!-- error end -->
        <!-- tip box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutLeft">
            <div class="tipDialog"
                 v-if="showTipDialog">
                <div>
                    <span> {{tipMsg}}</span>
                </div>
            </div>
        </transition>
        <!-- tip box end -->

        <!-- confirm box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showConfirmBox"
                 class="confirmbox-back"></div>
        </transition>
        <transition name="confirm-box-transition"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
            <div class="confirmbox-front"
                 v-if="showConfirmBox"
                 @click.self.prevent="showConfirmBox = false">
                <div class="confirmbox-front-box">
                    <div class="confirmbox-front-title">
                        <span>提示</span>
                    </div>
                    <div class="confirmbox-front-center">
                        是否保存修改数据？
                    </div>
                    <div class="confirmbox-front-bottom">
                        <md-button class="md-raised md-primary"
                                   @click="cancelSortMethod"
                                   style="font-size:18px;width:80px;height:30px">取消</md-button>
                        <md-button class="md-raised md-primary"
                                   @click="sortClientMethod"
                                   style="font-size:18px;width:80px;height:30px">保存</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm box end -->

        <!-- pick time box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showTimePick"
                 class="timepick-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showTimePick"
                 class="timepick-front">
                <div class="timepick-box">
                    <div class="timepick-box-title">
                        时间选择
                    </div>
                    <div class="timepick-box-body">
                        <div class="timepickerlist-top">
                            <input type="number"
                                   v-model="choiceH">
                            <span>:</span>
                            <input type="number"
                                   v-model="choiceM">
                        </div>
                        <div class="timepickerlist">
                            <div class="timepickerlist-box">
                                <div v-for="(hour,hourindex) in 24"
                                     :key="hourindex+100"
                                     class="timepickerlist-box-item"
                                     @click="choiceHMethod(hour)">
                                    <span v-if="hour<10">{{'0'+hour}}</span>
                                    <span v-else>{{hour}}</span>
                                </div>
                            </div>
                            <div class="timepickerlist-box">
                                <div v-for="(min, minindex) in 60"
                                     :key="minindex"
                                     class="timepickerlist-box-item"
                                     @click="choiceMMethod(min)">
                                    <span v-if="min<10">{{'0'+min}}</span>
                                    <span v-else>{{min}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showTimePick = false"
                                   style="font-size:18px;min-width:80px;height:30px">关闭</md-button>
                        <md-button class="md-raised md-accent"
                                   @click="confirmChoiceTime"
                                   style="font-size:18px;min-width:80px;height:30px">确认</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- pick time box end -->
        <!-- find more box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showFindMoreBox"
                 class="timepick-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showFindMoreBox"
                 @click.self.prevent="showFindMoreBox = false"
                 class="timepick-front">
                <div class="timepick-box">
                    <div class="timepick-box-title">
                        高级查询
                    </div>
                    <div class="timepick-box-body">
                        <div>
                            <input type="text"
                                   class="advancedinput"
                                   placeholder="请输入客户名"
                                   v-model="advancedfind"
                                   @keyup="findTips">
                        </div>
                        <div class="advancedbox" v-if="tipsClientName.length != 0">
                            <div v-for="(item,index) in tipsClientName"
                                 :key="index"
                                 @click="findAdvincedClient(item)">
                                <div class="advancedbox-item">
                                    {{item.clientbname}}
                                </div>
                            </div>
                        </div>
                        <div v-if="advancedInfo != null" style="font-size:16px" class="advancedInfobox">
                            <div class="advancedInfobox-item">
                                <div class="advancedInfobox-item-left">
                                    <span>所在线路:</span>
                                </div>
                                <div class="advancedInfobox-item-right">
                                    <span>{{advancedInfo.lineInfo.timesname}}</span>
                                </div>
                            </div>
                            <div class="advancedInfobox-item">
                                <div class="advancedInfobox-item-left">
                                    <span>客户名称:</span>
                                </div>
                                <div class="advancedInfobox-item-right">
                                    <span>{{advancedInfo.clientInfo.clientbname}}</span>
                                </div>
                            </div>
                            <div class="advancedInfobox-item">
                                <div class="advancedInfobox-item-left">
                                    <span>客户电话:</span>
                                </div>
                                <div class="advancedInfobox-item-right">
                                    <span>{{advancedInfo.clientInfo.clientbphone}}</span>
                                </div>
                            </div>
                            <div class="advancedInfobox-item">
                                <div class="advancedInfobox-item-left">
                                    <span>客户邮编:</span>
                                </div>
                                <div class="advancedInfobox-item-right">
                                    <span>{{advancedInfo.clientInfo.clientbpostcode}}</span>
                                </div>
                            </div>
                            <div class="advancedInfobox-item">
                                <div class="advancedInfobox-item-left">
                                    <span>客户地址:</span>
                                </div>
                                <div class="advancedInfobox-item-right">
                                    <span>{{advancedInfo.clientInfo.clientbaddress}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised md-primary"
                                   @click="showFindMoreBox = false"
                                   style="font-size:18px;min-width:80px;height:30px">关闭</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- find more box end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";
import _ from "lodash";
import draggable from "vuedraggable";

export default {
    components: {
        draggable
    },
    data() {
        return {
            selectedTimes: "",
            times: [],
            showDialog: false,
            error: false,
            errorMessage: "未知错误请联系更牛逼的人",
            timesname: "",
            timesNameEN:null,
            timesclientnumber: "",
            timesnote: "",
            choicecar: "",
            choicedirver: "",
            allcarinfo: [],
            alldirverinfo: [],
            usedDriverInfo: [],
            allclientbinfo: [],
            alltimesinfo: [],
            acarinfo: "",
            adirverinfo: "",
            aclientainfo: "",
            _id: "",
            savemode: true,
            removeDialog: false,
            choseListDialog: false,
            selectCar: "",
            pageCount: 0,
            ClientTablePageCount: 0,
            pageNow: 1,
            ClientTablePageNow: 1,
            pageSize: 10,
            showItem: 5,
            findMode: false,
            areaArray: [],
            allclientainfo: [],
            clientServe: "",
            clientArea: "",
            choseListDialogRadio: "",
            setCarText: "点击选择车辆",
            setDriverText: "点击选择司机",
            isCarList: true,
            searchClient: "",
            clientBInfoTable: [],
            clientTableMode: "",
            choiceclientb: [],
            clientInfoWindow: false,
            tempClientInfo: "",
            timeOutName: "",
            showTipDialog: false,
            tipMsg: "",
            sortDialog: false,
            tempAllLineInfo: [],
            findBmode: false,
            temparray: [],
            choseCarListDialog: false,
            choseDriverListDialog: false,
            dirverChangePageFlag: true,
            newLine: [],
            NcNumber: null,
            isShowNcSort: false,
            isHasChangeDriverSort: false,
            isHasChangeNcSort: false,
            showConfirmBox: false,
            showTimePick: false,
            timeLimit: null,
            startTimeLimit: null,
            endTimeLimit: null,
            choiceH: null,
            choiceM: null,
            isStartTimeMode: false,
            showFindMoreBox: false,
            advancedfind: null,
            setTimeOutId: null,
            tipsClientName: [],
            advancedInfo:null
        };
    },
    mounted() {
        this.getallcar();
        this.getalldirver();
        this.getalltimes();
    },

    activated() {
        this.getalltimes();
    },

    computed: {
        pages: function() {
            let pag = [];
            if (this.pageNow < this.showItem) {
                //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                let i = Math.min(this.showItem, this.pageCount);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                //当前页数大于显示页数了
                let middle = this.pageNow - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > this.pageCount - this.showItem) {
                    middle = this.pageCount - this.showItem + 1;
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag;
        },
        clientPages: function() {
            let pag = [];
            if (this.ClientTablePageNow < this.showItem) {
                //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                let i = Math.min(this.showItem, this.ClientTablePageCount);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                //当前页数大于显示页数了
                let middle =
                        this.ClientTablePageNow - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > this.ClientTablePageCount - this.showItem) {
                    middle = this.ClientTablePageCount - this.showItem + 1;
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag;
        }
    },
    watch: {
        clientArea: function() {
            this.clientServe = "";
            this.searchClient = "";
            this.clientTableMode = "area";
            this.areaFilterMethod();
        },
        clientServe: function() {
            this.clientArea = "";
            this.searchClient = "";
            this.clientTableMode = "serve";
            this.serveFilterMethod();
        }
    },

    methods: {
        findAdvincedClient(clientInfo) {
            axios
                .post(config.server + "/times/finda", {
                    _id: clientInfo._id
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.lineInfo === null){
                        doc.data.lineInfo={
                            timesname :'未分配'
                        }
                    }
                    this.advancedInfo = doc.data
                    this.tipsClientName = []
                })
                .catch(err => {
                    console.log(err);
                });
        },

        findTips() {
            clearTimeout(this.setTimeOutId);
            this.setTimeOutId = setTimeout(() => {
                axios
                    .post(config.server + "/times/find-tips", {
                        keyWord: this.advancedfind
                    })
                    .then(doc => {
                        console.log(doc);
                        this.tipsClientName = doc.data.doc;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }, 1000);
        },

        findlinebyclient() {
            this.showFindMoreBox = true;
        },

        openTimePickMethod(mode) {
            this.showTimePick = true;
            if (mode === "start") {
                console.log("start");
                this.isStartTimeMode = true;
            } else {
                console.log("end");
                this.isStartTimeMode = false;
            }
        },
        confirmChoiceTime() {
            if (this.isStartTimeMode) {
                console.log("start");
                this.startTimeLimit = this.choiceH + ":" + this.choiceM;
            } else {
                console.log("end");
                this.endTimeLimit = this.choiceH + ":" + this.choiceM;
            }
            this.showTimePick = false;
        },
        choiceHMethod(item) {
            if (item < 10) {
                item = "0" + item;
            }
            this.choiceH = item;
        },
        choiceMMethod(item) {
            if (item < 10) {
                item = "0" + item;
            }
            this.choiceM = item;
        },
        hasMoved() {
            if (this.isShowNcSort) {
                this.isHasChangeNcSort = true;
            } else {
                this.isHasChangeDriverSort = true;
            }
        },
        //sort client start
        cancelSortMethod() {
            this.showConfirmBox = false;
            if (this.isHasChangeNcSort) {
                this.isHasChangeNcSort = false;
                this.choiceclientb = _.orderBy(
                    this.choiceclientb,
                    ["driverSortNum"],
                    ["asc"]
                );
                this.isShowNcSort = false;
            } else {
                this.isHasChangeDriverSort = false;
                this.choiceclientb = _.orderBy(
                    this.choiceclientb,
                    ["NcSortNum"],
                    ["asc"]
                );
                this.isShowNcSort = true;
            }
        },

        changeSortModeMethod() {
            if (this.isHasChangeNcSort || this.isHasChangeDriverSort) {
                //如果 客服排序 或 司机排序有变动
                this.showConfirmBox = true;
            } else {
                if (!this.isShowNcSort) {
                    this.choiceclientb = _.orderBy(
                        this.choiceclientb,
                        ["NcSortNum"],
                        ["asc"]
                    );
                    this.isShowNcSort = true;
                } else {
                    this.choiceclientb = _.orderBy(
                        this.choiceclientb,
                        ["driverSortNum"],
                        ["asc"]
                    );
                    this.isShowNcSort = false;
                }
            }
        },

        sortClientMethod() {
            if (this.isHasChangeNcSort) {
                let clientId = [];
                this.choiceclientb.forEach(element => {
                    clientId.push(element._id);
                });
                axios
                    .post(config.server + "/times/clientsort", {
                        clientId: clientId
                    })
                    .then(doc => {
                        this.isHasChangeNcSort = false;
                        if (doc.data.code === 0) {
                            this.showTipDialog = true;
                            this.tipMsg = "修改客服顺序成功";
                            setTimeout(() => {
                                this.showTipDialog = false;
                            }, 3000);
                        } else {
                            this.showTipDialog = true;
                            this.tipMsg = "修改客服顺序时发生错误";
                            setTimeout(() => {
                                this.showTipDialog = false;
                            }, 3000);
                        }
                        this.showConfirmBox = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                let clientId = [];
                this.choiceclientb.forEach(element => {
                    clientId.push(element._id);
                });
                axios
                    .post(config.server + "/times/driversort", {
                        clientId: clientId
                    })
                    .then(doc => {
                        this.isHasChangeDriverSort = false;
                        if (doc.data.code === 0) {
                            this.showTipDialog = true;
                            this.tipMsg = "修改司机次序成功";
                            setTimeout(() => {
                                this.showTipDialog = false;
                            }, 3000);
                        } else {
                            this.showTipDialog = true;
                            this.tipMsg = "修改司机次序时发生错误";
                            setTimeout(() => {
                                this.showTipDialog = false;
                            }, 3000);
                        }
                        this.showConfirmBox = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        //sort client end
        choiceNCNum(carNum) {
            this.NcNumber = carNum;
        },
        getNewControllerLine() {
            let tempDate = new Date().toDateString();
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
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        toTheTop(item, index) {
            if (this.isShowNcSort) {
                this.isHasChangeNcSort = true;
            } else {
                this.isHasChangeDriverSort = true;
            }
            this.choiceclientb.splice(index, 1);
            this.choiceclientb.unshift(item);
        },
        toTheBottom(item, index) {
            if (this.isShowNcSort) {
                this.isHasChangeNcSort = true;
            } else {
                this.isHasChangeDriverSort = true;
            }
            this.choiceclientb.splice(index, 1);
            this.choiceclientb.push(item);
        },
        changeNeedPicMethod(item) {
            axios
                .post(config.server + "/clientb/needpic", {
                    _id: item._id,
                    isNeedPic: item.isNeedPic
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.tipMsg = "客户状态更新成功";
                        this.showTipDialog = true;
                        this.clientTablePageButton(this.ClientTablePageNow);
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        saveSortMethod() {
            let tempSortArrty = [];
            this.tempAllLineInfo.forEach(element => {
                tempSortArrty.push(element._id);
            });
            axios
                .post(config.server + "/times/sort", {
                    array: tempSortArrty
                })
                .then(doc => {
                    this.sortDialog = false;
                    this.getalltimes();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        sortLineMethod() {
            this.sortDialog = true;
            axios
                .get(config.server + "/times")
                .then(doc => {
                    this.tempAllLineInfo = doc.data.doc;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        removeChoseClient(item) {
            this.choiceclientb.splice(item, 1);
        },
        clientInfoMethod(item) {
            clearTimeout(this.timeOutName);
            this.clientInfoWindow = true;
            this.tempClientInfo = item;
            this.timeOutName = setTimeout(() => {
                this.clientInfoWindow = false;
            }, 10000);
        },
        areaFilterMethod() {
            axios
                .post(config.server + "/clientb/filterpage", {
                    pageSize: this.pageSize,
                    pageNow: this.ClientTablePageNow,
                    clientArea: this.clientArea
                })
                .then(res => {
                    this.clientBInfoTable = res.data.doc;
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
                    pageNow: this.ClientTablePageNow,
                    clientServe: this.clientServe
                })
                .then(res => {
                    this.clientBInfoTable = res.data.doc;
                    this.ClientTablePageCount = Math.ceil(
                        res.data.countNum / this.pageSize
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        },

        openChoiceList(item) {
            if (item === "car") {
                this.choseCarListDialog = true;
                this.isCarList = true;
            } else {
                this.choseDriverListDialog = true;
                this.isCarList = false;
            }
            // this.choseListDialog = true
        },

        choseACar() {
            if (this.choicecar == "") {
                //不做操作
            } else {
                this.acarinfo = this.allcarinfo.find(
                    element => element._id == this.choicecar
                );
            }
            this.choseCarListDialog = false;
        },

        choseADriver() {
            if (this.choicedirver == "") {
                //不做操作
            } else {
                this.adirverinfo = this.alldirverinfo.find(
                    element => element._id == this.choicedirver
                );
            }
            console.log(this.adirverinfo);
            this.choseDriverListDialog = false;
            axios
                .post(config.server + "/times/useddriveradd", {
                    _id: this._id,
                    usedDriver: this.adirverinfo._id
                })
                .then(doc => {
                    console.log("添加常用成功");
                })
                .catch(err => {
                    console.log(err);
                });
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
        search() {
            this.pageNow = 1;
            if (this.selectCar == "") {
                this.findMode = false;
                this.getalltimes();
            } else {
                this.findMode = true;
                axios
                    .post(config.server + "/times/find", {
                        word: this.selectCar,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.alltimesinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                        if (res.data.code === 1) {
                            this.showTipDialog = true;
                            this.tipMsg = res.data.msg;
                            this.selectCar = "";
                            this.getalltimes();
                            setTimeout(() => {
                                this.showTipDialog = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        addbutton() {
            this.getallcar();
            this.getalldirver();
            this.getallclientb();
            this.getAllArea();
            this.getallclienta();
            this.acarinfo = "";
            this._id = "";
            this.timesname = "";
            this.timesNameEN = null
            this.timesnote = "";
            this.choicecar = "";
            this.choicedirver = "";
            this.adirverinfo = "";
            this.startTimeLimit = null;
            this.endTimeLimit = null;
            this.choiceclientb = [];
            this.usedDriverInfo = [];
            this.savemode = true;
            this.showDialog = true;
            this.getNewControllerLine();
        },

        pageButton(item) {
            if (item === "A") {
                if (this.pageNow > 1) {
                    this.pageNow = this.pageNow - 1;
                }
            } else if (item === "B") {
                if (this.pageNow < this.pageCount) {
                    this.pageNow = this.pageNow + 1;
                }
            } else {
                this.pageNow = item;
            }
            if (this.findBmode === false) {
                axios
                    .post(config.server + "/times/get", {
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.alltimesinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios
                    .post(config.server + "/times/find", {
                        word: this.selectCar,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.alltimesinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        clientTablePageButton(item) {
            if (item === "A") {
                if (this.ClientTablePageNow > 1) {
                    this.ClientTablePageNow = this.ClientTablePageNow - 1;
                }
            } else if (item === "B") {
                if (this.ClientTablePageNow < this.ClientTablePageCount) {
                    this.ClientTablePageNow = this.ClientTablePageNow + 1;
                }
            } else {
                this.ClientTablePageNow = item;
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
                        pageNow: this.ClientTablePageNow
                    })
                    .then(res => {
                        this.clientBInfoTable = res.data.doc;
                        this.ClientTablePageCount = Math.ceil(
                            res.data.countNum / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        getalldirver() {
            axios
                .get(config.server + "/dirver")
                .then(res => {
                    this.alldirverinfo = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getallcar() {
            axios
                .get(config.server + "/car")
                .then(res => {
                    this.allcarinfo = res.data;
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
                    this.clientBInfoTable = res.data.doc;
                    this.ClientTablePageCount = Math.ceil(
                        res.data.countNum / this.pageSize
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getalltimes() {
            axios
                .post(config.server + "/times/get", {
                    pageSize: this.pageSize,
                    pageNow: this.pageNow
                })
                .then(res => {
                    this.alltimesinfo = res.data.doc;
                    this.pageCount = Math.ceil(res.data.count / this.pageSize);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getadirver() {
            if (this.choicedirver == "") {
                //不做操作
            } else {
                this.adirverinfo = this.alldirverinfo.find(
                    element => element._id == this.choicedirver
                );
            }
        },
        addtimes() {
            if (!this.timesname) {
                this.errorMessage = "请填写必要信息";
                this.error = true;
                setTimeout(() => {
                    this.error = false;
                }, 3000);
            } else {
                let tempClientArray = [];
                this.choiceclientb.forEach(element => {
                    tempClientArray.push(element._id);
                });
                console.log(tempClientArray);
                axios
                    .post(config.server + "/times", {
                        timesname: this.timesname,
                        timesNameEN: this.timesNameEN,
                        timescar: this.choicecar,
                        timesnote: this.timesnote,
                        timesdirver: this.choicedirver,
                        timesclientb: tempClientArray,
                        logOperator: localStorage.getItem("name"),
                        NcNumber: this.NcNumber,
                        goTime: this.startTimeLimit,
                        backTime: this.endTimeLimit
                    })
                    .then(response => {
                        if (response.data.code == 1) {
                            this.errorMessage = response.data.msg;
                            this.error = true;
                            setTimeout(() => {
                                this.error = false;
                            }, 3000);
                        } else {
                            this.changeclientb();
                            this.errorMessage = response.data.msg;
                            this.error = true;
                            this.showDialog = false;
                            this.timesname = "";
                            this.getalltimes();
                            setTimeout(() => {
                                this.error = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.errorMessage = response.data.msg;
                        this.error = true;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    });
            }

            if (this.isHasChangeNcSort || this.isHasChangeDriverSort) {
                //如果排序
                this.sortClientMethod();
            }
        },
        changeclientb() {
            axios
                .post(config.server + "/clientb/changeline", {
                    choiceclientb: this.choiceclientb,
                    timesname: this.timesname
                })
                .then(res => {
                    if (res.data.code == 1 || res.data.code == 2) {
                        this.errorMessage = res.data.msg;
                        this.error = true;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    } else {
                        this.errorMessage = res.data.msg;
                        this.error = true;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    }
                });
        },
        editbutton(item) {
            this.getallcar();
            this.getalldirver();
            this.getallclientb();
            this.getAllArea();
            this.getallclienta();
            this.NcNumber = item.NcNumber;
            this.getNewControllerLine();
            console.log(item);
            console.log(this.NcNumber);
            this.savemode = false;
            this.showDialog = true;
            this._id = item._id;
            this.timesname = item.timesname;
            this.timesNameEN = item.timesNameEN;
            this.timesnote = item.timesnote;
            this.startTimeLimit = item.goTime;
            this.endTimeLimit = item.backTime;
            this.usedDriverInfo = [];
            this.alldirverinfo.forEach(element => {
                item.usedDriver.forEach(item => {
                    if (item === element._id) {
                        this.usedDriverInfo.push(element);
                    }
                });
            });
            if (item.timescar === null) {
                this.setCarText = "车辆信息错误，请重新选择";
            } else {
                this.choicecar = item.timescar._id;
            }

            if (item.timesdirver === null) {
                this.setDriverText = "司机信息错误，请重新选择";
            } else {
                this.choicedirver = item.timesdirver._id;
            }
            this.choicedirver = item.timesdirver._id;
            this.choiceclientb = item.timesclientb;
            if (this.choicecar == "") {
                //不做操作
            } else {
                this.acarinfo = this.allcarinfo.find(
                    element => element._id == this.choicecar
                );
            }
            if (this.choicedirver == "") {
                //不做操作
            } else {
                this.adirverinfo = this.alldirverinfo.find(
                    element => element._id == this.choicedirver
                );
            }
        },
        confirmEdit() {
            if (!this.timesname) {
                this.errorMessage = "请填写必要信息";
                this.error = true;
                setTimeout(() => {
                    this.error = false;
                }, 3000);
            } else {
                axios
                    .post(config.server + "/times/edit", {
                        _id: this._id,
                        timesname: this.timesname,
                        timesNameEN:this.timesNameEN,
                        timescar: this.choicecar,
                        timesdirver: this.choicedirver,
                        timesclientb: this.choiceclientb,
                        timesclientnumber: this.choiceclientb.length,
                        timesnote: this.timesnote,
                        logOperator: localStorage.getItem("name"),
                        NcNumber: this.NcNumber,
                        goTime: this.startTimeLimit,
                        backTime: this.endTimeLimit
                    })
                    .then(res => {
                        this.tipMsg = res.data.msg;
                        this.showTipDialog = true;
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 3000);
                        if (res.data.code == 0) {
                            this.getalltimes();
                            this.showDialog = false;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.errorMessage = err;
                        this.error = true;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    });
            }
        },
        removebutton(item) {
            this.removeDialog = true;
            this._id = item._id;
            this.timesname = item.timesname;
            this.timesnote = item.timesnote;
            this.choicecar = item.timescar.carid;
            this.choicedirver = item.timesdirver.dirvername;
            this.timesclientnumber = item.timesclientnumber;
        },
        confirmremove() {
            axios
                .post(config.server + "/times/remove", {
                    _id: this._id,
                    logOperator: localStorage.getItem("name")
                })
                .then(res => {
                    this.errorMessage = res.data.msg;
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                    if (res.data.code == 0) {
                        this.removeDialog = false;
                        this.getalltimes();
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.errorMessage = err;
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                });
        },
        searClientMethods() {
            this.clientArea = "";
            this.clientServe = "";
            if (!this.searchClient) {
                this.ClientTablePageNow = 1;
                this.clientBInfoTable = this.allclientbinfo;
                this.clientTableMode = "";
            } else {
                this.clientTableMode = "search";
                axios
                    .post(config.server + "/clientb/page", {
                        keyWord: this.searchClient,
                        pageSize: this.pageSize,
                        pageNow: this.ClientTablePageNow
                    })
                    .then(res => {
                        this.clientBInfoTable = res.data.doc;
                        this.ClientTablePageCount = Math.ceil(
                            res.data.countNum / this.pageSize
                        );
                        if (res.data.code === 1) {
                            this.searchClient = "";
                            this.getallclientb();
                            this.showTipDialog = true;
                            this.tipMsg = "未找到该客户";
                        }
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 3000);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
};
</script>

<style scoped>
#times {
    width: 80%;
    margin: 15px auto;
}

.topbutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.topbutton-left {
    flex-basis: 30%;
    text-align: left;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    position: relative;
    z-index: 1;
}

.findbox {
    margin: 5px auto;
    border-radius: 10px;
    width: 300px;
    height: 35px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 16px;
    border: 1px solid #e0e0e0;
    transition: 0.2s;
}

.findbox:focus {
    transition: 0.2s;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}
.clientsearch {
    margin: 16px auto 0 auto;
    border-radius: 10px;
    width: 250px;
    height: 32px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 16px;
}

.topbutton-right {
    margin: 0 auto;
    flex-basis: 50%;
    text-align: right;
}

.centertable {
    margin: 15px auto;
}

.dialog-3 {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 0 auto;
    width: 90%;
}

.dialog-3-left {
    flex-basis: 30%;
    text-align: center;
    margin: 0 auto;
}

.dialog-3-right {
    flex-basis: 60%;
    text-align: center;
    margin: 0 auto;
}

.tabletitle {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.tabletitle-item {
    margin: 0 auto;
    width: 250px;
    font-size: 18px;
    line-height: 34px;
}

.rmDialog-center {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 20px;
    font-size: 20px;
    width: 100%;
}

.rmDialog-center-left {
    flex-basis: 25%;
    text-align: left;
}

.rmDialog-center-right {
    flex-basis: 60%;
    text-align: left;
}

.tab4-title {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    background-color: rgb(244, 244, 244);
}

.tab4-title-item {
    font-size: 18px;
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
    padding: 4px 10px;
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

.clientInfoWindowclass {
    z-index: 30;
    position: fixed;
    background-color: #fff;
    right: 0;
    bottom: 10px;
}

.choiceClientCard:hover {
    background-color: #eee !important;
}

.confirmbox-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.confirmbox-front {
    z-index: 24;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.confirmbox-front-box {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.confirmbox-front-title {
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    background: #d44950;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.confirmbox-front-center {
    padding-top: 20px;
    padding-bottom: 20px;
}

.findmore-button {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 60px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
    cursor: pointer;
    text-align: center;
    margin-top: 5px;
    position: absolute;
    right: 3px;
    top: 2px;
}

.findmore-button:active {
    box-shadow: none;
    transition: 0.2s;
}

.advancedinput {
    font-size: 16px;
    text-align: center;
    outline: 0;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    height: 30px;
}

.advancedinput:focus {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.advancedbox {
    width: 197px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    position: absolute;
    background: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    z-index: 24;
}

.advancedbox-item {
    cursor: pointer;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    width: 80%;
    margin: 0 auto;
    transition: 0.2s;
}

.advancedbox-item:hover {
    border-bottom: 1px solid #d44950;
    transition: 0.2s;
}

.advancedInfobox {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
}

.advancedInfobox-item{
    display: flex;
    display: -webkit-flex;
    line-height: 30px;
}

.advancedInfobox-item-left{
    flex-basis: 45%;
    color: #6a6a6a;
    text-align: right;
}

.advancedInfobox-item-right{
    padding-left: 10px;
    flex-basis: 55%;
    text-align: left;
}

.inputboxclass{
    display: flex;
    display: -webkit-flex;
    margin: 20px 10px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
}

.inputboxclass span{
    background: #eee;
    border: 1px solid #e0e0e0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #6a6a6a;
    min-width: 100px;
    text-align: center;
}

.inputboxclass input{
    outline: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    text-align: center;
    color: #212121;
    width: 100%;
}

.inputboxwithiconclass{
    display: flex;
    display: -webkit-flex;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
}

.inputboxwithiconclass div{
    outline: none;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    text-align: center;
    color: #212121;
    width: 50px;
}

.inputboxwithiconclass-left{
    background: #eee;
    border: 1px solid #e0e0e0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #6a6a6a;
    width: 70px;
    text-align: center;
}

.inputboxwithiconclass-right{
    background: #eee;
    border: 1px solid #e0e0e0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #6a6a6a;
    width: 30px;
    text-align: center;
}

@media screen and (min-width: 1025px) {
    .linedialog {
        width: 828px;
    }
}
</style>
