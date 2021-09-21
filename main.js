import {
  PerspectiveCamera,
  Scene,
  CubeTextureLoader,
  WebGLRenderer,
  } from 'https://unpkg.com/three@0.130.1/build/three.module.js'

  import {OrbitControls} from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js'

  function main() {

    const canvas = document.querySelector('#scene-container');
    const renderer = new WebGLRenderer({canvas});
    const scene = new Scene();

    const fov = 75;
    const aspect = 2; 
    const near = 0.1;
    const far = 100;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3;
  
    const controls = new OrbitControls(camera, document.querySelector('.parent'));
    controls.target.set(10, 2, 4);
    controls.update();
  
    {
      const loader = new CubeTextureLoader();
      const texture = loader.load([
      'land-x.jpg',
      'land+x.jpg',
      'land+y.jpg',
      'land-y.jpg',
      'land+z.jpg',
      'land-z.jpg',
      ]);
      scene.background = texture;
    }
  
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  
    function render(time) {
      time *= 0.001;
  
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
  
      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
  }
  
  main();