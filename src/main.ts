import './style.css';
import { init, animate } from './scene';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="bg"></canvas>
  </div>
`;

init();
animate();
