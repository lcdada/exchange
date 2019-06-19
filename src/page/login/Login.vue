<template>
    <div>
        <div>
            <login-header></login-header>
        </div>
    </div>
</template>
<script>
import LoginHeader from './components/Header'
import LoginInput from './components/Input'
export default {
    name:'Login',
    components:{
        LoginHeader,
        LoginInput
    },
    created:function () {
        this.$emit('public_header', false);
    },
}
</script>
<style lang="stylus" scoped>

</style>
