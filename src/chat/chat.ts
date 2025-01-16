import './chat.css';
import { NodeCloud } from '../node-cloud';
import { BIO_INFO, Info } from '../info';
// import { getAiResponse } from './getAiResponse';

interface Message {
  user: boolean;
  text: string;
}

export class Chat {
  history: Message[] = [];
  historyHtml = '';
  hideResumeButton = true;
  janeTalking = false;

  constructor(private nodeCloud: NodeCloud) {
    this.janeIntro();
  }

  private async janeIntro() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.newJaneMessage('Hello!');

    await new Promise((resolve) => setTimeout(resolve, 1500));
    this.newJaneMessage(
      'I am a bot named Jane here to help you learn about Daniel'
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.newJaneMessage(
      'Tilt the box to view the information cloud from different angles'
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.newJaneMessage(
      "You can type in one of the subjects floating around in there and I'll show you what I know about him"
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.newJaneMessage(
      'For example you can try typing "work", "education", "skills", or my personal favorite "dog"'
    );

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // this.newJaneMessage('Or you can just chat with me if you would like :)');

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  private async newJaneMessage(text: string) {
    const newMessage: Message = { user: false, text };

    this.history.push(newMessage);
    this.updateHistory(newMessage);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async newUserMessage(text: string) {
    let isInfoMessage = false;
    const newMessage: Message = { user: true, text };

    this.history.push(newMessage);
    this.updateHistory(newMessage);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (const info of BIO_INFO) {
      if (info.label.toLowerCase() === text.toLowerCase()) {
        this.newJaneMessage('Here is what I know about ' + text.toLowerCase());
        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.hideChat();
        this.nodeCloud.focusNode(text, () => this.showInfo(info));
        isInfoMessage = true;
        break;
      }
    }

    if (!isInfoMessage) {
      // const aiResponse = await getAiResponse(text);
      const aiResponse = "Sorry, I didn't understand that! Try typing in the category you want to see again.";

      this.newJaneMessage(aiResponse);
    }
  }

  private showInfo(info: Info) {
    document.querySelector<HTMLButtonElement>(
      '.info-container'
    )!.style.display = 'flex';
    document.querySelector<HTMLDivElement>('.info-title')!.innerHTML =
      info.label;
    document.querySelector<HTMLDivElement>('.info-details')!.innerHTML =
      info.detailsHtml;
  }

  private hideChat() {
    document.querySelector<HTMLDivElement>('.chat-container')!.style.display =
      'none';
  }

  resume() {
    document.querySelector<HTMLButtonElement>(
      '.info-container'
    )!.style.display = 'none';

    this.nodeCloud.resume(() => this.showChat());
  }

  private showChat() {
    document.querySelector<HTMLDivElement>('.chat-container')!.style.display =
      'flex';
    document.querySelector<HTMLDivElement>('.chat-input')!.focus();
    window.scrollTo(0, document.body.scrollHeight);
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
