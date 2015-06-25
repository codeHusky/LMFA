(function(self, $) {
    var modVersion = "0.15";
    var clientRevision = "550"
    console.log("Lokio's Mod " + modVersion + " running on client base " + clientRevision)
    var Exited = false;
    var properServer = false;
    var privateServer = false;
    var failedOnce = false;
    var properIP = false;
    var Servers = "JP-Tokyo,EU-London,SG-Singapore,BR-Brazil,CN-China,RU-Russia,TK-Turkey,US-Fremont,US-Atlanta".split(",");
    var ServerText = "JP-Tokyo,EU-London,SG-Singapore,BR-Brazil,CN-China,RU-Russia,TK-Turkey,US-Fremont,US-Atlanta".replace(/,/g, "\n");
    var PromptDest = "";
    var PrivateServerIP = "";
    var OfficialIP = "";
    var ignoreSearch = false;
    var MyAlpha = 1;
    var ignoredOnce = false;
    var loadDefaultRegion = true;
    var serverAuth = 0;
    function initVariables() {

    var a = $.get("http://agar.io/main_out.js", function(data) {
        var skipper = data.substring(data.indexOf("setUint32(1,"))
        var skipper2 = skipper.substring(skipper.indexOf(";"))
        var finder1 = skipper2.substring(skipper2.indexOf("setUint32(1,"))
        var finder2 = finder1.substring(finder1, finder1.indexOf(",!0);")).replace("setUint32(1,", "")
        console.log("Server Authentication Key: " + finder2)
        serverAuth = parseFloat(finder2);
    });
    while(!properServer) {
        if(!failedOnce) {
            PromptDest = prompt("Server Name Please!\nType \"Private\" to enter an IP Address\n\nServer Names:\n" + ServerText);
        } else {
            PromptDest = prompt("Invalid Server Name!\n\nServer Name Please!\nType \"Private\" to enter an IP Address\n\nServer Names:\n" + ServerText);
        }
        if(PromptDest == null) {
            alert("Type \"Exit\" in the Server Name box to dismiss the prompts.");
        } else if(Servers.indexOf(PromptDest) > -1) {
            //properServer = true;
            OfficialIP = prompt("Enter the server ip here!\n\nJust hit Okay, or type \"None\" to just connect.");
            if(OfficialIP.toLowerCase() == "none" || OfficialIP.toLowerCase() == "") {
                ignoreSearch = true;
            }
            properServer = true;
        } else if(PromptDest.toLowerCase() == "private") {
            properServer = true;
            privateServer = true;
        } else if(PromptDest.toLowerCase() == "exit") {
            Exited = true;
            properServer = true;
        } else {
            if(PromptDest == "" && !ignoredOnce) {
                ignoredOnce = true;
                alert("Hit enter on empty input to load default region.")
            } else if(PromptDest == "" && ignoredOnce) {
                properServer = true;
                loadDefaultRegion = true;
            } else {
                failedOnce = true;
            }
        }
    }
    if(privateServer) {
        while(!properIP) {
            PrivateServerIP = prompt("Okay, Private Server IP, Please!")
            if(PrivateServerIP.split(".").length >= 3) {
                if(PrivateServerIP.indexOf(":") > -1) {
                    properIP = true
                }
            }
            if(!properIP) {
                alert("Invalid server IP! Syntax: ###.###.###.###:PORT")
            }
        }
    }
    }

    initVariables();
    var rainbowMe = false;
    var rainbowOthers = false;
    var indicatorsEnabled = false;
    var backgroundImg = new Image();

    function setupHello() {
        $("#helloDialog form .form-group div h2").html("<img src=\"http://terminalbit.com/agario/iconForOverlay.png\" style=\"float:left;margin-top:-5px;padding-right:5px;margin-left:-10px;\" height=\"40px\"><span style=\"display:inline-block;margin-bottom:2px;\">Agar.io <span style=\"font-size:10px;color:grey\">Modded by <a href=\"http://terminalbit.com\">Lokio27</a></span></span>")
        var yay = $("#settings .form-group").html()
        $("#settings .form-group").html(yay + "<hr style=\"margin-bottom: 5px;margin-top:5px\"><div class=\"form-group\"><select id=\"alpha\" title=\"Alpha\" style=\"width:100%;float:left;\" class=\"form-control\" onchange=\"setAlpha($(this).val());\" required=\"\"><option selected=\"\" value=\"1\">Alpha: 1</option><option value=\"0.9\">Alpha: 0.9</option><option value=\"0.8\">Alpha: 0.8</option><option value=\"0.7\">Alpha: 0.7</option><option value=\"0.6\">Alpha: 0.6</option><option value=\"0.5\">Alpha: 0.5</option><option value=\"0.4\">Alpha: 0.4</option><option value=\"0.3\">Alpha: 0.3</option><option value=\"0.2\">Alpha: 0.2</option><option value=\"0.1\">Alpha: 0.1</option></select></div><div class=\"form-group\"><input id=\"bgurl\" class=\"form-control\" style=\"width:65%;float:left;\" placeholder=\"Background URL\"><button type=\"submit\" id=\"updateBG\" onclick=\"setBGURL(document.getElementById('bgurl').value); return false;\" class=\"btn btn-primary\" style=\"float:right;width:33%\">Update!</button></div><br><hr style=\"margin-bottom: 5px;margin-top:5px; \">")
            //$("#helloDialog hr").remove()
        $("#helloDialog hr").remove()
        $(".fb-like").remove()
            //$("#helloDialog center")[2].remove();
        var bottomDivID = $("#helloDialog div").length - 1;
        $("#helloDialog div")[bottomDivID].remove();
        $("#settings").html("<hr style=\"margin-bottom: 5px;margin-top:-2px; \">" + $("#settings").html());
        $("#instructions").html("<hr style=\"margin-bottom: 5px;margin-top:-2px; \">" + $("#instructions").html())
        $("#helloDialog").html($("#helloDialog").html() + "<hr style=\"margin-bottom: 5px;margin-top:5px; \"><div style=\"margin-bottom: 5px; margin-left: 6px;color:grey\"><center>Lokio's Mod " + modVersion + "</center></div>")
        $("#helloDialog center")[1].remove(); //Ad-Blocker. Zeach, email me and I'll re-enable the ads if you work with me :P
        $("#settings div label").parent().html($("#settings div label").parent().html() + "<label><input type=\"checkbox\" onchange=\"setRainbowMe($(this).is(':checked'))\">Rainbow You</label><label><input type=\"checkbox\" onchange=\"setRainbowOthers($(this).is(':checked'))\">Rainbow Others</label><label><input type=\"checkbox\" onchange=\"setIndicators($(this).is(':checked'))\">Indicator Colors</label><label>");
        document.title = "Agar.io LM:" + modVersion + "?" + clientRevision;
    }
    /**
     * @return {undefined}
     */
    function init() {
        setupHello();
        console.log("This should run...")
        /** @type {boolean} */
        ma = true;
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
            if(za) {
                /** @type {number} */
                var z0 = e.clientX - (5 + width / 5 / 2);
                /** @type {number} */
                var z1 = e.clientY - (5 + width / 5 / 2);
                if(Math.sqrt(z0 * z0 + z1 * z1) <= width / 5 / 2) {
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
        canvas.onmouseup = function() {};
        if(/firefox/i.test(navigator.userAgent)) {
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
            if(!(32 != e.keyCode)) {
                if(!b) {
                    emit();
                    registerEvent(17);
                    /** @type {boolean} */
                    b = true;
                }
            }
            if(!(81 != e.keyCode)) {
                if(!a) {
                    registerEvent(18);
                    /** @type {boolean} */
                    a = true;
                }
            }
            if(!(87 != e.keyCode)) {
                if(!all) {
                    emit();
                    registerEvent(21);
                    /** @type {boolean} */
                    all = true;
                }
            }
            if(27 == e.keyCode) {
                callback(true);
            }
        };
        /**
         * @param {?} event
         * @return {undefined}
         */
        self.onkeyup = function(event) {
            if(32 == event.keyCode) {
                /** @type {boolean} */
                b = false;
            }
            if(87 == event.keyCode) {
                /** @type {boolean} */
                all = false;
            }
            if(81 == event.keyCode) {
                if(a) {
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
        if(self.requestAnimationFrame) {
            self.requestAnimationFrame(step);
        } else {
            setInterval(render, 1E3 / 120);
        }
        setInterval(emit, 40);
        if(saved) {
            $("#region").val(saved);
        }
        save();
        reset($("#region").val());
        if(null == ws) {
            if(saved) {
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
        /*if (1 > len) {
          /** @type {number} 
          len = 1;
        }*/
        /*if (len > 4 / ratio) {
          /** @type {number} 
          len = 4 / ratio;
        }*/
    }
    /**
     * @return {undefined}
     */
    function createObjects() {
        if(0.4 > ratio) {
            /** @type {null} */
            r = null;
        } else {
            /** @type {number} */
            var n = Number.POSITIVE_INFINITY;
            /** @type {number} */
            var left = Number.POSITIVE_INFINITY;
            /** @type {number} */
            var maxY = Number.NEGATIVE_INFINITY;
            /** @type {number} */
            var bottom = Number.NEGATIVE_INFINITY;
            /** @type {number} */
            var newDuration = 0;
            /** @type {number} */
            var i = 0;
            for(; i < codeSegments.length; i++) {
                var data = codeSegments[i];
                if(!!data.I()) {
                    if(!data.M) {
                        if(!(20 >= data.size * ratio)) {
                            /** @type {number} */
                            newDuration = Math.max(data.size, newDuration);
                            /** @type {number} */
                            n = Math.min(data.x, n);
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
                X: n - (newDuration + 100),
                Y: left - (newDuration + 100),
                fa: maxY + (newDuration + 100),
                ga: bottom + (newDuration + 100),
                da: 2,
                ea: 4
            });
            /** @type {number} */
            i = 0;
            for(; i < codeSegments.length; i++) {
                if(data = codeSegments[i], data.I() && !(20 >= data.size * ratio)) {
                    /** @type {number} */
                    n = 0;
                    for(; n < data.a.length; ++n) {
                        left = data.a[n].x;
                        maxY = data.a[n].y;
                        if(!(left < px - width / 2 / ratio)) {
                            if(!(maxY < size - height / 2 / ratio)) {
                                if(!(left > px + width / 2 / ratio)) {
                                    if(!(maxY > size + height / 2 / ratio)) {
                                        r.i(data.a[n]);
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
        start = (mx - width / 2) / ratio + px;
        t2 = (y - height / 2) / ratio + size;
    }
    /**
     * @return {undefined}
     */
    function run() {
        if(null == old) {
            old = {};
            $("#region").children().each(function() {
                var option = $(this);
                var name = option.val();
                if(name) {
                    old[name] = option.text();
                }
            });
        }
        $.get(index + "//m.agar.io/info", function(b) {
            var testSource = {};
            var name;
            for(name in b.regions) {
                /** @type {string} */
                var sourceName = name.split(":")[0];
                testSource[sourceName] = testSource[sourceName] || 0;
                testSource[sourceName] += b.regions[name].numPlayers;
            }
            for(name in testSource) {
                $('#region option[value="' + name + '"]').text(old[name] + " (" + testSource[name] + " players)");
            }
        }, "json");
    }
    /**
     * @return {undefined}
     */
    function rule() {
        $("#adsBottom").hide();
        $("#overlays").hide();
        save();
    }
    /**
     * @param {string} hash
     * @return {undefined}
     */
    function reset(hash) {
        if(hash) {
            if(hash != saved) {
                if($("#region").val() != hash) {
                    $("#region").val(hash);
                }
                saved = self.localStorage.location = hash;
                $(".region-message").hide();
                $(".region-message." + hash).show();
                $(".btn-needs-server").prop("disabled", false);
                if(ma) {
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
        $("#overlays").fadeIn(recurring ? 200 : 3E3);
        if(!recurring) {
            $("#adsBottom").fadeIn(3E3);
        }
    }
    /**
     * @return {undefined}
     */
    function save() {
        if($("#region").val()) {
            self.localStorage.location = $("#region").val();
        } else {
            if(self.localStorage.location) {
                $("#region").val(self.localStorage.location);
            }
        }
        if($("#region").val()) {
            $("#locationKnown").append($("#region"));
        } else {
            $("#locationUnknown").append($("#region"));
        }
    }
    /**
     * @return {undefined}
     */
    function next() {
        if(!loadDefaultRegion) {
            saved = PromptDest
        }
        console.log("Find " + saved + dest);
        if(privateServer) {
            open("ws://" + PrivateServerIP, "NoAuthKey")
        } else {
            var stop = false;
            while(!stop) {
                $.ajax(index + "//m.agar.io/", {
                    /**
                     * @return {undefined}
                     */
                    error: function() {
                        setTimeout(next, 1E3);
                    },
                    /**
                     * @param {string} status
                     * @return {undefined}
                     */
                    success: function(status) {
                        status = status.split("\n");
                        if(loadDefaultRegion) {
                            stop = true;
                            open("ws://" + status[0], status[1]);
                        } else if(OfficialIP == status[0].replace(/ /g, "") || ignoreSearch) {
                            stop = true;
                            open("ws://" + status[0], status[1]);
                        }
                    },
                    dataType: "text",
                    method: "POST",
                    cache: false,
                    crossDomain: true,
                    data: saved + dest || "?",
                    async: false
                });
            }
        }
    }
    /**
     * @return {undefined}
     */
    function connect() {
        if(ma) {
            if(saved) {
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
        if(ws) {
            /** @type {null} */
            ws.onopen = null;
            /** @type {null} */
            ws.onmessage = null;
            /** @type {null} */
            ws.onclose = null;
            try {
                ws.close();
            } catch(c) {}
            /** @type {null} */
            ws = null;
        }
        if(lastPart) {
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
        codeSegments = [];
        /** @type {Array} */
        innerItems = [];
        /** @type {Array} */
        users = [];
        /** @type {null} */
        img = angles = null;
        /** @type {number} */
        closingAnimationTime = 0;
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
            /** @type {number} */
            backoff = 500;
            $("#connecting").hide();
            console.log("socket open");
            buf = encode(5);
            buf.setUint8(0, 254);
            buf.setUint32(1, 4, true);
            cb(buf);
            buf = encode(5);
            buf.setUint8(0, 255);
            buf.setUint32(1, serverAuth, true); // thx zeach
            cb(buf);
            buf = encode(1 + a.length);
            buf.setUint8(0, 80);
            /** @type {number} */
            var i = 0;
            for(; i < a.length; ++i) {
                buf.setUint8(i + 1, a.charCodeAt(i));
            }
            cb(buf);
            write();
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
    function encode(expectedNumberOfNonCommentArgs) {
        return new DataView(new ArrayBuffer(expectedNumberOfNonCommentArgs));
    }
    /**
     * @param {?} s
     * @return {undefined}
     */
    function cb(s) {
        ws.send(s.buffer);
    }
    /**
     * @return {undefined}
     */
    function listener() {
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
            for(;;) {
                var b = data.getUint16(offset, true);
                offset += 2;
                if(0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }
        /** @type {number} */
        var offset = 0;
        if(240 == data.getUint8(offset)) {
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
                argumentOffset = data.getInt16(offset, true);
                offset += 2;
                cur = data.getInt16(offset, true);
                offset += 2;
                if(!sa) {
                    /** @type {boolean} */
                    sa = true;
                    xr = argumentOffset;
                    tmp = cur;
                }
                break;
            case 32:
                ids.push(data.getUint32(offset, true));
                offset += 4;
                break;
            case 49:
                if(null != angles) {
                    break;
                }
                var b = data.getUint32(offset, true);
                offset = offset + 4;
                /** @type {Array} */
                users = [];
                /** @type {number} */
                var a = 0;
                for(; a < b; ++a) {
                    var token = data.getUint32(offset, true);
                    offset = offset + 4;
                    users.push({
                        id: token,
                        name: encode()
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
                for(; a < b; ++a) {
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
                if(0 == items.length) {
                    /** @type {number} */
                    px = x;
                    /** @type {number} */
                    size = n;
                    /** @type {number} */
                    ratio = chunk;
                };
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
        /** @type {number} */
        var len = Math.random();
        /** @type {boolean} */
        ta = false;
        var id = dataView.getUint16(offset, true);
        offset += 2;
        /** @type {number} */
        var ii = 0;
        for(; ii < id; ++ii) {
            var opts = args[dataView.getUint32(offset, true)];
            var data = args[dataView.getUint32(offset + 4, true)];
            offset += 8;
            if(opts) {
                if(data) {
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
        for(;;) {
            id = dataView.getUint32(offset, true);
            offset += 4;
            if(0 == id) {
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
            for(; 6 > m.length;) {
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
            if(POST & 2) {
                offset += 4;
            }
            if(POST & 4) {
                offset += 8;
            }
            if(POST & 8) {
                offset += 16;
            }
            var c;
            /** @type {string} */
            var options = "";
            for(;;) {
                c = dataView.getUint16(offset, true);
                offset += 2;
                if(0 == c) {
                    break;
                }
                options += String.fromCharCode(c);
            }
            /** @type {string} */
            c = options;
            /** @type {null} */
            options = null;
            if(args.hasOwnProperty(id)) {
                options = args[id];
                options.K();
                options.p = options.x;
                options.q = options.y;
                options.o = options.size;
                /** @type {string} */
                options.color = m;
            } else {
                options = new fn(id, opts, data, n, m, c);
                codeSegments.push(options);
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
            if(c) {
                options.Z(c);
            }
            if(-1 != ids.indexOf(id)) {
                if(-1 == items.indexOf(options)) {
                    /** @type {string} */
                    document.getElementById("overlays").style.display = "none";
                    items.push(options);
                    if(1 == items.length) {
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
        for(; ii < len; ii++) {
            id = dataView.getUint32(offset, true);
            offset += 4;
            options = args[id];
            if(null != options) {
                options.S();
            }
        }
        if(ta) {
            if(0 == items.length) {
                callback(false);
            }
        }
    }
    /**
     * @return {undefined}
     */
    function emit() {
        var r;
        if(queue()) {
            /** @type {number} */
            r = mx - width / 2;
            /** @type {number} */
            var g = y - height / 2;
            if(!(64 > r * r + g * g)) {
                if(!(0.01 > Math.abs(end - start) && 0.01 > Math.abs(t1 - t2))) {
                    end = start;
                    t1 = t2;
                    r = encode(21);
                    r.setUint8(0, 16);
                    r.setFloat64(1, start, true);
                    r.setFloat64(9, t2, true);
                    r.setUint32(17, 0, true);
                    cb(r);
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function write() {
        if(queue() && null != b) {
            var buf = encode(1 + 2 * b.length);
            buf.setUint8(0, 0);
            /** @type {number} */
            var bi = 0;
            for(; bi < b.length; ++bi) {
                buf.setUint16(1 + 2 * bi, b.charCodeAt(bi), true);
            }
            cb(buf);
        }
    }
    /**
     * @return {?}
     */
    function queue() {
        return null != ws && ws.readyState == ws.OPEN;
    }
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {undefined}
     */
    function registerEvent(event) {
        if(queue()) {
            var buf = encode(1);
            buf.setUint8(0, event);
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
        if(b > a / 1.1) {
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
        if(0 != items.length) {
            /** @type {number} */
            var offset = 0;
            /** @type {number} */
            var i = 0;
            for(; i < items.length; i++) {
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
        var playerCells = getPlayerCells();
        if(playerCells[0] != undefined || playerCells[0] != null) {
            myID = playerCells[0].id;
        } else {
            myID = null;
        }
        var w;
        /** @type {number} */
        var offsetx = Date.now();
        ++bb;
        /** @type {number} */
        left = offsetx;
        if(0 < items.length) {
            frame();
            /** @type {number} */
            var texture = w = 0;
            /** @type {number} */
            var i = 0;
            for(; i < items.length; i++) {
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
        if(!$timeout) {
            ctx.clearRect(0, 0, width, height);
        }
        if($timeout) {
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
        codeSegments.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size;
        });
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(ratio, ratio);
        ctx.translate(-px, -size);
        /** @type {number} */
        i = 0;
        for(; i < innerItems.length; i++) {
            innerItems[i].T(ctx);
        }
        /** @type {number} */
        i = 0;
        for(; i < codeSegments.length; i++) {
            codeSegments[i].T(ctx);
        }
        if(sa) {
            /** @type {number} */
            xr = (3 * xr + argumentOffset) / 4;
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
            for(; i < items.length; i++) {
                ctx.moveTo(items[i].x, items[i].y);
                ctx.lineTo(xr, tmp);
            }
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
        if(img) {
            if(img.width) {
                ctx.drawImage(img, width - img.width - 10, 10);
            }
        }
        /** @type {number} */
        closingAnimationTime = Math.max(closingAnimationTime, t());
        if(0 != closingAnimationTime) {
            if(null == options) {
                options = new WS(24, "#FFFFFF");
            }
            options.u("Score: " + ~~(closingAnimationTime / 100) + " | Size after \"W\": " + ((~~((closingAnimationTime) / 100)) - 16) + " | Size Per Cell after Split: " + ~~(~~((closingAnimationTime / 2) / 100) / getPlayerCells().length));
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
        if(offsetx > 1E3 / 60) {
            WEEK_LENGTH -= 0.01;
        } else {
            if(offsetx < 1E3 / 65) {
                WEEK_LENGTH += 0.01;
            }
        }
        if(0.4 > WEEK_LENGTH) {
            /** @type {number} */
            WEEK_LENGTH = 0.4;
        }
        if(1 < WEEK_LENGTH) {
            /** @type {number} */
            WEEK_LENGTH = 1;
        }
    }
    /**
     * @return {undefined}
     */
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    var oldX = null;
    var oldY = null;
    var offsetX = 0;
    var offsetY = 0;
    var parallexEnabled = false;

    function draw() {
        var player = getPlayerCell();
        /** @type {string} */
        //backgroundImg.src="http://i1114.photobucket.com/albums/k522/Lokio27/HDtimelapse.net_City_1853_hirez_zpszpmgsvwr.jpg"
        ctx.fillStyle = color ? "#111111" : "#F2FBFF";
        //ctx.fillStyle = "#00FFFF"//rgbToHex(Math.sin(count)*255,Math.sin(count*1.3)*255,Math.sin(count*1.7)*255)
        ctx.fillRect(0, 0, width, height);
        var imgWidth = backgroundImg.width;
        var imgHeight = backgroundImg.height;
        //imgWidth = width;
        //imgHeight *= (width/backgroundImg.width);
        if(width > height) { //long moniter
            imgWidth = width;
            imgHeight *= imgWidth / backgroundImg.width;
            if(imgHeight < height) {
                imgWidth = backgroundImg.width;
                imgHeight = backgroundImg.height;
                imgHeight = height;
                imgWidth *= imgHeight / backgroundImg.height;
            }
        } else {
            imgHeight = height;
            imgWidth *= imgHeight / backgroundImg.height;
            if(imgWidth < width) {
                imgWidth = backgroundImg.width;
                imgHeight = backgroundImg.height;
                imgWidth = width;
                imgHeight *= imgWidth / backgroundImg.width;
            }
        }
        /*imgHeight *= width/backgroundImg.width;
        imgWidth *= height/backgroundImg.height;*/
        ctx.drawImage(backgroundImg, 0, 0, imgWidth, imgHeight)
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
        for(; y < halfWidth; y += 50) {
            ctx.beginPath();
            ctx.moveTo(y, 0);
            ctx.lineTo(y, hh);
            ctx.stroke();
        }
        /** @type {number} */
        y = -0.5 + (-size + hh / 2) % 50;
        for(; y < hh; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(halfWidth, y);
            ctx.stroke();
        }
        if(parallexEnabled) {
            ctx.translate(-(offsetX), -(offsetY))
                //MX = x; y = y;
                //vertical
            if(oldX != null && oldY != null) {
                offsetX += (player.x - oldX) / 2;
                offsetY += (player.y - oldY) / 2;
                offsetX = offsetX % 50;
                offsetY = offsetY % 50;
            }
            ctx.translate(offsetX, offsetY)
            var y = -0.5 + (-px + halfWidth / 2) % 50;
            for(; y < halfWidth; y += 50) {
                ctx.beginPath();
                ctx.moveTo(y, 0);
                ctx.lineTo(y, hh); //Bookmark'd
                ctx.stroke();
            }
            /** @type {number} */
            //Horizontal
            y = -0.5 + (-size + hh / 2) % 50;
            for(; y < hh; y += 50) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(halfWidth, y);
                ctx.stroke();
            }
            if(oldX == null && oldY == null) {
                if(player != undefined) {
                    oldX = player.x;
                    oldY = player.y;
                } else {
                    offsetX = 0;
                    offsetY = 0;
                    oldX = null;
                    oldY = null;
                }
            }
        }
        ctx.restore();
    }
    /**
     * @return {undefined}
     */
    function drawBackground() {
        if(za && copy.width) {
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
        for(; i < items.length; i++) {
            words += items[i].n * items[i].n;
        }
        return words;
    }

    function getPlayerCells() {
        return items;
    }
    /**
     * @return {undefined}
     */
    function create() {
        /** @type {null} */
        img = null;
        if(null != angles || 0 != users.length) {
            if(null != angles || result) {
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
                if(null == angles) {
                    /** @type {string} */
                    ctx.font = "20px Ubuntu";
                    /** @type {number} */
                    i = 0;
                    for(; i < users.length; ++i) {
                        t = users[i].name || "An unnamed cell";
                        if(!result) {
                            /** @type {string} */
                            t = "An unnamed cell";
                        }
                        if(-1 != ids.indexOf(users[i].id)) {
                            if(items[0].name) {
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
                    for(; i < angles.length; ++i) {
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
        /*console.log(key)//key/id
         console.log(arg)// X value
          console.log(y)// Y value
           console.log(s)//Size
            console.log(value)//Color
             console.log(range)//Name*/
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
        if(socket) {
            /** @type {number} */
            this.r = socket;
        }
        if(dataAndEvents) {
            /** @type {string} */
            this.N = dataAndEvents;
        }
        /** @type {boolean} */
        this.P = !!opts;
        if(inS) {
            /** @type {string} */
            this.s = inS;
        }
    }
    /** @type {string} */
    var index = self.location.protocol;
    /** @type {boolean} */
    var lastPart = "https:" == index;
    if(self.location.ancestorOrigins && (self.location.ancestorOrigins.length && "https://apps.facebook.com" != self.location.ancestorOrigins[0])) {
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
        var codeSegments = [];
        /** @type {Array} */
        var innerItems = [];
        /** @type {Array} */
        var users = [];
        /** @type {number} */
        var mx = 0;
        /** @type {number} */
        var y = 0;
        /** @type {number} */
        var start = -1;
        /** @type {number} */
        var t2 = -1;
        /** @type {number} */
        var bb = 0;
        /** @type {number} */
        var left = 0;
        /** @type {null} */
        var b = null;
        var myID = null;
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
        var saved = null;
        /** @type {boolean} */
        var j = true;
        /** @type {boolean} */
        var result = true;
        /** @type {boolean} */
        var doneResults = false;
        /** @type {boolean} */
        var ta = false;
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
        var dest = "";
        /** @type {null} */
        var angles = null;
        /** @type {boolean} */
        var ma = false;
        /** @type {boolean} */
        var sa = false;
        /** @type {number} */
        var argumentOffset = 0;
        /** @type {number} */
        var cur = 0;
        /** @type {number} */
        var xr = 0;
        /** @type {number} */
        var tmp = 0;
        /** @type {number} */
        var compassResult = 0;
        /** @type {Array} */
        var cs = ["#333333", "#FF3333", "#33FF33", "#3333FF"];
        /** @type {boolean} */
        var $timeout = false;
        /** @type {number} */
        var len = 1;
        /** @type {boolean} */
        var za = "ontouchstart" in self && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        /** @type {Image} */
        var copy = new Image;
        /** @type {string} */
        copy.src = "img/split.png";
        /** @type {Element} */
        var test_canvas = document.createElement("canvas");
        if("undefined" == typeof console || ("undefined" == typeof DataView || ("undefined" == typeof WebSocket || (null == test_canvas || (null == test_canvas.getContext || null == self.localStorage))))) {
            alert("You browser does not support this game, we recommend you to use Firefox to play this");
        } else {
            /** @type {null} */
            var old = null;
            /**
             * @param {Function} _b
             * @return {undefined}
             */
            self.setNick = function(_b) {
                rule();
                /** @type {Function} */
                b = _b;
                write();
                /** @type {number} */
                closingAnimationTime = 0;
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
             * @param {string} subKey
             * @return {undefined}
             */
            self.setNames = function(subKey) {
                /** @type {string} */
                result = subKey;
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
                myID = null
                registerEvent(1);
                rule();
            };
            /**
             * @param {string} mat
             * @return {undefined}
             */
            self.setGameMode = function(mat) {
                if(mat != dest) {
                    /** @type {string} */
                    dest = mat;
                    connect();
                }
            };
            self.setAlpha = function(stat) {
                MyAlpha = parseFloat(stat);
            };
            /**
             * @param {boolean} _$timeout_
             * @return {undefined}
             */
            self.setAcid = function(_$timeout_) {
                /** @type {boolean} */
                $timeout = _$timeout_;
            };
            self.getPlayerCell = function() {
                return args[myID];
            };
            self.setRainbowMe = function(status) {
                rainbowMe = status;
            };
            self.setRainbowOthers = function(status) {
                rainbowOthers = status;
            };
            self.getGame = function() {
                return this;
            };
            self.setIndicators = function(status) {
                indicatorsEnabled = status;
            };
            self.setBGURL = function(url) {
                backgroundImg = new Image();
                backgroundImg.src = url;
            }
            if(null != self.localStorage) {
                if(null == self.localStorage.AB8) {
                    /** @type {number} */
                    self.localStorage.AB8 = 0 + ~~(100 * Math.random());
                }
                /** @type {number} */
                compassResult = +self.localStorage.AB8;
                /** @type {number} */
                self.ABGroup = compassResult;
            }
            $.get(index + "//gc.agar.io", function(prop) {
                var name = prop.split(" ");
                prop = name[0];
                name = name[1] || "";
                if(-1 == ["UA"].indexOf(prop)) {
                    numbers.push("ussr");
                }
                if(input.hasOwnProperty(prop)) {
                    if("string" == typeof input[prop]) {
                        if(!saved) {
                            reset(input[prop]);
                        }
                    } else {
                        if(input[prop].hasOwnProperty(name)) {
                            if(!saved) {
                                reset(input[prop][name]);
                            }
                        }
                    }
                }
            }, "text");
            setTimeout(function() {}, 3E5);
            var input = {
                AF: "JP-Tokyo",
                AX: "EU-London",
                AL: "EU-London",
                DZ: "EU-London",
                AS: "SG-Singapore",
                AD: "EU-London",
                AO: "EU-London",
                AI: "US-Atlanta",
                AG: "US-Atlanta",
                AR: "BR-Brazil",
                AM: "JP-Tokyo",
                AW: "US-Atlanta",
                AU: "SG-Singapore",
                AT: "EU-London",
                AZ: "JP-Tokyo",
                BS: "US-Atlanta",
                BH: "JP-Tokyo",
                BD: "JP-Tokyo",
                BB: "US-Atlanta",
                BY: "EU-London",
                BE: "EU-London",
                BZ: "US-Atlanta",
                BJ: "EU-London",
                BM: "US-Atlanta",
                BT: "JP-Tokyo",
                BO: "BR-Brazil",
                BQ: "US-Atlanta",
                BA: "EU-London",
                BW: "EU-London",
                BR: "BR-Brazil",
                IO: "JP-Tokyo",
                VG: "US-Atlanta",
                BN: "JP-Tokyo",
                BG: "EU-London",
                BF: "EU-London",
                BI: "EU-London",
                KH: "JP-Tokyo",
                CM: "EU-London",
                CA: "US-Atlanta",
                CV: "EU-London",
                KY: "US-Atlanta",
                CF: "EU-London",
                TD: "EU-London",
                CL: "BR-Brazil",
                CN: "CN-China",
                CX: "JP-Tokyo",
                CC: "JP-Tokyo",
                CO: "BR-Brazil",
                KM: "EU-London",
                CD: "EU-London",
                CG: "EU-London",
                CK: "SG-Singapore",
                CR: "US-Atlanta",
                CI: "EU-London",
                HR: "EU-London",
                CU: "US-Atlanta",
                CW: "US-Atlanta",
                CY: "JP-Tokyo",
                CZ: "EU-London",
                DK: "EU-London",
                DJ: "EU-London",
                DM: "US-Atlanta",
                DO: "US-Atlanta",
                EC: "BR-Brazil",
                EG: "EU-London",
                SV: "US-Atlanta",
                GQ: "EU-London",
                ER: "EU-London",
                EE: "EU-London",
                ET: "EU-London",
                FO: "EU-London",
                FK: "BR-Brazil",
                FJ: "SG-Singapore",
                FI: "EU-London",
                FR: "EU-London",
                GF: "BR-Brazil",
                PF: "SG-Singapore",
                GA: "EU-London",
                GM: "EU-London",
                GE: "JP-Tokyo",
                DE: "EU-London",
                GH: "EU-London",
                GI: "EU-London",
                GR: "EU-London",
                GL: "US-Atlanta",
                GD: "US-Atlanta",
                GP: "US-Atlanta",
                GU: "SG-Singapore",
                GT: "US-Atlanta",
                GG: "EU-London",
                GN: "EU-London",
                GW: "EU-London",
                GY: "BR-Brazil",
                HT: "US-Atlanta",
                VA: "EU-London",
                HN: "US-Atlanta",
                HK: "JP-Tokyo",
                HU: "EU-London",
                IS: "EU-London",
                IN: "JP-Tokyo",
                ID: "JP-Tokyo",
                IR: "JP-Tokyo",
                IQ: "JP-Tokyo",
                IE: "EU-London",
                IM: "EU-London",
                IL: "JP-Tokyo",
                IT: "EU-London",
                JM: "US-Atlanta",
                JP: "JP-Tokyo",
                JE: "EU-London",
                JO: "JP-Tokyo",
                KZ: "JP-Tokyo",
                KE: "EU-London",
                KI: "SG-Singapore",
                KP: "JP-Tokyo",
                KR: "JP-Tokyo",
                KW: "JP-Tokyo",
                KG: "JP-Tokyo",
                LA: "JP-Tokyo",
                LV: "EU-London",
                LB: "JP-Tokyo",
                LS: "EU-London",
                LR: "EU-London",
                LY: "EU-London",
                LI: "EU-London",
                LT: "EU-London",
                LU: "EU-London",
                MO: "JP-Tokyo",
                MK: "EU-London",
                MG: "EU-London",
                MW: "EU-London",
                MY: "JP-Tokyo",
                MV: "JP-Tokyo",
                ML: "EU-London",
                MT: "EU-London",
                MH: "SG-Singapore",
                MQ: "US-Atlanta",
                MR: "EU-London",
                MU: "EU-London",
                YT: "EU-London",
                MX: "US-Atlanta",
                FM: "SG-Singapore",
                MD: "EU-London",
                MC: "EU-London",
                MN: "JP-Tokyo",
                ME: "EU-London",
                MS: "US-Atlanta",
                MA: "EU-London",
                MZ: "EU-London",
                MM: "JP-Tokyo",
                NA: "EU-London",
                NR: "SG-Singapore",
                NP: "JP-Tokyo",
                NL: "EU-London",
                NC: "SG-Singapore",
                NZ: "SG-Singapore",
                NI: "US-Atlanta",
                NE: "EU-London",
                NG: "EU-London",
                NU: "SG-Singapore",
                NF: "SG-Singapore",
                MP: "SG-Singapore",
                NO: "EU-London",
                OM: "JP-Tokyo",
                PK: "JP-Tokyo",
                PW: "SG-Singapore",
                PS: "JP-Tokyo",
                PA: "US-Atlanta",
                PG: "SG-Singapore",
                PY: "BR-Brazil",
                PE: "BR-Brazil",
                PH: "JP-Tokyo",
                PN: "SG-Singapore",
                PL: "EU-London",
                PT: "EU-London",
                PR: "US-Atlanta",
                QA: "JP-Tokyo",
                RE: "EU-London",
                RO: "EU-London",
                RU: "RU-Russia",
                RW: "EU-London",
                BL: "US-Atlanta",
                SH: "EU-London",
                KN: "US-Atlanta",
                LC: "US-Atlanta",
                MF: "US-Atlanta",
                PM: "US-Atlanta",
                VC: "US-Atlanta",
                WS: "SG-Singapore",
                SM: "EU-London",
                ST: "EU-London",
                SA: "EU-London",
                SN: "EU-London",
                RS: "EU-London",
                SC: "EU-London",
                SL: "EU-London",
                SG: "JP-Tokyo",
                SX: "US-Atlanta",
                SK: "EU-London",
                SI: "EU-London",
                SB: "SG-Singapore",
                SO: "EU-London",
                ZA: "EU-London",
                SS: "EU-London",
                ES: "EU-London",
                LK: "JP-Tokyo",
                SD: "EU-London",
                SR: "BR-Brazil",
                SJ: "EU-London",
                SZ: "EU-London",
                SE: "EU-London",
                CH: "EU-London",
                SY: "EU-London",
                TW: "JP-Tokyo",
                TJ: "JP-Tokyo",
                TZ: "EU-London",
                TH: "JP-Tokyo",
                TL: "JP-Tokyo",
                TG: "EU-London",
                TK: "SG-Singapore",
                TO: "SG-Singapore",
                TT: "US-Atlanta",
                TN: "EU-London",
                TR: "TK-Turkey",
                TM: "JP-Tokyo",
                TC: "US-Atlanta",
                TV: "SG-Singapore",
                UG: "EU-London",
                UA: "EU-London",
                AE: "EU-London",
                GB: "EU-London",
                US: {
                    AL: "US-Atlanta",
                    AK: "US-Fremont",
                    AZ: "US-Fremont",
                    AR: "US-Atlanta",
                    CA: "US-Fremont",
                    CO: "US-Fremont",
                    CT: "US-Atlanta",
                    DE: "US-Atlanta",
                    FL: "US-Atlanta",
                    GA: "US-Atlanta",
                    HI: "US-Fremont",
                    ID: "US-Fremont",
                    IL: "US-Atlanta",
                    IN: "US-Atlanta",
                    IA: "US-Atlanta",
                    KS: "US-Atlanta",
                    KY: "US-Atlanta",
                    LA: "US-Atlanta",
                    ME: "US-Atlanta",
                    MD: "US-Atlanta",
                    MA: "US-Atlanta",
                    MI: "US-Atlanta",
                    MN: "US-Fremont",
                    MS: "US-Atlanta",
                    MO: "US-Atlanta",
                    MT: "US-Fremont",
                    NE: "US-Fremont",
                    NV: "US-Fremont",
                    NH: "US-Atlanta",
                    NJ: "US-Atlanta",
                    NM: "US-Fremont",
                    NY: "US-Atlanta",
                    NC: "US-Atlanta",
                    ND: "US-Fremont",
                    OH: "US-Atlanta",
                    OK: "US-Atlanta",
                    OR: "US-Fremont",
                    PA: "US-Atlanta",
                    RI: "US-Atlanta",
                    SC: "US-Atlanta",
                    SD: "US-Fremont",
                    TN: "US-Atlanta",
                    TX: "US-Atlanta",
                    UT: "US-Fremont",
                    VT: "US-Atlanta",
                    VA: "US-Atlanta",
                    WA: "US-Fremont",
                    WV: "US-Atlanta",
                    WI: "US-Atlanta",
                    WY: "US-Fremont",
                    DC: "US-Atlanta",
                    AS: "US-Atlanta",
                    GU: "US-Atlanta",
                    MP: "US-Atlanta",
                    PR: "US-Atlanta",
                    UM: "US-Atlanta",
                    VI: "US-Atlanta"
                },
                UM: "SG-Singapore",
                VI: "US-Atlanta",
                UY: "BR-Brazil",
                UZ: "JP-Tokyo",
                VU: "SG-Singapore",
                VE: "BR-Brazil",
                VN: "JP-Tokyo",
                WF: "SG-Singapore",
                EH: "EU-London",
                YE: "JP-Tokyo",
                ZM: "EU-London",
                ZW: "EU-London"
            };
            /** @type {function (string, string): undefined} */
            self.connect = open;
            /** @type {number} */
            var backoff = 500;
            /** @type {number} */
            var end = -1;
            /** @type {number} */
            var t1 = -1;
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
            /** Stuff **/
            //TODO: move all skins over to my domain
            var custoSkins = {
                "lokio": "http://i.imgur.com/nbMjYAU.jpg",
                "lokio27": "http://i.imgur.com/nbMjYAU.jpg",
                "fire": "http://files.gamebanana.com/img/ico/sprays/_1611-.png",
                "fireflower": "http://files.gamebanana.com/img/ico/sprays/_1611-.png",
                "maro": "http://i1114.photobucket.com/albums/k522/Lokio27/SubparMario_zpsa7b3fc2z.png",
                "spideyskin": "http://terminalbit.com/agario/skins/spideyskin.png",
                "flash": "http://terminalbit.com/agario/skins/flash.png"
            };
            var custoArray = [];
            for(var i in custoSkins) {
                custoArray.push(i);
            }
            fn.prototype = {
                id: 0,
                a: null,
                l: null,
                name: null,
                k: null,
                J: null,
                x: 0,
                y: 0,
                size: 0,
                p: 0,
                q: 0,
                o: 0,
                D: 0,
                F: 0,
                n: 0,
                W: 0,
                L: 0,
                ja: 0,
                ba: 0,
                A: false,
                d: false,
                j: false,
                M: true,
                beforeRainbow: null,
                beforeIndicators: null,
                /**
                 * @return {undefined}
                 */
                S: function() {
                    var i;
                    /** @type {number} */
                    i = 0;
                    for(; i < codeSegments.length; i++) {
                        if(codeSegments[i] == this) {
                            codeSegments.splice(i, 1);
                            break;
                        }
                    }
                    //console.log("Dead?" + this.name)
                    delete args[this.id];
                    i = items.indexOf(this);
                    if(-1 != i) {
                        /** @type {boolean} */
                        ta = true;
                        items.splice(i, 1);
                    }
                    i = ids.indexOf(this.id);
                    if(-1 != i) {
                        ids.splice(i, 1);
                    }
                    /** @type {boolean} */
                    this.A = true;
                    innerItems.push(this);
                },
                /**
                 * @return {?}
                 */
                h: function() {
                    return Math.max(~~(0.6 * this.size), 24);
                },
                /**
                 * @param {string} n
                 * @return {undefined}
                 */
                Z: function(n) {
                    if(this.name = n) {
                        if(null == this.k) {
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
                R: function() {
                    var a = this.C();
                    for(; this.a.length > a;) {
                        /** @type {number} */
                        var i = ~~(Math.random() * this.a.length);
                        this.a.splice(i, 1);
                        this.l.splice(i, 1);
                    }
                    if(0 == this.a.length) {
                        if(0 < a) {
                            this.a.push({
                                Q: this,
                                e: this.size,
                                x: this.x,
                                y: this.y
                            });
                            this.l.push(Math.random() - 0.5);
                        }
                    }
                    for(; this.a.length < a;) {
                        /** @type {number} */
                        i = ~~(Math.random() * this.a.length);
                        var e = this.a[i];
                        this.a.splice(i, 0, {
                            Q: this,
                            e: e.e,
                            x: e.x,
                            y: e.y
                        });
                        this.l.splice(i, 0, this.l[i]);
                    }
                },
                /**
                 * @return {?}
                 */
                C: function() {
                    if(0 == this.id) {
                        return 16;
                    }
                    /** @type {number} */
                    var rh = 10;
                    if(20 > this.size) {
                        /** @type {number} */
                        rh = 0;
                    }
                    if(this.d) {
                        /** @type {number} */
                        rh = 30;
                    }
                    var w = this.size;
                    if(!this.d) {
                        w *= ratio;
                    }
                    w *= WEEK_LENGTH;
                    if(this.W & 32) {
                        w *= 0.25;
                    }
                    return ~~Math.max(w, rh);
                },
                /**
                 * @return {undefined}
                 */
                ha: function() {
                    this.R();
                    var points = this.a;
                    var comparisons = this.l;
                    var n = points.length;
                    /** @type {number} */
                    var i = 0;
                    for(; i < n; ++i) {
                        var s = comparisons[(i - 1 + n) % n];
                        var t = comparisons[(i + 1) % n];
                        comparisons[i] += (Math.random() - 0.5) * (this.j ? 3 : 1);
                        comparisons[i] *= 0.7;
                        if(10 < comparisons[i]) {
                            /** @type {number} */
                            comparisons[i] = 10;
                        }
                        if(-10 > comparisons[i]) {
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
                    for(; i < n; ++i) {
                        var ret = points[i].e;
                        s = points[(i - 1 + n) % n].e;
                        t = points[(i + 1) % n].e;
                        if(15 < this.size && (null != r && (20 < this.size * ratio && 0 != this.id))) {
                            /** @type {boolean} */
                            var l = false;
                            var x = points[i].x;
                            var y = points[i].y;
                            r.ia(x - 5, y - 5, 10, 10, function(node) {
                                if(node.Q != ELEMENT_NODE) {
                                    if(25 > (x - node.x) * (x - node.x) + (y - node.y) * (y - node.y)) {
                                        /** @type {boolean} */
                                        l = true;
                                    }
                                }
                            });
                            if(!l) {
                                if(points[i].x < max || (points[i].y < length || (points[i].x > min || points[i].y > from))) {
                                    /** @type {boolean} */
                                    l = true;
                                }
                            }
                            if(l) {
                                if(0 < comparisons[i]) {
                                    /** @type {number} */
                                    comparisons[i] = 0;
                                }
                                comparisons[i] -= 1;
                            }
                        }
                        ret += comparisons[i];
                        if(0 > ret) {
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
                        if(this.d) {
                            if(0 == i % 2) {
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
                K: function() {
                    if(0 == this.id) {
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
                    if(this.A && 1 <= o) {
                        var domIndex = innerItems.indexOf(this);
                        if(-1 != domIndex) {
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
                I: function() {
                    return 0 == this.id ? true : this.x + this.size + 40 < px - width / 2 / ratio || (this.y + this.size + 40 < size - height / 2 / ratio || (this.x - this.size - 40 > px + width / 2 / ratio || this.y - this.size - 40 > size + height / 2 / ratio)) ? false : true;
                },
                /**
                 * @param {CanvasRenderingContext2D} ctx
                 * @return {undefined}
                 */
                T: function(ctx) {
                    if(this.I()) {
                        /** @type {boolean} */
                        var y_position = 0 != this.id && (!this.d && (!this.j && 0.4 > ratio));
                        if(5 > this.C()) {
                            /** @type {boolean} */
                            y_position = true;
                        }
                        if(this.M && !y_position) {
                            /** @type {number} */
                            var val = 0;
                            for(; val < this.a.length; val++) {
                                this.a[val].e = this.size;
                            }
                        }
                        /** @type {boolean} */
                        this.M = y_position;
                        ctx.save();
                        this.ba = left;
                        val = this.K();
                        if(this.A) {
                            ctx.globalAlpha *= 1 - val;
                        }
                        /** @type {number} */
                        ctx.lineWidth = 10;
                        /** @type {string} */
                        ctx.lineCap = "round";
                        /** @type {string} */
                        ctx.lineJoin = this.d ? "miter" : "round";
                        if(doneResults) {
                            /** @type {string} */
                            ctx.fillStyle = "#FFFFFF"; //magic
                            /** @type {string} */
                            ctx.strokeStyle = "#AAAAAA"; //shadow
                        } else {
                            //ctx.fillStyle = this.color;
                            var d = new Date();
                            var n = d.getMilliseconds() / 100;
                            if(this.name == b) {
                                if(rainbowMe) {
                                    if(this.beforeRainbow == null) {
                                        this.beforeRainbow = this.color;
                                    }
                                    this.color = rgbToHex(Math.abs(Math.round(Math.sin(n) * 255)), Math.abs(Math.round(Math.sin(n * 1.3) * 255)), Math.abs(Math.round(Math.sin(n * 1.8) * 255)));
                                } else {
                                    if(this.beforeRainbow != null) {
                                        this.color = this.beforeRainbow;
                                        this.beforeRainbow = null
                                    }
                                }
                            } else {
                                if(rainbowOthers) {
                                    if(this.beforeRainbow == null) {
                                        this.beforeRainbow = this.color;
                                    }
                                    this.color = rgbToHex(Math.abs(Math.round(Math.sin(n) * 255)), Math.abs(Math.round(Math.sin(n * 1.3) * 255)), Math.abs(Math.round(Math.sin(n * 1.8) * 255)));
                                } else {
                                    if(this.beforeRainbow != null) {
                                        this.color = this.beforeRainbow;
                                        this.beforeRainbow = null
                                    }
                                }
                            }
                            var myCells = getPlayerCells();
                            var thisIsMyCell = false;
                            for(var i = 0; i < myCells.length; i++) {
                                if(this.id == myCells[i].id) {
                                    thisIsMyCell = true;
                                }
                            }
                            if(indicatorsEnabled) {
                                if(args[myID] == undefined || myID == null) {
                                    if(this.beforeIndicators != null) {
                                        this.color = this.beforeIndicators;
                                        this.beforeIndicators = null;
                                    }
                                } else if(!thisIsMyCell) {
                                    if(this.beforeIndicators == null) {
                                        this.beforeIndicators = this.color;
                                    }
                                    var thisMass = ~~(this.size * this.size / 100);
                                    var myMass = ~~(args[myID].size * args[myID].size / 100)
                                    if((this.d ? "miter" : "round") == "miter") {
                                        if(thisMass / myMass < 0.85) {
                                            this.color = rgbToHex(255, 0, 0);
                                        } else if(thisMass / myMass < 0.80) {
                                            this.color = rgbToHex(255, 255, 0);
                                        } else {
                                            this.color = rgbToHex(0, 255, 0);
                                        }
                                    } else {
                                        if(myMass / thisMass < 0.90) {
                                            this.color = rgbToHex(255, 0, 0);
                                        } else if(myMass / thisMass < 0.95) {
                                            this.color = rgbToHex(255, 255, 0);
                                        } else if(!(thisMass / myMass < 0.90)) {
                                            this.color = rgbToHex(0, 255, 0)
                                        } else {
                                            this.color = rgbToHex(0, 0, 255)
                                        }
                                    }
                                }
                            }
                            ctx.fillStyle = this.color; //WE COLOR STUFF HERE :DDD
                            ctx.strokeStyle = this.color;
                            ctx.globalAlpha = MyAlpha;
                        }
                        if(y_position) {
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                        } else {
                            this.ha();
                            ctx.beginPath();
                            var i = this.C();
                            ctx.moveTo(this.a[0].x, this.a[0].y);
                            /** @type {number} */
                            val = 1;
                            for(; val <= i; ++val) {
                                /** @type {number} */
                                var obj = val % i;
                                ctx.lineTo(this.a[obj].x, this.a[obj].y);
                            }
                        }
                        ctx.closePath();
                        i = this.name.toLowerCase();
                        if(!this.j && (j)) {
                            if(-1 != numbers.indexOf(i)) {
                                if(!imgs.hasOwnProperty(i)) {
                                    /** @type {Image} */
                                    imgs[i] = new Image;
                                    /** @type {string} */
                                    imgs[i].src = "skins/" + i + ".png";
                                }
                                val = 0 != imgs[i].width && imgs[i].complete ? imgs[i] : null;
                            } else if(i in custoSkins) {
                                if(!imgs.hasOwnProperty(i)) {
                                    /** @type {Image} */
                                    imgs[i] = new Image;
                                    /** @type {string} */
                                    imgs[i].src = custoSkins[i];
                                }
                                val = 0 != imgs[i].width && imgs[i].complete ? imgs[i] : null;
                            } else if(-1 != i.indexOf("i/")) {
                                //if (!imgs.hasOwnProperty(i)) {
                                /** @type {Image} */
                                imgs[i] = new Image;
                                /** @type {string} */
                                imgs[i].src = "http://i.imgur.com/" + this.name.replace("i/", "");
                                //}
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
                        if(!y_position) {
                            ctx.stroke();
                        }
                        ctx.fill();
                        if(!(null == obj)) {
                            if(!val) {
                                ctx.save();
                                ctx.clip();
                                ctx.drawImage(obj, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size);
                                ctx.restore();
                            }
                        }
                        if(doneResults || 15 < this.size) {
                            if(!y_position) {
                                /** @type {string} */
                                ctx.strokeStyle = "#000000";
                                ctx.globalAlpha *= 0.1;
                                ctx.stroke();
                            }
                        }
                        /** @type {number} */
                        ctx.globalAlpha = 1;
                        if(null != obj) {
                            if(val) {
                                ctx.drawImage(obj, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
                            }
                        }
                        /** @type {boolean} */
                        val = -1 != items.indexOf(this);
                        if(0 != this.id) {
                            /** @type {number} */
                            y_position = ~~this.y;
                            if((result || val) && (this.name && (this.k && (null == obj || -1 == reserved.indexOf(i)) && this.name.indexOf("i/") == -1 && -1 == custoArray.indexOf(i)))) {
                                obj = this.k;
                                obj.u(this.name); //Name Text
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
                            if(text) {
                                if(val || 0 == items.length && ((!this.d || this.j) && 20 < this.size)) {
                                    if(null == this.J) {
                                        this.J = new WS(this.h() / 2, "#FFFFFF", true, "#000000");
                                    }
                                    val = this.J;
                                    val.H(this.h() / 2);
                                    val.u(~~(this.size * this.size / 100)); //Mass Text
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
                w: "",
                N: "#000000",
                P: false,
                s: "#000000",
                r: 16,
                m: null,
                O: null,
                g: false,
                v: 1,
                /**
                 * @param {number} r
                 * @return {undefined}
                 */
                H: function(r) {
                    if(this.r != r) {
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
                $: function(x) {
                    if(this.v != x) {
                        this.v = x;
                        /** @type {boolean} */
                        this.g = true;
                    }
                },
                /**
                 * @param {string} s
                 * @return {undefined}
                 */
                setStrokeColor: function(s) {
                    if(this.s != s) {
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
                u: function(n) {
                    if(n != this.w) {
                        /** @type {string} */
                        this.w = n;
                        /** @type {boolean} */
                        this.g = true;
                    }
                },
                /**
                 * @return {?}
                 */
                G: function() {
                    if(null == this.m) {
                        /** @type {Element} */
                        this.m = document.createElement("canvas");
                        this.O = this.m.getContext("2d");
                    }
                    if(this.g) {
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
                        if(this.P) {
                            canvas.strokeText(caracter, 3, y - height / 2);
                        }
                        canvas.fillText(caracter, 3, y - height / 2);
                    }
                    return this.m;
                }
            };
            if(!Date.now) {
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
                ca: function(start) {
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
                        x: 0,
                        y: 0,
                        f: 0,
                        c: 0,
                        depth: 0,
                        items: null,
                        b: null,
                        /**
                         * @param {Object} b
                         * @return {?}
                         */
                        B: function(b) {
                            /** @type {number} */
                            var i = 0;
                            for(; i < this.items.length; ++i) {
                                var item = this.items[i];
                                if(item.x >= b.x && (item.y >= b.y && (item.x < b.x + b.f && item.y < b.y + b.c))) {
                                    return true;
                                }
                            }
                            if(0 != this.b.length) {
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
                        t: function(message, deepDataAndEvents) {
                            /** @type {number} */
                            var i = 0;
                            for(; i < this.items.length; ++i) {
                                deepDataAndEvents(this.items[i]);
                            }
                            if(0 != this.b.length) {
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
                        i: function(deepDataAndEvents) {
                            if(0 != this.b.length) {
                                this.b[this.U(deepDataAndEvents)].i(deepDataAndEvents);
                            } else {
                                if(this.items.length >= params && this.depth < header_depth) {
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
                        U: function(_pt) {
                            return _pt.x < this.x + this.f / 2 ? _pt.y < this.y + this.c / 2 ? 0 : 2 : _pt.y < this.y + this.c / 2 ? 1 : 3;
                        },
                        /**
                         * @param {Object} e
                         * @param {Function} d
                         * @return {?}
                         */
                        V: function(e, d) {
                            return e.x < this.x + this.f / 2 && (e.y < this.y + this.c / 2 && d(0) || e.y >= this.y + this.c / 2 && d(2)) || e.x >= this.x + this.f / 2 && (e.y < this.y + this.c / 2 && d(1) || e.y >= this.y + this.c / 2 && d(3)) ? true : false;
                        },
                        /**
                         * @return {undefined}
                         */
                        aa: function() {
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
                            for(; i < codeSegments.length; i++) {
                                this.i(codeSegments[i]);
                            }
                        },
                        /**
                         * @return {undefined}
                         */
                        clear: function() {
                            /** @type {number} */
                            var i = 0;
                            for(; i < this.b.length; i++) {
                                this.b[i].clear();
                            }
                            /** @type {number} */
                            this.items.length = 0;
                            /** @type {number} */
                            this.b.length = 0;
                        }
                    };
                    var obj = {
                        x: 0,
                        y: 0,
                        f: 0,
                        c: 0
                    };
                    return {
                        root: new Node(start.X, start.Y, start.fa - start.X, start.ga - start.Y, 0),
                        /**
                         * @param {?} deepDataAndEvents
                         * @return {undefined}
                         */
                        i: function(deepDataAndEvents) {
                            this.root.i(deepDataAndEvents);
                        },
                        /**
                         * @param {?} text
                         * @param {?} deepDataAndEvents
                         * @return {undefined}
                         */
                        t: function(text, deepDataAndEvents) {
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
                        ia: function(x, rotation, s, source, deepDataAndEvents) {
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
                        B: function(x) {
                            return this.root.B(x);
                        },
                        /**
                         * @return {undefined}
                         */
                        clear: function() {
                            this.root.clear();
                        }
                    };
                }
            };
            /** @type {function (): undefined} */
            self.onload = init;
        }
    }})(window, window.jQuery)