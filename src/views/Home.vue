<template>
	<div id="home">
		<div class="topbutton">
			<div class="topbutton-left">
				<md-datepicker v-model="selectedDate" md-immediately md-closed="getMission()" style="border-radius: 0;" />
			</div>
			<div class="topbutton-right" style="padding-top:10px">
				<md-button class="md-raised md-primary" @click="addMission" style="font-size:20px;width:100px;height:40px;">新建任务</md-button>
			</div>
		</div>
		<div class="centertable" v-if="allmission.length != 0">
			<md-card style="background-color: #eff3f5">
				<md-card-content>
					<div class="tabletitle">
						<div class="tabletitle-item">
							<span>车次</span>
						</div>
						<div class="tabletitle-item">
							<span>司机</span>
						</div>
						<div class="tabletitle-item">
							<span>车牌号</span>
						</div>
						<div class="tabletitle-item">
							<span>已送</span>
						</div>
						<div class="tabletitle-item">
							<span>总量</span>
						</div>
						<div class="tabletitle-item">
							<span>联系方式</span>
						</div>
					</div>
				</md-card-content>
			</md-card>

			<div class="tablebody">
				<md-card md-with-hover v-for="(item,index) in allmission" :key="index" style="background-color: #eff3f5">
					<md-card-content>
						<div @click="openMissionInfo(item)" class="tabletitle2">
							<span class="tabletitle-item">{{item.missionline}}</span>
							<span class="tabletitle-item">{{item.missiondirver}}</span>
							<span class="tabletitle-item">{{item.missioncar}}</span>
							<span class="tabletitle-item">{{item.count}}</span>
							<span class="tabletitle-item">{{item.missionclient.length}}</span>
							<span class="tabletitle-item">{{item.missionphone}}</span>
						</div>
					</md-card-content>
				</md-card>
			</div>
		</div>
		<div v-else>
			<img src="../../public/img/ebuyLogo.png" alt="easylogo" style="margin:100px auto;width:500px">
		</div>
		<!-- add dialog start -->
		<md-dialog :md-active.sync="addDialog" style="width:812px">
			<md-dialog-title style="font-size:20px;box-shadow:0px 1px 5px #000;background-color:#d74342;padding:12px 0 12px 24px;margin-bottom:4px">
				<span style="color:#fff">添加今日任务</span>
			</md-dialog-title>
			<md-dialog-content style="padding:0">
				<md-steppers md-linear :md-active-step.sync="active">
					<md-step id="first" md-label="选择车次" :md-done.sync="first" :md-error="firstStepError" style="padding:0 24px">
						<div class="dialog-first-body">
							<div class="dialog-first-body-left">
								<div class="container" style="box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;">
									<div class="custom-selector">
										<div class="selector-header" style="position:relative" @click="callBody">
											<div style="padding:10px;text-align:center;font-size:18px">{{selectorText}}</div>
											<div style="position:absolute;top:0;right:0">
												<img src="../../public/img/icons/arrowDown.png" alt="" style="width:40px" class="arrow">
											</div>
										</div>
										<div class="selector-body">
											<div class="box" v-for="(item,index) in alltimesinfo" :key="index" @click="choseitem(item)">
												<span style="font-size:20px">{{item.timesname}}</span>
											</div>
										</div>
									</div>
								</div>

								<md-card md-with-hover style="width:100%;margin-top:8px">
									<div style="border-bottom: 1px solid rgba(0, 0, 0, 0.2);height: 40px;line-height: 41px;text-align:center">
										<h3>线路信息</h3>
									</div>
									<md-card-content v-if="aLineInfo">
										<div style="margin:0 20px;padding-top: 14px;">
											<div style="text-align:left;margin:10px 0">
												<span style="font-size:16px">线路名称：{{aLineInfo.timesname}}</span>
											</div>
											<div style="text-align:left;margin:10px 0">
												<span style="font-size:16px">线路备注：{{aLineInfo.timesnote}}</span>
											</div>
										</div>
									</md-card-content>
								</md-card>

							</div>

							<div class="dialog-first-body-right">
								<div>
									<md-button class="md-raised" :style="missionDateModeButtonCSS1" @click="missionDateModeButton('today')">
										<p>今日任务</p>
									</md-button>
									<md-button class="md-raised" :style="missionDateModeButtonCSS2" @click="missionDateModeButton('tomorrow')">
										<p>明日任务</p>
									</md-button>
									<md-button class="md-raised" :style="missionDateModeButtonCSS3" @click="missionDateModeButton('other')">
										<p>选择日期</p>
									</md-button>
								</div>
								<div style="box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;">
									<div style="border-bottom: 1px solid rgba(0,0,0,.2);height:40px;line-height:41px">
										<h3>任务日期</h3>
									</div>
									<div style="color:#448aff;padding:10px 0 10px 20px;text-align:left">
										<p v-if="missionDateModeButtonCSS1">今日任务</p>
										<p v-else-if="missionDateModeButtonCSS2">明日任务</p>
										<p v-else>选择日期</p>
									</div>
									<div style="display:flex;display:-webkit-flex;padding:0px 0 10px 20px" v-if="missionDateModeButtonCSS3">
										<div id="testref" ref="testref">
											<p>任务日期：</p>
										</div>
										<div>
											<md-datepicker v-model="missionDateModePacker" md-immediately style="margin-top: -24px;margin-bottom:0" />
										</div>
										<div>

										</div>
									</div>
									<div style="display:flex;display:-webkit-flex;padding:0px 0 10px 20px" v-else>
										<div>
											<p>任务日期：</p>
										</div>
										<div>
											<p>{{missionDateModePacker}}</p>
										</div>
									</div>
									<div style="display:flex;display:-webkit-flex;padding:0px 0 10px 20px">
										<div>
											<p>有效时间：</p>
										</div>
										<div>
											<p>00:00-23:59</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div style="text-align:center">
							<md-button class="md-raised md-primary " @click="setDone('first', 'second')">下一步</md-button>
						</div>

					</md-step>

					<md-step id="second" md-label="司机车辆" :md-done.sync="second" :md-error="secondStepError">
						<div>
							<div class="step-second" id="addmissionsecond">

								<div class="dialog-3" style="padding: 5px;">
									<div @click="openChoiceList('driver')" style="margin:0 auto">
										<div style="width:370px;height:282px;position: relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);overflow: hidden;">
											<div>
												<img v-if="!selectorDriver.image" src="../../public/img/ebuyLogo.png" alt="logo" style="width:100%;height:100%;object-fit: contain;">
												<img v-else :src="selectorDriver.image | imgurl" alt="carphoto" style="width:100%;height:100%;object-fit: contain;">
											</div>
											<div style="position: absolute;bottom: 0;background: rgba(0,0,0,0.7);width: 100%;height: 75px;color:#fff">
												<div v-if="!selectorDriver" style="text-align: center;">
													<span style="font-size:20px;line-height:100px;">{{setDriverText}}</span>
												</div>
												<div v-else>
													<div style="font-size:16px;display:-webkit-flex;display: flex;padding-top:10px">
														<div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
															<div style="flex-basis:30%;text-align: right;">
																<span>姓名:</span>
															</div>
															<div style="flex-basis:70%;text-align: center;">
																<span>{{selectorDriver.dirvername}}</span>
															</div>
														</div>
														<div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
															<div style="flex-basis:30%;text-align: right;">
																<span>电话:</span>
															</div>
															<div style="flex-basis:70%;text-align: center;">
																<span>{{selectorDriver.dirverphone}}</span>
															</div>
														</div>
													</div>
													<div style="font-size:16px;display:-webkit-flex;display: flex;padding-top:10px">
														<div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
															<div style="flex-basis:30%;text-align: right;">
																<span>驾照:</span>
															</div>
															<div style="flex-basis:70%;text-align: center;">
																<span>{{selectorDriver.dirvercard}}</span>
															</div>
														</div>
														<div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
															<div style="flex-basis:30%;text-align: right;">
																<span>备注:</span>
															</div>
															<div style="flex-basis:70%;text-align: center;">
																<span>{{selectorDriver.dirvernote}}</span>
															</div>

														</div>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="dialog-3" style="padding: 5px;">
									<div @click="openChoiceList('car')" style="margin:0 auto">
										<div style="width:370px;height:282px;position: relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);overflow: hidden;">
											<div>
												<img v-if="!selectorCar.image" src="../../public/img/ebuyLogo.png" alt="logo" style="width:100%;height:100%;object-fit: contain;">
												<img v-else :src="selectorCar.image | imgurl" alt="carphoto" style="width:100%;height:100%;object-fit: contain;">
											</div>
											<div style="position: absolute;bottom: 0;background: rgba(0,0,0,0.7);width: 100%;height: 75px;color:#fff">
												<div v-if="!selectorCar" style="text-align: center;">
													<span style="font-size:20px;line-height:100px;">{{setCarText}}</span>
												</div>
												<div v-else>
													<div style="font-size:16px;display:-webkit-flex;display: flex;padding-top:10px">
														<div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
															<div style="flex-basis:30%;text-align: right;">
																<span>车牌:</span>
															</div>
															<div style="flex-basis:70%;text-align: center;">
																<span>{{selectorCar.carid}}</span>
															</div>
														</div>
														<div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
															<div style="flex-basis:30%;text-align: right;">
																<span>型号:</span>
															</div>
															<div style="flex-basis:70%;text-align: center;">
																<span>{{selectorCar.cartype}}</span>
															</div>
														</div>
													</div>
													<div style="font-size:16px;display:-webkit-flex;display: flex;padding-top:10px">
														<div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
															<div style="flex-basis:30%;text-align: right;">
																<span>尾门:</span>
															</div>
															<div style="flex-basis:70%;text-align: center;">
																<span>{{selectorCar.tailgate}}</span>
															</div>
														</div>
														<div style="flex-basis:50%;display:-webkit-flex;display: flex;padding:0 10px">
															<div style="flex-basis:30%;text-align: right;">
																<span>备注:</span>
															</div>
															<div style="flex-basis:70%;text-align: center;">
																<span>{{selectorCar.carnote}}</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
							<div style="text-align:center">
								<md-button class="md-raised md-primary" @click="setDone('second', 'first')">上一步</md-button>
								<md-button class="md-raised md-primary" @click="setDone('second', 'third')">下一步</md-button>
							</div>
						</div>

					</md-step>

					<md-step id="third" md-label="确认客户" style="padding:0 24px">
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
						<div style="display:flex;display:-webkit-flex;padding-top:20px">
							<!-- left window start -->
							<div style="width:420px">
								<div class="step-third" style="border: 3px dashed #448aff;padding:10px;position: relative;">
									<div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 90px;top:-24px">
										<span style="line-height:32px;margin:0 auto;margin: 10px 64px;padding-left: 4px;color:#fff;font-size:16px">所有客户</span>
									</div>
									<div class="step-third-title" style="background-color: #f4f4f4">
										<div class="step-third-title-item" style="width:40px;"></div>
										<div class="step-third-title-item" style="width:160px">
											客户名称
										</div>
										<div class="step-third-title-item" style="width:60px">
											服务商
										</div>
										<div class="step-third-title-item" style="width:65px">
											区域
										</div>
										<div class="step-third-title-item" style="width:40px">
											信息
										</div>
									</div>
									<div style="overflow:auto;">
										<md-card md-with-hover v-for="(item,index) in allclientbinfo" :key="index">
											<md-card-content>
												<div class="step-third-title-body">
													<label :for="index" class="step-third-title">
														<input type="checkbox" :id="index" :value="item" v-model="aLineInfo.timesclientb" style="width:25px;height:25px">
														<span class="step-third-title-item" style="width:150px">{{item.clientbname}}</span>
														<span class="step-third-title-item" style="width:80px">{{item.clientbserve.clientaname}}</span>
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
							<!-- left window end -->
							<!-- right window start -->
							<div>
								<div style="padding-left:10px">
									<div style="border: 3px dashed #448aff;padding:10px;position: relative;">
										<div style="background-color: #448aff;border-radius: 20px;width: 200px;position: absolute;margin-left: 36px;top:-24px">
											<span style="line-height:32px;margin:0 auto;margin: 10px 64px;padding-left: 4px;color:#fff;font-size:16px">已选客户</span>
										</div>
										<div class="tab4-title" style="height:32px;line-height:30px;margin-bottom: 2px;background-color: #f4f4f4">
											<div class="step-third-title-item" style="width:176px">
												<span>客户名称</span>
											</div>
											<div>
												<span>拍照</span>
											</div>
											<div class="step-third-title-item" style="width:50px">
												<span>信息</span>
											</div>
											<div class="step-third-title-item" style="width:40px">
												<span>删除</span>
											</div>
										</div>
										<div class="tab4-body" style="height:404px;overflow-y:auto">
											<draggable v-model="aLineInfo.timesclientb" :options="{group:'timesclientb'}" @start="drag=true" @end="drag=false">
												<md-card md-with-hover v-for="(item,index) in aLineInfo.timesclientb" :key="index">
													<md-card-content>
														<div style="display:flex">
															<div class="step-third-title-item" style="width:170px" @click="clientInfoMethod(item)">
																<span>{{item.clientbname}}</span>
															</div>
															<div>
																<md-switch v-model="item.isNeedPic" style="margin:0" @change="changeNeedPicMethod(item)"></md-switch>
															</div>
															<div @click="clientInfoMethod(item)">
																<md-icon class="step-third-title-item" style="width:50px">info</md-icon>
															</div>
															<div @click="removeChoseClient(index)">
																<md-icon class="step-third-title-item" style="width:40px">block</md-icon>
															</div>
														</div>
													</md-card-content>
												</md-card>
											</draggable>
										</div>
									</div>
								</div>
							</div>
							<!-- right window end -->
						</div>
						<div style="display:flex;justify-content: center;">
							<div class="client-page-bar" v-if=" clientTablePageCount != 1 && clientTablePageCount">
								<ul style="width:455px;margin-top: 5px;">
									<li @click="clientTablePageButton('A')">
										<span>上一页</span>
									</li>
									<li v-for="(item,index) in clientPages" :key="index" @click="clientTablePageButton(item)" :class="{'active':clientTablePageNow == item}">
										<span>{{item}}</span>
									</li>
									<li @click="clientTablePageButton('B')">
										<span>下一页</span>
									</li>
									<li>
										<span>共<i>{{clientTablePageCount}}</i>页</span>
									</li>
								</ul>
							</div>
						</div>
						<div style="text-align:center">
							<md-button class="md-raised md-primary" @click="saveMission">保存</md-button>
						</div>
					</md-step>
				</md-steppers>
			</md-dialog-content>
		</md-dialog>
		<!-- add dialog end -->

		<!-- detail dialog start -->
		<md-dialog :md-active.sync="detaildialog" style="width: 800px;font-size:20px">
			<div style="text-align:center;font-size:24px;box-shadow:0px 1px 5px #000;background-color:#d74342;height:30px;line-height:30px;margin-bottom:20px;font-size:18px">
				<span style="color:#fff">出车报表</span>
			</div>
			<div style="overflow:hidden auto;font-size:16px">
				<div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;width:90%;margin:0 auto;padding:5px 0">
					<div style="flex-basis:30%;text-align:left;margin:0 auto" :title="missiondriver">
						<span>司机:{{missiondriver}}</span>
					</div>
					<div style="flex-basis:30%;text-align:left;margin:0 auto;">
						<span>车次:{{missionline}}</span>
					</div>
				</div>

				<div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;width:90%;margin:0 auto;border-bottom:1px solid;padding:5px 0">
					<div style="flex-basis:30%;text-align:left;margin:0 auto">
						日期:{{missiondate}}
					</div>
					<div style="flex-basis:30%;text-align:left;margin:0 auto">
						总单数:{{missioncount}}
					</div>
				</div>

				<div style="padding:5px 0;border:1px solid #989898;width:90%;margin:10px auto">
					<div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;font-weight:600;padding:5px 0">
						<div style="flex-basis:20%;text-align:center;margin:0 auto">
							<span>序号</span>
						</div>
						<div style="flex-basis:30%;text-align:center;margin:0 auto">
							<span>名字</span>
						</div>
						<div style="flex-basis:20%;text-align:center;margin:0 auto">
							<span>时间</span>
						</div>
						<div style="flex-basis:15%;text-align:center;margin:0 auto">
							<span>要求时间</span>
						</div>
						<div style="flex-basis:15%;text-align:center;margin:0 auto">
							<span>位置</span>
						</div>
					</div>
					<div style="height:400px;overflow:auto;">
						<div style="display:-webkit-flex;display:flex;-webkit-flex-flow:row;flex-flow:row;padding:5px 0" v-for="(item,index) in missionclient" :key="index">
							<div style="flex-basis:20%;text-align:center;margin:0 auto">
								<span>{{index+1}}</span>
							</div>
							<div style="flex-basis:30%;text-align:center;margin:0 auto">
								{{item.clientbname}}
							</div>
							<div style="flex-basis:20%;text-align:center;margin:0 auto">
								<span v-if="item.finishdate">{{item.finishdate | timefilter}}</span>
								<span v-else style="color:#f9cf97">未送达</span>
							</div>
							<div style="flex-basis:15%;text-align:center;margin:0 auto">
								<span v-if="item.timeLimit">{{item.timeLimit}}</span>
								<span v-else>无要求</span>
							</div>
							<div style="flex-basis:15%;text-align:center;margin:0 auto" @click="openMapMethod(item)">
								<md-icon v-if="item.position" style="color:green">map</md-icon>
								<md-icon v-else style="color:rgb(249,207,151)">map</md-icon>
							</div>
						</div>
					</div>
				</div>
			</div>

			<md-dialog-actions style="margin:0 auto">
				<md-button class="md-raised md-primary" @click="detaildialog = false" style="font-size:16px;width:80px;height:30px">关闭</md-button>
				<md-button class="md-raised md-accent" @click="removeMission" style="font-size:16px;width:80px;height:30px">删除</md-button>
			</md-dialog-actions>
		</md-dialog>
		<!-- detail dialog start -->

		<!-- error dialog start -->
		<md-dialog-alert :md-active.sync="error" :md-content="errormsg" md-confirm-text="关闭" />
		<!-- error dialog end -->

		<!-- confirm dialog start -->
		<md-dialog :md-active.sync="confirmDialog">
			<md-dialog-title>确认删除此任务</md-dialog-title>
			<md-dialog-actions>
				<md-button class="md-raised md-primary" @click="confirmDialog = false" style="font-size:20px;width:100px;height:40px">关闭</md-button>
				<md-button class="md-raised md-accent" @click="confirmRemoveMission" style="font-size:20px;width:100px;height:40px">确认</md-button>
			</md-dialog-actions>
		</md-dialog>

		<!-- confirm dialog end -->
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

		<!-- chose list dialog start -->
		<transition name="custom-classes-transition1" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
			<div v-if="choseListDialog" style="background: rgba(0,0,0,.6);z-index:20;position: fixed;top:0;bottom:0;left:0;right:0"></div>
		</transition>
		<transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
			<div v-if="choseListDialog" style="z-index:21;position: fixed;top:0;bottom:0;left:0;right:0;display: flex;justify-content: center;align-items: center;" @click.self.prevent="closeListDialog">
				<div style="width:370px;background:#fff;">
					<div style="background:#ff5252;box-shadow: rgb(0, 0, 0) 0px 1px 5px;height:30px;line-height: 30px;">
						<span style="font-size:18px;color:#fff">选择列表</span>
					</div>
					<div style="padding:10px 20px;">
						<div v-if="isCarList">
							<div class="choseListDialog-body" style="background-color:#eeeeee;font-weight: bold;">
								<div style="width:30px" class="choseListDialog-item">
									<span></span>
								</div>
								<div style="width:100px" class="choseListDialog-item">
									<span>车牌</span>
								</div>
								<div style="width:100px" class="choseListDialog-item">
									<span>尾门</span>
								</div>
								<div style="width:100px" class="choseListDialog-item">
									<span>冷藏</span>
								</div>
							</div>
							<div class="choseListDialog-body" v-for="(item,index) in allcarinfo" :key="index">
								<div style="width:30px" class="choseListDialog-item">
									<md-radio :id="item._id" v-model="radioCar" :value="item._id" style="margin:0" @change="shippingTempData(item)"></md-radio>
								</div>
								<label :for="item._id" style="width:100px" class="choseListDialog-item">
									<span>{{item.carid}}</span>
								</label>

								<label :for="item._id" style="width:100px" class="choseListDialog-item">
									<span>{{item.tailgate}}</span>
								</label>
								<label :for="item._id" style="width:100px" class="choseListDialog-item">
									<span>{{item.coolstore}}</span>
								</label>
							</div>
						</div>
						<div v-else style="position:relative;overflow-x:hidden;height:320px">
							<div style="text-align:center;height:25px;line-height:25px;border-bottom:1px solid rgba(0,0,0,.12);margin-bottom:10px">
								<div v-if="dirverChangePageFlag">常用司机</div>
								<div v-if="!dirverChangePageFlag">所有司机</div>
							</div>
							<transition name="custom-classes-transition" enter-active-class="animated slideInLeft faster" leave-active-class="animated slideOutLeft faster">
								<div v-if="dirverChangePageFlag" style="position:absolute">
									<div v-if="usedDriverInfo.length != 0">
										<div class="choseListDialog-body" style="background-color:#eeeeee;font-weight: bold;">
											<div style="width:30px" class="choseListDialog-item">
												<span></span>
											</div>
											<div style="width:90px" class="choseListDialog-item">
												<span>姓名</span>
											</div>
											<div style="width:90px" class="choseListDialog-item">
												<span>驾照</span>
											</div>
											<div style="width:100px" class="choseListDialog-item">
												<span>电话</span>
											</div>
										</div>
										<div class="choseListDialog-body" v-for="(item,index) in usedDriverInfo" :key="index">
											<div style="width:30px" class="choseListDialog-item">
												<md-radio :id="item._id" v-model="radioDriver" :value="item._id" style="margin:0" @change="shippingTempData(item)"></md-radio>
											</div>
											<label :for="item._id" style="width:90px" class="choseListDialog-item">
												<span>{{item.dirvername}}</span>
											</label>

											<label :for="item._id" style="width:90px" class="choseListDialog-item">
												<span>{{item.dirvercard}}</span>
											</label>
											<label :for="item._id" style="width:100px" class="choseListDialog-item">
												<span>{{item.dirverphone}}</span>
											</label>
										</div>
									</div>
									<div v-else style="width: 330px;">
										<div style="text-align: center;">
											<span>~暂无数据~</span>
										</div>
										<div>
											<img src="../../public/img/fatCat.gif" alt="emptyGif" style="width:200px">
										</div>
									</div>
								</div>
							</transition>

							<transition name="custom-classes-transition" enter-active-class="animated slideInRight faster" leave-active-class="animated slideOutRight faster">
								<div v-if="!dirverChangePageFlag" style="position:absolute">
									<div class="choseListDialog-body" style="background-color:#eeeeee;font-weight: bold;">
										<div style="width:30px" class="choseListDialog-item">
											<span></span>
										</div>
										<div style="width:90px" class="choseListDialog-item">
											<span>姓名</span>
										</div>
										<div style="width:90px" class="choseListDialog-item">
											<span>驾照</span>
										</div>
										<div style="width:100px" class="choseListDialog-item">
											<span>电话</span>
										</div>
									</div>
									<div class="choseListDialog-body" v-for="(item,index) in alldirverinfo" :key="index">
										<div style="width:30px" class="choseListDialog-item">
											<md-radio :id="item._id" v-model="radioDriver" :value="item._id" style="margin:0" @change="shippingTempData(item)"></md-radio>
										</div>
										<label :for="item._id" style="width:90px" class="choseListDialog-item">
											<span>{{item.dirvername}}</span>
										</label>

										<label :for="item._id" style="width:90px" class="choseListDialog-item">
											<span>{{item.dirvercard}}</span>
										</label>
										<label :for="item._id" style="width:100px" class="choseListDialog-item">
											<span>{{item.dirverphone}}</span>
										</label>
									</div>
								</div>
							</transition>
						</div>
					</div>
					<div>
						<div v-if="!isCarList">
							<md-button class="md-raised md-primary" @click="dirverChangePageFlag=!dirverChangePageFlag" style="font-size:18px;width:110px;height:30px">
								<span v-if="dirverChangePageFlag">查看全部</span>
								<span v-else>查看常用</span>
							</md-button>
						</div>
						<div>
							<md-button class="md-raised md-primary" @click="choseListDialog = false" style="font-size:18px;width:80px;height:30px">取消</md-button>
							<md-button class="md-raised md-primary" style="font-size:18px;width:80px;height:30px" @click="confirmeChangeCarOrDriver">选择</md-button>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<!-- chose list dialog end -->

		<!-- tip box start -->
		<transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutLeft">
			<div class="tipDialog" v-if="showTipDialog">
				<div>
					<span> {{errormsg}}</span>
				</div>
			</div>
		</transition>
		<!-- tip box end -->
		<!-- map box start -->
		<div v-if="showMapBox" class="mapbox-back"></div>
		<div v-if="showMapBox" class="mapbox-front" @click="showMapBox = false">
			<div class="mapbox-front-box">
				此功能正在添加中。。。
			</div>
		</div>
		<!-- map box end -->
	</div>
