let theme = localStorage.getItem("pref-appearance-theme") || "dark"
let custom = localStorage.getItem("pref-appearance-custom")

let time = 0
let reset = 0

function switchTheme(newTheme = theme) {
    try {
        if (theme === "custom") $(`#theme-custom`).attr("disabled", true)
        else $(`link[href*="/assets/css/themes/${theme}.css"]`).attr("disabled", true)
        if (newTheme === "custom") $("link#theme-custom").attr("disabled", false)
        else $(`link[href*="/assets/css/themes/${newTheme}.css"]`).attr("disabled", false)
        $("#-pref-appearance-theme").val(newTheme)
        if (theme !== newTheme) {
            theme = newTheme
            localStorage.setItem("pref-appearance-theme", theme)
            $("#-pref-appearance-url").val(custom)
        }
        if (theme === "custom") {
            // may be dangerous
            $("#-pref-appearance-url").attr("disabled", false)
            $("#-pref-appearance-custom").css("opacity", "1")

            custom = $("#-pref-appearance-url").val()
            $(`#theme-custom`).attr("href", custom)
            localStorage.setItem("pref-appearance-custom", custom)
        } else {
            $("#-pref-appearance-url")[0].disabled = true
            $("#-pref-appearance-custom").css("opacity", ".5")
        }
    } catch(e) {
        console.error(e)
    }
}

switchTheme()

function prefAppearance() {
    $(".modal#-pref-appearance").modal("open")
}

$("#-pref-appearance-theme").change(() => switchTheme($("#-pref-appearance-theme").val()))
$("#-pref-appearance-url").change(() => switchTheme("custom"))
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
