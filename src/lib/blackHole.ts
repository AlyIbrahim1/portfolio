import { clamp, mix } from './math'

// Rays bent around a Schwarzschild hole (radius 1), an edge-on accretion disk, a photon ring and a purple haze.
const SHADER = [
  'precision highp float;uniform vec2 R,C;uniform float T,Dst,Inc,Disk,Rs,Wr;uniform vec3 Hot,Cool,Ring,G,Hz;',
  'float h(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5453);}',
  // value noise that wraps every P cells along y, so angle-based textures have no seam
  'float n(vec2 p,float P){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);float y0=mod(i.y,P),y1=mod(i.y+1.,P);return mix(mix(h(vec2(i.x,y0)),h(vec2(i.x+1.,y0)),f.x),mix(h(vec2(i.x,y1)),h(vec2(i.x+1.,y1)),f.x),f.y);}',
  'void main(){vec2 uv=(gl_FragCoord.xy-C)/R.y;float ci=cos(Inc),si=sin(Inc);vec3 ro=vec3(0.,si,-ci)*Dst;vec3 fw=-normalize(ro),rt=normalize(cross(vec3(0.,1.,0.),fw)),up=cross(fw,rt);',
  'vec3 v=normalize(fw+uv.x*rt+uv.y*up),p=ro;vec3 hc=cross(p,v);float h2=dot(hc,hc);vec3 col=vec3(0.);float a=0.,rmin=1e3,hit=0.;',
  'for(int i=0;i<120;i++){float r=length(p);rmin=min(rmin,r);float dt=clamp(.11*(r-.7),.02,2.);vec3 pn=p+v*dt;',
  'if(p.y*pn.y<0.){vec3 q=mix(p,pn,p.y/(p.y-pn.y));float rq=length(q.xz);if(rq>2.4&&rq<14.){float u=(atan(q.z,q.x)+T*2.2/pow(rq,1.5))/6.2832;float tx=n(vec2(rq*3.,u*32.),32.)*.5+n(vec2(rq*9.,u*96.),96.)*.3+n(vec2(rq*24.,u*192.),192.)*.2;tx*=tx*1.7;float fa=smoothstep(2.4,3.2,rq)*smoothstep(14.,4.5,rq);vec3 vel=normalize(vec3(-q.z,0.,q.x));float dop=clamp(1.+.5*dot(vel,-normalize(v)),.3,1.7);vec3 e=mix(Cool,Hot,clamp(4.2/rq-.25,0.,1.))*(.3+1.1*tx)*fa*dop*dop*dop*Disk;float al=clamp(fa*(.45+.55*tx),0.,1.)*Disk;col+=(1.-a)*e*al*2.;a+=(1.-a)*al*.9;}}',
  'v+=-1.5*h2*p/pow(r,5.)*dt;p=pn;if(dot(p,p)<1.){hit=1.;break;}if(r>Dst+16.)break;}',
  // The shadow is circular at any inclination, so its edge is drawn analytically (antialiased) instead of from the per-pixel hit test.
  // Around it: a thin photon ring and a fainter second one, the lensed disk glow with drifting hot spots, and Doppler beaming that brightens the approaching (left) side
  'float L=length(uv),an=atan(uv.y,uv.x),sh=1.-smoothstep(Rs-1.2/R.y,Rs+1.2/R.y,L),ds=max(L-Rs,0.);',
  'float bm=1.-.38*cos(an),tu=.55+.9*n(vec2(ds*40.,(an/6.2832+T*.012)*64.),64.);vec3 Wt=vec3(1.,.94,1.);',
  'vec3 ar=(Wt*exp(-ds*150.)*1.5+Wt*exp(-abs(ds-.006)*700.)*.35+Ring*exp(-ds*16.)*.6*tu+Ring*exp(-ds*4.5)*.2)*bm;',
  'col+=(1.-a)*(1.-sh)*(mix(Ring*exp(-max(rmin-1.5,0.)*7.)*1.2*bm*mix(1.,tu,.5),ar,Wr)+Hz*(exp(-L*3.2)+.25*exp(-L*1.1)));col=1.-exp(-col*1.3);col+=G;col+=(h(gl_FragCoord.xy+fract(T))-.5)/160.;gl_FragColor=vec4(col,1.);}',
].join('')

export interface Hole {
  draw(n: number, W: number, H: number, cx: number, cy: number, T: number, dist: number, inc: number, disk: number, rs: number, wr: number): void
}

