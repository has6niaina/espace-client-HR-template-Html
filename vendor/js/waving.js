const ezyQuery = function(e = null) {
    const ks = (o = {}, f = null) => f ? Object.keys(o).forEach(f) : Object.keys(o);
    const fn = {
        $: null,
        data(k, v) {
            if(v) {
                this.$['ô'] = this.$['ô'] || {};
                this.$['ô'][k] = v;
            }
            return this.$['ô'][k];
        },
        attr(k, v) {
            if(v) {
                this.$.setAttribute(k,v);
                return this.$;
            } else {
                return this.$.getAttribute(k)
            }
        },
        each(fn) {
            fn && [...(this.length == 1 ? [this] : this)].forEach(fn)
        },
        parent() { return ezyQuery(this.$.parentNode)},
        hasClass(k) { return this.$.classList.contains(k)},
        addClass(k) { k && String(k).length && this.$.classList.add(k); return this.$},
        removeClass(k) { this.$.classList.remove(k); return this.$},
        toggleClass(k) { this.$.classList.contains(k) ? this.removeClass(k) : this.addClass(k) ; return this.$},
        on(ev, fn) { this.$.addEventListener(ev, fn, false); return this.$; },
        css(o) { ks(o).forEach((k) => { this.$.style[k] = o[k] }); return this.$; },
        html(v) { this.$.innerHTML = v; return this.$; },
        text(v) { return v ? ((this.$.innerText = v), s) : this.$.innerText },
        find(_) { return ezyQuery(this.$.querySelector(_)); },
        eq(item) { return this.$.length > 1 ? this.$[0] : this.$ },
        create(t, p) {
            const c = document.createElement(t);
            ks(p, (k) => { c.setAttribute(k, p[k]) })
            return ezyQuery(c);
        }
    }
    var v = fn;
    if(!e) return fn;
    const s = typeof e == "string" ? document.querySelectorAll(e) : [].concat(e);
    if(s && s.length) {
        fn.$ = s[0];
        ks(fn).forEach((k) => { s[0][k] = fn[k];})
        v = s ? s[0] : fn;
    }
    return v;
}

