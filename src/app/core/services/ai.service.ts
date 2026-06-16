import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AiService {

  private readonly http = inject(HttpClient);

  async ask(message: string): Promise<string> {

    const body = {
      model: 'nvidia/nemotron-3-ultra-550b-a55b:free',

      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
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

interface IaResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
}