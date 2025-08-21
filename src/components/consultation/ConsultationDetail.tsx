import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, User, Send } from "lucide-react";

interface ConsultationDetailProps {
    consultation: {
        id: number;
        farmer: string;
        crop: string;
        issue: string;
        priority: string;
        time: string;
        status: string;
        location?: string;
        description?: string;
        images?: string[];
    };
    onBack: () => void;
}

export const ConsultationDetail = ({ consultation, onBack }: ConsultationDetailProps) => {
    const [response, setResponse] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setResponse("");
        onBack();
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={onBack}>
                    ← ফিরে যান
                </Button>
                <h2 className="text-xl font-semibold">পরামর্শ বিস্তারিত</h2>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg">{consultation.farmer}</CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {consultation.time}
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline">{consultation.crop}</Badge>
                            <Badge className={getPriorityColor(consultation.priority)}>
                                {consultation.priority === 'high' ? 'জরুরি' :
                                    consultation.priority === 'medium' ? 'মাঝারি' : 'সাধারণ'}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">সমস্যার বিবরণ:</h3>
                        <p className="text-muted-foreground">
                            {consultation.description || consultation.issue}
                        </p>
                    </div>

                    {consultation.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {consultation.location}
                        </div>
                    )}

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-3">আপনার পরামর্শ লিখুন:</h3>
                        <Textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="কৃষকের সমস্যার সমাধান ও পরামর্শ লিখুন..."
                            className="min-h-[120px]"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onBack}>
                            বাতিল
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!response.trim() || isSubmitting}
                        >
                            <Send className="h-4 w-4 mr-2" />
                            {isSubmitting ? 'পাঠানো হচ্ছে...' : 'পরামর্শ পাঠান'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
