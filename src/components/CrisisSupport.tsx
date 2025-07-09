
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, MessageSquare, Globe, AlertTriangle } from "lucide-react";

interface CrisisSupportProps {
  onBack: () => void;
}

const CrisisSupport = ({ onBack }: CrisisSupportProps) => {
  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      number: "988",
      description: "24/7 free and confidential support for people in distress",
      type: "call",
      available: "Available 24/7",
      languages: "English & Spanish"
    },
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to connect with a crisis counselor",
      type: "text",
      available: "Available 24/7",
      languages: "English"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      type: "call",
      available: "Available 24/7",
      languages: "English & Spanish"
    },
    {
      name: "Trans Lifeline",
      number: "877-565-8860",
      description: "Crisis support for transgender individuals",
      type: "call",
      available: "Available 24/7",
      languages: "English"
    },
    {
      name: "LGBT National Hotline",
      number: "1-888-843-4564",
      description: "Support for LGBTQ+ individuals and families",
      type: "call",
      available: "Mon-Fri 4pm-12am, Sat 12pm-5pm (EST)",
      languages: "English"
    }
  ];

  const internationalResources = [
    { country: "Canada", number: "833-456-4566", name: "Talk Suicide Canada" },
    { country: "UK", number: "116 123", name: "Samaritans" },
    { country: "Australia", number: "13 11 14", name: "Lifeline Australia" },
    { country: "International", number: "Visit iasp.info", name: "International Directory" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Crisis Support</h1>
      </div>

      <Card className="bg-red-50 border-red-200 border-2">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <h2 className="text-xl font-bold text-red-800">Need Immediate Help?</h2>
              <p className="text-red-700">If you're in immediate danger, call emergency services</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.location.href = 'tel:911'}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 911 (Emergency)
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = 'tel:988'}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 988 (Crisis Line)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>24/7 Crisis Support Lines</CardTitle>
          <p className="text-gray-600">Free, confidential support available anytime</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{resource.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>• {resource.available}</span>
                      <span>• {resource.languages}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {resource.type === 'call' ? (
                      <Button 
                        onClick={() => window.location.href = `tel:${resource.number}`}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => window.location.href = `sms:${resource.number}`}
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Text
                      </Button>
                    )}
                  </div>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
                  {resource.number}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            International Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {internationalResources.map((resource, index) => (
              <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <div>
                  <span className="font-medium text-gray-800">{resource.country}</span>
                  <p className="text-sm text-gray-600">{resource.name}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-gray-700">{resource.number}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-800 mb-3">You Are Not Alone</h3>
          <div className="space-y-2 text-blue-700 text-sm">
            <p>• Crisis counselors are trained to help and want to support you</p>
            <p>• All crisis support services are completely confidential</p>
            <p>• It's okay to call even if you're not sure it's an "emergency"</p>
            <p>• You deserve support and care, regardless of your situation</p>
            <p>• Mental health crises are temporary - help is available to get through this</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What to Expect When You Call</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">1</span>
              </div>
              <p>A trained crisis counselor will answer and listen to your situation</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">2</span>
              </div>
              <p>They'll help you process your feelings and develop a safety plan</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">3</span>
              </div>
              <p>If needed, they can connect you with local mental health resources</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrisisSupport;
