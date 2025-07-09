
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  userName: string;
  onBack: () => void;
}

const ChatInterface = ({ userName, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${userName}! I'm here to listen and support you. This is a safe space where you can share whatever is on your mind. How are you feeling today?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis keywords
    if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || 
        lowerMessage.includes('end it all') || lowerMessage.includes('hurt myself')) {
      return "I'm really concerned about what you're going through right now. Your life has value, and there are people who want to help. Please consider reaching out to a crisis helpline immediately - they have trained counselors available 24/7. Would you like me to provide some crisis support numbers?";
    }

    // Anxiety responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || 
        lowerMessage.includes('panic') || lowerMessage.includes('worried')) {
      return "I hear that you're feeling anxious, and that can be really overwhelming. Anxiety is very common and treatable. Try taking some slow, deep breaths - in for 4 counts, hold for 4, out for 4. What specific thoughts or situations are contributing to your anxiety right now?";
    }

    // Depression responses
    if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || 
        lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
      return "Thank you for sharing something so personal with me. Depression can make everything feel heavy and difficult. Remember that what you're feeling is valid, and it's not your fault. Small steps can make a difference - have you been able to do any activities that usually bring you comfort?";
    }

    // Stress responses
    if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed') || 
        lowerMessage.includes('pressure')) {
      return "Stress can feel consuming, but you're taking a positive step by talking about it. Let's break things down - what's the biggest source of stress for you right now? Sometimes identifying specific stressors can help us find ways to manage them.";
    }

    // Loneliness responses
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || 
        lowerMessage.includes('isolated')) {
      return "Feeling lonely can be one of the hardest emotions to experience. You're not truly alone though - I'm here with you right now, and there are people who care. Have you been able to connect with any friends, family, or community groups recently?";
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || 
        lowerMessage.includes('tired')) {
      return "Sleep problems can really affect our mental health. Good sleep hygiene can help - try keeping a consistent bedtime, avoiding screens before bed, and creating a calming routine. How long have you been having trouble sleeping?";
    }

    // Positive responses
    if (lowerMessage.includes('better') || lowerMessage.includes('good') || 
        lowerMessage.includes('happy') || lowerMessage.includes('great')) {
      return "I'm so glad to hear you're feeling better! It's wonderful when we have those moments of lightness. What do you think has been helping you feel this way? It's good to recognize and celebrate these positive moments.";
    }

    // Default supportive responses
    const supportiveResponses = [
      "Thank you for sharing that with me. It takes courage to open up about how you're feeling. Can you tell me more about what's been on your mind?",
      "I'm here to listen without judgment. What you're experiencing matters, and your feelings are valid. What would be most helpful for you to talk about right now?",
      "It sounds like you're going through something difficult. Remember that it's okay to not be okay, and seeking support is a sign of strength. How can I best support you today?",
      "I appreciate you trusting me with your thoughts. Mental health struggles are more common than you might think, and you don't have to face this alone. What's been the most challenging part for you lately?"
    ];

    return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="h-screen flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-blue-600" />
              <CardTitle>AI Companion Chat</CardTitle>
            </div>
          </div>
          <p className="text-sm text-gray-600 ml-12">
            Safe, confidential support • Available 24/7
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                
                {message.isUser && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Share what's on your mind..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTyping}
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
