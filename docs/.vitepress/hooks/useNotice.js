export default function () {
  const show = () => {
    let div = document.createElement("div")
    div.id = "notice"
    div.innerHTML = "🎉"
    div.style.fontSize = "20px"
    div.style.position = "fixed"
    div.style.right = "-20px"
    div.style.top = "40px"
    div.style.transition = "all 0.2s ease-out"
    document.body.appendChild(div)

    setTimeout(() => {
      div.style.right = "30px"
    }, 20)
  }
  const hide = () => {
    let el = document.getElementById("notice")
    el && document.body.removeChild(el)
  }
  return [show, hide]
}