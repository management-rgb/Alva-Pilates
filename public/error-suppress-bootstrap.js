/**
 * Runs before React hydration (see root layout Script beforeInteractive).
 * Keep rules aligned with app/components/ErrorSuppressor.tsx (shouldSuppressError).
 */
(function () {
  if (typeof window === "undefined") return;
  if (window.__ALVA_ERR_SUPPRESS__) return;
  window.__ALVA_ERR_SUPPRESS__ = true;

  function shouldSuppress(message, source, stack) {
    var m = String(message || "").toLowerCase();
    var hay = (String(source || "") + "\n" + String(stack || "")).toLowerCase();

    if (
      m.indexOf("mixpanel") !== -1 &&
      (m.indexOf("must name your new library") !== -1 ||
        m.indexOf("init(token, config, name)") !== -1 ||
        m.indexOf("mixpanel error") !== -1)
    ) {
      return true;
    }

    if (m.indexOf("pendoretrytracker") !== -1) return true;

    if (
      m.indexOf("appendchild") !== -1 &&
      m.indexOf("node") !== -1 &&
      m.indexOf("already been declared") !== -1
    ) {
      return true;
    }

    if (
      m.indexOf("identifier") !== -1 &&
      m.indexOf("already been declared") !== -1 &&
      (m.indexOf("pendo") !== -1 || m.indexOf("retrytracker") !== -1)
    ) {
      return true;
    }

    if (
      m.indexOf("already been declared") !== -1 &&
      (hay.indexOf("healcode") !== -1 ||
        hay.indexOf("mindbody") !== -1 ||
        hay.indexOf("brandedweb") !== -1 ||
        hay.indexOf("pendo") !== -1 ||
        m.indexOf("pendo") !== -1)
    ) {
      return true;
    }

    if (
      m.indexOf("is not valid json") !== -1 &&
      m.indexOf("undefined") !== -1
    ) {
      if (
        hay.indexOf("jquery") !== -1 ||
        hay.indexOf("healcode") !== -1 ||
        hay.indexOf("mindbody") !== -1 ||
        hay.indexOf("brandedweb") !== -1 ||
        hay.indexOf("htmldocument") !== -1 ||
        hay.indexOf("html document") !== -1 ||
        hay.indexOf("<anonymous>") !== -1 ||
        hay.indexOf("anonymous") !== -1 ||
        !source
      ) {
        return true;
      }
    }

    if (/cannot read properties of null.*\bmatch\b/i.test(m)) {
      if (
        hay.indexOf("healcode") !== -1 ||
        hay.indexOf("mindbody") !== -1 ||
        hay.indexOf("jquery") !== -1 ||
        hay.indexOf("<anonymous>") !== -1
      ) {
        return true;
      }
    }

    return false;
  }

  function normalizeErrorEvent(ev) {
    var msg = ev.message || "";
    var stk = "";
    var err = ev.error;
    if (err && err.message) {
      msg = msg || String(err.message);
      stk = err.stack || "";
    } else if (err && !(err instanceof Error)) {
      msg = msg || String(err);
    }
    return { message: msg, source: ev.filename || "", stack: stk };
  }

  window.addEventListener(
    "error",
    function (ev) {
      var n = normalizeErrorEvent(ev);
      if (shouldSuppress(n.message, n.source, n.stack)) {
        ev.preventDefault();
        ev.stopPropagation();
        if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      }
    },
    true
  );

  var prevOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    var msg = typeof message === "string" ? message : String(message || "");
    var stk = error && error.stack ? error.stack : "";
    if (shouldSuppress(msg, source || "", stk)) return true;
    if (typeof prevOnError === "function") {
      return prevOnError.apply(window, arguments) || false;
    }
    return false;
  };

  var rep = window.reportError && window.reportError.bind(window);
  if (typeof rep === "function") {
    window.reportError = function (e) {
      if (e && e.message && shouldSuppress(e.message, "", e.stack || ""))
        return;
      rep(e);
    };
  }

  window.addEventListener(
    "unhandledrejection",
    function (ev) {
      var r = ev.reason;
      var msg = "";
      var stk = "";
      if (typeof r === "string") msg = r;
      else if (r && r.message) {
        msg = String(r.message);
        stk = r.stack || "";
      } else msg = String(r);
      if (msg && shouldSuppress(msg, "", stk)) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    true
  );
})();
