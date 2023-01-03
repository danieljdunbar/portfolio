export async function getAiResponse(message: string) {
  const response = await fetch('backend/chat-with-ai', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (response.ok) {
    const { aiResponse }: { aiResponse: string } = await response.json();
    return aiResponse;
  } else {
    return "Sorry, it looks like I'm having issues. You can still ask me about the topics in the information cloud though";
  }
}
