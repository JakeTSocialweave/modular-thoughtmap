import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  timeframe: "day" | "week" | "month";
  dueDate?: Date;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeTimeframe, setActiveTimeframe] = useState<"day" | "week" | "month">("day");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      timeframe: activeTimeframe,
      dueDate: selectedDate,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
    setSelectedDate(undefined);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="bg-background/95 dark:bg-[#1A1F2C] rounded-lg shadow-md h-[400px]">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold">Tasks</h2>
      </div>

      <Tabs 
        defaultValue="day" 
        className="w-full"
        onValueChange={(value) => setActiveTimeframe(value as "day" | "week" | "month")}
      >
        <TabsList className="w-full dark:bg-gray-800">
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
                    <div key={todo.id} className="flex items-center gap-2 dark:bg-gray-800/50 p-2 rounded">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                      />
                      <div className="flex flex-col flex-1">
                        <span className={todo.completed ? "line-through" : ""}>
                          {todo.text}
                        </span>
                        {todo.dueDate && (
                          <span className="text-xs text-gray-500">
                            Due: {format(todo.dueDate, 'PPP')}
                          </span>
                        )}
                      </div>
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
            className="flex-1 dark:bg-gray-800 dark:border-gray-700"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
      </Tabs>
    </div>
  );
};