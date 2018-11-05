<template>
	<div id="loginpage">
		<div class="backgroundpic"></div>
		<div class="backgroundpic-ribbon"></div>
		<div class="center">
			
			<div style="background: rgba(255, 255, 255, .9);width: 100%;position: absolute;height: 490px;">
				<div class="backgroundpic-ribbon-top"></div>
				<div class="backgroundpic-ribbon-bottom"></div>
			</div>
			
			<md-card md-with-hover style="width:500px;margin:220px auto">
				<md-ripple>
					<md-card-header style="padding:10px">
						<div class="card-title">DELIVERY TO
							<br>
							物流管理系统</div>
					</md-card-header>

					<md-card-content>

						<input type="text" v-model="email" class="inputbox" @keyup.enter="login">
						<br>
						<input type="password" class="inputbox" v-model="password" @keyup.enter="login">
						<div v-if="errmsg" style="color:#d74342">
							<span>{{errmsg}}</span>
						</div>
					</md-card-content>

					<md-card-actions>
						<md-button class="md-raised md-primary" style="margin:0px auto 20px auto" @click="login">登陆</md-button>
					</md-card-actions>
				</md-ripple>

				<div class="toplogo">
					<img src="./../../public/img/ebuyLogo.png" alt="easybuylogo">
				</div>
			</md-card>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import config from '../../public/js/config.js'

export default {
	data() {
		return {
			email: '',
			password: '',
			errmsg: ''
		}
	},
	methods: {
		login() {
			axios
				.post(config.server + '/clerks', {
					email: this.email,
					password: this.password
				})
				.then(doc => {
					this.errmsg = doc.data.msg
					if (doc.data.status == 0) {
						localStorage.token = this.email
						localStorage.name = doc.data.userName
						let item = this.email
						this.$store.dispatch('setToken', item)
						console.log(this.$store.state.token)
						this.$router.push('/')
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style scoped>
.backgroundpic {
	background-image: url(../../public/img/minepic.jpg);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	height: 100vh;
	display: flex;
	position: fixed;
	height: 100vh;
	width: 100%;
}

.backgroundpic-ribbon-top{
	background: rgba(255, 0, 0, 0.5);
		width: 100%;
		height: 10px;
		z-index: 0;
		position: absolute;
		top: -10px;
}

.backgroundpic-ribbon-bottom{
	background: rgba(255, 0, 0, 0.5);
		width: 100%;
		height: 10px;
		z-index: 0;
		position: absolute;
		bottom: -10px;
}

.center {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
}

.toplogo {
	border: 1px solid;
	border-radius: 50%;
	width: 190px;
	height: 190px;
	line-height: 200px;
	position: absolute;
	left: -95px;
	top: -60px;
	box-shadow: 1px 1px 10px 0px;
	background-color: #ffffff;
	border: 3px solid #f7a1a1;
}

.inputbox {
	margin: 10px auto;
	border-radius: 10px;
	width: 300px;
	height: 50px;
	text-align: center;
	-web-kit-appearance: none;
	-moz-appearance: none;
	outline: 0;
}

.card-title {
	font-family: sans-serif;
	font-size: 35px;
	font-weight: 700;
	margin: 10px auto;
	line-height: 40px;
}
</style>
