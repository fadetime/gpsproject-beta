<template>
    <div id="announcement"
         ref="announcement"> 
        <div class="announcement_top">
            <div class="announcement_top_button" @click="showFirstPageDialog = true">
                <div v-if="value" class="little_light"></div>
                <div v-else class="little_light" style="border-left: 3px solid #ff5252;"></div>
                <span>首页公告</span>
            </div>
            <div class="announcement_top_button"
                 style="margin-left:10px;margin-right:20px;"
                 @click="NoticeMethod('open')">
                <span>通知公告</span>
            </div>
        </div>
        <div class="announcement_center">
            <div class="announcement_center_title">
                <div class="announcement_center_title_item_index">
                    <span>序号</span>
                </div>
                <div class="announcement_center_title_item">
                    <span>公告时间</span>
                </div>
                <div class="announcement_center_title_item">
                    <span>公告标题</span>
                </div>
                <div class="announcement_center_title_item_content">
                    <span>公告内容</span>
                </div>
                <div class="announcement_center_title_item_allstaff">
                    <span>包含员工</span>
                </div>
                <div class="announcement_center_title_item_leftstaff">
                    <span>未读员工</span>
                </div>
                <div class="announcement_center_title_item_state">
                    <span>公告状态</span>
                </div>
            </div>
        </div>
        <div class="announcement_content">
            <div class="announcement_content_item" v-for="(item,index) in noticeList" :key="index">
                <div class="announcement_content_item_index">
                    <span>{{index}}</span>
                </div>
                <div class="announcement_content_item_date">
                    <span>{{item.date | datefilter}}</span>
                </div>
                <div class="announcement_content_item_title">
                    <span>{{item.title}}</span>
                </div>
                <div class="announcement_content_item_content">
                    <span>{{item.content}}</span>
                </div>
                <div class="announcement_content_item_allstaff">
                    <span>{{item.allStaff.length}}</span>
                </div>
                <div class="announcement_content_item_leftstaff">
                    <span>{{item.leftStaff.length}}</span>
                </div>
                <div class="announcement_content_item_state">
                    <span v-if="item.isFinish" style="color:rgb(100, 221, 23)">已完成</span>
                    <span v-else style="color:rgb(255, 152, 0)">执行中</span>
                </div>
            </div>
        </div>
        <!-- notice dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showNoticeDialog" class="announcement_notice_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showNoticeDialog"
                 class="announcement_notice_front"
                 @click.self.prevent="showNoticeDialog = false">
                 <div class="announcement_notice_front_box">
                     <div class="announcement_notice_front_box_title">
                         <span>添加通知公告</span>
                     </div>
                     <div class="announcement_notice_front_box_body">
                         <div class="announcement_notice_front_box_body_item">
                             <div class="announcement_notice_front_box_body_item_left">
                                <span>公告标题</span>
                            </div>
                            <div class="announcement_notice_front_box_body_item_right">
                                <input type="text" v-model="noticeTitle">
                            </div>
                         </div>
                         <div class="announcement_notice_front_box_body_item">
                             <div class="announcement_notice_front_box_body_item_left">
                                 <span>公告内容</span>
                             </div>
                             <div class="announcement_notice_front_box_body_item_right">
                                 <textarea name="announcement_notice" v-model="noticeContent"></textarea>
                             </div>
                         </div>
                         <div class="announcement_notice_front_box_body_item">
                             <div class="announcement_notice_front_box_body_item_left">
                                 <span>包含人员</span>
                             </div>
                             
                             <div class="announcement_notice_front_box_body_item_right" @click="editNoticeStaff">
                                 <div class="announcement_notice_front_box_body_item_right_box" @mouseleave="showTextMethod('leave')" @mouseenter="showTextMethod('enter')">
                                     <span>{{inputStaffArray}}</span>
                                     <transition name="custom-classes-transition"
                                                enter-active-class="animated fadeIn faster"
                                                leave-active-class="animated fadeOut faster">
                                        <div v-if="isShowTipText" class="announcement_notice_front_box_body_item_right_box_tips">
                                            <div class="icon_create"></div>
                                            <div>
                                                <span>增加、修改</span>
                                            </div>
                                        </div>
                                     </transition>
                                 </div>
                             </div>
                         </div>
                         <div class="announcement_notice_front_box_body_item">
                             <div class="announcement_notice_front_box_body_item_left">
                                 <span>公告状态</span>
                             </div>
                             <div class="announcement_notice_front_box_body_item_right">
                                 <div class="announcement_notice_front_box_body_item_right_note">
                                     <span style="color:#ff9800">执行中-</span>
                                     <span>包含未阅读员工</span>
                                 </div>
                                 <div class="announcement_notice_front_box_body_item_right_note">
                                     <span style="color:#64dd17">已完成-</span>
                                     <span>所有员工已读或发送一个月后</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="announcement_notice_front_box_bottom">
                         <div class="announcement_notice_front_box_bottom_button" @click="noticeButton('cancel')">
                             <span>取消</span>
                         </div>
                         <div class="announcement_notice_front_box_bottom_button" @click="noticeButton('confirm')">
                             <span>确定</span>
                         </div>
                     </div>
                 </div>
            </div>
        </transition>
        <!-- notice dialog end -->

        <!-- first page dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showFirstPageDialog" class="announcement_notice_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showFirstPageDialog"
                 class="announcement_notice_front"
                 @click.self.prevent="showFirstPageDialog = false">
                <div class="announcement_notice_front_box">
                    <div class="announcement_notice_front_box_title">
                        <span>首页公告</span>
                    </div>
                    <div class="first_page_tips">
                        <span>tips:图片或文字必须包含其中一项否则无法发送</span>
                    </div>
                    <div class="first_page_body">
                        <div class="first_page_body_left">
                            <div class="first_page_body_left_title">
                                <div>
                                    <span>公告图片</span>
                                </div>
                            </div>
                            <div class="first_page_body_left_frame" @mouseenter="isShowClearButton = true" @mouseleave="isShowClearButton = false">
                                <div v-show="isShowClearButton" v-if="updateImagePreview || imageUrl" class="first_page_body_left_frame_clear" @click="updateImagePreview = null,imageUrl = null,isOldPic = false">
                                    <span>x</span>
                                </div>
                                <div v-if="updateImagePreview" class="first_page_body_left_frame_div" @click="uploadFile">
                                    <img :src="updateImagePreview"
                                        alt="newimg">
                                </div>
                                <div v-else-if="imageUrl" class="first_page_body_left_frame_div" @click="uploadFile">
                                    <img :src="imageUrl | imgurl" alt="first_page_pic">
                                </div>
                                <div v-else style="display:flex;display:-webkit-flex;align-items:center" @click="uploadFile">
                                    <div class="icon_add"></div>
                                </div>
                            </div>
                        </div>
                        <div class="first_page_body_right">
                            <div class="first_page_body_right_title">
                                <div>
                                    <span>公告文字</span>
                                </div>
                            </div>
                            <div>
                                <textarea name="" id="" style="width:228px;height:160px" v-model="textValue"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="first_page_body_other">
                        <!-- 通知开关 -->
                        <div class="onoffswitch">
                            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked v-model="value">
                            <label class="onoffswitch-label" for="myonoffswitch">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                        <!-- 通知开关 -->
                    </div>
                    <div class="announcement_notice_front_box_bottom">
                        <div class="announcement_notice_front_box_bottom_button" @click="firstPageButtonMethod('cancel')">
                            <span>取消</span>
                        </div>
                        <div class="announcement_notice_front_box_bottom_button" @click="firstPageButtonMethod('submit')">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- first page dialog end -->

        <!-- choise staff box start -->
        <transition name="choise-staff-back-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowStaffBox" class="announcement_notice_back" style="z-index:25"></div>
        </transition>
        <transition name="choise-staff-front-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowStaffBox"
                 class="announcement_notice_front" style="z-index:26"
                 @click.self.prevent="isShowStaffBox = false">
                <div class="announcement_notice_front_box">
                    <div class="announcement_notice_front_box_title">
                         <span>人员选择</span>
                    </div>
                    <div class="choise_staff_box_body">
                        <div class="choise_staff_box_body_title">
                            <div class="choise_staff_box_body_title_input">
                                <input type="checkbox" v-model="checkBoxFlag" @click="changeAllChecked">
                            </div>
                            <div class="choise_staff_box_body_title_index">
                                <span>序号</span>
                            </div>
                            <div class="choise_staff_box_body_title_name">
                                <span>姓名</span>
                            </div>
                        </div>
                        <div style="height:500px;overflow-y:auto">
                            <div v-for="(item,index) in allStaffArray" :key="index">
                                <label :for="index" class="choise_staff_box_body_item selectarea" @click="checkAll">
                                    <div class="choise_staff_box_body_item_input">
                                        <input :id="index" type="checkbox" :value="item.dirvername" v-model="choiseStaffArray">
                                    </div>
                                    <div class="choise_staff_box_body_item_index">
                                        <span>{{index}}</span>
                                    </div>
                                    <div class="choise_staff_box_body_item_name">
                                        <span>{{item.dirvername}}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="announcement_notice_front_box_bottom">
                         <div class="announcement_notice_front_box_bottom_button" @click="choiseStaffButton('cancel')">
                             <span>取消</span>
                         </div>
                         <div class="announcement_notice_front_box_bottom_button" @click="choiseStaffButton('confirm')">
                             <span>确定</span>
                         </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- choise staff box end -->

        <!-- tips box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutLeft">
            <div class="tipDialog"
                 v-if="showTipDialog">
                <div>
                    <span>{{tipMsg}}</span>
                </div>
            </div>
        </transition>
        <!-- tips box end -->
        <input type="file"
                style="display:none"
                id="notice_upload_file"
                @change="fileChange($event)"
                accept="image/*">
    </div>
