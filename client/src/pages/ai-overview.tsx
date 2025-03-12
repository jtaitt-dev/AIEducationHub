import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIOverview() {
  return (
    <div className="container py-8 space-y-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to AI Learning Hub
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your comprehensive guide to leveraging AI tools at Neta Scientific
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>What is ChatGPT?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              ChatGPT is your AI-powered assistant designed to help with automation, 
              data analysis, pricing validation, content requests, and more.
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>How Can It Help You?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>💡 Automate repetitive tasks</li>
              <li>📊 Speed up data validation & reporting</li>
              <li>✉️ Draft professional emails & SOPs</li>
              <li>📋 Answer ERP & CRM questions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
