
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
    // The API endpoint was incorrect, update it to match the actual endpoint
    const response = await fetch("https://api.sarvam.ai/v1/audio/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        text: params.text,
        voice_id: params.voiceId,
        encoding: "mp3"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(errorText || "Failed to generate speech");
    }

    // For actual API, we expect to get an audio blob or URL
    const data = await response.json();
    
    return {
      audioUrl: data.audio_url || URL.createObjectURL(
        new Blob([data.audio_content], { type: "audio/mp3" })
      )
    };
  } catch (error) {
    console.error("Error generating speech:", error);
    throw error;
  }
}
