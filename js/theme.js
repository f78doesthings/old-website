let theme = localStorage.getItem("theme") || "dark"
let animate = localStorage.getItem("theme-animate") || "false"
let dbg = localStorage.getItem("theme-dbg") || "#333333"
let dtxt = localStorage.getItem("theme-dtxt") || "#eeeeee"
let lbg = localStorage.getItem("theme-lbg") || "#ffffff"
let ltxt = localStorage.getItem("theme-ltxt") || "#222222"

let time = 0
let reset = 0

function switchTheme(toggle = 1) {
    if (toggle === 1) theme = theme === "dark" ? "light" : "dark"
    else if (toggle === 2) {
        dbg = $('#-theme-settings-dbg').val() || "#333333"
        dtxt = $('#-theme-settings-dtxt').val() || "#eeeeee"
        lbg = $('#-theme-settings-lbg').val() || "#ffffff"
        ltxt = $('#-theme-settings-ltxt').val() || "#222222"
        localStorage.setItem("theme-dbg", dbg)
        localStorage.setItem("theme-dtxt", dtxt)
        localStorage.setItem("theme-lbg", lbg)
        localStorage.setItem("theme-ltxt", ltxt)
    } else {
        $('#-theme-settings-dbg').val(dbg)
        $('#-theme-settings-dtxt').val(dtxt)
        $('#-theme-settings-lbg').val(lbg)
        $('#-theme-settings-ltxt').val(ltxt)
    }
    $('#-theme-settings-switch')[0].checked = theme === "light"
    if (theme === "dark") {
        $("body").css("background-color", dbg)
        $("body").css("color", dtxt)
    } else {
        $("body").css("background-color", lbg)
        $("body").css("color", ltxt)
    }
    localStorage.setItem("theme", theme)
}
function toggleAnimate(toggle = true) {
    if (toggle) animate = animate === "false" ? "true" : "false"
    $('#-theme-settings-animate')[0].checked = animate === "true"
    $("body").toggleClass("-animate", animate === "true")
    localStorage.setItem("theme-animate", animate)
}
switchTheme(0)

function themeSettings() {
    $('.modal#theme-settings').modal('open')
}

$('.-theme-switcher').mousedown(() => time = Date.now())
$('.-theme-switcher').mouseup(() => {
    const held = Date.now() - time
    if (held >= 500) themeSettings()
    else switchTheme()
})
$('#-theme-settings-switch').click(() => switchTheme())
$('#-theme-settings-animate').click(toggleAnimate)
$('#-theme-settings-dbg').on("input", () => switchTheme(2))
$('#-theme-settings-dtxt').on("input", () => switchTheme(2))
$('#-theme-settings-lbg').on("input", () => switchTheme(2))
$('#-theme-settings-ltxt').on("input", () => switchTheme(2))
$('#-theme-settings-reset').click(() => {
    reset++
    if (reset >= 2) {
        localStorage.clear()
        location.reload()
    } else {
        $('#-theme-settings-reset').text("Confirm")
        $('#-theme-settings-reset').addClass("darken-1")
        $('#-theme-settings-reset-message').text("Tap again to confirm")
    }
    setTimeout(() => {
        reset = 0
        $('#-theme-settings-reset').text("Reset")
        $('#-theme-settings-reset').removeClass("darken-1")
        $('#-theme-settings-reset-message').text("Reset theme messages")
    }, 3000)
})
$('.-theme-settings').click(themeSettings)

setTimeout(() => toggleAnimate(false), 500)
