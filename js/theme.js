let time = 0
let theme = localStorage.getItem("theme") || "dark"
let animate = localStorage.getItem("theme-animate") || "false"

function switchTheme(toggle = true) {
    if (toggle) theme = theme === "dark" ? "light" : "dark"
    $('#-theme-settings-switch')[0].checked = theme === "dark"
    $("body").toggleClass("-dark", theme === "dark")
    localStorage.setItem("theme", theme)
}
function toggleAnimate(toggle = true) {
    if (toggle) animate = animate === "false" ? "true" : "false"
    $('#-theme-settings-animate')[0].checked = animate === "true"
    $("body").toggleClass("-animate", animate === "true")
    localStorage.setItem("theme-animate", animate)
}
switchTheme(false)

function themeSettings() {
    $('.modal#theme-settings').modal('open')
}

$('.-theme-switcher').mousedown(() => {
    time = Date.now();
})
$('.-theme-switcher').mouseup(() => {
    const held = Date.now() - time
    if (held >= 500) themeSettings()
    else switchTheme()
})
$('#-theme-settings-switch').click(switchTheme)
$('#-theme-settings-animate').click(toggleAnimate)
$('.-theme-settings').click(themeSettings)

setTimeout(() => toggleAnimate(false), 500)