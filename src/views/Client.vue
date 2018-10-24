<template>
	<div id="client">
		<div class="topbutton">
			<div class="topbutton-left">
				<input type="text" v-model="searchclientb" @keyup.enter="searchb" placeholder="搜索客户名称" v-if="!clientpage">
				<input type="text" v-model="searchclienta" @keyup.enter="searcha" placeholder="搜索合作商信息" v-else>
			</div>

			<div class="topbutton-center">
				<md-button :class="classA" @click="changepageA" style="font-size:16px;width:80px;height:35px;">合作商页</md-button>
				<md-button :class="classB" @click="changepageB" style="font-size:16px;width:80px;height:35px;">客户页面</md-button>
			</div>
			<div class="topbutton-right">
				<div class="addbutton">
					<md-button class="md-raised md-primary" @click="showDialog" style="font-size:16px;width:80px;height:35px;">+ 添加</md-button>
				</div>
			</div>

		</div>

		<div class="centertable">
			<div v-if="!clientpage">
				<!-- 客户页面 -->
				<md-card style="background-color: #eff3f5;">
					<md-card-content>
						<div class="tabletitle">
							<div class="tabletitle-item" style="flex-basis:150px">
								<span>名称</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:450px">
								<span>送货地址</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>联系电话</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>邮编</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>状态</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>操作</span>
							</div>
						</div>
					</md-card-content>
				</md-card>

				<md-card md-with-hover v-for="(item,index) in allclientbinfo" :key="index" style="background-color: #eff3f5;">
					<md-card-content>
						<div class="tablebody">
							<div class="tabletitle-item" style="flex-basis:150px">
								<span>{{item.clientbname}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:450px">
								<span>{{item.clientbaddress}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>{{item.clientbphone}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>{{item.clientbpostcode}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>{{item.clientbstatus}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<img src="../../public/img/icons/edit.png" alt="edit" @click="editClientB(item)" style="width:20px;margin:0 10px">
								<img src="../..//public/img/icons/dele.png" alt="delete" @click="removeClientB(item)" style="width:30px;margin:0 10px">
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
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>名称</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:300px">
								<span>送货地址</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>联系电话</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:200px">
								<span>邮箱</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:150px">
								<span>合同起始时间</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>合同期限</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>操作</span>
							</div>
						</div>
					</md-card-content>
				</md-card>

				<md-card md-with-hover v-for="(item,index) in allclientainfo" :key="index" style="background-color: #eff3f5;">
					<md-card-content>
						<div class="tablebody">
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>{{item.clientaname}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:300px">
								<span>{{item.clientaaddress}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>{{item.clientaphone}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:200px">
								<span>{{item.clientamail}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:150px">
								<span>{{item.clientatime|datefilter}}</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<span>{{item.clientacontract}}个月</span>
							</div>
							<div class="tabletitle-item" style="flex-basis:100px">
								<img src="../../public/img/icons/edit.png" alt="edit" @click="editClientA(item)" style="width:20px;margin:0 10px">
								<img src="../..//public/img/icons/dele.png" alt="delete" @click="removeClientA(item)" style="width:30px;margin:0 10px">
							</div>
						</div>
					</md-card-content>
				</md-card>
			</div>
		</div>

		<!-- page bar start-->
		<!-- 合作商页码 -->
		<div v-if="clientpage">
			<div style="display:flex;justify-content: center;" v-if="pageCountA > 1">
				<div class="page-bar">
					<ul style="width:455px">
						<li @click="pageButtonA('A')">
							<span>上一页</span>
						</li>
						<li v-for="(item,index) in pagesA" :key="index" @click="pageButtonA(item)" :class="{'active':pageNow == item}">
							<span>{{item}}</span>
						</li>
						<li @click="pageButtonA('B')">
							<span>下一页</span>
						</li>
						<li>
							<span>共
								<i>{{pageCountA}}</i>页</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 客户页码 -->
		<div v-else>
			<div style="display:flex;justify-content: center;" v-if="pageCount > 1">
				<div class="page-bar">
					<ul style="width:455px">
						<li @click="pageButtonB('A')">
							<span>上一页</span>
						</li>
						<li v-for="(item,index) in pages" :key="index" @click="pageButtonB(item)" :class="{'active':pageNow == item}">
							<span>{{item}}</span>
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
		<!-- Dialog b start-->
		<md-dialog :md-active.sync="showDialogb" style="width:600px">
			<md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:12px">
				<span style="color:#fff">客户管理</span>
			</md-dialog-title>
			<div class="dialogb-body" style="overflow: auto;border: 3px dashed #eee;margin:0 15px">
				<div class="dialogb-body-item" style="padding-top:12px">
					<div class="dialogb-body-left">
						<input type="file" style="display:none" id="upload_file" @change="fileChange($event)" accept="image/*">
						<div class="photoarea" @click="uploadFile" v-if="!clientImage">
							<md-icon class="md-size-3x" style="padding-top:110px" v-if="!updateImagePreview">add_a_photo</md-icon>
							<img :src="updateImagePreview" alt="newimg" v-else style="height:100%">
						</div>
						<div class="photoarea" @click="uploadFile" v-else>
							<img :src="clientImage | imgurl" alt="newimg" style="height:100%">
						</div>
					</div>
					<div class="dialogb-body-right">
						<md-field style="margin:4px auto" :class="classname">
							<label style="font-size:18px">客户名称</label>
							<md-input v-model="clientbname" style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
							<span class="md-error">客户标识信息，必填项目</span>
						</md-field>

						<div style="display:flex;width:180px">
							<md-field style="margin:20px auto" :class="classser">
								<label for="choseArea" style="font-size:18px">所属地区</label>
								<md-select v-model="choseArea" name="choseArea" id="choseArea" style="border-bottom: 1px solid #000;font-size:20px;height:40px;padding-top:6px;width:150px">
									<md-option :value="item._id" v-for="(item,index) in allAreaArray" :key="index">{{item.areaName}}</md-option>
								</md-select>
								<span class="md-error">所属地区</span>
							</md-field>
							<md-button :class="classA" @click="openAreaWindow" style="font-size:18px;min-width:60px;height:30px;margin-top: 44px;">区域</md-button>
						</div>

						<md-field style="margin:30px auto" :class="classadd">
							<label style="font-size:18px">客户地址</label>
							<md-input v-model="clientbaddress" style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
							<span class="md-error">客户地址标识信息</span>
						</md-field>

					</div>
				</div>
				<div class="dialogb-body-item">
					<div class="dialogb-body-left">

						<md-field style="margin:10px auto" :class="classpho">
							<label style="font-size:18px">客户电话</label>
							<md-input v-model="clientbphone" style="border-bottom: 1px solid #000;font-size:16px;height:40px" @change="check_phone($event)"></md-input>
							<span class="md-error">请输入8位纯数字</span>
						</md-field>

						<md-field style="margin:20px auto" :class="classser">
							<label for="choseaname" style="font-size:18px">服务商</label>
							<md-select v-model="choseaname" name="choseaname" id="choseaname" style="border-bottom: 1px solid #000;font-size:20px;height:55px;padding-top:21px">
								<md-option :value="item._id" v-for="(item,index) in allclientainfo" :key="index">{{item.clientaname}}</md-option>
							</md-select>
							<span class="md-error">所属服务商</span>
						</md-field>
					</div>
					<div class="dialogb-body-right">

						<md-field style="margin:10px auto" :class="classpos">
							<label style="font-size:18px">客户邮编</label>
							<md-input v-model="clientbpostcode" style="border-bottom: 1px solid #000;font-size:16px;height:40px"></md-input>
							<span class="md-error">客户邮编标识信息</span>
						</md-field>

						<div style="padding-top:10px">
							<div>
								<span style="font-size:18px;color:rgba(0,0,0,0.54)">客户状态</span>
							</div>
							<div class="dialogb-body-status" style="padding-top:18px">
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
			<md-dialog-title style="font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
				<span style="color:#fff">删除客户</span>
			</md-dialog-title>
			<div style="margin:0 20px 20px 20px;background-color: #e6e6e6;box-shadow: 2px 2px 5px #636363;overflow:hidden auto">
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
			<div style="justify-content: center;display: flex;box-shadow:0 -1px 5px #000">
				<md-dialog-actions style="margin:0 auto 10px auto">
					<md-button class="md-raised md-primary" @click="deleteDialogb = false" style="font-size:20px;width:100px;height:40px">取消</md-button>
					<md-button class="md-raised md-accent" @click="confirmdeleteB" style="font-size:20px;width:100px;height:40px">删除</md-button>
				</md-dialog-actions>
			</div>
		</md-dialog>
		<!-- deleteDialog b end-->

		<!-- Dialog a start-->
		<md-dialog :md-active.sync="showDialoga" style="width:600px">
			<md-dialog-title style="font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom: 8px;">
				<span style="color:#fff">合作商管理</span>
			</md-dialog-title>
			<div style="overflow: auto;position: relative;">
				<div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 40px;">
					<span style="line-height:32px;margin:0 auto;margin: 10px 64px;color:#fff;font-size:16px">基本信息</span>
				</div>
				<div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;border: 3px dashed #448aff;margin: 20px 10px;">
					<div style="flex-basis:45%;margin:0 auto;padding-top:16px">
						<md-field style="margin:0 auto" :class="nameclass">
							<label style="font-size:16px">合作商名称</label>
							<md-input v-model="clientaname" style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"></md-input>
							<span class="md-error">合作商标识信息，必填项目</span>
						</md-field>

						<md-field style="margin:20px auto" :class="addclass">
							<label style="font-size:16px">合作商地址</label>
							<md-input v-model="clientaaddress" style="border-bottom: 1px solid #000;font-size:16px;height:41px;text-align:center"></md-input>
							<span class="md-error">合作商地址标识信息，必填项目</span>
						</md-field>

						<md-field style="margin:20px auto" :class="posclass">
							<label style="font-size:16px">合作商邮编</label>
							<md-input v-model="clientapostcode" type="number" style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"></md-input>
							<span class="md-error">合作商邮编标识信息，必填项目</span>
						</md-field>

						<md-field style="margin:20px auto" :class="phoclass">
							<label style="font-size:16px">合作商电话</label>
							<md-input v-model="clientaphone" style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center" @change="check_phone($event)"></md-input>
							<span class="md-error">请输入8位纯数字</span>
						</md-field>

						<md-field style="margin:20px auto" :class="timclass">
							<label style="font-size:16px">合同时间</label>
							<md-input v-model="clientatime" type="date" style="border-bottom: 1px solid #000;font-size:16px;height:40px;padding-top:21px;text-align:center"></md-input>
							<span class="md-error">合作商合同起始时间，必填项目</span>
						</md-field>

					</div>
					<div style="flex-basis:45%;margin:0 auto;padding-top: 16px">
						<md-field style="margin:0 auto" :class="usrclass">
							<label style="font-size:16px">合作商账户</label>
							<md-input v-model="clientausername" style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"></md-input>
							<span class="md-error">合作商登陆账户，必填项目</span>
						</md-field>

						<md-field style="margin:20px auto" :class="pswclass">
							<label style="font-size:16px">合作商密码</label>
							<md-input v-model="clientapsw" type="password" style="border-bottom: 1px solid #000;font-size:16px;height:41px;text-align:center"></md-input>
							<span class="md-error">合作商登陆密码，必填项目</span>
						</md-field>

						<md-field style="margin:20px auto" :class="conclass">
							<label style="font-size:16px">合作期限</label>
							<md-input v-model="clientacontract" style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center" @change="check_phone($event,'date')"></md-input>
							<span class="md-error">填写有效数字</span>
							<span style="font-size:16px;line-height:40px">个月</span>
						</md-field>

						<md-field style="margin:20px auto" :class="maiclass">
							<label style="font-size:16px">合作商邮箱</label>
							<md-input v-model="clientamail" type="email" style="border-bottom: 1px solid #000;font-size:16px;height:40px;text-align:center"></md-input>
							<span class="md-error" v-if="!clientamail">合作商邮箱标识信息，必填项目</span>
						</md-field>

						<div>
							<div>
								<span style="font-size:16px;color: rgba(0,0,0,0.54);">合作商状态</span>
							</div>
							<div class="dialogb-body-status">
								<div class="dialogb-body-status-left">
									<div>
										<input type="radio" name="statusa" v-model="clientastatus" value="active" id="choseactive" />
									</div>
									<div style="padding-top: 3px;">
										<label for="choseactive" style="font-size:16px"> active</label>
									</div>
								</div>
								<div class="dialogb-body-status-right">
									<div>
										<input type="radio" name="statusa" v-model="clientastatus" value="inactive" id="choseinactive">
									</div>
									<div style="padding-top: 3px;">
										<label for="choseinactive" style="font-size:16px"> inactive</label>
									</div>

								</div>
							</div>
						</div>
					</div>

				</div>
				<div style="height: 18px;position: relative;">
					<div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 40px;">
						<md-switch v-model="openSMS" style="margin:6px 25px" @change="openSendSMS">
							<span style="font-size:16px;color:#fff">短信提醒</span>
						</md-switch>
					</div>
				</div>
				<div>
					<transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
						<div style="border: 3px dashed #448aff;margin: 0 10px;" v-if="openSMS">
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
									<md-datepicker v-model="selectedSMSDate" md-immediately>
										<label style="font-size:16px">选择时间</label>
									</md-datepicker>
								</div>
							</div>
						</div>
						<div v-else style="margin: 0px 10px;border-top: 3px dashed #448aff;">
							<div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row wrap;flex-flow: row wrap;padding-top:30px">
								<div style="flex-basis:40%;padding:0 40px"></div>
								<div style="flex-basis:40%;padding:0 40px"></div>
							</div>
						</div>
					</transition>
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
			<md-dialog-title style="font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
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
					<md-button class="md-raised md-primary" @click="deleteDialoga = false" style="font-size:20px;width:100px;height:40px">关闭</md-button>
					<md-button class="md-raised md-accent" @click="confirmRemoveClientA" style="font-size:20px;width:100px;height:40px">删除</md-button>
				</md-dialog-actions>
			</div>
		</md-dialog>
		<!-- deleteDialog a end-->
		<!-- area window start -->
		<transition name="custom-classes-transition" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
			<div style="position:fixed;top:0;bottom:0;left:0;background-color:#fff;z-index:12;width:300px;box-shadow:1px 1px 5px" v-if="areaWindow">
				<div class="areawindow-title" style="background-color:#ff5252;height:30px;line-height:30px;box-shadow:1px 1px 5px">
					<span style="font-size:18px;color:#fff">区域管理</span>
				</div>
				<div style="height:8px">
					<!-- 顶部占位符 -->
				</div>
				<div style="display:flex;display:-webkit-flex;align-item:center;width:100%;height:100%;justify-content:flex-end">
					<div style="overflow-y: auto;width:260px" dir="rtl">
						<div style="box-shadow:1px 1px 5px;margin:10px;border-radius:5px;padding-left: 10px" v-for="(item,index) in allAreaArray" :key="index">
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
						<div style="border-top-left-radius: 100%;border-bottom-left-radius: 100%;background-color: #eee;width: 35px;height: 30px;" @click="closeAreaWindowMethod">
							<md-icon>reply_all</md-icon>
						</div>
					</div>
				</div>

				<transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
					<div v-if="addNewAreaMode" style="position:absolute;bottom:30px;width:100%;box-shadow:1px -1px 5px;border-top-left-radius: 8px;border-top-right-radius: 8px;background-color: #fff;">
						<div style="height:30px;line-height:30px;border-bottom:1px solid #448aff">
							<span v-if="!areaEditMode" style="font-size:18px;color:#448aff">
								添加区域
							</span>
							<span v-else style="font-size:18px;color:#448aff">
								修改区域
							</span>
						</div>
						<div style="display:flex;font-size:16px;padding-top:10px">
							<div style="width:100px">
								<span>区域名称</span>
							</div>
							<div>
								<input type="text" style="font-size:16px;border-top: none;border-left: none;border-right: none;border-bottom: 1px solid #696969;text-align:center;color:#2c3e50" v-model="areaName">
							</div>
						</div>
						<div style="display:flex;font-size:16px;padding-top:10px;padding-bottom:10px">
							<div style="width:100px">
								<span>区域描述</span>
							</div>
							<div>
								<input type="text" style="font-size:16px;border-top: none;border-left: none;border-right: none;border-bottom: 1px solid #696969;text-align:center;color:#2c3e50" v-model="areaDescription">
							</div>
						</div>
						<div style="background-color:#2f9613;display:flex;box-shadow:1px -1px 5px;justify-content:center;" @click="setupArea">
							<div style="border:2px solid #fff;border-radius: 100%;height:25px;width:25px;margin-top: 3px">
								<md-icon style="min-width:20px;height:20px;width:20px;color:#fff">check</md-icon>
							</div>
							<span v-if="!areaEditMode" style="color:#fff;font-size:18px;line-height:30px;padding-left:5px">确认添加</span>
							<span v-else style="color:#fff;font-size:18px;line-height:30px;padding-left:5px">确认修改</span>
						</div>
					</div>
				</transition>

				<div style="box-shadow:1px -1px 5px;position:absolute;bottom:0;width:100%;height:30px;background-color:#448aff" @click="openNewAreaBox">
					<transition name="custom-classes-transition" class="list-complete" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
						<div v-if="!addNewAreaMode" style="display:flex;justify-content:center;" key="add">
							<div style="border:2px solid #fff;border-radius: 100%;height:25px;width:25px;margin-top: 3px">
								<md-icon style="min-width:20px;height:20px;width:20px;color:#fff">add</md-icon>
							</div>
							<span style="font-size:18px;line-height:30px;color:#fff;padding-left:5px">添加区域</span>
						</div>
					</transition>
					<transition name="area-chang-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
						<div v-if="addNewAreaMode" style="display:flex;justify-content:center;" key="reply">
							<div style="border:2px solid #fff;border-radius: 100%;height:25px;width:25px;margin-top: 3px">
								<md-icon style="min-width:20px;height:20px;width:20px;color:#fff">reply</md-icon>
							</div>
							<span v-if="!areaEditMode" style="font-size:18px;line-height:30px;color:#fff;padding-left:5px">取消添加</span>
							<span v-else style="font-size:18px;line-height:30px;color:#fff;padding-left:5px">取消修改</span>
						</div>
					</transition>
				</div>
			</div>
		</transition>
		<!-- area window end -->
		<!-- confirmRemove start -->
		<md-dialog :md-active.sync="confirmRemove">
			<md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px">
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
				<md-button class="md-raised" @click="confirmRemove = false">关闭</md-button>
				<md-button class="md-raised md-accent" @click="confirmRemoveArea">删除</md-button>
			</md-dialog-actions>
		</md-dialog>
		<!-- confirmRemove end -->
		<!-- successd mesage start -->
		<md-dialog-alert :md-active.sync="successdmsg" md-content="操作成功" md-confirm-text="关闭" />
		<!-- successd mesage end -->
		<!-- error window start -->
		<md-dialog-alert :md-active.sync="error" :md-content="erromsg" md-confirm-text="关闭" />
		<!-- error window end -->
		<!-- error2 window start -->
		<md-dialog-confirm :md-active.sync="SMSErr" md-title="确认关闭?" md-content="所选供应商含有短信提醒，是否直接关闭？" md-confirm-text="确认" md-cancel-text="取消" @md-cancel="onCancel" @md-confirm="onConfirm" />
		<!-- error2 window end -->
		<!-- tip box start -->
		<transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutLeft">
			<div class="tipDialog" v-if="showTipDialog">
				<div>
					<span> {{tipMsg}}</span>
				</div>
			</div>
		</transition>
		<!-- tip box end -->
	</div>
</template>

<script>
import axios from 'axios'
import config from '../../public/js/config.js'
import lrz from 'lrz'

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
      allAreaArray: [],
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
      choseArea: '',
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
      errser: false,
      pageCount: 0,
      pageCountA: 0,
      pageNow: 1,
      pageSize: 15,
      showItem: 5,
      findAmode: false,
      findBmode: false,
      updateImagePreview: '',
      updateImage: '',
      clientImage: '',
      openSMS: false,
      nowDate: '',
      selectedSMSDate: '',
      SMSErr: false,
      areaWindow: false,
      addNewAreaMode: false,
      areaEditMode: false,
      areaDescription: '',
      confirmRemove: false,
      areaName: '',
      showTipDialog: false,
      tipMsg: 'info MSG'
    }
  },
  mounted() {
    this.getallclienta()
    this.getallclientb()
    this.getAllarea()
  },
  computed: {
    pagesA: function() {
      let pag = []
      if (this.pageNow < this.showItem) {
        //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        let i = Math.min(this.showItem, this.pageCountA)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        //当前页数大于显示页数了
        let middle = this.pageNow - Math.floor(this.showItem / 2), //从哪里开始
          i = this.showItem
        if (middle > this.pageCountA - this.showItem) {
          middle = this.pageCountA - this.showItem + 1
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag
    },

    pages: function() {
      let pag = []
      if (this.pageNow < this.showItem) {
        let i = Math.min(this.showItem, this.pageCount)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        let middle = this.pageNow - Math.floor(this.showItem / 2),
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
    }
  },
  methods: {
    openNewAreaBox() {
      if (this.addNewAreaMode) {
        this.addNewAreaMode = false
        this.areaName = ''
        this.areaDescription = ''
      } else {
        this.areaEditMode = false
        this.addNewAreaMode = true
      }
    },
    openAreaWindow() {
      this.areaWindow = true
    },
    setupArea() {
      if (!this.areaEditMode) {
        this.saveArea()
      } else {
        this.confirmEditArea()
      }
    },
    saveArea() {
      axios
        .post(config.server + '/area/post', {
          areaName: this.areaName,
          areaDescription: this.areaDescription
        })
        .then(doc => {
          if (doc.data.code === 0) {
            this.getAllarea()
            this.tipMsg = '新增区域成功'
            this.showTipDialog = true
            this.addNewAreaMode = false
            setTimeout(() => {
              this.showTipDialog = false
            }, 2000)
          } else {
            console.log(doc)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirmEditArea() {
      axios
        .post(config.server + '/area/update', {
          areaName: this.areaName,
          areaDescription: this.areaDescription,
          _id: this._id
        })
        .then(doc => {
          if (doc.data.code === 0) {
            this.tipMsg = '区域修改成功'
            this.addNewAreaMode = false
          } else if (doc.data.code === 1) {
            this.tipMsg = doc.data.msg
          } else {
            this.tipMsg = '出现错误'
            this.addNewAreaMode = false
            console.log(doc.data.error)
          }
          this.showTipDialog = true
          this.getAllarea()
          setTimeout(() => {
            this.showTipDialog = false
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirmRemoveArea() {
      axios
        .post(config.server + '/area/remove', {
          _id: this._id
        })
        .then(doc => {
          if (doc.data.code === 0) {
            this.tipMsg = '区域删除成功'
            this.confirmRemove = false
          } else {
            this.tipMsg = '出现错误'
            this.confirmRemove = false
            console.log(doc.data.error)
          }
          this.showTipDialog = true
          this.getAllarea()
          setTimeout(() => {
            this.showTipDialog = false
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeArea(item) {
      this.areaName = item.areaName
      this.areaDescription = item.areaDescription
      this._id = item._id
      this.confirmRemove = true
    },
    editArea(item) {
      console.log(item)
      this.areaEditMode = true
      this.addNewAreaMode = true
      this.areaName = item.areaName
      this._id = item._id
      this.areaDescription = item.areaDescription
    },
    closeAreaWindowMethod() {
      this.areaWindow = false
      this.addNewAreaMode = false
    },
    getAllarea() {
      axios
        .get(config.server + '/area/')
        .then(doc => {
          this.allAreaArray = doc.data.doc
        })
        .catch(err => {
          console.log(err)
        })
    },
    onCancel() {
      console.log('cancle')
    },
    onConfirm() {
      this.SMSErr = false
      this.openSMS = false
      this.selectedSMSDate = ''
      axios
        .post(config.server + '/clienta/sms/remove', {
          _id: this._id
        })
        .then(doc => {
          console.log(doc)
        })
        .catch(err => {
          console.log(err)
        })
    },
    openSendSMS() {
      if (this.openSMS) {
        this.nowDate = new Date()
      } else {
        if (this.selectedSMSDate) {
          this.openSMS = true
          this.SMSErr = true
        }
      }
    },
    uploadFile() {
      document.getElementById('upload_file').click()
    },
    fileChange(el) {
      if (typeof FileReader === 'undefined') {
        return alert('浏览器不支持上传图片')
      }
      console.log('###')
      if (!el.target.files[0].size) return //判断是否有文件数量
      this.updateImagePreview = window.URL.createObjectURL(el.target.files[0])
      this.updateImage = el.target.files[0]
      this.clientImage = ''
      el.target.value = ''
    },
    check_phone(event, type) {
      if (type === 'date') {
        let value = event.target.value
        if (!/^[1-9]*$/.test(value)) {
          this.conErr = true
        } else {
          this.conErr = false
        }
      } else {
        let value = event.target.value
        if (!/^[0-9]{8}$/.test(value)) {
          this.phoErr = true
          this.errpho = true
        } else {
          this.phoErr = false
          this.errpho = false
        }
      }
    },

    pageButtonA(item) {
      // console.log(this.pageNow)
      if (item === 'A') {
        if (this.pageNow > 1) {
          this.pageNow = this.pageNow - 1
        }
      } else if (item === 'B') {
        if (this.pageNow < this.pageCountA) {
          this.pageNow = this.pageNow + 1
        }
      } else {
        this.pageNow = item
      }
      if (this.findAmode === false) {
        axios
          .post(config.server + '/clienta/get', {
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.allclientainfo = res.data.doc
            this.pageCountA = Math.ceil(res.data.count / this.pageSize)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios
          .post(config.server + '/clienta/find', {
            word: this.searchclienta,
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.allclientainfo = res.data.doc
            this.pageCountA = Math.ceil(res.data.count / this.pageSize)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    pageButtonB(item) {
      // console.log(this.pageNow)
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
          .post(config.server + '/clientb/get', {
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.allclientbinfo = res.data.doc
            this.pageCount = Math.ceil(res.data.count / this.pageSize)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios
          .post(config.server + '/clientb/find', {
            word: this.searchclientb,
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.allclientbinfo = res.data.doc
            this.pageCount = Math.ceil(res.data.count / this.pageSize)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    searcha() {
      this.pageNow = 1
      if (this.searchclienta == '') {
        this.findAmode = false
        this.getallclienta()
      } else {
        this.findAmode = true
        axios
          .post(config.server + '/clienta/find', {
            word: this.searchclienta,
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.allclientainfo = res.data.doc
            this.pageCount = Math.ceil(res.data.count / this.pageSize)
            if (res.data.code === 1) {
              this.showTipDialog = true
              this.tipMsg = res.data.msg
              this.searchclienta = ''
              this.getallclienta()
              setTimeout(() => {
                this.showTipDialog = false
              }, 3000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    searchb() {
      this.pageNow = 1
      if (this.searchclientb == '') {
        this.findBmode = false
        this.getallclientb()
      } else {
        this.findBmode = true
        axios
          .post(config.server + '/clientb/find', {
            word: this.searchclientb,
            pageSize: this.pageSize,
            pageNow: this.pageNow
          })
          .then(res => {
            this.allclientbinfo = res.data.doc
            this.pageCount = Math.ceil(res.data.count / this.pageSize)
            if (res.data.code === 1) {
              this.showTipDialog = true
              this.tipMsg = res.data.msg
              this.searchclientb = ''
              this.getallclientb()
              setTimeout(() => {
                this.showTipDialog = false
              }, 3000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    changepageA() {
      this.clientpage = true
      this.pagestylea = 'font-weight:bold;'
      this.pagestyleb = ''
      this.classA = 'md-raised md-primary'
      this.classB = 'md-raised'
      this.pageNow = 1
      this.searchclienta = ''
      this.getallclienta()
    },
    changepageB() {
      this.clientpage = false
      this.pagestyleb = 'font-weight:bold;'
      this.pagestylea = ''
      this.classA = 'md-raised'
      this.classB = 'md-raised md-primary'
      this.pageNow = 1
      this.searchclientb = ''
      this.getallclientb()
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
        this.choseArea = ''
        this.updateImagePreview = ''
        this.updateImage = ''
        this.clientImage = ''
      } else {
        this.phoErr = false
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
      axios
        .post(config.server + '/clienta/get', {
          pageSize: this.pageSize,
          pageNow: this.pageNow
        })
        .then(res => {
          this.allclientainfo = res.data.doc
          this.pageCountA = Math.ceil(res.data.count / this.pageSize)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getallclientb() {
      axios
        .post(config.server + '/clientb/get', {
          pageSize: this.pageSize,
          pageNow: this.pageNow
        })
        .then(res => {
          this.allclientbinfo = res.data.doc
          this.pageCount = Math.ceil(res.data.count / this.pageSize)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addclienta() {
      this.selectedSMSDate = ''
      if (this.openSMS) {
        let tempDate = new Date()
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
          }
          if (!this.clientacontract) {
            this.conErr = true
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
          if (!this.selectedSMSDate) {
            this.error = true
            this.erromsg = '结束时间不应为空'
          } else if (this.selectedSMSDate < tempDate) {
            this.error = true
            this.erromsg = '所选日期应大于今天'
          }
          setTimeout(() => {
            this.error = false
          }, 2000)
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

          axios
            .post(config.server + '/clienta', {
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
              logOperator: localStorage.getItem('name')
            })
            .then(response => {
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
            .catch(error => {
              console.log(error)
              error = true
              this.erromsg = response.data.msg
              setTimeout(() => {
                this.error = false
              }, 3000)
            })
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
          }
          if (!this.clientacontract) {
            this.conErr = true
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

          axios
            .post(config.server + '/clienta', {
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
              logOperator: localStorage.getItem('name')
            })
            .then(response => {
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
            .catch(error => {
              console.log(error)
              error = true
              this.erromsg = response.data.msg
              setTimeout(() => {
                this.error = false
              }, 3000)
            })
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
        let payload = new FormData()
        if (this.updateImagePreview) {
          let maxSize = 200 * 1024 //200KB

          lrz(this.updateImage, {
            quality: 0.5
          }).then(res => {
            if (this.updateImage.size > maxSize) {
              this.updateImage = res.file
            }
          })
          payload.append('image', this.updateImage)
        }
        payload.append('clientbname', this.clientbname)
        payload.append('clientbaddress', this.clientbaddress)
        payload.append('clientbphone', this.clientbphone)
        payload.append('clientbstatus', this.clientbstatus)
        payload.append('clientbpostcode', this.clientbpostcode)
        payload.append('clientbserve', this.choseaname)
        payload.append('clientbarea', this.choseArea)
        payload.append('logOperator', localStorage.getItem('name'))
        axios({
          method: 'post',
          url: config.server + '/clientb',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
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
          .catch(error => {
            console.log(error)
            error = true
            this.erromsg = response.data.msg
            setTimeout(() => {
              this.error = false
            }, 3000)
          })
      }
    },
    editClientB(item) {
      this.clientImage = ''
      this.updateImagePreview = ''
      this.savemodeb = false
      this.showDialogb = true
      this._id = item._id
      this.clientbname = item.clientbname
      this.clientbaddress = item.clientbaddress
      this.clientbphone = item.clientbphone
      this.clientbstatus = item.clientbstatus
      this.clientbpostcode = item.clientbpostcode
      this.clientImage = item.image
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
      if (item.clientbarea == null) {
        this.choseArea = ''
        this.error = true
        this.erromsg = '找不到此地区信息，请重新选择'
        setTimeout(() => {
          this.error = false
        }, 4000)
      } else {
        this.choseArea = item.clientbarea._id
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
        if (this.updateImagePreview) {
          let payload = new FormData()
          let maxSize = 200 * 1024 //200KB
          lrz(this.updateImage, {
            quality: 0.5
          }).then(res => {
            if (this.updateImage.size > maxSize) {
              this.updateImage = res.file
            }
            payload.append('image', this.updateImage)
            payload.append('_id', this._id)
            axios({
              method: 'post',
              url: config.server + '/clientb/update/img',
              data: payload,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then(doc => {
                // console.log(doc)
              })
              .catch(err => {
                console.log(err)
              })
          })
        }
        axios
          .post(config.server + '/clientb/edit', {
            _id: this._id,
            clientbname: this.clientbname,
            clientbaddress: this.clientbaddress,
            clientbphone: this.clientbphone,
            clientbstatus: this.clientbstatus,
            clientbpostcode: this.clientbpostcode,
            clientbserve: this.choseaname,
            clientbarea: this.choseArea,
            logOperator: localStorage.getItem('name')
          })
          .then(doc => {
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
          .catch(err => {
            console.log(err)
            this.error = true
            this.erromsg = err
            setTimeout(() => {
              this.error = false
            }, 3000)
          })
      }
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
      axios
        .post(config.server + '/clientb/remove', {
          _id: this._id,
          logOperator: localStorage.getItem('name')
        })
        .then(doc => {
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
        .catch(err => {
          this.error = true
          this.erromsg = err
          setTimeout(() => {
            this.error = false
          }, 3000)
        })
    },
    editClientA(item) {
      this.openSMS = false
      this.nowDate = ''
      this.selectedSMSDate = ''
      this.conErr = false
      this.phoErr = false
      this.savemodeb = false

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
      //get SMS information start
      axios
        .post(config.server + '/clienta/sms', {
          _id: item._id
        })
        .then(doc => {
          console.log(doc)
          if (doc.data.document.endDate) {
            this.openSMS = true
            this.nowDate = doc.data.document.startDate
            this.selectedSMSDate = doc.data.document.endDate
          }
        })
        .catch(err => {
          console.log(err)
        })
      //get SMS information start
      this.showDialoga = true
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
        }
        if (!this.clientacontract) {
          this.conErr = true
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
            clientamail: this.clientamail,
            startDate: this.nowDate,
            endDate: this.selectedSMSDate,
            logOperator: localStorage.getItem('name')
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
            clientamail: this.clientamail,
            startDate: this.nowDate,
            endDate: this.selectedSMSDate,
            logOperator: localStorage.getItem('name')
          }
        }
        axios
          .post(config.server + '/clienta/edit', editInfo)
          .then(doc => {
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
          .catch(err => {
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
      axios
        .post(config.server + '/clienta/remove', {
          _id: this._id,
          logOperator: localStorage.getItem('name')
        })
        .then(doc => {
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
        .catch(err => {
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
  font-size: 20px;
  width: 100%;
}

.rmDialog-center-left {
  flex-basis: 28%;
  text-align: left;
}

.rmDialog-center-right {
  flex-basis: 60%;
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
  color: #337ab7;
  cursor: pointer;
}

.page-bar span:hover {
  background-color: #eee;
}

.page-bar .active span {
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
  margin: 0 auto;
  text-align: center;
  border: 3px dashed #696969;
  width: 250px;
  height: 250px;
  background-color: #eee;
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
</style>
