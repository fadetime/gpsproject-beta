<template>
    <div id="workstream_home">
        <div class="wt_top_button_area">
            <div class="topBigButton" style="margin-left: 8px;" @click="openLabelBoxMethod()">
                <div class="icon_label"></div>
                <div>
                    <span>创建标签</span>
                </div>
            </div>
            <div class="wt_rightempty">
                <!-- empty space -->
            </div>
        </div>
        <div class="wt_label_area">
            <div v-for="(item,index) in labeArray" :key="index"  @click="chooseThisLabelMethod(item)">
                <div v-if="chooseLabel === item" style="z-index: 10;background-color: #1296db;color:#fff;" class="wt_label_area_frame_choose">
                    <span>{{item.name}}</span>
                </div>
                <div v-else class="wt_label_area_frame">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="wt_workstream_area">
            <div class="wt_workstream_control_area">
                <div class="wt_workstream_control_area_path">
                    <div v-for="(item,index) in contentPath" :key="index">
                        <span>/{{item.name}}</span>
                    </div>
                </div>
                <div class="topBigButton" @click="showCreateFolderBoxMethod()">
                    <div class="icon_folder"></div>
                    <div>
                        <span>创建文件夹</span>
                    </div>
                </div>
                <div class="topBigButton" style="margin-left: 8px;" @click="showCreateMissionBoxMethod()">
                    <div class="icon_file"></div>
                    <div style="padding-left: 8px;">
                        <span>创建任务</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="wt_workstream_content">
            <div class="wt_workstream_content_item" style="font-size:16px">
                <div class="wt_workstream_content_item_icon">
                    <!-- empty -->
                </div>
                <div class="wt_workstream_content_item_name">
                    <span>名称</span>
                </div>
                <div class="wt_workstream_content_item_description">
                    <span>描述</span>
                </div>
                <div class="wt_workstream_content_item_edit">
                    <span>修改</span>
                </div>
            </div>
            <div v-show="streamArray.length === 0">
                <div>
                    <span>文件夹为空</span>
                </div>
            </div>
            <div v-show="streamArray.length != 0" v-for="(item,index) in streamArray" :key="index" class="wt_workstream_content_item_content">
                <div v-if="item && item.forder" class="wt_workstream_content_item_icon" @click="chooseItemMethod(item)">
                    <div class="icon_folder"></div>
                </div>
                <div v-else class="wt_workstream_content_item_icon" @click="chooseItemMethod(item)">
                    <div class="icon_file"></div>
                </div>
                <div v-if="item" class="wt_workstream_content_item_name" @click="chooseItemMethod(item)">
                    <span>{{item.name}}</span>
                </div>
                <div class="wt_workstream_content_item_description" @click="chooseItemMethod(item)">
                    123
                </div>
                <div class="wt_workstream_content_item_edit">
                    <div class="icon_edit" @click="openEditBoxMethod(item)"></div>
                </div>
            </div>
            
        </div>
        <!-- create label start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowCreateLabelBox" class="ws_label_back"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowCreateLabelBox" class="ws_label_front" @click.self.prevent="isShowCreateLabelBox = false">
                <div class="ws_label_box">
                    <div class="ws_label_box_title">
                        <div class="customer_addDialog_box_title_frame">
                            <span>标签信息</span>
                        </div>
                    </div>
                    <div class="ws_label_box_button_layer">
                        <div class="topBigButton" style="margin-left: 8px;margin-top: 8px;">
                            <div class="icon_label"></div>
                            <div>
                                <span>创建标签</span>
                            </div>
                        </div>
                    </div>
                    <div class="ws_label_box_body">
                        <div class="ws_label_box_body_title">
                            <div class="ws_label_box_body_title_item" style="width: 48px">
                                <span>序号</span>
                            </div>
                            <div class="ws_label_box_body_title_item" style="width: 96px">
                                <span>名称</span>
                            </div>
                            <div class="ws_label_box_body_title_item" style="width: 96px">
                                <span>时间</span>
                            </div>
                            <div class="ws_label_box_body_title_item" style="width: 96px">
                                <span>备注</span>
                            </div>
                            <div class="ws_label_box_body_title_item" style="width: 96px">
                                <span>顺序</span>
                            </div>
                            <div class="ws_label_box_body_title_item" style="width: 96px">
                                <span>操作</span>
                            </div>
                        </div>
                        <div v-for="(item,index) in labeArray" :key="index" class="ws_label_box_body_content">
                            <div class="ws_label_box_body_content_item" style="width: 48px;font-size:16px;">
                                <span>{{index + 1}}</span>
                            </div>
                            <div class="ws_label_box_body_content_item">
                                <span>{{item.name}}</span>
                            </div>
                            <div class="ws_label_box_body_content_item">
                                <span>{{item.date}}</span>
                            </div>
                            <div class="ws_label_box_body_content_item">
                                <span>123</span>
                            </div>
                            <div class="ws_label_box_body_content_item_botton">
                                <div class="ws_white_button_small" @click="changeLabelSortUpMethod(item,index)">
                                    <span>↑</span>
                                </div>
                                <div class="ws_white_button_small" style="margin-left: 8px" @click="changeLabelSortDownMethod(item,index)">
                                    <span>↓</span>
                                </div>
                            </div>
                            <div class="ws_label_box_body_content_item">
                                <span>set</span>
                            </div>
                        </div>
                        <!-- <div class="ws_label_box_body_top">
                            <span>标签名称</span>
                        </div>
                        <div class="ws_label_box_body_bottom">
                            <input type="text" placeholder="请输入" v-model="labelName">
                        </div> -->
                    </div>
                    <div class="ws_label_box_bottom">
                        <div class="ws_white_button" @click="isShowCreateLabelBox = false">
                            <span>取消</span>
                        </div>
                        <!-- <div class="ws_white_button" style="margin-left: 8px;" @click="createLabelMethod()">
                            <span>确定</span>
                        </div> -->
                        <div class="ws_white_button" style="margin-left: 8px;" @click="confirmEditLabelMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- create label end -->

        <!-- create mission box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowCreateMissionBox" class="ws_label_back"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowCreateMissionBox" class="ws_label_front" @click.self.prevent="isShowCreateMissionBox = false">
                <div class="ws_label_box">
                    <div class="ws_label_box_title">
                        <div class="customer_addDialog_box_title_frame">
                            <span>任务流</span>
                        </div>
                    </div>
                    <div class="ws_label_box_body">
                        <div v-if="fatherFolder">
                            <div class="ws_label_box_body_top">
                                <span>父文件夹名称</span>
                            </div>
                            <div class="ws_label_box_body_text">
                                <span>{{fatherFolder.name}}</span>
                            </div>
                        </div>
                        <div class="ws_label_box_body_top">
                            <span>流名称</span>
                        </div>
                        <div class="ws_label_box_body_bottom">
                            <input type="text" placeholder="请输入" v-model="streamName">
                        </div>
                    </div>
                    <div class="ws_label_box_bottom">
                        <div class="ws_white_button" @click="isShowCreateMissionBox = false">
                            <span>取消</span>
                        </div>
                        <div class="ws_white_button" style="margin-left: 8px;" @click="createWorkStreamMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- create mission box end -->

        <!-- create folder box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowCreateFolderBox" class="ws_label_back"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowCreateFolderBox" class="ws_label_front" @click.self.prevent="isShowCreateFolderBox = false">
                <div class="ws_label_box">
                    <div class="ws_label_box_title">
                        <div class="customer_addDialog_box_title_frame">
                            <span>文件夹</span>
                        </div>
                    </div>
                    <div class="ws_label_box_body">
                        <div v-if="fatherFolder">
                            <div class="ws_label_box_body_top">
                                <span>父文件夹名称</span>
                            </div>
                            <div class="ws_label_box_body_text">
                                <span>{{fatherFolder.name}}</span>
                            </div>
                        </div>
                        <div class="ws_label_box_body_top">
                            <span>文件夹名称</span>
                        </div>
                        <div class="ws_label_box_body_bottom">
                            <input type="text" placeholder="请输入" v-model="streamName">
                        </div>
                    </div>
                    <div class="ws_label_box_bottom">
                        <div class="ws_white_button" @click="isShowCreateFolderBox = false">
                            <span>取消</span>
                        </div>
                        <div class="ws_white_button" style="margin-left: 8px;" @click="createFolderMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- create folder box end -->

        <!-- edit box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowEditBox" class="ws_label_back"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowEditBox" class="ws_label_front" @click.self.prevent="isShowEditBox = false">
                <div class="ws_label_box">
                    <div class="ws_label_box_title">
                        <span>信息修改</span>
                    </div>
                    <div class="ws_label_box_body">
                        <div class="ws_editbox_item">
                            <div class="ws_editbox_item_left">
                                <span>名称</span>
                            </div>
                            <div class="ws_editbox_item_right">
                                <input type="text" v-model="tempData.name">
                            </div>
                        </div>
                        <div class="ws_editbox_item">
                            <div class="ws_editbox_item_left">
                                <span>类型</span>
                            </div>
                            <div class="ws_editbox_item_right">
                                <div>
                                    <span v-if="tempData.forder">文件夹</span>
                                    <span v-else>文件</span>
                                </div>
                            </div>
                        </div>
                        <div class="ws_editbox_item">
                            <div class="ws_editbox_item_left">
                                <span>标签</span>
                            </div>
                            <div class="ws_editbox_item_right" @click="openChangeLabelBoxMethod()" style="cursor: pointer">
                                <div>
                                    <span v-if="tempData.label">{{chooseLabel.name}}</span>
                                    <span v-else>暂无</span>
                                </div>
                            </div>
                        </div>
                        <div class="ws_editbox_item">
                            <div class="ws_editbox_item_left">
                                <span>位置</span>
                            </div>
                            <div class="ws_editbox_item_right">
                                <div>
                                    <span>123</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ws_label_box_bottom">
                        <div class="ws_white_button" @click="isShowEditBox = false">
                            <span>取消</span>
                        </div>
                        <div class="ws_white_button" style="margin-left: 8px;">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- edit box end -->
        <!-- change label box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowChangeLabelBox" class="ws_label_back" style="z-index: 26"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowChangeLabelBox" class="ws_label_front" @click.self.prevent="isShowChangeLabelBox = false" style="z-index: 26">
                <div class="ws_label_box">
                    <div class="ws_label_box_title">
                        <span>标签修改</span>
                    </div>
                    <div class="ws_label_box_body">
                        <div v-for="(item,index) in labeArray" :key="index" class="ws_changelabel_item" @click="changeLabelMethod(item)">
                            <span>{{item.name}}</span>
                            <div v-if="tempChooseLabel === item" class="checkpic_area">
                                <img src="../../../public/img/icons/icon_check.svg" class="img_check">
                            </div>
                        </div>
                    </div>
                    <div class="ws_label_box_bottom">
                        <div class="ws_white_button" @click="isShowEditBox = true,isShowChangeLabelBox = false">
                            <span>取消</span>
                        </div>
                        <div class="ws_white_button" style="margin-left: 8px;" @click="confirmChangeLabelMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- change label box end -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
    </div>
