<template>
  <div class="tomato">
    <div class="showHint" v-on:mousedown="animate" v-on:mouseup="doTime">
      {{ hint[hintIndex] }}
    </div>
    <div id="countdown">
      <span class="time_span" v-on:mousedown="animate" v-on:mouseup="doTime"
        >{{ showMinute }}:{{ showSecond }}</span
      >
      <svg :width="size" :height="size">
        <circle
          fill="transparent"
          :stroke-width="stroke"
          stroke="#270B58"
          :r="radius"
          :cx="circleOffset"
          :cy="circleOffset"
        ></circle>
        <circle
          class="circle"
          fill="transparent"
          :stroke-width="stroke"
          stroke="#F36F21"
          :r="radius"
          :cx="circleOffset"
          :cy="circleOffset"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="progress"
          stroke-linecap="round"
          v-on:mousedown="animate"
          v-on:mouseup="doTime"
        ></circle>
      </svg>
      <div
        class="over_image"
        v-on:mousedown="animate"
        v-on:mouseup="doTime"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tomato",
  data() {
    return {
      size: 360, //容器宽高
      stroke: 10,
      percentage: 100,
      second: 25 * 60, //时间的初始值 单位：s
      timer: null,
      showMinute: "",
      showSecond: "",
      hint: ["Please start", "Learning", "Pausing", "Relax yourself"], //0:请开始，1：正在计时，2：暂停中，3：计时结束
      hintIndex: 0
    };
  },
  created() {
    //给全局绑定键盘事件
    let _this = this;
    window.document.onkeydown = function(event) {
      console.log("onkeydown");
      event = event || window.event;
      if ((event.keyCode == 32) | (event.keyCode == 13)) {
        _this.animate();
      }
    };
    document.onkeyup = function(event) {
      console.log("onkeyup");
      event = event || window.event;
      if ((event.keyCode == 32) | (event.keyCode == 13)) {
        _this.doTime();
      }
    };
    //根据程序预设的时间，初始化显示
    this.showMinute = Math.floor(this.second / 60);
    this.showSecond = this.second % 60;
    if (this.showMinute < 10) {
      this.showMinute = "0" + this.showMinute;
    }
    if (this.showSecond < 10) {
      this.showSecond = "0" + this.showSecond;
    }
  },
  computed: {
    radius() {
      return this.size / 2 - this.stroke / 2;
    },
    circleOffset() {
      return this.size / 2;
    },
    circumference() {
      return this.radius * 2 * Math.PI;
    },
    progress() {
      return this.circumference - (this.circumference * this.percentage) / 100;
    },
    countdown() {
      return Math.ceil((this.second * this.percentage) / 100);
    }
  },
  watch: {
    countdown() {
      this.showMinute = Math.floor(this.countdown / 60);
      this.showSecond = this.countdown % 60;
      if (this.showMinute < 10) {
        this.showMinute = "0" + this.showMinute;
      }
      if (this.showSecond < 10) {
        this.showSecond = "0" + this.showSecond;
      }
    }
  },
  methods: {
    animate() {
      //动画
      let _span = document.querySelector(".time_span");
      _span.style.opacity = "0.5";
      _span.style.transform = "scale(1.4)";
      _span.style.transition = ".4s";
      console.log("down");
    },
    doTime() {
      //计时
      console.log("up");
      //先结束动画
      let _span = document.querySelector(".time_span");
      _span.style.opacity = "1";
      _span.style.transform = "scale(1)";
      _span.style.transition = ".2s";
      //暂停定时器
      if (this.timer != null) {
        clearInterval(this.timer);
        document.querySelector(".showHint").style.opacity = "1";
        this.hintIndex = 2;
        this.timer = null;
        return;
      }
      if ((this.timer == null) & (this.percentage == 0)) {
        console.log("start");
        this.hintIndex = 0;
        document.querySelector(".showHint").style.opacity = "1";
        document.querySelector(".over_image").style.zIndex = "-1"; //取消显示结束图片
        this.percentage = 100;
        return;
      }
      // 开始定时器
      this.timer = setInterval(() => {
        this.percentage -= 100 / this.second / 100;
        document.querySelector(".showHint").style.opacity = "0";
        this.hintIndex = 1; //正在计时
        if (this.percentage <= 0) {
          //计时结束
          clearInterval(this.timer);
          this.percentage = 0;
          this.timer = null;
          this.hintIndex = 3;
          document.querySelector(".showHint").style.opacity = "1";
          document.querySelector(".over_image").style.zIndex = "1"; //显示结束图片
        }
      }, 10);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
.tomato {
  width: 100%;
  height: 100%;
}
#countdown {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}
.over_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 360px;
  height: 360px;
  background-image: url("../assets/img/tomato_over.png");
  background-size: 360px;
  background-repeat: no-repeat;
  z-index: -1;
}
#countdown .time_span {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  vertical-align: middle;
  font-size: 95px;
  color: #f36f21;
  -webkit-user-select: none;
  user-select: none; /*让span变得不可选取*/
}
#countdown .time_span:after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0px;
  background-color: black;
  vertical-align: middle;
}
.showHint {
  text-align: center;
  font-family: "Franklin Gothic Medium";
  font-size: 40px;
  color: aquamarine;
  margin-bottom: 50px;
  -webkit-user-select: none;
  user-select: none; /*变得不可选取*/
}
body {
  /*display:flex;*/
  /*justify-content:center;*/
  /*align-items:center;*/
  min-height: 100vh;
  background-color: #43119a;
}
</style>
