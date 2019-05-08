<template>
    <div id="client">
        <div class="topbutton">
            <div class="topbutton-left">
                <input type="text"
                       v-model="searchclientb"
                       @keyup.enter="searchb"
                       placeholder="搜索客户名称"
                       v-if="!clientpage">
                <input type="text"
                       v-model="searchclienta"
                       @keyup.enter="searcha"
                       placeholder="搜索合作商信息"
                       v-else>
            </div>

            <div class="topbutton-center">
                <md-button :class="classA"
                           @click="changepageA"
                           style="font-size:16px;width:80px;height:35px;">合作商页</md-button>
                <md-button :class="classB"
                           @click="changepageB"
                           style="font-size:16px;width:80px;height:35px;">客户页面</md-button>

            </div>
            <div class="topbutton-right">
                <div class="addbutton">
                    <md-button class="md-raised md-primary"
                               @click="showDialog"
                               style="font-size:16px;width:80px;height:35px;">+ 添加</md-button>
                </div>
            </div>

        </div>

        <div class="centertable">
            <div v-if="!clientpage">
                <!-- 客户页面 -->
                <md-card style="background-color: #eff3f5;">
                    <md-card-content>
                        <div class="tabletitle">
                            <div class="tabletitle-item"
                                 style="flex-basis:150px">
                                <span>名称</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:450px">
                                <span>送货地址</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>联系电话</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>邮编</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>状态</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>操作</span>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>

                <md-card md-with-hover
                         v-for="(item,index) in allclientbinfo"
                         :key="index"
                         style="background-color: #eff3f5;">
                    <md-card-content>
                        <div class="tablebody">
                            <div class="tabletitle-item"
                                 style="flex-basis:150px"
                                 @click="editClientB(item)">
                                <span>{{item.clientbname}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:450px"
                                 @click="editClientB(item)">
                                <span>{{item.clientbaddress}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px"
                                 @click="editClientB(item)">
                                <span>{{item.clientbphone}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px"
                                 @click="editClientB(item)">
                                <span>{{item.clientbpostcode}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px"
                                 @click="editClientB(item)">
                                <span>{{item.clientbstatus}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <img src="../../public/img/icons/edit.png"
                                     alt="edit"
                                     @click="editClientB(item)"
                                     style="width:20px;margin:0 10px">
                                <img src="../..//public/img/icons/dele.png"
                                     alt="delete"
                                     @click="removeClientB(item)"
                                     style="width:30px;margin:0 10px">
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div>

            <div v-else>
                <!-- 服务商页面 -->
                <md-card style="background-color: #eff3f5">
                    <md-card-content>
                        <div class="tabletitle">
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>名称</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:300px">
                                <span>送货地址</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>联系电话</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:200px">
                                <span>邮箱</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:150px">
                                <span>合同起始时间</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>合同期限</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>操作</span>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>

                <md-card md-with-hover
                         v-for="(item,index) in allclientainfo"
                         :key="index"
                         style="background-color: #eff3f5;">
                    <md-card-content>
                        <div class="tablebody">
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>{{item.clientaname}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:300px">
                                <span>{{item.clientaaddress}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>{{item.clientaphone}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:200px">
                                <span>{{item.clientamail}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:150px">
                                <span>{{item.clientatime | datefilter}}</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <span>{{item.clientacontract}}个月</span>
                            </div>
                            <div class="tabletitle-item"
                                 style="flex-basis:100px">
                                <img src="../../public/img/icons/edit.png"
                                     alt="edit"
                                     @click="editClientA(item)"
                                     style="width:20px;margin:0 10px">
                                <img src="../..//public/img/icons/dele.png"
                                     alt="delete"
                                     @click="removeClientA(item)"
                                     style="width:30px;margin:0 10px">
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>

        <!-- page bar start-->
        <!-- 合作商页码 -->
        <div v-if="clientpage">
            <div style="display:flex;justify-content: center;"
                 v-if="pageCountA > 1">
                <div class="page-bar">
                    <ul style="width:455px">
                        <li @click="pageButtonA('A')">
                            <span>上一页</span>
                        </li>
                        <li v-for="(item,index) in pagesA"
                            :key="index"
                            @click="pageButtonA(item)">
                            <span v-if="pageNow === item" class="activeblue">{{item}}</span>
                            <span v-else>{{item}}</span>
                        </li>
                        <li @click="pageButtonA('B')">
                            <span>下一页</span>
                        </li>
                        <li>
                            <span>
                                共<i>{{pageCountA}}</i>页
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else><!-- 客户页码 -->
            <div style="display:flex;justify-content: center;"
                 v-if="pageCount > 1">
                <div class="page-bar">
                    <ul style="width:455px">
                        <li @click="pageButtonB('A')">
                            <span>上一页</span>
                        </li>
                        <li v-for="(item,index) in pages"
                            :key="index"
                            @click="pageButtonB(item)">
                            <span v-if="pageNow === item" class="activeblue">{{item}}</span>
                            <span v-else>{{item}}</span>
                        </li>
                        <li @click="pageButtonB('B')">
                            <span>下一页</span>
                        </li>
                        <li>
                            <span>共<i>{{pageCount}}</i>页</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- page bar end-->

        <!-- client dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowClientDialog" class="client_dialog_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowClientDialog" class="client_dialog_front" @click.self.prevent="isShowClientDialog = false">
                <div class="client_dialog_box">
                    <div class="client_dialog_box_title">
                        <span>客户管理</span>
                    </div>
                    <div class="client_dialog_box_body">
                        <div class="client_dialog_box_body_top">
                            <div class="client_dialog_box_body_left">
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>客户名称</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content">
                                        <input type="text" v-model="clientbname" style="text-align:center">
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>英文名称</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content">
                                        <input type="text" v-model="clientbnameEN" style="text-align:center">
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>所属地区</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content"  style="display:flex;display:-webkit-flex">
                                        <div class="client_dialog_choosebox">
                                            <div style="width:100px;display:flex;display:-webkit-flex;justify-content: center;" @click="openChoiseAreaBoxMethod()">
                                                <div v-if="!choseArea" class="client_dialog_choosebox_line" style="width: 60px;">
                                                    <span>请选择</span>
                                                </div>
                                                <div v-else>
                                                    <span>{{choseArea.areaName}}</span>
                                                </div>
                                            </div>
                                            <div class="client_dialog_white_button" style="width:60px;height:28px;line-height:28px;" @click="openAreaWindow">
                                                <span>区域</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>备注信息</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content" style="height: 100px">
                                        <textarea style="width: 160px;border-radius: 5px;height:100px;" v-model="clientNote"></textarea>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="client_dialog_box_body_right">
                                <input type="file"
                                    style="display:none"
                                    id="upload_file"
                                    @change="fileChange($event)"
                                    accept="image/*">
                                <div class="photoarea"
                                    @click="uploadFile"
                                    v-if="!clientImage">
                                    <md-icon class="md-size-3x"
                                            style="padding-top:110px"
                                            v-if="!updateImagePreview">add_a_photo</md-icon>
                                    <img :src="updateImagePreview"
                                        alt="newimg"
                                        v-else
                                        style="height:100%">
                                </div>
                                <div class="photoarea"
                                    @click="uploadFile"
                                    v-else>
                                    <img :src="clientImage | imgurl"
                                        alt="newimg"
                                        style="height:100%">
                                </div>
                            </div>
                        </div>
                        <div class="client_dialog_box_body_center">
                            <div class="client_dialog_box_body_bottom_left">
                                <div class="client_dialog_box_body_left_item" style="margin-top:0">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>客户地址</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content">
                                        <input type="text" v-model="clientbaddress" style="text-align:center">
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>客户电话</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content">
                                        <input type="number" v-model="clientbphone" style="text-align:center">
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>服务商</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content">
                                        <div class="client_dialog_choosebox" @click="isShowChoisePartnerBox = true">
                                            <div v-if="choseaname">
                                                <span>{{choseaname.clientaname}}</span>
                                            </div>
                                            <div v-else class="client_dialog_choosebox_line">
                                                <span>请选择</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>必要拍照</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content">
                                        <div class="client_dialog_choosebox" style="justify-content:space-around">
                                            <div style="display:flex;display:-webkit-flex;height:30px">
                                                <div>
                                                    <input id="radio_need_pic_true" type="radio" style="height:20px;width: 20px;margin-top: 6px;" value="true" v-model="isNeedPic">
                                                </div>
                                                <label for="radio_need_pic_true">
                                                    <div>
                                                        <span>是</span>
                                                    </div>
                                                </label>
                                            </div>
                                            <div style="display:flex;display:-webkit-flex;height:30px">
                                                <div>
                                                    <input id="radio_need_pic_false" type="radio" style="height:20px;width: 20px;margin-top: 6px;" value="false" v-model="isNeedPic">
                                                </div>
                                                <label for="radio_need_pic_false">
                                                    <div>
                                                        <span>否</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="client_dialog_box_body_bottom_right">
                                <div class="client_dialog_box_body_left_item" style="margin-top:0">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>要求时间</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content"  @click="showTimePick = true">
                                        <div class="client_dialog_choosebox">
                                            <div v-if="!timeLimit" class="client_dialog_choosebox_line">
                                                <span>请选择</span>
                                            </div>
                                            <div v-else>
                                                <span>{{timeLimit}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>客户邮编</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content">
                                        <input type="text" v-model="clientbpostcode" style="text-align:center">
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_left_item">
                                    <div class="client_dialog_box_body_left_item_text">
                                        <span>客户状态</span>
                                    </div>
                                    <div class="client_dialog_box_body_left_item_content">
                                        <div class="client_dialog_choosebox">
                                            <div style="display:flex;display:-webkit-flex;height:30px">
                                                <div>
                                                    <input id="radio_need_pic_true" type="radio" style="height:20px;width: 20px;margin-top: 6px;" v-model="clientbstatus" value="active">
                                                </div>
                                                <label for="radio_need_pic_true">
                                                    <div>
                                                        <span>Active</span>
                                                    </div>
                                                </label>
                                            </div>
                                            <div style="display:flex;display:-webkit-flex;height:30px">
                                                <div>
                                                    <input id="radio_need_pic_false" type="radio" style="height:20px;width: 20px;margin-top: 6px;" value="inactive" v-model="clientbstatus">
                                                </div>
                                                <label for="radio_need_pic_false">
                                                    <div>
                                                        <span>Inactive</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="client_dialog_box_body_bottom_basketframe">
                                    <div class="client_dialog_box_body_bottom_basketframe_text">
                                        <span>拖欠框数</span>
                                    </div>
                                    <div class="client_dialog_box_body_bottom_basketframe_content">
                                        <div style="width:100px">
                                            <span v-if="basketNumber">{{basketNumber}}</span>
                                            <span v-else>未输入</span>
                                        </div>
                                        <div class="client_dialog_white_button" style="width:60px;height:26px;font-size:14px;line-height:26px;border: 1px solid #eee;border-radius: 5px;" @click="openEditBasketNumMethod">
                                            <span>修改</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="client_dialog_box_bottom">
                        <div class="client_dialog_white_button" @click="isShowClientDialog = false">
                            <span>取消</span>
                        </div>
                        <div v-if="savemodeb" class="client_dialog_white_button" style="margin-left:12px" @click="addclientb">
                            <span>保存</span>
                        </div>
                        <div v-else class="client_dialog_white_button" style="margin-left:12px" @click="confirmEditClientB">
                            <span>修改</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- client dialog end -->

        <!-- choise area box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChoiseAreaBox" class="client_dialog_back" style="z-index:25"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChoiseAreaBox" class="client_dialog_front" style="z-index:26" @click.self.prevent="isShowChoiseAreaBox = false">
                <div class="client_dialog_box">
                    <div class="client_dialog_box_title">
                        <span>区域选择</span>
                    </div>
                    <div class="client_dialog_body">
                        <div class="client_dialog_white_button" style="margin-bottom:8px;margin-left:4px;margin-right:4px;" v-for="(item,index) in allAreaArray" :key="index" @click="choiseAreaMethod(item)">
                            <span>{{item.areaName}}</span>
                        </div>
                    </div>
                    <div class="client_dialog_box_bottom">
                        <div class="client_dialog_white_button" @click="isShowChoiseAreaBox = false">
                            <span>取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- choise area box end -->

        <!-- choise area box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChoisePartnerBox" class="client_dialog_back" style="z-index:25"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChoisePartnerBox" class="client_dialog_front" style="z-index:26" @click.self.prevent="isShowChoisePartnerBox = false">
                <div class="client_dialog_box">
                    <div class="client_dialog_box_title">
                        <span>服务商选择</span>
                    </div>
                    <div style="margin:12px;">
                        <div class="client_dialog_white_button" style="margin-bottom:8px" v-for="(item,index) in allclientainfo" :key="index" @click="choisePartnerMethod(item)">
                            <span>{{item.clientaname}}</span>
                        </div>
                    </div>
                    <div class="client_dialog_box_bottom">
                        <div class="client_dialog_white_button" @click="isShowChoisePartnerBox = false">
                            <span>取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- choise area box end -->

        <!-- Dialog b start-->
        <md-dialog :md-active.sync="showDialogb"
                   class="showDialogbclass">
            <md-dialog-title style="font-size:18px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:8px 0 8px 24px;margin-bottom:12px">
                <span style="color:#fff">客户管理</span>
            </md-dialog-title>
            <div class="dialogb-body"
                 style="overflow: auto;border: 3px dashed #eee;margin:0 15px">
                <div class="dialogb-body-item"
                     style="padding-top:12px">
                    <div class="dialogb-body-left">
                        <input type="file"
                               style="display:none"
                               id="upload_file"
                               @change="fileChange($event)"
                               accept="image/*">
                        <div class="photoarea"
                             @click="uploadFile"
                             v-if="!clientImage">
                            <md-icon class="md-size-3x"
                                     style="padding-top:110px"
                                     v-if="!updateImagePreview">add_a_photo</md-icon>
                            <img :src="updateImagePreview"
                                 alt="newimg"
                                 v-else
                                 style="height:100%">
                        </div>
                        <div class="photoarea"
                             @click="uploadFile"
                             v-else>
                            <img :src="clientImage | imgurl"
                                 alt="newimg"
                                 style="height:100%">
                        </div>
                    </div>
                    <div class="dialogb-body-right">
                        <md-field style="margin:0px auto"
                                  :class="classname">
                            <label style="font-size:16px">客户名称</label>
                            <md-input v-model="clientbname"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
                            <span class="md-error">客户标识信息，必填项目</span>
                        </md-field>
                        <md-field style="margin:18px auto 0 auto">
                            <label style="font-size:16px">英文名称</label>
                            <md-input v-model="clientbnameEN"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
                        </md-field>
                        <div style="display:flex;width:180px;padding-top:2px">
                            <md-field style="margin:12px auto"
                                      :class="classser">
                                <label for="choseArea"
                                       style="font-size:16px">所属地区</label>
                                <md-select v-model="choseArea"
                                           name="choseArea"
                                           id="choseArea"
                                           style="border-bottom: 1px solid #000;font-size:20px;height:40px;padding-top:6px;width:150px">
                                    <md-option :value="item._id"
                                               v-for="(item,index) in allAreaArray"
                                               :key="index">{{item.areaName}}</md-option>
                                </md-select>
                                <span class="md-error">所属地区</span>
                            </md-field>
                            <md-button :class="classA"
                                       @click="openAreaWindow"
                                       style="font-size:18px;min-width:60px;height:30px;margin-top: 36px;">区域</md-button>
                        </div>

                        <div style="padding-top:2px">
                            <div>
                                <span style="font-size:16px;color:rgba(0,0,0,0.54)">必要拍照</span>
                            </div>
                            <div class="dialogb-body-status"
                                 style="padding-top:7px">
                                <div class="dialogb-body-status-left">
                                    <div>
                                        <input type="radio"
                                               name="needpicradio"
                                               v-model="isNeedPic"
                                               value="true">
                                    </div>
                                    <div style="padding-top: 3px;">
                                        <span style="font-size:16px">是</span>
                                    </div>
                                </div>
                                <div class="dialogb-body-status-right">
                                    <div>
                                        <input type="radio"
                                               name="needpicradio"
                                               v-model="isNeedPic"
                                               value="false">
                                    </div>
                                    <div style="padding-top: 3px;">
                                        <span style="font-size:16px">否</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="dialogb-body-item">
                    <div class="dialogb-body-left">
                        <md-field style="margin:0 auto;padding-top:28px"
                                  :class="classadd">
                            <label style="font-size:16px">客户地址</label>
                            <md-input v-model="clientbaddress"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
                            <span class="md-error">客户地址标识信息</span>
                        </md-field>

                        <md-field style="margin:0 auto;padding-top:24px"
                                  :class="classadd">
                            <label style="font-size:16px">英文备注</label>
                            <md-input v-model="clientNoteEN"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
                            <span class="md-error">客户地址标识信息</span>
                        </md-field>

                        <md-field style="margin:10px auto"
                                  :class="classpho">
                            <label style="font-size:16px">客户电话</label>
                            <md-input v-model="clientbphone"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px"
                                      @change="check_phone($event)"></md-input>
                            <span class="md-error">请输入8位纯数字</span>
                        </md-field>

                        <md-field style="margin:20px auto"
                                  :class="classser">
                            <label for="choseaname"
                                   style="font-size:16px">服务商</label>
                            <md-select v-model="choseaname"
                                       name="choseaname"
                                       id="choseaname"
                                       style="border-bottom: 1px solid #000;font-size:18px;height:44px;padding-top:6px">
                                <md-option :value="item._id"
                                           v-for="(item,index) in allclientainfo"
                                           :key="index">{{item.clientaname}}</md-option>
                            </md-select>
                            <span class="md-error">所属服务商</span>
                        </md-field>
                    </div>
                    <div class="dialogb-body-right">
                        <div style="margin:8px auto;border-bottom:1px solid #000">
                            <div style="font-size:16px;color: rgba(0, 0, 0, 0.54);padding-bottom: 7px;">
                                <span>要求时间</span>
                            </div>
                            <div style="display:flex;display:-webkit-flex;height:32px;cursor: pointer;"
                                 @click="showTimePick = true">
                                <div style="font-size:18px;flex-basis: 80%;text-align: center;line-height: 32px;">
                                    <span v-if="timeLimit">{{timeLimit}}</span>
                                    <span v-else>Null</span>
                                </div>
                                <div style="flex-basis: 20%;text-align:center;line-height: 32px;">
                                    <md-icon style="font-size:30px!important">access_time</md-icon>
                                </div>
                            </div>
                        </div>

                        <md-field style="margin:0 auto"
                                  :class="classadd">
                            <label style="font-size:16px">中文备注</label>
                            <md-input v-model="clientNote"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
                        </md-field>

                        <md-field style="margin:10px auto"
                                  :class="classpos">
                            <label style="font-size:16px">客户邮编</label>
                            <md-input v-model="clientbpostcode"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
                            <span class="md-error">客户邮编标识信息</span>
                        </md-field>

                        <div style="padding-top:10px">
                            <div>
                                <span style="font-size:16px;color:rgba(0,0,0,0.54)">客户状态</span>
                            </div>
                            <div class="dialogb-body-status"
                                 style="padding-top:8px">
                                <div class="dialogb-body-status-left">
                                    <div>
                                        <input type="radio"
                                               name="status"
                                               v-model="clientbstatus"
                                               value="active">
                                    </div>
                                    <div style="padding-top: 3px;">
                                        <span style="font-size:18px">active</span>
                                    </div>
                                </div>
                                <div class="dialogb-body-status-right">
                                    <div>
                                        <input type="radio"
                                               name="status"
                                               v-model="clientbstatus"
                                               value="inactive">
                                    </div>
                                    <div style="padding-top: 3px;">
                                        <span style="font-size:18px">inactive</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom:10px">
                    <div style="display:flex;display:-webkit-flex;justify-content: center;">
                        <div style="height: 30px;line-height: 30px;">
                            <span style="font-size:16px">客户拖欠框数:</span>
                            <span style="font-size:18px;padding-left:10px">{{basketNumber}}</span>
                        </div>
                        <div class="whiteButton"
                             style="margin-left:20px"
                             @click="openEditBasketNumMethod">
                            <span>修改</span>
                        </div>
                    </div>
                </div>
            </div>

            <md-dialog-actions style="margin:2px auto;padding:0">
                <md-button class="md-raised md-primary"
                           @click="showDialogb = false"
                           style="font-size:16px;width:80px;height:30px">取消</md-button>
                <md-button class="md-raised md-primary"
                           v-if="savemodeb"
                           @click="addclientb"
                           style="font-size:16px;width:80px;height:30px">保存</md-button>
                <md-button class="md-raised md-primary"
                           v-else
                           @click="confirmEditClientB"
                           style="font-size:16px;width:80px;height:30px">修改</md-button>
            </md-dialog-actions>

        </md-dialog>
        <!-- Dialog b end-->

        <!-- deleteDialog b start-->
        <md-dialog :md-active.sync="deleteDialogb"
                   style="width:420px;height: 330px;">
            <md-dialog-title style="font-size:18px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:6px 0 6px 24px">
                <span style="color:#fff">删除客户</span>
            </md-dialog-title>
            <div style="margin:0 20px;box-shadow: 2px 2px 5px #636363;overflow:hidden auto">
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>客户名称:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientbname}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>客户地址:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientbaddress}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>客户电话:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientbphone}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>客户状态:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientbstatus}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>客户邮编:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientbpostcode}}</span>
                    </div>
                </div>
            </div>
            <div style="justify-content: center;display: flex">
                <md-dialog-actions style="margin:0 auto">
                    <md-button class="md-raised md-primary"
                               @click="deleteDialogb = false"
                               style="font-size:18px;width:80px;height:30px">取消</md-button>
                    <md-button class="md-raised md-accent"
                               @click="confirmdeleteB"
                               style="font-size:18px;width:80px;height:30px">删除</md-button>
                </md-dialog-actions>
            </div>
        </md-dialog>
        <!-- deleteDialog b end-->

        <!-- Dialog a start-->
        <md-dialog :md-active.sync="showDialoga"
                   class="showDialogaclass">
            <md-dialog-title style="font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom: 8px;">
                <span style="color:#fff">合作商管理</span>
            </md-dialog-title>
            <div style="overflow: auto;position: relative;">
                <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 40px;">
                    <span style="line-height:32px;margin:0 auto;margin: 10px 64px;color:#fff;font-size:16px">基本信息</span>
                </div>
                <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;border: 3px dashed #448aff;margin: 20px 10px;">
                    <div style="flex-basis:45%;margin:0 auto;padding-top:16px">
                        <md-field style="margin:0 auto"
                                  :class="nameclass">
                            <label style="font-size:16px">合作商名称</label>
                            <md-input v-model="clientaname"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"></md-input>
                            <span class="md-error">合作商标识信息，必填项目</span>
                        </md-field>

                        <md-field style="margin:20px auto"
                                  :class="addclass">
                            <label style="font-size:16px">合作商地址</label>
                            <md-input v-model="clientaaddress"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:41px;text-align:center"></md-input>
                            <span class="md-error">合作商地址标识信息，必填项目</span>
                        </md-field>

                        <md-field style="margin:20px auto"
                                  :class="posclass">
                            <label style="font-size:16px">合作商邮编</label>
                            <md-input v-model="clientapostcode"
                                      type="number"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"></md-input>
                            <span class="md-error">合作商邮编标识信息，必填项目</span>
                        </md-field>

                        <md-field style="margin:20px auto"
                                  :class="phoclass">
                            <label style="font-size:16px">合作商电话</label>
                            <md-input v-model="clientaphone"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"
                                      @change="check_phone($event)"></md-input>
                            <span class="md-error">请输入8位纯数字</span>
                        </md-field>

                        <md-field style="margin:20px auto"
                                  :class="timclass">
                            <label style="font-size:16px">合同时间</label>
                            <md-input v-model="clientatime"
                                      type="date"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px;padding-top:21px;text-align:center"></md-input>
                            <span class="md-error">合作商合同起始时间，必填项目</span>
                        </md-field>

                    </div>
                    <div style="flex-basis:45%;margin:0 auto;padding-top: 16px">
                        <md-field style="margin:0 auto"
                                  :class="usrclass">
                            <label style="font-size:16px">合作商账户</label>
                            <md-input v-model="clientausername"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"></md-input>
                            <span class="md-error">合作商登陆账户，必填项目</span>
                        </md-field>

                        <md-field style="margin:20px auto"
                                  :class="pswclass">
                            <label style="font-size:16px">合作商密码</label>
                            <md-input v-model="clientapsw"
                                      type="password"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:41px;text-align:center"></md-input>
                            <span class="md-error">合作商登陆密码，必填项目</span>
                        </md-field>

                        <md-field style="margin:20px auto"
                                  :class="conclass">
                            <label style="font-size:16px">合作期限</label>
                            <md-input v-model="clientacontract"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"
                                      @change="check_phone($event,'date')"></md-input>
                            <span class="md-error">填写有效数字</span>
                            <span style="font-size:16px;line-height:40px">个月</span>
                        </md-field>

                        <md-field style="margin:20px auto"
                                  :class="maiclass">
                            <label style="font-size:16px">合作商邮箱</label>
                            <md-input v-model="clientamail"
                                      type="email"
                                      style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"></md-input>
                            <span class="md-error"
                                  v-if="!clientamail">合作商邮箱标识信息，必填项目</span>
                        </md-field>

                        <div>
                            <div>
                                <span style="font-size:16px;color: rgba(0,0,0,0.54);">合作商状态</span>
                            </div>
                            <div class="dialogb-body-status">
                                <div class="dialogb-body-status-left">
                                    <div>
                                        <input type="radio"
                                               name="statusa"
                                               v-model="clientastatus"
                                               value="active"
                                               id="choseactive" />
                                    </div>
                                    <div style="padding-top: 3px;">
                                        <label for="choseactive"
                                               style="font-size:16px"> active</label>
                                    </div>
                                </div>
                                <div class="dialogb-body-status-right">
                                    <div>
                                        <input type="radio"
                                               name="statusa"
                                               v-model="clientastatus"
                                               value="inactive"
                                               id="choseinactive">
                                    </div>
                                    <div style="padding-top: 3px;">
                                        <label for="choseinactive"
                                               style="font-size:16px"> inactive</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div style="height: 18px;position: relative;">
                    <div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 40px;">
                        <md-switch v-model="openSMS"
                                   style="margin:6px 25px"
                                   @change="openSendSMS">
                            <span style="font-size:16px;color:#fff">短信提醒</span>
                        </md-switch>
                    </div>
                </div>
                <div>
                    <transition name="custom-classes-transition"
                                enter-active-class="animated fadeIn"
                                leave-active-class="animated fadeOut">
                        <div style="border: 3px dashed #448aff;margin: 0 10px;"
                             v-if="openSMS">
                            <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row wrap;flex-flow: row wrap;padding-top:30px">
                                <div style="flex-basis:40%;padding:0 40px">
                                    <span style="font-size:16px">开始时间</span>
                                </div>
                                <div style="flex-basis:40%;padding:0 78px">
                                    <span style="font-size:16px">{{nowDate | datefilter}}</span>
                                </div>
                            </div>
                            <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row wrap;flex-flow: row wrap;">
                                <div style="flex-basis:40%;padding:0 40px;line-height:72px">
                                    <span style="font-size:16px">结束时间</span>
                                </div>
                                <div style="flex-basis:40%;padding:0 40px">
                                    <md-datepicker v-model="selectedSMSDate"
                                                   md-immediately>
                                        <label style="font-size:16px">选择时间</label>
                                    </md-datepicker>
                                </div>
                            </div>
                        </div>
                        <div v-else
                             style="margin: 0px 10px;border-top: 3px dashed #448aff;">
                            <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row wrap;flex-flow: row wrap;padding-top:30px">
                                <div style="flex-basis:40%;padding:0 40px"></div>
                                <div style="flex-basis:40%;padding:0 40px"></div>
                            </div>
                        </div>
                    </transition>
                </div>

            </div>

            <md-dialog-actions style="margin:0 auto 10px auto">
                <md-button class="md-raised md-primary"
                           @click="showDialoga = false"
                           style="font-size:20px;width:100px;height:40px">取消</md-button>
                <md-button class="md-raised md-primary"
                           v-if="savemodeb"
                           @click="addclienta"
                           style="font-size:20px;width:100px;height:40px">保存</md-button>
                <md-button class="md-raised md-primary"
                           v-else
                           @click="confirmEditClientA"
                           style="font-size:20px;width:100px;height:40px">修改</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- Dialog a end-->

        <!-- deleteDialog a start-->
        <md-dialog :md-active.sync="deleteDialoga"
                   style="width:500px;height: 532px;">
            <md-dialog-title style="font-size:18px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">删除合作商</span>
            </md-dialog-title>
            <div style="margin:0 20px 20px 20px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;overflow:hidden auto">
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合作商名称:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientaname}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合作商地址:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientaaddress}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合作商电话:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientaphone}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合作商状态:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientastatus}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合作商邮编:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientapostcode}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合作商账户:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientausername}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合作期限:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientacontract}}年</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合同时间:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientatime}}</span>
                    </div>
                </div>
                <div class="rmDialog-center">
                    <div class="rmDialog-center-left">
                        <span>合作商邮编:</span>
                    </div>
                    <div class="rmDialog-center-right">
                        <span>{{clientamail}}</span>
                    </div>
                </div>
            </div>
            <div style="justify-content: center;display: flex;box-shadow:0 -1px 5px #000">
                <md-dialog-actions style="margin:0 auto 10px auto">
                    <md-button class="md-raised md-primary"
                               @click="deleteDialoga = false"
                               style="font-size:18px;width:80px;height:30px">关闭</md-button>
                    <md-button class="md-raised md-accent"
                               @click="confirmRemoveClientA"
                               style="font-size:18px;width:80px;height:30px">删除</md-button>
                </md-dialog-actions>
            </div>
        </md-dialog>
        <!-- deleteDialog a end-->
        <!-- area window start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInLeft"
                    leave-active-class="animated slideOutLeft">
            <div style="position:fixed;top:0;bottom:0;left:0;background-color:#fff;z-index:25;width:300px;box-shadow:1px 1px 5px"
                 v-if="areaWindow">
                <div class="areawindow-title"
                     style="background-color:#ff5252;height:30px;line-height:30px;box-shadow:1px 1px 5px">
                    <span style="font-size:18px;color:#fff">区域管理</span>
                </div>
                <div style="height:8px">
                    <!-- 顶部占位符 -->
                </div>
                <div style="display:flex;display:-webkit-flex;align-item:center;width:100%;height:100%;justify-content:flex-end">
                    <div style="overflow-y: auto;width:260px"
                         dir="rtl">
                        <div style="box-shadow:1px 1px 5px;margin:10px;border-radius:5px;padding-left: 10px"
                             v-for="(item,index) in allAreaArray"
                             :key="index">
                            <div style="border-bottom:1px solid rgba(0,0,0,0.1);text-align:center;height:30px;line-height:30px;">
                                <span style="font-size:18px">{{item.areaName}}</span>
                            </div>
                            <div style="text-align:center;height:25px;line-height:25px">
                                <span style="font-size:16px;color:rgba(0,0,0,0.54)">{{item.areaDescription}}</span>
                            </div>
                            <div style="text-align:right;padding:0 10px 10px;display:flex;">
                                <div @click="removeArea(item)">
                                    <md-icon>clear</md-icon>
                                </div>
                                <div @click="editArea(item)">
                                    <md-icon style="padding-right:16px">create</md-icon>
                                </div>
                            </div>
                        </div>

                        <div style="height:70px">
                            <!-- 底部占位符 -->
                        </div>

                    </div>
                    <div style="display:flex;display:-webkit-flex;align-items:center;height:100%;border-right: 5px solid #eee;width:40px">
                        <div style="border-top-left-radius: 100%;border-bottom-left-radius: 100%;background-color: #eee;width: 35px;height: 30px;"
                             @click="closeAreaWindowMethod">
                            <md-icon>reply_all</md-icon>
                        </div>
                    </div>
                </div>

                <transition name="custom-classes-transition"
                            enter-active-class="animated slideInUp"
                            leave-active-class="animated slideOutDown">
                    <div v-if="addNewAreaMode"
                         style="position:absolute;bottom:30px;width:100%;box-shadow:1px -1px 5px;border-top-left-radius: 8px;border-top-right-radius: 8px;background-color: #fff;">
                        <div style="height:30px;line-height:30px;border-bottom:1px solid #448aff">
                            <span v-if="!areaEditMode"
                                  style="font-size:18px;color:#448aff">
                                添加区域
                            </span>
                            <span v-else
                                  style="font-size:18px;color:#448aff">
                                修改区域
                            </span>
                        </div>
                        <div style="display:flex;font-size:16px;padding-top:10px">
                            <div style="width:100px">
                                <span>区域名称</span>
                            </div>
                            <div>
                                <input type="text"
                                       style="font-size:16px;border-top: none;border-left: none;border-right: none;border-bottom: 1px solid #696969;text-align:center;color:#2c3e50"
                                       v-model="areaName">
                            </div>
                        </div>
                        <div style="display:flex;font-size:16px;padding-top:10px;padding-bottom:10px">
                            <div style="width:100px">
                                <span>区域描述</span>
                            </div>
                            <div>
                                <input type="text"
                                       style="font-size:16px;border-top: none;border-left: none;border-right: none;border-bottom: 1px solid #696969;text-align:center;color:#2c3e50"
                                       v-model="areaDescription">
                            </div>
                        </div>
                        <div style="background-color:#2f9613;display:flex;box-shadow:1px -1px 5px;justify-content:center;"
                             @click="setupArea">
                            <div style="border:2px solid #fff;border-radius: 100%;height:25px;width:25px;margin-top: 3px">
                                <md-icon style="min-width:20px;height:20px;width:20px;color:#fff">check</md-icon>
                            </div>
                            <span v-if="!areaEditMode"
                                  style="color:#fff;font-size:18px;line-height:30px;padding-left:5px">确认添加</span>
                            <span v-else
                                  style="color:#fff;font-size:18px;line-height:30px;padding-left:5px">确认修改</span>
                        </div>
                    </div>
                </transition>

                <div style="box-shadow:1px -1px 5px;position:absolute;bottom:0;width:100%;height:30px;background-color:#448aff"
                     @click="openNewAreaBox">
                    <transition name="custom-classes-transition"
                                class="list-complete"
                                enter-active-class="animated fadeIn"
                                leave-active-class="animated fadeOut">
                        <div v-if="!addNewAreaMode"
                             style="display:flex;justify-content:center;"
                             key="add">
                            <div style="border:2px solid #fff;border-radius: 100%;height:25px;width:25px;margin-top: 3px">
                                <md-icon style="min-width:20px;height:20px;width:20px;color:#fff">add</md-icon>
                            </div>
                            <span style="font-size:18px;line-height:30px;color:#fff;padding-left:5px">添加区域</span>
                        </div>
                    </transition>
                    <transition name="area-chang-transition"
                                enter-active-class="animated fadeIn"
                                leave-active-class="animated fadeOut">
                        <div v-if="addNewAreaMode"
                             style="display:flex;justify-content:center;"
                             key="reply">
                            <div style="border:2px solid #fff;border-radius: 100%;height:25px;width:25px;margin-top: 3px">
                                <md-icon style="min-width:20px;height:20px;width:20px;color:#fff">reply</md-icon>
                            </div>
                            <span v-if="!areaEditMode"
                                  style="font-size:18px;line-height:30px;color:#fff;padding-left:5px">取消添加</span>
                            <span v-else
                                  style="font-size:18px;line-height:30px;color:#fff;padding-left:5px">取消修改</span>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
        <!-- area window end -->
        <!-- confirmRemove start -->
        <md-dialog :md-active.sync="confirmRemove">
            <md-dialog-title style="font-size:18px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
                <span style="color:#fff">确认删除</span>
            </md-dialog-title>
            <md-dialog-content style="padding: 0 15px 0px;">
                <div style="border: 3px dashed #eee">
                    <div class="removeDialog-body">
                        <div class="removeDialog-body-left">
                            <span>地区名称</span>
                        </div>
                        <div class="removeDialog-body-right">
                            <span>{{areaName}}</span>
                        </div>
                    </div>
                    <div class="removeDialog-body">
                        <div class="removeDialog-body-left">
                            <span>地区描述</span>
                        </div>
                        <div class="removeDialog-body-right">
                            <span>{{areaDescription}}</span>
                        </div>
                    </div>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-raised"
                           @click="confirmRemove = false">关闭</md-button>
                <md-button class="md-raised md-accent"
                           @click="confirmRemoveArea">删除</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- confirmRemove end -->
        <!-- successd mesage start -->
        <md-dialog-alert :md-active.sync="successdmsg"
                         md-content="操作成功"
                         md-confirm-text="关闭" />
        <!-- successd mesage end -->
        <!-- error2 window start -->
        <md-dialog-confirm :md-active.sync="SMSErr"
                           md-title="确认关闭?"
                           md-content="所选供应商含有短信提醒，是否直接关闭？"
                           md-confirm-text="确认"
                           md-cancel-text="取消"
                           @md-confirm="onConfirm" />
        <!-- error2 window end -->
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
        <!-- confirm remove client start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showConfirmRemoveClient"
                 class="confirmRemove-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showConfirmRemoveClient"
                 class="confirmRemove-front">
                <div class="confirmRemove-front-box">
                    <div class="confirmRemove-front-box-top">
                        <span>确认删除</span>
                    </div>
                    <div class="confirmRemove-front-box-center">
                        <div>
                            <span>是否确认删除该数据？</span>
                        </div>
                        <div>
                            {{clientbname}}
                        </div>
                    </div>
                    <div class="confirmRemove-front-box-bottom">
                        <md-button class="md-raised md-primary"
                                   @click="showConfirmRemoveClient = false"
                                   style="font-size:18px;min-width:80px;height:30px">关闭</md-button>
                        <md-button class="md-raised md-accent"
                                   @click="trueConfirmRemoveClient"
                                   style="font-size:18px;min-width:80px;height:30px">删除</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm remove client end -->
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
                            <!-- <span>12:12</span> -->
                        </div>
                        <div class="timepickerlist">
                            <div class="timepickerlist-box">
                                <div v-for="(hour,hourindex) in 24"
                                     :key="hourindex+100"
                                     class="timepickerlist-box-item"
                                     @click="choiceHMethod(hour-1)">
                                    <span v-if="hour - 1 <10">{{'0'+ (hour-1)}}</span>
                                    <span v-else>{{hour-1}}</span>
                                </div>
                            </div>
                            <div class="timepickerlist-box">
                                <div v-for="(min, minindex) in 60"
                                     :key="minindex"
                                     class="timepickerlist-box-item"
                                     @click="choiceMMethod(min-1)">
                                    <span v-if="min - 1 < 10">{{'0'+ (min - 1)}}</span>
                                    <span v-else>{{min-1}}</span>
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

        <!-- edit basket number start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showEditBasketNumBox"
                 class="confirmRemove-back"
                 style="z-index:25"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showEditBasketNumBox"
                 @click.self.prevent="showEditBasketNumBox = false"
                 class="confirmRemove-front"
                 style="z-index:26">
                <div class="confirmRemove-front-box">
                    <div class="confirmRemove-front-box-top">
                        <span>修改拖欠框数</span>
                    </div>
                    <div class="confirmRemove-front-box-center">
                        <div style="display:flex;display:-webkit-flex;margin-bottom:10px;height:30px;line-height:30px">
                            <div>
                                <span style="font-size:16px">当前拖欠数量:</span>
                            </div>
                            <div style="width:70px;text-align:center;padding-left:10px">
                                <span style="font-size:18px">{{basketNumber}}</span>
                            </div>
                        </div>
                        <div style="display:flex;display:-webkit-flex;height:30px;line-height:30px">
                            <div>
                                <span style="font-size:16px">修改拖欠数量:</span>
                            </div>
                            <div style="padding-left:10px">
                                <input v-model="tempBasketNumber"
                                       style="width:60px;text-align:center;font-size:18px;height:30px;border:1px solid #e0e0e0;border-radius: 5px;"
                                       type="text">
                            </div>
                        </div>
                    </div>
                    <div class="confirmRemove-front-box-bottom" style="display:flex;display:-webkit-flex;justify-content: center;">
                        <div class="client_dialog_white_button" @click="showEditBasketNumBox = false">
                            <span>关闭</span>
                        </div>
                        <div class="client_dialog_white_button" @click="confirmEditBasketNumMethod" style="margin-left:8px;margin-bottom:8px">
                            <span>修改</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- edit basket number end -->
        
        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";
