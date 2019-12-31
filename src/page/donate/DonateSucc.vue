<template>
    <div class=" donateSucc">
        <div class="top">
            <div>
                <van-icon name="passed" size="40px" color="#fff"/>
            </div>
            <div class="top_text">
                <p class="top_text_1">恭喜！ 转赠成功</p>
                <p class="top_text_2">快通知好友领取吧</p>
            </div>
            <div class="top_img">
                <img src="./../../assets/img/share.png" alt="" class="top_img_icon">
            </div>
        </div>
        <div class="donateBlock">
            <div>
                <p class="text_one">通知好友领取方式：</p>
                <p class="text_1">1.点击右上角··· 发送给微信好友领取</p>
                <p class="text_1">2.好友致电400-666-2607，凭受赠好友手机号领取；</p>
                <p class="text_1">3.关注公众号，实时查看礼物兑换和物流信息</p>
            </div>
            <div class="codeBlock">
                <img src="./../../assets/img/code.png" alt="" class="codeIcon"> 
            </div>
            <div class="codeIcon_text">
                长按二维码关注
            </div>
            <p class="footer_text">
                客户电话服务热线：400-666-2607
            </p>
        </div>
    </div>
</template>

<script>
    import {Icon,Toast} from 'vant'
    import utils from '../../utils/utils'

    export default {
        name:'DonateSucc',
        components:{
            [Icon.name]:Icon,
            [Toast.name]:Toast
        },
        data() {
            return {
                jid:utils.getUrlKey('jid'),
            }
        },

        created() {
            this.donate()
        },

        methods:{
            donate(){
                let that = this;
                wx.ready(function () {
                    let title = "您的好友"+ utils.getUrlKey('name')+"送给您一份礼物";
                    let desc = '点击领取';
                    let sharePic = localStorage.getItem("sharePic")

                    let share = {
                        donate_id : utils.getUrlKey('donate_id'),
                        mobile : utils.getUrlKey('mobile'),
                        account : utils.getUrlKey('account'),
                        package_id :localStorage.getItem('package_id'+that.jid),
                    };

                    var sharedata = {
                        title: title,
                        desc: desc,
                        link: "http://www.lkvip.com/lancard_wechat/app/index.php?i=7&c=entry&do=highDiscount&package_id="+share.package_id+"&account="+share.account+"&donate_id="+share.donate_id+"&mobile="+share.mobile+"&donate_type=1&m=highDiscount#/",
                        imgUrl: sharePic,
                        success: function(){
                            Toast('转赠成功')
                          this.jid = localStorage.getItem('jid');
                          localStorage.removeItem('package_id'+this.jid);
                        },
                        cancel: function(){
                        }
                    };

                    wx.onMenuShareAppMessage(sharedata);
                    //peng you quan
                    wx.onMenuShareTimeline(sharedata);

                });
            }
        },
        mounted() {
        }
    }
</script>
<style lang='stylus' scoped>
.donateSucc
    background #fff
    .top
        width 100%
        height 2rem
        background #000
        display flex
        justify-content space-between
        align-items center
        padding 0 0.34rem
        box-sizing border-box
        .top_text
            color #ffffff
            letter-spacing 0.02rem
            .top_text_1
                font-size 16px
                font-weight 600
            .top_text_2
                font-size 14px
                margin-top 0.2rem
        .top_img
            width 1.8rem
            height 1.3rem
            .top_img_icon
                width 100%
                height 100%
    .donateBlock
        box-sizing border-box
        padding 0.98rem 0.32rem
        .text_one
            font-size 14px
            font-weight 600
            margin-bottom 0.4rem
        .text_1
            font-size 12px
            color  #333
            margin-bottom 0.2rem
        .codeBlock
            width 3.4rem
            height 2.8rem
            margin 0 auto
            margin-top 1.6rem
            .codeIcon
                width 100%
                height 100%
        .codeIcon_text
            text-align center
            font-size 16px
            font-weight 600
            height 0.4rem
            line-height 0.4rem
            margin-top 0.4rem
        .footer_text
            text-align center
            padding 1.1rem 0 0.6rem 0
</style>