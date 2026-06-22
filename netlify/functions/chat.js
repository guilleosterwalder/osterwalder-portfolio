exports.handler = async (event) => {
  try {
    const { history, message, systemPrompt } = JSON.parse(event.body);

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            ...history,
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: String(error),
          stack: error?.stack,
        }),
      };
    }
};