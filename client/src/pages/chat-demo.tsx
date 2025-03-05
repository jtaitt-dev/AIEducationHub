import { ChatSimulator } from "@/components/chat-simulator";

export default function ChatDemo() {
  return (
    <div className="container py-8 space-y-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Interactive ChatGPT Demo</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Experience how ChatGPT works with this interactive demo. Try asking
          questions or giving it tasks to complete.
        </p>
      </div>
      <ChatSimulator />
    </div>
  );
}
