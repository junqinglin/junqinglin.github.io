var pagination_modify = {
  toPage: function() {
      console.log("执行跳转");
      var e = document.querySelectorAll(".page-number")
        , t = parseInt(e[e.length - 1].innerHTML)
        , n = document.getElementById("toPageText")
        , a = parseInt(n.value);
      if (!isNaN(a) && a > 0 && "0" !== ("" + a)[0] && a <= t) {
          var s = 1 == a ? "/" : "/page/" + a + "/#content-inner";
          document.getElementById("toPageButton").href = s
      }
  },
  listenToPageInputPress() {
      var e = document.getElementById("toPageText")
        , t = document.getElementById("toPageButton");
      e && (e.addEventListener("keydown", (e=>{
          13 === e.keyCode && (pagination_modify.toPage(),
          pjax.loadUrl(t.href))
      }
      )),
      e.addEventListener("input", (function() {
          "" === e.value || "0" === e.value ? t.classList.remove("haveValue") : t.classList.add("haveValue");
          var n = document.querySelectorAll(".page-number")
            , a = +n[n.length - 1].innerHTML;
          +document.getElementById("toPageText").value > a && (e.value = a)
      }
      )))
  }
}
pagination_modify.listenToPageInputPress();
