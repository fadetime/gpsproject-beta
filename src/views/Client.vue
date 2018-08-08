<template>
<div id="client">
    <div class="topbutton">

        <div class="topbutton-left">
            <input type="text" v-model="searchclientb" @keyup.enter="searchb" placeholder="搜索客户信息" v-if="!clientpage">
            <input type="text" v-model="searchclienta" @keyup.enter="searcha" placeholder="搜索合作商信息" v-else>
        </div>

        <div class="topbutton-center">
            <md-button :class="classA" @click="changepageA" style="font-size:20px;width:100px;height:40px;">合作商页</md-button>
            <md-button :class="classB" @click="changepageB" style="font-size:20px;width:100px;height:40px;">客户页面</md-button>
        </div>

        <div class="topbutton-right">
            <div class="addbutton">
                <md-button class="md-raised md-primary" @click="showDialog" style="font-size:20px;width:100px;height:40px;">+ 添加</md-button>
            </div>
        </div>

    </div>

    <div class="centertable">
        <div v-if="!clientpage">
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item">
                            <span>名称</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>送货地址</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>联系电话</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>邮编</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>状态</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>操作</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card md-with-hover v-for="(item,index) in allclientbinfo" :key="index" style="background-color: #eff3f5;">
                <md-card-content>
                    <div class="tablebody">
                        <div class="tabletitle-item">
                            <span>{{item.clientbname}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientbaddress}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientbphone}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientbpostcode}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientbstatus}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <img src="../../public/img/icons/edit.png" alt="edit" @click="editClientB(item)" style="width:20px;margin:0 10px">
                            <img src="../..//public/img/icons/dele.png" alt="delete" @click="removeClientB(item)" style="width:30px;margin:0 10px">
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>

        <div v-else>
            <md-card style="background-color: #eff3f5">
                <md-card-content>
                    <div class="tabletitle">
                        <div class="tabletitle-item">
                            <span>名称</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>送货地址</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>联系电话</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>邮箱</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>合同起始时间</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>合同期限</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>操作</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card md-with-hover v-for="(item,index) in allclientainfo" :key="index" style="background-color: #eff3f5;">
                <md-card-content>
                    <div class="tablebody">
                        <div class="tabletitle-item">
                            <span>{{item.clientaname}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientaaddress}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientaphone}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientamail}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientatime|datefilter}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <span>{{item.clientacontract}}</span>
                        </div>
                        <div class="tabletitle-item">
                            <img src="../../public/img/icons/edit.png" alt="edit" @click="editClientA(item)" style="width:20px;margin:0 10px">
                            <img src="../..//public/img/icons/dele.png" alt="delete" @click="removeClientA(item)" style="width:30px;margin:0 10px">
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>

    <!-- Dialog b start-->
    <md-dialog :md-active.sync="showDialogb" style="width:500px">
        <md-dialog-title style="font-size:30px">客户管理</md-dialog-title>
        <div class="dialogb-body">
            <div class="dialogb-body-left">
                <md-field style="margin:20px auto" :class="classname">
                    <label style="font-size:20px">客户名称</label>
                    <md-input v-model="clientbname" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error">客户标识信息，必填项目</span>
                </md-field>

                <md-field style="margin:20px auto" :class="classadd">
                    <label style="font-size:20px">客户地址</label>
                    <md-input v-model="clientbaddress" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error">客户地址标识信息</span>
                </md-field>

                <md-field style="margin:20px auto" :class="classpho">
                    <label style="font-size:20px">客户电话</label>
                    <md-input v-model="clientbphone" type="number" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error">客户电话标识信息</span>
                </md-field>
            </div>
            <div class="dialogb-body-right">

                <md-field style="margin:20px auto" :class="classpos">
                    <label style="font-size:20px">客户邮编</label>
                    <md-input v-model="clientbpostcode" style="border-bottom: 1px solid #000;font-size:20px;height:55px"></md-input>
                    <span class="md-error">客户邮编标识信息</span>
                </md-field>

                <md-field style="margin:20px auto" :class="classser">
                    <label for="choseaname" style="font-size:20px">服务商</label>
                    <md-select v-model="choseaname" name="choseaname" id="choseaname" style="border-bottom: 1px solid #000;font-size:20px;height:55px;padding-top:21px">
                        <md-option :value="item._id" v-for="(item,index) in allclientainfo" :key="index">{{item.clientaname}}</md-option>
                    </md-select>
                    <span class="md-error">所属服务商</span>
                </md-field>

                <div style="padding-top:10px">
                    <div>
                        <span style="font-size:20px">客户状态</span>
                    </div>
                    <div class="dialogb-body-status">
                        <div class="dialogb-body-status-left">
                            <div>
                                <input type="radio" name="status" v-model="clientbstatus" value="active">
                            </div>
                            <div style="padding-top: 3px;">
                                <span style="font-size:20px">active</span>
                            </div>
                        </div>
                        <div class="dialogb-body-status-right">
                            <div>
                                <input type="radio" name="status" v-model="clientbstatus" value="inactive">
                            </div>
                            <div style="padding-top: 3px;">
                                <span style="font-size:20px">inactive</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="showDialogb = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
            <md-button class="md-raised md-primary" v-if="savemodeb" @click="addclientb" style="font-size:20px;width:100px;height:40px">保存</md-button>
            <md-button class="md-raised md-primary" v-else @click="confirmEditClientB" style="font-size:20px;width:100px;height:40px">修改</md-button>
        </md-dialog-actions>

    </md-dialog>
    <!-- Dialog b end-->

    <!-- deleteDialog b start-->
    <md-dialog :md-active.sync="deleteDialogb" style="width:500px">
        <md-dialog-title style="font-size:30px;color:#d74342">删除客户</md-dialog-title>
        <div style="margin:20px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;">
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

        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="deleteDialogb = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
            <md-button class="md-raised md-accent" @click="confirmdeleteB" style="font-size:20px;width:100px;height:40px">删除</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- deleteDialog b end-->

    <!-- Dialog a start-->
    <md-dialog :md-active.sync="showDialoga" style="width:900px">
        <md-dialog-title style="font-size:30px">合作商管理</md-dialog-title>
        <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;">
            <div style="width:400px;margin:0 auto">

                <md-field style="margin:20px auto" :class="nameclass">
                    <label style="font-size:20px">合作商名称</label>
                    <md-input v-model="clientaname" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-error">合作商标识信息，必填项目</span>
                </md-field>

                <md-field style="margin:20px auto" :class="addclass">
                    <label style="font-size:20px">合作商地址</label>
                    <md-input v-model="clientaaddress" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-error">合作商地址标识信息，必填项目</span>
                </md-field>

                <md-field style="margin:20px auto" :class="phoclass">
                    <label style="font-size:20px">合作商电话</label>
                    <md-input v-model="clientaphone" type="number" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-error">合作商电话标识信息，必填项目</span>
                </md-field>

                <md-field style="margin:20px auto" :class="timclass">
                    <label style="font-size:20px">合同时间</label>
                    <md-input v-model="clientatime" type="date" style="border-bottom: 1px solid #000;font-size:15px;height:55px;padding-top:21px"></md-input>
                    <span class="md-error">合作商合同起始时间，必填项目</span>
                </md-field>

                <md-field style="margin:20px auto" :class="posclass">
                    <label style="font-size:20px">合作商邮编</label>
                    <md-input v-model="clientapostcode" type="number" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-error">合作商邮编标识信息，必填项目</span>
                </md-field>
            </div>
            <div style="width:400px;margin:0 auto">
                <md-field style="margin:20px auto" :class="usrclass">
                    <label style="font-size:20px">合作商账户</label>
                    <md-input v-model="clientausername" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-error">合作商登陆账户，必填项目</span>
                </md-field>

                <md-field style="margin:20px auto" :class="pswclass">
                    <label style="font-size:20px">合作商密码</label>
                    <md-input v-model="clientapsw" type="password" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-error">合作商登陆密码，必填项目</span>
                </md-field>

                <md-field style="margin:20px auto" :class="conclass">
                    <label style="font-size:20px">合作期限</label>
                    <md-input v-model="clientacontract" type="number" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-error" v-if="!clientacontract">合同有限年限，必填项目</span>
                </md-field>

                <md-field style="margin:20px auto" :class="maiclass">
                    <label style="font-size:20px">合作商邮箱</label>
                    <md-input v-model="clientamail" type="email" style="border-bottom: 1px solid #000;font-size:25px;height:55px"></md-input>
                    <span class="md-error" v-if="!clientamail">合作商邮箱标识信息，必填项目</span>
                </md-field>

                <div>
                    <div>
                        <span style="font-size:20px">合作商状态</span>
                    </div>
                    <div class="dialogb-body-status">
                        <div class="dialogb-body-status-left">
                            <div>
                                <input type="radio" name="statusa" v-model="clientastatus" value="active" />
                            </div>
                            <div style="padding-top: 3px;">
                                <span style="font-size:20px">active</span>
                            </div>
                        </div>
                        <div class="dialogb-body-status-right">
                            <div>
                                <input type="radio" name="statusa" v-model="clientastatus" value="inactive">
                            </div>
                            <div style="padding-top: 3px;">
                                <span style="font-size:20px">inactive</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="showDialoga = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
            <md-button class="md-raised md-primary" v-if="savemodeb" @click="addclienta" style="font-size:20px;width:100px;height:40px">保存</md-button>
            <md-button class="md-raised md-primary" v-else @click="confirmEditClientA" style="font-size:20px;width:100px;height:40px">修改</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog a end-->

    <!-- deleteDialog a start-->
    <md-dialog :md-active.sync="deleteDialoga" style="width:500px">
        <md-dialog-title style="font-size:30px;color:#d74342">删除合作商</md-dialog-title>
        <div style="margin:20px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;">
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

        <md-dialog-actions style="margin:0 auto 10px auto">
            <md-button class="md-raised md-primary" @click="deleteDialoga = false" style="font-size:20px;width:100px;height:40px">关闭</md-button>
            <md-button class="md-raised md-accent" @click="confirmRemoveClientA" style="font-size:20px;width:100px;height:40px">删除</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- deleteDialog a end-->

    <!-- successd mesage start -->
    <md-dialog-alert :md-active.sync="successdmsg" md-content="操作成功" md-confirm-text="关闭" />
    <!-- successd mesage end -->
    <!-- error start -->
    <md-dialog-alert :md-active.sync="error" :md-content="erromsg" md-confirm-text="关闭" />
    <!-- error end -->
