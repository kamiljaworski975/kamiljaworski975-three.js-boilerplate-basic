varying vec2 vUv;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;

void main() {
    vec2 newUV = vUv;    

    gl_FragColor = vec4(vUv, 0.,1.);

    gl_FragColor = vec4(colorA, 1.);
}