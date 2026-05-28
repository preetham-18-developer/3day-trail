const fs = require('fs');

async function test(url, model) {
  const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{role: 'user', content: 'hello'}],
        max_tokens: 10,
        temperature: 0.7,
      }),
    });
    console.log(url, model, response.status);
    console.log(await response.text());
}

async function run() {
  await test('https://integrate.api.nvidia.com/v1/chat/completions', 'meta/llama3-8b-instruct');
  await test('https://integrate.api.nvidia.com/v1/chat/completions', 'meta/llama-3.1-8b-instruct');
}
run();
