"use client";

import { useChat } from "@ai-sdk/react";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
// import {
//   AIConversation,
//   AIConversationContent,
//   AIConversationScrollButton,
// } from "@/components/ui/kibo-ui/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
  AIMessageAvatar,
} from "@/components/ui/kibo-ui/ai/message";
import {
  AIInput,
  AIInputTextarea,
  AIInputSubmit,
} from "@/components/ui/kibo-ui/ai/input";
import { AIResponse } from "@/components/ui/kibo-ui/ai/response";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [currentTool, setCurrentTool] = useState<string | null>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
      onError: (error) => {
        console.error("Chat error:", error);
        setCurrentTool(null);
      },
      onFinish: (message) => {
        console.log("Chat finished:", message);
        setCurrentTool(null);
      },
      onToolCall: ({ toolCall }) => {
        console.log("Tool being used:", toolCall.toolName);
        setCurrentTool(toolCall.toolName);
      },
    });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Fix mobile viewport and touch issues
  useEffect(() => {
    if (isOpen) {
      // Only prevent body scroll on mobile, not desktop
      if (isMobile) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
      }

      // Force layout recalculation
      if (dialogRef.current) {
        dialogRef.current.style.height = isMobile
          ? window.innerHeight + "px"
          : "calc(100vh - 2rem)";
      }

      // Handle orientation change
      const handleResize = () => {
        if (dialogRef.current && isMobile) {
          dialogRef.current.style.height = window.innerHeight + "px";
        }
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("orientationchange", handleResize);

      return () => {
        if (isMobile) {
          document.body.style.overflow = "";
          document.body.style.position = "";
          document.body.style.width = "";
          document.body.style.height = "";
        }
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleResize);
      };
    }
  }, [isOpen, isMobile]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setCurrentTool(null); // Reset tool status when starting new request
    await handleSubmit(e);
  };

  // Send message on press enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      onSubmit(e as React.FormEvent);
    }
  };

  // Get the appropriate loading text based on current tool usage
  const getLoadingText = () => {
    if (currentTool) {
      const toolDisplayNames: { [key: string]: string } = {
        search_knowledge_base: "Searching...",
        send_mail: "Sending email...",
      };
      return toolDisplayNames[currentTool] || `Using ${currentTool}...`;
    }
    return "Typing...";
  };

  // Filter out tool call messages and empty messages to prevent duplicates
  const filteredMessages = messages.filter((message) => {
    // Keep user messages
    if (message.role === "user") return true;

    // For assistant messages, only keep non-empty text messages
    if (message.role === "assistant") {
      return message.parts.some(
        (part) => part.type === "text" && part.text.trim().length > 0
      );
    }

    return true;
  });

  return (
    <>
      {/* Floating Chat Icon */}
      <Button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-foreground hover:bg-foreground"
        style={{ touchAction: "manipulation" }}
      >
        <Image
          src="/chat-bot.png"
          alt="Haseeb AI Assistant"
          width={200}
          height={200}
          priority
          className="h-10 w-10 object-contain"
        />
      </Button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          ref={dialogRef}
          className="fixed inset-0 md:right-4 md:bottom-4 md:top-4 md:left-auto w-full md:w-96 lg:min-w-[20vw] max-h-[900px] p-0 flex flex-col transform-none translate-x-0 translate-y-0 max-w-none rounded-none md:border md:rounded-xl shadow-none focus:outline-none"
          style={{
            height: isMobile ? "100vh" : "calc(100vh-2rem)",
            minHeight: isMobile ? "100vh" : "calc(100vh-2rem)",
            maxHeight: isMobile ? "100vh" : "calc(100vh-2rem)",
            touchAction: "manipulation",
          }}
        >
          {/* Header */}
          <div className="bg-background border-b px-3 py-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-foreground w-10 h-10 rounded-full flex items-center justify-center">
                  <Image
                    src="/chat-bot.png"
                    alt="Haseeb AI Assistant"
                    width={200}
                    height={200}
                    priority
                    className="rounded-full object-cover w-6 h-6"
                  />
                </div>
                <div>
                  <DialogTitle className="text-base font-semibold">
                    AI Assistant
                  </DialogTitle>
                  <p className="text-xs text-foreground/90">
                    Ask me anything about Haseeb
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
                style={{ touchAction: "manipulation" }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            data-lenis-prevent
            className="chatBot-scroll flex-1 overflow-y-auto"
          >
            <div className="p-4 space-y-4 min-h-full">
              {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                  {/* Welcome message can go here */}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMessages.map((message, messageIndex) => (
                    <AIMessage
                      key={message.id}
                      from={message.role as "user" | "assistant"}
                      className=""
                    >
                      {/* <AIMessageAvatar
                        src=""
                        name={message.role === "user" ? "Me" : "AI"}
                      /> */}
                      <AIMessageContent>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              // Check if this is the last assistant message and is loading
                              const isLastAssistantMessage =
                                message.role === "assistant" &&
                                messageIndex === filteredMessages.length - 1;

                              const shouldShowLoadingIndicator =
                                isLastAssistantMessage &&
                                isLoading &&
                                i === message.parts.length - 1;

                              return shouldShowLoadingIndicator ? (
                                <div
                                  key={`${message.id}-${i}`}
                                  className="flex items-center gap-2"
                                >
                                  <div className="flex space-x-1">
                                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {getLoadingText()}
                                  </span>
                                </div>
                              ) : (
                                <AIResponse key={`${message.id}-${i}`}>
                                  {part.text}
                                </AIResponse>
                              );
                            default:
                              return null;
                          }
                        })}
                      </AIMessageContent>
                    </AIMessage>
                  ))}
                </div>
              )}

              {/* Show loading only if no messages or if the last message isn't from assistant */}
              {isLoading &&
                (filteredMessages.length === 0 ||
                  filteredMessages[filteredMessages.length - 1]?.role !==
                    "assistant") && (
                  <AIMessage from="assistant">
                    {/* <AIMessageAvatar src="" name="AI" /> */}
                    <AIMessageContent>
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="h-[1px] w-[1px] bg-muted-foreground rounded-full animate-bounce" />
                          <div className="h-[1px] w-[1px] bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                          <div className="h-[1px] w-[1px] bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {getLoadingText()}
                        </span>
                      </div>
                    </AIMessageContent>
                  </AIMessage>
                )}

              {/* Error Message */}
              {error && (
                <AIMessage from="assistant">
                  <AIMessageAvatar src="" name="AI" />
                  <AIMessageContent className="bg-destructive/10 border-destructive/20">
                    <p className="text-sm text-destructive">
                      Error: {error.message || "Something went wrong"}
                    </p>
                  </AIMessageContent>
                </AIMessage>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <div
            className="bg-background border-t rounded-t p-1 flex-shrink-0"
            style={{ touchAction: "manipulation" }}
          >
            <AIInput onSubmit={onSubmit} className="">
              <AIInputTextarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                style={{ touchAction: "manipulation" }}
              />
              <div className="p-2 w-full flex justify-end">
                <AIInputSubmit
                  status={isLoading ? "submitted" : "ready"}
                  disabled={isLoading || !input.trim()}
                  style={{ touchAction: "manipulation" }}
                />
              </div>
            </AIInput>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
