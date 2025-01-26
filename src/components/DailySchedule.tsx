import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";

interface HabitTracking {
  name: string;
  completed: boolean;
  time: string;
}

const habits: HabitTracking[] = [
  { name: "Morning Meditation", completed: false, time: "06:00" },
  { name: "Exercise", completed: false, time: "07:00" },
  { name: "Reading", completed: false, time: "20:00" },
  { name: "Journal", completed: false, time: "21:00" },
];

export const DailySchedule = () => {
  return (
    <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Daily Schedule & Habits</h2>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="p-4 space-y-4">
          {habits.map((habit, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{habit.name}</h3>
                  <p className="text-sm text-gray-500">{habit.time}</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-secondary border-2 border-primary" />
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};