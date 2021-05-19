if (Element.prototype.animate) {
  document
    .getElementById("progress")
    .animate([{ width: "0%" }, { width: "100%" }], {
      duration: 2500,
      fill: "forwards",
      easing: "ease-out",
    })
    .play();
}

setTimeout(function () {
  if (window.location.search == "?test") {
    return console.log("Test mode is enabled, will not redirect");
  }
  window.location.replace(document.getElementById("target").href);
}, 2000);
