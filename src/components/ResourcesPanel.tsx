
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, BookOpen, Users, Brain, Heart } from "lucide-react";

interface ResourcesPanelProps {
  onBack: () => void;
}

const ResourcesPanel = ({ onBack }: ResourcesPanelProps) => {
  const resources = [
    {
      category: "Professional Help",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      items: [
        {
          title: "Psychology Today",
          description: "Find therapists and counselors in your area",
          url: "https://www.psychologytoday.com/us/therapists",
          type: "Directory"
        },
        {
          title: "BetterHelp",
          description: "Online therapy and counseling services",
          url: "https://www.betterhelp.com",
          type: "Online Therapy"
        },
        {
          title: "Talkspace",
          description: "Text-based therapy and psychiatric services",
          url: "https://www.talkspace.com",
          type: "Online Therapy"
        }
      ]
    },
    {
      category: "Crisis Support",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      items: [
        {
          title: "988 Suicide & Crisis Lifeline",
          description: "24/7 free and confidential support",
          url: "tel:988",
          type: "Hotline"
        },
        {
          title: "Crisis Text Line",
          description: "Text HOME to 741741 for 24/7 crisis support",
          url: "sms:741741",
          type: "Text Support"
        },
        {
          title: "SAMHSA National Helpline",
          description: "1-800-662-4357 - Treatment referral service",
          url: "tel:1-800-662-4357",
          type: "Hotline"
        }
      ]
    },
    {
      category: "Mental Health Education",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      items: [
        {
          title: "National Institute of Mental Health",
          description: "Comprehensive mental health information",
          url: "https://www.nimh.nih.gov",
          type: "Educational"
        },
        {
          title: "Mental Health America",
          description: "Resources, screening tools, and advocacy",
          url: "https://mhanational.org",
          type: "Educational"
        },
        {
          title: "Anxiety and Depression Association",
          description: "Evidence-based information and resources",
          url: "https://adaa.org",
          type: "Educational"
        }
      ]
    },
    {
      category: "Support Communities",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
      items: [
        {
          title: "7 Cups",
          description: "Free emotional support and active listening",
          url: "https://www.7cups.com",
          type: "Peer Support"
        },
        {
          title: "NAMI Support Groups",
          description: "Local and online support group meetings",
          url: "https://www.nami.org/Support-Education/Support-Groups",
          type: "Support Groups"
        },
        {
          title: "Reddit Mental Health",
          description: "Anonymous peer support communities",
          url: "https://www.reddit.com/r/mentalhealth",
          type: "Online Community"
        }
      ]
    }
  ];

  const copingStrategies = [
    {
      title: "Deep Breathing",
      description: "4-7-8 breathing technique for anxiety relief"
    },
    {
      title: "Grounding Technique",
      description: "5-4-3-2-1 method: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste"
    },
    {
      title: "Mindful Walking",
      description: "Focus on each step and your surroundings to stay present"
    },
    {
      title: "Journaling",
      description: "Write down thoughts and feelings to process emotions"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and release muscle groups to reduce physical tension"
    }
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
        <h1 className="text-2xl font-bold text-gray-800">Mental Health Resources</h1>
      </div>

      <div className="grid gap-6">
        {resources.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${category.bgColor}`}>
                    <Icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {item.type}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(item.url, '_blank')}
                        className="ml-4"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-100">
                <Brain className="h-5 w-5 text-orange-600" />
              </div>
              Quick Coping Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {copingStrategies.map((strategy, index) => (
                <div key={index} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">{strategy.title}</h4>
                  <p className="text-orange-700 text-sm">{strategy.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-800 mb-3">Important Reminder</h3>
          <p className="text-blue-700 text-sm">
            While AI support can be helpful, it's not a replacement for professional mental health care. 
            If you're experiencing persistent mental health challenges, please consider reaching out to 
            a qualified mental health professional who can provide personalized care and treatment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPanel;
