
// API key is stored directly in the code since it was provided in the request
// In production, use environment variables or a secure backend
const API_KEY = "cm9bmapxr0008l1048nnlqjzc";

export interface VoiceOption {
  id: string;
  name: string;
  gender?: string;
  preview?: string;
}

export const VOICE_OPTIONS: VoiceOption[] = [
  { id: "female-voice-1", name: "Sophia", gender: "female" },
  { id: "male-voice-1", name: "James", gender: "male" },
  { id: "female-voice-2", name: "Emma", gender: "female" },
  { id: "male-voice-2", name: "Michael", gender: "male" }
];

export interface TTSRequest {
  text: string;
  voiceId: string;
}

export interface TTSResponse {
  audioUrl: string;
}

export async function generateSpeech(params: TTSRequest): Promise<TTSResponse> {
  try {
    const response = await fetch("https://api.market/store/sarvam/ai-models/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: params.voiceId,
        input: params.text
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate speech");
    }

    const data = await response.json();
    
    // The actual API response structure might differ from this mock
    // Update according to actual API documentation
    return {
      audioUrl: data.url || URL.createObjectURL(
        new Blob([data.audio_content], { type: "audio/mp3" })
      )
    };
  } catch (error) {
    console.error("Error generating speech:", error);
    throw error;
  }
}