const ezyWave = (function(selector, options) {
    options = options || {};
    window.AudioContext = (function(){
        return  window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
    })();

    // Global Variables for Audio
    var settings = {};
    var audioElement = new Audio();
    var volumeAE = 1;
    audioElement.crossOrigin = "anonymous";
    var isAudio = false;
    var _a = new Audio();
    var audioDataDuration = 0;
    var currentTime = 0;
    var audioContext;
    var audioBuffer;
    var sourceNode;
    var analyserNode;
    var javascriptNode;
    var audioData = null;
    var audioPlaying = false;
    var sampleSize = 1024;  // number of samples to collect before analyzing data
    var amplitudeArray;     // array to hold time domain data

    // This must be hosted on the same server as this page - otherwise you get a Cross Site Scripting error
    var audioUrl = "";

    // Global Variables for the Graphics
    var canvasWidth  = 512;
    var canvasHeight = 256;
    var ctx, ctx2d;
    var parent;
    const icons = {
        loader: `<svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle> </svg>`,
        play: `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="play"><g><path  fill="#fff" d="M4.993,2.496C4.516,2.223,4,2.45,4,3v26c0,0.55,0.516,0.777,0.993,0.504l22.826-13.008    c0.478-0.273,0.446-0.719-0.031-0.992L4.993,2.496z"/><path  fill="#fff" d="M4.585,30.62L4.585,30.62C3.681,30.62,3,29.923,3,29V3c0-0.923,0.681-1.62,1.585-1.62c0.309,0,0.621,0.085,0.904,0.248    l22.794,13.007c0.559,0.319,0.878,0.823,0.878,1.382c0,0.548-0.309,1.039-0.847,1.347L5.488,30.373    C5.206,30.534,4.894,30.62,4.585,30.62z M5,3.651v24.698l21.655-12.34L5,3.651z"/></g></g><g id="stop"/><g id="pause"/><g id="replay"/><g id="next"/><g id="Layer_8"/><g id="search"/><g id="list"/><g id="love"/><g id="menu"/><g id="add"/><g id="headset"/><g id="random"/><g id="music"/><g id="setting"/><g id="Layer_17"/><g id="Layer_18"/><g id="Layer_19"/><g id="Layer_20"/><g id="Layer_21"/><g id="Layer_22"/><g id="Layer_23"/><g id="Layer_24"/><g id="Layer_25"/><g id="Layer_26"/></svg>`,

        pause:  `<svg viewBox="135.664 106.643 22.967 32.961" width="22.967" height="32.961">
					  <path fill="#fff" d="M 140.585 106.643 C 137.867 106.643 135.664 109.102 135.664 112.136 L 135.664 134.11 C 135.664 137.144 137.867 139.604 140.585 139.604 C 143.303 139.604 145.507 137.144 145.507 134.11 L 145.507 112.136 C 145.507 109.102 143.303 106.643 140.585 106.643 Z M 142.226 134.11 C 142.226 135.121 141.491 135.941 140.585 135.941 C 139.679 135.941 138.945 135.121 138.945 134.11 L 138.945 112.136 C 138.945 111.125 139.679 110.305 140.585 110.305 C 141.491 110.305 142.226 111.125 142.226 112.136 L 142.226 134.11 Z" style=""></path>
					  <path fill="#fff" d="M 153.709 106.643 C 150.991 106.643 148.788 109.102 148.788 112.136 L 148.788 134.11 C 148.788 137.144 150.991 139.604 153.709 139.604 C 156.427 139.604 158.631 137.144 158.631 134.11 L 158.631 112.136 C 158.631 109.102 156.427 106.643 153.709 106.643 Z M 155.35 134.11 C 155.35 135.121 154.615 135.941 153.709 135.941 C 152.803 135.941 152.069 135.121 152.069 134.11 L 152.069 112.136 C 152.069 111.125 152.803 110.305 153.709 110.305 C 154.615 110.305 155.35 111.125 155.35 112.136 L 155.35 134.11 Z" style=""></path>
					</svg>`

    }
    function init(selector) {
        parent = ezyQuery(selector);
        let p  = options.style ?  ezyQuery().create('div', {id: 'player-context'}) : parent;
        const v = ezyQuery().create('div', {id: 'volume'});
        const vi = ezyQuery().create('div', {id: 'volume-icon'});
        const vim = ezyQuery().create('div', {id: 'volume-icon-max'});
        const vb = ezyQuery().create('div', {id: 'volume-bar'});
        const title = ezyQuery().create('div', {id: 'title'});
        const subtitle = ezyQuery().create('div', {id: 'subtitle'});

        parent.addClass(options.style)
        if(options.style) {
            const step = ezyQuery().create('div', {id: 'volume-step'});
            vb.appendChild(step)
        }
        if(options.style) {

            parent.appendChild(ezyQuery().create('div', {id: 'slide'}));
            parent.appendChild(p);
        }

        v.appendChild(vi);
        v.appendChild(vb);
        v.appendChild(vim);

        const icn = ezyQuery().create('div', {id: 'icn'});
        const msg = ezyQuery().create('div', {id: 'msg'});
        const c = ezyQuery().create('canvas', {id: 'canvas'}).css(options.style ? {
            height: '50px'
        } : {
            width: 'calc(100% - 50px)'
        })
        const sh = ezyQuery().create('div', {class: 'scrubBox-hover'});
        icn.insertAdjacentHTML('afterbegin', audioPlaying ?  icons.pause : icons.play);


        p.appendChild(title);
        p.appendChild(subtitle);

        p.appendChild(icn);
        if(options.style) {
            p.appendChild(v);
        }
        p.appendChild(c);
        p.appendChild(msg);
        p.appendChild(sh);


        if(!options.style) {
            p.css({
                display: 'flex',
                flexDirection: 'row'
            })
        }

        if(Object.keys(options).length > 0) {
            settings = Object.fromEntries(Object.entries(options).map(e => ['data-' + e[0], e[1]]));
            Object.keys(settings).forEach((k) => {
                p.setAttribute(k, settings[k]);
            })
        } else {
            settings = Object.fromEntries([...parent.attributes].map((d) => [d.name.includes('data-') ? d.name : 'data-' + d.name, d.value]));
        }


        isAudio = settings['data-type'] == "audio";
        if(isAudio && !options.style) {
            p.appendChild(v);
        }
        if(settings['data-src']) {
            audioUrl = settings['data-src'];
            audioElement.src = audioUrl
            // Set up the audio Analyser, the Source Buffer and javascriptNode
        }
        setTimeout(() => {
            vb.style.setProperty('--volume', vb.offsetWidth+ 'px');
        }, 1)
        ezyQuery(parent).find('#icn').on('click', function(ev) {
            parent.find('#icn').html(icons.loader);

            if(audioUrl.length && audioElement.duration > 0) {
                if(audioPlaying) {
                    audioPlaying = false;
                    audioElement.pause()
                } else {
                    audioElement.play();
                    audioPlaying = true;
                }
            } else {
                console.error('!!')
                setTimeout(() => {
                    msg.text('ERR: CODE 500, Ref: RKO');
                    msg.css({'display': 'flex'});
                    msg.css({'height': '20px'});
                    parent.find('#icn').html(icons.play);
                    setTimeout(() => {
                        msg.css({'display': 'none'});
                    }, 2000)
                }, 1000)
            }
        })

        // the AudioContext is the primary 'container' for all your audio node objects
        setTimeout(() => {
            try {
                audioContext = new AudioContext();
                setupAudioNodes();
            } catch(e) {
                alert('Web Audio API is not supported in this browser');
            }
        }, 100)
    }
    if(selector) {
        init(selector)
    }
    // Hacks to deal with different function names in different browsers
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback, element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function getCurrentTime(x) {
        var w = ctx.width;
        var p = x;
        var l = audioDataDuration;
        var d = (p / w) * l;

        return d;
    }
    function getPosition(x = 0) {
        var w = ctx.width;
        var p = x ? x : audioElement.currentTime;
        var l = audioElement.duration || 0;
        var d = w / (l / p)

        return d;
    }

    function getPositionVol(e, x) {
        var w = e.width;
        var p = x;
        var l = e.width;
        var d = (p / w) * l
        return d;
    }

    function getRectPosition() {
        var w = ctx.width / 2;
        var p = audioElement.currentTime;
        var l = audioElement.duration || 0;
        var d = w / (l / p)

        return d;
    }

    function queue() {
        const c = window['ôqueueAudio'];
        if(c && c != audioElement) {
            c.pause();
        }
        window['ôqueueAudio']= audioElement;
    }
    function toHHMM(sec) {
        return isNaN(sec) ? '00:00' : new Date(sec * 1000).toISOString().substr(14, 5)
    }
    function play(ev) {
        currentTime = getCurrentTime(ev.layerX) % audioDataDuration;
        queue();
    }
    if(isAudio) {
        parent.find('#volume #volume-icon').on('click', function(ev) {
            this.parent().toggleClass('muted');
            audioElement.volume = audioElement.volume == 0 ? volumeAE : volumeAE > 0 ? 0 : volumeAE;
        })

        parent.find('#volume #volume-icon-max').on('click', function(ev) {
            this.parent().toggleClass('max');
            this.parent().removeClass('muted');
            var w = parent.find('#volume #volume-bar');
            audioElement.volume = 1
            w.style.setProperty('--volume', w.offsetWidth + 'px')
        })


        parent.find('#volume #volume-bar').on('click', function(ev) {

            const v = Math.floor(getPositionVol({width: this.offsetWidth}, ev.layerX));
            const va = (v / this.offsetWidth);
            audioElement.volume = va;
            volumeAE = va;
            this.style.setProperty('--volume', v + 'px')

        })
    }

    ctx = parent.find("#canvas");
    ctx.on('mousemove', function(ev) {
        var isLeft = (ev.layerX - 10) > ev.width
        const b = parent.find('.scrubBox-hover');
        if(isAudio) {
            b.css({
                left: (ev.layerX + 50) + 'px'
            })
                .attr('time', toHHMM(getCurrentTime(ev.layerX)))
        } else {
            b.css({
                visibility: 'hidden',
                opacity: 0
            })
        }
    })

    ctx.on('mousedown', function(ev) {
        ev.preventDefault();
        const {currentTime: ct, duration} = audioElement;
        if(Infinity != duration) {
            var currentTime = getCurrentTime(ev.layerX) % duration
            if(currentTime == duration) {
                if(audioElement && audioElement.stop) audioElement.stop();
            } else {
                audioElement.currentTime = currentTime
            }
        }
        audioElement.play();
    })
    ctx2d = ctx.getContext("2d");


    function setupAudioNodes() {
        sourceNode     = audioContext.createMediaElementSource(audioElement);
        analyserNode   = audioContext.createAnalyser();
        javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
        javascriptNode.onaudioprocess = null;

        // Create the array for the data values
        amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);

        audioElement.onplay = async () => {
            if(audioData == null && String(audioUrl).length && isAudio) {
                await loadSound(audioUrl);
            }
            queue()
            audioContext.resume();
            if(audioElement.duration > 0) {
                parent.find('#icn').html(audioPlaying ? icons.pause : icons.play);
            }

            if(settings.onload) settings.onload();
        }
        audioElement.onload = () => {
            parent.find('#icn').html(audioPlaying ? icons.pause : icons.play);
        }
        audioElement.onplaying = () => {
            parent.find('#icn').html(audioPlaying ? icons.pause : icons.play);
        }
        audioElement.onpause = () => {
            parent.find('#icn').html(audioPlaying ? icons.pause : icons.play);
        }
        audioElement.ontimeupdate = function() {
            const {paused, duration, currentTime} = audioElement;
            audioPlaying = !paused;
            parent.find('#icn').html(audioPlaying ? icons.pause : icons.play);
            if(isAudio) {
                parent.attr('d', toHHMM(duration))
                parent.attr('t', toHHMM(currentTime))
                var ps = Math.floor(getPosition());
                var	ps$ = (ps < 50 ? ps + 50 : ps + 10);
                parent.style.setProperty('--left-time',  ps$ + 'px')
            }

        }
        // Now connect the nodes together
        sourceNode.connect(audioContext.destination);
        sourceNode.connect(analyserNode);
        analyserNode.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);


        // setup the event handler that is triggered every time enough samples have been collected
        // trigger the audio analysis and draw the results
        javascriptNode.onaudioprocess = function (ev) {
            // get the Time Domain data for this sample
            analyserNode.getByteTimeDomainData(amplitudeArray);

            // draw the display if the audio is playing
            if (audioPlaying == true) {
                window.requestAnimFrame(drawTimeDomain);
            }
        }

        // load file audio
        if(!isAudio && audioUrl.length) {
            loadSound(audioUrl);
        }
    }

    // Load the audio from the URL via Ajax and store it in global variable audioData
    // Note that the audio load is asynchronous
    function loadSound(url, cb) {
        return new Promise((r, j) => {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';

            // When loaded, decode the data and play the sound
            request.onload = function () {
                cb && cb()
                audioContext.decodeAudioData(request.response, function (buffer) {
                    audioData = buffer;
                    audioDataDuration = buffer.duration;
                    if(options.autoplay) {
                        play({screenX: currentTime})
                    }
                    queue();
                    r(true);
                }, onError);
            }
            audioElement.src = url;
            if(isAudio) {
                parent.attr('d', toHHMM(0))
                parent.attr('t', toHHMM(0))
            }

            request.send();
        })
    }



    function onError(e) {
        console.log("onError:", e);
    }

    function drawTimeDomain() {
        ctx.width = ctx.offsetWidth;
        ctx.height = ctx.offsetHeight;
        var h = ctx2d;
        var t = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(t);

        h.clearRect(0, 0, ctx.width, ctx.height);
        var e = h.createLinearGradient(0, 0, 0, ctx.height);

        if(Array.isArray(options.bgColors)) {
            options.bgColors.forEach((c) => {
                e.addColorStop(c[0], c[1]);
            })
        } else {
            e.addColorStop(0, "#fff");
            e.addColorStop(0.8, "#fff");
            e.addColorStop(1, "#fff");

        }


        var z = h.createLinearGradient(0, 0, 0, ctx.height);

        if(Array.isArray(options.fgColors)) {
            options.fgColors.forEach((c) => {
                z.addColorStop(c[0], c[1]);
            })
        } else {
            z.addColorStop(1, "#e1bee7");
            z.addColorStop(0.8, "#ba68c8");
            z.addColorStop(0, "#9c27b0");
        }

        var center = ctx.height / 2;

        for (var s, r, a = ctx.width , u = 0; u < a; u++) {
            var c = -(((t[u] - (s = 0)) / (255 - s)) * ((center - 5) - (r = 5)) + r);

            // 6 * u postion
            // (6 * u) + 3 <= currentTime
            //
            var w = ctx.width;
            var p = u * 2;
            var l = audioElement.duration;
            var d = (p / w) * l;

            if(d   <= audioElement.currentTime && isAudio) {
                h.fillStyle = z
            } else {
                h.fillStyle = e;
            }
            h.fillRect(2 * u, center - .5, .7, c);
            h.fillRect(2 * u, center + .5, .7, c * -1);
        }
    }

    function clearCanvas() {
        ctx2d.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function hex (c) {
        var s = "0123456789abcdef";
        var i = parseInt (c);
        if (i == 0 || isNaN (c))
            return "00";
        i = Math.round (Math.min (Math.max (0, i), 255));
        return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
    }

    /* Convert an RGB triplet to a hex string */
    function convertToHex (rgb) {
        return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
    }

    /* Remove '#' in color hex string */
    function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

    /* Convert a hex string to an RGB triplet */
    function convertToRGB (hex) {
        var color = [];
        color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
        color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
        color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
        return color;
    }

    function generateColor(colorStart,colorEnd,colorCount){

        // The beginning of your gradient
        var start = convertToRGB (colorStart);

        // The end of your gradient
        var end   = convertToRGB (colorEnd);

        // The number of colors to compute
        var len = colorCount;

        //Alpha blending amount
        var alpha = 0.0;

        var clr = [];

        for (i = 0; i < len; i++) {
            var c = [];
            alpha += (1.0/len);

            c[0] = start[0] * alpha + (1 - alpha) * end[0];
            c[1] = start[1] * alpha + (1 - alpha) * end[1];
            c[2] = start[2] * alpha + (1 - alpha) * end[2];

            clr.push(convertToHex (c));

        }

        return clr;

    }
    async function load(src, type, autoplay) {
        settings['data-src'] = src;
        settings['data-type'] = type;
        isAudio =  settings['data-type']== "audio";
        audioUrl = settings['data-src'];
        parent.find('#icn').html(icons.loader);
        if(!autoplay) {
            setTimeout(() => {
                parent.find('#icn').html(icons.play);
            }, 500)
        }
        audioElement.src = audioUrl;
        audioElement.autoplay = autoplay;
        if(autoplay) audioElement.play();

    }
    function setInfo(o) {
        const elements = {title, subtitle}
        Object.keys(o).forEach((k) => {
            if((k in elements)) {
                elements[k].innerText = o[k]
            }
        })
    }
    return {load, setInfo}
})
