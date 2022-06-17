import { objectExpression } from "@babel/types";
import { Utils } from "run-scene-v2";
// 声明变量
let camera, scene, controls, renderer2, renderer, dom, t, p, runScene;

// 拿资源
const setAssets = (assets) => {
  camera = assets.camera;
  scene = assets.scene;
  controls = assets.controls;
  renderer = assets.renderer;
  dom = assets.engineDom;
  t = assets.t;
  // renderer2 = assets.renderer2;
  // p = assets.p;
};

// 整体场景事件
function Change(runScene) {
  /* 拿资源 分解资源 
      this挂载至t上 
      runScene上的其他Api可以直接runScene.直接使用
  */
  setAssets({ ...runScene.assetsEx.get(), t: this, runScene });

  // 挂载runScene
  t.runScene = runScene;
  this.events = new Events();
  this.methods = new Methods();
  this.cloneEvent = new CloneEvent();
  this.shopEvent = new ShopEvent();
  this.towerEvent = new TowerEvent();
  // 加载结束
  runScene.on("lazyLoadedTexture", () => {
    // 初始化解析数据添加模型
    // this.resolveJson.init();

    // 基本的场景配置
    controls.maxPolarAngle = Math.PI / 2;
  });

  runScene.on("complete", () => {
    this.shopEvent.init();
    this.towerEvent.init();
    this.shopEvent.createGoldBorder();
  });

  // 销毁
  this.dispose = () => runScene.dispose();
}

// runScene.modelEx.clone('model')
// t.runScene.modelEx.clone()

// 基本事件
class Events {
  constructor() {
    controls.addEventListener("start", this.controlStart);
    t.runScene.optionsEx.cb.events.pointer.down.add(
      "pointerDown",
      this.mouseDown
    );
    t.runScene.optionsEx.cb.events.pointer.up.add("pointerUp", this.mouseUp);
    t.runScene.optionsEx.cb.events.mouse.move.add("mouseMove", () => {});
  }

  downPosition = { x: 0, y: 0 };

  closeAnimaAtStart = {};

  mouseDown = (event) => {
    this.downPosition = {
      x: event.offsetX,
      y: event.offsetY,
    };
  };

  mouseUp = (event) => {
    if (event.button === 2) return;
    const ux = event.offsetX;
    const uy = event.offsetY;
    const { x, y } = this.downPosition;
    // 当点击的位置和点击后的位置一致时就会触发
    ux === x && uy === y && this.triggerClick(event);
  };

  triggerClick = (e) => {
    const model = t.runScene.modelEx.select;
    if (!model) return;
  };

  controlStart = () => {};

  closeAnmia() {
    Object.values(this.closeAnimaAtStart).map(
      (item) =>
        // 暂停动画 并清空内容 item就是那个动画
        item && item.kill()
    );
  }

