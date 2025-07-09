
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, MessageCircle, BookOpen, Phone, Smile, Meh, Frown, AlertCircle } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import ResourcesPanel from "@/components/ResourcesPanel";
import CrisisSupport from "@/components/CrisisSupport";
import MoodTracker from "@/components/MoodTracker";

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'resources' | 'crisis'>('dashboard');
  const [userName, setUserName] = useState('');
  const [hasSetName, setHasSetName] = useState(false);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setHasSetName(true);
  };

  if (!hasSetName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-gray-800">Welcome to MindfulChat</CardTitle>
            <p className="text-gray-600 mt-2">
              A safe space for your mental wellness journey. What would you like us to call you?
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const name = formData.get('name') as string;
              if (name.trim()) handleNameSubmit(name.trim());
            }}>
              <input
                name="name"
                type="text"
                placeholder="Enter your name or nickname"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Continue
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Your privacy is important to us. This information stays on your device.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <ChatInterface userName={userName} onBack={() => setCurrentView('dashboard')} />;
      case 'resources':
        return <ResourcesPanel onBack={() => setCurrentView('dashboard')} />;
      case 'crisis':
        return <CrisisSupport onBack={() => setCurrentView('dashboard')} />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Hello, {userName} 👋
              </h1>
              <p className="text-gray-600">How are you feeling today?</p>
            </div>

            <MoodTracker />

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('chat')}>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Talk to AI Companion</h3>
                  <p className="text-gray-600 text-sm">
                    Have a supportive conversation with our AI companion trained in mental wellness
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('resources')}>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Mental Health Resources</h3>
                  <p className="text-gray-600 text-sm">
                    Find professional help, articles, and coping strategies
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-800">Need Immediate Help?</h3>
                </div>
                <p className="text-red-700 mb-4">
                  If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for immediate support.
                </p>
                <Button 
                  onClick={() => setCurrentView('crisis')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Crisis Support
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {renderView()}
      </div>
    </div>
  );
};

export default Index;
