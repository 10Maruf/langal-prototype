import React, { useState } from 'react';
import { Button } from './button';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TTSButtonProps {
    text: string;
    authorName?: string;
    className?: string;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export const TTSButton: React.FC<TTSButtonProps> = ({
    text,
    authorName,
    className,
    size = 'icon',
    variant = 'outline'
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const speak = async () => {
        if (!text) return;

        // Check if browser supports speech synthesis
        if (!('speechSynthesis' in window)) {
            alert('আপনার ব্রাউজার টেক্সট-টু-স্পিচ সাপোর্ট করে না।');
            return;
        }

        // Stop any ongoing speech
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);

        try {
            const utterance = new SpeechSynthesisUtterance();

            // Prepare text with author name if provided
            const textToSpeak = authorName ? `${authorName} বলেছেন: ${text}` : text;
            utterance.text = textToSpeak;

            // Set language to Bengali
            utterance.lang = 'bn-BD';

            // Set voice properties
            utterance.rate = 0.8; // Slower speech rate for better comprehension
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            // Event handlers
            utterance.onstart = () => {
                setIsLoading(false);
                setIsPlaying(true);
            };

            utterance.onend = () => {
                setIsPlaying(false);
            };

            utterance.onerror = (event) => {
                console.error('TTS Error:', event);
                setIsPlaying(false);
                setIsLoading(false);
                alert('টেক্সট পড়তে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
            };

            // Check for Bengali voice
            const voices = speechSynthesis.getVoices();
            const bengaliVoice = voices.find(voice =>
                voice.lang.includes('bn') || voice.lang.includes('hi')
            );

            if (bengaliVoice) {
                utterance.voice = bengaliVoice;
            }

            // Start speaking
            speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('TTS Error:', error);
            setIsLoading(false);
            setIsPlaying(false);
            alert('টেক্সট পড়তে সমস্যা হয়েছে।');
        }
    };

    const getIcon = () => {
        if (isLoading) {
            return <Loader2 className="h-4 w-4 animate-spin" />;
        }
        return isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />;
    };

    const getTooltip = () => {
        if (isLoading) return 'প্রস্তুত হচ্ছে...';
        return isPlaying ? 'বন্ধ করুন' : 'শুনুন';
    };

    return (
        <Button
            onClick={speak}
            disabled={isLoading}
            size={size}
            variant={variant}
            className={cn(
                'transition-all duration-200 hover:scale-105',
                isPlaying && 'text-green-600 bg-green-50 border-green-200',
                className
            )}
            title={getTooltip()}
        >
            {getIcon()}
            {size !== 'icon' && (
                <span className="ml-2">
                    {isLoading ? 'প্রস্তুত...' : isPlaying ? 'বন্ধ করুন' : 'শুনুন'}
                </span>
            )}
        </Button>
    );
};
