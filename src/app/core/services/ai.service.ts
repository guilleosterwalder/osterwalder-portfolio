import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GUILLERMO_CONTEXT } from '../constants/i18n/guillermo-context';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class AiService {

  private readonly http = inject(HttpClient);

  async ask( history: ChatMessage[], message: string): Promise<string> {

    const historyMessages = history.map(message => ({
      role: message.sender === 'user'
        ? 'user'
        : 'assistant',
        
      content: message.text,
    }));

    const response = await firstValueFrom(
      this.http.post<IaResponse>(
        '/.netlify/functions/chat',
        {
          history: historyMessages,
          message,
          systemPrompt: GUILLERMO_CONTEXT,
        }
      )
    );

    return (
      response.choices?.[0]?.message?.content ??
      'No response received.'
    );
  }
  
}

export interface IaResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
}