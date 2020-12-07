<template>
  <div id="kakao-app">
    <KakaoLogin
      api-key="cd0852921402270fba77d26ba5bf56a1"
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
    return { userName: null, userImg: null };
  },

  components: {
    KakaoLogin,
  },

  methods: {
    onSuccess() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: this.successCallback,
        fail: function (error) {
          alert(
            "login success, but failed to request user information: " +
              JSON.stringify(error)
          );
        },
      });
    },
    onFailure(data) {
      this.$emit("FailureLogin");
      console.log(data);
      console.log("failure");
    },
    successCallback(res) {
      this.userName = res.kakao_account.profile.nickname;
      this.userImg = res.kakao_account.profile.thumbnail_image_url;

      this.$emit("SuccessLogin", this.userName, this.userImg);

      window.Kakao.API.request({
        url: "/v1/user/unlink",
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
  },
};
</script>
