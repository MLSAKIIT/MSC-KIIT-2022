/**

 * slick 4.5.0


 * https://kenwheeler.github.io/slick/


 */

!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        // prevArrow:
        //   '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        // nextArrow:
        //   '<button class="slick-next" style="display:none;" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        "object" == typeof t &&
        t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1;
            }),
            Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + s,
                  });
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          (r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, e, t]);
            });
          }),
            (r.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, e, t]);
            }),
            (r.src = t);
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++;
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s);
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? "right"
            : "left"
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1;
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          i.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode
            ? (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - 1 &&
              !0 === i.options.centerMode &&
              (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});

/**
 * Swiper 5.3.8
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: April 24, 2020
 */

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Swiper = t());
})(this, function () {
  "use strict";
  function e(e, t) {
    var a = [],
      i = 0;
    if (e && !t && e instanceof r) return e;
    if (e)
      if ("string" == typeof e) {
        var s,
          n,
          o = e.trim();
        if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
          var l = "div";
          for (
            0 === o.indexOf("<li") && (l = "ul"),
              0 === o.indexOf("<tr") && (l = "tbody"),
              (0 !== o.indexOf("<td") && 0 !== o.indexOf("<th")) || (l = "tr"),
              0 === o.indexOf("<tbody") && (l = "table"),
              0 === o.indexOf("<option") && (l = "select"),
              (n = document.createElement(l)).innerHTML = o,
              i = 0;
            i < n.childNodes.length;
            i += 1
          )
            a.push(n.childNodes[i]);
        } else
          for (
            s =
              t || "#" !== e[0] || e.match(/[ .<>:~]/)
                ? (t || document).querySelectorAll(e.trim())
                : [document.getElementById(e.trim().split("#")[1])],
              i = 0;
            i < s.length;
            i += 1
          )
            s[i] && a.push(s[i]);
      } else if (e.nodeType || e === window || e === document) a.push(e);
      else if (e.length > 0 && e[0].nodeType)
        for (i = 0; i < e.length; i += 1) a.push(e[i]);
    return new r(a);
  }
  function t(e) {
    for (var t = [], a = 0; a < e.length; a += 1)
      -1 === t.indexOf(e[a]) && t.push(e[a]);
    return t;
  }
  function a() {
    var e = "onwheel" in d;
    if (!e) {
      var t = d.createElement("div");
      t.setAttribute("onwheel", "return;"),
        (e = "function" == typeof t.onwheel);
    }
    return (
      !e &&
        d.implementation &&
        d.implementation.hasFeature &&
        !0 !== d.implementation.hasFeature("", "") &&
        (e = d.implementation.hasFeature("Events.wheel", "3.0")),
      e
    );
  }
  var i,
    s = (i =
      "undefined" == typeof window
        ? {
            navigator: { userAgent: "" },
            location: {},
            history: {},
            addEventListener: function () {},
            removeEventListener: function () {},
            getComputedStyle: function () {
              return {};
            },
            Image: function () {},
            Date: function () {},
            screen: {},
          }
        : window),
    r = function (e) {
      for (var t = this, a = 0; a < e.length; a += 1) t[a] = e[a];
      return (t.length = e.length), this;
    };
  (e.fn = r.prototype), (e.Class = r), (e.Dom7 = r);
  "resize scroll".split(" ");
  var n = {
    addClass: function (e) {
      var t = this;
      if (void 0 === e) return this;
      for (var a = e.split(" "), i = 0; i < a.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== t[s].classList && t[s].classList.add(a[i]);
      return this;
    },
    removeClass: function (e) {
      for (var t = this, a = e.split(" "), i = 0; i < a.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== t[s].classList && t[s].classList.remove(a[i]);
      return this;
    },
    hasClass: function (e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function (e) {
      for (var t = this, a = e.split(" "), i = 0; i < a.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== t[s].classList && t[s].classList.toggle(a[i]);
      return this;
    },
    attr: function (e, t) {
      var a = arguments,
        i = this;
      if (1 !== arguments.length || "string" != typeof e) {
        for (var s = 0; s < this.length; s += 1)
          if (2 === a.length) i[s].setAttribute(e, t);
          else for (var r in e) (i[s][r] = e[r]), i[s].setAttribute(r, e[r]);
        return this;
      }
      if (this[0]) return this[0].getAttribute(e);
    },
    removeAttr: function (e) {
      for (var t = this, a = 0; a < this.length; a += 1)
        t[a].removeAttribute(e);
      return this;
    },
    data: function (e, t) {
      var a,
        i = this;
      if (void 0 !== t) {
        for (var s = 0; s < this.length; s += 1)
          (a = i[s]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}),
            (a.dom7ElementDataStorage[e] = t);
        return this;
      }
      if ((a = this[0])) {
        if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage)
          return a.dom7ElementDataStorage[e];
        var r = a.getAttribute("data-" + e);
        if (r) return r;
      }
    },
    transform: function (e) {
      for (var t = this, a = 0; a < this.length; a += 1) {
        var i = t[a].style;
        (i.webkitTransform = e), (i.transform = e);
      }
      return this;
    },
    transition: function (e) {
      var t = this;
      "string" != typeof e && (e += "ms");
      for (var a = 0; a < this.length; a += 1) {
        var i = t[a].style;
        (i.webkitTransitionDuration = e), (i.transitionDuration = e);
      }
      return this;
    },
    on: function () {
      function t(t) {
        var a = t.target;
        if (a) {
          var i = t.target.dom7EventData || [];
          if ((i.unshift(t), e(a).is(o))) l.apply(a, i);
          else
            for (var s = e(a).parents(), r = 0; r < s.length; r += 1)
              e(s[r]).is(o) && l.apply(s[r], i);
        }
      }
      function a(e) {
        var t = e && e.target ? e.target.dom7EventData || [] : [];
        t.unshift(e), l.apply(this, t);
      }
      for (var i = this, s = [], r = arguments.length; r--; )
        s[r] = arguments[r];
      var n = s[0],
        o = s[1],
        l = s[2],
        d = s[3];
      if ("function" == typeof s[1]) {
        var p;
        (n = (p = s)[0]), (l = p[1]), (d = p[2]), (o = void 0);
      }
      d || (d = !1);
      for (var c, u = n.split(" "), h = 0; h < this.length; h += 1) {
        var v = i[h];
        if (o)
          for (c = 0; c < u.length; c += 1)
            v.dom7LiveListeners || (v.dom7LiveListeners = []),
              v.dom7LiveListeners.push({
                type: n,
                listener: l,
                proxyListener: t,
              }),
              v.addEventListener(u[c], t, d);
        else
          for (c = 0; c < u.length; c += 1)
            v.dom7Listeners || (v.dom7Listeners = []),
              v.dom7Listeners.push({ type: n, listener: l, proxyListener: a }),
              v.addEventListener(u[c], a, d);
      }
      return this;
    },
    off: function () {
      for (var e = this, t = [], a = arguments.length; a--; )
        t[a] = arguments[a];
      var i = t[0],
        s = t[1],
        r = t[2],
        n = t[3];
      if ("function" == typeof t[1]) {
        var o;
        (i = (o = t)[0]), (r = o[1]), (n = o[2]), (s = void 0);
      }
      n || (n = !1);
      for (var l = i.split(" "), d = 0; d < l.length; d += 1)
        for (var p = 0; p < this.length; p += 1) {
          var c = e[p];
          if (s) {
            if (c.dom7LiveListeners)
              for (var u = 0; u < c.dom7LiveListeners.length; u += 1)
                r
                  ? c.dom7LiveListeners[u].listener === r &&
                    c.removeEventListener(
                      l[d],
                      c.dom7LiveListeners[u].proxyListener,
                      n
                    )
                  : c.dom7LiveListeners[u].type === l[d] &&
                    c.removeEventListener(
                      l[d],
                      c.dom7LiveListeners[u].proxyListener,
                      n
                    );
          } else if (c.dom7Listeners)
            for (var h = 0; h < c.dom7Listeners.length; h += 1)
              r
                ? c.dom7Listeners[h].listener === r &&
                  c.removeEventListener(
                    l[d],
                    c.dom7Listeners[h].proxyListener,
                    n
                  )
                : c.dom7Listeners[h].type === l[d] &&
                  c.removeEventListener(
                    l[d],
                    c.dom7Listeners[h].proxyListener,
                    n
                  );
        }
      return this;
    },
    trigger: function () {
      for (var e = this, t = [], a = arguments.length; a--; )
        t[a] = arguments[a];
      for (var i = t[0].split(" "), s = t[1], r = 0; r < i.length; r += 1)
        for (var n = 0; n < this.length; n += 1) {
          var o = void 0;
          try {
            o = new window.CustomEvent(i[r], {
              detail: s,
              bubbles: !0,
              cancelable: !0,
            });
          } catch (e) {
            (o = document.createEvent("Event")).initEvent(i[r], !0, !0),
              (o.detail = s);
          }
          (e[n].dom7EventData = t.filter(function (e, t) {
            return t > 0;
          })),
            e[n].dispatchEvent(o),
            (e[n].dom7EventData = []),
            delete e[n].dom7EventData;
        }
      return this;
    },
    transitionEnd: function (e) {
      function t(r) {
        if (r.target === this)
          for (e.call(this, r), a = 0; a < i.length; a += 1) s.off(i[a], t);
      }
      var a,
        i = ["webkitTransitionEnd", "transitionend"],
        s = this;
      if (e) for (a = 0; a < i.length; a += 1) s.on(i[a], t);
      return this;
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(t.getPropertyValue("margin-right")) +
            parseFloat(t.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(t.getPropertyValue("margin-top")) +
            parseFloat(t.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    offset: function () {
      if (this.length > 0) {
        var e = this[0],
          t = e.getBoundingClientRect(),
          a = document.body,
          i = e.clientTop || a.clientTop || 0,
          s = e.clientLeft || a.clientLeft || 0,
          r = e === window ? window.scrollY : e.scrollTop,
          n = e === window ? window.scrollX : e.scrollLeft;
        return { top: t.top + r - i, left: t.left + n - s };
      }
      return null;
    },
    css: function (e, t) {
      var a,
        i = this;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (var s in e) i[a].style[s] = e[s];
          return this;
        }
        if (this[0])
          return window.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) i[a].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      var t = this;
      if (!e) return this;
      for (var a = 0; a < this.length; a += 1)
        if (!1 === e.call(t[a], a, t[a])) return t;
      return this;
    },
    html: function (e) {
      var t = this;
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (var a = 0; a < this.length; a += 1) t[a].innerHTML = e;
      return this;
    },
    text: function (e) {
      var t = this;
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (var a = 0; a < this.length; a += 1) t[a].textContent = e;
      return this;
    },
    is: function (t) {
      var a,
        i,
        s = this[0];
      if (!s || void 0 === t) return !1;
      if ("string" == typeof t) {
        if (s.matches) return s.matches(t);
        if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);
        if (s.msMatchesSelector) return s.msMatchesSelector(t);
        for (a = e(t), i = 0; i < a.length; i += 1) if (a[i] === s) return !0;
        return !1;
      }
      if (t === document) return s === document;
      if (t === window) return s === window;
      if (t.nodeType || t instanceof r) {
        for (a = t.nodeType ? [t] : t, i = 0; i < a.length; i += 1)
          if (a[i] === s) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      var e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      var t,
        a = this.length;
      return e > a - 1
        ? new r([])
        : e < 0
        ? ((t = a + e), new r(t < 0 ? [] : [this[t]]))
        : new r([this[e]]);
    },
    append: function () {
      for (var e = this, t = [], a = arguments.length; a--; )
        t[a] = arguments[a];
      for (var i, s = 0; s < t.length; s += 1) {
        i = t[s];
        for (var n = 0; n < this.length; n += 1)
          if ("string" == typeof i) {
            var o = document.createElement("div");
            for (o.innerHTML = i; o.firstChild; )
              e[n].appendChild(o.firstChild);
          } else if (i instanceof r)
            for (var l = 0; l < i.length; l += 1) e[n].appendChild(i[l]);
          else e[n].appendChild(i);
      }
      return this;
    },
    prepend: function (e) {
      var t,
        a,
        i = this;
      for (t = 0; t < this.length; t += 1)
        if ("string" == typeof e) {
          var s = document.createElement("div");
          for (s.innerHTML = e, a = s.childNodes.length - 1; a >= 0; a -= 1)
            i[t].insertBefore(s.childNodes[a], i[t].childNodes[0]);
        } else if (e instanceof r)
          for (a = 0; a < e.length; a += 1)
            i[t].insertBefore(e[a], i[t].childNodes[0]);
        else i[t].insertBefore(e, i[t].childNodes[0]);
      return this;
    },
    next: function (t) {
      return new r(
        this.length > 0
          ? t
            ? this[0].nextElementSibling && e(this[0].nextElementSibling).is(t)
              ? [this[0].nextElementSibling]
              : []
            : this[0].nextElementSibling
            ? [this[0].nextElementSibling]
            : []
          : []
      );
    },
    nextAll: function (t) {
      var a = [],
        i = this[0];
      if (!i) return new r([]);
      for (; i.nextElementSibling; ) {
        var s = i.nextElementSibling;
        t ? e(s).is(t) && a.push(s) : a.push(s), (i = s);
      }
      return new r(a);
    },
    prev: function (t) {
      if (this.length > 0) {
        var a = this[0];
        return new r(
          t
            ? a.previousElementSibling && e(a.previousElementSibling).is(t)
              ? [a.previousElementSibling]
              : []
            : a.previousElementSibling
            ? [a.previousElementSibling]
            : []
        );
      }
      return new r([]);
    },
    prevAll: function (t) {
      var a = [],
        i = this[0];
      if (!i) return new r([]);
      for (; i.previousElementSibling; ) {
        var s = i.previousElementSibling;
        t ? e(s).is(t) && a.push(s) : a.push(s), (i = s);
      }
      return new r(a);
    },
    parent: function (a) {
      for (var i = this, s = [], r = 0; r < this.length; r += 1)
        null !== i[r].parentNode &&
          (a
            ? e(i[r].parentNode).is(a) && s.push(i[r].parentNode)
            : s.push(i[r].parentNode));
      return e(t(s));
    },
    parents: function (a) {
      for (var i = this, s = [], r = 0; r < this.length; r += 1)
        for (var n = i[r].parentNode; n; )
          a ? e(n).is(a) && s.push(n) : s.push(n), (n = n.parentNode);
      return e(t(s));
    },
    closest: function (e) {
      var t = this;
      return void 0 === e
        ? new r([])
        : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      for (var t = this, a = [], i = 0; i < this.length; i += 1)
        for (var s = t[i].querySelectorAll(e), n = 0; n < s.length; n += 1)
          a.push(s[n]);
      return new r(a);
    },
    children: function (a) {
      for (var i = this, s = [], n = 0; n < this.length; n += 1)
        for (var o = i[n].childNodes, l = 0; l < o.length; l += 1)
          a
            ? 1 === o[l].nodeType && e(o[l]).is(a) && s.push(o[l])
            : 1 === o[l].nodeType && s.push(o[l]);
      return new r(t(s));
    },
    remove: function () {
      for (var e = this, t = 0; t < this.length; t += 1)
        e[t].parentNode && e[t].parentNode.removeChild(e[t]);
      return this;
    },
    add: function () {
      for (var t = [], a = arguments.length; a--; ) t[a] = arguments[a];
      var i,
        s,
        r = this;
      for (i = 0; i < t.length; i += 1) {
        var n = e(t[i]);
        for (s = 0; s < n.length; s += 1) (r[r.length] = n[s]), (r.length += 1);
      }
      return r;
    },
    styles: function () {
      return this[0] ? window.getComputedStyle(this[0], null) : {};
    },
  };
  Object.keys(n).forEach(function (t) {
    e.fn[t] = n[t];
  });
  var o,
    l = {
      deleteProps: function (e) {
        var t = e;
        Object.keys(t).forEach(function (e) {
          try {
            t[e] = null;
          } catch (e) {}
          try {
            delete t[e];
          } catch (e) {}
        });
      },
      nextTick: function (e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      },
      now: function () {
        return Date.now();
      },
      getTranslate: function (e, t) {
        void 0 === t && (t = "x");
        var a,
          i,
          r,
          n = s.getComputedStyle(e, null);
        return (
          s.WebKitCSSMatrix
            ? ((i = n.transform || n.webkitTransform).split(",").length > 6 &&
                (i = i
                  .split(", ")
                  .map(function (e) {
                    return e.replace(",", ".");
                  })
                  .join(", ")),
              (r = new s.WebKitCSSMatrix("none" === i ? "" : i)))
            : (a = (r =
                n.MozTransform ||
                n.OTransform ||
                n.MsTransform ||
                n.msTransform ||
                n.transform ||
                n
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,"))
                .toString()
                .split(",")),
          "x" === t &&
            (i = s.WebKitCSSMatrix
              ? r.m41
              : 16 === a.length
              ? parseFloat(a[12])
              : parseFloat(a[4])),
          "y" === t &&
            (i = s.WebKitCSSMatrix
              ? r.m42
              : 16 === a.length
              ? parseFloat(a[13])
              : parseFloat(a[5])),
          i || 0
        );
      },
      parseUrlQuery: function (e) {
        var t,
          a,
          i,
          r,
          n = {},
          o = e || s.location.href;
        if ("string" == typeof o && o.length)
          for (
            r = (a = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "")
              .split("&")
              .filter(function (e) {
                return "" !== e;
              })).length,
              t = 0;
            t < r;
            t += 1
          )
            (i = a[t].replace(/#\S+/g, "").split("=")),
              (n[decodeURIComponent(i[0])] =
                void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "");
        return n;
      },
      isObject: function (e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          e.constructor === Object
        );
      },
      extend: function () {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
          var s = e[i];
          if (void 0 !== s && null !== s)
            for (
              var r = Object.keys(Object(s)), n = 0, o = r.length;
              n < o;
              n += 1
            ) {
              var d = r[n],
                p = Object.getOwnPropertyDescriptor(s, d);
              void 0 !== p &&
                p.enumerable &&
                (l.isObject(a[d]) && l.isObject(s[d])
                  ? l.extend(a[d], s[d])
                  : !l.isObject(a[d]) && l.isObject(s[d])
                  ? ((a[d] = {}), l.extend(a[d], s[d]))
                  : (a[d] = s[d]));
            }
        }
        return a;
      },
    },
    d = (o =
      "undefined" == typeof document
        ? {
            addEventListener: function () {},
            removeEventListener: function () {},
            activeElement: { blur: function () {}, nodeName: "" },
            querySelector: function () {
              return {};
            },
            querySelectorAll: function () {
              return [];
            },
            createElement: function () {
              return {
                style: {},
                setAttribute: function () {},
                getElementsByTagName: function () {
                  return [];
                },
              };
            },
            location: { hash: "" },
          }
        : document),
    p = {
      touch:
        (s.Modernizr && !0 === s.Modernizr.touch) ||
        !!(
          "ontouchstart" in s ||
          (s.DocumentTouch && d instanceof s.DocumentTouch)
        ),
      transforms3d:
        (s.Modernizr && !0 === s.Modernizr.csstransforms3d) ||
        (function () {
          var e = d.createElement("div").style;
          return (
            "webkitPerspective" in e ||
            "MozPerspective" in e ||
            "OPerspective" in e ||
            "MsPerspective" in e ||
            "perspective" in e
          );
        })(),
      flexbox: (function () {
        for (
          var e = d.createElement("div").style,
            t =
              "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
                " "
              ),
            a = 0;
          a < t.length;
          a += 1
        )
          if (t[a] in e) return !0;
        return !1;
      })(),
      observer: "MutationObserver" in s || "WebkitMutationObserver" in s,
      passiveListener: (function () {
        var e = !1;
        try {
          var t = Object.defineProperty({}, "passive", {
            get: function () {
              e = !0;
            },
          });
          s.addEventListener("testPassiveListener", null, t);
        } catch (e) {}
        return e;
      })(),
      gestures: "ongesturestart" in s,
    },
    c = function (e) {
      void 0 === e && (e = {});
      var t = this;
      (t.params = e),
        (t.eventsListeners = {}),
        t.params &&
          t.params.on &&
          Object.keys(t.params.on).forEach(function (e) {
            t.on(e, t.params.on[e]);
          });
    },
    u = { components: {} };
  (c.prototype.on = function (e, t) {
    var a = this;
    return "function" != typeof t
      ? a
      : (e.split(" ").forEach(function (e) {
          a.eventsListeners[e] || (a.eventsListeners[e] = []),
            a.eventsListeners[e].push(t);
        }),
        a);
  }),
    (c.prototype.once = function (e, t) {
      function a() {
        for (var s = [], r = arguments.length; r--; ) s[r] = arguments[r];
        t.apply(i, s), i.off(e, a);
      }
      var i = this;
      return "function" != typeof t ? i : i.on(e, a);
    }),
    (c.prototype.off = function (e, t) {
      var a = this;
      return (
        e.split(" ").forEach(function (e) {
          void 0 === t
            ? (a.eventsListeners[e] = [])
            : a.eventsListeners[e].forEach(function (i, s) {
                i === t && a.eventsListeners[e].splice(s, 1);
              });
        }),
        a
      );
    }),
    (c.prototype.emit = function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var a = this;
      if (!a.eventsListeners) return a;
      var i, s, r;
      return (
        "string" == typeof e[0] || Array.isArray(e[0])
          ? ((i = e[0]), (s = e.slice(1, e.length)), (r = a))
          : ((i = e[0].events), (s = e[0].data), (r = e[0].context || a)),
        (Array.isArray(i) ? i : i.split(" ")).forEach(function (e) {
          if (a.eventsListeners[e]) {
            var t = [];
            a.eventsListeners[e].forEach(function (e) {
              t.push(e);
            }),
              t.forEach(function (e) {
                e.apply(r, s);
              });
          }
        }),
        a
      );
    }),
    (c.prototype.useModulesParams = function (e) {
      var t = this;
      t.modules &&
        Object.keys(t.modules).forEach(function (a) {
          var i = t.modules[a];
          i.params && l.extend(e, i.params);
        });
    }),
    (c.prototype.useModules = function (e) {
      void 0 === e && (e = {});
      var t = this;
      t.modules &&
        Object.keys(t.modules).forEach(function (a) {
          var i = t.modules[a],
            s = e[a] || {};
          i.instance &&
            Object.keys(i.instance).forEach(function (e) {
              var a = i.instance[e];
              t[e] = "function" == typeof a ? a.bind(t) : a;
            }),
            i.on &&
              t.on &&
              Object.keys(i.on).forEach(function (e) {
                t.on(e, i.on[e]);
              }),
            i.create && i.create.bind(t)(s);
        });
    }),
    (u.components.set = function (e) {
      var t = this;
      t.use && t.use(e);
    }),
    (c.installModule = function (e) {
      for (var t = [], a = arguments.length - 1; a-- > 0; )
        t[a] = arguments[a + 1];
      var i = this;
      i.prototype.modules || (i.prototype.modules = {});
      var s = e.name || Object.keys(i.prototype.modules).length + "_" + l.now();
      return (
        (i.prototype.modules[s] = e),
        e.proto &&
          Object.keys(e.proto).forEach(function (t) {
            i.prototype[t] = e.proto[t];
          }),
        e.static &&
          Object.keys(e.static).forEach(function (t) {
            i[t] = e.static[t];
          }),
        e.install && e.install.apply(i, t),
        i
      );
    }),
    (c.use = function (e) {
      for (var t = [], a = arguments.length - 1; a-- > 0; )
        t[a] = arguments[a + 1];
      var i = this;
      return Array.isArray(e)
        ? (e.forEach(function (e) {
            return i.installModule(e);
          }),
          i)
        : i.installModule.apply(i, [e].concat(t));
    }),
    Object.defineProperties(c, u);
  var h = {
      updateSize: function () {
        var e,
          t,
          a = this,
          i = a.$el;
        (e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth),
          (t =
            void 0 !== a.params.height ? a.params.height : i[0].clientHeight),
          (0 === e && a.isHorizontal()) ||
            (0 === t && a.isVertical()) ||
            ((e =
              e -
              parseInt(i.css("padding-left"), 10) -
              parseInt(i.css("padding-right"), 10)),
            (t =
              t -
              parseInt(i.css("padding-top"), 10) -
              parseInt(i.css("padding-bottom"), 10)),
            l.extend(a, {
              width: e,
              height: t,
              size: a.isHorizontal() ? e : t,
            }));
      },
      updateSlides: function () {
        var e = this,
          t = e.params,
          a = e.$wrapperEl,
          i = e.size,
          s = e.rtl,
          r = e.wrongRTL,
          n = a.children("." + e.params.slideClass),
          o =
            e.virtual && t.virtual.enabled ? e.virtual.slides.length : n.length,
          d = [],
          c = [],
          u = [],
          h = t.slidesOffsetBefore;
        "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
        var v = t.slidesOffsetAfter;
        "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
        var f = o,
          m = e.snapGrid.length,
          g = e.snapGrid.length,
          b = t.spaceBetween,
          w = -h,
          y = 0,
          x = 0;
        if (void 0 !== i) {
          "string" == typeof b &&
            b.indexOf("%") >= 0 &&
            (b = (parseFloat(b.replace("%", "")) / 100) * i),
            (e.virtualSize = -b),
            s
              ? n.css({ marginLeft: "", marginTop: "" })
              : n.css({ marginRight: "", marginBottom: "" });
          var T;
          t.slidesPerColumn > 1 &&
            ((T =
              Math.floor(o / t.slidesPerColumn) === o / e.params.slidesPerColumn
                ? o
                : Math.ceil(o / t.slidesPerColumn) * t.slidesPerColumn),
            "auto" !== t.slidesPerView &&
              "row" === t.slidesPerColumnFill &&
              (T = Math.max(T, t.slidesPerView * t.slidesPerColumn)));
          for (
            var E,
              S = t.slidesPerColumn,
              C = T / S,
              M = C - (t.slidesPerColumn * C - o),
              z = 0;
            z < o;
            z += 1
          ) {
            E = 0;
            var P = n.eq(z);
            if (t.slidesPerColumn > 1) {
              var k = void 0,
                $ = void 0,
                I = void 0;
              "column" === t.slidesPerColumnFill
                ? ((I = z - ($ = Math.floor(z / S)) * S),
                  ($ > M || ($ === M && I === S - 1)) &&
                    (I += 1) >= S &&
                    ((I = 0), ($ += 1)),
                  (k = $ + (I * T) / S),
                  P.css({
                    "-webkit-box-ordinal-group": k,
                    "-moz-box-ordinal-group": k,
                    "-ms-flex-order": k,
                    "-webkit-order": k,
                    order: k,
                  }))
                : ($ = z - (I = Math.floor(z / C)) * C),
                P.css(
                  "margin-" + (e.isHorizontal() ? "top" : "left"),
                  0 !== I && t.spaceBetween && t.spaceBetween + "px"
                )
                  .attr("data-swiper-column", $)
                  .attr("data-swiper-row", I);
            }
            "none" !== P.css("display") &&
              ("auto" === t.slidesPerView
                ? ((E = e.isHorizontal()
                    ? P.outerWidth(!0)
                    : P.outerHeight(!0)),
                  t.roundLengths && (E = Math.floor(E)))
                : ((E = (i - (t.slidesPerView - 1) * b) / t.slidesPerView),
                  t.roundLengths && (E = Math.floor(E)),
                  n[z] &&
                    (e.isHorizontal()
                      ? (n[z].style.width = E + "px")
                      : (n[z].style.height = E + "px"))),
              n[z] && (n[z].swiperSlideSize = E),
              u.push(E),
              t.centeredSlides
                ? ((w = w + E / 2 + y / 2 + b),
                  0 === y && 0 !== z && (w = w - i / 2 - b),
                  0 === z && (w = w - i / 2 - b),
                  Math.abs(w) < 0.001 && (w = 0),
                  x % t.slidesPerGroup == 0 && d.push(w),
                  c.push(w))
                : (x % t.slidesPerGroup == 0 && d.push(w),
                  c.push(w),
                  (w = w + E + b)),
              (e.virtualSize += E + b),
              (y = E),
              (x += 1));
          }
          e.virtualSize = Math.max(e.virtualSize, i) + v;
          var L;
          if (
            (s &&
              r &&
              ("slide" === t.effect || "coverflow" === t.effect) &&
              a.css({ width: e.virtualSize + t.spaceBetween + "px" }),
            (p.flexbox && !t.setWrapperSize) ||
              (e.isHorizontal()
                ? a.css({ width: e.virtualSize + t.spaceBetween + "px" })
                : a.css({ height: e.virtualSize + t.spaceBetween + "px" })),
            t.slidesPerColumn > 1 &&
              ((e.virtualSize = (E + t.spaceBetween) * T),
              (e.virtualSize =
                Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween),
              e.isHorizontal()
                ? a.css({ width: e.virtualSize + t.spaceBetween + "px" })
                : a.css({ height: e.virtualSize + t.spaceBetween + "px" }),
              t.centeredSlides))
          ) {
            L = [];
            for (var D = 0; D < d.length; D += 1)
              d[D] < e.virtualSize + d[0] && L.push(d[D]);
            d = L;
          }
          if (!t.centeredSlides) {
            L = [];
            for (var O = 0; O < d.length; O += 1)
              d[O] <= e.virtualSize - i && L.push(d[O]);
            (d = L),
              Math.floor(e.virtualSize - i) - Math.floor(d[d.length - 1]) > 1 &&
                d.push(e.virtualSize - i);
          }
          0 === d.length && (d = [0]),
            0 !== t.spaceBetween &&
              (e.isHorizontal()
                ? s
                  ? n.css({ marginLeft: b + "px" })
                  : n.css({ marginRight: b + "px" })
                : n.css({ marginBottom: b + "px" })),
            l.extend(e, {
              slides: n,
              snapGrid: d,
              slidesGrid: c,
              slidesSizesGrid: u,
            }),
            o !== f && e.emit("slidesLengthChange"),
            d.length !== m && e.emit("snapGridLengthChange"),
            c.length !== g && e.emit("slidesGridLengthChange"),
            (t.watchSlidesProgress || t.watchSlidesVisibility) &&
              e.updateSlidesOffset();
        }
      },
      updateAutoHeight: function () {
        var e,
          t = this,
          a = [],
          i = 0;
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          for (e = 0; e < Math.ceil(t.params.slidesPerView); e += 1) {
            var s = t.activeIndex + e;
            if (s > t.slides.length) break;
            a.push(t.slides.eq(s)[0]);
          }
        else a.push(t.slides.eq(t.activeIndex)[0]);
        for (e = 0; e < a.length; e += 1)
          if (void 0 !== a[e]) {
            var r = a[e].offsetHeight;
            i = r > i ? r : i;
          }
        i && t.$wrapperEl.css("height", i + "px");
      },
      updateSlidesOffset: function () {
        for (var e = this, t = e.slides, a = 0; a < t.length; a += 1)
          t[a].swiperSlideOffset = e.isHorizontal()
            ? t[a].offsetLeft
            : t[a].offsetTop;
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = this.translate || 0);
        var t = this,
          a = t.params,
          i = t.slides,
          s = t.rtl;
        if (0 !== i.length) {
          void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
          var r = -e;
          s && (r = e), i.removeClass(a.slideVisibleClass);
          for (var n = 0; n < i.length; n += 1) {
            var o = i[n],
              l =
                (r +
                  (a.centeredSlides ? t.minTranslate() : 0) -
                  o.swiperSlideOffset) /
                (o.swiperSlideSize + a.spaceBetween);
            if (a.watchSlidesVisibility) {
              var d = -(r - o.swiperSlideOffset),
                p = d + t.slidesSizesGrid[n];
              ((d >= 0 && d < t.size) ||
                (p > 0 && p <= t.size) ||
                (d <= 0 && p >= t.size)) &&
                i.eq(n).addClass(a.slideVisibleClass);
            }
            o.progress = s ? -l : l;
          }
        }
      },
      updateProgress: function (e) {
        void 0 === e && (e = this.translate || 0);
        var t = this,
          a = t.params,
          i = t.maxTranslate() - t.minTranslate(),
          s = t.progress,
          r = t.isBeginning,
          n = t.isEnd,
          o = r,
          d = n;
        0 === i
          ? ((s = 0), (r = !0), (n = !0))
          : ((r = (s = (e - t.minTranslate()) / i) <= 0), (n = s >= 1)),
          l.extend(t, { progress: s, isBeginning: r, isEnd: n }),
          (a.watchSlidesProgress || a.watchSlidesVisibility) &&
            t.updateSlidesProgress(e),
          r && !o && t.emit("reachBeginning toEdge"),
          n && !d && t.emit("reachEnd toEdge"),
          ((o && !r) || (d && !n)) && t.emit("fromEdge"),
          t.emit("progress", s);
      },
      updateSlidesClasses: function () {
        var e = this,
          t = e.slides,
          a = e.params,
          i = e.$wrapperEl,
          s = e.activeIndex,
          r = e.realIndex,
          n = e.virtual && a.virtual.enabled;
        t.removeClass(
          a.slideActiveClass +
            " " +
            a.slideNextClass +
            " " +
            a.slidePrevClass +
            " " +
            a.slideDuplicateActiveClass +
            " " +
            a.slideDuplicateNextClass +
            " " +
            a.slideDuplicatePrevClass
        );
        var o;
        (o = n
          ? e.$wrapperEl.find(
              "." + a.slideClass + '[data-swiper-slide-index="' + s + '"]'
            )
          : t.eq(s)).addClass(a.slideActiveClass),
          a.loop &&
            (o.hasClass(a.slideDuplicateClass)
              ? i
                  .children(
                    "." +
                      a.slideClass +
                      ":not(." +
                      a.slideDuplicateClass +
                      ')[data-swiper-slide-index="' +
                      r +
                      '"]'
                  )
                  .addClass(a.slideDuplicateActiveClass)
              : i
                  .children(
                    "." +
                      a.slideClass +
                      "." +
                      a.slideDuplicateClass +
                      '[data-swiper-slide-index="' +
                      r +
                      '"]'
                  )
                  .addClass(a.slideDuplicateActiveClass));
        var l = o
          .nextAll("." + a.slideClass)
          .eq(0)
          .addClass(a.slideNextClass);
        a.loop && 0 === l.length && (l = t.eq(0)).addClass(a.slideNextClass);
        var d = o
          .prevAll("." + a.slideClass)
          .eq(0)
          .addClass(a.slidePrevClass);
        a.loop && 0 === d.length && (d = t.eq(-1)).addClass(a.slidePrevClass),
          a.loop &&
            (l.hasClass(a.slideDuplicateClass)
              ? i
                  .children(
                    "." +
                      a.slideClass +
                      ":not(." +
                      a.slideDuplicateClass +
                      ')[data-swiper-slide-index="' +
                      l.attr("data-swiper-slide-index") +
                      '"]'
                  )
                  .addClass(a.slideDuplicateNextClass)
              : i
                  .children(
                    "." +
                      a.slideClass +
                      "." +
                      a.slideDuplicateClass +
                      '[data-swiper-slide-index="' +
                      l.attr("data-swiper-slide-index") +
                      '"]'
                  )
                  .addClass(a.slideDuplicateNextClass),
            d.hasClass(a.slideDuplicateClass)
              ? i
                  .children(
                    "." +
                      a.slideClass +
                      ":not(." +
                      a.slideDuplicateClass +
                      ')[data-swiper-slide-index="' +
                      d.attr("data-swiper-slide-index") +
                      '"]'
                  )
                  .addClass(a.slideDuplicatePrevClass)
              : i
                  .children(
                    "." +
                      a.slideClass +
                      "." +
                      a.slideDuplicateClass +
                      '[data-swiper-slide-index="' +
                      d.attr("data-swiper-slide-index") +
                      '"]'
                  )
                  .addClass(a.slideDuplicatePrevClass));
      },
      updateActiveIndex: function (e) {
        var t,
          a = this,
          i = a.rtl ? a.translate : -a.translate,
          s = a.slidesGrid,
          r = a.snapGrid,
          n = a.params,
          o = a.activeIndex,
          d = a.realIndex,
          p = a.snapIndex,
          c = e;
        if (void 0 === c) {
          for (var u = 0; u < s.length; u += 1)
            void 0 !== s[u + 1]
              ? i >= s[u] && i < s[u + 1] - (s[u + 1] - s[u]) / 2
                ? (c = u)
                : i >= s[u] && i < s[u + 1] && (c = u + 1)
              : i >= s[u] && (c = u);
          n.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
        }
        if (
          ((t =
            r.indexOf(i) >= 0
              ? r.indexOf(i)
              : Math.floor(c / n.slidesPerGroup)) >= r.length &&
            (t = r.length - 1),
          c !== o)
        ) {
          var h = parseInt(
            a.slides.eq(c).attr("data-swiper-slide-index") || c,
            10
          );
          l.extend(a, {
            snapIndex: t,
            realIndex: h,
            previousIndex: o,
            activeIndex: c,
          }),
            a.emit("activeIndexChange"),
            a.emit("snapIndexChange"),
            d !== h && a.emit("realIndexChange"),
            a.emit("slideChange");
        } else t !== p && ((a.snapIndex = t), a.emit("snapIndexChange"));
      },
      updateClickedSlide: function (t) {
        var a = this,
          i = a.params,
          s = e(t.target).closest("." + i.slideClass)[0],
          r = !1;
        if (s)
          for (var n = 0; n < a.slides.length; n += 1)
            a.slides[n] === s && (r = !0);
        if (!s || !r)
          return (a.clickedSlide = void 0), void (a.clickedIndex = void 0);
        (a.clickedSlide = s),
          a.virtual && a.params.virtual.enabled
            ? (a.clickedIndex = parseInt(
                e(s).attr("data-swiper-slide-index"),
                10
              ))
            : (a.clickedIndex = e(s).index()),
          i.slideToClickedSlide &&
            void 0 !== a.clickedIndex &&
            a.clickedIndex !== a.activeIndex &&
            a.slideToClickedSlide();
      },
    },
    v = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        var t = this,
          a = t.params,
          i = t.rtl,
          s = t.translate,
          r = t.$wrapperEl;
        if (a.virtualTranslate) return i ? -s : s;
        var n = l.getTranslate(r[0], e);
        return i && (n = -n), n || 0;
      },
      setTranslate: function (e, t) {
        var a = this,
          i = a.rtl,
          s = a.params,
          r = a.$wrapperEl,
          n = a.progress,
          o = 0,
          l = 0;
        a.isHorizontal() ? (o = i ? -e : e) : (l = e),
          s.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
          s.virtualTranslate ||
            (p.transforms3d
              ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)")
              : r.transform("translate(" + o + "px, " + l + "px)")),
          (a.translate = a.isHorizontal() ? o : l);
        var d = a.maxTranslate() - a.minTranslate();
        (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e),
          a.emit("setTranslate", a.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
    },
    f = {
      setTransition: function (e, t) {
        var a = this;
        a.$wrapperEl.transition(e), a.emit("setTransition", e, t);
      },
      transitionStart: function (e) {
        void 0 === e && (e = !0);
        var t = this,
          a = t.activeIndex,
          i = t.params,
          s = t.previousIndex;
        i.autoHeight && t.updateAutoHeight(),
          t.emit("transitionStart"),
          e &&
            a !== s &&
            (t.emit("slideChangeTransitionStart"),
            a > s
              ? t.emit("slideNextTransitionStart")
              : t.emit("slidePrevTransitionStart"));
      },
      transitionEnd: function (e) {
        void 0 === e && (e = !0);
        var t = this,
          a = t.activeIndex,
          i = t.previousIndex;
        (t.animating = !1),
          t.setTransition(0),
          t.emit("transitionEnd"),
          e &&
            a !== i &&
            (t.emit("slideChangeTransitionEnd"),
            a > i
              ? t.emit("slideNextTransitionEnd")
              : t.emit("slidePrevTransitionEnd"));
      },
    },
    m = (function () {
      return {
        isSafari: (function () {
          var e = s.navigator.userAgent.toLowerCase();
          return (
            e.indexOf("safari") >= 0 &&
            e.indexOf("chrome") < 0 &&
            e.indexOf("android") < 0
          );
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
          s.navigator.userAgent
        ),
        ie: s.navigator.pointerEnabled || s.navigator.msPointerEnabled,
        ieTouch:
          (s.navigator.msPointerEnabled && s.navigator.msMaxTouchPoints > 1) ||
          (s.navigator.pointerEnabled && s.navigator.maxTouchPoints > 1),
        lteIE9: (function () {
          var e = d.createElement("div");
          return (
            (e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e"),
            1 === e.getElementsByTagName("i").length
          );
        })(),
      };
    })(),
    g = {
      slideTo: function (e, t, a, i) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === a && (a = !0);
        var s = this,
          r = e;
        r < 0 && (r = 0);
        var n = s.params,
          o = s.snapGrid,
          l = s.slidesGrid,
          d = s.previousIndex,
          p = s.activeIndex,
          c = s.rtl,
          u = s.$wrapperEl,
          h = Math.floor(r / n.slidesPerGroup);
        h >= o.length && (h = o.length - 1),
          (p || n.initialSlide || 0) === (d || 0) &&
            a &&
            s.emit("beforeSlideChangeStart");
        var v = -o[h];
        if ((s.updateProgress(v), n.normalizeSlideIndex))
          for (var f = 0; f < l.length; f += 1)
            -Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
        return !(
          (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) ||
          (!s.allowSlidePrev &&
            v > s.translate &&
            v > s.maxTranslate() &&
            (p || 0) !== r) ||
          ((c && -v === s.translate) || (!c && v === s.translate)
            ? (s.updateActiveIndex(r),
              n.autoHeight && s.updateAutoHeight(),
              s.updateSlidesClasses(),
              "slide" !== n.effect && s.setTranslate(v),
              1)
            : (0 === t || m.lteIE9
                ? (s.setTransition(0),
                  s.setTranslate(v),
                  s.updateActiveIndex(r),
                  s.updateSlidesClasses(),
                  s.emit("beforeTransitionStart", t, i),
                  s.transitionStart(a),
                  s.transitionEnd(a))
                : (s.setTransition(t),
                  s.setTranslate(v),
                  s.updateActiveIndex(r),
                  s.updateSlidesClasses(),
                  s.emit("beforeTransitionStart", t, i),
                  s.transitionStart(a),
                  s.animating ||
                    ((s.animating = !0),
                    u.transitionEnd(function () {
                      s && !s.destroyed && s.transitionEnd(a);
                    }))),
              0))
        );
      },
      slideNext: function (e, t, a) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        var i = this,
          s = i.params,
          r = i.animating;
        return s.loop
          ? !r &&
              (i.loopFix(),
              (i._clientLeft = i.$wrapperEl[0].clientLeft),
              i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a))
          : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a);
      },
      slidePrev: function (e, t, a) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        var i = this,
          s = i.params,
          r = i.animating;
        return s.loop
          ? !r &&
              (i.loopFix(),
              (i._clientLeft = i.$wrapperEl[0].clientLeft),
              i.slideTo(i.activeIndex - 1, e, t, a))
          : i.slideTo(i.activeIndex - 1, e, t, a);
      },
      slideReset: function (e, t, a) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        var i = this;
        return i.slideTo(i.activeIndex, e, t, a);
      },
      slideToClickedSlide: function () {
        var t,
          a = this,
          i = a.params,
          s = a.$wrapperEl,
          r =
            "auto" === i.slidesPerView
              ? a.slidesPerViewDynamic()
              : i.slidesPerView,
          n = a.clickedIndex;
        if (i.loop) {
          if (a.animating) return;
          (t = parseInt(e(a.clickedSlide).attr("data-swiper-slide-index"), 10)),
            i.centeredSlides
              ? n < a.loopedSlides - r / 2 ||
                n > a.slides.length - a.loopedSlides + r / 2
                ? (a.loopFix(),
                  (n = s
                    .children(
                      "." +
                        i.slideClass +
                        '[data-swiper-slide-index="' +
                        t +
                        '"]:not(.' +
                        i.slideDuplicateClass +
                        ")"
                    )
                    .eq(0)
                    .index()),
                  l.nextTick(function () {
                    a.slideTo(n);
                  }))
                : a.slideTo(n)
              : n > a.slides.length - r
              ? (a.loopFix(),
                (n = s
                  .children(
                    "." +
                      i.slideClass +
                      '[data-swiper-slide-index="' +
                      t +
                      '"]:not(.' +
                      i.slideDuplicateClass +
                      ")"
                  )
                  .eq(0)
                  .index()),
                l.nextTick(function () {
                  a.slideTo(n);
                }))
              : a.slideTo(n);
        } else a.slideTo(n);
      },
    },
    b = {
      loopCreate: function () {
        var t = this,
          a = t.params,
          i = t.$wrapperEl;
        i.children("." + a.slideClass + "." + a.slideDuplicateClass).remove();
        var s = i.children("." + a.slideClass);
        if (a.loopFillGroupWithBlank) {
          var r = a.slidesPerGroup - (s.length % a.slidesPerGroup);
          if (r !== a.slidesPerGroup) {
            for (var n = 0; n < r; n += 1) {
              var o = e(d.createElement("div")).addClass(
                a.slideClass + " " + a.slideBlankClass
              );
              i.append(o);
            }
            s = i.children("." + a.slideClass);
          }
        }
        "auto" !== a.slidesPerView ||
          a.loopedSlides ||
          (a.loopedSlides = s.length),
          (t.loopedSlides = parseInt(a.loopedSlides || a.slidesPerView, 10)),
          (t.loopedSlides += a.loopAdditionalSlides),
          t.loopedSlides > s.length && (t.loopedSlides = s.length);
        var l = [],
          p = [];
        s.each(function (a, i) {
          var r = e(i);
          a < t.loopedSlides && p.push(i),
            a < s.length && a >= s.length - t.loopedSlides && l.push(i),
            r.attr("data-swiper-slide-index", a);
        });
        for (var c = 0; c < p.length; c += 1)
          i.append(e(p[c].cloneNode(!0)).addClass(a.slideDuplicateClass));
        for (var u = l.length - 1; u >= 0; u -= 1)
          i.prepend(e(l[u].cloneNode(!0)).addClass(a.slideDuplicateClass));
      },
      loopFix: function () {
        var e,
          t = this,
          a = t.params,
          i = t.activeIndex,
          s = t.slides,
          r = t.loopedSlides,
          n = t.allowSlidePrev,
          o = t.allowSlideNext;
        (t.allowSlidePrev = !0),
          (t.allowSlideNext = !0),
          i < r
            ? ((e = s.length - 3 * r + i), (e += r), t.slideTo(e, 0, !1, !0))
            : (("auto" === a.slidesPerView && i >= 2 * r) ||
                i > s.length - 2 * a.slidesPerView) &&
              ((e = -s.length + i + r), (e += r), t.slideTo(e, 0, !1, !0)),
          (t.allowSlidePrev = n),
          (t.allowSlideNext = o);
      },
      loopDestroy: function () {
        var e = this,
          t = e.$wrapperEl,
          a = e.params,
          i = e.slides;
        t.children("." + a.slideClass + "." + a.slideDuplicateClass).remove(),
          i.removeAttr("data-swiper-slide-index");
      },
    },
    w = {
      setGrabCursor: function (e) {
        var t = this;
        if (!p.touch && t.params.simulateTouch) {
          var a = t.el;
          (a.style.cursor = "move"),
            (a.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (a.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (a.style.cursor = e ? "grabbing" : "grab");
        }
      },
      unsetGrabCursor: function () {
        var e = this;
        p.touch || (e.el.style.cursor = "");
      },
    },
    y = {
      appendSlide: function (e) {
        var t = this,
          a = t.$wrapperEl,
          i = t.params;
        if ((i.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
          for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
        else a.append(e);
        i.loop && t.loopCreate(), (i.observer && p.observer) || t.update();
      },
      prependSlide: function (e) {
        var t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = t.activeIndex;
        a.loop && t.loopDestroy();
        var r = s + 1;
        if ("object" == typeof e && "length" in e) {
          for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
          r = s + e.length;
        } else i.prepend(e);
        a.loop && t.loopCreate(),
          (a.observer && p.observer) || t.update(),
          t.slideTo(r, 0, !1);
      },
      removeSlide: function (e) {
        var t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = t.activeIndex;
        a.loop &&
          (t.loopDestroy(), (t.slides = i.children("." + a.slideClass)));
        var r,
          n = s;
        if ("object" == typeof e && "length" in e) {
          for (var o = 0; o < e.length; o += 1)
            (r = e[o]),
              t.slides[r] && t.slides.eq(r).remove(),
              r < n && (n -= 1);
          n = Math.max(n, 0);
        } else
          (r = e),
            t.slides[r] && t.slides.eq(r).remove(),
            r < n && (n -= 1),
            (n = Math.max(n, 0));
        a.loop && t.loopCreate(),
          (a.observer && p.observer) || t.update(),
          a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
      },
      removeAllSlides: function () {
        for (var e = this, t = [], a = 0; a < e.slides.length; a += 1)
          t.push(a);
        e.removeSlide(t);
      },
    },
    x = (function () {
      var e = s.navigator.userAgent,
        t = {
          ios: !1,
          android: !1,
          androidChrome: !1,
          desktop: !1,
          windows: !1,
          iphone: !1,
          ipod: !1,
          ipad: !1,
          cordova: s.cordova || s.phonegap,
          phonegap: s.cordova || s.phonegap,
        },
        a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
        i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        r = e.match(/(iPad).*OS\s([\d_]+)/),
        n = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        o = !r && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      if (
        (a && ((t.os = "windows"), (t.osVersion = a[2]), (t.windows = !0)),
        i &&
          !a &&
          ((t.os = "android"),
          (t.osVersion = i[2]),
          (t.android = !0),
          (t.androidChrome = e.toLowerCase().indexOf("chrome") >= 0)),
        (r || o || n) && ((t.os = "ios"), (t.ios = !0)),
        o && !n && ((t.osVersion = o[2].replace(/_/g, ".")), (t.iphone = !0)),
        r && ((t.osVersion = r[2].replace(/_/g, ".")), (t.ipad = !0)),
        n &&
          ((t.osVersion = n[3] ? n[3].replace(/_/g, ".") : null),
          (t.iphone = !0)),
        t.ios &&
          t.osVersion &&
          e.indexOf("Version/") >= 0 &&
          "10" === t.osVersion.split(".")[0] &&
          (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]),
        (t.desktop = !(t.os || t.android || t.webView)),
        (t.webView = (o || r || n) && e.match(/.*AppleWebKit(?!.*Safari)/i)),
        t.os && "ios" === t.os)
      ) {
        var l = t.osVersion.split("."),
          p = d.querySelector('meta[name="viewport"]');
        t.minimalUi =
          !t.webView &&
          (n || o) &&
          (1 * l[0] == 7 ? 1 * l[1] >= 1 : 1 * l[0] > 7) &&
          p &&
          p.getAttribute("content").indexOf("minimal-ui") >= 0;
      }
      return (t.pixelRatio = s.devicePixelRatio || 1), t;
    })(),
    T = function (t) {
      var a = this,
        i = a.touchEventsData,
        s = a.params,
        r = a.touches,
        n = t;
      if (
        (n.originalEvent && (n = n.originalEvent),
        (i.isTouchEvent = "touchstart" === n.type),
        (i.isTouchEvent || !("which" in n) || 3 !== n.which) &&
          (!i.isTouched || !i.isMoved))
      )
        if (s.noSwiping && e(n.target).closest("." + s.noSwipingClass)[0])
          a.allowClick = !0;
        else if (!s.swipeHandler || e(n).closest(s.swipeHandler)[0]) {
          (r.currentX =
            "touchstart" === n.type ? n.targetTouches[0].pageX : n.pageX),
            (r.currentY =
              "touchstart" === n.type ? n.targetTouches[0].pageY : n.pageY);
          var o = r.currentX,
            p = r.currentY;
          if (
            !(
              x.ios &&
              !x.cordova &&
              s.iOSEdgeSwipeDetection &&
              o <= s.iOSEdgeSwipeThreshold &&
              o >= window.screen.width - s.iOSEdgeSwipeThreshold
            )
          ) {
            if (
              (l.extend(i, {
                isTouched: !0,
                isMoved: !1,
                allowTouchCallbacks: !0,
                isScrolling: void 0,
                startMoving: void 0,
              }),
              (r.startX = o),
              (r.startY = p),
              (i.touchStartTime = l.now()),
              (a.allowClick = !0),
              a.updateSize(),
              (a.swipeDirection = void 0),
              s.threshold > 0 && (i.allowThresholdMove = !1),
              "touchstart" !== n.type)
            ) {
              var c = !0;
              e(n.target).is(i.formElements) && (c = !1),
                d.activeElement &&
                  e(d.activeElement).is(i.formElements) &&
                  d.activeElement.blur(),
                c && a.allowTouchMove && n.preventDefault();
            }
            a.emit("touchStart", n);
          }
        }
    },
    E = function (t) {
      var a = this,
        i = a.touchEventsData,
        s = a.params,
        r = a.touches,
        n = a.rtl,
        o = t;
      if (
        (o.originalEvent && (o = o.originalEvent),
        !i.isTouchEvent || "mousemove" !== o.type)
      ) {
        var p = "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX,
          c = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
        if (o.preventedByNestedSwiper)
          return (r.startX = p), void (r.startY = c);
        if (!a.allowTouchMove)
          return (
            (a.allowClick = !1),
            void (
              i.isTouched &&
              (l.extend(r, { startX: p, startY: c, currentX: p, currentY: c }),
              (i.touchStartTime = l.now()))
            )
          );
        if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
          if (a.isVertical()) {
            if (
              (r.currentY < r.startY && a.translate <= a.maxTranslate()) ||
              (r.currentY > r.startY && a.translate >= a.minTranslate())
            )
              return;
          } else if (
            (r.currentX < r.startX && a.translate <= a.maxTranslate()) ||
            (r.currentX > r.startX && a.translate >= a.minTranslate())
          )
            return;
        if (
          i.isTouchEvent &&
          d.activeElement &&
          o.target === d.activeElement &&
          e(o.target).is(i.formElements)
        )
          return (i.isMoved = !0), void (a.allowClick = !1);
        if (
          (i.allowTouchCallbacks && a.emit("touchMove", o),
          !(o.targetTouches && o.targetTouches.length > 1))
        ) {
          (r.currentX =
            "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX),
            (r.currentY =
              "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY);
          var u = r.currentX - r.startX,
            h = r.currentY - r.startY;
          if (void 0 === i.isScrolling) {
            var v;
            (a.isHorizontal() && r.currentY === r.startY) ||
            (a.isVertical() && r.currentX === r.startX)
              ? (i.isScrolling = !1)
              : u * u + h * h >= 25 &&
                ((v = (180 * Math.atan2(Math.abs(h), Math.abs(u))) / Math.PI),
                (i.isScrolling = a.isHorizontal()
                  ? v > s.touchAngle
                  : 90 - v > s.touchAngle));
          }
          if (
            (i.isScrolling && a.emit("touchMoveOpposite", o),
            "undefined" == typeof startMoving &&
              ((r.currentX === r.startX && r.currentY === r.startY) ||
                (i.startMoving = !0)),
            i.isTouched)
          )
            if (i.isScrolling) i.isTouched = !1;
            else if (i.startMoving) {
              (a.allowClick = !1),
                o.preventDefault(),
                s.touchMoveStopPropagation && !s.nested && o.stopPropagation(),
                i.isMoved ||
                  (s.loop && a.loopFix(),
                  (i.startTranslate = a.getTranslate()),
                  a.setTransition(0),
                  a.animating &&
                    a.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                  (i.allowMomentumBounce = !1),
                  !s.grabCursor ||
                    (!0 !== a.allowSlideNext && !0 !== a.allowSlidePrev) ||
                    a.setGrabCursor(!0),
                  a.emit("sliderFirstMove", o)),
                a.emit("sliderMove", o),
                (i.isMoved = !0);
              var f = a.isHorizontal() ? u : h;
              (r.diff = f),
                (f *= s.touchRatio),
                n && (f = -f),
                (a.swipeDirection = f > 0 ? "prev" : "next"),
                (i.currentTranslate = f + i.startTranslate);
              var m = !0,
                g = s.resistanceRatio;
              if (
                (s.touchReleaseOnEdges && (g = 0),
                f > 0 && i.currentTranslate > a.minTranslate()
                  ? ((m = !1),
                    s.resistance &&
                      (i.currentTranslate =
                        a.minTranslate() -
                        1 +
                        Math.pow(-a.minTranslate() + i.startTranslate + f, g)))
                  : f < 0 &&
                    i.currentTranslate < a.maxTranslate() &&
                    ((m = !1),
                    s.resistance &&
                      (i.currentTranslate =
                        a.maxTranslate() +
                        1 -
                        Math.pow(a.maxTranslate() - i.startTranslate - f, g))),
                m && (o.preventedByNestedSwiper = !0),
                !a.allowSlideNext &&
                  "next" === a.swipeDirection &&
                  i.currentTranslate < i.startTranslate &&
                  (i.currentTranslate = i.startTranslate),
                !a.allowSlidePrev &&
                  "prev" === a.swipeDirection &&
                  i.currentTranslate > i.startTranslate &&
                  (i.currentTranslate = i.startTranslate),
                s.threshold > 0)
              ) {
                if (!(Math.abs(f) > s.threshold || i.allowThresholdMove))
                  return void (i.currentTranslate = i.startTranslate);
                if (!i.allowThresholdMove)
                  return (
                    (i.allowThresholdMove = !0),
                    (r.startX = r.currentX),
                    (r.startY = r.currentY),
                    (i.currentTranslate = i.startTranslate),
                    void (r.diff = a.isHorizontal()
                      ? r.currentX - r.startX
                      : r.currentY - r.startY)
                  );
              }
              s.followFinger &&
                ((s.freeMode ||
                  s.watchSlidesProgress ||
                  s.watchSlidesVisibility) &&
                  (a.updateActiveIndex(), a.updateSlidesClasses()),
                s.freeMode &&
                  (0 === i.velocities.length &&
                    i.velocities.push({
                      position: r[a.isHorizontal() ? "startX" : "startY"],
                      time: i.touchStartTime,
                    }),
                  i.velocities.push({
                    position: r[a.isHorizontal() ? "currentX" : "currentY"],
                    time: l.now(),
                  })),
                a.updateProgress(i.currentTranslate),
                a.setTranslate(i.currentTranslate));
            }
        }
      }
    },
    S = function (e) {
      var t = this,
        a = t.touchEventsData,
        i = t.params,
        s = t.touches,
        r = t.rtl,
        n = t.$wrapperEl,
        o = t.slidesGrid,
        d = t.snapGrid,
        p = e;
      if (
        (p.originalEvent && (p = p.originalEvent),
        a.allowTouchCallbacks && t.emit("touchEnd", p),
        (a.allowTouchCallbacks = !1),
        a.isTouched)
      ) {
        i.grabCursor &&
          a.isMoved &&
          a.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        var c = l.now(),
          u = c - a.touchStartTime;
        if (
          (t.allowClick &&
            (t.updateClickedSlide(p),
            t.emit("tap", p),
            u < 300 &&
              c - a.lastClickTime > 300 &&
              (a.clickTimeout && clearTimeout(a.clickTimeout),
              (a.clickTimeout = l.nextTick(function () {
                t && !t.destroyed && t.emit("click", p);
              }, 300))),
            u < 300 &&
              c - a.lastClickTime < 300 &&
              (a.clickTimeout && clearTimeout(a.clickTimeout),
              t.emit("doubleTap", p))),
          (a.lastClickTime = l.now()),
          l.nextTick(function () {
            t.destroyed || (t.allowClick = !0);
          }),
          !a.isTouched ||
            !a.isMoved ||
            !t.swipeDirection ||
            0 === s.diff ||
            a.currentTranslate === a.startTranslate)
        )
          return (a.isTouched = !1), void (a.isMoved = !1);
        (a.isTouched = !1), (a.isMoved = !1);
        var h;
        if (
          ((h = i.followFinger
            ? r
              ? t.translate
              : -t.translate
            : -a.currentTranslate),
          i.freeMode)
        ) {
          if (h < -t.minTranslate()) return void t.slideTo(t.activeIndex);
          if (h > -t.maxTranslate())
            return void (t.slides.length < d.length
              ? t.slideTo(d.length - 1)
              : t.slideTo(t.slides.length - 1));
          if (i.freeModeMomentum) {
            if (a.velocities.length > 1) {
              var v = a.velocities.pop(),
                f = a.velocities.pop(),
                m = v.position - f.position,
                g = v.time - f.time;
              (t.velocity = m / g),
                (t.velocity /= 2),
                Math.abs(t.velocity) < i.freeModeMinimumVelocity &&
                  (t.velocity = 0),
                (g > 150 || l.now() - v.time > 300) && (t.velocity = 0);
            } else t.velocity = 0;
            (t.velocity *= i.freeModeMomentumVelocityRatio),
              (a.velocities.length = 0);
            var b = 1e3 * i.freeModeMomentumRatio,
              w = t.velocity * b,
              y = t.translate + w;
            r && (y = -y);
            var x,
              T = !1,
              E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
            if (y < t.maxTranslate())
              i.freeModeMomentumBounce
                ? (y + t.maxTranslate() < -E && (y = t.maxTranslate() - E),
                  (x = t.maxTranslate()),
                  (T = !0),
                  (a.allowMomentumBounce = !0))
                : (y = t.maxTranslate());
            else if (y > t.minTranslate())
              i.freeModeMomentumBounce
                ? (y - t.minTranslate() > E && (y = t.minTranslate() + E),
                  (x = t.minTranslate()),
                  (T = !0),
                  (a.allowMomentumBounce = !0))
                : (y = t.minTranslate());
            else if (i.freeModeSticky) {
              for (var S, C = 0; C < d.length; C += 1)
                if (d[C] > -y) {
                  S = C;
                  break;
                }
              y = -(y =
                Math.abs(d[S] - y) < Math.abs(d[S - 1] - y) ||
                "next" === t.swipeDirection
                  ? d[S]
                  : d[S - 1]);
            }
            if (0 !== t.velocity)
              b = r
                ? Math.abs((-y - t.translate) / t.velocity)
                : Math.abs((y - t.translate) / t.velocity);
            else if (i.freeModeSticky) return void t.slideReset();
            i.freeModeMomentumBounce && T
              ? (t.updateProgress(x),
                t.setTransition(b),
                t.setTranslate(y),
                t.transitionStart(),
                (t.animating = !0),
                n.transitionEnd(function () {
                  t &&
                    !t.destroyed &&
                    a.allowMomentumBounce &&
                    (t.emit("momentumBounce"),
                    t.setTransition(i.speed),
                    t.setTranslate(x),
                    n.transitionEnd(function () {
                      t && !t.destroyed && t.transitionEnd();
                    }));
                }))
              : t.velocity
              ? (t.updateProgress(y),
                t.setTransition(b),
                t.setTranslate(y),
                t.transitionStart(),
                t.animating ||
                  ((t.animating = !0),
                  n.transitionEnd(function () {
                    t && !t.destroyed && t.transitionEnd();
                  })))
              : t.updateProgress(y),
              t.updateActiveIndex(),
              t.updateSlidesClasses();
          }
          (!i.freeModeMomentum || u >= i.longSwipesMs) &&
            (t.updateProgress(),
            t.updateActiveIndex(),
            t.updateSlidesClasses());
        } else {
          for (
            var M = 0, z = t.slidesSizesGrid[0], P = 0;
            P < o.length;
            P += i.slidesPerGroup
          )
            void 0 !== o[P + i.slidesPerGroup]
              ? h >= o[P] &&
                h < o[P + i.slidesPerGroup] &&
                ((M = P), (z = o[P + i.slidesPerGroup] - o[P]))
              : h >= o[P] && ((M = P), (z = o[o.length - 1] - o[o.length - 2]));
          var k = (h - o[M]) / z;
          if (u > i.longSwipesMs) {
            if (!i.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection &&
              (k >= i.longSwipesRatio
                ? t.slideTo(M + i.slidesPerGroup)
                : t.slideTo(M)),
              "prev" === t.swipeDirection &&
                (k > 1 - i.longSwipesRatio
                  ? t.slideTo(M + i.slidesPerGroup)
                  : t.slideTo(M));
          } else {
            if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup),
              "prev" === t.swipeDirection && t.slideTo(M);
          }
        }
      }
    },
    C = function () {
      var e = this,
        t = e.params,
        a = e.el,
        i = e.allowSlideNext,
        s = e.allowSlidePrev;
      if (!a || 0 !== a.offsetWidth) {
        if (
          (t.breakpoints && e.setBreakpoint(),
          (e.allowSlideNext = !0),
          (e.allowSlidePrev = !0),
          e.updateSize(),
          e.updateSlides(),
          t.freeMode)
        ) {
          var r = Math.min(
            Math.max(e.translate, e.maxTranslate()),
            e.minTranslate()
          );
          e.setTranslate(r),
            e.updateActiveIndex(),
            e.updateSlidesClasses(),
            t.autoHeight && e.updateAutoHeight();
        } else
          e.updateSlidesClasses(),
            ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
            e.isEnd &&
            !e.params.centeredSlides
              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
              : e.slideTo(e.activeIndex, 0, !1, !0);
        (e.allowSlidePrev = s), (e.allowSlideNext = i);
      }
    },
    M = function (e) {
      var t = this;
      t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation()));
    },
    z = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      iOSEdgeSwipeDetection: !1,
      iOSEdgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: 0.02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
    },
    P = {
      update: h,
      translate: v,
      transition: f,
      slide: g,
      loop: b,
      grabCursor: w,
      manipulation: y,
      events: {
        attachEvents: function () {
          var e = this,
            t = e.params,
            a = e.touchEvents,
            i = e.el,
            s = e.wrapperEl;
          (e.onTouchStart = T.bind(e)),
            (e.onTouchMove = E.bind(e)),
            (e.onTouchEnd = S.bind(e)),
            (e.onClick = M.bind(e));
          var r = "container" === t.touchEventsTarget ? i : s,
            n = !!t.nested;
          if (m.ie)
            r.addEventListener(a.start, e.onTouchStart, !1),
              (p.touch ? r : d).addEventListener(a.move, e.onTouchMove, n),
              (p.touch ? r : d).addEventListener(a.end, e.onTouchEnd, !1);
          else {
            if (p.touch) {
              var o = !(
                "touchstart" !== a.start ||
                !p.passiveListener ||
                !t.passiveListeners
              ) && { passive: !0, capture: !1 };
              r.addEventListener(a.start, e.onTouchStart, o),
                r.addEventListener(
                  a.move,
                  e.onTouchMove,
                  p.passiveListener ? { passive: !1, capture: n } : n
                ),
                r.addEventListener(a.end, e.onTouchEnd, o);
            }
            ((t.simulateTouch && !x.ios && !x.android) ||
              (t.simulateTouch && !p.touch && x.ios)) &&
              (r.addEventListener("mousedown", e.onTouchStart, !1),
              d.addEventListener("mousemove", e.onTouchMove, n),
              d.addEventListener("mouseup", e.onTouchEnd, !1));
          }
          (t.preventClicks || t.preventClicksPropagation) &&
            r.addEventListener("click", e.onClick, !0),
            e.on("resize observerUpdate", C);
        },
        detachEvents: function () {
          var e = this,
            t = e.params,
            a = e.touchEvents,
            i = e.el,
            s = e.wrapperEl,
            r = "container" === t.touchEventsTarget ? i : s,
            n = !!t.nested;
          if (m.ie)
            r.removeEventListener(a.start, e.onTouchStart, !1),
              (p.touch ? r : d).removeEventListener(a.move, e.onTouchMove, n),
              (p.touch ? r : d).removeEventListener(a.end, e.onTouchEnd, !1);
          else {
            if (p.touch) {
              var o = !(
                "onTouchStart" !== a.start ||
                !p.passiveListener ||
                !t.passiveListeners
              ) && { passive: !0, capture: !1 };
              r.removeEventListener(a.start, e.onTouchStart, o),
                r.removeEventListener(a.move, e.onTouchMove, n),
                r.removeEventListener(a.end, e.onTouchEnd, o);
            }
            ((t.simulateTouch && !x.ios && !x.android) ||
              (t.simulateTouch && !p.touch && x.ios)) &&
              (r.removeEventListener("mousedown", e.onTouchStart, !1),
              d.removeEventListener("mousemove", e.onTouchMove, n),
              d.removeEventListener("mouseup", e.onTouchEnd, !1));
          }
          (t.preventClicks || t.preventClicksPropagation) &&
            r.removeEventListener("click", e.onClick, !0),
            e.off("resize observerUpdate", C);
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          var e = this,
            t = e.activeIndex,
            a = e.loopedSlides;
          void 0 === a && (a = 0);
          var i = e.params,
            s = i.breakpoints;
          if (s && (!s || 0 !== Object.keys(s).length)) {
            var r = e.getBreakpoint(s);
            if (r && e.currentBreakpoint !== r) {
              var n = r in s ? s[r] : e.originalParams,
                o = i.loop && n.slidesPerView !== i.slidesPerView;
              if (
                (l.extend(e.params, n),
                l.extend(e, {
                  allowTouchMove: e.params.allowTouchMove,
                  allowSlideNext: e.params.allowSlideNext,
                  allowSlidePrev: e.params.allowSlidePrev,
                }),
                (e.currentBreakpoint = r),
                o)
              ) {
                var d = t - a;
                e.loopDestroy(),
                  e.loopCreate(),
                  e.updateSlides(),
                  e.slideTo(d + a, 0, !1);
              }
              e.emit("breakpoint", n);
            }
          }
        },
        getBreakpoint: function (e) {
          if (e) {
            var t = !1,
              a = [];
            Object.keys(e).forEach(function (e) {
              a.push(e);
            }),
              a.sort(function (e, t) {
                return parseInt(e, 10) > parseInt(t, 10);
              });
            for (var i = 0; i < a.length; i += 1) {
              var r = a[i];
              r >= s.innerWidth && !t && (t = r);
            }
            return t || "max";
          }
        },
      },
      classes: {
        addClasses: function () {
          var e = this,
            t = e.classNames,
            a = e.params,
            i = e.rtl,
            r = e.$el,
            n = [];
          n.push(a.direction),
            a.freeMode && n.push("free-mode"),
            p.flexbox || n.push("no-flexbox"),
            a.autoHeight && n.push("autoheight"),
            i && n.push("rtl"),
            a.slidesPerColumn > 1 && n.push("multirow"),
            x.android && n.push("android"),
            x.ios && n.push("ios"),
            (s.navigator.pointerEnabled || s.navigator.msPointerEnabled) &&
              n.push("wp8-" + a.direction),
            n.forEach(function (e) {
              t.push(a.containerModifierClass + e);
            }),
            r.addClass(t.join(" "));
        },
        removeClasses: function () {
          var e = this,
            t = e.$el,
            a = e.classNames;
          t.removeClass(a.join(" "));
        },
      },
      images: {
        loadImage: function (e, t, a, i, r, n) {
          function o() {
            n && n();
          }
          var l;
          e.complete && r
            ? o()
            : t
            ? (((l = new s.Image()).onload = o),
              (l.onerror = o),
              i && (l.sizes = i),
              a && (l.srcset = a),
              t && (l.src = t))
            : o();
        },
        preloadImages: function () {
          var e = this;
          e.imagesToLoad = e.$el.find("img");
          for (var t = 0; t < e.imagesToLoad.length; t += 1) {
            var a = e.imagesToLoad[t];
            e.loadImage(
              a,
              a.currentSrc || a.getAttribute("src"),
              a.srcset || a.getAttribute("srcset"),
              a.sizes || a.getAttribute("sizes"),
              !0,
              function () {
                void 0 !== e &&
                  null !== e &&
                  e &&
                  !e.destroyed &&
                  (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                  e.imagesLoaded === e.imagesToLoad.length &&
                    (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")));
              }
            );
          }
        },
      },
    },
    k = {},
    $ = (function (t) {
      function a() {
        for (var i = [], r = arguments.length; r--; ) i[r] = arguments[r];
        var n, o;
        if (1 === i.length && i[0].constructor && i[0].constructor === Object)
          o = i[0];
        else {
          var d;
          (n = (d = i)[0]), (o = d[1]);
        }
        o || (o = {}),
          (o = l.extend({}, o)),
          n && !o.el && (o.el = n),
          t.call(this, o),
          Object.keys(P).forEach(function (e) {
            Object.keys(P[e]).forEach(function (t) {
              a.prototype[t] || (a.prototype[t] = P[e][t]);
            });
          });
        var c = this;
        Object.keys(c.modules).forEach(function (e) {
          var t = c.modules[e];
          if (t.params) {
            var a = Object.keys(t.params)[0],
              i = t.params[a];
            if ("object" != typeof i) return;
            if (!(a in o && "enabled" in i)) return;
            !0 === o[a] && (o[a] = { enabled: !0 }),
              "object" != typeof o[a] ||
                "enabled" in o[a] ||
                (o[a].enabled = !0),
              o[a] || (o[a] = { enabled: !1 });
          }
        });
        var u = l.extend({}, z);
        c.useModulesParams(u),
          (c.params = l.extend({}, u, k, o)),
          (c.originalParams = l.extend({}, c.params)),
          (c.passedParams = l.extend({}, o));
        var h = e(c.params.el);
        if ((n = h[0])) {
          if (h.length > 1) {
            var v = [];
            return (
              h.each(function (e, t) {
                var i = l.extend({}, o, { el: t });
                v.push(new a(i));
              }),
              v
            );
          }
          (n.swiper = c), h.data("swiper", c);
          var f = h.children("." + c.params.wrapperClass);
          return (
            l.extend(c, {
              $el: h,
              el: n,
              $wrapperEl: f,
              wrapperEl: f[0],
              classNames: [],
              slides: e(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: function () {
                return "horizontal" === c.params.direction;
              },
              isVertical: function () {
                return "vertical" === c.params.direction;
              },
              rtl:
                "horizontal" === c.params.direction &&
                ("rtl" === n.dir.toLowerCase() || "rtl" === h.css("direction")),
              wrongRTL: "-webkit-box" === f.css("display"),
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: c.params.allowSlideNext,
              allowSlidePrev: c.params.allowSlidePrev,
              touchEvents: (function () {
                var e = ["touchstart", "touchmove", "touchend"],
                  t = ["mousedown", "mousemove", "mouseup"];
                return (
                  s.navigator.pointerEnabled
                    ? (t = ["pointerdown", "pointermove", "pointerup"])
                    : s.navigator.msPointerEnabled &&
                      (t = ["MSPointerDown", "MsPointerMove", "MsPointerUp"]),
                  {
                    start: p.touch || !c.params.simulateTouch ? e[0] : t[0],
                    move: p.touch || !c.params.simulateTouch ? e[1] : t[1],
                    end: p.touch || !c.params.simulateTouch ? e[2] : t[2],
                  }
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                formElements: "input, select, option, textarea, button, video",
                lastClickTime: l.now(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: c.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            c.useModules(),
            c.params.init && c.init(),
            c
          );
        }
      }
      t && (a.__proto__ = t),
        (a.prototype = Object.create(t && t.prototype)),
        (a.prototype.constructor = a);
      var i = { extendedDefaults: {}, defaults: {}, Class: {}, $: {} };
      return (
        (a.prototype.slidesPerViewDynamic = function () {
          var e = this,
            t = e.params,
            a = e.slides,
            i = e.slidesGrid,
            s = e.size,
            r = e.activeIndex,
            n = 1;
          if (t.centeredSlides) {
            for (
              var o, l = a[r].swiperSlideSize, d = r + 1;
              d < a.length;
              d += 1
            )
              a[d] &&
                !o &&
                ((n += 1), (l += a[d].swiperSlideSize) > s && (o = !0));
            for (var p = r - 1; p >= 0; p -= 1)
              a[p] &&
                !o &&
                ((n += 1), (l += a[p].swiperSlideSize) > s && (o = !0));
          } else
            for (var c = r + 1; c < a.length; c += 1)
              i[c] - i[r] < s && (n += 1);
          return n;
        }),
        (a.prototype.update = function () {
          function e() {
            (a = Math.min(
              Math.max(t.translate, t.maxTranslate()),
              t.minTranslate()
            )),
              t.setTranslate(a),
              t.updateActiveIndex(),
              t.updateSlidesClasses();
          }
          var t = this;
          if (t && !t.destroyed) {
            t.updateSize(),
              t.updateSlides(),
              t.updateProgress(),
              t.updateSlidesClasses();
            var a;
            t.params.freeMode
              ? (e(), t.params.autoHeight && t.updateAutoHeight())
              : (("auto" === t.params.slidesPerView ||
                  t.params.slidesPerView > 1) &&
                t.isEnd &&
                !t.params.centeredSlides
                  ? t.slideTo(t.slides.length - 1, 0, !1, !0)
                  : t.slideTo(t.activeIndex, 0, !1, !0)) || e(),
              t.emit("update");
          }
        }),
        (a.prototype.init = function () {
          var e = this;
          e.initialized ||
            (e.emit("beforeInit"),
            e.params.breakpoints && e.setBreakpoint(),
            e.addClasses(),
            e.params.loop && e.loopCreate(),
            e.updateSize(),
            e.updateSlides(),
            e.params.grabCursor && e.setGrabCursor(),
            e.params.preloadImages && e.preloadImages(),
            e.params.loop
              ? e.slideTo(
                  e.params.initialSlide + e.loopedSlides,
                  0,
                  e.params.runCallbacksOnInit
                )
              : e.slideTo(
                  e.params.initialSlide,
                  0,
                  e.params.runCallbacksOnInit
                ),
            e.attachEvents(),
            (e.initialized = !0),
            e.emit("init"));
        }),
        (a.prototype.destroy = function (e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          var a = this,
            i = a.params,
            s = a.$el,
            r = a.$wrapperEl,
            n = a.slides;
          a.emit("beforeDestroy"),
            (a.initialized = !1),
            a.detachEvents(),
            i.loop && a.loopDestroy(),
            t &&
              (a.removeClasses(),
              s.removeAttr("style"),
              r.removeAttr("style"),
              n &&
                n.length &&
                n
                  .removeClass(
                    [
                      i.slideVisibleClass,
                      i.slideActiveClass,
                      i.slideNextClass,
                      i.slidePrevClass,
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-slide-index")
                  .removeAttr("data-swiper-column")
                  .removeAttr("data-swiper-row")),
            a.emit("destroy"),
            Object.keys(a.eventsListeners).forEach(function (e) {
              a.off(e);
            }),
            !1 !== e &&
              ((a.$el[0].swiper = null),
              a.$el.data("swiper", null),
              l.deleteProps(a)),
            (a.destroyed = !0);
        }),
        (a.extendDefaults = function (e) {
          l.extend(k, e);
        }),
        (i.extendedDefaults.get = function () {
          return k;
        }),
        (i.defaults.get = function () {
          return z;
        }),
        (i.Class.get = function () {
          return t;
        }),
        (i.$.get = function () {
          return e;
        }),
        Object.defineProperties(a, i),
        a
      );
    })(c),
    I = { name: "device", proto: { device: x }, static: { device: x } },
    L = { name: "support", proto: { support: p }, static: { support: p } },
    D = { name: "browser", proto: { browser: m }, static: { browser: m } },
    O = {
      name: "resize",
      create: function () {
        var e = this;
        l.extend(e, {
          resize: {
            resizeHandler: function () {
              e &&
                !e.destroyed &&
                e.initialized &&
                (e.emit("beforeResize"), e.emit("resize"));
            },
            orientationChangeHandler: function () {
              e && !e.destroyed && e.initialized && e.emit("orientationchange");
            },
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          s.addEventListener("resize", e.resize.resizeHandler),
            s.addEventListener(
              "orientationchange",
              e.resize.orientationChangeHandler
            );
        },
        destroy: function () {
          var e = this;
          s.removeEventListener("resize", e.resize.resizeHandler),
            s.removeEventListener(
              "orientationchange",
              e.resize.orientationChangeHandler
            );
        },
      },
    },
    A = {
      func: s.MutationObserver || s.WebkitMutationObserver,
      attach: function (e, t) {
        void 0 === t && (t = {});
        var a = this,
          i = new (0, A.func)(function (e) {
            e.forEach(function (e) {
              a.emit("observerUpdate", e);
            });
          });
        i.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData,
        }),
          a.observer.observers.push(i);
      },
      init: function () {
        var e = this;
        if (p.observer && e.params.observer) {
          if (e.params.observeParents)
            for (var t = e.$el.parents(), a = 0; a < t.length; a += 1)
              e.observer.attach(t[a]);
          e.observer.attach(e.$el[0], { childList: !1 }),
            e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
        }
      },
      destroy: function () {
        var e = this;
        e.observer.observers.forEach(function (e) {
          e.disconnect();
        }),
          (e.observer.observers = []);
      },
    },
    H = {
      name: "observer",
      params: { observer: !1, observeParents: !1 },
      create: function () {
        var e = this;
        l.extend(e, {
          observer: {
            init: A.init.bind(e),
            attach: A.attach.bind(e),
            destroy: A.destroy.bind(e),
            observers: [],
          },
        });
      },
      on: {
        init: function () {
          this.observer.init();
        },
        destroy: function () {
          this.observer.destroy();
        },
      },
    },
    X = {
      update: function (e) {
        function t() {
          a.updateSlides(),
            a.updateProgress(),
            a.updateSlidesClasses(),
            a.lazy && a.params.lazy.enabled && a.lazy.load();
        }
        var a = this,
          i = a.params,
          s = i.slidesPerView,
          r = i.slidesPerGroup,
          n = i.centeredSlides,
          o = a.virtual,
          d = o.from,
          p = o.to,
          c = o.slides,
          u = o.slidesGrid,
          h = o.renderSlide,
          v = o.offset;
        a.updateActiveIndex();
        var f,
          m = a.activeIndex || 0;
        f =
          a.rtl && a.isHorizontal()
            ? "right"
            : a.isHorizontal()
            ? "left"
            : "top";
        var g, b;
        n
          ? ((g = Math.floor(s / 2) + r), (b = Math.floor(s / 2) + r))
          : ((g = s + (r - 1)), (b = r));
        var w = Math.max((m || 0) - b, 0),
          y = Math.min((m || 0) + g, c.length - 1),
          x = (a.slidesGrid[w] || 0) - (a.slidesGrid[0] || 0);
        if (
          (l.extend(a.virtual, {
            from: w,
            to: y,
            offset: x,
            slidesGrid: a.slidesGrid,
          }),
          d === w && p === y && !e)
        )
          return (
            a.slidesGrid !== u && x !== v && a.slides.css(f, x + "px"),
            void a.updateProgress()
          );
        if (a.params.virtual.renderExternal)
          return (
            a.params.virtual.renderExternal.call(a, {
              offset: x,
              from: w,
              to: y,
              slides: (function () {
                for (var e = [], t = w; t <= y; t += 1) e.push(c[t]);
                return e;
              })(),
            }),
            void t()
          );
        var T = [],
          E = [];
        if (e) a.$wrapperEl.find("." + a.params.slideClass).remove();
        else
          for (var S = d; S <= p; S += 1)
            (S < w || S > y) &&
              a.$wrapperEl
                .find(
                  "." +
                    a.params.slideClass +
                    '[data-swiper-slide-index="' +
                    S +
                    '"]'
                )
                .remove();
        for (var C = 0; C < c.length; C += 1)
          C >= w &&
            C <= y &&
            (void 0 === p || e
              ? E.push(C)
              : (C > p && E.push(C), C < d && T.push(C)));
        E.forEach(function (e) {
          a.$wrapperEl.append(h(c[e], e));
        }),
          T.sort(function (e, t) {
            return e < t;
          }).forEach(function (e) {
            a.$wrapperEl.prepend(h(c[e], e));
          }),
          a.$wrapperEl.children(".swiper-slide").css(f, x + "px"),
          t();
      },
      renderSlide: function (t, a) {
        var i = this,
          s = i.params.virtual;
        if (s.cache && i.virtual.cache[a]) return i.virtual.cache[a];
        var r = e(
          s.renderSlide
            ? s.renderSlide.call(i, t, a)
            : '<div class="' +
                i.params.slideClass +
                '" data-swiper-slide-index="' +
                a +
                '">' +
                t +
                "</div>"
        );
        return (
          r.attr("data-swiper-slide-index") ||
            r.attr("data-swiper-slide-index", a),
          s.cache && (i.virtual.cache[a] = r),
          r
        );
      },
      appendSlide: function (e) {
        var t = this;
        t.virtual.slides.push(e), t.virtual.update(!0);
      },
      prependSlide: function (e) {
        var t = this;
        if ((t.virtual.slides.unshift(e), t.params.virtual.cache)) {
          var a = t.virtual.cache,
            i = {};
          Object.keys(a).forEach(function (e) {
            i[e + 1] = a[e];
          }),
            (t.virtual.cache = i);
        }
        t.virtual.update(!0), t.slideNext(0);
      },
    },
    N = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          virtual: {
            update: X.update.bind(e),
            appendSlide: X.appendSlide.bind(e),
            prependSlide: X.prependSlide.bind(e),
            renderSlide: X.renderSlide.bind(e),
            slides: e.params.virtual.slides,
            cache: {},
          },
        });
      },
      on: {
        beforeInit: function () {
          var e = this;
          if (e.params.virtual.enabled) {
            e.classNames.push(e.params.containerModifierClass + "virtual");
            var t = { watchSlidesProgress: !0 };
            l.extend(e.params, t),
              l.extend(e.originalParams, t),
              e.virtual.update();
          }
        },
        setTranslate: function () {
          var e = this;
          e.params.virtual.enabled && e.virtual.update();
        },
      },
    },
    Y = {
      handle: function (e) {
        var t = this,
          a = e;
        a.originalEvent && (a = a.originalEvent);
        var i = a.keyCode || a.charCode;
        if (
          !t.allowSlideNext &&
          ((t.isHorizontal() && 39 === i) || (t.isVertical() && 40 === i))
        )
          return !1;
        if (
          !t.allowSlidePrev &&
          ((t.isHorizontal() && 37 === i) || (t.isVertical() && 38 === i))
        )
          return !1;
        if (
          !(
            a.shiftKey ||
            a.altKey ||
            a.ctrlKey ||
            a.metaKey ||
            (d.activeElement &&
              d.activeElement.nodeName &&
              ("input" === d.activeElement.nodeName.toLowerCase() ||
                "textarea" === d.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (37 === i || 39 === i || 38 === i || 40 === i) {
            var r = !1;
            if (
              t.$el.parents("." + t.params.slideClass).length > 0 &&
              0 === t.$el.parents("." + t.params.slideActiveClass).length
            )
              return;
            var n = { left: s.pageXOffset, top: s.pageYOffset },
              o = s.innerWidth,
              l = s.innerHeight,
              p = t.$el.offset();
            t.rtl && (p.left -= t.$el[0].scrollLeft);
            for (
              var c = [
                  [p.left, p.top],
                  [p.left + t.width, p.top],
                  [p.left, p.top + t.height],
                  [p.left + t.width, p.top + t.height],
                ],
                u = 0;
              u < c.length;
              u += 1
            ) {
              var h = c[u];
              h[0] >= n.left &&
                h[0] <= n.left + o &&
                h[1] >= n.top &&
                h[1] <= n.top + l &&
                (r = !0);
            }
            if (!r) return;
          }
          t.isHorizontal()
            ? ((37 !== i && 39 !== i) ||
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              ((39 === i && !t.rtl) || (37 === i && t.rtl)) && t.slideNext(),
              ((37 === i && !t.rtl) || (39 === i && t.rtl)) && t.slidePrev())
            : ((38 !== i && 40 !== i) ||
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              40 === i && t.slideNext(),
              38 === i && t.slidePrev()),
            t.emit("keyPress", i);
        }
      },
      enable: function () {
        var t = this;
        t.keyboard.enabled ||
          (e(d).on("keydown", t.keyboard.handle), (t.keyboard.enabled = !0));
      },
      disable: function () {
        var t = this;
        t.keyboard.enabled &&
          (e(d).off("keydown", t.keyboard.handle), (t.keyboard.enabled = !1));
      },
    },
    G = {
      name: "keyboard",
      params: { keyboard: { enabled: !1 } },
      create: function () {
        var e = this;
        l.extend(e, {
          keyboard: {
            enabled: !1,
            enable: Y.enable.bind(e),
            disable: Y.disable.bind(e),
            handle: Y.handle.bind(e),
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          e.params.keyboard.enabled && e.keyboard.enable();
        },
        destroy: function () {
          var e = this;
          e.keyboard.enabled && e.keyboard.disable();
        },
      },
    },
    B = {
      lastScrollTime: l.now(),
      event:
        s.navigator.userAgent.indexOf("firefox") > -1
          ? "DOMMouseScroll"
          : a()
          ? "wheel"
          : "mousewheel",
      normalize: function (e) {
        var t = 0,
          a = 0,
          i = 0,
          s = 0;
        return (
          "detail" in e && (a = e.detail),
          "wheelDelta" in e && (a = -e.wheelDelta / 120),
          "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120),
          "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
          "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = a), (a = 0)),
          (i = 10 * t),
          (s = 10 * a),
          "deltaY" in e && (s = e.deltaY),
          "deltaX" in e && (i = e.deltaX),
          (i || s) &&
            e.deltaMode &&
            (1 === e.deltaMode
              ? ((i *= 40), (s *= 40))
              : ((i *= 800), (s *= 800))),
          i && !t && (t = i < 1 ? -1 : 1),
          s && !a && (a = s < 1 ? -1 : 1),
          { spinX: t, spinY: a, pixelX: i, pixelY: s }
        );
      },
      handle: function (e) {
        var t = e,
          a = this,
          i = a.params.mousewheel;
        t.originalEvent && (t = t.originalEvent);
        var r = 0,
          n = a.rtl ? -1 : 1,
          o = B.normalize(t);
        if (i.forceToAxis)
          if (a.isHorizontal()) {
            if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
            r = o.pixelX * n;
          } else {
            if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
            r = o.pixelY;
          }
        else
          r =
            Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
        if (0 === r) return !0;
        if ((i.invert && (r = -r), a.params.freeMode)) {
          var d = a.getTranslate() + r * i.sensitivity,
            p = a.isBeginning,
            c = a.isEnd;
          if (
            (d >= a.minTranslate() && (d = a.minTranslate()),
            d <= a.maxTranslate() && (d = a.maxTranslate()),
            a.setTransition(0),
            a.setTranslate(d),
            a.updateProgress(),
            a.updateActiveIndex(),
            a.updateSlidesClasses(),
            ((!p && a.isBeginning) || (!c && a.isEnd)) &&
              a.updateSlidesClasses(),
            a.params.freeModeSticky &&
              (clearTimeout(a.mousewheel.timeout),
              (a.mousewheel.timeout = l.nextTick(function () {
                a.slideReset();
              }, 300))),
            a.emit("scroll", t),
            a.params.autoplay &&
              a.params.autoplayDisableOnInteraction &&
              a.stopAutoplay(),
            0 === d || d === a.maxTranslate())
          )
            return !0;
        } else {
          if (l.now() - a.mousewheel.lastScrollTime > 60)
            if (r < 0)
              if ((a.isEnd && !a.params.loop) || a.animating) {
                if (i.releaseOnEdges) return !0;
              } else a.slideNext(), a.emit("scroll", t);
            else if ((a.isBeginning && !a.params.loop) || a.animating) {
              if (i.releaseOnEdges) return !0;
            } else a.slidePrev(), a.emit("scroll", t);
          a.mousewheel.lastScrollTime = new s.Date().getTime();
        }
        return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1;
      },
      enable: function () {
        var t = this;
        if (!B.event) return !1;
        if (t.mousewheel.enabled) return !1;
        var a = t.$el;
        return (
          "container" !== t.params.mousewheel.eventsTarged &&
            (a = e(t.params.mousewheel.eventsTarged)),
          a.on(B.event, t.mousewheel.handle),
          (t.mousewheel.enabled = !0),
          !0
        );
      },
      disable: function () {
        var t = this;
        if (!B.event) return !1;
        if (!t.mousewheel.enabled) return !1;
        var a = t.$el;
        return (
          "container" !== t.params.mousewheel.eventsTarged &&
            (a = e(t.params.mousewheel.eventsTarged)),
          a.off(B.event, t.mousewheel.handle),
          (t.mousewheel.enabled = !1),
          !0
        );
      },
    },
    V = {
      name: "mousewheel",
      params: {
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarged: "container",
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          mousewheel: {
            enabled: !1,
            enable: B.enable.bind(e),
            disable: B.disable.bind(e),
            handle: B.handle.bind(e),
            lastScrollTime: l.now(),
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          e.params.mousewheel.enabled && e.mousewheel.enable();
        },
        destroy: function () {
          var e = this;
          e.mousewheel.enabled && e.mousewheel.disable();
        },
      },
    },
    R = {
      update: function () {
        var e = this,
          t = e.params.navigation;
        if (!e.params.loop) {
          var a = e.navigation,
            i = a.$nextEl,
            s = a.$prevEl;
          s &&
            s.length > 0 &&
            (e.isBeginning
              ? s.addClass(t.disabledClass)
              : s.removeClass(t.disabledClass)),
            i &&
              i.length > 0 &&
              (e.isEnd
                ? i.addClass(t.disabledClass)
                : i.removeClass(t.disabledClass));
        }
      },
      init: function () {
        var t = this,
          a = t.params.navigation;
        if (a.nextEl || a.prevEl) {
          var i, s;
          a.nextEl &&
            ((i = e(a.nextEl)),
            t.params.uniqueNavElements &&
              "string" == typeof a.nextEl &&
              i.length > 1 &&
              1 === t.$el.find(a.nextEl).length &&
              (i = t.$el.find(a.nextEl))),
            a.prevEl &&
              ((s = e(a.prevEl)),
              t.params.uniqueNavElements &&
                "string" == typeof a.prevEl &&
                s.length > 1 &&
                1 === t.$el.find(a.prevEl).length &&
                (s = t.$el.find(a.prevEl))),
            i &&
              i.length > 0 &&
              i.on("click", function (e) {
                e.preventDefault(),
                  (t.isEnd && !t.params.loop) || t.slideNext();
              }),
            s &&
              s.length > 0 &&
              s.on("click", function (e) {
                e.preventDefault(),
                  (t.isBeginning && !t.params.loop) || t.slidePrev();
              }),
            l.extend(t.navigation, {
              $nextEl: i,
              nextEl: i && i[0],
              $prevEl: s,
              prevEl: s && s[0],
            });
        }
      },
      destroy: function () {
        var e = this,
          t = e.navigation,
          a = t.$nextEl,
          i = t.$prevEl;
        a &&
          a.length &&
          (a.off("click"), a.removeClass(e.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click"), i.removeClass(e.params.navigation.disabledClass));
      },
    },
    W = {
      name: "navigation",
      params: {
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          navigation: {
            init: R.init.bind(e),
            update: R.update.bind(e),
            destroy: R.destroy.bind(e),
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          e.navigation.init(), e.navigation.update();
        },
        toEdge: function () {
          this.navigation.update();
        },
        fromEdge: function () {
          this.navigation.update();
        },
        destroy: function () {
          this.navigation.destroy();
        },
        click: function (t) {
          var a = this,
            i = a.navigation,
            s = i.$nextEl,
            r = i.$prevEl;
          !a.params.navigation.hideOnClick ||
            e(t.target).is(r) ||
            e(t.target).is(s) ||
            (s && s.toggleClass(a.params.navigation.hiddenClass),
            r && r.toggleClass(a.params.navigation.hiddenClass));
        },
      },
    },
    F = {
      update: function () {
        var t = this,
          a = t.rtl,
          i = t.params.pagination;
        if (
          i.el &&
          t.pagination.el &&
          t.pagination.$el &&
          0 !== t.pagination.$el.length
        ) {
          var s,
            r =
              t.virtual && t.params.virtual.enabled
                ? t.virtual.slides.length
                : t.slides.length,
            n = t.pagination.$el,
            o = t.params.loop
              ? Math.ceil((r - 2 * t.loopedSlides) / t.params.slidesPerGroup)
              : t.snapGrid.length;
          if (
            (t.params.loop
              ? ((s = Math.ceil(
                  (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
                )) >
                  r - 1 - 2 * t.loopedSlides && (s -= r - 2 * t.loopedSlides),
                s > o - 1 && (s -= o),
                s < 0 && "bullets" !== t.params.paginationType && (s = o + s))
              : (s = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
            "bullets" === i.type &&
              t.pagination.bullets &&
              t.pagination.bullets.length > 0)
          ) {
            var l = t.pagination.bullets;
            if (
              (i.dynamicBullets &&
                ((t.pagination.bulletSize = l
                  .eq(0)
                  [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                n.css(
                  t.isHorizontal() ? "width" : "height",
                  5 * t.pagination.bulletSize + "px"
                )),
              l.removeClass(
                i.bulletActiveClass +
                  " " +
                  i.bulletActiveClass +
                  "-next " +
                  i.bulletActiveClass +
                  "-next-next " +
                  i.bulletActiveClass +
                  "-prev " +
                  i.bulletActiveClass +
                  "-prev-prev"
              ),
              n.length > 1)
            )
              l.each(function (t, a) {
                var r = e(a);
                r.index() === s &&
                  (r.addClass(i.bulletActiveClass),
                  i.dynamicBullets &&
                    (r
                      .prev()
                      .addClass(i.bulletActiveClass + "-prev")
                      .prev()
                      .addClass(i.bulletActiveClass + "-prev-prev"),
                    r
                      .next()
                      .addClass(i.bulletActiveClass + "-next")
                      .next()
                      .addClass(i.bulletActiveClass + "-next-next")));
              });
            else {
              var d = l.eq(s);
              d.addClass(i.bulletActiveClass),
                i.dynamicBullets &&
                  (d
                    .prev()
                    .addClass(i.bulletActiveClass + "-prev")
                    .prev()
                    .addClass(i.bulletActiveClass + "-prev-prev"),
                  d
                    .next()
                    .addClass(i.bulletActiveClass + "-next")
                    .next()
                    .addClass(i.bulletActiveClass + "-next-next"));
            }
            if (i.dynamicBullets) {
              var p = Math.min(l.length, 5),
                c =
                  (t.pagination.bulletSize * p - t.pagination.bulletSize) / 2 -
                  s * t.pagination.bulletSize,
                u = a ? "botto," : "top";
              l.css(t.isHorizontal() ? u : "top", c + "px");
            }
          }
          if (
            ("fraction" === i.type &&
              (n.find("." + i.currentClass).text(s + 1),
              n.find("." + i.totalClass).text(o)),
            "progressbar" === i.type)
          ) {
            var h = (s + 1) / o,
              v = h,
              f = 1;
            t.isHorizontal() || ((f = h), (v = 1)),
              n
                .find("." + i.progressbarFillClass)
                .transform(
                  "translate3d(0,0,0) scaleX(" + v + ") scaleY(" + f + ")"
                )
                .transition(t.params.speed);
          }
          "custom" === i.type && i.renderCustom
            ? (n.html(i.renderCustom(t, s + 1, o)),
              t.emit("paginationRender", t, n[0]))
            : t.emit("paginationUpdate", t, n[0]);
        }
      },
      render: function () {
        var e = this,
          t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var a =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            i = e.pagination.$el,
            s = "";
          if ("bullets" === t.type) {
            for (
              var r = e.params.loop
                  ? Math.ceil(
                      (a - 2 * e.loopedSlides) / e.params.slidesPerGroup
                    )
                  : e.snapGrid.length,
                n = 0;
              n < r;
              n += 1
            )
              t.renderBullet
                ? (s += t.renderBullet.call(e, n, t.bulletClass))
                : (s +=
                    "<" +
                    t.bulletElement +
                    ' class="' +
                    t.bulletClass +
                    '"></' +
                    t.bulletElement +
                    ">");
            i.html(s), (e.pagination.bullets = i.find("." + t.bulletClass));
          }
          "fraction" === t.type &&
            ((s = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : '<span class="' +
                t.currentClass +
                '"></span> / <span class="' +
                t.totalClass +
                '"></span>'),
            i.html(s)),
            "progressbar" === t.type &&
              ((s = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : '<span class="' + t.progressbarFillClass + '"></span>'),
              i.html(s)),
            "custom" !== t.type &&
              e.emit("paginationRender", e.pagination.$el[0]);
        }
      },
      init: function () {
        var t = this,
          a = t.params.pagination;
        if (a.el) {
          var i = e(a.el);
          0 !== i.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof a.el &&
              i.length > 1 &&
              1 === t.$el.find(a.el).length &&
              (i = t.$el.find(a.el)),
            "bullets" === a.type && a.clickable && i.addClass(a.clickableClass),
            i.addClass(a.modifierClass + a.type),
            "bullets" === a.type &&
              a.dynamicBullets &&
              i.addClass("" + a.modifierClass + a.type + "-dynamic"),
            a.clickable &&
              i.on("click", "." + a.bulletClass, function (a) {
                a.preventDefault();
                var i = e(this).index() * t.params.slidesPerGroup;
                t.params.loop && (i += t.loopedSlides), t.slideTo(i);
              }),
            l.extend(t.pagination, { $el: i, el: i[0] }));
        }
      },
      destroy: function () {
        var e = this,
          t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var a = e.pagination.$el;
          a.removeClass(t.hiddenClass),
            a.removeClass(t.modifierClass + t.type),
            e.pagination.bullets &&
              e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && a.off("click", "." + t.bulletClass);
        }
      },
    },
    j = {
      name: "pagination",
      params: {
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          type: "bullets",
          dynamicBullets: !1,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          modifierClass: "swiper-pagination-",
          currentClass: "swiper-pagination-current",
          totalClass: "swiper-pagination-total",
          hiddenClass: "swiper-pagination-hidden",
          progressbarFillClass: "swiper-pagination-progressbar-fill",
          clickableClass: "swiper-pagination-clickable",
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          pagination: {
            init: F.init.bind(e),
            render: F.render.bind(e),
            update: F.update.bind(e),
            destroy: F.destroy.bind(e),
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          e.pagination.init(), e.pagination.render(), e.pagination.update();
        },
        activeIndexChange: function () {
          var e = this;
          e.params.loop
            ? e.pagination.update()
            : void 0 === e.snapIndex && e.pagination.update();
        },
        snapIndexChange: function () {
          var e = this;
          e.params.loop || e.pagination.update();
        },
        slidesLengthChange: function () {
          var e = this;
          e.params.loop && (e.pagination.render(), e.pagination.update());
        },
        snapGridLengthChange: function () {
          var e = this;
          e.params.loop || (e.pagination.render(), e.pagination.update());
        },
        destroy: function () {
          this.pagination.destroy();
        },
        click: function (t) {
          var a = this;
          a.params.pagination.el &&
            a.params.pagination.hideOnClick &&
            a.pagination.$el.length > 0 &&
            !e(t.target).hasClass(a.params.pagination.bulletClass) &&
            a.pagination.$el.toggleClass(a.params.pagination.hiddenClass);
        },
      },
    },
    q = {
      setTranslate: function () {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            a = e.rtl,
            i = e.progress,
            s = t.dragSize,
            r = t.trackSize,
            n = t.$dragEl,
            o = t.$el,
            l = e.params.scrollbar,
            d = s,
            c = (r - s) * i;
          a && e.isHorizontal()
            ? (c = -c) > 0
              ? ((d = s - c), (c = 0))
              : -c + s > r && (d = r + c)
            : c < 0
            ? ((d = s + c), (c = 0))
            : c + s > r && (d = r - c),
            e.isHorizontal()
              ? (p.transforms3d
                  ? n.transform("translate3d(" + c + "px, 0, 0)")
                  : n.transform("translateX(" + c + "px)"),
                (n[0].style.width = d + "px"))
              : (p.transforms3d
                  ? n.transform("translate3d(0px, " + c + "px, 0)")
                  : n.transform("translateY(" + c + "px)"),
                (n[0].style.height = d + "px")),
            l.hide &&
              (clearTimeout(e.scrollbar.timeout),
              (o[0].style.opacity = 1),
              (e.scrollbar.timeout = setTimeout(function () {
                (o[0].style.opacity = 0), o.transition(400);
              }, 1e3)));
        }
      },
      setTransition: function (e) {
        var t = this;
        t.params.scrollbar.el &&
          t.scrollbar.el &&
          t.scrollbar.$dragEl.transition(e);
      },
      updateSize: function () {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            a = t.$dragEl,
            i = t.$el;
          (a[0].style.width = ""), (a[0].style.height = "");
          var s,
            r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            n = e.size / e.virtualSize,
            o = n * (r / e.size);
          (s =
            "auto" === e.params.scrollbar.dragSize
              ? r * n
              : parseInt(e.params.scrollbar.dragSize, 10)),
            e.isHorizontal()
              ? (a[0].style.width = s + "px")
              : (a[0].style.height = s + "px"),
            (i[0].style.display = n >= 1 ? "none" : ""),
            e.params.scrollbarHide && (i[0].style.opacity = 0),
            l.extend(t, {
              trackSize: r,
              divider: n,
              moveDivider: o,
              dragSize: s,
            });
        }
      },
      setDragPosition: function (e) {
        var t,
          a = this,
          i = a.scrollbar,
          s = i.$el,
          r = i.dragSize,
          n = i.moveDivider,
          o =
            (t = a.isHorizontal()
              ? "touchstart" === e.type || "touchmove" === e.type
                ? e.targetTouches[0].pageX
                : e.pageX || e.clientX
              : "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].pageY
              : e.pageY || e.clientY) -
            s.offset()[a.isHorizontal() ? "left" : "top"] -
            r / 2,
          l = -a.minTranslate() * n,
          d = -a.maxTranslate() * n;
        o < l ? (o = l) : o > d && (o = d),
          a.rtl && (o = d - o),
          (o = -o / n),
          a.updateProgress(o),
          a.setTranslate(o),
          a.updateActiveIndex(),
          a.updateSlidesClasses();
      },
      onDragStart: function (e) {
        var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar,
          s = t.$wrapperEl,
          r = i.$el,
          n = i.$dragEl;
        (t.scrollbar.isTouched = !0),
          e.preventDefault(),
          e.stopPropagation(),
          s.transition(100),
          n.transition(100),
          i.setDragPosition(e),
          clearTimeout(t.scrollbar.dragTimeout),
          r.transition(0),
          a.hide && r.css("opacity", 1),
          t.emit("scrollbarDragStart", e);
      },
      onDragMove: function (e) {
        var t = this,
          a = t.scrollbar,
          i = t.$wrapperEl,
          s = a.$el,
          r = a.$dragEl;
        t.scrollbar.isTouched &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          a.setDragPosition(e),
          i.transition(0),
          s.transition(0),
          r.transition(0),
          t.emit("scrollbarDragMove", e));
      },
      onDragEnd: function (e) {
        var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar.$el;
        t.scrollbar.isTouched &&
          ((t.scrollbar.isTouched = !1),
          a.hide &&
            (clearTimeout(t.scrollbar.dragTimeout),
            (t.scrollbar.dragTimeout = l.nextTick(function () {
              i.css("opacity", 0), i.transition(400);
            }, 1e3))),
          t.emit("scrollbarDragEnd", e),
          a.snapOnRelease && t.slideReset());
      },
      enableDraggable: function () {
        var t = this;
        if (t.params.scrollbar.el) {
          var a = t.scrollbar.$el,
            i = p.touch ? a[0] : document;
          a.on(t.scrollbar.dragEvents.start, t.scrollbar.onDragStart),
            e(i).on(t.scrollbar.dragEvents.move, t.scrollbar.onDragMove),
            e(i).on(t.scrollbar.dragEvents.end, t.scrollbar.onDragEnd);
        }
      },
      disableDraggable: function () {
        var t = this;
        if (t.params.scrollbar.el) {
          var a = t.scrollbar.$el,
            i = p.touch ? a[0] : document;
          a.off(t.scrollbar.dragEvents.start),
            e(i).off(t.scrollbar.dragEvents.move),
            e(i).off(t.scrollbar.dragEvents.end);
        }
      },
      init: function () {
        var t = this;
        if (t.params.scrollbar.el) {
          var a = t.scrollbar,
            i = t.$el,
            s = t.touchEvents,
            r = t.params.scrollbar,
            n = e(r.el);
          t.params.uniqueNavElements &&
            "string" == typeof r.el &&
            n.length > 1 &&
            1 === i.find(r.el).length &&
            (n = i.find(r.el));
          var o = n.find(".swiper-scrollbar-drag");
          0 === o.length &&
            ((o = e(
              '<div class="swiper-scrollbar-drag link"><div class="grab parallax-wrap hide-ball"><div class="grab-dot parallax-element"></div></div></div>'
            )),
            n.append(o)),
            (t.scrollbar.dragEvents =
              !1 !== t.params.simulateTouch || p.touch
                ? s
                : { start: "mousedown", move: "mousemove", end: "mouseup" }),
            l.extend(a, { $el: n, el: n[0], $dragEl: o, dragEl: o[0] }),
            r.draggable && a.enableDraggable();
        }
      },
      destroy: function () {
        this.scrollbar.disableDraggable();
      },
    },
    K = {
      name: "scrollbar",
      params: {
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          scrollbar: {
            init: q.init.bind(e),
            destroy: q.destroy.bind(e),
            updateSize: q.updateSize.bind(e),
            setTranslate: q.setTranslate.bind(e),
            setTransition: q.setTransition.bind(e),
            enableDraggable: q.enableDraggable.bind(e),
            disableDraggable: q.disableDraggable.bind(e),
            setDragPosition: q.setDragPosition.bind(e),
            onDragStart: q.onDragStart.bind(e),
            onDragMove: q.onDragMove.bind(e),
            onDragEnd: q.onDragEnd.bind(e),
            isTouched: !1,
            timeout: null,
            dragTimeout: null,
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          e.scrollbar.init(),
            e.scrollbar.updateSize(),
            e.scrollbar.setTranslate();
        },
        update: function () {
          this.scrollbar.updateSize();
        },
        resize: function () {
          this.scrollbar.updateSize();
        },
        observerUpdate: function () {
          this.scrollbar.updateSize();
        },
        setTranslate: function () {
          this.scrollbar.setTranslate();
        },
        setTransition: function (e) {
          this.scrollbar.setTransition(e);
        },
        destroy: function () {
          this.scrollbar.destroy();
        },
      },
    },
    U = {
      setTransform: function (t, a) {
        var i = this,
          s = i.rtl,
          r = e(t),
          n = s ? -1 : 1,
          o = r.attr("data-swiper-parallax") || "0",
          l = r.attr("data-swiper-parallax-x"),
          d = r.attr("data-swiper-parallax-y"),
          p = r.attr("data-swiper-parallax-scale"),
          c = r.attr("data-swiper-parallax-opacity");
        if (
          (l || d
            ? ((l = l || "0"), (d = d || "0"))
            : i.isHorizontal()
            ? ((l = o), (d = "0"))
            : ((d = o), (l = "0")),
          (l =
            l.indexOf("%") >= 0
              ? parseInt(l, 10) * a * n + "%"
              : l * a * n + "px"),
          (d = d.indexOf("%") >= 0 ? parseInt(d, 10) * a + "%" : d * a + "px"),
          void 0 !== c && null !== c)
        ) {
          var u = c - (c - 1) * (1 - Math.abs(a));
          r[0].style.opacity = u;
        }
        if (void 0 === p || null === p)
          r.transform("translate3d(" + l + ", " + d + ", 0px)");
        else {
          var h = p - (p - 1) * (1 - Math.abs(a));
          r.transform(
            "translate3d(" + l + ", " + d + ", 0px) scale(" + h + ")"
          );
        }
      },
      setTranslate: function () {
        var t = this,
          a = t.$el,
          i = t.slides,
          s = t.progress,
          r = t.snapGrid;
        a
          .children(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
          )
          .each(function (e, a) {
            t.parallax.setTransform(a, s);
          }),
          i.each(function (a, i) {
            var n = i.progress;
            t.params.slidesPerGroup > 1 &&
              "auto" !== t.params.slidesPerView &&
              (n += Math.ceil(a / 2) - s * (r.length - 1)),
              (n = Math.min(Math.max(n, -1), 1)),
              e(i)
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                )
                .each(function (e, a) {
                  t.parallax.setTransform(a, n);
                });
          });
      },
      setTransition: function (t) {
        void 0 === t && (t = this.params.speed),
          this.$el
            .find(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
            )
            .each(function (a, i) {
              var s = e(i),
                r = parseInt(s.attr("data-swiper-parallax-duration"), 10) || t;
              0 === t && (r = 0), s.transition(r);
            });
      },
    },
    _ = {
      name: "parallax",
      params: { parallax: { enabled: !1 } },
      create: function () {
        var e = this;
        l.extend(e, {
          parallax: {
            setTransform: U.setTransform.bind(e),
            setTranslate: U.setTranslate.bind(e),
            setTransition: U.setTransition.bind(e),
          },
        });
      },
      on: {
        beforeInit: function () {
          this.params.watchSlidesProgress = !0;
        },
        init: function () {
          var e = this;
          e.params.parallax && e.parallax.setTranslate();
        },
        setTranslate: function () {
          var e = this;
          e.params.parallax && e.parallax.setTranslate();
        },
        setTransition: function (e) {
          var t = this;
          t.params.parallax && t.parallax.setTransition(e);
        },
      },
    },
    Z = {
      getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX,
          a = e.targetTouches[0].pageY,
          i = e.targetTouches[1].pageX,
          s = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2));
      },
      onGestureStart: function (t) {
        var a = this,
          i = a.params.zoom,
          s = a.zoom,
          r = s.gesture;
        if (
          ((s.fakeGestureTouched = !1), (s.fakeGestureMoved = !1), !p.gestures)
        ) {
          if (
            "touchstart" !== t.type ||
            ("touchstart" === t.type && t.targetTouches.length < 2)
          )
            return;
          (s.fakeGestureTouched = !0),
            (r.scaleStart = Z.getDistanceBetweenTouches(t));
        }
        (r.$slideEl && r.$slideEl.length) ||
        ((r.$slideEl = e(this)),
        0 === r.$slideEl.length && (r.$slideEl = a.slides.eq(a.activeIndex)),
        (r.$imageEl = r.$slideEl.find("img, svg, canvas")),
        (r.$imageWrapEl = r.$imageEl.parent("." + i.containerClass)),
        (r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
        0 !== r.$imageWrapEl.length)
          ? (r.$imageEl.transition(0), (a.zoom.isScaling = !0))
          : (r.$imageEl = void 0);
      },
      onGestureChange: function (e) {
        var t = this,
          a = t.params.zoom,
          i = t.zoom,
          s = i.gesture;
        if (!p.gestures) {
          if (
            "touchmove" !== e.type ||
            ("touchmove" === e.type && e.targetTouches.length < 2)
          )
            return;
          (i.fakeGestureMoved = !0),
            (s.scaleMove = Z.getDistanceBetweenTouches(e));
        }
        s.$imageEl &&
          0 !== s.$imageEl.length &&
          (p.gestures
            ? (t.zoom.scale = e.scale * i.currentScale)
            : (i.scale = (s.scaleMove / s.scaleStart) * i.currentScale),
          i.scale > s.maxRatio &&
            (i.scale =
              s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, 0.5)),
          i.scale < a.minRatio &&
            (i.scale =
              a.minRatio + 1 - Math.pow(a.minRatio - i.scale + 1, 0.5)),
          s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
      },
      onGestureEnd: function (e) {
        var t = this,
          a = t.params.zoom,
          i = t.zoom,
          s = i.gesture;
        if (!p.gestures) {
          if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
          if (
            "touchend" !== e.type ||
            ("touchend" === e.type && e.changedTouches.length < 2 && !x.android)
          )
            return;
          (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
        }
        s.$imageEl &&
          0 !== s.$imageEl.length &&
          ((i.scale = Math.max(Math.min(i.scale, s.maxRatio), a.minRatio)),
          s.$imageEl
            .transition(t.params.speed)
            .transform("translate3d(0,0,0) scale(" + i.scale + ")"),
          (i.currentScale = i.scale),
          (i.isScaling = !1),
          1 === i.scale && (s.$slideEl = void 0));
      },
      onTouchStart: function (e) {
        var t = this.zoom,
          a = t.gesture,
          i = t.image;
        a.$imageEl &&
          0 !== a.$imageEl.length &&
          (i.isTouched ||
            (x.android && e.preventDefault(),
            (i.isTouched = !0),
            (i.touchesStart.x =
              "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
            (i.touchesStart.y =
              "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
      },
      onTouchMove: function (e) {
        var t = this,
          a = t.zoom,
          i = a.gesture,
          s = a.image,
          r = a.velocity;
        if (
          i.$imageEl &&
          0 !== i.$imageEl.length &&
          ((t.allowClick = !1), s.isTouched && i.$slideEl)
        ) {
          s.isMoved ||
            ((s.width = i.$imageEl[0].offsetWidth),
            (s.height = i.$imageEl[0].offsetHeight),
            (s.startX = l.getTranslate(i.$imageWrapEl[0], "x") || 0),
            (s.startY = l.getTranslate(i.$imageWrapEl[0], "y") || 0),
            (i.slideWidth = i.$slideEl[0].offsetWidth),
            (i.slideHeight = i.$slideEl[0].offsetHeight),
            i.$imageWrapEl.transition(0),
            t.rtl && (s.startX = -s.startX),
            t.rtl && (s.startY = -s.startY));
          var n = s.width * a.scale,
            o = s.height * a.scale;
          if (!(n < i.slideWidth && o < i.slideHeight)) {
            if (
              ((s.minX = Math.min(i.slideWidth / 2 - n / 2, 0)),
              (s.maxX = -s.minX),
              (s.minY = Math.min(i.slideHeight / 2 - o / 2, 0)),
              (s.maxY = -s.minY),
              (s.touchesCurrent.x =
                "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (s.touchesCurrent.y =
                "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
              !s.isMoved && !a.isScaling)
            ) {
              if (
                t.isHorizontal() &&
                ((Math.floor(s.minX) === Math.floor(s.startX) &&
                  s.touchesCurrent.x < s.touchesStart.x) ||
                  (Math.floor(s.maxX) === Math.floor(s.startX) &&
                    s.touchesCurrent.x > s.touchesStart.x))
              )
                return void (s.isTouched = !1);
              if (
                !t.isHorizontal() &&
                ((Math.floor(s.minY) === Math.floor(s.startY) &&
                  s.touchesCurrent.y < s.touchesStart.y) ||
                  (Math.floor(s.maxY) === Math.floor(s.startY) &&
                    s.touchesCurrent.y > s.touchesStart.y))
              )
                return void (s.isTouched = !1);
            }
            e.preventDefault(),
              e.stopPropagation(),
              (s.isMoved = !0),
              (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
              (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
              s.currentX < s.minX &&
                (s.currentX =
                  s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
              s.currentX > s.maxX &&
                (s.currentX =
                  s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
              s.currentY < s.minY &&
                (s.currentY =
                  s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
              s.currentY > s.maxY &&
                (s.currentY =
                  s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
              r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x),
              r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y),
              r.prevTime || (r.prevTime = Date.now()),
              (r.x =
                (s.touchesCurrent.x - r.prevPositionX) /
                (Date.now() - r.prevTime) /
                2),
              (r.y =
                (s.touchesCurrent.y - r.prevPositionY) /
                (Date.now() - r.prevTime) /
                2),
              Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0),
              Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0),
              (r.prevPositionX = s.touchesCurrent.x),
              (r.prevPositionY = s.touchesCurrent.y),
              (r.prevTime = Date.now()),
              i.$imageWrapEl.transform(
                "translate3d(" + s.currentX + "px, " + s.currentY + "px,0)"
              );
          }
        }
      },
      onTouchEnd: function () {
        var e = this.zoom,
          t = e.gesture,
          a = e.image,
          i = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!a.isTouched || !a.isMoved)
            return (a.isTouched = !1), void (a.isMoved = !1);
          (a.isTouched = !1), (a.isMoved = !1);
          var s = 300,
            r = 300,
            n = i.x * s,
            o = a.currentX + n,
            l = i.y * r,
            d = a.currentY + l;
          0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)),
            0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
          var p = Math.max(s, r);
          (a.currentX = o), (a.currentY = d);
          var c = a.width * e.scale,
            u = a.height * e.scale;
          (a.minX = Math.min(t.slideWidth / 2 - c / 2, 0)),
            (a.maxX = -a.minX),
            (a.minY = Math.min(t.slideHeight / 2 - u / 2, 0)),
            (a.maxY = -a.minY),
            (a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX)),
            (a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY)),
            t.$imageWrapEl
              .transition(p)
              .transform(
                "translate3d(" + a.currentX + "px, " + a.currentY + "px,0)"
              );
        }
      },
      onTransitionEnd: function () {
        var e = this,
          t = e.zoom,
          a = t.gesture;
        a.$slideEl &&
          e.previousIndex !== e.activeIndex &&
          (a.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          a.$imageWrapEl.transform("translate3d(0,0,0)"),
          (a.$slideEl = void 0),
          (a.$imageEl = void 0),
          (a.$imageWrapEl = void 0),
          (t.scale = 1),
          (t.currentScale = 1));
      },
      toggle: function (e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e);
      },
      in: function (t) {
        var a = this,
          i = a.zoom,
          s = a.params.zoom,
          r = i.gesture,
          n = i.image;
        if (
          (r.$slideEl ||
            ((r.$slideEl = a.clickedSlide
              ? e(a.clickedSlide)
              : a.slides.eq(a.activeIndex)),
            (r.$imageEl = r.$slideEl.find("img, svg, canvas")),
            (r.$imageWrapEl = r.$imageEl.parent("." + s.containerClass))),
          r.$imageEl && 0 !== r.$imageEl.length)
        ) {
          r.$slideEl.addClass("" + s.zoomedSlideClass);
          var o, l, d, p, c, u, h, v, f, m, g, b, w, y, x, T;
          void 0 === n.touchesStart.x && t
            ? ((o =
                "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX),
              (l = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY))
            : ((o = n.touchesStart.x), (l = n.touchesStart.y)),
            (i.scale = r.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio),
            (i.currentScale =
              r.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio),
            t
              ? ((x = r.$slideEl[0].offsetWidth),
                (T = r.$slideEl[0].offsetHeight),
                (d = r.$slideEl.offset().left + x / 2 - o),
                (p = r.$slideEl.offset().top + T / 2 - l),
                (h = r.$imageEl[0].offsetWidth),
                (v = r.$imageEl[0].offsetHeight),
                (f = h * i.scale),
                (m = v * i.scale),
                (w = -(g = Math.min(x / 2 - f / 2, 0))),
                (y = -(b = Math.min(T / 2 - m / 2, 0))),
                (c = d * i.scale),
                (u = p * i.scale),
                c < g && (c = g),
                c > w && (c = w),
                u < b && (u = b),
                u > y && (u = y))
              : ((c = 0), (u = 0)),
            r.$imageWrapEl
              .transition(300)
              .transform("translate3d(" + c + "px, " + u + "px,0)"),
            r.$imageEl
              .transition(300)
              .transform("translate3d(0,0,0) scale(" + i.scale + ")");
        }
      },
      out: function () {
        var t = this,
          a = t.zoom,
          i = t.params.zoom,
          s = a.gesture;
        s.$slideEl ||
          ((s.$slideEl = t.clickedSlide
            ? e(t.clickedSlide)
            : t.slides.eq(t.activeIndex)),
          (s.$imageEl = s.$slideEl.find("img, svg, canvas")),
          (s.$imageWrapEl = s.$imageEl.parent("." + i.containerClass))),
          s.$imageEl &&
            0 !== s.$imageEl.length &&
            ((a.scale = 1),
            (a.currentScale = 1),
            s.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            s.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            s.$slideEl.removeClass("" + i.zoomedSlideClass),
            (s.$slideEl = void 0));
      },
      enable: function () {
        var t = this,
          a = t.zoom;
        if (!a.enabled) {
          a.enabled = !0;
          var i = t.slides,
            s = !(
              "touchstart" !== t.touchEvents.start ||
              !p.passiveListener ||
              !t.params.passiveListeners
            ) && { passive: !0, capture: !1 };
          p.gestures
            ? (i.on("gesturestart", a.onGestureStart, s),
              i.on("gesturechange", a.onGestureChange, s),
              i.on("gestureend", a.onGestureEnd, s))
            : "touchstart" === t.touchEvents.start &&
              (i.on(t.touchEvents.start, a.onGestureStart, s),
              i.on(t.touchEvents.move, a.onGestureChange, s),
              i.on(t.touchEvents.end, a.onGestureEnd, s)),
            t.slides.each(function (i, s) {
              var r = e(s);
              r.find("." + t.params.zoom.containerClass).length > 0 &&
                r.on(t.touchEvents.move, a.onTouchMove);
            });
        }
      },
      disable: function () {
        var t = this,
          a = t.zoom;
        if (a.enabled) {
          t.zoom.enabled = !1;
          var i = t.slides,
            s = !(
              "touchstart" !== t.touchEvents.start ||
              !p.passiveListener ||
              !t.params.passiveListeners
            ) && { passive: !0, capture: !1 };
          p.gestures
            ? (i.off("gesturestart", a.onGestureStart, s),
              i.off("gesturechange", a.onGestureChange, s),
              i.off("gestureend", a.onGestureEnd, s))
            : "touchstart" === t.touchEvents.start &&
              (i.off(t.touchEvents.start, a.onGestureStart, s),
              i.off(t.touchEvents.move, a.onGestureChange, s),
              i.off(t.touchEvents.end, a.onGestureEnd, s)),
            t.slides.each(function (i, s) {
              var r = e(s);
              r.find("." + t.params.zoom.containerClass).length > 0 &&
                r.off(t.touchEvents.move, a.onTouchMove);
            });
        }
      },
    },
    Q = {
      name: "zoom",
      params: {
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed",
        },
      },
      create: function () {
        var e = this,
          t = {
            enabled: !1,
            scale: 1,
            currentScale: 1,
            isScaling: !1,
            gesture: {
              $slideEl: void 0,
              slideWidth: void 0,
              slideHeight: void 0,
              $imageEl: void 0,
              $imageWrapEl: void 0,
              maxRatio: 3,
            },
            image: {
              isTouched: void 0,
              isMoved: void 0,
              currentX: void 0,
              currentY: void 0,
              minX: void 0,
              minY: void 0,
              maxX: void 0,
              maxY: void 0,
              width: void 0,
              height: void 0,
              startX: void 0,
              startY: void 0,
              touchesStart: {},
              touchesCurrent: {},
            },
            velocity: {
              x: void 0,
              y: void 0,
              prevPositionX: void 0,
              prevPositionY: void 0,
              prevTime: void 0,
            },
          };
        "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
          .split(" ")
          .forEach(function (a) {
            t[a] = Z[a].bind(e);
          }),
          l.extend(e, { zoom: t });
      },
      on: {
        init: function () {
          var e = this;
          e.params.zoom.enabled && e.zoom.enable();
        },
        destroy: function () {
          this.zoom.disable();
        },
        touchStart: function (e) {
          var t = this;
          t.zoom.enabled && t.zoom.onTouchStart(e);
        },
        touchEnd: function (e) {
          var t = this;
          t.zoom.enabled && t.zoom.onTouchEnd(e);
        },
        doubleTap: function (e) {
          var t = this;
          t.params.zoom.enabled &&
            t.zoom.enabled &&
            t.params.zoom.toggle &&
            t.zoom.toggle(e);
        },
        transitionEnd: function () {
          var e = this;
          e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd();
        },
      },
    },
    J = {
      loadInSlide: function (t, a) {
        void 0 === a && (a = !0);
        var i = this,
          s = i.params.lazy;
        if (void 0 !== t && 0 !== i.slides.length) {
          var r =
              i.virtual && i.params.virtual.enabled
                ? i.$wrapperEl.children(
                    "." +
                      i.params.slideClass +
                      '[data-swiper-slide-index="' +
                      t +
                      '"]'
                  )
                : i.slides.eq(t),
            n = r.find(
              "." +
                s.elementClass +
                ":not(." +
                s.loadedClass +
                "):not(." +
                s.loadingClass +
                ")"
            );
          !r.hasClass(s.elementClass) ||
            r.hasClass(s.loadedClass) ||
            r.hasClass(s.loadingClass) ||
            (n = n.add(r[0])),
            0 !== n.length &&
              n.each(function (t, n) {
                var o = e(n);
                o.addClass(s.loadingClass);
                var l = o.attr("data-background"),
                  d = o.attr("data-src"),
                  p = o.attr("data-srcset"),
                  c = o.attr("data-sizes");
                i.loadImage(o[0], d || l, p, c, !1, function () {
                  if (
                    void 0 !== i &&
                    null !== i &&
                    i &&
                    (!i || i.params) &&
                    !i.destroyed
                  ) {
                    if (
                      (l
                        ? (o.css("background-image", 'url("' + l + '")'),
                          o.removeAttr("data-background"))
                        : (p &&
                            (o.attr("srcset", p), o.removeAttr("data-srcset")),
                          c && (o.attr("sizes", c), o.removeAttr("data-sizes")),
                          d && (o.attr("src", d), o.removeAttr("data-src"))),
                      o.addClass(s.loadedClass).removeClass(s.loadingClass),
                      r.find("." + s.preloaderClass).remove(),
                      i.params.loop && a)
                    ) {
                      var e = r.attr("data-swiper-slide-index");
                      if (r.hasClass(i.params.slideDuplicateClass)) {
                        var t = i.$wrapperEl.children(
                          '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            i.params.slideDuplicateClass +
                            ")"
                        );
                        i.lazy.loadInSlide(t.index(), !1);
                      } else {
                        var n = i.$wrapperEl.children(
                          "." +
                            i.params.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]'
                        );
                        i.lazy.loadInSlide(n.index(), !1);
                      }
                    }
                    i.emit("lazyImageReady", r[0], o[0]);
                  }
                }),
                  i.emit("lazyImageLoad", r[0], o[0]);
              });
        }
      },
      load: function () {
        function t(e) {
          if (l) {
            if (
              s.children(
                "." + r.slideClass + '[data-swiper-slide-index="' + e + '"]'
              ).length
            )
              return !0;
          } else if (n[e]) return !0;
          return !1;
        }
        function a(t) {
          return l ? e(t).attr("data-swiper-slide-index") : e(t).index();
        }
        var i = this,
          s = i.$wrapperEl,
          r = i.params,
          n = i.slides,
          o = i.activeIndex,
          l = i.virtual && r.virtual.enabled,
          d = r.lazy,
          p = r.slidesPerView;
        if (
          ("auto" === p && (p = 0),
          i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0),
          i.params.watchSlidesVisibility)
        )
          s.children("." + r.slideVisibleClass).each(function (t, a) {
            var s = l ? e(a).attr("data-swiper-slide-index") : e(a).index();
            i.lazy.loadInSlide(s);
          });
        else if (p > 1)
          for (var c = o; c < o + p; c += 1) t(c) && i.lazy.loadInSlide(c);
        else i.lazy.loadInSlide(o);
        if (d.loadPrevNext)
          if (p > 1 || (d.loadPrevNextAmount && d.loadPrevNextAmount > 1)) {
            for (
              var u = d.loadPrevNextAmount,
                h = p,
                v = Math.min(o + h + Math.max(u, h), n.length),
                f = Math.max(o - Math.max(h, u), 0),
                m = o + p;
              m < v;
              m += 1
            )
              t(m) && i.lazy.loadInSlide(m);
            for (var g = f; g < o; g += 1) t(g) && i.lazy.loadInSlide(g);
          } else {
            var b = s.children("." + r.slideNextClass);
            b.length > 0 && i.lazy.loadInSlide(a(b));
            var w = s.children("." + r.slidePrevClass);
            w.length > 0 && i.lazy.loadInSlide(a(w));
          }
      },
    },
    ee = {
      name: "lazy",
      params: {
        lazy: {
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          elementClass: "swiper-lazy",
          loadingClass: "swiper-lazy-loading",
          loadedClass: "swiper-lazy-loaded",
          preloaderClass: "swiper-lazy-preloader",
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          lazy: {
            initialImageLoaded: !1,
            load: J.load.bind(e),
            loadInSlide: J.loadInSlide.bind(e),
          },
        });
      },
      on: {
        beforeInit: function () {
          var e = this;
          e.params.preloadImages && (e.params.preloadImages = !1);
        },
        init: function () {
          var e = this;
          e.params.lazy.enabled &&
            !e.params.loop &&
            0 === e.params.initialSlide &&
            e.lazy.load();
        },
        scroll: function () {
          var e = this;
          e.params.freeMode && !e.params.freeModeSticky && e.lazy.load();
        },
        resize: function () {
          var e = this;
          e.params.lazy.enabled && e.lazy.load();
        },
        scrollbarDragMove: function () {
          var e = this;
          e.params.lazy.enabled && e.lazy.load();
        },
        transitionStart: function () {
          var e = this;
          e.params.lazy.enabled &&
            (e.params.lazy.loadOnTransitionStart ||
              (!e.params.lazy.loadOnTransitionStart &&
                !e.lazy.initialImageLoaded)) &&
            e.lazy.load();
        },
        transitionEnd: function () {
          var e = this;
          e.params.lazy.enabled &&
            !e.params.lazy.loadOnTransitionStart &&
            e.lazy.load();
        },
      },
    },
    te = {
      LinearSpline: function (e, t) {
        var a = (function () {
          var e, t, a;
          return function (i, s) {
            for (t = -1, e = i.length; e - t > 1; )
              i[(a = (e + t) >> 1)] <= s ? (t = a) : (e = a);
            return e;
          };
        })();
        (this.x = e), (this.y = t), (this.lastIndex = e.length - 1);
        var i, s;
        return (
          (this.interpolate = function (e) {
            return e
              ? ((s = a(this.x, e)),
                (i = s - 1),
                ((e - this.x[i]) * (this.y[s] - this.y[i])) /
                  (this.x[s] - this.x[i]) +
                  this.y[i])
              : 0;
          }),
          this
        );
      },
      getInterpolateFunction: function (e) {
        var t = this;
        t.controller.spline ||
          (t.controller.spline = t.params.loop
            ? new te.LinearSpline(t.slidesGrid, e.slidesGrid)
            : new te.LinearSpline(t.snapGrid, e.snapGrid));
      },
      setTranslate: function (e, t) {
        function a(e) {
          var t =
            e.rtl && "horizontal" === e.params.direction
              ? -r.translate
              : r.translate;
          "slide" === r.params.controller.by &&
            (r.controller.getInterpolateFunction(e),
            (s = -r.controller.spline.interpolate(-t))),
            (s && "container" !== r.params.controller.by) ||
              ((i =
                (e.maxTranslate() - e.minTranslate()) /
                (r.maxTranslate() - r.minTranslate())),
              (s = (t - r.minTranslate()) * i + e.minTranslate())),
            r.params.controller.inverse && (s = e.maxTranslate() - s),
            e.updateProgress(s),
            e.setTranslate(s, r),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        }
        var i,
          s,
          r = this,
          n = r.controller.control;
        if (Array.isArray(n))
          for (var o = 0; o < n.length; o += 1)
            n[o] !== t && n[o] instanceof $ && a(n[o]);
        else n instanceof $ && t !== n && a(n);
      },
      setTransition: function (e, t) {
        function a(t) {
          t.setTransition(e, s),
            0 !== e &&
              (t.transitionStart(),
              t.$wrapperEl.transitionEnd(function () {
                r &&
                  (t.params.loop &&
                    "slide" === s.params.controller.by &&
                    t.loopFix(),
                  t.transitionEnd());
              }));
        }
        var i,
          s = this,
          r = s.controller.control;
        if (Array.isArray(r))
          for (i = 0; i < r.length; i += 1)
            r[i] !== t && r[i] instanceof $ && a(r[i]);
        else r instanceof $ && t !== r && a(r);
      },
    },
    ae = {
      name: "controller",
      params: { controller: { control: void 0, inverse: !1, by: "slide" } },
      create: function () {
        var e = this;
        l.extend(e, {
          controller: {
            control: e.params.controller.control,
            getInterpolateFunction: te.getInterpolateFunction.bind(e),
            setTranslate: te.setTranslate.bind(e),
            setTransition: te.setTransition.bind(e),
          },
        });
      },
      on: {
        update: function () {
          var e = this;
          e.controller.control &&
            e.controller.spline &&
            ((e.controller.spline = void 0), delete e.controller.spline);
        },
        resize: function () {
          var e = this;
          e.controller.control &&
            e.controller.spline &&
            ((e.controller.spline = void 0), delete e.controller.spline);
        },
        observerUpdate: function () {
          var e = this;
          e.controller.control &&
            e.controller.spline &&
            ((e.controller.spline = void 0), delete e.controller.spline);
        },
        setTranslate: function (e, t) {
          var a = this;
          a.controller.control && a.controller.setTranslate(e, t);
        },
        setTransition: function (e, t) {
          var a = this;
          a.controller.control && a.controller.setTransition(e, t);
        },
      },
    },
    ie = {
      makeElFocusable: function (e) {
        return e.attr("tabIndex", "0"), e;
      },
      addElRole: function (e, t) {
        return e.attr("role", t), e;
      },
      addElLabel: function (e, t) {
        return e.attr("aria-label", t), e;
      },
      disableEl: function (e) {
        return e.attr("aria-disabled", !0), e;
      },
      enableEl: function (e) {
        return e.attr("aria-disabled", !1), e;
      },
      onEnterKey: function (t) {
        var a = this,
          i = a.params.a11y;
        if (13 === t.keyCode) {
          var s = e(t.target);
          a.navigation &&
            a.navigation.$nextEl &&
            s.is(a.navigation.$nextEl) &&
            ((a.isEnd && !a.params.loop) || a.slideNext(),
            a.isEnd
              ? a.a11y.notify(i.lastSlideMessage)
              : a.a11y.notify(i.nextSlideMessage)),
            a.navigation &&
              a.navigation.$prevEl &&
              s.is(a.navigation.$prevEl) &&
              ((a.isBeginning && !a.params.loop) || a.slidePrev(),
              a.isBeginning
                ? a.a11y.notify(i.firstSlideMessage)
                : a.a11y.notify(i.prevSlideMessage)),
            a.pagination &&
              s.is("." + a.params.pagination.bulletClass) &&
              s[0].click();
        }
      },
      notify: function (e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e));
      },
      updateNavigation: function () {
        var e = this;
        if (!e.params.loop) {
          var t = e.navigation,
            a = t.$nextEl,
            i = t.$prevEl;
          i &&
            i.length > 0 &&
            (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)),
            a &&
              a.length > 0 &&
              (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a));
        }
      },
      updatePagination: function () {
        var t = this,
          a = t.params.a11y;
        t.pagination &&
          t.params.pagination.clickable &&
          t.pagination.bullets &&
          t.pagination.bullets.length &&
          t.pagination.bullets.each(function (i, s) {
            var r = e(s);
            t.a11y.makeElFocusable(r),
              t.a11y.addElRole(r, "button"),
              t.a11y.addElLabel(
                r,
                a.paginationBulletMessage.replace(/{{index}}/, r.index() + 1)
              );
          });
      },
      init: function () {
        var e = this;
        e.$el.append(e.a11y.liveRegion);
        var t,
          a,
          i = e.params.a11y;
        e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
          e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl),
          t &&
            (e.a11y.makeElFocusable(t),
            e.a11y.addElRole(t, "button"),
            e.a11y.addElLabel(t, i.nextSlideMessage),
            t.on("keydown", e.a11y.onEnterKey)),
          a &&
            (e.a11y.makeElFocusable(a),
            e.a11y.addElRole(a, "button"),
            e.a11y.addElLabel(a, i.prevSlideMessage),
            a.on("keydown", e.a11y.onEnterKey)),
          e.pagination &&
            e.params.pagination.clickable &&
            e.pagination.bullets &&
            e.pagination.bullets.length &&
            e.pagination.$el.on(
              "keydown",
              "." + e.params.pagination.bulletClass,
              e.a11y.onEnterKey
            );
      },
      destroy: function () {
        var e = this;
        e.a11y.liveRegion &&
          e.a11y.liveRegion.length > 0 &&
          e.a11y.liveRegion.remove();
        var t, a;
        e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
          e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl),
          t && t.off("keydown", e.a11y.onEnterKey),
          a && a.off("keydown", e.a11y.onEnterKey),
          e.pagination &&
            e.params.pagination.clickable &&
            e.pagination.bullets &&
            e.pagination.bullets.length &&
            e.pagination.$el.off(
              "keydown",
              "." + e.params.pagination.bulletClass,
              e.a11y.onEnterKey
            );
      },
    },
    se = {
      name: "a11y",
      params: {
        a11y: {
          enabled: !1,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
        },
      },
      create: function () {
        var t = this;
        l.extend(t, {
          a11y: {
            liveRegion: e(
              '<span class="' +
                t.params.a11y.notificationClass +
                '" aria-live="assertive" aria-atomic="true"></span>'
            ),
          },
        }),
          Object.keys(ie).forEach(function (e) {
            t.a11y[e] = ie[e].bind(t);
          });
      },
      on: {
        init: function () {
          var e = this;
          e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation());
        },
        toEdge: function () {
          var e = this;
          e.params.a11y.enabled && e.a11y.updateNavigation();
        },
        fromEdge: function () {
          var e = this;
          e.params.a11y.enabled && e.a11y.updateNavigation();
        },
        paginationUpdate: function () {
          var e = this;
          e.params.a11y.enabled && e.a11y.updatePagination();
        },
        destroy: function () {
          var e = this;
          e.params.a11y.enabled && e.a11y.destroy();
        },
      },
    },
    re = {
      init: function () {
        var e = this;
        if (e.params.history) {
          if (!s.history || !s.history.pushState)
            return (
              (e.params.history.enabled = !1),
              void (e.params.hashNavigation.enabled = !0)
            );
          var t = e.history;
          (t.initialized = !0),
            (t.paths = re.getPathValues()),
            (t.paths.key || t.paths.value) &&
              (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit),
              e.params.history.replaceState ||
                s.addEventListener("popstate", e.history.setHistoryPopState));
        }
      },
      destroy: function () {
        var e = this;
        e.params.history.replaceState ||
          s.removeEventListener("popstate", e.history.setHistoryPopState);
      },
      setHistoryPopState: function () {
        var e = this;
        (e.history.paths = re.getPathValues()),
          e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1);
      },
      getPathValues: function () {
        var e = s.location.pathname
            .slice(1)
            .split("/")
            .filter(function (e) {
              return "" !== e;
            }),
          t = e.length;
        return { key: e[t - 2], value: e[t - 1] };
      },
      setHistory: function (e, t) {
        var a = this;
        if (a.history.initialized && a.params.history.enabled) {
          var i = a.slides.eq(t),
            r = re.slugify(i.attr("data-history"));
          s.location.pathname.includes(e) || (r = e + "/" + r);
          var n = s.history.state;
          (n && n.value === r) ||
            (a.params.history.replaceState
              ? s.history.replaceState({ value: r }, null, r)
              : s.history.pushState({ value: r }, null, r));
        }
      },
      slugify: function (e) {
        return e
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      },
      scrollToSlide: function (e, t, a) {
        var i = this;
        if (t)
          for (var s = 0, r = i.slides.length; s < r; s += 1) {
            var n = i.slides.eq(s);
            if (
              re.slugify(n.attr("data-history")) === t &&
              !n.hasClass(i.params.slideDuplicateClass)
            ) {
              var o = n.index();
              i.slideTo(o, e, a);
            }
          }
        else i.slideTo(0, e, a);
      },
    },
    ne = {
      name: "history",
      params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
      create: function () {
        var e = this;
        l.extend(e, {
          history: {
            init: re.init.bind(e),
            setHistory: re.setHistory.bind(e),
            setHistoryPopState: re.setHistoryPopState.bind(e),
            scrollToSlide: re.scrollToSlide.bind(e),
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          e.params.history.enabled && e.history.init();
        },
        destroy: function () {
          var e = this;
          e.params.history.enabled && e.history.destroy();
        },
        transitionEnd: function () {
          var e = this;
          e.history.initialized &&
            e.history.setHistory(e.params.history.key, e.activeIndex);
        },
      },
    },
    oe = {
      onHashCange: function () {
        var e = this,
          t = d.location.hash.replace("#", "");
        t !== e.slides.eq(e.activeIndex).attr("data-hash") &&
          e.slideTo(
            e.$wrapperEl
              .children("." + e.params.slideClass + '[data-hash="' + t + '"]')
              .index()
          );
      },
      setHash: function () {
        var e = this;
        if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
          if (
            e.params.hashNavigation.replaceState &&
            s.history &&
            s.history.replaceState
          )
            s.history.replaceState(
              null,
              null,
              "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""
            );
          else {
            var t = e.slides.eq(e.activeIndex),
              a = t.attr("data-hash") || t.attr("data-history");
            d.location.hash = a || "";
          }
      },
      init: function () {
        var t = this;
        if (
          !(
            !t.params.hashNavigation.enabled ||
            (t.params.history && t.params.history.enabled)
          )
        ) {
          t.hashNavigation.initialized = !0;
          var a = d.location.hash.replace("#", "");
          if (a)
            for (var i = 0, r = t.slides.length; i < r; i += 1) {
              var n = t.slides.eq(i);
              if (
                (n.attr("data-hash") || n.attr("data-history")) === a &&
                !n.hasClass(t.params.slideDuplicateClass)
              ) {
                var o = n.index();
                t.slideTo(o, 0, t.params.runCallbacksOnInit, !0);
              }
            }
          t.params.hashNavigation.watchState &&
            e(s).on("hashchange", t.hashNavigation.onHashCange);
        }
      },
      destroy: function () {
        var t = this;
        t.params.hashNavigation.watchState &&
          e(s).off("hashchange", t.hashNavigation.onHashCange);
      },
    },
    le = {
      name: "hash-navigation",
      params: {
        hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          hashNavigation: {
            initialized: !1,
            init: oe.init.bind(e),
            destroy: oe.destroy.bind(e),
            setHash: oe.setHash.bind(e),
            onHashCange: oe.onHashCange.bind(e),
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          e.params.hashNavigation.enabled && e.hashNavigation.init();
        },
        destroy: function () {
          var e = this;
          e.params.hashNavigation.enabled && e.hashNavigation.destroy();
        },
        transitionEnd: function () {
          var e = this;
          e.hashNavigation.initialized && e.hashNavigation.setHash();
        },
      },
    },
    de = {
      run: function () {
        var e = this,
          t = e.slides.eq(e.activeIndex),
          a = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          (e.autoplay.timeout = l.nextTick(function () {
            e.params.loop
              ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? e.autoplay.stop()
                : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
              : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
          }, a));
      },
      start: function () {
        var e = this;
        return (
          void 0 === e.autoplay.timeout &&
          !e.autoplay.running &&
          ((e.autoplay.running = !0),
          e.emit("autoplayStart"),
          e.autoplay.run(),
          !0)
        );
      },
      stop: function () {
        var e = this;
        return (
          !!e.autoplay.running &&
          void 0 !== e.autoplay.timeout &&
          (e.autoplay.timeout &&
            (clearTimeout(e.autoplay.timeout), (e.autoplay.timeout = void 0)),
          (e.autoplay.running = !1),
          e.emit("autoplayStop"),
          !0)
        );
      },
      pause: function (e) {
        var t = this;
        t.autoplay.running &&
          (t.autoplay.paused ||
            (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            (t.autoplay.paused = !0),
            0 === e
              ? ((t.autoplay.paused = !1), t.autoplay.run())
              : t.$wrapperEl.transitionEnd(function () {
                  t &&
                    !t.destroyed &&
                    ((t.autoplay.paused = !1),
                    t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
                })));
      },
    },
    pe = {
      name: "autoplay",
      params: {
        autoplay: {
          enabled: !1,
          delay: 3e3,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          autoplay: {
            running: !1,
            paused: !1,
            run: de.run.bind(e),
            start: de.start.bind(e),
            stop: de.stop.bind(e),
            pause: de.pause.bind(e),
          },
        });
      },
      on: {
        init: function () {
          var e = this;
          e.params.autoplay.enabled && e.autoplay.start();
        },
        beforeTransitionStart: function (e, t) {
          var a = this;
          a.autoplay.running &&
            (t || !a.params.autoplay.disableOnInteraction
              ? a.autoplay.pause(e)
              : a.autoplay.stop());
        },
        sliderFirstMove: function () {
          var e = this;
          e.autoplay.running &&
            (e.params.autoplay.disableOnInteraction
              ? e.autoplay.stop()
              : e.autoplay.pause());
        },
        destroy: function () {
          var e = this;
          e.autoplay.running && e.autoplay.stop();
        },
      },
    },
    ce = {
      setTranslate: function () {
        for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
          var i = e.slides.eq(a),
            s = -i[0].swiperSlideOffset;
          e.params.virtualTranslate || (s -= e.translate);
          var r = 0;
          e.isHorizontal() || ((r = s), (s = 0));
          var n = e.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(i[0].progress), 0)
            : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({ opacity: n }).transform(
            "translate3d(" + s + "px, " + r + "px, 0px)"
          );
        }
      },
      setTransition: function (e) {
        var t = this,
          a = t.slides,
          i = t.$wrapperEl;
        if ((a.transition(e), t.params.virtualTranslate && 0 !== e)) {
          var s = !1;
          a.transitionEnd(function () {
            if (!s && t && !t.destroyed) {
              (s = !0), (t.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], a = 0;
                a < e.length;
                a += 1
              )
                i.trigger(e[a]);
            }
          });
        }
      },
    },
    ue = {
      name: "effect-fade",
      params: { fadeEffect: { crossFade: !1 } },
      create: function () {
        var e = this;
        l.extend(e, {
          fadeEffect: {
            setTranslate: ce.setTranslate.bind(e),
            setTransition: ce.setTransition.bind(e),
          },
        });
      },
      on: {
        beforeInit: function () {
          var e = this;
          if ("fade" === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + "fade");
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0,
            };
            l.extend(e.params, t), l.extend(e.originalParams, t);
          }
        },
        setTranslate: function () {
          var e = this;
          "fade" === e.params.effect && e.fadeEffect.setTranslate();
        },
        setTransition: function (e) {
          var t = this;
          "fade" === t.params.effect && t.fadeEffect.setTransition(e);
        },
      },
    },
    he = {
      setTranslate: function () {
        var t,
          a = this,
          i = a.$el,
          s = a.$wrapperEl,
          r = a.slides,
          n = a.width,
          o = a.height,
          l = a.rtl,
          d = a.size,
          p = a.params.cubeEffect,
          c = a.isHorizontal(),
          u = a.virtual && a.params.virtual.enabled,
          h = 0;
        p.shadow &&
          (c
            ? (0 === (t = s.find(".swiper-cube-shadow")).length &&
                ((t = e('<div class="swiper-cube-shadow"></div>')),
                s.append(t)),
              t.css({ height: n + "px" }))
            : 0 === (t = i.find(".swiper-cube-shadow")).length &&
              ((t = e('<div class="swiper-cube-shadow"></div>')), i.append(t)));
        for (var v = 0; v < r.length; v += 1) {
          var f = r.eq(v),
            g = v;
          u && (g = parseInt(f.attr("data-swiper-slide-index"), 10));
          var b = 90 * g,
            w = Math.floor(b / 360);
          l && ((b = -b), (w = Math.floor(-b / 360)));
          var y = Math.max(Math.min(f[0].progress, 1), -1),
            x = 0,
            T = 0,
            E = 0;
          g % 4 == 0
            ? ((x = 4 * -w * d), (E = 0))
            : (g - 1) % 4 == 0
            ? ((x = 0), (E = 4 * -w * d))
            : (g - 2) % 4 == 0
            ? ((x = d + 4 * w * d), (E = d))
            : (g - 3) % 4 == 0 && ((x = -d), (E = 3 * d + 4 * d * w)),
            l && (x = -x),
            c || ((T = x), (x = 0));
          var S =
            "rotateX(" +
            (c ? 0 : -b) +
            "deg) rotateY(" +
            (c ? b : 0) +
            "deg) translate3d(" +
            x +
            "px, " +
            T +
            "px, " +
            E +
            "px)";
          if (
            (y <= 1 &&
              y > -1 &&
              ((h = 90 * g + 90 * y), l && (h = 90 * -g - 90 * y)),
            f.transform(S),
            p.slideShadows)
          ) {
            var C = c
                ? f.find(".swiper-slide-shadow-left")
                : f.find(".swiper-slide-shadow-top"),
              M = c
                ? f.find(".swiper-slide-shadow-right")
                : f.find(".swiper-slide-shadow-bottom");
            0 === C.length &&
              ((C = e(
                '<div class="swiper-slide-shadow-' +
                  (c ? "left" : "top") +
                  '"></div>'
              )),
              f.append(C)),
              0 === M.length &&
                ((M = e(
                  '<div class="swiper-slide-shadow-' +
                    (c ? "right" : "bottom") +
                    '"></div>'
                )),
                f.append(M)),
              C.length && (C[0].style.opacity = Math.max(-y, 0)),
              M.length && (M[0].style.opacity = Math.max(y, 0));
          }
        }
        if (
          (s.css({
            "-webkit-transform-origin": "50% 50% -" + d / 2 + "px",
            "-moz-transform-origin": "50% 50% -" + d / 2 + "px",
            "-ms-transform-origin": "50% 50% -" + d / 2 + "px",
            "transform-origin": "50% 50% -" + d / 2 + "px",
          }),
          p.shadow)
        )
          if (c)
            t.transform(
              "translate3d(0px, " +
                (n / 2 + p.shadowOffset) +
                "px, " +
                -n / 2 +
                "px) rotateX(90deg) rotateZ(0deg) scale(" +
                p.shadowScale +
                ")"
            );
          else {
            var z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
              P =
                1.5 -
                (Math.sin((2 * z * Math.PI) / 360) / 2 +
                  Math.cos((2 * z * Math.PI) / 360) / 2),
              k = p.shadowScale,
              $ = p.shadowScale / P,
              I = p.shadowOffset;
            t.transform(
              "scale3d(" +
                k +
                ", 1, " +
                $ +
                ") translate3d(0px, " +
                (o / 2 + I) +
                "px, " +
                -o / 2 / $ +
                "px) rotateX(-90deg)"
            );
          }
        var L = m.isSafari || m.isUiWebView ? -d / 2 : 0;
        s.transform(
          "translate3d(0px,0," +
            L +
            "px) rotateX(" +
            (a.isHorizontal() ? 0 : h) +
            "deg) rotateY(" +
            (a.isHorizontal() ? -h : 0) +
            "deg)"
        );
      },
      setTransition: function (e) {
        var t = this,
          a = t.$el;
        t.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e),
          t.params.cubeEffect.shadow &&
            !t.isHorizontal() &&
            a.find(".swiper-cube-shadow").transition(e);
      },
    },
    ve = {
      name: "effect-cube",
      params: {
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          cubeEffect: {
            setTranslate: he.setTranslate.bind(e),
            setTransition: he.setTransition.bind(e),
          },
        });
      },
      on: {
        beforeInit: function () {
          var e = this;
          if ("cube" === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + "cube"),
              e.classNames.push(e.params.containerModifierClass + "3d");
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: !1,
              virtualTranslate: !0,
            };
            l.extend(e.params, t), l.extend(e.originalParams, t);
          }
        },
        setTranslate: function () {
          var e = this;
          "cube" === e.params.effect && e.cubeEffect.setTranslate();
        },
        setTransition: function (e) {
          var t = this;
          "cube" === t.params.effect && t.cubeEffect.setTransition(e);
        },
      },
    },
    fe = {
      setTranslate: function () {
        for (var t = this, a = t.slides, i = 0; i < a.length; i += 1) {
          var s = a.eq(i),
            r = s[0].progress;
          t.params.flipEffect.limitRotation &&
            (r = Math.max(Math.min(s[0].progress, 1), -1));
          var n = -180 * r,
            o = 0,
            l = -s[0].swiperSlideOffset,
            d = 0;
          if (
            (t.isHorizontal()
              ? t.rtl && (n = -n)
              : ((d = l), (l = 0), (o = -n), (n = 0)),
            (s[0].style.zIndex = -Math.abs(Math.round(r)) + a.length),
            t.params.flipEffect.slideShadows)
          ) {
            var p = t.isHorizontal()
                ? s.find(".swiper-slide-shadow-left")
                : s.find(".swiper-slide-shadow-top"),
              c = t.isHorizontal()
                ? s.find(".swiper-slide-shadow-right")
                : s.find(".swiper-slide-shadow-bottom");
            0 === p.length &&
              ((p = e(
                '<div class="swiper-slide-shadow-' +
                  (t.isHorizontal() ? "left" : "top") +
                  '"></div>'
              )),
              s.append(p)),
              0 === c.length &&
                ((c = e(
                  '<div class="swiper-slide-shadow-' +
                    (t.isHorizontal() ? "right" : "bottom") +
                    '"></div>'
                )),
                s.append(c)),
              p.length && (p[0].style.opacity = Math.max(-r, 0)),
              c.length && (c[0].style.opacity = Math.max(r, 0));
          }
          s.transform(
            "translate3d(" +
              l +
              "px, " +
              d +
              "px, 0px) rotateX(" +
              o +
              "deg) rotateY(" +
              n +
              "deg)"
          );
        }
      },
      setTransition: function (e) {
        var t = this,
          a = t.slides,
          i = t.activeIndex,
          s = t.$wrapperEl;
        if (
          (a
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
          t.params.virtualTranslate && 0 !== e)
        ) {
          var r = !1;
          a.eq(i).transitionEnd(function () {
            if (!r && t && !t.destroyed) {
              (r = !0), (t.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], a = 0;
                a < e.length;
                a += 1
              )
                s.trigger(e[a]);
            }
          });
        }
      },
    },
    me = {
      name: "effect-flip",
      params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
      create: function () {
        var e = this;
        l.extend(e, {
          flipEffect: {
            setTranslate: fe.setTranslate.bind(e),
            setTransition: fe.setTransition.bind(e),
          },
        });
      },
      on: {
        beforeInit: function () {
          var e = this;
          if ("flip" === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + "flip"),
              e.classNames.push(e.params.containerModifierClass + "3d");
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0,
            };
            l.extend(e.params, t), l.extend(e.originalParams, t);
          }
        },
        setTranslate: function () {
          var e = this;
          "flip" === e.params.effect && e.flipEffect.setTranslate();
        },
        setTransition: function (e) {
          var t = this;
          "flip" === t.params.effect && t.flipEffect.setTransition(e);
        },
      },
    },
    ge = {
      setTranslate: function () {
        for (
          var t = this,
            a = t.width,
            i = t.height,
            s = t.slides,
            r = t.$wrapperEl,
            n = t.slidesSizesGrid,
            o = t.params.coverflowEffect,
            l = t.isHorizontal(),
            d = t.translate,
            p = l ? a / 2 - d : i / 2 - d,
            c = l ? o.rotate : -o.rotate,
            u = o.depth,
            h = 0,
            v = s.length;
          h < v;
          h += 1
        ) {
          var f = s.eq(h),
            g = n[h],
            b = ((p - f[0].swiperSlideOffset - g / 2) / g) * o.modifier,
            w = l ? c * b : 0,
            y = l ? 0 : c * b,
            x = -u * Math.abs(b),
            T = l ? 0 : o.stretch * b,
            E = l ? o.stretch * b : 0;
          Math.abs(E) < 0.001 && (E = 0),
            Math.abs(T) < 0.001 && (T = 0),
            Math.abs(x) < 0.001 && (x = 0),
            Math.abs(w) < 0.001 && (w = 0),
            Math.abs(y) < 0.001 && (y = 0);
          var S =
            "translate3d(" +
            E +
            "px," +
            T +
            "px," +
            x +
            "px)  rotateX(" +
            y +
            "deg) rotateY(" +
            w +
            "deg)";
          if (
            (f.transform(S),
            (f[0].style.zIndex = 1 - Math.abs(Math.round(b))),
            o.slideShadows)
          ) {
            var C = l
                ? f.find(".swiper-slide-shadow-left")
                : f.find(".swiper-slide-shadow-top"),
              M = l
                ? f.find(".swiper-slide-shadow-right")
                : f.find(".swiper-slide-shadow-bottom");
            0 === C.length &&
              ((C = e(
                '<div class="swiper-slide-shadow-' +
                  (l ? "left" : "top") +
                  '"></div>'
              )),
              f.append(C)),
              0 === M.length &&
                ((M = e(
                  '<div class="swiper-slide-shadow-' +
                    (l ? "right" : "bottom") +
                    '"></div>'
                )),
                f.append(M)),
              C.length && (C[0].style.opacity = b > 0 ? b : 0),
              M.length && (M[0].style.opacity = -b > 0 ? -b : 0);
          }
        }
        m.ie && (r[0].style.perspectiveOrigin = p + "px 50%");
      },
      setTransition: function (e) {
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e);
      },
    },
    be = {
      name: "effect-coverflow",
      params: {
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: !0,
        },
      },
      create: function () {
        var e = this;
        l.extend(e, {
          coverflowEffect: {
            setTranslate: ge.setTranslate.bind(e),
            setTransition: ge.setTransition.bind(e),
          },
        });
      },
      on: {
        beforeInit: function () {
          var e = this;
          "coverflow" === e.params.effect &&
            (e.classNames.push(e.params.containerModifierClass + "coverflow"),
            e.classNames.push(e.params.containerModifierClass + "3d"),
            (e.params.watchSlidesProgress = !0),
            (e.originalParams.watchSlidesProgress = !0));
        },
        setTranslate: function () {
          var e = this;
          "coverflow" === e.params.effect && e.coverflowEffect.setTranslate();
        },
        setTransition: function (e) {
          var t = this;
          "coverflow" === t.params.effect && t.coverflowEffect.setTransition(e);
        },
      },
    };
  return (
    ($.components = [
      I,
      L,
      D,
      O,
      H,
      N,
      G,
      V,
      W,
      j,
      K,
      _,
      Q,
      ee,
      ae,
      se,
      ne,
      le,
      pe,
      ue,
      ve,
      me,
      be,
    ]),
    $
  );
});

/*!
 * VERSION: 2.1.2
 * DATE: 2019-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "TweenMax",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (a, b, c) {
      var d = function (a) {
          var b,
            c = [],
            d = a.length;
          for (b = 0; b !== d; c.push(a[b++]));
          return c;
        },
        e = function (a, b, c) {
          var d,
            e,
            f = a.cycle;
          for (d in f)
            (e = f[d]),
              (a[d] = "function" == typeof e ? e(c, b[c], b) : e[c % e.length]);
          delete a.cycle;
        },
        f = function (a) {
          if ("function" == typeof a) return a;
          var b = "object" == typeof a ? a : { each: a },
            c = b.ease,
            d = b.from || 0,
            e = b.base || 0,
            f = {},
            g = isNaN(d),
            h = b.axis,
            i = { center: 0.5, end: 1 }[d] || 0;
          return function (a, j, k) {
            var l,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              t,
              u = (k || b).length,
              v = f[u];
            if (!v) {
              if (((t = "auto" === b.grid ? 0 : (b.grid || [1 / 0])[0]), !t)) {
                for (
                  r = -(1 / 0);
                  r < (r = k[t++].getBoundingClientRect().left) && u > t;

                );
                t--;
              }
              for (
                v = f[u] = [],
                  l = g ? Math.min(t, u) * i - 0.5 : d % t,
                  m = g ? (u * i) / t - 0.5 : (d / t) | 0,
                  r = 0,
                  s = 1 / 0,
                  q = 0;
                u > q;
                q++
              )
                (n = (q % t) - l),
                  (o = m - ((q / t) | 0)),
                  (v[q] = p =
                    h ? Math.abs("y" === h ? o : n) : Math.sqrt(n * n + o * o)),
                  p > r && (r = p),
                  s > p && (s = p);
              (v.max = r - s),
                (v.min = s),
                (v.v = u =
                  b.amount ||
                  b.each *
                    (t > u
                      ? u
                      : h
                      ? "y" === h
                        ? u / t
                        : t
                      : Math.max(t, u / t)) ||
                  0),
                (v.b = 0 > u ? e - u : e);
            }
            return (
              (u = (v[a] - v.min) / v.max), v.b + (c ? c.getRatio(u) : u) * v.v
            );
          };
        },
        g = function (a, b, d) {
          c.call(this, a, b, d),
            (this._cycle = 0),
            (this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._repeat && this._uncache(!0),
            (this.render = g.prototype.render);
        },
        h = 1e-8,
        i = c._internals,
        j = i.isSelector,
        k = i.isArray,
        l = (g.prototype = c.to({}, 0.1, {})),
        m = [];
      (g.version = "2.1.2"),
        (l.constructor = g),
        (l.kill()._gc = !1),
        (g.killTweensOf = g.killDelayedCallsTo = c.killTweensOf),
        (g.getTweensOf = c.getTweensOf),
        (g.lagSmoothing = c.lagSmoothing),
        (g.ticker = c.ticker),
        (g.render = c.render),
        (g.distribute = f),
        (l.invalidate = function () {
          return (
            (this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._yoyoEase = null),
            this._uncache(!0),
            c.prototype.invalidate.call(this)
          );
        }),
        (l.updateTo = function (a, b) {
          var d,
            e = this,
            f = e.ratio,
            g = e.vars.immediateRender || a.immediateRender;
          b &&
            e._startTime < e._timeline._time &&
            ((e._startTime = e._timeline._time),
            e._uncache(!1),
            e._gc
              ? e._enabled(!0, !1)
              : e._timeline.insert(e, e._startTime - e._delay));
          for (d in a) e.vars[d] = a[d];
          if (e._initted || g)
            if (b) (e._initted = !1), g && e.render(0, !0, !0);
            else if (
              (e._gc && e._enabled(!0, !1),
              e._notifyPluginsOfEnabled &&
                e._firstPT &&
                c._onPluginEvent("_onDisable", e),
              e._time / e._duration > 0.998)
            ) {
              var h = e._totalTime;
              e.render(0, !0, !1), (e._initted = !1), e.render(h, !0, !1);
            } else if (((e._initted = !1), e._init(), e._time > 0 || g))
              for (var i, j = 1 / (1 - f), k = e._firstPT; k; )
                (i = k.s + k.c), (k.c *= j), (k.s = i - k.c), (k = k._next);
          return e;
        }),
        (l.render = function (a, b, d) {
          this._initted ||
            (0 === this._duration && this.vars.repeat && this.invalidate());
          var e,
            f,
            g,
            j,
            k,
            l,
            m,
            n,
            o,
            p = this,
            q = p._dirty ? p.totalDuration() : p._totalDuration,
            r = p._time,
            s = p._totalTime,
            t = p._cycle,
            u = p._duration,
            v = p._rawPrevTime;
          if (
            (a >= q - h && a >= 0
              ? ((p._totalTime = q),
                (p._cycle = p._repeat),
                p._yoyo && 0 !== (1 & p._cycle)
                  ? ((p._time = 0),
                    (p.ratio = p._ease._calcEnd ? p._ease.getRatio(0) : 0))
                  : ((p._time = u),
                    (p.ratio = p._ease._calcEnd ? p._ease.getRatio(1) : 1)),
                p._reversed ||
                  ((e = !0),
                  (f = "onComplete"),
                  (d = d || p._timeline.autoRemoveChildren)),
                0 === u &&
                  (p._initted || !p.vars.lazy || d) &&
                  (p._startTime === p._timeline._duration && (a = 0),
                  (0 > v ||
                    (0 >= a && a >= -h) ||
                    (v === h && "isPause" !== p.data)) &&
                    v !== a &&
                    ((d = !0), v > h && (f = "onReverseComplete")),
                  (p._rawPrevTime = n = !b || a || v === a ? a : h)))
              : h > a
              ? ((p._totalTime = p._time = p._cycle = 0),
                (p.ratio = p._ease._calcEnd ? p._ease.getRatio(0) : 0),
                (0 !== s || (0 === u && v > 0)) &&
                  ((f = "onReverseComplete"), (e = p._reversed)),
                a > -h
                  ? (a = 0)
                  : 0 > a &&
                    ((p._active = !1),
                    0 === u &&
                      (p._initted || !p.vars.lazy || d) &&
                      (v >= 0 && (d = !0),
                      (p._rawPrevTime = n = !b || a || v === a ? a : h))),
                p._initted || (d = !0))
              : ((p._totalTime = p._time = a),
                0 !== p._repeat &&
                  ((j = u + p._repeatDelay),
                  (p._cycle = (p._totalTime / j) >> 0),
                  0 !== p._cycle &&
                    p._cycle === p._totalTime / j &&
                    a >= s &&
                    p._cycle--,
                  (p._time = p._totalTime - p._cycle * j),
                  p._yoyo &&
                    0 !== (1 & p._cycle) &&
                    ((p._time = u - p._time),
                    (o = p._yoyoEase || p.vars.yoyoEase),
                    o &&
                      (p._yoyoEase ||
                        (o !== !0 || p._initted
                          ? (p._yoyoEase = o =
                              o === !0
                                ? p._ease
                                : o instanceof Ease
                                ? o
                                : Ease.map[o])
                          : ((o = p.vars.ease),
                            (p._yoyoEase = o =
                              o
                                ? o instanceof Ease
                                  ? o
                                  : "function" == typeof o
                                  ? new Ease(o, p.vars.easeParams)
                                  : Ease.map[o] || c.defaultEase
                                : c.defaultEase))),
                      (p.ratio = o ? 1 - o.getRatio((u - p._time) / u) : 0))),
                  p._time > u ? (p._time = u) : p._time < 0 && (p._time = 0)),
                p._easeType && !o
                  ? ((k = p._time / u),
                    (l = p._easeType),
                    (m = p._easePower),
                    (1 === l || (3 === l && k >= 0.5)) && (k = 1 - k),
                    3 === l && (k *= 2),
                    1 === m
                      ? (k *= k)
                      : 2 === m
                      ? (k *= k * k)
                      : 3 === m
                      ? (k *= k * k * k)
                      : 4 === m && (k *= k * k * k * k),
                    (p.ratio =
                      1 === l
                        ? 1 - k
                        : 2 === l
                        ? k
                        : p._time / u < 0.5
                        ? k / 2
                        : 1 - k / 2))
                  : o || (p.ratio = p._ease.getRatio(p._time / u))),
            r === p._time && !d && t === p._cycle)
          )
            return void (
              s !== p._totalTime &&
              p._onUpdate &&
              (b || p._callback("onUpdate"))
            );
          if (!p._initted) {
            if ((p._init(), !p._initted || p._gc)) return;
            if (
              !d &&
              p._firstPT &&
              ((p.vars.lazy !== !1 && p._duration) ||
                (p.vars.lazy && !p._duration))
            )
              return (
                (p._time = r),
                (p._totalTime = s),
                (p._rawPrevTime = v),
                (p._cycle = t),
                i.lazyTweens.push(p),
                void (p._lazy = [a, b])
              );
            !p._time || e || o
              ? e &&
                this._ease._calcEnd &&
                !o &&
                (p.ratio = p._ease.getRatio(0 === p._time ? 0 : 1))
              : (p.ratio = p._ease.getRatio(p._time / u));
          }
          for (
            p._lazy !== !1 && (p._lazy = !1),
              p._active ||
                (!p._paused && p._time !== r && a >= 0 && (p._active = !0)),
              0 === s &&
                (2 === p._initted && a > 0 && p._init(),
                p._startAt &&
                  (a >= 0
                    ? p._startAt.render(a, !0, d)
                    : f || (f = "_dummyGS")),
                p.vars.onStart &&
                  (0 !== p._totalTime || 0 === u) &&
                  (b || p._callback("onStart"))),
              g = p._firstPT;
            g;

          )
            g.f
              ? g.t[g.p](g.c * p.ratio + g.s)
              : (g.t[g.p] = g.c * p.ratio + g.s),
              (g = g._next);
          p._onUpdate &&
            (0 > a && p._startAt && p._startTime && p._startAt.render(a, !0, d),
            b || ((p._totalTime !== s || f) && p._callback("onUpdate"))),
            p._cycle !== t &&
              (b || p._gc || (p.vars.onRepeat && p._callback("onRepeat"))),
            f &&
              (!p._gc || d) &&
              (0 > a &&
                p._startAt &&
                !p._onUpdate &&
                p._startTime &&
                p._startAt.render(a, !0, d),
              e &&
                (p._timeline.autoRemoveChildren && p._enabled(!1, !1),
                (p._active = !1)),
              !b && p.vars[f] && p._callback(f),
              0 === u &&
                p._rawPrevTime === h &&
                n !== h &&
                (p._rawPrevTime = 0));
        }),
        (g.to = function (a, b, c) {
          return new g(a, b, c);
        }),
        (g.from = function (a, b, c) {
          return (
            (c.runBackwards = !0),
            (c.immediateRender = 0 != c.immediateRender),
            new g(a, b, c)
          );
        }),
        (g.fromTo = function (a, b, c, d) {
          return (
            (d.startAt = c),
            (d.immediateRender =
              0 != d.immediateRender && 0 != c.immediateRender),
            new g(a, b, d)
          );
        }),
        (g.staggerTo = g.allTo =
          function (a, b, h, i, l, n, o) {
            var p,
              q,
              r,
              s,
              t = [],
              u = f(h.stagger || i),
              v = h.cycle,
              w = (h.startAt || m).cycle;
            for (
              k(a) ||
                ("string" == typeof a && (a = c.selector(a) || a),
                j(a) && (a = d(a))),
                a = a || [],
                p = a.length - 1,
                r = 0;
              p >= r;
              r++
            ) {
              q = {};
              for (s in h) q[s] = h[s];
              if (
                (v &&
                  (e(q, a, r),
                  null != q.duration && ((b = q.duration), delete q.duration)),
                w)
              ) {
                w = q.startAt = {};
                for (s in h.startAt) w[s] = h.startAt[s];
                e(q.startAt, a, r);
              }
              (q.delay = u(r, a[r], a) + (q.delay || 0)),
                r === p &&
                  l &&
                  (q.onComplete = function () {
                    h.onComplete &&
                      h.onComplete.apply(h.onCompleteScope || this, arguments),
                      l.apply(o || h.callbackScope || this, n || m);
                  }),
                (t[r] = new g(a[r], b, q));
            }
            return t;
          }),
        (g.staggerFrom = g.allFrom =
          function (a, b, c, d, e, f, h) {
            return (
              (c.runBackwards = !0),
              (c.immediateRender = 0 != c.immediateRender),
              g.staggerTo(a, b, c, d, e, f, h)
            );
          }),
        (g.staggerFromTo = g.allFromTo =
          function (a, b, c, d, e, f, h, i) {
            return (
              (d.startAt = c),
              (d.immediateRender =
                0 != d.immediateRender && 0 != c.immediateRender),
              g.staggerTo(a, b, d, e, f, h, i)
            );
          }),
        (g.delayedCall = function (a, b, c, d, e) {
          return new g(b, 0, {
            delay: a,
            onComplete: b,
            onCompleteParams: c,
            callbackScope: d,
            onReverseComplete: b,
            onReverseCompleteParams: c,
            immediateRender: !1,
            useFrames: e,
            overwrite: 0,
          });
        }),
        (g.set = function (a, b) {
          return new g(a, 0, b);
        }),
        (g.isTweening = function (a) {
          return c.getTweensOf(a, !0).length > 0;
        });
      var n = function (a, b) {
          for (var d = [], e = 0, f = a._first; f; )
            f instanceof c
              ? (d[e++] = f)
              : (b && (d[e++] = f), (d = d.concat(n(f, b))), (e = d.length)),
              (f = f._next);
          return d;
        },
        o = (g.getAllTweens = function (b) {
          return n(a._rootTimeline, b).concat(n(a._rootFramesTimeline, b));
        });
      (g.killAll = function (a, c, d, e) {
        null == c && (c = !0), null == d && (d = !0);
        var f,
          g,
          h,
          i = o(0 != e),
          j = i.length,
          k = c && d && e;
        for (h = 0; j > h; h++)
          (g = i[h]),
            (k ||
              g instanceof b ||
              ((f = g.target === g.vars.onComplete) && d) ||
              (c && !f)) &&
              (a
                ? g.totalTime(g._reversed ? 0 : g.totalDuration())
                : g._enabled(!1, !1));
      }),
        (g.killChildTweensOf = function (a, b) {
          if (null != a) {
            var e,
              f,
              h,
              l,
              m,
              n = i.tweenLookup;
            if (
              ("string" == typeof a && (a = c.selector(a) || a),
              j(a) && (a = d(a)),
              k(a))
            )
              for (l = a.length; --l > -1; ) g.killChildTweensOf(a[l], b);
            else {
              e = [];
              for (h in n)
                for (f = n[h].target.parentNode; f; )
                  f === a && (e = e.concat(n[h].tweens)), (f = f.parentNode);
              for (m = e.length, l = 0; m > l; l++)
                b && e[l].totalTime(e[l].totalDuration()),
                  e[l]._enabled(!1, !1);
            }
          }
        });
      var p = function (a, c, d, e) {
        (c = c !== !1), (d = d !== !1), (e = e !== !1);
        for (var f, g, h = o(e), i = c && d && e, j = h.length; --j > -1; )
          (g = h[j]),
            (i ||
              g instanceof b ||
              ((f = g.target === g.vars.onComplete) && d) ||
              (c && !f)) &&
              g.paused(a);
      };
      return (
        (g.pauseAll = function (a, b, c) {
          p(!0, a, b, c);
        }),
        (g.resumeAll = function (a, b, c) {
          p(!1, a, b, c);
        }),
        (g.globalTimeScale = function (b) {
          var d = a._rootTimeline,
            e = c.ticker.time;
          return arguments.length
            ? ((b = b || h),
              (d._startTime = e - ((e - d._startTime) * d._timeScale) / b),
              (d = a._rootFramesTimeline),
              (e = c.ticker.frame),
              (d._startTime = e - ((e - d._startTime) * d._timeScale) / b),
              (d._timeScale = a._rootTimeline._timeScale = b),
              b)
            : d._timeScale;
        }),
        (l.progress = function (a, b) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) +
                  this._cycle * (this._duration + this._repeatDelay),
                b
              )
            : this._time / this.duration();
        }),
        (l.totalProgress = function (a, b) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * a, b)
            : this._totalTime / this.totalDuration();
        }),
        (l.time = function (a, b) {
          if (!arguments.length) return this._time;
          this._dirty && this.totalDuration();
          var c = this._duration,
            d = this._cycle,
            e = d * (c + this._repeatDelay);
          return (
            a > c && (a = c),
            this.totalTime(
              this._yoyo && 1 & d ? c - a + e : this._repeat ? a + e : a,
              b
            )
          );
        }),
        (l.duration = function (b) {
          return arguments.length
            ? a.prototype.duration.call(this, b)
            : this._duration;
        }),
        (l.totalDuration = function (a) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (a - this._repeat * this._repeatDelay) / (this._repeat + 1)
                )
            : (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (l.repeat = function (a) {
          return arguments.length
            ? ((this._repeat = a), this._uncache(!0))
            : this._repeat;
        }),
        (l.repeatDelay = function (a) {
          return arguments.length
            ? ((this._repeatDelay = a), this._uncache(!0))
            : this._repeatDelay;
        }),
        (l.yoyo = function (a) {
          return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
        }),
        g
      );
    },
    !0
  ),
    _gsScope._gsDefine(
      "TimelineLite",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (a, b, c) {
        var d = function (a) {
            b.call(this, a);
            var c,
              d,
              e = this,
              f = e.vars;
            (e._labels = {}),
              (e.autoRemoveChildren = !!f.autoRemoveChildren),
              (e.smoothChildTiming = !!f.smoothChildTiming),
              (e._sortChildren = !0),
              (e._onUpdate = f.onUpdate);
            for (d in f)
              (c = f[d]),
                i(c) &&
                  -1 !== c.join("").indexOf("{self}") &&
                  (f[d] = e._swapSelfInParams(c));
            i(f.tweens) && e.add(f.tweens, 0, f.align, f.stagger);
          },
          e = 1e-8,
          f = c._internals,
          g = (d._internals = {}),
          h = f.isSelector,
          i = f.isArray,
          j = f.lazyTweens,
          k = f.lazyRender,
          l = _gsScope._gsDefine.globals,
          m = function (a) {
            var b,
              c = {};
            for (b in a) c[b] = a[b];
            return c;
          },
          n = function (a, b, c) {
            var d,
              e,
              f = a.cycle;
            for (d in f)
              (e = f[d]),
                (a[d] =
                  "function" == typeof e ? e(c, b[c], b) : e[c % e.length]);
            delete a.cycle;
          },
          o = (g.pauseCallback = function () {}),
          p = function (a) {
            var b,
              c = [],
              d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c;
          },
          q = function (a, b, c, d) {
            var e = "immediateRender";
            return e in b || (b[e] = !((c && c[e] === !1) || d)), b;
          },
          r = function (a) {
            if ("function" == typeof a) return a;
            var b = "object" == typeof a ? a : { each: a },
              c = b.ease,
              d = b.from || 0,
              e = b.base || 0,
              f = {},
              g = isNaN(d),
              h = b.axis,
              i = { center: 0.5, end: 1 }[d] || 0;
            return function (a, j, k) {
              var l,
                m,
                n,
                o,
                p,
                q,
                r,
                s,
                t,
                u = (k || b).length,
                v = f[u];
              if (!v) {
                if (
                  ((t = "auto" === b.grid ? 0 : (b.grid || [1 / 0])[0]), !t)
                ) {
                  for (
                    r = -(1 / 0);
                    r < (r = k[t++].getBoundingClientRect().left) && u > t;

                  );
                  t--;
                }
                for (
                  v = f[u] = [],
                    l = g ? Math.min(t, u) * i - 0.5 : d % t,
                    m = g ? (u * i) / t - 0.5 : (d / t) | 0,
                    r = 0,
                    s = 1 / 0,
                    q = 0;
                  u > q;
                  q++
                )
                  (n = (q % t) - l),
                    (o = m - ((q / t) | 0)),
                    (v[q] = p =
                      h
                        ? Math.abs("y" === h ? o : n)
                        : Math.sqrt(n * n + o * o)),
                    p > r && (r = p),
                    s > p && (s = p);
                (v.max = r - s),
                  (v.min = s),
                  (v.v = u =
                    b.amount ||
                    b.each *
                      (t > u
                        ? u
                        : h
                        ? "y" === h
                          ? u / t
                          : t
                        : Math.max(t, u / t)) ||
                    0),
                  (v.b = 0 > u ? e - u : e);
              }
              return (
                (u = (v[a] - v.min) / v.max),
                v.b + (c ? c.getRatio(u) : u) * v.v
              );
            };
          },
          s = (d.prototype = new b());
        return (
          (d.version = "2.1.2"),
          (d.distribute = r),
          (s.constructor = d),
          (s.kill()._gc = s._forcingPlayhead = s._hasPause = !1),
          (s.to = function (a, b, d, e) {
            var f = (d.repeat && l.TweenMax) || c;
            return b ? this.add(new f(a, b, d), e) : this.set(a, d, e);
          }),
          (s.from = function (a, b, d, e) {
            return this.add(
              ((d.repeat && l.TweenMax) || c).from(a, b, q(this, d)),
              e
            );
          }),
          (s.fromTo = function (a, b, d, e, f) {
            var g = (e.repeat && l.TweenMax) || c;
            return (
              (e = q(this, e, d)),
              b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
            );
          }),
          (s.staggerTo = function (a, b, e, f, g, i, j, k) {
            var l,
              o,
              q = new d({
                onComplete: i,
                onCompleteParams: j,
                callbackScope: k,
                smoothChildTiming: this.smoothChildTiming,
              }),
              s = r(e.stagger || f),
              t = e.startAt,
              u = e.cycle;
            for (
              "string" == typeof a && (a = c.selector(a) || a),
                a = a || [],
                h(a) && (a = p(a)),
                o = 0;
              o < a.length;
              o++
            )
              (l = m(e)),
                t && ((l.startAt = m(t)), t.cycle && n(l.startAt, a, o)),
                u &&
                  (n(l, a, o),
                  null != l.duration && ((b = l.duration), delete l.duration)),
                q.to(a[o], b, l, s(o, a[o], a));
            return this.add(q, g);
          }),
          (s.staggerFrom = function (a, b, c, d, e, f, g, h) {
            return (
              (c.runBackwards = !0),
              this.staggerTo(a, b, q(this, c), d, e, f, g, h)
            );
          }),
          (s.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
            return (
              (d.startAt = c),
              this.staggerTo(a, b, q(this, d, c), e, f, g, h, i)
            );
          }),
          (s.call = function (a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e);
          }),
          (s.set = function (a, b, d) {
            return this.add(new c(a, 0, q(this, b, null, !0)), d);
          }),
          (d.exportRoot = function (a, b) {
            (a = a || {}),
              null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var e,
              f,
              g,
              h,
              i = new d(a),
              j = i._timeline;
            for (
              null == b && (b = !0),
                j._remove(i, !0),
                i._startTime = 0,
                i._rawPrevTime = i._time = i._totalTime = j._time,
                g = j._first;
              g;

            )
              (h = g._next),
                (b && g instanceof c && g.target === g.vars.onComplete) ||
                  ((f = g._startTime - g._delay),
                  0 > f && (e = 1),
                  i.add(g, f)),
                (g = h);
            return j.add(i, 0), e && i.totalDuration(), i;
          }),
          (s.add = function (e, f, g, h) {
            var j,
              k,
              l,
              m,
              n,
              o,
              p = this;
            if (
              ("number" != typeof f && (f = p._parseTimeOrLabel(f, 0, !0, e)),
              !(e instanceof a))
            ) {
              if (e instanceof Array || (e && e.push && i(e))) {
                for (
                  g = g || "normal", h = h || 0, j = f, k = e.length, l = 0;
                  k > l;
                  l++
                )
                  i((m = e[l])) && (m = new d({ tweens: m })),
                    p.add(m, j),
                    "string" != typeof m &&
                      "function" != typeof m &&
                      ("sequence" === g
                        ? (j = m._startTime + m.totalDuration() / m._timeScale)
                        : "start" === g && (m._startTime -= m.delay())),
                    (j += h);
                return p._uncache(!0);
              }
              if ("string" == typeof e) return p.addLabel(e, f);
              if ("function" != typeof e)
                throw (
                  "Cannot add " +
                  e +
                  " into the timeline; it is not a tween, timeline, function, or string."
                );
              e = c.delayedCall(0, e);
            }
            if (
              (b.prototype.add.call(p, e, f),
              (e._time || (!e._duration && e._initted)) &&
                ((j = (p.rawTime() - e._startTime) * e._timeScale),
                (!e._duration ||
                  Math.abs(Math.max(0, Math.min(e.totalDuration(), j))) -
                    e._totalTime >
                    1e-5) &&
                  e.render(j, !1, !1)),
              (p._gc || p._time === p._duration) &&
                !p._paused &&
                p._duration < p.duration())
            )
              for (n = p, o = n.rawTime() > e._startTime; n._timeline; )
                o && n._timeline.smoothChildTiming
                  ? n.totalTime(n._totalTime, !0)
                  : n._gc && n._enabled(!0, !1),
                  (n = n._timeline);
            return p;
          }),
          (s.remove = function (b) {
            if (b instanceof a) {
              this._remove(b, !1);
              var c = (b._timeline = b.vars.useFrames
                ? a._rootFramesTimeline
                : a._rootTimeline);
              return (
                (b._startTime =
                  (b._paused ? b._pauseTime : c._time) -
                  (b._reversed
                    ? b.totalDuration() - b._totalTime
                    : b._totalTime) /
                    b._timeScale),
                this
              );
            }
            if (b instanceof Array || (b && b.push && i(b))) {
              for (var d = b.length; --d > -1; ) this.remove(b[d]);
              return this;
            }
            return "string" == typeof b
              ? this.removeLabel(b)
              : this.kill(null, b);
          }),
          (s._remove = function (a, c) {
            b.prototype._remove.call(this, a, c);
            var d = this._last;
            return (
              d
                ? this._time > this.duration() &&
                  ((this._time = this._duration),
                  (this._totalTime = this._totalDuration))
                : (this._time =
                    this._totalTime =
                    this._duration =
                    this._totalDuration =
                      0),
              this
            );
          }),
          (s.append = function (a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a));
          }),
          (s.insert = s.insertMultiple =
            function (a, b, c, d) {
              return this.add(a, b || 0, c, d);
            }),
          (s.appendMultiple = function (a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d);
          }),
          (s.addLabel = function (a, b) {
            return (this._labels[a] = this._parseTimeOrLabel(b)), this;
          }),
          (s.addPause = function (a, b, d, e) {
            var f = c.delayedCall(0, o, d, e || this);
            return (
              (f.vars.onComplete = f.vars.onReverseComplete = b),
              (f.data = "isPause"),
              (this._hasPause = !0),
              this.add(f, a)
            );
          }),
          (s.removeLabel = function (a) {
            return delete this._labels[a], this;
          }),
          (s.getLabelTime = function (a) {
            return null != this._labels[a] ? this._labels[a] : -1;
          }),
          (s._parseTimeOrLabel = function (b, c, d, e) {
            var f, g;
            if (e instanceof a && e.timeline === this) this.remove(e);
            else if (e && (e instanceof Array || (e.push && i(e))))
              for (g = e.length; --g > -1; )
                e[g] instanceof a &&
                  e[g].timeline === this &&
                  this.remove(e[g]);
            if (
              ((f =
                "number" != typeof b || c
                  ? this.duration() > 99999999999
                    ? this.recent().endTime(!1)
                    : this._duration
                  : 0),
              "string" == typeof c)
            )
              return this._parseTimeOrLabel(
                c,
                d && "number" == typeof b && null == this._labels[c]
                  ? b - f
                  : 0,
                d
              );
            if (
              ((c = c || 0),
              "string" != typeof b || (!isNaN(b) && null == this._labels[b]))
            )
              null == b && (b = f);
            else {
              if (((g = b.indexOf("=")), -1 === g))
                return null == this._labels[b]
                  ? d
                    ? (this._labels[b] = f + c)
                    : c
                  : this._labels[b] + c;
              (c =
                parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1))),
                (b =
                  g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f);
            }
            return Number(b) + c;
          }),
          (s.seek = function (a, b) {
            return this.totalTime(
              "number" == typeof a ? a : this._parseTimeOrLabel(a),
              b !== !1
            );
          }),
          (s.stop = function () {
            return this.paused(!0);
          }),
          (s.gotoAndPlay = function (a, b) {
            return this.play(a, b);
          }),
          (s.gotoAndStop = function (a, b) {
            return this.pause(a, b);
          }),
          (s.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d,
              f,
              g,
              h,
              i,
              l,
              m,
              n,
              o = this,
              p = o._time,
              q = o._dirty ? o.totalDuration() : o._totalDuration,
              r = o._startTime,
              s = o._timeScale,
              t = o._paused;
            if ((p !== o._time && (a += o._time - p), a >= q - e && a >= 0))
              (o._totalTime = o._time = q),
                o._reversed ||
                  o._hasPausedChild() ||
                  ((f = !0),
                  (h = "onComplete"),
                  (i = !!o._timeline.autoRemoveChildren),
                  0 === o._duration &&
                    ((0 >= a && a >= -e) ||
                      o._rawPrevTime < 0 ||
                      o._rawPrevTime === e) &&
                    o._rawPrevTime !== a &&
                    o._first &&
                    ((i = !0),
                    o._rawPrevTime > e && (h = "onReverseComplete"))),
                (o._rawPrevTime =
                  o._duration || !b || a || o._rawPrevTime === a ? a : e),
                (a = q + 1e-4);
            else if (e > a)
              if (
                ((o._totalTime = o._time = 0),
                a > -e && (a = 0),
                (0 !== p ||
                  (0 === o._duration &&
                    o._rawPrevTime !== e &&
                    (o._rawPrevTime > 0 || (0 > a && o._rawPrevTime >= 0)))) &&
                  ((h = "onReverseComplete"), (f = o._reversed)),
                0 > a)
              )
                (o._active = !1),
                  o._timeline.autoRemoveChildren && o._reversed
                    ? ((i = f = !0), (h = "onReverseComplete"))
                    : o._rawPrevTime >= 0 && o._first && (i = !0),
                  (o._rawPrevTime = a);
              else {
                if (
                  ((o._rawPrevTime =
                    o._duration || !b || a || o._rawPrevTime === a ? a : e),
                  0 === a && f)
                )
                  for (d = o._first; d && 0 === d._startTime; )
                    d._duration || (f = !1), (d = d._next);
                (a = 0), o._initted || (i = !0);
              }
            else {
              if (o._hasPause && !o._forcingPlayhead && !b) {
                if (a >= p)
                  for (d = o._first; d && d._startTime <= a && !l; )
                    d._duration ||
                      "isPause" !== d.data ||
                      d.ratio ||
                      (0 === d._startTime && 0 === o._rawPrevTime) ||
                      (l = d),
                      (d = d._next);
                else
                  for (d = o._last; d && d._startTime >= a && !l; )
                    d._duration ||
                      ("isPause" === d.data && d._rawPrevTime > 0 && (l = d)),
                      (d = d._prev);
                l &&
                  ((o._time = o._totalTime = a = l._startTime),
                  (n = o._startTime + a / o._timeScale));
              }
              o._totalTime = o._time = o._rawPrevTime = a;
            }
            if ((o._time !== p && o._first) || c || i || l) {
              if (
                (o._initted || (o._initted = !0),
                o._active ||
                  (!o._paused && o._time !== p && a > 0 && (o._active = !0)),
                0 === p &&
                  o.vars.onStart &&
                  ((0 === o._time && o._duration) ||
                    b ||
                    o._callback("onStart")),
                (m = o._time),
                m >= p)
              )
                for (
                  d = o._first;
                  d && ((g = d._next), m === o._time && (!o._paused || t));

                )
                  (d._active || (d._startTime <= m && !d._paused && !d._gc)) &&
                    (l === d && (o.pause(), (o._pauseTime = n)),
                    d._reversed
                      ? d.render(
                          (d._dirty ? d.totalDuration() : d._totalDuration) -
                            (a - d._startTime) * d._timeScale,
                          b,
                          c
                        )
                      : d.render((a - d._startTime) * d._timeScale, b, c)),
                    (d = g);
              else
                for (
                  d = o._last;
                  d && ((g = d._prev), m === o._time && (!o._paused || t));

                ) {
                  if (
                    d._active ||
                    (d._startTime <= p && !d._paused && !d._gc)
                  ) {
                    if (l === d) {
                      for (l = d._prev; l && l.endTime() > o._time; )
                        l.render(
                          l._reversed
                            ? l.totalDuration() -
                                (a - l._startTime) * l._timeScale
                            : (a - l._startTime) * l._timeScale,
                          b,
                          c
                        ),
                          (l = l._prev);
                      (l = null), o.pause(), (o._pauseTime = n);
                    }
                    d._reversed
                      ? d.render(
                          (d._dirty ? d.totalDuration() : d._totalDuration) -
                            (a - d._startTime) * d._timeScale,
                          b,
                          c
                        )
                      : d.render((a - d._startTime) * d._timeScale, b, c);
                  }
                  d = g;
                }
              o._onUpdate && (b || (j.length && k(), o._callback("onUpdate"))),
                h &&
                  (o._gc ||
                    ((r === o._startTime || s !== o._timeScale) &&
                      (0 === o._time || q >= o.totalDuration()) &&
                      (f &&
                        (j.length && k(),
                        o._timeline.autoRemoveChildren && o._enabled(!1, !1),
                        (o._active = !1)),
                      !b && o.vars[h] && o._callback(h))));
            }
          }),
          (s._hasPausedChild = function () {
            for (var a = this._first; a; ) {
              if (a._paused || (a instanceof d && a._hasPausedChild()))
                return !0;
              a = a._next;
            }
            return !1;
          }),
          (s.getChildren = function (a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g; )
              g._startTime < e ||
                (g instanceof c
                  ? b !== !1 && (f[h++] = g)
                  : (d !== !1 && (f[h++] = g),
                    a !== !1 &&
                      ((f = f.concat(g.getChildren(!0, b, d))),
                      (h = f.length)))),
                (g = g._next);
            return f;
          }),
          (s.getTweensOf = function (a, b) {
            var d,
              e,
              f = this._gc,
              g = [],
              h = 0;
            for (
              f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length;
              --e > -1;

            )
              (d[e].timeline === this || (b && this._contains(d[e]))) &&
                (g[h++] = d[e]);
            return f && this._enabled(!1, !0), g;
          }),
          (s.recent = function () {
            return this._recent;
          }),
          (s._contains = function (a) {
            for (var b = a.timeline; b; ) {
              if (b === this) return !0;
              b = b.timeline;
            }
            return !1;
          }),
          (s.shiftChildren = function (a, b, c) {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e; )
              e._startTime >= c && (e._startTime += a), (e = e._next);
            if (b) for (d in f) f[d] >= c && (f[d] += a);
            return this._uncache(!0);
          }),
          (s._kill = function (a, b) {
            if (!a && !b) return this._enabled(!1, !1);
            for (
              var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1),
                d = c.length,
                e = !1;
              --d > -1;

            )
              c[d]._kill(a, b) && (e = !0);
            return e;
          }),
          (s.clear = function (a) {
            var b = this.getChildren(!1, !0, !0),
              c = b.length;
            for (this._time = this._totalTime = 0; --c > -1; )
              b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}), this._uncache(!0);
          }),
          (s.invalidate = function () {
            for (var b = this._first; b; ) b.invalidate(), (b = b._next);
            return a.prototype.invalidate.call(this);
          }),
          (s._enabled = function (a, c) {
            if (a === this._gc)
              for (var d = this._first; d; ) d._enabled(a, !0), (d = d._next);
            return b.prototype._enabled.call(this, a, c);
          }),
          (s.totalTime = function (b, c, d) {
            this._forcingPlayhead = !0;
            var e = a.prototype.totalTime.apply(this, arguments);
            return (this._forcingPlayhead = !1), e;
          }),
          (s.duration = function (a) {
            return arguments.length
              ? (0 !== this.duration() &&
                  0 !== a &&
                  this.timeScale(this._duration / a),
                this)
              : (this._dirty && this.totalDuration(), this._duration);
          }),
          (s.totalDuration = function (a) {
            if (!arguments.length) {
              if (this._dirty) {
                for (
                  var b, c, d = 0, e = this, f = e._last, g = 999999999999;
                  f;

                )
                  (b = f._prev),
                    f._dirty && f.totalDuration(),
                    f._startTime > g &&
                    e._sortChildren &&
                    !f._paused &&
                    !e._calculatingDuration
                      ? ((e._calculatingDuration = 1),
                        e.add(f, f._startTime - f._delay),
                        (e._calculatingDuration = 0))
                      : (g = f._startTime),
                    f._startTime < 0 &&
                      !f._paused &&
                      ((d -= f._startTime),
                      e._timeline.smoothChildTiming &&
                        ((e._startTime += f._startTime / e._timeScale),
                        (e._time -= f._startTime),
                        (e._totalTime -= f._startTime),
                        (e._rawPrevTime -= f._startTime)),
                      e.shiftChildren(-f._startTime, !1, -9999999999),
                      (g = 0)),
                    (c = f._startTime + f._totalDuration / f._timeScale),
                    c > d && (d = c),
                    (f = b);
                (e._duration = e._totalDuration = d), (e._dirty = !1);
              }
              return this._totalDuration;
            }
            return a && this.totalDuration()
              ? this.timeScale(this._totalDuration / a)
              : this;
          }),
          (s.paused = function (b) {
            if (b === !1 && this._paused)
              for (var c = this._first; c; )
                c._startTime === this._time &&
                  "isPause" === c.data &&
                  (c._rawPrevTime = 0),
                  (c = c._next);
            return a.prototype.paused.apply(this, arguments);
          }),
          (s.usesFrames = function () {
            for (var b = this._timeline; b._timeline; ) b = b._timeline;
            return b === a._rootFramesTimeline;
          }),
          (s.rawTime = function (a) {
            return a &&
              (this._paused ||
                (this._repeat && this.time() > 0 && this.totalProgress() < 1))
              ? this._totalTime % (this._duration + this._repeatDelay)
              : this._paused
              ? this._totalTime
              : (this._timeline.rawTime(a) - this._startTime) * this._timeScale;
          }),
          d
        );
      },
      !0
    ),
    _gsScope._gsDefine(
      "TimelineMax",
      ["TimelineLite", "TweenLite", "easing.Ease"],
      function (a, b, c) {
        var d = function (b) {
            a.call(this, b),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._cycle = 0),
              (this._yoyo = !!this.vars.yoyo),
              (this._dirty = !0);
          },
          e = 1e-8,
          f = b._internals,
          g = f.lazyTweens,
          h = f.lazyRender,
          i = _gsScope._gsDefine.globals,
          j = new c(null, null, 1, 0),
          k = (d.prototype = new a());
        return (
          (k.constructor = d),
          (k.kill()._gc = !1),
          (d.version = "2.1.2"),
          (k.invalidate = function () {
            return (
              (this._yoyo = !!this.vars.yoyo),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._uncache(!0),
              a.prototype.invalidate.call(this)
            );
          }),
          (k.addCallback = function (a, c, d, e) {
            return this.add(b.delayedCall(0, a, d, e), c);
          }),
          (k.removeCallback = function (a, b) {
            if (a)
              if (null == b) this._kill(null, a);
              else
                for (
                  var c = this.getTweensOf(a, !1),
                    d = c.length,
                    e = this._parseTimeOrLabel(b);
                  --d > -1;

                )
                  c[d]._startTime === e && c[d]._enabled(!1, !1);
            return this;
          }),
          (k.removePause = function (b) {
            return this.removeCallback(a._internals.pauseCallback, b);
          }),
          (k.tweenTo = function (a, c) {
            c = c || {};
            var d,
              e,
              f,
              g = {
                ease: j,
                useFrames: this.usesFrames(),
                immediateRender: !1,
                lazy: !1,
              },
              h = (c.repeat && i.TweenMax) || b;
            for (e in c) g[e] = c[e];
            return (
              (g.time = this._parseTimeOrLabel(a)),
              (d =
                Math.abs(Number(g.time) - this._time) / this._timeScale ||
                0.001),
              (f = new h(this, d, g)),
              (g.onStart = function () {
                f.target.paused(!0),
                  f.vars.time === f.target.time() ||
                    d !== f.duration() ||
                    f.isFromTo ||
                    f
                      .duration(
                        Math.abs(f.vars.time - f.target.time()) /
                          f.target._timeScale
                      )
                      .render(f.time(), !0, !0),
                  c.onStart &&
                    c.onStart.apply(
                      c.onStartScope || c.callbackScope || f,
                      c.onStartParams || []
                    );
              }),
              f
            );
          }),
          (k.tweenFromTo = function (a, b, c) {
            (c = c || {}),
              (a = this._parseTimeOrLabel(a)),
              (c.startAt = {
                onComplete: this.seek,
                onCompleteParams: [a],
                callbackScope: this,
              }),
              (c.immediateRender = c.immediateRender !== !1);
            var d = this.tweenTo(b, c);
            return (
              (d.isFromTo = 1),
              d.duration(Math.abs(d.vars.time - a) / this._timeScale || 0.001)
            );
          }),
          (k.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d,
              f,
              i,
              j,
              k,
              l,
              m,
              n,
              o,
              p = this,
              q = p._time,
              r = p._dirty ? p.totalDuration() : p._totalDuration,
              s = p._duration,
              t = p._totalTime,
              u = p._startTime,
              v = p._timeScale,
              w = p._rawPrevTime,
              x = p._paused,
              y = p._cycle;
            if ((q !== p._time && (a += p._time - q), a >= r - e && a >= 0))
              p._locked || ((p._totalTime = r), (p._cycle = p._repeat)),
                p._reversed ||
                  p._hasPausedChild() ||
                  ((f = !0),
                  (j = "onComplete"),
                  (k = !!p._timeline.autoRemoveChildren),
                  0 === p._duration &&
                    ((0 >= a && a >= -e) || 0 > w || w === e) &&
                    w !== a &&
                    p._first &&
                    ((k = !0), w > e && (j = "onReverseComplete"))),
                (p._rawPrevTime =
                  p._duration || !b || a || p._rawPrevTime === a ? a : e),
                p._yoyo && 1 & p._cycle
                  ? (p._time = a = 0)
                  : ((p._time = s), (a = s + 1e-4));
            else if (e > a)
              if (
                (p._locked || (p._totalTime = p._cycle = 0),
                (p._time = 0),
                a > -e && (a = 0),
                (0 !== q ||
                  (0 === s &&
                    w !== e &&
                    (w > 0 || (0 > a && w >= 0)) &&
                    !p._locked)) &&
                  ((j = "onReverseComplete"), (f = p._reversed)),
                0 > a)
              )
                (p._active = !1),
                  p._timeline.autoRemoveChildren && p._reversed
                    ? ((k = f = !0), (j = "onReverseComplete"))
                    : w >= 0 && p._first && (k = !0),
                  (p._rawPrevTime = a);
              else {
                if (
                  ((p._rawPrevTime =
                    s || !b || a || p._rawPrevTime === a ? a : e),
                  0 === a && f)
                )
                  for (d = p._first; d && 0 === d._startTime; )
                    d._duration || (f = !1), (d = d._next);
                (a = 0), p._initted || (k = !0);
              }
            else if (
              (0 === s && 0 > w && (k = !0),
              (p._time = p._rawPrevTime = a),
              p._locked ||
                ((p._totalTime = a),
                0 !== p._repeat &&
                  ((l = s + p._repeatDelay),
                  (p._cycle = (p._totalTime / l) >> 0),
                  p._cycle &&
                    p._cycle === p._totalTime / l &&
                    a >= t &&
                    p._cycle--,
                  (p._time = p._totalTime - p._cycle * l),
                  p._yoyo && 1 & p._cycle && (p._time = s - p._time),
                  p._time > s
                    ? ((p._time = s), (a = s + 1e-4))
                    : p._time < 0
                    ? (p._time = a = 0)
                    : (a = p._time))),
              p._hasPause && !p._forcingPlayhead && !b)
            ) {
              if (((a = p._time), a >= q || (p._repeat && y !== p._cycle)))
                for (d = p._first; d && d._startTime <= a && !m; )
                  d._duration ||
                    "isPause" !== d.data ||
                    d.ratio ||
                    (0 === d._startTime && 0 === p._rawPrevTime) ||
                    (m = d),
                    (d = d._next);
              else
                for (d = p._last; d && d._startTime >= a && !m; )
                  d._duration ||
                    ("isPause" === d.data && d._rawPrevTime > 0 && (m = d)),
                    (d = d._prev);
              m &&
                ((o = p._startTime + m._startTime / p._timeScale),
                m._startTime < s &&
                  ((p._time = p._rawPrevTime = a = m._startTime),
                  (p._totalTime =
                    a + p._cycle * (p._totalDuration + p._repeatDelay))));
            }
            if (p._cycle !== y && !p._locked) {
              var z = p._yoyo && 0 !== (1 & y),
                A = z === (p._yoyo && 0 !== (1 & p._cycle)),
                B = p._totalTime,
                C = p._cycle,
                D = p._rawPrevTime,
                E = p._time;
              if (
                ((p._totalTime = y * s),
                p._cycle < y ? (z = !z) : (p._totalTime += s),
                (p._time = q),
                (p._rawPrevTime = 0 === s ? w - 1e-4 : w),
                (p._cycle = y),
                (p._locked = !0),
                (q = z ? 0 : s),
                p.render(q, b, 0 === s),
                b ||
                  p._gc ||
                  (p.vars.onRepeat &&
                    ((p._cycle = C),
                    (p._locked = !1),
                    p._callback("onRepeat"))),
                q !== p._time)
              )
                return;
              if (
                (A &&
                  ((p._cycle = y),
                  (p._locked = !0),
                  (q = z ? s + 1e-4 : -1e-4),
                  p.render(q, !0, !1)),
                (p._locked = !1),
                p._paused && !x)
              )
                return;
              (p._time = E),
                (p._totalTime = B),
                (p._cycle = C),
                (p._rawPrevTime = D);
            }
            if (!((p._time !== q && p._first) || c || k || m))
              return void (
                t !== p._totalTime &&
                p._onUpdate &&
                (b || p._callback("onUpdate"))
              );
            if (
              (p._initted || (p._initted = !0),
              p._active ||
                (!p._paused && p._totalTime !== t && a > 0 && (p._active = !0)),
              0 === t &&
                p.vars.onStart &&
                ((0 === p._totalTime && p._totalDuration) ||
                  b ||
                  p._callback("onStart")),
              (n = p._time),
              n >= q)
            )
              for (
                d = p._first;
                d && ((i = d._next), n === p._time && (!p._paused || x));

              )
                (d._active ||
                  (d._startTime <= p._time && !d._paused && !d._gc)) &&
                  (m === d && (p.pause(), (p._pauseTime = o)),
                  d._reversed
                    ? d.render(
                        (d._dirty ? d.totalDuration() : d._totalDuration) -
                          (a - d._startTime) * d._timeScale,
                        b,
                        c
                      )
                    : d.render((a - d._startTime) * d._timeScale, b, c)),
                  (d = i);
            else
              for (
                d = p._last;
                d && ((i = d._prev), n === p._time && (!p._paused || x));

              ) {
                if (d._active || (d._startTime <= q && !d._paused && !d._gc)) {
                  if (m === d) {
                    for (m = d._prev; m && m.endTime() > p._time; )
                      m.render(
                        m._reversed
                          ? m.totalDuration() -
                              (a - m._startTime) * m._timeScale
                          : (a - m._startTime) * m._timeScale,
                        b,
                        c
                      ),
                        (m = m._prev);
                    (m = null), p.pause(), (p._pauseTime = o);
                  }
                  d._reversed
                    ? d.render(
                        (d._dirty ? d.totalDuration() : d._totalDuration) -
                          (a - d._startTime) * d._timeScale,
                        b,
                        c
                      )
                    : d.render((a - d._startTime) * d._timeScale, b, c);
                }
                d = i;
              }
            p._onUpdate && (b || (g.length && h(), p._callback("onUpdate"))),
              j &&
                (p._locked ||
                  p._gc ||
                  ((u === p._startTime || v !== p._timeScale) &&
                    (0 === p._time || r >= p.totalDuration()) &&
                    (f &&
                      (g.length && h(),
                      p._timeline.autoRemoveChildren && p._enabled(!1, !1),
                      (p._active = !1)),
                    !b && p.vars[j] && p._callback(j))));
          }),
          (k.getActive = function (a, b, c) {
            var d,
              e,
              f = [],
              g = this.getChildren(a || null == a, b || null == a, !!c),
              h = 0,
              i = g.length;
            for (d = 0; i > d; d++) (e = g[d]), e.isActive() && (f[h++] = e);
            return f;
          }),
          (k.getLabelAfter = function (a) {
            a || (0 !== a && (a = this._time));
            var b,
              c = this.getLabelsArray(),
              d = c.length;
            for (b = 0; d > b; b++) if (c[b].time > a) return c[b].name;
            return null;
          }),
          (k.getLabelBefore = function (a) {
            null == a && (a = this._time);
            for (var b = this.getLabelsArray(), c = b.length; --c > -1; )
              if (b[c].time < a) return b[c].name;
            return null;
          }),
          (k.getLabelsArray = function () {
            var a,
              b = [],
              c = 0;
            for (a in this._labels) b[c++] = { time: this._labels[a], name: a };
            return (
              b.sort(function (a, b) {
                return a.time - b.time;
              }),
              b
            );
          }),
          (k.invalidate = function () {
            return (this._locked = !1), a.prototype.invalidate.call(this);
          }),
          (k.progress = function (a, b) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) +
                    this._cycle * (this._duration + this._repeatDelay),
                  b
                )
              : this._time / this.duration() || 0;
          }),
          (k.totalProgress = function (a, b) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * a, b)
              : this._totalTime / this.totalDuration() || 0;
          }),
          (k.totalDuration = function (b) {
            return arguments.length
              ? -1 !== this._repeat && b
                ? this.timeScale(this.totalDuration() / b)
                : this
              : (this._dirty &&
                  (a.prototype.totalDuration.call(this),
                  (this._totalDuration =
                    -1 === this._repeat
                      ? 999999999999
                      : this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat)),
                this._totalDuration);
          }),
          (k.time = function (a, b) {
            if (!arguments.length) return this._time;
            this._dirty && this.totalDuration();
            var c = this._duration,
              d = this._cycle,
              e = d * (c + this._repeatDelay);
            return (
              a > c && (a = c),
              this.totalTime(
                this._yoyo && 1 & d ? c - a + e : this._repeat ? a + e : a,
                b
              )
            );
          }),
          (k.repeat = function (a) {
            return arguments.length
              ? ((this._repeat = a), this._uncache(!0))
              : this._repeat;
          }),
          (k.repeatDelay = function (a) {
            return arguments.length
              ? ((this._repeatDelay = a), this._uncache(!0))
              : this._repeatDelay;
          }),
          (k.yoyo = function (a) {
            return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
          }),
          (k.currentLabel = function (a) {
            return arguments.length
              ? this.seek(a, !0)
              : this.getLabelBefore(this._time + e);
          }),
          d
        );
      },
      !0
    ),
    (function () {
      var a = 180 / Math.PI,
        b = [],
        c = [],
        d = [],
        e = {},
        f = _gsScope._gsDefine.globals,
        g = function (a, b, c, d) {
          c === d && (c = d - (d - b) / 1e6),
            a === b && (b = a + (c - a) / 1e6),
            (this.a = a),
            (this.b = b),
            (this.c = c),
            (this.d = d),
            (this.da = d - a),
            (this.ca = c - a),
            (this.ba = b - a);
        },
        h =
          ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
        i = function (a, b, c, d) {
          var e = { a: a },
            f = {},
            g = {},
            h = { c: d },
            i = (a + b) / 2,
            j = (b + c) / 2,
            k = (c + d) / 2,
            l = (i + j) / 2,
            m = (j + k) / 2,
            n = (m - l) / 8;
          return (
            (e.b = i + (a - i) / 4),
            (f.b = l + n),
            (e.c = f.a = (e.b + f.b) / 2),
            (f.c = g.a = (l + m) / 2),
            (g.b = m - n),
            (h.b = k + (d - k) / 4),
            (g.c = h.a = (g.b + h.b) / 2),
            [e, f, g, h]
          );
        },
        j = function (a, e, f, g, h) {
          var j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w = a.length - 1,
            x = 0,
            y = a[0].a;
          for (j = 0; w > j; j++)
            (n = a[x]),
              (k = n.a),
              (l = n.d),
              (m = a[x + 1].d),
              h
                ? ((t = b[j]),
                  (u = c[j]),
                  (v = ((u + t) * e * 0.25) / (g ? 0.5 : d[j] || 0.5)),
                  (o = l - (l - k) * (g ? 0.5 * e : 0 !== t ? v / t : 0)),
                  (p = l + (m - l) * (g ? 0.5 * e : 0 !== u ? v / u : 0)),
                  (q =
                    l - (o + (((p - o) * ((3 * t) / (t + u) + 0.5)) / 4 || 0))))
                : ((o = l - (l - k) * e * 0.5),
                  (p = l + (m - l) * e * 0.5),
                  (q = l - (o + p) / 2)),
              (o += q),
              (p += q),
              (n.c = r = o),
              0 !== j ? (n.b = y) : (n.b = y = n.a + 0.6 * (n.c - n.a)),
              (n.da = l - k),
              (n.ca = r - k),
              (n.ba = y - k),
              f
                ? ((s = i(k, y, r, l)),
                  a.splice(x, 1, s[0], s[1], s[2], s[3]),
                  (x += 4))
                : x++,
              (y = p);
          (n = a[x]),
            (n.b = y),
            (n.c = y + 0.4 * (n.d - y)),
            (n.da = n.d - n.a),
            (n.ca = n.c - n.a),
            (n.ba = y - n.a),
            f &&
              ((s = i(n.a, y, n.c, n.d)),
              a.splice(x, 1, s[0], s[1], s[2], s[3]));
        },
        k = function (a, d, e, f) {
          var h,
            i,
            j,
            k,
            l,
            m,
            n = [];
          if (f)
            for (a = [f].concat(a), i = a.length; --i > -1; )
              "string" == typeof (m = a[i][d]) &&
                "=" === m.charAt(1) &&
                (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
          if (((h = a.length - 2), 0 > h))
            return (n[0] = new g(a[0][d], 0, 0, a[0][d])), n;
          for (i = 0; h > i; i++)
            (j = a[i][d]),
              (k = a[i + 1][d]),
              (n[i] = new g(j, 0, 0, k)),
              e &&
                ((l = a[i + 2][d]),
                (b[i] = (b[i] || 0) + (k - j) * (k - j)),
                (c[i] = (c[i] || 0) + (l - k) * (l - k)));
          return (n[i] = new g(a[i][d], 0, 0, a[i + 1][d])), n;
        },
        l = function (a, f, g, i, l, m) {
          var n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v = {},
            w = [],
            x = m || a[0];
          (l = "string" == typeof l ? "," + l + "," : h), null == f && (f = 1);
          for (o in a[0]) w.push(o);
          if (a.length > 1) {
            for (u = a[a.length - 1], t = !0, n = w.length; --n > -1; )
              if (((o = w[n]), Math.abs(x[o] - u[o]) > 0.05)) {
                t = !1;
                break;
              }
            t &&
              ((a = a.concat()),
              m && a.unshift(m),
              a.push(a[1]),
              (m = a[a.length - 3]));
          }
          for (b.length = c.length = d.length = 0, n = w.length; --n > -1; )
            (o = w[n]),
              (e[o] = -1 !== l.indexOf("," + o + ",")),
              (v[o] = k(a, o, e[o], m));
          for (n = b.length; --n > -1; )
            (b[n] = Math.sqrt(b[n])), (c[n] = Math.sqrt(c[n]));
          if (!i) {
            for (n = w.length; --n > -1; )
              if (e[o])
                for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++)
                  (r = p[q + 1].da / c[q] + p[q].da / b[q] || 0),
                    (d[q] = (d[q] || 0) + r * r);
            for (n = d.length; --n > -1; ) d[n] = Math.sqrt(d[n]);
          }
          for (n = w.length, q = g ? 4 : 1; --n > -1; )
            (o = w[n]),
              (p = v[o]),
              j(p, f, g, i, e[o]),
              t && (p.splice(0, q), p.splice(p.length - q, q));
          return v;
        },
        m = function (a, b, c) {
          b = b || "soft";
          var d,
            e,
            f,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p = {},
            q = "cubic" === b ? 3 : 2,
            r = "soft" === b,
            s = [];
          if ((r && c && (a = [c].concat(a)), null == a || a.length < q + 1))
            throw "invalid Bezier data";
          for (m in a[0]) s.push(m);
          for (j = s.length; --j > -1; ) {
            for (
              m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0;
              l > k;
              k++
            )
              (d =
                null == c
                  ? a[k][m]
                  : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1)
                  ? c[m] + Number(o.charAt(0) + o.substr(2))
                  : Number(o)),
                r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2),
                (i[n++] = d);
            for (l = n - q + 1, n = 0, k = 0; l > k; k += q)
              (d = i[k]),
                (e = i[k + 1]),
                (f = i[k + 2]),
                (h = 2 === q ? 0 : i[k + 3]),
                (i[n++] = o =
                  3 === q
                    ? new g(d, e, f, h)
                    : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f));
            i.length = n;
          }
          return p;
        },
        n = function (a, b, c) {
          for (
            var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length;
            --p > -1;

          )
            for (
              m = a[p],
                f = m.a,
                g = m.d - f,
                h = m.c - f,
                i = m.b - f,
                d = e = 0,
                k = 1;
              c >= k;
              k++
            )
              (j = o * k),
                (l = 1 - j),
                (d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j)),
                (n = p * c + k - 1),
                (b[n] = (b[n] || 0) + d * d);
        },
        o = function (a, b) {
          b = b >> 0 || 6;
          var c,
            d,
            e,
            f,
            g = [],
            h = [],
            i = 0,
            j = 0,
            k = b - 1,
            l = [],
            m = [];
          for (c in a) n(a[c], g, b);
          for (e = g.length, d = 0; e > d; d++)
            (i += Math.sqrt(g[d])),
              (f = d % b),
              (m[f] = i),
              f === k &&
                ((j += i),
                (f = (d / b) >> 0),
                (l[f] = m),
                (h[f] = j),
                (i = 0),
                (m = []));
          return { length: j, lengths: h, segments: l };
        },
        p = _gsScope._gsDefine.plugin({
          propName: "bezier",
          priority: -1,
          version: "1.3.8",
          API: 2,
          global: !0,
          init: function (a, b, c) {
            (this._target = a),
              b instanceof Array && (b = { values: b }),
              (this._func = {}),
              (this._mod = {}),
              (this._props = []),
              (this._timeRes =
                null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10));
            var d,
              e,
              f,
              g,
              h,
              i = b.values || [],
              j = {},
              k = i[0],
              n = b.autoRotate || c.vars.orientToBezier;
            this._autoRotate = n
              ? n instanceof Array
                ? n
                : [["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]]
              : null;
            for (d in k) this._props.push(d);
            for (f = this._props.length; --f > -1; )
              (d = this._props[f]),
                this._overwriteProps.push(d),
                (e = this._func[d] = "function" == typeof a[d]),
                (j[d] = e
                  ? a[
                      d.indexOf("set") ||
                      "function" != typeof a["get" + d.substr(3)]
                        ? d
                        : "get" + d.substr(3)
                    ]()
                  : parseFloat(a[d])),
                h || (j[d] !== i[0][d] && (h = j));
            if (
              ((this._beziers =
                "cubic" !== b.type &&
                "quadratic" !== b.type &&
                "soft" !== b.type
                  ? l(
                      i,
                      isNaN(b.curviness) ? 1 : b.curviness,
                      !1,
                      "thruBasic" === b.type,
                      b.correlate,
                      h
                    )
                  : m(i, b.type, j)),
              (this._segCount = this._beziers[d].length),
              this._timeRes)
            ) {
              var p = o(this._beziers, this._timeRes);
              (this._length = p.length),
                (this._lengths = p.lengths),
                (this._segments = p.segments),
                (this._l1 = this._li = this._s1 = this._si = 0),
                (this._l2 = this._lengths[0]),
                (this._curSeg = this._segments[0]),
                (this._s2 = this._curSeg[0]),
                (this._prec = 1 / this._curSeg.length);
            }
            if ((n = this._autoRotate))
              for (
                this._initialRotations = [],
                  n[0] instanceof Array || (this._autoRotate = n = [n]),
                  f = n.length;
                --f > -1;

              ) {
                for (g = 0; 3 > g; g++)
                  (d = n[f][g]),
                    (this._func[d] =
                      "function" == typeof a[d]
                        ? a[
                            d.indexOf("set") ||
                            "function" != typeof a["get" + d.substr(3)]
                              ? d
                              : "get" + d.substr(3)
                          ]
                        : !1);
                (d = n[f][2]),
                  (this._initialRotations[f] =
                    (this._func[d]
                      ? this._func[d].call(this._target)
                      : this._target[d]) || 0),
                  this._overwriteProps.push(d);
              }
            return (this._startRatio = c.vars.runBackwards ? 1 : 0), !0;
          },
          set: function (b) {
            var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j,
              k,
              l,
              m = this._segCount,
              n = this._func,
              o = this._target,
              p = b !== this._startRatio;
            if (this._timeRes) {
              if (
                ((k = this._lengths),
                (l = this._curSeg),
                (b *= this._length),
                (e = this._li),
                b > this._l2 && m - 1 > e)
              ) {
                for (j = m - 1; j > e && (this._l2 = k[++e]) <= b; );
                (this._l1 = k[e - 1]),
                  (this._li = e),
                  (this._curSeg = l = this._segments[e]),
                  (this._s2 = l[(this._s1 = this._si = 0)]);
              } else if (b < this._l1 && e > 0) {
                for (; e > 0 && (this._l1 = k[--e]) >= b; );
                0 === e && b < this._l1 ? (this._l1 = 0) : e++,
                  (this._l2 = k[e]),
                  (this._li = e),
                  (this._curSeg = l = this._segments[e]),
                  (this._s1 = l[(this._si = l.length - 1) - 1] || 0),
                  (this._s2 = l[this._si]);
              }
              if (
                ((c = e),
                (b -= this._l1),
                (e = this._si),
                b > this._s2 && e < l.length - 1)
              ) {
                for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b; );
                (this._s1 = l[e - 1]), (this._si = e);
              } else if (b < this._s1 && e > 0) {
                for (; e > 0 && (this._s1 = l[--e]) >= b; );
                0 === e && b < this._s1 ? (this._s1 = 0) : e++,
                  (this._s2 = l[e]),
                  (this._si = e);
              }
              h =
                (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
            } else
              (c = 0 > b ? 0 : b >= 1 ? m - 1 : (m * b) >> 0),
                (h = (b - c * (1 / m)) * m);
            for (d = 1 - h, e = this._props.length; --e > -1; )
              (f = this._props[e]),
                (g = this._beziers[f][c]),
                (i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a),
                this._mod[f] && (i = this._mod[f](i, o)),
                n[f] ? o[f](i) : (o[f] = i);
            if (this._autoRotate) {
              var q,
                r,
                s,
                t,
                u,
                v,
                w,
                x = this._autoRotate;
              for (e = x.length; --e > -1; )
                (f = x[e][2]),
                  (v = x[e][3] || 0),
                  (w = x[e][4] === !0 ? 1 : a),
                  (g = this._beziers[x[e][0]]),
                  (q = this._beziers[x[e][1]]),
                  g &&
                    q &&
                    ((g = g[c]),
                    (q = q[c]),
                    (r = g.a + (g.b - g.a) * h),
                    (t = g.b + (g.c - g.b) * h),
                    (r += (t - r) * h),
                    (t += (g.c + (g.d - g.c) * h - t) * h),
                    (s = q.a + (q.b - q.a) * h),
                    (u = q.b + (q.c - q.b) * h),
                    (s += (u - s) * h),
                    (u += (q.c + (q.d - q.c) * h - u) * h),
                    (i = p
                      ? Math.atan2(u - s, t - r) * w + v
                      : this._initialRotations[e]),
                    this._mod[f] && (i = this._mod[f](i, o)),
                    n[f] ? o[f](i) : (o[f] = i));
            }
          },
        }),
        q = p.prototype;
      (p.bezierThrough = l),
        (p.cubicToQuadratic = i),
        (p._autoCSS = !0),
        (p.quadraticToCubic = function (a, b, c) {
          return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
        }),
        (p._cssRegister = function () {
          var a = f.CSSPlugin;
          if (a) {
            var b = a._internals,
              c = b._parseToProxy,
              d = b._setPluginRatio,
              e = b.CSSPropTween;
            b._registerComplexSpecialProp("bezier", {
              parser: function (a, b, f, g, h, i) {
                b instanceof Array && (b = { values: b }), (i = new p());
                var j,
                  k,
                  l,
                  m = b.values,
                  n = m.length - 1,
                  o = [],
                  q = {};
                if (0 > n) return h;
                for (j = 0; n >= j; j++)
                  (l = c(a, m[j], g, h, i, n !== j)), (o[j] = l.end);
                for (k in b) q[k] = b[k];
                return (
                  (q.values = o),
                  (h = new e(a, "bezier", 0, 0, l.pt, 2)),
                  (h.data = l),
                  (h.plugin = i),
                  (h.setRatio = d),
                  0 === q.autoRotate && (q.autoRotate = !0),
                  !q.autoRotate ||
                    q.autoRotate instanceof Array ||
                    ((j = q.autoRotate === !0 ? 0 : Number(q.autoRotate)),
                    (q.autoRotate =
                      null != l.end.left
                        ? [["left", "top", "rotation", j, !1]]
                        : null != l.end.x
                        ? [["x", "y", "rotation", j, !1]]
                        : !1)),
                  q.autoRotate &&
                    (g._transform || g._enableTransforms(!1),
                    (l.autoRotate = g._target._gsTransform),
                    (l.proxy.rotation = l.autoRotate.rotation || 0),
                    g._overwriteProps.push("rotation")),
                  i._onInitTween(l.proxy, q, g._tween),
                  h
                );
              },
            });
          }
        }),
        (q._mod = function (a) {
          for (var b, c = this._overwriteProps, d = c.length; --d > -1; )
            (b = a[c[d]]), b && "function" == typeof b && (this._mod[c[d]] = b);
        }),
        (q._kill = function (a) {
          var b,
            c,
            d = this._props;
          for (b in this._beziers)
            if (b in a)
              for (
                delete this._beziers[b], delete this._func[b], c = d.length;
                --c > -1;

              )
                d[c] === b && d.splice(c, 1);
          if ((d = this._autoRotate))
            for (c = d.length; --c > -1; ) a[d[c][2]] && d.splice(c, 1);
          return this._super._kill.call(this, a);
        });
    })(),
    _gsScope._gsDefine(
      "plugins.CSSPlugin",
      ["plugins.TweenPlugin", "TweenLite"],
      function (a, b) {
        var c,
          d,
          e,
          f,
          g = function () {
            a.call(this, "css"),
              (this._overwriteProps.length = 0),
              (this.setRatio = g.prototype.setRatio);
          },
          h = _gsScope._gsDefine.globals,
          i = {},
          j = (g.prototype = new a("css"));
        (j.constructor = g),
          (g.version = "2.1.0"),
          (g.API = 2),
          (g.defaultTransformPerspective = 0),
          (g.defaultSkewType = "compensated"),
          (g.defaultSmoothOrigin = !0),
          (j = "px"),
          (g.suffixMap = {
            top: j,
            right: j,
            bottom: j,
            left: j,
            width: j,
            height: j,
            fontSize: j,
            padding: j,
            margin: j,
            perspective: j,
            lineHeight: "",
          });
        var k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
          t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
          w = /(?:\d|\-|\+|=|#|\.)*/g,
          x = /opacity *= *([^)]*)/i,
          y = /opacity:([^;]*)/i,
          z = /alpha\(opacity *=.+?\)/i,
          A = /^(rgb|hsl)/,
          B = /([A-Z])/g,
          C = /-([a-z])/gi,
          D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          E = function (a, b) {
            return b.toUpperCase();
          },
          F = /(?:Left|Right|Width)/i,
          G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          I = /,(?=[^\)]*(?:\(|$))/gi,
          J = /[\s,\(]/i,
          K = Math.PI / 180,
          L = 180 / Math.PI,
          M = {},
          N = { style: {} },
          O = _gsScope.document || {
            createElement: function () {
              return N;
            },
          },
          P = function (a, b) {
            return b && O.createElementNS
              ? O.createElementNS(b, a)
              : O.createElement(a);
          },
          Q = P("div"),
          R = P("img"),
          S = (g._internals = { _specialProps: i }),
          T = (_gsScope.navigator || {}).userAgent || "",
          U = (function () {
            var a = T.indexOf("Android"),
              b = P("a");
            return (
              (m =
                -1 !== T.indexOf("Safari") &&
                -1 === T.indexOf("Chrome") &&
                (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3)),
              (o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6),
              (n = -1 !== T.indexOf("Firefox")),
              (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) ||
                /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) &&
                (p = parseFloat(RegExp.$1)),
              b
                ? ((b.style.cssText = "top:1px;opacity:.55;"),
                  /^0.55/.test(b.style.opacity))
                : !1
            );
          })(),
          V = function (a) {
            return x.test(
              "string" == typeof a
                ? a
                : (a.currentStyle ? a.currentStyle.filter : a.style.filter) ||
                    ""
            )
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          W = function (a) {
            _gsScope.console && console.log(a);
          },
          X = "",
          Y = "",
          Z = function (a, b) {
            b = b || Q;
            var c,
              d,
              e = b.style;
            if (void 0 !== e[a]) return a;
            for (
              a = a.charAt(0).toUpperCase() + a.substr(1),
                c = ["O", "Moz", "ms", "Ms", "Webkit"],
                d = 5;
              --d > -1 && void 0 === e[c[d] + a];

            );
            return d >= 0
              ? ((Y = 3 === d ? "ms" : c[d]),
                (X = "-" + Y.toLowerCase() + "-"),
                Y + a)
              : null;
          },
          $ =
            "undefined" != typeof window
              ? window
              : O.defaultView || { getComputedStyle: function () {} },
          _ = function (a) {
            return $.getComputedStyle(a);
          },
          aa = (g.getStyle = function (a, b, c, d, e) {
            var f;
            return U || "opacity" !== b
              ? (!d && a.style[b]
                  ? (f = a.style[b])
                  : (c = c || _(a))
                  ? (f =
                      c[b] ||
                      c.getPropertyValue(b) ||
                      c.getPropertyValue(b.replace(B, "-$1").toLowerCase()))
                  : a.currentStyle && (f = a.currentStyle[b]),
                null == e ||
                (f && "none" !== f && "auto" !== f && "auto auto" !== f)
                  ? f
                  : e)
              : V(a);
          }),
          ba = (S.convertToPixels = function (a, c, d, e, f) {
            if ("px" === e || (!e && "lineHeight" !== c)) return d;
            if ("auto" === e || !d) return 0;
            var h,
              i,
              j,
              k = F.test(c),
              l = a,
              m = Q.style,
              n = 0 > d,
              o = 1 === d;
            if ((n && (d = -d), o && (d *= 100), "lineHeight" !== c || e))
              if ("%" === e && -1 !== c.indexOf("border"))
                h = (d / 100) * (k ? a.clientWidth : a.clientHeight);
              else {
                if (
                  ((m.cssText =
                    "border:0 solid red;position:" +
                    aa(a, "position") +
                    ";line-height:0;"),
                  "%" !== e &&
                    l.appendChild &&
                    "v" !== e.charAt(0) &&
                    "rem" !== e)
                )
                  m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                else {
                  if (
                    ((l = a.parentNode || O.body),
                    -1 !== aa(l, "display").indexOf("flex") &&
                      (m.position = "absolute"),
                    (i = l._gsCache),
                    (j = b.ticker.frame),
                    i && k && i.time === j)
                  )
                    return (i.width * d) / 100;
                  m[k ? "width" : "height"] = d + e;
                }
                l.appendChild(Q),
                  (h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"])),
                  l.removeChild(Q),
                  k &&
                    "%" === e &&
                    g.cacheWidths !== !1 &&
                    ((i = l._gsCache = l._gsCache || {}),
                    (i.time = j),
                    (i.width = (h / d) * 100)),
                  0 !== h || f || (h = ba(a, c, d, e, !0));
              }
            else
              (i = _(a).lineHeight),
                (a.style.lineHeight = d),
                (h = parseFloat(_(a).lineHeight)),
                (a.style.lineHeight = i);
            return o && (h /= 100), n ? -h : h;
          }),
          ca = (S.calculateOffset = function (a, b, c) {
            if ("absolute" !== aa(a, "position", c)) return 0;
            var d = "left" === b ? "Left" : "Top",
              e = aa(a, "margin" + d, c);
            return (
              a["offset" + d] - (ba(a, b, parseFloat(e), e.replace(w, "")) || 0)
            );
          }),
          da = function (a, b) {
            var c,
              d,
              e,
              f = {};
            if ((b = b || _(a, null)))
              if ((c = b.length))
                for (; --c > -1; )
                  (e = b[c]),
                    (-1 === e.indexOf("-transform") || Ea === e) &&
                      (f[e.replace(C, E)] = b.getPropertyValue(e));
              else
                for (c in b)
                  (-1 === c.indexOf("Transform") || Da === c) && (f[c] = b[c]);
            else if ((b = a.currentStyle || a.style))
              for (c in b)
                "string" == typeof c &&
                  void 0 === f[c] &&
                  (f[c.replace(C, E)] = b[c]);
            return (
              U || (f.opacity = V(a)),
              (d = Sa(a, b, !1)),
              (f.rotation = d.rotation),
              (f.skewX = d.skewX),
              (f.scaleX = d.scaleX),
              (f.scaleY = d.scaleY),
              (f.x = d.x),
              (f.y = d.y),
              Ga &&
                ((f.z = d.z),
                (f.rotationX = d.rotationX),
                (f.rotationY = d.rotationY),
                (f.scaleZ = d.scaleZ)),
              f.filters && delete f.filters,
              f
            );
          },
          ea = function (a, b, c, d, e) {
            var f,
              g,
              h,
              i = {},
              j = a.style;
            for (g in c)
              "cssText" !== g &&
                "length" !== g &&
                isNaN(g) &&
                (b[g] !== (f = c[g]) || (e && e[g])) &&
                -1 === g.indexOf("Origin") &&
                ("number" == typeof f || "string" == typeof f) &&
                ((i[g] =
                  "auto" !== f || ("left" !== g && "top" !== g)
                    ? ("" !== f && "auto" !== f && "none" !== f) ||
                      "string" != typeof b[g] ||
                      "" === b[g].replace(v, "")
                      ? f
                      : 0
                    : ca(a, g)),
                void 0 !== j[g] && (h = new ta(j, g, j[g], h)));
            if (d) for (g in d) "className" !== g && (i[g] = d[g]);
            return { difs: i, firstMPT: h };
          },
          fa = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
          ga = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          ha = function (a, b, c) {
            if ("svg" === (a.nodeName + "").toLowerCase())
              return (c || _(a))[b] || 0;
            if (a.getCTM && Pa(a)) return a.getBBox()[b] || 0;
            var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
              e = fa[b],
              f = e.length;
            for (c = c || _(a, null); --f > -1; )
              (d -= parseFloat(aa(a, "padding" + e[f], c, !0)) || 0),
                (d -= parseFloat(aa(a, "border" + e[f] + "Width", c, !0)) || 0);
            return d;
          },
          ia = function (a, b) {
            if ("contain" === a || "auto" === a || "auto auto" === a)
              return a + " ";
            (null == a || "" === a) && (a = "0 0");
            var c,
              d = a.split(" "),
              e =
                -1 !== a.indexOf("left")
                  ? "0%"
                  : -1 !== a.indexOf("right")
                  ? "100%"
                  : d[0],
              f =
                -1 !== a.indexOf("top")
                  ? "0%"
                  : -1 !== a.indexOf("bottom")
                  ? "100%"
                  : d[1];
            if (d.length > 3 && !b) {
              for (
                d = a.split(", ").join(",").split(","), a = [], c = 0;
                c < d.length;
                c++
              )
                a.push(ia(d[c]));
              return a.join(",");
            }
            return (
              null == f
                ? (f = "center" === e ? "50%" : "0")
                : "center" === f && (f = "50%"),
              ("center" === e ||
                (isNaN(parseFloat(e)) && -1 === (e + "").indexOf("="))) &&
                (e = "50%"),
              (a = e + " " + f + (d.length > 2 ? " " + d[2] : "")),
              b &&
                ((b.oxp = -1 !== e.indexOf("%")),
                (b.oyp = -1 !== f.indexOf("%")),
                (b.oxr = "=" === e.charAt(1)),
                (b.oyr = "=" === f.charAt(1)),
                (b.ox = parseFloat(e.replace(v, ""))),
                (b.oy = parseFloat(f.replace(v, ""))),
                (b.v = a)),
              b || a
            );
          },
          ja = function (a, b) {
            return (
              "function" == typeof a && (a = a(r, q)),
              "string" == typeof a && "=" === a.charAt(1)
                ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2))
                : parseFloat(a) - parseFloat(b) || 0
            );
          },
          ka = function (a, b) {
            "function" == typeof a && (a = a(r, q));
            var c = "string" == typeof a && "=" === a.charAt(1);
            return (
              "string" == typeof a &&
                "v" === a.charAt(a.length - 2) &&
                (a =
                  (c ? a.substr(0, 2) : 0) +
                  window[
                    "inner" + ("vh" === a.substr(-2) ? "Height" : "Width")
                  ] *
                    (parseFloat(c ? a.substr(2) : a) / 100)),
              null == a
                ? b
                : c
                ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b
                : parseFloat(a) || 0
            );
          },
          la = function (a, b, c, d) {
            var e,
              f,
              g,
              h,
              i,
              j = 1e-6;
            return (
              "function" == typeof a && (a = a(r, q)),
              null == a
                ? (h = b)
                : "number" == typeof a
                ? (h = a)
                : ((e = 360),
                  (f = a.split("_")),
                  (i = "=" === a.charAt(1)),
                  (g =
                    (i
                      ? parseInt(a.charAt(0) + "1", 10) *
                        parseFloat(f[0].substr(2))
                      : parseFloat(f[0])) *
                      (-1 === a.indexOf("rad") ? 1 : L) -
                    (i ? 0 : b)),
                  f.length &&
                    (d && (d[c] = b + g),
                    -1 !== a.indexOf("short") &&
                      ((g %= e),
                      g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)),
                    -1 !== a.indexOf("_cw") && 0 > g
                      ? (g = ((g + 9999999999 * e) % e) - ((g / e) | 0) * e)
                      : -1 !== a.indexOf("ccw") &&
                        g > 0 &&
                        (g = ((g - 9999999999 * e) % e) - ((g / e) | 0) * e)),
                  (h = b + g)),
              j > h && h > -j && (h = 0),
              h
            );
          },
          ma = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          na = function (a, b, c) {
            return (
              (a = 0 > a ? a + 1 : a > 1 ? a - 1 : a),
              (255 *
                (1 > 6 * a
                  ? b + (c - b) * a * 6
                  : 0.5 > a
                  ? c
                  : 2 > 3 * a
                  ? b + (c - b) * (2 / 3 - a) * 6
                  : b) +
                0.5) |
                0
            );
          },
          oa = (g.parseColor = function (a, b) {
            var c, d, e, f, g, h, i, j, k, l, m;
            if (a)
              if ("number" == typeof a) c = [a >> 16, (a >> 8) & 255, 255 & a];
              else {
                if (
                  ("," === a.charAt(a.length - 1) &&
                    (a = a.substr(0, a.length - 1)),
                  ma[a])
                )
                  c = ma[a];
                else if ("#" === a.charAt(0))
                  4 === a.length &&
                    ((d = a.charAt(1)),
                    (e = a.charAt(2)),
                    (f = a.charAt(3)),
                    (a = "#" + d + d + e + e + f + f)),
                    (a = parseInt(a.substr(1), 16)),
                    (c = [a >> 16, (a >> 8) & 255, 255 & a]);
                else if ("hsl" === a.substr(0, 3))
                  if (((c = m = a.match(s)), b)) {
                    if (-1 !== a.indexOf("=")) return a.match(t);
                  } else
                    (g = (Number(c[0]) % 360) / 360),
                      (h = Number(c[1]) / 100),
                      (i = Number(c[2]) / 100),
                      (e = 0.5 >= i ? i * (h + 1) : i + h - i * h),
                      (d = 2 * i - e),
                      c.length > 3 && (c[3] = Number(c[3])),
                      (c[0] = na(g + 1 / 3, d, e)),
                      (c[1] = na(g, d, e)),
                      (c[2] = na(g - 1 / 3, d, e));
                else c = a.match(s) || ma.transparent;
                (c[0] = Number(c[0])),
                  (c[1] = Number(c[1])),
                  (c[2] = Number(c[2])),
                  c.length > 3 && (c[3] = Number(c[3]));
              }
            else c = ma.black;
            return (
              b &&
                !m &&
                ((d = c[0] / 255),
                (e = c[1] / 255),
                (f = c[2] / 255),
                (j = Math.max(d, e, f)),
                (k = Math.min(d, e, f)),
                (i = (j + k) / 2),
                j === k
                  ? (g = h = 0)
                  : ((l = j - k),
                    (h = i > 0.5 ? l / (2 - j - k) : l / (j + k)),
                    (g =
                      j === d
                        ? (e - f) / l + (f > e ? 6 : 0)
                        : j === e
                        ? (f - d) / l + 2
                        : (d - e) / l + 4),
                    (g *= 60)),
                (c[0] = (g + 0.5) | 0),
                (c[1] = (100 * h + 0.5) | 0),
                (c[2] = (100 * i + 0.5) | 0)),
              c
            );
          }),
          pa = function (a, b) {
            var c,
              d,
              e,
              f = a.match(qa) || [],
              g = 0,
              h = "";
            if (!f.length) return a;
            for (c = 0; c < f.length; c++)
              (d = f[c]),
                (e = a.substr(g, a.indexOf(d, g) - g)),
                (g += e.length + d.length),
                (d = oa(d, b)),
                3 === d.length && d.push(1),
                (h +=
                  e +
                  (b
                    ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3]
                    : "rgba(" + d.join(",")) +
                  ")");
            return h + a.substr(g);
          },
          qa =
            "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (j in ma) qa += "|" + j + "\\b";
        (qa = new RegExp(qa + ")", "gi")),
          (g.colorStringFilter = function (a) {
            var b,
              c = a[0] + " " + a[1];
            qa.test(c) &&
              ((b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla(")),
              (a[0] = pa(a[0], b)),
              (a[1] = pa(a[1], b))),
              (qa.lastIndex = 0);
          }),
          b.defaultStringFilter ||
            (b.defaultStringFilter = g.colorStringFilter);
        var ra = function (a, b, c, d) {
            if (null == a)
              return function (a) {
                return a;
              };
            var e,
              f = b ? (a.match(qa) || [""])[0] : "",
              g = a.split(f).join("").match(u) || [],
              h = a.substr(0, a.indexOf(g[0])),
              i = ")" === a.charAt(a.length - 1) ? ")" : "",
              j = -1 !== a.indexOf(" ") ? " " : ",",
              k = g.length,
              l = k > 0 ? g[0].replace(s, "") : "";
            return k
              ? (e = b
                  ? function (a) {
                      var b, m, n, o;
                      if ("number" == typeof a) a += l;
                      else if (d && I.test(a)) {
                        for (
                          o = a.replace(I, "|").split("|"), n = 0;
                          n < o.length;
                          n++
                        )
                          o[n] = e(o[n]);
                        return o.join(",");
                      }
                      if (
                        ((b = (a.match(qa) || [f])[0]),
                        (m = a.split(b).join("").match(u) || []),
                        (n = m.length),
                        k > n--)
                      )
                        for (; ++n < k; )
                          m[n] = c ? m[((n - 1) / 2) | 0] : g[n];
                      return (
                        h +
                        m.join(j) +
                        j +
                        b +
                        i +
                        (-1 !== a.indexOf("inset") ? " inset" : "")
                      );
                    }
                  : function (a) {
                      var b, f, m;
                      if ("number" == typeof a) a += l;
                      else if (d && I.test(a)) {
                        for (
                          f = a.replace(I, "|").split("|"), m = 0;
                          m < f.length;
                          m++
                        )
                          f[m] = e(f[m]);
                        return f.join(",");
                      }
                      if (((b = a.match(u) || []), (m = b.length), k > m--))
                        for (; ++m < k; )
                          b[m] = c ? b[((m - 1) / 2) | 0] : g[m];
                      return h + b.join(j) + i;
                    })
              : function (a) {
                  return a;
                };
          },
          sa = function (a) {
            return (
              (a = a.split(",")),
              function (b, c, d, e, f, g, h) {
                var i,
                  j = (c + "").split(" ");
                for (h = {}, i = 0; 4 > i; i++)
                  h[a[i]] = j[i] = j[i] || j[((i - 1) / 2) >> 0];
                return e.parse(b, h, f, g);
              }
            );
          },
          ta =
            ((S._setPluginRatio = function (a) {
              this.plugin.setRatio(a);
              for (
                var b,
                  c,
                  d,
                  e,
                  f,
                  g = this.data,
                  h = g.proxy,
                  i = g.firstMPT,
                  j = 1e-6;
                i;

              )
                (b = h[i.v]),
                  i.r ? (b = i.r(b)) : j > b && b > -j && (b = 0),
                  (i.t[i.p] = b),
                  (i = i._next);
              if (
                (g.autoRotate &&
                  (g.autoRotate.rotation = g.mod
                    ? g.mod.call(this._tween, h.rotation, this.t, this._tween)
                    : h.rotation),
                1 === a || 0 === a)
              )
                for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i; ) {
                  if (((c = i.t), c.type)) {
                    if (1 === c.type) {
                      for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++)
                        e += c["xn" + d] + c["xs" + (d + 1)];
                      c[f] = e;
                    }
                  } else c[f] = c.s + c.xs0;
                  i = i._next;
                }
            }),
            function (a, b, c, d, e) {
              (this.t = a),
                (this.p = b),
                (this.v = c),
                (this.r = e),
                d && ((d._prev = this), (this._next = d));
            }),
          ua =
            ((S._parseToProxy = function (a, b, c, d, e, f) {
              var g,
                h,
                i,
                j,
                k,
                l = d,
                m = {},
                n = {},
                o = c._transform,
                p = M;
              for (
                c._transform = null,
                  M = b,
                  d = k = c.parse(a, b, d, e),
                  M = p,
                  f &&
                    ((c._transform = o),
                    l && ((l._prev = null), l._prev && (l._prev._next = null)));
                d && d !== l;

              ) {
                if (
                  d.type <= 1 &&
                  ((h = d.p),
                  (n[h] = d.s + d.c),
                  (m[h] = d.s),
                  f || ((j = new ta(d, "s", h, j, d.r)), (d.c = 0)),
                  1 === d.type)
                )
                  for (g = d.l; --g > 0; )
                    (i = "xn" + g),
                      (h = d.p + "_" + i),
                      (n[h] = d.data[i]),
                      (m[h] = d[i]),
                      f || (j = new ta(d, i, h, j, d.rxp[i]));
                d = d._next;
              }
              return { proxy: m, end: n, firstMPT: j, pt: k };
            }),
            (S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
              (this.t = a),
                (this.p = b),
                (this.s = d),
                (this.c = e),
                (this.n = i || b),
                a instanceof ua || f.push(this.n),
                (this.r = j ? ("function" == typeof j ? j : Math.round) : j),
                (this.type = h || 0),
                k && ((this.pr = k), (c = !0)),
                (this.b = void 0 === l ? d : l),
                (this.e = void 0 === m ? d + e : m),
                g && ((this._next = g), (g._prev = this));
            })),
          va = function (a, b, c, d, e, f) {
            var g = new ua(a, b, c, d - c, e, -1, f);
            return (g.b = c), (g.e = g.xs0 = d), g;
          },
          wa = (g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
            (c = c || f || ""),
              "function" == typeof d && (d = d(r, q)),
              (h = new ua(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d)),
              (d += ""),
              e &&
                qa.test(d + c) &&
                ((d = [c, d]), g.colorStringFilter(d), (c = d[0]), (d = d[1]));
            var m,
              n,
              o,
              p,
              u,
              v,
              w,
              x,
              y,
              z,
              A,
              B,
              C,
              D = c.split(", ").join(",").split(" "),
              E = d.split(", ").join(",").split(" "),
              F = D.length,
              G = k !== !1;
            for (
              (-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) &&
                (-1 !== (d + c).indexOf("rgb") || -1 !== (d + c).indexOf("hsl")
                  ? ((D = D.join(" ").replace(I, ", ").split(" ")),
                    (E = E.join(" ").replace(I, ", ").split(" ")))
                  : ((D = D.join(" ").split(",").join(", ").split(" ")),
                    (E = E.join(" ").split(",").join(", ").split(" "))),
                (F = D.length)),
                F !== E.length && ((D = (f || "").split(" ")), (F = D.length)),
                h.plugin = j,
                h.setRatio = l,
                qa.lastIndex = 0,
                m = 0;
              F > m;
              m++
            )
              if (
                ((p = D[m]), (u = E[m] + ""), (x = parseFloat(p)), x || 0 === x)
              )
                h.appendXtra(
                  "",
                  x,
                  ja(u, x),
                  u.replace(t, ""),
                  G && -1 !== u.indexOf("px") ? Math.round : !1,
                  !0
                );
              else if (e && qa.test(p))
                (B = u.indexOf(")") + 1),
                  (B = ")" + (B ? u.substr(B) : "")),
                  (C = -1 !== u.indexOf("hsl") && U),
                  (z = u),
                  (p = oa(p, C)),
                  (u = oa(u, C)),
                  (y = p.length + u.length > 6),
                  y && !U && 0 === u[3]
                    ? ((h["xs" + h.l] += h.l ? " transparent" : "transparent"),
                      (h.e = h.e.split(E[m]).join("transparent")))
                    : (U || (y = !1),
                      C
                        ? h
                            .appendXtra(
                              z.substr(0, z.indexOf("hsl")) +
                                (y ? "hsla(" : "hsl("),
                              p[0],
                              ja(u[0], p[0]),
                              ",",
                              !1,
                              !0
                            )
                            .appendXtra("", p[1], ja(u[1], p[1]), "%,", !1)
                            .appendXtra(
                              "",
                              p[2],
                              ja(u[2], p[2]),
                              y ? "%," : "%" + B,
                              !1
                            )
                        : h
                            .appendXtra(
                              z.substr(0, z.indexOf("rgb")) +
                                (y ? "rgba(" : "rgb("),
                              p[0],
                              u[0] - p[0],
                              ",",
                              Math.round,
                              !0
                            )
                            .appendXtra("", p[1], u[1] - p[1], ",", Math.round)
                            .appendXtra(
                              "",
                              p[2],
                              u[2] - p[2],
                              y ? "," : B,
                              Math.round
                            ),
                      y &&
                        ((p = p.length < 4 ? 1 : p[3]),
                        h.appendXtra(
                          "",
                          p,
                          (u.length < 4 ? 1 : u[3]) - p,
                          B,
                          !1
                        ))),
                  (qa.lastIndex = 0);
              else if ((v = p.match(s))) {
                if (((w = u.match(t)), !w || w.length !== v.length)) return h;
                for (o = 0, n = 0; n < v.length; n++)
                  (A = v[n]),
                    (z = p.indexOf(A, o)),
                    h.appendXtra(
                      p.substr(o, z - o),
                      Number(A),
                      ja(w[n], A),
                      "",
                      G && "px" === p.substr(z + A.length, 2) ? Math.round : !1,
                      0 === n
                    ),
                    (o = z + A.length);
                h["xs" + h.l] += p.substr(o);
              } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
            if (-1 !== d.indexOf("=") && h.data) {
              for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++)
                B += h["xs" + m] + h.data["xn" + m];
              h.e = B + h["xs" + m];
            }
            return h.l || ((h.type = -1), (h.xs0 = h.e)), h.xfirst || h;
          }),
          xa = 9;
        for (j = ua.prototype, j.l = j.pr = 0; --xa > 0; )
          (j["xn" + xa] = 0), (j["xs" + xa] = "");
        (j.xs0 = ""),
          (j._next =
            j._prev =
            j.xfirst =
            j.data =
            j.plugin =
            j.setRatio =
            j.rxp =
              null),
          (j.appendXtra = function (a, b, c, d, e, f) {
            var g = this,
              h = g.l;
            return (
              (g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || ""),
              c || 0 === h || g.plugin
                ? (g.l++,
                  (g.type = g.setRatio ? 2 : 1),
                  (g["xs" + g.l] = d || ""),
                  h > 0
                    ? ((g.data["xn" + h] = b + c),
                      (g.rxp["xn" + h] = e),
                      (g["xn" + h] = b),
                      g.plugin ||
                        ((g.xfirst = new ua(
                          g,
                          "xn" + h,
                          b,
                          c,
                          g.xfirst || g,
                          0,
                          g.n,
                          e,
                          g.pr
                        )),
                        (g.xfirst.xs0 = 0)),
                      g)
                    : ((g.data = { s: b + c }),
                      (g.rxp = {}),
                      (g.s = b),
                      (g.c = c),
                      (g.r = e),
                      g))
                : ((g["xs" + h] += b + (d || "")), g)
            );
          });
        var ya = function (a, b) {
            (b = b || {}),
              (this.p = b.prefix ? Z(a) || a : a),
              (i[a] = i[this.p] = this),
              (this.format =
                b.formatter ||
                ra(b.defaultValue, b.color, b.collapsible, b.multi)),
              b.parser && (this.parse = b.parser),
              (this.clrs = b.color),
              (this.multi = b.multi),
              (this.keyword = b.keyword),
              (this.dflt = b.defaultValue),
              (this.allowFunc = b.allowFunc),
              (this.pr = b.priority || 0);
          },
          za = (S._registerComplexSpecialProp = function (a, b, c) {
            "object" != typeof b && (b = { parser: c });
            var d,
              e,
              f = a.split(","),
              g = b.defaultValue;
            for (c = c || [g], d = 0; d < f.length; d++)
              (b.prefix = 0 === d && b.prefix),
                (b.defaultValue = c[d] || g),
                (e = new ya(f[d], b));
          }),
          Aa = (S._registerPluginProp = function (a) {
            if (!i[a]) {
              var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
              za(a, {
                parser: function (a, c, d, e, f, g, j) {
                  var k = h.com.greensock.plugins[b];
                  return k
                    ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j))
                    : (W("Error: " + b + " js file not loaded."), f);
                },
              });
            }
          });
        (j = ya.prototype),
          (j.parseComplex = function (a, b, c, d, e, f) {
            var g,
              h,
              i,
              j,
              k,
              l,
              m = this.keyword;
            if (
              (this.multi &&
                (I.test(c) || I.test(b)
                  ? ((h = b.replace(I, "|").split("|")),
                    (i = c.replace(I, "|").split("|")))
                  : m && ((h = [b]), (i = [c]))),
              i)
            ) {
              for (
                j = i.length > h.length ? i.length : h.length, g = 0;
                j > g;
                g++
              )
                (b = h[g] = h[g] || this.dflt),
                  (c = i[g] = i[g] || this.dflt),
                  m &&
                    ((k = b.indexOf(m)),
                    (l = c.indexOf(m)),
                    k !== l &&
                      (-1 === l
                        ? (h[g] = h[g].split(m).join(""))
                        : -1 === k && (h[g] += " " + m)));
              (b = h.join(", ")), (c = i.join(", "));
            }
            return wa(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f);
          }),
          (j.parse = function (a, b, c, d, f, g, h) {
            return this.parseComplex(
              a.style,
              this.format(aa(a, this.p, e, !1, this.dflt)),
              this.format(b),
              f,
              g
            );
          }),
          (g.registerSpecialProp = function (a, b, c) {
            za(a, {
              parser: function (a, d, e, f, g, h, i) {
                var j = new ua(a, e, 0, 0, g, 2, e, !1, c);
                return (j.plugin = h), (j.setRatio = b(a, d, f._tween, e)), j;
              },
              priority: c,
            });
          }),
          (g.useSVGTransformAttr = !0);
        var Ba,
          Ca =
            "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
              ","
            ),
          Da = Z("transform"),
          Ea = X + "transform",
          Fa = Z("transformOrigin"),
          Ga = null !== Z("perspective"),
          Ha = (S.Transform = function () {
            (this.perspective = parseFloat(g.defaultTransformPerspective) || 0),
              (this.force3D =
                g.defaultForce3D !== !1 && Ga
                  ? g.defaultForce3D || "auto"
                  : !1);
          }),
          Ia = _gsScope.SVGElement,
          Ja = function (a, b, c) {
            var d,
              e = O.createElementNS("http://www.w3.org/2000/svg", a),
              f = /([a-z])([A-Z])/g;
            for (d in c)
              e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
            return b.appendChild(e), e;
          },
          Ka = O.documentElement || {},
          La = (function () {
            var a,
              b,
              c,
              d = p || (/Android/i.test(T) && !_gsScope.chrome);
            return (
              O.createElementNS &&
                !d &&
                ((a = Ja("svg", Ka)),
                (b = Ja("rect", a, { width: 100, height: 50, x: 100 })),
                (c = b.getBoundingClientRect().width),
                (b.style[Fa] = "50% 50%"),
                (b.style[Da] = "scaleX(0.5)"),
                (d = c === b.getBoundingClientRect().width && !(n && Ga)),
                Ka.removeChild(a)),
              d
            );
          })(),
          Ma = function (a, b, c, d, e, f) {
            var h,
              i,
              j,
              k,
              l,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              t,
              u,
              v = a._gsTransform,
              w = Ra(a, !0);
            v && ((t = v.xOrigin), (u = v.yOrigin)),
              (!d || (h = d.split(" ")).length < 2) &&
                ((n = a.getBBox()),
                0 === n.x &&
                  0 === n.y &&
                  n.width + n.height === 0 &&
                  (n = {
                    x:
                      parseFloat(
                        a.hasAttribute("x")
                          ? a.getAttribute("x")
                          : a.hasAttribute("cx")
                          ? a.getAttribute("cx")
                          : 0
                      ) || 0,
                    y:
                      parseFloat(
                        a.hasAttribute("y")
                          ? a.getAttribute("y")
                          : a.hasAttribute("cy")
                          ? a.getAttribute("cy")
                          : 0
                      ) || 0,
                    width: 0,
                    height: 0,
                  }),
                (b = ia(b).split(" ")),
                (h = [
                  (-1 !== b[0].indexOf("%")
                    ? (parseFloat(b[0]) / 100) * n.width
                    : parseFloat(b[0])) + n.x,
                  (-1 !== b[1].indexOf("%")
                    ? (parseFloat(b[1]) / 100) * n.height
                    : parseFloat(b[1])) + n.y,
                ])),
              (c.xOrigin = k = parseFloat(h[0])),
              (c.yOrigin = l = parseFloat(h[1])),
              d &&
                w !== Qa &&
                ((m = w[0]),
                (n = w[1]),
                (o = w[2]),
                (p = w[3]),
                (q = w[4]),
                (r = w[5]),
                (s = m * p - n * o),
                s &&
                  ((i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s),
                  (j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s),
                  (k = c.xOrigin = h[0] = i),
                  (l = c.yOrigin = h[1] = j))),
              v &&
                (f &&
                  ((c.xOffset = v.xOffset), (c.yOffset = v.yOffset), (v = c)),
                e || (e !== !1 && g.defaultSmoothOrigin !== !1)
                  ? ((i = k - t),
                    (j = l - u),
                    (v.xOffset += i * w[0] + j * w[2] - i),
                    (v.yOffset += i * w[1] + j * w[3] - j))
                  : (v.xOffset = v.yOffset = 0)),
              f || a.setAttribute("data-svg-origin", h.join(" "));
          },
          Na = function (a) {
            var b,
              c = P(
                "svg",
                (this.ownerSVGElement &&
                  this.ownerSVGElement.getAttribute("xmlns")) ||
                  "http://www.w3.org/2000/svg"
              ),
              d = this.parentNode,
              e = this.nextSibling,
              f = this.style.cssText;
            if (
              (Ka.appendChild(c),
              c.appendChild(this),
              (this.style.display = "block"),
              a)
            )
              try {
                (b = this.getBBox()),
                  (this._originalGetBBox = this.getBBox),
                  (this.getBBox = Na);
              } catch (g) {}
            else this._originalGetBBox && (b = this._originalGetBBox());
            return (
              e ? d.insertBefore(this, e) : d.appendChild(this),
              Ka.removeChild(c),
              (this.style.cssText = f),
              b
            );
          },
          Oa = function (a) {
            try {
              return a.getBBox();
            } catch (b) {
              return Na.call(a, !0);
            }
          },
          Pa = function (a) {
            return !(
              !Ia ||
              !a.getCTM ||
              (a.parentNode && !a.ownerSVGElement) ||
              !Oa(a)
            );
          },
          Qa = [1, 0, 0, 1, 0, 0],
          Ra = function (a, b) {
            var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j = a._gsTransform || new Ha(),
              k = 1e5,
              l = a.style;
            if (
              (Da
                ? (d = aa(a, Ea, null, !0))
                : a.currentStyle &&
                  ((d = a.currentStyle.filter.match(G)),
                  (d =
                    d && 4 === d.length
                      ? [
                          d[0].substr(4),
                          Number(d[2].substr(4)),
                          Number(d[1].substr(4)),
                          d[3].substr(4),
                          j.x || 0,
                          j.y || 0,
                        ].join(",")
                      : "")),
              (c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d),
              Da &&
                c &&
                !a.offsetParent &&
                ((f = l.display),
                (l.display = "block"),
                (i = a.parentNode),
                (i && a.offsetParent) ||
                  ((g = 1), (h = a.nextSibling), Ka.appendChild(a)),
                (d = aa(a, Ea, null, !0)),
                (c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d),
                f ? (l.display = f) : Wa(l, "display"),
                g &&
                  (h
                    ? i.insertBefore(a, h)
                    : i
                    ? i.appendChild(a)
                    : Ka.removeChild(a))),
              (j.svg || (a.getCTM && Pa(a))) &&
                (c &&
                  -1 !== (l[Da] + "").indexOf("matrix") &&
                  ((d = l[Da]), (c = 0)),
                (e = a.getAttribute("transform")),
                c &&
                  e &&
                  ((e = a.transform.baseVal.consolidate().matrix),
                  (d =
                    "matrix(" +
                    e.a +
                    "," +
                    e.b +
                    "," +
                    e.c +
                    "," +
                    e.d +
                    "," +
                    e.e +
                    "," +
                    e.f +
                    ")"),
                  (c = 0))),
              c)
            )
              return Qa;
            for (e = (d || "").match(s) || [], xa = e.length; --xa > -1; )
              (f = Number(e[xa])),
                (e[xa] = (g = f - (f |= 0))
                  ? ((g * k + (0 > g ? -0.5 : 0.5)) | 0) / k + f
                  : f);
            return b && e.length > 6
              ? [e[0], e[1], e[4], e[5], e[12], e[13]]
              : e;
          },
          Sa = (S.getTransform = function (a, c, d, e) {
            if (a._gsTransform && d && !e) return a._gsTransform;
            var f,
              h,
              i,
              j,
              k,
              l,
              m = d ? a._gsTransform || new Ha() : new Ha(),
              n = m.scaleX < 0,
              o = 2e-5,
              p = 1e5,
              q = Ga
                ? parseFloat(aa(a, Fa, c, !1, "0 0 0").split(" ")[2]) ||
                  m.zOrigin ||
                  0
                : 0,
              r = parseFloat(g.defaultTransformPerspective) || 0;
            if (
              ((m.svg = !(!a.getCTM || !Pa(a))),
              m.svg &&
                (Ma(
                  a,
                  aa(a, Fa, c, !1, "50% 50%") + "",
                  m,
                  a.getAttribute("data-svg-origin")
                ),
                (Ba = g.useSVGTransformAttr || La)),
              (f = Ra(a)),
              f !== Qa)
            ) {
              if (16 === f.length) {
                var s,
                  t,
                  u,
                  v,
                  w,
                  x = f[0],
                  y = f[1],
                  z = f[2],
                  A = f[3],
                  B = f[4],
                  C = f[5],
                  D = f[6],
                  E = f[7],
                  F = f[8],
                  G = f[9],
                  H = f[10],
                  I = f[12],
                  J = f[13],
                  K = f[14],
                  M = f[11],
                  N = Math.atan2(D, H);
                m.zOrigin &&
                  ((K = -m.zOrigin),
                  (I = F * K - f[12]),
                  (J = G * K - f[13]),
                  (K = H * K + m.zOrigin - f[14])),
                  (m.rotationX = N * L),
                  N &&
                    ((v = Math.cos(-N)),
                    (w = Math.sin(-N)),
                    (s = B * v + F * w),
                    (t = C * v + G * w),
                    (u = D * v + H * w),
                    (F = B * -w + F * v),
                    (G = C * -w + G * v),
                    (H = D * -w + H * v),
                    (M = E * -w + M * v),
                    (B = s),
                    (C = t),
                    (D = u)),
                  (N = Math.atan2(-z, H)),
                  (m.rotationY = N * L),
                  N &&
                    ((v = Math.cos(-N)),
                    (w = Math.sin(-N)),
                    (s = x * v - F * w),
                    (t = y * v - G * w),
                    (u = z * v - H * w),
                    (G = y * w + G * v),
                    (H = z * w + H * v),
                    (M = A * w + M * v),
                    (x = s),
                    (y = t),
                    (z = u)),
                  (N = Math.atan2(y, x)),
                  (m.rotation = N * L),
                  N &&
                    ((v = Math.cos(N)),
                    (w = Math.sin(N)),
                    (s = x * v + y * w),
                    (t = B * v + C * w),
                    (u = F * v + G * w),
                    (y = y * v - x * w),
                    (C = C * v - B * w),
                    (G = G * v - F * w),
                    (x = s),
                    (B = t),
                    (F = u)),
                  m.rotationX &&
                    Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 &&
                    ((m.rotationX = m.rotation = 0),
                    (m.rotationY = 180 - m.rotationY)),
                  (N = Math.atan2(B, C)),
                  (m.scaleX =
                    ((Math.sqrt(x * x + y * y + z * z) * p + 0.5) | 0) / p),
                  (m.scaleY = ((Math.sqrt(C * C + D * D) * p + 0.5) | 0) / p),
                  (m.scaleZ =
                    ((Math.sqrt(F * F + G * G + H * H) * p + 0.5) | 0) / p),
                  (x /= m.scaleX),
                  (B /= m.scaleY),
                  (y /= m.scaleX),
                  (C /= m.scaleY),
                  Math.abs(N) > o
                    ? ((m.skewX = N * L),
                      (B = 0),
                      "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N)))
                    : (m.skewX = 0),
                  (m.perspective = M ? 1 / (0 > M ? -M : M) : 0),
                  (m.x = I),
                  (m.y = J),
                  (m.z = K),
                  m.svg &&
                    ((m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B)),
                    (m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C)));
              } else if (
                !Ga ||
                e ||
                !f.length ||
                m.x !== f[4] ||
                m.y !== f[5] ||
                (!m.rotationX && !m.rotationY)
              ) {
                var O = f.length >= 6,
                  P = O ? f[0] : 1,
                  Q = f[1] || 0,
                  R = f[2] || 0,
                  S = O ? f[3] : 1;
                (m.x = f[4] || 0),
                  (m.y = f[5] || 0),
                  (i = Math.sqrt(P * P + Q * Q)),
                  (j = Math.sqrt(S * S + R * R)),
                  (k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0),
                  (l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0),
                  (m.scaleX = i),
                  (m.scaleY = j),
                  (m.rotation = k),
                  (m.skewX = l),
                  Ga &&
                    ((m.rotationX = m.rotationY = m.z = 0),
                    (m.perspective = r),
                    (m.scaleZ = 1)),
                  m.svg &&
                    ((m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R)),
                    (m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S)));
              }
              Math.abs(m.skewX) > 90 &&
                Math.abs(m.skewX) < 270 &&
                (n
                  ? ((m.scaleX *= -1),
                    (m.skewX += m.rotation <= 0 ? 180 : -180),
                    (m.rotation += m.rotation <= 0 ? 180 : -180))
                  : ((m.scaleY *= -1), (m.skewX += m.skewX <= 0 ? 180 : -180))),
                (m.zOrigin = q);
              for (h in m) m[h] < o && m[h] > -o && (m[h] = 0);
            }
            return (
              d &&
                ((a._gsTransform = m),
                m.svg &&
                  (Ba && a.style[Da]
                    ? b.delayedCall(0.001, function () {
                        Wa(a.style, Da);
                      })
                    : !Ba &&
                      a.getAttribute("transform") &&
                      b.delayedCall(0.001, function () {
                        a.removeAttribute("transform");
                      }))),
              m
            );
          }),
          Ta = function (a) {
            var b,
              c,
              d = this.data,
              e = -d.rotation * K,
              f = e + d.skewX * K,
              g = 1e5,
              h = ((Math.cos(e) * d.scaleX * g) | 0) / g,
              i = ((Math.sin(e) * d.scaleX * g) | 0) / g,
              j = ((Math.sin(f) * -d.scaleY * g) | 0) / g,
              k = ((Math.cos(f) * d.scaleY * g) | 0) / g,
              l = this.t.style,
              m = this.t.currentStyle;
            if (m) {
              (c = i), (i = -j), (j = -c), (b = m.filter), (l.filter = "");
              var n,
                o,
                q = this.t.offsetWidth,
                r = this.t.offsetHeight,
                s = "absolute" !== m.position,
                t =
                  "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                  h +
                  ", M12=" +
                  i +
                  ", M21=" +
                  j +
                  ", M22=" +
                  k,
                u = d.x + (q * d.xPercent) / 100,
                v = d.y + (r * d.yPercent) / 100;
              if (
                (null != d.ox &&
                  ((n = (d.oxp ? q * d.ox * 0.01 : d.ox) - q / 2),
                  (o = (d.oyp ? r * d.oy * 0.01 : d.oy) - r / 2),
                  (u += n - (n * h + o * i)),
                  (v += o - (n * j + o * k))),
                s
                  ? ((n = q / 2),
                    (o = r / 2),
                    (t +=
                      ", Dx=" +
                      (n - (n * h + o * i) + u) +
                      ", Dy=" +
                      (o - (n * j + o * k) + v) +
                      ")"))
                  : (t += ", sizingMethod='auto expand')"),
                -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(")
                  ? (l.filter = b.replace(H, t))
                  : (l.filter = t + " " + b),
                (0 === a || 1 === a) &&
                  1 === h &&
                  0 === i &&
                  0 === j &&
                  1 === k &&
                  ((s && -1 === t.indexOf("Dx=0, Dy=0")) ||
                    (x.test(b) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === b.indexOf(b.indexOf("Alpha")) &&
                      l.removeAttribute("filter"))),
                !s)
              ) {
                var y,
                  z,
                  A,
                  B = 8 > p ? 1 : -1;
                for (
                  n = d.ieOffsetX || 0,
                    o = d.ieOffsetY || 0,
                    d.ieOffsetX = Math.round(
                      (q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 +
                        u
                    ),
                    d.ieOffsetY = Math.round(
                      (r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 +
                        v
                    ),
                    xa = 0;
                  4 > xa;
                  xa++
                )
                  (z = ga[xa]),
                    (y = m[z]),
                    (c =
                      -1 !== y.indexOf("px")
                        ? parseFloat(y)
                        : ba(this.t, z, parseFloat(y), y.replace(w, "")) || 0),
                    (A =
                      c !== d[z]
                        ? 2 > xa
                          ? -d.ieOffsetX
                          : -d.ieOffsetY
                        : 2 > xa
                        ? n - d.ieOffsetX
                        : o - d.ieOffsetY),
                    (l[z] =
                      (d[z] = Math.round(
                        c - A * (0 === xa || 2 === xa ? 1 : B)
                      )) + "px");
              }
            }
          },
          Ua =
            (S.set3DTransformRatio =
            S.setTransformRatio =
              function (a) {
                var b,
                  c,
                  d,
                  e,
                  f,
                  g,
                  h,
                  i,
                  j,
                  k,
                  l,
                  m,
                  o,
                  p,
                  q,
                  r,
                  s,
                  t,
                  u,
                  v,
                  w,
                  x,
                  y,
                  z = this.data,
                  A = this.t.style,
                  B = z.rotation,
                  C = z.rotationX,
                  D = z.rotationY,
                  E = z.scaleX,
                  F = z.scaleY,
                  G = z.scaleZ,
                  H = z.x,
                  I = z.y,
                  J = z.z,
                  L = z.svg,
                  M = z.perspective,
                  N = z.force3D,
                  O = z.skewY,
                  P = z.skewX;
                if (
                  (O && ((P += O), (B += O)),
                  ((((1 === a || 0 === a) &&
                    "auto" === N &&
                    (this.tween._totalTime === this.tween._totalDuration ||
                      !this.tween._totalTime)) ||
                    !N) &&
                    !J &&
                    !M &&
                    !D &&
                    !C &&
                    1 === G) ||
                    (Ba && L) ||
                    !Ga)
                )
                  return void (B || P || L
                    ? ((B *= K),
                      (x = P * K),
                      (y = 1e5),
                      (c = Math.cos(B) * E),
                      (f = Math.sin(B) * E),
                      (d = Math.sin(B - x) * -F),
                      (g = Math.cos(B - x) * F),
                      x &&
                        "simple" === z.skewType &&
                        ((b = Math.tan(x - O * K)),
                        (b = Math.sqrt(1 + b * b)),
                        (d *= b),
                        (g *= b),
                        O &&
                          ((b = Math.tan(O * K)),
                          (b = Math.sqrt(1 + b * b)),
                          (c *= b),
                          (f *= b))),
                      L &&
                        ((H +=
                          z.xOrigin -
                          (z.xOrigin * c + z.yOrigin * d) +
                          z.xOffset),
                        (I +=
                          z.yOrigin -
                          (z.xOrigin * f + z.yOrigin * g) +
                          z.yOffset),
                        Ba &&
                          (z.xPercent || z.yPercent) &&
                          ((q = this.t.getBBox()),
                          (H += 0.01 * z.xPercent * q.width),
                          (I += 0.01 * z.yPercent * q.height)),
                        (q = 1e-6),
                        q > H && H > -q && (H = 0),
                        q > I && I > -q && (I = 0)),
                      (u =
                        ((c * y) | 0) / y +
                        "," +
                        ((f * y) | 0) / y +
                        "," +
                        ((d * y) | 0) / y +
                        "," +
                        ((g * y) | 0) / y +
                        "," +
                        H +
                        "," +
                        I +
                        ")"),
                      L && Ba
                        ? this.t.setAttribute("transform", "matrix(" + u)
                        : (A[Da] =
                            (z.xPercent || z.yPercent
                              ? "translate(" +
                                z.xPercent +
                                "%," +
                                z.yPercent +
                                "%) matrix("
                              : "matrix(") + u))
                    : (A[Da] =
                        (z.xPercent || z.yPercent
                          ? "translate(" +
                            z.xPercent +
                            "%," +
                            z.yPercent +
                            "%) matrix("
                          : "matrix(") +
                        E +
                        ",0,0," +
                        F +
                        "," +
                        H +
                        "," +
                        I +
                        ")"));
                if (
                  (n &&
                    ((q = 1e-4),
                    q > E && E > -q && (E = G = 2e-5),
                    q > F && F > -q && (F = G = 2e-5),
                    !M || z.z || z.rotationX || z.rotationY || (M = 0)),
                  B || P)
                )
                  (B *= K),
                    (r = c = Math.cos(B)),
                    (s = f = Math.sin(B)),
                    P &&
                      ((B -= P * K),
                      (r = Math.cos(B)),
                      (s = Math.sin(B)),
                      "simple" === z.skewType &&
                        ((b = Math.tan((P - O) * K)),
                        (b = Math.sqrt(1 + b * b)),
                        (r *= b),
                        (s *= b),
                        z.skewY &&
                          ((b = Math.tan(O * K)),
                          (b = Math.sqrt(1 + b * b)),
                          (c *= b),
                          (f *= b)))),
                    (d = -s),
                    (g = r);
                else {
                  if (!(D || C || 1 !== G || M || L))
                    return void (A[Da] =
                      (z.xPercent || z.yPercent
                        ? "translate(" +
                          z.xPercent +
                          "%," +
                          z.yPercent +
                          "%) translate3d("
                        : "translate3d(") +
                      H +
                      "px," +
                      I +
                      "px," +
                      J +
                      "px)" +
                      (1 !== E || 1 !== F
                        ? " scale(" + E + "," + F + ")"
                        : ""));
                  (c = g = 1), (d = f = 0);
                }
                (k = 1),
                  (e = h = i = j = l = m = 0),
                  (o = M ? -1 / M : 0),
                  (p = z.zOrigin),
                  (q = 1e-6),
                  (v = ","),
                  (w = "0"),
                  (B = D * K),
                  B &&
                    ((r = Math.cos(B)),
                    (s = Math.sin(B)),
                    (i = -s),
                    (l = o * -s),
                    (e = c * s),
                    (h = f * s),
                    (k = r),
                    (o *= r),
                    (c *= r),
                    (f *= r)),
                  (B = C * K),
                  B &&
                    ((r = Math.cos(B)),
                    (s = Math.sin(B)),
                    (b = d * r + e * s),
                    (t = g * r + h * s),
                    (j = k * s),
                    (m = o * s),
                    (e = d * -s + e * r),
                    (h = g * -s + h * r),
                    (k *= r),
                    (o *= r),
                    (d = b),
                    (g = t)),
                  1 !== G && ((e *= G), (h *= G), (k *= G), (o *= G)),
                  1 !== F && ((d *= F), (g *= F), (j *= F), (m *= F)),
                  1 !== E && ((c *= E), (f *= E), (i *= E), (l *= E)),
                  (p || L) &&
                    (p && ((H += e * -p), (I += h * -p), (J += k * -p + p)),
                    L &&
                      ((H +=
                        z.xOrigin -
                        (z.xOrigin * c + z.yOrigin * d) +
                        z.xOffset),
                      (I +=
                        z.yOrigin -
                        (z.xOrigin * f + z.yOrigin * g) +
                        z.yOffset)),
                    q > H && H > -q && (H = w),
                    q > I && I > -q && (I = w),
                    q > J && J > -q && (J = 0)),
                  (u =
                    z.xPercent || z.yPercent
                      ? "translate(" +
                        z.xPercent +
                        "%," +
                        z.yPercent +
                        "%) matrix3d("
                      : "matrix3d("),
                  (u +=
                    (q > c && c > -q ? w : c) +
                    v +
                    (q > f && f > -q ? w : f) +
                    v +
                    (q > i && i > -q ? w : i)),
                  (u +=
                    v +
                    (q > l && l > -q ? w : l) +
                    v +
                    (q > d && d > -q ? w : d) +
                    v +
                    (q > g && g > -q ? w : g)),
                  C || D || 1 !== G
                    ? ((u +=
                        v +
                        (q > j && j > -q ? w : j) +
                        v +
                        (q > m && m > -q ? w : m) +
                        v +
                        (q > e && e > -q ? w : e)),
                      (u +=
                        v +
                        (q > h && h > -q ? w : h) +
                        v +
                        (q > k && k > -q ? w : k) +
                        v +
                        (q > o && o > -q ? w : o) +
                        v))
                    : (u += ",0,0,0,0,1,0,"),
                  (u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")"),
                  (A[Da] = u);
              });
        (j = Ha.prototype),
          (j.x =
            j.y =
            j.z =
            j.skewX =
            j.skewY =
            j.rotation =
            j.rotationX =
            j.rotationY =
            j.zOrigin =
            j.xPercent =
            j.yPercent =
            j.xOffset =
            j.yOffset =
              0),
          (j.scaleX = j.scaleY = j.scaleZ = 1),
          za(
            "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
            {
              parser: function (a, b, c, d, f, h, i) {
                if (d._lastParsedTransform === i) return f;
                d._lastParsedTransform = i;
                var j = i.scale && "function" == typeof i.scale ? i.scale : 0;
                j && (i.scale = j(r, a));
                var k,
                  l,
                  m,
                  n,
                  o,
                  p,
                  s,
                  t,
                  u,
                  v = a._gsTransform,
                  w = a.style,
                  x = 1e-6,
                  y = Ca.length,
                  z = i,
                  A = {},
                  B = "transformOrigin",
                  C = Sa(a, e, !0, z.parseTransform),
                  D =
                    z.transform &&
                    ("function" == typeof z.transform
                      ? z.transform(r, q)
                      : z.transform);
                if (
                  ((C.skewType = z.skewType || C.skewType || g.defaultSkewType),
                  (d._transform = C),
                  "rotationZ" in z && (z.rotation = z.rotationZ),
                  D && "string" == typeof D && Da)
                )
                  (l = Q.style),
                    (l[Da] = D),
                    (l.display = "block"),
                    (l.position = "absolute"),
                    -1 !== D.indexOf("%") &&
                      ((l.width = aa(a, "width")),
                      (l.height = aa(a, "height"))),
                    O.body.appendChild(Q),
                    (k = Sa(Q, null, !1)),
                    "simple" === C.skewType &&
                      (k.scaleY *= Math.cos(k.skewX * K)),
                    C.svg &&
                      ((p = C.xOrigin),
                      (s = C.yOrigin),
                      (k.x -= C.xOffset),
                      (k.y -= C.yOffset),
                      (z.transformOrigin || z.svgOrigin) &&
                        ((D = {}),
                        Ma(
                          a,
                          ia(z.transformOrigin),
                          D,
                          z.svgOrigin,
                          z.smoothOrigin,
                          !0
                        ),
                        (p = D.xOrigin),
                        (s = D.yOrigin),
                        (k.x -= D.xOffset - C.xOffset),
                        (k.y -= D.yOffset - C.yOffset)),
                      (p || s) &&
                        ((t = Ra(Q, !0)),
                        (k.x -= p - (p * t[0] + s * t[2])),
                        (k.y -= s - (p * t[1] + s * t[3])))),
                    O.body.removeChild(Q),
                    k.perspective || (k.perspective = C.perspective),
                    null != z.xPercent &&
                      (k.xPercent = ka(z.xPercent, C.xPercent)),
                    null != z.yPercent &&
                      (k.yPercent = ka(z.yPercent, C.yPercent));
                else if ("object" == typeof z) {
                  if (
                    ((k = {
                      scaleX: ka(
                        null != z.scaleX ? z.scaleX : z.scale,
                        C.scaleX
                      ),
                      scaleY: ka(
                        null != z.scaleY ? z.scaleY : z.scale,
                        C.scaleY
                      ),
                      scaleZ: ka(z.scaleZ, C.scaleZ),
                      x: ka(z.x, C.x),
                      y: ka(z.y, C.y),
                      z: ka(z.z, C.z),
                      xPercent: ka(z.xPercent, C.xPercent),
                      yPercent: ka(z.yPercent, C.yPercent),
                      perspective: ka(z.transformPerspective, C.perspective),
                    }),
                    (o = z.directionalRotation),
                    null != o)
                  )
                    if ("object" == typeof o) for (l in o) z[l] = o[l];
                    else z.rotation = o;
                  "string" == typeof z.x &&
                    -1 !== z.x.indexOf("%") &&
                    ((k.x = 0), (k.xPercent = ka(z.x, C.xPercent))),
                    "string" == typeof z.y &&
                      -1 !== z.y.indexOf("%") &&
                      ((k.y = 0), (k.yPercent = ka(z.y, C.yPercent))),
                    (k.rotation = la(
                      "rotation" in z
                        ? z.rotation
                        : "shortRotation" in z
                        ? z.shortRotation + "_short"
                        : C.rotation,
                      C.rotation,
                      "rotation",
                      A
                    )),
                    Ga &&
                      ((k.rotationX = la(
                        "rotationX" in z
                          ? z.rotationX
                          : "shortRotationX" in z
                          ? z.shortRotationX + "_short"
                          : C.rotationX || 0,
                        C.rotationX,
                        "rotationX",
                        A
                      )),
                      (k.rotationY = la(
                        "rotationY" in z
                          ? z.rotationY
                          : "shortRotationY" in z
                          ? z.shortRotationY + "_short"
                          : C.rotationY || 0,
                        C.rotationY,
                        "rotationY",
                        A
                      ))),
                    (k.skewX = la(z.skewX, C.skewX)),
                    (k.skewY = la(z.skewY, C.skewY));
                }
                for (
                  Ga &&
                    null != z.force3D &&
                    ((C.force3D = z.force3D), (n = !0)),
                    m =
                      C.force3D ||
                      C.z ||
                      C.rotationX ||
                      C.rotationY ||
                      k.z ||
                      k.rotationX ||
                      k.rotationY ||
                      k.perspective,
                    m || null == z.scale || (k.scaleZ = 1);
                  --y > -1;

                )
                  (u = Ca[y]),
                    (D = k[u] - C[u]),
                    (D > x || -x > D || null != z[u] || null != M[u]) &&
                      ((n = !0),
                      (f = new ua(C, u, C[u], D, f)),
                      u in A && (f.e = A[u]),
                      (f.xs0 = 0),
                      (f.plugin = h),
                      d._overwriteProps.push(f.n));
                return (
                  (D =
                    "function" == typeof z.transformOrigin
                      ? z.transformOrigin(r, q)
                      : z.transformOrigin),
                  C.svg &&
                    (D || z.svgOrigin) &&
                    ((p = C.xOffset),
                    (s = C.yOffset),
                    Ma(a, ia(D), k, z.svgOrigin, z.smoothOrigin),
                    (f = va(
                      C,
                      "xOrigin",
                      (v ? C : k).xOrigin,
                      k.xOrigin,
                      f,
                      B
                    )),
                    (f = va(
                      C,
                      "yOrigin",
                      (v ? C : k).yOrigin,
                      k.yOrigin,
                      f,
                      B
                    )),
                    (p !== C.xOffset || s !== C.yOffset) &&
                      ((f = va(
                        C,
                        "xOffset",
                        v ? p : C.xOffset,
                        C.xOffset,
                        f,
                        B
                      )),
                      (f = va(
                        C,
                        "yOffset",
                        v ? s : C.yOffset,
                        C.yOffset,
                        f,
                        B
                      ))),
                    (D = "0px 0px")),
                  (D || (Ga && m && C.zOrigin)) &&
                    (Da
                      ? ((n = !0),
                        (u = Fa),
                        D ||
                          ((D = (aa(a, u, e, !1, "50% 50%") + "").split(" ")),
                          (D = D[0] + " " + D[1] + " " + C.zOrigin + "px")),
                        (D += ""),
                        (f = new ua(w, u, 0, 0, f, -1, B)),
                        (f.b = w[u]),
                        (f.plugin = h),
                        Ga
                          ? ((l = C.zOrigin),
                            (D = D.split(" ")),
                            (C.zOrigin =
                              (D.length > 2 ? parseFloat(D[2]) : l) || 0),
                            (f.xs0 = f.e =
                              D[0] + " " + (D[1] || "50%") + " 0px"),
                            (f = new ua(C, "zOrigin", 0, 0, f, -1, f.n)),
                            (f.b = l),
                            (f.xs0 = f.e = C.zOrigin))
                          : (f.xs0 = f.e = D))
                      : ia(D + "", C)),
                  n &&
                    (d._transformType =
                      (C.svg && Ba) || (!m && 3 !== this._transformType)
                        ? 2
                        : 3),
                  j && (i.scale = j),
                  f
                );
              },
              allowFunc: !0,
              prefix: !0,
            }
          ),
          za("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          za("clipPath", {
            defaultValue: "inset(0px)",
            prefix: !0,
            multi: !0,
            formatter: ra("inset(0px 0px 0px 0px)", !1, !0),
          }),
          za("borderRadius", {
            defaultValue: "0px",
            parser: function (a, b, c, f, g, h) {
              b = this.format(b);
              var i,
                j,
                k,
                l,
                m,
                n,
                o,
                p,
                q,
                r,
                s,
                t,
                u,
                v,
                w,
                x,
                y = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                z = a.style;
              for (
                q = parseFloat(a.offsetWidth),
                  r = parseFloat(a.offsetHeight),
                  i = b.split(" "),
                  j = 0;
                j < y.length;
                j++
              )
                this.p.indexOf("border") && (y[j] = Z(y[j])),
                  (m = l = aa(a, y[j], e, !1, "0px")),
                  -1 !== m.indexOf(" ") &&
                    ((l = m.split(" ")), (m = l[0]), (l = l[1])),
                  (n = k = i[j]),
                  (o = parseFloat(m)),
                  (t = m.substr((o + "").length)),
                  (u = "=" === n.charAt(1)),
                  u
                    ? ((p = parseInt(n.charAt(0) + "1", 10)),
                      (n = n.substr(2)),
                      (p *= parseFloat(n)),
                      (s = n.substr((p + "").length - (0 > p ? 1 : 0)) || ""))
                    : ((p = parseFloat(n)), (s = n.substr((p + "").length))),
                  "" === s && (s = d[c] || t),
                  s !== t &&
                    ((v = ba(a, "borderLeft", o, t)),
                    (w = ba(a, "borderTop", o, t)),
                    "%" === s
                      ? ((m = (v / q) * 100 + "%"), (l = (w / r) * 100 + "%"))
                      : "em" === s
                      ? ((x = ba(a, "borderLeft", 1, "em")),
                        (m = v / x + "em"),
                        (l = w / x + "em"))
                      : ((m = v + "px"), (l = w + "px")),
                    u &&
                      ((n = parseFloat(m) + p + s),
                      (k = parseFloat(l) + p + s))),
                  (g = wa(z, y[j], m + " " + l, n + " " + k, !1, "0px", g));
              return g;
            },
            prefix: !0,
            formatter: ra("0px 0px 0px 0px", !1, !0),
          }),
          za(
            "borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
            {
              defaultValue: "0px",
              parser: function (a, b, c, d, f, g) {
                return wa(
                  a.style,
                  c,
                  this.format(aa(a, c, e, !1, "0px 0px")),
                  this.format(b),
                  !1,
                  "0px",
                  f
                );
              },
              prefix: !0,
              formatter: ra("0px 0px", !1, !0),
            }
          ),
          za("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (a, b, c, d, f, g) {
              var h,
                i,
                j,
                k,
                l,
                m,
                n = "background-position",
                o = e || _(a, null),
                q = this.format(
                  (o
                    ? p
                      ? o.getPropertyValue(n + "-x") +
                        " " +
                        o.getPropertyValue(n + "-y")
                      : o.getPropertyValue(n)
                    : a.currentStyle.backgroundPositionX +
                      " " +
                      a.currentStyle.backgroundPositionY) || "0 0"
                ),
                r = this.format(b);
              if (
                (-1 !== q.indexOf("%")) != (-1 !== r.indexOf("%")) &&
                r.split(",").length < 2 &&
                ((m = aa(a, "backgroundImage").replace(D, "")),
                m && "none" !== m)
              ) {
                for (
                  h = q.split(" "),
                    i = r.split(" "),
                    R.setAttribute("src", m),
                    j = 2;
                  --j > -1;

                )
                  (q = h[j]),
                    (k = -1 !== q.indexOf("%")),
                    k !== (-1 !== i[j].indexOf("%")) &&
                      ((l =
                        0 === j
                          ? a.offsetWidth - R.width
                          : a.offsetHeight - R.height),
                      (h[j] = k
                        ? (parseFloat(q) / 100) * l + "px"
                        : (parseFloat(q) / l) * 100 + "%"));
                q = h.join(" ");
              }
              return this.parseComplex(a.style, q, r, f, g);
            },
            formatter: ia,
          }),
          za("backgroundSize", {
            defaultValue: "0 0",
            formatter: function (a) {
              return (
                (a += ""),
                "co" === a.substr(0, 2)
                  ? a
                  : ia(-1 === a.indexOf(" ") ? a + " " + a : a)
              );
            },
          }),
          za("perspective", { defaultValue: "0px", prefix: !0 }),
          za("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
          za("transformStyle", { prefix: !0 }),
          za("backfaceVisibility", { prefix: !0 }),
          za("userSelect", { prefix: !0 }),
          za("margin", {
            parser: sa("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          za("padding", {
            parser: sa("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          za("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (a, b, c, d, f, g) {
              var h, i, j;
              return (
                9 > p
                  ? ((i = a.currentStyle),
                    (j = 8 > p ? " " : ","),
                    (h =
                      "rect(" +
                      i.clipTop +
                      j +
                      i.clipRight +
                      j +
                      i.clipBottom +
                      j +
                      i.clipLeft +
                      ")"),
                    (b = this.format(b).split(",").join(j)))
                  : ((h = this.format(aa(a, this.p, e, !1, this.dflt))),
                    (b = this.format(b))),
                this.parseComplex(a.style, h, b, f, g)
              );
            },
          }),
          za("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          za("autoRound,strictUnits", {
            parser: function (a, b, c, d, e) {
              return e;
            },
          }),
          za("border", {
            defaultValue: "0px solid #000",
            parser: function (a, b, c, d, f, g) {
              var h = aa(a, "borderTopWidth", e, !1, "0px"),
                i = this.format(b).split(" "),
                j = i[0].replace(w, "");
              return (
                "px" !== j &&
                  (h = parseFloat(h) / ba(a, "borderTopWidth", 1, j) + j),
                this.parseComplex(
                  a.style,
                  this.format(
                    h +
                      " " +
                      aa(a, "borderTopStyle", e, !1, "solid") +
                      " " +
                      aa(a, "borderTopColor", e, !1, "#000")
                  ),
                  i.join(" "),
                  f,
                  g
                )
              );
            },
            color: !0,
            formatter: function (a) {
              var b = a.split(" ");
              return (
                b[0] +
                " " +
                (b[1] || "solid") +
                " " +
                (a.match(qa) || ["#000"])[0]
              );
            },
          }),
          za("borderWidth", {
            parser: sa(
              "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
            ),
          }),
          za("float,cssFloat,styleFloat", {
            parser: function (a, b, c, d, e, f) {
              var g = a.style,
                h = "cssFloat" in g ? "cssFloat" : "styleFloat";
              return new ua(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
            },
          });
        var Va = function (a) {
          var b,
            c = this.t,
            d = c.filter || aa(this.data, "filter") || "",
            e = (this.s + this.c * a) | 0;
          100 === e &&
            (-1 === d.indexOf("atrix(") &&
            -1 === d.indexOf("radient(") &&
            -1 === d.indexOf("oader(")
              ? (c.removeAttribute("filter"), (b = !aa(this.data, "filter")))
              : ((c.filter = d.replace(z, "")), (b = !0))),
            b ||
              (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"),
              -1 === d.indexOf("pacity")
                ? (0 === e && this.xn1) ||
                  (c.filter = d + " alpha(opacity=" + e + ")")
                : (c.filter = d.replace(x, "opacity=" + e)));
        };
        za("opacity,alpha,autoAlpha", {
          defaultValue: "1",
          parser: function (a, b, c, d, f, g) {
            var h = parseFloat(aa(a, "opacity", e, !1, "1")),
              i = a.style,
              j = "autoAlpha" === c;
            return (
              "string" == typeof b &&
                "=" === b.charAt(1) &&
                (b =
                  ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h),
              j &&
                1 === h &&
                "hidden" === aa(a, "visibility", e) &&
                0 !== b &&
                (h = 0),
              U
                ? (f = new ua(i, "opacity", h, b - h, f))
                : ((f = new ua(i, "opacity", 100 * h, 100 * (b - h), f)),
                  (f.xn1 = j ? 1 : 0),
                  (i.zoom = 1),
                  (f.type = 2),
                  (f.b = "alpha(opacity=" + f.s + ")"),
                  (f.e = "alpha(opacity=" + (f.s + f.c) + ")"),
                  (f.data = a),
                  (f.plugin = g),
                  (f.setRatio = Va)),
              j &&
                ((f = new ua(
                  i,
                  "visibility",
                  0,
                  0,
                  f,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== h ? "inherit" : "hidden",
                  0 === b ? "hidden" : "inherit"
                )),
                (f.xs0 = "inherit"),
                d._overwriteProps.push(f.n),
                d._overwriteProps.push(c)),
              f
            );
          },
        });
        var Wa = function (a, b) {
            b &&
              (a.removeProperty
                ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) &&
                    (b = "-" + b),
                  a.removeProperty(b.replace(B, "-$1").toLowerCase()))
                : a.removeAttribute(b));
          },
          Xa = function (a) {
            if (((this.t._gsClassPT = this), 1 === a || 0 === a)) {
              this.t.setAttribute("class", 0 === a ? this.b : this.e);
              for (var b = this.data, c = this.t.style; b; )
                b.v ? (c[b.p] = b.v) : Wa(c, b.p), (b = b._next);
              1 === a &&
                this.t._gsClassPT === this &&
                (this.t._gsClassPT = null);
            } else
              this.t.getAttribute("class") !== this.e &&
                this.t.setAttribute("class", this.e);
          };
        za("className", {
          parser: function (a, b, d, f, g, h, i) {
            var j,
              k,
              l,
              m,
              n,
              o = a.getAttribute("class") || "",
              p = a.style.cssText;
            if (
              ((g = f._classNamePT = new ua(a, d, 0, 0, g, 2)),
              (g.setRatio = Xa),
              (g.pr = -11),
              (c = !0),
              (g.b = o),
              (k = da(a, e)),
              (l = a._gsClassPT))
            ) {
              for (m = {}, n = l.data; n; ) (m[n.p] = 1), (n = n._next);
              l.setRatio(1);
            }
            return (
              (a._gsClassPT = g),
              (g.e =
                "=" !== b.charAt(1)
                  ? b
                  : o.replace(
                      new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"),
                      ""
                    ) + ("+" === b.charAt(0) ? " " + b.substr(2) : "")),
              a.setAttribute("class", g.e),
              (j = ea(a, k, da(a), i, m)),
              a.setAttribute("class", o),
              (g.data = j.firstMPT),
              (a.style.cssText = p),
              (g = g.xfirst = f.parse(a, j.difs, g, h))
            );
          },
        });
        var Ya = function (a) {
          if (
            (1 === a || 0 === a) &&
            this.data._totalTime === this.data._totalDuration &&
            "isFromStart" !== this.data.data
          ) {
            var b,
              c,
              d,
              e,
              f,
              g = this.t.style,
              h = i.transform.parse;
            if ("all" === this.e) (g.cssText = ""), (e = !0);
            else
              for (
                b = this.e.split(" ").join("").split(","), d = b.length;
                --d > -1;

              )
                (c = b[d]),
                  i[c] &&
                    (i[c].parse === h
                      ? (e = !0)
                      : (c = "transformOrigin" === c ? Fa : i[c].p)),
                  Wa(g, c);
            e &&
              (Wa(g, Da),
              (f = this.t._gsTransform),
              f &&
                (f.svg &&
                  (this.t.removeAttribute("data-svg-origin"),
                  this.t.removeAttribute("transform")),
                delete this.t._gsTransform));
          }
        };
        for (
          za("clearProps", {
            parser: function (a, b, d, e, f) {
              return (
                (f = new ua(a, d, 0, 0, f, 2)),
                (f.setRatio = Ya),
                (f.e = b),
                (f.pr = -10),
                (f.data = e._tween),
                (c = !0),
                f
              );
            },
          }),
            j = "bezier,throwProps,physicsProps,physics2D".split(","),
            xa = j.length;
          xa--;

        )
          Aa(j[xa]);
        (j = g.prototype),
          (j._firstPT = j._lastParsedTransform = j._transform = null),
          (j._onInitTween = function (a, b, h, j) {
            if (!a.nodeType) return !1;
            (this._target = q = a),
              (this._tween = h),
              (this._vars = b),
              (r = j),
              (k = b.autoRound),
              (c = !1),
              (d = b.suffixMap || g.suffixMap),
              (e = _(a, "")),
              (f = this._overwriteProps);
            var n,
              p,
              s,
              t,
              u,
              v,
              w,
              x,
              z,
              A = a.style;
            if (
              (l &&
                "" === A.zIndex &&
                ((n = aa(a, "zIndex", e)),
                ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)),
              "string" == typeof b &&
                ((t = A.cssText),
                (n = da(a, e)),
                (A.cssText = t + ";" + b),
                (n = ea(a, n, da(a)).difs),
                !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)),
                (b = n),
                (A.cssText = t)),
              b.className
                ? (this._firstPT = p =
                    i.className.parse(
                      a,
                      b.className,
                      "className",
                      this,
                      null,
                      null,
                      b
                    ))
                : (this._firstPT = p = this.parse(a, b, null)),
              this._transformType)
            ) {
              for (
                z = 3 === this._transformType,
                  Da
                    ? m &&
                      ((l = !0),
                      "" === A.zIndex &&
                        ((w = aa(a, "zIndex", e)),
                        ("auto" === w || "" === w) &&
                          this._addLazySet(A, "zIndex", 0)),
                      o &&
                        this._addLazySet(
                          A,
                          "WebkitBackfaceVisibility",
                          this._vars.WebkitBackfaceVisibility ||
                            (z ? "visible" : "hidden")
                        ))
                    : (A.zoom = 1),
                  s = p;
                s && s._next;

              )
                s = s._next;
              (x = new ua(a, "transform", 0, 0, null, 2)),
                this._linkCSSP(x, null, s),
                (x.setRatio = Da ? Ua : Ta),
                (x.data = this._transform || Sa(a, e, !0)),
                (x.tween = h),
                (x.pr = -1),
                f.pop();
            }
            if (c) {
              for (; p; ) {
                for (v = p._next, s = t; s && s.pr > p.pr; ) s = s._next;
                (p._prev = s ? s._prev : u) ? (p._prev._next = p) : (t = p),
                  (p._next = s) ? (s._prev = p) : (u = p),
                  (p = v);
              }
              this._firstPT = t;
            }
            return !0;
          }),
          (j.parse = function (a, b, c, f) {
            var g,
              h,
              j,
              l,
              m,
              n,
              o,
              p,
              s,
              t,
              u = a.style;
            for (g in b) {
              if (
                ((n = b[g]),
                (h = i[g]),
                "function" != typeof n || (h && h.allowFunc) || (n = n(r, q)),
                h)
              )
                c = h.parse(a, n, g, this, c, f, b);
              else {
                if ("--" === g.substr(0, 2)) {
                  this._tween._propLookup[g] = this._addTween.call(
                    this._tween,
                    a.style,
                    "setProperty",
                    _(a).getPropertyValue(g) + "",
                    n + "",
                    g,
                    !1,
                    g
                  );
                  continue;
                }
                (m = aa(a, g, e) + ""),
                  (s = "string" == typeof n),
                  "color" === g ||
                  "fill" === g ||
                  "stroke" === g ||
                  -1 !== g.indexOf("Color") ||
                  (s && A.test(n))
                    ? (s ||
                        ((n = oa(n)),
                        (n =
                          (n.length > 3 ? "rgba(" : "rgb(") +
                          n.join(",") +
                          ")")),
                      (c = wa(u, g, m, n, !0, "transparent", c, 0, f)))
                    : s && J.test(n)
                    ? (c = wa(u, g, m, n, !0, null, c, 0, f))
                    : ((j = parseFloat(m)),
                      (o = j || 0 === j ? m.substr((j + "").length) : ""),
                      ("" === m || "auto" === m) &&
                        ("width" === g || "height" === g
                          ? ((j = ha(a, g, e)), (o = "px"))
                          : "left" === g || "top" === g
                          ? ((j = ca(a, g, e)), (o = "px"))
                          : ((j = "opacity" !== g ? 0 : 1), (o = ""))),
                      (t = s && "=" === n.charAt(1)),
                      t
                        ? ((l = parseInt(n.charAt(0) + "1", 10)),
                          (n = n.substr(2)),
                          (l *= parseFloat(n)),
                          (p = n.replace(w, "")))
                        : ((l = parseFloat(n)),
                          (p = s ? n.replace(w, "") : "")),
                      "" === p && (p = g in d ? d[g] : o),
                      (n = l || 0 === l ? (t ? l + j : l) + p : b[g]),
                      o !== p &&
                        ("" !== p || "lineHeight" === g) &&
                        (l || 0 === l) &&
                        j &&
                        ((j = ba(a, g, j, o)),
                        "%" === p
                          ? ((j /= ba(a, g, 100, "%") / 100),
                            b.strictUnits !== !0 && (m = j + "%"))
                          : "em" === p ||
                            "rem" === p ||
                            "vw" === p ||
                            "vh" === p
                          ? (j /= ba(a, g, 1, p))
                          : "px" !== p && ((l = ba(a, g, l, p)), (p = "px")),
                        t && (l || 0 === l) && (n = l + j + p)),
                      t && (l += j),
                      (!j && 0 !== j) || (!l && 0 !== l)
                        ? void 0 !== u[g] &&
                          (n || (n + "" != "NaN" && null != n))
                          ? ((c = new ua(
                              u,
                              g,
                              l || j || 0,
                              0,
                              c,
                              -1,
                              g,
                              !1,
                              0,
                              m,
                              n
                            )),
                            (c.xs0 =
                              "none" !== n ||
                              ("display" !== g && -1 === g.indexOf("Style"))
                                ? n
                                : m))
                          : W("invalid " + g + " tween value: " + b[g])
                        : ((c = new ua(
                            u,
                            g,
                            j,
                            l - j,
                            c,
                            0,
                            g,
                            k !== !1 && ("px" === p || "zIndex" === g),
                            0,
                            m,
                            n
                          )),
                          (c.xs0 = p)));
              }
              f && c && !c.plugin && (c.plugin = f);
            }
            return c;
          }),
          (j.setRatio = function (a) {
            var b,
              c,
              d,
              e = this._firstPT,
              f = 1e-6;
            if (
              1 !== a ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                a ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                this._tween._rawPrevTime === -1e-6
              )
                for (; e; ) {
                  if (
                    ((b = e.c * a + e.s),
                    e.r ? (b = e.r(b)) : f > b && b > -f && (b = 0),
                    e.type)
                  )
                    if (1 === e.type)
                      if (((d = e.l), 2 === d))
                        e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                      else if (3 === d)
                        e.t[e.p] =
                          e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                      else if (4 === d)
                        e.t[e.p] =
                          e.xs0 +
                          b +
                          e.xs1 +
                          e.xn1 +
                          e.xs2 +
                          e.xn2 +
                          e.xs3 +
                          e.xn3 +
                          e.xs4;
                      else if (5 === d)
                        e.t[e.p] =
                          e.xs0 +
                          b +
                          e.xs1 +
                          e.xn1 +
                          e.xs2 +
                          e.xn2 +
                          e.xs3 +
                          e.xn3 +
                          e.xs4 +
                          e.xn4 +
                          e.xs5;
                      else {
                        for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)
                          c += e["xn" + d] + e["xs" + (d + 1)];
                        e.t[e.p] = c;
                      }
                    else
                      -1 === e.type
                        ? (e.t[e.p] = e.xs0)
                        : e.setRatio && e.setRatio(a);
                  else e.t[e.p] = b + e.xs0;
                  e = e._next;
                }
              else
                for (; e; )
                  2 !== e.type ? (e.t[e.p] = e.b) : e.setRatio(a),
                    (e = e._next);
            else
              for (; e; ) {
                if (2 !== e.type)
                  if (e.r && -1 !== e.type)
                    if (((b = e.r(e.s + e.c)), e.type)) {
                      if (1 === e.type) {
                        for (
                          d = e.l, c = e.xs0 + b + e.xs1, d = 1;
                          d < e.l;
                          d++
                        )
                          c += e["xn" + d] + e["xs" + (d + 1)];
                        e.t[e.p] = c;
                      }
                    } else e.t[e.p] = b + e.xs0;
                  else e.t[e.p] = e.e;
                else e.setRatio(a);
                e = e._next;
              }
          }),
          (j._enableTransforms = function (a) {
            (this._transform = this._transform || Sa(this._target, e, !0)),
              (this._transformType =
                (this._transform.svg && Ba) || (!a && 3 !== this._transformType)
                  ? 2
                  : 3);
          });
        var Za = function (a) {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        };
        (j._addLazySet = function (a, b, c) {
          var d = (this._firstPT = new ua(a, b, 0, 0, this._firstPT, 2));
          (d.e = c), (d.setRatio = Za), (d.data = this);
        }),
          (j._linkCSSP = function (a, b, c, d) {
            return (
              a &&
                (b && (b._prev = a),
                a._next && (a._next._prev = a._prev),
                a._prev
                  ? (a._prev._next = a._next)
                  : this._firstPT === a &&
                    ((this._firstPT = a._next), (d = !0)),
                c
                  ? (c._next = a)
                  : d || null !== this._firstPT || (this._firstPT = a),
                (a._next = b),
                (a._prev = c)),
              a
            );
          }),
          (j._mod = function (a) {
            for (var b = this._firstPT; b; )
              "function" == typeof a[b.p] && (b.r = a[b.p]), (b = b._next);
          }),
          (j._kill = function (b) {
            var c,
              d,
              e,
              f = b;
            if (b.autoAlpha || b.alpha) {
              f = {};
              for (d in b) f[d] = b[d];
              (f.opacity = 1), f.autoAlpha && (f.visibility = 1);
            }
            for (
              b.className &&
                (c = this._classNamePT) &&
                ((e = c.xfirst),
                e && e._prev
                  ? this._linkCSSP(e._prev, c._next, e._prev._prev)
                  : e === this._firstPT && (this._firstPT = c._next),
                c._next && this._linkCSSP(c._next, c._next._next, e._prev),
                (this._classNamePT = null)),
                c = this._firstPT;
              c;

            )
              c.plugin &&
                c.plugin !== d &&
                c.plugin._kill &&
                (c.plugin._kill(b), (d = c.plugin)),
                (c = c._next);
            return a.prototype._kill.call(this, f);
          });
        var $a = function (a, b, c) {
          var d, e, f, g;
          if (a.slice) for (e = a.length; --e > -1; ) $a(a[e], b, c);
          else
            for (d = a.childNodes, e = d.length; --e > -1; )
              (f = d[e]),
                (g = f.type),
                f.style && (b.push(da(f)), c && c.push(f)),
                (1 !== g && 9 !== g && 11 !== g) ||
                  !f.childNodes.length ||
                  $a(f, b, c);
        };
        return (
          (g.cascadeTo = function (a, c, d) {
            var e,
              f,
              g,
              h,
              i = b.to(a, c, d),
              j = [i],
              k = [],
              l = [],
              m = [],
              n = b._internals.reservedProps;
            for (
              a = i._targets || i.target,
                $a(a, k, m),
                i.render(c, !0, !0),
                $a(a, l),
                i.render(0, !0, !0),
                i._enabled(!0),
                e = m.length;
              --e > -1;

            )
              if (((f = ea(m[e], k[e], l[e])), f.firstMPT)) {
                f = f.difs;
                for (g in d) n[g] && (f[g] = d[g]);
                h = {};
                for (g in f) h[g] = k[e][g];
                j.push(b.fromTo(m[e], c, h, f));
              }
            return j;
          }),
          a.activate([g]),
          g
        );
      },
      !0
    ),
    (function () {
      var a = _gsScope._gsDefine.plugin({
          propName: "roundProps",
          version: "1.7.0",
          priority: -1,
          API: 2,
          init: function (a, b, c) {
            return (this._tween = c), !0;
          },
        }),
        b = function (a) {
          var b = 1 > a ? Math.pow(10, (a + "").length - 2) : 1;
          return function (c) {
            return ((Math.round(c / a) * a * b) | 0) / b;
          };
        },
        c = function (a, b) {
          for (; a; ) a.f || a.blob || (a.m = b || Math.round), (a = a._next);
        },
        d = a.prototype;
      (d._onInitAllProps = function () {
        var a,
          d,
          e,
          f,
          g = this._tween,
          h = g.vars.roundProps,
          i = {},
          j = g._propLookup.roundProps;
        if ("object" != typeof h || h.push)
          for (
            "string" == typeof h && (h = h.split(",")), e = h.length;
            --e > -1;

          )
            i[h[e]] = Math.round;
        else for (f in h) i[f] = b(h[f]);
        for (f in i)
          for (a = g._firstPT; a; )
            (d = a._next),
              a.pg
                ? a.t._mod(i)
                : a.n === f &&
                  (2 === a.f && a.t
                    ? c(a.t._firstPT, i[f])
                    : (this._add(a.t, f, a.s, a.c, i[f]),
                      d && (d._prev = a._prev),
                      a._prev
                        ? (a._prev._next = d)
                        : g._firstPT === a && (g._firstPT = d),
                      (a._next = a._prev = null),
                      (g._propLookup[f] = j))),
              (a = d);
        return !1;
      }),
        (d._add = function (a, b, c, d, e) {
          this._addTween(a, b, c, c + d, b, e || Math.round),
            this._overwriteProps.push(b);
        });
    })(),
    (function () {
      _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.6.1",
        init: function (a, b, c, d) {
          var e, f;
          if ("function" != typeof a.setAttribute) return !1;
          for (e in b)
            (f = b[e]),
              "function" == typeof f && (f = f(d, a)),
              this._addTween(
                a,
                "setAttribute",
                a.getAttribute(e) + "",
                f + "",
                e,
                !1,
                e
              ),
              this._overwriteProps.push(e);
          return !0;
        },
      });
    })(),
    (_gsScope._gsDefine.plugin({
      propName: "directionalRotation",
      version: "0.3.1",
      API: 2,
      init: function (a, b, c, d) {
        "object" != typeof b && (b = { rotation: b }), (this.finals = {});
        var e,
          f,
          g,
          h,
          i,
          j,
          k = b.useRadians === !0 ? 2 * Math.PI : 360,
          l = 1e-6;
        for (e in b)
          "useRadians" !== e &&
            ((h = b[e]),
            "function" == typeof h && (h = h(d, a)),
            (j = (h + "").split("_")),
            (f = j[0]),
            (g = parseFloat(
              "function" != typeof a[e]
                ? a[e]
                : a[
                    e.indexOf("set") ||
                    "function" != typeof a["get" + e.substr(3)]
                      ? e
                      : "get" + e.substr(3)
                  ]()
            )),
            (h = this.finals[e] =
              "string" == typeof f && "=" === f.charAt(1)
                ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2))
                : Number(f) || 0),
            (i = h - g),
            j.length &&
              ((f = j.join("_")),
              -1 !== f.indexOf("short") &&
                ((i %= k), i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)),
              -1 !== f.indexOf("_cw") && 0 > i
                ? (i = ((i + 9999999999 * k) % k) - ((i / k) | 0) * k)
                : -1 !== f.indexOf("ccw") &&
                  i > 0 &&
                  (i = ((i - 9999999999 * k) % k) - ((i / k) | 0) * k)),
            (i > l || -l > i) &&
              (this._addTween(a, e, g, g + i, e),
              this._overwriteProps.push(e)));
        return !0;
      },
      set: function (a) {
        var b;
        if (1 !== a) this._super.setRatio.call(this, a);
        else
          for (b = this._firstPT; b; )
            b.f ? b.t[b.p](this.finals[b.p]) : (b.t[b.p] = this.finals[b.p]),
              (b = b._next);
      },
    })._autoCSS = !0),
    _gsScope._gsDefine(
      "easing.Back",
      ["easing.Ease"],
      function (a) {
        var b,
          c,
          d,
          e,
          f = _gsScope.GreenSockGlobals || _gsScope,
          g = f.com.greensock,
          h = 2 * Math.PI,
          i = Math.PI / 2,
          j = g._class,
          k = function (b, c) {
            var d = j("easing." + b, function () {}, !0),
              e = (d.prototype = new a());
            return (e.constructor = d), (e.getRatio = c), d;
          },
          l = a.register || function () {},
          m = function (a, b, c, d, e) {
            var f = j(
              "easing." + a,
              { easeOut: new b(), easeIn: new c(), easeInOut: new d() },
              !0
            );
            return l(f, a), f;
          },
          n = function (a, b, c) {
            (this.t = a),
              (this.v = b),
              c &&
                ((this.next = c),
                (c.prev = this),
                (this.c = c.v - b),
                (this.gap = c.t - a));
          },
          o = function (b, c) {
            var d = j(
                "easing." + b,
                function (a) {
                  (this._p1 = a || 0 === a ? a : 1.70158),
                    (this._p2 = 1.525 * this._p1);
                },
                !0
              ),
              e = (d.prototype = new a());
            return (
              (e.constructor = d),
              (e.getRatio = c),
              (e.config = function (a) {
                return new d(a);
              }),
              d
            );
          },
          p = m(
            "Back",
            o("BackOut", function (a) {
              return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1;
            }),
            o("BackIn", function (a) {
              return a * a * ((this._p1 + 1) * a - this._p1);
            }),
            o("BackInOut", function (a) {
              return (a *= 2) < 1
                ? 0.5 * a * a * ((this._p2 + 1) * a - this._p2)
                : 0.5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2);
            })
          ),
          q = j(
            "easing.SlowMo",
            function (a, b, c) {
              (b = b || 0 === b ? b : 0.7),
                null == a ? (a = 0.7) : a > 1 && (a = 1),
                (this._p = 1 !== a ? b : 0),
                (this._p1 = (1 - a) / 2),
                (this._p2 = a),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = c === !0);
            },
            !0
          ),
          r = (q.prototype = new a());
        return (
          (r.constructor = q),
          (r.getRatio = function (a) {
            var b = a + (0.5 - a) * this._p;
            return a < this._p1
              ? this._calcEnd
                ? 1 - (a = 1 - a / this._p1) * a
                : b - (a = 1 - a / this._p1) * a * a * a * b
              : a > this._p3
              ? this._calcEnd
                ? 1 === a
                  ? 0
                  : 1 - (a = (a - this._p3) / this._p1) * a
                : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a
              : this._calcEnd
              ? 1
              : b;
          }),
          (q.ease = new q(0.7, 0.7)),
          (r.config = q.config =
            function (a, b, c) {
              return new q(a, b, c);
            }),
          (b = j(
            "easing.SteppedEase",
            function (a, b) {
              (a = a || 1),
                (this._p1 = 1 / a),
                (this._p2 = a + (b ? 0 : 1)),
                (this._p3 = b ? 1 : 0);
            },
            !0
          )),
          (r = b.prototype = new a()),
          (r.constructor = b),
          (r.getRatio = function (a) {
            return (
              0 > a ? (a = 0) : a >= 1 && (a = 0.999999999),
              (((this._p2 * a) | 0) + this._p3) * this._p1
            );
          }),
          (r.config = b.config =
            function (a, c) {
              return new b(a, c);
            }),
          (c = j(
            "easing.ExpoScaleEase",
            function (a, b, c) {
              (this._p1 = Math.log(b / a)),
                (this._p2 = b - a),
                (this._p3 = a),
                (this._ease = c);
            },
            !0
          )),
          (r = c.prototype = new a()),
          (r.constructor = c),
          (r.getRatio = function (a) {
            return (
              this._ease && (a = this._ease.getRatio(a)),
              (this._p3 * Math.exp(this._p1 * a) - this._p3) / this._p2
            );
          }),
          (r.config = c.config =
            function (a, b, d) {
              return new c(a, b, d);
            }),
          (d = j(
            "easing.RoughEase",
            function (b) {
              b = b || {};
              for (
                var c,
                  d,
                  e,
                  f,
                  g,
                  h,
                  i = b.taper || "none",
                  j = [],
                  k = 0,
                  l = 0 | (b.points || 20),
                  m = l,
                  o = b.randomize !== !1,
                  p = b.clamp === !0,
                  q = b.template instanceof a ? b.template : null,
                  r = "number" == typeof b.strength ? 0.4 * b.strength : 0.4;
                --m > -1;

              )
                (c = o ? Math.random() : (1 / l) * m),
                  (d = q ? q.getRatio(c) : c),
                  "none" === i
                    ? (e = r)
                    : "out" === i
                    ? ((f = 1 - c), (e = f * f * r))
                    : "in" === i
                    ? (e = c * c * r)
                    : 0.5 > c
                    ? ((f = 2 * c), (e = f * f * 0.5 * r))
                    : ((f = 2 * (1 - c)), (e = f * f * 0.5 * r)),
                  o
                    ? (d += Math.random() * e - 0.5 * e)
                    : m % 2
                    ? (d += 0.5 * e)
                    : (d -= 0.5 * e),
                  p && (d > 1 ? (d = 1) : 0 > d && (d = 0)),
                  (j[k++] = { x: c, y: d });
              for (
                j.sort(function (a, b) {
                  return a.x - b.x;
                }),
                  h = new n(1, 1, null),
                  m = l;
                --m > -1;

              )
                (g = j[m]), (h = new n(g.x, g.y, h));
              this._prev = new n(0, 0, 0 !== h.t ? h : h.next);
            },
            !0
          )),
          (r = d.prototype = new a()),
          (r.constructor = d),
          (r.getRatio = function (a) {
            var b = this._prev;
            if (a > b.t) {
              for (; b.next && a >= b.t; ) b = b.next;
              b = b.prev;
            } else for (; b.prev && a <= b.t; ) b = b.prev;
            return (this._prev = b), b.v + ((a - b.t) / b.gap) * b.c;
          }),
          (r.config = function (a) {
            return new d(a);
          }),
          (d.ease = new d()),
          m(
            "Bounce",
            k("BounceOut", function (a) {
              return 1 / 2.75 > a
                ? 7.5625 * a * a
                : 2 / 2.75 > a
                ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                : 2.5 / 2.75 > a
                ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
            }),
            k("BounceIn", function (a) {
              return (a = 1 - a) < 1 / 2.75
                ? 1 - 7.5625 * a * a
                : 2 / 2.75 > a
                ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75)
                : 2.5 / 2.75 > a
                ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375)
                : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375);
            }),
            k("BounceInOut", function (a) {
              var b = 0.5 > a;
              return (
                (a = b ? 1 - 2 * a : 2 * a - 1),
                (a =
                  1 / 2.75 > a
                    ? 7.5625 * a * a
                    : 2 / 2.75 > a
                    ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                    : 2.5 / 2.75 > a
                    ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                    : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375),
                b ? 0.5 * (1 - a) : 0.5 * a + 0.5
              );
            })
          ),
          m(
            "Circ",
            k("CircOut", function (a) {
              return Math.sqrt(1 - (a -= 1) * a);
            }),
            k("CircIn", function (a) {
              return -(Math.sqrt(1 - a * a) - 1);
            }),
            k("CircInOut", function (a) {
              return (a *= 2) < 1
                ? -0.5 * (Math.sqrt(1 - a * a) - 1)
                : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
            })
          ),
          (e = function (b, c, d) {
            var e = j(
                "easing." + b,
                function (a, b) {
                  (this._p1 = a >= 1 ? a : 1),
                    (this._p2 = (b || d) / (1 > a ? a : 1)),
                    (this._p3 =
                      (this._p2 / h) * (Math.asin(1 / this._p1) || 0)),
                    (this._p2 = h / this._p2);
                },
                !0
              ),
              f = (e.prototype = new a());
            return (
              (f.constructor = e),
              (f.getRatio = c),
              (f.config = function (a, b) {
                return new e(a, b);
              }),
              e
            );
          }),
          m(
            "Elastic",
            e(
              "ElasticOut",
              function (a) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * a) *
                    Math.sin((a - this._p3) * this._p2) +
                  1
                );
              },
              0.3
            ),
            e(
              "ElasticIn",
              function (a) {
                return -(
                  this._p1 *
                  Math.pow(2, 10 * (a -= 1)) *
                  Math.sin((a - this._p3) * this._p2)
                );
              },
              0.3
            ),
            e(
              "ElasticInOut",
              function (a) {
                return (a *= 2) < 1
                  ? -0.5 *
                      (this._p1 *
                        Math.pow(2, 10 * (a -= 1)) *
                        Math.sin((a - this._p3) * this._p2))
                  : this._p1 *
                      Math.pow(2, -10 * (a -= 1)) *
                      Math.sin((a - this._p3) * this._p2) *
                      0.5 +
                      1;
              },
              0.45
            )
          ),
          m(
            "Expo",
            k("ExpoOut", function (a) {
              return 1 - Math.pow(2, -10 * a);
            }),
            k("ExpoIn", function (a) {
              return Math.pow(2, 10 * (a - 1)) - 0.001;
            }),
            k("ExpoInOut", function (a) {
              return (a *= 2) < 1
                ? 0.5 * Math.pow(2, 10 * (a - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (a - 1)));
            })
          ),
          m(
            "Sine",
            k("SineOut", function (a) {
              return Math.sin(a * i);
            }),
            k("SineIn", function (a) {
              return -Math.cos(a * i) + 1;
            }),
            k("SineInOut", function (a) {
              return -0.5 * (Math.cos(Math.PI * a) - 1);
            })
          ),
          j(
            "easing.EaseLookup",
            {
              find: function (b) {
                return a.map[b];
              },
            },
            !0
          ),
          l(f.SlowMo, "SlowMo", "ease,"),
          l(d, "RoughEase", "ease,"),
          l(b, "SteppedEase", "ease,"),
          p
        );
      },
      !0
    );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (a, b) {
    "use strict";
    var c = {},
      d = a.document,
      e = (a.GreenSockGlobals = a.GreenSockGlobals || a),
      f = e[b];
    if (f)
      return (
        "undefined" != typeof module && module.exports && (module.exports = f),
        f
      );
    var g,
      h,
      i,
      j,
      k,
      l = function (a) {
        var b,
          c = a.split("."),
          d = e;
        for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
        return d;
      },
      m = l("com.greensock"),
      n = 1e-8,
      o = function (a) {
        var b,
          c = [],
          d = a.length;
        for (b = 0; b !== d; c.push(a[b++]));
        return c;
      },
      p = function () {},
      q = (function () {
        var a = Object.prototype.toString,
          b = a.call([]);
        return function (c) {
          return (
            null != c &&
            (c instanceof Array ||
              ("object" == typeof c && !!c.push && a.call(c) === b))
          );
        };
      })(),
      r = {},
      s = function (d, f, g, h) {
        (this.sc = r[d] ? r[d].sc : []),
          (r[d] = this),
          (this.gsClass = null),
          (this.func = g);
        var i = [];
        (this.check = function (j) {
          for (var k, m, n, o, p = f.length, q = p; --p > -1; )
            (k = r[f[p]] || new s(f[p], [])).gsClass
              ? ((i[p] = k.gsClass), q--)
              : j && k.sc.push(this);
          if (0 === q && g) {
            if (
              ((m = ("com.greensock." + d).split(".")),
              (n = m.pop()),
              (o = l(m.join("."))[n] = this.gsClass = g.apply(g, i)),
              h)
            )
              if (
                ((e[n] = c[n] = o),
                "undefined" != typeof module && module.exports)
              )
                if (d === b) {
                  module.exports = c[b] = o;
                  for (p in c) o[p] = c[p];
                } else c[b] && (c[b][n] = o);
              else
                "function" == typeof define &&
                  define.amd &&
                  define(
                    (a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") +
                      d.split(".").pop(),
                    [],
                    function () {
                      return o;
                    }
                  );
            for (p = 0; p < this.sc.length; p++) this.sc[p].check();
          }
        }),
          this.check(!0);
      },
      t = (a._gsDefine = function (a, b, c, d) {
        return new s(a, b, c, d);
      }),
      u = (m._class = function (a, b, c) {
        return (
          (b = b || function () {}),
          t(
            a,
            [],
            function () {
              return b;
            },
            c
          ),
          b
        );
      });
    t.globals = e;
    var v = [0, 0, 1, 1],
      w = u(
        "easing.Ease",
        function (a, b, c, d) {
          (this._func = a),
            (this._type = c || 0),
            (this._power = d || 0),
            (this._params = b ? v.concat(b) : v);
        },
        !0
      ),
      x = (w.map = {}),
      y = (w.register = function (a, b, c, d) {
        for (
          var e,
            f,
            g,
            h,
            i = b.split(","),
            j = i.length,
            k = (c || "easeIn,easeOut,easeInOut").split(",");
          --j > -1;

        )
          for (
            f = i[j],
              e = d ? u("easing." + f, null, !0) : m.easing[f] || {},
              g = k.length;
            --g > -1;

          )
            (h = k[g]),
              (x[f + "." + h] =
                x[h + f] =
                e[h] =
                  a.getRatio ? a : a[h] || new a());
      });
    for (
      i = w.prototype,
        i._calcEnd = !1,
        i.getRatio = function (a) {
          if (this._func)
            return (this._params[0] = a), this._func.apply(null, this._params);
          var b = this._type,
            c = this._power,
            d = 1 === b ? 1 - a : 2 === b ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
          return (
            1 === c
              ? (d *= d)
              : 2 === c
              ? (d *= d * d)
              : 3 === c
              ? (d *= d * d * d)
              : 4 === c && (d *= d * d * d * d),
            1 === b ? 1 - d : 2 === b ? d : 0.5 > a ? d / 2 : 1 - d / 2
          );
        },
        g = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        h = g.length;
      --h > -1;

    )
      (i = g[h] + ",Power" + h),
        y(new w(null, null, 1, h), i, "easeOut", !0),
        y(new w(null, null, 2, h), i, "easeIn" + (0 === h ? ",easeNone" : "")),
        y(new w(null, null, 3, h), i, "easeInOut");
    (x.linear = m.easing.Linear.easeIn), (x.swing = m.easing.Quad.easeInOut);
    var z = u("events.EventDispatcher", function (a) {
      (this._listeners = {}), (this._eventTarget = a || this);
    });
    (i = z.prototype),
      (i.addEventListener = function (a, b, c, d, e) {
        e = e || 0;
        var f,
          g,
          h = this._listeners[a],
          i = 0;
        for (
          this !== j || k || j.wake(),
            null == h && (this._listeners[a] = h = []),
            g = h.length;
          --g > -1;

        )
          (f = h[g]),
            f.c === b && f.s === c
              ? h.splice(g, 1)
              : 0 === i && f.pr < e && (i = g + 1);
        h.splice(i, 0, { c: b, s: c, up: d, pr: e });
      }),
      (i.removeEventListener = function (a, b) {
        var c,
          d = this._listeners[a];
        if (d)
          for (c = d.length; --c > -1; )
            if (d[c].c === b) return void d.splice(c, 1);
      }),
      (i.dispatchEvent = function (a) {
        var b,
          c,
          d,
          e = this._listeners[a];
        if (e)
          for (
            b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget;
            --b > -1;

          )
            (d = e[b]),
              d &&
                (d.up
                  ? d.c.call(d.s || c, { type: a, target: c })
                  : d.c.call(d.s || c));
      });
    var A = a.requestAnimationFrame,
      B = a.cancelAnimationFrame,
      C =
        Date.now ||
        function () {
          return new Date().getTime();
        },
      D = C();
    for (g = ["ms", "moz", "webkit", "o"], h = g.length; --h > -1 && !A; )
      (A = a[g[h] + "RequestAnimationFrame"]),
        (B =
          a[g[h] + "CancelAnimationFrame"] ||
          a[g[h] + "CancelRequestAnimationFrame"]);
    u("Ticker", function (a, b) {
      var c,
        e,
        f,
        g,
        h,
        i = this,
        l = C(),
        m = b !== !1 && A ? "auto" : !1,
        o = 500,
        q = 33,
        r = "tick",
        s = function (a) {
          var b,
            d,
            j = C() - D;
          j > o && (l += j - q),
            (D += j),
            (i.time = (D - l) / 1e3),
            (b = i.time - h),
            (!c || b > 0 || a === !0) &&
              (i.frame++, (h += b + (b >= g ? 0.004 : g - b)), (d = !0)),
            a !== !0 && (f = e(s)),
            d && i.dispatchEvent(r);
        };
      z.call(i),
        (i.time = i.frame = 0),
        (i.tick = function () {
          s(!0);
        }),
        (i.lagSmoothing = function (a, b) {
          return arguments.length
            ? ((o = a || 1 / n), void (q = Math.min(b, o, 0)))
            : 1 / n > o;
        }),
        (i.sleep = function () {
          null != f &&
            (m && B ? B(f) : clearTimeout(f),
            (e = p),
            (f = null),
            i === j && (k = !1));
        }),
        (i.wake = function (a) {
          null !== f
            ? i.sleep()
            : a
            ? (l += -D + (D = C()))
            : i.frame > 10 && (D = C() - o + 5),
            (e =
              0 === c
                ? p
                : m && A
                ? A
                : function (a) {
                    return setTimeout(a, (1e3 * (h - i.time) + 1) | 0);
                  }),
            i === j && (k = !0),
            s(2);
        }),
        (i.fps = function (a) {
          return arguments.length
            ? ((c = a), (g = 1 / (c || 60)), (h = this.time + g), void i.wake())
            : c;
        }),
        (i.useRAF = function (a) {
          return arguments.length ? (i.sleep(), (m = a), void i.fps(c)) : m;
        }),
        i.fps(a),
        setTimeout(function () {
          "auto" === m &&
            i.frame < 5 &&
            "hidden" !== (d || {}).visibilityState &&
            i.useRAF(!1);
        }, 1500);
    }),
      (i = m.Ticker.prototype = new m.events.EventDispatcher()),
      (i.constructor = m.Ticker);
    var E = u("core.Animation", function (a, b) {
      if (
        ((this.vars = b = b || {}),
        (this._duration = this._totalDuration = a || 0),
        (this._delay = Number(b.delay) || 0),
        (this._timeScale = 1),
        (this._active = !!b.immediateRender),
        (this.data = b.data),
        (this._reversed = !!b.reversed),
        Z)
      ) {
        k || j.wake();
        var c = this.vars.useFrames ? Y : Z;
        c.add(this, c._time), this.vars.paused && this.paused(!0);
      }
    });
    (j = E.ticker = new m.Ticker()),
      (i = E.prototype),
      (i._dirty = i._gc = i._initted = i._paused = !1),
      (i._totalTime = i._time = 0),
      (i._rawPrevTime = -1),
      (i._next = i._last = i._onUpdate = i._timeline = i.timeline = null),
      (i._paused = !1);
    var F = function () {
      k &&
        C() - D > 2e3 &&
        ("hidden" !== (d || {}).visibilityState || !j.lagSmoothing()) &&
        j.wake();
      var a = setTimeout(F, 2e3);
      a.unref && a.unref();
    };
    F(),
      (i.play = function (a, b) {
        return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
      }),
      (i.pause = function (a, b) {
        return null != a && this.seek(a, b), this.paused(!0);
      }),
      (i.resume = function (a, b) {
        return null != a && this.seek(a, b), this.paused(!1);
      }),
      (i.seek = function (a, b) {
        return this.totalTime(Number(a), b !== !1);
      }),
      (i.restart = function (a, b) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(a ? -this._delay : 0, b !== !1, !0);
      }),
      (i.reverse = function (a, b) {
        return (
          null != a && this.seek(a || this.totalDuration(), b),
          this.reversed(!0).paused(!1)
        );
      }),
      (i.render = function (a, b, c) {}),
      (i.invalidate = function () {
        return (
          (this._time = this._totalTime = 0),
          (this._initted = this._gc = !1),
          (this._rawPrevTime = -1),
          (this._gc || !this.timeline) && this._enabled(!0),
          this
        );
      }),
      (i.isActive = function () {
        var a,
          b = this._timeline,
          c = this._startTime;
        return (
          !b ||
          (!this._gc &&
            !this._paused &&
            b.isActive() &&
            (a = b.rawTime(!0)) >= c &&
            a < c + this.totalDuration() / this._timeScale - n)
        );
      }),
      (i._enabled = function (a, b) {
        return (
          k || j.wake(),
          (this._gc = !a),
          (this._active = this.isActive()),
          b !== !0 &&
            (a && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !a && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (i._kill = function (a, b) {
        return this._enabled(!1, !1);
      }),
      (i.kill = function (a, b) {
        return this._kill(a, b), this;
      }),
      (i._uncache = function (a) {
        for (var b = a ? this : this.timeline; b; )
          (b._dirty = !0), (b = b.timeline);
        return this;
      }),
      (i._swapSelfInParams = function (a) {
        for (var b = a.length, c = a.concat(); --b > -1; )
          "{self}" === a[b] && (c[b] = this);
        return c;
      }),
      (i._callback = function (a) {
        var b = this.vars,
          c = b[a],
          d = b[a + "Params"],
          e = b[a + "Scope"] || b.callbackScope || this,
          f = d ? d.length : 0;
        switch (f) {
          case 0:
            c.call(e);
            break;
          case 1:
            c.call(e, d[0]);
            break;
          case 2:
            c.call(e, d[0], d[1]);
            break;
          default:
            c.apply(e, d);
        }
      }),
      (i.eventCallback = function (a, b, c, d) {
        if ("on" === (a || "").substr(0, 2)) {
          var e = this.vars;
          if (1 === arguments.length) return e[a];
          null == b
            ? delete e[a]
            : ((e[a] = b),
              (e[a + "Params"] =
                q(c) && -1 !== c.join("").indexOf("{self}")
                  ? this._swapSelfInParams(c)
                  : c),
              (e[a + "Scope"] = d)),
            "onUpdate" === a && (this._onUpdate = b);
        }
        return this;
      }),
      (i.delay = function (a) {
        return arguments.length
          ? (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + a - this._delay),
            (this._delay = a),
            this)
          : this._delay;
      }),
      (i.duration = function (a) {
        return arguments.length
          ? ((this._duration = this._totalDuration = a),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== a &&
              this.totalTime(this._totalTime * (a / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      }),
      (i.totalDuration = function (a) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(a) : this._totalDuration
        );
      }),
      (i.time = function (a, b) {
        return arguments.length
          ? (this._dirty && this.totalDuration(),
            this.totalTime(a > this._duration ? this._duration : a, b))
          : this._time;
      }),
      (i.totalTime = function (a, b, c) {
        if ((k || j.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (0 > a && !c && (a += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            var d = this._totalDuration,
              e = this._timeline;
            if (
              (a > d && !c && (a = d),
              (this._startTime =
                (this._paused ? this._pauseTime : e._time) -
                (this._reversed ? d - a : a) / this._timeScale),
              e._dirty || this._uncache(!1),
              e._timeline)
            )
              for (; e._timeline; )
                e._timeline._time !==
                  (e._startTime + e._totalTime) / e._timeScale &&
                  e.totalTime(e._totalTime, !0),
                  (e = e._timeline);
          }
          this._gc && this._enabled(!0, !1),
            (this._totalTime !== a || 0 === this._duration) &&
              (K.length && _(), this.render(a, b, !1), K.length && _());
        }
        return this;
      }),
      (i.progress = i.totalProgress =
        function (a, b) {
          var c = this.duration();
          return arguments.length
            ? this.totalTime(c * a, b)
            : c
            ? this._time / c
            : this.ratio;
        }),
      (i.startTime = function (a) {
        return arguments.length
          ? (a !== this._startTime &&
              ((this._startTime = a),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, a - this._delay)),
            this)
          : this._startTime;
      }),
      (i.endTime = function (a) {
        return (
          this._startTime +
          (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        );
      }),
      (i.timeScale = function (a) {
        if (!arguments.length) return this._timeScale;
        var b, c;
        for (
          a = a || n,
            this._timeline &&
              this._timeline.smoothChildTiming &&
              ((b = this._pauseTime),
              (c = b || 0 === b ? b : this._timeline.totalTime()),
              (this._startTime =
                c - ((c - this._startTime) * this._timeScale) / a)),
            this._timeScale = a,
            c = this.timeline;
          c && c.timeline;

        )
          (c._dirty = !0), c.totalDuration(), (c = c.timeline);
        return this;
      }),
      (i.reversed = function (a) {
        return arguments.length
          ? (a != this._reversed &&
              ((this._reversed = a),
              this.totalTime(
                this._timeline && !this._timeline.smoothChildTiming
                  ? this.totalDuration() - this._totalTime
                  : this._totalTime,
                !0
              )),
            this)
          : this._reversed;
      }),
      (i.paused = function (a) {
        if (!arguments.length) return this._paused;
        var b,
          c,
          d = this._timeline;
        return (
          a != this._paused &&
            d &&
            (k || a || j.wake(),
            (b = d.rawTime()),
            (c = b - this._pauseTime),
            !a &&
              d.smoothChildTiming &&
              ((this._startTime += c), this._uncache(!1)),
            (this._pauseTime = a ? b : null),
            (this._paused = a),
            (this._active = this.isActive()),
            !a &&
              0 !== c &&
              this._initted &&
              this.duration() &&
              ((b = d.smoothChildTiming
                ? this._totalTime
                : (b - this._startTime) / this._timeScale),
              this.render(b, b === this._totalTime, !0))),
          this._gc && !a && this._enabled(!0, !1),
          this
        );
      });
    var G = u("core.SimpleTimeline", function (a) {
      E.call(this, 0, a),
        (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    (i = G.prototype = new E()),
      (i.constructor = G),
      (i.kill()._gc = !1),
      (i._first = i._last = i._recent = null),
      (i._sortChildren = !1),
      (i.add = i.insert =
        function (a, b, c, d) {
          var e, f;
          if (
            ((a._startTime = Number(b || 0) + a._delay),
            a._paused &&
              this !== a._timeline &&
              (a._pauseTime =
                this.rawTime() - (a._timeline.rawTime() - a._pauseTime)),
            a.timeline && a.timeline._remove(a, !0),
            (a.timeline = a._timeline = this),
            a._gc && a._enabled(!0, !0),
            (e = this._last),
            this._sortChildren)
          )
            for (f = a._startTime; e && e._startTime > f; ) e = e._prev;
          return (
            e
              ? ((a._next = e._next), (e._next = a))
              : ((a._next = this._first), (this._first = a)),
            a._next ? (a._next._prev = a) : (this._last = a),
            (a._prev = e),
            (this._recent = a),
            this._timeline && this._uncache(!0),
            this
          );
        }),
      (i._remove = function (a, b) {
        return (
          a.timeline === this &&
            (b || a._enabled(!1, !0),
            a._prev
              ? (a._prev._next = a._next)
              : this._first === a && (this._first = a._next),
            a._next
              ? (a._next._prev = a._prev)
              : this._last === a && (this._last = a._prev),
            (a._next = a._prev = a.timeline = null),
            a === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (i.render = function (a, b, c) {
        var d,
          e = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = a; e; )
          (d = e._next),
            (e._active || (a >= e._startTime && !e._paused && !e._gc)) &&
              (e._reversed
                ? e.render(
                    (e._dirty ? e.totalDuration() : e._totalDuration) -
                      (a - e._startTime) * e._timeScale,
                    b,
                    c
                  )
                : e.render((a - e._startTime) * e._timeScale, b, c)),
            (e = d);
      }),
      (i.rawTime = function () {
        return k || j.wake(), this._totalTime;
      });
    var H = u(
        "TweenLite",
        function (b, c, d) {
          if (
            (E.call(this, c, d), (this.render = H.prototype.render), null == b)
          )
            throw "Cannot tween a null target.";
          this.target = b = "string" != typeof b ? b : H.selector(b) || b;
          var e,
            f,
            g,
            h =
              b.jquery ||
              (b.length &&
                b !== a &&
                b[0] &&
                (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))),
            i = this.vars.overwrite;
          if (
            ((this._overwrite = i =
              null == i
                ? X[H.defaultOverwrite]
                : "number" == typeof i
                ? i >> 0
                : X[i]),
            (h || b instanceof Array || (b.push && q(b))) &&
              "number" != typeof b[0])
          )
            for (
              this._targets = g = o(b),
                this._propLookup = [],
                this._siblings = [],
                e = 0;
              e < g.length;
              e++
            )
              (f = g[e]),
                f
                  ? "string" != typeof f
                    ? f.length &&
                      f !== a &&
                      f[0] &&
                      (f[0] === a ||
                        (f[0].nodeType && f[0].style && !f.nodeType))
                      ? (g.splice(e--, 1), (this._targets = g = g.concat(o(f))))
                      : ((this._siblings[e] = aa(f, this, !1)),
                        1 === i &&
                          this._siblings[e].length > 1 &&
                          ca(f, this, null, 1, this._siblings[e]))
                    : ((f = g[e--] = H.selector(f)),
                      "string" == typeof f && g.splice(e + 1, 1))
                  : g.splice(e--, 1);
          else
            (this._propLookup = {}),
              (this._siblings = aa(b, this, !1)),
              1 === i &&
                this._siblings.length > 1 &&
                ca(b, this, null, 1, this._siblings);
          (this.vars.immediateRender ||
            (0 === c &&
              0 === this._delay &&
              this.vars.immediateRender !== !1)) &&
            ((this._time = -n), this.render(Math.min(0, -this._delay)));
        },
        !0
      ),
      I = function (b) {
        return (
          b &&
          b.length &&
          b !== a &&
          b[0] &&
          (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))
        );
      },
      J = function (a, b) {
        var c,
          d = {};
        for (c in a)
          W[c] ||
            (c in b &&
              "transform" !== c &&
              "x" !== c &&
              "y" !== c &&
              "width" !== c &&
              "height" !== c &&
              "className" !== c &&
              "border" !== c) ||
            !(!T[c] || (T[c] && T[c]._autoCSS)) ||
            ((d[c] = a[c]), delete a[c]);
        a.css = d;
      };
    (i = H.prototype = new E()),
      (i.constructor = H),
      (i.kill()._gc = !1),
      (i.ratio = 0),
      (i._firstPT = i._targets = i._overwrittenProps = i._startAt = null),
      (i._notifyPluginsOfEnabled = i._lazy = !1),
      (H.version = "2.1.2"),
      (H.defaultEase = i._ease = new w(null, null, 1, 1)),
      (H.defaultOverwrite = "auto"),
      (H.ticker = j),
      (H.autoSleep = 120),
      (H.lagSmoothing = function (a, b) {
        j.lagSmoothing(a, b);
      }),
      (H.selector =
        a.$ ||
        a.jQuery ||
        function (b) {
          var c = a.$ || a.jQuery;
          return c
            ? ((H.selector = c), c(b))
            : (d || (d = a.document),
              d
                ? d.querySelectorAll
                  ? d.querySelectorAll(b)
                  : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
                : b);
        });
    var K = [],
      L = {},
      M = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      N = /[\+-]=-?[\.\d]/,
      O = function (a) {
        for (var b, c = this._firstPT, d = 1e-6; c; )
          (b = c.blob
            ? 1 === a && null != this.end
              ? this.end
              : a
              ? this.join("")
              : this.start
            : c.c * a + c.s),
            c.m
              ? (b = c.m.call(this._tween, b, this._target || c.t, this._tween))
              : d > b && b > -d && !c.blob && (b = 0),
            c.f ? (c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b)) : (c.t[c.p] = b),
            (c = c._next);
      },
      P = function (a) {
        return ((1e3 * a) | 0) / 1e3 + "";
      },
      Q = function (a, b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = [],
          m = 0,
          n = "",
          o = 0;
        for (
          l.start = a,
            l.end = b,
            a = l[0] = a + "",
            b = l[1] = b + "",
            c && (c(l), (a = l[0]), (b = l[1])),
            l.length = 0,
            e = a.match(M) || [],
            f = b.match(M) || [],
            d &&
              ((d._next = null), (d.blob = 1), (l._firstPT = l._applyPT = d)),
            i = f.length,
            h = 0;
          i > h;
          h++
        )
          (k = f[h]),
            (j = b.substr(m, b.indexOf(k, m) - m)),
            (n += j || !h ? j : ","),
            (m += j.length),
            o ? (o = (o + 1) % 5) : "rgba(" === j.substr(-5) && (o = 1),
            k === e[h] || e.length <= h
              ? (n += k)
              : (n && (l.push(n), (n = "")),
                (g = parseFloat(e[h])),
                l.push(g),
                (l._firstPT = {
                  _next: l._firstPT,
                  t: l,
                  p: l.length - 1,
                  s: g,
                  c:
                    ("=" === k.charAt(1)
                      ? parseInt(k.charAt(0) + "1", 10) *
                        parseFloat(k.substr(2))
                      : parseFloat(k) - g) || 0,
                  f: 0,
                  m: o && 4 > o ? Math.round : P,
                })),
            (m += k.length);
        return (
          (n += b.substr(m)),
          n && l.push(n),
          (l.setRatio = O),
          N.test(b) && (l.end = null),
          l
        );
      },
      R = function (a, b, c, d, e, f, g, h, i) {
        "function" == typeof d && (d = d(i || 0, a));
        var j,
          k = typeof a[b],
          l =
            "function" !== k
              ? ""
              : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)]
              ? b
              : "get" + b.substr(3),
          m = "get" !== c ? c : l ? (g ? a[l](g) : a[l]()) : a[b],
          n = "string" == typeof d && "=" === d.charAt(1),
          o = {
            t: a,
            p: b,
            s: m,
            f: "function" === k,
            pg: 0,
            n: e || b,
            m: f ? ("function" == typeof f ? f : Math.round) : 0,
            pr: 0,
            c: n
              ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2))
              : parseFloat(d) - m || 0,
          };
        return (
          ("number" != typeof m || ("number" != typeof d && !n)) &&
            (g ||
            isNaN(m) ||
            (!n && isNaN(d)) ||
            "boolean" == typeof m ||
            "boolean" == typeof d
              ? ((o.fp = g),
                (j = Q(
                  m,
                  n
                    ? parseFloat(o.s) +
                        o.c +
                        (o.s + "").replace(/[0-9\-\.]/g, "")
                    : d,
                  h || H.defaultStringFilter,
                  o
                )),
                (o = {
                  t: j,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 2,
                  pg: 0,
                  n: e || b,
                  pr: 0,
                  m: 0,
                }))
              : ((o.s = parseFloat(m)), n || (o.c = parseFloat(d) - o.s || 0))),
          o.c
            ? ((o._next = this._firstPT) && (o._next._prev = o),
              (this._firstPT = o),
              o)
            : void 0
        );
      },
      S = (H._internals = {
        isArray: q,
        isSelector: I,
        lazyTweens: K,
        blobDif: Q,
      }),
      T = (H._plugins = {}),
      U = (S.tweenLookup = {}),
      V = 0,
      W = (S.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1,
        stagger: 1,
      }),
      X = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      },
      Y = (E._rootFramesTimeline = new G()),
      Z = (E._rootTimeline = new G()),
      $ = 30,
      _ = (S.lazyRender = function () {
        var a,
          b,
          c = K.length;
        for (L = {}, a = 0; c > a; a++)
          (b = K[a]),
            b &&
              b._lazy !== !1 &&
              (b.render(b._lazy[0], b._lazy[1], !0), (b._lazy = !1));
        K.length = 0;
      });
    (Z._startTime = j.time),
      (Y._startTime = j.frame),
      (Z._active = Y._active = !0),
      setTimeout(_, 1),
      (E._updateRoot = H.render =
        function () {
          var a, b, c;
          if (
            (K.length && _(),
            Z.render((j.time - Z._startTime) * Z._timeScale, !1, !1),
            Y.render((j.frame - Y._startTime) * Y._timeScale, !1, !1),
            K.length && _(),
            j.frame >= $)
          ) {
            $ = j.frame + (parseInt(H.autoSleep, 10) || 120);
            for (c in U) {
              for (b = U[c].tweens, a = b.length; --a > -1; )
                b[a]._gc && b.splice(a, 1);
              0 === b.length && delete U[c];
            }
            if (
              ((c = Z._first),
              (!c || c._paused) &&
                H.autoSleep &&
                !Y._first &&
                1 === j._listeners.tick.length)
            ) {
              for (; c && c._paused; ) c = c._next;
              c || j.sleep();
            }
          }
        }),
      j.addEventListener("tick", E._updateRoot);
    var aa = function (a, b, c) {
        var d,
          e,
          f = a._gsTweenID;
        if (
          (U[f || (a._gsTweenID = f = "t" + V++)] ||
            (U[f] = { target: a, tweens: [] }),
          b && ((d = U[f].tweens), (d[(e = d.length)] = b), c))
        )
          for (; --e > -1; ) d[e] === b && d.splice(e, 1);
        return U[f].tweens;
      },
      ba = function (a, b, c, d) {
        var e,
          f,
          g = a.vars.onOverwrite;
        return (
          g && (e = g(a, b, c, d)),
          (g = H.onOverwrite),
          g && (f = g(a, b, c, d)),
          e !== !1 && f !== !1
        );
      },
      ca = function (a, b, c, d, e) {
        var f, g, h, i;
        if (1 === d || d >= 4) {
          for (i = e.length, f = 0; i > f; f++)
            if ((h = e[f]) !== b) h._gc || (h._kill(null, a, b) && (g = !0));
            else if (5 === d) break;
          return g;
        }
        var j,
          k = b._startTime + n,
          l = [],
          m = 0,
          o = 0 === b._duration;
        for (f = e.length; --f > -1; )
          (h = e[f]) === b ||
            h._gc ||
            h._paused ||
            (h._timeline !== b._timeline
              ? ((j = j || da(b, 0, o)), 0 === da(h, j, o) && (l[m++] = h))
              : h._startTime <= k &&
                h._startTime + h.totalDuration() / h._timeScale > k &&
                (((o || !h._initted) && k - h._startTime <= 2 * n) ||
                  (l[m++] = h)));
        for (f = m; --f > -1; )
          if (
            ((h = l[f]),
            (i = h._firstPT),
            2 === d && h._kill(c, a, b) && (g = !0),
            2 !== d || (!h._firstPT && h._initted && i))
          ) {
            if (2 !== d && !ba(h, b)) continue;
            h._enabled(!1, !1) && (g = !0);
          }
        return g;
      },
      da = function (a, b, c) {
        for (
          var d = a._timeline, e = d._timeScale, f = a._startTime;
          d._timeline;

        ) {
          if (((f += d._startTime), (e *= d._timeScale), d._paused))
            return -100;
          d = d._timeline;
        }
        return (
          (f /= e),
          f > b
            ? f - b
            : (c && f === b) || (!a._initted && 2 * n > f - b)
            ? n
            : (f += a.totalDuration() / a._timeScale / e) > b + n
            ? 0
            : f - b - n
        );
      };
    (i._init = function () {
      var a,
        b,
        c,
        d,
        e,
        f,
        g = this.vars,
        h = this._overwrittenProps,
        i = this._duration,
        j = !!g.immediateRender,
        k = g.ease,
        l = this._startAt;
      if (g.startAt) {
        l && (l.render(-1, !0), l.kill()), (e = {});
        for (d in g.startAt) e[d] = g.startAt[d];
        if (
          ((e.data = "isStart"),
          (e.overwrite = !1),
          (e.immediateRender = !0),
          (e.lazy = j && g.lazy !== !1),
          (e.startAt = e.delay = null),
          (e.onUpdate = g.onUpdate),
          (e.onUpdateParams = g.onUpdateParams),
          (e.onUpdateScope = g.onUpdateScope || g.callbackScope || this),
          (this._startAt = H.to(this.target || {}, 0, e)),
          j)
        )
          if (this._time > 0) this._startAt = null;
          else if (0 !== i) return;
      } else if (g.runBackwards && 0 !== i)
        if (l) l.render(-1, !0), l.kill(), (this._startAt = null);
        else {
          0 !== this._time && (j = !1), (c = {});
          for (d in g) (W[d] && "autoCSS" !== d) || (c[d] = g[d]);
          if (
            ((c.overwrite = 0),
            (c.data = "isFromStart"),
            (c.lazy = j && g.lazy !== !1),
            (c.immediateRender = j),
            (this._startAt = H.to(this.target, 0, c)),
            j)
          ) {
            if (0 === this._time) return;
          } else
            this._startAt._init(),
              this._startAt._enabled(!1),
              this.vars.immediateRender && (this._startAt = null);
        }
      if (
        ((this._ease = k =
          k
            ? k instanceof w
              ? k
              : "function" == typeof k
              ? new w(k, g.easeParams)
              : x[k] || H.defaultEase
            : H.defaultEase),
        g.easeParams instanceof Array &&
          k.config &&
          (this._ease = k.config.apply(k, g.easeParams)),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      )
        for (f = this._targets.length, a = 0; f > a; a++)
          this._initProps(
            this._targets[a],
            (this._propLookup[a] = {}),
            this._siblings[a],
            h ? h[a] : null,
            a
          ) && (b = !0);
      else
        b = this._initProps(
          this.target,
          this._propLookup,
          this._siblings,
          h,
          0
        );
      if (
        (b && H._onPluginEvent("_onInitAllProps", this),
        h &&
          (this._firstPT ||
            ("function" != typeof this.target && this._enabled(!1, !1))),
        g.runBackwards)
      )
        for (c = this._firstPT; c; ) (c.s += c.c), (c.c = -c.c), (c = c._next);
      (this._onUpdate = g.onUpdate), (this._initted = !0);
    }),
      (i._initProps = function (b, c, d, e, f) {
        var g, h, i, j, k, l;
        if (null == b) return !1;
        L[b._gsTweenID] && _(),
          this.vars.css ||
            (b.style &&
              b !== a &&
              b.nodeType &&
              T.css &&
              this.vars.autoCSS !== !1 &&
              J(this.vars, b));
        for (g in this.vars)
          if (((l = this.vars[g]), W[g]))
            l &&
              (l instanceof Array || (l.push && q(l))) &&
              -1 !== l.join("").indexOf("{self}") &&
              (this.vars[g] = l = this._swapSelfInParams(l, this));
          else if (
            T[g] &&
            (j = new T[g]())._onInitTween(b, this.vars[g], this, f)
          ) {
            for (
              this._firstPT = k =
                {
                  _next: this._firstPT,
                  t: j,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 1,
                  n: g,
                  pg: 1,
                  pr: j._priority,
                  m: 0,
                },
                h = j._overwriteProps.length;
              --h > -1;

            )
              c[j._overwriteProps[h]] = this._firstPT;
            (j._priority || j._onInitAllProps) && (i = !0),
              (j._onDisable || j._onEnable) &&
                (this._notifyPluginsOfEnabled = !0),
              k._next && (k._next._prev = k);
          } else
            c[g] = R.call(
              this,
              b,
              g,
              "get",
              l,
              g,
              0,
              null,
              this.vars.stringFilter,
              f
            );
        return e && this._kill(e, b)
          ? this._initProps(b, c, d, e, f)
          : this._overwrite > 1 &&
            this._firstPT &&
            d.length > 1 &&
            ca(b, this, c, this._overwrite, d)
          ? (this._kill(c, b), this._initProps(b, c, d, e, f))
          : (this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration)) &&
              (L[b._gsTweenID] = !0),
            i);
      }),
      (i.render = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = this,
          i = h._time,
          j = h._duration,
          k = h._rawPrevTime;
        if (a >= j - n && a >= 0)
          (h._totalTime = h._time = j),
            (h.ratio = h._ease._calcEnd ? h._ease.getRatio(1) : 1),
            h._reversed ||
              ((d = !0),
              (e = "onComplete"),
              (c = c || h._timeline.autoRemoveChildren)),
            0 === j &&
              (h._initted || !h.vars.lazy || c) &&
              (h._startTime === h._timeline._duration && (a = 0),
              (0 > k ||
                (0 >= a && a >= -n) ||
                (k === n && "isPause" !== h.data)) &&
                k !== a &&
                ((c = !0), k > n && (e = "onReverseComplete")),
              (h._rawPrevTime = g = !b || a || k === a ? a : n));
        else if (n > a)
          (h._totalTime = h._time = 0),
            (h.ratio = h._ease._calcEnd ? h._ease.getRatio(0) : 0),
            (0 !== i || (0 === j && k > 0)) &&
              ((e = "onReverseComplete"), (d = h._reversed)),
            a > -n
              ? (a = 0)
              : 0 > a &&
                ((h._active = !1),
                0 === j &&
                  (h._initted || !h.vars.lazy || c) &&
                  (k >= 0 && (k !== n || "isPause" !== h.data) && (c = !0),
                  (h._rawPrevTime = g = !b || a || k === a ? a : n))),
            (!h._initted || (h._startAt && h._startAt.progress())) && (c = !0);
        else if (((h._totalTime = h._time = a), h._easeType)) {
          var l = a / j,
            m = h._easeType,
            o = h._easePower;
          (1 === m || (3 === m && l >= 0.5)) && (l = 1 - l),
            3 === m && (l *= 2),
            1 === o
              ? (l *= l)
              : 2 === o
              ? (l *= l * l)
              : 3 === o
              ? (l *= l * l * l)
              : 4 === o && (l *= l * l * l * l),
            (h.ratio =
              1 === m ? 1 - l : 2 === m ? l : 0.5 > a / j ? l / 2 : 1 - l / 2);
        } else h.ratio = h._ease.getRatio(a / j);
        if (h._time !== i || c) {
          if (!h._initted) {
            if ((h._init(), !h._initted || h._gc)) return;
            if (
              !c &&
              h._firstPT &&
              ((h.vars.lazy !== !1 && h._duration) ||
                (h.vars.lazy && !h._duration))
            )
              return (
                (h._time = h._totalTime = i),
                (h._rawPrevTime = k),
                K.push(h),
                void (h._lazy = [a, b])
              );
            h._time && !d
              ? (h.ratio = h._ease.getRatio(h._time / j))
              : d &&
                h._ease._calcEnd &&
                (h.ratio = h._ease.getRatio(0 === h._time ? 0 : 1));
          }
          for (
            h._lazy !== !1 && (h._lazy = !1),
              h._active ||
                (!h._paused && h._time !== i && a >= 0 && (h._active = !0)),
              0 === i &&
                (h._startAt &&
                  (a >= 0
                    ? h._startAt.render(a, !0, c)
                    : e || (e = "_dummyGS")),
                h.vars.onStart &&
                  (0 !== h._time || 0 === j) &&
                  (b || h._callback("onStart"))),
              f = h._firstPT;
            f;

          )
            f.f
              ? f.t[f.p](f.c * h.ratio + f.s)
              : (f.t[f.p] = f.c * h.ratio + f.s),
              (f = f._next);
          h._onUpdate &&
            (0 > a && h._startAt && a !== -1e-4 && h._startAt.render(a, !0, c),
            b || ((h._time !== i || d || c) && h._callback("onUpdate"))),
            e &&
              (!h._gc || c) &&
              (0 > a &&
                h._startAt &&
                !h._onUpdate &&
                a !== -1e-4 &&
                h._startAt.render(a, !0, c),
              d &&
                (h._timeline.autoRemoveChildren && h._enabled(!1, !1),
                (h._active = !1)),
              !b && h.vars[e] && h._callback(e),
              0 === j &&
                h._rawPrevTime === n &&
                g !== n &&
                (h._rawPrevTime = 0));
        }
      }),
      (i._kill = function (a, b, c) {
        if (
          ("all" === a && (a = null),
          null == a && (null == b || b === this.target))
        )
          return (this._lazy = !1), this._enabled(!1, !1);
        b =
          "string" != typeof b
            ? b || this._targets || this.target
            : H.selector(b) || b;
        var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m =
            c &&
            this._time &&
            c._startTime === this._startTime &&
            this._timeline === c._timeline,
          n = this._firstPT;
        if ((q(b) || I(b)) && "number" != typeof b[0])
          for (d = b.length; --d > -1; ) this._kill(a, b[d], c) && (i = !0);
        else {
          if (this._targets) {
            for (d = this._targets.length; --d > -1; )
              if (b === this._targets[d]) {
                (h = this._propLookup[d] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (e = this._overwrittenProps[d] =
                    a ? this._overwrittenProps[d] || {} : "all");
                break;
              }
          } else {
            if (b !== this.target) return !1;
            (h = this._propLookup),
              (e = this._overwrittenProps =
                a ? this._overwrittenProps || {} : "all");
          }
          if (h) {
            if (
              ((j = a || h),
              (k =
                a !== e &&
                "all" !== e &&
                a !== h &&
                ("object" != typeof a || !a._tempKill)),
              c && (H.onOverwrite || this.vars.onOverwrite))
            ) {
              for (f in j) h[f] && (l || (l = []), l.push(f));
              if ((l || !a) && !ba(this, c, b, l)) return !1;
            }
            for (f in j)
              (g = h[f]) &&
                (m && (g.f ? g.t[g.p](g.s) : (g.t[g.p] = g.s), (i = !0)),
                g.pg && g.t._kill(j) && (i = !0),
                (g.pg && 0 !== g.t._overwriteProps.length) ||
                  (g._prev
                    ? (g._prev._next = g._next)
                    : g === this._firstPT && (this._firstPT = g._next),
                  g._next && (g._next._prev = g._prev),
                  (g._next = g._prev = null)),
                delete h[f]),
                k && (e[f] = 1);
            !this._firstPT && this._initted && n && this._enabled(!1, !1);
          }
        }
        return i;
      }),
      (i.invalidate = function () {
        this._notifyPluginsOfEnabled && H._onPluginEvent("_onDisable", this);
        var a = this._time;
        return (
          (this._firstPT =
            this._overwrittenProps =
            this._startAt =
            this._onUpdate =
              null),
          (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
          (this._propLookup = this._targets ? {} : []),
          E.prototype.invalidate.call(this),
          this.vars.immediateRender &&
            ((this._time = -n), this.render(a, !1, this.vars.lazy !== !1)),
          this
        );
      }),
      (i._enabled = function (a, b) {
        if ((k || j.wake(), a && this._gc)) {
          var c,
            d = this._targets;
          if (d)
            for (c = d.length; --c > -1; )
              this._siblings[c] = aa(d[c], this, !0);
          else this._siblings = aa(this.target, this, !0);
        }
        return (
          E.prototype._enabled.call(this, a, b),
          this._notifyPluginsOfEnabled && this._firstPT
            ? H._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
            : !1
        );
      }),
      (H.to = function (a, b, c) {
        return new H(a, b, c);
      }),
      (H.from = function (a, b, c) {
        return (
          (c.runBackwards = !0),
          (c.immediateRender = 0 != c.immediateRender),
          new H(a, b, c)
        );
      }),
      (H.fromTo = function (a, b, c, d) {
        return (
          (d.startAt = c),
          (d.immediateRender =
            0 != d.immediateRender && 0 != c.immediateRender),
          new H(a, b, d)
        );
      }),
      (H.delayedCall = function (a, b, c, d, e) {
        return new H(b, 0, {
          delay: a,
          onComplete: b,
          onCompleteParams: c,
          callbackScope: d,
          onReverseComplete: b,
          onReverseCompleteParams: c,
          immediateRender: !1,
          lazy: !1,
          useFrames: e,
          overwrite: 0,
        });
      }),
      (H.set = function (a, b) {
        return new H(a, 0, b);
      }),
      (H.getTweensOf = function (a, b) {
        if (null == a) return [];
        a = "string" != typeof a ? a : H.selector(a) || a;
        var c, d, e, f;
        if ((q(a) || I(a)) && "number" != typeof a[0]) {
          for (c = a.length, d = []; --c > -1; )
            d = d.concat(H.getTweensOf(a[c], b));
          for (c = d.length; --c > -1; )
            for (f = d[c], e = c; --e > -1; ) f === d[e] && d.splice(c, 1);
        } else if (a._gsTweenID)
          for (d = aa(a).concat(), c = d.length; --c > -1; )
            (d[c]._gc || (b && !d[c].isActive())) && d.splice(c, 1);
        return d || [];
      }),
      (H.killTweensOf = H.killDelayedCallsTo =
        function (a, b, c) {
          "object" == typeof b && ((c = b), (b = !1));
          for (var d = H.getTweensOf(a, b), e = d.length; --e > -1; )
            d[e]._kill(c, a);
        });
    var ea = u(
      "plugins.TweenPlugin",
      function (a, b) {
        (this._overwriteProps = (a || "").split(",")),
          (this._propName = this._overwriteProps[0]),
          (this._priority = b || 0),
          (this._super = ea.prototype);
      },
      !0
    );
    if (
      ((i = ea.prototype),
      (ea.version = "1.19.0"),
      (ea.API = 2),
      (i._firstPT = null),
      (i._addTween = R),
      (i.setRatio = O),
      (i._kill = function (a) {
        var b,
          c = this._overwriteProps,
          d = this._firstPT;
        if (null != a[this._propName]) this._overwriteProps = [];
        else for (b = c.length; --b > -1; ) null != a[c[b]] && c.splice(b, 1);
        for (; d; )
          null != a[d.n] &&
            (d._next && (d._next._prev = d._prev),
            d._prev
              ? ((d._prev._next = d._next), (d._prev = null))
              : this._firstPT === d && (this._firstPT = d._next)),
            (d = d._next);
        return !1;
      }),
      (i._mod = i._roundProps =
        function (a) {
          for (var b, c = this._firstPT; c; )
            (b =
              a[this._propName] ||
              (null != c.n && a[c.n.split(this._propName + "_").join("")])),
              b &&
                "function" == typeof b &&
                (2 === c.f ? (c.t._applyPT.m = b) : (c.m = b)),
              (c = c._next);
        }),
      (H._onPluginEvent = function (a, b) {
        var c,
          d,
          e,
          f,
          g,
          h = b._firstPT;
        if ("_onInitAllProps" === a) {
          for (; h; ) {
            for (g = h._next, d = e; d && d.pr > h.pr; ) d = d._next;
            (h._prev = d ? d._prev : f) ? (h._prev._next = h) : (e = h),
              (h._next = d) ? (d._prev = h) : (f = h),
              (h = g);
          }
          h = b._firstPT = e;
        }
        for (; h; )
          h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0),
            (h = h._next);
        return c;
      }),
      (ea.activate = function (a) {
        for (var b = a.length; --b > -1; )
          a[b].API === ea.API && (T[new a[b]()._propName] = a[b]);
        return !0;
      }),
      (t.plugin = function (a) {
        if (!(a && a.propName && a.init && a.API))
          throw "illegal plugin definition.";
        var b,
          c = a.propName,
          d = a.priority || 0,
          e = a.overwriteProps,
          f = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps",
          },
          g = u(
            "plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin",
            function () {
              ea.call(this, c, d), (this._overwriteProps = e || []);
            },
            a.global === !0
          ),
          h = (g.prototype = new ea(c));
        (h.constructor = g), (g.API = a.API);
        for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
        return (g.version = a.version), ea.activate([g]), g;
      }),
      (g = a._gsQueue))
    ) {
      for (h = 0; h < g.length; h++) g[h]();
      for (i in r)
        r[i].func || a.console.log("GSAP encountered missing dependency: " + i);
    }
    k = !1;
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenMax"
  );

/*!
 * VERSION: 1.9.2
 * DATE: 2019-02-07
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  var a = (_gsScope.document || {}).documentElement,
    b = _gsScope,
    c = function (c, d) {
      var e = "x" === d ? "Width" : "Height",
        f = "scroll" + e,
        g = "client" + e,
        h = document.body;
      return c === b || c === a || c === h
        ? Math.max(a[f], h[f]) - (b["inner" + e] || a[g] || h[g])
        : c[f] - c["offset" + e];
    },
    d = function (a) {
      return (
        "string" == typeof a && (a = TweenLite.selector(a)),
        a.length && a !== b && a[0] && a[0].style && !a.nodeType && (a = a[0]),
        a === b || (a.nodeType && a.style) ? a : null
      );
    },
    e = function (c, d) {
      var e = "scroll" + ("x" === d ? "Left" : "Top");
      return (
        c === b &&
          (null != c.pageXOffset
            ? (e = "page" + d.toUpperCase() + "Offset")
            : (c = null != a[e] ? a : document.body)),
        function () {
          return c[e];
        }
      );
    },
    f = function (c, f) {
      var g = d(c).getBoundingClientRect(),
        h = document.body,
        i = !f || f === b || f === h,
        j = i
          ? {
              top:
                a.clientTop -
                (window.pageYOffset || a.scrollTop || h.scrollTop || 0),
              left:
                a.clientLeft -
                (window.pageXOffset || a.scrollLeft || h.scrollLeft || 0),
            }
          : f.getBoundingClientRect(),
        k = { x: g.left - j.left, y: g.top - j.top };
      return !i && f && ((k.x += e(f, "x")()), (k.y += e(f, "y")())), k;
    },
    g = function (a, b, d, e) {
      var g = typeof a;
      return isNaN(a)
        ? "string" === g && "=" === a.charAt(1)
          ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + e
          : "max" === a
          ? c(b, d)
          : Math.min(c(b, d), f(a, b)[d])
        : parseFloat(a);
    },
    h = _gsScope._gsDefine.plugin({
      propName: "scrollTo",
      API: 2,
      global: !0,
      version: "1.9.2",
      init: function (a, c, d) {
        return (
          (this._wdw = a === b),
          (this._target = a),
          (this._tween = d),
          "object" != typeof c
            ? ((c = { y: c }),
              "string" == typeof c.y &&
                "max" !== c.y &&
                "=" !== c.y.charAt(1) &&
                (c.x = c.y))
            : c.nodeType && (c = { y: c, x: c }),
          (this.vars = c),
          (this._autoKill = c.autoKill !== !1),
          (this.getX = e(a, "x")),
          (this.getY = e(a, "y")),
          (this.x = this.xPrev = this.getX()),
          (this.y = this.yPrev = this.getY()),
          null != c.x
            ? (this._addTween(
                this,
                "x",
                this.x,
                g(c.x, a, "x", this.x) - (c.offsetX || 0),
                "scrollTo_x",
                !0
              ),
              this._overwriteProps.push("scrollTo_x"))
            : (this.skipX = !0),
          null != c.y
            ? (this._addTween(
                this,
                "y",
                this.y,
                g(c.y, a, "y", this.y) - (c.offsetY || 0),
                "scrollTo_y",
                !0
              ),
              this._overwriteProps.push("scrollTo_y"))
            : (this.skipY = !0),
          !0
        );
      },
      set: function (a) {
        this._super.setRatio.call(this, a);
        var d = this._wdw || !this.skipX ? this.getX() : this.xPrev,
          e = this._wdw || !this.skipY ? this.getY() : this.yPrev,
          f = e - this.yPrev,
          g = d - this.xPrev,
          i = h.autoKillThreshold;
        this.x < 0 && (this.x = 0),
          this.y < 0 && (this.y = 0),
          this._autoKill &&
            (!this.skipX &&
              (g > i || -i > g) &&
              d < c(this._target, "x") &&
              (this.skipX = !0),
            !this.skipY &&
              (f > i || -i > f) &&
              e < c(this._target, "y") &&
              (this.skipY = !0),
            this.skipX &&
              this.skipY &&
              (this._tween.kill(),
              this.vars.onAutoKill &&
                this.vars.onAutoKill.apply(
                  this.vars.onAutoKillScope || this._tween,
                  this.vars.onAutoKillParams || []
                ))),
          this._wdw
            ? b.scrollTo(this.skipX ? d : this.x, this.skipY ? e : this.y)
            : (this.skipY || (this._target.scrollTop = this.y),
              this.skipX || (this._target.scrollLeft = this.x)),
          (this.xPrev = this.x),
          (this.yPrev = this.y);
      },
    }),
    i = h.prototype;
  (h.max = c),
    (h.getOffset = f),
    (h.buildGetter = e),
    (h.autoKillThreshold = 7),
    (i._kill = function (a) {
      return (
        a.scrollTo_x && (this.skipX = !0),
        a.scrollTo_y && (this.skipY = !0),
        this._super._kill.call(this, a)
      );
    });
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (a) {
    "use strict";
    var b = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[a];
    };
    "undefined" != typeof module && module.exports
      ? (require("../TweenLite.min.js"), (module.exports = b()))
      : "function" == typeof define && define.amd && define(["TweenLite"], b);
  })("ScrollToPlugin");

/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io
 * https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js
 *  */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t())
    : (e.ScrollMagic = t());
})(this, function () {
  "use strict";
  var _ = function () {};
  (_.version = "2.0.7"), window.addEventListener("mousewheel", function () {});
  var P = "data-scrollmagic-pin-spacer";
  _.Controller = function (e) {
    var n,
      r,
      i = "REVERSE",
      t = "PAUSED",
      o = z.defaults,
      s = this,
      a = R.extend({}, o, e),
      l = [],
      c = !1,
      f = 0,
      u = t,
      d = !0,
      h = 0,
      p = !0,
      g = function () {
        0 < a.refreshInterval && (r = window.setTimeout(E, a.refreshInterval));
      },
      v = function () {
        return a.vertical
          ? R.get.scrollTop(a.container)
          : R.get.scrollLeft(a.container);
      },
      m = function () {
        return a.vertical
          ? R.get.height(a.container)
          : R.get.width(a.container);
      },
      w = (this._setScrollPos = function (e) {
        a.vertical
          ? d
            ? window.scrollTo(R.get.scrollLeft(), e)
            : (a.container.scrollTop = e)
          : d
          ? window.scrollTo(e, R.get.scrollTop())
          : (a.container.scrollLeft = e);
      }),
      y = function () {
        if (p && c) {
          var e = R.type.Array(c) ? c : l.slice(0);
          c = !1;
          var t = f,
            n = (f = s.scrollPos()) - t;
          0 !== n && (u = 0 < n ? "FORWARD" : i),
            u === i && e.reverse(),
            e.forEach(function (e, t) {
              e.update(!0);
            });
        }
      },
      S = function () {
        n = R.rAF(y);
      },
      b = function (e) {
        "resize" == e.type && ((h = m()), (u = t)), !0 !== c && ((c = !0), S());
      },
      E = function () {
        if (!d && h != m()) {
          var t;
          try {
            t = new Event("resize", { bubbles: !1, cancelable: !1 });
          } catch (e) {
            (t = document.createEvent("Event")).initEvent("resize", !1, !1);
          }
          a.container.dispatchEvent(t);
        }
        l.forEach(function (e, t) {
          e.refresh();
        }),
          g();
      };
    this._options = a;
    var x = function (e) {
      if (e.length <= 1) return e;
      var t = e.slice(0);
      return (
        t.sort(function (e, t) {
          return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
        }),
        t
      );
    };
    return (
      (this.addScene = function (e) {
        if (R.type.Array(e))
          e.forEach(function (e, t) {
            s.addScene(e);
          });
        else if (e instanceof _.Scene)
          if (e.controller() !== s) e.addTo(s);
          else if (l.indexOf(e) < 0)
            for (var t in (l.push(e),
            (l = x(l)),
            e.on("shift.controller_sort", function () {
              l = x(l);
            }),
            a.globalSceneOptions))
              e[t] && e[t].call(e, a.globalSceneOptions[t]);
        return s;
      }),
      (this.removeScene = function (e) {
        if (R.type.Array(e))
          e.forEach(function (e, t) {
            s.removeScene(e);
          });
        else {
          var t = l.indexOf(e);
          -1 < t &&
            (e.off("shift.controller_sort"), l.splice(t, 1), e.remove());
        }
        return s;
      }),
      (this.updateScene = function (e, n) {
        return (
          R.type.Array(e)
            ? e.forEach(function (e, t) {
                s.updateScene(e, n);
              })
            : n
            ? e.update(!0)
            : !0 !== c &&
              e instanceof _.Scene &&
              (-1 == (c = c || []).indexOf(e) && c.push(e), (c = x(c)), S()),
          s
        );
      }),
      (this.update = function (e) {
        return b({ type: "resize" }), e && y(), s;
      }),
      (this.scrollTo = function (e, t) {
        if (R.type.Number(e)) w.call(a.container, e, t);
        else if (e instanceof _.Scene)
          e.controller() === s && s.scrollTo(e.scrollOffset(), t);
        else if (R.type.Function(e)) w = e;
        else {
          var n = R.get.elements(e)[0];
          if (n) {
            for (; n.parentNode.hasAttribute(P); ) n = n.parentNode;
            var r = a.vertical ? "top" : "left",
              i = R.get.offset(a.container),
              o = R.get.offset(n);
            d || (i[r] -= s.scrollPos()), s.scrollTo(o[r] - i[r], t);
          }
        }
        return s;
      }),
      (this.scrollPos = function (e) {
        return arguments.length
          ? (R.type.Function(e) && (v = e), s)
          : v.call(s);
      }),
      (this.info = function (e) {
        var t = {
          size: h,
          vertical: a.vertical,
          scrollPos: f,
          scrollDirection: u,
          container: a.container,
          isDocument: d,
        };
        return arguments.length ? (void 0 !== t[e] ? t[e] : void 0) : t;
      }),
      (this.loglevel = function (e) {
        return s;
      }),
      (this.enabled = function (e) {
        return arguments.length
          ? (p != e && ((p = !!e), s.updateScene(l, !0)), s)
          : p;
      }),
      (this.destroy = function (e) {
        window.clearTimeout(r);
        for (var t = l.length; t--; ) l[t].destroy(e);
        return (
          a.container.removeEventListener("resize", b),
          a.container.removeEventListener("scroll", b),
          R.cAF(n),
          null
        );
      }),
      (function () {
        for (var e in a) o.hasOwnProperty(e) || delete a[e];
        if (((a.container = R.get.elements(a.container)[0]), !a.container))
          throw "ScrollMagic.Controller init failed.";
        (d =
          a.container === window ||
          a.container === document.body ||
          !document.body.contains(a.container)) && (a.container = window),
          (h = m()),
          a.container.addEventListener("resize", b),
          a.container.addEventListener("scroll", b);
        var t = parseInt(a.refreshInterval, 10);
        (a.refreshInterval = R.type.Number(t) ? t : o.refreshInterval), g();
      })(),
      s
    );
  };
  var z = {
    defaults: {
      container: window,
      vertical: !0,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100,
    },
  };
  (_.Controller.addOption = function (e, t) {
    z.defaults[e] = t;
  }),
    (_.Controller.extend = function (e) {
      var t = this;
      (_.Controller = function () {
        return (
          t.apply(this, arguments),
          (this.$super = R.extend({}, this)),
          e.apply(this, arguments) || this
        );
      }),
        R.extend(_.Controller, t),
        (_.Controller.prototype = t.prototype),
        (_.Controller.prototype.constructor = _.Controller);
    }),
    (_.Scene = function (e) {
      var n,
        l,
        c = "BEFORE",
        f = "DURING",
        u = "AFTER",
        r = D.defaults,
        d = this,
        h = R.extend({}, r, e),
        p = c,
        g = 0,
        a = { start: 0, end: 0 },
        v = 0,
        i = !0,
        s = {};
      (this.on = function (e, i) {
        return (
          R.type.Function(i) &&
            (e = e.trim().split(" ")).forEach(function (e) {
              var t = e.split("."),
                n = t[0],
                r = t[1];
              "*" != n &&
                (s[n] || (s[n] = []),
                s[n].push({ namespace: r || "", callback: i }));
            }),
          d
        );
      }),
        (this.off = function (e, o) {
          return (
            e &&
              (e = e.trim().split(" ")).forEach(function (e, t) {
                var n = e.split("."),
                  r = n[0],
                  i = n[1] || "";
                ("*" === r ? Object.keys(s) : [r]).forEach(function (e) {
                  for (var t = s[e] || [], n = t.length; n--; ) {
                    var r = t[n];
                    !r ||
                      (i !== r.namespace && "*" !== i) ||
                      (o && o != r.callback) ||
                      t.splice(n, 1);
                  }
                  t.length || delete s[e];
                });
              }),
            d
          );
        }),
        (this.trigger = function (e, n) {
          if (e) {
            var t = e.trim().split("."),
              r = t[0],
              i = t[1],
              o = s[r];
            o &&
              o.forEach(function (e, t) {
                (i && i !== e.namespace) ||
                  e.callback.call(d, new _.Event(r, e.namespace, d, n));
              });
          }
          return d;
        }),
        d
          .on("change.internal", function (e) {
            "loglevel" !== e.what &&
              "tweenChanges" !== e.what &&
              ("triggerElement" === e.what
                ? y()
                : "reverse" === e.what && d.update());
          })
          .on("shift.internal", function (e) {
            t(), d.update();
          }),
        (this.addTo = function (e) {
          return (
            e instanceof _.Controller &&
              l != e &&
              (l && l.removeScene(d),
              (l = e),
              E(),
              o(!0),
              y(!0),
              t(),
              l.info("container").addEventListener("resize", S),
              e.addScene(d),
              d.trigger("add", { controller: l }),
              d.update()),
            d
          );
        }),
        (this.enabled = function (e) {
          return arguments.length
            ? (i != e && ((i = !!e), d.update(!0)), d)
            : i;
        }),
        (this.remove = function () {
          if (l) {
            l.info("container").removeEventListener("resize", S);
            var e = l;
            (l = void 0), e.removeScene(d), d.trigger("remove");
          }
          return d;
        }),
        (this.destroy = function (e) {
          return (
            d.trigger("destroy", { reset: e }), d.remove(), d.off("*.*"), null
          );
        }),
        (this.update = function (e) {
          if (l)
            if (e)
              if (l.enabled() && i) {
                var t,
                  n = l.info("scrollPos");
                (t =
                  0 < h.duration
                    ? (n - a.start) / (a.end - a.start)
                    : n >= a.start
                    ? 1
                    : 0),
                  d.trigger("update", {
                    startPos: a.start,
                    endPos: a.end,
                    scrollPos: n,
                  }),
                  d.progress(t);
              } else m && p === f && C(!0);
            else l.updateScene(d, !1);
          return d;
        }),
        (this.refresh = function () {
          return o(), y(), d;
        }),
        (this.progress = function (e) {
          if (arguments.length) {
            var t = !1,
              n = p,
              r = l ? l.info("scrollDirection") : "PAUSED",
              i = h.reverse || g <= e;
            if (
              (0 === h.duration
                ? ((t = g != e), (p = 0 === (g = e < 1 && i ? 0 : 1) ? c : f))
                : e < 0 && p !== c && i
                ? ((p = c), (t = !(g = 0)))
                : 0 <= e && e < 1 && i
                ? ((g = e), (p = f), (t = !0))
                : 1 <= e && p !== u
                ? ((g = 1), (p = u), (t = !0))
                : p !== f || i || C(),
              t)
            ) {
              var o = { progress: g, state: p, scrollDirection: r },
                s = p != n,
                a = function (e) {
                  d.trigger(e, o);
                };
              s && n !== f && (a("enter"), a(n === c ? "start" : "end")),
                a("progress"),
                s && p !== f && (a(p === c ? "start" : "end"), a("leave"));
            }
            return d;
          }
          return g;
        });
      var m,
        w,
        t = function () {
          (a = { start: v + h.offset }),
            l &&
              h.triggerElement &&
              (a.start -= l.info("size") * h.triggerHook),
            (a.end = a.start + h.duration);
        },
        o = function (e) {
          if (n) {
            var t = "duration";
            x(t, n.call(d)) &&
              !e &&
              (d.trigger("change", { what: t, newval: h[t] }),
              d.trigger("shift", { reason: t }));
          }
        },
        y = function (e) {
          var t = 0,
            n = h.triggerElement;
          if (l && (n || 0 < v)) {
            if (n)
              if (n.parentNode) {
                for (
                  var r = l.info(),
                    i = R.get.offset(r.container),
                    o = r.vertical ? "top" : "left";
                  n.parentNode.hasAttribute(P);

                )
                  n = n.parentNode;
                var s = R.get.offset(n);
                r.isDocument || (i[o] -= l.scrollPos()), (t = s[o] - i[o]);
              } else d.triggerElement(void 0);
            var a = t != v;
            (v = t),
              a &&
                !e &&
                d.trigger("shift", { reason: "triggerElementPosition" });
          }
        },
        S = function (e) {
          0 < h.triggerHook &&
            d.trigger("shift", { reason: "containerResize" });
        },
        b = R.extend(D.validate, {
          duration: function (t) {
            if (R.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
              var e = parseFloat(t) / 100;
              t = function () {
                return l ? l.info("size") * e : 0;
              };
            }
            if (R.type.Function(t)) {
              n = t;
              try {
                t = parseFloat(n.call(d));
              } catch (e) {
                t = -1;
              }
            }
            if (((t = parseFloat(t)), !R.type.Number(t) || t < 0))
              throw (n && (n = void 0), 0);
            return t;
          },
        }),
        E = function (e) {
          (e = arguments.length ? [e] : Object.keys(b)).forEach(function (
            t,
            e
          ) {
            var n;
            if (b[t])
              try {
                n = b[t](h[t]);
              } catch (e) {
                n = r[t];
              } finally {
                h[t] = n;
              }
          });
        },
        x = function (e, t) {
          var n = !1,
            r = h[e];
          return h[e] != t && ((h[e] = t), E(e), (n = r != h[e])), n;
        },
        z = function (t) {
          d[t] ||
            (d[t] = function (e) {
              return arguments.length
                ? ("duration" === t && (n = void 0),
                  x(t, e) &&
                    (d.trigger("change", { what: t, newval: h[t] }),
                    -1 < D.shifts.indexOf(t) &&
                      d.trigger("shift", { reason: t })),
                  d)
                : h[t];
            });
        };
      (this.controller = function () {
        return l;
      }),
        (this.state = function () {
          return p;
        }),
        (this.scrollOffset = function () {
          return a.start;
        }),
        (this.triggerPosition = function () {
          var e = h.offset;
          return (
            l &&
              (h.triggerElement
                ? (e += v)
                : (e += l.info("size") * d.triggerHook())),
            e
          );
        }),
        d
          .on("shift.internal", function (e) {
            var t = "duration" === e.reason;
            ((p === u && t) || (p === f && 0 === h.duration)) && C(), t && F();
          })
          .on("progress.internal", function (e) {
            C();
          })
          .on("add.internal", function (e) {
            F();
          })
          .on("destroy.internal", function (e) {
            d.removePin(e.reset);
          });
      var C = function (e) {
          if (m && l) {
            var t = l.info(),
              n = w.spacer.firstChild;
            if (e || p !== f) {
              var r = {
                  position: w.inFlow ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                },
                i = R.css(n, "position") != r.position;
              w.pushFollowers
                ? 0 < h.duration &&
                  (p === u && 0 === parseFloat(R.css(w.spacer, "padding-top"))
                    ? (i = !0)
                    : p === c &&
                      0 === parseFloat(R.css(w.spacer, "padding-bottom")) &&
                      (i = !0))
                : (r[t.vertical ? "top" : "left"] = h.duration * g),
                R.css(n, r),
                i && F();
            } else {
              "fixed" != R.css(n, "position") &&
                (R.css(n, { position: "fixed" }), F());
              var o = R.get.offset(w.spacer, !0),
                s =
                  h.reverse || 0 === h.duration
                    ? t.scrollPos - a.start
                    : Math.round(g * h.duration * 10) / 10;
              (o[t.vertical ? "top" : "left"] += s),
                R.css(w.spacer.firstChild, { top: o.top, left: o.left });
            }
          }
        },
        F = function () {
          if (m && l && w.inFlow) {
            var e = p === f,
              t = l.info("vertical"),
              n = w.spacer.firstChild,
              r = R.isMarginCollapseType(R.css(w.spacer, "display")),
              i = {};
            w.relSize.width || w.relSize.autoFullWidth
              ? e
                ? R.css(m, { width: R.get.width(w.spacer) })
                : R.css(m, { width: "100%" })
              : ((i["min-width"] = R.get.width(t ? m : n, !0, !0)),
                (i.width = e ? i["min-width"] : "auto")),
              w.relSize.height
                ? e
                  ? R.css(m, {
                      height:
                        R.get.height(w.spacer) -
                        (w.pushFollowers ? h.duration : 0),
                    })
                  : R.css(m, { height: "100%" })
                : ((i["min-height"] = R.get.height(t ? n : m, !0, !r)),
                  (i.height = e ? i["min-height"] : "auto")),
              w.pushFollowers &&
                ((i["padding" + (t ? "Top" : "Left")] = h.duration * g),
                (i["padding" + (t ? "Bottom" : "Right")] =
                  h.duration * (1 - g))),
              R.css(w.spacer, i);
          }
        },
        L = function () {
          l && m && p === f && !l.info("isDocument") && C();
        },
        T = function () {
          l &&
            m &&
            p === f &&
            (((w.relSize.width || w.relSize.autoFullWidth) &&
              R.get.width(window) != R.get.width(w.spacer.parentNode)) ||
              (w.relSize.height &&
                R.get.height(window) != R.get.height(w.spacer.parentNode))) &&
            F();
        },
        A = function (e) {
          l &&
            m &&
            p === f &&
            !l.info("isDocument") &&
            (e.preventDefault(),
            l._setScrollPos(
              l.info("scrollPos") -
                ((e.wheelDelta ||
                  e[l.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 ||
                  30 * -e.detail)
            ));
        };
      (this.setPin = function (e, t) {
        if (
          ((t = R.extend(
            {},
            { pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer" },
            t
          )),
          !(e = R.get.elements(e)[0]))
        )
          return d;
        if ("fixed" === R.css(e, "position")) return d;
        if (m) {
          if (m === e) return d;
          d.removePin();
        }
        var n = (m = e).parentNode.style.display,
          r = [
            "top",
            "left",
            "bottom",
            "right",
            "margin",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
          ];
        m.parentNode.style.display = "none";
        var i = "absolute" != R.css(m, "position"),
          o = R.css(m, r.concat(["display"])),
          s = R.css(m, ["width", "height"]);
        (m.parentNode.style.display = n),
          !i && t.pushFollowers && (t.pushFollowers = !1);
        var a = m.parentNode.insertBefore(document.createElement("div"), m),
          l = R.extend(o, {
            position: i ? "relative" : "absolute",
            boxSizing: "content-box",
            mozBoxSizing: "content-box",
            webkitBoxSizing: "content-box",
          });
        if (
          (i || R.extend(l, R.css(m, ["width", "height"])),
          R.css(a, l),
          a.setAttribute(P, ""),
          R.addClass(a, t.spacerClass),
          (w = {
            spacer: a,
            relSize: {
              width: "%" === s.width.slice(-1),
              height: "%" === s.height.slice(-1),
              autoFullWidth:
                "auto" === s.width && i && R.isMarginCollapseType(o.display),
            },
            pushFollowers: t.pushFollowers,
            inFlow: i,
          }),
          !m.___origStyle)
        ) {
          m.___origStyle = {};
          var c = m.style;
          r.concat([
            "width",
            "height",
            "position",
            "boxSizing",
            "mozBoxSizing",
            "webkitBoxSizing",
          ]).forEach(function (e) {
            m.___origStyle[e] = c[e] || "";
          });
        }
        return (
          w.relSize.width && R.css(a, { width: s.width }),
          w.relSize.height && R.css(a, { height: s.height }),
          a.appendChild(m),
          R.css(m, {
            position: i ? "relative" : "absolute",
            margin: "auto",
            top: "auto",
            left: "auto",
            bottom: "auto",
            right: "auto",
          }),
          (w.relSize.width || w.relSize.autoFullWidth) &&
            R.css(m, {
              boxSizing: "border-box",
              mozBoxSizing: "border-box",
              webkitBoxSizing: "border-box",
            }),
          window.addEventListener("scroll", L),
          window.addEventListener("resize", L),
          window.addEventListener("resize", T),
          m.addEventListener("mousewheel", A),
          m.addEventListener("DOMMouseScroll", A),
          C(),
          d
        );
      }),
        (this.removePin = function (e) {
          if (m) {
            if ((p === f && C(!0), e || !l)) {
              var t = w.spacer.firstChild;
              if (t.hasAttribute(P)) {
                var n = w.spacer.style,
                  r = {};
                [
                  "margin",
                  "marginLeft",
                  "marginRight",
                  "marginTop",
                  "marginBottom",
                ].forEach(function (e) {
                  r[e] = n[e] || "";
                }),
                  R.css(t, r);
              }
              w.spacer.parentNode.insertBefore(t, w.spacer),
                w.spacer.parentNode.removeChild(w.spacer),
                m.parentNode.hasAttribute(P) ||
                  (R.css(m, m.___origStyle), delete m.___origStyle);
            }
            window.removeEventListener("scroll", L),
              window.removeEventListener("resize", L),
              window.removeEventListener("resize", T),
              m.removeEventListener("mousewheel", A),
              m.removeEventListener("DOMMouseScroll", A),
              (m = void 0);
          }
          return d;
        });
      var N,
        O = [];
      return (
        d.on("destroy.internal", function (e) {
          d.removeClassToggle(e.reset);
        }),
        (this.setClassToggle = function (e, t) {
          var n = R.get.elements(e);
          return (
            0 !== n.length &&
              R.type.String(t) &&
              (0 < O.length && d.removeClassToggle(),
              (N = t),
              (O = n),
              d.on("enter.internal_class leave.internal_class", function (e) {
                var n = "enter" === e.type ? R.addClass : R.removeClass;
                O.forEach(function (e, t) {
                  n(e, N);
                });
              })),
            d
          );
        }),
        (this.removeClassToggle = function (e) {
          return (
            e &&
              O.forEach(function (e, t) {
                R.removeClass(e, N);
              }),
            d.off("start.internal_class end.internal_class"),
            (N = void 0),
            (O = []),
            d
          );
        }),
        (function () {
          for (var e in h) r.hasOwnProperty(e) || delete h[e];
          for (var t in r) z(t);
          E();
        })(),
        d
      );
    });
  var D = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: void 0,
      triggerHook: 0.5,
      reverse: !0,
      loglevel: 2,
    },
    validate: {
      offset: function (e) {
        if (((e = parseFloat(e)), !R.type.Number(e))) throw 0;
        return e;
      },
      triggerElement: function (e) {
        if ((e = e || void 0)) {
          var t = R.get.elements(e)[0];
          if (!t || !t.parentNode) throw 0;
          e = t;
        }
        return e;
      },
      triggerHook: function (e) {
        var t = { onCenter: 0.5, onEnter: 1, onLeave: 0 };
        if (R.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
        else {
          if (!(e in t)) throw 0;
          e = t[e];
        }
        return e;
      },
      reverse: function (e) {
        return !!e;
      },
    },
    shifts: ["duration", "offset", "triggerHook"],
  };
  (_.Scene.addOption = function (e, t, n, r) {
    e in D.defaults ||
      ((D.defaults[e] = t), (D.validate[e] = n), r && D.shifts.push(e));
  }),
    (_.Scene.extend = function (e) {
      var t = this;
      (_.Scene = function () {
        return (
          t.apply(this, arguments),
          (this.$super = R.extend({}, this)),
          e.apply(this, arguments) || this
        );
      }),
        R.extend(_.Scene, t),
        (_.Scene.prototype = t.prototype),
        (_.Scene.prototype.constructor = _.Scene);
    }),
    (_.Event = function (e, t, n, r) {
      for (var i in (r = r || {})) this[i] = r[i];
      return (
        (this.type = e),
        (this.target = this.currentTarget = n),
        (this.namespace = t || ""),
        (this.timeStamp = this.timestamp = Date.now()),
        this
      );
    });
  var R = (_._util = (function (s) {
    var n,
      e = {},
      a = function (e) {
        return parseFloat(e) || 0;
      },
      l = function (e) {
        return e.currentStyle ? e.currentStyle : s.getComputedStyle(e);
      },
      r = function (e, t, n, r) {
        if ((t = t === document ? s : t) === s) r = !1;
        else if (!u.DomElement(t)) return 0;
        e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
        var i =
          (n
            ? t["offset" + e] || t["outer" + e]
            : t["client" + e] || t["inner" + e]) || 0;
        if (n && r) {
          var o = l(t);
          i +=
            "Height" === e
              ? a(o.marginTop) + a(o.marginBottom)
              : a(o.marginLeft) + a(o.marginRight);
        }
        return i;
      },
      c = function (e) {
        return e
          .replace(/^[^a-z]+([a-z])/g, "$1")
          .replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          });
      };
    (e.extend = function (e) {
      for (e = e || {}, n = 1; n < arguments.length; n++)
        if (arguments[n])
          for (var t in arguments[n])
            arguments[n].hasOwnProperty(t) && (e[t] = arguments[n][t]);
      return e;
    }),
      (e.isMarginCollapseType = function (e) {
        return (
          -1 < ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e)
        );
      });
    var i = 0,
      t = ["ms", "moz", "webkit", "o"],
      o = s.requestAnimationFrame,
      f = s.cancelAnimationFrame;
    for (n = 0; !o && n < 4; ++n)
      (o = s[t[n] + "RequestAnimationFrame"]),
        (f =
          s[t[n] + "CancelAnimationFrame"] ||
          s[t[n] + "CancelRequestAnimationFrame"]);
    o ||
      (o = function (e) {
        var t = new Date().getTime(),
          n = Math.max(0, 16 - (t - i)),
          r = s.setTimeout(function () {
            e(t + n);
          }, n);
        return (i = t + n), r;
      }),
      f ||
        (f = function (e) {
          s.clearTimeout(e);
        }),
      (e.rAF = o.bind(s)),
      (e.cAF = f.bind(s));
    var u = (e.type = function (e) {
      return Object.prototype.toString
        .call(e)
        .replace(/^\[object (.+)\]$/, "$1")
        .toLowerCase();
    });
    (u.String = function (e) {
      return "string" === u(e);
    }),
      (u.Function = function (e) {
        return "function" === u(e);
      }),
      (u.Array = function (e) {
        return Array.isArray(e);
      }),
      (u.Number = function (e) {
        return !u.Array(e) && 0 <= e - parseFloat(e) + 1;
      }),
      (u.DomElement = function (e) {
        return "object" == typeof HTMLElement ||
          "function" == typeof HTMLElement
          ? e instanceof HTMLElement || e instanceof SVGElement
          : e &&
              "object" == typeof e &&
              null !== e &&
              1 === e.nodeType &&
              "string" == typeof e.nodeName;
      });
    var d = (e.get = {});
    return (
      (d.elements = function (e) {
        var t = [];
        if (u.String(e))
          try {
            e = document.querySelectorAll(e);
          } catch (e) {
            return t;
          }
        if ("nodelist" === u(e) || u.Array(e) || e instanceof NodeList)
          for (var n = 0, r = (t.length = e.length); n < r; n++) {
            var i = e[n];
            t[n] = u.DomElement(i) ? i : d.elements(i);
          }
        else (u.DomElement(e) || e === document || e === s) && (t = [e]);
        return t;
      }),
      (d.scrollTop = function (e) {
        return e && "number" == typeof e.scrollTop
          ? e.scrollTop
          : s.pageYOffset || 0;
      }),
      (d.scrollLeft = function (e) {
        return e && "number" == typeof e.scrollLeft
          ? e.scrollLeft
          : s.pageXOffset || 0;
      }),
      (d.width = function (e, t, n) {
        return r("width", e, t, n);
      }),
      (d.height = function (e, t, n) {
        return r("height", e, t, n);
      }),
      (d.offset = function (e, t) {
        var n = { top: 0, left: 0 };
        if (e && e.getBoundingClientRect) {
          var r = e.getBoundingClientRect();
          (n.top = r.top),
            (n.left = r.left),
            t || ((n.top += d.scrollTop()), (n.left += d.scrollLeft()));
        }
        return n;
      }),
      (e.addClass = function (e, t) {
        t && (e.classList ? e.classList.add(t) : (e.className += " " + t));
      }),
      (e.removeClass = function (e, t) {
        t &&
          (e.classList
            ? e.classList.remove(t)
            : (e.className = e.className.replace(
                RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
              )));
      }),
      (e.css = function (e, t) {
        if (u.String(t)) return l(e)[c(t)];
        if (u.Array(t)) {
          var n = {},
            r = l(e);
          return (
            t.forEach(function (e, t) {
              n[e] = r[c(e)];
            }),
            n
          );
        }
        for (var i in t) {
          var o = t[i];
          o == parseFloat(o) && (o += "px"), (e.style[c(i)] = o);
        }
      }),
      e
    );
  })(window || {}));
  return _;
});

/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io
 * https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js
 *  */
!(function (e, n) {
  "function" == typeof define && define.amd
    ? define(["ScrollMagic", "TweenMax", "TimelineMax"], n)
    : "object" == typeof exports
    ? (require("gsap"), n(require("scrollmagic"), TweenMax, TimelineMax))
    : n(
        e.ScrollMagic || (e.jQuery && e.jQuery.ScrollMagic),
        e.TweenMax || e.TweenLite,
        e.TimelineMax || e.TimelineLite
      );
})(this, function (e, s, u) {
  "use strict";
  e.Scene.addOption("tweenChanges", !1, function (e) {
    return !!e;
  }),
    e.Scene.extend(function () {
      var i,
        o = this;
      o.on("progress.plugin_gsap", function () {
        a();
      }),
        o.on("destroy.plugin_gsap", function (e) {
          o.removeTween(e.reset);
        });
      var a = function () {
        if (i) {
          var e = o.progress(),
            n = o.state();
          i.repeat && -1 === i.repeat()
            ? "DURING" === n && i.paused()
              ? i.play()
              : "DURING" === n || i.paused() || i.pause()
            : e != i.progress() &&
              (0 === o.duration()
                ? 0 < e
                  ? i.play()
                  : i.reverse()
                : o.tweenChanges() && i.tweenTo
                ? i.tweenTo(e * i.duration())
                : i.progress(e).pause());
        }
      };
      (o.setTween = function (e, n, r) {
        var t;
        1 < arguments.length &&
          (arguments.length < 3 && ((r = n), (n = 1)), (e = s.to(e, n, r)));
        try {
          (t = u ? new u({ smoothChildTiming: !0 }).add(e) : e).pause();
        } catch (e) {
          return o;
        }
        return (
          i && o.removeTween(),
          (i = t),
          e.repeat && -1 === e.repeat() && (i.repeat(-1), i.yoyo(e.yoyo())),
          a(),
          o
        );
      }),
        (o.removeTween = function (e) {
          return i && (e && i.progress(0).pause(), i.kill(), (i = void 0)), o;
        });
    });
});

/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io
 * https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.velocity.min.js
 * */
!(function (e, i) {
  "function" == typeof define && define.amd
    ? define(["ScrollMagic", "velocity"], i)
    : "object" == typeof exports
    ? i(require("scrollmagic"), require("velocity"))
    : i(
        e.ScrollMagic || (e.jQuery && e.jQuery.ScrollMagic),
        e.Velocity || (e.jQuery && e.jQuery.Velocity)
      );
})(this, function (e, y) {
  "use strict";
  var v = 0;
  e.Scene.extend(function () {
    var o,
      r,
      u,
      n,
      c = this,
      l = e._util,
      i = 0;
    c.on("progress.plugin_velocity", function () {
      f();
    }),
      c.on("destroy.plugin_velocity", function (e) {
        c.off("*.plugin_velocity"), c.removeVelocity(e.reset);
      });
    var s = function (e, i, t) {
        l.type.Array(e)
          ? e.forEach(function (e) {
              s(e, i, t);
            })
          : (y.Utilities.data(e, n) ||
              y.Utilities.data(e, n, {
                reverseProps: l.css(e, Object.keys(r)),
              }),
            y(e, i, t),
            void 0 !== t.queue && y.Utilities.dequeue(e, t.queue));
      },
      a = function (e, i) {
        if (l.type.Array(e))
          e.forEach(function (e) {
            a(e, i);
          });
        else {
          var t = y.Utilities.data(e, n);
          t &&
            t.reverseProps &&
            (y(e, t.reverseProps, i),
            void 0 !== i.queue && y.Utilities.dequeue(e, i.queue));
        }
      },
      f = function () {
        if (o) {
          var e = c.progress();
          e != i &&
            (0 === c.duration() && (0 < e ? s(o, r, u) : a(o, u)), (i = e));
        }
      };
    (c.setVelocity = function (e, i, t) {
      return (
        o && c.removeVelocity(),
        (o = l.get.elements(e)),
        (r = i || {}),
        (n = "ScrollMagic.animation.velocity[" + v++ + "]"),
        void 0 !== (u = t || {}).queue && (u.queue = n + "_queue"),
        f(),
        c
      );
    }),
      (c.removeVelocity = function (e) {
        return (
          o &&
            (void 0 !== u.queue && y(o, "stop", u.queue),
            e && a(o, { duration: 0 }),
            o.forEach(function (e) {
              y.Utilities.removeData(e, n);
            }),
            (o = r = u = n = void 0)),
          c
        );
      });
  });
});

/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io
 *https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js
 *  */
!(function (e, r) {
  "function" == typeof define && define.amd
    ? define(["ScrollMagic"], r)
    : "object" == typeof exports
    ? r(require("scrollmagic"))
    : r(e.ScrollMagic || (e.jQuery && e.jQuery.ScrollMagic));
})(this, function (i) {
  "use strict";
  var o = "0.85em",
    n = "9999",
    v = i._util,
    h = 0;
  i.Scene.extend(function () {
    var t,
      i = this;
    (i.addIndicators = function (e) {
      if (!t) {
        var r = {
          name: "",
          indent: 0,
          parent: void 0,
          colorStart: "green",
          colorEnd: "red",
          colorTrigger: "blue",
        };
        (e = v.extend({}, r, e)),
          h++,
          (t = new s(i, e)),
          i.on("add.plugin_addIndicators", t.add),
          i.on("remove.plugin_addIndicators", t.remove),
          i.on("destroy.plugin_addIndicators", i.removeIndicators),
          i.controller() && t.add();
      }
      return i;
    }),
      (i.removeIndicators = function () {
        return (
          t && (t.remove(), this.off("*.plugin_addIndicators"), (t = void 0)), i
        );
      });
  }),
    i.Controller.addOption("addIndicators", !1),
    i.Controller.extend(function () {
      var c = this,
        e = c.info(),
        l = e.container,
        f = e.isDocument,
        m = e.vertical,
        h = { groups: [] };
      this._indicators = h;
      var r = function () {
          h.updateBoundsPositions();
        },
        t = function () {
          h.updateTriggerGroupPositions();
        };
      return (
        l.addEventListener("resize", t),
        f ||
          (window.addEventListener("resize", t),
          window.addEventListener("scroll", t)),
        l.addEventListener("resize", r),
        l.addEventListener("scroll", r),
        (this._indicators.updateBoundsPositions = function (e) {
          for (
            var r,
              t,
              i,
              o = e
                ? [v.extend({}, e.triggerGroup, { members: [e] })]
                : h.groups,
              n = o.length,
              s = {},
              d = m ? "left" : "top",
              a = m ? "width" : "height",
              g = m
                ? v.get.scrollLeft(l) + v.get.width(l) - 15
                : v.get.scrollTop(l) + v.get.height(l) - 15;
            n--;

          )
            for (
              r = (i = o[n]).members.length, t = v.get[a](i.element.firstChild);
              r--;

            )
              (s[d] = g - t), v.css(i.members[r].bounds, s);
        }),
        (this._indicators.updateTriggerGroupPositions = function (e) {
          for (
            var r,
              t,
              i,
              o,
              n = e ? [e] : h.groups,
              s = n.length,
              d = f ? document.body : l,
              a = f ? { top: 0, left: 0 } : v.get.offset(d, !0),
              g = m ? v.get.width(l) - 15 : v.get.height(l) - 15,
              p = m ? "width" : "height",
              u = m ? "Y" : "X";
            s--;

          )
            (t = (r = n[s]).element),
              (i = r.triggerHook * c.info("size")),
              (o =
                v.get[p](t.firstChild.firstChild) < i
                  ? "translate" + u + "(-100%)"
                  : ""),
              v.css(t, {
                top: a.top + (m ? i : g - r.members[0].options.indent),
                left: a.left + (m ? g - r.members[0].options.indent : i),
              }),
              v.css(t.firstChild.firstChild, {
                "-ms-transform": o,
                "-webkit-transform": o,
                transform: o,
              });
        }),
        (this._indicators.updateTriggerGroupLabel = function (e) {
          var r =
              "trigger" +
              (1 < e.members.length ? "" : " " + e.members[0].options.name),
            t = e.element.firstChild.firstChild;
          t.textContent !== r &&
            ((t.textContent = r), m && h.updateBoundsPositions());
        }),
        (this.addScene = function (e) {
          this._options.addIndicators &&
            e instanceof i.Scene &&
            e.controller() === c &&
            e.addIndicators(),
            this.$super.addScene.apply(this, arguments);
        }),
        (this.destroy = function () {
          l.removeEventListener("resize", t),
            f ||
              (window.removeEventListener("resize", t),
              window.removeEventListener("scroll", t)),
            l.removeEventListener("resize", r),
            l.removeEventListener("scroll", r),
            this.$super.destroy.apply(this, arguments);
        }),
        c
      );
    });
  var s = function (o, n) {
      var s,
        d,
        a = this,
        t = b.bounds(),
        i = b.start(n.colorStart),
        g = b.end(n.colorEnd),
        p = n.parent && v.get.elements(n.parent)[0];
      (n.name = n.name || h),
        (i.firstChild.textContent += " " + n.name),
        (g.textContent += " " + n.name),
        t.appendChild(i),
        t.appendChild(g),
        (a.options = n),
        (a.bounds = t),
        (a.triggerGroup = void 0),
        (this.add = function () {
          (d = o.controller()), (s = d.info("vertical"));
          var e = d.info("isDocument");
          p || (p = e ? document.body : d.info("container")),
            e ||
              "static" !== v.css(p, "position") ||
              v.css(p, { position: "relative" }),
            o.on("change.plugin_addIndicators", u),
            o.on("shift.plugin_addIndicators", r),
            m(),
            l(),
            setTimeout(function () {
              d._indicators.updateBoundsPositions(a);
            }, 0);
        }),
        (this.remove = function () {
          if (a.triggerGroup) {
            if (
              (o.off("change.plugin_addIndicators", u),
              o.off("shift.plugin_addIndicators", r),
              1 < a.triggerGroup.members.length)
            ) {
              var e = a.triggerGroup;
              e.members.splice(e.members.indexOf(a), 1),
                d._indicators.updateTriggerGroupLabel(e),
                d._indicators.updateTriggerGroupPositions(e),
                (a.triggerGroup = void 0);
            } else f();
            c();
          }
        });
      var r = function () {
          l();
        },
        u = function (e) {
          "triggerHook" === e.what && m();
        },
        c = function () {
          t.parentNode.removeChild(t);
        },
        l = function () {
          var e;
          t.parentNode !== p &&
            ((e = d.info("vertical")),
            v.css(i.firstChild, {
              "border-bottom-width": e ? 1 : 0,
              "border-right-width": e ? 0 : 1,
              bottom: e ? -1 : n.indent,
              right: e ? n.indent : -1,
              padding: e ? "0 8px" : "2px 4px",
            }),
            v.css(g, {
              "border-top-width": e ? 1 : 0,
              "border-left-width": e ? 0 : 1,
              top: e ? "100%" : "",
              right: e ? n.indent : "",
              bottom: e ? "" : n.indent,
              left: e ? "" : "100%",
              padding: e ? "0 8px" : "2px 4px",
            }),
            p.appendChild(t));
          var r = {};
          (r[s ? "top" : "left"] = o.triggerPosition()),
            (r[s ? "height" : "width"] = o.duration()),
            v.css(t, r),
            v.css(g, { display: 0 < o.duration() ? "" : "none" });
        },
        f = function () {
          d._indicators.groups.splice(
            d._indicators.groups.indexOf(a.triggerGroup),
            1
          ),
            a.triggerGroup.element.parentNode.removeChild(
              a.triggerGroup.element
            ),
            (a.triggerGroup = void 0);
        },
        m = function () {
          var e = o.triggerHook();
          if (
            !(a.triggerGroup && Math.abs(a.triggerGroup.triggerHook - e) < 1e-4)
          ) {
            for (var r, t = d._indicators.groups, i = t.length; i--; )
              if (((r = t[i]), Math.abs(r.triggerHook - e) < 1e-4))
                return (
                  a.triggerGroup &&
                    (1 === a.triggerGroup.members.length
                      ? f()
                      : (a.triggerGroup.members.splice(
                          a.triggerGroup.members.indexOf(a),
                          1
                        ),
                        d._indicators.updateTriggerGroupLabel(a.triggerGroup),
                        d._indicators.updateTriggerGroupPositions(
                          a.triggerGroup
                        ))),
                  r.members.push(a),
                  (a.triggerGroup = r),
                  void d._indicators.updateTriggerGroupLabel(r)
                );
            if (a.triggerGroup) {
              if (1 === a.triggerGroup.members.length)
                return (
                  (a.triggerGroup.triggerHook = e),
                  void d._indicators.updateTriggerGroupPositions(a.triggerGroup)
                );
              a.triggerGroup.members.splice(
                a.triggerGroup.members.indexOf(a),
                1
              ),
                d._indicators.updateTriggerGroupLabel(a.triggerGroup),
                d._indicators.updateTriggerGroupPositions(a.triggerGroup),
                (a.triggerGroup = void 0);
            }
            !(function () {
              var e = b.trigger(n.colorTrigger),
                r = {};
              (r[s ? "right" : "bottom"] = 0),
                (r[s ? "border-top-width" : "border-left-width"] = 1),
                v.css(e.firstChild, r),
                v.css(e.firstChild.firstChild, {
                  padding: s ? "0 8px 3px 8px" : "3px 4px",
                }),
                document.body.appendChild(e);
              var t = {
                triggerHook: o.triggerHook(),
                element: e,
                members: [a],
              };
              d._indicators.groups.push(t),
                (a.triggerGroup = t),
                d._indicators.updateTriggerGroupLabel(t),
                d._indicators.updateTriggerGroupPositions(t);
            })();
          }
        };
    },
    b = {
      start: function (e) {
        var r = document.createElement("div");
        (r.textContent = "start"),
          v.css(r, {
            position: "absolute",
            overflow: "visible",
            "border-width": 0,
            "border-style": "solid",
            color: e,
            "border-color": e,
          });
        var t = document.createElement("div");
        return (
          v.css(t, {
            position: "absolute",
            overflow: "visible",
            width: 0,
            height: 0,
          }),
          t.appendChild(r),
          t
        );
      },
      end: function (e) {
        var r = document.createElement("div");
        return (
          (r.textContent = "end"),
          v.css(r, {
            position: "absolute",
            overflow: "visible",
            "border-width": 0,
            "border-style": "solid",
            color: e,
            "border-color": e,
          }),
          r
        );
      },
      bounds: function () {
        var e = document.createElement("div");
        return (
          v.css(e, {
            position: "absolute",
            overflow: "visible",
            "white-space": "nowrap",
            "pointer-events": "none",
            "font-size": o,
          }),
          (e.style.zIndex = n),
          e
        );
      },
      trigger: function (e) {
        var r = document.createElement("div");
        (r.textContent = "trigger"), v.css(r, { position: "relative" });
        var t = document.createElement("div");
        v.css(t, {
          position: "absolute",
          overflow: "visible",
          "border-width": 0,
          "border-style": "solid",
          color: e,
          "border-color": e,
        }),
          t.appendChild(r);
        var i = document.createElement("div");
        return (
          v.css(i, {
            position: "fixed",
            overflow: "visible",
            "white-space": "nowrap",
            "pointer-events": "none",
            "font-size": o,
          }),
          (i.style.zIndex = n),
          i.appendChild(t),
          i
        );
      },
    };
});

/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io
 * https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/jquery.ScrollMagic.min.js
 * */
!(function (e, i) {
  "function" == typeof define && define.amd
    ? define(["ScrollMagic", "jquery"], i)
    : "object" == typeof exports
    ? i(require("scrollmagic"), require("jquery"))
    : i(e.ScrollMagic, e.jQuery);
})(this, function (e, t) {
  "use strict";
  (e._util.get.elements = function (e) {
    return t(e).toArray();
  }),
    (e._util.addClass = function (e, i) {
      t(e).addClass(i);
    }),
    (e._util.removeClass = function (e, i) {
      t(e).removeClass(i);
    }),
    (t.ScrollMagic = e);
});

/*!


 *

 * validators

 *


 **/
+(function (t) {
  "use strict";
  function e(e) {
    return e.is('[type="checkbox"]')
      ? e.prop("checked")
      : e.is('[type="radio"]')
      ? !!t('[name="' + e.attr("name") + '"]:checked').length
      : e.val();
  }
  function r(e) {
    return this.each(function () {
      var r = t(this),
        i = t.extend({}, a.DEFAULTS, r.data(), "object" == typeof e && e),
        o = r.data("bs.validator");
      (o || "destroy" != e) &&
        (o || r.data("bs.validator", (o = new a(this, i))),
        "string" == typeof e && o[e]());
    });
  }
  var a = function (r, i) {
    (this.options = i),
      (this.validators = t.extend({}, a.VALIDATORS, i.custom)),
      (this.$element = t(r)),
      (this.$btn = t('button[type="submit"], input[type="submit"]')
        .filter('[form="' + this.$element.attr("id") + '"]')
        .add(
          this.$element.find('input[type="submit"], button[type="submit"]')
        )),
      this.update(),
      this.$element.on(
        "input.bs.validator change.bs.validator focusout.bs.validator",
        t.proxy(this.onInput, this)
      ),
      this.$element.on("submit.bs.validator", t.proxy(this.onSubmit, this)),
      this.$element.on("reset.bs.validator", t.proxy(this.reset, this)),
      this.$element.find("[data-match]").each(function () {
        var r = t(this),
          a = r.data("match");
        t(a).on("input.bs.validator", function (t) {
          e(r) && r.trigger("input.bs.validator");
        });
      }),
      this.$inputs
        .filter(function () {
          return e(t(this));
        })
        .trigger("focusout"),
      this.$element.attr("novalidate", !0),
      this.toggleSubmit();
  };
  (a.VERSION = "0.11.5"),
    (a.INPUT_SELECTOR =
      ':input:not([type="hidden"], [type="submit"], [type="reset"], button)'),
    (a.FOCUS_OFFSET = 20),
    (a.DEFAULTS = {
      delay: 500,
      html: !1,
      disable: !0,
      focus: !0,
      custom: {},
      errors: { match: "Does not match", minlength: "Not long enough" },
      feedback: { success: "glyphicon-ok", error: "glyphicon-remove" },
    }),
    (a.VALIDATORS = {
      native: function (t) {
        var e = t[0];
        if (e.checkValidity)
          return (
            !e.checkValidity() &&
            !e.validity.valid &&
            (e.validationMessage || "error!")
          );
      },
      match: function (e) {
        var r = e.data("match");
        return e.val() !== t(r).val() && a.DEFAULTS.errors.match;
      },
      minlength: function (t) {
        var e = t.data("minlength");
        return t.val().length < e && a.DEFAULTS.errors.minlength;
      },
    }),
    (a.prototype.update = function () {
      return (
        (this.$inputs = this.$element
          .find(a.INPUT_SELECTOR)
          .add(this.$element.find('[data-validate="true"]'))
          .not(this.$element.find('[data-validate="false"]'))),
        this
      );
    }),
    (a.prototype.onInput = function (e) {
      var r = this,
        a = t(e.target),
        i = "focusout" !== e.type;
      this.$inputs.is(a) &&
        this.validateInput(a, i).done(function () {
          r.toggleSubmit();
        });
    }),
    (a.prototype.validateInput = function (r, a) {
      e(r);
      var i = r.data("bs.validator.errors");
      r.is('[type="radio"]') &&
        (r = this.$element.find('input[name="' + r.attr("name") + '"]'));
      var o = t.Event("validate.bs.validator", { relatedTarget: r[0] });
      if ((this.$element.trigger(o), !o.isDefaultPrevented())) {
        var s = this;
        return this.runValidators(r).done(function (e) {
          r.data("bs.validator.errors", e),
            e.length
              ? a
                ? s.defer(r, s.showErrors)
                : s.showErrors(r)
              : s.clearErrors(r),
            (i && e.toString() === i.toString()) ||
              ((o = e.length
                ? t.Event("invalid.bs.validator", {
                    relatedTarget: r[0],
                    detail: e,
                  })
                : t.Event("valid.bs.validator", {
                    relatedTarget: r[0],
                    detail: i,
                  })),
              s.$element.trigger(o)),
            s.toggleSubmit(),
            s.$element.trigger(
              t.Event("validated.bs.validator", { relatedTarget: r[0] })
            );
        });
      }
    }),
    (a.prototype.runValidators = function (r) {
      function a(t) {
        return (
          (function (t) {
            return r.data(t + "-error");
          })(t) ||
          (function () {
            var t = r[0].validity;
            return t.typeMismatch
              ? r.data("type-error")
              : t.patternMismatch
              ? r.data("pattern-error")
              : t.stepMismatch
              ? r.data("step-error")
              : t.rangeOverflow
              ? r.data("max-error")
              : t.rangeUnderflow
              ? r.data("min-error")
              : t.valueMissing
              ? r.data("required-error")
              : null;
          })() ||
          r.data("error")
        );
      }
      var i = [],
        o = t.Deferred();
      return (
        r.data("bs.validator.deferred") &&
          r.data("bs.validator.deferred").reject(),
        r.data("bs.validator.deferred", o),
        t.each(
          this.validators,
          t.proxy(function (t, o) {
            var s = null;
            (e(r) || r.attr("required")) &&
              (r.data(t) || "native" == t) &&
              (s = o.call(this, r)) &&
              ((s = a(t) || s), !~i.indexOf(s) && i.push(s));
          }, this)
        ),
        !i.length && e(r) && r.data("remote")
          ? this.defer(r, function () {
              var s = {};
              (s[r.attr("name")] = e(r)),
                t
                  .get(r.data("remote"), s)
                  .fail(function (t, e, r) {
                    i.push(a("remote") || r);
                  })
                  .always(function () {
                    o.resolve(i);
                  });
            })
          : o.resolve(i),
        o.promise()
      );
    }),
    (a.prototype.validate = function () {
      var e = this;
      return (
        t
          .when(
            this.$inputs.map(function (r) {
              return e.validateInput(t(this), !1);
            })
          )
          .then(function () {
            e.toggleSubmit(), e.focusError();
          }),
        this
      );
    }),
    (a.prototype.focusError = function () {
      if (this.options.focus) {
        var e = this.$element.find(".has-error:first :input");
        0 !== e.length &&
          (t("html, body").animate(
            { scrollTop: e.offset().top - a.FOCUS_OFFSET },
            250
          ),
          e.focus());
      }
    }),
    (a.prototype.showErrors = function (e) {
      var r = this.options.html ? "html" : "text",
        a = e.data("bs.validator.errors"),
        i = e.closest(".form-group"),
        o = i.find(".help-block.with-errors"),
        s = i.find(".form-control-feedback");
      a.length &&
        ((a = t("<ul/>")
          .addClass("list-unstyled")
          .append(
            t.map(a, function (e) {
              return t("<li/>")[r](e);
            })
          )),
        void 0 === o.data("bs.validator.originalContent") &&
          o.data("bs.validator.originalContent", o.html()),
        o.empty().append(a),
        i.addClass("has-error has-danger"),
        i.hasClass("has-feedback") &&
          s.removeClass(this.options.feedback.success) &&
          s.addClass(this.options.feedback.error) &&
          i.removeClass("has-success"));
    }),
    (a.prototype.clearErrors = function (t) {
      var r = t.closest(".form-group"),
        a = r.find(".help-block.with-errors"),
        i = r.find(".form-control-feedback");
      a.html(a.data("bs.validator.originalContent")),
        r.removeClass("has-error has-danger has-success"),
        r.hasClass("has-feedback") &&
          i.removeClass(this.options.feedback.error) &&
          i.removeClass(this.options.feedback.success) &&
          e(t) &&
          i.addClass(this.options.feedback.success) &&
          r.addClass("has-success");
    }),
    (a.prototype.hasErrors = function () {
      return !!this.$inputs.filter(function () {
        return !!(t(this).data("bs.validator.errors") || []).length;
      }).length;
    }),
    (a.prototype.isIncomplete = function () {
      return !!this.$inputs.filter("[required]").filter(function () {
        var r = e(t(this));
        return !("string" == typeof r ? t.trim(r) : r);
      }).length;
    }),
    (a.prototype.onSubmit = function (t) {
      this.validate(),
        (this.isIncomplete() || this.hasErrors()) && t.preventDefault();
    }),
    (a.prototype.toggleSubmit = function () {
      this.options.disable &&
        this.$btn.toggleClass(
          "disabled",
          this.isIncomplete() || this.hasErrors()
        );
    }),
    (a.prototype.defer = function (e, r) {
      if (((r = t.proxy(r, this, e)), !this.options.delay)) return r();
      window.clearTimeout(e.data("bs.validator.timeout")),
        e.data(
          "bs.validator.timeout",
          window.setTimeout(r, this.options.delay)
        );
    }),
    (a.prototype.reset = function () {
      return (
        this.$element
          .find(".form-control-feedback")
          .removeClass(this.options.feedback.error)
          .removeClass(this.options.feedback.success),
        this.$inputs
          .removeData(["bs.validator.errors", "bs.validator.deferred"])
          .each(function () {
            var e = t(this),
              r = e.data("bs.validator.timeout");
            window.clearTimeout(r) && e.removeData("bs.validator.timeout");
          }),
        this.$element.find(".help-block.with-errors").each(function () {
          var e = t(this),
            r = e.data("bs.validator.originalContent");
          e.removeData("bs.validator.originalContent").html(r);
        }),
        this.$btn.removeClass("disabled"),
        this.$element
          .find(".has-error, .has-danger, .has-success")
          .removeClass("has-error has-danger has-success"),
        this
      );
    }),
    (a.prototype.destroy = function () {
      return (
        this.reset(),
        this.$element
          .removeAttr("novalidate")
          .removeData("bs.validator")
          .off(".bs.validator"),
        this.$inputs.off(".bs.validator"),
        (this.options = null),
        (this.validators = null),
        (this.$element = null),
        (this.$btn = null),
        this
      );
    });
  var i = t.fn.validator;
  (t.fn.validator = r),
    (t.fn.validator.Constructor = a),
    (t.fn.validator.noConflict = function () {
      return (t.fn.validator = i), this;
    }),
    t(window).on("load", function () {
      t('form[data-toggle="validator"]').each(function () {
        var e = t(this);
        r.call(e, e.data());
      });
    });
})(jQuery);

/*!

 * Isotope PACKAGED v2.2.2

 *

 * Licensed GPLv3 for open source use

 * or Isotope Commercial License for commercial use

 *

 * http://isotope.metafizzy.co

 * Copyright 2015 Metafizzy

 */

!(function (a) {
  function b() {}
  function c(a) {
    function c(b) {
      b.prototype.option ||
        (b.prototype.option = function (b) {
          a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
        });
    }
    function e(b, c) {
      a.fn[b] = function (e) {
        if ("string" == typeof e) {
          for (
            var g = d.call(arguments, 1), h = 0, i = this.length;
            i > h;
            h++
          ) {
            var j = this[h],
              k = a.data(j, b);
            if (k)
              if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                var l = k[e].apply(k, g);
                if (void 0 !== l) return l;
              } else f("no such method '" + e + "' for " + b + " instance");
            else
              f(
                "cannot call methods on " +
                  b +
                  " prior to initialization; attempted to call '" +
                  e +
                  "'"
              );
          }
          return this;
        }
        return this.each(function () {
          var d = a.data(this, b);
          d
            ? (d.option(e), d._init())
            : ((d = new c(this, e)), a.data(this, b, d));
        });
      };
    }
    if (a) {
      var f =
        "undefined" == typeof console
          ? b
          : function (a) {
              console.error(a);
            };
      return (
        (a.bridget = function (a, b) {
          c(b), e(a, b);
        }),
        a.bridget
      );
    }
  }
  var d = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], c)
    : c("object" == typeof exports ? require("jquery") : a.jQuery);
})(window),
  (function (a) {
    function b(b) {
      var c = a.event;
      return (c.target = c.target || c.srcElement || b), c;
    }
    var c = document.documentElement,
      d = function () {};
    c.addEventListener
      ? (d = function (a, b, c) {
          a.addEventListener(b, c, !1);
        })
      : c.attachEvent &&
        (d = function (a, c, d) {
          (a[c + d] = d.handleEvent
            ? function () {
                var c = b(a);
                d.handleEvent.call(d, c);
              }
            : function () {
                var c = b(a);
                d.call(a, c);
              }),
            a.attachEvent("on" + c, a[c + d]);
        });
    var e = function () {};
    c.removeEventListener
      ? (e = function (a, b, c) {
          a.removeEventListener(b, c, !1);
        })
      : c.detachEvent &&
        (e = function (a, b, c) {
          a.detachEvent("on" + b, a[b + c]);
          try {
            delete a[b + c];
          } catch (d) {
            a[b + c] = void 0;
          }
        });
    var f = { bind: d, unbind: e };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", f)
      : "object" == typeof exports
      ? (module.exports = f)
      : (a.eventie = f);
  })(window),
  function () {
    "use strict";
    function a() {}
    function b(a, b) {
      for (var c = a.length; c--; ) if (a[c].listener === b) return c;
      return -1;
    }
    function c(a) {
      return function () {
        return this[a].apply(this, arguments);
      };
    }
    var d = a.prototype,
      e = this,
      f = e.EventEmitter;
    (d.getListeners = function (a) {
      var b,
        c,
        d = this._getEvents();
      if (a instanceof RegExp) {
        b = {};
        for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
      } else b = d[a] || (d[a] = []);
      return b;
    }),
      (d.flattenListeners = function (a) {
        var b,
          c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c;
      }),
      (d.getListenersAsObject = function (a) {
        var b,
          c = this.getListeners(a);
        return c instanceof Array && ((b = {}), (b[a] = c)), b || c;
      }),
      (d.addListener = function (a, c) {
        var d,
          e = this.getListenersAsObject(a),
          f = "object" == typeof c;
        for (d in e)
          e.hasOwnProperty(d) &&
            -1 === b(e[d], c) &&
            e[d].push(f ? c : { listener: c, once: !1 });
        return this;
      }),
      (d.on = c("addListener")),
      (d.addOnceListener = function (a, b) {
        return this.addListener(a, { listener: b, once: !0 });
      }),
      (d.once = c("addOnceListener")),
      (d.defineEvent = function (a) {
        return this.getListeners(a), this;
      }),
      (d.defineEvents = function (a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this;
      }),
      (d.removeListener = function (a, c) {
        var d,
          e,
          f = this.getListenersAsObject(a);
        for (e in f)
          f.hasOwnProperty(e) &&
            ((d = b(f[e], c)), -1 !== d && f[e].splice(d, 1));
        return this;
      }),
      (d.off = c("removeListener")),
      (d.addListeners = function (a, b) {
        return this.manipulateListeners(!1, a, b);
      }),
      (d.removeListeners = function (a, b) {
        return this.manipulateListeners(!0, a, b);
      }),
      (d.manipulateListeners = function (a, b, c) {
        var d,
          e,
          f = a ? this.removeListener : this.addListener,
          g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp)
          for (d = c.length; d--; ) f.call(this, b, c[d]);
        else
          for (d in b)
            b.hasOwnProperty(d) &&
              (e = b[d]) &&
              ("function" == typeof e
                ? f.call(this, d, e)
                : g.call(this, d, e));
        return this;
      }),
      (d.removeEvent = function (a) {
        var b,
          c = typeof a,
          d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp)
          for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this;
      }),
      (d.removeAllListeners = c("removeEvent")),
      (d.emitEvent = function (a, b) {
        var c,
          d,
          e,
          f,
          g = this.getListenersAsObject(a);
        for (e in g)
          if (g.hasOwnProperty(e))
            for (d = g[e].length; d--; )
              (c = g[e][d]),
                c.once === !0 && this.removeListener(a, c.listener),
                (f = c.listener.apply(this, b || [])),
                f === this._getOnceReturnValue() &&
                  this.removeListener(a, c.listener);
        return this;
      }),
      (d.trigger = c("emitEvent")),
      (d.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b);
      }),
      (d.setOnceReturnValue = function (a) {
        return (this._onceReturnValue = a), this;
      }),
      (d._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (d._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (a.noConflict = function () {
        return (e.EventEmitter = f), a;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return a;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = a)
        : (e.EventEmitter = a);
  }.call(this),
  (function (a) {
    function b(a) {
      if (a) {
        if ("string" == typeof d[a]) return a;
        a = a.charAt(0).toUpperCase() + a.slice(1);
        for (var b, e = 0, f = c.length; f > e; e++)
          if (((b = c[e] + a), "string" == typeof d[b])) return b;
      }
    }
    var c = "Webkit Moz ms Ms O".split(" "),
      d = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return b;
        })
      : "object" == typeof exports
      ? (module.exports = b)
      : (a.getStyleProperty = b);
  })(window),
  (function (a, b) {
    function c(a) {
      var b = parseFloat(a),
        c = -1 === a.indexOf("%") && !isNaN(b);
      return c && b;
    }
    function d() {}
    function e() {
      for (
        var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          b = 0,
          c = h.length;
        c > b;
        b++
      ) {
        var d = h[b];
        a[d] = 0;
      }
      return a;
    }
    function f(b) {
      function d() {
        if (!m) {
          m = !0;
          var d = a.getComputedStyle;
          if (
            ((j = (function () {
              var a = d
                ? function (a) {
                    return d(a, null);
                  }
                : function (a) {
                    return a.currentStyle;
                  };
              return function (b) {
                var c = a(b);
                return (
                  c ||
                    g(
                      "Style returned " +
                        c +
                        ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                    ),
                  c
                );
              };
            })()),
            (k = b("boxSizing")))
          ) {
            var e = document.createElement("div");
            (e.style.width = "200px"),
              (e.style.padding = "1px 2px 3px 4px"),
              (e.style.borderStyle = "solid"),
              (e.style.borderWidth = "1px 2px 3px 4px"),
              (e.style[k] = "border-box");
            var f = document.body || document.documentElement;
            f.appendChild(e);
            var h = j(e);
            (l = 200 === c(h.width)), f.removeChild(e);
          }
        }
      }
      function f(a) {
        if (
          (d(),
          "string" == typeof a && (a = document.querySelector(a)),
          a && "object" == typeof a && a.nodeType)
        ) {
          var b = j(a);
          if ("none" === b.display) return e();
          var f = {};
          (f.width = a.offsetWidth), (f.height = a.offsetHeight);
          for (
            var g = (f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k])),
              m = 0,
              n = h.length;
            n > m;
            m++
          ) {
            var o = h[m],
              p = b[o];
            p = i(a, p);
            var q = parseFloat(p);
            f[o] = isNaN(q) ? 0 : q;
          }
          var r = f.paddingLeft + f.paddingRight,
            s = f.paddingTop + f.paddingBottom,
            t = f.marginLeft + f.marginRight,
            u = f.marginTop + f.marginBottom,
            v = f.borderLeftWidth + f.borderRightWidth,
            w = f.borderTopWidth + f.borderBottomWidth,
            x = g && l,
            y = c(b.width);
          y !== !1 && (f.width = y + (x ? 0 : r + v));
          var z = c(b.height);
          return (
            z !== !1 && (f.height = z + (x ? 0 : s + w)),
            (f.innerWidth = f.width - (r + v)),
            (f.innerHeight = f.height - (s + w)),
            (f.outerWidth = f.width + t),
            (f.outerHeight = f.height + u),
            f
          );
        }
      }
      function i(b, c) {
        if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
        var d = b.style,
          e = d.left,
          f = b.runtimeStyle,
          g = f && f.left;
        return (
          g && (f.left = b.currentStyle.left),
          (d.left = c),
          (c = d.pixelLeft),
          (d.left = e),
          g && (f.left = g),
          c
        );
      }
      var j,
        k,
        l,
        m = !1;
      return f;
    }
    var g =
        "undefined" == typeof console
          ? d
          : function (a) {
              console.error(a);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          f
        )
      : "object" == typeof exports
      ? (module.exports = f(require("desandro-get-style-property")))
      : (a.getSize = f(a.getStyleProperty));
  })(window),
  (function (a) {
    function b(a) {
      "function" == typeof a && (b.isReady ? a() : g.push(a));
    }
    function c(a) {
      var c = "readystatechange" === a.type && "complete" !== f.readyState;
      b.isReady || c || d();
    }
    function d() {
      b.isReady = !0;
      for (var a = 0, c = g.length; c > a; a++) {
        var d = g[a];
        d();
      }
    }
    function e(e) {
      return (
        "complete" === f.readyState
          ? d()
          : (e.bind(f, "DOMContentLoaded", c),
            e.bind(f, "readystatechange", c),
            e.bind(a, "load", c)),
        b
      );
    }
    var f = a.document,
      g = [];
    (b.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], e)
        : "object" == typeof exports
        ? (module.exports = e(require("eventie")))
        : (a.docReady = e(a.eventie));
  })(window),
  (function (a) {
    "use strict";
    function b(a, b) {
      return a[g](b);
    }
    function c(a) {
      if (!a.parentNode) {
        var b = document.createDocumentFragment();
        b.appendChild(a);
      }
    }
    function d(a, b) {
      c(a);
      for (
        var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length;
        f > e;
        e++
      )
        if (d[e] === a) return !0;
      return !1;
    }
    function e(a, d) {
      return c(a), b(a, d);
    }
    var f,
      g = (function () {
        if (a.matches) return "matches";
        if (a.matchesSelector) return "matchesSelector";
        for (
          var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length;
          d > c;
          c++
        ) {
          var e = b[c],
            f = e + "MatchesSelector";
          if (a[f]) return f;
        }
      })();
    if (g) {
      var h = document.createElement("div"),
        i = b(h, "div");
      f = i ? b : e;
    } else f = d;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return f;
        })
      : "object" == typeof exports
      ? (module.exports = f)
      : (window.matchesSelector = f);
  })(Element.prototype),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["doc-ready/doc-ready", "matches-selector/matches-selector"],
          function (c, d) {
            return b(a, c, d);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("doc-ready"),
          require("desandro-matches-selector")
        ))
      : (a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector));
  })(window, function (a, b, c) {
    var d = {};
    (d.extend = function (a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }),
      (d.modulo = function (a, b) {
        return ((a % b) + b) % b;
      });
    var e = Object.prototype.toString;
    (d.isArray = function (a) {
      return "[object Array]" == e.call(a);
    }),
      (d.makeArray = function (a) {
        var b = [];
        if (d.isArray(a)) b = a;
        else if (a && "number" == typeof a.length)
          for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
        else b.push(a);
        return b;
      }),
      (d.indexOf = Array.prototype.indexOf
        ? function (a, b) {
            return a.indexOf(b);
          }
        : function (a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
          }),
      (d.removeFrom = function (a, b) {
        var c = d.indexOf(a, b);
        -1 != c && a.splice(c, 1);
      }),
      (d.isElement =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (a) {
              return a instanceof HTMLElement;
            }
          : function (a) {
              return (
                a &&
                "object" == typeof a &&
                1 == a.nodeType &&
                "string" == typeof a.nodeName
              );
            }),
      (d.setText = (function () {
        function a(a, c) {
          (b =
            b ||
            (void 0 !== document.documentElement.textContent
              ? "textContent"
              : "innerText")),
            (a[b] = c);
        }
        var b;
        return a;
      })()),
      (d.getParent = function (a, b) {
        for (; a != document.body; )
          if (((a = a.parentNode), c(a, b))) return a;
      }),
      (d.getQueryElement = function (a) {
        return "string" == typeof a ? document.querySelector(a) : a;
      }),
      (d.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (d.filterFindElements = function (a, b) {
        a = d.makeArray(a);
        for (var e = [], f = 0, g = a.length; g > f; f++) {
          var h = a[f];
          if (d.isElement(h))
            if (b) {
              c(h, b) && e.push(h);
              for (
                var i = h.querySelectorAll(b), j = 0, k = i.length;
                k > j;
                j++
              )
                e.push(i[j]);
            } else e.push(h);
        }
        return e;
      }),
      (d.debounceMethod = function (a, b, c) {
        var d = a.prototype[b],
          e = b + "Timeout";
        a.prototype[b] = function () {
          var a = this[e];
          a && clearTimeout(a);
          var b = arguments,
            f = this;
          this[e] = setTimeout(function () {
            d.apply(f, b), delete f[e];
          }, c || 100);
        };
      }),
      (d.toDashed = function (a) {
        return a
          .replace(/(.)([A-Z])/g, function (a, b, c) {
            return b + "-" + c;
          })
          .toLowerCase();
      });
    var f = a.console;
    return (
      (d.htmlInit = function (c, e) {
        b(function () {
          for (
            var b = d.toDashed(e),
              g = document.querySelectorAll(".js-" + b),
              h = "data-" + b + "-options",
              i = 0,
              j = g.length;
            j > i;
            i++
          ) {
            var k,
              l = g[i],
              m = l.getAttribute(h);
            try {
              k = m && JSON.parse(m);
            } catch (n) {
              f &&
                f.error(
                  "Error parsing " +
                    h +
                    " on " +
                    l.nodeName.toLowerCase() +
                    (l.id ? "#" + l.id : "") +
                    ": " +
                    n
                );
              continue;
            }
            var o = new c(l, k),
              p = a.jQuery;
            p && p.data(l, e, o);
          }
        });
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
            "fizzy-ui-utils/utils",
          ],
          function (c, d, e, f) {
            return b(a, c, d, e, f);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-get-style-property"),
          require("fizzy-ui-utils")
        ))
      : ((a.Outlayer = {}),
        (a.Outlayer.Item = b(
          a,
          a.EventEmitter,
          a.getSize,
          a.getStyleProperty,
          a.fizzyUIUtils
        )));
  })(window, function (a, b, c, d, e) {
    "use strict";
    function f(a) {
      for (var b in a) return !1;
      return (b = null), !0;
    }
    function g(a, b) {
      a &&
        ((this.element = a),
        (this.layout = b),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function h(a) {
      return a.replace(/([A-Z])/g, function (a) {
        return "-" + a.toLowerCase();
      });
    }
    var i = a.getComputedStyle,
      j = i
        ? function (a) {
            return i(a, null);
          }
        : function (a) {
            return a.currentStyle;
          },
      k = d("transition"),
      l = d("transform"),
      m = k && l,
      n = !!d("perspective"),
      o = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend",
      }[k],
      p = [
        "transform",
        "transition",
        "transitionDuration",
        "transitionProperty",
      ],
      q = (function () {
        for (var a = {}, b = 0, c = p.length; c > b; b++) {
          var e = p[b],
            f = d(e);
          f && f !== e && (a[e] = f);
        }
        return a;
      })();
    e.extend(g.prototype, b.prototype),
      (g.prototype._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (g.prototype.getSize = function () {
        this.size = c(this.element);
      }),
      (g.prototype.css = function (a) {
        var b = this.element.style;
        for (var c in a) {
          var d = q[c] || c;
          b[d] = a[c];
        }
      }),
      (g.prototype.getPosition = function () {
        var a = j(this.element),
          b = this.layout.options,
          c = b.isOriginLeft,
          d = b.isOriginTop,
          e = a[c ? "left" : "right"],
          f = a[d ? "top" : "bottom"],
          g = this.layout.size,
          h =
            -1 != e.indexOf("%")
              ? (parseFloat(e) / 100) * g.width
              : parseInt(e, 10),
          i =
            -1 != f.indexOf("%")
              ? (parseFloat(f) / 100) * g.height
              : parseInt(f, 10);
        (h = isNaN(h) ? 0 : h),
          (i = isNaN(i) ? 0 : i),
          (h -= c ? g.paddingLeft : g.paddingRight),
          (i -= d ? g.paddingTop : g.paddingBottom),
          (this.position.x = h),
          (this.position.y = i);
      }),
      (g.prototype.layoutPosition = function () {
        var a = this.layout.size,
          b = this.layout.options,
          c = {},
          d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
          e = b.isOriginLeft ? "left" : "right",
          f = b.isOriginLeft ? "right" : "left",
          g = this.position.x + a[d];
        (c[e] = this.getXValue(g)), (c[f] = "");
        var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
          i = b.isOriginTop ? "top" : "bottom",
          j = b.isOriginTop ? "bottom" : "top",
          k = this.position.y + a[h];
        (c[i] = this.getYValue(k)),
          (c[j] = ""),
          this.css(c),
          this.emitEvent("layout", [this]);
      }),
      (g.prototype.getXValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && !b.isHorizontal
          ? (a / this.layout.size.width) * 100 + "%"
          : a + "px";
      }),
      (g.prototype.getYValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && b.isHorizontal
          ? (a / this.layout.size.height) * 100 + "%"
          : a + "px";
      }),
      (g.prototype._transitionTo = function (a, b) {
        this.getPosition();
        var c = this.position.x,
          d = this.position.y,
          e = parseInt(a, 10),
          f = parseInt(b, 10),
          g = e === this.position.x && f === this.position.y;
        if ((this.setPosition(a, b), g && !this.isTransitioning))
          return void this.layoutPosition();
        var h = a - c,
          i = b - d,
          j = {};
        (j.transform = this.getTranslate(h, i)),
          this.transition({
            to: j,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (g.prototype.getTranslate = function (a, b) {
        var c = this.layout.options;
        return (
          (a = c.isOriginLeft ? a : -a),
          (b = c.isOriginTop ? b : -b),
          n
            ? "translate3d(" + a + "px, " + b + "px, 0)"
            : "translate(" + a + "px, " + b + "px)"
        );
      }),
      (g.prototype.goTo = function (a, b) {
        this.setPosition(a, b), this.layoutPosition();
      }),
      (g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo),
      (g.prototype.setPosition = function (a, b) {
        (this.position.x = parseInt(a, 10)),
          (this.position.y = parseInt(b, 10));
      }),
      (g.prototype._nonTransition = function (a) {
        this.css(a.to), a.isCleaning && this._removeStyles(a.to);
        for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
      }),
      (g.prototype._transition = function (a) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(a);
        var b = this._transn;
        for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
        for (c in a.to)
          (b.ingProperties[c] = !0), a.isCleaning && (b.clean[c] = !0);
        if (a.from) {
          this.css(a.from);
          var d = this.element.offsetHeight;
          d = null;
        }
        this.enableTransition(a.to),
          this.css(a.to),
          (this.isTransitioning = !0);
      });
    var r = "opacity," + h(q.transform || "transform");
    (g.prototype.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: r,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(o, this, !1));
    }),
      (g.prototype.transition =
        g.prototype[k ? "_transition" : "_nonTransition"]),
      (g.prototype.onwebkitTransitionEnd = function (a) {
        this.ontransitionend(a);
      }),
      (g.prototype.onotransitionend = function (a) {
        this.ontransitionend(a);
      });
    var s = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform",
    };
    (g.prototype.ontransitionend = function (a) {
      if (a.target === this.element) {
        var b = this._transn,
          c = s[a.propertyName] || a.propertyName;
        if (
          (delete b.ingProperties[c],
          f(b.ingProperties) && this.disableTransition(),
          c in b.clean &&
            ((this.element.style[a.propertyName] = ""), delete b.clean[c]),
          c in b.onEnd)
        ) {
          var d = b.onEnd[c];
          d.call(this), delete b.onEnd[c];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (g.prototype.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(o, this, !1),
          (this.isTransitioning = !1);
      }),
      (g.prototype._removeStyles = function (a) {
        var b = {};
        for (var c in a) b[c] = "";
        this.css(b);
      });
    var t = { transitionProperty: "", transitionDuration: "" };
    return (
      (g.prototype.removeTransitionStyles = function () {
        this.css(t);
      }),
      (g.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (g.prototype.remove = function () {
        if (!k || !parseFloat(this.layout.options.transitionDuration))
          return void this.removeElem();
        var a = this;
        this.once("transitionEnd", function () {
          a.removeElem();
        }),
          this.hide();
      }),
      (g.prototype.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var a = this.layout.options,
          b = {},
          c = this.getHideRevealTransitionEndProperty("visibleStyle");
        (b[c] = this.onRevealTransitionEnd),
          this.transition({
            from: a.hiddenStyle,
            to: a.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: b,
          });
      }),
      (g.prototype.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (g.prototype.getHideRevealTransitionEndProperty = function (a) {
        var b = this.layout.options[a];
        if (b.opacity) return "opacity";
        for (var c in b) return c;
      }),
      (g.prototype.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var a = this.layout.options,
          b = {},
          c = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (b[c] = this.onHideTransitionEnd),
          this.transition({
            from: a.visibleStyle,
            to: a.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: b,
          });
      }),
      (g.prototype.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (g.prototype.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      g
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (c, d, e, f, g) {
            return b(a, c, d, e, f, g);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("eventie"),
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (a.Outlayer = b(
          a,
          a.eventie,
          a.EventEmitter,
          a.getSize,
          a.fizzyUIUtils,
          a.Outlayer.Item
        ));
  })(window, function (a, b, c, d, e, f) {
    "use strict";
    function g(a, b) {
      var c = e.getQueryElement(a);
      if (!c)
        return void (
          h &&
          h.error(
            "Bad element for " + this.constructor.namespace + ": " + (c || a)
          )
        );
      (this.element = c),
        i && (this.$element = i(this.element)),
        (this.options = e.extend({}, this.constructor.defaults)),
        this.option(b);
      var d = ++k;
      (this.element.outlayerGUID = d),
        (l[d] = this),
        this._create(),
        this.options.isInitLayout && this.layout();
    }
    var h = a.console,
      i = a.jQuery,
      j = function () {},
      k = 0,
      l = {};
    return (
      (g.namespace = "outlayer"),
      (g.Item = f),
      (g.defaults = {
        containerStyle: { position: "relative" },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      }),
      e.extend(g.prototype, c.prototype),
      (g.prototype.option = function (a) {
        e.extend(this.options, a);
      }),
      (g.prototype._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          e.extend(this.element.style, this.options.containerStyle),
          this.options.isResizeBound && this.bindResize();
      }),
      (g.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (g.prototype._itemize = function (a) {
        for (
          var b = this._filterFindItemElements(a),
            c = this.constructor.Item,
            d = [],
            e = 0,
            f = b.length;
          f > e;
          e++
        ) {
          var g = b[e],
            h = new c(g, this);
          d.push(h);
        }
        return d;
      }),
      (g.prototype._filterFindItemElements = function (a) {
        return e.filterFindElements(a, this.options.itemSelector);
      }),
      (g.prototype.getItemElements = function () {
        for (var a = [], b = 0, c = this.items.length; c > b; b++)
          a.push(this.items[b].element);
        return a;
      }),
      (g.prototype.layout = function () {
        this._resetLayout(), this._manageStamps();
        var a =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        this.layoutItems(this.items, a), (this._isLayoutInited = !0);
      }),
      (g.prototype._init = g.prototype.layout),
      (g.prototype._resetLayout = function () {
        this.getSize();
      }),
      (g.prototype.getSize = function () {
        this.size = d(this.element);
      }),
      (g.prototype._getMeasurement = function (a, b) {
        var c,
          f = this.options[a];
        f
          ? ("string" == typeof f
              ? (c = this.element.querySelector(f))
              : e.isElement(f) && (c = f),
            (this[a] = c ? d(c)[b] : f))
          : (this[a] = 0);
      }),
      (g.prototype.layoutItems = function (a, b) {
        (a = this._getItemsForLayout(a)),
          this._layoutItems(a, b),
          this._postLayout();
      }),
      (g.prototype._getItemsForLayout = function (a) {
        for (var b = [], c = 0, d = a.length; d > c; c++) {
          var e = a[c];
          e.isIgnored || b.push(e);
        }
        return b;
      }),
      (g.prototype._layoutItems = function (a, b) {
        if ((this._emitCompleteOnItems("layout", a), a && a.length)) {
          for (var c = [], d = 0, e = a.length; e > d; d++) {
            var f = a[d],
              g = this._getItemLayoutPosition(f);
            (g.item = f), (g.isInstant = b || f.isLayoutInstant), c.push(g);
          }
          this._processLayoutQueue(c);
        }
      }),
      (g.prototype._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (g.prototype._processLayoutQueue = function (a) {
        for (var b = 0, c = a.length; c > b; b++) {
          var d = a[b];
          this._positionItem(d.item, d.x, d.y, d.isInstant);
        }
      }),
      (g.prototype._positionItem = function (a, b, c, d) {
        d ? a.goTo(b, c) : a.moveTo(b, c);
      }),
      (g.prototype._postLayout = function () {
        this.resizeContainer();
      }),
      (g.prototype.resizeContainer = function () {
        if (this.options.isResizingContainer) {
          var a = this._getContainerSize();
          a &&
            (this._setContainerMeasure(a.width, !0),
            this._setContainerMeasure(a.height, !1));
        }
      }),
      (g.prototype._getContainerSize = j),
      (g.prototype._setContainerMeasure = function (a, b) {
        if (void 0 !== a) {
          var c = this.size;
          c.isBorderBox &&
            (a += b
              ? c.paddingLeft +
                c.paddingRight +
                c.borderLeftWidth +
                c.borderRightWidth
              : c.paddingBottom +
                c.paddingTop +
                c.borderTopWidth +
                c.borderBottomWidth),
            (a = Math.max(a, 0)),
            (this.element.style[b ? "width" : "height"] = a + "px");
        }
      }),
      (g.prototype._emitCompleteOnItems = function (a, b) {
        function c() {
          e.dispatchEvent(a + "Complete", null, [b]);
        }
        function d() {
          g++, g === f && c();
        }
        var e = this,
          f = b.length;
        if (!b || !f) return void c();
        for (var g = 0, h = 0, i = b.length; i > h; h++) {
          var j = b[h];
          j.once(a, d);
        }
      }),
      (g.prototype.dispatchEvent = function (a, b, c) {
        var d = b ? [b].concat(c) : c;
        if ((this.emitEvent(a, d), i))
          if (((this.$element = this.$element || i(this.element)), b)) {
            var e = i.Event(b);
            (e.type = a), this.$element.trigger(e, c);
          } else this.$element.trigger(a, c);
      }),
      (g.prototype.ignore = function (a) {
        var b = this.getItem(a);
        b && (b.isIgnored = !0);
      }),
      (g.prototype.unignore = function (a) {
        var b = this.getItem(a);
        b && delete b.isIgnored;
      }),
      (g.prototype.stamp = function (a) {
        if ((a = this._find(a))) {
          this.stamps = this.stamps.concat(a);
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            this.ignore(d);
          }
        }
      }),
      (g.prototype.unstamp = function (a) {
        if ((a = this._find(a)))
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            e.removeFrom(this.stamps, d), this.unignore(d);
          }
      }),
      (g.prototype._find = function (a) {
        return a
          ? ("string" == typeof a && (a = this.element.querySelectorAll(a)),
            (a = e.makeArray(a)))
          : void 0;
      }),
      (g.prototype._manageStamps = function () {
        if (this.stamps && this.stamps.length) {
          this._getBoundingRect();
          for (var a = 0, b = this.stamps.length; b > a; a++) {
            var c = this.stamps[a];
            this._manageStamp(c);
          }
        }
      }),
      (g.prototype._getBoundingRect = function () {
        var a = this.element.getBoundingClientRect(),
          b = this.size;
        this._boundingRect = {
          left: a.left + b.paddingLeft + b.borderLeftWidth,
          top: a.top + b.paddingTop + b.borderTopWidth,
          right: a.right - (b.paddingRight + b.borderRightWidth),
          bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth),
        };
      }),
      (g.prototype._manageStamp = j),
      (g.prototype._getElementOffset = function (a) {
        var b = a.getBoundingClientRect(),
          c = this._boundingRect,
          e = d(a),
          f = {
            left: b.left - c.left - e.marginLeft,
            top: b.top - c.top - e.marginTop,
            right: c.right - b.right - e.marginRight,
            bottom: c.bottom - b.bottom - e.marginBottom,
          };
        return f;
      }),
      (g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (g.prototype.bindResize = function () {
        this.isResizeBound ||
          (b.bind(a, "resize", this), (this.isResizeBound = !0));
      }),
      (g.prototype.unbindResize = function () {
        this.isResizeBound && b.unbind(a, "resize", this),
          (this.isResizeBound = !1);
      }),
      (g.prototype.onresize = function () {
        function a() {
          b.resize(), delete b.resizeTimeout;
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var b = this;
        this.resizeTimeout = setTimeout(a, 100);
      }),
      (g.prototype.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (g.prototype.needsResizeLayout = function () {
        var a = d(this.element),
          b = this.size && a;
        return b && a.innerWidth !== this.size.innerWidth;
      }),
      (g.prototype.addItems = function (a) {
        var b = this._itemize(a);
        return b.length && (this.items = this.items.concat(b)), b;
      }),
      (g.prototype.appended = function (a) {
        var b = this.addItems(a);
        b.length && (this.layoutItems(b, !0), this.reveal(b));
      }),
      (g.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
          var c = this.items.slice(0);
          (this.items = b.concat(c)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(b, !0),
            this.reveal(b),
            this.layoutItems(c);
        }
      }),
      (g.prototype.reveal = function (a) {
        this._emitCompleteOnItems("reveal", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.reveal();
        }
      }),
      (g.prototype.hide = function (a) {
        this._emitCompleteOnItems("hide", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.hide();
        }
      }),
      (g.prototype.revealItemElements = function (a) {
        var b = this.getItems(a);
        this.reveal(b);
      }),
      (g.prototype.hideItemElements = function (a) {
        var b = this.getItems(a);
        this.hide(b);
      }),
      (g.prototype.getItem = function (a) {
        for (var b = 0, c = this.items.length; c > b; b++) {
          var d = this.items[b];
          if (d.element === a) return d;
        }
      }),
      (g.prototype.getItems = function (a) {
        a = e.makeArray(a);
        for (var b = [], c = 0, d = a.length; d > c; c++) {
          var f = a[c],
            g = this.getItem(f);
          g && b.push(g);
        }
        return b;
      }),
      (g.prototype.remove = function (a) {
        var b = this.getItems(a);
        if ((this._emitCompleteOnItems("remove", b), b && b.length))
          for (var c = 0, d = b.length; d > c; c++) {
            var f = b[c];
            f.remove(), e.removeFrom(this.items, f);
          }
      }),
      (g.prototype.destroy = function () {
        var a = this.element.style;
        (a.height = ""), (a.position = ""), (a.width = "");
        for (var b = 0, c = this.items.length; c > b; b++) {
          var d = this.items[b];
          d.destroy();
        }
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete l[e],
          delete this.element.outlayerGUID,
          i && i.removeData(this.element, this.constructor.namespace);
      }),
      (g.data = function (a) {
        a = e.getQueryElement(a);
        var b = a && a.outlayerGUID;
        return b && l[b];
      }),
      (g.create = function (a, b) {
        function c() {
          g.apply(this, arguments);
        }
        return (
          Object.create
            ? (c.prototype = Object.create(g.prototype))
            : e.extend(c.prototype, g.prototype),
          (c.prototype.constructor = c),
          (c.defaults = e.extend({}, g.defaults)),
          e.extend(c.defaults, b),
          (c.prototype.settings = {}),
          (c.namespace = a),
          (c.data = g.data),
          (c.Item = function () {
            f.apply(this, arguments);
          }),
          (c.Item.prototype = new f()),
          e.htmlInit(c, a),
          i && i.bridget && i.bridget(a, c),
          c
        );
      }),
      (g.Item = f),
      g
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/item", ["outlayer/outlayer"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("outlayer")))
      : ((a.Isotope = a.Isotope || {}), (a.Isotope.Item = b(a.Outlayer)));
  })(window, function (a) {
    "use strict";
    function b() {
      a.Item.apply(this, arguments);
    }
    (b.prototype = new a.Item()),
      (b.prototype._create = function () {
        (this.id = this.layout.itemGUID++),
          a.Item.prototype._create.call(this),
          (this.sortData = {});
      }),
      (b.prototype.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var a = this.layout.options.getSortData,
            b = this.layout._sorters;
          for (var c in a) {
            var d = b[c];
            this.sortData[c] = d(this.element, this);
          }
        }
      });
    var c = b.prototype.destroy;
    return (
      (b.prototype.destroy = function () {
        c.apply(this, arguments), this.css({ display: "" });
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(require("get-size"), require("outlayer")))
      : ((a.Isotope = a.Isotope || {}),
        (a.Isotope.LayoutMode = b(a.getSize, a.Outlayer)));
  })(window, function (a, b) {
    "use strict";
    function c(a) {
      (this.isotope = a),
        a &&
          ((this.options = a.options[this.namespace]),
          (this.element = a.element),
          (this.items = a.filteredItems),
          (this.size = a.size));
    }
    return (
      (function () {
        function a(a) {
          return function () {
            return b.prototype[a].apply(this.isotope, arguments);
          };
        }
        for (
          var d = [
              "_resetLayout",
              "_getItemLayoutPosition",
              "_manageStamp",
              "_getContainerSize",
              "_getElementOffset",
              "needsResizeLayout",
            ],
            e = 0,
            f = d.length;
          f > e;
          e++
        ) {
          var g = d[e];
          c.prototype[g] = a(g);
        }
      })(),
      (c.prototype.needsVerticalResizeLayout = function () {
        var b = a(this.isotope.element),
          c = this.isotope.size && b;
        return c && b.innerHeight != this.isotope.size.innerHeight;
      }),
      (c.prototype._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (c.prototype.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (c.prototype.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (c.prototype.getSegmentSize = function (a, b) {
        var c = a + b,
          d = "outer" + b;
        if ((this._getMeasurement(c, d), !this[c])) {
          var e = this.getFirstItemSize();
          this[c] = (e && e[d]) || this.isotope.size["inner" + b];
        }
      }),
      (c.prototype.getFirstItemSize = function () {
        var b = this.isotope.filteredItems[0];
        return b && b.element && a(b.element);
      }),
      (c.prototype.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (c.prototype.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (c.modes = {}),
      (c.create = function (a, b) {
        function d() {
          c.apply(this, arguments);
        }
        return (
          (d.prototype = new c()),
          b && (d.options = b),
          (d.prototype.namespace = a),
          (c.modes[a] = d),
          d
        );
      }),
      c
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "masonry/masonry",
          ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(
          require("outlayer"),
          require("get-size"),
          require("fizzy-ui-utils")
        ))
      : (a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils));
  })(window, function (a, b, c) {
    var d = a.create("masonry");
    return (
      (d.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns();
        var a = this.cols;
        for (this.colYs = []; a--; ) this.colYs.push(0);
        this.maxY = 0;
      }),
      (d.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var a = this.items[0],
            c = a && a.element;
          this.columnWidth = (c && b(c).outerWidth) || this.containerWidth;
        }
        var d = (this.columnWidth += this.gutter),
          e = this.containerWidth + this.gutter,
          f = e / d,
          g = d - (e % d),
          h = g && 1 > g ? "round" : "floor";
        (f = Math[h](f)), (this.cols = Math.max(f, 1));
      }),
      (d.prototype.getContainerWidth = function () {
        var a = this.options.isFitWidth
            ? this.element.parentNode
            : this.element,
          c = b(a);
        this.containerWidth = c && c.innerWidth;
      }),
      (d.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth % this.columnWidth,
          d = b && 1 > b ? "round" : "ceil",
          e = Math[d](a.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        for (
          var f = this._getColGroup(e),
            g = Math.min.apply(Math, f),
            h = c.indexOf(f, g),
            i = { x: this.columnWidth * h, y: g },
            j = g + a.size.outerHeight,
            k = this.cols + 1 - f.length,
            l = 0;
          k > l;
          l++
        )
          this.colYs[h + l] = j;
        return i;
      }),
      (d.prototype._getColGroup = function (a) {
        if (2 > a) return this.colYs;
        for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
          var e = this.colYs.slice(d, d + a);
          b[d] = Math.max.apply(Math, e);
        }
        return b;
      }),
      (d.prototype._manageStamp = function (a) {
        var c = b(a),
          d = this._getElementOffset(a),
          e = this.options.isOriginLeft ? d.left : d.right,
          f = e + c.outerWidth,
          g = Math.floor(e / this.columnWidth);
        g = Math.max(0, g);
        var h = Math.floor(f / this.columnWidth);
        (h -= f % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight,
            j = g;
          h >= j;
          j++
        )
          this.colYs[j] = Math.max(i, this.colYs[j]);
      }),
      (d.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var a = { height: this.maxY };
        return (
          this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
        );
      }),
      (d.prototype._getContainerFitWidth = function () {
        for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
        return (this.cols - a) * this.columnWidth - this.gutter;
      }),
      (d.prototype.needsResizeLayout = function () {
        var a = this.containerWidth;
        return this.getContainerWidth(), a !== this.containerWidth;
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-modes/masonry",
          ["../layout-mode", "masonry/masonry"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : b(a.Isotope.LayoutMode, a.Masonry);
  })(window, function (a, b) {
    "use strict";
    function c(a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }
    var d = a.create("masonry"),
      e = d.prototype._getElementOffset,
      f = d.prototype.layout,
      g = d.prototype._getMeasurement;

    c(d.prototype, b.prototype),
      (d.prototype._getElementOffset = e),
      (d.prototype.layout = f),
      (d.prototype._getMeasurement = g);
    var h = d.prototype.measureColumns;
    d.prototype.measureColumns = function () {
      (this.items = this.isotope.filteredItems), h.call(this);
    };
    var i = d.prototype._manageStamp;
    return (
      (d.prototype._manageStamp = function () {
        (this.options.isOriginLeft = this.isotope.options.isOriginLeft),
          (this.options.isOriginTop = this.isotope.options.isOriginTop),
          i.apply(this, arguments);
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("../layout-mode")))
      : b(a.Isotope.LayoutMode);
  })(window, function (a) {
    "use strict";
    var b = a.create("fitRows");
    return (
      (b.prototype._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (b.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth + this.gutter,
          c = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && b + this.x > c && ((this.x = 0), (this.y = this.maxY));
        var d = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight)),
          (this.x += b),
          d
        );
      }),
      (b.prototype._getContainerSize = function () {
        return { height: this.maxY };
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("../layout-mode")))
      : b(a.Isotope.LayoutMode);
  })(window, function (a) {
    "use strict";
    var b = a.create("vertical", { horizontalAlignment: 0 });
    return (
      (b.prototype._resetLayout = function () {
        this.y = 0;
      }),
      (b.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b =
            (this.isotope.size.innerWidth - a.size.outerWidth) *
            this.options.horizontalAlignment,
          c = this.y;
        return (this.y += a.size.outerHeight), { x: b, y: c };
      }),
      (b.prototype._getContainerSize = function () {
        return { height: this.y };
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope/js/item",
            "isotope/js/layout-mode",
            "isotope/js/layout-modes/masonry",
            "isotope/js/layout-modes/fit-rows",
            "isotope/js/layout-modes/vertical",
          ],
          function (c, d, e, f, g, h) {
            return b(a, c, d, e, f, g, h);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("./item"),
          require("./layout-mode"),
          require("./layout-modes/masonry"),
          require("./layout-modes/fit-rows"),
          require("./layout-modes/vertical")
        ))
      : (a.Isotope = b(
          a,
          a.Outlayer,
          a.getSize,
          a.matchesSelector,
          a.fizzyUIUtils,
          a.Isotope.Item,
          a.Isotope.LayoutMode
        ));
  })(window, function (a, b, c, d, e, f, g) {
    function h(a, b) {
      return function (c, d) {
        for (var e = 0, f = a.length; f > e; e++) {
          var g = a[e],
            h = c.sortData[g],
            i = d.sortData[g];
          if (h > i || i > h) {
            var j = void 0 !== b[g] ? b[g] : b,
              k = j ? 1 : -1;
            return (h > i ? 1 : -1) * k;
          }
        }
        return 0;
      };
    }
    var i = a.jQuery,
      j = String.prototype.trim
        ? function (a) {
            return a.trim();
          }
        : function (a) {
            return a.replace(/^\s+|\s+$/g, "");
          },
      k = document.documentElement,
      l = k.textContent
        ? function (a) {
            return a.textContent;
          }
        : function (a) {
            return a.innerText;
          },
      m = b.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (m.Item = f),
      (m.LayoutMode = g),
      (m.prototype._create = function () {
        (this.itemGUID = 0),
          (this._sorters = {}),
          this._getSorters(),
          b.prototype._create.call(this),
          (this.modes = {}),
          (this.filteredItems = this.items),
          (this.sortHistory = ["original-order"]);
        for (var a in g.modes) this._initLayoutMode(a);
      }),
      (m.prototype.reloadItems = function () {
        (this.itemGUID = 0), b.prototype.reloadItems.call(this);
      }),
      (m.prototype._itemize = function () {
        for (
          var a = b.prototype._itemize.apply(this, arguments),
            c = 0,
            d = a.length;
          d > c;
          c++
        ) {
          var e = a[c];
          e.id = this.itemGUID++;
        }
        return this._updateItemsSortData(a), a;
      }),
      (m.prototype._initLayoutMode = function (a) {
        var b = g.modes[a],
          c = this.options[a] || {};
        (this.options[a] = b.options ? e.extend(b.options, c) : c),
          (this.modes[a] = new b(this));
      }),
      (m.prototype.layout = function () {
        return !this._isLayoutInited && this.options.isInitLayout
          ? void this.arrange()
          : void this._layout();
      }),
      (m.prototype._layout = function () {
        var a = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, a),
          (this._isLayoutInited = !0);
      }),
      (m.prototype.arrange = function (a) {
        function b() {
          d.reveal(c.needReveal), d.hide(c.needHide);
        }
        this.option(a), this._getIsInstant();
        var c = this._filter(this.items);
        this.filteredItems = c.matches;
        var d = this;
        this._bindArrangeComplete(),
          this._isInstant ? this._noTransition(b) : b(),
          this._sort(),
          this._layout();
      }),
      (m.prototype._init = m.prototype.arrange),
      (m.prototype._getIsInstant = function () {
        var a =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        return (this._isInstant = a), a;
      }),
      (m.prototype._bindArrangeComplete = function () {
        function a() {
          b &&
            c &&
            d &&
            e.dispatchEvent("arrangeComplete", null, [e.filteredItems]);
        }
        var b,
          c,
          d,
          e = this;
        this.once("layoutComplete", function () {
          (b = !0), a();
        }),
          this.once("hideComplete", function () {
            (c = !0), a();
          }),
          this.once("revealComplete", function () {
            (d = !0), a();
          });
      }),
      (m.prototype._filter = function (a) {
        var b = this.options.filter;
        b = b || "*";
        for (
          var c = [],
            d = [],
            e = [],
            f = this._getFilterTest(b),
            g = 0,
            h = a.length;
          h > g;
          g++
        ) {
          var i = a[g];
          if (!i.isIgnored) {
            var j = f(i);
            j && c.push(i),
              j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i);
          }
        }
        return { matches: c, needReveal: d, needHide: e };
      }),
      (m.prototype._getFilterTest = function (a) {
        return i && this.options.isJQueryFiltering
          ? function (b) {
              return i(b.element).is(a);
            }
          : "function" == typeof a
          ? function (b) {
              return a(b.element);
            }
          : function (b) {
              return d(b.element, a);
            };
      }),
      (m.prototype.updateSortData = function (a) {
        var b;
        a ? ((a = e.makeArray(a)), (b = this.getItems(a))) : (b = this.items),
          this._getSorters(),
          this._updateItemsSortData(b);
      }),
      (m.prototype._getSorters = function () {
        var a = this.options.getSortData;
        for (var b in a) {
          var c = a[b];
          this._sorters[b] = n(c);
        }
      }),
      (m.prototype._updateItemsSortData = function (a) {
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.updateSortData();
        }
      });
    var n = (function () {
      function a(a) {
        if ("string" != typeof a) return a;
        var c = j(a).split(" "),
          d = c[0],
          e = d.match(/^\[(.+)\]$/),
          f = e && e[1],
          g = b(f, d),
          h = m.sortDataParsers[c[1]];
        return (a = h
          ? function (a) {
              return a && h(g(a));
            }
          : function (a) {
              return a && g(a);
            });
      }
      function b(a, b) {
        var c;
        return (c = a
          ? function (b) {
              return b.getAttribute(a);
            }
          : function (a) {
              var c = a.querySelector(b);
              return c && l(c);
            });
      }
      return a;
    })();
    (m.sortDataParsers = {
      parseInt: function (a) {
        return parseInt(a, 10);
      },
      parseFloat: function (a) {
        return parseFloat(a);
      },
    }),
      (m.prototype._sort = function () {
        var a = this.options.sortBy;
        if (a) {
          var b = [].concat.apply(a, this.sortHistory),
            c = h(b, this.options.sortAscending);
          this.filteredItems.sort(c),
            a != this.sortHistory[0] && this.sortHistory.unshift(a);
        }
      }),
      (m.prototype._mode = function () {
        var a = this.options.layoutMode,
          b = this.modes[a];
        if (!b) throw new Error("No layout mode: " + a);
        return (b.options = this.options[a]), b;
      }),
      (m.prototype._resetLayout = function () {
        b.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (m.prototype._getItemLayoutPosition = function (a) {
        return this._mode()._getItemLayoutPosition(a);
      }),
      (m.prototype._manageStamp = function (a) {
        this._mode()._manageStamp(a);
      }),
      (m.prototype._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (m.prototype.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (m.prototype.appended = function (a) {
        var b = this.addItems(a);
        if (b.length) {
          var c = this._filterRevealAdded(b);
          this.filteredItems = this.filteredItems.concat(c);
        }
      }),
      (m.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
          this._resetLayout(), this._manageStamps();
          var c = this._filterRevealAdded(b);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = c.concat(this.filteredItems)),
            (this.items = b.concat(this.items));
        }
      }),
      (m.prototype._filterRevealAdded = function (a) {
        var b = this._filter(a);
        return (
          this.hide(b.needHide),
          this.reveal(b.matches),
          this.layoutItems(b.matches, !0),
          b.matches
        );
      }),
      (m.prototype.insert = function (a) {
        var b = this.addItems(a);
        if (b.length) {
          var c,
            d,
            e = b.length;
          for (c = 0; e > c; c++)
            (d = b[c]), this.element.appendChild(d.element);
          var f = this._filter(b).matches;
          for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
          for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
          this.reveal(f);
        }
      });
    var o = m.prototype.remove;
    return (
      (m.prototype.remove = function (a) {
        a = e.makeArray(a);
        var b = this.getItems(a);
        o.call(this, a);
        var c = b && b.length;
        if (c)
          for (var d = 0; c > d; d++) {
            var f = b[d];
            e.removeFrom(this.filteredItems, f);
          }
      }),
      (m.prototype.shuffle = function () {
        for (var a = 0, b = this.items.length; b > a; a++) {
          var c = this.items[a];
          c.sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (m.prototype._noTransition = function (a) {
        var b = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var c = a.call(this);
        return (this.options.transitionDuration = b), c;
      }),
      (m.prototype.getFilteredItemElements = function () {
        for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++)
          a.push(this.filteredItems[b].element);
        return a;
      }),
      m
    );
  });

/*!

 * justifiedGallery - v3.7.0

 * http://miromannino.github.io/Justified-Gallery/

 * Copyright (c) 2018 Miro Mannino

 * Licensed under the MIT license.

 */

!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof module && module.exports
    ? (module.exports = function (t, i) {
        return (
          void 0 === i &&
            (i =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(t)),
          e(i),
          i
        );
      })
    : e(jQuery);
})(function (g) {
  var r = function (t, i) {
    (this.settings = i),
      this.checkSettings(),
      (this.imgAnalyzerTimeout = null),
      (this.entries = null),
      (this.buildingRow = {
        entriesBuff: [],
        width: 0,
        height: 0,
        aspectRatio: 0,
      }),
      (this.lastFetchedEntry = null),
      (this.lastAnalyzedIndex = -1),
      (this.yield = { every: 2, flushed: 0 }),
      (this.border = 0 <= i.border ? i.border : i.margins),
      (this.maxRowHeight = this.retrieveMaxRowHeight()),
      (this.suffixRanges = this.retrieveSuffixRanges()),
      (this.offY = this.border),
      (this.rows = 0),
      (this.spinner = {
        phase: 0,
        timeSlot: 150,
        $el: g(
          '<div class="spinner"><span></span><span></span><span></span></div>'
        ),
        intervalId: null,
      }),
      (this.scrollBarOn = !1),
      (this.checkWidthIntervalId = null),
      (this.galleryWidth = t.width()),
      (this.$gallery = t);
  };
  (r.prototype.getSuffix = function (t, i) {
    var e, s;
    for (e = i < t ? t : i, s = 0; s < this.suffixRanges.length; s++)
      if (e <= this.suffixRanges[s])
        return this.settings.sizeRangeSuffixes[this.suffixRanges[s]];
    return this.settings.sizeRangeSuffixes[this.suffixRanges[s - 1]];
  }),
    (r.prototype.removeSuffix = function (t, i) {
      return t.substring(0, t.length - i.length);
    }),
    (r.prototype.endsWith = function (t, i) {
      return -1 !== t.indexOf(i, t.length - i.length);
    }),
    (r.prototype.getUsedSuffix = function (t) {
      for (var i in this.settings.sizeRangeSuffixes)
        if (this.settings.sizeRangeSuffixes.hasOwnProperty(i)) {
          if (0 === this.settings.sizeRangeSuffixes[i].length) continue;
          if (this.endsWith(t, this.settings.sizeRangeSuffixes[i]))
            return this.settings.sizeRangeSuffixes[i];
        }
      return "";
    }),
    (r.prototype.newSrc = function (t, i, e, s) {
      var n;
      if (this.settings.thumbnailPath)
        n = this.settings.thumbnailPath(t, i, e, s);
      else {
        var r = t.match(this.settings.extension),
          o = null !== r ? r[0] : "";
        (n = t.replace(this.settings.extension, "")),
          (n = this.removeSuffix(n, this.getUsedSuffix(n))),
          (n += this.getSuffix(i, e) + o);
      }
      return n;
    }),
    (r.prototype.showImg = function (t, i) {
      this.settings.cssAnimation
        ? (t.addClass("entry-visible"), i && i())
        : (t.stop().fadeTo(this.settings.imagesAnimationDuration, 1, i),
          t
            .find(this.settings.imgSelector)
            .stop()
            .fadeTo(this.settings.imagesAnimationDuration, 1, i));
    }),
    (r.prototype.extractImgSrcFromImage = function (t) {
      var i =
        void 0 !== t.data("safe-src") ? t.data("safe-src") : t.attr("src");
      return t.data("jg.originalSrc", i), i;
    }),
    (r.prototype.imgFromEntry = function (t) {
      var i = t.find(this.settings.imgSelector);
      return 0 === i.length ? null : i;
    }),
    (r.prototype.captionFromEntry = function (t) {
      var i = t.find("> .caption");
      return 0 === i.length ? null : i;
    }),
    (r.prototype.displayEntry = function (t, i, e, s, n, r) {
      t.width(s), t.height(r), t.css("top", e), t.css("left", i);
      var o = this.imgFromEntry(t);
      if (null !== o) {
        o.css("width", s),
          o.css("height", n),
          o.css("margin-left", -s / 2),
          o.css("margin-top", -n / 2);
        var a = o.attr("src"),
          h = this.newSrc(a, s, n, o[0]);
        o.one("error", function () {
          o.attr("src", o.data("jg.originalSrc"));
        });
        var l = function () {
          a !== h && o.attr("src", h);
        };
        "skipped" === t.data("jg.loaded")
          ? this.onImageEvent(
              a,
              g.proxy(function () {
                this.showImg(t, l), t.data("jg.loaded", !0);
              }, this)
            )
          : this.showImg(t, l);
      } else this.showImg(t);
      this.displayEntryCaption(t);
    }),
    (r.prototype.displayEntryCaption = function (t) {
      var i = this.imgFromEntry(t);
      if (null !== i && this.settings.captions) {
        var e = this.captionFromEntry(t);
        if (null === e) {
          var s = i.attr("alt");
          this.isValidCaption(s) || (s = t.attr("title")),
            this.isValidCaption(s) &&
              ((e = g('<div class="caption">' + s + "</div>")),
              t.append(e),
              t.data("jg.createdCaption", !0));
        }
        null !== e &&
          (this.settings.cssAnimation ||
            e.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity),
          this.addCaptionEventsHandlers(t));
      } else this.removeCaptionEventsHandlers(t);
    }),
    (r.prototype.isValidCaption = function (t) {
      return void 0 !== t && 0 < t.length;
    }),
    (r.prototype.onEntryMouseEnterForCaption = function (t) {
      var i = this.captionFromEntry(g(t.currentTarget));
      this.settings.cssAnimation
        ? i.addClass("caption-visible").removeClass("caption-hidden")
        : i
            .stop()
            .fadeTo(
              this.settings.captionSettings.animationDuration,
              this.settings.captionSettings.visibleOpacity
            );
    }),
    (r.prototype.onEntryMouseLeaveForCaption = function (t) {
      var i = this.captionFromEntry(g(t.currentTarget));
      this.settings.cssAnimation
        ? i.removeClass("caption-visible").removeClass("caption-hidden")
        : i
            .stop()
            .fadeTo(
              this.settings.captionSettings.animationDuration,
              this.settings.captionSettings.nonVisibleOpacity
            );
    }),
    (r.prototype.addCaptionEventsHandlers = function (t) {
      var i = t.data("jg.captionMouseEvents");
      void 0 === i &&
        ((i = {
          mouseenter: g.proxy(this.onEntryMouseEnterForCaption, this),
          mouseleave: g.proxy(this.onEntryMouseLeaveForCaption, this),
        }),
        t.on("mouseenter", void 0, void 0, i.mouseenter),
        t.on("mouseleave", void 0, void 0, i.mouseleave),
        t.data("jg.captionMouseEvents", i));
    }),
    (r.prototype.removeCaptionEventsHandlers = function (t) {
      var i = t.data("jg.captionMouseEvents");
      void 0 !== i &&
        (t.off("mouseenter", void 0, i.mouseenter),
        t.off("mouseleave", void 0, i.mouseleave),
        t.removeData("jg.captionMouseEvents"));
    }),
    (r.prototype.clearBuildingRow = function () {
      (this.buildingRow.entriesBuff = []),
        (this.buildingRow.aspectRatio = 0),
        (this.buildingRow.width = 0);
    }),
    (r.prototype.prepareBuildingRow = function (t) {
      var i,
        e,
        s,
        n,
        r,
        o = !0,
        a = 0,
        h =
          this.galleryWidth -
          2 * this.border -
          (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
        l = h / this.buildingRow.aspectRatio,
        g = this.settings.rowHeight,
        u = this.buildingRow.width / h > this.settings.justifyThreshold;
      if (t && "hide" === this.settings.lastRow && !u) {
        for (i = 0; i < this.buildingRow.entriesBuff.length; i++)
          (e = this.buildingRow.entriesBuff[i]),
            this.settings.cssAnimation
              ? e.removeClass("entry-visible")
              : (e.stop().fadeTo(0, 0.1),
                e.find("> img, > a > img").fadeTo(0, 0));
        return -1;
      }
      for (
        t &&
          !u &&
          "justify" !== this.settings.lastRow &&
          "hide" !== this.settings.lastRow &&
          ((o = !1),
          0 < this.rows &&
            (o =
              ((g =
                (this.offY - this.border - this.settings.margins * this.rows) /
                this.rows) *
                this.buildingRow.aspectRatio) /
                h >
              this.settings.justifyThreshold)),
          i = 0;
        i < this.buildingRow.entriesBuff.length;
        i++
      )
        (s =
          (e = this.buildingRow.entriesBuff[i]).data("jg.width") /
          e.data("jg.height")),
          o
            ? ((n = i === this.buildingRow.entriesBuff.length - 1 ? h : l * s),
              (r = l))
            : ((n = g * s), (r = g)),
          (h -= Math.round(n)),
          e.data("jg.jwidth", Math.round(n)),
          e.data("jg.jheight", Math.ceil(r)),
          (0 === i || r < a) && (a = r);
      return (this.buildingRow.height = a), o;
    }),
    (r.prototype.flushRow = function (t) {
      var i,
        e,
        s,
        n = this.settings,
        r = this.border;
      if (
        ((e = this.prepareBuildingRow(t)),
        t && "hide" === n.lastRow && -1 === e)
      )
        this.clearBuildingRow();
      else {
        if (
          (this.maxRowHeight &&
            this.maxRowHeight < this.buildingRow.height &&
            (this.buildingRow.height = this.maxRowHeight),
          t && ("center" === n.lastRow || "right" === n.lastRow))
        ) {
          var o =
            this.galleryWidth -
            2 * this.border -
            (this.buildingRow.entriesBuff.length - 1) * n.margins;
          for (s = 0; s < this.buildingRow.entriesBuff.length; s++)
            o -= (i = this.buildingRow.entriesBuff[s]).data("jg.jwidth");
          "center" === n.lastRow
            ? (r += o / 2)
            : "right" === n.lastRow && (r += o);
        }
        var a = this.buildingRow.entriesBuff.length - 1;
        for (s = 0; s <= a; s++)
          (i = this.buildingRow.entriesBuff[this.settings.rtl ? a - s : s]),
            this.displayEntry(
              i,
              r,
              this.offY,
              i.data("jg.jwidth"),
              i.data("jg.jheight"),
              this.buildingRow.height
            ),
            (r += i.data("jg.jwidth") + n.margins);
        (this.galleryHeightToSet =
          this.offY + this.buildingRow.height + this.border),
          this.setGalleryTempHeight(
            this.galleryHeightToSet + this.getSpinnerHeight()
          ),
          (!t || (this.buildingRow.height <= n.rowHeight && e)) &&
            ((this.offY += this.buildingRow.height + n.margins),
            (this.rows += 1),
            this.clearBuildingRow(),
            this.settings.triggerEvent.call(this, "jg.rowflush"));
      }
    });
  var i = 0;
  function e() {
    return g("body").height() > g(window).height();
  }
  (r.prototype.rememberGalleryHeight = function () {
    (i = this.$gallery.height()), this.$gallery.height(i);
  }),
    (r.prototype.setGalleryTempHeight = function (t) {
      (i = Math.max(t, i)), this.$gallery.height(i);
    }),
    (r.prototype.setGalleryFinalHeight = function (t) {
      (i = t), this.$gallery.height(t);
    }),
    (r.prototype.checkWidth = function () {
      this.checkWidthIntervalId = setInterval(
        g.proxy(function () {
          if (this.$gallery.is(":visible")) {
            var t = parseFloat(this.$gallery.width());
            e() === this.scrollBarOn
              ? Math.abs(t - this.galleryWidth) >
                  this.settings.refreshSensitivity &&
                ((this.galleryWidth = t),
                this.rewind(),
                this.rememberGalleryHeight(),
                this.startImgAnalyzer(!0))
              : ((this.scrollBarOn = e()), (this.galleryWidth = t));
          }
        }, this),
        this.settings.refreshTime
      );
    }),
    (r.prototype.isSpinnerActive = function () {
      return null !== this.spinner.intervalId;
    }),
    (r.prototype.getSpinnerHeight = function () {
      return this.spinner.$el.innerHeight();
    }),
    (r.prototype.stopLoadingSpinnerAnimation = function () {
      clearInterval(this.spinner.intervalId),
        (this.spinner.intervalId = null),
        this.setGalleryTempHeight(
          this.$gallery.height() - this.getSpinnerHeight()
        ),
        this.spinner.$el.detach();
    }),
    (r.prototype.startLoadingSpinnerAnimation = function () {
      var t = this.spinner,
        i = t.$el.find("span");
      clearInterval(t.intervalId),
        this.$gallery.append(t.$el),
        this.setGalleryTempHeight(
          this.offY + this.buildingRow.height + this.getSpinnerHeight()
        ),
        (t.intervalId = setInterval(function () {
          t.phase < i.length
            ? i.eq(t.phase).fadeTo(t.timeSlot, 1)
            : i.eq(t.phase - i.length).fadeTo(t.timeSlot, 0),
            (t.phase = (t.phase + 1) % (2 * i.length));
        }, t.timeSlot));
    }),
    (r.prototype.rewind = function () {
      (this.lastFetchedEntry = null),
        (this.lastAnalyzedIndex = -1),
        (this.offY = this.border),
        (this.rows = 0),
        this.clearBuildingRow();
    }),
    (r.prototype.updateEntries = function (t) {
      var i;
      return (
        t && null != this.lastFetchedEntry
          ? (i = g(this.lastFetchedEntry)
              .nextAll(this.settings.selector)
              .toArray())
          : ((this.entries = []),
            (i = this.$gallery.children(this.settings.selector).toArray())),
        0 < i.length &&
          (g.isFunction(this.settings.sort)
            ? (i = this.sortArray(i))
            : this.settings.randomize && (i = this.shuffleArray(i)),
          (this.lastFetchedEntry = i[i.length - 1]),
          this.settings.filter
            ? (i = this.filterArray(i))
            : this.resetFilters(i)),
        (this.entries = this.entries.concat(i)),
        !0
      );
    }),
    (r.prototype.insertToGallery = function (t) {
      var i = this;
      g.each(t, function () {
        g(this).appendTo(i.$gallery);
      });
    }),
    (r.prototype.shuffleArray = function (t) {
      var i, e, s;
      for (i = t.length - 1; 0 < i; i--)
        (e = Math.floor(Math.random() * (i + 1))),
          (s = t[i]),
          (t[i] = t[e]),
          (t[e] = s);
      return this.insertToGallery(t), t;
    }),
    (r.prototype.sortArray = function (t) {
      return t.sort(this.settings.sort), this.insertToGallery(t), t;
    }),
    (r.prototype.resetFilters = function (t) {
      for (var i = 0; i < t.length; i++) g(t[i]).removeClass("jg-filtered");
    }),
    (r.prototype.filterArray = function (t) {
      var e = this.settings;
      if ("string" === g.type(e.filter))
        return t.filter(function (t) {
          var i = g(t);
          return i.is(e.filter)
            ? (i.removeClass("jg-filtered"), !0)
            : (i.addClass("jg-filtered").removeClass("jg-visible"), !1);
        });
      if (g.isFunction(e.filter)) {
        for (var i = t.filter(e.filter), s = 0; s < t.length; s++)
          -1 === i.indexOf(t[s])
            ? g(t[s]).addClass("jg-filtered").removeClass("jg-visible")
            : g(t[s]).removeClass("jg-filtered");
        return i;
      }
    }),
    (r.prototype.destroy = function () {
      clearInterval(this.checkWidthIntervalId),
        g.each(
          this.entries,
          g.proxy(function (t, i) {
            var e = g(i);
            e.css("width", ""),
              e.css("height", ""),
              e.css("top", ""),
              e.css("left", ""),
              e.data("jg.loaded", void 0),
              e.removeClass("jg-entry");
            var s = this.imgFromEntry(e);
            s.css("width", ""),
              s.css("height", ""),
              s.css("margin-left", ""),
              s.css("margin-top", ""),
              s.attr("src", s.data("jg.originalSrc")),
              s.data("jg.originalSrc", void 0),
              this.removeCaptionEventsHandlers(e);
            var n = this.captionFromEntry(e);
            e.data("jg.createdCaption")
              ? (e.data("jg.createdCaption", void 0), null !== n && n.remove())
              : null !== n && n.fadeTo(0, 1);
          }, this)
        ),
        this.$gallery.css("height", ""),
        this.$gallery.removeClass("justified-gallery"),
        this.$gallery.data("jg.controller", void 0);
    }),
    (r.prototype.analyzeImages = function (t) {
      for (var i = this.lastAnalyzedIndex + 1; i < this.entries.length; i++) {
        var e = g(this.entries[i]);
        if (!0 === e.data("jg.loaded") || "skipped" === e.data("jg.loaded")) {
          var s =
              this.galleryWidth -
              2 * this.border -
              (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
            n = e.data("jg.width") / e.data("jg.height");
          if (
            s / (this.buildingRow.aspectRatio + n) < this.settings.rowHeight &&
            (this.flushRow(!1), ++this.yield.flushed >= this.yield.every)
          )
            return void this.startImgAnalyzer(t);
          this.buildingRow.entriesBuff.push(e),
            (this.buildingRow.aspectRatio += n),
            (this.buildingRow.width += n * this.settings.rowHeight),
            (this.lastAnalyzedIndex = i);
        } else if ("error" !== e.data("jg.loaded")) return;
      }
      0 < this.buildingRow.entriesBuff.length && this.flushRow(!0),
        this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(),
        this.stopImgAnalyzerStarter(),
        this.settings.triggerEvent.call(this, t ? "jg.resize" : "jg.complete"),
        this.setGalleryFinalHeight(this.galleryHeightToSet);
    }),
    (r.prototype.stopImgAnalyzerStarter = function () {
      (this.yield.flushed = 0),
        null !== this.imgAnalyzerTimeout &&
          (clearTimeout(this.imgAnalyzerTimeout),
          (this.imgAnalyzerTimeout = null));
    }),
    (r.prototype.startImgAnalyzer = function (t) {
      var i = this;
      this.stopImgAnalyzerStarter(),
        (this.imgAnalyzerTimeout = setTimeout(function () {
          i.analyzeImages(t);
        }, 0.001));
    }),
    (r.prototype.onImageEvent = function (t, i, e) {
      if (i || e) {
        var s = new Image(),
          n = g(s);
        i &&
          n.one("load", function () {
            n.off("load error"), i(s);
          }),
          e &&
            n.one("error", function () {
              n.off("load error"), e(s);
            }),
          (s.src = t);
      }
    }),
    (r.prototype.init = function () {
      var a = !1,
        h = !1,
        l = this;
      g.each(this.entries, function (t, i) {
        var e = g(i),
          s = l.imgFromEntry(e);
        if (
          (e.addClass("jg-entry"),
          !0 !== e.data("jg.loaded") && "skipped" !== e.data("jg.loaded"))
        )
          if (
            (null !== l.settings.rel && e.attr("rel", l.settings.rel),
            null !== l.settings.target && e.attr("target", l.settings.target),
            null !== s)
          ) {
            var n = l.extractImgSrcFromImage(s);
            if ((s.attr("src", n), !1 === l.settings.waitThumbnailsLoad)) {
              var r = parseFloat(s.prop("width")),
                o = parseFloat(s.prop("height"));
              if (!isNaN(r) && !isNaN(o))
                return (
                  e.data("jg.width", r),
                  e.data("jg.height", o),
                  e.data("jg.loaded", "skipped"),
                  (h = !0),
                  l.startImgAnalyzer(!1),
                  !0
                );
            }
            e.data("jg.loaded", !1),
              (a = !0),
              l.isSpinnerActive() || l.startLoadingSpinnerAnimation(),
              l.onImageEvent(
                n,
                function (t) {
                  e.data("jg.width", t.width),
                    e.data("jg.height", t.height),
                    e.data("jg.loaded", !0),
                    l.startImgAnalyzer(!1);
                },
                function () {
                  e.data("jg.loaded", "error"), l.startImgAnalyzer(!1);
                }
              );
          } else
            e.data("jg.loaded", !0),
              e.data("jg.width", e.width() | parseFloat(e.css("width")) | 1),
              e.data("jg.height", e.height() | parseFloat(e.css("height")) | 1);
      }),
        a || h || this.startImgAnalyzer(!1),
        this.checkWidth();
    }),
    (r.prototype.checkOrConvertNumber = function (t, i) {
      if (
        ("string" === g.type(t[i]) && (t[i] = parseFloat(t[i])),
        "number" !== g.type(t[i]))
      )
        throw i + " must be a number";
      if (isNaN(t[i])) throw "invalid number for " + i;
    }),
    (r.prototype.checkSizeRangesSuffixes = function () {
      if ("object" !== g.type(this.settings.sizeRangeSuffixes))
        throw "sizeRangeSuffixes must be defined and must be an object";
      var t = [];
      for (var i in this.settings.sizeRangeSuffixes)
        this.settings.sizeRangeSuffixes.hasOwnProperty(i) && t.push(i);
      for (var e = { 0: "" }, s = 0; s < t.length; s++)
        if ("string" === g.type(t[s]))
          try {
            e[parseInt(t[s].replace(/^[a-z]+/, ""), 10)] =
              this.settings.sizeRangeSuffixes[t[s]];
          } catch (t) {
            throw (
              "sizeRangeSuffixes keys must contains correct numbers (" + t + ")"
            );
          }
        else e[t[s]] = this.settings.sizeRangeSuffixes[t[s]];
      this.settings.sizeRangeSuffixes = e;
    }),
    (r.prototype.retrieveMaxRowHeight = function () {
      var t = null,
        i = this.settings.rowHeight;
      if ("string" === g.type(this.settings.maxRowHeight))
        t = this.settings.maxRowHeight.match(/^[0-9]+%$/)
          ? (i *
              parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1])) /
            100
          : parseFloat(this.settings.maxRowHeight);
      else {
        if ("number" !== g.type(this.settings.maxRowHeight)) {
          if (
            !1 === this.settings.maxRowHeight ||
            null == this.settings.maxRowHeight
          )
            return null;
          throw "maxRowHeight must be a number or a percentage";
        }
        t = this.settings.maxRowHeight;
      }
      if (isNaN(t)) throw "invalid number for maxRowHeight";
      return t < i && (t = i), t;
    }),
    (r.prototype.checkSettings = function () {
      this.checkSizeRangesSuffixes(),
        this.checkOrConvertNumber(this.settings, "rowHeight"),
        this.checkOrConvertNumber(this.settings, "margins"),
        this.checkOrConvertNumber(this.settings, "border");
      var t = ["justify", "nojustify", "left", "center", "right", "hide"];
      if (-1 === t.indexOf(this.settings.lastRow))
        throw "lastRow must be one of: " + t.join(", ");
      if (
        (this.checkOrConvertNumber(this.settings, "justifyThreshold"),
        this.settings.justifyThreshold < 0 ||
          1 < this.settings.justifyThreshold)
      )
        throw "justifyThreshold must be in the interval [0,1]";
      if ("boolean" !== g.type(this.settings.cssAnimation))
        throw "cssAnimation must be a boolean";
      if ("boolean" !== g.type(this.settings.captions))
        throw "captions must be a boolean";
      if (
        (this.checkOrConvertNumber(
          this.settings.captionSettings,
          "animationDuration"
        ),
        this.checkOrConvertNumber(
          this.settings.captionSettings,
          "visibleOpacity"
        ),
        this.settings.captionSettings.visibleOpacity < 0 ||
          1 < this.settings.captionSettings.visibleOpacity)
      )
        throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
      if (
        (this.checkOrConvertNumber(
          this.settings.captionSettings,
          "nonVisibleOpacity"
        ),
        this.settings.captionSettings.nonVisibleOpacity < 0 ||
          1 < this.settings.captionSettings.nonVisibleOpacity)
      )
        throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
      if (
        (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"),
        this.checkOrConvertNumber(this.settings, "refreshTime"),
        this.checkOrConvertNumber(this.settings, "refreshSensitivity"),
        "boolean" !== g.type(this.settings.randomize))
      )
        throw "randomize must be a boolean";
      if ("string" !== g.type(this.settings.selector))
        throw "selector must be a string";
      if (!1 !== this.settings.sort && !g.isFunction(this.settings.sort))
        throw "sort must be false or a comparison function";
      if (
        !1 !== this.settings.filter &&
        !g.isFunction(this.settings.filter) &&
        "string" !== g.type(this.settings.filter)
      )
        throw "filter must be false, a string or a filter function";
    }),
    (r.prototype.retrieveSuffixRanges = function () {
      var t = [];
      for (var i in this.settings.sizeRangeSuffixes)
        this.settings.sizeRangeSuffixes.hasOwnProperty(i) &&
          t.push(parseInt(i, 10));
      return (
        t.sort(function (t, i) {
          return i < t ? 1 : t < i ? -1 : 0;
        }),
        t
      );
    }),
    (r.prototype.updateSettings = function (t) {
      (this.settings = g.extend({}, this.settings, t)),
        this.checkSettings(),
        (this.border =
          0 <= this.settings.border
            ? this.settings.border
            : this.settings.margins),
        (this.maxRowHeight = this.retrieveMaxRowHeight()),
        (this.suffixRanges = this.retrieveSuffixRanges());
    }),
    (r.prototype.defaults = {
      sizeRangeSuffixes: {},
      thumbnailPath: void 0,
      rowHeight: 120,
      maxRowHeight: !1,
      margins: 1,
      border: -1,
      lastRow: "nojustify",
      justifyThreshold: 0.9,
      waitThumbnailsLoad: !0,
      captions: !0,
      cssAnimation: !0,
      imagesAnimationDuration: 500,
      captionSettings: {
        animationDuration: 500,
        visibleOpacity: 0.7,
        nonVisibleOpacity: 0,
      },
      rel: null,
      target: null,
      extension: /\.[^.\\/]+$/,
      refreshTime: 200,
      refreshSensitivity: 0,
      randomize: !1,
      rtl: !1,
      sort: !1,
      filter: !1,
      selector: "a, div:not(.spinner)",
      imgSelector: "> img, > a > img",
      triggerEvent: function (t) {
        this.$gallery.trigger(t);
      },
    }),
    (g.fn.justifiedGallery = function (n) {
      return this.each(function (t, i) {
        var e = g(i);
        e.addClass("justified-gallery");
        var s = e.data("jg.controller");
        if (void 0 === s) {
          if (null != n && "object" !== g.type(n)) {
            if ("destroy" === n) return;
            throw "The argument must be an object";
          }
          (s = new r(e, g.extend({}, r.prototype.defaults, n))),
            e.data("jg.controller", s);
        } else if ("norewind" === n);
        else {
          if ("destroy" === n) return void s.destroy();
          s.updateSettings(n), s.rewind();
        }
        s.updateEntries("norewind" === n) && s.init();
      });
    });
});

/*! Magnific Popup - v1.1.0 - 2016-02-20

* http://dimsemenov.com/plugins/magnific-popup/

* Copyright (c) 2016 Dmitry Semenov; */

!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                ? f.is("img")
                  ? f.attr("src", d)
                  : f.replaceWith(
                      a("<img>").attr("src", d).attr("class", f.attr("class"))
                    )
                : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function () {
                    b.prev();
                  }),
                    f.click(function () {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    A();
});

!(function (t, n) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define([], n)
    : "object" == typeof exports
    ? (exports.Scrollbar = n())
    : (t.Scrollbar = n());
})(window, function () {
  return (function (t) {
    var n = {};
    function e(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
    }
    return (
      (e.m = t),
      (e.c = n),
      (e.d = function (t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r });
      }),
      (e.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (e.t = function (t, n) {
        if ((1 & n && (t = e(t)), 8 & n)) return t;
        if (4 & n && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (e.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & n && "string" != typeof t)
        )
          for (var o in t)
            e.d(
              r,
              o,
              function (n) {
                return t[n];
              }.bind(null, o)
            );
        return r;
      }),
      (e.n = function (t) {
        var n =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return e.d(n, "a", n), n;
      }),
      (e.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
      }),
      (e.p = ""),
      e((e.s = 58))
    );
  })([
    function (t, n, e) {
      var r = e(25)("wks"),
        o = e(16),
        i = e(2).Symbol,
        u = "function" == typeof i;
      (t.exports = function (t) {
        return r[t] || (r[t] = (u && i[t]) || (u ? i : o)("Symbol." + t));
      }).store = r;
    },
    function (t, n) {
      t.exports = function (t) {
        return "object" == typeof t ? null !== t : "function" == typeof t;
      };
    },
    function (t, n) {
      var e = (t.exports =
        "undefined" != typeof window && window.Math == Math
          ? window
          : "undefined" != typeof self && self.Math == Math
          ? self
          : Function("return this")());
      "number" == typeof __g && (__g = e);
    },
    function (t, n) {
      var e = (t.exports = { version: "2.6.5" });
      "number" == typeof __e && (__e = e);
    },
    function (t, n, e) {
      var r = e(2),
        o = e(3),
        i = e(11),
        u = e(5),
        c = e(10),
        s = function (t, n, e) {
          var a,
            f,
            l,
            p,
            h = t & s.F,
            d = t & s.G,
            v = t & s.S,
            y = t & s.P,
            m = t & s.B,
            g = d ? r : v ? r[n] || (r[n] = {}) : (r[n] || {}).prototype,
            b = d ? o : o[n] || (o[n] = {}),
            x = b.prototype || (b.prototype = {});
          for (a in (d && (e = n), e))
            (l = ((f = !h && g && void 0 !== g[a]) ? g : e)[a]),
              (p =
                m && f
                  ? c(l, r)
                  : y && "function" == typeof l
                  ? c(Function.call, l)
                  : l),
              g && u(g, a, l, t & s.U),
              b[a] != l && i(b, a, p),
              y && x[a] != l && (x[a] = l);
        };
      (r.core = o),
        (s.F = 1),
        (s.G = 2),
        (s.S = 4),
        (s.P = 8),
        (s.B = 16),
        (s.W = 32),
        (s.U = 64),
        (s.R = 128),
        (t.exports = s);
    },
    function (t, n, e) {
      var r = e(2),
        o = e(11),
        i = e(9),
        u = e(16)("src"),
        c = e(60),
        s = ("" + c).split("toString");
      (e(3).inspectSource = function (t) {
        return c.call(t);
      }),
        (t.exports = function (t, n, e, c) {
          var a = "function" == typeof e;
          a && (i(e, "name") || o(e, "name", n)),
            t[n] !== e &&
              (a && (i(e, u) || o(e, u, t[n] ? "" + t[n] : s.join(String(n)))),
              t === r
                ? (t[n] = e)
                : c
                ? t[n]
                  ? (t[n] = e)
                  : o(t, n, e)
                : (delete t[n], o(t, n, e)));
        })(Function.prototype, "toString", function () {
          return ("function" == typeof this && this[u]) || c.call(this);
        });
    },
    function (t, n, e) {
      var r = e(7),
        o = e(41),
        i = e(43),
        u = Object.defineProperty;
      n.f = e(8)
        ? Object.defineProperty
        : function (t, n, e) {
            if ((r(t), (n = i(n, !0)), r(e), o))
              try {
                return u(t, n, e);
              } catch (t) {}
            if ("get" in e || "set" in e)
              throw TypeError("Accessors not supported!");
            return "value" in e && (t[n] = e.value), t;
          };
    },
    function (t, n, e) {
      var r = e(1);
      t.exports = function (t) {
        if (!r(t)) throw TypeError(t + " is not an object!");
        return t;
      };
    },
    function (t, n, e) {
      t.exports = !e(13)(function () {
        return (
          7 !=
          Object.defineProperty({}, "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      });
    },
    function (t, n) {
      var e = {}.hasOwnProperty;
      t.exports = function (t, n) {
        return e.call(t, n);
      };
    },
    function (t, n, e) {
      var r = e(44);
      t.exports = function (t, n, e) {
        if ((r(t), void 0 === n)) return t;
        switch (e) {
          case 1:
            return function (e) {
              return t.call(n, e);
            };
          case 2:
            return function (e, r) {
              return t.call(n, e, r);
            };
          case 3:
            return function (e, r, o) {
              return t.call(n, e, r, o);
            };
        }
        return function () {
          return t.apply(n, arguments);
        };
      };
    },
    function (t, n, e) {
      var r = e(6),
        o = e(17);
      t.exports = e(8)
        ? function (t, n, e) {
            return r.f(t, n, o(1, e));
          }
        : function (t, n, e) {
            return (t[n] = e), t;
          };
    },
    function (t, n, e) {
      var r = e(1);
      t.exports = function (t, n) {
        if (!r(t) || t._t !== n)
          throw TypeError("Incompatible receiver, " + n + " required!");
        return t;
      };
    },
    function (t, n) {
      t.exports = function (t) {
        try {
          return !!t();
        } catch (t) {
          return !0;
        }
      };
    },
    function (t, n) {
      t.exports = {};
    },
    function (t, n, e) {
      var r = e(10),
        o = e(49),
        i = e(50),
        u = e(7),
        c = e(19),
        s = e(51),
        a = {},
        f = {};
      ((n = t.exports =
        function (t, n, e, l, p) {
          var h,
            d,
            v,
            y,
            m = p
              ? function () {
                  return t;
                }
              : s(t),
            g = r(e, l, n ? 2 : 1),
            b = 0;
          if ("function" != typeof m) throw TypeError(t + " is not iterable!");
          if (i(m)) {
            for (h = c(t.length); h > b; b++)
              if (
                (y = n ? g(u((d = t[b]))[0], d[1]) : g(t[b])) === a ||
                y === f
              )
                return y;
          } else
            for (v = m.call(t); !(d = v.next()).done; )
              if ((y = o(v, g, d.value, n)) === a || y === f) return y;
        }).BREAK = a),
        (n.RETURN = f);
    },
    function (t, n) {
      var e = 0,
        r = Math.random();
      t.exports = function (t) {
        return "Symbol(".concat(
          void 0 === t ? "" : t,
          ")_",
          (++e + r).toString(36)
        );
      };
    },
    function (t, n) {
      t.exports = function (t, n) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: n,
        };
      };
    },
    function (t, n, e) {
      var r = e(31),
        o = e(28);
      t.exports = function (t) {
        return r(o(t));
      };
    },
    function (t, n, e) {
      var r = e(27),
        o = Math.min;
      t.exports = function (t) {
        return t > 0 ? o(r(t), 9007199254740991) : 0;
      };
    },
    function (t, n, e) {
      var r = e(28);
      t.exports = function (t) {
        return Object(r(t));
      };
    },
    function (t, n, e) {
      var r = e(16)("meta"),
        o = e(1),
        i = e(9),
        u = e(6).f,
        c = 0,
        s =
          Object.isExtensible ||
          function () {
            return !0;
          },
        a = !e(13)(function () {
          return s(Object.preventExtensions({}));
        }),
        f = function (t) {
          u(t, r, { value: { i: "O" + ++c, w: {} } });
        },
        l = (t.exports = {
          KEY: r,
          NEED: !1,
          fastKey: function (t, n) {
            if (!o(t))
              return "symbol" == typeof t
                ? t
                : ("string" == typeof t ? "S" : "P") + t;
            if (!i(t, r)) {
              if (!s(t)) return "F";
              if (!n) return "E";
              f(t);
            }
            return t[r].i;
          },
          getWeak: function (t, n) {
            if (!i(t, r)) {
              if (!s(t)) return !0;
              if (!n) return !1;
              f(t);
            }
            return t[r].w;
          },
          onFreeze: function (t) {
            return a && l.NEED && s(t) && !i(t, r) && f(t), t;
          },
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(23),
        o = {};
      (o[e(0)("toStringTag")] = "z"),
        o + "" != "[object z]" &&
          e(5)(
            Object.prototype,
            "toString",
            function () {
              return "[object " + r(this) + "]";
            },
            !0
          );
    },
    function (t, n, e) {
      var r = e(24),
        o = e(0)("toStringTag"),
        i =
          "Arguments" ==
          r(
            (function () {
              return arguments;
            })()
          );
      t.exports = function (t) {
        var n, e, u;
        return void 0 === t
          ? "Undefined"
          : null === t
          ? "Null"
          : "string" ==
            typeof (e = (function (t, n) {
              try {
                return t[n];
              } catch (t) {}
            })((n = Object(t)), o))
          ? e
          : i
          ? r(n)
          : "Object" == (u = r(n)) && "function" == typeof n.callee
          ? "Arguments"
          : u;
      };
    },
    function (t, n) {
      var e = {}.toString;
      t.exports = function (t) {
        return e.call(t).slice(8, -1);
      };
    },
    function (t, n, e) {
      var r = e(3),
        o = e(2),
        i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
      (t.exports = function (t, n) {
        return i[t] || (i[t] = void 0 !== n ? n : {});
      })("versions", []).push({
        version: r.version,
        mode: e(40) ? "pure" : "global",
        copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
      });
    },
    function (t, n, e) {
      "use strict";
      var r = e(61)(!0);
      e(29)(
        String,
        "String",
        function (t) {
          (this._t = String(t)), (this._i = 0);
        },
        function () {
          var t,
            n = this._t,
            e = this._i;
          return e >= n.length
            ? { value: void 0, done: !0 }
            : ((t = r(n, e)), (this._i += t.length), { value: t, done: !1 });
        }
      );
    },
    function (t, n) {
      var e = Math.ceil,
        r = Math.floor;
      t.exports = function (t) {
        return isNaN((t = +t)) ? 0 : (t > 0 ? r : e)(t);
      };
    },
    function (t, n) {
      t.exports = function (t) {
        if (null == t) throw TypeError("Can't call method on  " + t);
        return t;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(40),
        o = e(4),
        i = e(5),
        u = e(11),
        c = e(14),
        s = e(62),
        a = e(33),
        f = e(68),
        l = e(0)("iterator"),
        p = !([].keys && "next" in [].keys()),
        h = function () {
          return this;
        };
      t.exports = function (t, n, e, d, v, y, m) {
        s(e, n, d);
        var g,
          b,
          x,
          _ = function (t) {
            if (!p && t in O) return O[t];
            switch (t) {
              case "keys":
              case "values":
                return function () {
                  return new e(this, t);
                };
            }
            return function () {
              return new e(this, t);
            };
          },
          w = n + " Iterator",
          S = "values" == v,
          E = !1,
          O = t.prototype,
          T = O[l] || O["@@iterator"] || (v && O[v]),
          A = T || _(v),
          M = v ? (S ? _("entries") : A) : void 0,
          P = ("Array" == n && O.entries) || T;
        if (
          (P &&
            (x = f(P.call(new t()))) !== Object.prototype &&
            x.next &&
            (a(x, w, !0), r || "function" == typeof x[l] || u(x, l, h)),
          S &&
            T &&
            "values" !== T.name &&
            ((E = !0),
            (A = function () {
              return T.call(this);
            })),
          (r && !m) || (!p && !E && O[l]) || u(O, l, A),
          (c[n] = A),
          (c[w] = h),
          v)
        )
          if (
            ((g = {
              values: S ? A : _("values"),
              keys: y ? A : _("keys"),
              entries: M,
            }),
            m)
          )
            for (b in g) b in O || i(O, b, g[b]);
          else o(o.P + o.F * (p || E), n, g);
        return g;
      };
    },
    function (t, n, e) {
      var r = e(64),
        o = e(46);
      t.exports =
        Object.keys ||
        function (t) {
          return r(t, o);
        };
    },
    function (t, n, e) {
      var r = e(24);
      t.exports = Object("z").propertyIsEnumerable(0)
        ? Object
        : function (t) {
            return "String" == r(t) ? t.split("") : Object(t);
          };
    },
    function (t, n, e) {
      var r = e(25)("keys"),
        o = e(16);
      t.exports = function (t) {
        return r[t] || (r[t] = o(t));
      };
    },
    function (t, n, e) {
      var r = e(6).f,
        o = e(9),
        i = e(0)("toStringTag");
      t.exports = function (t, n, e) {
        t &&
          !o((t = e ? t : t.prototype), i) &&
          r(t, i, { configurable: !0, value: n });
      };
    },
    function (t, n, e) {
      for (
        var r = e(69),
          o = e(30),
          i = e(5),
          u = e(2),
          c = e(11),
          s = e(14),
          a = e(0),
          f = a("iterator"),
          l = a("toStringTag"),
          p = s.Array,
          h = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1,
          },
          d = o(h),
          v = 0;
        v < d.length;
        v++
      ) {
        var y,
          m = d[v],
          g = h[m],
          b = u[m],
          x = b && b.prototype;
        if (x && (x[f] || c(x, f, p), x[l] || c(x, l, m), (s[m] = p), g))
          for (y in r) x[y] || i(x, y, r[y], !0);
      }
    },
    function (t, n, e) {
      var r = e(5);
      t.exports = function (t, n, e) {
        for (var o in n) r(t, o, n[o], e);
        return t;
      };
    },
    function (t, n) {
      t.exports = function (t, n, e, r) {
        if (!(t instanceof n) || (void 0 !== r && r in t))
          throw TypeError(e + ": incorrect invocation!");
        return t;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(2),
        o = e(4),
        i = e(5),
        u = e(35),
        c = e(21),
        s = e(15),
        a = e(36),
        f = e(1),
        l = e(13),
        p = e(52),
        h = e(33),
        d = e(73);
      t.exports = function (t, n, e, v, y, m) {
        var g = r[t],
          b = g,
          x = y ? "set" : "add",
          _ = b && b.prototype,
          w = {},
          S = function (t) {
            var n = _[t];
            i(
              _,
              t,
              "delete" == t
                ? function (t) {
                    return !(m && !f(t)) && n.call(this, 0 === t ? 0 : t);
                  }
                : "has" == t
                ? function (t) {
                    return !(m && !f(t)) && n.call(this, 0 === t ? 0 : t);
                  }
                : "get" == t
                ? function (t) {
                    return m && !f(t) ? void 0 : n.call(this, 0 === t ? 0 : t);
                  }
                : "add" == t
                ? function (t) {
                    return n.call(this, 0 === t ? 0 : t), this;
                  }
                : function (t, e) {
                    return n.call(this, 0 === t ? 0 : t, e), this;
                  }
            );
          };
        if (
          "function" == typeof b &&
          (m ||
            (_.forEach &&
              !l(function () {
                new b().entries().next();
              })))
        ) {
          var E = new b(),
            O = E[x](m ? {} : -0, 1) != E,
            T = l(function () {
              E.has(1);
            }),
            A = p(function (t) {
              new b(t);
            }),
            M =
              !m &&
              l(function () {
                for (var t = new b(), n = 5; n--; ) t[x](n, n);
                return !t.has(-0);
              });
          A ||
            (((b = n(function (n, e) {
              a(n, b, t);
              var r = d(new g(), n, b);
              return null != e && s(e, y, r[x], r), r;
            })).prototype = _),
            (_.constructor = b)),
            (T || M) && (S("delete"), S("has"), y && S("get")),
            (M || O) && S(x),
            m && _.clear && delete _.clear;
        } else
          (b = v.getConstructor(n, t, y, x)), u(b.prototype, e), (c.NEED = !0);
        return (
          h(b, t),
          (w[t] = b),
          o(o.G + o.W + o.F * (b != g), w),
          m || v.setStrong(b, t, y),
          b
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(4);
      t.exports = function (t) {
        r(r.S, t, {
          of: function () {
            for (var t = arguments.length, n = new Array(t); t--; )
              n[t] = arguments[t];
            return new this(n);
          },
        });
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(4),
        o = e(44),
        i = e(10),
        u = e(15);
      t.exports = function (t) {
        r(r.S, t, {
          from: function (t) {
            var n,
              e,
              r,
              c,
              s = arguments[1];
            return (
              o(this),
              (n = void 0 !== s) && o(s),
              null == t
                ? new this()
                : ((e = []),
                  n
                    ? ((r = 0),
                      (c = i(s, arguments[2], 2)),
                      u(t, !1, function (t) {
                        e.push(c(t, r++));
                      }))
                    : u(t, !1, e.push, e),
                  new this(e))
            );
          },
        });
      };
    },
    function (t, n) {
      t.exports = !1;
    },
    function (t, n, e) {
      t.exports =
        !e(8) &&
        !e(13)(function () {
          return (
            7 !=
            Object.defineProperty(e(42)("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    function (t, n, e) {
      var r = e(1),
        o = e(2).document,
        i = r(o) && r(o.createElement);
      t.exports = function (t) {
        return i ? o.createElement(t) : {};
      };
    },
    function (t, n, e) {
      var r = e(1);
      t.exports = function (t, n) {
        if (!r(t)) return t;
        var e, o;
        if (n && "function" == typeof (e = t.toString) && !r((o = e.call(t))))
          return o;
        if ("function" == typeof (e = t.valueOf) && !r((o = e.call(t))))
          return o;
        if (!n && "function" == typeof (e = t.toString) && !r((o = e.call(t))))
          return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (t, n) {
      t.exports = function (t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t;
      };
    },
    function (t, n, e) {
      var r = e(7),
        o = e(63),
        i = e(46),
        u = e(32)("IE_PROTO"),
        c = function () {},
        s = function () {
          var t,
            n = e(42)("iframe"),
            r = i.length;
          for (
            n.style.display = "none",
              e(67).appendChild(n),
              n.src = "javascript:",
              (t = n.contentWindow.document).open(),
              t.write("<script>document.F=Object</script>"),
              t.close(),
              s = t.F;
            r--;

          )
            delete s.prototype[i[r]];
          return s();
        };
      t.exports =
        Object.create ||
        function (t, n) {
          var e;
          return (
            null !== t
              ? ((c.prototype = r(t)),
                (e = new c()),
                (c.prototype = null),
                (e[u] = t))
              : (e = s()),
            void 0 === n ? e : o(e, n)
          );
        };
    },
    function (t, n) {
      t.exports =
        "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
          ","
        );
    },
    function (t, n) {
      t.exports = function (t, n) {
        return { value: n, done: !!t };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(6).f,
        o = e(45),
        i = e(35),
        u = e(10),
        c = e(36),
        s = e(15),
        a = e(29),
        f = e(47),
        l = e(72),
        p = e(8),
        h = e(21).fastKey,
        d = e(12),
        v = p ? "_s" : "size",
        y = function (t, n) {
          var e,
            r = h(n);
          if ("F" !== r) return t._i[r];
          for (e = t._f; e; e = e.n) if (e.k == n) return e;
        };
      t.exports = {
        getConstructor: function (t, n, e, a) {
          var f = t(function (t, r) {
            c(t, f, n, "_i"),
              (t._t = n),
              (t._i = o(null)),
              (t._f = void 0),
              (t._l = void 0),
              (t[v] = 0),
              null != r && s(r, e, t[a], t);
          });
          return (
            i(f.prototype, {
              clear: function () {
                for (var t = d(this, n), e = t._i, r = t._f; r; r = r.n)
                  (r.r = !0), r.p && (r.p = r.p.n = void 0), delete e[r.i];
                (t._f = t._l = void 0), (t[v] = 0);
              },
              delete: function (t) {
                var e = d(this, n),
                  r = y(e, t);
                if (r) {
                  var o = r.n,
                    i = r.p;
                  delete e._i[r.i],
                    (r.r = !0),
                    i && (i.n = o),
                    o && (o.p = i),
                    e._f == r && (e._f = o),
                    e._l == r && (e._l = i),
                    e[v]--;
                }
                return !!r;
              },
              forEach: function (t) {
                d(this, n);
                for (
                  var e,
                    r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3);
                  (e = e ? e.n : this._f);

                )
                  for (r(e.v, e.k, this); e && e.r; ) e = e.p;
              },
              has: function (t) {
                return !!y(d(this, n), t);
              },
            }),
            p &&
              r(f.prototype, "size", {
                get: function () {
                  return d(this, n)[v];
                },
              }),
            f
          );
        },
        def: function (t, n, e) {
          var r,
            o,
            i = y(t, n);
          return (
            i
              ? (i.v = e)
              : ((t._l = i =
                  {
                    i: (o = h(n, !0)),
                    k: n,
                    v: e,
                    p: (r = t._l),
                    n: void 0,
                    r: !1,
                  }),
                t._f || (t._f = i),
                r && (r.n = i),
                t[v]++,
                "F" !== o && (t._i[o] = i)),
            t
          );
        },
        getEntry: y,
        setStrong: function (t, n, e) {
          a(
            t,
            n,
            function (t, e) {
              (this._t = d(t, n)), (this._k = e), (this._l = void 0);
            },
            function () {
              for (var t = this._k, n = this._l; n && n.r; ) n = n.p;
              return this._t && (this._l = n = n ? n.n : this._t._f)
                ? f(0, "keys" == t ? n.k : "values" == t ? n.v : [n.k, n.v])
                : ((this._t = void 0), f(1));
            },
            e ? "entries" : "values",
            !e,
            !0
          ),
            l(n);
        },
      };
    },
    function (t, n, e) {
      var r = e(7);
      t.exports = function (t, n, e, o) {
        try {
          return o ? n(r(e)[0], e[1]) : n(e);
        } catch (n) {
          var i = t.return;
          throw (void 0 !== i && r(i.call(t)), n);
        }
      };
    },
    function (t, n, e) {
      var r = e(14),
        o = e(0)("iterator"),
        i = Array.prototype;
      t.exports = function (t) {
        return void 0 !== t && (r.Array === t || i[o] === t);
      };
    },
    function (t, n, e) {
      var r = e(23),
        o = e(0)("iterator"),
        i = e(14);
      t.exports = e(3).getIteratorMethod = function (t) {
        if (null != t) return t[o] || t["@@iterator"] || i[r(t)];
      };
    },
    function (t, n, e) {
      var r = e(0)("iterator"),
        o = !1;
      try {
        var i = [7][r]();
        (i.return = function () {
          o = !0;
        }),
          Array.from(i, function () {
            throw 2;
          });
      } catch (t) {}
      t.exports = function (t, n) {
        if (!n && !o) return !1;
        var e = !1;
        try {
          var i = [7],
            u = i[r]();
          (u.next = function () {
            return { done: (e = !0) };
          }),
            (i[r] = function () {
              return u;
            }),
            t(i);
        } catch (t) {}
        return e;
      };
    },
    function (t, n) {
      n.f = {}.propertyIsEnumerable;
    },
    function (t, n, e) {
      var r = e(23),
        o = e(77);
      t.exports = function (t) {
        return function () {
          if (r(this) != t) throw TypeError(t + "#toJSON isn't generic");
          return o(this);
        };
      };
    },
    function (t, n, e) {
      var r = e(10),
        o = e(31),
        i = e(20),
        u = e(19),
        c = e(87);
      t.exports = function (t, n) {
        var e = 1 == t,
          s = 2 == t,
          a = 3 == t,
          f = 4 == t,
          l = 6 == t,
          p = 5 == t || l,
          h = n || c;
        return function (n, c, d) {
          for (
            var v,
              y,
              m = i(n),
              g = o(m),
              b = r(c, d, 3),
              x = u(g.length),
              _ = 0,
              w = e ? h(n, x) : s ? h(n, 0) : void 0;
            x > _;
            _++
          )
            if ((p || _ in g) && ((y = b((v = g[_]), _, m)), t))
              if (e) w[_] = y;
              else if (y)
                switch (t) {
                  case 3:
                    return !0;
                  case 5:
                    return v;
                  case 6:
                    return _;
                  case 2:
                    w.push(v);
                }
              else if (f) return !1;
          return l ? -1 : a || f ? f : w;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(30),
        o = e(90),
        i = e(53),
        u = e(20),
        c = e(31),
        s = Object.assign;
      t.exports =
        !s ||
        e(13)(function () {
          var t = {},
            n = {},
            e = Symbol(),
            r = "abcdefghijklmnopqrst";
          return (
            (t[e] = 7),
            r.split("").forEach(function (t) {
              n[t] = t;
            }),
            7 != s({}, t)[e] || Object.keys(s({}, n)).join("") != r
          );
        })
          ? function (t, n) {
              for (
                var e = u(t), s = arguments.length, a = 1, f = o.f, l = i.f;
                s > a;

              )
                for (
                  var p,
                    h = c(arguments[a++]),
                    d = f ? r(h).concat(f(h)) : r(h),
                    v = d.length,
                    y = 0;
                  v > y;

                )
                  l.call(h, (p = d[y++])) && (e[p] = h[p]);
              return e;
            }
          : s;
    },
    function (t, n, e) {
      "use strict";
      (function (t) {
        var e = "object" == typeof t && t && t.Object === Object && t;
        n.a = e;
      }.call(this, e(99)));
    },
    function (t, n, e) {
      t.exports = e(100);
    },
    function (t, n, e) {
      e(22), e(26), e(34), e(71), e(76), e(78), e(79), (t.exports = e(3).Map);
    },
    function (t, n, e) {
      t.exports = e(25)("native-function-to-string", Function.toString);
    },
    function (t, n, e) {
      var r = e(27),
        o = e(28);
      t.exports = function (t) {
        return function (n, e) {
          var i,
            u,
            c = String(o(n)),
            s = r(e),
            a = c.length;
          return s < 0 || s >= a
            ? t
              ? ""
              : void 0
            : (i = c.charCodeAt(s)) < 55296 ||
              i > 56319 ||
              s + 1 === a ||
              (u = c.charCodeAt(s + 1)) < 56320 ||
              u > 57343
            ? t
              ? c.charAt(s)
              : i
            : t
            ? c.slice(s, s + 2)
            : u - 56320 + ((i - 55296) << 10) + 65536;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(45),
        o = e(17),
        i = e(33),
        u = {};
      e(11)(u, e(0)("iterator"), function () {
        return this;
      }),
        (t.exports = function (t, n, e) {
          (t.prototype = r(u, { next: o(1, e) })), i(t, n + " Iterator");
        });
    },
    function (t, n, e) {
      var r = e(6),
        o = e(7),
        i = e(30);
      t.exports = e(8)
        ? Object.defineProperties
        : function (t, n) {
            o(t);
            for (var e, u = i(n), c = u.length, s = 0; c > s; )
              r.f(t, (e = u[s++]), n[e]);
            return t;
          };
    },
    function (t, n, e) {
      var r = e(9),
        o = e(18),
        i = e(65)(!1),
        u = e(32)("IE_PROTO");
      t.exports = function (t, n) {
        var e,
          c = o(t),
          s = 0,
          a = [];
        for (e in c) e != u && r(c, e) && a.push(e);
        for (; n.length > s; ) r(c, (e = n[s++])) && (~i(a, e) || a.push(e));
        return a;
      };
    },
    function (t, n, e) {
      var r = e(18),
        o = e(19),
        i = e(66);
      t.exports = function (t) {
        return function (n, e, u) {
          var c,
            s = r(n),
            a = o(s.length),
            f = i(u, a);
          if (t && e != e) {
            for (; a > f; ) if ((c = s[f++]) != c) return !0;
          } else
            for (; a > f; f++)
              if ((t || f in s) && s[f] === e) return t || f || 0;
          return !t && -1;
        };
      };
    },
    function (t, n, e) {
      var r = e(27),
        o = Math.max,
        i = Math.min;
      t.exports = function (t, n) {
        return (t = r(t)) < 0 ? o(t + n, 0) : i(t, n);
      };
    },
    function (t, n, e) {
      var r = e(2).document;
      t.exports = r && r.documentElement;
    },
    function (t, n, e) {
      var r = e(9),
        o = e(20),
        i = e(32)("IE_PROTO"),
        u = Object.prototype;
      t.exports =
        Object.getPrototypeOf ||
        function (t) {
          return (
            (t = o(t)),
            r(t, i)
              ? t[i]
              : "function" == typeof t.constructor && t instanceof t.constructor
              ? t.constructor.prototype
              : t instanceof Object
              ? u
              : null
          );
        };
    },
    function (t, n, e) {
      "use strict";
      var r = e(70),
        o = e(47),
        i = e(14),
        u = e(18);
      (t.exports = e(29)(
        Array,
        "Array",
        function (t, n) {
          (this._t = u(t)), (this._i = 0), (this._k = n);
        },
        function () {
          var t = this._t,
            n = this._k,
            e = this._i++;
          return !t || e >= t.length
            ? ((this._t = void 0), o(1))
            : o(0, "keys" == n ? e : "values" == n ? t[e] : [e, t[e]]);
        },
        "values"
      )),
        (i.Arguments = i.Array),
        r("keys"),
        r("values"),
        r("entries");
    },
    function (t, n, e) {
      var r = e(0)("unscopables"),
        o = Array.prototype;
      null == o[r] && e(11)(o, r, {}),
        (t.exports = function (t) {
          o[r][t] = !0;
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(48),
        o = e(12);
      t.exports = e(37)(
        "Map",
        function (t) {
          return function () {
            return t(this, arguments.length > 0 ? arguments[0] : void 0);
          };
        },
        {
          get: function (t) {
            var n = r.getEntry(o(this, "Map"), t);
            return n && n.v;
          },
          set: function (t, n) {
            return r.def(o(this, "Map"), 0 === t ? 0 : t, n);
          },
        },
        r,
        !0
      );
    },
    function (t, n, e) {
      "use strict";
      var r = e(2),
        o = e(6),
        i = e(8),
        u = e(0)("species");
      t.exports = function (t) {
        var n = r[t];
        i &&
          n &&
          !n[u] &&
          o.f(n, u, {
            configurable: !0,
            get: function () {
              return this;
            },
          });
      };
    },
    function (t, n, e) {
      var r = e(1),
        o = e(74).set;
      t.exports = function (t, n, e) {
        var i,
          u = n.constructor;
        return (
          u !== e &&
            "function" == typeof u &&
            (i = u.prototype) !== e.prototype &&
            r(i) &&
            o &&
            o(t, i),
          t
        );
      };
    },
    function (t, n, e) {
      var r = e(1),
        o = e(7),
        i = function (t, n) {
          if ((o(t), !r(n) && null !== n))
            throw TypeError(n + ": can't set as prototype!");
        };
      t.exports = {
        set:
          Object.setPrototypeOf ||
          ("__proto__" in {}
            ? (function (t, n, r) {
                try {
                  (r = e(10)(
                    Function.call,
                    e(75).f(Object.prototype, "__proto__").set,
                    2
                  ))(t, []),
                    (n = !(t instanceof Array));
                } catch (t) {
                  n = !0;
                }
                return function (t, e) {
                  return i(t, e), n ? (t.__proto__ = e) : r(t, e), t;
                };
              })({}, !1)
            : void 0),
        check: i,
      };
    },
    function (t, n, e) {
      var r = e(53),
        o = e(17),
        i = e(18),
        u = e(43),
        c = e(9),
        s = e(41),
        a = Object.getOwnPropertyDescriptor;
      n.f = e(8)
        ? a
        : function (t, n) {
            if (((t = i(t)), (n = u(n, !0)), s))
              try {
                return a(t, n);
              } catch (t) {}
            if (c(t, n)) return o(!r.f.call(t, n), t[n]);
          };
    },
    function (t, n, e) {
      var r = e(4);
      r(r.P + r.R, "Map", { toJSON: e(54)("Map") });
    },
    function (t, n, e) {
      var r = e(15);
      t.exports = function (t, n) {
        var e = [];
        return r(t, !1, e.push, e, n), e;
      };
    },
    function (t, n, e) {
      e(38)("Map");
    },
    function (t, n, e) {
      e(39)("Map");
    },
    function (t, n, e) {
      e(22), e(26), e(34), e(81), e(82), e(83), e(84), (t.exports = e(3).Set);
    },
    function (t, n, e) {
      "use strict";
      var r = e(48),
        o = e(12);
      t.exports = e(37)(
        "Set",
        function (t) {
          return function () {
            return t(this, arguments.length > 0 ? arguments[0] : void 0);
          };
        },
        {
          add: function (t) {
            return r.def(o(this, "Set"), (t = 0 === t ? 0 : t), t);
          },
        },
        r
      );
    },
    function (t, n, e) {
      var r = e(4);
      r(r.P + r.R, "Set", { toJSON: e(54)("Set") });
    },
    function (t, n, e) {
      e(38)("Set");
    },
    function (t, n, e) {
      e(39)("Set");
    },
    function (t, n, e) {
      e(22), e(34), e(86), e(92), e(93), (t.exports = e(3).WeakMap);
    },
    function (t, n, e) {
      "use strict";
      var r,
        o = e(2),
        i = e(55)(0),
        u = e(5),
        c = e(21),
        s = e(56),
        a = e(91),
        f = e(1),
        l = e(12),
        p = e(12),
        h = !o.ActiveXObject && "ActiveXObject" in o,
        d = c.getWeak,
        v = Object.isExtensible,
        y = a.ufstore,
        m = function (t) {
          return function () {
            return t(this, arguments.length > 0 ? arguments[0] : void 0);
          };
        },
        g = {
          get: function (t) {
            if (f(t)) {
              var n = d(t);
              return !0 === n
                ? y(l(this, "WeakMap")).get(t)
                : n
                ? n[this._i]
                : void 0;
            }
          },
          set: function (t, n) {
            return a.def(l(this, "WeakMap"), t, n);
          },
        },
        b = (t.exports = e(37)("WeakMap", m, g, a, !0, !0));
      p &&
        h &&
        (s((r = a.getConstructor(m, "WeakMap")).prototype, g),
        (c.NEED = !0),
        i(["delete", "has", "get", "set"], function (t) {
          var n = b.prototype,
            e = n[t];
          u(n, t, function (n, o) {
            if (f(n) && !v(n)) {
              this._f || (this._f = new r());
              var i = this._f[t](n, o);
              return "set" == t ? this : i;
            }
            return e.call(this, n, o);
          });
        }));
    },
    function (t, n, e) {
      var r = e(88);
      t.exports = function (t, n) {
        return new (r(t))(n);
      };
    },
    function (t, n, e) {
      var r = e(1),
        o = e(89),
        i = e(0)("species");
      t.exports = function (t) {
        var n;
        return (
          o(t) &&
            ("function" != typeof (n = t.constructor) ||
              (n !== Array && !o(n.prototype)) ||
              (n = void 0),
            r(n) && null === (n = n[i]) && (n = void 0)),
          void 0 === n ? Array : n
        );
      };
    },
    function (t, n, e) {
      var r = e(24);
      t.exports =
        Array.isArray ||
        function (t) {
          return "Array" == r(t);
        };
    },
    function (t, n) {
      n.f = Object.getOwnPropertySymbols;
    },
    function (t, n, e) {
      "use strict";
      var r = e(35),
        o = e(21).getWeak,
        i = e(7),
        u = e(1),
        c = e(36),
        s = e(15),
        a = e(55),
        f = e(9),
        l = e(12),
        p = a(5),
        h = a(6),
        d = 0,
        v = function (t) {
          return t._l || (t._l = new y());
        },
        y = function () {
          this.a = [];
        },
        m = function (t, n) {
          return p(t.a, function (t) {
            return t[0] === n;
          });
        };
      (y.prototype = {
        get: function (t) {
          var n = m(this, t);
          if (n) return n[1];
        },
        has: function (t) {
          return !!m(this, t);
        },
        set: function (t, n) {
          var e = m(this, t);
          e ? (e[1] = n) : this.a.push([t, n]);
        },
        delete: function (t) {
          var n = h(this.a, function (n) {
            return n[0] === t;
          });
          return ~n && this.a.splice(n, 1), !!~n;
        },
      }),
        (t.exports = {
          getConstructor: function (t, n, e, i) {
            var a = t(function (t, r) {
              c(t, a, n, "_i"),
                (t._t = n),
                (t._i = d++),
                (t._l = void 0),
                null != r && s(r, e, t[i], t);
            });
            return (
              r(a.prototype, {
                delete: function (t) {
                  if (!u(t)) return !1;
                  var e = o(t);
                  return !0 === e
                    ? v(l(this, n)).delete(t)
                    : e && f(e, this._i) && delete e[this._i];
                },
                has: function (t) {
                  if (!u(t)) return !1;
                  var e = o(t);
                  return !0 === e ? v(l(this, n)).has(t) : e && f(e, this._i);
                },
              }),
              a
            );
          },
          def: function (t, n, e) {
            var r = o(i(n), !0);
            return !0 === r ? v(t).set(n, e) : (r[t._i] = e), t;
          },
          ufstore: v,
        });
    },
    function (t, n, e) {
      e(38)("WeakMap");
    },
    function (t, n, e) {
      e(39)("WeakMap");
    },
    function (t, n, e) {
      e(26), e(95), (t.exports = e(3).Array.from);
    },
    function (t, n, e) {
      "use strict";
      var r = e(10),
        o = e(4),
        i = e(20),
        u = e(49),
        c = e(50),
        s = e(19),
        a = e(96),
        f = e(51);
      o(
        o.S +
          o.F *
            !e(52)(function (t) {
              Array.from(t);
            }),
        "Array",
        {
          from: function (t) {
            var n,
              e,
              o,
              l,
              p = i(t),
              h = "function" == typeof this ? this : Array,
              d = arguments.length,
              v = d > 1 ? arguments[1] : void 0,
              y = void 0 !== v,
              m = 0,
              g = f(p);
            if (
              (y && (v = r(v, d > 2 ? arguments[2] : void 0, 2)),
              null == g || (h == Array && c(g)))
            )
              for (e = new h((n = s(p.length))); n > m; m++)
                a(e, m, y ? v(p[m], m) : p[m]);
            else
              for (l = g.call(p), e = new h(); !(o = l.next()).done; m++)
                a(e, m, y ? u(l, v, [o.value, m], !0) : o.value);
            return (e.length = m), e;
          },
        }
      );
    },
    function (t, n, e) {
      "use strict";
      var r = e(6),
        o = e(17);
      t.exports = function (t, n, e) {
        n in t ? r.f(t, n, o(0, e)) : (t[n] = e);
      };
    },
    function (t, n, e) {
      e(98), (t.exports = e(3).Object.assign);
    },
    function (t, n, e) {
      var r = e(4);
      r(r.S + r.F, "Object", { assign: e(56) });
    },
    function (t, n) {
      var e;
      e = (function () {
        return this;
      })();
      try {
        e = e || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (e = window);
      }
      t.exports = e;
    },
    function (t, n, e) {
      "use strict";
      e.r(n);
      var r = {};
      e.r(r),
        e.d(r, "keyboardHandler", function () {
          return et;
        }),
        e.d(r, "mouseHandler", function () {
          return rt;
        }),
        e.d(r, "resizeHandler", function () {
          return ot;
        }),
        e.d(r, "selectHandler", function () {
          return it;
        }),
        e.d(r, "touchHandler", function () {
          return ut;
        }),
        e.d(r, "wheelHandler", function () {
          return ct;
        });
      /*! *****************************************************************************
        Copyright (c) Microsoft Corporation. All rights reserved.
        Licensed under the Apache License, Version 2.0 (the "License"); you may not use
        this file except in compliance with the License. You may obtain a copy of the
        License at http://www.apache.org/licenses/LICENSE-2.0
    
        THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
        WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
        MERCHANTABLITY OR NON-INFRINGEMENT.
    
        See the Apache Version 2.0 License for specific language governing permissions
        and limitations under the License.
        ***************************************************************************** */
      var o = function (t, n) {
          return (o =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, n) {
                t.__proto__ = n;
              }) ||
            function (t, n) {
              for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
            })(t, n);
        },
        i = function () {
          return (i =
            Object.assign ||
            function (t) {
              for (var n, e = 1, r = arguments.length; e < r; e++)
                for (var o in (n = arguments[e]))
                  Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
              return t;
            }).apply(this, arguments);
        };
      function u(t, n, e, r) {
        var o,
          i = arguments.length,
          u =
            i < 3
              ? n
              : null === r
              ? (r = Object.getOwnPropertyDescriptor(n, e))
              : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          u = Reflect.decorate(t, n, e, r);
        else
          for (var c = t.length - 1; c >= 0; c--)
            (o = t[c]) &&
              (u = (i < 3 ? o(u) : i > 3 ? o(n, e, u) : o(n, e)) || u);
        return i > 3 && u && Object.defineProperty(n, e, u), u;
      }
      e(59), e(80), e(85), e(94), e(97);
      var c = function (t) {
          var n = typeof t;
          return null != t && ("object" == n || "function" == n);
        },
        s = e(57),
        a = "object" == typeof self && self && self.Object === Object && self,
        f = s.a || a || Function("return this")(),
        l = f.Symbol,
        p = Object.prototype,
        h = p.hasOwnProperty,
        d = p.toString,
        v = l ? l.toStringTag : void 0,
        y = Object.prototype.toString,
        m = l ? l.toStringTag : void 0,
        g = function (t) {
          return null == t
            ? void 0 === t
              ? "[object Undefined]"
              : "[object Null]"
            : m && m in Object(t)
            ? (function (t) {
                var n = h.call(t, v),
                  e = t[v];
                try {
                  t[v] = void 0;
                  var r = !0;
                } catch (t) {}
                var o = d.call(t);
                return r && (n ? (t[v] = e) : delete t[v]), o;
              })(t)
            : (function (t) {
                return y.call(t);
              })(t);
        },
        b = /^\s+|\s+$/g,
        x = /^[-+]0x[0-9a-f]+$/i,
        _ = /^0b[01]+$/i,
        w = /^0o[0-7]+$/i,
        S = parseInt,
        E = function (t) {
          if ("number" == typeof t) return t;
          if (
            (function (t) {
              return (
                "symbol" == typeof t ||
                ((function (t) {
                  return null != t && "object" == typeof t;
                })(t) &&
                  "[object Symbol]" == g(t))
              );
            })(t)
          )
            return NaN;
          if (c(t)) {
            var n = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = c(n) ? n + "" : n;
          }
          if ("string" != typeof t) return 0 === t ? t : +t;
          t = t.replace(b, "");
          var e = _.test(t);
          return e || w.test(t)
            ? S(t.slice(2), e ? 2 : 8)
            : x.test(t)
            ? NaN
            : +t;
        },
        O = function (t, n, e) {
          return (
            void 0 === e && ((e = n), (n = void 0)),
            void 0 !== e && (e = (e = E(e)) == e ? e : 0),
            void 0 !== n && (n = (n = E(n)) == n ? n : 0),
            (function (t, n, e) {
              return (
                t == t &&
                  (void 0 !== e && (t = t <= e ? t : e),
                  void 0 !== n && (t = t >= n ? t : n)),
                t
              );
            })(E(t), n, e)
          );
        };
      function T(t, n) {
        return (
          void 0 === t && (t = -1 / 0),
          void 0 === n && (n = 1 / 0),
          function (e, r) {
            var o = "_" + r;
            Object.defineProperty(e, r, {
              get: function () {
                return this[o];
              },
              set: function (e) {
                Object.defineProperty(this, o, {
                  value: O(e, t, n),
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                });
              },
              enumerable: !0,
              configurable: !0,
            });
          }
        );
      }
      function A(t, n) {
        var e = "_" + n;
        Object.defineProperty(t, n, {
          get: function () {
            return this[e];
          },
          set: function (t) {
            Object.defineProperty(this, e, {
              value: !!t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            });
          },
          enumerable: !0,
          configurable: !0,
        });
      }
      var M = function () {
          return f.Date.now();
        },
        P = Math.max,
        j = Math.min,
        k = function (t, n, e) {
          var r,
            o,
            i,
            u,
            s,
            a,
            f = 0,
            l = !1,
            p = !1,
            h = !0;
          if ("function" != typeof t)
            throw new TypeError("Expected a function");
          function d(n) {
            var e = r,
              i = o;
            return (r = o = void 0), (f = n), (u = t.apply(i, e));
          }
          function v(t) {
            var e = t - a;
            return void 0 === a || e >= n || e < 0 || (p && t - f >= i);
          }
          function y() {
            var t = M();
            if (v(t)) return m(t);
            s = setTimeout(
              y,
              (function (t) {
                var e = n - (t - a);
                return p ? j(e, i - (t - f)) : e;
              })(t)
            );
          }
          function m(t) {
            return (s = void 0), h && r ? d(t) : ((r = o = void 0), u);
          }
          function g() {
            var t = M(),
              e = v(t);
            if (((r = arguments), (o = this), (a = t), e)) {
              if (void 0 === s)
                return (function (t) {
                  return (f = t), (s = setTimeout(y, n)), l ? d(t) : u;
                })(a);
              if (p) return (s = setTimeout(y, n)), d(a);
            }
            return void 0 === s && (s = setTimeout(y, n)), u;
          }
          return (
            (n = E(n) || 0),
            c(e) &&
              ((l = !!e.leading),
              (i = (p = "maxWait" in e) ? P(E(e.maxWait) || 0, n) : i),
              (h = "trailing" in e ? !!e.trailing : h)),
            (g.cancel = function () {
              void 0 !== s && clearTimeout(s),
                (f = 0),
                (r = a = o = s = void 0);
            }),
            (g.flush = function () {
              return void 0 === s ? u : m(M());
            }),
            g
          );
        };
      function D() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        return function (n, e, r) {
          var o = r.value;
          return {
            get: function () {
              return (
                this.hasOwnProperty(e) ||
                  Object.defineProperty(this, e, {
                    value: k.apply(void 0, [o].concat(t)),
                  }),
                this[e]
              );
            },
          };
        };
      }
      var L,
        N = (function () {
          function t(t) {
            var n = this;
            void 0 === t && (t = {}),
              (this.damping = 0.1),
              (this.thumbMinSize = 20),
              (this.renderByPixels = !0),
              (this.alwaysShowTracks = !1),
              (this.continuousScrolling = !0),
              (this.delegateTo = null),
              (this.plugins = {}),
              Object.keys(t).forEach(function (e) {
                n[e] = t[e];
              });
          }
          return (
            Object.defineProperty(t.prototype, "wheelEventTarget", {
              get: function () {
                return this.delegateTo;
              },
              set: function (t) {
                console.warn(
                  "[smooth-scrollbar]: `options.wheelEventTarget` is deprecated and will be removed in the future, use `options.delegateTo` instead."
                ),
                  (this.delegateTo = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            u([T(0, 1)], t.prototype, "damping", void 0),
            u([T(0, 1 / 0)], t.prototype, "thumbMinSize", void 0),
            u([A], t.prototype, "renderByPixels", void 0),
            u([A], t.prototype, "alwaysShowTracks", void 0),
            u([A], t.prototype, "continuousScrolling", void 0),
            t
          );
        })(),
        z = new WeakMap();
      function C() {
        if (void 0 !== L) return L;
        var t = !1;
        try {
          var n = function () {},
            e = Object.defineProperty({}, "passive", {
              get: function () {
                t = !0;
              },
            });
          window.addEventListener("testPassive", n, e),
            window.removeEventListener("testPassive", n, e);
        } catch (t) {}
        return (L = !!t && { passive: !1 });
      }
      function R(t) {
        var n = z.get(t) || [];
        return (
          z.set(t, n),
          function (t, e, r) {
            function o(t) {
              t.defaultPrevented || r(t);
            }
            e.split(/\s+/g).forEach(function (e) {
              n.push({ elem: t, eventName: e, handler: o }),
                t.addEventListener(e, o, C());
            });
          }
        );
      }
      function F(t) {
        var n = (function (t) {
          return t.touches ? t.touches[t.touches.length - 1] : t;
        })(t);
        return { x: n.clientX, y: n.clientY };
      }
      function I(t, n) {
        return (
          void 0 === n && (n = []),
          n.some(function (n) {
            return t === n;
          })
        );
      }
      var W = ["webkit", "moz", "ms", "o"],
        H = new RegExp("^-(?!(?:" + W.join("|") + ")-)");
      function B(t, n) {
        (n = (function (t) {
          var n = {};
          return (
            Object.keys(t).forEach(function (e) {
              if (H.test(e)) {
                var r = t[e];
                (e = e.replace(/^-/, "")),
                  (n[e] = r),
                  W.forEach(function (t) {
                    n["-" + t + "-" + e] = r;
                  });
              } else n[e] = t[e];
            }),
            n
          );
        })(n)),
          Object.keys(n).forEach(function (e) {
            var r = e.replace(/^-/, "").replace(/-([a-z])/g, function (t, n) {
              return n.toUpperCase();
            });
            t.style[r] = n[e];
          });
      }
      var G,
        X = (function () {
          function t(t) {
            (this.updateTime = Date.now()),
              (this.delta = { x: 0, y: 0 }),
              (this.velocity = { x: 0, y: 0 }),
              (this.lastPosition = { x: 0, y: 0 }),
              (this.lastPosition = F(t));
          }
          return (
            (t.prototype.update = function (t) {
              var n = this.velocity,
                e = this.updateTime,
                r = this.lastPosition,
                o = Date.now(),
                i = F(t),
                u = { x: -(i.x - r.x), y: -(i.y - r.y) },
                c = o - e || 16,
                s = (u.x / c) * 16,
                a = (u.y / c) * 16;
              (n.x = 0.9 * s + 0.1 * n.x),
                (n.y = 0.9 * a + 0.1 * n.y),
                (this.delta = u),
                (this.updateTime = o),
                (this.lastPosition = i);
            }),
            t
          );
        })(),
        V = (function () {
          function t() {
            this._touchList = {};
          }
          return (
            Object.defineProperty(t.prototype, "_primitiveValue", {
              get: function () {
                return { x: 0, y: 0 };
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.isActive = function () {
              return void 0 !== this._activeTouchID;
            }),
            (t.prototype.getDelta = function () {
              var t = this._getActiveTracker();
              return t ? i({}, t.delta) : this._primitiveValue;
            }),
            (t.prototype.getVelocity = function () {
              var t = this._getActiveTracker();
              return t ? i({}, t.velocity) : this._primitiveValue;
            }),
            (t.prototype.track = function (t) {
              var n = this,
                e = t.targetTouches;
              return (
                Array.from(e).forEach(function (t) {
                  n._add(t);
                }),
                this._touchList
              );
            }),
            (t.prototype.update = function (t) {
              var n = this,
                e = t.touches,
                r = t.changedTouches;
              return (
                Array.from(e).forEach(function (t) {
                  n._renew(t);
                }),
                this._setActiveID(r),
                this._touchList
              );
            }),
            (t.prototype.release = function (t) {
              var n = this;
              delete this._activeTouchID,
                Array.from(t.changedTouches).forEach(function (t) {
                  n._delete(t);
                });
            }),
            (t.prototype._add = function (t) {
              if (!this._has(t)) {
                var n = new X(t);
                this._touchList[t.identifier] = n;
              }
            }),
            (t.prototype._renew = function (t) {
              this._has(t) && this._touchList[t.identifier].update(t);
            }),
            (t.prototype._delete = function (t) {
              delete this._touchList[t.identifier];
            }),
            (t.prototype._has = function (t) {
              return this._touchList.hasOwnProperty(t.identifier);
            }),
            (t.prototype._setActiveID = function (t) {
              this._activeTouchID = t[t.length - 1].identifier;
            }),
            (t.prototype._getActiveTracker = function () {
              return this._touchList[this._activeTouchID];
            }),
            t
          );
        })();
      !(function (t) {
        (t.X = "x"), (t.Y = "y");
      })(G || (G = {}));
      var U = (function () {
          function t(t, n) {
            void 0 === n && (n = 0),
              (this._direction = t),
              (this._minSize = n),
              (this.element = document.createElement("div")),
              (this.displaySize = 0),
              (this.realSize = 0),
              (this.offset = 0),
              (this.element.className = "scrollbar-thumb scrollbar-thumb-" + t);
          }
          return (
            (t.prototype.attachTo = function (t) {
              t.appendChild(this.element);
            }),
            (t.prototype.update = function (t, n, e) {
              (this.realSize = Math.min(n / e, 1) * n),
                (this.displaySize = Math.max(this.realSize, this._minSize)),
                (this.offset =
                  (t / e) * (n + (this.realSize - this.displaySize))),
                B(this.element, this._getStyle());
            }),
            (t.prototype._getStyle = function () {
              switch (this._direction) {
                case G.X:
                  return {
                    width: this.displaySize + "px",
                    "-transform": "translate3d(" + this.offset + "px, 0, 0)",
                  };
                case G.Y:
                  return {
                    height: this.displaySize + "px",
                    "-transform": "translate3d(0, " + this.offset + "px, 0)",
                  };
                default:
                  return null;
              }
            }),
            t
          );
        })(),
        Y = (function () {
          function t(t, n) {
            void 0 === n && (n = 0),
              (this.element = document.createElement("div")),
              (this._isShown = !1),
              (this.element.className = "scrollbar-track scrollbar-track-" + t),
              (this.thumb = new U(t, n)),
              this.thumb.attachTo(this.element);
          }
          return (
            (t.prototype.attachTo = function (t) {
              t.appendChild(this.element);
            }),
            (t.prototype.show = function () {
              this._isShown ||
                ((this._isShown = !0), this.element.classList.add("show"));
            }),
            (t.prototype.hide = function () {
              this._isShown &&
                ((this._isShown = !1), this.element.classList.remove("show"));
            }),
            (t.prototype.update = function (t, n, e) {
              B(this.element, { display: e <= n ? "none" : "block" }),
                this.thumb.update(t, n, e);
            }),
            t
          );
        })(),
        q = (function () {
          function t(t) {
            this._scrollbar = t;
            var n = t.options.thumbMinSize;
            (this.xAxis = new Y(G.X, n)),
              (this.yAxis = new Y(G.Y, n)),
              this.xAxis.attachTo(t.containerEl),
              this.yAxis.attachTo(t.containerEl),
              t.options.alwaysShowTracks &&
                (this.xAxis.show(), this.yAxis.show());
          }
          return (
            (t.prototype.update = function () {
              var t = this._scrollbar,
                n = t.size,
                e = t.offset;
              this.xAxis.update(e.x, n.container.width, n.content.width),
                this.yAxis.update(e.y, n.container.height, n.content.height);
            }),
            (t.prototype.autoHideOnIdle = function () {
              this._scrollbar.options.alwaysShowTracks ||
                (this.xAxis.hide(), this.yAxis.hide());
            }),
            u([D(300)], t.prototype, "autoHideOnIdle", null),
            t
          );
        })(),
        K = new WeakMap();
      function $(t) {
        return Math.pow(t - 1, 3) + 1;
      }
      var J,
        Q,
        Z,
        tt = (function () {
          function t(t, n) {
            var e = this.constructor;
            (this.scrollbar = t),
              (this.name = e.pluginName),
              (this.options = i({}, e.defaultOptions, n));
          }
          return (
            (t.prototype.onInit = function () {}),
            (t.prototype.onDestory = function () {}),
            (t.prototype.onUpdate = function () {}),
            (t.prototype.onRender = function (t) {}),
            (t.prototype.transformDelta = function (t, n) {
              return i({}, t);
            }),
            (t.pluginName = ""),
            (t.defaultOptions = {}),
            t
          );
        })(),
        nt = { order: new Set(), constructors: {} };
      function et(t) {
        var n = R(t),
          e = t.containerEl;
        n(e, "keydown", function (n) {
          var r = document.activeElement;
          if (
            (r === e || e.contains(r)) &&
            !(function (t) {
              return (
                ("INPUT" === t.tagName || "TEXTAREA" === t.tagName) &&
                !t.disabled
              );
            })(r)
          ) {
            var o = (function (t, n) {
              var e = t.size,
                r = t.limit,
                o = t.offset;
              switch (n) {
                case J.TAB:
                  return (function (t) {
                    requestAnimationFrame(function () {
                      t.scrollIntoView(document.activeElement, {
                        offsetTop: t.size.container.height / 2,
                        onlyScrollIfNeeded: !0,
                      });
                    });
                  })(t);
                case J.SPACE:
                  return [0, 200];
                case J.PAGE_UP:
                  return [0, 40 - e.container.height];
                case J.PAGE_DOWN:
                  return [0, e.container.height - 40];
                case J.END:
                  return [0, r.y - o.y];
                case J.HOME:
                  return [0, -o.y];
                case J.LEFT:
                  return [-40, 0];
                case J.UP:
                  return [0, -40];
                case J.RIGHT:
                  return [40, 0];
                case J.DOWN:
                  return [0, 40];
                default:
                  return null;
              }
            })(t, n.keyCode || n.which);
            if (o) {
              var i = o[0],
                u = o[1];
              t.addTransformableMomentum(i, u, n, function (e) {
                e
                  ? n.preventDefault()
                  : (t.containerEl.blur(),
                    t.parent && t.parent.containerEl.focus());
              });
            }
          }
        });
      }
      function rt(t) {
        var n,
          e,
          r,
          o,
          i,
          u = R(t),
          c = t.containerEl,
          s = t.track,
          a = s.xAxis,
          f = s.yAxis;
        function l(n, e) {
          var r = t.size;
          return n === Q.X
            ? (e /
                (r.container.width +
                  (a.thumb.realSize - a.thumb.displaySize))) *
                r.content.width
            : n === Q.Y
            ? (e /
                (r.container.height +
                  (f.thumb.realSize - f.thumb.displaySize))) *
              r.content.height
            : 0;
        }
        function p(t) {
          return I(t, [a.element, a.thumb.element])
            ? Q.X
            : I(t, [f.element, f.thumb.element])
            ? Q.Y
            : void 0;
        }
        u(c, "click", function (n) {
          if (!e && I(n.target, [a.element, f.element])) {
            var r = n.target,
              o = p(r),
              i = r.getBoundingClientRect(),
              u = F(n),
              c = t.offset,
              s = t.limit;
            if (o === Q.X) {
              var h = u.x - i.left - a.thumb.displaySize / 2;
              t.setMomentum(O(l(o, h) - c.x, -c.x, s.x - c.x), 0);
            }
            o === Q.Y &&
              ((h = u.y - i.top - f.thumb.displaySize / 2),
              t.setMomentum(0, O(l(o, h) - c.y, -c.y, s.y - c.y)));
          }
        }),
          u(c, "mousedown", function (e) {
            if (I(e.target, [a.thumb.element, f.thumb.element])) {
              n = !0;
              var u = e.target,
                s = F(e),
                l = u.getBoundingClientRect();
              (o = p(u)),
                (r = { x: s.x - l.left, y: s.y - l.top }),
                (i = c.getBoundingClientRect()),
                B(t.containerEl, { "-user-select": "none" });
            }
          }),
          u(window, "mousemove", function (u) {
            if (n) {
              e = !0;
              var c = t.offset,
                s = F(u);
              if (o === Q.X) {
                var a = s.x - r.x - i.left;
                t.setPosition(l(o, a), c.y);
              }
              o === Q.Y &&
                ((a = s.y - r.y - i.top), t.setPosition(c.x, l(o, a)));
            }
          }),
          u(window, "mouseup blur", function () {
            (n = e = !1), B(t.containerEl, { "-user-select": "" });
          });
      }
      function ot(t) {
        R(t)(window, "resize", k(t.update.bind(t), 300));
      }
      function it(t) {
        var n,
          e = R(t),
          r = t.containerEl,
          o = t.contentEl,
          i = t.offset,
          u = t.limit,
          c = !1;
        e(window, "mousemove", function (e) {
          c &&
            (cancelAnimationFrame(n),
            (function e(r) {
              var o = r.x,
                c = r.y;
              (o || c) &&
                (t.setMomentum(
                  O(i.x + o, 0, u.x) - i.x,
                  O(i.y + c, 0, u.y) - i.y
                ),
                (n = requestAnimationFrame(function () {
                  e({ x: o, y: c });
                })));
            })(
              (function (t, n) {
                var e = t.bounding,
                  r = e.top,
                  o = e.right,
                  i = e.bottom,
                  u = e.left,
                  c = F(n),
                  s = c.x,
                  a = c.y,
                  f = { x: 0, y: 0 };
                return 0 === s && 0 === a
                  ? f
                  : (s > o - 20
                      ? (f.x = s - o + 20)
                      : s < u + 20 && (f.x = s - u - 20),
                    a > i - 20
                      ? (f.y = a - i + 20)
                      : a < r + 20 && (f.y = a - r - 20),
                    (f.x *= 2),
                    (f.y *= 2),
                    f);
              })(t, e)
            ));
        }),
          e(o, "selectstart", function (t) {
            t.stopPropagation(), cancelAnimationFrame(n), (c = !0);
          }),
          e(window, "mouseup blur", function () {
            cancelAnimationFrame(n), (c = !1);
          }),
          e(r, "scroll", function (t) {
            t.preventDefault(), (r.scrollTop = r.scrollLeft = 0);
          });
      }
      function ut(t) {
        var n,
          e = /Android/.test(navigator.userAgent) ? 3 : 2,
          r = t.options.delegateTo || t.containerEl,
          o = new V(),
          i = R(t),
          u = 0;
        i(r, "touchstart", function (e) {
          o.track(e),
            t.setMomentum(0, 0),
            0 === u &&
              ((n = t.options.damping), (t.options.damping = Math.max(n, 0.5))),
            u++;
        }),
          i(r, "touchmove", function (n) {
            if (!Z || Z === t) {
              o.update(n);
              var e = o.getDelta(),
                r = e.x,
                i = e.y;
              t.addTransformableMomentum(r, i, n, function (e) {
                e && (n.preventDefault(), (Z = t));
              });
            }
          }),
          i(r, "touchcancel touchend", function (r) {
            var i = o.getVelocity(),
              c = { x: 0, y: 0 };
            Object.keys(i).forEach(function (t) {
              var r = i[t] / n;
              c[t] = Math.abs(r) < 50 ? 0 : r * e;
            }),
              t.addTransformableMomentum(c.x, c.y, r),
              0 == --u && (t.options.damping = n),
              o.release(r),
              (Z = null);
          });
      }
      function ct(t) {
        R(t)(
          t.options.delegateTo || t.containerEl,
          "onwheel" in window ||
            document.implementation.hasFeature("Events.wheel", "3.0")
            ? "wheel"
            : "mousewheel",
          function (n) {
            var e = (function (t) {
                if ("deltaX" in t) {
                  var n = ft(t.deltaMode);
                  return {
                    x: (t.deltaX / st.STANDARD) * n,
                    y: (t.deltaY / st.STANDARD) * n,
                  };
                }
                return "wheelDeltaX" in t
                  ? {
                      x: t.wheelDeltaX / st.OTHERS,
                      y: t.wheelDeltaY / st.OTHERS,
                    }
                  : { x: 0, y: t.wheelDelta / st.OTHERS };
              })(n),
              r = e.x,
              o = e.y;
            t.addTransformableMomentum(r, o, n, function (t) {
              t && n.preventDefault();
            });
          }
        );
      }
      !(function (t) {
        (t[(t.TAB = 9)] = "TAB"),
          (t[(t.SPACE = 32)] = "SPACE"),
          (t[(t.PAGE_UP = 33)] = "PAGE_UP"),
          (t[(t.PAGE_DOWN = 34)] = "PAGE_DOWN"),
          (t[(t.END = 35)] = "END"),
          (t[(t.HOME = 36)] = "HOME"),
          (t[(t.LEFT = 37)] = "LEFT"),
          (t[(t.UP = 38)] = "UP"),
          (t[(t.RIGHT = 39)] = "RIGHT"),
          (t[(t.DOWN = 40)] = "DOWN");
      })(J || (J = {})),
        (function (t) {
          (t[(t.X = 0)] = "X"), (t[(t.Y = 1)] = "Y");
        })(Q || (Q = {}));
      var st = { STANDARD: 1, OTHERS: -3 },
        at = [1, 28, 500],
        ft = function (t) {
          return at[t] || at[0];
        },
        lt = new Map(),
        pt = (function () {
          function t(t, n) {
            var e = this;
            (this.offset = { x: 0, y: 0 }),
              (this.limit = { x: 1 / 0, y: 1 / 0 }),
              (this.bounding = { top: 0, right: 0, bottom: 0, left: 0 }),
              (this._plugins = []),
              (this._momentum = { x: 0, y: 0 }),
              (this._listeners = new Set()),
              (this.containerEl = t);
            var r = (this.contentEl = document.createElement("div"));
            (this.options = new N(n)),
              t.setAttribute("data-scrollbar", "true"),
              t.setAttribute("tabindex", "-1"),
              B(t, { overflow: "hidden", outline: "none" }),
              window.navigator.msPointerEnabled &&
                (t.style.msTouchAction = "none"),
              (r.className = "scroll-content"),
              Array.from(t.childNodes).forEach(function (t) {
                r.appendChild(t);
              }),
              t.appendChild(r),
              (this.track = new q(this)),
              (this.size = this.getSize()),
              (this._plugins = (function (t, n) {
                return Array.from(nt.order)
                  .filter(function (t) {
                    return !1 !== n[t];
                  })
                  .map(function (e) {
                    var r = new (0, nt.constructors[e])(t, n[e]);
                    return (n[e] = r.options), r;
                  });
              })(this, this.options.plugins));
            var o = t.scrollLeft,
              i = t.scrollTop;
            (t.scrollLeft = t.scrollTop = 0),
              this.setPosition(o, i, { withoutCallbacks: !0 });
            var u = window,
              c =
                u.MutationObserver ||
                u.WebKitMutationObserver ||
                u.MozMutationObserver;
            "function" == typeof c &&
              ((this._observer = new c(function () {
                e.update();
              })),
              this._observer.observe(r, { subtree: !0, childList: !0 })),
              lt.set(t, this),
              requestAnimationFrame(function () {
                e._init();
              });
          }
          return (
            Object.defineProperty(t.prototype, "parent", {
              get: function () {
                for (var t = this.containerEl.parentElement; t; ) {
                  var n = lt.get(t);
                  if (n) return n;
                  t = t.parentElement;
                }
                return null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "scrollTop", {
              get: function () {
                return this.offset.y;
              },
              set: function (t) {
                this.setPosition(this.scrollLeft, t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "scrollLeft", {
              get: function () {
                return this.offset.x;
              },
              set: function (t) {
                this.setPosition(t, this.scrollTop);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.getSize = function () {
              return (
                (n = (t = this).containerEl),
                (e = t.contentEl),
                {
                  container: { width: n.clientWidth, height: n.clientHeight },
                  content: {
                    width: e.offsetWidth - e.clientWidth + e.scrollWidth,
                    height: e.offsetHeight - e.clientHeight + e.scrollHeight,
                  },
                }
              );
              var t, n, e;
            }),
            (t.prototype.update = function () {
              var t, n, e, r, o;
              (n = (t = this).getSize()),
                (e = {
                  x: Math.max(n.content.width - n.container.width, 0),
                  y: Math.max(n.content.height - n.container.height, 0),
                }),
                (r = t.containerEl.getBoundingClientRect()),
                (o = {
                  top: Math.max(r.top, 0),
                  right: Math.min(r.right, window.innerWidth),
                  bottom: Math.min(r.bottom, window.innerHeight),
                  left: Math.max(r.left, 0),
                }),
                (t.size = n),
                (t.limit = e),
                (t.bounding = o),
                t.track.update(),
                t.setPosition(),
                this._plugins.forEach(function (t) {
                  t.onUpdate();
                });
            }),
            (t.prototype.isVisible = function (t) {
              return (function (t, n) {
                var e = t.bounding,
                  r = n.getBoundingClientRect(),
                  o = Math.max(e.top, r.top),
                  i = Math.max(e.left, r.left),
                  u = Math.min(e.right, r.right);
                return o < Math.min(e.bottom, r.bottom) && i < u;
              })(this, t);
            }),
            (t.prototype.setPosition = function (t, n, e) {
              var r = this;
              void 0 === t && (t = this.offset.x),
                void 0 === n && (n = this.offset.y),
                void 0 === e && (e = {});
              var o = (function (t, n, e) {
                var r = t.options,
                  o = t.offset,
                  u = t.limit,
                  c = t.track,
                  s = t.contentEl;
                return (
                  r.renderByPixels &&
                    ((n = Math.round(n)), (e = Math.round(e))),
                  (n = O(n, 0, u.x)),
                  (e = O(e, 0, u.y)),
                  n !== o.x && c.xAxis.show(),
                  e !== o.y && c.yAxis.show(),
                  r.alwaysShowTracks || c.autoHideOnIdle(),
                  n === o.x && e === o.y
                    ? null
                    : ((o.x = n),
                      (o.y = e),
                      B(s, {
                        "-transform":
                          "translate3d(" + -n + "px, " + -e + "px, 0)",
                      }),
                      c.update(),
                      { offset: i({}, o), limit: i({}, u) })
                );
              })(this, t, n);
              o &&
                !e.withoutCallbacks &&
                this._listeners.forEach(function (t) {
                  t.call(r, o);
                });
            }),
            (t.prototype.scrollTo = function (t, n, e, r) {
              void 0 === t && (t = this.offset.x),
                void 0 === n && (n = this.offset.y),
                void 0 === e && (e = 0),
                void 0 === r && (r = {}),
                (function (t, n, e, r, o) {
                  void 0 === r && (r = 0);
                  var i = void 0 === o ? {} : o,
                    u = i.easing,
                    c = void 0 === u ? $ : u,
                    s = i.callback,
                    a = t.options,
                    f = t.offset,
                    l = t.limit;
                  a.renderByPixels &&
                    ((n = Math.round(n)), (e = Math.round(e)));
                  var p = f.x,
                    h = f.y,
                    d = O(n, 0, l.x) - p,
                    v = O(e, 0, l.y) - h,
                    y = Date.now();
                  cancelAnimationFrame(K.get(t)),
                    (function n() {
                      var e = Date.now() - y,
                        o = r ? c(Math.min(e / r, 1)) : 1;
                      if ((t.setPosition(p + d * o, h + v * o), e >= r))
                        "function" == typeof s && s.call(t);
                      else {
                        var i = requestAnimationFrame(n);
                        K.set(t, i);
                      }
                    })();
                })(this, t, n, e, r);
            }),
            (t.prototype.scrollIntoView = function (t, n) {
              void 0 === n && (n = {}),
                (function (t, n, e) {
                  var r = void 0 === e ? {} : e,
                    o = r.alignToTop,
                    i = void 0 === o || o,
                    u = r.onlyScrollIfNeeded,
                    c = void 0 !== u && u,
                    s = r.offsetTop,
                    a = void 0 === s ? 0 : s,
                    f = r.offsetLeft,
                    l = void 0 === f ? 0 : f,
                    p = r.offsetBottom,
                    h = void 0 === p ? 0 : p,
                    d = t.containerEl,
                    v = t.bounding,
                    y = t.offset,
                    m = t.limit;
                  if (n && d.contains(n)) {
                    var g = n.getBoundingClientRect();
                    if (!c || !t.isVisible(n)) {
                      var b = i ? g.top - v.top - a : g.bottom - v.bottom + h;
                      t.setMomentum(g.left - v.left - l, O(b, -y.y, m.y - y.y));
                    }
                  }
                })(this, t, n);
            }),
            (t.prototype.addListener = function (t) {
              if ("function" != typeof t)
                throw new TypeError(
                  "[smooth-scrollbar] scrolling listener should be a function"
                );
              this._listeners.add(t);
            }),
            (t.prototype.removeListener = function (t) {
              this._listeners.delete(t);
            }),
            (t.prototype.addTransformableMomentum = function (t, n, e, r) {
              this._updateDebounced();
              var o = this._plugins.reduce(
                  function (t, n) {
                    return n.transformDelta(t, e) || t;
                  },
                  { x: t, y: n }
                ),
                i = !this._shouldPropagateMomentum(o.x, o.y);
              i && this.addMomentum(o.x, o.y), r && r.call(this, i);
            }),
            (t.prototype.addMomentum = function (t, n) {
              this.setMomentum(this._momentum.x + t, this._momentum.y + n);
            }),
            (t.prototype.setMomentum = function (t, n) {
              0 === this.limit.x && (t = 0),
                0 === this.limit.y && (n = 0),
                this.options.renderByPixels &&
                  ((t = Math.round(t)), (n = Math.round(n))),
                (this._momentum.x = t),
                (this._momentum.y = n);
            }),
            (t.prototype.updatePluginOptions = function (t, n) {
              this._plugins.forEach(function (e) {
                e.name === t && Object.assign(e.options, n);
              });
            }),
            (t.prototype.destroy = function () {
              var t = this.containerEl,
                n = this.contentEl;
              !(function (t) {
                var n = z.get(t);
                n &&
                  (n.forEach(function (t) {
                    var n = t.elem,
                      e = t.eventName,
                      r = t.handler;
                    n.removeEventListener(e, r, C());
                  }),
                  z.delete(t));
              })(this),
                this._listeners.clear(),
                this.setMomentum(0, 0),
                cancelAnimationFrame(this._renderID),
                this._observer && this._observer.disconnect(),
                lt.delete(this.containerEl);
              for (var e = Array.from(n.childNodes); t.firstChild; )
                t.removeChild(t.firstChild);
              e.forEach(function (n) {
                t.appendChild(n);
              }),
                B(t, { overflow: "" }),
                (t.scrollTop = this.scrollTop),
                (t.scrollLeft = this.scrollLeft),
                this._plugins.forEach(function (t) {
                  t.onDestory();
                }),
                (this._plugins.length = 0);
            }),
            (t.prototype._init = function () {
              var t = this;
              this.update(),
                Object.keys(r).forEach(function (n) {
                  r[n](t);
                }),
                this._plugins.forEach(function (t) {
                  t.onInit();
                }),
                this._render();
            }),
            (t.prototype._updateDebounced = function () {
              this.update();
            }),
            (t.prototype._shouldPropagateMomentum = function (t, n) {
              void 0 === t && (t = 0), void 0 === n && (n = 0);
              var e = this.options,
                r = this.offset,
                o = this.limit;
              if (!e.continuousScrolling) return !1;
              0 === o.x && 0 === o.y && this._updateDebounced();
              var i = O(t + r.x, 0, o.x),
                u = O(n + r.y, 0, o.y),
                c = !0;
              return (
                (c = (c = c && i === r.x) && u === r.y) &&
                (r.x === o.x || 0 === r.x || r.y === o.y || 0 === r.y)
              );
            }),
            (t.prototype._render = function () {
              var t = this._momentum;
              if (t.x || t.y) {
                var n = this._nextTick("x"),
                  e = this._nextTick("y");
                (t.x = n.momentum),
                  (t.y = e.momentum),
                  this.setPosition(n.position, e.position);
              }
              var r = i({}, this._momentum);
              this._plugins.forEach(function (t) {
                t.onRender(r);
              }),
                (this._renderID = requestAnimationFrame(
                  this._render.bind(this)
                ));
            }),
            (t.prototype._nextTick = function (t) {
              var n = this.options,
                e = this.offset,
                r = this._momentum,
                o = e[t],
                i = r[t];
              if (Math.abs(i) <= 0.1) return { momentum: 0, position: o + i };
              var u = i * (1 - n.damping);
              return (
                n.renderByPixels && (u |= 0),
                { momentum: u, position: o + i - u }
              );
            }),
            u([D(100, { leading: !0 })], t.prototype, "_updateDebounced", null),
            t
          );
        })(),
        ht =
          "\n[data-scrollbar] {\n  display: block;\n  position: relative;\n}\n\n.scroll-content {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n\n.scrollbar-track {\n  position: absolute;\n  opacity: 0;\n  z-index: 1;\n  background: rgba(222, 222, 222, .75);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: opacity 0.5s 0.5s ease-out;\n          transition: opacity 0.5s 0.5s ease-out;\n}\n.scrollbar-track.show,\n.scrollbar-track:hover {\n  opacity: 1;\n  -webkit-transition-delay: 0s;\n          transition-delay: 0s;\n}\n\n.scrollbar-track-x {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 8px;\n}\n.scrollbar-track-y {\n  top: 0;\n  right: 0;\n  width: 8px;\n  height: 100%;\n}\n.scrollbar-thumb {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 8px;\n  height: 8px;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 4px;\n}\n",
        dt = "smooth-scrollbar-style",
        vt = !1;
      function yt() {
        if (!vt && "undefined" != typeof window) {
          var t = document.createElement("style");
          (t.id = dt),
            (t.textContent = ht),
            document.head && document.head.appendChild(t),
            (vt = !0);
        }
      }
      e.d(n, "ScrollbarPlugin", function () {
        return tt;
      });
      /*!
       * cast `I.Scrollbar` to `Scrollbar` to avoid error
       *
       * `I.Scrollbar` is not assignable to `Scrollbar`:
       *     "privateProp" is missing in `I.Scrollbar`
       *
       * @see https://github.com/Microsoft/TypeScript/issues/2672
       */
      var mt = (function (t) {
        function n() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (function (t, n) {
            function e() {
              this.constructor = t;
            }
            o(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((e.prototype = n.prototype), new e()));
          })(n, t),
          (n.init = function (t, n) {
            if (!t || 1 !== t.nodeType)
              throw new TypeError(
                "expect element to be DOM Element, but got " + t
              );
            return yt(), lt.has(t) ? lt.get(t) : new pt(t, n);
          }),
          (n.initAll = function (t) {
            return Array.from(
              document.querySelectorAll("[data-scrollbar]"),
              function (e) {
                return n.init(e, t);
              }
            );
          }),
          (n.has = function (t) {
            return lt.has(t);
          }),
          (n.get = function (t) {
            return lt.get(t);
          }),
          (n.getAll = function () {
            return Array.from(lt.values());
          }),
          (n.destroy = function (t) {
            var n = lt.get(t);
            n && n.destroy();
          }),
          (n.destroyAll = function () {
            lt.forEach(function (t) {
              t.destroy();
            });
          }),
          (n.use = function () {
            for (var t = [], n = 0; n < arguments.length; n++)
              t[n] = arguments[n];
            return function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              t.forEach(function (t) {
                var n = t.pluginName;
                if (!n) throw new TypeError("plugin name is required");
                nt.order.add(n), (nt.constructors[n] = t);
              });
            }.apply(void 0, t);
          }),
          (n.attachStyle = function () {
            return yt();
          }),
          (n.detachStyle = function () {
            return (function () {
              if (vt && "undefined" != typeof window) {
                var t = document.getElementById(dt);
                t && t.parentNode && (t.parentNode.removeChild(t), (vt = !1));
              }
            })();
          }),
          (n.version = "8.4.0"),
          (n.ScrollbarPlugin = tt),
          n
        );
      })(pt);
      n.default = mt;
    },
  ]).default;
});

/*
   Name: YouTubePopUp
   Description: jQuery plugin to display YouTube or Vimeo video in PopUp, responsive and retina, easy to use.
   Version: 1.0.1
   Plugin URL: http://wp-time.com/youtube-popup-jquery-plugin/
   Written By: Qassim Hassan
   Twitter: @QQQHZ
   Websites: wp-time.com | qass.im | wp-plugins.in
   Dual licensed under the MIT and GPL licenses:
       http://www.opensource.org/licenses/mit-license.php
       http://www.gnu.org/licenses/gpl.html
   Copyright (c) 2016 - Qassim Hassan
*/

$.fn.YouTubePopUp = function (options) {
  let YouTubePopUpOptions = $.extend(
    {
      autoplay: 1,
    },
    options
  );
  $(this).off("click");
  $(this).on("click", function (e) {
    e.preventDefault();

    let youtubeLink = $(this).attr("href");
    let split_c, split_n, videoEmbedLink;
    if (youtubeLink.match(/(youtube.com)/)) {
      split_c = "v=";
      split_n = 1;
    }

    if (
      youtubeLink.match(/(youtu.be)/) ||
      youtubeLink.match(/(vimeo.com\/)+[0-9]/)
    ) {
      split_c = "/";
      split_n = 3;
    }

    if (youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/)) {
      split_c = "/";
      split_n = 5;
    }

    let getYouTubeVideoID = youtubeLink.split(split_c)[split_n];

    let cleanVideoID = getYouTubeVideoID.replace(/(&)+(.*)/, "");

    if (youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(youtube.com)/)) {
      videoEmbedLink =
        "https://www.youtube.com/embed/" +
        cleanVideoID +
        "?autoplay=" +
        YouTubePopUpOptions.autoplay +
        "";
    }

    if (
      youtubeLink.match(/(vimeo.com\/)+[0-9]/) ||
      youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/)
    ) {
      videoEmbedLink =
        "https://player.vimeo.com/video/" +
        cleanVideoID +
        "?autoplay=" +
        YouTubePopUpOptions.autoplay +
        "";
    }

    let popupWrap = $(
      '<div class="YouTubePopUp-Wrap YouTubePopUp-animation"></div>'
    );
    let popupContent = $('<div class="YouTubePopUp-Content"></div>');
    popupContent.append('<span class="YouTubePopUp-Close"></span>');
    popupContent.append(
      '<iframe src="' + videoEmbedLink + '" allowfullscreen></iframe>'
    );
    popupWrap.append(popupContent);
    TweenLite.set(popupWrap, { autoAlpha: 0, animationName: "none" });
    TweenLite.set(popupContent, { autoAlpha: 0, y: "30%" });

    $("body").append(popupWrap);
    let tl = new TimelineLite({
      onReverseComplete: function () {
        $(".YouTubePopUp-Wrap").remove();
        tl = null;
      },
    })
      .to(".YouTubePopUp-Wrap", 0.5, { autoAlpha: 1 })
      .to(".YouTubePopUp-Content", 1, {
        autoAlpha: 1,
        y: "0%",
        ease: Back.easeOut.config(4),
      });

    $(".YouTubePopUp-Wrap, .YouTubePopUp-Close").on("click", function () {
      tl.reverse();
    });

    popupContent =
      popupWrap =
      cleanVideoID =
      getYouTubeVideoID =
      videoEmbedLink =
      split_n =
      split_c =
      youtubeLink =
        null;
  });
};

// The MIT License (MIT)

// Typed.js | Copyright (c) 2016 Matt Boldt | www.mattboldt.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

("use strict");
var _typeof =
  "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
    ? function (t) {
        return typeof t;
      }
    : function (t) {
        return t &&
          "function" == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? "symbol"
          : typeof t;
      };
!(function (i) {
  var r = function (t, s) {
    (this.el = i(t)),
      (this.options = i.extend({}, i.fn.typed.defaults, s)),
      (this.isInput = this.el.is("input")),
      (this.attr = this.options.attr),
      (this.showCursor = !this.isInput && this.options.showCursor),
      (this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()),
      (this.contentType = this.options.contentType),
      (this.typeSpeed = this.options.typeSpeed),
      (this.startDelay = this.options.startDelay),
      (this.backSpeed = this.options.backSpeed),
      (this.backDelay = this.options.backDelay),
      (this.stringsElement = this.options.stringsElement),
      (this.strings = this.options.strings),
      (this.strPos = 0),
      (this.arrayPos = 0),
      (this.stopNum = 0),
      (this.loop = this.options.loop),
      (this.loopCount = this.options.loopCount),
      (this.curLoop = 0),
      (this.stop = !1),
      (this.cursorChar = this.options.cursorChar),
      (this.shuffle = this.options.shuffle),
      (this.sequence = []),
      this.build();
  };
  (r.prototype = {
    constructor: r,
    init: function () {
      var s = this;
      s.timeout = setTimeout(function () {
        for (var t = 0; t < s.strings.length; ++t) s.sequence[t] = t;
        s.shuffle && (s.sequence = s.shuffleArray(s.sequence)),
          s.typewrite(s.strings[s.sequence[s.arrayPos]], s.strPos);
      }, s.startDelay);
    },
    build: function () {
      var e = this;
      if (
        (!0 === this.showCursor &&
          ((this.cursor = i(
            '<span class="typed-cursor">' + this.cursorChar + "</span>"
          )),
          this.el.after(this.cursor)),
        this.stringsElement)
      ) {
        (this.strings = []),
          this.stringsElement.hide(),
          console.log(this.stringsElement.children());
        var t = this.stringsElement.children();
        i.each(t, function (t, s) {
          e.strings.push(i(s).html());
        });
      }
      this.init();
    },
    typewrite: function (r, n) {
      if (!0 !== this.stop) {
        var t = Math.round(70 * Math.random()) + this.typeSpeed,
          a = this;
        a.timeout = setTimeout(function () {
          var t = 0,
            s = r.substr(n);
          if ("^" === s.charAt(0)) {
            var e = 1;
            /^\^\d+/.test(s) &&
              ((e += (s = /\d+/.exec(s)[0]).length), (t = parseInt(s))),
              (r = r.substring(0, n) + r.substring(n + e));
          }
          if ("html" === a.contentType) {
            var o = r.substr(n).charAt(0);
            if ("<" === o || "&" === o) {
              var i = "";
              for (
                i = "<" === o ? ">" : ";";
                r.substr(n + 1).charAt(0) !== i &&
                (r.substr(n).charAt(0), !(++n + 1 > r.length));

              );
              n++, i;
            }
          }
          a.timeout = setTimeout(function () {
            if (n === r.length) {
              if (
                (a.options.onStringTyped(a.arrayPos),
                a.arrayPos === a.strings.length - 1 &&
                  (a.options.callback(),
                  a.curLoop++,
                  !1 === a.loop || a.curLoop === a.loopCount))
              )
                return;
              a.timeout = setTimeout(function () {
                a.backspace(r, n);
              }, a.backDelay);
            } else {
              0 === n && a.options.preStringTyped(a.arrayPos);
              var t = r.substr(0, n + 1);
              a.attr
                ? a.el.attr(a.attr, t)
                : a.isInput
                ? a.el.val(t)
                : "html" === a.contentType
                ? a.el.html(t)
                : a.el.text(t),
                n++,
                a.typewrite(r, n);
            }
          }, t);
        }, t);
      }
    },
    backspace: function (s, e) {
      if (!0 !== this.stop) {
        var t = Math.round(70 * Math.random()) + this.backSpeed,
          o = this;
        o.timeout = setTimeout(function () {
          if ("html" === o.contentType && ">" === s.substr(e).charAt(0)) {
            for (
              ;
              "<" !== s.substr(e - 1).charAt(0) &&
              (s.substr(e).charAt(0), !(--e < 0));

            );
            e--, "<";
          }
          var t = s.substr(0, e);
          o.attr
            ? o.el.attr(o.attr, t)
            : o.isInput
            ? o.el.val(t)
            : "html" === o.contentType
            ? o.el.html(t)
            : o.el.text(t),
            e > o.stopNum
              ? (e--, o.backspace(s, e))
              : e <= o.stopNum &&
                (o.arrayPos++,
                o.arrayPos === o.strings.length
                  ? ((o.arrayPos = 0),
                    o.shuffle && (o.sequence = o.shuffleArray(o.sequence)),
                    o.init())
                  : o.typewrite(o.strings[o.sequence[o.arrayPos]], e));
        }, t);
      }
    },
    shuffleArray: function (t) {
      var s,
        e,
        o = t.length;
      if (o)
        for (; --o; )
          (s = t[(e = Math.floor(Math.random() * (o + 1)))]),
            (t[e] = t[o]),
            (t[o] = s);
      return t;
    },
    reset: function () {
      clearInterval(this.timeout);
      this.el.attr("id");
      this.el.empty(),
        void 0 !== this.cursor && this.cursor.remove(),
        (this.strPos = 0),
        (this.arrayPos = 0),
        (this.curLoop = 0),
        this.options.resetCallback();
    },
  }),
    (i.fn.typed = function (o) {
      return this.each(function () {
        var t = i(this),
          s = t.data("typed"),
          e = "object" == (void 0 === o ? "undefined" : _typeof(o)) && o;
        s && s.reset(),
          t.data("typed", (s = new r(this, e))),
          "string" == typeof o && s[o]();
      });
    }),
    (i.fn.typed.defaults = {
      strings: [
        "These are the default values...",
        "You know what you should do?",
        "Use your own!",
        "Have a great day!",
      ],
      stringsElement: null,
      typeSpeed: 0,
      startDelay: 0,
      backSpeed: 0,
      shuffle: !1,
      backDelay: 500,
      loop: !1,
      loopCount: !1,
      showCursor: !0,
      cursorChar: "|",
      attr: null,
      contentType: "html",
      callback: function () {},
      preStringTyped: function () {},
      onStringTyped: function () {},
      resetCallback: function () {},
    });
})(window.jQuery);
