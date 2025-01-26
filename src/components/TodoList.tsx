import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Plus } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  timeframe: "day" | "week" | "month";
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeTimeframe, setActiveTimeframe] = useState<"day" | "week" | "month">("day");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      timeframe: activeTimeframe,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Tasks</h2>
      </div>

      <Tabs defaultValue="day" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="day" className="flex-1">Day</TabsTrigger>
          <TabsTrigger value="week" className="flex-1">Week</TabsTrigger>
          <TabsTrigger value="month" className="flex-1">Month</TabsTrigger>
        </TabsList>

        {["day", "week", "month"].map((timeframe) => (
          <TabsContent key={timeframe} value={timeframe}>
            <ScrollArea className="h-[200px] p-4">
              <div className="space-y-2">
                {todos
                  .filter((todo) => todo.timeframe === timeframe)
                  .map((todo) => (
                    <div key={todo.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                      />
                      <span className={todo.completed ? "line-through" : ""}>
                        {todo.text}
                      </span>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}

        <form onSubmit={handleAddTodo} className="p-4 flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new task..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
      </Tabs>
    </div>
  );
};