// Returns null without WebGL; the canvas then shows a static gradient.
export function createHole(cv: HTMLCanvasElement): Hole | null {
  let ctx: WebGLRenderingContext | null
  try {
    ctx = cv.getContext('webgl', { antialias: false })
  } catch {
    ctx = null
  }
  if (!ctx) {
    cv.style.background = 'radial-gradient(60% 40% at 50% 100%, #fff 0 8%, #c084fc 14%, #5b21b6 26%, #160b33 48%, #05030c 75%)'
    return null
  }
  const gl = ctx
  function compile(type: number, source: string) {
    const o = gl.createShader(type)!
    gl.shaderSource(o, source)
    gl.compileShader(o)
    if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o) ?? 'shader failed')
    return o
  }
  const pg = gl.createProgram()!
  gl.attachShader(pg, compile(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'))
  gl.attachShader(pg, compile(gl.FRAGMENT_SHADER, SHADER))
  gl.linkProgram(pg)
  gl.useProgram(pg)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const la = gl.getAttribLocation(pg, 'a')
  gl.enableVertexAttribArray(la)
  gl.vertexAttribPointer(la, 2, gl.FLOAT, false, 0, 0)
  const u = Object.fromEntries(['R', 'C', 'T', 'Dst', 'Inc', 'Disk', 'Rs', 'Wr', 'Hot', 'Cool', 'Ring', 'G', 'Hz'].map((k) => [k, gl.getUniformLocation(pg, k)]))
  gl.uniform3fv(u.Hot, [1, 0.94, 1])
  gl.uniform3fv(u.Cool, [0.5, 0.16, 1])
  gl.uniform3fv(u.Ring, [0.82, 0.62, 1])
  gl.uniform3fv(u.G, [0.006, 0.005, 0.022])
  gl.uniform3fv(u.Hz, [0.3, 0.12, 0.85])
  // Renders below CSS resolution and steps down further if frames run long
  let q = 0.7
  let slow = 0
  let last = 0
  return {
    draw(n, W, H, cx, cy, T, dist, inc, disk, rs, wr) {
      if (last) {
        slow = n - last > 34 ? slow + 1 : Math.max(0, slow - 1)
        if (slow > 25 && q > 0.3) {
          q *= 0.8
          slow = 0
        }
      }
      last = n
      const w = Math.max(2, Math.round(W * q))
      const h = Math.max(2, Math.round(H * q))
      if (cv.width !== w || cv.height !== h) {
        cv.width = w
        cv.height = h
      }
      gl.viewport(0, 0, w, h)
      gl.uniform2f(u.R, w, h)
      gl.uniform2f(u.C, cx * q, (H - cy) * q)
      gl.uniform1f(u.T, T)
      gl.uniform1f(u.Dst, dist)
      gl.uniform1f(u.Inc, inc)
      gl.uniform1f(u.Disk, disk)
      gl.uniform1f(u.Rs, rs)
      gl.uniform1f(u.Wr, wr)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
  }
}

// The shadow's real edge for the shader's own ray step: trace the same rays in JS, tabulate edge (tan of the angle) against camera distance, then invert.
function captured(D: number, u: number) {
  let p = [0, 0, -D]
  const l = Math.hypot(u, 1)
  let v = [0, -u / l, 1 / l]
  const h2 = Math.pow((D * u) / l, 2)
  for (let i = 0; i < 120; i++) {
    const r = Math.hypot(p[0], p[1], p[2])
    const dt = clamp(0.11 * (r - 0.7), 0.02, 2)
    const k = ((1.5 * h2) / Math.pow(r, 5)) * dt
    p = [p[0] + v[0] * dt, p[1] + v[1] * dt, p[2] + v[2] * dt]
    v = [v[0] - k * (p[0] - v[0] * dt), v[1] - k * (p[1] - v[1] * dt), v[2] - k * (p[2] - v[2] * dt)]
    if (p[0] * p[0] + p[1] * p[1] + p[2] * p[2] < 1) return true
    if (r > D + 16) return false
  }
  return false
}

let edge: [number, number][] | undefined
function edgeTable() {
  if (edge) return edge
  edge = []
  for (let i = 0; i < 48; i++) {
    const d = 1.55 * Math.pow(60 / 1.55, i / 47)
    let lo = 0
    let hi = 20
    for (let b = 0; b < 26; b++) {
      const m = (lo + hi) / 2
      if (captured(d, m)) lo = m
      else hi = m
    }
    edge.push([d, lo])
  }
  return edge
}

// Camera distance at which the shadow's edge is Rpx pixels on a canvas H pixels tall
export function distFor(Rpx: number, H: number) {
  const table = edgeTable()
  const t = Rpx / H
  for (let i = 1; i < table.length; i++) {
    if (table[i][1] <= t) {
      const a = table[i - 1]
      const b = table[i]
      return mix(a[0], b[0], (a[1] - t) / (a[1] - b[1]))
    }
  }
  return table[table.length - 1][0]
}
