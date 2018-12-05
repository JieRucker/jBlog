/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/12/5 下午10:36
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/12/5 下午10:36
 */

var THREE = THREE || {};
THREE.Color = function (a) {
  this.autoUpdate = true;
  this.setHex(a)
};
THREE.Color.prototype = {
  setRGBA: function (f, e, c, d) {
    this.r = f;
    this.g = e;
    this.b = c;
    this.a = d;
    if (this.autoUpdate) {
      this.updateHex();
      this.updateStyleString()
    }
  }, setHex: function (a) {
    this.hex = a;
    if (this.autoUpdate) {
      this.updateRGBA();
      this.updateStyleString()
    }
  }, copyRGB: function (a) {
    this.r = a.r;
    this.g = a.g;
    this.b = a.b
  }, copyRGBA: function (a) {
    this.r = a.r;
    this.g = a.g;
    this.b = a.b;
    this.a = a.a
  }, multiplySelfRGB: function (a) {
    this.r *= a.r;
    this.g *= a.g;
    this.b *= a.b
  }, updateHex: function () {
    this.hex = Math.floor(this.a * 255) << 24 | Math.floor(this.r * 255) << 16 | Math.floor(this.g * 255) << 8 | Math.floor(this.b * 255)
  }, updateRGBA: function () {
    this.a = (this.hex >> 24 & 255) / 255;
    this.r = (this.hex >> 16 & 255) / 255;
    this.g = (this.hex >> 8 & 255) / 255;
    this.b = (this.hex & 255) / 255
  }, updateStyleString: function () {
    this.__styleString = "rgba(" + Math.floor(this.r * 255) + "," + Math.floor(this.g * 255) + "," + Math.floor(this.b * 255) + "," + this.a + ")"
  }, toString: function () {
    return "THREE.Color ( r: " + this.r + ", g: " + this.g + ", b: " + this.b + ", a: " + this.a + ", hex: " + this.hex + " )"
  }
};
THREE.Vector2 = function (a, b) {
  this.x = a || 0;
  this.y = b || 0
};
THREE.Vector2.prototype = {
  set: function (a, b) {
    this.x = a;
    this.y = b;
    return this
  }, copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    return this
  }, addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    return this
  }, add: function (b, a) {
    this.x = b.x + a.x;
    this.y = b.y + a.y;
    return this
  }, subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    return this
  }, sub: function (b, a) {
    this.x = b.x - a.x;
    this.y = b.y - a.y;
    return this
  }, multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    return this
  }, unit: function () {
    this.multiplyScalar(1 / this.length());
    return this
  }, length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }, lengthSq: function () {
    return this.x * this.x + this.y * this.y
  }, negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    return this
  }, clone: function () {
    return new THREE.Vector2(this.x, this.y)
  }, toString: function () {
    return "THREE.Vector2 (" + this.x + ", " + this.y + ")"
  }
};
THREE.Vector3 = function (a, c, b) {
  this.x = a || 0;
  this.y = c || 0;
  this.z = b || 0
};
THREE.Vector3.prototype = {
  set: function (a, c, b) {
    this.x = a;
    this.y = c;
    this.z = b;
    return this
  }, copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    return this
  }, add: function (b, a) {
    this.x = b.x + a.x;
    this.y = b.y + a.y;
    this.z = b.z + a.z;
    return this
  }, addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this
  }, addScalar: function (a) {
    this.x += a;
    this.y += a;
    this.z += a;
    return this
  }, sub: function (b, a) {
    this.x = b.x - a.x;
    this.y = b.y - a.y;
    this.z = b.z - a.z;
    return this
  }, subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this
  }, cross: function (b, a) {
    this.x = b.y * a.z - b.z * a.y;
    this.y = b.z * a.x - b.x * a.z;
    this.z = b.x * a.y - b.y * a.x;
    return this
  }, crossSelf: function (c) {
    var b = this.x, a = this.y, d = this.z;
    this.x = a * c.z - d * c.y;
    this.y = d * c.x - b * c.z;
    this.z = b * c.y - a * c.x;
    return this
  }, multiplySelf: function (a) {
    this.x *= a.x;
    this.y *= a.y;
    this.z *= a.z;
    return this
  }, multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this
  }, divideScalar: function (a) {
    this.x /= a;
    this.y /= a;
    this.z /= a;
    return this
  }, dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z
  }, distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a))
  }, distanceToSquared: function (d) {
    var c = this.x - d.x, b = this.y - d.y, a = this.z - d.z;
    return c * c + b * b + a * a
  }, length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }, lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }, negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this
  }, normalize: function () {
    if (this.length() > 0) {
      this.multiplyScalar(1 / this.length())
    } else {
      this.multiplyScalar(0)
    }
    return this
  }, setLength: function (a) {
    return this.normalize().multiplyScalar(a)
  }, isZero: function () {
    var a = 0.0001;
    return (Math.abs(this.x) < a) && (Math.abs(this.y) < a) && (Math.abs(this.z) < a)
  }, clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z)
  }, toString: function () {
    return "THREE.Vector3 ( " + this.x + ", " + this.y + ", " + this.z + " )"
  }
};
THREE.Vector4 = function (a, d, c, b) {
  this.x = a || 0;
  this.y = d || 0;
  this.z = c || 0;
  this.w = b || 1
};
THREE.Vector4.prototype = {
  set: function (a, d, c, b) {
    this.x = a;
    this.y = d;
    this.z = c;
    this.w = b;
    return this
  }, copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this
  }, add: function (b, a) {
    this.x = b.x + a.x;
    this.y = b.y + a.y;
    this.z = b.z + a.z;
    this.w = b.w + a.w;
    return this
  }, addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    this.w += a.w;
    return this
  }, sub: function (b, a) {
    this.x = b.x - a.x;
    this.y = b.y - a.y;
    this.z = b.z - a.z;
    this.w = b.w - a.w;
    return this
  }, subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    this.w -= a.w;
    return this
  }, clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w)
  }, toString: function () {
    return "THREE.Vector4 (" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")"
  }
};
THREE.Rectangle = function () {
  var f, h, d, g, a, c, e = true;

  function b() {
    a = d - f;
    c = g - h
  }

  this.getX = function () {
    return f
  };
  this.getY = function () {
    return h
  };
  this.getWidth = function () {
    return a
  };
  this.getHeight = function () {
    return c
  };
  this.getX1 = function () {
    return f
  };
  this.getY1 = function () {
    return h
  };
  this.getX2 = function () {
    return d
  };
  this.getY2 = function () {
    return g
  };
  this.set = function (j, l, i, k) {
    e = false;
    f = j;
    h = l;
    d = i;
    g = k;
    b()
  };
  this.addPoint = function (i, j) {
    if (e) {
      e = false;
      f = i;
      h = j;
      d = i;
      g = j
    } else {
      f = Math.min(f, i);
      h = Math.min(h, j);
      d = Math.max(d, i);
      g = Math.max(g, j)
    }
    b()
  };
  this.addRectangle = function (i) {
    if (e) {
      e = false;
      f = i.getX1();
      h = i.getY1();
      d = i.getX2();
      g = i.getY2()
    } else {
      f = Math.min(f, i.getX1());
      h = Math.min(h, i.getY1());
      d = Math.max(d, i.getX2());
      g = Math.max(g, i.getY2())
    }
    b()
  };
  this.inflate = function (i) {
    f -= i;
    h -= i;
    d += i;
    g += i;
    b()
  };
  this.minSelf = function (i) {
    f = Math.max(f, i.getX1());
    h = Math.max(h, i.getY1());
    d = Math.min(d, i.getX2());
    g = Math.min(g, i.getY2());
    b()
  };
  this.instersects = function (i) {
    return Math.min(d, i.getX2()) - Math.max(f, i.getX1()) >= 0 && Math.min(g, i.getY2()) - Math.max(h, i.getY1()) >= 0
  };
  this.empty = function () {
    e = true;
    f = 0;
    h = 0;
    d = 0;
    g = 0;
    b()
  };
  this.isEmpty = function () {
    return e
  };
  this.toString = function () {
    return "THREE.Rectangle (x1: " + f + ", y1: " + g + ", x2: " + d + ", y1: " + h + ", width: " + a + ", height: " + c + ")"
  }
};
THREE.Matrix3 = function () {
  this.m = []
};
THREE.Matrix3.prototype = {
  transpose: function () {
    var a;
    a = this.m[1];
    this.m[1] = this.m[3];
    this.m[3] = a;
    a = this.m[2];
    this.m[2] = this.m[6];
    this.m[6] = a;
    a = this.m[5];
    this.m[5] = this.m[7];
    this.m[7] = a;
    return this
  }
};
THREE.Matrix4 = function () {
  this._x = new THREE.Vector3();
  this._y = new THREE.Vector3();
  this._z = new THREE.Vector3()
};
THREE.Matrix4.prototype = {
  n11: 1,
  n12: 0,
  n13: 0,
  n14: 0,
  n21: 0,
  n22: 1,
  n23: 0,
  n24: 0,
  n31: 0,
  n32: 0,
  n33: 1,
  n34: 0,
  n41: 0,
  n42: 0,
  n43: 0,
  n44: 1,
  identity: function () {
    this.n11 = 1;
    this.n12 = 0;
    this.n13 = 0;
    this.n14 = 0;
    this.n21 = 0;
    this.n22 = 1;
    this.n23 = 0;
    this.n24 = 0;
    this.n31 = 0;
    this.n32 = 0;
    this.n33 = 1;
    this.n34 = 0;
    this.n41 = 0;
    this.n42 = 0;
    this.n43 = 0;
    this.n44 = 1
  },
  copy: function (a) {
    this.n11 = a.n11;
    this.n12 = a.n12;
    this.n13 = a.n13;
    this.n14 = a.n14;
    this.n21 = a.n21;
    this.n22 = a.n22;
    this.n23 = a.n23;
    this.n24 = a.n24;
    this.n31 = a.n31;
    this.n32 = a.n32;
    this.n33 = a.n33;
    this.n34 = a.n34;
    this.n41 = a.n41;
    this.n42 = a.n42;
    this.n43 = a.n43;
    this.n44 = a.n44
  },
  lookAt: function (d, c, b) {
    var a = this._x, f = this._y, e = this._z;
    e.sub(d, c);
    e.normalize();
    a.cross(b, e);
    a.normalize();
    f.cross(e, a);
    f.normalize();
    this.n11 = a.x;
    this.n12 = a.y;
    this.n13 = a.z;
    this.n14 = -a.dot(d);
    this.n21 = f.x;
    this.n22 = f.y;
    this.n23 = f.z;
    this.n24 = -f.dot(d);
    this.n31 = e.x;
    this.n32 = e.y;
    this.n33 = e.z;
    this.n34 = -e.dot(d);
    this.n41 = 0;
    this.n42 = 0;
    this.n43 = 0;
    this.n44 = 1
  },
  transform: function (a) {
    var d = a.x, c = a.y, b = a.z, e = a.w ? a.w : 1;
    a.x = this.n11 * d + this.n12 * c + this.n13 * b + this.n14 * e;
    a.y = this.n21 * d + this.n22 * c + this.n23 * b + this.n24 * e;
    a.z = this.n31 * d + this.n32 * c + this.n33 * b + this.n34 * e;
    e = this.n41 * d + this.n42 * c + this.n43 * b + this.n44 * e;
    if (a.w) {
      a.w = e
    } else {
      a.x = a.x / e;
      a.y = a.y / e;
      a.z = a.z / e
    }
    return a
  },
  crossVector: function (b) {
    var c = new THREE.Vector4();
    c.x = this.n11 * b.x + this.n12 * b.y + this.n13 * b.z + this.n14 * b.w;
    c.y = this.n21 * b.x + this.n22 * b.y + this.n23 * b.z + this.n24 * b.w;
    c.z = this.n31 * b.x + this.n32 * b.y + this.n33 * b.z + this.n34 * b.w;
    c.w = (b.w) ? this.n41 * b.x + this.n42 * b.y + this.n43 * b.z + this.n44 * b.w : 1;
    return c
  },
  multiply: function (d, c) {
    this.n11 = d.n11 * c.n11 + d.n12 * c.n21 + d.n13 * c.n31 + d.n14 * c.n41;
    this.n12 = d.n11 * c.n12 + d.n12 * c.n22 + d.n13 * c.n32 + d.n14 * c.n42;
    this.n13 = d.n11 * c.n13 + d.n12 * c.n23 + d.n13 * c.n33 + d.n14 * c.n43;
    this.n14 = d.n11 * c.n14 + d.n12 * c.n24 + d.n13 * c.n34 + d.n14 * c.n44;
    this.n21 = d.n21 * c.n11 + d.n22 * c.n21 + d.n23 * c.n31 + d.n24 * c.n41;
    this.n22 = d.n21 * c.n12 + d.n22 * c.n22 + d.n23 * c.n32 + d.n24 * c.n42;
    this.n23 = d.n21 * c.n13 + d.n22 * c.n23 + d.n23 * c.n33 + d.n24 * c.n43;
    this.n24 = d.n21 * c.n14 + d.n22 * c.n24 + d.n23 * c.n34 + d.n24 * c.n44;
    this.n31 = d.n31 * c.n11 + d.n32 * c.n21 + d.n33 * c.n31 + d.n34 * c.n41;
    this.n32 = d.n31 * c.n12 + d.n32 * c.n22 + d.n33 * c.n32 + d.n34 * c.n42;
    this.n33 = d.n31 * c.n13 + d.n32 * c.n23 + d.n33 * c.n33 + d.n34 * c.n43;
    this.n34 = d.n31 * c.n14 + d.n32 * c.n24 + d.n33 * c.n34 + d.n34 * c.n44;
    this.n41 = d.n41 * c.n11 + d.n42 * c.n21 + d.n43 * c.n31 + d.n44 * c.n41;
    this.n42 = d.n41 * c.n12 + d.n42 * c.n22 + d.n43 * c.n32 + d.n44 * c.n42;
    this.n43 = d.n41 * c.n13 + d.n42 * c.n23 + d.n43 * c.n33 + d.n44 * c.n43;
    this.n44 = d.n41 * c.n14 + d.n42 * c.n24 + d.n43 * c.n34 + d.n44 * c.n44
  },
  multiplySelf: function (c) {
    var o = this.n11, n = this.n12, k = this.n13, i = this.n14, f = this.n21, e = this.n22, d = this.n23, b = this.n24,
      a = this.n31, r = this.n32, q = this.n33, p = this.n34, l = this.n41, j = this.n42, h = this.n43, g = this.n44;
    this.n11 = o * c.n11 + n * c.n21 + k * c.n31 + i * c.n41;
    this.n12 = o * c.n12 + n * c.n22 + k * c.n32 + i * c.n42;
    this.n13 = o * c.n13 + n * c.n23 + k * c.n33 + i * c.n43;
    this.n14 = o * c.n14 + n * c.n24 + k * c.n34 + i * c.n44;
    this.n21 = f * c.n11 + e * c.n21 + d * c.n31 + b * c.n41;
    this.n22 = f * c.n12 + e * c.n22 + d * c.n32 + b * c.n42;
    this.n23 = f * c.n13 + e * c.n23 + d * c.n33 + b * c.n43;
    this.n24 = f * c.n14 + e * c.n24 + d * c.n34 + b * c.n44;
    this.n31 = a * c.n11 + r * c.n21 + q * c.n31 + p * c.n41;
    this.n32 = a * c.n12 + r * c.n22 + q * c.n32 + p * c.n42;
    this.n33 = a * c.n13 + r * c.n23 + q * c.n33 + p * c.n43;
    this.n34 = a * c.n14 + r * c.n24 + q * c.n34 + p * c.n44;
    this.n41 = l * c.n11 + j * c.n21 + h * c.n31 + g * c.n41;
    this.n42 = l * c.n12 + j * c.n22 + h * c.n32 + g * c.n42;
    this.n43 = l * c.n13 + j * c.n23 + h * c.n33 + g * c.n43;
    this.n44 = l * c.n14 + j * c.n24 + h * c.n34 + g * c.n44
  },
  multiplyScalar: function (a) {
    this.n11 *= a;
    this.n12 *= a;
    this.n13 *= a;
    this.n14 *= a;
    this.n21 *= a;
    this.n22 *= a;
    this.n23 *= a;
    this.n24 *= a;
    this.n31 *= a;
    this.n32 *= a;
    this.n33 *= a;
    this.n34 *= a;
    this.n41 *= a;
    this.n42 *= a;
    this.n43 *= a;
    this.n44 *= a
  },
  determinant: function () {
    return (this.n14 * this.n23 * this.n32 * this.n41 - this.n13 * this.n24 * this.n32 * this.n41 - this.n14 * this.n22 * this.n33 * this.n41 + this.n12 * this.n24 * this.n33 * this.n41 + this.n13 * this.n22 * this.n34 * this.n41 - this.n12 * this.n23 * this.n34 * this.n41 - this.n14 * this.n23 * this.n31 * this.n42 + this.n13 * this.n24 * this.n31 * this.n42 + this.n14 * this.n21 * this.n33 * this.n42 - this.n11 * this.n24 * this.n33 * this.n42 - this.n13 * this.n21 * this.n34 * this.n42 + this.n11 * this.n23 * this.n34 * this.n42 + this.n14 * this.n22 * this.n31 * this.n43 - this.n12 * this.n24 * this.n31 * this.n43 - this.n14 * this.n21 * this.n32 * this.n43 + this.n11 * this.n24 * this.n32 * this.n43 + this.n12 * this.n21 * this.n34 * this.n43 - this.n11 * this.n22 * this.n34 * this.n43 - this.n13 * this.n22 * this.n31 * this.n44 + this.n12 * this.n23 * this.n31 * this.n44 + this.n13 * this.n21 * this.n32 * this.n44 - this.n11 * this.n23 * this.n32 * this.n44 - this.n12 * this.n21 * this.n33 * this.n44 + this.n11 * this.n22 * this.n33 * this.n44)
  },
  transpose: function () {
    function a(d, e, c) {
      var b = d[e];
      d[e] = d[c];
      d[c] = b
    }

    a(this, "n21", "n12");
    a(this, "n31", "n13");
    a(this, "n32", "n23");
    a(this, "n41", "n14");
    a(this, "n42", "n24");
    a(this, "n43", "n34");
    return this
  },
  clone: function () {
    var a = new THREE.Matrix4();
    a.n11 = this.n11;
    a.n12 = this.n12;
    a.n13 = this.n13;
    a.n14 = this.n14;
    a.n21 = this.n21;
    a.n22 = this.n22;
    a.n23 = this.n23;
    a.n24 = this.n24;
    a.n31 = this.n31;
    a.n32 = this.n32;
    a.n33 = this.n33;
    a.n34 = this.n34;
    a.n41 = this.n41;
    a.n42 = this.n42;
    a.n43 = this.n43;
    a.n44 = this.n44;
    return a
  },
  flatten: function () {
    return [this.n11, this.n21, this.n31, this.n41, this.n12, this.n22, this.n32, this.n42, this.n13, this.n23, this.n33, this.n43, this.n14, this.n24, this.n34, this.n44]
  },
  toString: function () {
    return "| " + this.n11 + " " + this.n12 + " " + this.n13 + " " + this.n14 + " |\n| " + this.n21 + " " + this.n22 + " " + this.n23 + " " + this.n24 + " |\n| " + this.n31 + " " + this.n32 + " " + this.n33 + " " + this.n34 + " |\n| " + this.n41 + " " + this.n42 + " " + this.n43 + " " + this.n44 + " |"
  }
};
THREE.Matrix4.translationMatrix = function (b, d, c) {
  var a = new THREE.Matrix4();
  a.n14 = b;
  a.n24 = d;
  a.n34 = c;
  return a
};
THREE.Matrix4.scaleMatrix = function (b, d, c) {
  var a = new THREE.Matrix4();
  a.n11 = b;
  a.n22 = d;
  a.n33 = c;
  return a
};
THREE.Matrix4.rotationXMatrix = function (b) {
  var a = new THREE.Matrix4();
  a.n22 = a.n33 = Math.cos(b);
  a.n32 = Math.sin(b);
  a.n23 = -a.n32;
  return a
};
THREE.Matrix4.rotationYMatrix = function (b) {
  var a = new THREE.Matrix4();
  a.n11 = a.n33 = Math.cos(b);
  a.n13 = Math.sin(b);
  a.n31 = -a.n13;
  return a
};
THREE.Matrix4.rotationZMatrix = function (b) {
  var a = new THREE.Matrix4();
  a.n11 = a.n22 = Math.cos(b);
  a.n21 = Math.sin(b);
  a.n12 = -a.n21;
  return a
};
THREE.Matrix4.rotationAxisAngleMatrix = function (b, d) {
  var a = new THREE.Matrix4(), f = Math.cos(d), j = Math.sin(d), i = 1 - f, h = b.x, g = b.y, e = b.z;
  a.n11 = i * h * h + f;
  a.n12 = i * h * g - j * e;
  a.n13 = i * h * e + j * g;
  a.n21 = i * h * g + j * e;
  a.n22 = i * g * g + f;
  a.n23 = i * g * e - j * h;
  a.n31 = i * h * e - j * g;
  a.n32 = i * g * e + j * h;
  a.n33 = i * e * e + f;
  return a
};
THREE.Matrix4.makeInvert = function (b) {
  var a = new THREE.Matrix4();
  a.n11 = b.n23 * b.n34 * b.n42 - b.n24 * b.n33 * b.n42 + b.n24 * b.n32 * b.n43 - b.n22 * b.n34 * b.n43 - b.n23 * b.n32 * b.n44 + b.n22 * b.n33 * b.n44;
  a.n12 = b.n14 * b.n33 * b.n42 - b.n13 * b.n34 * b.n42 - b.n14 * b.n32 * b.n43 + b.n12 * b.n34 * b.n43 + b.n13 * b.n32 * b.n44 - b.n12 * b.n33 * b.n44;
  a.n13 = b.n13 * b.n24 * b.n42 - b.n14 * b.n23 * b.n42 + b.n14 * b.n22 * b.n43 - b.n12 * b.n24 * b.n43 - b.n13 * b.n22 * b.n44 + b.n12 * b.n23 * b.n44;
  a.n14 = b.n14 * b.n23 * b.n32 - b.n13 * b.n24 * b.n32 - b.n14 * b.n22 * b.n33 + b.n12 * b.n24 * b.n33 + b.n13 * b.n22 * b.n34 - b.n12 * b.n23 * b.n34;
  a.n21 = b.n24 * b.n33 * b.n41 - b.n23 * b.n34 * b.n41 - b.n24 * b.n31 * b.n43 + b.n21 * b.n34 * b.n43 + b.n23 * b.n31 * b.n44 - b.n21 * b.n33 * b.n44;
  a.n22 = b.n13 * b.n34 * b.n41 - b.n14 * b.n33 * b.n41 + b.n14 * b.n31 * b.n43 - b.n11 * b.n34 * b.n43 - b.n13 * b.n31 * b.n44 + b.n11 * b.n33 * b.n44;
  a.n23 = b.n14 * b.n23 * b.n41 - b.n13 * b.n24 * b.n41 - b.n14 * b.n21 * b.n43 + b.n11 * b.n24 * b.n43 + b.n13 * b.n21 * b.n44 - b.n11 * b.n23 * b.n44;
  a.n24 = b.n13 * b.n24 * b.n31 - b.n14 * b.n23 * b.n31 + b.n14 * b.n21 * b.n33 - b.n11 * b.n24 * b.n33 - b.n13 * b.n21 * b.n34 + b.n11 * b.n23 * b.n34;
  a.n31 = b.n22 * b.n34 * b.n41 - b.n24 * b.n32 * b.n41 + b.n24 * b.n31 * b.n42 - b.n21 * b.n34 * b.n42 - b.n22 * b.n31 * b.n44 + b.n21 * b.n32 * b.n44;
  a.n32 = b.n14 * b.n32 * b.n41 - b.n12 * b.n34 * b.n41 - b.n14 * b.n31 * b.n42 + b.n11 * b.n34 * b.n42 + b.n12 * b.n31 * b.n44 - b.n11 * b.n32 * b.n44;
  a.n33 = b.n13 * b.n24 * b.n41 - b.n14 * b.n22 * b.n41 + b.n14 * b.n21 * b.n42 - b.n11 * b.n24 * b.n42 - b.n12 * b.n21 * b.n44 + b.n11 * b.n22 * b.n44;
  a.n34 = b.n14 * b.n22 * b.n31 - b.n12 * b.n24 * b.n31 - b.n14 * b.n21 * b.n32 + b.n11 * b.n24 * b.n32 + b.n12 * b.n21 * b.n34 - b.n11 * b.n22 * b.n34;
  a.n41 = b.n23 * b.n32 * b.n41 - b.n22 * b.n33 * b.n41 - b.n23 * b.n31 * b.n42 + b.n21 * b.n33 * b.n42 + b.n22 * b.n31 * b.n43 - b.n21 * b.n32 * b.n43;
  a.n42 = b.n12 * b.n33 * b.n41 - b.n13 * b.n32 * b.n41 + b.n13 * b.n31 * b.n42 - b.n11 * b.n33 * b.n42 - b.n12 * b.n31 * b.n43 + b.n11 * b.n32 * b.n43;
  a.n43 = b.n13 * b.n22 * b.n41 - b.n12 * b.n23 * b.n41 - b.n13 * b.n21 * b.n42 + b.n11 * b.n23 * b.n42 + b.n12 * b.n21 * b.n43 - b.n11 * b.n22 * b.n43;
  a.n44 = b.n12 * b.n23 * b.n31 - b.n13 * b.n22 * b.n31 + b.n13 * b.n21 * b.n32 - b.n11 * b.n23 * b.n32 - b.n12 * b.n21 * b.n33 + b.n11 * b.n22 * b.n33;
  a.multiplyScalar(1 / b.determinant());
  return a
};
THREE.Matrix4.makeInvert3x3 = function (o) {
  var e = o.flatten(), l = new THREE.Matrix3(), n = e[10] * e[5] - e[6] * e[9], i = -e[10] * e[1] + e[2] * e[9],
    d = e[6] * e[1] - e[2] * e[5], k = -e[10] * e[4] + e[6] * e[8], g = e[10] * e[0] - e[2] * e[8],
    c = -e[6] * e[0] + e[2] * e[4], j = e[9] * e[4] - e[5] * e[8], f = -e[9] * e[0] + e[1] * e[8],
    a = e[5] * e[0] - e[1] * e[4], h = e[0] * (n) + e[1] * (k) + e[2] * (j), b;
  if (h == 0) {
    throw"matrix not invertible"
  }
  b = 1 / h;
  l.m[0] = b * n;
  l.m[1] = b * i;
  l.m[2] = b * d;
  l.m[3] = b * k;
  l.m[4] = b * g;
  l.m[5] = b * c;
  l.m[6] = b * j;
  l.m[7] = b * f;
  l.m[8] = b * a;
  return l
};
THREE.Matrix4.makeFrustum = function (f, r, e, o, i, h) {
  var g, q, n, p, l, k, j;
  g = new THREE.Matrix4();
  q = 2 * i / (r - f);
  n = 2 * i / (o - e);
  p = (r + f) / (r - f);
  l = (o + e) / (o - e);
  k = -(h + i) / (h - i);
  j = -2 * h * i / (h - i);
  g.n11 = q;
  g.n12 = 0;
  g.n13 = p;
  g.n14 = 0;
  g.n21 = 0;
  g.n22 = n;
  g.n23 = l;
  g.n24 = 0;
  g.n31 = 0;
  g.n32 = 0;
  g.n33 = k;
  g.n34 = j;
  g.n41 = 0;
  g.n42 = 0;
  g.n43 = -1;
  g.n44 = 0;
  return g
};
THREE.Matrix4.makePerspective = function (e, c, g, b) {
  var a, f, h, d;
  a = g * Math.tan(e * Math.PI / 360);
  f = -a;
  h = f * c;
  d = a * c;
  return THREE.Matrix4.makeFrustum(h, d, f, a, g, b)
};
THREE.Matrix4.makeOrtho = function (c, o, k, a, g, f) {
  var d, l, j, i, n, e, b;
  d = new THREE.Matrix4();
  n = o - c;
  e = a - k;
  b = f - g;
  l = (o + c) / n;
  j = (a + k) / e;
  i = (f + g) / b;
  d.n11 = 2 / n;
  d.n12 = 0;
  d.n13 = 0;
  d.n14 = -l;
  d.n21 = 0;
  d.n22 = 2 / e;
  d.n23 = 0;
  d.n24 = -j;
  d.n31 = 0;
  d.n32 = 0;
  d.n33 = -2 / b;
  d.n34 = -i;
  d.n41 = 0;
  d.n42 = 0;
  d.n43 = 0;
  d.n44 = 1;
  return d
};
THREE.Vertex = function (a, b) {
  this.position = a || new THREE.Vector3();
  this.positionWorld = new THREE.Vector3();
  this.positionScreen = new THREE.Vector3();
  this.normal = b || new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.normalScreen = new THREE.Vector3();
  this.__visible = true
};
THREE.Vertex.prototype = {
  toString: function () {
    return "THREE.Vertex ( position: " + this.position + ", normal: " + this.normal + " )"
  }
};
THREE.Face3 = function (e, d, h, g, f) {
  this.a = e;
  this.b = d;
  this.c = h;
  this.centroid = new THREE.Vector3();
  this.normal = g instanceof THREE.Vector3 ? g : new THREE.Vector3();
  this.vertexNormals = g instanceof Array ? g : [];
  this.material = f instanceof Array ? f : [f]
};
THREE.Face3.prototype = {
  toString: function () {
    return "THREE.Face3 ( " + this.a + ", " + this.b + ", " + this.c + " )"
  }
};
THREE.Face4 = function (f, e, j, i, h, g) {
  this.a = f;
  this.b = e;
  this.c = j;
  this.d = i;
  this.centroid = new THREE.Vector3();
  this.normal = h instanceof THREE.Vector3 ? h : new THREE.Vector3();
  this.vertexNormals = h instanceof Array ? h : [];
  this.material = g instanceof Array ? g : [g]
};
THREE.Face4.prototype = {
  toString: function () {
    return "THREE.Face4 ( " + this.a + ", " + this.b + ", " + this.c + " " + this.d + " )"
  }
};
THREE.UV = function (b, a) {
  this.u = b || 0;
  this.v = a || 0
};
THREE.UV.prototype = {
  copy: function (a) {
    this.u = a.u;
    this.v = a.v
  }, toString: function () {
    return "THREE.UV (" + this.u + ", " + this.v + ")"
  }
};
THREE.Geometry = function () {
  this.vertices = [];
  this.faces = [];
  this.uvs = []
};
THREE.Geometry.prototype = {
  computeCentroids: function () {
    var c, b, a;
    for (c = 0, b = this.faces.length; c < b; c++) {
      a = this.faces[c];
      a.centroid.set(0, 0, 0);
      if (a instanceof THREE.Face3) {
        a.centroid.addSelf(this.vertices[a.a].position);
        a.centroid.addSelf(this.vertices[a.b].position);
        a.centroid.addSelf(this.vertices[a.c].position);
        a.centroid.divideScalar(3)
      } else {
        if (a instanceof THREE.Face4) {
          a.centroid.addSelf(this.vertices[a.a].position);
          a.centroid.addSelf(this.vertices[a.b].position);
          a.centroid.addSelf(this.vertices[a.c].position);
          a.centroid.addSelf(this.vertices[a.d].position);
          a.centroid.divideScalar(4)
        }
      }
    }
  }, computeNormals: function (m) {
    var e, b, o, g, i, j, l, k, d, c, a, h = new THREE.Vector3(), p = new THREE.Vector3();
    for (o = 0, g = this.vertices.length; o < g; o++) {
      i = this.vertices[o];
      i.normal.set(0, 0, 0)
    }
    for (j = 0, l = this.faces.length; j < l; j++) {
      k = this.faces[j];
      if (m && k.vertexNormals.length) {
        h.set(0, 0, 0);
        for (e = 0, b = k.normal.length; e < b; e++) {
          h.addSelf(k.vertexNormals[e])
        }
        h.divideScalar(3);
        if (!h.isZero()) {
          h.normalize()
        }
        k.normal.copy(h)
      } else {
        d = this.vertices[k.a];
        c = this.vertices[k.b];
        a = this.vertices[k.c];
        h.sub(a.position, c.position);
        p.sub(d.position, c.position);
        h.crossSelf(p);
        if (!h.isZero()) {
          h.normalize()
        }
        k.normal.copy(h)
      }
    }
  }, computeBoundingBox: function () {
    if (this.vertices.length > 0) {
      this.bbox = {
        x: [this.vertices[0].position.x, this.vertices[0].position.x],
        y: [this.vertices[0].position.y, this.vertices[0].position.y],
        z: [this.vertices[0].position.z, this.vertices[0].position.z]
      };
      for (var a = 1, b = this.vertices.length; a < b; a++) {
        vertex = this.vertices[a];
        if (vertex.position.x < this.bbox.x[0]) {
          this.bbox.x[0] = vertex.position.x
        } else {
          if (vertex.position.x > this.bbox.x[1]) {
            this.bbox.x[1] = vertex.position.x
          }
        }
        if (vertex.position.y < this.bbox.y[0]) {
          this.bbox.y[0] = vertex.position.y
        } else {
          if (vertex.position.y > this.bbox.y[1]) {
            this.bbox.y[1] = vertex.position.y
          }
        }
        if (vertex.position.z < this.bbox.z[0]) {
          this.bbox.z[0] = vertex.position.z
        } else {
          if (vertex.position.z > this.bbox.z[1]) {
            this.bbox.z[1] = vertex.position.z
          }
        }
      }
    }
  }, toString: function () {
    return "THREE.Geometry ( vertices: " + this.vertices + ", faces: " + this.faces + " )"
  }
};
THREE.Camera = function (c, b, d, a) {
  this.fov = c;
  this.aspect = b;
  this.position = new THREE.Vector3(0, 0, 0);
  this.target = {position: new THREE.Vector3(0, 0, 0)};
  this.projectionMatrix = THREE.Matrix4.makePerspective(c, b, d, a);
  this.up = new THREE.Vector3(0, 1, 0);
  this.matrix = new THREE.Matrix4();
  this.autoUpdateMatrix = true;
  this.updateMatrix = function () {
    this.matrix.lookAt(this.position, this.target.position, this.up)
  };
  this.toString = function () {
    return "THREE.Camera ( " + this.position + ", " + this.target.position + " )"
  }
};
THREE.Light = function (a) {
  this.color = new THREE.Color(255 << 24 | a)
};
THREE.AmbientLight = function (a) {
  THREE.Light.call(this, a)
};
THREE.AmbientLight.prototype = new THREE.Light();
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function (b, a) {
  THREE.Light.call(this, b);
  this.position = new THREE.Vector3(0, 1, 0);
  this.intensity = a || 1
};
THREE.DirectionalLight.prototype = new THREE.Light();
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function (b, a) {
  THREE.Light.call(this, b);
  this.position = new THREE.Vector3(0, 0, 0);
  this.intensity = a || 1
};
THREE.DirectionalLight.prototype = new THREE.Light();
THREE.DirectionalLight.prototype.constructor = THREE.PointLight;
THREE.Object3D = function (a) {
  this.position = new THREE.Vector3();
  this.rotation = new THREE.Vector3();
  this.scale = new THREE.Vector3(1, 1, 1);
  this.matrix = new THREE.Matrix4();
  this.matrixTranslation = new THREE.Matrix4();
  this.matrixRotation = new THREE.Matrix4();
  this.matrixScale = new THREE.Matrix4();
  this.screen = new THREE.Vector3();
  this.autoUpdateMatrix = true;
  this.updateMatrix = function () {
    this.matrixPosition = THREE.Matrix4.translationMatrix(this.position.x, this.position.y, this.position.z);
    this.matrixRotation = THREE.Matrix4.rotationXMatrix(this.rotation.x);
    this.matrixRotation.multiplySelf(THREE.Matrix4.rotationYMatrix(this.rotation.y));
    this.matrixRotation.multiplySelf(THREE.Matrix4.rotationZMatrix(this.rotation.z));
    this.matrixScale = THREE.Matrix4.scaleMatrix(this.scale.x, this.scale.y, this.scale.z);
    this.matrix.copy(this.matrixPosition);
    this.matrix.multiplySelf(this.matrixRotation);
    this.matrix.multiplySelf(this.matrixScale)
  }
};
THREE.Particle = function (a) {
  THREE.Object3D.call(this);
  this.material = a instanceof Array ? a : [a];
  this.autoUpdateMatrix = false
};
THREE.Particle.prototype = new THREE.Object3D();
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.Line = function (b, a) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.material = a instanceof Array ? a : [a]
};
THREE.Line.prototype = new THREE.Object3D();
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function (b, a, c) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.material = a instanceof Array ? a : [a];
  this.flipSided = false;
  this.doubleSided = false;
  this.overdraw = false;
  this.materialFaceGroup = {};
  this.sortFacesByMaterial();
  if (c) {
    this.normalizeUVs()
  }
  this.geometry.computeBoundingBox()
};
THREE.Mesh.prototype = new THREE.Object3D();
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.sortFacesByMaterial = function () {
  var c, a, h, g, e, d, j;

  function b(f) {
    j = [];
    for (c = 0, a = f.length; c < a; c++) {
      if (f[c] == undefined) {
        j.push("undefined")
      } else {
        j.push(f[c].toString())
      }
    }
    return j.join("_")
  }

  for (h = 0, g = this.geometry.faces.length; h < g; h++) {
    e = this.geometry.faces[h];
    d = e.material;
    hash = b(d);
    if (this.materialFaceGroup[hash] == undefined) {
      this.materialFaceGroup[hash] = {faces: [], material: d}
    }
    this.materialFaceGroup[hash].faces.push(h)
  }
};
THREE.Mesh.prototype.normalizeUVs = function () {
  var e, a, b, d, c;
  for (e = 0, a = this.geometry.uvs.length; e < a; e++) {
    c = this.geometry.uvs[e];
    for (b = 0, d = c.length; b < d; b++) {
      if (c[b].u != 1) {
        c[b].u = c[b].u - Math.floor(c[b].u)
      }
      if (c[b].v != 1) {
        c[b].v = c[b].v - Math.floor(c[b].v)
      }
    }
  }
};
THREE.LineColorMaterial = function (c, b, a) {
  this.lineWidth = a || 1;
  this.color = new THREE.Color((b >= 0 ? (b * 255) << 24 : 4278190080) | c)
};
THREE.LineColorMaterial.prototype = {
  toString: function () {
    return "THREE.LineColorMaterial ( color: " + this.color + ", lineWidth: " + this.lineWidth + " )"
  }
};
THREE.MeshPhongMaterial = function (d, a, e, c, b) {
  this.ambient = new THREE.Color((b >= 0 ? (b * 255) << 24 : 4278190080) | d);
  this.diffuse = new THREE.Color((b >= 0 ? (b * 255) << 24 : 4278190080) | a);
  this.specular = new THREE.Color((b >= 0 ? (b * 255) << 24 : 4278190080) | e);
  this.shininess = c;
  this.opacity = b;
  this.toString = function () {
    return "THREE.MeshPhongMaterial ( <br/>ambient: " + this.ambient + ", <br/>diffuse: " + this.diffuse + ", <br/>specular: " + this.specular + ", <br/>shininess: " + this.shininess + ", <br/>opacity: " + this.opacity + ")"
  }
};
THREE.MeshBitmapMaterial = function (a, b) {
  this.bitmap = a;
  this.mode = b || THREE.MeshBitmapMaterialMode.UVMAPPING;
  this.id = THREE.MeshBitmapMaterialCounter.value++;
  this.toString = function () {
    return "THREE.MeshBitmapMaterial ( bitmap: " + this.bitmap + ", mode: " + this.mode + ", id: " + this.id + " )"
  }
};
THREE.MeshBitmapMaterialCounter = {value: 0};
THREE.MeshBitmapMaterialMode = {UVMAPPING: 0};
THREE.MeshColorFillMaterial = function (b, a) {
  this.color = new THREE.Color((a >= 0 ? (a * 255) << 24 : 4278190080) | b);
  this.toString = function () {
    return "THREE.MeshColorFillMaterial ( color: " + this.color + " )"
  }
};
THREE.MeshColorStrokeMaterial = function (c, b, a) {
  this.lineWidth = a || 1;
  this.color = new THREE.Color((b >= 0 ? (b * 255) << 24 : 4278190080) | c);
  this.toString = function () {
    return "THREE.MeshColorStrokeMaterial ( lineWidth: " + this.lineWidth + ", color: " + this.color + " )"
  }
};
THREE.MeshFaceMaterial = function () {
  this.toString = function () {
    return "THREE.MeshFaceMaterial"
  }
};
THREE.ParticleBitmapMaterial = function (a) {
  this.bitmap = a;
  this.offset = new THREE.Vector2();
  this.toString = function () {
    return "THREE.ParticleBitmapMaterial ( bitmap: " + this.bitmap + " )"
  }
};
THREE.ParticleCircleMaterial = function (b, a) {
  this.color = new THREE.Color((a >= 0 ? (a * 255) << 24 : 4278190080) | b);
  this.toString = function () {
    return "THREE.ParticleCircleMaterial ( color: " + this.color + " )"
  }
};
THREE.ParticleDOMMaterial = function (a) {
  this.domElement = a;
  this.toString = function () {
    return "THREE.ParticleDOMMaterial ( domElement: " + this.domElement + " )"
  }
};
THREE.Scene = function () {
  this.objects = [];
  this.lights = [];
  this.addObject = function (a) {
    this.objects.push(a)
  };
  this.removeObject = function (b) {
    for (var c = 0, a = this.objects.length; c < a; c++) {
      if (b == this.objects[c]) {
        this.objects.splice(c, 1);
        return
      }
    }
  };
  this.addLight = function (a) {
    this.lights.push(a)
  };
  this.removeLight = function (b) {
    for (var c = 0, a = this.lights.length; c < a; c++) {
      if (b == this.lights[c]) {
        this.lights.splice(c, 1);
        return
      }
    }
  };
  this.add = function (a) {
    this.addObject(a)
  };
  this.toString = function () {
    return "THREE.Scene ( " + this.objects + " )"
  }
};
THREE.Projector = function () {
  var e = null, c, p, n = [], b, f, l = [], k, m, i = [], j, h, a = [], g = new THREE.Vector4(),
    d = new THREE.Matrix4(), o = new THREE.Matrix4();
  this.projectScene = function (J, G) {
    var F, E, D, K, I, B, r, L, q, z, H, u, C, w, A, y, x, t, s;
    e = [];
    p = 0, f = 0, m = 0, h = 0;
    if (G.autoUpdateMatrix) {
      G.updateMatrix()
    }
    d.multiply(G.projectionMatrix, G.matrix);
    r = J.objects;
    for (F = 0, E = r.length; F < E; F++) {
      L = r[F];
      q = L.matrix;
      if (L.autoUpdateMatrix) {
        L.updateMatrix()
      }
      if (L instanceof THREE.Mesh) {
        o.multiply(d, q);
        z = L.geometry.vertices;
        for (D = 0, K = z.length; D < K; D++) {
          H = z[D];
          u = H.positionScreen;
          u.copy(H.position);
          o.transform(u);
          H.__visible = u.z > 0 && u.z < 1
        }
        w = L.geometry.faces;
        for (I = 0, B = w.length; I < B; I++) {
          A = w[I];
          if (A instanceof THREE.Face3) {
            y = z[A.a];
            x = z[A.b];
            t = z[A.c];
            if (y.__visible && x.__visible && t.__visible) {
              if ((L.doubleSided || (L.flipSided != (t.positionScreen.x - y.positionScreen.x) * (x.positionScreen.y - y.positionScreen.y) - (t.positionScreen.y - y.positionScreen.y) * (x.positionScreen.x - y.positionScreen.x) < 0))) {
                c = n[p] = n[p] || new THREE.RenderableFace3();
                c.v1.copy(y.positionScreen);
                c.v2.copy(x.positionScreen);
                c.v3.copy(t.positionScreen);
                c.centroidWorld.copy(A.centroid);
                L.matrix.transform(c.centroidWorld);
                c.normalWorld.copy(A.normal);
                L.matrixRotation.transform(c.normalWorld);
                c.z = Math.max(y.positionScreen.z, Math.max(x.positionScreen.z, t.positionScreen.z));
                c.meshMaterial = L.material;
                c.faceMaterial = A.material;
                c.overdraw = L.overdraw;
                c.uvs = L.geometry.uvs[I];
                c.color = A.color;
                e.push(c);
                p++
              }
            }
          } else {
            if (A instanceof THREE.Face4) {
              y = z[A.a];
              x = z[A.b];
              t = z[A.c];
              s = z[A.d];
              if (y.__visible && x.__visible && t.__visible && s.__visible) {
                if ((L.doubleSided || (L.flipSided != ((s.positionScreen.x - y.positionScreen.x) * (x.positionScreen.y - y.positionScreen.y) - (s.positionScreen.y - y.positionScreen.y) * (x.positionScreen.x - y.positionScreen.x) < 0 || (x.positionScreen.x - t.positionScreen.x) * (s.positionScreen.y - t.positionScreen.y) - (x.positionScreen.y - t.positionScreen.y) * (s.positionScreen.x - t.positionScreen.x) < 0)))) {
                  b = l[f] = l[f] || new THREE.RenderableFace4();
                  b.v1.copy(y.positionScreen);
                  b.v2.copy(x.positionScreen);
                  b.v3.copy(t.positionScreen);
                  b.v4.copy(s.positionScreen);
                  b.centroidWorld.copy(A.centroid);
                  L.matrix.transform(b.centroidWorld);
                  b.normalWorld.copy(A.normal);
                  L.matrixRotation.transform(b.normalWorld);
                  b.z = Math.max(y.positionScreen.z, Math.max(x.positionScreen.z, Math.max(t.positionScreen.z, s.positionScreen.z)));
                  b.meshMaterial = L.material;
                  b.faceMaterial = A.material;
                  b.overdraw = L.overdraw;
                  b.uvs = L.geometry.uvs[I];
                  b.color = A.color;
                  e.push(b);
                  f++
                }
              }
            }
          }
        }
      } else {
        if (L instanceof THREE.Line) {
          o.multiply(d, q);
          z = L.geometry.vertices;
          for (D = 0, K = z.length; D < K; D++) {
            H = z[D];
            u = H.positionScreen;
            u.copy(H.position);
            o.transform(u);
            H.__visible = u.z > 0 && u.z < 1;
            if (D > 0) {
              C = L.geometry.vertices[D - 1];
              if (H.__visible && C.__visible) {
                k = i[m] = i[m] || new THREE.RenderableLine();
                k.v1.copy(H.positionScreen);
                k.v2.copy(C.positionScreen);
                k.z = Math.max(H.positionScreen.z, C.positionScreen.z);
                k.material = L.material;
                e.push(k);
                m++
              }
            }
          }
        } else {
          if (L instanceof THREE.Particle) {
            g.set(L.position.x, L.position.y, L.position.z, 1);
            G.matrix.transform(g);
            G.projectionMatrix.transform(g);
            L.screen.set(g.x / g.w, g.y / g.w, g.z / g.w);
            if (L.screen.z > 0 && L.screen.z < 1) {
              j = a[h] = a[h] || new THREE.RenderableParticle();
              j.x = L.screen.x;
              j.y = L.screen.y;
              j.z = L.screen.z;
              j.rotation = L.rotation.z;
              j.scale.x = L.scale.x * Math.abs(g.x / g.w - (g.x + G.projectionMatrix.n11) / (g.w + G.projectionMatrix.n14));
              j.scale.y = L.scale.y * Math.abs(g.y / g.w - (g.y + G.projectionMatrix.n22) / (g.w + G.projectionMatrix.n24));
              j.material = L.material;
              j.color = L.color;
              e.push(j);
              h++
            }
          }
        }
      }
    }
    e.sort(function (M, v) {
      return v.z - M.z
    });
    return e
  }
};
THREE.DOMRenderer = function () {
  THREE.Renderer.call(this);
  var e = null, g = new THREE.Projector(), b = document.createElement("div"), a, c, f, d;
  this.domElement = b;
  this.setSize = function (i, h) {
    a = i;
    c = h;
    f = a / 2;
    d = c / 2
  };
  this.render = function (p, r) {
    var q, h, i, n, o, s, l, k, j;
    e = g.projectScene(p, r);
    for (q = 0, h = e.length; q < h; q++) {
      o = e[q];
      if (o instanceof THREE.RenderableParticle) {
        k = o.x * f + f;
        j = o.y * d + d;
        for (i = 0, n = o.material.length; i < n; i++) {
          s = o.material[i];
          if (s instanceof THREE.ParticleDOMMaterial) {
            l = s.domElement;
            l.style.left = k + "px";
            l.style.top = j + "px"
          }
        }
      }
    }
  }
};
THREE.CanvasRenderer = function () {
  var A = null, v = new THREE.Projector(), s = document.createElement("canvas"), n, r, k, p, t = s.getContext("2d"),
    D = new THREE.Rectangle(), q = new THREE.Rectangle(), z = new THREE.Rectangle(), l = false,
    o = new THREE.Color(4294967295), x = new THREE.Color(4294967295), f = new THREE.Color(4294967295), y = Math.PI * 2,
    j = new THREE.Vector2(), h = new THREE.Vector3(), G = new THREE.UV(), F = new THREE.UV(), E = new THREE.UV(),
    C = new THREE.UV(), d = new THREE.Vector2(), b = new THREE.Vector2();
  this.domElement = s;
  this.autoClear = true;
  this.setSize = function (I, H) {
    n = I;
    r = H;
    k = n / 2;
    p = r / 2;
    s.width = n;
    s.height = r;
    D.set(-k, -p, k, p)
  };
  this.clear = function () {
    if (!q.isEmpty()) {
      q.inflate(1);
      q.minSelf(D);
      t.setTransform(1, 0, 0, -1, k, p);
      t.clearRect(q.getX(), q.getY(), q.getWidth(), q.getHeight());
      q.empty()
    }
  };
  this.render = function (ac, Z) {
    var ab, K, M, U, aa, Q, N, T, R, O, X, V, J, H, S, P, Y, W, L, I;
    if (this.autoClear) {
      this.clear()
    }
    A = v.projectScene(ac, Z);
    t.setTransform(1, 0, 0, -1, k, p);
    l = ac.lights.length > 0;
    if (l) {
      B(ac, f)
    }
    for (ab = 0, K = A.length; ab < K; ab++) {
      M = A[ab];
      z.empty();
      if (M instanceof THREE.RenderableParticle) {
        R = M.x * k;
        O = M.y * p;
        for (U = 0, aa = M.material.length; U < aa; U++) {
          T = M.material[U];
          m(R, O, M, T, ac)
        }
      } else {
        if (M instanceof THREE.RenderableLine) {
          R = M.v1.x * k;
          O = M.v1.y * p;
          X = M.v2.x * k;
          V = M.v2.y * p;
          z.addPoint(R, O);
          z.addPoint(X, V);
          if (!D.instersects(z)) {
            continue
          }
          t.beginPath();
          t.moveTo(R, O);
          t.lineTo(X, V);
          t.closePath();
          for (U = 0, aa = M.material.length; U < aa; U++) {
            T = M.material[U];
            e(R, O, X, V, M, T, ac)
          }
        } else {
          if (M instanceof THREE.RenderableFace3) {
            M.v1.x *= k;
            M.v1.y *= p;
            M.v2.x *= k;
            M.v2.y *= p;
            M.v3.x *= k;
            M.v3.y *= p;
            if (M.overdraw) {
              c(M.v1, M.v2);
              c(M.v2, M.v3);
              c(M.v3, M.v1)
            }
            R = M.v1.x;
            O = M.v1.y;
            X = M.v2.x;
            V = M.v2.y;
            J = M.v3.x;
            H = M.v3.y;
            z.addPoint(R, O);
            z.addPoint(X, V);
            z.addPoint(J, H);
            if (!D.instersects(z)) {
              continue
            }
            U = 0;
            aa = M.meshMaterial.length;
            while (U < aa) {
              T = M.meshMaterial[U++];
              if (T instanceof THREE.MeshFaceMaterial) {
                Q = 0;
                N = M.faceMaterial.length;
                while (Q < N) {
                  T = M.faceMaterial[Q++];
                  i(R, O, X, V, J, H, M, T, ac)
                }
                continue
              }
              i(R, O, X, V, J, H, M, T, ac)
            }
          } else {
            if (M instanceof THREE.RenderableFace4) {
              M.v1.x *= k;
              M.v1.y *= p;
              M.v2.x *= k;
              M.v2.y *= p;
              M.v3.x *= k;
              M.v3.y *= p;
              M.v4.x *= k;
              M.v4.y *= p;
              d.copy(M.v2);
              b.copy(M.v4);
              if (M.overdraw) {
                c(M.v1, M.v2);
                c(M.v2, M.v4);
                c(M.v4, M.v1)
              }
              R = M.v1.x;
              O = M.v1.y;
              X = M.v2.x;
              V = M.v2.y;
              S = M.v4.x;
              P = M.v4.y;
              if (M.overdraw) {
                c(M.v3, d);
                c(M.v3, b)
              }
              J = M.v3.x;
              H = M.v3.y;
              Y = d.x;
              W = d.y;
              L = b.x;
              I = b.y;
              z.addPoint(R, O);
              z.addPoint(X, V);
              z.addPoint(J, H);
              z.addPoint(S, P);
              if (!D.instersects(z)) {
                continue
              }
              U = 0;
              aa = M.meshMaterial.length;
              while (U < aa) {
                T = M.meshMaterial[U++];
                if (T instanceof THREE.MeshFaceMaterial) {
                  Q = 0;
                  N = M.faceMaterial.length;
                  while (Q < N) {
                    T = M.faceMaterial[Q++];
                    g(R, O, X, V, J, H, S, P, Y, W, L, I, M, T, ac)
                  }
                  continue
                }
                g(R, O, X, V, J, H, S, P, Y, W, L, I, M, T, ac)
              }
            }
          }
        }
      }
      q.addRectangle(z)
    }
    t.setTransform(1, 0, 0, 1, 0, 0)
  };

  function B(L, J) {
    var I, K, H;
    J.setRGBA(1, 1, 1, 1);
    for (I = 0, K = L.lights.length; I < K; I++) {
      H = L.lights[I];
      if (H instanceof THREE.AmbientLight) {
        J.r *= H.color.r;
        J.g *= H.color.g;
        J.b *= H.color.b
      }
    }
  }

  function u(M, K, J) {
    var I, L, H;
    for (I = 0, L = M.lights.length; I < L; I++) {
      H = M.lights[I];
      if (H instanceof THREE.DirectionalLight) {
        J.r += H.color.r;
        J.g += H.color.g;
        J.b += H.color.b
      } else {
        if (H instanceof THREE.PointLight) {
          J.r += H.color.r;
          J.g += H.color.g;
          J.b += H.color.b
        }
      }
    }
  }

  function a(N, L, J) {
    var I, M, H, K;
    for (I = 0, M = N.lights.length; I < M; I++) {
      H = N.lights[I];
      if (H instanceof THREE.DirectionalLight) {
        K = L.normalWorld.dot(H.position) * H.intensity;
        if (K > 0) {
          J.r += H.color.r * K;
          J.g += H.color.g * K;
          J.b += H.color.b * K
        }
      } else {
        if (H instanceof THREE.PointLight) {
          h.sub(H.position, L.centroidWorld);
          h.normalize();
          K = L.normalWorld.dot(h) * H.intensity;
          if (K > 0) {
            J.r += H.color.r * K;
            J.g += H.color.g * K;
            J.b += H.color.b * K
          }
        }
      }
    }
  }

  function m(J, I, M, P, O) {
    var H, U, S, R, N, L, Q, T, K;
    if (P instanceof THREE.ParticleCircleMaterial) {
      if (l) {
        x.copyRGB(f);
        u(O, M, x);
        o.copyRGBA(P.color);
        o.multiplySelfRGB(x);
        o.updateStyleString()
      } else {
        o = P.color
      }
      H = M.scale.x * k;
      U = M.scale.y * p;
      z.set(J - H, I - U, J + H, I + U);
      if (!D.instersects(z)) {
        return
      }
      t.save();
      t.translate(J, I);
      t.rotate(-M.rotation);
      t.scale(H, U);
      t.beginPath();
      t.arc(0, 0, 1, 0, y, true);
      t.closePath();
      t.fillStyle = o.__styleString;
      t.fill();
      t.restore()
    } else {
      if (P instanceof THREE.ParticleBitmapMaterial) {
        Q = P.bitmap;
        T = Q.width / 2;
        K = Q.height / 2;
        S = M.scale.x * k;
        R = M.scale.y * p;
        H = S * T;
        U = R * K;
        N = P.offset.x * S;
        L = P.offset.y * R;
        z.set(J + N - H, I + L - U, J + N + H, I + L + U);
        if (!D.instersects(z)) {
          return
        }
        t.save();
        t.translate(J, I);
        t.rotate(-M.rotation);
        t.scale(S, -R);
        t.translate(-T + P.offset.x, -K - P.offset.y);
        t.drawImage(Q, 0, 0);
        t.restore()
      }
    }
  }

  function e(H, N, J, I, K, L, M) {
    if (L instanceof THREE.LineColorMaterial) {
      if (l) {
        x.copyRGB(f);
        u(M, K, x);
        o.copyRGBA(L.color);
        o.multiplySelfRGB(x);
        o.updateStyleString()
      } else {
        o = L.color
      }
      t.lineWidth = L.lineWidth;
      t.lineJoin = "round";
      t.lineCap = "round";
      t.strokeStyle = o.__styleString;
      t.stroke();
      z.inflate(t.lineWidth)
    }
  }

  function i(J, I, H, S, P, O, L, N, M) {
    var Q, R, K;
    if (N instanceof THREE.MeshColorFillMaterial) {
      if (l) {
        x.copyRGB(f);
        a(M, L, x);
        o.copyRGBA(N.color);
        o.multiplySelfRGB(x);
        o.updateStyleString()
      } else {
        o = N.color
      }
      t.beginPath();
      t.moveTo(J, I);
      t.lineTo(H, S);
      t.lineTo(P, O);
      t.lineTo(J, I);
      t.closePath();
      t.fillStyle = o.__styleString;
      t.fill()
    } else {
      if (N instanceof THREE.MeshColorStrokeMaterial) {
        if (l) {
          x.copyRGB(f);
          a(M, L, x);
          o.copyRGBA(N.color);
          o.multiplySelfRGB(x);
          o.updateStyleString()
        } else {
          o = N.color
        }
        t.beginPath();
        t.moveTo(J, I);
        t.lineTo(H, S);
        t.lineTo(P, O);
        t.lineTo(J, I);
        t.closePath();
        t.lineWidth = N.lineWidth;
        t.lineJoin = "round";
        t.lineCap = "round";
        t.strokeStyle = o.__styleString;
        t.stroke();
        z.inflate(t.lineWidth)
      } else {
        if (N instanceof THREE.MeshBitmapMaterial) {
          Q = N.bitmap;
          R = Q.width - 1;
          K = Q.height - 1;
          G.copy(L.uvs[0]);
          F.copy(L.uvs[1]);
          E.copy(L.uvs[2]);
          G.u *= R;
          G.v *= K;
          F.u *= R;
          F.v *= K;
          E.u *= R;
          E.v *= K;
          w(Q, J, I, H, S, P, O, G.u, G.v, F.u, F.v, E.u, E.v)
        }
      }
    }
  }

  function g(N, M, V, T, I, H, P, O, W, U, K, J, L, R, X) {
    var Y, Q, S;
    if (R instanceof THREE.MeshColorFillMaterial) {
      if (l) {
        x.copyRGB(f);
        a(X, L, x);
        o.copyRGBA(R.color);
        o.multiplySelfRGB(x);
        o.updateStyleString()
      } else {
        o = R.color
      }
      t.beginPath();
      t.moveTo(N, M);
      t.lineTo(V, T);
      t.lineTo(I, H);
      t.lineTo(P, O);
      t.lineTo(N, M);
      t.closePath();
      t.fillStyle = o.__styleString;
      t.fill()
    } else {
      if (R instanceof THREE.MeshColorStrokeMaterial) {
        if (l) {
          x.copyRGB(f);
          a(X, L, x);
          o.copyRGBA(R.color);
          o.multiplySelfRGB(x);
          o.updateStyleString()
        } else {
          o = R.color
        }
        t.beginPath();
        t.moveTo(N, M);
        t.lineTo(V, T);
        t.lineTo(I, H);
        t.lineTo(P, O);
        t.lineTo(N, M);
        t.closePath();
        t.lineWidth = R.lineWidth;
        t.lineJoin = "round";
        t.lineCap = "round";
        t.strokeStyle = o.__styleString;
        t.stroke();
        z.inflate(t.lineWidth)
      } else {
        if (R instanceof THREE.MeshBitmapMaterial) {
          Y = R.bitmap;
          Q = Y.width - 1;
          S = Y.height - 1;
          G.copy(L.uvs[0]);
          F.copy(L.uvs[1]);
          E.copy(L.uvs[2]);
          C.copy(L.uvs[3]);
          G.u *= Q;
          G.v *= S;
          F.u *= Q;
          F.v *= S;
          E.u *= Q;
          E.v *= S;
          C.u *= Q;
          C.v *= S;
          w(Y, N, M, V, T, P, O, G.u, G.v, F.u, F.v, C.u, C.v);
          w(Y, W, U, I, H, K, J, F.u, F.v, E.u, E.v, C.u, C.v)
        }
      }
    }
  }

  function w(aa, P, O, V, U, J, H, T, S, X, W, L, K) {
    var I, Z, Y, N, M, R, Q;
    t.beginPath();
    t.moveTo(P, O);
    t.lineTo(V, U);
    t.lineTo(J, H);
    t.lineTo(P, O);
    t.closePath();
    t.save();
    t.clip();
    I = T * (K - W) - X * K + L * W + (X - L) * S;
    Z = -(S * (J - V) - W * J + K * V + (W - K) * P) / I;
    Y = (W * H + S * (U - H) - K * U + (K - W) * O) / I;
    N = (T * (J - V) - X * J + L * V + (X - L) * P) / I;
    M = -(X * H + T * (U - H) - L * U + (L - X) * O) / I;
    R = (T * (K * V - W * J) + S * (X * J - L * V) + (L * W - X * K) * P) / I;
    Q = (T * (K * U - W * H) + S * (X * H - L * U) + (L * W - X * K) * O) / I;
    t.transform(Z, Y, N, M, R, Q);
    t.drawImage(aa, 0, 0);
    t.restore()
  }

  function c(I, H) {
    j.sub(H, I);
    j.unit();
    j.multiplyScalar(0.75);
    H.addSelf(j);
    I.subSelf(j)
  }
};
THREE.SVGRenderer = function () {
  var w = null, r = new THREE.Projector(), s = document.createElementNS("http://www.w3.org/2000/svg", "svg"), k, A, p,
    b, y = new THREE.Rectangle(), v = new THREE.Rectangle(), i = false, l = new THREE.Color(4294967295),
    u = new THREE.Color(4294967295), c = new THREE.Color(4294967295), g = new THREE.Vector3(), d = [], m = [], B, o, f,
    z = 1;
  this.domElement = s;
  this.autoClear = true;
  this.setQuality = function (C) {
    switch (C) {
      case"high":
        z = 1;
        break;
      case"low":
        z = 0;
        break
    }
  };
  this.setSize = function (D, C) {
    k = D;
    A = C;
    p = k / 2;
    b = A / 2;
    s.setAttribute("viewBox", (-p) + " " + (-b) + " " + k + " " + A);
    s.setAttribute("width", k);
    s.setAttribute("height", A);
    y.set(-p, -b, p, b)
  };
  this.clear = function () {
    while (s.childNodes.length > 0) {
      s.removeChild(s.childNodes[0])
    }
  };
  this.render = function (T, Q) {
    var S, E, N, R, J, G, F, M, K, H, P, O, D, C, L, I;
    if (this.autoClear) {
      this.clear()
    }
    w = r.projectScene(T, Q);
    o = 0;
    f = 0;
    i = T.lights.length > 0;
    if (i) {
      x(T, c)
    }
    for (S = 0, E = w.length; S < E; S++) {
      F = w[S];
      v.empty();
      if (F instanceof THREE.RenderableParticle) {
        K = F.x * p;
        H = F.y * -b;
        for (N = 0, R = F.material.length; N < R; N++) {
          M = F.material[N];
          j(K, H, F, M, T)
        }
      } else {
        if (F instanceof THREE.RenderableFace3) {
          K = F.v1.x * p;
          H = F.v1.y * -b;
          P = F.v2.x * p;
          O = F.v2.y * -b;
          D = F.v3.x * p;
          C = F.v3.y * -b;
          v.addPoint(K, H);
          v.addPoint(P, O);
          v.addPoint(D, C);
          if (!y.instersects(v)) {
            continue
          }
          N = 0;
          R = F.meshMaterial.length;
          while (N < R) {
            M = F.meshMaterial[N++];
            if (M instanceof THREE.MeshFaceMaterial) {
              J = 0;
              G = F.faceMaterial.length;
              while (J < G) {
                M = F.faceMaterial[J++];
                h(K, H, P, O, D, C, F, M, T)
              }
              continue
            }
            h(K, H, P, O, D, C, F, M, T)
          }
        } else {
          if (F instanceof THREE.RenderableFace4) {
            K = F.v1.x * p;
            H = F.v1.y * -b;
            P = F.v2.x * p;
            O = F.v2.y * -b;
            D = F.v3.x * p;
            C = F.v3.y * -b;
            L = F.v4.x * p;
            I = F.v4.y * -b;
            v.addPoint(K, H);
            v.addPoint(P, O);
            v.addPoint(D, C);
            v.addPoint(L, I);
            if (!y.instersects(v)) {
              continue
            }
            N = 0;
            R = F.meshMaterial.length;
            while (N < R) {
              M = F.meshMaterial[N++];
              if (M instanceof THREE.MeshFaceMaterial) {
                J = 0;
                G = F.faceMaterial.length;
                while (J < G) {
                  M = F.faceMaterial[J++];
                  e(K, H, P, O, D, C, L, I, F, M, T)
                }
                continue
              }
              e(K, H, P, O, D, C, L, I, F, M, T)
            }
          }
        }
      }
    }
  };

  function x(G, E) {
    var D, F, C;
    E.setRGBA(1, 1, 1, 1);
    for (D = 0, F = G.lights.length; D < F; D++) {
      C = G.lights[D];
      if (C instanceof THREE.AmbientLight) {
        E.r *= C.color.r;
        E.g *= C.color.g;
        E.b *= C.color.b
      }
    }
  }

  function q(H, F, E) {
    var D, G, C;
    for (D = 0, G = H.lights.length; D < G; D++) {
      C = H.lights[D];
      if (C instanceof THREE.DirectionalLight) {
        E.r += C.color.r;
        E.g += C.color.g;
        E.b += C.color.b
      } else {
        if (C instanceof THREE.PointLight) {
          E.r += C.color.r;
          E.g += C.color.g;
          E.b += C.color.b
        }
      }
    }
  }

  function a(I, G, E) {
    var D, H, C, F;
    for (D = 0, H = I.lights.length; D < H; D++) {
      C = I.lights[D];
      if (C instanceof THREE.DirectionalLight) {
        F = G.normalWorld.dot(C.position) * C.intensity;
        if (F > 0) {
          E.r += C.color.r * F;
          E.g += C.color.g * F;
          E.b += C.color.b * F
        }
      } else {
        if (C instanceof THREE.PointLight) {
          g.sub(C.position, G.centroidWorld);
          g.normalize();
          F = G.normalWorld.dot(g) * C.intensity;
          if (F > 0) {
            E.r += C.color.r * F;
            E.g += C.color.g * F;
            E.b += C.color.b * F
          }
        }
      }
    }
  }

  function j(C, G, D, E, F) {
    B = t(f++);
    B.setAttribute("cx", C);
    B.setAttribute("cy", G);
    B.setAttribute("r", D.scale.x * p);
    if (E instanceof THREE.ParticleCircleMaterial) {
      if (i) {
        u.copyRGB(c);
        q(F, D, u);
        l.copyRGBA(E.color);
        l.multiplySelfRGB(u);
        l.updateStyleString()
      } else {
        l = E.color
      }
      B.setAttribute("style", "fill: " + l.__styleString)
    }
    s.appendChild(B)
  }

  function h(E, D, C, K, J, I, F, H, G) {
    B = n(o++);
    B.setAttribute("d", "M " + E + " " + D + " L " + C + " " + K + " L " + J + "," + I + "z");
    if (H instanceof THREE.MeshColorFillMaterial) {
      if (i) {
        u.copyRGB(c);
        a(G, F, u);
        l.copyRGBA(H.color);
        l.multiplySelfRGB(u);
        l.updateStyleString()
      } else {
        l = H.color
      }
      B.setAttribute("style", "fill: " + l.__styleString)
    } else {
      if (H instanceof THREE.MeshColorStrokeMaterial) {
        if (i) {
          u.copyRGB(c);
          a(G, F, u);
          l.copyRGBA(H.color);
          l.multiplySelfRGB(u);
          l.updateStyleString()
        } else {
          l = H.color
        }
        B.setAttribute("style", "fill: none; stroke: " + l.__styleString + "; stroke-width: " + H.lineWidth + "; stroke-linecap: round; stroke-linejoin: round")
      }
    }
    s.appendChild(B)
  }

  function e(G, E, C, M, L, K, F, D, H, J, I) {
    B = n(o++);
    B.setAttribute("d", "M " + G + " " + E + " L " + C + " " + M + " L " + L + "," + K + " L " + F + "," + D + "z");
    if (J instanceof THREE.MeshColorFillMaterial) {
      if (i) {
        u.copyRGB(c);
        a(I, H, u);
        l.copyRGBA(J.color);
        l.multiplySelfRGB(u);
        l.updateStyleString()
      } else {
        l = J.color
      }
      B.setAttribute("style", "fill: " + l.__styleString)
    } else {
      if (J instanceof THREE.MeshColorStrokeMaterial) {
        if (i) {
          u.copyRGB(c);
          a(I, H, u);
          l.copyRGBA(J.color);
          l.multiplySelfRGB(u);
          l.updateStyleString()
        } else {
          l = J.color
        }
        B.setAttribute("style", "fill: none; stroke: " + l.__styleString + "; stroke-width: " + J.lineWidth + "; stroke-linecap: round; stroke-linejoin: round")
      }
    }
    s.appendChild(B)
  }

  function n(C) {
    if (d[C] == null) {
      d[C] = document.createElementNS("http://www.w3.org/2000/svg", "path");
      if (z == 0) {
        d[C].setAttribute("shape-rendering", "crispEdges")
      }
      return d[C]
    }
    return d[C]
  }

  function t(C) {
    if (m[C] == null) {
      m[C] = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      if (z == 0) {
        m[C].setAttribute("shape-rendering", "crispEdges")
      }
      return m[C]
    }
    return m[C]
  }
};
THREE.WebGLRenderer = function () {
  var j = document.createElement("canvas"), c, e, l = new THREE.Matrix4(), i, a = 0, k = 1, h = 2, d = 3;
  this.domElement = j;
  this.autoClear = true;
  g();
  f();
  this.setSize = function (n, m) {
    j.width = n;
    j.height = m;
    c.viewport(0, 0, j.width, j.height)
  };
  this.clear = function () {
    c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT)
  };
  this.setupLights = function (s) {
    var q, r, m, p, o, n;
    c.uniform1i(e.enableLighting, s.lights.length);
    for (q = 0, r = s.lights.length; q < r; q++) {
      n = s.lights[q];
      if (n instanceof THREE.AmbientLight) {
        m = n.color;
        c.uniform3f(e.ambientColor, m.r, m.g, m.b)
      } else {
        if (n instanceof THREE.DirectionalLight) {
          m = n.color;
          p = n.position;
          o = n.intensity;
          c.uniform3f(e.lightingDirection, p.x, p.y, p.z);
          c.uniform3f(e.directionalColor, m.r * o, m.g * o, m.b * o)
        } else {
          if (n instanceof THREE.PointLight) {
            m = n.color;
            p = n.position;
            o = n.intensity;
            c.uniform3f(e.pointPosition, p.x, p.y, p.z);
            c.uniform3f(e.pointColor, m.r * o, m.g * o, m.b * o)
          }
        }
      }
    }
  };
  this.createBuffers = function (F, D) {
    var B, t, v, s, A, E, r, p, o, n, m, q = F.materialFaceGroup[D], x = [], z = [], w = [], C = [], y = [], u = 0;
    for (B = 0, t = q.faces.length; B < t; B++) {
      v = q.faces[B];
      s = F.geometry.faces[v];
      A = s.vertexNormals;
      E = s.normal;
      r = F.geometry.uvs[v];
      if (s instanceof THREE.Face3) {
        p = F.geometry.vertices[s.a].position;
        o = F.geometry.vertices[s.b].position;
        n = F.geometry.vertices[s.c].position;
        w.push(p.x, p.y, p.z);
        w.push(o.x, o.y, o.z);
        w.push(n.x, n.y, n.z);
        if (A.length == 3) {
          C.push(A[0].x, A[0].y, A[0].z);
          C.push(A[1].x, A[1].y, A[1].z);
          C.push(A[2].x, A[2].y, A[2].z)
        } else {
          C.push(E.x, E.y, E.z);
          C.push(E.x, E.y, E.z);
          C.push(E.x, E.y, E.z)
        }
        if (r) {
          y.push(r[0].u, r[0].v);
          y.push(r[1].u, r[1].v);
          y.push(r[2].u, r[2].v)
        }
        x.push(u, u + 1, u + 2);
        z.push(u, u + 1);
        z.push(u, u + 2);
        z.push(u + 1, u + 2);
        u += 3
      } else {
        if (s instanceof THREE.Face4) {
          p = F.geometry.vertices[s.a].position;
          o = F.geometry.vertices[s.b].position;
          n = F.geometry.vertices[s.c].position;
          m = F.geometry.vertices[s.d].position;
          w.push(p.x, p.y, p.z);
          w.push(o.x, o.y, o.z);
          w.push(n.x, n.y, n.z);
          w.push(m.x, m.y, m.z);
          if (A.length == 4) {
            C.push(A[0].x, A[0].y, A[0].z);
            C.push(A[1].x, A[1].y, A[1].z);
            C.push(A[2].x, A[2].y, A[2].z);
            C.push(A[3].x, A[3].y, A[3].z)
          } else {
            C.push(E.x, E.y, E.z);
            C.push(E.x, E.y, E.z);
            C.push(E.x, E.y, E.z);
            C.push(E.x, E.y, E.z)
          }
          if (r) {
            y.push(r[0].u, r[0].v);
            y.push(r[1].u, r[1].v);
            y.push(r[2].u, r[2].v);
            y.push(r[3].u, r[3].v)
          }
          x.push(u, u + 1, u + 2);
          x.push(u, u + 2, u + 3);
          z.push(u, u + 1);
          z.push(u, u + 2);
          z.push(u, u + 3);
          z.push(u + 1, u + 2);
          z.push(u + 2, u + 3);
          u += 4
        }
      }
    }
    if (!w.length) {
      return
    }
    q.__webGLVertexBuffer = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, q.__webGLVertexBuffer);
    c.bufferData(c.ARRAY_BUFFER, new Float32Array(w), c.STATIC_DRAW);
    q.__webGLNormalBuffer = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, q.__webGLNormalBuffer);
    c.bufferData(c.ARRAY_BUFFER, new Float32Array(C), c.STATIC_DRAW);
    q.__webGLUVBuffer = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, q.__webGLUVBuffer);
    c.bufferData(c.ARRAY_BUFFER, new Float32Array(y), c.STATIC_DRAW);
    q.__webGLFaceBuffer = c.createBuffer();
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, q.__webGLFaceBuffer);
    c.bufferData(c.ELEMENT_ARRAY_BUFFER, new Uint16Array(x), c.STATIC_DRAW);
    q.__webGLLineBuffer = c.createBuffer();
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, q.__webGLLineBuffer);
    c.bufferData(c.ELEMENT_ARRAY_BUFFER, new Uint16Array(z), c.STATIC_DRAW);
    q.__webGLFaceCount = x.length;
    q.__webGLLineCount = z.length
  };
  this.renderBuffer = function (n, m) {
    if (n instanceof THREE.MeshPhongMaterial) {
      mAmbient = n.ambient;
      mDiffuse = n.diffuse;
      mSpecular = n.specular;
      c.uniform4f(e.mAmbient, mAmbient.r, mAmbient.g, mAmbient.b, n.opacity);
      c.uniform4f(e.mDiffuse, mDiffuse.r, mDiffuse.g, mDiffuse.b, n.opacity);
      c.uniform4f(e.mSpecular, mSpecular.r, mSpecular.g, mSpecular.b, n.opacity);
      c.uniform1f(e.mShininess, n.shininess);
      c.uniform1i(e.material, d)
    } else {
      if (n instanceof THREE.MeshColorFillMaterial) {
        color = n.color;
        c.uniform4f(e.uniformColor, color.r * color.a, color.g * color.a, color.b * color.a, color.a);
        c.uniform1i(e.material, a)
      } else {
        if (n instanceof THREE.MeshColorStrokeMaterial) {
          lineWidth = n.lineWidth;
          color = n.color;
          c.uniform4f(e.uniformColor, color.r * color.a, color.g * color.a, color.b * color.a, color.a);
          c.uniform1i(e.material, k)
        } else {
          if (n instanceof THREE.MeshBitmapMaterial) {
            if (!n.__webGLTexture && n.loaded) {
              n.__webGLTexture = c.createTexture();
              c.bindTexture(c.TEXTURE_2D, n.__webGLTexture);
              c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, n.bitmap);
              c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.LINEAR);
              c.texParameterCanvasRendereri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.LINEAR_MIPMAP_LINEAR);
              c.generateMipmap(c.TEXTURE_2D);
              c.bindTexture(c.TEXTURE_2D, null)
            }
            c.activeTexture(c.TEXTURE0);
            c.bindTexture(c.TEXTURE_2D, n.__webGLTexture);
            c.uniform1i(e.diffuse, 0);
            c.uniform1i(e.material, h)
          }
        }
      }
    }
    c.bindBuffer(c.ARRAY_BUFFER, m.__webGLVertexBuffer);
    c.vertexAttribPointer(e.position, 3, c.FLOAT, false, 0, 0);
    c.bindBuffer(c.ARRAY_BUFFER, m.__webGLNormalBuffer);
    c.vertexAttribPointer(e.normal, 3, c.FLOAT, false, 0, 0);
    if (n instanceof THREE.MeshBitmapMaterial) {
      c.bindBuffer(c.ARRAY_BUFFER, m.__webGLUVBuffer);
      c.enableVertexAttribArray(e.uv);
      c.vertexAttribPointer(e.uv, 2, c.FLOAT, false, 0, 0)
    } else {
      c.disableVertexAttribArray(e.uv)
    }
    if (n instanceof THREE.MeshBitmapMaterial || n instanceof THREE.MeshColorFillMaterial || n instanceof THREE.MeshPhongMaterial) {
      c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, m.__webGLFaceBuffer);
      c.drawElements(c.TRIANGLES, m.__webGLFaceCount, c.UNSIGNED_SHORT, 0)
    } else {
      if (n instanceof THREE.MeshColorStrokeMaterial) {
        c.lineWidth(lineWidth);
        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, m.__webGLLineBuffer);
        c.drawElements(c.LINES, m.__webGLLineCount, c.UNSIGNED_SHORT, 0)
      }
    }
  };
  this.renderMesh = function (p, s) {
    var r, o, n, q, v, t, u, w;
    for (v in p.materialFaceGroup) {
      w = p.materialFaceGroup[v];
      if (!w.__webGLVertexBuffer) {
        this.createBuffers(p, v)
      }
      for (n = 0, q = p.material.length; n < q; n++) {
        u = p.material[n];
        if (u instanceof THREE.MeshFaceMaterial) {
          for (r = 0, o = w.material.length; r < o; r++) {
            t = w.material[r];
            this.renderBuffer(t, w)
          }
        } else {
          t = u;
          this.renderBuffer(t, w)
        }
      }
    }
  };
  this.setupMatrices = function (m, n) {
    m.autoUpdateMatrix && m.updateMatrix();
    l.multiply(n.matrix, m.matrix);
    e.viewMatrixArray = new Float32Array(n.matrix.flatten());
    e.modelViewMatrixArray = new Float32Array(l.flatten());
    e.projectionMatrixArray = new Float32Array(n.projectionMatrix.flatten());
    i = THREE.Matrix4.makeInvert3x3(l).transpose();
    e.normalMatrixArray = new Float32Array(i.m);
    c.uniformMatrix4fv(e.viewMatrix, false, e.viewMatrixArray);
    c.uniformMatrix4fv(e.modelViewMatrix, false, e.modelViewMatrixArray);
    c.uniformMatrix4fv(e.projectionMatrix, false, e.projectionMatrixArray);
    c.uniformMatrix3fv(e.normalMatrix, false, e.normalMatrixArray);
    c.uniformMatrix4fv(e.objMatrix, false, new Float32Array(m.matrix.flatten()))
  };
  this.render = function (q, p) {
    var r, n, m;
    if (this.autoClear) {
      this.clear()
    }
    p.autoUpdateMatrix && p.updateMatrix();
    c.uniform3f(e.cameraPosition, p.position.x, p.position.y, p.position.z);
    this.setupLights(q);
    for (r = 0, n = q.objects.length; r < n; r++) {
      m = q.objects[r];
      this.setupMatrices(m, p);
      if (m instanceof THREE.Mesh) {
        this.renderMesh(m, p)
      } else {
        if (m instanceof THREE.Line) {
        } else {
          if (m instanceof THREE.Particle) {
          }
        }
      }
    }
  };

  function g() {
    try {
      c = j.getContext("experimental-webgl", {antialias: true})
    } catch (m) {
    }
    if (!c) {
      alert("WebGL not supported");
      throw"cannot create webgl context"
    }
    c.clearColor(0, 0, 0, 1);
    c.clearDepth(1);
    c.enable(c.DEPTH_TEST);
    c.depthFunc(c.LEQUAL);
    c.enable(c.BLEND);
    c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA);
    c.clearColor(0, 0, 0, 0)
  }

  function f() {
    e = c.createProgram();
    c.attachShader(e, b("fragment", ["#ifdef GL_ES", "precision highp float;", "#endif", "uniform sampler2D diffuse;", "uniform vec4 uniformColor;", "varying vec2 vertexUv;", "varying vec3 lightWeighting;", "varying vec3 vNormal;", "uniform int material;", "uniform vec4 mAmbient;", "uniform vec4 mDiffuse;", "uniform vec4 mSpecular;", "uniform float mShininess;", "varying vec3 pLightVectorPoint;", "varying vec3 pLightVectorDirection;", "varying vec3 pViewPosition;", "void main(){", "if(material==3) { ", "vec3 lightVectorPoint = normalize(pLightVectorPoint);", "vec3 lightVectorDir = normalize(pLightVectorDirection);", "vec3 normal = normalize(vNormal);", "vec3 viewPosition = normalize(pViewPosition);", "vec3 halfVectorPoint = normalize(pLightVectorPoint + pViewPosition);", "float dotNormalHalfPoint = dot(normal, halfVectorPoint);", "float ambientCompPoint = 1.0;", "float diffuseCompPoint = max(dot(normal, lightVectorPoint), 0.0);", "float specularCompPoint = pow(dotNormalHalfPoint, mShininess);", "vec4 ambientPoint  = mAmbient * ambientCompPoint;", "vec4 diffusePoint  = mDiffuse * diffuseCompPoint;", "vec4 specularPoint = mSpecular * specularCompPoint;", "vec3 halfVectorDir = normalize(pLightVectorDirection + pViewPosition);", "float dotNormalHalfDir = dot(normal, halfVectorDir);", "float ambientCompDir = 1.0;", "float diffuseCompDir = max(dot(normal, lightVectorDir), 0.0);", "float specularCompDir = pow(dotNormalHalfDir, mShininess);", "vec4 ambientDir  = mAmbient * ambientCompDir;", "vec4 diffuseDir  = mDiffuse * diffuseCompDir;", "vec4 specularDir = mSpecular * specularCompDir;", "vec4 pointLight = ambientPoint + diffusePoint + specularPoint;", "vec4 dirLight = ambientDir + diffuseDir + specularDir;", "gl_FragColor = vec4((pointLight.xyz + dirLight.xyz) * lightWeighting, 1.0);", "} else if(material==2) {", "vec4 texelColor = texture2D(diffuse, vertexUv);", "gl_FragColor = vec4(texelColor.rgb * lightWeighting, texelColor.a);", "} else if(material==1) {", "gl_FragColor = vec4(uniformColor.rgb * lightWeighting, uniformColor.a);", "} else {", "gl_FragColor = vec4(uniformColor.rgb * lightWeighting, uniformColor.a);", "}", "}"].join("\n")));
    c.attachShader(e, b("vertex", ["attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "uniform bool enableLighting;", "uniform vec3 ambientColor;", "uniform vec3 directionalColor;", "uniform vec3 lightingDirection;", "uniform vec3 pointColor;", "uniform vec3 pointPosition;", "uniform mat4 objMatrix;", "uniform mat4 viewMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat3 normalMatrix;", "varying vec4 vertexColor;", "varying vec2 vertexUv;", "varying vec3 lightWeighting;", "varying vec3 vNormal;", "varying vec3 pLightVectorPoint;", "varying vec3 pLightVectorDirection;", "varying vec3 pViewPosition;", "uniform vec3 cameraPosition;", "void main(void) {", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "vec3 transformedNormal = normalize(normalMatrix * normal);", "vec4 lPosition = viewMatrix * vec4( pointPosition, 1.0 );", "vec4 lDirection = viewMatrix * vec4( lightingDirection, 0.0 );", "pLightVectorPoint = normalize(pointPosition.xyz - position.xyz);", "pLightVectorDirection = normalize(lDirection.xyz);", "vec4 mPosition = objMatrix * vec4( position, 1.0 );", "pViewPosition = cameraPosition - mPosition.xyz;", "if(!enableLighting) {", "lightWeighting = vec3(1.0, 1.0, 1.0);", "} else {", "vec3 pointLight = normalize(lPosition.xyz - mvPosition.xyz);", "float directionalLightWeighting = max(dot(transformedNormal, normalize(lDirection.xyz)), 0.0);", "float pointLightWeighting = max(dot(transformedNormal, pointLight), 0.0);", "lightWeighting = ambientColor + directionalColor * directionalLightWeighting + pointColor * pointLightWeighting;", "}", "vNormal = transformedNormal;", "vertexUv = uv;", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n")));
    c.linkProgram(e);
    if (!c.getProgramParameter(e, c.LINK_STATUS)) {
      alert("Could not initialise shaders")
    }
    c.useProgram(e);
    e.viewMatrix = c.getUniformLocation(e, "viewMatrix");
    e.modelViewMatrix = c.getUniformLocation(e, "modelViewMatrix");
    e.projectionMatrix = c.getUniformLocation(e, "projectionMatrix");
    e.normalMatrix = c.getUniformLocation(e, "normalMatrix");
    e.objMatrix = c.getUniformLocation(e, "objMatrix");
    e.enableLighting = c.getUniformLocation(e, "enableLighting");
    e.ambientColor = c.getUniformLocation(e, "ambientColor");
    e.directionalColor = c.getUniformLocation(e, "directionalColor");
    e.lightingDirection = c.getUniformLocation(e, "lightingDirection");
    e.pointColor = c.getUniformLocation(e, "pointColor");
    e.pointPosition = c.getUniformLocation(e, "pointPosition");
    e.material = c.getUniformLocation(e, "material");
    e.uniformColor = c.getUniformLocation(e, "uniformColor");
    e.mAmbient = c.getUniformLocation(e, "mAmbient");
    e.mDiffuse = c.getUniformLocation(e, "mDiffuse");
    e.mSpecular = c.getUniformLocation(e, "mSpecular");
    e.mShininess = c.getUniformLocation(e, "mShininess");
    e.cameraPosition = c.getUniformLocation(e, "cameraPosition");
    e.position = c.getAttribLocation(e, "position");
    c.enableVertexAttribArray(e.position);
    e.normal = c.getAttribLocation(e, "normal");
    c.enableVertexAttribArray(e.normal);
    e.uv = c.getAttribLocation(e, "uv");
    c.enableVertexAttribArray(e.uv);
    e.diffuse = c.getUniformLocation(e, "diffuse");
    c.uniform1i(e.diffuse, 0);
    e.viewMatrixArray = new Float32Array(16);
    e.modelViewMatrixArray = new Float32Array(16);
    e.projectionMatrixArray = new Float32Array(16)
  }

  function b(n, m) {
    var o;
    if (n == "fragment") {
      o = c.createShader(c.FRAGMENT_SHADER)
    } else {
      if (n == "vertex") {
        o = c.createShader(c.VERTEX_SHADER)
      }
    }
    c.shaderSource(o, m);
    c.compileShader(o);
    if (!c.getShaderParameter(o, c.COMPILE_STATUS)) {
      alert(c.getShaderInfoLog(o));
      return null
    }
    return o
  }
};
THREE.RenderableFace3 = function () {
  this.v1 = new THREE.Vector2();
  this.v2 = new THREE.Vector2();
  this.v3 = new THREE.Vector2();
  this.centroidWorld = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.z = null;
  this.color = null;
  this.material = null
};
THREE.RenderableFace4 = function () {
  this.v1 = new THREE.Vector2();
  this.v2 = new THREE.Vector2();
  this.v3 = new THREE.Vector2();
  this.v4 = new THREE.Vector2();
  this.centroidWorld = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.z = null;
  this.color = null;
  this.material = null
};
THREE.RenderableParticle = function () {
  this.x = null;
  this.y = null;
  this.z = null;
  this.rotation = null;
  this.scale = new THREE.Vector2();
  this.color = null;
  this.material = null
};
THREE.RenderableLine = function () {
  this.v1 = new THREE.Vector2();
  this.v2 = new THREE.Vector2();
  this.z = null;
  this.color = null;
  this.material = null
};

export default THREE;
