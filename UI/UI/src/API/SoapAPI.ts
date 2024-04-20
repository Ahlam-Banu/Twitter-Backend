export async function translateContent(content: string) {
    try {
        
        const url = 'http://localhost:8000/translate';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: content })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch translation');
        }

        const translatedContent = await response.json();
        const translatedText = translatedContent.translatedText;

        console.log("result", translatedText);
        return translatedText;

    } catch (error) {
        console.error('Failed to translate content:', error);
        throw new Error('Failed to translate content');
    }
}