import Fe, { forwardRef as ge, useMemo as ye, Children as Ee, useState as k, useRef as ce, useCallback as ve, useEffect as X, useLayoutEffect as Be, useImperativeHandle as Re, isValidElement as pe } from "react";
var fe = { exports: {} }, oe = {};
var Ne;
function Ye() {
  if (Ne) return oe;
  Ne = 1;
  var h = /* @__PURE__ */ Symbol.for("react.transitional.element"), v = /* @__PURE__ */ Symbol.for("react.fragment");
  function T(N, p, u) {
    var g = null;
    if (u !== void 0 && (g = "" + u), p.key !== void 0 && (g = "" + p.key), "key" in p) {
      u = {};
      for (var j in p)
        j !== "key" && (u[j] = p[j]);
    } else u = p;
    return p = u.ref, {
      $$typeof: h,
      type: N,
      key: g,
      ref: p !== void 0 ? p : null,
      props: u
    };
  }
  return oe.Fragment = v, oe.jsx = T, oe.jsxs = T, oe;
}
var le = {};
var ke;
function He() {
  return ke || (ke = 1, process.env.NODE_ENV !== "production" && (function() {
    function h(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === de ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case f:
          return "Fragment";
        case q:
          return "Profiler";
        case x:
          return "StrictMode";
        case S:
          return "Suspense";
        case d:
          return "SuspenseList";
        case se:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case E:
            return "Portal";
          case s:
            return e.displayName || "Context";
          case R:
            return (e._context.displayName || "Context") + ".Consumer";
          case a:
            var i = e.render;
            return e = e.displayName, e || (e = i.displayName || i.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case ie:
            return i = e.displayName || null, i !== null ? i : h(e.type) || "Memo";
          case G:
            i = e._payload, e = e._init;
            try {
              return h(e(i));
            } catch {
            }
        }
      return null;
    }
    function v(e) {
      return "" + e;
    }
    function T(e) {
      try {
        v(e);
        var i = !1;
      } catch {
        i = !0;
      }
      if (i) {
        i = console;
        var l = i.error, c = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l.call(
          i,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          c
        ), v(e);
      }
    }
    function N(e) {
      if (e === f) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === G)
        return "<...>";
      try {
        var i = h(e);
        return i ? "<" + i + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function p() {
      var e = M.A;
      return e === null ? null : e.getOwner();
    }
    function u() {
      return Error("react-stack-top-frame");
    }
    function g(e) {
      if (J.call(e, "key")) {
        var i = Object.getOwnPropertyDescriptor(e, "key").get;
        if (i && i.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function j(e, i) {
      function l() {
        U || (U = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          i
        ));
      }
      l.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: l,
        configurable: !0
      });
    }
    function w() {
      var e = h(this.type);
      return _[e] || (_[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function P(e, i, l, c, ee, re) {
      var o = l.ref;
      return e = {
        $$typeof: A,
        type: e,
        key: i,
        props: l,
        _owner: c
      }, (o !== void 0 ? o : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: w
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ee
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: re
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function B(e, i, l, c, ee, re) {
      var o = i.children;
      if (o !== void 0)
        if (c)
          if (H(o)) {
            for (c = 0; c < o.length; c++)
              L(o[c]);
            Object.freeze && Object.freeze(o);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else L(o);
      if (J.call(i, "key")) {
        o = h(e);
        var D = Object.keys(i).filter(function(W) {
          return W !== "key";
        });
        c = 0 < D.length ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}", Q[o + c] || (D = 0 < D.length ? "{" + D.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          c,
          o,
          D,
          o
        ), Q[o + c] = !0);
      }
      if (o = null, l !== void 0 && (T(l), o = "" + l), g(i) && (T(i.key), o = "" + i.key), "key" in i) {
        l = {};
        for (var O in i)
          O !== "key" && (l[O] = i[O]);
      } else l = i;
      return o && j(
        l,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), P(
        e,
        o,
        l,
        p(),
        ee,
        re
      );
    }
    function L(e) {
      Y(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === G && (e._payload.status === "fulfilled" ? Y(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function Y(e) {
      return typeof e == "object" && e !== null && e.$$typeof === A;
    }
    var m = Fe, A = /* @__PURE__ */ Symbol.for("react.transitional.element"), E = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.fragment"), x = /* @__PURE__ */ Symbol.for("react.strict_mode"), q = /* @__PURE__ */ Symbol.for("react.profiler"), R = /* @__PURE__ */ Symbol.for("react.consumer"), s = /* @__PURE__ */ Symbol.for("react.context"), a = /* @__PURE__ */ Symbol.for("react.forward_ref"), S = /* @__PURE__ */ Symbol.for("react.suspense"), d = /* @__PURE__ */ Symbol.for("react.suspense_list"), ie = /* @__PURE__ */ Symbol.for("react.memo"), G = /* @__PURE__ */ Symbol.for("react.lazy"), se = /* @__PURE__ */ Symbol.for("react.activity"), de = /* @__PURE__ */ Symbol.for("react.client.reference"), M = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = Object.prototype.hasOwnProperty, H = Array.isArray, Z = console.createTask ? console.createTask : function() {
      return null;
    };
    m = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var U, _ = {}, K = m.react_stack_bottom_frame.bind(
      m,
      u
    )(), $ = Z(N(u)), Q = {};
    le.Fragment = f, le.jsx = function(e, i, l) {
      var c = 1e4 > M.recentlyCreatedOwnerStacks++;
      return B(
        e,
        i,
        l,
        !1,
        c ? Error("react-stack-top-frame") : K,
        c ? Z(N(e)) : $
      );
    }, le.jsxs = function(e, i, l) {
      var c = 1e4 > M.recentlyCreatedOwnerStacks++;
      return B(
        e,
        i,
        l,
        !0,
        c ? Error("react-stack-top-frame") : K,
        c ? Z(N(e)) : $
      );
    };
  })()), le;
}
var Te;
function Ue() {
  return Te || (Te = 1, process.env.NODE_ENV === "production" ? fe.exports = Ye() : fe.exports = He()), fe.exports;
}
var r = Ue();
const er = ge(({
  children: h,
  className: v,
  style: T,
  transitionMs: N = 250,
  easing: p = "linear",
  depthSpacingPx: u = 200,
  perspectivePx: g = 3e3,
  blurAt1Px: j = 6,
  blurAt2Px: w = 10,
  opacityAt1: P = 0.7,
  opacityAt2: B = 0.45,
  minVisibleOpacity: L = 0.2,
  initialIndex: Y = 0,
  disableNavigationButtons: m = !1,
  modalOpen: A = !1,
  onModalClose: E,
  modalOrigin: f,
  modalPlacement: x
}, q) => {
  const R = ye(() => Ee.toArray(h), [h]), s = (t) => Math.max(0, Math.min(1, t)), a = (t, n, y) => t + (n - t) * y, S = (t, n, y, b) => t <= 0 ? n : t >= 2 ? b : t <= 1 ? a(n, y, s(t)) : a(y, b, s(t - 1)), [d, ie] = k(() => Number.isNaN(Y) ? 0 : Math.max(0, Math.min(R.length - 1, Y))), [G, se] = k(null), [de, M] = k(null), [J, H] = k(1), [Z, U] = k(1), [_, K] = k(!1), [$, Q] = k(1), [e, i] = k("closed"), [l, c] = k(!1), [ee, re] = k("0px"), [o, D] = k(() => ({
    width: typeof window < "u" ? window.innerWidth : 0,
    height: typeof window < "u" ? window.innerHeight : 0
  })), O = ce(null), W = ce(null), I = ve((t) => {
    if (_ || t < 0 || t >= R.length || t === d) return;
    const n = t > d ? 1 : -1;
    K(!0), se(d), U(0), Q(n), n === -1 ? (M(t), H(0)) : (M(null), H(1)), ie(t), W.current !== null && window.cancelAnimationFrame(W.current), W.current = window.requestAnimationFrame(() => {
      U(1), n === -1 && H(1), W.current = null;
    }), O.current !== null && window.clearTimeout(O.current), O.current = window.setTimeout(() => {
      K(!1), se(null), M(null), H(1), U(1), Q(1), O.current = null;
    }, N + 60);
  }, [_, d, R.length, N, K, se, U, Q, M, H, ie]);
  X(() => () => {
    O.current !== null && window.clearTimeout(O.current), W.current !== null && window.cancelAnimationFrame(W.current);
  }, []), X(() => {
    ie((t) => Math.max(0, Math.min(R.length - 1, t)));
  }, [R.length]), Be(() => {
    A && e === "closed" ? (i("opening"), re("8px"), c(!0), setTimeout(() => {
      i("open");
    }, 300)) : !A && e !== "closed" && (i("closing"), re("0px"), c(!0), setTimeout(() => {
      i("closed"), c(!1);
    }, 300));
  }, [A, e]), X(() => {
    if (!A || !E) return;
    const t = (n) => {
      n.key === "Escape" && E();
    };
    return window.addEventListener("keydown", t), () => {
      window.removeEventListener("keydown", t);
    };
  }, [A, E]), X(() => {
    if (m) return;
    const t = (n) => {
      n.metaKey || n.ctrlKey || n.altKey || (n.key === "ArrowUp" || n.key === "PageUp" ? (n.preventDefault(), I(d - 1)) : (n.key === "ArrowDown" || n.key === "PageDown") && (n.preventDefault(), I(d + 1)));
    };
    return window.addEventListener("keydown", t), () => {
      window.removeEventListener("keydown", t);
    };
  }, [m, I, d]), Re(q, () => ({
    goToPrev: () => I(d - 1),
    goToNext: () => I(d + 1),
    goToFirst: () => I(0),
    goToIndex: (t) => I(t)
  }), [d, I]);
  const Se = _, _e = e === "opening" || e === "open" ? -u : 0, je = u * d + _e, we = (t) => {
    if (!f)
      return t === "closing" ? "translate(-50%, -50%) scale(0.5)" : "";
    const n = window.innerWidth / 2, y = window.innerHeight / 2, b = f.x - n, z = f.y - y, F = `translate(calc(-50% + ${b}px), calc(-50% + ${z}px)) scale(0.5)`;
    return t === "opening" || t === "closing" ? F : "";
  };
  X(() => {
    if (typeof window > "u") return;
    const t = () => {
      D({ width: window.innerWidth, height: window.innerHeight });
    };
    return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
  }, []);
  const Pe = ye(() => {
    const t = {
      top: "5vh",
      left: "5vw",
      width: "90vw",
      height: "90vh"
    };
    if (!x) return;
    if (o.width === 0 || o.height === 0) return x;
    const n = (V, be) => {
      if (V === void 0) return null;
      if (typeof V == "number") return V;
      const C = V.trim();
      if (C.endsWith("px")) return parseFloat(C);
      if (C.endsWith("vw")) return parseFloat(C) / 100 * o.width;
      if (C.endsWith("vh")) return parseFloat(C) / 100 * o.height;
      if (C.endsWith("%")) return parseFloat(C) / 100 * be;
      const ue = parseFloat(C);
      return Number.isFinite(ue) ? ue : null;
    }, y = o.width, b = o.height, z = n(x.top, b), F = n(x.left, y), te = n(x.width, y), ne = n(x.height, b);
    if (![z, F, te, ne].every((V) => typeof V == "number"))
      return x;
    const me = y * 0.9;
    let xe = x, ae = te;
    return te > me && (xe = { ...x, width: "90vw" }, ae = me), z < 0 || F < 0 || ae <= 0 || ne <= 0 || z + ne > b || F + ae > y ? t : xe;
  }, [x, o]) ?? x, Ae = ((t) => {
    if (!t) return;
    const n = {};
    return t.top !== void 0 && (n.top = t.top), t.left !== void 0 && (n.left = t.left), t.width !== void 0 && (n.width = t.width), t.height !== void 0 && (n.height = t.height), n;
  })(Pe), he = !!x, Ce = he ? { transform: "none" } : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }, Oe = e === "opening" ? he ? { opacity: 0 } : { opacity: 0, transform: we("opening") } : e === "closing" ? he ? { opacity: 0 } : { opacity: 0, transform: we("closing") } : {}, Ie = {
    ...Ce,
    ...Ae ?? {},
    ...Oe
  };
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: `layeredScene ${Se ? "is-transitioning" : ""}${l ? " is-modal-animating" : ""}${e !== "closed" ? " modal-blur" : ""}${v ? ` ${v}` : ""}`,
      "aria-label": "3D layered scene",
      style: {
        "--camera-z": `${je}px`,
        "--blur-px": ee,
        "--transition-ms": `${N}ms`,
        "--transition-easing": p,
        "--perspective": `${g}px`,
        ...T
      },
      children: [
        R.map((t, n) => {
          const y = Math.abs(n - d), b = G !== null && n === G, z = de !== null && n === de, F = -u * n, te = b && $ === 1 ? u * 2 : 0, ne = z && $ === -1 && J === 0 ? u * 2 : 0;
          if (F + te + je + ne > 0 && !b && !(z && _ && $ === -1))
            return null;
          const ae = S(y, 1, P, B), C = b && _ ? $ === -1 ? Z === 0 ? 1 : L : Z === 0 ? 1 : L : z && _ && $ === -1 ? J === 0 ? 0 : 1 : n === d ? 1 : ae, ue = S(y, 0, j, w), $e = (z && _ && $ === -1 ? J === 0 ? w : 0 : ue) + (e !== "closed" ? 2 : 0), Me = 1e4 - Math.round(y * 10) + (b ? 1e3 : 0), De = pe(t) ? t : /* @__PURE__ */ r.jsx(r.Fragment, { children: t }), We = (pe(t) ? t.key : null) ?? n;
          return /* @__PURE__ */ r.jsx(
            "div",
            {
              className: `layeredLayer ${y === 0 ? "is-focused" : ""} ${n === d ? "is-active" : ""} ${b ? "is-outgoing" : ""}`,
              style: {
                "--z": `${F}px`,
                "--outgoing-offset": `${te}px`,
                "--incoming-offset": `${ne}px`,
                "--stack": Me,
                "--layer-blur": `${$e}px`,
                opacity: Math.max(L, C)
              },
              children: /* @__PURE__ */ r.jsxs("div", { className: "layeredLayerInner", children: [
                De,
                /* @__PURE__ */ r.jsxs("div", { className: "layeredControls", children: [
                  !m && n !== 0 ? /* @__PURE__ */ r.jsx(
                    "button",
                    {
                      type: "button",
                      className: "layeredBtn",
                      onClick: () => I(d - 1),
                      disabled: _ || n !== d,
                      children: "Previous"
                    }
                  ) : null,
                  !m && n !== R.length - 1 ? /* @__PURE__ */ r.jsx(
                    "button",
                    {
                      type: "button",
                      className: "layeredBtn",
                      onClick: () => I(d + 1),
                      disabled: _ || n !== d,
                      children: "Next"
                    }
                  ) : null
                ] })
              ] })
            },
            We
          );
        }),
        e !== "closed" && /* @__PURE__ */ r.jsx("div", { className: "layeredOverlay", onClick: E }),
        (e === "opening" || e === "open" || e === "closing") && /* @__PURE__ */ r.jsxs("div", { className: "layeredModalContent", style: Ie, children: [
          /* @__PURE__ */ r.jsx("button", { className: "modalCloseBtn", onClick: E, children: "×" }),
          /* @__PURE__ */ r.jsx("div", { className: "layerHeader", children: /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("h2", { className: "layerTitle", children: "Test Popup" }),
            /* @__PURE__ */ r.jsx("p", { className: "layerSubtitle", children: "Interactive modal with layered UI elements" })
          ] }) }),
          /* @__PURE__ */ r.jsxs("div", { className: "modalBodyScroll", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "layerGrid", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "layerCard", children: [
                /* @__PURE__ */ r.jsx("div", { className: "layerCardLabel", children: "Modal Views" }),
                /* @__PURE__ */ r.jsx("div", { className: "layerCardValue", children: "3 / 5" }),
                /* @__PURE__ */ r.jsx("div", { className: "layerCardHint", children: "Active panels" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "layerCard", children: [
                /* @__PURE__ */ r.jsx("div", { className: "layerCardLabel", children: "Transition Time" }),
                /* @__PURE__ */ r.jsx("div", { className: "layerCardValue", children: "300ms" }),
                /* @__PURE__ */ r.jsx("div", { className: "layerCardHint", children: "Linear easing" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "layerCard", children: [
                /* @__PURE__ */ r.jsx("div", { className: "layerCardLabel", children: "Blur Level" }),
                /* @__PURE__ */ r.jsx("div", { className: "layerCardValue", children: "4px" }),
                /* @__PURE__ */ r.jsx("div", { className: "layerCardHint", children: "Overlay filter" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "layerCard", children: [
                /* @__PURE__ */ r.jsx("div", { className: "layerCardLabel", children: "Camera Depth" }),
                /* @__PURE__ */ r.jsx("div", { className: "layerCardValue", children: "-200px" }),
                /* @__PURE__ */ r.jsx("div", { className: "layerCardHint", children: "Z-axis shift" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "layerRow", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "layerPanelBlock", children: [
                /* @__PURE__ */ r.jsx("div", { className: "layerSectionTitle", children: "Animation Timeline" }),
                /* @__PURE__ */ r.jsxs("svg", { className: "layerChart", viewBox: "0 0 360 120", role: "img", "aria-label": "Animation timeline chart", children: [
                  /* @__PURE__ */ r.jsx("rect", { x: "0", y: "0", width: "360", height: "120", rx: "10" }),
                  /* @__PURE__ */ r.jsx(
                    "path",
                    {
                      d: "M12 100 L52 80 L92 60 L132 40 L172 20 L212 15 L252 25 L292 45 L332 50",
                      className: "layerChartLine"
                    }
                  ),
                  /* @__PURE__ */ r.jsxs("g", { className: "layerChartDots", children: [
                    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "100", r: "3" }),
                    /* @__PURE__ */ r.jsx("circle", { cx: "52", cy: "80", r: "3" }),
                    /* @__PURE__ */ r.jsx("circle", { cx: "92", cy: "60", r: "3" }),
                    /* @__PURE__ */ r.jsx("circle", { cx: "132", cy: "40", r: "3" }),
                    /* @__PURE__ */ r.jsx("circle", { cx: "172", cy: "20", r: "3" }),
                    /* @__PURE__ */ r.jsx("circle", { cx: "212", cy: "15", r: "3" }),
                    /* @__PURE__ */ r.jsx("circle", { cx: "252", cy: "25", r: "3" }),
                    /* @__PURE__ */ r.jsx("circle", { cx: "292", cy: "45", r: "3" }),
                    /* @__PURE__ */ r.jsx("circle", { cx: "332", cy: "50", r: "3" })
                  ] }),
                  /* @__PURE__ */ r.jsxs("g", { className: "layerChartGrid", children: [
                    /* @__PURE__ */ r.jsx("line", { x1: "12", y1: "30", x2: "348", y2: "30" }),
                    /* @__PURE__ */ r.jsx("line", { x1: "12", y1: "60", x2: "348", y2: "60" }),
                    /* @__PURE__ */ r.jsx("line", { x1: "12", y1: "90", x2: "348", y2: "90" })
                  ] })
                ] }),
                /* @__PURE__ */ r.jsx("div", { className: "layerTinyNote", children: "Smooth transitions with linear interpolation" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "layerPanelBlock", children: [
                /* @__PURE__ */ r.jsx("div", { className: "layerSectionTitle", children: "Modal Features" }),
                /* @__PURE__ */ r.jsxs("svg", { className: "layerImage", viewBox: "0 0 160 160", role: "img", "aria-label": "Modal features diagram", children: [
                  /* @__PURE__ */ r.jsx("circle", { cx: "80", cy: "80", r: "50", fill: "rgba(200,205,215,0.1)", stroke: "#9aa1b1", strokeOpacity: "0.4" }),
                  /* @__PURE__ */ r.jsx("circle", { cx: "80", cy: "50", r: "8", fill: "#00b894" }),
                  /* @__PURE__ */ r.jsx("circle", { cx: "110", cy: "80", r: "8", fill: "#0984e3" }),
                  /* @__PURE__ */ r.jsx("circle", { cx: "80", cy: "110", r: "8", fill: "#e17055" }),
                  /* @__PURE__ */ r.jsx("circle", { cx: "50", cy: "80", r: "8", fill: "#fdcb6e" }),
                  /* @__PURE__ */ r.jsx("text", { x: "80", y: "55", textAnchor: "middle", fontSize: "10", fill: "#c7ccd8", children: "Blur" }),
                  /* @__PURE__ */ r.jsx("text", { x: "115", y: "85", textAnchor: "middle", fontSize: "10", fill: "#c7ccd8", children: "Depth" }),
                  /* @__PURE__ */ r.jsx("text", { x: "80", y: "115", textAnchor: "middle", fontSize: "10", fill: "#c7ccd8", children: "Anim" }),
                  /* @__PURE__ */ r.jsx("text", { x: "45", y: "85", textAnchor: "middle", fontSize: "10", fill: "#c7ccd8", children: "Scale" })
                ] }),
                /* @__PURE__ */ r.jsxs("ul", { className: "layerList", children: [
                  /* @__PURE__ */ r.jsx("li", { children: "Background blur effect" }),
                  /* @__PURE__ */ r.jsx("li", { children: "Perspective depth shift" }),
                  /* @__PURE__ */ r.jsx("li", { children: "Smooth animations" }),
                  /* @__PURE__ */ r.jsx("li", { children: "Responsive scaling" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "layerPanelBlock", children: [
              /* @__PURE__ */ r.jsx("div", { className: "layerSectionTitle", children: "Interaction Log" }),
              /* @__PURE__ */ r.jsxs("div", { className: "layerTable", children: [
                /* @__PURE__ */ r.jsxs("div", { className: "layerTableRow layerTableHead", children: [
                  /* @__PURE__ */ r.jsx("div", { children: "Event" }),
                  /* @__PURE__ */ r.jsx("div", { children: "Timestamp" }),
                  /* @__PURE__ */ r.jsx("div", { children: "Duration" }),
                  /* @__PURE__ */ r.jsx("div", { children: "Status" })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { className: "layerTableRow", children: [
                  /* @__PURE__ */ r.jsx("div", { children: "Open Modal" }),
                  /* @__PURE__ */ r.jsx("div", { children: "14:22:15" }),
                  /* @__PURE__ */ r.jsx("div", { children: "300ms" }),
                  /* @__PURE__ */ r.jsx("div", { children: "Success" })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { className: "layerTableRow", children: [
                  /* @__PURE__ */ r.jsx("div", { children: "Blur Apply" }),
                  /* @__PURE__ */ r.jsx("div", { children: "14:22:15" }),
                  /* @__PURE__ */ r.jsx("div", { children: "300ms" }),
                  /* @__PURE__ */ r.jsx("div", { children: "Success" })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { className: "layerTableRow", children: [
                  /* @__PURE__ */ r.jsx("div", { children: "Depth Shift" }),
                  /* @__PURE__ */ r.jsx("div", { children: "14:22:15" }),
                  /* @__PURE__ */ r.jsx("div", { children: "300ms" }),
                  /* @__PURE__ */ r.jsx("div", { children: "Success" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "layerFootnote", children: "Modal system active · Westworld-inspired UI · Layered perspective effects" })
          ] })
        ] })
      ]
    }
  );
}), rr = ge(function({ children: v, ...T }, N) {
  return /* @__PURE__ */ r.jsx("div", { ref: N, ...T, children: v });
});
function tr({ children: h }) {
  return /* @__PURE__ */ r.jsx(r.Fragment, { children: h });
}
const Ve = (h, v) => v < 0 ? 0 : Math.max(0, Math.min(v, h)), Xe = ge(function({ children: v, className: T, style: N, gap: p = 24 }, u) {
  const g = ye(() => Ee.toArray(v), [v]), j = ce(null), w = ce(0), [P, B] = k(0), [L, Y] = k(0), m = ce(null), A = Math.max(0, p), E = ve(() => {
    j.current && Y(j.current.clientWidth);
  }, []);
  X(() => {
    E();
    const s = j.current, a = typeof ResizeObserver < "u" && s ? new ResizeObserver(() => E()) : null;
    a && s && a.observe(s);
    const S = () => E();
    return typeof window < "u" && window.addEventListener("resize", S), () => {
      a?.disconnect(), typeof window < "u" && window.removeEventListener("resize", S);
    };
  }, [E]);
  const f = ve(
    (s) => {
      if (g.length === 0) {
        w.current = 0, B(0);
        return;
      }
      const a = Ve(s, g.length - 1);
      w.current = a, B(a);
    },
    [g.length]
  );
  X(() => {
    f(w.current);
  }, [g.length, f]), Re(
    u,
    () => ({
      goToPrev: () => f(w.current - 1),
      goToNext: () => f(w.current + 1),
      goToIndex: (s) => f(s),
      getActiveIndex: () => w.current
    }),
    [f]
  );
  const x = Math.max(0, g.length - 1), q = P <= 0, R = P >= x;
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: `horizontalStackRoot${T ? ` ${T}` : ""}`,
      style: {
        "--horizontal-stack-gap": `${A}px`,
        ...N
      },
      children: [
        /* @__PURE__ */ r.jsx("div", { className: "horizontalStackIndicators", children: /* @__PURE__ */ r.jsxs("div", { className: "horizontalStackIndicatorWrapper", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: `horizontalStackChevron left${q ? " is-disabled" : ""}`,
              "aria-label": "Previous slide",
              onClick: () => f(w.current - 1),
              disabled: q,
              children: /* @__PURE__ */ r.jsx("span", { "aria-hidden": "true", children: "‹" })
            }
          ),
          /* @__PURE__ */ r.jsx("div", { className: "horizontalStackDots", role: "tablist", "aria-label": "Slide navigation", children: g.map((s, a) => /* @__PURE__ */ r.jsx(
            "span",
            {
              className: `horizontalStackDot${a === P ? " is-active" : ""}`,
              "aria-selected": a === P,
              role: "tab"
            },
            a
          )) }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: `horizontalStackChevron right${R ? " is-disabled" : ""}`,
              "aria-label": "Next slide",
              onClick: () => f(w.current + 1),
              disabled: R,
              children: /* @__PURE__ */ r.jsx("span", { "aria-hidden": "true", children: "›" })
            }
          )
        ] }) }),
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "horizontalStackViewport",
            ref: j,
            onPointerDown: (s) => {
              m.current = { startX: s.clientX, pointerId: s.pointerId }, j.current?.setPointerCapture(s.pointerId);
            },
            onPointerMove: (s) => {
              const a = m.current;
              !a || a.pointerId !== s.pointerId || s.preventDefault();
            },
            onPointerUp: (s) => {
              const a = m.current;
              if (!a || a.pointerId !== s.pointerId) return;
              m.current = null, j.current?.releasePointerCapture(s.pointerId);
              const S = s.clientX - a.startX;
              Math.abs(S) < 40 || (S > 0 ? f(w.current - 1) : f(w.current + 1));
            },
            onPointerCancel: (s) => {
              m.current?.pointerId === s.pointerId && (m.current = null, j.current?.releasePointerCapture(s.pointerId));
            },
            children: /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "horizontalStackTrack",
                role: "region",
                "aria-roledescription": "carousel",
                "aria-label": "Horizontal stack",
                style: {
                  transform: `translateX(${-(L + A) * P}px)`,
                  "--horizontal-stack-span": `${L}px`
                },
                children: g.map((s, a) => {
                  const S = pe(s) && s.key ? s.key : a;
                  return /* @__PURE__ */ r.jsx(
                    "div",
                    {
                      className: `horizontalStackSlide${a === P ? " is-active" : ""}`,
                      "aria-hidden": a === P ? void 0 : !0,
                      children: /* @__PURE__ */ r.jsx("div", { className: "horizontalStackSlideInner", children: s })
                    },
                    S
                  );
                })
              }
            )
          }
        )
      ]
    }
  );
});
Xe.displayName = "HorizontalStack";
export {
  Xe as HorizontalStack,
  rr as Layer,
  er as LayeredScene,
  tr as Slide
};
