
import { useState } from "react";
import TextToSpeechForm from "@/components/TextToSpeechForm";
import AudioPlayer from "@/components/AudioPlayer";
import { useTTS } from "@/hooks/useTTS";
import { Mic } from "lucide-react";

const Index = () => {
  const { generateAudio, isGenerating, audioUrl, clearAudio } = useTTS();
  
  const handleSubmit = async (text: string, voiceId: string) => {
    // Clear previous audio before generating new one
    clearAudio();
    // Generate new audio
    generateAudio({ text, voiceId });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <header className="bg-sarvam-purple py-6 text-white">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mic className="h-7 w-7" />
              <h1 className="text-2xl font-bold tracking-tight">Sarvam TTS</h1>
            </div>
            <div className="text-sm">Text to Speech Converter</div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container px-4 mx-auto mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Transform Text into Natural Speech
            </h2>
            <p className="text-lg text-gray-600">
              Enter your text below and convert it to lifelike speech in seconds
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-[1fr_auto] bg-white rounded-lg p-6 shadow-sm">
            <div>
              <TextToSpeechForm 
                onSubmit={handleSubmit}
                isLoading={isGenerating}
              />
              
              {audioUrl && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Generated Audio</h3>
                  <AudioPlayer audioUrl={audioUrl} />
                </div>
              )}
            </div>
            
            <div className="hidden md:block border-l pl-8 w-64">
              <div className="sticky top-8">
                <h3 className="font-medium mb-4">Tips</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Keep sentences natural and conversational</li>
                  <li>• Add punctuation for better pacing</li>
                  <li>• Use different voices for different tones</li>
                  <li>• Try pauses with commas and periods</li>
                </ul>
                
                <div className="mt-8 p-4 bg-sarvam-light rounded-lg border border-gray-200">
                  <h4 className="font-medium text-sm mb-2">Sample Text</h4>
                  <p className="text-xs text-gray-600 italic">
                    "Welcome to Sarvam Text-to-Speech. This advanced AI technology 
                    transforms your written words into natural-sounding speech with 
                    remarkable clarity and expression."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-500">
          <p>Powered by Sarvam AI • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
