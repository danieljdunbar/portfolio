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
  hideResumeButton = true;

  constructor(private nodeCloud: NodeCloud) {}

  newUserMessage(text: string) {
    const newMessage: Message = { user: true, text };

    this.history.push(newMessage);
    this.updateHistory(newMessage);

    if (BIO_INFO.includes(text)) {
      this.hideChat();
      this.nodeCloud.focusNode(text);
    }
  }

  private hideChat() {
    document.querySelector<HTMLDivElement>('.chat-container')!.style.display =
      'none';
    document.querySelector<HTMLButtonElement>(
      '.info-container'
    )!.style.display = 'flex';
  }

  showChat() {
    this.nodeCloud.resume();

    document.querySelector<HTMLButtonElement>(
      '.info-container'
    )!.style.display = 'none';
    document.querySelector<HTMLDivElement>('.chat-container')!.style.display =
      'flex';
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
