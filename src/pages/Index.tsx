import { Canvas } from "@/components/MindMap/Canvas";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <main className="flex-1 relative">
          <Canvas />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;