  dispose() {
    dom.removeEventListener("pointerdown", this.mouseDown);
    dom.removeEventListener("pointerup", this.mouseUp);
    controls.removeEventListener("start", this.controlStart);
  }
}
//方法
class Methods {
  //获取模型
  getModel(name) {
    return t.runScene.modelEx.getModel(name);
  }
  //相机动画
  camAnima(view, time, callback) {
    t.runScene.modelEx.camAnima(
      t.runScene.modelEx.getCamLocal(),
      view,
      time,
      () => {
        callback && callback();
      }
    );
  }
  //场景自转
  autoRotation(isRotate, speed, lookat) {
    t.runScene.assetsEx.controls.autoRotate = isRotate;
    t.runScene.assetsEx.controls.autoRotateSpeed = speed;
    lookat && t.runScene.camera.lookAt(lookat.x, lookat.y, lookat.z);
  }
  //开启辉光
  light(model, isOpen) {
    t.runScene.modelEx.setGlow(model, isOpen);
  }
}
//克隆事件
class CloneEvent {
  constructor() {}
  //克隆模型
  copyModel(model) {
    const copyModel = t.runScene.modelEx.clone(model);
    return copyModel;
  }
  //设置属性并添加至场景
  setCopyModelProperty(copyModel, Property) {
    copyModel.visible = Property.visible;
    copyModel.position.set(
      Property.position.x,
      Property.position.y,
      Property.position.z
    );
    copyModel.material = copyModel.material.clone();
    copyModel.material.transparent = true;
    copyModel.material.opacity = Property.opacity;
    t.runScene.modelEx.add(copyModel);
  }
  //删除模型
  clearCopyModel(copyModel) {
    t.runScene.modelEx.remove(copyModel);
  }
}
//商铺事件
class ShopEvent {
  constructor() {
    console.log(Utils, "Utils");
  }
  shopMap;
  cloneModel;
  //初始化
  init() {
    console.log(t.runScene);
    this.cloneModel = t.methods.getModel("SP人");
    this.shopMap = {
      商铺1: {
        borderPosition: t.methods.getModel("商铺1"),
        rangePosition: { x: 678.6546835703366, y: 2.4338684543174005 },
        beginZ: -19.249096344726695,
        endZ: 43.28590330612664,
        doorPosition: {
          x: 715.348489344153,
          y: 2.4338684543174005,
          z: -2.304479250308624,
        },
      },
      商铺2: {
        borderPosition: t.methods.getModel("商铺2"),
        rangePosition: { x: 678.6546835703366, y: 2.4338684543174005 },
        beginZ: -97.90748487526992,
        endZ: -29.948062302714305,
        doorPosition: {
          x: 715.348489344153,
          y: 2.4338684543174005,
          z: -54.87039269263238,
        },
      },
      商铺3: {
        borderPosition: t.methods.getModel("商铺3"),
        rangePosition: { x: 678.6546835703366, y: 2.4338684543174005 },
        beginZ: -269.4245635718405,
        endZ: -118.81279417207509,
        doorPosition: {
          x: 723.711786090452,
          y: 2.4338684543174005,
          z: -164.83815329826535,
        },
      },
      商铺4: {
        borderPosition: t.methods.getModel("商铺4"),
        rangePosition: { x: 678.6546835703366, y: 2.4338684543174005 },
        beginZ: -488.590102485558,
        endZ: -295.1254954925516,
        doorPosition: {
          x: 728.0633357623165,
          y: 2.4338684543174005,
          z: -371.1869252100583,
        },
      },
      商铺5: {
        borderPosition: t.methods.getModel("商铺5"),
        rangePosition: { x: 678.6546835703366, y: 2.4338684543174005 },
        beginZ: -790.1440452896151,
        endZ: -538.4303428427537,
        doorPosition: {
          x: 735.1260245065873,
          y: 2.4338684543174005,
          z: -691.1992070890307,
        },
      },
    };
  }
  //生成随机范围
  getRandomRangePosition(Max, Min) {
    return Math.random() * (Max - Min) + Min;
  }
  //人出现进入店铺后消失
  createPeopleToShop(number, shop) {
    for (let i = 0; i < number; i++) {
      let person = t.cloneEvent.copyModel(this.cloneModel);
      t.cloneEvent.setCopyModelProperty(person, {
        visible: true,
        position: {
          x: this.shopMap[shop].rangePosition.x,
          y: this.shopMap[shop].rangePosition.y,
          z: this.getRandomRangePosition(
            this.shopMap[shop].endZ,
            this.shopMap[shop].beginZ
          ),
        },
        opacity: 0,
      });
      console.log(scene.children, "1");
      Utils.anima(
        {
          opc: 0,
        },
        {
          opc: 1,
        },
        0.5,
        (data) => {
          person.material.opacity = data.opc;
        },
        () => {
          Utils.anima(
            {
              x: person.position.x,
              y: person.position.y,
              z: person.position.z,
            },
            {
              x: this.shopMap[shop].doorPosition.x,
              y: this.shopMap[shop].doorPosition.y,
              z: this.shopMap[shop].doorPosition.z,
            },
            1.5,
            (data) => {
              person.position.x = data.x;
              person.position.y = data.y;
              person.position.z = data.z;
              console.log(scene.children.length, "2");
            },
            () => {
              t.cloneEvent.clearCopyModel(person);
              console.log(scene.children.length, "3");
            }
          );
        }
      );
    }
  }
  //生成金币看板
  createGoldBorder() {
    Object.keys(this.shopMap).map((i) => {
      // console.log(this.shopMap[i].borderPosition);
      let dom = document.querySelector(`.${i}金币`);
      Utils.getMacro(() => {
        dom.classList.add("show");
      }, 500);
      let sprite = Utils.domTo3DSprite(dom);
      sprite.position.y += 100;
      this.shopMap[i].borderPosition.add(sprite);
    });
  }
}
//塔事件
class TowerEvent {
  constructor() {}
  cloneModel;
  peopleMap = [];
  lightMap={};
  init() {
    this.cloneModel = t.methods.getModel("ren_0");
    this.lightMap = {
      "1楼":t.methods.getModel('TaLight_1F'),
      "2楼":t.methods.getModel('TaLight_2F'),
      "3楼":t.methods.getModel('TaLight_3F'),
      "4楼":t.methods.getModel('TaLight_4F'),
      "5楼":t.methods.getModel('TaLight_5F'),
      顶楼:t.methods.getModel('Ding'),
    }
  }
  //人异步出现
  asyncApper() {
    return new Promise((s) => {
      let copyPerson = t.cloneEvent.copyModel(this.cloneModel);
      let x =
        Math.random() * (667.0088975117958 - 446.2797211064844) +
        446.2797211064844;
      let z =
        Math.random() * (-473.85379186803544 - -641.029637905563) +
        -641.029637905563;
      if (z <= -603 && z >= -686 && x <= 633 && x >= 527) {
        x = 527 || 633;
        z = -603 || -686;
      }
      t.cloneEvent.setCopyModelProperty(copyPerson, {
        visible: true,
        position: {
          x: x,
          y: 0,
          z: z,
        },
        opacity: 0,
      });
      copyPerson.lookAt(581.4321928755762, 0, -702.6268867583516);
      this.peopleMap.push(copyPerson);
      Utils.anima(
        {
          opc: 0,
        },
        {
          opc: 1,
        },
        0.2,
        (data) => {
          copyPerson.material.opacity = data.opc;
        },
        () => {
          s();
        }
      );
    });
  }
  //人异步消失
  asyncDisapper(person) {
    return new Promise((s) => {
      Utils.anima(
        {
          opc: 1,
        },
        {
          opc: 0,
        },
        0.2,
        (data) => {
          person.material.opacity = data.opc;
        },
        () => {
          t.cloneEvent.clearCopyModel(person);
          s();
        }
      );
    });
  }
  //人出现
  async peopleApper(num) {
    if (num >= 20) num = 20;
    for (let i = 0; i < num; i++) {
      await this.asyncApper();
    }
  }
  //人消失
  async peopleDisapper(num) {
    if (num >= this.peopleMap.length) num = this.peopleMap.length;
    if (num == 0) return;
    for (let i = 0; i < num; i++) {
      await this.asyncDisapper(this.peopleMap[0]);
      this.peopleMap.splice(0, 1);
      console.log(this.peopleMap);
    }
  }
  //灯开启关闭
  lightControl(floor,isOpen){
    this.lightMap[floor].visible = isOpen
  }
}
export default Change;

// runScene.anima.play('Test 001')
// runScene.anima.pause('Test 001')
// runScene.anima.closeAnima()
// runScene.anima.playAll()
// runScene.anima.pauseAll()

//581.4321928755762 0 -702.6268867583516
