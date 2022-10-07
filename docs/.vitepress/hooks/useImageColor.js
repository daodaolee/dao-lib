import { inputImgToBase64 } from "../tools/index";
import { ref } from 'vue'
import ColorThief from "colorthief";
export default function () {
  let color = ref([])
  let palette = ref([])

  const getColorData = async (file, className, cb) => {
    let el = document.querySelector(".preview")
    let parentEl = document.querySelector(".color-extration-container")
    el && parentEl && parentEl.removeChild(el)
    const colorThief = new ColorThief();
    const img = document.createElement('img')
    img.src = await inputImgToBase64(file);
    img.className = "preview"
    img.style.maxWidth = '1200px'
    img.style.height = '450px'
    img.style.marginTop = '50px'
    document.querySelector(`.${className}`)?.appendChild(img)
    img.onload = function () {
      color.value = colorThief.getColor(img);
      palette.value = colorThief.getPalette(img);
      cb(color, palette)
    }

  }

  return [getColorData]
}