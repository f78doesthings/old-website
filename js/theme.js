let theme = localStorage.getItem("pref-appearance-theme") || "dark"
let animate = localStorage.getItem("pref-appearance-animate") || "false"

let time = 0
let reset = 0

const themes = {
    dark: {
        background: "#333",
        text: "#eee",
        header: "#444",
        nav: "#555",
    },
    light: {
        background: "#fff",
        text: "#222",
        header: "#eee",
        nav: "#ddd",
    },
    amoled: {
        background: "#000",
        text: "#ccc",
        header: "#111",
        nav: "#222",
    },
    custom: {
        background: localStorage.getItem("pref-appearance-custom-background") || "#ffffff",
        text: localStorage.getItem("pref-appearance-custom-text") || "#222222",
        header: localStorage.getItem("pref-appearance-custom-header") || "#eeeeee",
        nav: localStorage.getItem("pref-appearance-custom-nav") || "#dddddd",
    },
}

function switchTheme(newTheme = theme, custom = false) {
    if (theme !== newTheme) {
        theme = newTheme
        localStorage.setItem("pref-appearance-theme", theme)
    } else {
        $("#-pref-appearance-theme").val(newTheme)
        if (custom) {
            localStorage.setItem("pref-appearance-custom-background", themes.custom.background)
            localStorage.setItem("pref-appearance-custom-text", themes.custom.text)
            localStorage.setItem("pref-appearance-custom-header", themes.custom.header)
            localStorage.setItem("pref-appearance-custom-nav", themes.custom.nav)
        } else {
            $("#-pref-appearance-custom-background").val(themes.custom.background)
            $("#-pref-appearance-custom-text").val(themes.custom.text)
            $("#-pref-appearance-custom-header").val(themes.custom.header)
            $("#-pref-appearance-custom-nav").val(themes.custom.nav)
        }
        themes.custom.background = $("#-pref-appearance-custom-background").val()
        themes.custom.text = $("#-pref-appearance-custom-text").val()
        themes.custom.header = $("#-pref-appearance-custom-header").val()
        themes.custom.nav = $("#-pref-appearance-custom-nav").val()
    } 
    if (newTheme === "custom") $("#-pref-appearance-custom").show()//.css("opacity", "100%")
    else $("#-pref-appearance-custom").hide()//.css("opacity", "35%")

    $("body").css("background-color", themes[newTheme].background)
    $("body").css("color", themes[newTheme].text)
    $("header").css("background-color", themes[newTheme].header)
    $("nav").css("background-color", themes[newTheme].nav)
    $("nav").css("color", themes[newTheme].text)
    $(".sidenav").css("background-color", themes[newTheme].header)
    $(".modal").css("background-color", themes[newTheme].header)
    $(".modal-footer").css("background-color", themes[newTheme].header)
    $(".dropdown-content").css("background-color", themes[newTheme].nav)
    $(".dropdown-content li>span").css("color", themes[newTheme].text)
}

switchTheme()

function prefAppearance() {
    $(".modal#-pref-appearance").modal("open")
}

$("#-pref-appearance-theme").change(() => switchTheme($("#-pref-appearance-theme").val()))
$("#-pref-appearance-custom-background").change(() => switchTheme(theme, true))
$("#-pref-appearance-custom-text").change(() => switchTheme(theme, true))
$("#-pref-appearance-custom-header").change(() => switchTheme(theme, true))
$("#-pref-appearance-custom-nav").change(() => switchTheme(theme, true))
$("#-pref-appearance-reset").click(() => {
    reset++
    if (reset >= 2) {
        $("#-pref-appearance-reset").html(`<div class="preloader-wrapper small active" style="width: 24px; height: 24px; top: 6px;">
            <div class="spinner-layer" style="border-color: #fff;">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>`)
        $("#-pref-appearance-reset-message").text("Resetting...")
        localStorage.clear() // will change if we add more preferences
        setTimeout(() => location.reload(), 1000)
    } else {
        $("#-pref-appearance-reset").text("Confirm")
        $("#-pref-appearance-reset-message").text("Tap again to confirm")
    }
    setTimeout(() => {
        if (reset >= 2) return
        reset = 0
        $("#-pref-appearance-reset").text("Reset")
        $("#-pref-appearance-reset-message").text("Reset appearance preferences")
    }, 3000)
})
$(".-pref-appearance").click(prefAppearance)
