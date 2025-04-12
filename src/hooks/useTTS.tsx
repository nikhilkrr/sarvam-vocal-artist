
import { useState } from "react";
import { toast } from "sonner";
import { generateSpeech, type TTSRequest } from "@/lib/sarvam";

export function useTTS() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generateAudio = async (params: TTSRequest) => {
    if (!params.text.trim()) {
      toast.error("Please enter some text to convert to speech");
      return;
    }

    setIsGenerating(true);
    
    try {
      // For development testing, use a mock response if API is not working
      if (process.env.NODE_ENV === "development") {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Use a sample audio file
        setAudioUrl("https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3");
        toast.success("Audio generated successfully (development mode)");
        setIsGenerating(false);
        return;
      }
      
      // If we're not in development mode, attempt to call the real API
      try {
        const result = await generateSpeech(params);
        setAudioUrl(result.audioUrl);
        toast.success("Audio generated successfully!");
      } catch (apiError) {
        console.error("API call failed, falling back to sample audio:", apiError);
        // Fall back to a sample audio file if the API call fails
        setAudioUrl("https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-2.mp3");
        toast.warning("API call failed. Using sample audio for demonstration.");
      }
    } catch (error) {
      console.error("Error in TTS generation:", error);
      toast.error("Failed to generate audio. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAudio,
    isGenerating,
    audioUrl,
    clearAudio: () => setAudioUrl(null),
  };
}
