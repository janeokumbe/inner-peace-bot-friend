
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Heart, Sun, Cloud, CloudRain } from "lucide-react";

interface MoodEntry {
  mood: number;
  date: string;
  note?: string;
}

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showNote, setShowNote] = useState(false);
  const [moodNote, setMoodNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      setMoodHistory(JSON.parse(saved));
    }
  }, []);

  const saveMood = () => {
    if (currentMood === null) return;
    
    const newEntry: MoodEntry = {
      mood: currentMood,
      date: new Date().toISOString().split('T')[0],
      note: moodNote.trim() || undefined
    };

    const updatedHistory = [newEntry, ...moodHistory.slice(0, 6)];
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    
    setShowNote(false);
    setMoodNote("");
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Sun className="h-6 w-6 text-yellow-500" />;
    if (mood >= 3) return <Smile className="h-6 w-6 text-green-500" />;
    if (mood >= 2) return <Meh className="h-6 w-6 text-orange-500" />;
    return <CloudRain className="h-6 w-6 text-blue-500" />;
  };

  const getMoodText = (mood: number) => {
    if (mood >= 4) return "Great";
    if (mood >= 3) return "Good";
    if (mood >= 2) return "Okay";
    return "Struggling";
  };

  const moodOptions = [
    { value: 1, label: "Struggling", icon: Frown, color: "text-red-500", bg: "bg-red-100" },
    { value: 2, label: "Not Great", icon: CloudRain, color: "text-blue-500", bg: "bg-blue-100" },
    { value: 3, label: "Okay", icon: Meh, color: "text-orange-500", bg: "bg-orange-100" },
    { value: 4, label: "Good", icon: Smile, color: "text-green-500", bg: "bg-green-100" },
    { value: 5, label: "Great", icon: Sun, color: "text-yellow-500", bg: "bg-yellow-100" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-500" />
          Mood Check-in
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showNote ? (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">How are you feeling right now?</p>
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.value}
                    variant={currentMood === option.value ? "default" : "outline"}
                    className={`flex flex-col p-4 h-auto ${
                      currentMood === option.value 
                        ? `${option.bg} ${option.color}` 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentMood(option.value)}
                  >
                    <Icon className={`h-6 w-6 mb-1 ${option.color}`} />
                    <span className="text-xs">{option.label}</span>
                  </Button>
                );
              })}
            </div>
            
            {currentMood && (
              <div className="mt-4 space-y-2">
                <Button 
                  onClick={() => setShowNote(true)}
                  variant="outline" 
                  className="w-full"
                >
                  Add a note (optional)
                </Button>
                <Button 
                  onClick={saveMood}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Save Mood
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">What's on your mind? (Optional)</p>
            <textarea
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="Share what's contributing to how you're feeling..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                onClick={saveMood}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Save Mood
              </Button>
              <Button 
                onClick={() => setShowNote(false)}
                variant="outline"
                className="flex-1"
              >
                Skip Note
              </Button>
            </div>
          </div>
        )}

        {moodHistory.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h4 className="font-medium text-gray-800 mb-3">Recent Mood History</h4>
            <div className="grid grid-cols-7 gap-2">
              {moodHistory.slice(0, 7).map((entry, index) => (
                <div 
                  key={entry.date} 
                  className="text-center p-2 rounded-lg bg-gray-50"
                  title={`${entry.date}: ${getMoodText(entry.mood)}${entry.note ? ` - ${entry.note}` : ''}`}
                >
                  {getMoodIcon(entry.mood)}
                  <div className="text-xs text-gray-600 mt-1">
                    {index === 0 ? 'Today' : `${index}d ago`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
