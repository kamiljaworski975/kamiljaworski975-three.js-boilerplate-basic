
uniform float time;

varying vec2 vUv;
varying float vNoise;

void main() {
    vec3 newPosition = position;

    vUv = uv;

    vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
}