import lrz from "lrz";
import tipsBox from "@/components/tipsBox.vue"

export default {
    components:{
        tipsBox
    },

    data() {
        return {
            selectedclient: "",
            clients: [],
            clientpage: false,
            pagestylea: "",
            pagestyleb: "font-weight:bold;",
            allclientainfo: [],
            allclientbinfo: [],
            allAreaArray: [],
            showDialoga: false,
            showDialogb: false,
            classA: "md-raised",
            classB: "md-raised md-primary",
            clientbname: "",
            clientbnameEN: "",
            clientbaddress: "",
            clientbphone: "",
            clientbstatus: "active",
            clientbpostcode: "",
            timeLimit: "",
            successdmsg: false,
            error1: false,
            error2: false,
            erromsg: "发生未知错误",
            clientaname: "",
            clientaaddress: "",
            clientaphone: "",
            clientastatus: "active",
            clientapostcode: "",
            clientausername: "",
            clientapsw: "",
            clientacontract: "",
            clientatime: "",
            clientamail: "",
            choseaname: "",
            choseArea: null,
            _id: "",
            savemodeb: true,
            deleteDialoga: false,
            deleteDialogb: false,
            searchclienta: "",
            searchclientb: "",
            searchedclienta: "",
            searchedclientb: "",
            nameErr: false,
            addErr: false,
            phoErr: false,
            conErr: false,
            posErr: false,
            usrErr: false,
            pswErr: false,
            timErr: false,
            maiErr: false,
            errname: false,
            erradd: false,
            errpho: false,
            errpos: false,
            errser: false,
            pageCount: 0,
            pageCountA: 0,
            pageNow: 1,
            pageSize: 15,
            showItem: 5,
            findAmode: false,
            findBmode: false,
            updateImagePreview: "",
            updateImage: "",
            clientImage: "",
            openSMS: false,
            nowDate: "",
            selectedSMSDate: "",
            SMSErr: false,
            areaWindow: false,
            addNewAreaMode: false,
            areaEditMode: false,
            areaDescription: "",
            confirmRemove: false,
            areaName: "",
            showTipDialog: false,
            tipMsg: "info MSG",
            isNeedPic: false,
            showConfirmRemoveClient: false,
            showTimePick: false,
            choiceH: null,
            choiceM: null,
            clientNote: null,
            clientNoteEN: null,
            basketNumber: null,
            tempBasketNumber: null,
            showEditBasketNumBox: false,
            isShowClientDialog:false,
            isShowChoiseAreaBox:false,
            isShowChoisePartnerBox:false,
            tipsShowColor:null,
            tipsInfo:null,
            isShowTipsBox:null,
        };
    },
    mounted() {
        this.getallclienta();
        this.getallclientb();
        this.getAllarea();
    },
    computed: {
        pagesA: function() {
            let pag = [];
            if (this.pageNow < this.showItem) {
                //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                let i = Math.min(this.showItem, this.pageCountA);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                //当前页数大于显示页数了
                let middle = this.pageNow - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > this.pageCountA - this.showItem) {
                    middle = this.pageCountA - this.showItem + 1;
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag;
        },

        pages: function() {
            let pag = [];
            if (this.pageNow < this.showItem) {
                let i = Math.min(this.showItem, this.pageCount);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                let middle = this.pageNow - Math.floor(this.showItem / 2),
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

        nameclass() {
            return {
                "md-invalid": this.nameErr
            };
        },

        addclass() {
            return {
                "md-invalid": this.addErr
            };
        },

        phoclass() {
            return {
                "md-invalid": this.phoErr
            };
        },
        conclass() {
            return {
                "md-invalid": this.conErr
            };
        },
        posclass() {
            return {
                "md-invalid": this.posErr
            };
        },
        usrclass() {
            return {
                "md-invalid": this.usrErr
            };
        },
        pswclass() {
            return {
                "md-invalid": this.pswErr
            };
        },
        timclass() {
            return {
                "md-invalid": this.timErr
            };
        },
        maiclass() {
            return {
                "md-invalid": this.maiErr
            };
        },
        classname() {
            return {
                "md-invalid": this.errname
            };
        },
        classadd() {
            return {
                "md-invalid": this.erradd
            };
        },
        classpho() {
            return {
                "md-invalid": this.errpho
            };
        },
        classpos() {
            return {
                "md-invalid": this.errpos
            };
        },
        classser() {
            return {
                "md-invalid": this.errser
            };
        }
    },
    methods: {
        choisePartnerMethod(item){
            this.choseaname = item
            this.isShowChoisePartnerBox = false
        },

        choiseAreaMethod(item){
            console.log(item)
            this.choseArea = item
            this.isShowChoiseAreaBox = false
        },

        openChoiseAreaBoxMethod(){
            this.isShowChoiseAreaBox = true
        },

        confirmEditBasketNumMethod() {
            axios
                .post(config.server + "/clientb/basket", {
                    _id:this._id,
                    basket: this.tempBasketNumber
                })
                .then(res => {
                    if(res.data.code === 0){
                        this.tipMsg = '修改成功'
                        this.showTipDialog = true
                        this.basketNumber = this.tempBasketNumber
                        this.showEditBasketNumBox = false
                        setTimeout(() => {
                            this.showTipDialog = false
                        }, 3000);
                    }else{
                        this.tipMsg = '修改失败'
                        setTimeout(() => {
                            this.showTipDialog = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        openEditBasketNumMethod() {
            this.showEditBasketNumBox = true;
            this.tempBasketNumber = this.basketNumber;
        },

        confirmChoiceTime() {
            this.timeLimit = this.choiceH + ":" + this.choiceM;
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

        openNewAreaBox() {
            if (this.addNewAreaMode) {
                this.addNewAreaMode = false;
                this.areaName = "";
                this.areaDescription = "";
            } else {
                this.areaEditMode = false;
                this.addNewAreaMode = true;
            }
        },

        openAreaWindow() {
            this.areaWindow = true;
        },

        setupArea() {
            if (!this.areaEditMode) {
                this.saveArea();
            } else {
                this.confirmEditArea();
            }
        },

        saveArea() {
            axios
                .post(config.server + "/area/post", {
                    areaName: this.areaName,
                    areaDescription: this.areaDescription
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.getAllarea();
                        this.tipMsg = "新增区域成功";
                        this.showTipDialog = true;
                        this.addNewAreaMode = false;
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 2000);
                    } else {
                        console.log(doc);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        confirmEditArea() {
            axios
                .post(config.server + "/area/update", {
                    areaName: this.areaName,
                    areaDescription: this.areaDescription,
                    _id: this._id
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.tipMsg = "区域修改成功";
                        this.addNewAreaMode = false;
                    } else if (doc.data.code === 1) {
                        this.tipMsg = doc.data.msg;
                    } else {
                        this.tipMsg = "出现错误";
                        this.addNewAreaMode = false;
                        console.log(doc.data.error);
                    }
                    this.showTipDialog = true;
                    this.getAllarea();
                    setTimeout(() => {
                        this.showTipDialog = false;
                    }, 2000);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        confirmRemoveArea() {
            axios
                .post(config.server + "/area/remove", {
                    _id: this._id
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.tipMsg = "区域删除成功";
                        this.confirmRemove = false;
                    } else {
                        this.tipMsg = "出现错误";
                        this.confirmRemove = false;
                        console.log(doc.data.error);
                    }
                    this.showTipDialog = true;
                    this.getAllarea();
                    setTimeout(() => {
                        this.showTipDialog = false;
                    }, 2000);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        removeArea(item) {
            this.areaName = item.areaName;
            this.areaDescription = item.areaDescription;
            this._id = item._id;
            this.confirmRemove = true;
        },

        editArea(item) {
            console.log(item);
            this.areaEditMode = true;
            this.addNewAreaMode = true;
            this.areaName = item.areaName;
            this._id = item._id;
            this.areaDescription = item.areaDescription;
        },

        closeAreaWindowMethod() {
            this.areaWindow = false;
            this.addNewAreaMode = false;
        },

        getAllarea() {
            axios
                .get(config.server + "/area/")
                .then(doc => {
                    this.allAreaArray = doc.data.doc;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        onConfirm() {
            this.SMSErr = false;
            this.openSMS = false;
            this.selectedSMSDate = "";
            axios
                .post(config.server + "/clienta/sms/remove", {
                    _id: this._id
                })
                .then(doc => {
                    console.log(doc);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        openSendSMS() {
            if (this.openSMS) {
                this.nowDate = new Date();
            } else {
                if (this.selectedSMSDate) {
                    this.openSMS = true;
                    this.SMSErr = true;
                }
            }
        },

        uploadFile() {
            document.getElementById("upload_file").click();
        },

        fileChange(el) {
            if (typeof FileReader === "undefined") {
                return alert("浏览器不支持上传图片");
            }
            console.log("###");
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            );
            this.updateImage = el.target.files[0];
            this.clientImage = "";
            el.target.value = "";
        },

        check_phone(event, type) {
            if (type === "date") {
                let value = event.target.value;
                if (!/^[1-9]*$/.test(value)) {
                    this.conErr = true;
                } else {
                    this.conErr = false;
                }
            } else {
                let value = event.target.value;
                if (!/^[0-9]{8}$/.test(value)) {
                    this.phoErr = true;
                    this.errpho = true;
                } else {
                    this.phoErr = false;
                    this.errpho = false;
                }
            }
        },

        pageButtonA(item) {
            // console.log(this.pageNow)
            if (item === "A") {
                if (this.pageNow > 1) {
                    this.pageNow = this.pageNow - 1;
                }
            } else if (item === "B") {
                if (this.pageNow < this.pageCountA) {
                    this.pageNow = this.pageNow + 1;
                }
            } else {
                this.pageNow = item;
            }
            if (this.findAmode === false) {
                axios
                    .post(config.server + "/clienta/get", {
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allclientainfo = res.data.doc;
                        this.pageCountA = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios
                    .post(config.server + "/clienta/find", {
                        word: this.searchclienta,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allclientainfo = res.data.doc;
                        this.pageCountA = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        pageButtonB(item) {
            // console.log(this.pageNow)
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
                    .post(config.server + "/clientb/get", {
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allclientbinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios
                    .post(config.server + "/clientb/find", {
                        word: this.searchclientb,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allclientbinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        searcha() {
            this.pageNow = 1;
            if (this.searchclienta == "") {
                this.findAmode = false;
                this.getallclienta();
            } else {
                this.findAmode = true;
                axios
                    .post(config.server + "/clienta/find", {
                        word: this.searchclienta,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allclientainfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                        if (res.data.code === 1) {
                            this.showTipDialog = true;
                            this.tipMsg = res.data.msg;
                            this.searchclienta = "";
                            this.getallclienta();
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
        searchb() {
            this.pageNow = 1;
            if (this.searchclientb == "") {
                this.findBmode = false;
                this.getallclientb();
            } else {
                this.findBmode = true;
                axios
                    .post(config.server + "/clientb/find", {
                        word: this.searchclientb,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allclientbinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                        if (res.data.code === 1) {
                            this.showTipDialog = true;
                            this.tipMsg = res.data.msg;
                            this.searchclientb = "";
                            this.getallclientb();
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
        changepageA() {
            this.clientpage = true;
            this.pagestylea = "font-weight:bold;";
            this.pagestyleb = "";
            this.classA = "md-raised md-primary";
            this.classB = "md-raised";
            this.pageNow = 1;
            this.searchclienta = "";
            this.getallclienta();
        },
        changepageB() {
            this.clientpage = false;
            this.pagestyleb = "font-weight:bold;";
            this.pagestylea = "";
            this.classA = "md-raised";
            this.classB = "md-raised md-primary";
            this.pageNow = 1;
            this.searchclientb = "";
            this.getallclientb();
        },

        showDialog() {
            if (!this.clientpage) {
                this.savemodeb = true;
                this.isShowClientDialog = true;
                this.clientbname = "";
                this.clientbnameEN = "";
                this.clientbaddress = "";
                this.clientbphone = "";
                this.clientbpostcode = "";
                this.timeLimit = "";
                this.clientbserve = "";
                this.choseArea = "";
                this.updateImagePreview = "";
                this.updateImage = "";
                this.clientImage = "";
            } else {
                this.phoErr = false;
                this.savemodeb = true;
                this.showDialoga = true;
                this.clientaname = "";
                this.clientaaddress = "";
                this.clientaphone = "";
                this.clientapostcode = "";
                this.clientausername = "";
                this.clientapsw = "";
                this.clientacontract = "";
                this.clientatime = "";
                this.clientamail = "";
            }
        },

        getallclienta() {
            axios
                .post(config.server + "/clienta/get", {
                    pageSize: this.pageSize,
                    pageNow: this.pageNow
                })
                .then(res => {
                    this.allclientainfo = res.data.doc;
                    this.pageCountA = Math.ceil(res.data.count / this.pageSize);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getallclientb() {
            axios
                .post(config.server + "/clientb/get", {
                    pageSize: this.pageSize,
                    pageNow: this.pageNow
                })
                .then(res => {
                    this.allclientbinfo = res.data.doc;
                    this.pageCount = Math.ceil(res.data.count / this.pageSize);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        addclienta() {
            this.selectedSMSDate = "";
            if (this.openSMS) {
                let tempDate = new Date();
                if (
                    !this.clientaname ||
                    !this.clientaaddress ||
                    !this.clientaphone ||
                    this.conErr ||
                    !this.clientapostcode ||
                    !this.clientausername ||
                    !this.clientapsw ||
                    this.phoErr ||
                    !this.clientacontract ||
                    !this.clientatime ||
                    !this.clientamail ||
                    !this.selectedSMSDate ||
                    this.selectedSMSDate < tempDate
                ) {
                    if (!this.clientaname) {
                        this.nameErr = true;
                    } else {
                        this.nameErr = false;
                    }
                    if (!this.clientaaddress) {
                        this.addErr = true;
                    } else {
                        this.addErr = false;
                    }
                    if (!this.clientaphone) {
                        this.phoErr = true;
                    }
                    if (!this.clientacontract) {
                        this.conErr = true;
                    }
                    if (!this.clientapostcode) {
                        this.posErr = true;
                    } else {
                        this.posErr = false;
                    }
                    if (!this.clientausername) {
                        this.usrErr = true;
                    } else {
                        this.usrErr = false;
                    }
                    if (!this.clientapsw) {
                        this.pswErr = true;
                    } else {
                        this.pswErr = false;
                    }
                    if (!this.clientatime) {
                        this.timErr = true;
                    } else {
                        this.timErr = false;
                    }
                    if (!this.clientamail) {
                        this.maiErr = true;
                    } else {
                        this.maiErr = false;
                    }
                    if (!this.selectedSMSDate) {
                        this.error = true;
                        this.erromsg = "结束时间不应为空";
                    } else if (this.selectedSMSDate < tempDate) {
                        this.error = true;
                        this.erromsg = "所选日期应大于今天";
                    }
                    setTimeout(() => {
                        this.error = false;
                    }, 2000);
                } else {
                    this.nameErr = false;
                    this.addErr = false;
                    this.phoErr = false;
                    this.conErr = false;
                    this.posErr = false;
                    this.usrErr = false;
                    this.pswErr = false;
                    this.timErr = false;
                    this.maiErr = false;

                    axios
                        .post(config.server + "/clienta", {
                            clientaname: this.clientaname,
                            clientaaddress: this.clientaaddress,
                            clientaphone: this.clientaphone,
                            clientastatus: this.clientastatus,
                            clientapostcode: this.clientapostcode,
                            clientausername: this.clientausername,
                            clientapsw: this.clientapsw,
                            clientacontract: this.clientacontract,
                            clientatime: this.clientatime,
                            clientamail: this.clientamail,
                            logOperator: localStorage.getItem("name")
                        })
                        .then(response => {
                            if (response.data.code == 1) {
                                this.tipsShowColor = 'green'
                                this.tipsInfo = response.data.msg
                                this.isShowTipsBox = true
                                setTimeout(() => {
                                    this.isShowTipsBox = false;
                                }, 3000);
                            } else if (response.data.code == 2) {
                                this.tipsShowColor = 'green'
                                this.tipsInfo = response.data.msg
                                this.isShowTipsBox = true
                                setTimeout(() => {
                                    this.isShowTipsBox = false;
                                }, 3000);
                            } else {
                                this.successdmsg = true;
                                this.showDialoga = false;
                                this.clientaname = "";
                                this.clientaaddress = "";
                                this.clientaphone = "";
                                this.clientastatus = "";
                                this.clientapostcode = "";
                                this.clientausername = "";
                                this.clientapsw = "";
                                this.clientacontract = "";
                                this.clientatime = "";
                                this.clientamail = "";
                                this.getallclienta();
                                setTimeout(() => {
                                    this.successdmsg = false;
                                }, 3000);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            } else {
                if (
                    !this.clientaname ||
                    !this.clientaaddress ||
                    !this.clientaphone ||
                    this.conErr ||
                    !this.clientapostcode ||
                    !this.clientausername ||
                    !this.clientapsw ||
                    this.phoErr ||
                    !this.clientacontract ||
                    !this.clientatime ||
                    !this.clientamail
                ) {
                    if (!this.clientaname) {
                        this.nameErr = true;
                    } else {
                        this.nameErr = false;
                    }
                    if (!this.clientaaddress) {
                        this.addErr = true;
                    } else {
                        this.addErr = false;
                    }
                    if (!this.clientaphone) {
                        this.phoErr = true;
                    }
                    if (!this.clientacontract) {
                        this.conErr = true;
                    }
                    if (!this.clientapostcode) {
                        this.posErr = true;
                    } else {
                        this.posErr = false;
                    }
                    if (!this.clientausername) {
                        this.usrErr = true;
                    } else {
                        this.usrErr = false;
                    }
                    if (!this.clientapsw) {
                        this.pswErr = true;
                    } else {
                        this.pswErr = false;
                    }
                    if (!this.clientatime) {
                        this.timErr = true;
                    } else {
                        this.timErr = false;
                    }
                    if (!this.clientamail) {
                        this.maiErr = true;
                    } else {
                        this.maiErr = false;
                    }
                } else {
                    this.nameErr = false;
                    this.addErr = false;
                    this.phoErr = false;
                    this.conErr = false;
                    this.posErr = false;
                    this.usrErr = false;
                    this.pswErr = false;
                    this.timErr = false;
                    this.maiErr = false;

                    axios
                        .post(config.server + "/clienta", {
                            clientaname: this.clientaname,
                            clientaaddress: this.clientaaddress,
                            clientaphone: this.clientaphone,
                            clientastatus: this.clientastatus,
                            clientapostcode: this.clientapostcode,
                            clientausername: this.clientausername,
                            clientapsw: this.clientapsw,
                            clientacontract: this.clientacontract,
                            clientatime: this.clientatime,
                            clientamail: this.clientamail,
                            logOperator: localStorage.getItem("name")
                        })
                        .then(response => {
                            if (response.data.code == 1) {
                                this.tipsShowColor = 'yellow'
                                this.tipsInfo = response.data.msg
                                this.isShowTipsBox = true
                                setTimeout(() => {
                                    this.isShowTipsBox = false;
                                }, 3000);
                            } else if (response.data.code == 2) {
                                this.tipsShowColor = 'yellow'
                                this.tipsInfo = response.data.msg
                                this.isShowTipsBox = true
                                setTimeout(() => {
                                    this.isShowTipsBox = false;
                                }, 3000);
                            } else {
                                this.successdmsg = true;
                                this.showDialoga = false;
                                this.clientaname = "";
                                this.clientaaddress = "";
                                this.clientaphone = "";
                                this.clientastatus = "";
                                this.clientapostcode = "";
                                this.clientausername = "";
                                this.clientapsw = "";
                                this.clientacontract = "";
                                this.clientatime = "";
                                this.clientamail = "";
                                this.getallclienta();
                                setTimeout(() => {
                                    this.successdmsg = false;
                                }, 3000);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        },

        addclientb() {
            if (
                !this.clientbname ||
                !this.clientbaddress ||
                !this.clientbphone ||
                !this.clientbpostcode ||
                !this.choseaname ||
                this.errpho
            ) {
                if (!this.clientbname) {
                    // this.errname = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写客户名'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
                if (!this.clientbaddress) {
                    // this.erradd = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写客户地址'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
                if (!this.clientbphone) {
                    // this.errpho = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写电话号码'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
                if (!this.clientbpostcode) {
                    // this.errpos = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写邮政编码'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
                if (!this.choseaname) {
                    // this.errser = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填服务商'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
            } else {
                let payload = new FormData();
                if (this.updateImagePreview) {
                    let maxSize = 200 * 1024; //200KB

                    lrz(this.updateImage, {
                        quality: 0.5
                    }).then(res => {
                        if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                        }
                    });
                    payload.append("image", this.updateImage);
                }
                payload.append("clientbname", this.clientbname);
                payload.append("clientbnameEN", this.clientbnameEN);
                payload.append("clientbaddress", this.clientbaddress);
                payload.append("clientbphone", this.clientbphone);
                payload.append("clientbstatus", this.clientbstatus);
                payload.append("clientbpostcode", this.clientbpostcode);
                payload.append("timeLimit", this.timeLimit);
                payload.append("clientbserve", this.choseaname._id);
                payload.append("clientbarea", this.choseArea._id);
                payload.append("isNeedPic", this.isNeedPic);
                payload.append("note", this.clientNote);
                payload.append("noteEN", this.clientNoteEN);
                payload.append("logOperator", localStorage.getItem("name"));
                axios({
                    method: "post",
                    url: config.server + "/clientb",
                    data: payload,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(response => {
                        if (response.data.code == 0) {
                            this.tipsShowColor = 'green'
                            this.tipsInfo = '添加成功'
                            this.isShowTipsBox = true
                            this.isShowClientDialog = false
                            this.isNeedPic = false;
                            this.clientbname = "";
                            this.clientbaddress = "";
                            this.clientbphone = "";
                            this.clientbstatus = "";
                            this.clientbpostcode = "";
                            this.timeLimit = "";
                            this.getallclientb();
                            setTimeout(() => {
                                this.isShowTipsBox = false;
                            }, 2000);
                        } else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = response.data.msg
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false;
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        editClientB(item) {
            this.clientImage = "";
            this.updateImagePreview = "";
            this.savemodeb = false;
            this.isShowClientDialog = true
            this._id = item._id;
            this.clientbname = item.clientbname;
            this.clientbnameEN = item.clientbnameEN;
            this.clientbaddress = item.clientbaddress;
            this.clientbphone = item.clientbphone;
            this.clientbstatus = item.clientbstatus;
            this.clientbpostcode = item.clientbpostcode;
            this.timeLimit = item.timeLimit;
            this.clientImage = item.image;
            this.isNeedPic = item.isNeedPic;
            this.clientNote = item.note;
            this.clientNoteEN = item.noteEN;
            this.basketNumber = item.basket;
            if (item.clientbserve == null) {
                this.choseaname = "";
                this.tipsShowColor = 'yellow'
                this.tipsInfo = "找不到此供应商信息，请重新选择"
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false;
                }, 3000);
            } else {
                this.choseaname = item.clientbserve;
            }
            if (item.clientbarea == null) {
                this.choseArea = "";
                this.tipsShowColor = 'yellow'
                this.tipsInfo = "找不到此供应商信息，请重新选择"
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false;
                }, 3000);
            } else {
                this.choseArea = item.clientbarea;
            }
        },

        confirmEditClientB() {
            if (
                !this.clientbname ||
                !this.clientbaddress ||
                !this.clientbphone ||
                !this.clientbpostcode ||
                !this.choseaname ||
                this.errpho
            ) {
                if (!this.clientbname) {
                    // this.errname = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写客户名'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
                if (!this.clientbaddress) {
                    // this.erradd = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写客户地址'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
                if (!this.clientbphone) {
                    // this.errpho = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写电话号码'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
                if (!this.clientbpostcode) {
                    // this.errpos = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写邮政编码'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
                if (!this.choseaname) {
                    // this.errser = true;
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '请填写服务商'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                }
            } else {
                if (this.updateImagePreview) {
                    let payload = new FormData();
                    let maxSize = 200 * 1024; //200KB
                    lrz(this.updateImage, {
                        quality: 0.5
                    }).then(res => {
                        if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                        }
                        payload.append("image", this.updateImage);
                        payload.append("_id", this._id);
                        axios({
                            method: "post",
                            url: config.server + "/clientb/update/img",
                            data: payload,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                            .then(doc => {
                                // console.log(doc)
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                }
                axios
                    .post(config.server + "/clientb/edit", {
                        _id: this._id,
                        clientbname: this.clientbname,
                        clientbnameEN: this.clientbnameEN,
                        clientbaddress: this.clientbaddress,
                        clientbphone: this.clientbphone,
                        clientbstatus: this.clientbstatus,
                        clientbpostcode: this.clientbpostcode,
                        timeLimit: this.timeLimit,
                        clientbserve: this.choseaname._id,
                        clientbarea: this.choseArea._id,
                        isNeedPic: this.isNeedPic,
                        note: this.clientNote,
                        noteEN: this.clientNoteEN,
                        logOperator: localStorage.getItem("name")
                    })
                    .then(doc => {
                        if (doc.data.code == 0) {
                            this.tipsShowColor = 'green'
                            this.tipsInfo = doc.data.msg
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false;
                            }, 3000);
                            this.isShowClientDialog = false
                            this.isNeedPic = false;
                            this.getallclientb();
                        }else{
                            this.tipsShowColor = 'green'
                            this.tipsInfo = '修改时出现错误'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        },

        removeClientB(item) {
            this.deleteDialogb = true;
            this._id = item._id;
            this.clientbname = item.clientbname;
            this.clientbaddress = item.clientbaddress;
            this.clientbphone = item.clientbphone;
            this.clientbstatus = item.clientbstatus;
            this.clientbpostcode = item.clientbpostcode;
            this.timeLimit = item.timeLimit;
            this.clientbserve = item.clientbserve;
        },
        confirmdeleteB() {
            this.showConfirmRemoveClient = true;
            this.deleteDialogb = false;
        },

        trueConfirmRemoveClient() {
            axios
                .post(config.server + "/clientb/remove", {
                    _id: this._id,
                    logOperator: localStorage.getItem("name")
                })
                .then(doc => {
                    this.tipsShowColor = 'green'
                    this.tipsInfo = doc.data.msg
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                    if (doc.data.code == 0) {
                        this.showConfirmRemoveClient = false;
                        this.getallclientb();
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        },
        editClientA(item) {
            this.openSMS = false;
            this.nowDate = "";
            this.selectedSMSDate = "";
            this.conErr = false;
            this.phoErr = false;
            this.savemodeb = false;
            this._id = item._id;
            this.clientaname = item.clientaname;
            this.clientaaddress = item.clientaaddress;
            this.clientaphone = item.clientaphone;
            this.clientastatus = item.clientastatus;
            this.clientapostcode = item.clientapostcode;
            this.clientausername = item.clientausername;
            this.clientapsw = "";
            this.clientacontract = item.clientacontract;
            let year = new Date(item.clientatime).getFullYear();
            let month = new Date(item.clientatime).getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            let day = new Date(item.clientatime).getDate();
            if (day < 10) {
                day = "0" + day;
            }
            this.clientatime = year + "-" + month + "-" + day;
            this.clientamail = item.clientamail;
            //get SMS information start
            axios
                .post(config.server + "/clienta/sms", {
                    _id: item._id
                })
                .then(doc => {
                    console.log(doc);
                    if (doc.data.document.endDate) {
                        this.openSMS = true;
                        this.nowDate = doc.data.document.startDate;
                        this.selectedSMSDate = doc.data.document.endDate;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            //get SMS information start
            this.showDialoga = true;
        },
        removeClientA(item) {
            this.deleteDialoga = true;
            this._id = item._id;
            this.clientaname = item.clientaname;
            this.clientaaddress = item.clientaaddress;
            this.clientaphone = item.clientaphone;
            this.clientastatus = item.clientastatus;
            this.clientapostcode = item.clientapostcode;
            this.clientausername = item.clientausername;
            this.clientacontract = item.clientacontract;
            this.clientatime = new Date(item.clientatime).toLocaleDateString();
            this.clientamail = item.clientamail;
        },
        confirmEditClientA() {
            if (
                !this.clientaname ||
                !this.clientaaddress ||
                !this.clientaphone ||
                this.conErr ||
                !this.clientapostcode ||
                !this.clientausername ||
                !this.clientacontract ||
                !this.clientatime ||
                !this.clientamail ||
                this.phoErr
            ) {
                if (!this.clientaname) {
                    this.nameErr = true;
                } else {
                    this.nameErr = false;
                }
                if (!this.clientaaddress) {
                    this.addErr = true;
                } else {
                    this.addErr = false;
                }
                if (!this.clientaphone) {
                    this.phoErr = true;
                }
                if (!this.clientacontract) {
                    this.conErr = true;
                }
                if (!this.clientapostcode) {
                    this.posErr = true;
                } else {
                    this.posErr = false;
                }
                if (!this.clientausername) {
                    this.usrErr = true;
                } else {
                    this.usrErr = false;
                }
                if (!this.clientatime) {
                    this.timErr = true;
                } else {
                    this.timErr = false;
                }
                if (!this.clientamail) {
                    this.maiErr = true;
                } else {
                    this.maiErr = false;
                }
            } else {
                let editInfo;
                if (this.clientapsw) {
                    editInfo = {
                        _id: this._id,
                        clientaname: this.clientaname,
                        clientaaddress: this.clientaaddress,
                        clientaphone: this.clientaphone,
                        clientastatus: this.clientastatus,
                        clientapostcode: this.clientapostcode,
                        clientausername: this.clientausername,
                        clientapsw: this.clientapsw,
                        clientacontract: this.clientacontract,
                        clientatime: this.clientatime,
                        clientamail: this.clientamail,
                        startDate: this.nowDate,
                        endDate: this.selectedSMSDate,
                        logOperator: localStorage.getItem("name")
                    };
                } else {
                    editInfo = {
                        _id: this._id,
                        clientaname: this.clientaname,
                        clientaaddress: this.clientaaddress,
                        clientaphone: this.clientaphone,
                        clientastatus: this.clientastatus,
                        clientapostcode: this.clientapostcode,
                        clientausername: this.clientausername,
                        clientacontract: this.clientacontract,
                        clientatime: this.clientatime,
                        clientamail: this.clientamail,
                        startDate: this.nowDate,
                        endDate: this.selectedSMSDate,
                        logOperator: localStorage.getItem("name")
                    };
                }
                axios
                    .post(config.server + "/clienta/edit", editInfo)
                    .then(doc => {
                        this.tipsShowColor = 'green'
                        this.tipsInfo = doc.data.msg
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000);
                        if (doc.data.code == 0) {
                            this.showDialoga = false;
                            this.getallclienta();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        confirmRemoveClientA() {
            axios
                .post(config.server + "/clienta/remove", {
                    _id: this._id,
                    logOperator: localStorage.getItem("name")
                })
                .then(doc => {
                    this.tipsShowColor = 'green'
                    this.tipsInfo = doc.data.msg
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                    if (doc.data.code == 0) {
                        this.deleteDialoga = false;
                        this.getallclienta();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style>
#client {
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
    flex-basis: 30%;
    text-align: left;
    margin: 0 auto;
}

.topbutton-left input {
    margin: 5px auto;
    border-radius: 10px;
    width: 300px;
    height: 35px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 16px;
}

.topbutton-center {
    flex-basis: 40%;
    text-align: center;
    margin: 0 auto;
}

.topbutton-right {
    flex-basis: 30%;
    text-align: right;
}

.centertable {
    margin: 15px auto;
}

.tabletitle {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    font-size: 18px;
    font-weight: 600;
    height: 40px;
    line-height: 35px;
}

.tabletitle-item {
    margin: 0 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    font-size: 16px;
    line-height: 24px;
}

.rmDialog-center {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 20px;
    font-size: 16px;
    width: 100%;
}

.rmDialog-center-left {
    flex-basis: 20%;
    text-align: left;
}

.rmDialog-center-right {
    flex-basis: 80%;
    text-align: left;
}

.dialogb-body-item {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.dialogb-body-left {
    flex-basis: 40%;
    margin: 0 auto;
}

.dialogb-body-right {
    flex-basis: 40%;
    margin: 0 auto;
}

.dialogb-body-status {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    padding-top: 4px;
    border-bottom: 1px solid #000;
}

.dialogb-body-status-left {
    flex-basis: 45%;
    margin: 0 auto;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.dialogb-body-status-left input {
    width: 20px;
    height: 20px;
}

.dialogb-body-status-right {
    flex-basis: 45%;
    margin: 0 auto;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.dialogb-body-status-right input {
    width: 20px;
    height: 20px;
}

.page-bar ul li {
    margin: 0;
    padding: 0;
}

.page-bar li {
    list-style: none;
}

.page-bar span {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    /* color: #337ab7; */
    cursor: pointer;
}

/* .page-bar span:hover {
    background-color: #eee;
} */

.page-bar .active span {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}

.activeblue {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}

.page-bar i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}

.photoarea {
    margin-top: 12px;
    margin-left: 10px;
    text-align: center;
    border: 3px dashed #696969;
    width: 226px;
    height: 226px;
    background-color: #eee;
    border-radius: 5px;
}

.photoarea img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.removeDialog-body {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    margin: 5px 5px;
}

.removeDialog-body-left {
    flex-basis: 35%;
}
.removeDialog-body-right {
    flex-basis: 60%;
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

.confirmRemove-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.confirmRemove-front {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    justify-content: center;
    align-items: center;
}

.confirmRemove-front-box {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    overflow: hidden;
}

.confirmRemove-front-box-top {
    font-size: 16px;
    height: 35px;
    background: #d44950;
    color: #fff;
    line-height: 35px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.confirmRemove-front-box-center {
    margin: 12px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.timepick-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.timepick-front {
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

.timepick-box {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.timepick-box-title {
    font-size: 18px;
    height: 35px;
    line-height: 35px;
    background: #d44950;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.timepick-box-body {
    padding: 18px;
}

.timepickerlist-top {
    font-size: 18px;
    border: 2px solid rgba(0, 0, 0, 0.12);
}

.timepickerlist-top input {
    border: none;
    width: 70px;
    font-size: 18px;
    text-align: center;
}

.timepickerlist-top span {
    font-weight: 700;
}

.timepickerlist {
    display: flex;
    display: -webkit-flex;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.timepickerlist-box {
    width: 75px;
    height: 100px;
    overflow: auto;
}

.timepickerlist-box-item {
    cursor: pointer;
    background: #fff;
}

.timepickerlist-box-item span {
    width: 100%;
}

.timepickerlist-box-item:hover {
    background: rgba(68, 138, 255, 0.3);
}

.whiteButton {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid #e0e0e0;
    transition: 0.2s;
    border-radius: 10px;
    text-align: center;
}

.whiteButton:active {
    box-shadow: none;
    transition: 0.2s;
}

.client_dialog_back{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 23;
    background-color: rgba(0, 0, 0, 0.12)
}

.client_dialog_front{
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

.client_dialog_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.client_dialog_box_title{
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    height: 40px;
    line-height: 40px;
}

.client_dialog_body{
    margin:12px;
    display: flex;
    display: -webkit-flex;
    width: 342px;
    flex-shrink: 1;
    flex-wrap: wrap;
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}

.client_dialog_box_body{
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    margin: 12px 24px;
    padding: 12px;
    border-radius: 10px;
}

.client_dialog_box_body_top{
    display: flex;
    display: -webkit-flex;
}

.client_dialog_box_body_left_item{
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    line-height: 30px;
    margin: 12px 0;
}

.client_dialog_box_body_left_item input{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 30px;
    width: 160px;
}

.client_dialog_box_body_left_item_text{
    width: 70px;
    text-align: right;
}

.client_dialog_box_body_left_item_content{
    margin-left: 10px;
    text-align: center;
}

.client_dialog_choosebox{
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    width: 160px;
    height: 30px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.client_dialog_choosebox_line{
    height: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    line-height: 20px;
}

.client_dialog_box_body_right{
    margin-left: 12px;
}

.client_dialog_box_bottom{
    display: flex;
    display: -webkit-flex;
}

.client_dialog_box_body_center{
    display: flex;
    display: -webkit-flex;
}

.client_dialog_box_body_bottom_right{
    margin-left: 12px;
}

.client_dialog_box_body_bottom{
    display: flex;
    display: -webkit-flex;
}

.client_dialog_box_body_bottom_basketframe{
    display: flex;
    display: -webkit-flex;
}

.client_dialog_box_body_bottom_basketframe_text{
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    width: 70px;
    text-align: right
}

.client_dialog_box_body_bottom_basketframe_content{
    width: 160px;
    display: flex;
    display: -webkit-flex;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-left: 10px;
    align-items: center;
}
.client_dialog_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 12px;
}

.client_dialog_white_button{
    width: 100px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    border-radius: 10px;
    border: 1px solid #eee;
    background-color: #fff;
    cursor: pointer;
}

@media screen and (min-width: 1025px) {
    .showDialogbclass {
        width: 600px;
    }

    .showDialogaclass {
        width: 600px;
    }
}
</style>
