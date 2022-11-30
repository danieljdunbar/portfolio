import './chat.css';
import { NodeCloud } from '../node-cloud';
import { BIO_INFO } from '../info';

interface Message {
  user: boolean;
  text: string;
}

export class Chat {
  history: Message[] = [];
  historyHtml = '';

  constructor(private nodeCloud: NodeCloud) {}

  newUserMessage(text: string) {
    const newMessage: Message = { user: true, text };

    this.history.push(newMessage);
    this.updateHistory(newMessage);

    if (BIO_INFO.includes(text)) {
      this.nodeCloud.focusNode(text);
    }
  }

  private updateHistory(message: Message) {
    const historyDiv = document.querySelector('.chat-history')!;
    let messageClass = '';
    let messenger = '';

    if (message.user) {
      messageClass = 'user-message';
      messenger = 'User';
    } else {
      messageClass = 'ai-message';
      messenger = 'Jane';
    }

    this.historyHtml += `
        <div class="message">
            <div class="${messageClass}">
                &lt; ${messenger} &gt;
            </div>
            &nbsp;
            ${message.text}
        </div>
      `;

    historyDiv.innerHTML = this.historyHtml;

    historyDiv.scrollTop = historyDiv.scrollHeight;
  }
}
