import { Canvas } from "@/components/MindMap/Canvas";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { TodoList } from "@/components/TodoList";
import { DailyGoals } from "@/components/DailyGoals";
import { DailySchedule } from "@/components/DailySchedule";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowLeftRight, Moon, Sun } from "lucide-react";

const Index = () => {
  const [showMindMap, setShowMindMap] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <main className="flex-1 relative p-4">
          <div className="fixed top-4 right-4 z-10 flex gap-2">
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
              <div className="lg:col-span-2 h-[600px]">
                <ChatWindow />
              </div>
              <div className="space-y-4">
                <TodoList />
                <DailyGoals />
                <DailySchedule />
              </div>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;