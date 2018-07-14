<template>
<div id="car">
    <div class="topbutton">
        <div class="findbutton">
            <md-autocomplete v-model="selectedCountry" :md-options="employees" @md-opened="selectedCountry=''" :md-fuzzy-search="true">
                <label>Manager</label>

                <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                    <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                </template>

                <template slot="md-autocomplete-empty" slot-scope="{ term }">
                    No countries matching "{{ term }}" were found. <a @click="noop()">Create a new</a> one!
                </template>
            </md-autocomplete>
        </div>
        <div class="addbutton">
            <md-button class="md-accent" @click="showDialog = true">+ 添加</md-button>
        </div>
    </div>

    <div class="centertable">
        <div class="tabletitle">
            <div class="tabletitle-item">
                <span>车牌</span>
            </div>
            <div class="tabletitle-item">
                <span>车型</span>
            </div>
            <div class="tabletitle-item">
                <span>尺寸</span>
            </div>
            <div class="tabletitle-item">
                <span>出车次数</span>
            </div>
            <div class="tabletitle-item">
                <span>备注</span>
            </div>
            <div class="tabletitle-item">
                <span>操作</span>
            </div>
        </div>
        <div class="tablebody" v-for="(item,index) in allcarinfo" :key="index">
            <div class="tabletitle-item">
                <span>{{item.carid}}</span>
            </div>
            <div class="tabletitle-item">
                <span>{{item.cartype}}</span>
            </div>
            <div class="tabletitle-item">
                <span>{{item.carsize}}</span>
            </div>
            <div class="tabletitle-item">
                <span>{{item.cartimes}}</span>
            </div>
            <div class="tabletitle-item">
                <span>{{item.carnote}}</span>
            </div>
            <div class="tabletitle-item">
                <img src="../../public/img/icons/edit.png" alt="edit" @click="editbutton(item)">
                <img src="../..//public/img/icons/dele.png" alt="delete" @click="removebutton(item)">
            </div>
        </div>
    </div>

    <!-- Dialog start-->
    <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>车辆管理</md-dialog-title>

        <md-tabs md-dynamic-height>
            <md-tab md-label="添加车辆">
                <md-field>
                    <label>车牌号码</label>
                    <md-input v-model="carid"></md-input>
                    <span class="md-helper-text" v-if="!carid">车辆标识信息，必填项目</span>
                </md-field>

                <md-field>
                    <label>车型</label>
                    <md-input v-model="cartype"></md-input>
                    <span class="md-helper-text" v-if="!cartype">请填写车型信息</span>
                </md-field>

                <md-field>
                    <label>尺寸</label>
                    <md-input v-model="carsize"></md-input>
                    <span class="md-helper-text" v-if="!carsize">请填写车辆尺寸</span>
                </md-field>

                <md-field>
                    <label>出车次数</label>
                    <md-input v-model="cartimes"></md-input>
                    <span class="md-helper-text" v-if="!cartimes">如不填写默认为0</span>
                </md-field>

                <md-field>
                    <label>备注</label>
                    <md-input v-model="carnote"></md-input>
                </md-field>
            </md-tab>
        </md-tabs>

        <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
            <md-button class="md-primary" @click="addcar">Save</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- Dialog end-->
    <!-- successd mesage start -->
    <md-dialog-alert :md-active.sync="successdmsg" md-content="操作成功" md-confirm-text="关闭" />
    <!-- successd mesage end -->
    <!-- error 1 start -->
    <md-dialog-alert :md-active.sync="error" :md-content="errormsg" md-confirm-text="关闭" />
    <!-- error 1 end -->
    <!-- error 2 start -->
    <md-dialog-alert :md-active.sync="error2" md-content="提交出现错误" md-confirm-text="关闭" />
    <!-- error 2 end -->
    <!-- error 3 start -->
    <md-dialog-alert :md-active.sync="error3" md-content="车牌号已存在" md-confirm-text="关闭" />
    <!-- error 3 end -->

    <!-- edit dialog start-->
    <md-dialog :md-active.sync="showDialogtest" style="width:60%" class="editdialog">
        <md-dialog-title>修改车辆信息</md-dialog-title>
        <div>
            <md-field>
                <label>车牌号码:</label>
                <md-input v-model="carid" style="border-bottom: 1px solid;"></md-input>
            </md-field>
        </div>
        <div>
            <md-field>
                <label>车辆类型:</label>
                <md-input v-model="cartype" style="border-bottom: 1px solid;"></md-input>
            </md-field>
        </div>
        <div>
            <md-field>
                <label>车辆尺寸:</label>
                <md-input v-model="carsize" style="border-bottom: 1px solid;"></md-input>
            </md-field>
        </div>
        <div>
            <md-field>
                <label>出车次数:</label>
                <md-input v-model="cartimes" style="border-bottom: 1px solid;"></md-input>
            </md-field>
        </div>
        <div>
            <md-field>
                <label>车辆备注:</label>
                <md-input v-model="carnote" style="border-bottom: 1px solid;"></md-input>
            </md-field>
        </div>
        <div>
            <md-datepicker v-model="cardate" />
        </div>
        <md-dialog-actions>
            <md-button class="md-primary" @click="showDialogtest = false">Close</md-button>
            <md-button class="md-primary" @click="confirmedit">Save</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- edit dialog end-->

    <!-- remove dialog start-->
    <md-dialog :md-active.sync="removeDialog" style="width:60%" class="editdialog">
        <md-dialog-title>修改车辆信息</md-dialog-title>
        <div>
            <span>车牌号码:</span><span>{{carid}}</span>
        </div>
        <div>
            <span>车辆类型:</span><span>{{cartype}}</span>
        </div>
        <div>
            <span>车辆尺寸:</span><span>{{carsize}}</span>
        </div>
        <div>
            <span>出车次数:</span><span>{{cartimes}}</span>
        </div>
        <div>
            <span>车辆备注:</span><span>{{carnote}}</span>
        </div>
        <div>
            <span>加入时间:</span><span>{{cardate}}</span>
        </div>
        <md-dialog-actions>
            <md-button class="md-primary" @click="removeDialog = false">Close</md-button>
            <md-button class="md-primary" @click="confirmremove">remove</md-button>
        </md-dialog-actions>
    </md-dialog>
    <!-- remove dialog end-->
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Car',
    data() {
        return {
            successdmsg: false,
            error: false,
            errormsg: '发生未知错误请联系更牛逼的人',
            error2: false,
            error3: false,
            carid: '',
            cartype: '',
            carsize: '',
            cartimes: '',
            carnote: '',
            cardate: '',
            _id: '',
            showDialog: false,
            showDialogtest: false,
            removeDialog: false,
            selectedCountry: '',
            allcarinfo: [],
            testvalue: '',
            employees: [
                'Algeria',
                'Argentina',
                'Brazil',
                'Canada',
                'Italy',
                'Japan',
                'United Kingdom',
                'United States'
            ],
        }
    },
    mounted() {
        this.getallcar()
    },
    methods: {
        editbutton(item) {
            this._id = item._id
            this.carid = item.carid
            this.cartype = item.cartype
            this.carsize = item.carsize
            this.cartimes = item.cartimes
            this.carnote = item.carnote
            this.showDialogtest = true
        },
        removebutton(item) {
            this._id = item._id
            this.carid = item.carid
            this.cartype = item.cartype
            this.carsize = item.carsize
            this.cartimes = item.cartimes
            this.carnote = item.carnote
            this.removeDialog = true

        },
        confirmedit() {
            axios.post('//127.0.0.1:3000/car/update', {
                    _id: this._id,
                    carid: this.carid,
                    cartype: this.cartype,
                    carsize: this.carsize,
                    cartimes: this.cartimes,
                    carnote: this.carnote
                })
                .then((res) => {
                    if (res.data.code == 0) {
                        this.error = true
                        this.errormsg = res.data.msg
                        this.showDialogtest = false
                        this.getallcar()
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    } else {
                        this.error = true
                        this.errormsg = res.data.msg
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        confirmremove() {
            axios.post('//127.0.0.1:3000/car/remove', {
                    _id: this._id
                })
                .then((res) => {
                    if (res.data.code == 0) {
                        this.error = true
                        this.errormsg = res.data.msg
                        this.removeDialog = false
                        this.getallcar()
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    } else {
                        this.error = true
                        this.errormsg = res.data.msg
                        setTimeout(() => {
                            this.error = false
                        }, 3000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getallcar() {
            axios.get('//127.0.0.1:3000/car')
                .then((res) => {

                    this.allcarinfo = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        addcar() {
            if (!this.carid || !this.cartype || !this.carsize || !this.cartimes) {
                this.error = true
                this.errormsg = res.data.msg
                setTimeout(() => {
                    this.error = false
                }, 3000)
            } else {
                axios.post('//127.0.0.1:3000/car', {
                        carid: this.carid,
                        cartype: this.cartype,
                        carsize: this.carsize,
                        cartimes: this.cartimes,
                        carnote: this.carnote,
                    })
                    .then((response) => {
                        console.log(response)
                        if (response.data.code == 1) {
                            this.error3 = true
                            setTimeout(() => {
                                this.error3 = false
                            }, 3000)
                        } else {
                            this.successdmsg = true
                            this.showDialog = false
                            this.carid = ''
                            this.cartype = ''
                            this.carsize = ''
                            this.cartimes = ''
                            this.carnote = ''
                            setTimeout(() => {
                                this.successdmsg = false
                            }, 3000)
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        error2 = true
                        setTimeout(() => {
                            this.error2 = false
                        }, 3000)
                    });
            }
        }
    }
}
</script>

<style scoped>
#car {
    width: 80%;
    margin: 20px auto;
    border-bottom: 1px solid;
}

.topbutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row-reverse wrap;
    flex-flow: row-reverse wrap;
}

.centertable {
    background-color: #eff3f5;
}

.findbutton {
    flex-basis: 20%;
    order: 2;
}

.addbutton {
    flex-basis: 20%;
    order: 1;
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

.editdialog {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

.editdialog div {
    margin: 10px auto;
}
</style>
