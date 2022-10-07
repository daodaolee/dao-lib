<script>
export default {
  name: "ColorExtration",
};
</script>

<script setup>
import { ref, watch, nextTick } from "vue";
import useImageColor from "../../hooks/useImageColor.js";
import { useClipboard } from "@vueuse/core";
import useNotice from "../../hooks/useNotice.js";

const { copy, copied } = useClipboard();
const inputRef = ref(null);
let colorData = ref([]);

const fileChange = () => {
  nextTick(() => {
    const file = inputRef.value?.files?.[0];
    if (!file) {
      return;
    }

    let [getColorData] = useImageColor();
    getColorData(file, "color-extration-container", (color, palette) => {
      colorData.value = palette.value;
    });
  });
};
const fileDragover = (e) => {
  e.preventDefault();
};
const fileDrop = (e) => {
  nextTick(() => {
    e.preventDefault();
    const file = e?.dataTransfer?.files[0];

    if (!file) {
      return;
    }
    let [getColorData] = useImageColor();
    getColorData(file, "color-extration-container", (color, palette) => {
      colorData.value = palette.value;
    });
  });
};

watch(copied, (v) => {
  let [show, hide] = useNotice();
  v ? show() : hide();
});

const rgbToHex = (r, g, b) => {
  const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
</script>

<template>
  <div class="w100 content-100 flex flex-column flex-center color-extration">
    <div
      class="flex flex-column color-extration-container"
      @dragover="fileDragover"
      @drop="fileDrop"
    >
      <div class="color-extration-container-btn">
        <input
          ref="inputRef"
          class="w100 h100"
          type="file"
          accept="image/*"
          @change="fileChange"
        />
        <span>点击或拖拽图片到此处</span>
      </div>
    </div>
    <div class="flex flex-start color-extration-block">
      <div
        v-for="color in colorData"
        :key="color"
        :style="{ backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})` }"
        @click="copy(rgbToHex(color[0], color[1], color[2]))"
      >
        {{ rgbToHex(color[0], color[1], color[2]) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.color-extration {
  margin: 0 auto;
  padding-top: 20px;
  &-container {
    align-items: center;

    &-btn {
      width: 300px;
      height: 100px;
      line-height: 100px;
      border: 3px solid ;
      border-radius: 4px;
      text-align: center;
      position: relative;
      input {
        width: 300px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        z-index: 1;
      }
    }
  }
  &-block {
    padding-top: 40px;
    flex-wrap: wrap;
    width: 700px;
    div {
      text-align: center;
      cursor: pointer;
      width: 140px;
      height: 40px;
      line-height: 40px;
      flex-wrap: wrap;
      color: #ffffff;
    }
  }
}
</style>
