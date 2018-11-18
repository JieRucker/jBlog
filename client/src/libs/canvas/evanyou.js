class EvanYou {
  constructor() {

  }

  render() {
    this.c = document.getElementById('evanyou');
    if (this.c) {
      this.x = this.c.getContext('2d');
      this.pr = window.devicePixelRatio || 1;
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.f = 90;
      this.q = null;
      this.m = Math;
      this.r = 0;
      this.u = this.m.PI * 2;
      this.v = this.m.cos;
      this.z = this.m.random;
      this.c.width = this.w * this.pr;
      this.c.height = this.h * this.pr;
      this.x.scale(this.pr, this.pr);
      this.x.globalAlpha = 0.6;
    }

    this.x.clearRect(0, 0, this.w, this.h);
    this.q = [{x: 0, y: this.h * .7 + this.f}, {x: 0, y: this.h * .7 - this.f}];
    while (this.q[1].x < this.w + this.f) this.d(this.q[0], this.q[1])
  }

  d(i, j) {
    this.x.beginPath();
    this.x.moveTo(i.x, i.y);
    this.x.lineTo(j.x, j.y);
    let k = j.x + (this.z() * 2 - 0.25) * this.f,
      n = this.y(j.y);
    this.x.lineTo(k, n);
    this.x.closePath();
    this.r -= this.u / -50;
    this.x.fillStyle = '#' + (this.v(this.r) * 127 + 128 << 16 | this.v(this.r + this.u / 3) * 127 + 128 << 8 | this.v(this.r + this.u / 3 * 2) * 127 + 128).toString(16);
    this.x.fill();
    this.q[0] = this.q[1];
    this.q[1] = {x: k, y: n}
  }

  y(p) {
    let t = p + (this.z() * 2 - 1.1) * this.f;
    return (t > this.h || t < 0) ? this.y(p) : t
  }
}

export default new EvanYou()
