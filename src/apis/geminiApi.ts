import http from '../utils/http'

interface GeminiResponse {
  response: string
}

interface GeminiError {
  error: string
  message: string
}

export const askGemini = async (question: string): Promise<GeminiResponse> => {
  try {
    const response = await http.post<GeminiResponse>('/ask', { question })
    return response.data
  } catch (error) {
    throw new Error((error as GeminiError).message || 'Failed to get response from AI')
  }
}
