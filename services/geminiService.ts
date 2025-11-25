import { GoogleGenAI } from "@google/genai";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Assume this variable is pre-configured, valid, and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string, 
  history: string[], 
  imageBase64?: string
): Promise<string> => {
  try {
    const model = ai.models;
    
    // Construct a context-aware prompt
    const systemInstruction = `
      Você é um assistente virtual inteligente no portfólio de Marcelo Teixeira.
      
      Sobre Marcelo:
      - Profissão: Desenvolvedor e Analista de Dados e IA.
      - Foco: Transformar dados em soluções inteligentes, automação, dashboards e modelos preditivos.
      - Habilidades Técnicas: Python, SQL, JavaScript, React, Power BI, AWS, Docker, Machine Learning.
      
      INSTRUÇÃO ESPECIAL PARA IMAGENS:
      Se o usuário enviar uma imagem (como um cartão de visita, crachá, print de LinkedIn ou currículo), sua tarefa principal é extrair os dados e formatar a resposta EXCLUSIVAMENTE como um objeto JSON.
      
      IMPORTANTE: Não use blocos de código markdown (\`\`\`json). Retorne apenas o JSON puro se encontrar dados de contato.
      
      O formato JSON deve ser estritamente este:
      {
        "cardData": {
          "name": "Nome Completo",
          "role": "Cargo ou Título",
          "company": "Empresa (se houver)",
          "email": "Email (se houver)",
          "phone": "Telefone (se houver)",
          "website": "Site ou Link (se houver)",
          "location": "Localização (se houver)",
          "summary": "Uma frase curta e profissional sobre a pessoa baseada na imagem"
        }
      }

      Se a imagem não for um cartão ou perfil profissional, ou se for apenas texto sem imagem, responda normalmente em texto corrido (Markdown), sendo conciso e prestativo.
    `;

    // Prepare contents
    const parts: any[] = [];
    
    if (imageBase64) {
      // Remove the data URL prefix (e.g., "data:image/png;base64,") if present to get raw base64
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      
      parts.push({
        inlineData: {
          mimeType: 'image/png', // Assuming PNG or JPEG, GenAI handles standard types well
          data: base64Data
        }
      });
    }

    if (message) {
      parts.push({ text: message });
    } else if (parts.length === 0) {
      // Fallback if empty
      return "Por favor, envie uma mensagem ou uma imagem.";
    }

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Desculpe, não consegui processar sua solicitação.";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Houve um erro técnico ao consultar minha IA. Por favor, tente novamente mais tarde.";
  }
};