/**
 * input对象内的图片转Base64
 * @param file 文件对象
 * @param outputFun 转换后执行的函数，有一个base64的形参
 * */
export function inputImgToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!/image\/\w+/.test(file.type)) {
      //判断获取的是否为图片文件
      alert("请确保文件为图像文件");
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var image = new Image();
      //文件类型
      // @ts-ignore
      image.type = file.type;
      image.src = e.target.result;
      image.onload = function () {
        var expectWidth = image.width;
        var expectHeight = image.height;
        var base64 = compress(this, expectWidth, expectHeight, 1);
        resolve(base64);
      };
    };
  });
}

function compress(img, width, height, ratio) {
  var canvas, img64;
  canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  img64 = canvas.toDataURL(img.imgType, ratio);
  return img64;
}
