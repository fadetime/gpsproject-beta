<template>
    <div id="car">
        <div class="topbutton">
            <div class="topbutton-left">
                <input type="text"
                       v-model="selectedCar"
                       @keyup.enter="search"
                       placeholder="搜索车牌信息">
            </div>
            <div class="topbutton-right">
                <md-button class="md-raised md-primary"
                           @click="newCar"
                           style="font-size:16px;width:80px;height:35px;">+ 添加</md-button>
            </div>
        </div>
        <div class="centertable">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>车牌</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>车型</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>包含尾门</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>包含冷藏</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>备注</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>检查记录</span>
                        </div>
                        <div class="tabletitle-item"
                             style="font-size:18px;line-height: 35px;">
                            <span>操作</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card md-with-hover
                     v-for="(item,index) in allcarinfo"
                     :key="index"
                     style="background-color: #eff3f5;">
                <md-card-content>
                    <div class="tablebody">
                        <div class="tabletitle-item">
                            <span>{{item.carid}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.cartype}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.tailgate}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.coolstore}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.carnote}}</span>
                        </div>
                        <div class="tabletitle-item"
                             @click="openClickCarLog(item)">
                            <md-icon style="font-size: 34px!important;">list_alt</md-icon>
                        </div>
                        <div class="tabletitle-item">
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
            <!-- 客户页码 -->
            <div class="page-bar"
                 style="display: flex;justify-content: center;">
                <div class="page-bar-body"
                     v-if="pageCount!=1">
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
                            <span>共
                                <i>{{pageCount}}</i>页</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <input type="file"
                style="display:none"
                id="upload_file"
                @change="fileChange($event)"
                accept="image/*">

        <!-- car info dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="checkcar-back"
                 v-if="isOpenCarInfoDialog"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div class="checkcar-front" v-if="isOpenCarInfoDialog" @click.self.prevent="isOpenCarInfoDialog = false">
                <div class="car-front-box" >
                    <div class="checkcar-front-box-title">
                        <span>车辆信息</span>
                    </div>
                    <div class="car_front_box_body">
                        <div class="car_front_box_body_top">
                            <div class="car_front_box_body_top_right">
                                <div class="car_front_box_body_top_right_item">
                                    <div class="car_front_box_body_top_right_item_left">
                                        <span>车牌号码</span>
                                    </div>
                                    <div class="car_front_box_body_top_right_item_right">
                                        <input type="text" v-model="carid">
                                    </div>
                                </div>
                                <div class="car_front_box_body_top_right_item">
                                    <div class="car_front_box_body_top_right_item_left">
                                        <span>车辆型号</span>
                                    </div>
                                    <div class="car_front_box_body_top_right_item_right">
                                        <div class="car_front_box_body_top_right_item_right_div" @click="isOpenCarTypeDialog = true">
                                            <span v-if="!cartype" style="border-bottom: 1px solid #2c3e50;">请选择</span>
                                            <span v-else>{{cartype}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="car_front_box_body_top_right_item" style="margin-top:12px;margin-bottom:0">
                                    <div class="car_front_box_body_top_right_item_left">
                                        <span>备注信息</span>
                                    </div>
                                    <div class="car_front_box_body_top_right_item_right">
                                        <textarea v-model="carnote"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="car_front_box_body_top_left">
                                <div class="photoarea" @click="uploadFile" v-if="!carImage">
                                    <md-icon class="md-size-3x"
                                                style="padding-top:100px"
                                                v-if="!updateImagePreview">add_a_photo</md-icon>
                                    <img :src="updateImagePreview"
                                            alt="newimg"
                                            v-else>
                                </div>
                                <div class="photoarea"
                                        @click="uploadFile"
                                        v-else>
                                    <img :src="carImage | imgurl"
                                            alt="newimg">
                                </div>
                            </div>
                            
                        </div>
                        <div class="car_front_box_body_center">
                            <div class="car_front_box_body_center_item">
                                <div class="car_front_box_body_center_name">
                                    <span>尾门</span>
                                </div>
                                <div class="car_front_box_body_center_radio">
                                    <div class="dialog-body-radio-item">
                                        <div class="car_front_box_body_center_radio_input">
                                            <input type="radio"
                                                name="cartailgate"
                                                v-model="tailgate"
                                                value="yes">
                                        </div>
                                        <div class="car_front_box_body_center_radio_text">
                                            <span>有</span>
                                        </div>
                                    </div>
                                    <div class="dialog-body-radio-item">
                                        <div class="car_front_box_body_center_radio_input">
                                            <input type="radio"
                                                name="cartailgate"
                                                v-model="tailgate"
                                                value="no">
                                        </div>
                                        <div class="car_front_box_body_center_radio_text">
                                            <span>无</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="car_front_box_body_center_item">
                                <div class="car_front_box_body_center_name">
                                    <span>冷藏</span>
                                </div>
                                <div class="car_front_box_body_center_radio">
                                    <div class="dialog-body-radio-item">
                                        <div class="car_front_box_body_center_radio_input">
                                            <input type="radio"
                                                name="carstore"
                                                v-model="coolstore"
                                                value="yes">
                                        </div>
                                        <div class="car_front_box_body_center_radio_text">
                                            <span>有</span>
                                        </div>
                                    </div>
                                    <div class="dialog-body-radio-item">
                                        <div class="car_front_box_body_center_radio_input">
                                            <input type="radio"
                                                name="carstore"
                                                v-model="coolstore"
                                                value="no">
                                        </div>
                                        <div class="car_front_box_body_center_radio_text">
                                            <span>无</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="car_front_box_body_bottom">
                            <div class="kelometerbox">
                                <div class="car_front_box_body_bottom_item_left">
                                    <span>车辆行驶公里数</span>
                                </div>
                                <div class="kelometerbox_right" @click="changeKmMethod('km')">
                                    <span>{{kelometer}}</span><span>Km</span>
                                </div>
                            </div>
                            <div class="kelometerbox">
                                <div class="car_front_box_body_bottom_item_left">
                                    <span>上一次更换机油</span>
                                </div>
                                <div class="kelometerbox_right" @click="changeKmMethod('oil')">
                                    <span v-if="lastOilKelometer">{{lastOilKelometer}}Km</span>
                                    <span v-else style="font-size:16px">未填写</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="car_front_box_bottom">
                        <div class="car_front_box_bottom_button" @click="isOpenCarInfoDialog = false">
                            <span>取消</span>
                        </div>
                        <div v-if="addmode" class="car_front_box_bottom_button" @click="addcar" style="margin-left:8px">
                            <span>保存</span>
                        </div>
                        <div v-else class="car_front_box_bottom_button" @click="confirmedit" style="margin-left:8px">
                            <span>修改</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- car info dialog start -->

        <!-- car type box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="checkcar-back" style="z-index:24"
                 v-if="isOpenCarTypeDialog"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div class="checkcar-front" style="z-index:25"
                 v-if="isOpenCarTypeDialog"
                 @click.self.prevent="isOpenCarTypeDialog = false">
                <div class="car-front-box" style="z-index:26">
                    <div class="checkcar-front-box-title">
                        <span>选择车辆型号</span>
                    </div>
                    <div class="car_type_front_box_body">
                        <div class="car_type_front_box_body_item" v-for="(item,index) in allCarType" :key="index" @click="choseTypeItem(item)">
                            <span>{{item}}</span>
                        </div>
                    </div>
                    <div class="car_front_box_bottom">
                        <div class="car_front_box_bottom_button" @click="isOpenCarTypeDialog = false">
                            <span>取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- car type box end -->

        <!-- new remove dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="checkcar-back" style="z-index:24"
                 v-if="removeDialog"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div class="checkcar-front" style="z-index:25"
                 v-if="removeDialog"
                 @click.self.prevent="removeDialog = false">
                <div class="car-front-box" style="z-index:26">
                    <div class="checkcar-front-box-title">
                        <span>删除车辆</span>
                    </div>
                    <div class="car_type_front_box_body">
                        <div class="carpage_new_remove_item">
                            <div class="carpage_new_remove_item_left">
                                <div class="carpage_new_remove_item_left_frame">
                                    <div class="carpage_new_remove_item_left_frame_left">
                                        <span>车牌号码</span>
                                    </div>
                                    <div class="carpage_new_remove_item_left_frame_right">
                                        <span>{{carid}}</span>
                                    </div>
                                </div>
                                <div class="carpage_new_remove_item_left_frame">
                                    <div class="carpage_new_remove_item_left_frame_left">
                                        <span>车辆类型</span>
                                    </div>
                                    <div class="carpage_new_remove_item_left_frame_right">
                                        <span>{{cartype}}</span>
                                    </div>
                                </div>
                                <div class="carpage_new_remove_item_left_frame">
                                    <div class="carpage_new_remove_item_left_frame_left">
                                        <span>有无尾门</span>
                                    </div>
                                    <div class="carpage_new_remove_item_left_frame_right">
                                        <span>{{tailgate}}</span>
                                    </div>
                                </div>
                                <div class="carpage_new_remove_item_left_frame">
                                    <div class="carpage_new_remove_item_left_frame_left">
                                        <span>出车次数</span>
                                    </div>
                                    <div class="carpage_new_remove_item_left_frame_right">
                                        <span>{{cartimes}}</span>
                                    </div>
                                </div>
                                <div class="carpage_new_remove_item_left_frame">
                                    <div class="carpage_new_remove_item_left_frame_left">
                                        <span>车辆备注</span>
                                    </div>
                                    <div class="carpage_new_remove_item_left_frame_right" style="height:80px">
                                        <span>{{carnote}}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="photoarea">
                                    <img src="../../public/img/ebuyLogo.png"
                                        alt="ebuylogo"
                                        style="object-fit:unset;padding:50px 0"
                                        v-if="!carImage">
                                    <img :src="carImage | imgurl"
                                        alt="newimg"
                                        v-else>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="car_front_box_bottom">
                        <div class="car_front_box_bottom_button" @click="removeDialog = false">
                            <span>取消</span>
                        </div>
                        <div class="car_front_box_bottom_button" @click="confirmremove" style="margin-left:8px;">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- new remove dialog end -->

        <!-- error start -->
        <md-dialog-alert :md-active.sync="error"
                         :md-content="errormsg"
                         md-confirm-text="关闭"
                         style="font-size:25px;z-index:999" />
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
        <!-- check car log box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div class="checkcar-back"
                 v-if="showCheckCarBox"
                 @click="showCheckCarBox=false"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div class="checkcar-front"
                 v-if="showCheckCarBox"
                 @click="showCheckCarBox=false">
                <div class="checkcar-front-box">
                    <div class="checkcar-front-box-top">
                        <span>检查记录</span>
                    </div>
                    <div v-if="!carLog"
                         style="padding: 24px 100px;font-size: 16px;">
                        <span>~暂无记录~</span>
                    </div>
                    <div v-else class="checkcar-front-box-body">
                        <div class="checkcar-front-box-body-title">
                            <div class="checkcar-front-box-body-title-item"
                                 style="width:160px">
                                <span>时间</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>司机</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>雨刷</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>大灯</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item"
                                 style="width:80px">
                                <span>后视镜</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>车胎</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item"
                                 style="width:90px">
                                <span>备用车胎</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>刹车</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>其他</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>框数(前)</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>框数(后)</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>清洁</span>
                            </div>
                            <div class="checkcar-front-box-body-title-item">
                                <span>描述</span>
                            </div>
                        </div>
                        <div class="checkcar-front-box-body-item">
                            <div style="width:160px;text-align:left">
                                <span>{{carLog.date | datefilter}}{{carLog.date | timefilter}}</span>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:32px">
                                <span>{{carLog.driver}}</span>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:63px">
                                <md-icon v-if="carLog.wiper"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:59px">
                                <md-icon v-if="carLog.headlight"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:77px">
                                <md-icon v-if="carLog.mirror"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:65px">
                                <md-icon v-if="carLog.tyre"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:92px">
                                <md-icon v-if="carLog.backup"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <md-icon v-if="carLog.brake"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <md-icon v-if="!carLog.text"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <span>{{carLog.boxNum}}</span>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <span>{{carLog.boxNumAgain}}</span>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:58px">
                                <md-icon v-if="carLog.clean"
                                         style="color:green">check_circle</md-icon>
                                <md-icon v-else
                                         style="color:red">cancel</md-icon>
                            </div>
                            <div class="checkcar-front-box-body-center-item"
                                 style="width:140px;text-align:center">
                                <span>{{carLog.text}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="checkcar-front-box-bottom">
                        <md-button class="md-raised md-primary"
                                   @click="showCheckCarBox=false"
                                   style="font-size:16px;width:80px;height:35px;">关闭</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check car log box end -->

        <!-- tips yes or no box start -->
        <secondConfirmDialog  v-on:secondBottonValue="secondBottonValue" :msg="childDialogMsg" :isShowChild="isShowChildValue"></secondConfirmDialog>
        <!-- tips yes or no box end -->
        
        <!-- 修改公里数输入窗口 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowKmInput" class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowKmInput" class="checkcar-front">
                <div class="car_inputKm_box">
                    <div class="car_inputKm_title">
                        <span v-if="changeKmMode === 'km'">修改汽车公里数</span>
                        <span v-else>修改最后更新机油数</span>
                    </div>
                    <div class="car_inputKm_body">
                        <div class="car_inputKm_body_carno">
                            <div class="car_inputKm_body_carno_box">
                                <span>{{carid}}</span>
                            </div>
                        </div>
                        <div class="car_inputKm_body_item">
                            <div class="car_inputKm_body_item_left">
                                <span>原有数值</span>
                            </div>
                            <div class="car_inputKm_body_item_right_div">
                                <span v-if="changeKmMode === 'km'">{{kelometer}}</span>
                                <span v-else>{{lastOilKelometer}}</span>
                            </div>
                        </div>
                        <div class="car_inputKm_body_item">
                            <div class="car_inputKm_body_item_left">
                                <span>现有数值</span>
                            </div>
                            <div class="car_inputKm_body_item_right">
                                <input type="text" v-model="changeNumber">
                            </div>
                        </div>
                    </div>
                    <div class="car_inputKm_bottom">
                        <div class="white_button" @click="isShowKmInput = false">取消</div>
                        <div class="white_button" style="margin-left:8px" @click="changeCarKmMethod()">确定</div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 修改公里数输入窗口 end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";
import lrz from "lrz";
import secondConfirmDialog from "@/components/secondConfirmDialog.vue"

export default {
    name: "Car",
    components:{
        secondConfirmDialog
    },

    data() {
        return {
            addmode: true,
            successdmsg: false,
            error: false,
            errormsg: "发生未知错误请联系更牛逼的人",
            error2: false,
            error3: false,
            carid: "",
            cartype: "",
            cartimes: "",
            carnote: "",
            cardate: "",
            _id: "",
            removeDialog: false,
            selectedCar: "",
            tailgate: "no",
            coolstore: "no",
            searchCar: [],
            allcarinfo: [],
            searching: false,
            idErr: false,
            typeErr: false,
            pageCount: 0, // 总页码
            pageNow: 1, // 当前页码
            pageSize: 15, //每页显示条数
            showItem: 5, // 最少显示5个页码
            findMode: false,
            updateImagePreview: "",
            updateImage: "",
            carImage: "",
            callFlag: false,
            allCarType: ["Van", "10ft Lorry", "14ft Lorry", "24ft Lorry"],
            isOpenCarTypeDialog:false,
            selectorCarType: "车型",
            showTipDialog: false,
            tipMsg: "",
            showCheckCarBox: false,
            carLog: [],
            kelometer:0,
            lastOilKelometer:0,
            isOpenCarInfoDialog:false,
            isShowChildValue:false,
            childDialogMsg:null,
            isShowKmInput:false,
            changeKmMode:null,
            changeNumber:0
        };
    },

    mounted() {
        this.getallcar();
    },

    activated() {
        this.getallcar();
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
    },
    methods: {
        changeCarKmMethod(){
            if(this.changeKmMode === 'km'){
                axios
                    .post(config.server + "/car/admChangeOil", {
                        car_id: this._id,
                        changeNumber:this.changeNumber,
                        changeKmMode:this.changeKmMode
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.isShowKmInput = false
                            this.kelometer = this.changeNumber
                            this.getallcar();
                        }else{
                            this.showTipDialog = true
                            this.tipMsg = '修改时出现问题'
                            setTimeout(() => {
                                this.showTipDialog = false
                            }, 2000);
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                    })
            }else{
                axios
                    .post(config.server + "/car/admChangeOil", {
                        car_id: this._id,
                        changeNumber:this.changeNumber,
                        changeKmMode:this.changeKmMode
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.isShowKmInput = false
                            this.lastOilKelometer = this.changeNumber
                            this.getallcar();
                        }else{
                            this.showTipDialog = true
                            this.tipMsg = '修改时出现问题'
                            setTimeout(() => {
                                this.showTipDialog = false
                            }, 2000);
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                    })
            }
        },

        changeKmMethod(mode){
            this.changeKmMode = mode
            if(mode === 'km'){
                this.childDialogMsg = '确认更改本车辆的公里数？'
            }else{
                this.childDialogMsg = '确认更改本车辆最后更换机油公里数？'
            }
            this.isShowChildValue = true
        },

        secondBottonValue(secondBottonValue) {
            if(!secondBottonValue){
                this.isShowChildValue = false
            }else{
                this.isShowKmInput = true
                this.isShowChildValue = false
            }
        },
        
        openClickCarLog(item) {
            axios
                .post(config.server + "/checkcar/getlastone", {
                    car_id: item._id
                })
                .then(doc => {
                    console.log(doc)
                    if (doc.data.code === 0) {
                        this.carLog = doc.data.doc
                        this.showCheckCarBox = true
                    } else {
                        console.log(doc);
                        this.tipMsg = "出现未知错误";
                        this.showTipDialog = true;
                        setTimeout(() => {
                            this.showTipDialog = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 下拉框部分 start
        callCarType() {
            if (this.callFlag) {
                this.bodyHideCarType();
            } else {
                this.bodyShowCarType();
            }
        },

        bodyHideCarType() {
            let body = document.querySelector("#selector-body-type");
            body.style.height = "0px";
            body.style.transition = "0.25s";
            let arrow = document.querySelector("#selector-arrow-type");
            arrow.style.transform = "rotate(-90deg)";
            arrow.style.transition = "0.25s";
            this.callFlag = false;
        },

        bodyShowCarType() {
            let body = document.querySelector("#selector-body-type");
            let boxes = document.querySelectorAll("#selector-box-type");
            let arrow = document.querySelector("#selector-arrow-type");
            arrow.style.transform = "rotate(0deg)";
            body.style.height = "180px";
            arrow.style.transition = "0.25s";
            let height = 4;
            boxes.forEach(box => {
                height += box.clientHeight;
            });
            body.style.transition = "0.25s";
            body.style.display = "block";
            this.callFlag = true;
        },

        choseTypeItem(item) {
            this.isOpenCarTypeDialog = false
            this.selectorCarType = item;
            this.cartype = item;
            this.bodyHideCarType();
        },
        // 下拉框部分 end
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
            this.carImage = "";
            el.target.value = "";
        },

        closeDialog() {
            this.callFlag = false;
            this.updateImagePreview = null;
            this.isOpenCarInfoDialog = false
        },

        newCar() {
            this.addmode = true;
            this.carid = "";
            this.cartype = "";
            this.carnote = "";
            this.carImage = "";
            this.isOpenCarInfoDialog = true
            this.tailgate = "no";
            this.coolstore = "no";
        },
        search(item) {
            if (this.selectedCar == "") {
                this.findMode = false;
                this.getallcar();
            } else {
                this.findMode = true;
                axios
                    .post(config.server + "/car/find", {
                        word: this.selectedCar,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allcarinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                        if (res.data.code === 1) {
                            this.showTipDialog = true;
                            this.tipMsg = res.data.msg;
                            this.selectedCar = "";
                            this.getallcar();
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
        editbutton(item) {
            this.addmode = false;
            this._id = item._id;
            this.carid = item.carid;
            this.cartype = item.cartype;
            this.tailgate = item.tailgate;
            this.coolstore = item.coolstore;
            this.carnote = item.carnote;
            this.carImage = item.image;
            this.isOpenCarInfoDialog = true
            this.kelometer = item.kelometer
            this.lastOilKelometer = item.lastOilKelometer
        },
        removebutton(item) {
            this._id = item._id;
            this.carid = item.carid;
            this.cartype = item.cartype;
            this.tailgate = item.tailgate;
            this.cartimes = item.cartimes;
            this.carnote = item.carnote;
            this.carImage = item.image;
            this.cardate = item.cardate;
            this.removeDialog = true;
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
            if (this.findmode === false) {
                axios
                    .post(config.server + "/car/get", {
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allcarinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios
                    .post(config.server + "/car/find", {
                        word: this.selectedCar,
                        pageSize: this.pageSize,
                        pageNow: this.pageNow
                    })
                    .then(res => {
                        this.allcarinfo = res.data.doc;
                        this.pageCount = Math.ceil(
                            res.data.count / this.pageSize
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        confirmedit() {
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
                    payload.append("logOperator", localStorage.getItem("name"));
                    axios({
                        method: "post",
                        url: config.server + "/car/update/img",
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
                .post(config.server + "/car/update", {
                    _id: this._id,
                    carid: this.carid,
                    cartype: this.cartype,
                    tailgate: this.tailgate,
                    coolstore: this.coolstore,
                    carnote: this.carnote,
                    logOperator: localStorage.getItem("name")
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.error = true;
                        this.errormsg = res.data.msg;
                        this.getallcar();
                        this.closeDialog();
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    } else {
                        this.error = true;
                        this.errormsg = res.data.msg;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        confirmremove() {
            axios
                .post(config.server + "/car/remove", {
                    _id: this._id,
                    logOperator: localStorage.getItem("name")
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.error = true;
                        this.errormsg = res.data.msg;
                        this.removeDialog = false;
                        this.getallcar();
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    } else {
                        this.error = true;
                        this.errormsg = res.data.msg;
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getallcar() {
            axios
                .post(config.server + "/car/get", {
                    pageSize: this.pageSize,
                    pageNow: this.pageNow
                })
                .then(res => {
                    this.allcarinfo = res.data.doc;
                    this.pageCount = Math.ceil(res.data.count / this.pageSize);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        addcar() {
            if (!this.carid || !this.cartype) {
                if (!this.carid) {
                    this.idErr = true;
                } else {
                    this.idErr = false;
                }
                if (!this.cartype) {
                    this.typeErr = true;
                } else {
                    this.typeErr = false;
                }
            } else {
                let payload = new FormData();
                let maxSize = 200 * 1024; //200KB

                if (this.updateImage) {
                    lrz(this.updateImage, {
                        quality: 0.5
                    }).then(res => {
                        if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                        }
                        payload.append("image", this.updateImage);
                        payload.append("carid", this.carid);
                        payload.append("cartype", this.cartype);
                        payload.append("tailgate", this.tailgate);
                        payload.append("coolstore", this.coolstore);
                        payload.append("carnote", this.carnote);
                        payload.append(
                            "logOperator",
                            localStorage.getItem("name")
                        );
                        axios({
                            method: "post",
                            url: config.server + "/car",
                            data: payload,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                            .then(response => {
                                if (
                                    response.data.code == 1 ||
                                    response.data.code == 2
                                ) {
                                    this.error = true;
                                    this.errormsg = response.data.msg;
                                    setTimeout(() => {
                                        this.error = false;
                                    }, 3000);
                                } else {
                                    this.getallcar();
                                    this.error = true;
                                    this.errormsg = response.data.msg;
                                    this.closeDialog();
                                    this.isOpenCarInfoDialog = false
                                    this.carid = "";
                                    this.cartype = "";
                                    this.tailgate = "";
                                    this.carnote = "";
                                    this.selectorCarType = "车型";
                                    setTimeout(() => {
                                        this.error = false;
                                    }, 3000);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                error = true;
                                errormsg = error;
                                setTimeout(() => {
                                    this.error = false;
                                }, 3000);
                            });
                    });
                } else {
                    payload.append("carid", this.carid);
                    payload.append("cartype", this.cartype);
                    payload.append("tailgate", this.tailgate);
                    payload.append("coolstore", this.coolstore);
                    payload.append("carnote", this.carnote);
                    payload.append("logOperator", localStorage.getItem("name"));
                    axios({
                        method: "post",
                        url: config.server + "/car",
                        data: payload,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                        .then(response => {
                            if (
                                response.data.code == 1 ||
                                response.data.code == 2
                            ) {
                                this.error = true;
                                this.errormsg = response.data.msg;
                                setTimeout(() => {
                                    this.error = false;
                                }, 3000);
                            } else {
                                this.getallcar();
                                this.error = true;
                                this.errormsg = response.data.msg;
                                this.closeDialog();
                                this.carid = "";
                                this.cartype = "";
                                this.tailgate = "";
                                this.carnote = "";
                                this.selectorCarType = "车型";
                                setTimeout(() => {
                                    this.error = false;
                                }, 3000);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            error = true;
                            errormsg = error;
                            setTimeout(() => {
                                this.error = false;
                            }, 3000);
                        });
                }
            }
        }
    }
};
</script>

<style scoped>
#car {
    width: 80%;
    margin: 15px auto;
}

.dialog-title {
    text-align: left;
    padding: 26px 0 0 26px;
}

.dialog-title span {
    font-size: 30px;
}

.dialog-body {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}

.dialog-body-item {
    flex-basis: 40%;
    text-align: left;
    margin: 0 auto;
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
    height: 35px;
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
    width: 250px;
    font-size: 16px;
    line-height: 29px;
}

.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    line-height: 50px;
}

.editdialog {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.dialog-body-radio {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    border-bottom: 1px solid;
    padding: 12px 0;
}

.dialog-body-radio input {
    width: 20px;
    height: 20px;
}

.dialog-body-radio-item {
    flex-basis: 45%;
    margin: 0 auto;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.windowdialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 20;
}

.photoarea {
    margin: 0 auto;
    text-align: center;
    border: 3px dashed #696969;
    width: 220px;
    height: 220px;
    background-color: #eee;
    border-radius: 10px;
}

.photoarea img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    background-color: #eee;
}

.box {
    cursor: pointer;
    padding: 7px;
    border-bottom: 1px solid #eee;
    transition: 0.5s;
    width: 243px;
}

.box:hover {
    background-color: dodgerblue;
    color: white;
    transition: 0.5s;
}

.checkcar-back {
    background: rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
}

.checkcar-front {
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

.checkcar-front-box {
    background: #fff;
}

.checkcar-front-box-top {
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    background: #ff5252;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
    text-align: left;
    padding-left: 24px;
}

.checkcar-front-box-body {
    padding: 20px 24px;
}

.checkcar-front-box-body-title {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    color: #6a6a6a;
    border-bottom: 1px solid #696969;
    height: 30px;
}

.checkcar-front-box-body-title-item {
    width: 60px;
    text-align: left;
}

.checkcar-front-box-body-item {
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
}

.checkcar-front-box-body-center-item {
    width: 50px;
    text-align: right;
}

.kelometerbox{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
}

.kelometerbox_left{
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.54)
}

.kelometerbox_right{
    border: 1px solid #e0e0e0;
    width: 160px;
    text-align: center;
    background-color: #eee;
    border-radius: 4px;
    cursor: pointer;
}

.car-front-box{
    background-color: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.checkcar-front-box-title{
    background-color: #d74342;
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.car_front_box_body{
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    margin: 12px 24px;
    padding: 12px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.car_front_box_body_top{
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: center;
}

.car_front_box_body_top_right{
    margin-right: 24px;
}

.car_front_box_body_top_right_item{
    display: flex;
    display: -webkit-flex;
    line-height: 30px;
    margin: 12px 0;
}

.car_front_box_body_top_right_item_left{
    font-size: 16px;
    margin-right: 12px;
}

.car_front_box_body_top_right_item_right input{
    height: 30px;
    border-radius: 5px;
    width: 160px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 16px;
    color: #2c3e50;
}

.car_front_box_body_top_right_item_right_div{
    width:160px;
    height:30px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}

.car_front_box_body_top_right_item_right textarea{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 160px;
    height: 120px;
    resize:none;
    font-size: 16px;
    color: #2c3e50;
}

.car_front_box_body_center{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.car_front_box_body_center_item{
    display: flex;
    display: -webkit-flex;
    margin-top: 12px;
}

.car_front_box_body_center_name{
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    margin-right: 12px;
}

.car_front_box_body_center_radio{
    display: flex;
    display: -webkit-flex;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    padding: 0 12px;
    width: 140px;
}

.car_front_box_body_center_radio_text{
    font-size:16px;
    color:#000;
    height: 30px;
    line-height: 30px;
}

.car_front_box_body_center_radio_input{
    padding-top: 1px;
}

.car_front_box_body_center_radio_input input{
    height: 20px;
    width: 20px;
}

.car_front_box_body_bottom{
    margin-top: 12px;
}

.car_front_box_body_bottom_item_left{
    font-size: 16px;
    margin-right: 24px;
}

.car_front_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 12px;
}

.car_front_box_bottom_button{
    border: 1px solid #eee;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.car_type_front_box_body{
    margin: 12px 24px;
    font-size: 16px;
}

.car_type_front_box_body_item{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 30px;
    line-height: 30px;
    width: 100px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 1px solid 1px #eee;
}

.carpage_new_remove_item{
    display: flex;
    display: -webkit-flex;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 10px 12px;
}

.carpage_new_remove_item_left{
    margin-right: 12px;
}

.carpage_new_remove_item_left_frame{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    margin-top: 4px;
}

.carpage_new_remove_item_left_frame_left{
    margin-right: 8px;
}

.carpage_new_remove_item_left_frame_right{
    width: 160px;
    border: 1px solid #eee;
    border-radius: 10px;
}

.car_inputKm_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.car_inputKm_title{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.car_inputKm_body_carno{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.car_inputKm_body_carno_box{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    width: 100px;
}

.car_inputKm_body_item{
    display: flex;
    display: -webkit-flex;
    padding: 8px 12px;
}

.car_inputKm_body_item_left{
    height: 30px;
    line-height: 30px;
    width: 100px;
}

.car_inputKm_body_item_right_div{
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 120px;
    background-color: #eee;
}

.car_inputKm_body_item_right input{
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 120px;
    text-align: center;
}

.car_inputKm_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-bottom: 12px;
    cursor: pointer;
}

.white_button{
    width: 100px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    border: 1px solid #eee;
}

@media screen and (min-width: 1025px) {
	.editdialog{
		width: 600px;
	}	
}
</style>
