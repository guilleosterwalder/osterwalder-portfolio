import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { AiService } from '../../core/services/ai.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chat-assistant',
  imports: [DragDropModule],
  templateUrl: './chat-assistant.html',
  styleUrl: './chat-assistant.css',
})
export class ChatAssistant {
  readonly settings = inject(SettingsService);
  readonly AiService = inject(AiService);
  @ViewChild('chatBody')
  chatBody?: ElementRef<HTMLDivElement>;

  readonly isOpen = signal(false);

  readonly messages = signal<ChatMessage[]>([
    {
      sender: 'assistant',
      text: "Hi! I'm Guillermo AI. Ask me anything about Guillermo's experience, skills or projects.",
    },
  ]);

  readonly currentMessage = signal('');
  readonly isTyping = signal(false);

  async sendMessage(): Promise<void> {
    const message = this.currentMessage().trim();

    if (!message) {
      return;
    }

    this.messages.update(messages => [
      ...messages,
      {
        sender: 'user',
        text: message,
      },
    ]);
    this.scrollToBottom();

    this.currentMessage.set('');
    this.isTyping.set(true);

  try {
    const response = await this.AiService.ask(message);

    this.messages.update(messages => [
      ...messages,
      {
        sender: 'assistant',
        text: response,
      },
    ]);
  }

  catch {
    this.messages.update(messages => [
      ...messages,
      {
        sender: 'assistant',
        text: 'Error contacting Gemini.',
      },
    ]);
  }

  finally {
    this.isTyping.set(false);
    this.scrollToBottom();
  }

  }

  toggleChat(): void {
    this.isOpen.set(!this.isOpen());
  }

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      if (!this.chatBody) {
        return;
      }

      const element = this.chatBody.nativeElement;

      element.scrollTop = element.scrollHeight;
    });
  }

}

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}