</template>

<script>
import axios from "axios";
import config from "../../../public/js/config.js";
import tipsBox from "@/components/tipsBox.vue"

export default {
    components:{
        tipsBox
    },

    mounted(){
        this.findLabelMethod()
    },

    data(){
        return{
            isShowCreateLabelBox: false,
            isShowCreateMissionBox: false,
            isShowCreateFolderBox: false,
            labelName: null,
            labeArray: [],
            chooseLabel: null,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            streamName: null,
            streamArray: [],
            contentPath: [],
            fatherFolder: null,
            isShowEditBox: false,
            tempData: null,
            isShowChangeLabelBox: false,
            tempChooseLabel: null,
            startSortLabel: false
        }
    },

    methods:{
        confirmEditLabelMethod(){
            console.log('1')
            if(this.startSortLabel){
                console.log('if')
                axios
                    .post(config.server + "/workStream_label/sort",{
                        labeArray: this.labeArray
                    })
                    .then(doc => {
                        console.log(doc)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

        changeLabelSortUpMethod(item,index){
            if(index > 0){
                this.labeArray.splice(index,1)
                this.labeArray.splice(index - 1,0,item)
                this.startSortLabel = true
            }
        },

        changeLabelSortDownMethod(item,index){
            if(index < this.labeArray.length -1){
                this.labeArray.splice(index,1)
                this.labeArray.splice(index + 1,0,item)
                this.startSortLabel = true
            }
        },

        confirmChangeLabelMethod(){
            console.log('start')
            axios
                .post(config.server + "/workStream_label/update",{
                    labelInfo: this.tempChooseLabel,
                    tempData: this.tempData
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        console.log(doc)
                        this.isShowChangeLabelBox = false
                    }else{
                        console.log('else')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        changeLabelMethod(item){
            console.log(item)
            this.tempChooseLabel = item
        },

        openChangeLabelBoxMethod(){
            this.isShowChangeLabelBox = true
            this.isShowEditBox = false
            this.tempChooseLabel = this.chooseLabel
        },

        openEditBoxMethod(item){
            this.isShowEditBox = true
            console.log(item)
            this.tempData = item
        },

        chooseItemMethod(item){
            if(item.forder){
                axios
                    .post(config.server + "/workStream_folder/findFolder",{
                        _id: item._id
                    })
                    .then(doc => {
                        if(doc.data.code === 2){
                            console.log('other, catch some error')
                        }else{
                            this.fatherFolder = {
                                name: item.name,
                                _id: item._id
                            }
                            console.log(doc.data.doc)
                            this.streamArray = doc.data.doc.content
                            console.log(this.streamArray)
                            this.contentPath.push({
                                name: item.name,
                                _id: item._id
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                console.log('enter file')
            }
        },

        createFolderMethod(){
            if(this.fatherFolder){
                axios
                    .post(config.server + "/workStream_folder/createChildFolder",{
                        date: new Date(),
                        name: this.streamName,
                        _id: this.fatherFolder._id
                    })
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.isShowCreateFolderBox = false
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '创建文件夹失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                axios
                    .post(config.server + "/workStream_folder/create",{
                        date: new Date(),
                        name: this.streamName
                    })
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.isShowCreateFolderBox = false
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '创建任务流失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

        showCreateFolderBoxMethod(){
            this.isShowCreateFolderBox = true
        },

        createWorkStreamMethod(){
            if(this.fatherFolder){
                axios
                    .post(config.server + "/workStream_mission/createChild",{
                        date: new Date(),
                        name: this.streamName,
                        _id: this.fatherFolder._id
                    })
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.isShowCreateMissionBox = false
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '创建任务流失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                axios
                    .post(config.server + "/workStream_mission/create",{
                        date: new Date(),
                        name: this.streamName
                    })
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.isShowCreateMissionBox = false
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '创建任务流失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

        showCreateMissionBoxMethod(){
            this.streamName = null
            this.isShowCreateMissionBox = true
        },

        chooseThisLabelMethod(item){
            this.streamArray = []
            console.log(item)
            this.contentPath = []
            this.contentPath.push({
                name: item.name,
                _id: item._id
            })
            this.chooseLabel = item
            axios
                .post(config.server + "/workStream_label/stream",{
                    labelInfo:item
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.streamArray = doc.data.doc
                    }else if(doc.data.code === 2){
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '获取数据时发生错误'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        findLabelMethod(){
            axios
                .post(config.server + "/workStream_label/find")
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.labeArray = doc.data.doc
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '获取标签数据失败'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        createLabelMethod(){
            if(this.labelName === null){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '标签名不能为空'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 2000);
            }else{
                let tempDate = new Date().toISOString()
                axios
                    .post(config.server + "/workStream_label/create",{
                        labelName: this.labelName,
                        labelDate: tempDate
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.isShowCreateLabelBox = false
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '创建标签失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            
        },

        openLabelBoxMethod(){
            this.isShowCreateLabelBox = true
        }
    }
}
</script>

<style scoped>
.wt_top_button_area{
    padding-top: 8px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
}

.topBigButton{
    border: 1px solid #eee;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    display: flex;
    display: -webkit-flex;
    padding: 0 4px;
    width: 120px;
    cursor: pointer;
}

.wt_rightempty{
    width: 10%
}

.icon_folder{
    background: #1296db;
    mask-image: url(../../../public/img/icons/icon_folder.svg);
    -webkit-mask-image: url(../../../public/img/icons/icon_folder.svg);
    width: 30px;
    height: 30px;
    margin: 0 auto;
    mask-size: 28px;
    -webkit-mask-size: 28px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}

.icon_edit{
    background: #1296db;
    mask-image: url(../../../public/img/icons/icon_edit.svg);
    -webkit-mask-image: url(../../../public/img/icons/icon_edit.svg);
    width: 30px;
    height: 30px;
    margin: 0 auto;
    mask-size: 28px;
    -webkit-mask-size: 28px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}

.icon_file{
    background: #1296db;
    mask-image: url(../../../public/img/icons/icon_file.svg);
    -webkit-mask-image: url(../../../public/img/icons/icon_file.svg);
    width: 30px;
    height: 30px;
    mask-size: 24px;
    -webkit-mask-size: 24px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}

.icon_label{
    background: #1296db;
    mask-image: url(../../../public/img/icons/icon_label.svg);
    -webkit-mask-image: url(../../../public/img/icons/icon_label.svg);
    width: 30px;
    height: 30px;
    mask-size: 24px;
    -webkit-mask-size: 24px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}

.img_check{
    width: 26px;
    height: 26px;
}

.ws_label_back{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 24;
}

.ws_label_front{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 25;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.ws_label_box{
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.ws_label_box_title{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.ws_label_box_body{
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    margin: 8px;
    padding: 8px;
}

.ws_label_box_body_top{
    height: 24px;
    border-bottom: 1px solid #eee;
}

.ws_label_box_body_text{
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    margin: 8px 0;
}

.ws_label_box_body_bottom{
    margin-top: 8px;
}

.ws_label_box_body_bottom input{
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    height: 30px;
    text-align: center;
}

.ws_label_box_bottom{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 8px;
    justify-content: center;
}

.ws_white_button{
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    cursor: pointer;
}

.wt_label_area{
    display: flex;
    display: -webkit-flex;
    padding-left: 100px;
    position: relative;
}

.wt_label_area_frame{
    position: relative;
    margin-left: -8px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    border: 1px solid #eee;
    width: 100px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    cursor: pointer;
    transition: 0.5s;
}

.wt_label_area_frame_choose{
    position: relative;
    margin-left: -8px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    width: 100px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    cursor: pointer;
    z-index: 10;
    background-color: #1296db;
    color:#fff;
    transition: 0.5s;
}

.wt_workstream_area{
    background-color: #fff;
    border: 1px solid #eee;
    z-index: 11;
    position: relative;
}

.wt_workstream_control_area{
    display: flex;
    display: -webkit-flex;
    padding: 8px;
    justify-content: flex-end;
    background-color: #eee;
}

.wt_workstream_control_area_path{
    display: flex;
    display: -webkit-flex;
}

.wt_workstream_content_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
}

.wt_workstream_content_item_content{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.wt_workstream_content_item_icon{
    width: 40px;
}

.wt_workstream_content_item_name{
    width: 120px;
}

.wt_workstream_content_item_description{
    width: 120px;
}

.wt_workstream_content_item_edit{
    width: 80px;
}

.ws_editbox_item{
    display: flex;
    display: -webkit-flex;
    margin-top: 8px;
}

.ws_editbox_item_left{
    width: 32px;
    text-align: right;
    height: 30px;
    line-height: 30px;
}

.ws_editbox_item_right input{
    width: 120px;
    text-align: left;
    padding-left: 8px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    margin-left: 8px;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
}

.ws_editbox_item_right div{
    width: 120px;
    text-align: left;
    padding-left: 8px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    margin-left: 8px;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
}

.ws_changelabel_item{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    position: relative;
    width: 150px;
}

.checkpic_area{
    position: absolute;
    top: 0;
    right: 0;
}

.ws_label_box_body_title{
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #eee;
    height: 30px;
}

.ws_label_box_body_title_item{
    border-left: 2px solid #1296db;
    text-align: left;
    padding-left: 8px;
    height: 24px;
}

.ws_label_box_body_content{
    display: flex;
    display: -webkit-flex;
}

.ws_label_box_body_content_item{
    width: 96px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    padding-left: 8px;
}

.ws_label_box_body_content_item_botton{
    display: flex;
    display: -webkit-flex;
    width: 98px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;
}

.ws_white_button_small{
    border: 1px solid #eee;
    width: 30px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    height: 24px;
    cursor: pointer;
}

.ws_label_box_button_layer{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    padding-right: 8px;
}
</style>

