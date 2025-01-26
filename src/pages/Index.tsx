import { Canvas } from "@/components/MindMap/Canvas";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { TodoList } from "@/components/TodoList";
import { DailyGoals } from "@/components/DailyGoals";
import { DailySchedule } from "@/components/DailySchedule";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { ArrowLeftRight, Moon, Sun, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [showMindMap, setShowMindMap] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [visibleModules, setVisibleModules] = useState({
    goals: false,
    schedule: false,
  });

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    console.log("Theme toggled to:", newTheme);
  };

  const toggleModule = (module: keyof typeof visibleModules) => {
    setVisibleModules(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <main className="flex-1 relative p-4">
          <div className="fixed top-4 right-4 z-10 flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="fixed top-4 left-4">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => toggleModule('goals')}>
                  Daily Goals
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleModule('schedule')}>
                  Daily Schedule & Habits
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="bg-background"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button onClick={() => setShowMindMap(!showMindMap)}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              {showMindMap ? "Show Overview" : "Show Mind Map"}
            </Button>
          </div>

          {showMindMap ? (
            <Canvas />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-2rem)]">
              <div className="lg:col-span-2 space-y-4">
                <ChatWindow />
                <div className="bg-white dark:bg-[#1A1F2C] rounded-lg shadow-md p-4">
                  <Calendar className="rounded-md border" />
                </div>
              </div>
              <div className="space-y-4">
                <TodoList />
                {visibleModules.goals && <DailyGoals />}
                {visibleModules.schedule && <DailySchedule />}
              </div>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;