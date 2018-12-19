<template>
    <div id="searchorderpage">
        <div class="page-title">
            <span>来单查询</span>
        </div>
        <div class="page-body">
            <div class="page-body-title">
                <div class="page-body-title-picker">
                    <vue-datepicker-local v-model="selectedDate" id="page-body-title-picker"/>
                </div>
                <div>
                    right
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueDatepickerLocal from "vue-datepicker-local"; //时间选择组件

export default {
    components: {
        VueDatepickerLocal
    },
    data (){
        return {
            selectedDate:new Date()
        }
    }
}
</script>

<style scoped>
.page-title{
    position: fixed;
    font-size: 18px;
    top: 10px;
    left: 0;
    right: 0;
    color: #fff;
}

.page-body-title{
    padding-top: 10px;
}
</style>

