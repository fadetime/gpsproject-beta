import store from './store'

export default (to, from, next) => {
  setTimeout(()=>{
    if(store.state.token){
      next()
    } else {
      next('/login')
    }
  },50)
}