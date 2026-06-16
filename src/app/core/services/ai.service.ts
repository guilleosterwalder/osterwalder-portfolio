import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
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

    const body = {
      model: 'nvidia/nemotron-3-ultra-550b-a55b:free',

      messages: [
        {
          role: 'system',
          content: GUILLERMO_CONTEXT,
        },
      
        ...historyMessages,
      
        {
          role: 'user',
          content: message,
        },
      ]
    };

    const response = await firstValueFrom(
      this.http.post<IaResponse>(
        'https://openrouter.ai/api/v1/chat/completions',
        body,
        {
          headers: {
            Authorization:
              `Bearer ${environment.AiApiKey}`,

            'Content-Type':
              'application/json',
          },
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