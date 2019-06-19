<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="username"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入用户名"
                @click-right-icon="$toast('question')"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <button @click="login">登录</button>
    </div>
</template>
<script>
import {Field } from 'vant'
export default {
    
    name:'LoginInput',
    data () {
        return{
            username:'',
            password:''
        }
    },  
    components:{
        [Field.name]:Field
    }
}
</script>
