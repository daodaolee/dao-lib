import DefaultTheme from "vitepress/theme";
import ColorExtration from "../components/ColorExtration/index.vue";
import "../style/common.less"
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component(ColorExtration.name, ColorExtration);
  },
};
