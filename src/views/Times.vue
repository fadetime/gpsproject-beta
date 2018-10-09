<template>
    <div id="times">
        <div class="topbutton">
            <div class="topbutton-left">
                <input type="text" v-model="selectCar" @keyup.enter="search" placeholder="搜索车次信息">
            </div>
            <div class="topbutton-right">
                <md-button class="md-raised md-primary" @click="addbutton" style="font-size:20px;width:100px;height:40px;">+ 添加</md-button>
            </div>
        </div>

        <div class="centertable">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item">
                            <span>路线名称</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>包含客户数量</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>备注</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>出车次数</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>操作</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card md-with-hover v-for="(item,index) in alltimesinfo" :key="index" style="background-color: #eff3f5;">
                <md-card-content>
                    <div class="tablebody">
                        <div class="tabletitle-item">
                            <span>{{item.timesname}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.timesclientb.length}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.timesnote}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.timescount}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <img src="../../public/img/icons/edit.png" alt="edit" @click="editbutton(item)" style="width:20px;margin:0 10px">
                            <img src="../..//public/img/icons/dele.png" alt="delete" @click="removebutton(item)" style="width:30px;margin:0 10px">
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>

        <div class="page-bar">
            <div class="page-bar-body" v-if="pageCount>1">
                <ul style="width:410px">
                    <li @click="pageButton('A')">
                        <span>上一页</span>
                    </li>
                    <li v-for="(item,index) in pages" :key="index" @click="pageButton(item)" :class="{'active':pageNow == item}">
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
        <md-dialog :md-active.sync="showDialog" style="width:742px">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:4px">
                <span style="color:#fff">车次管理</span>
            </md-dialog-title>
            <md-dialog-content style="padding: 0 24px 0px 24px;">
                <md-tabs md-dynamic-height>
                    <md-tab md-label="添加车次" style="font-size:18px;color:#000">
                        <div style="border: 3px dashed #eee">
                            <md-field style="margin:45px auto;width:60%">
                                <label style="font-size:20px;color:#000">路线名称</label>
                                <md-input v-model="timesname" style="border-bottom: 1px solid #000;font-size:20px;height:55px;text-align:center"></md-input>
                                <span class="md-helper-text" style="font-size:18px;margin: -10px auto;" v-if="!timesname">车次标识信息，必填项目</span>
                            </md-field>

                            <md-field style="margin:45px auto;width:60%">
                                <label style="font-size:20px;color:#000">备注</label>
                                <md-input v-model="timesnote" style="border-bottom: 1px solid #000;font-size:20px;height:55px;text-align:center"></md-input>
                            </md-field>
                        </div>
                    </md-tab>
                    <md-tab md-label="配置车辆" style="font-size:18px;color:#000">
                        <div class="dialog-3" style="border: 3px dashed #eee;padding: 5px;">
                            <div @click="openChoiceList('car')" style="margin:0 auto">
                                <div style="width:500px;height:282px;position: relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);overflow: hidden;">
                                    <div>
                                        <img v-if="!acarinfo.image" src="../../public/img/ebuyLogo.png" alt="logo" style="width:100%;height:100%;object-fit: contain;">
                                        <img v-else :src="acarinfo.image | imgurl" alt="carphoto" style="width:100%;height:100%;object-fit: contain;">
                                    </div>
                                    <div style="position: absolute;bottom: 0;background: rgba(0,0,0,0.7);width: 100%;height: 100px;color:#fff">
                                        <div v-if="!acarinfo" style="text-align: center;">
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
                    <md-tab md-label="配置司机" style="font-size:18px;color:#000">
                        <div class="dialog-3" style="border: 3px dashed #eee;padding: 5px;">

                            <div @click="openChoiceList('driver')" style="margin:0 auto">
                                <div style="width:500px;height:282px;position: relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);overflow: hidden;">
                                    <div>
                                        <img v-if="!adirverinfo.image" src="../../public/img/ebuyLogo.png" alt="logo" style="width:100%;height:100%;object-fit: contain;">
                                        <img v-else :src="adirverinfo.image | imgurl" alt="driverphoto" style="width:100%;height:100%;object-fit: contain;">
                                    </div>
                                    <div style="position: absolute;bottom: 0;background: rgba(0,0,0,0.7);width: 100%;height: 100px;color:#fff">
                                        <div v-if="!adirverinfo" style="text-align: center;">
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
                    <md-tab md-label="配置客户" style="padding: 0;">
                        <div style="display:flex;display: -webkit-flex;padding-bottom: 8px;justify-content: space-between;">
                            <div>
                                <input class="clientsearch" type="text" v-model="searchClient" @keyup.enter="searClientMethods" placeholder="搜索客户名称">

                            </div>

                            <div style="display: -webkit-flex;display: flex;">
                                <div style="width:160px;padding-left: 10px;">
                                    <md-field style="padding-top:16px;margin: 0;">
                                        <md-select v-model="clientServe" name="clientServe" id="clientServe" placeholder="筛选服务商">
                                            <md-option :value="item._id" v-for="(item,index) in allclientainfo" :key="index">{{item.clientaname}}</md-option>
                                        </md-select>
                                    </md-field>
                                </div>

                                <div style="width:160px;padding-left: 10px;">
                                    <md-field style="padding-top:16px;margin: 0;">
                                        <md-select v-model="clientArea" name="clientArea" id="clientArea" placeholder="筛选客户地区">
                                            <md-option :value="item._id" v-for="(item,index) in areaArray" :key="index">{{item.areaName}}</md-option>
                                        </md-select>
                                    </md-field>
                                </div>

                            </div>

                        </div>
                        <div style="display: -webkit-flex;display: flex;padding-top:20px">
                            <!-- left window start-->
                            <div style="width:400px">

                                <div style="border: 3px dashed #eee;padding:10px;position: relative;">
                                    <div style="background-color: #eee;border-radius: 20px;width: 200px;position: absolute;margin-left: 90px;top:-24px">
                                        <span style="line-height:32px;margin:0 auto;margin: 10px 64px;">所有客户</span>
                                    </div>
                                    <div class="tab4-title" style="height:32px;line-height:30px;margin-bottom: 2px;">
                                        <div class="tab4-title-item" style="width:40px;">
                                        </div>
                                        <div class="step-third-title-item" style="width:170px">
                                            <span>客户名称</span>
                                        </div>
                                        <div class="step-third-title-item" style="width:50px">
                                            <span>服务商</span>
                                        </div>
                                        <div class="step-third-title-item" style="width:50px">
                                            <span>区域</span>
                                        </div>
                                        <div class="step-third-title-item" style="width:50px">
                                            <span>信息</span>
                                        </div>
                                    </div>

                                    <div class="tab4-body">
                                        <md-card md-with-hover v-for="(item,index) in clientBInfoTable" :key="index" style="background-color: #f4f4f4">
                                            <md-card-content>
                                                <div style="display:flex">
                                                    <label :for="index" class="step-third-title">
                                                        <input type="checkbox" :id="index" :value="item" v-model="choiceclientb" style="width:25px;height:25px">
                                                        <span class="step-third-title-item" style="width:180px">{{item.clientbname}}</span>
                                                        <span class="step-third-title-item" style="width:50px">{{item.clientbserve.clientaname}}</span>
                                                        <span class="step-third-title-item" style="width:50px">{{item.clientbarea.areaName}}</span>
                                                    </label>
                                                    <div @click="clientInfoMethod(item)">
                                                        <md-icon class="step-third-title-item" style="width:50px">info</md-icon>
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
                                <div style="border: 3px dashed #eee;padding:10px;position: relative;">
                                    <div style="background-color: #eee;border-radius: 20px;width: 200px;position: absolute;margin-left: 20px;top:-24px">
                                        <span style="line-height:32px;margin:0 auto;margin: 10px 64px;">已选客户</span>
                                    </div>
                                    <div class="tab4-title" style="height:32px;line-height:30px;margin-bottom: 2px;">

                                        <div class="step-third-title-item" style="width:140px">
                                            <span>客户名称</span>
                                        </div>
                                        <div class="step-third-title-item" style="width:40px">
                                            <span>信息</span>
                                        </div>
                                        <div class="step-third-title-item" style="width:40px">
                                            <span>调整</span>
                                        </div>
                                        <div class="step-third-title-item" style="width:40px">
                                            <span>删除</span>
                                        </div>
                                    </div>
                                    <div class="tab4-body" style="height:411px;overflow-y:auto">
                                        <md-card md-with-hover v-for="(item,index) in choiceclientb" :key="index" style="background-color: #f4f4f4">
                                            <md-card-content>
                                                <div style="display:flex">
                                                    <div class="step-third-title-item" style="width:130px">
                                                        <span>{{item.clientbname}}</span>
                                                    </div>
                                                    <div @click="clientInfoMethod(item)">
                                                        <md-icon class="step-third-title-item" style="width:40px">info</md-icon>
                                                    </div>
                                                    <div @click="changeClientDown(index)" class="step-third-title-item" style="width:40px">
                                                        <md-icon v-if="index != choiceclientb.length - 1">swap_vert</md-icon>
                                                    </div>
                                                    <div @click="removeChoseClient(index)">
                                                        <md-icon class="step-third-title-item" style="width:40px">block</md-icon>
                                                    </div>
                                                </div>
                                            </md-card-content>
                                        </md-card>
                                    </div>
                                </div>
                            </div>
                            <!-- right window end-->
                        </div>
                        <div style="display:flex;justify-content: center;">
                            <div class="client-page-bar" v-if=" ClientTablePageCount != 1 && ClientTablePageCount">
                                <ul style="width:455px;margin-top: 5px;">
                                    <li @click="clientTablePageButton('A')">
                                        <span>上一页</span>
                                    </li>
                                    <li v-for="(item,index) in clientPages" :key="index" @click="clientTablePageButton(item)" :class="{'active':ClientTablePageNow == item}">
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
                <md-button class="md-raised md-primary" @click="showDialog = false" style="font-size:18px;width:80px;height:30px">取消</md-button>
                <md-button class="md-raised md-primary" v-if="savemode" @click="addtimes" style="font-size:18px;width:80px;height:30px">保存</md-button>
                <md-button class="md-raised md-primary" v-else @click="confirmEdit" style="font-size:18px;width:80px;height:30px">修改</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- Dialog end-->

        <!-- remove dialog start-->
        <md-dialog :md-active.sync="removeDialog" style="width:500px" class="editdialog">
            <md-dialog-title style="font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">删除路线信息</span>
            </md-dialog-title>
            <div style="margin:0 20px 20px 20px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;overflow:hidden auto">
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
                    <md-button class="md-raised md-primary" @click="removeDialog = false" style="font-size:20px;width:100px;height:40px">关闭</md-button>
                    <md-button class="md-raised md-accent" @click="confirmremove" style="font-size:20px;width:100px;height:40px">删除</md-button>
                </md-dialog-actions>
            </div>
        </md-dialog>
        <!-- remove dialog end-->
        <!-- chose list dialog start -->
        <md-dialog :md-active.sync="choseListDialog">
            <md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:4px">
                <span style="color:#fff">车次管理</span>
            </md-dialog-title>
            <md-dialog-content style="padding:12px 24px">
                <div v-if="isCarList">
                    <div class="choseListDialog-body" style="background-color:#eeeeee;font-weight: bold;">
                        <div style="width:30px" class="choseListDialog-item">
                            <span></span>
                        </div>
                        <div style="width:100px" class="choseListDialog-item">
                            <span>车牌</span>
                        </div>
                        <div style="width:50px" class="choseListDialog-item">
                            <span>尾门</span>
                        </div>
                        <div style="width:50px" class="choseListDialog-item">
                            <span>冷藏</span>
                        </div>
                    </div>
                    <div class="choseListDialog-body" v-for="(item,index) in allcarinfo" :key="index">
                        <div style="width:30px" class="choseListDialog-item">
                            <md-radio v-model="choicecar" :value="item._id" style="margin:0"></md-radio>
                        </div>
                        <div style="width:100px" class="choseListDialog-item">
                            <span>{{item.carid}}</span>
                        </div>
                        <div style="width:50px" class="choseListDialog-item">
                            <span>{{item.tailgate}}</span>
                        </div>
                        <div style="width:50px" class="choseListDialog-item">
                            <span>{{item.coolstore}}</span>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class="choseListDialog-body" style="background-color:#eeeeee;font-weight: bold;">
                        <div style="width:30px" class="choseListDialog-item">
                            <span></span>
                        </div>
                        <div style="width:100px" class="choseListDialog-item">
                            <span>姓名</span>
                        </div>
                        <div style="width:100px" class="choseListDialog-item">
                            <span>驾照</span>
                        </div>
                        <div style="width:100px" class="choseListDialog-item">
                            <span>电话</span>
                        </div>
                    </div>
                    <div class="choseListDialog-body" v-for="(item,index) in alldirverinfo" :key="index">

                        <div style="width:30px" class="choseListDialog-item">
                            <md-radio :id="item._id" v-model="choicedirver" :value="item._id" style="margin:0"></md-radio>
                        </div>
                        <label :for="item._id" style="width:100px" class="choseListDialog-item"><span>{{item.dirvername}}</span></label>
                        <label :for="item._id" style="width:100px" class="choseListDialog-item"><span>{{item.dirvercard}}</span></label>
                        <label :for="item._id" style="width:100px" class="choseListDialog-item"><span>{{item.dirverphone}}</span></label>
                    </div>
                </div>
            </md-dialog-content>
            <md-dialog-actions style="margin:0 auto 10px auto">
                <md-button class="md-raised md-primary" @click="choseListDialog = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
                <md-button class="md-raised md-primary" @click="choseACar" style="font-size:20px;width:100px;height:40px">选择</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- chose list dialog end -->
        <!-- client info window start -->
        <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutRight">
            <div v-if="clientInfoWindow" class="clientInfoWindowclass">
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
        <md-dialog-alert :md-active.sync="error" :md-content="errorMessage" md-confirm-text="关闭" />
        <!-- error end -->
    </div>
