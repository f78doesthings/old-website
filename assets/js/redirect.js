document
  .getElementById("progress")
  .animate([{ width: "0%" }, { width: "100%" }], {
    duration: 2500,
    fill: "forwards",
    easing: "ease-out",
  })
  .play();

setTimeout(function () {
  if (location.search == "?test") {
    return console.log("Test mode is enabled, will not redirect");
  }
  location.replace(document.getElementById("target").href);
}, 2000);
