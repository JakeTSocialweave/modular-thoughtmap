import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Plus, X } from "lucide-react";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export const DailyGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState("");

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;

    const goal: Goal = {
      id: Date.now().toString(),
      text: newGoal,
      completed: false,
    };

    setGoals([...goals, goal]);
    setNewGoal("");
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Daily Goals</h2>
      </div>

      <ScrollArea className="h-[200px] p-4">
        <div className="space-y-2">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-center justify-between gap-2 bg-secondary p-2 rounded">
              <span>{goal.text}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeGoal(goal.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleAddGoal} className="p-4 flex gap-2">
        <Input
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add new goal..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};