<template>
    <div>
        <input type="text" style="margin:10px auto" v-model="email">
        <br>
        <input type="text" style="margin:10px auto" v-model="password">
        <br>
        <button @click="login">login</button>
    </div>
    
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            email:'admin@admin.com',
            password:'1'
        }
    },
    methods:{
        login() {
            console.log('###')
            console.log(this.email)
            console.log(this.password)
            axios.post('//127.0.0.1:3000/clerks',{
                email:this.email,
                password:this.password
            })
            .then(doc => {
                console.log(doc.data.msg)
                localStorage.token=this.email
                let item =this.email
                this.$store.dispatch('setToken',item)
                console.log(this.$store.state.token)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

