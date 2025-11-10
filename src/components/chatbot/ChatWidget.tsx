import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  "how to book": "To book a room: 1) Go to the Search page, 2) Select your dates and number of guests, 3) Choose a room type, 4) Click 'Book Now', 5) Fill in your details and confirm. An admin will review and approve your booking.",
  "room prices": "Our room prices are: Single Room - R750/night, Double Room - R1200/night, Family Room - R2400/night, Event Space - R2000/night. All prices are subject to availability.",
  "cancel booking": "To cancel a booking, please visit your Bookings page and view your booking details. For cancellations, you can contact our support team at developmentteam86@gmail.com or call us during business hours.",
  "contact support": "You can reach our support team at: Email: developmentteam86@gmail.com. We'll respond within 24 hours. For urgent matters, please call us during business hours.",
  "payment": "Payment details will be sent to your email after your booking is approved by our admin team. We accept various payment methods including bank transfers and credit cards.",
  "check-in": "Check-in time is typically 2:00 PM and check-out is 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability.",
  "amenities": "All our rooms include: Free WiFi, Eco-friendly toiletries, Air conditioning, Room service, and access to our sustainable facilities. Family rooms have additional amenities for children.",
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! 👋 I'm here to help with your booking questions. Try asking about:\n• How to book a room\n• Room prices\n• Cancellation policy\n• Contact support",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Fallback response
    return "I'm here to help! I can answer questions about:\n• Booking a room\n• Room prices\n• Cancellation policy\n• Payment methods\n• Check-in/Check-out times\n• Room amenities\n• Contact support\n\nPlease try asking about any of these topics!";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      text: getResponse(inputValue),
      isBot: true,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, botResponse]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-4 rounded-full w-14 h-14 shadow-lg z-40 bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-4 w-80 md:w-96 bg-card border border-border rounded-lg shadow-xl z-40 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Zulu Lami Support</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary/80"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isBot
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
