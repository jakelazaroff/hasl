"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    function Color(h, s, l, a) {
        if (a === void 0) { a = 1; }
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
    Object.defineProperty(Color.prototype, "rgba", {
        get: function () {
            var _a = hslToRgb(this.h, this.s, this.l), r = _a[0], g = _a[1], b = _a[2];
            return "rgba(" + r + "," + g + "," + b + "," + this.a + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hex", {
        get: function () {
            var _a = hslToRgb(this.h, this.s, this.l), r = _a[0], g = _a[1], b = _a[2];
            return "#" + pad(r.toString(16)) + pad(g.toString(16)) + pad(b.toString(16));
        },
        enumerable: true,
        configurable: true
    });
    Color.prototype.alpha = function (alpha) {
        return new Color(this.h, this.s, this.l, alpha);
    };
    Color.prototype.lighten = function (amount) {
        var l = Math.min(this.l + amount, 1);
        return new Color(this.h, this.s, l, this.a);
    };
    Color.prototype.darken = function (amount) {
        var l = Math.max(this.l - amount, 0);
        return new Color(this.h, this.s, l, this.a);
    };
    Color.prototype.saturate = function (amount) {
        var s = Math.min(this.s + amount, 1);
        return new Color(this.h, s, this.l, this.a);
    };
    Color.prototype.desaturate = function (amount) {
        var s = Math.max(this.s - amount, 0);
        return new Color(this.h, s, this.l, this.a);
    };
    return Color;
}());
exports.Color = Color;
function color(color) {
    var number = parseInt(color.slice(1), 16);
    var _a = rgbToHsl((number >> 16) & 255, (number >> 8) & 255, number & 255), h = _a[0], s = _a[1], l = _a[2];
    return new Color(h, s, l);
}
exports.default = color;
function pad(string) {
    return ("00" + string).slice(-2);
}
// color conversion functions from https://gist.github.com/mjackson/5311256
function rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                h = 0;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}
function hslToRgb(h, s, l) {
    var r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function hue2rgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