</template>

<script>
import axios from 'axios'
import config from '../../public/js/config.js'
import _ from 'lodash'

export default {
  data() {
    return {
      selectedTimes: '',
      times: [],
      showDialog: false,
      error: false,
      errorMessage: '未知错误请联系更牛逼的人',
      timesname: '',
      timesclientnumber: '',
      timesnote: '',
      choicecar: '',
      choicedirver: '',
      allcarinfo: [],
      alldirverinfo: [],
      allclientbinfo: [],
      alltimesinfo: [],
      acarinfo: '',
      adirverinfo: '',
      aclientainfo: '',
      _id: '',
      savemode: true,
      removeDialog: false,
      choseListDialog: false,
      selectCar: '',
      pageCount: 0,
      ClientTablePageCount: 0,
      pageNow: 1,
      ClientTablePageNow: 1,
      pageSize: 10,
      showItem: 5,
      findMode: false,
      areaArray: [],
      allclientainfo: [],
      clientServe: '',
      clientArea: '',
      choseListDialogRadio: '',
      setCarText: '点击选择车辆',
      setDriverText: '点击选择司机',
      isCarList: true,
      searchClient: '',
      clientBInfoTable: [],
      clientTableMode: '',
      choiceclientb: [],
      clientInfoWindow: false,
      tempClientInfo: '',
      timeOutName: ''
    }
  },
  mounted() {
    this.getallcar()
    this.getalldirver()
    this.getallclientb()
    this.getalltimes()
    this.getAllArea()
    this.getallclienta()
  },

  computed: {
    pages: function() {
      let pag = []
      if (this.pageNow < this.showItem) {
        //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        let i = Math.min(this.showItem, this.pageCount)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        //当前页数大于显示页数了
        let middle = this.pageNow - Math.floor(this.showItem / 2), //从哪里开始
          i = this.showItem
        if (middle > this.pageCount - this.showItem) {
          middle = this.pageCount - this.showItem + 1
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag
    },
    clientPages: function() {
      let pag = []
      if (this.ClientTablePageNow < this.showItem) {
        //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        let i = Math.min(this.showItem, this.ClientTablePageCount)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        //当前页数大于显示页数了
        let middle = this.ClientTablePageNow - Math.floor(this.showItem / 2), //从哪里开始
          i = this.showItem
        if (middle > this.ClientTablePageCount - this.showItem) {
          middle = this.ClientTablePageCount - this.showItem + 1
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag
    }
  },
  watch: {
    clientArea: function() {
      this.clientServe = ''
      this.searchClient = ''
      this.clientTableMode = 'area'
      this.areaFilterMethod()
      // if (this.clientArea) {
      //     let newArray = this.allclientbinfo.filter(item => {
      //         return item.clientbarea._id === this.clientArea;
      //     });
      //     let longArray = _.concat(newArray, this.allclientbinfo);
      //     this.clientBInfoTable = _.uniq(longArray);
      // }
    },
    clientServe: function() {
      this.clientArea = ''
      this.searchClient = ''
      this.clientTableMode = 'serve'
      this.serveFilterMethod()
      // if (this.clientServe) {
      //     let newArray = this.allclientbinfo.filter(item => {
      //         return item.clientbserve._id === this.clientServe;
      //     });
      //     let longArray = _.concat(newArray, this.allclientbinfo);
      //     this.clientBInfoTable = _.uniq(longArray);
      // }
    }
  },

  methods: {
    changeClientDown(i) {
      if (i == this.choiceclientb.length - 1) return
      let listClone = this.choiceclientb.slice()
      let one = listClone[i]
      listClone[i] = listClone[i + 1]
      listClone[i + 1] = one
      this.choiceclientb = listClone
    },
    removeChoseClient(item) {
      console.log(item)
      this.choiceclientb.splice(item, 1)
    },
    clientInfoMethod(item) {
      clearTimeout(this.timeOutName)
      this.clientInfoWindow = true
      this.tempClientInfo = item
      // console.log(item)
      this.timeOutName = setTimeout(() => {
        this.clientInfoWindow = false
      }, 10000)
    },
    areaFilterMethod() {
      axios
        .post(config.server + '/clientb/filterpage', {
          pageSize: this.pageSize,
          pageNow: this.ClientTablePageNow,
          clientArea: this.clientArea
        })
        .then(res => {
          this.clientBInfoTable = res.data.doc
          this.ClientTablePageCount = Math.ceil(
            res.data.countNum / this.pageSize
          )
        })
        .catch(err => {
          console.log(err)
        })
    },
    serveFilterMethod() {
      axios
        .post(config.server + '/clientb/filterpage', {
          pageSize: this.pageSize,
          pageNow: this.ClientTablePageNow,
          clientServe: this.clientServe
        })
        .then(res => {
          this.clientBInfoTable = res.data.doc
          this.ClientTablePageCount = Math.ceil(
            res.data.countNum / this.pageSize
          )
        })
        .catch(err => {
          console.log(err)
        })
    },
    openChoiceList(item) {
      if (item === 'car') {
        this.isCarList = true
      } else {
        this.isCarList = false
      }
      this.choseListDialog = true
    },
    choseACar() {
      if (this.isCarList) {
        if (this.choicecar == '') {
          //不做操作
        } else {
          this.acarinfo = this.allcarinfo.find(
            element => element._id == this.choicecar
          )
        }
      } else {
        if (this.choicedirver == '') {
          //不做操作
        } else {
          this.adirverinfo = this.alldirverinfo.find(
            element => element._id == this.choicedirver
          )
        }
      }
      this.choseListDialog = false
    },
    getallclienta() {
      axios
        .get(config.server + '/clienta')
        .then(res => {
          this.allclientainfo = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllArea() {
      axios
        .get(config.server + '/area')
        .then(doc => {
          this.areaArray = doc.data.doc
        })
        .catch(err => {
          console.log(err)
        })
    },
    search() {
      this.pageNow = 1
      if (this.selectCar == '') {
        this.findMode = false
        this.getalltimes()
      } else {
        this.findMode = true
        axios
          .post(config.server + '/times/find', {
            word: this.selectCar,
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.alltimesinfo = res.data.doc
            this.pageCount = Math.ceil(res.data.count / this.pageSize)
            if (res.data.code === 1) {
              this.error = true
              this.errorMessage = res.data.msg
              this.selectCar = ''
              this.getalltimes()
              setTimeout(() => {
                this.error = false
              }, 3000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    addbutton() {
      this.acarinfo = ''
      this._id = ''
      this.timesname = ''
      this.timesnote = ''
      this.choicecar = ''
      this.choicedirver = ''
      this.adirverinfo = ''
      this.choiceclientb = []
      this.savemode = true
      this.showDialog = true
    },

    pageButton(item) {
      if (item === 'A') {
        if (this.pageNow > 1) {
          this.pageNow = this.pageNow - 1
        }
      } else if (item === 'B') {
        if (this.pageNow < this.pageCount) {
          this.pageNow = this.pageNow + 1
        }
      } else {
        this.pageNow = item
      }
      if (this.findBmode === false) {
        axios
          .post(config.server + '/times/get', {
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.alltimesinfo = res.data.doc
            this.pageCount = Math.ceil(res.data.count / this.pageSize)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios
          .post(config.server + '/times/find', {
            word: this.selectCar,
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.alltimesinfo = res.data.doc
            this.pageCount = Math.ceil(res.data.count / this.pageSize)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    clientTablePageButton(item) {
      if (item === 'A') {
        if (this.ClientTablePageNow > 1) {
          this.ClientTablePageNow = this.ClientTablePageNow - 1
        }
      } else if (item === 'B') {
        if (this.ClientTablePageNow < this.ClientTablePageCount) {
          this.ClientTablePageNow = this.ClientTablePageNow + 1
        }
      } else {
        this.ClientTablePageNow = item
      }
      if (this.clientTableMode === 'search') {
        this.searClientMethods()
      } else if (this.clientTableMode === 'area') {
        this.areaFilterMethod()
      } else if (this.clientTableMode === 'serve') {
        this.serveFilterMethod()
      } else {
        axios
          .post(config.server + '/clientb/active', {
            pageSize: this.pageSize,
            pageNow: this.ClientTablePageNow
          })
          .then(res => {
            this.clientBInfoTable = res.data.doc
            this.ClientTablePageCount = Math.ceil(
              res.data.countNum / this.pageSize
            )
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    getalldirver() {
      axios
        .get(config.server + '/dirver')
        .then(res => {
          this.alldirverinfo = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    getallcar() {
      axios
        .get(config.server + '/car')
        .then(res => {
          this.allcarinfo = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    getallclientb() {
      axios
        .post(config.server + '/clientb/active', {
          pageSize: this.pageSize,
          pageNow: 1
        })
        .then(res => {
          this.allclientbinfo = res.data.doc
          this.clientBInfoTable = res.data.doc
          this.ClientTablePageCount = Math.ceil(
            res.data.countNum / this.pageSize
          )
        })
        .catch(err => {
          console.log(err)
        })
    },

    getalltimes() {
      axios
        .post(config.server + '/times/get', {
          pageSize: this.pageSize,
          pageNow: this.pageNow
        })
        .then(res => {
          this.alltimesinfo = res.data.doc
          this.pageCount = Math.ceil(res.data.count / this.pageSize)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getadirver() {
      if (this.choicedirver == '') {
        //不做操作
      } else {
        this.adirverinfo = this.alldirverinfo.find(
          element => element._id == this.choicedirver
        )
      }
    },
    addtimes() {
      if (!this.timesname) {
        this.errorMessage = '请填写必要信息'
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 3000)
      } else {
        let tempClientArray = []
        this.choiceclientb.forEach(element => {
          tempClientArray.push(element._id)
        })
        console.log(tempClientArray)
        axios
          .post(config.server + '/times', {
            timesname: this.timesname,
            timescar: this.choicecar,
            timesnote: this.timesnote,
            timesdirver: this.choicedirver,
            timesclientb: tempClientArray
          })
          .then(response => {
            if (response.data.code == 1) {
              this.errorMessage = response.data.msg
              this.error = true
              setTimeout(() => {
                this.error = false
              }, 3000)
            } else {
              this.changeclientb()
              this.errorMessage = response.data.msg
              this.error = true
              this.showDialog = false
              this.timesname = ''
              this.getalltimes()
              setTimeout(() => {
                this.error = false
              }, 3000)
            }
          })
          .catch(err => {
            console.log(err)
            this.errorMessage = response.data.msg
            this.error = true
            setTimeout(() => {
              this.error = false
            }, 3000)
          })
      }
    },
    changeclientb() {
      axios
        .post(config.server + '/clientb/changeline', {
          choiceclientb: this.choiceclientb,
          timesname: this.timesname
        })
        .then(res => {
          if (res.data.code == 1 || res.data.code == 2) {
            this.errorMessage = res.data.msg
            this.error = true
            setTimeout(() => {
              this.error = false
            }, 3000)
          } else {
            console.log(res.data.msg)
            this.errorMessage = res.data.msg
            this.error = true
            setTimeout(() => {
              this.error = false
            }, 3000)
          }
        })
    },
    editbutton(item) {
      console.log(item)
      this.savemode = false
      this.showDialog = true
      this._id = item._id
      this.timesname = item.timesname
      this.timesnote = item.timesnote
      if (item.timescar === null) {
        this.setCarText = '车辆信息错误，请重新选择'
      } else {
        this.choicecar = item.timescar._id
      }

      if (item.timesdirver === null) {
        this.setDriverText = '司机信息错误，请重新选择'
      } else {
        this.choicedirver = item.timesdirver._id
      }
      this.choicedirver = item.timesdirver._id
      this.choiceclientb = item.timesclientb
      if (this.choicecar == '') {
        //不做操作
      } else {
        this.acarinfo = this.allcarinfo.find(
          element => element._id == this.choicecar
        )
      }
      if (this.choicedirver == '') {
        //不做操作
      } else {
        this.adirverinfo = this.alldirverinfo.find(
          element => element._id == this.choicedirver
        )
      }
    },
    confirmEdit() {
      if (!this.timesname) {
        this.errorMessage = '请填写必要信息'
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 3000)
      } else {
        axios
          .post(config.server + '/times/edit', {
            _id: this._id,
            timesname: this.timesname,
            timescar: this.choicecar,
            timesdirver: this.choicedirver,
            timesclientb: this.choiceclientb,
            timesclientnumber: this.choiceclientb.length,
            timesnote: this.timesnote
          })
          .then(res => {
            this.errorMessage = res.data.msg
            this.error = true
            setTimeout(() => {
              this.error = false
            }, 3000)
            if (res.data.code == 0) {
              this.getalltimes()
              this.showDialog = false
            }
          })
          .catch(err => {
            console.log(err)
            this.errorMessage = err
            this.error = true
            setTimeout(() => {
              this.error = false
            }, 3000)
          })
      }
    },
    removebutton(item) {
      this.removeDialog = true
      this._id = item._id
      this.timesname = item.timesname
      this.timesnote = item.timesnote
      this.choicecar = item.timescar.carid
      this.choicedirver = item.timesdirver.dirvername
      this.timesclientnumber = item.timesclientnumber
    },
    confirmremove() {
      axios
        .post(config.server + '/times/remove', {
          _id: this._id
        })
        .then(res => {
          this.errorMessage = res.data.msg
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 3000)
          if (res.data.code == 0) {
            this.removeDialog = false
            this.getalltimes()
          }
        })
        .catch(err => {
          console.log(err)
          this.errorMessage = err
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 3000)
        })
    },
    searClientMethods() {
      this.clientArea = ''
      this.clientServe = ''
      if (!this.searchClient) {
        this.ClientTablePageNow = 1
        this.clientBInfoTable = this.allclientbinfo
        this.clientTableMode = ''
      } else {
        this.clientTableMode = 'search'
        axios
          .post(config.server + '/clientb/page', {
            keyWord: this.searchClient,
            pageSize: this.pageSize,
            pageNow: this.ClientTablePageNow
          })
          .then(res => {
            this.clientBInfoTable = res.data.doc
            this.ClientTablePageCount = Math.ceil(
              res.data.countNum / this.pageSize
            )
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style scoped>
#times {
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
  flex-basis: 30%;
  text-align: left;
  margin: 0 auto;
}

.topbutton-left input {
  margin: 5px auto;
  border-radius: 10px;
  width: 300px;
  height: 40px;
  text-align: center;
  -web-kit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  font-size: 20px;
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
  margin: 20px auto;
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
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
}

.tabletitle-item {
  margin: 0 auto;
  width: 250px;
  font-size: 20px;
  line-height: 50px;
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
  font-size: 18px;
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
</style>
