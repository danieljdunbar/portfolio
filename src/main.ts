import './style.css';
import { Chat } from './chat';
import { NodeCloud } from './node-cloud';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="bg"></div>
    <main>
      <div class="chat-container">
        <div class="chat-history"></div>
        <input class="chat-input" placeholder="Enter message"></input>
      </div>
    </main>
  </div>
`;

const nodeCloud = new NodeCloud();
const chat = new Chat();

const userInput = document.querySelector<HTMLInputElement>('.chat-input')!;
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    chat.newUserMessage(userInput.value);
    userInput.value = '';
  }
});

function animate() {
  nodeCloud.moveNodes();
  requestAnimationFrame(animate);
  nodeCloud.render();
}

animate();