</div>
</template>

<script>
import axios from 'axios'
import config from '../../public/js/config.js'

export default {
    data() {
        return {
            selectedclient: '',
            clients: [],
            clientpage: false,
            pagestylea: '',
            pagestyleb: 'font-weight:bold;',
            allclientainfo: [],
            allclientbinfo: [],
            showDialoga: false,
            showDialogb: false,
            classA: 'md-raised',
            classB: 'md-raised md-primary',
            clientbname: '',
            clientbaddress: '',
            clientbphone: '',
            clientbstatus: 'active',
            clientbpostcode: '',
            successdmsg: false,
            error1: false,
            error2: false,
            error: false,
            erromsg: '发生未知错误',
            clientaname: '',
            clientaaddress: '',
            clientaphone: '',
            clientastatus: 'active',
            clientapostcode: '',
            clientausername: '',
            clientapsw: '',
            clientacontract: '',
            clientatime: '',
            clientamail: '',
            choseaname: '',
            _id: '',
            savemodeb: true,
            deleteDialoga: false,
            deleteDialogb: false,
            searchclienta: '',
            searchclientb: '',
            searchedclienta: '',
            searchedclientb: '',
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
            errser: false
        }
    },
    mounted() {
        this.getallclienta()
        this.getallclientb()
    },
    computed: {
        nameclass() {
            return {
                'md-invalid': this.nameErr
            }
        },
        addclass() {
            return {
                'md-invalid': this.addErr
            }
        },
        phoclass() {
            return {
                'md-invalid': this.phoErr
            }
        },
        conclass() {
            return {
                'md-invalid': this.conErr
            }
        },
        posclass() {
            return {
                'md-invalid': this.posErr
            }
        },
        usrclass() {
            return {
                'md-invalid': this.usrErr
            }
        },
        pswclass() {
            return {
                'md-invalid': this.pswErr
            }
        },
        timclass() {
            return {
                'md-invalid': this.timErr
            }
        },
        maiclass() {
            return {
                'md-invalid': this.maiErr
            }
        },
        classname() {
            return {
                'md-invalid': this.errname
            }
        },
        classadd() {
            return {
                'md-invalid': this.erradd
            }
        },
        classpho() {
            return {
                'md-invalid': this.errpho
            }
        },
        classpos() {
            return {
                'md-invalid': this.errpos
            }
        },
        classser() {
            return {
                'md-invalid': this.errser
            }
        },
    },
    methods: {
        searcha() {
            if (this.searchclienta == '') {
                this.getallclienta()
            } else {
                this.searchedclienta = this.allclientainfo.filter(element => {
                    return element.clientaname.toLowerCase().indexOf(this.searchclienta.toLowerCase()) !== -1
                })
                this.allclientainfo = this.searchedclienta
            }
        },
        searchb() {
            if (this.searchclientb == '') {
                this.getallclientb()
            } else {
                console.log('###')
                this.searchedclientb = this.allclientbinfo.filter(element => {
                    return element.clientbname.toLowerCase().indexOf(this.searchclientb.toLowerCase()) !== -1
                })
                this.allclientbinfo = this.searchedclientb
            }
        },
        changepageA() {
            this.clientpage = true
            this.pagestylea = 'font-weight:bold;'
            this.pagestyleb = ''
            this.classA = 'md-raised md-primary'
            this.classB = 'md-raised'
        },
        changepageB() {
            this.clientpage = false
            this.pagestyleb = 'font-weight:bold;'
            this.pagestylea = ''
            this.classA = 'md-raised'
            this.classB = 'md-raised md-primary'
        },
        showDialog() {
            if (!this.clientpage) {
                this.savemodeb = true
                this.showDialogb = true
                this.clientbname = ''
                this.clientbaddress = ''
                this.clientbphone = ''
                this.clientbpostcode = ''
                this.clientbserve = ''
            } else {
                this.savemodeb = true
                this.showDialoga = true
                this.clientaname = ''
                this.clientaaddress = ''
                this.clientaphone = ''
                this.clientapostcode = ''
                this.clientausername = ''
                this.clientapsw = ''
                this.clientacontract = ''
                this.clientatime = ''
                this.clientamail = ''
            }
        },
        getallclienta() {
            axios.get(config.server + '/clienta')
                .then((res) => {
                    this.allclientainfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getallclientb() {
            axios.get(config.server + '/clientb')
                .then((res) => {
                    this.allclientbinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        addclienta() {
            if (!this.clientaname || !this.clientaaddress || !this.clientaphone || !this.clientapostcode || !this.clientausername || !this.clientapsw || !this.clientacontract || !this.clientatime || !this.clientamail) {
                if (!this.clientaname) {
                    this.nameErr = true
                } else {
                    this.nameErr = false
                }
                if (!this.clientaaddress) {
                    this.addErr = true
                } else {
                    this.addErr = false
                }
                if (!this.clientaphone) {
                    this.phoErr = true
                } else {
                    this.phoErr = false
                }
                if (!this.clientacontract) {
                    this.conErr = true
                } else {
                    this.conErr = false
                }
                if (!this.clientapostcode) {
                    this.posErr = true
                } else {
                    this.posErr = false
                }
                if (!this.clientausername) {
                    this.usrErr = true
                } else {
                    this.usrErr = false
                }
                if (!this.clientapsw) {
                    this.pswErr = true
                } else {
                    this.pswErr = false
                }
                if (!this.clientatime) {
                    this.timErr = true
                } else {
                    this.timErr = false
                }
                if (!this.clientamail) {
                    this.maiErr = true
                } else {
                    this.maiErr = false
                }
            } else {
                this.nameErr = false
                this.addErr = false
                this.phoErr = false
                this.conErr = false
                this.posErr = false
                this.usrErr = false
                this.pswErr = false
                this.timErr = false
                this.maiErr = false
                axios.post(config.server + '/clienta', {
                        clientaname: this.clientaname,
                        clientaaddress: this.clientaaddress,
                        clientaphone: this.clientaphone,
                        clientastatus: this.clientastatus,
                        clientapostcode: this.clientapostcode,
                        clientausername: this.clientausername,
                        clientapsw: this.clientapsw,
                        clientacontract: this.clientacontract,
                        clientatime: this.clientatime,
                        clientamail: this.clientamail
                    })
                    .then((response) => {
                        console.log(response)
                        if (response.data.code == 1) {
                            this.error = true
                            this.erromsg = response.data.msg
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        } else if (response.data.code == 2) {
                            this.error = true
                            this.erromsg = response.data.msg
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        } else {
                            this.successdmsg = true
                            this.showDialoga = false
                            this.clientaname = ''
                            this.clientaaddress = ''
                            this.clientaphone = ''
                            this.clientastatus = ''
                            this.clientapostcode = ''
                            this.clientausername = ''
                            this.clientapsw = ''
                            this.clientacontract = ''
                            this.clientatime = ''
                            this.clientamail = ''
                            this.getallclienta()
                            setTimeout(() => {
                                this.successdmsg = false
                            }, 3000)
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        error = true
                        this.erromsg = response.data.msg
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    });
            }

        },
        addclientb() {
            if (!this.clientbname || !this.clientbaddress || !this.clientbphone || !this.clientbpostcode || !this.choseaname) {
                if (!this.clientbname) {
                    this.errname = true
                } else {
                    this.errname = false
                }
                if (!this.clientbaddress) {
                    this.erradd = true
                } else {
                    this.erradd = false
                }
                if (!this.clientbphone) {
                    this.errpho = true
                } else {
                    this.errpho = false
                }
                if (!this.clientbpostcode) {
                    this.errpos = true
                } else {
                    this.errpos = false
                }
                if (!this.choseaname) {
                    this.errser = true
                } else {
                    this.errser = false
                }
            } else {
                axios.post(config.server + '/clientb', {
                        clientbname: this.clientbname,
                        clientbaddress: this.clientbaddress,
                        clientbphone: this.clientbphone,
                        clientbstatus: this.clientbstatus,
                        clientbpostcode: this.clientbpostcode,
                        clientbserve: this.choseaname
                    })
                    .then((response) => {
                        if (response.data.code == 1) {
                            this.error = true
                            this.erromsg = response.data.msg
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        } else if (response.data.code == 2) {
                            this.error = true
                            this.erromsg = response.data.msg
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        } else {
                            this.successdmsg = true
                            this.showDialogb = false
                            this.clientbname = ''
                            this.clientbaddress = ''
                            this.clientbphone = ''
                            this.clientbstatus = ''
                            this.clientbpostcode = ''
                            this.getallclientb()
                            setTimeout(() => {
                                this.successdmsg = false
                            }, 3000)
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        error = true
                        this.erromsg = response.data.msg
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    });
            }
        },
        editClientB(item) {
            this.savemodeb = false
            this.showDialogb = true
            this._id = item._id
            this.clientbname = item.clientbname
            this.clientbaddress = item.clientbaddress
            this.clientbphone = item.clientbphone
            this.clientbstatus = item.clientbstatus
            this.clientbpostcode = item.clientbpostcode
            if (item.clientbserve == null) {
                this.choseaname = ''
                this.error = true
                this.erromsg = '找不到此供应商信息，请重新选择'
                setTimeout(() => {
                    this.error = false
                }, 4000)
            } else {
                this.choseaname = item.clientbserve._id
            }

        },
        confirmEditClientB() {
            axios.post(config.server + '/clientb/edit', {
                    _id: this._id,
                    clientbname: this.clientbname,
                    clientbaddress: this.clientbaddress,
                    clientbphone: this.clientbphone,
                    clientbstatus: this.clientbstatus,
                    clientbpostcode: this.clientbpostcode,
                    clientbserve: this.choseaname
                })
                .then((doc) => {
                    this.error = true
                    this.erromsg = doc.data.msg
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                    if (doc.data.code == 0) {
                        this.showDialogb = false
                        this.getallclientb()
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.error = true
                    this.erromsg = err
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                })
        },
        removeClientB(item) {
            this.deleteDialogb = true
            this._id = item._id
            this.clientbname = item.clientbname
            this.clientbaddress = item.clientbaddress
            this.clientbphone = item.clientbphone
            this.clientbstatus = item.clientbstatus
            this.clientbpostcode = item.clientbpostcode
            this.clientbserve = item.clientbserve
        },
        confirmdeleteB() {
            axios.post(config.server + '/clientb/remove', {
                    _id: this._id
                })
                .then((doc) => {
                    this.error = true
                    this.erromsg = doc.data.msg
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                    if (doc.data.code == 0) {
                        this.deleteDialogb = false
                        this.getallclientb()
                    }
                })
                .catch((err) => {
                    this.error = true
                    this.erromsg = err
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                })
        },
        editClientA(item) {
            this.savemodeb = false
            this.showDialoga = true
            this._id = item._id
            this.clientaname = item.clientaname
            this.clientaaddress = item.clientaaddress
            this.clientaphone = item.clientaphone
            this.clientastatus = item.clientastatus
            this.clientapostcode = item.clientapostcode
            this.clientausername = item.clientausername
            this.clientapsw = ''
            this.clientacontract = item.clientacontract
            let year = new Date(item.clientatime).getFullYear()
            let month = new Date(item.clientatime).getMonth() + 1
            if (month < 10) {
                month = '0' + month
            }
            let day = new Date(item.clientatime).getDate()
            if (day < 10) {
                day = '0' + day
            }
            this.clientatime = year + '-' + month + '-' + day
            this.clientamail = item.clientamail
        },
        removeClientA(item) {
            this.deleteDialoga = true
            this._id = item._id
            this.clientaname = item.clientaname
            this.clientaaddress = item.clientaaddress
            this.clientaphone = item.clientaphone
            this.clientastatus = item.clientastatus
            this.clientapostcode = item.clientapostcode
            this.clientausername = item.clientausername
            this.clientacontract = item.clientacontract
            this.clientatime = new Date(item.clientatime).toLocaleDateString()
            this.clientamail = item.clientamail
        },
        confirmEditClientA() {
            if (!this.clientaname || !this.clientaaddress || !this.clientaphone || !this.clientapostcode || !this.clientausername || !this.clientacontract || !this.clientatime || !this.clientamail) {
                if (!this.clientaname) {
                    this.nameErr = true
                } else {
                    this.nameErr = false
                }
                if (!this.clientaaddress) {
                    this.addErr = true
                } else {
                    this.addErr = false
                }
                if (!this.clientaphone) {
                    this.phoErr = true
                } else {
                    this.phoErr = false
                }
                if (!this.clientacontract) {
                    this.conErr = true
                } else {
                    this.conErr = false
                }
                if (!this.clientapostcode) {
                    this.posErr = true
                } else {
                    this.posErr = false
                }
                if (!this.clientausername) {
                    this.usrErr = true
                } else {
                    this.usrErr = false
                }
                if (!this.clientatime) {
                    this.timErr = true
                } else {
                    this.timErr = false
                }
                if (!this.clientamail) {
                    this.maiErr = true
                } else {
                    this.maiErr = false
                }
            } else {
                let editInfo
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
                        clientamail: this.clientamail
                    }
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
                        clientamail: this.clientamail
                    }
                }
                axios.post(config.server + '/clienta/edit', editInfo)
                    .then((doc) => {
                        console.log('#####')
                        console.log(this.clientatime)
                        this.error = true
                        this.erromsg = doc.data.msg
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                        if (doc.data.code == 0) {
                            this.showDialoga = false
                            this.getallclienta()
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        this.error = true
                        this.erromsg = err
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    })
            }

        },
        confirmRemoveClientA() {
            axios.post(config.server + '/clienta/remove', {
                    _id: this._id
                })
                .then((doc) => {
                    this.error = true
                    this.erromsg = doc.data.msg
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                    if (doc.data.code == 0) {
                        this.deleteDialoga = false
                        this.getallclienta()
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.error = true
                    this.erromsg = err
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                })
        }
    }
}
</script>

<style>
#client {
    width: 80%;
    margin: 20px auto;
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
    height: 40px;
    text-align: center;
    -web-kit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    font-size: 20px;
}

.topbutton-center {
    flex-basis: 30%;
    text-align: center;
    margin: 0 auto;
}

.topbutton-right {
    flex-basis: 30%;
    text-align: right;
}

.centertable {
    margin: 20px auto;
}

.tabletitle {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    font-size: 20px;
    font-weight: 600;
    height: 60px;
    line-height: 50px;
}

.tabletitle-item {
    margin: 0 auto;
    width: 300px;
}

.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
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
    width: 100%
}

.rmDialog-center-left {
    flex-basis: 28%;
    text-align: left;
}

.rmDialog-center-right {
    flex-basis: 60%;
    text-align: left;
}

.dialogb-body {
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
    padding-top: 15px
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
</style>