</template>

<script>
import axios from "axios";
import config from "../../public/js/config.js";

export default {
    mounted() {
        this.getScreemHeightAndChangeDOM();
        this.getNoticeInfoMethod()
        this.getFirstPageNoticeInfoMethod()
    },

    data(){
        return{
            showNoticeDialog:false,
            isShowStaffBox:false,
            inputStaffArray:[],
            isShowTipText:false,
            allStaffArray:[],
            allStaffName:[],
            choiseStaffArray:[],
            checkBoxFlag:false,
            noticeTitle:null,
            noticeContent:null,
            showTipDialog:false,
            tipMsg:null,
            noticeList:[],
            showFirstPageDialog:false,
            value:false,
            textValue:null,
            updateImagePreview:null,
            updateImage:null,
            imageUrl:null,
            isShowClearButton:false,
            isOldPic:true
        }
    },

    methods: {
        uploadFile() {
            document.getElementById("notice_upload_file").click();
        },

        fileChange(el) {
            if (typeof FileReader === "undefined") {
                return alert("浏览器不支持上传图片");
            }
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            );
            this.updateImage = el.target.files[0];
            this.driverImage = "";
            el.target.value = "";
            this.isOldPic = false
        },

        firstPageButtonMethod(mode){
            if(mode === 'submit'){
                if(!this.updateImagePreview && !this.textValue){
                    this.tipMsg = '图片与文字请输入其中一项'
                    this.showTipDialog = true
                    setTimeout(() => {
                        this.showTipDialog = false
                    }, 2000);
                }else{
                    let payload = new FormData();
                    let tempDate = new Date().toISOString()
                    if(this.isOldPic){
                        payload.append("image", 'oldPic')
                    }else{
                        let maxSize = 200 * 1024; //200KB
                        if (this.updateImagePreview != null) {
                            lrz(this.updateImage, {
                                quality: 0.5
                            }).then(res => {
                                if (this.updateImage.size > maxSize) {
                                    this.updateImage = res.file;
                                }
                            })
                        }
                        payload.append("image", this.updateImage)
                    }
                    if(this.textValue){
                        payload.append("text", this.textValue);
                    }
                    payload.append("date", tempDate);
                    payload.append("isShow", this.value);
                    axios({
                            method: "post",
                            url: config.server + "/announcement/edit",
                            data: payload,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                        .then(doc => {
                            if(doc.data.code === 0){
                                this.showFirstPageDialog = false
                                this.tipMsg = '更新首页公告成功'
                                this.showTipDialog = true
                                this.getFirstPageNoticeInfoMethod()
                                setTimeout(() => {
                                    this.showTipDialog = false
                                }, 2000);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                
            }else{
                this.showFirstPageDialog = false
                this.textValue = null
                this.updateImagePreview = null
            }
        },

        getFirstPageNoticeInfoMethod(){
            axios
                .post(config.server + "/announcement/panelfind")
                .then(doc => {
                    if(doc.data.code === 0){
                        this.textValue = doc.data.doc.text
                        this.value = doc.data.doc.isShow
                        this.imageUrl = doc.data.doc.image
                    }else{
                        this.tipMsg = '获取首页公告失败'
                        this.showTipDialog = true
                        setTimeout(() => {
                            this.showTipDialog = false            
                        }, 2000);
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getNoticeInfoMethod(){
            axios
                .post(config.server + "/notice/panelget")
                .then(doc => {
                    if(doc.data.code === 0){
                        this.noticeList = doc.data.doc
                    }else{
                        this.tipMsg = '获取公告失败'
                        this.showTipDialog = true
                        setTimeout(() => {
                            this.showTipDialog = false            
                        }, 2000);
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                })
        },

        editNoticeStaff(){
            this.isShowStaffBox = !this.isShowStaffBox
            axios
                .get(config.server + "/dirver")
                .then(res => {
                    if(res.data.length != 0){
                        this.allStaffArray = res.data
                        this.allStaffName = res.data.map(item => {
                            return item.dirvername
                        })
                    }else{
                        console.log('获取数据失败')
                    }
                    
                })
                .catch(err => {
                    console.log("获取数据失败");
                    console.log(err);
                });
        },

        changeAllChecked(){
            setTimeout(() => {
                if(this.checkBoxFlag){
                    this.choiseStaffArray = this.allStaffName.slice(0)
                }else{
                    this.choiseStaffArray = []
                }
            }, 0);
        },

        checkAll(){
            setTimeout(() => {
                if(this.choiseStaffArray.length === this.allStaffName.length){
                    this.checkBoxFlag = true
                }else{
                    this.checkBoxFlag = false
                }
            }, 0);
        },

        choiseStaffButton(mode){
            if(mode === 'confirm'){
                this.inputStaffArray = this.choiseStaffArray.slice(0)
                this.isShowStaffBox = false
            }else{
                this.isShowStaffBox = false
            }
        },

        noticeButton(mode){
            if(mode === 'confirm'){
                console.log('confirm')
                let tempDate = new Date().toISOString()
                axios
                    .post(config.server + "/notice/create",{
                        date: tempDate,
                        title: this.noticeTitle,
                        content: this.noticeContent,
                        allStaff:this.inputStaffArray
                    })
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.showNoticeDialog = false
                            this.tipMsg = '添加成功'
                            this.showTipDialog = true
                            setTimeout(() => {
                                this.showTipDialog = false            
                            }, 2000);
                        }else{
                            this.tipMsg = '添加失败'
                            this.showTipDialog = true
                            setTimeout(() => {
                                this.showTipDialog = false            
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                this.showNoticeDialog = false
            }
        },

        showTextMethod(item){
            if(item === 'enter'){
                this.isShowTipText = true
            }else{
                this.isShowTipText = false
            }
        },

        getScreemHeightAndChangeDOM() {
            let screenHeight = document.documentElement.clientHeight;
            let lindBoxHeight = screenHeight - 84;
            this.$refs.announcement.style.height = lindBoxHeight + "px";
        },

        NoticeMethod(item) {
            if(item === 'open'){
                this.showNoticeDialog = true
            }else{
                this.showNoticeDialog = false
            }
        }
    }
};
</script>

<style scoped>
#announcement {
    background-color: #f7f7f7;
    margin-top: 4px;
}

.announcement_top {
    font-size: 16px;
    display: flex;
    display: -webkit-flex;
    padding: 10px 0;
    justify-content: flex-end;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.announcement_top_button {
    border: 1px solid #eee;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    background-color: #fff;
    line-height: 30px;
    cursor: pointer;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.little_light{
    border-left: 3px solid #7ff5c9;
    height: 20px;
    position: absolute;
    left: 10px;
    top: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.announcement_center {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 20px;
}

.announcement_center_title {
    display: flex;
    display: -webkit-flex;
    background-color: #fff;
    border-radius: 10px;
}

.announcement_center_title_item {
    width: 120px;
    border-left: 2px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    padding-right: 20px;
}

.announcement_center_title_item_index{
    width: 60px;
    border-left: 2px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
}

.announcement_center_title_item_content{
    width: 220px;
    border-left: 2px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 24px;
}

.announcement_center_title_item_allstaff{
    width: 80px;
    border-left: 2px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
}

.announcement_center_title_item_leftstaff{
    width: 80px;
    border-left: 2px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
}

.announcement_center_title_item_state{
    width: 80px;
    border-left: 2px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
}

.announcement_notice_back{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    z-index: 23;
}

.announcement_notice_front{
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

.announcement_notice_front_box{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
}

.announcement_notice_front_box_title{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background-color: #ff5252;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.announcement_notice_front_box_body{
    margin: 0 24px;
}

.announcement_notice_front_box_body_item_left{
    width: 68px;
    text-align: left;
    line-height: 30px;
}

.announcement_notice_front_box_body_item_right input{
    height: 30px;
    line-height: 30px;
    width: 180px;
}

.announcement_notice_front_box_body_item_right textarea{
    width: 180px;
    height: 100px;
}

.announcement_notice_front_box_body_item_right_box{
    border: 1px solid #b5b5b5;
    height: 30px;
    line-height: 30px;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    position: relative;
    display: flex;
    display: -webkit-flex;
    background-color: #eee;
}

.announcement_notice_front_box_body_item_right_box span{
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.announcement_notice_front_box_body_item_right_box_tips{
    position: absolute;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    color: #fff;
}

.announcement_notice_front_box_body_item{
    display: flex;
    display: -webkit-flex;
    margin-top: 10px;
}

.announcement_notice_front_box_bottom{
    display: flex;
    display: -webkit-flex;
    margin-top: 10px;
    justify-content: space-around;
    margin-bottom: 10px;
}

.announcement_notice_front_box_bottom_button{
    border: 1px solid #eee;
    background-color: #fff;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    width: 100px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.announcement_notice_front_box_body_item_right_note{
    text-align: left;
    width: 180px;
}

.icon_create{
    background: #fff;
    mask-image: url(../../public/img/icons/baseline-create-24px.svg);
    -webkit-mask-image: url(../../public/img/icons/baseline-create-24px.svg);
    width: 24px;
    height: 24px;
    margin-top: 2px;
}

.choise_staff_box_body{
    margin: 10px 24px 0 24px;
}

.choise_staff_box_body_title{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    border-radius: 10px;
}

.choise_staff_box_body_title_input{
    width: 30px;
    margin-top: 2px;
    border-left: 2px solid #e0e0e0;
}

.choise_staff_box_body_title_input input{
    width: 20px;
    height: 20px;
}

.choise_staff_box_body_title_index{
    width: 40px;
    border-left: 2px solid #e0e0e0;
    margin-left: 4px;
    padding-left: 8px;
}

.choise_staff_box_body_title_name{
    width: 100px;
    text-align: left;
    padding-left: 10px;
    border-left: 2px solid #e0e0e0;
    margin-left: 10px;
}

.choise_staff_box_body_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 8px;
}

.selectarea{
    cursor: pointer;
}

.choise_staff_box_body_item_input{
    width: 30px;
    margin-top: 2px;
    padding-left: 2px;
}

.choise_staff_box_body_item_input input{
    width: 20px;
    height: 20px;
}

.choise_staff_box_body_item_index{
    width: 40px;
    margin-left: 4px;
    padding-left: 10px;
}

.choise_staff_box_body_item_name{
    width: 100px;
    text-align: left;
    padding-left: 10px;
    margin-left: 12px;
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

.announcement_content_item{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 4px;
    height: 30px;
    line-height: 30px;
}

.announcement_content_item_index{
    width: 60px;
    background-color: #fff;
}

.announcement_content_item_date{
    width: 120px;
    text-align: left;
    padding-left: 24px;
    background-color: #fff;
}

.announcement_content_item_title{
    width: 120px;
    text-align: left;
    padding-left: 24px;
    background-color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.announcement_content_item_content{
    width: 220px;
    text-align: left;
    padding-left: 24px;
    background-color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.announcement_content_item_allstaff{
    width: 80px;
    text-align: center;
    background-color: #fff;
}

.announcement_content_item_leftstaff{
    width: 80px;
    text-align: center;
    background-color: #fff;
}

.announcement_content_item_state{
    width: 80px;
    text-align: center;
    background-color: #fff;
}

.first_page_tips{
    height: 30px;
    line-height: 30px;
    margin-top: 3px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.first_page_body{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 24px;
    margin-left: 24px;
    margin-right: 24px;
}

.first_page_body_left{
    border: 1px solid #eee;
    padding: 18px 14px 14px 12px;
    border-radius: 5px;
    position: relative;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.first_page_body_left_title{
    position: absolute;
    top: -18px;
    left: 0;
    right: 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.first_page_body_left_title div{
    border: 1px solid #e0e0e0;
    background-color: #fff;
    width: 100px;
    border-radius: 10px;
    
}

.first_page_body_right{
    border: 1px solid #eee;
    padding: 18px 14px 14px 12px;
    border-radius: 5px;
    position: relative;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    margin-left: 8px;
}

.first_page_body_right_title{
    position: absolute;
    top: -18px;
    left: 0;
    right: 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.first_page_body_right_title div{
    border: 1px solid #e0e0e0;
    background-color: #fff;
    width: 100px;
    border-radius: 10px;
    
}

.first_page_body_other{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 10px;
}

.first_page_body_left_frame{
    background-color: #e0e0e0;
    border: 1px solid #9a9a9a;
    height: 160px;
    width: 120px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    position: relative;
}

.first_page_body_left_frame_clear{
    position: absolute;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    z-index: 143;
    top: 4px;
    color: #000;
    background-color: #fff;
    font-size: 20px;
    line-height: 26px;
    right: 4px;
    border: 1px solid #eee;
    cursor: pointer;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.first_page_body_left_frame_div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.icon_add{
    background: #fff;
    mask-image: url(../../public/img/icons/baseline-add_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/img/icons/baseline-add_circle_outline-24px.svg);
    width: 54px;
    height: 54px;
    -webkit-mask-size: 54px 54px;
}

/* 1 */
.onoffswitch {
        position: relative;
        width: 83px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }

.onoffswitch-checkbox {
    display: none;
}

.onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #999999;
    border-radius: 20px;
}

.onoffswitch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}

.onoffswitch-inner:before,
.onoffswitch-inner:after {
    display: block;
    float: left;
    width: 50%;
    height: 30px;
    padding: 0;
    line-height: 30px;
    font-size: 19px;
    color: white;
    font-family: Trebuchet, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
}

.onoffswitch-inner:before {
    content: "ON";
    padding-left: 0;
    background-color: #4FACDB;
    color: #FFFFFF;
}

.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 13px;
    background-color: #F50E4C;
    color: #FAFAFA;
    text-align: right;
}

.onoffswitch-switch {
    display: block;
    width: 21px;
    margin: 4.5px;
    background: #FFFFFF;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 53px;
    border: 2px solid #999999;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
}

.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}

.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-switch {
    right: 0px;
}
</style>

