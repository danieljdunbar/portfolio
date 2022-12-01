import './chat.css';
import { NodeCloud } from '../node-cloud';
import { BIO_INFO, Info } from '../info';

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

    for (const info of BIO_INFO) {
      if (info.label.toLowerCase() === text.toLowerCase()) {
        this.hideChat();
        this.nodeCloud.focusNode(text);
        this.addInfo(info);
        break;
      }
    }
  }

  private addInfo(info: Info) {
    document.querySelector<HTMLDivElement>('.info-title')!.innerHTML =
      info.label;
    document.querySelector<HTMLDivElement>('.info-details')!.innerHTML =
      info.detailsHtml;
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
