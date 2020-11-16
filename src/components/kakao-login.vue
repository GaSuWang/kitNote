<template>
  <div id="kakao-app">
    <KakaoLogin
      api-key="e771531e4a0e8cdfe128bb2363280a74"
      image="kakao_login_btn_large"
      :on-success="onSuccess"
      :on-failure="onFailure"
    />
  </div>
</template>


<script>
import KakaoLogin from "vue-kakao-login";
//api-key="cd0852921402270fba77d26ba5bf56a1"

export default {
    data: function () {
    return {
      userName:"",
      userImg:"",
    };
  },
  components: {
    KakaoLogin,
  },

  methods: {
   onSuccess() {
      window.Kakao.API.request({
        url:"/v2/user/me",
        success:  async function (res) {
          this.userName=JSON.stringify(res.kakao_account.profile.nickname) 
          this.userImg=JSON.stringify(res.kakao_account.profile.thumbnail_image_url)
          console.log(this.userImg)
        },
        fail: function (error) {
          alert(
            "login success, but failed to request user information: " +
              JSON.stringify(error)
          );
        },
      });

      this.$emit("SuccessLogin",this.userName,this.userImg);
      
    },
    onFailure(data) {
      this.$emit("FailureLogin");
      console.log(data);
      console.log("failure");
    },
  },
};
</script>
 
<style>
</style>