</template>

<script>
import axios from 'axios'
import config from '../../public/js/config.js'
import _ from 'lodash'
import draggable from 'vuedraggable'

export default {
  name: 'home',
  components: {
    draggable
  },
  data() {
    return {
      selectedDate: new Date(),
      active: 'first',
      addDialog: false,
      confirmDialog: false,
      first: false,
      second: false,
      third: false,
      choseLine: '',
      allmission: [],
      allclientbinfo: [],
      alldirverinfo: [],
      allcarinfo: [],
      choseClientB: [],
      alltimesinfo: [],
      areaArray: [],
      aLineInfo: '',
      dirvername: '',
      selected: [],
      allclientainfo: [],
      detaildialog: false,
      error: false,
      errormsg: '发生未知错误',
      firstStepError: null,
      secondStepError: null,
      missionline: '',
      missiondriver: '',
      missioncar: '',
      missioncount: '',
      missionfinish: '',
      missionphone: '',
      missiondate: '',
      missionclient: [],
      missionid: '',
      selectorText: '请选择',
      selectorDriver: '',
      selectorCar: '',
      bodyShowFlag: false,
      driverShowFlag: false,
      clientArea: '',
      clientServe: '',
      testValue: [2],
      pageSize: 10,
      showItem: 5,
      searchClient: '',
      clientTablePageNow: 1,
      clientTablePageCount: 10,
      clientTableMode: '',
      clientInfoWindow: false,
      tempClientInfo: '',
      setDriverText: '请选择司机',
      setCarText: '请选择车辆',
      isCarList: false,
      choseListDialog: false,
      radioCar: '',
      radioDriver: '',
      tempData: '',
      missionDateModeButtonCSS1: 'background:#448aff;color:#fff',
      missionDateModeButtonCSS2: '',
      missionDateModeButtonCSS3: '',
      missionDateModePacker: new Date().toLocaleDateString(),
      showTipDialog: false,
      showMapBox: false,
      dirverChangePageFlag: true,
      usedDriverInfo: []
    }
  },
  computed: {
    clientPages: function() {
      let pag = []
      if (this.clientTablePageNow < this.showItem) {
        //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        let i = Math.min(this.showItem, this.clientTablePageCount)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        //当前页数大于显示页数了
        let middle = this.clientTablePageNow - Math.floor(this.showItem / 2), //从哪里开始
          i = this.showItem
        if (middle > this.clientTablePageCount - this.showItem) {
          middle = this.clientTablePageCount - this.showItem + 1
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag
    }
  },
  watch: {
    selectedDate: function() {
      axios
        .post(config.server + '/mission', {
          startdate: this.selectedDate
        })
        .then(res => {
          this.allmission = res.data
        })
        .catch(err => {
          console.log('获取数据失败')
          console.log(err)
        })
    },
    clientArea: function() {
      if (this.clientArea) {
        this.clientServe = ''
        this.searchClient = ''
        this.clientTableMode = 'area'
        this.areaFilterMethod()
      }
    },
    clientServe: function() {
      if (this.clientServe) {
        this.clientArea = ''
        this.searchClient = ''
        this.clientTableMode = 'serve'
        this.serveFilterMethod()
      }
    }
  },
  mounted() {
    this.getLineInfo()
    this.getallclienta()
    this.getMission()
    this.getAllArea()
  },
  methods: {
    openMapMethod(item) {
      console.log(item)
      this.showMapBox = true
    },
    changeNeedPicMethod(item) {
      axios
        .post(config.server + '/clientb/needpic', {
          _id: item._id,
          isNeedPic: item.isNeedPic
        })
        .then(doc => {
          if (doc.data.code === 0) {
            this.errormsg = '客户状态更新成功'
            this.showTipDialog = true
            this.clientTablePageButton(this.clientTablePageNow)
            setTimeout(() => {
              this.showTipDialog = false
            }, 2000)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    missionDateModeButton(item) {
      if (item === 'today') {
        this.missionDateModeButtonCSS1 = 'background:#448aff;color:#fff'
        this.missionDateModeButtonCSS2 = ''
        this.missionDateModeButtonCSS3 = ''
        this.missionDateModePacker = new Date().toLocaleDateString()
      } else if (item === 'tomorrow') {
        this.missionDateModeButtonCSS2 = 'background:#448aff;color:#fff'
        this.missionDateModeButtonCSS1 = ''
        this.missionDateModeButtonCSS3 = ''
        this.missionDateModePacker = new Date().toLocaleDateString()
        this.missionDateModePacker = new Date(
          this.missionDateModePacker
        ).getTime()
        this.missionDateModePacker += 86400000
        this.missionDateModePacker = new Date(
          this.missionDateModePacker
        ).toLocaleDateString()
      } else {
        this.missionDateModePacker = ''
        this.missionDateModeButtonCSS3 = 'background:#448aff;color:#fff'
        this.missionDateModeButtonCSS2 = ''
        this.missionDateModeButtonCSS1 = ''
      }
    },
    confirmeChangeCarOrDriver() {
      if (this.isCarList) {
        if (this.tempData) {
          this.selectorCar = this.tempData
          this.tempData = ''
        }
      } else {
        if (this.tempData) {
          this.selectorDriver = this.tempData
          axios
            .post(config.server + '/useddriver', {
              car_id: this.tempData._id
            })
            .then(doc => {
              if (doc.data.code != 0) {
                this.errormsg = '更新常用司机异常'
                this.showTipDialog = true
                setTimeout(() => {
                  this.showTipDialog = false
                }, 3000)
              }
            })
            .catch(err => {
              console.log(err)
            })
          this.tempData = ''
        }
      }
      this.choseListDialog = false
    },
    shippingTempData(item) {
      this.tempData = item
    },
    closeListDialog() {
      this.choseListDialog = false
    },
    openChoiceList(item) {
      if (item === 'car') {
        this.radioCar = this.selectorCar._id
        this.isCarList = true
      } else {
        axios
          .get(config.server + '/useddriver')
          .then(doc => {
            if (doc.data.code === 0 && doc.data.doc) {
              this.usedDriverInfo = []
              this.alldirverinfo.forEach(element => {
                doc.data.doc.car_id.forEach(item => {
                  if (item === element._id) {
                    this.usedDriverInfo.push(element)
                  }
                })
              })
            } else {
              console.log('used driver of number is 0')
            }
          })
          .catch(err => {
            console.log(err)
          })
        this.radioDriver = this.selectorDriver._id
        this.isCarList = false
      }
      this.choseListDialog = true
      this.radioCar = this.selectorCar._id
    },
    removeChoseClient(item) {
      this.aLineInfo.timesclientb.splice(item, 1)
    },
    clientInfoMethod(item) {
      clearTimeout(this.timeOutName)
      this.clientInfoWindow = true
      this.tempClientInfo = item
      this.timeOutName = setTimeout(() => {
        this.clientInfoWindow = false
      }, 10000)
    },

    searClientMethods() {
      this.clientArea = ''
      this.clientServe = ''
      if (!this.searchClient) {
        this.clientTablePageNow = 1
        this.clientTableMode = ''
        this.getallclientb()
      } else {
        this.clientTableMode = 'search'
        axios
          .post(config.server + '/clientb/page', {
            keyWord: this.searchClient,
            pageSize: this.pageSize,
            pageNow: this.clientTablePageNow
          })
          .then(res => {
            this.allclientbinfo = res.data.doc
            this.clientTablePageCount = Math.ceil(
              res.data.countNum / this.pageSize
            )
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    areaFilterMethod() {
      axios
        .post(config.server + '/clientb/filterpage', {
          pageSize: this.pageSize,
          pageNow: this.clientTablePageNow,
          clientArea: this.clientArea
        })
        .then(res => {
          this.allclientbinfo = res.data.doc
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
          pageNow: this.clientTablePageNow,
          clientServe: this.clientServe
        })
        .then(res => {
          this.allclientbinfo = res.data.doc
          this.ClientTablePageCount = Math.ceil(
            res.data.countNum / this.pageSize
          )
        })
        .catch(err => {
          console.log(err)
        })
    },

    clientTablePageButton(item) {
      if (item === 'A') {
        if (this.clientTablePageNow > 1) {
          this.clientTablePageNow = this.clientTablePageNow - 1
        }
      } else if (item === 'B') {
        if (this.clientTablePageNow < this.clientTablePageCount) {
          this.clientTablePageNow = this.clientTablePageNow + 1
        }
      } else {
        this.clientTablePageNow = item
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
            pageNow: this.clientTablePageNow
          })
          .then(res => {
            this.allclientbinfo = res.data.doc
            this.clientTablePageCount = Math.ceil(
              res.data.countNum / this.pageSize
            )
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    //remove mission start
    removeMission() {
      this.confirmDialog = true
    },
    //remove mission end

    //confirm remove mission start
    confirmRemoveMission() {
      axios
        .post(config.server + '/mission/remove', {
          missionid: this.missionid,
          logOperator: localStorage.getItem('name')
        })
        .then(doc => {
          this.confirmDialog = false
          if (doc.data.code == 0) {
            this.getMission()
            this.detaildialog = false
          }
          this.showTipDialog = true
          this.errormsg = doc.data.msg
          setTimeout(() => {
            this.showTipDialog = false
          }, 3000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //confirm remove mission start

    // 下拉选择框部分 start

    callCar() {
      if (this.driverShowFlag) {
        this.bodyHideCar()
      } else {
        this.bodyShowCar()
      }
    },

    callDriver() {
      if (this.driverShowFlag) {
        this.bodyHideDriver()
      } else {
        this.bodyShowDriver()
      }
    },

    callBody() {
      if (this.bodyShowFlag) {
        this.bodyHide()
      } else {
        this.bodyShow()
      }
    },

    bodyShowCar() {
      let body = document.querySelector('#selector-body-car')
      let boxes = document.querySelectorAll('#selector-box-car')
      let arrow = document.querySelector('#selector-arrow-car')
      arrow.style.transform = 'rotate(0deg)'
      body.style.height = '180px'
      arrow.style.transition = '0.25s'
      let height = 4
      boxes.forEach(box => {
        height += box.clientHeight
      })
      body.style.transition = '0.25s'
      body.style.display = 'block'
      this.driverShowFlag = true
    },

    bodyHideCar() {
      let body = document.querySelector('#selector-body-car')
      body.style.height = '0px'
      body.style.transition = '0.25s'
      let arrow = document.querySelector('#selector-arrow-car')
      arrow.style.transform = 'rotate(-90deg)'
      arrow.style.transition = '0.25s'
      this.driverShowFlag = false
    },

    bodyShowDriver() {
      let body = document.querySelector('#selector-body-driver')
      let boxes = document.querySelectorAll('#selector-box-driver')
      let arrow = document.querySelector('#selector-arrow-driver')
      arrow.style.transform = 'rotate(0deg)'
      body.style.height = '180px'
      arrow.style.transition = '0.25s'
      let height = 4
      boxes.forEach(box => {
        height += box.clientHeight
      })
      body.style.transition = '0.25s'
      body.style.display = 'block'
      this.driverShowFlag = true
    },

    bodyHideDriver() {
      let body = document.querySelector('#selector-body-driver')
      body.style.height = '0px'
      body.style.transition = '0.25s'
      let arrow = document.querySelector('#selector-arrow-driver')
      arrow.style.transform = 'rotate(-90deg)'
      arrow.style.transition = '0.25s'
      this.driverShowFlag = false
    },

    bodyShow() {
      let body = document.querySelector('.selector-body')
      let boxes = document.querySelectorAll('.box')
      let arrow = document.querySelector('.arrow')
      arrow.style.transform = 'rotate(0deg)'
      body.style.height = '180px'
      arrow.style.transition = '0.25s'
      let height = 4
      boxes.forEach(box => {
        height += box.clientHeight
      })
      body.style.transition = '0.25s'
      body.style.display = 'block'
      this.bodyShowFlag = true
    },
    bodyHide() {
      let body = document.querySelector('.selector-body')
      body.style.height = '0px'
      body.style.transition = '0.25s'
      let arrow = document.querySelector('.arrow')
      arrow.style.transform = 'rotate(-90deg)'
      arrow.style.transition = '0.25s'
      this.bodyShowFlag = false
    },

    choseCarItem(item) {
      this.bodyHideCar()
      this.selectorCar = item
    },

    choseDriverItem(item) {
      this.bodyHideDriver()
      this.selectorDriver = item
    },

    choseitem(item) {
      this.choseLine = item
      this.bodyHide()
      this.aLineInfo = item
      this.selectorText = item.timesname

      if (this.choseLine.timescar == null) {
        this.choseLine.timescar = {
          carid: '信息错误请更新',
          tailgate: '信息错误请更新',
          cartype: '信息错误请更新'
        }
      }

      if (this.choseLine.timesdirver == null) {
        this.choseLine.timesdirver = {
          dirvername: '信息错误请更新',
          dirverphone: '信息错误请更新',
          dirvercard: '信息错误请更新'
        }
      }

      this.aLineInfo.timesclientb.forEach(element => {
        if (element.clientbserve == null) {
          element.clientbserve = {
            clientaname: '客户未包含服务商'
          }
        }
      })
    },
    // 下拉选择框部分 end

    //获取所有司机数据 start
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
    //获取所有司机数据 end
    openMissionInfo(item) {
      let time = new Date(item.missiondate).toLocaleDateString()
      this.detaildialog = true
      this.missionline = item.missionline
      this.missiondriver = item.missiondirver
      this.missioncar = item.missioncar
      this.missioncount = item.missionclient.length
      this.missionclient = item.missionclient
      this.missionfinish = 'finish'
      this.missionphone = item.missionphone
      this.missiondate = time
      this.missionid = item._id
    },
    getMission() {
      setTimeout(() => {
        axios
          .post(config.server + '/mission', {
            startdate: this.selectedDate
          })
          .then(res => {
            this.allmission = res.data
            this.countfinish()
          })
          .catch(err => {
            console.log('获取数据失败')
            console.log(err)
          })
      }, 100)
    },

    countfinish() {
      this.allmission.forEach(x => {
        x.count = 0
        x.missionclient.forEach(y => {
          if (y.finishdate) {
            x.count += 1
          }
        })
      })
    },
    setDone(id, index) {
      if (id == 'first') {
        if (this.choseLine == '') {
          this.firstStepError = '未选择线路'
        } else if (
          this.missionDateModeButtonCSS3 &&
          !this.missionDateModePacker
        ) {
          this.firstStepError = '未选日期'
        } else {
          this[id] = true
          this.selectorDriver = {
            dirvername: this.aLineInfo.timesdirver.dirvername,
            dirverphone: this.aLineInfo.timesdirver.dirverphone,
            dirvercard: this.aLineInfo.timesdirver.dirvercard,
            dirvernote: this.aLineInfo.timesdirver.dirvernote,
            _id: this.aLineInfo.timesdirver._id,
            image: this.aLineInfo.timesdirver.image
          }
          this.selectorCar = {
            carid: this.aLineInfo.timescar.carid,
            cartype: this.aLineInfo.timescar.cartype,
            tailgate: this.aLineInfo.timescar.tailgate,
            carnote: this.aLineInfo.timescar.carnote,
            _id: this.aLineInfo.timescar._id,
            image: this.aLineInfo.timescar.image
          }
          this.firstStepError = null
          if (index) {
            this.active = index
          }
        }
      }
      if (id == 'second') {
        if (this.choseLine.timesdirver.dirvername == '信息错误请更新') {
          this.secondStepError = ' '
          this.error = true
          this.errormsg = '请更新司机信息'
          setTimeout(() => {
            this.error = false
          }, 3000)
        }

        if (this.choseLine.timescar.carid == '信息错误请更新') {
          this.secondStepError = ' '
          this.error = true
          this.errormsg = '请更新车辆信息'
          setTimeout(() => {
            this.error = false
          }, 3000)
        } else {
          this[id] = true
          this.secondStepError = null
          if (index) {
            this.active = index
          }
        }
      }
    },

    addMission() {
      this.selectorText = '请选择'
      this.active = 'first'
      this.aLineInfo = ''
      this['second'] = false
      this.getallclientb()
      this.getalltimes()
      this.getalldirver()
      this.getallcar()
      this.addDialog = true
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
    getalltimes() {
      axios
        .get(config.server + '/times')
        .then(res => {
          this.alltimesinfo = res.data.doc
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
    getLineInfo(item) {
      this.aLineInfo = {
        timesname: '请选择线路',
        timesnote: '请选择线路',
        timesdirver: {
          dirvername: '请选择线路',
          dirverphone: '请选择线路',
          dirvercard: '请选择线路',
          dirvernote: '请选择线路'
        },
        timescar: {
          carid: '请选择线路',
          carnote: '请选择线路',
          tailgate: '请选择线路',
          cartype: '请选择线路'
        }
      }
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
    getallclientb() {
      axios
        .post(config.server + '/clientb/active', {
          pageSize: this.pageSize,
          pageNow: 1
        })
        .then(res => {
          this.allclientbinfo = res.data.doc
          this.clientTablePageCount = Math.ceil(
            res.data.countNum / this.pageSize
          )
          this.allclientbinfo.forEach(element => {
            if (element.clientbserve == null) {
              element.clientbserve = {
                clientaname: '客户未包含服务商'
              }
            }
            if (element.clientbarea == null) {
              element.clientbarea = {
                areaName: '客户未包含地区'
              }
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },

    saveMission() {
      let query = {}
      this.aLineInfo.timesclientb.forEach(element => {
        if (element.clientbserve == null) {
          element.clientbserve = {
            clientaname: '客户未包含服务商'
          }
        }
      })
      if (this.missionDateModeButtonCSS1) {
        query = {
          missionline: this.aLineInfo.timesname,
          missionnote: this.aLineInfo.timesnote,
          missiondirver: this.selectorDriver.dirvername,
          missionphone: this.aLineInfo.timesdirver.dirverphone,
          missioncar: this.selectorCar.carid,
          Car_id: this.selectorCar._id,
          logOperator: localStorage.getItem('name'),
          missionclient: this.aLineInfo.timesclientb.map(item => {
            let obj = {
              clientbname: item.clientbname,
              clientbaddress: item.clientbaddress,
              clientbphone: item.clientbphone,
              clientbpostcode: item.clientbpostcode,
              clientbserve: item.clientbserve.clientaname,
              image: item.image,
              isNeedPic: item.isNeedPic,
              timeLimit: item.timeLimit
            }
            return obj
          })
        }
      } else if (this.missionDateModeButtonCSS2) {
        let nextDay = new Date().getTime() + 86400000
        query = {
          missiondate: new Date(nextDay).toISOString(),
          missionline: this.aLineInfo.timesname,
          missionnote: this.aLineInfo.timesnote,
          missiondirver: this.selectorDriver.dirvername,
          missionphone: this.aLineInfo.timesdirver.dirverphone,
          missioncar: this.selectorCar.carid,
          logOperator: localStorage.getItem('name'),
          missionclient: this.aLineInfo.timesclientb.map(item => {
            let obj = {
              clientbname: item.clientbname,
              clientbaddress: item.clientbaddress,
              clientbphone: item.clientbphone,
              clientbpostcode: item.clientbpostcode,
              clientbserve: item.clientbserve.clientaname,
              image: item.image,
              isNeedPic: item.isNeedPic,
              timeLimit: item.timeLimit
            }
            return obj
          })
        }
      } else {
        let otherDay = new Date(this.missionDateModePacker).toISOString()
        query = {
          missiondate: otherDay,
          missionline: this.aLineInfo.timesname,
          missionnote: this.aLineInfo.timesnote,
          missiondirver: this.selectorDriver.dirvername,
          missionphone: this.aLineInfo.timesdirver.dirverphone,
          missioncar: this.selectorCar.carid,
          logOperator: localStorage.getItem('name'),
          missionclient: this.aLineInfo.timesclientb.map(item => {
            let obj = {
              clientbname: item.clientbname,
              clientbaddress: item.clientbaddress,
              clientbphone: item.clientbphone,
              clientbpostcode: item.clientbpostcode,
              clientbserve: item.clientbserve.clientaname,
              image: item.image,
              isNeedPic: item.isNeedPic,
              timeLimit: item.timeLimit
            }
            return obj
          })
        }
      }
      axios
        .post(config.server + '/mission/create', query)
        .then(res => {
          this.missionDateModePacker = ''
          if (this.missionDateModeButtonCSS2) {
            this.errormsg = '明日任务已建立完成'
          } else if (this.missionDateModeButtonCSS1) {
            this.errormsg = res.data.msg
          } else {
            this.errormsg = '指定任务已建立完成'
          }
          this.showTipDialog = true
          setTimeout(() => {
            this.showTipDialog = false
          }, 3000)
          if (res.data.code == 0) {
            this.addDialog = false
            this.getMission()
          }
        })
        .catch(err => {
          this.error = true
          this.errormsg = err
          setTimeout(() => {
            this.error = false
          }, 3000)
        })
    }
  }
}
</script>

<style scoped>
#home {
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
  flex-basis: 20%;
  text-align: left;
  margin: 0 auto;
}

.topbutton-right {
  margin: 0 auto;
  flex-basis: 70%;
  text-align: right;
}

.centertable {
  margin: 5px auto;
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

.tabletitle2 {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
}

.tabletitle-item {
  margin: 0 auto;
  width: 250px;
  font-size: 20px;
  line-height: 39px;
}

.tablebody {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: column;
  flex-flow: column;
}

.step-second {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row;
  flex-flow: row;
}

.step-second-item {
  margin: 10px auto;
  flex-basis: 45%;
  /* text-align: right; */
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

.detailDialog-center {
  margin: 20px;
  font-size: 20px;
  width: 100%;
}

.detail-text-left {
  margin: 0 20px 0 0;
}

.detail-text-right {
  background-color: #f4f4f4;
}

.container {
  /* width: 30%; */
  margin: auto;
}

#addmissionsecond .container {
  margin: 0 auto 10px auto;
}

.arrow {
  transform: rotate(-90deg);
  transition: 0.25s;
}

.selector-header {
  cursor: pointer;
  width: 300px;
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
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.box {
  cursor: pointer;
  padding: 7px;
  border-bottom: 1px solid #eee;
  transition: 0.5s;
  width: 300px;
  font-size: 16px;
}

.box:hover {
  background-color: dodgerblue;
  color: white;
  transition: 0.5s;
}

.dialog-first-body {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row;
  flex-flow: row;
  margin: 20px 0;
}

.dialog-first-body-left {
  margin: 0 auto;
  flex-basis: 30%;
  text-align: left;
}

.dialog-first-body-right {
  margin: 0 auto;
  flex-basis: 50%;
  text-align: center;
}

.clientsearch {
  margin: 16px auto 0 auto;
  border-radius: 10px;
  width: 300px;
  height: 32px;
  text-align: center;
  -web-kit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  font-size: 16px;
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
  padding: 6px 12px;
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

.step-third-title-body {
  display: -webkit-flex;
  display: flex;
}

.clientInfoWindowclass {
  z-index: 30;
  position: fixed;
  background-color: #fff;
  right: 0;
  bottom: 10px;
}

.tab4-title {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row;
  flex-flow: row;
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

.mapbox-back {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.12);
  z-index: 23;
}

.mapbox-front {
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

.mapbox-front-box {
  background: #fff;
  width: 100px;
  height: 100px;
}
</style>
