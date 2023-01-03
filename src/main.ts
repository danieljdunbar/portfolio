import './style.css';
import { Chat } from './chat';
import { NodeCloud } from './node-cloud';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="bg"></div>
    <main>
      <div class="info-container">
        <div class="node-info">
          <div class="info-title"></div>
          <div class="info-details"></div>
        </div>
        <button class="resume">Resume</button>
      </div>
      <div class="chat-container">
        <div class="chat-history"></div>
        <input type="text" class="chat-input" placeholder="Enter message"></input>
      </div>
    </main>
  </div>
`;

const nodeCloud = new NodeCloud();
const chat = new Chat(nodeCloud);

const userInput = document.querySelector<HTMLInputElement>('.chat-input')!;
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    chat.newUserMessage(userInput.value);
    userInput.value = '';
  }
});

const resumeButton = document.querySelector<HTMLButtonElement>('.resume')!;
resumeButton.addEventListener('click', () => chat.resume());

function animate() {
  nodeCloud.moveNodes();
  requestAnimationFrame(animate);
  nodeCloud.render();
}

animate();
