<template>
  <div class="three-scene" ref="three-scene" onselectstart="return false;">
    <div
      @pointerdown="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      "
      class="btn"
    >
      <div class="oth">
        <input type="number" v-model="peoPleNumber" />
        <button
          v-for="(item, index) in shopList"
          @pointerdown="shopPeople(item)"
        >
          {{ item }}人出现
        </button>
        <input type="number" v-model="towerPeopleNumber" />
        <button @pointerdown="towerPeopleApper">塔人物出现</button>
        <button @pointerdown="towerPeopleDisapper">塔人物消失</button>
        <button
          v-for="(item, index) in lightList"
          @pointerdown="lightOpen(item)"
        >
          {{ item }}开灯
        </button>
        <button
          v-for="(item, index) in lightList"
          @pointerdown="lightClose(item)"
        >
          {{ item }}关灯
        </button>

        <button @click="flowerAnima">莲花动画</button>
      </div>
      <div
        class="goldBorder"
        v-for="(border, index) in shopList"
        :class="`${border}金币`"
      ></div>
    </div>
  </div>
</template>

<script>
import Change from "./Change";
import { RunScene, Utils } from "run-scene-v2";
// 场景的传值Bus
export default {
  data() {
    return {
      change: null,
      runScene: null,
      peoPleNumber: null,
      shopList: ["商铺1", "商铺2", "商铺3", "商铺4", "商铺5"],
      towerPeopleNumber: null,
      lightList: ["1楼", "2楼", "3楼", "4楼", "5楼", "顶楼"],
    };
  },
  mounted() {
    // 加载场景
    this.loadScene();
    // 打印点击的模型接口
    // bus.$on("logClickModel", this.logClickModel);

    // this.proxyMsg();
  },
  methods: {
    // 加载场景
    loadScene() {
      this.runScene = new RunScene({
        path: "./assets/three.glb",
        rootDom: this.$refs["three-scene"],
        options: {
          render2: true,
          render3: true,
          texture: {
            load: false,
          },
          /**
            msg?: {
            是否显示打印，默认显示
              show: boolean = true
             显示打印的等级 默认显示基础打印
              level: "base" | 'detail' =  base
              }
             是否渲染
              run?: boolean = true
             decode 的路径
              decodePath?: string = ./draco/
             是否显示fps 默认关
              showFps?: boolean = false
             是否延迟加载 默认不延迟
              loadInterval?: number = 0
             模式 默认运行模式
              mode?: 'editor' | 'debug' | 'running' = 'running
             texture?:{
             是否加载贴图
               load?:boolean = true
               lazyload?:{
             是否懒加载贴图 默认是
                 open?:boolean = false,
             懒加载的时间区间 默认为16.0ms
                 IntervalTime?:number = 16.6
              },
             贴图质量 可大幅度降低显存占用 0-1 之间
              quality?:number = 1
             }
             是否加载实例后的模型 节省性能 默认关闭
              instanceClone?: boolean =false
             2drenderer
              render2?: boolean = false
             3drenderer
              render3?: boolean, = false
               */
        },
      }).on("complete", () => {
        this.onDone();
      });
      this.change = new Change(this.runScene);
      console.log(this.runScene, "this.runScene");
    },

    onDone() {
      console.log(
        this.runScene.cb.render.add("test", () => {}),
        "this.runScene"
      );
      console.log("场景加载结束~");
    },
    // 莲花动画
    flowerAnima() {
      // 结束回调
      const cb = () => {
        console.log("全部加载结束");
      };
      this.change.flower.show(true, cb);
    },
    // 打印点击到的模型
    logClickModel(model) {
      console.log("点击的模型为:", model.name);
    },
    test() {
      console.log("12344");
    },
    shopPeople(shop) {
      this.change.shopEvent.createPeopleToShop(this.peoPleNumber, shop);
    },
    towerPeopleApper() {
      this.change.towerEvent.peopleApper(this.towerPeopleNumber);
    },
    towerPeopleDisapper() {
      this.change.towerEvent.peopleDisapper(this.towerPeopleNumber);
    },
    lightOpen(floor) {
      this.change.towerEvent.lightControl(floor, true);
    },
    lightClose(floor) {
      this.change.towerEvent.lightControl(floor, false);
    },
  },
};
</script>

<style lang="less" scoped>
.three-scene {
  width: 100vw;
  height: 100vh;

  // > button {
  //   position: absolute;
  //   z-index: 2;
  // }
  .oth {
    position: absolute;
    z-index: 2;
  }
  .goldBorder {
    position: absolute;
    z-index: 10;
    width: 50px;
    height: 50px;
    background-color: red;
    opacity: 0;
    background: url("../../../public/assets/Glod.gif") repeat;
    background-size: 100% 100%;
  }
  .show {
    opacity: 1 !important;
  }
}
</style>
