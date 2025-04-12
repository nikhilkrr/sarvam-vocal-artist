
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VOICE_OPTIONS } from "@/lib/sarvam";
import { Mic } from "lucide-react";

interface TextToSpeechFormProps {
  onSubmit: (text: string, voiceId: string) => void;
  isLoading: boolean;
}

const TextToSpeechForm = ({ onSubmit, isLoading }: TextToSpeechFormProps) => {
  const [text, setText] = useState("");
  const [voiceId, setVoiceId] = useState(VOICE_OPTIONS[0].id);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text, voiceId);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="voice-select" className="block text-sm font-medium mb-2">
              Select Voice
            </label>
            <Select value={voiceId} onValueChange={setVoiceId}>
              <SelectTrigger id="voice-select" className="w-full">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {VOICE_OPTIONS.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name} ({voice.gender})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium mb-2">
              Text to Convert
            </label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert to speech..."
              className="min-h-[140px] resize-none"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading || !text.trim()} 
            className="w-full bg-sarvam-purple hover:bg-sarvam-darkPurple"
          >
            {isLoading ? (
              <>
                <span className="animate-pulse-opacity mr-2">Converting...</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Convert to Speech
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TextToSpeechForm;
