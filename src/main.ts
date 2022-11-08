import './style.css';
import { init, animate } from './scene';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="bg"></canvas>
    <main>
      <div class="chat-container">
        <div class="chat-history">History</div>
        <div class="chat-input">Input here</div>
      </div>
    </main>
  </div>
`;

init();
animate();
