function Calc () {
    
    var result = 0;

    var _cf = (function() {
        function _shift(x) {
          var parts = x.toString().split('.');
          return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length);
        }
        return function() { 
          return Array.prototype.reduce.call(arguments, function (prev, next) { return prev === undefined || next === undefined ? undefined : Math.max(prev, _shift (next)); }, -Infinity);
        };
      })();
      

      Math.a = function () {
        var f = _cf.apply(null, arguments); if(f === undefined) return undefined;
        function cb(x, y, i, o) { return x + f * y; }
        return Array.prototype.reduce.call(arguments, cb, 0) / f;
      };
      
      Math.s = function (l,r) { var f = _cf(l,r); return (l * f - r * f) / f; };
      
      Math.m = function () {
        var f = _cf.apply(null, arguments);
        function cb(x, y, i, o) { return (x*f) * (y*f) / (f * f); }
        return Array.prototype.reduce.call(arguments, cb, 1);
      };
      
      Math.d = function (l,r) { var f = _cf(l,r); return (l * f) / (r * f); };


    this.add = function(a) {
        result = Math.a(result, a);
        return this;
    };

    this.subtract = function(a) {
        result = Math.s(result, a);
        return this;
    };

    this.multiply = function(a) {
        // result *= a;
        result = Math.m(result, a);
        return this;
    }

    this.divide = function(a) {
        result = Math.d(result, a);
        return this;
    };

    this.equals = function() {
        var result1 = result;
        this.reset();
        // console.log('Result equals ', result1);
        return result1;
    };

    this.reset = function() {
        result = 0;
    };

    this.getResult = function() {
        return result;
    }
}

export default Calc;
