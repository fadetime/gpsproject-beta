<template>
<div id="client">
    <div class="topbutton">
        <div class="topbutton-left">
            <span @click="changepageA" :style="pagestylea">合作商</span>
            <span>|</span>
            <span @click="changepageB" :style="pagestyleb">客户</span>
        </div>
        <div class="topbutton-right">
            <div class="findbutton">
                <md-autocomplete v-model="selectedclient" :md-options="clients">
                    <label>查询</label>
                </md-autocomplete>
            </div>
            <div class="addbutton">
                <md-button class="md-accent" @click="showDialog">+ 添加</md-button>
            </div>
        </div>
    </div>

    <div v-if="!clientpage">
        <div class="centertable">
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
            <div class="tablebody" v-for="(item,index) in allclientbinfo" :key="index">
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
                    <img src="../../public/img/icons/edit.png" alt="edit" @click="editClientB(item)">
                    <img src="../..//public/img/icons/dele.png" alt="delete" @click="removeClientB(item)">
                </div>
            </div>
        </div>
    </div>

    <!-- Dialog b start-->
    <md-dialog :md-active.sync="showDialogb">
        <md-dialog-title>客户管理</md-dialog-title>
        <md-tabs md-dynamic-height>
            <md-tab md-label="添加客户">
                <md-field>
                    <label>客户名称</label>
                    <md-input v-model="clientbname"></md-input>
                    <span class="md-helper-text" v-if="!clientbname">客户标识信息，必填项目</span>
                </md-field>

                <md-field>
                    <label>客户地址</label>
                    <md-input v-model="clientbaddress"></md-input>
                    <span class="md-helper-text" v-if="!clientbaddress">客户地址标识信息</span>
                </md-field>

                <md-field>
                    <label>客户电话</label>
                    <md-input v-model="clientbphone"></md-input>
                    <span class="md-helper-text" v-if="!clientbphone">客户电话标识信息</span>
                </md-field>

                <md-field>
                    <label>客户状态</label>
                    <md-input v-model="clientbstatus"></md-input>
                    <span class="md-helper-text" v-if="!clientbstatus">客户状态标识信息</span>
                </md-field>

                <md-field>
                    <label>客户邮编</label>
                    <md-input v-model="clientbpostcode"></md-input>
                    <span class="md-helper-text" v-if="!clientbpostcode">客户邮编标识信息</span>
                </md-field>

                <md-field>
                    <label for="choseaname">服务商</label>
                    <md-select v-model="choseaname" name="choseaname" id="choseaname">
                        <md-option :value="item._id" v-for="(item,index) in allclientainfo" :key="index">{{item.clientaname}}</md-option>
                    </md-select>
                </md-field>
            </md-tab>
        </md-tabs>

        <md-dialog-actions>
            <md-button class="md-primary" @click="showDialogb = false">Close</md-button>
            <md-button class="md-primary" v-if="savemodeb" @click="addclientb">Save</md-button>
            <md-button class="md-primary" v-if="!savemodeb" @click="confirmEditClientB">修改</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog b end-->

    <!-- deleteDialog b start-->
    <md-dialog :md-active.sync="deleteDialogb">
        <md-dialog-title>删除客户</md-dialog-title>
        <div>
            <span>客户名称:</span><span>{{clientbname}}</span>
        </div>
        <div>
            <span>客户地址:</span><span>{{clientbaddress}}</span>
        </div>
        <div>
            <span>客户电话:</span><span>{{clientbphone}}</span>
        </div>
        <div>
            <span>客户状态:</span><span>{{clientbstatus}}</span>
        </div>
        <div>
            <span>客户邮编:</span><span>{{clientbpostcode}}</span>
        </div>
        <md-dialog-actions>
            <md-button class="md-primary" @click="deleteDialogb = false">关闭</md-button>
            <md-button class="md-primary" @click="confirmdeleteB">删除</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- deleteDialog b end-->

    <div v-if="clientpage">
        <div class="centertable">
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
            <div class="tablebody" v-for="(item,index) in allclientainfo" :key="index">
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
                    <span>{{item.clientatime}}</span>
                </div>
                <div class="tabletitle-item">
                    <span>{{item.clientacontract}}</span>
                </div>
                <div class="tabletitle-item">
                    <img src="../../public/img/icons/edit.png" alt="edit" @click="editClientA(item)">
                    <img src="../..//public/img/icons/dele.png" alt="delete" @click="removeClientA(item)">
                </div>
            </div>
        </div>
    </div>

    <!-- Dialog a start-->
    <md-dialog :md-active.sync="showDialoga">
        <md-dialog-title>合作商管理</md-dialog-title>
        <md-tabs md-dynamic-height>
            <md-tab md-label="添加合作商">
                <md-field>
                    <label>合作商名称</label>
                    <md-input v-model="clientaname"></md-input>
                    <span class="md-helper-text" v-if="!clientaname">合作商标识信息，必填项目</span>
                </md-field>

                <md-field>
                    <label>合作商地址</label>
                    <md-input v-model="clientaaddress"></md-input>
                    <span class="md-helper-text" v-if="!clientaaddress">合作商地址标识信息</span>
                </md-field>

                <md-field>
                    <label>合作商电话</label>
                    <md-input v-model="clientaphone"></md-input>
                    <span class="md-helper-text" v-if="!clientaphone">合作商电话标识信息</span>
                </md-field>

                <md-field>
                    <label>合作商状态</label>
                    <md-input v-model="clientastatus"></md-input>
                    <span class="md-helper-text" v-if="!clientastatus">合作商状态标识信息</span>
                </md-field>

                <md-field>
                    <label>合作商邮编</label>
                    <md-input v-model="clientapostcode"></md-input>
                    <span class="md-helper-text" v-if="!clientapostcode">合作商邮编标识信息</span>
                </md-field>

                <md-field>
                    <label>合作商账户</label>
                    <md-input v-model="clientausername"></md-input>
                    <span class="md-helper-text" v-if="!clientausername">合作商登陆账户</span>
                </md-field>

                <md-field>
                    <label>合作商密码</label>
                    <md-input v-model="clientapsw"></md-input>
                    <span class="md-helper-text" v-if="!clientapsw">合作商登陆密码</span>
                </md-field>

                <md-field>
                    <label>合作期限</label>
                    <md-input v-model="clientacontract"></md-input>
                    <span class="md-helper-text" v-if="!clientacontract">合作商登陆密码</span>
                </md-field>

                <md-field>
                    <label>合同时间</label>
                    <md-input v-model="clientatime"></md-input>
                    <span class="md-helper-text" v-if="!clientatime">合作商合同起始时间</span>
                </md-field>

                <md-field>
                    <label>合作商邮箱</label>
                    <md-input v-model="clientamail"></md-input>
                    <span class="md-helper-text" v-if="!clientamail">合作商邮箱标识信息</span>
                </md-field>
            </md-tab>
        </md-tabs>

        <md-dialog-actions>
            <md-button class="md-primary" @click="showDialoga = false">Close</md-button>
            <md-button class="md-primary" v-if="savemodeb" @click="addclienta">Save</md-button>
            <md-button class="md-primary" v-if="!savemodeb" @click="confirmEditClientA">edit</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog a end-->

    <!-- deleteDialog a start-->
    <md-dialog :md-active.sync="deleteDialoga">
        <md-dialog-title>删除合作商</md-dialog-title>
        <div>
            <span>合作商名称:</span><span>{{clientaname}}</span>
        </div>
        <div>
            <span>合作商地址:</span><span>{{clientaaddress}}</span>
        </div>
        <div>
            <span>合作商电话:</span><span>{{clientaphone}}</span>
        </div>
        <div>
            <span>合作商状态:</span><span>{{clientastatus}}</span>
        </div>
        <div>
            <span>合作商邮编:</span><span>{{clientapostcode}}</span>
        </div>
        <div>
            <span>合作商账户:</span><span>{{clientausername}}</span>
        </div>
        <div>
            <span>合作期限:</span><span>{{clientacontract}}</span>
        </div>
        <div>
            <span>合同时间:</span><span>{{clientatime}}</span>
        </div>
        <div>
            <span>合作商邮编:</span><span>{{clientamail}}</span>
        </div>
        <md-dialog-actions>
            <md-button class="md-primary" @click="deleteDialoga = false">关闭</md-button>
            <md-button class="md-primary" @click="confirmRemoveClientA">删除</md-button>
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
            clientbname: '',
            clientbaddress: '',
            clientbphone: '',
            clientbstatus: '',
            clientbpostcode: '',
            successdmsg: false,
            error1: false,
            error2: false,
            error: false,
            erromsg: '发生未知错误',
            clientaname: '',
            clientaaddress: '',
            clientaphone: '',
            clientastatus: '',
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
            deleteDialogb: false
        }
    },
    mounted() {
        this.getallclienta()
        this.getallclientb()
    },
    methods: {
        changepageA() {
            this.clientpage = true
            this.pagestylea = 'font-weight:bold;'
            this.pagestyleb = ''
        },
        changepageB() {
            this.clientpage = false
            this.pagestyleb = 'font-weight:bold;'
            this.pagestylea = ''
        },
        showDialog() {
            if (!this.clientpage) {
                this.savemodeb = true
                this.showDialogb = true
                this.clientbname = ''
                this.clientbaddress = ''
                this.clientbphone = ''
                this.clientbstatus = ''
                this.clientbpostcode = ''
                this.clientbserve = ''
            } else {
                this.savemodeb = true
                this.showDialoga = true
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
            }
        },
        getallclienta() {
            axios.get('//127.0.0.1:3000/clienta')
                .then((res) => {
                    this.allclientainfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        getallclientb() {
            axios.get('//127.0.0.1:3000/clientb')
                .then((res) => {
                    this.allclientbinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        addclienta() {
            if (!this.clientaname || !this.clientaphone || !this.clientausername || !this.clientapsw) {
                this.error = true
                this.erromsg = '请填写必要信息'
                setTimeout(() => {
                    this.error1 = false
                }, 3000)
            } else {
                axios.post('//127.0.0.1:3000/clienta', {
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
            if (!this.clientbname || !this.clientbaddress || !this.clientbphone || !this.clientbpostcode) {
                this.error1 = true
                setTimeout(() => {
                    this.error1 = false
                }, 3000)
            } else {
                axios.post('//127.0.0.1:3000/clientb', {
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
            if(item.clientbserve ==null){
                this.choseaname =''
                this.error = true
                    this.erromsg = '找不到此供应商信息，请重新选择'
                    setTimeout(() => {
                        this.error = false
                    }, 4000)
            }else{
                this.choseaname = item.clientbserve._id
            }
            
        },
        confirmEditClientB() {
            axios.post('//127.0.0.1:3000/clientb/edit', {
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
            axios.post('//127.0.0.1:3000/clientb/remove', {
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
            this.clientapsw = item.clientapsw
            this.clientacontract = item.clientacontract
            this.clientatime = item.clientatime
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
            this.clientapsw = item.clientapsw
            this.clientacontract = item.clientacontract
            this.clientatime = item.clientatime
            this.clientamail = item.clientamail
        },
        confirmEditClientA() {
            axios.post('//127.0.0.1:3000/clienta/edit', {
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
                })
                .then((doc) => {
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
        },
        confirmRemoveClientA() {
            axios.post('//127.0.0.1:3000/clienta/remove', {
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
    flex-basis: 50%;
    text-align: left;
}

.topbutton-right {
    flex-basis: 50%;
    text-align: right;
}

.topbutton-right {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row-reverse wrap;
    flex-flow: row-reverse wrap;
}

.findbutton {
    order: 2;
}

.addbutton {
    order: 1;
}

.centertable {
    background-color: #eff3f5;
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
    width: 300px;
}

.tablebody {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}
</style>
