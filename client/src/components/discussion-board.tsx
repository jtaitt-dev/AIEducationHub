import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { DiscussionPost } from "@shared/schema";

export function DiscussionBoard() {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const { toast } = useToast();

  const { data: posts = [] } = useQuery<DiscussionPost[]>({
    queryKey: ["/api/discussion"],
  });

  const mutation = useMutation({
    mutationFn: async (post: { content: string; author: string }) => {
      await apiRequest("POST", "/api/discussion", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/discussion"] });
      setContent("");
      setAuthor("");
      toast({
        title: "Post added successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error adding post",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;
    mutation.mutate({ content, author });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Discussion Board</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            required
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            required
          />
          <Button type="submit" disabled={mutation.isPending}>
            Post Comment
          </Button>
        </form>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-muted-foreground mb-2">
                  {new Date(post.timestamp).toLocaleDateString()}
                </div>
                <p>{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}