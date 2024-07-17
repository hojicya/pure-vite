import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

$(function () {
  // リロード時フェードイン
  gsap.to("#start", {
    duration: 1.5,
    opacity: 1,
  });

  // // ヘッダーの高さ分main下げる
  // var headerHeight = $("#header").outerHeight();
  // $("main").css("margin-top", headerHeight);
  // $(".mv").css("height", `calc(100svh - ${headerHeight}px)`);

  /*__ modal ______________________________________*/

  $(".movie-open").iziModal({
    iframe: true,
    history: false,
    closeButton: true,
    onOpening: function (modal, event) {
      lenis.stop();
      $("html, body").css("overflow", "hidden");
    },
    onClosing: function (modal, event) {
      lenis.start();
      $("html, body").css("overflow", "visible");
    },
  });

  /*__ scroll ______________________________________*/

  // 慣性スクロール
  const lenis = new Lenis({
    lerp: 0.1,
    duration: 1,
    smoothTouch: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // スムーススクロール
  $('a[href^="#"]').click(function () {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - headerHeight + 2;
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});
