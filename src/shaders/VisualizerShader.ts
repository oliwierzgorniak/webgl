// used AI to get the vertex shader, which centers the visualizer no matter from which perspective we look
// Shader used: https://www.shadertoy.com/view/WldfD2

const ViusalizerShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,
  fragment: `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform sampler2D iChannel0;
    uniform float iTimeDelta;
    uniform vec4 iBarColor;
    uniform vec4 iEllipseColor;

    #define col1 vec4(0.07, 0.02, 0.35, 1.0)
    #define col2 vec4(1.0, 0.46, 1.0, 1.0)
    #define col3 vec4(0.99, 0.0, 1.0, 1.0)
    #define col4 vec4(0.1, 0.7, 1.0, 1.0)
    #define col5 vec4(0.1, 0.6, 1.0, 1.0)
    #define col6 vec4(0.02, 0.85, 0.91, 1.0)


    float Remap(in float val, in vec2 old, in vec2 new)
    {
        float t = clamp((val - old.x) / (old.y - old.x), 0.0, 1.0);
        float result = t * (new.y - new.x) + new.x;
        return result;
    }

    void Pixellize(inout vec2 uv, float value)
    {
        uv *= value;
        uv = floor(uv);
        uv /= value;
    }

    vec4 Background(in vec2 uv)
    {
        uv *= 0.56;
        
        Pixellize(uv, 30.0);
        
        float t = Remap(sin((iTime - 20.0) * 0.1), vec2(-1.0, 1.0), vec2(-0.1, 0.4));
        vec4 col = mix(col1, col2, uv.y + t);
        
        return col;
    }

    vec4 Bars(in vec2 uv)
    {    
        uv *= 0.566; 
        uv.x = abs(uv.x);
        uv.y += 0.58;
        uv.y *= 4.2;
        
        float bars = 1.0 - abs(mod(uv.x * 320.0, 2.0) - 1.0);
        
        Pixellize(uv, 80.0);
        
        float aud = step(uv.y, texture(iChannel0, vec2(uv.x, 0.0)).r);           
        
        vec4 col = mix(vec4(0.0), col1, bars * aud);
        col = mix(col, iBarColor, col.w);
        
        return col;
    }

    vec4 Bass(in vec2 uv)
    {
        uv.y += 1.75;
        uv.y *= 1.6;
        
        float aud = texture(iChannel0, vec2(0.0, 0.0)).r;
        float b0 = smoothstep(1.2 + aud, 1.15 + aud, length(uv));
        
        Pixellize(uv, 40.0);
        
        float b1 = smoothstep(1.0 + aud, 0.4 + aud, length(uv));
        float b2 = smoothstep(1.0, 0.8, length(uv));
        float b = mix(mix(b0 + b1 + b2, b1 + b2, step(aud, 0.7)), b2, step(aud, 0.3));
        
        vec4 col = mix(vec4(0.0), iEllipseColor, b0);
        col = mix(col, iEllipseColor * 0.7, b1);
        col = mix(col, iEllipseColor * 0.5, b2);
        
        return col;
    }

    

    varying vec2 vUv;

    void main()
    {
        vec4 fragColor;
        // vec2 fragCoord = gl_FragCoord.xy;

        vec2 centeredUv = vUv * 2.0 - 1.0; 

        float planeAspect = 120.0 / 100.0;
    
        vec2 uv;
        uv.x = centeredUv.x * planeAspect; 
        uv.y = centeredUv.y;
       

        vec4 bg = Background(uv);
        vec4 bars = Bars(uv);
        vec4 bass = Bass(uv);
        
        vec4 col = mix(vec4(0.0), bg, bg.w);
        col = mix(col, bass, bass.w);
        col = mix(col, bars, bars.w);
        
        fragColor = vec4(col);
        
        gl_FragColor = fragColor;
    }
`,
};

export default ViusalizerShader;
