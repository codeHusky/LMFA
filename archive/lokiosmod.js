$('#canvas').after($('#canvas').clone().attr('id','canvas-2')).remove();
var selfie = window;
var outside;

function game(self, $) {
  /**
   * @return {undefined}
   */
  function init() {
    /** @type {boolean} */
    pa = true;
    run();
    setInterval(run, 18E4);
    /** @type {(HTMLElement|null)} */
    canvas = cv = document.getElementById("canvas-2");
    ctx = canvas.getContext("2d");
    /**
     * @param {Event} e
     * @return {undefined}
     */
    canvas.onmousedown = function(e) {
      if (Da) {
        /** @type {number} */
        var z0 = e.clientX - (5 + width / 5 / 2);
        /** @type {number} */
        var z1 = e.clientY - (5 + width / 5 / 2);
        if (Math.sqrt(z0 * z0 + z1 * z1) <= width / 5 / 2) {
          emit();
          registerEvent(17);
          return;
        }
      }
      mx = e.clientX;
      y = e.clientY;
      preventDefault();
      emit();
    };
    /**
     * @param {Event} e
     * @return {undefined}
     */
    canvas.onmousemove = function(e) {
      mx = e.clientX;
      y = e.clientY;
      preventDefault();
    };
    /**
     * @return {undefined}
     */
    canvas.onmouseup = function() {
    };
    if (/firefox/i.test(navigator.userAgent)) {
      document.addEventListener("DOMMouseScroll", onDocumentMouseScroll, false);
    } else {
      /** @type {function (Event): undefined} */
      document.body.onmousewheel = onDocumentMouseScroll;
    }
    /** @type {boolean} */
    var b = false;
    /** @type {boolean} */
    var a = false;
    /** @type {boolean} */
    var all = false;
    /**
     * @param {?} e
     * @return {undefined}
     */
    self.onkeydown = function(e) {
      if (!(32 != e.keyCode)) {
        if (!b) {
          emit();
          registerEvent(17);
          /** @type {boolean} */
          b = true;
        }
      }
      if (!(81 != e.keyCode)) {
        if (!a) {
          registerEvent(18);
          /** @type {boolean} */
          a = true;
        }
      }
      if (!(87 != e.keyCode)) {
        if (!all) {
          emit();
          registerEvent(21);
          /** @type {boolean} */
          all = true;
        }
      }
      if (27 == e.keyCode) {
        callback(true);
      }
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    self.onkeyup = function(event) {
      if (32 == event.keyCode) {
        /** @type {boolean} */
        b = false;
      }
      if (87 == event.keyCode) {
        /** @type {boolean} */
        all = false;
      }
      if (81 == event.keyCode) {
        if (a) {
          registerEvent(19);
          /** @type {boolean} */
          a = false;
        }
      }
    };
    /**
     * @return {undefined}
     */
    self.onblur = function() {
      registerEvent(19);
      /** @type {boolean} */
      all = a = b = false;
    };
    /** @type {function (): undefined} */
    self.onresize = update;
    if (self.requestAnimationFrame) {
      self.requestAnimationFrame(step);
    } else {
      setInterval(render, 1E3 / 60);
    }
    setInterval(emit, 40);
    if (digits) {
      $("#region").val(digits);
    }
    refresh();
    reset($("#region").val());
    if (null == ws) {
      if (digits) {
        connect();
      }
    }
    $("#overlays").show();
    update();
  }
  /**
   * @param {Event} event
   * @return {undefined}
   */
  function onDocumentMouseScroll(event) {
    len *= Math.pow(0.9, event.wheelDelta / -120 || (event.detail || 0));
    if (1 > len) {
      /** @type {number} */
      len = 1;
    }
    if (len > 4 / ratio) {
      /** @type {number} */
      len = 4 / ratio;
    }
  }
  /**
   * @return {undefined}
   */
  function createObjects() {
    if (0.4 > ratio) {
      /** @type {null} */
      r = null;
    } else {
      /** @type {number} */
      var i = Number.POSITIVE_INFINITY;
      /** @type {number} */
      var left = Number.POSITIVE_INFINITY;
      /** @type {number} */
      var maxY = Number.NEGATIVE_INFINITY;
      /** @type {number} */
      var bottom = Number.NEGATIVE_INFINITY;
      /** @type {number} */
      var newDuration = 0;
      /** @type {number} */
      var j = 0;
      for (;j < list.length;j++) {
        var data = list[j];
        if (!!data.I()) {
          if (!data.M) {
            if (!(20 >= data.size * ratio)) {
              /** @type {number} */
              newDuration = Math.max(data.size, newDuration);
              /** @type {number} */
              i = Math.min(data.x, i);
              /** @type {number} */
              left = Math.min(data.y, left);
              /** @type {number} */
              maxY = Math.max(data.x, maxY);
              /** @type {number} */
              bottom = Math.max(data.y, bottom);
            }
          }
        }
      }
      r = path.ca({
        X : i - (newDuration + 100),
        Y : left - (newDuration + 100),
        fa : maxY + (newDuration + 100),
        ga : bottom + (newDuration + 100),
        da : 2,
        ea : 4
      });
      /** @type {number} */
      j = 0;
      for (;j < list.length;j++) {
        if (data = list[j], data.I() && !(20 >= data.size * ratio)) {
          /** @type {number} */
          i = 0;
          for (;i < data.a.length;++i) {
            left = data.a[i].x;
            maxY = data.a[i].y;
            if (!(left < px - width / 2 / ratio)) {
              if (!(maxY < size - height / 2 / ratio)) {
                if (!(left > px + width / 2 / ratio)) {
                  if (!(maxY > size + height / 2 / ratio)) {
                    r.i(data.a[i]);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  /**
   * @return {undefined}
   */
  function preventDefault() {
    t2 = (mx - width / 2) / ratio + px;
    index = (y - height / 2) / ratio + size;
  }
  /**
   * @return {undefined}
   */
  function run() {
    if (null == old) {
      old = {};
      $("#region").children().each(function() {
        var option = $(this);
        var name = option.val();
        if (name) {
          old[name] = option.text();
        }
      });
    }
    $.get(string + "//m.agar.io/info", function(b) {
      var testSource = {};
      var name;
      for (name in b.regions) {
        /** @type {string} */
        var sourceName = name.split(":")[0];
        testSource[sourceName] = testSource[sourceName] || 0;
        testSource[sourceName] += b.regions[name].numPlayers;
      }
      for (name in testSource) {
        $('#region option[value="' + name + '"]').text(old[name] + " (" + testSource[name] + " players)");
      }
    }, "json");
  }
  /**
   * @return {undefined}
   */
  function _hide() {
    $("#adsBottom").hide();
    $("#overlays").hide();
    refresh();
  }
  /**
   * @param {string} hash
   * @return {undefined}
   */
  function reset(hash) {
    if (hash) {
      if (hash != digits) {
        if ($("#region").val() != hash) {
          $("#region").val(hash);
        }
        digits = self.localStorage.location = hash;
        $(".region-message").hide();
        $(".region-message." + hash).show();
        $(".btn-needs-server").prop("disabled", false);
        if (pa) {
          connect();
        }
      }
    }
  }
  /**
   * @param {boolean} recurring
   * @return {undefined}
   */
  function callback(recurring) {
    /** @type {null} */
    b = null;
    reload();
    $("#overlays").fadeIn(recurring ? 200 : 3E3);
    if (!recurring) {
      $("#adsBottom").fadeIn(3E3);
    }
  }
  /**
   * @return {undefined}
   */
  function refresh() {
    if ($("#region").val()) {
      self.localStorage.location = $("#region").val();
    } else {
      if (self.localStorage.location) {
        $("#region").val(self.localStorage.location);
      }
    }
    if ($("#region").val()) {
      $("#locationKnown").append($("#region"));
    } else {
      $("#locationUnknown").append($("#region"));
    }
  }
  /**
   * @return {undefined}
   */
  function reload() {
    if (!!ca) {
      if (!(75 <= compassResult)) {
        /** @type {boolean} */
        ca = false;
        setTimeout(function() {
          /** @type {boolean} */
          ca = true;
        }, 6E4 * pos);
        self.googletag.pubads().refresh([self.mainAd]);
      }
    }
  }
  /**
   * @return {undefined}
   */
  function next() {
    console.log("Find " + digits + result);
    $.ajax(string + "//m.agar.io/", {
      /**
       * @return {undefined}
       */
      error : function() {
        setTimeout(next, 1E3);
      },
      /**
       * @param {(number|string)} options
       * @return {undefined}
       */
      success : function(options) {
        options = options.split("\n");
        if (options[2]) {
          alert(options[2]);
        }
        open("ws://" + options[0], options[1]);
      },
      dataType : "text",
      method : "POST",
      cache : false,
      crossDomain : true,
      data : (digits + result || "?") + "\n154669603"
    });
  }
  /**
   * @return {undefined}
   */
  function connect() {
    if (pa) {
      if (digits) {
        $("#connecting").show();
        next();
      }
    }
  }
  /**
   * @param {string} url
   * @param {string} a
   * @return {undefined}
   */
  function open(url, a) {
    if (ws) {
      /** @type {null} */
      ws.onopen = null;
      /** @type {null} */
      ws.onmessage = null;
      /** @type {null} */
      ws.onclose = null;
      try {
        ws.close();
      } catch (c) {
      }
      /** @type {null} */
      ws = null;
    }
    if (methodInvoked) {
      var attrList = url.split(":");
      /** @type {string} */
      url = attrList[0] + "s://ip-" + attrList[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + (+attrList[2] + 2E3);
    }
    /** @type {Array} */
    ids = [];
    /** @type {Array} */
    items = [];
    args = {};
    /** @type {Array} */
    list = [];
    /** @type {Array} */
    innerItems = [];
    /** @type {Array} */
    users = [];
    /** @type {null} */
    img = angles = null;
    /** @type {number} */
    closingAnimationTime = 0;
    /** @type {boolean} */
    ta = false;
    console.log("Connecting to " + url);
    /** @type {WebSocket} */
    ws = new WebSocket(url);
    /** @type {string} */
    ws.binaryType = "arraybuffer";
    /**
     * @return {undefined}
     */
    ws.onopen = function() {
      var buf;
      console.log("socket open");
      console.log("YAY OUR MODS WORK ATM");
      buf = log(5);
      buf.setUint8(0, 254);
      buf.setUint32(1, 4, true);
      cb(buf);
      buf = log(5);
      buf.setUint8(0, 255);
      buf.setUint32(1, 154669603, true);
      cb(buf);
      buf = log(1 + a.length);
      buf.setUint8(0, 80);
      /** @type {number} */
      var i = 0;
      for (;i < a.length;++i) {
        buf.setUint8(i + 1, a.charCodeAt(i));
      }
      cb(buf);
      put();
    };
    /** @type {function (MessageEvent): undefined} */
    ws.onmessage = onmessage;
    /** @type {function (): undefined} */
    ws.onclose = listener;
    /**
     * @return {undefined}
     */
    ws.onerror = function() {
      console.log("socket error");
    };
  }
  /**
   * @param {number} expectedNumberOfNonCommentArgs
   * @return {?}
   */
  function log(expectedNumberOfNonCommentArgs) {
    return new DataView(new ArrayBuffer(expectedNumberOfNonCommentArgs));
  }
  /**
   * @param {?} data
   * @return {undefined}
   */
  function cb(data) {
    ws.send(data.buffer);
  }
  /**
   * @return {undefined}
   */
  function listener() {
    if (ta) {
      /** @type {number} */
      backoff = 500;
    }
    console.log("socket close");
    setTimeout(connect, backoff);
    backoff *= 2;
  }
  /**
   * @param {MessageEvent} a
   * @return {undefined}
   */
  function onmessage(a) {
    parse(new DataView(a.data));
  }
  /**
   * @param {DataView} data
   * @return {undefined}
   */
  function parse(data) {
    /**
     * @return {?}
     */
    function encode() {
      /** @type {string} */
      var str = "";
      for (;;) {
        var b = data.getUint16(offset, true);
        offset += 2;
        if (0 == b) {
          break;
        }
        str += String.fromCharCode(b);
      }
      return str;
    }
    /** @type {number} */
    var offset = 0;
    if (240 == data.getUint8(offset)) {
      offset += 5;
    }
    switch(data.getUint8(offset++)) {
      case 16:
        loop(data, offset);
        break;
      case 17:
        x = data.getFloat32(offset, true);
        offset += 4;
        n = data.getFloat32(offset, true);
        offset += 4;
        chunk = data.getFloat32(offset, true);
        offset += 4;
        break;
      case 20:
        /** @type {Array} */
        items = [];
        /** @type {Array} */
        ids = [];
        break;
      case 21:
        start = data.getInt16(offset, true);
        offset += 2;
        cur = data.getInt16(offset, true);
        offset += 2;
        if (!wa) {
          /** @type {boolean} */
          wa = true;
          end = start;
          tmp = cur;
        }
        break;
      case 32:
        ids.push(data.getUint32(offset, true));
        offset += 4;
        break;
      case 49:
        if (null != angles) {
          break;
        }
        var b = data.getUint32(offset, true);
        offset = offset + 4;
        /** @type {Array} */
        users = [];
        /** @type {number} */
        var a = 0;
        for (;a < b;++a) {
          var token = data.getUint32(offset, true);
          offset = offset + 4;
          users.push({
            id : token,
            name : encode()
          });
        }
        create();
        break;
      case 50:
        /** @type {Array} */
        angles = [];
        b = data.getUint32(offset, true);
        offset += 4;
        /** @type {number} */
        a = 0;
        for (;a < b;++a) {
          angles.push(data.getFloat32(offset, true));
          offset += 4;
        }
        create();
        break;
      case 64:
        max = data.getFloat64(offset, true);
        offset += 8;
        length = data.getFloat64(offset, true);
        offset += 8;
        min = data.getFloat64(offset, true);
        offset += 8;
        from = data.getFloat64(offset, true);
        offset += 8;
        /** @type {number} */
        x = (min + max) / 2;
        /** @type {number} */
        n = (from + length) / 2;
        /** @type {number} */
        chunk = 1;
        if (0 == items.length) {
          /** @type {number} */
          px = x;
          /** @type {number} */
          size = n;
          /** @type {number} */
          ratio = chunk;
        }
      ;
    }
  }
  /**
   * @param {DataView} dataView
   * @param {number} offset
   * @return {undefined}
   */
  function loop(dataView, offset) {
    /** @type {number} */
    left = +new Date;
    /** @type {boolean} */
    ta = true;
    $("#connecting").hide();
    /** @type {number} */
    var len = Math.random();
    /** @type {boolean} */
    xa = false;
    var id = dataView.getUint16(offset, true);
    offset += 2;
    /** @type {number} */
    var ii = 0;
    for (;ii < id;++ii) {
      var opts = args[dataView.getUint32(offset, true)];
      var data = args[dataView.getUint32(offset + 4, true)];
      offset += 8;
      if (opts) {
        if (data) {
          data.S();
          data.p = data.x;
          data.q = data.y;
          data.o = data.size;
          data.D = opts.x;
          data.F = opts.y;
          data.n = data.size;
          /** @type {number} */
          data.L = left;
        }
      }
    }
    /** @type {number} */
    ii = 0;
    for (;;) {
      id = dataView.getUint32(offset, true);
      offset += 4;
      if (0 == id) {
        break;
      }
      ++ii;
      var n;
      opts = dataView.getInt16(offset, true);
      offset += 2;
      data = dataView.getInt16(offset, true);
      offset += 2;
      n = dataView.getInt16(offset, true);
      offset += 2;
      var m = dataView.getUint8(offset++);
      var POST = dataView.getUint8(offset++);
      var direction = dataView.getUint8(offset++);
      /** @type {string} */
      m = (m << 16 | POST << 8 | direction).toString(16);
      for (;6 > m.length;) {
        /** @type {string} */
        m = "0" + m;
      }
      /** @type {string} */
      m = "#" + m;
      POST = dataView.getUint8(offset++);
      /** @type {boolean} */
      direction = !!(POST & 1);
      /** @type {boolean} */
      var uri = !!(POST & 16);
      if (POST & 2) {
        offset += 4;
      }
      if (POST & 4) {
        offset += 8;
      }
      if (POST & 8) {
        offset += 16;
      }
      var c;
      /** @type {string} */
      var options = "";
      for (;;) {
        c = dataView.getUint16(offset, true);
        offset += 2;
        if (0 == c) {
          break;
        }
        options += String.fromCharCode(c);
      }
      /** @type {string} */
      c = options;
      /** @type {null} */
      options = null;
      if (args.hasOwnProperty(id)) {
        options = args[id];
        options.K();
        options.p = options.x;
        options.q = options.y;
        options.o = options.size;
        /** @type {string} */
        options.color = m;
      } else {
        options = new fn(id, opts, data, n, m, c);
        list.push(options);
        args[id] = options;
        options.ka = opts;
        options.la = data;
      }
      /** @type {boolean} */
      options.d = direction;
      /** @type {boolean} */
      options.j = uri;
      options.D = opts;
      options.F = data;
      options.n = n;
      /** @type {number} */
      options.ja = len;
      /** @type {number} */
      options.L = left;
      options.W = POST;
      if (c) {
        options.Z(c);
      }
      if (-1 != ids.indexOf(id)) {
        if (-1 == items.indexOf(options)) {
          /** @type {string} */
          document.getElementById("overlays").style.display = "none";
          items.push(options);
          if (1 == items.length) {
            px = options.x;
            size = options.y;
          }
        }
      }
    }
    len = dataView.getUint32(offset, true);
    offset += 4;
    /** @type {number} */
    ii = 0;
    for (;ii < len;ii++) {
      id = dataView.getUint32(offset, true);
      offset += 4;
      options = args[id];
      if (null != options) {
        options.S();
      }
    }
    if (xa) {
      if (0 == items.length) {
        callback(false);
      }
    }
  }
  /**
   * @return {undefined}
   */
  function emit() {
    var z0;
    if (push()) {
      /** @type {number} */
      z0 = mx - width / 2;
      /** @type {number} */
      var z1 = y - height / 2;
      if (!(64 > z0 * z0 + z1 * z1)) {
        if (!(0.01 > Math.abs(t1 - t2) && 0.01 > Math.abs(idx - index))) {
          t1 = t2;
          idx = index;
          z0 = log(21);
          z0.setUint8(0, 16);
          z0.setFloat64(1, t2, true);
          z0.setFloat64(9, index, true);
          z0.setUint32(17, 0, true);
          cb(z0);
        }
      }
    }
  }
  /**
   * @return {undefined}
   */
  function put() {
    if (push() && null != b) {
      var buf = log(1 + 2 * b.length);
      buf.setUint8(0, 0);
      /** @type {number} */
      var bi = 0;
      for (;bi < b.length;++bi) {
        buf.setUint16(1 + 2 * bi, b.charCodeAt(bi), true);
      }
      cb(buf);
    }
  }
  /**
   * @return {?}
   */
  function push() {
    return null != ws && ws.readyState == ws.OPEN;
  }
  /**
   * @param {number} expectedNumberOfNonCommentArgs
   * @return {undefined}
   */
  function registerEvent(expectedNumberOfNonCommentArgs) {
    if (push()) {
      var buf = log(1);
      buf.setUint8(0, expectedNumberOfNonCommentArgs);
      cb(buf);
    }
  }
  /**
   * @return {undefined}
   */
  function step() {
    render();
    self.requestAnimationFrame(step);
  }
  /**
   * @return {undefined}
   */
  function update() {
    /** @type {number} */
    width = self.innerWidth;
    /** @type {number} */
    height = self.innerHeight;
    /** @type {number} */
    cv.width = canvas.width = width;
    /** @type {number} */
    cv.height = canvas.height = height;
    var $this = $("#helloDialog");
    $this.css("transform", "none");
    var b = $this.height();
    /** @type {number} */
    var a = self.innerHeight;
    if (b > a / 1.1) {
      $this.css("transform", "translate(-50%, -50%) scale(" + a / b / 1.1 + ")");
    } else {
      $this.css("transform", "translate(-50%, -50%)");
    }
    render();
  }
  /**
   * @return {?}
   */
  function requestAnimationFrame() {
    var x0;
    /** @type {number} */
    x0 = 1 * Math.max(height / 1080, width / 1920);
    return x0 *= len;
  }
  /**
   * @return {undefined}
   */
  function frame() {
    if (0 != items.length) {
      /** @type {number} */
      var offset = 0;
      /** @type {number} */
      var i = 0;
      for (;i < items.length;i++) {
        offset += items[i].size;
      }
      /** @type {number} */
      offset = Math.pow(Math.min(64 / offset, 1), 0.4) * requestAnimationFrame();
      /** @type {number} */
      ratio = (9 * ratio + offset) / 10;
    }
  }
  /**
   * @return {undefined}
   */
  function render() {
    var w;
    /** @type {number} */
    var offsetx = Date.now();
    ++fb;
    /** @type {number} */
    left = offsetx;
    if (0 < items.length) {
      frame();
      /** @type {number} */
      var texture = w = 0;
      /** @type {number} */
      var i = 0;
      for (;i < items.length;i++) {
        items[i].K();
        w += items[i].x / items.length;
        texture += items[i].y / items.length;
      }
      /** @type {number} */
      x = w;
      /** @type {number} */
      n = texture;
      chunk = ratio;
      /** @type {number} */
      px = (px + w) / 2;
      /** @type {number} */
      size = (size + texture) / 2;
    } else {
      /** @type {number} */
      px = (29 * px + x) / 30;
      /** @type {number} */
      size = (29 * size + n) / 30;
      /** @type {number} */
      ratio = (9 * ratio + chunk * requestAnimationFrame()) / 10;
    }
    createObjects();
    preventDefault();
    if (!error) {
      ctx.clearRect(0, 0, width, height);
    }
    if (error) {
      /** @type {string} */
      ctx.fillStyle = color ? "#111111" : "#F2FBFF";
      /** @type {number} */
      ctx.globalAlpha = 0.05;
      ctx.fillRect(0, 0, width, height);
      /** @type {number} */
      ctx.globalAlpha = 1;
    } else {
      draw();
    }
    list.sort(function(a, b) {
      return a.size == b.size ? a.id - b.id : a.size - b.size;
    });
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(ratio, ratio);
    ctx.translate(-px, -size);
    /** @type {number} */
    i = 0;
    for (;i < innerItems.length;i++) {
      innerItems[i].T(ctx);
    }
    /** @type {number} */
    i = 0;
    for (;i < list.length;i++) {
      list[i].T(ctx);
    }
    if (wa) {
      /** @type {number} */
      end = (3 * end + start) / 4;
      /** @type {number} */
      tmp = (3 * tmp + cur) / 4;
      ctx.save();
      /** @type {string} */
      ctx.strokeStyle = "#FFAAAA";
      /** @type {number} */
      ctx.lineWidth = 10;
      /** @type {string} */
      ctx.lineCap = "round";
      /** @type {string} */
      ctx.lineJoin = "round";
      /** @type {number} */
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      /** @type {number} */
      i = 0;
      for (;i < items.length;i++) {
        ctx.moveTo(items[i].x, items[i].y);
        ctx.lineTo(end, tmp);
      }
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
    if (img) {
      if (img.width) {
        ctx.drawImage(img, width - img.width - 10, 10);
      }
    }
    /** @type {number} */
    closingAnimationTime = Math.max(closingAnimationTime, t());
    if (0 != closingAnimationTime) {
      if (null == options) {
        options = new WS(24, "#FFFFFF");
      }
      options.u("Score: " + ~~(closingAnimationTime / 100));
      texture = options.G();
      w = texture.width;
      /** @type {number} */
      ctx.globalAlpha = 0.2;
      /** @type {string} */
      ctx.fillStyle = "#000000";
      ctx.fillRect(10, height - 10 - 24 - 10, w + 10, 34);
      /** @type {number} */
      ctx.globalAlpha = 1;
      ctx.drawImage(texture, 15, height - 10 - 24 - 5);
    }
    drawBackground();
    /** @type {number} */
    offsetx = Date.now() - offsetx;
    if (offsetx > 1E3 / 60) {
      WEEK_LENGTH -= 0.01;
    } else {
      if (offsetx < 1E3 / 65) {
        WEEK_LENGTH += 0.01;
      }
    }
    if (0.4 > WEEK_LENGTH) {
      /** @type {number} */
      WEEK_LENGTH = 0.4;
    }
    if (1 < WEEK_LENGTH) {
      /** @type {number} */
      WEEK_LENGTH = 1;
    }
  }
  /**
   * @return {undefined}
   */
  function draw() {
    /** @type {string} */
    ctx.fillStyle = color ? "#111111" : "#F2FBFF";
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    /** @type {string} */
    ctx.strokeStyle = color ? "#AAAAAA" : "#000000";
    /** @type {number} */
    ctx.globalAlpha = 0.2;
    ctx.scale(ratio, ratio);
    /** @type {number} */
    var halfWidth = width / ratio;
    /** @type {number} */
    var hh = height / ratio;
    /** @type {number} */
    var y = -0.5 + (-px + halfWidth / 2) % 50;
    for (;y < halfWidth;y += 50) {
      ctx.beginPath();
      ctx.moveTo(y, 0);
      ctx.lineTo(y, hh);
      ctx.stroke();
    }
    /** @type {number} */
    y = -0.5 + (-size + hh / 2) % 50;
    for (;y < hh;y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(halfWidth, y);
      ctx.stroke();
    }
    ctx.restore();
  }
  /**
   * @return {undefined}
   */
  function drawBackground() {
    if (Da && copy.width) {
      /** @type {number} */
      var dim = width / 5;
      ctx.drawImage(copy, 5, 5, dim, dim);
    }
  }
  /**
   * @return {?}
   */
  function t() {
    /** @type {number} */
    var words = 0;
    /** @type {number} */
    var i = 0;
    for (;i < items.length;i++) {
      words += items[i].n * items[i].n;
    }
    return words;
  }
  /**
   * @return {undefined}
   */
  function create() {
    /** @type {null} */
    img = null;
    if (null != angles || 0 != users.length) {
      if (null != angles || $timeout) {
        /** @type {Element} */
        img = document.createElement("canvas");
        var ctx = img.getContext("2d");
        /** @type {number} */
        var i = 60;
        /** @type {number} */
        i = null == angles ? i + 24 * users.length : i + 180;
        /** @type {number} */
        var t = Math.min(200, 0.3 * width) / 200;
        /** @type {number} */
        img.width = 200 * t;
        /** @type {number} */
        img.height = i * t;
        ctx.scale(t, t);
        /** @type {number} */
        ctx.globalAlpha = 0.4;
        /** @type {string} */
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 200, i);
        /** @type {number} */
        ctx.globalAlpha = 1;
        /** @type {string} */
        ctx.fillStyle = "#FFFFFF";
        /** @type {null} */
        t = null;
        /** @type {string} */
        t = "Leaderboard";
        /** @type {string} */
        ctx.font = "30px Ubuntu";
        ctx.fillText(t, 100 - ctx.measureText(t).width / 2, 40);
        if (null == angles) {
          /** @type {string} */
          ctx.font = "20px Ubuntu";
          /** @type {number} */
          i = 0;
          for (;i < users.length;++i) {
            t = users[i].name || "An unnamed cell";
            if (!$timeout) {
              /** @type {string} */
              t = "An unnamed cell";
            }
            if (-1 != ids.indexOf(users[i].id)) {
              if (items[0].name) {
                t = items[0].name;
              }
              /** @type {string} */
              ctx.fillStyle = "#FFAAAA";
            } else {
              /** @type {string} */
              ctx.fillStyle = "#FFFFFF";
            }
            /** @type {string} */
            t = i + 1 + ". " + t;
            ctx.fillText(t, 100 - ctx.measureText(t).width / 2, 70 + 24 * i);
          }
        } else {
          /** @type {number} */
          i = t = 0;
          for (;i < angles.length;++i) {
            /** @type {number} */
            var t1 = t + angles[i] * Math.PI * 2;
            ctx.fillStyle = cs[i + 1];
            ctx.beginPath();
            ctx.moveTo(100, 140);
            ctx.arc(100, 140, 80, t, t1, false);
            ctx.fill();
            /** @type {number} */
            t = t1;
          }
        }
      }
    }
  }
  /**
   * @param {Function} key
   * @param {number} arg
   * @param {number} y
   * @param {number} s
   * @param {string} value
   * @param {string} range
   * @return {undefined}
   */
  function fn(key, arg, y, s, value, range) {
    /** @type {Function} */
    this.id = key;
    this.p = this.x = arg;
    this.q = this.y = y;
    this.o = this.size = s;
    /** @type {string} */
    this.color = value;
    /** @type {Array} */
    this.a = [];
    /** @type {Array} */
    this.l = [];
    this.R();
    this.Z(range);
  }
  /**
   * @param {number} socket
   * @param {string} dataAndEvents
   * @param {?} opts
   * @param {string} inS
   * @return {undefined}
   */
  function WS(socket, dataAndEvents, opts, inS) {
    if (socket) {
      /** @type {number} */
      this.r = socket;
    }
    if (dataAndEvents) {
      /** @type {string} */
      this.N = dataAndEvents;
    }
    /** @type {boolean} */
    this.P = !!opts;
    if (inS) {
      /** @type {string} */
      this.s = inS;
    }
  }
  /** @type {string} */
  var string = self.location.protocol;
  /** @type {boolean} */
  var methodInvoked = "https:" == string;
  if (self.location.ancestorOrigins && (self.location.ancestorOrigins.length && "https://apps.facebook.com" != self.location.ancestorOrigins[0])) {
    /** @type {string} */
    self.top.location = "http://agar.io/";
  } else {
    var cv;
    var ctx;
    var canvas;
    var width;
    var height;
    /** @type {null} */
    var r = null;
    /** @type {null} */
    var ws = null;
    /** @type {number} */
    var px = 0;
    /** @type {number} */
    var size = 0;
    /** @type {Array} */
    var ids = [];
    /** @type {Array} */
    var items = [];
    var args = {};
    /** @type {Array} */
    var list = [];
    /** @type {Array} */
    var innerItems = [];
    /** @type {Array} */
    var users = [];
    /** @type {number} */
    var mx = 0;
    /** @type {number} */
    var y = 0;
    /** @type {number} */
    var t2 = -1;
    /** @type {number} */
    var index = -1;
    /** @type {number} */
    var fb = 0;
    /** @type {number} */
    var left = 0;
    /** @type {null} */
    var b = null;
    /** @type {number} */
    var max = 0;
    /** @type {number} */
    var length = 0;
    /** @type {number} */
    var min = 1E4;
    /** @type {number} */
    var from = 1E4;
    /** @type {number} */
    var ratio = 1;
    /** @type {null} */
    var digits = null;
    /** @type {boolean} */
    var j = true;
    /** @type {boolean} */
    var $timeout = true;
    /** @type {boolean} */
    var doneResults = false;
    /** @type {boolean} */
    var xa = false;
    /** @type {number} */
    var closingAnimationTime = 0;
    /** @type {boolean} */
    var color = false;
    /** @type {boolean} */
    var text = false;
    /** @type {number} */
    var x = px = ~~((max + min) / 2);
    /** @type {number} */
    var n = size = ~~((length + from) / 2);
    /** @type {number} */
    var chunk = 1;
    /** @type {string} */
    var result = "";
    /** @type {null} */
    var angles = null;
    /** @type {boolean} */
    var pa = false;
    /** @type {boolean} */
    var wa = false;
    /** @type {number} */
    var start = 0;
    /** @type {number} */
    var cur = 0;
    /** @type {number} */
    var end = 0;
    /** @type {number} */
    var tmp = 0;
    /** @type {number} */
    var compassResult = 0;
    /** @type {Array} */
    var cs = ["#333333", "#FF3333", "#33FF33", "#3333FF"];
    /** @type {boolean} */
    var error = false;
    /** @type {boolean} */
    var ta = false;
    /** @type {number} */
    var len = 1;
    /** @type {boolean} */
    var Da = "ontouchstart" in self && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    /** @type {Image} */
    var copy = new Image;
    /** @type {string} */
    copy.src = "img/split.png";
    /** @type {Element} */
    var test_canvas = document.createElement("canvas");
    if ("undefined" == typeof console || ("undefined" == typeof DataView || ("undefined" == typeof WebSocket || (null == test_canvas || (null == test_canvas.getContext || null == self.localStorage))))) {
      alert("You browser does not support this game, we recommend you to use Firefox to play this");
    } else {
      /** @type {null} */
      var old = null;
      /**
       * @param {Function} _b
       * @return {undefined}
       */
      self.setNick = function(_b) {
        _hide();
        /** @type {Function} */
        b = _b;
        put();
        /** @type {number} */
        closingAnimationTime = 0;
        console.log("Magick -snort snort-")
      };
      /** @type {function (string): undefined} */
      self.setRegion = reset;
      /**
       * @param {boolean} iStart
       * @return {undefined}
       */
      self.setSkins = function(iStart) {
        /** @type {boolean} */
        j = iStart;
      };
      /**
       * @param {string} _$timeout_
       * @return {undefined}
       */
      self.setNames = function(_$timeout_) {
        /** @type {string} */
        $timeout = _$timeout_;
      };
      /**
       * @param {boolean} newColor
       * @return {undefined}
       */
      self.setDarkTheme = function(newColor) {
        /** @type {boolean} */
        color = newColor;
      };
      /**
       * @param {boolean} data
       * @return {undefined}
       */
      self.setColors = function(data) {
        /** @type {boolean} */
        doneResults = data;
      };
      /**
       * @param {boolean} textAlt
       * @return {undefined}
       */
      self.setShowMass = function(textAlt) {
        /** @type {boolean} */
        text = textAlt;
      };
      /**
       * @return {undefined}
       */
      self.spectate = function() {
        /** @type {null} */
        b = null;
        registerEvent(1);
        _hide();
      };
      /**
       * @param {string} subKey
       * @return {undefined}
       */
      self.setGameMode = function(subKey) {
        if (subKey != result) {
          /** @type {string} */
          result = subKey;
          connect();
        }
      };
      /**
       * @param {boolean} err
       * @return {undefined}
       */
      self.setAcid = function(err) {
        /** @type {boolean} */
        error = err;
      };
      if (null != self.localStorage) {
        if (null == self.localStorage.AB9) {
          /** @type {number} */
          self.localStorage.AB9 = 0 + ~~(100 * Math.random());
        }
        /** @type {number} */
        compassResult = +self.localStorage.AB9;
        /** @type {number} */
        self.ABGroup = compassResult;
      }
      $.get(string + "//gc.agar.io", function(prop) {
        var name = prop.split(" ");
        prop = name[0];
        name = name[1] || "";
        if (-1 == ["UA"].indexOf(prop)) {
          numbers.push("ussr");
        }
        if (input.hasOwnProperty(prop)) {
          if ("string" == typeof input[prop]) {
            if (!digits) {
              reset(input[prop]);
            }
          } else {
            if (input[prop].hasOwnProperty(name)) {
              if (!digits) {
                reset(input[prop][name]);
              }
            }
          }
        }
      }, "text");
      /** @type {boolean} */
      var ca = false;
      /** @type {number} */
      var pos = 0;
      if (25 > compassResult) {
        /** @type {number} */
        pos = 10;
      } else {
        if (50 > compassResult) {
          /** @type {number} */
          pos = 5;
        }
      }
      setTimeout(function() {
        /** @type {boolean} */
        ca = true;
      }, Math.max(6E4 * pos, 1E4));
      var input = {
        AF : "JP-Tokyo",
        AX : "EU-London",
        AL : "EU-London",
        DZ : "EU-London",
        AS : "SG-Singapore",
        AD : "EU-London",
        AO : "EU-London",
        AI : "US-Atlanta",
        AG : "US-Atlanta",
        AR : "BR-Brazil",
        AM : "JP-Tokyo",
        AW : "US-Atlanta",
        AU : "SG-Singapore",
        AT : "EU-London",
        AZ : "JP-Tokyo",
        BS : "US-Atlanta",
        BH : "JP-Tokyo",
        BD : "JP-Tokyo",
        BB : "US-Atlanta",
        BY : "EU-London",
        BE : "EU-London",
        BZ : "US-Atlanta",
        BJ : "EU-London",
        BM : "US-Atlanta",
        BT : "JP-Tokyo",
        BO : "BR-Brazil",
        BQ : "US-Atlanta",
        BA : "EU-London",
        BW : "EU-London",
        BR : "BR-Brazil",
        IO : "JP-Tokyo",
        VG : "US-Atlanta",
        BN : "JP-Tokyo",
        BG : "EU-London",
        BF : "EU-London",
        BI : "EU-London",
        KH : "JP-Tokyo",
        CM : "EU-London",
        CA : "US-Atlanta",
        CV : "EU-London",
        KY : "US-Atlanta",
        CF : "EU-London",
        TD : "EU-London",
        CL : "BR-Brazil",
        CN : "CN-China",
        CX : "JP-Tokyo",
        CC : "JP-Tokyo",
        CO : "BR-Brazil",
        KM : "EU-London",
        CD : "EU-London",
        CG : "EU-London",
        CK : "SG-Singapore",
        CR : "US-Atlanta",
        CI : "EU-London",
        HR : "EU-London",
        CU : "US-Atlanta",
        CW : "US-Atlanta",
        CY : "JP-Tokyo",
        CZ : "EU-London",
        DK : "EU-London",
        DJ : "EU-London",
        DM : "US-Atlanta",
        DO : "US-Atlanta",
        EC : "BR-Brazil",
        EG : "EU-London",
        SV : "US-Atlanta",
        GQ : "EU-London",
        ER : "EU-London",
        EE : "EU-London",
        ET : "EU-London",
        FO : "EU-London",
        FK : "BR-Brazil",
        FJ : "SG-Singapore",
        FI : "EU-London",
        FR : "EU-London",
        GF : "BR-Brazil",
        PF : "SG-Singapore",
        GA : "EU-London",
        GM : "EU-London",
        GE : "JP-Tokyo",
        DE : "EU-London",
        GH : "EU-London",
        GI : "EU-London",
        GR : "EU-London",
        GL : "US-Atlanta",
        GD : "US-Atlanta",
        GP : "US-Atlanta",
        GU : "SG-Singapore",
        GT : "US-Atlanta",
        GG : "EU-London",
        GN : "EU-London",
        GW : "EU-London",
        GY : "BR-Brazil",
        HT : "US-Atlanta",
        VA : "EU-London",
        HN : "US-Atlanta",
        HK : "JP-Tokyo",
        HU : "EU-London",
        IS : "EU-London",
        IN : "JP-Tokyo",
        ID : "JP-Tokyo",
        IR : "JP-Tokyo",
        IQ : "JP-Tokyo",
        IE : "EU-London",
        IM : "EU-London",
        IL : "JP-Tokyo",
        IT : "EU-London",
        JM : "US-Atlanta",
        JP : "JP-Tokyo",
        JE : "EU-London",
        JO : "JP-Tokyo",
        KZ : "JP-Tokyo",
        KE : "EU-London",
        KI : "SG-Singapore",
        KP : "JP-Tokyo",
        KR : "JP-Tokyo",
        KW : "JP-Tokyo",
        KG : "JP-Tokyo",
        LA : "JP-Tokyo",
        LV : "EU-London",
        LB : "JP-Tokyo",
        LS : "EU-London",
        LR : "EU-London",
        LY : "EU-London",
        LI : "EU-London",
        LT : "EU-London",
        LU : "EU-London",
        MO : "JP-Tokyo",
        MK : "EU-London",
        MG : "EU-London",
        MW : "EU-London",
        MY : "JP-Tokyo",
        MV : "JP-Tokyo",
        ML : "EU-London",
        MT : "EU-London",
        MH : "SG-Singapore",
        MQ : "US-Atlanta",
        MR : "EU-London",
        MU : "EU-London",
        YT : "EU-London",
        MX : "US-Atlanta",
        FM : "SG-Singapore",
        MD : "EU-London",
        MC : "EU-London",
        MN : "JP-Tokyo",
        ME : "EU-London",
        MS : "US-Atlanta",
        MA : "EU-London",
        MZ : "EU-London",
        MM : "JP-Tokyo",
        NA : "EU-London",
        NR : "SG-Singapore",
        NP : "JP-Tokyo",
        NL : "EU-London",
        NC : "SG-Singapore",
        NZ : "SG-Singapore",
        NI : "US-Atlanta",
        NE : "EU-London",
        NG : "EU-London",
        NU : "SG-Singapore",
        NF : "SG-Singapore",
        MP : "SG-Singapore",
        NO : "EU-London",
        OM : "JP-Tokyo",
        PK : "JP-Tokyo",
        PW : "SG-Singapore",
        PS : "JP-Tokyo",
        PA : "US-Atlanta",
        PG : "SG-Singapore",
        PY : "BR-Brazil",
        PE : "BR-Brazil",
        PH : "JP-Tokyo",
        PN : "SG-Singapore",
        PL : "EU-London",
        PT : "EU-London",
        PR : "US-Atlanta",
        QA : "JP-Tokyo",
        RE : "EU-London",
        RO : "EU-London",
        RU : "RU-Russia",
        RW : "EU-London",
        BL : "US-Atlanta",
        SH : "EU-London",
        KN : "US-Atlanta",
        LC : "US-Atlanta",
        MF : "US-Atlanta",
        PM : "US-Atlanta",
        VC : "US-Atlanta",
        WS : "SG-Singapore",
        SM : "EU-London",
        ST : "EU-London",
        SA : "EU-London",
        SN : "EU-London",
        RS : "EU-London",
        SC : "EU-London",
        SL : "EU-London",
        SG : "JP-Tokyo",
        SX : "US-Atlanta",
        SK : "EU-London",
        SI : "EU-London",
        SB : "SG-Singapore",
        SO : "EU-London",
        ZA : "EU-London",
        SS : "EU-London",
        ES : "EU-London",
        LK : "JP-Tokyo",
        SD : "EU-London",
        SR : "BR-Brazil",
        SJ : "EU-London",
        SZ : "EU-London",
        SE : "EU-London",
        CH : "EU-London",
        SY : "EU-London",
        TW : "JP-Tokyo",
        TJ : "JP-Tokyo",
        TZ : "EU-London",
        TH : "JP-Tokyo",
        TL : "JP-Tokyo",
        TG : "EU-London",
        TK : "SG-Singapore",
        TO : "SG-Singapore",
        TT : "US-Atlanta",
        TN : "EU-London",
        TR : "TK-Turkey",
        TM : "JP-Tokyo",
        TC : "US-Atlanta",
        TV : "SG-Singapore",
        UG : "EU-London",
        UA : "EU-London",
        AE : "EU-London",
        GB : "EU-London",
        US : {
          AL : "US-Atlanta",
          AK : "US-Fremont",
          AZ : "US-Fremont",
          AR : "US-Atlanta",
          CA : "US-Fremont",
          CO : "US-Fremont",
          CT : "US-Atlanta",
          DE : "US-Atlanta",
          FL : "US-Atlanta",
          GA : "US-Atlanta",
          HI : "US-Fremont",
          ID : "US-Fremont",
          IL : "US-Atlanta",
          IN : "US-Atlanta",
          IA : "US-Atlanta",
          KS : "US-Atlanta",
          KY : "US-Atlanta",
          LA : "US-Atlanta",
          ME : "US-Atlanta",
          MD : "US-Atlanta",
          MA : "US-Atlanta",
          MI : "US-Atlanta",
          MN : "US-Fremont",
          MS : "US-Atlanta",
          MO : "US-Atlanta",
          MT : "US-Fremont",
          NE : "US-Fremont",
          NV : "US-Fremont",
          NH : "US-Atlanta",
          NJ : "US-Atlanta",
          NM : "US-Fremont",
          NY : "US-Atlanta",
          NC : "US-Atlanta",
          ND : "US-Fremont",
          OH : "US-Atlanta",
          OK : "US-Atlanta",
          OR : "US-Fremont",
          PA : "US-Atlanta",
          RI : "US-Atlanta",
          SC : "US-Atlanta",
          SD : "US-Fremont",
          TN : "US-Atlanta",
          TX : "US-Atlanta",
          UT : "US-Fremont",
          VT : "US-Atlanta",
          VA : "US-Atlanta",
          WA : "US-Fremont",
          WV : "US-Atlanta",
          WI : "US-Atlanta",
          WY : "US-Fremont",
          DC : "US-Atlanta",
          AS : "US-Atlanta",
          GU : "US-Atlanta",
          MP : "US-Atlanta",
          PR : "US-Atlanta",
          UM : "US-Atlanta",
          VI : "US-Atlanta"
        },
        UM : "SG-Singapore",
        VI : "US-Atlanta",
        UY : "BR-Brazil",
        UZ : "JP-Tokyo",
        VU : "SG-Singapore",
        VE : "BR-Brazil",
        VN : "JP-Tokyo",
        WF : "SG-Singapore",
        EH : "EU-London",
        YE : "JP-Tokyo",
        ZM : "EU-London",
        ZW : "EU-London"
      };
      /** @type {function (string, string): undefined} */
      self.connect = open;
      /** @type {number} */
      var backoff = 500;
      /** @type {number} */
      var t1 = -1;
      /** @type {number} */
      var idx = -1;
      /** @type {null} */
      var img = null;
      /** @type {number} */
      var WEEK_LENGTH = 1;
      /** @type {null} */
      var options = null;
      var imgs = {};
      /** @type {Array.<string>} */
      var numbers = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook".split(";");
      /** @type {Array} */
      var reserved = ["8", "nasa"];
      /** @type {Array} */
      var whitespace = ["m'blob"];
      fn.prototype = {
        id : 0,
        a : null,
        l : null,
        name : null,
        k : null,
        J : null,
        x : 0,
        y : 0,
        size : 0,
        p : 0,
        q : 0,
        o : 0,
        D : 0,
        F : 0,
        n : 0,
        W : 0,
        L : 0,
        ja : 0,
        ba : 0,
        A : false,
        d : false,
        j : false,
        M : true,
        /**
         * @return {undefined}
         */
        S : function() {
          var i;
          /** @type {number} */
          i = 0;
          for (;i < list.length;i++) {
            if (list[i] == this) {
              list.splice(i, 1);
              break;
            }
          }
          delete args[this.id];
          i = items.indexOf(this);
          if (-1 != i) {
            /** @type {boolean} */
            xa = true;
            items.splice(i, 1);
          }
          i = ids.indexOf(this.id);
          if (-1 != i) {
            ids.splice(i, 1);
          }
          /** @type {boolean} */
          this.A = true;
          innerItems.push(this);
        },
        /**
         * @return {?}
         */
        h : function() {
          return Math.max(~~(0.3 * this.size), 24);
        },
        /**
         * @param {string} n
         * @return {undefined}
         */
        Z : function(n) {
          if (this.name = n) {
            if (null == this.k) {
              this.k = new WS(this.h(), "#FFFFFF", true, "#000000");
            } else {
              this.k.H(this.h());
            }
            this.k.u(this.name);
          }
        },
        /**
         * @return {undefined}
         */
        R : function() {
          var a = this.C();
          for (;this.a.length > a;) {
            /** @type {number} */
            var i = ~~(Math.random() * this.a.length);
            this.a.splice(i, 1);
            this.l.splice(i, 1);
          }
          if (0 == this.a.length) {
            if (0 < a) {
              this.a.push({
                Q : this,
                e : this.size,
                x : this.x,
                y : this.y
              });
              this.l.push(Math.random() - 0.5);
            }
          }
          for (;this.a.length < a;) {
            /** @type {number} */
            i = ~~(Math.random() * this.a.length);
            var e = this.a[i];
            this.a.splice(i, 0, {
              Q : this,
              e : e.e,
              x : e.x,
              y : e.y
            });
            this.l.splice(i, 0, this.l[i]);
          }
        },
        /**
         * @return {?}
         */
        C : function() {
          if (0 == this.id) {
            return 16;
          }
          /** @type {number} */
          var rh = 10;
          if (20 > this.size) {
            /** @type {number} */
            rh = 0;
          }
          if (this.d) {
            /** @type {number} */
            rh = 30;
          }
          var w = this.size;
          if (!this.d) {
            w *= ratio;
          }
          w *= WEEK_LENGTH;
          if (this.W & 32) {
            w *= 0.25;
          }
          return~~Math.max(w, rh);
        },
        /**
         * @return {undefined}
         */
        ha : function() {
          this.R();
          var points = this.a;
          var comparisons = this.l;
          var n = points.length;
          /** @type {number} */
          var i = 0;
          for (;i < n;++i) {
            var s = comparisons[(i - 1 + n) % n];
            var t = comparisons[(i + 1) % n];
            comparisons[i] += (Math.random() - 0.5) * (this.j ? 3 : 1);
            comparisons[i] *= 0.7;
            if (10 < comparisons[i]) {
              /** @type {number} */
              comparisons[i] = 10;
            }
            if (-10 > comparisons[i]) {
              /** @type {number} */
              comparisons[i] = -10;
            }
            /** @type {number} */
            comparisons[i] = (s + t + 8 * comparisons[i]) / 10;
          }
          var ELEMENT_NODE = this;
          /** @type {number} */
          var sa = this.d ? 0 : (this.id / 1E3 + left / 1E4) % (2 * Math.PI);
          /** @type {number} */
          i = 0;
          for (;i < n;++i) {
            var ret = points[i].e;
            s = points[(i - 1 + n) % n].e;
            t = points[(i + 1) % n].e;
            if (15 < this.size && (null != r && (20 < this.size * ratio && 0 != this.id))) {
              /** @type {boolean} */
              var m = false;
              var x = points[i].x;
              var y = points[i].y;
              r.ia(x - 5, y - 5, 10, 10, function(node) {
                if (node.Q != ELEMENT_NODE) {
                  if (25 > (x - node.x) * (x - node.x) + (y - node.y) * (y - node.y)) {
                    /** @type {boolean} */
                    m = true;
                  }
                }
              });
              if (!m) {
                if (points[i].x < max || (points[i].y < length || (points[i].x > min || points[i].y > from))) {
                  /** @type {boolean} */
                  m = true;
                }
              }
              if (m) {
                if (0 < comparisons[i]) {
                  /** @type {number} */
                  comparisons[i] = 0;
                }
                comparisons[i] -= 1;
              }
            }
            ret += comparisons[i];
            if (0 > ret) {
              /** @type {number} */
              ret = 0;
            }
            /** @type {number} */
            ret = this.j ? (19 * ret + this.size) / 20 : (12 * ret + this.size) / 13;
            /** @type {number} */
            points[i].e = (s + t + 8 * ret) / 10;
            /** @type {number} */
            s = 2 * Math.PI / n;
            t = this.a[i].e;
            if (this.d) {
              if (0 == i % 2) {
                t += 5;
              }
            }
            points[i].x = this.x + Math.cos(s * i + sa) * t;
            points[i].y = this.y + Math.sin(s * i + sa) * t;
          }
        },
        /**
         * @return {?}
         */
        K : function() {
          if (0 == this.id) {
            return 1;
          }
          var p;
          /** @type {number} */
          p = (left - this.L) / 120;
          /** @type {number} */
          p = 0 > p ? 0 : 1 < p ? 1 : p;
          /** @type {number} */
          var o = 0 > p ? 0 : 1 < p ? 1 : p;
          this.h();
          if (this.A && 1 <= o) {
            var domIndex = innerItems.indexOf(this);
            if (-1 != domIndex) {
              innerItems.splice(domIndex, 1);
            }
          }
          this.x = p * (this.D - this.p) + this.p;
          this.y = p * (this.F - this.q) + this.q;
          this.size = o * (this.n - this.o) + this.o;
          return o;
        },
        /**
         * @return {?}
         */
        I : function() {
          return 0 == this.id ? true : this.x + this.size + 40 < px - width / 2 / ratio || (this.y + this.size + 40 < size - height / 2 / ratio || (this.x - this.size - 40 > px + width / 2 / ratio || this.y - this.size - 40 > size + height / 2 / ratio)) ? false : true;
        },
        /**
         * @param {CanvasRenderingContext2D} ctx
         * @return {undefined}
         */
        T : function(ctx) {
          if (this.I()) {
            /** @type {boolean} */
            var y_position = 0 != this.id && (!this.d && (!this.j && 0.4 > ratio));
            if (5 > this.C()) {
              /** @type {boolean} */
              y_position = true;
            }
            if (this.M && !y_position) {
              /** @type {number} */
              var val = 0;
              for (;val < this.a.length;val++) {
                this.a[val].e = this.size;
              }
            }
            /** @type {boolean} */
            this.M = y_position;
            ctx.save();
            this.ba = left;
            val = this.K();
            if (this.A) {
              ctx.globalAlpha *= 1 - val;
            }
            /** @type {number} */
            ctx.lineWidth = 10;
            /** @type {string} */
            ctx.lineCap = "round";
            /** @type {string} */
            ctx.lineJoin = this.d ? "miter" : "round";
            if (doneResults) {
              /** @type {string} */
              ctx.fillStyle = "#FFFFFF";
              /** @type {string} */
              ctx.strokeStyle = "#AAAAAA";
            } else {
              ctx.fillStyle = this.color;
              ctx.strokeStyle = this.color;
            }
            if (y_position) {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
            } else {
              this.ha();
              ctx.beginPath();
              var i = this.C();
              ctx.moveTo(this.a[0].x, this.a[0].y);
              /** @type {number} */
              val = 1;
              for (;val <= i;++val) {
                /** @type {number} */
                var obj = val % i;
                ctx.lineTo(this.a[obj].x, this.a[obj].y);
              }
            }
            ctx.closePath();
            i = this.name.toLowerCase();
            if (!this.j && (j && ":teams" != result)) {
              if (-1 != numbers.indexOf(i)) {
                if (!imgs.hasOwnProperty(i)) {
                  /** @type {Image} */
                  imgs[i] = new Image;
                  /** @type {string} */
                  imgs[i].src = "skins/" + i + ".png";
                }
                val = 0 != imgs[i].width && imgs[i].complete ? imgs[i] : null;
              } else {
                /** @type {null} */
                val = null;
              }
            } else {
              /** @type {null} */
              val = null;
            }
            /** @type {boolean} */
            val = (obj = val) ? -1 != whitespace.indexOf(i) : false;
            if (!y_position) {
              ctx.stroke();
            }
            ctx.fill();
            if (!(null == obj)) {
              if (!val) {
                ctx.save();
                ctx.clip();
                ctx.drawImage(obj, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size);
                ctx.restore();
              }
            }
            if (doneResults || 15 < this.size) {
              if (!y_position) {
                /** @type {string} */
                ctx.strokeStyle = "#000000";
                ctx.globalAlpha *= 0.1;
                ctx.stroke();
              }
            }
            /** @type {number} */
            ctx.globalAlpha = 1;
            if (null != obj) {
              if (val) {
                ctx.drawImage(obj, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
              }
            }
            /** @type {boolean} */
            val = -1 != items.indexOf(this);
            if (0 != this.id) {
              /** @type {number} */
              y_position = ~~this.y;
              if (($timeout || val) && (this.name && (this.k && (null == obj || -1 == reserved.indexOf(i))))) {
                obj = this.k;
                obj.u(this.name);
                obj.H(this.h());
                /** @type {number} */
                i = Math.ceil(10 * ratio) / 10;
                obj.$(i);
                obj = obj.G();
                /** @type {number} */
                var glockBottomWidth = ~~(obj.width / i);
                /** @type {number} */
                var sh = ~~(obj.height / i);
                ctx.drawImage(obj, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 2), glockBottomWidth, sh);
                y_position += obj.height / 2 / i + 4;
              }
              if (text) {
                if (val || 0 == items.length && ((!this.d || this.j) && 20 < this.size)) {
                  if (null == this.J) {
                    this.J = new WS(this.h() / 2, "#FFFFFF", true, "#000000");
                  }
                  val = this.J;
                  val.H(this.h() / 2);
                  val.u(~~(this.size * this.size / 100));
                  /** @type {number} */
                  i = Math.ceil(10 * ratio) / 10;
                  val.$(i);
                  obj = val.G();
                  /** @type {number} */
                  glockBottomWidth = ~~(obj.width / i);
                  /** @type {number} */
                  sh = ~~(obj.height / i);
                  ctx.drawImage(obj, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 2), glockBottomWidth, sh);
                }
              }
            }
            ctx.restore();
          }
        }
      };
      WS.prototype = {
        w : "",
        N : "#000000",
        P : false,
        s : "#000000",
        r : 16,
        m : null,
        O : null,
        g : false,
        v : 1,
        /**
         * @param {number} r
         * @return {undefined}
         */
        H : function(r) {
          if (this.r != r) {
            /** @type {number} */
            this.r = r;
            /** @type {boolean} */
            this.g = true;
          }
        },
        /**
         * @param {?} x
         * @return {undefined}
         */
        $ : function(x) {
          if (this.v != x) {
            this.v = x;
            /** @type {boolean} */
            this.g = true;
          }
        },
        /**
         * @param {string} s
         * @return {undefined}
         */
        setStrokeColor : function(s) {
          if (this.s != s) {
            /** @type {string} */
            this.s = s;
            /** @type {boolean} */
            this.g = true;
          }
        },
        /**
         * @param {string} n
         * @return {undefined}
         */
        u : function(n) {
          if (n != this.w) {
            /** @type {string} */
            this.w = n;
            /** @type {boolean} */
            this.g = true;
          }
        },
        /**
         * @return {?}
         */
        G : function() {
          if (null == this.m) {
            /** @type {Element} */
            this.m = document.createElement("canvas");
            this.O = this.m.getContext("2d");
          }
          if (this.g) {
            /** @type {boolean} */
            this.g = false;
            var m = this.m;
            var canvas = this.O;
            var caracter = this.w;
            var quality = this.v;
            var y = this.r;
            /** @type {string} */
            var s = y + "px Ubuntu";
            /** @type {string} */
            canvas.font = s;
            /** @type {number} */
            var height = ~~(0.2 * y);
            /** @type {number} */
            m.width = (canvas.measureText(caracter).width + 6) * quality;
            /** @type {number} */
            m.height = (y + height) * quality;
            /** @type {string} */
            canvas.font = s;
            canvas.scale(quality, quality);
            /** @type {number} */
            canvas.globalAlpha = 1;
            /** @type {number} */
            canvas.lineWidth = 3;
            canvas.strokeStyle = this.s;
            canvas.fillStyle = this.N;
            if (this.P) {
              canvas.strokeText(caracter, 3, y - height / 2);
            }
            canvas.fillText(caracter, 3, y - height / 2);
          }
          return this.m;
        }
      };
      if (!Date.now) {
        /**
         * @return {number}
         */
        Date.now = function() {
          return(new Date).getTime();
        };
      }
      var path = {
        /**
         * @param {?} start
         * @return {?}
         */
        ca : function(start) {
          /**
           * @param {number} xp
           * @param {number} yp
           * @param {number} f
           * @param {number} children
           * @param {number} depth
           * @return {undefined}
           */
          function Node(xp, yp, f, children, depth) {
            /** @type {number} */
            this.x = xp;
            /** @type {number} */
            this.y = yp;
            /** @type {number} */
            this.f = f;
            /** @type {number} */
            this.c = children;
            /** @type {number} */
            this.depth = depth;
            /** @type {Array} */
            this.items = [];
            /** @type {Array} */
            this.b = [];
          }
          var params = start.da || 2;
          var header_depth = start.ea || 4;
          Node.prototype = {
            x : 0,
            y : 0,
            f : 0,
            c : 0,
            depth : 0,
            items : null,
            b : null,
            /**
             * @param {Object} b
             * @return {?}
             */
            B : function(b) {
              /** @type {number} */
              var i = 0;
              for (;i < this.items.length;++i) {
                var item = this.items[i];
                if (item.x >= b.x && (item.y >= b.y && (item.x < b.x + b.f && item.y < b.y + b.c))) {
                  return true;
                }
              }
              if (0 != this.b.length) {
                var proto = this;
                return this.V(b, function(i) {
                  return proto.b[i].B(b);
                });
              }
              return false;
            },
            /**
             * @param {?} message
             * @param {?} deepDataAndEvents
             * @return {undefined}
             */
            t : function(message, deepDataAndEvents) {
              /** @type {number} */
              var i = 0;
              for (;i < this.items.length;++i) {
                deepDataAndEvents(this.items[i]);
              }
              if (0 != this.b.length) {
                var proto = this;
                this.V(message, function(i) {
                  proto.b[i].t(message, deepDataAndEvents);
                });
              }
            },
            /**
             * @param {?} deepDataAndEvents
             * @return {undefined}
             */
            i : function(deepDataAndEvents) {
              if (0 != this.b.length) {
                this.b[this.U(deepDataAndEvents)].i(deepDataAndEvents);
              } else {
                if (this.items.length >= params && this.depth < header_depth) {
                  this.aa();
                  this.b[this.U(deepDataAndEvents)].i(deepDataAndEvents);
                } else {
                  this.items.push(deepDataAndEvents);
                }
              }
            },
            /**
             * @param {?} _pt
             * @return {?}
             */
            U : function(_pt) {
              return _pt.x < this.x + this.f / 2 ? _pt.y < this.y + this.c / 2 ? 0 : 2 : _pt.y < this.y + this.c / 2 ? 1 : 3;
            },
            /**
             * @param {Object} e
             * @param {Function} d
             * @return {?}
             */
            V : function(e, d) {
              return e.x < this.x + this.f / 2 && (e.y < this.y + this.c / 2 && d(0) || e.y >= this.y + this.c / 2 && d(2)) || e.x >= this.x + this.f / 2 && (e.y < this.y + this.c / 2 && d(1) || e.y >= this.y + this.c / 2 && d(3)) ? true : false;
            },
            /**
             * @return {undefined}
             */
            aa : function() {
              var codeSegments = this.depth + 1;
              /** @type {number} */
              var i = this.f / 2;
              /** @type {number} */
              var y = this.c / 2;
              this.b.push(new Node(this.x, this.y, i, y, codeSegments));
              this.b.push(new Node(this.x + i, this.y, i, y, codeSegments));
              this.b.push(new Node(this.x, this.y + y, i, y, codeSegments));
              this.b.push(new Node(this.x + i, this.y + y, i, y, codeSegments));
              codeSegments = this.items;
              /** @type {Array} */
              this.items = [];
              /** @type {number} */
              i = 0;
              for (;i < codeSegments.length;i++) {
                this.i(codeSegments[i]);
              }
            },
            /**
             * @return {undefined}
             */
            clear : function() {
              /** @type {number} */
              var i = 0;
              for (;i < this.b.length;i++) {
                this.b[i].clear();
              }
              /** @type {number} */
              this.items.length = 0;
              /** @type {number} */
              this.b.length = 0;
            }
          };
          var obj = {
            x : 0,
            y : 0,
            f : 0,
            c : 0
          };
          return{
            root : new Node(start.X, start.Y, start.fa - start.X, start.ga - start.Y, 0),
            /**
             * @param {?} deepDataAndEvents
             * @return {undefined}
             */
            i : function(deepDataAndEvents) {
              this.root.i(deepDataAndEvents);
            },
            /**
             * @param {?} text
             * @param {?} deepDataAndEvents
             * @return {undefined}
             */
            t : function(text, deepDataAndEvents) {
              this.root.t(text, deepDataAndEvents);
            },
            /**
             * @param {number} x
             * @param {number} rotation
             * @param {number} s
             * @param {number} source
             * @param {?} deepDataAndEvents
             * @return {undefined}
             */
            ia : function(x, rotation, s, source, deepDataAndEvents) {
              /** @type {number} */
              obj.x = x;
              /** @type {number} */
              obj.y = rotation;
              /** @type {number} */
              obj.f = s;
              /** @type {number} */
              obj.c = source;
              this.root.t(obj, deepDataAndEvents);
            },
            /**
             * @param {Object} x
             * @return {?}
             */
            B : function(x) {
              return this.root.B(x);
            },
            /**
             * @return {undefined}
             */
            clear : function() {
              this.root.clear();
            }
          };
        }
      };
      /** @type {function (): undefined} */
      self.onload = init;
    }
  }
}
var waiter = setInterval(function() {
    if(typeof setNick == "function"){
        game(window, window.jQuery);
        clearInterval(waiter);
    }
},50);
