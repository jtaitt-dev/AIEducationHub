import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roleExamples = {
  sales: [
    "Generate personalized follow-up email templates for customer inquiries",
    "Analyze sales data trends and create summary reports",
    "Draft professional responses to customer feedback",
    "Create product comparison sheets for customers"
  ],
  marketing: [
    "Create engaging product descriptions for the catalog",
    "Generate social media content for new product launches",
    "Summarize market research findings into actionable points",
    "Draft newsletter content highlighting new offerings"
  ],
  operations: [
    "Optimize inventory reports with Excel formula assistance",
    "Streamline shipping documentation workflows",
    "Create efficient process documentation templates",
    "Automate data cleaning procedures"
  ],
  hr: [
    "Draft clear job descriptions from role requirements",
    "Create comprehensive training materials",
    "Generate onboarding checklists and documentation",
    "Write professional performance review templates"
  ],
  "customer-service": [
    "Draft clear, empathetic responses to customer inquiries",
    "Summarize lengthy customer feedback quickly for internal teams",
    "Generate FAQs or troubleshooting steps for common customer issues",
    "Create response templates for different customer scenarios"
  ]
};

export default function ScenariosSection() {
  return (
    <section id="scenarios" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Real-world Scenarios</h2>
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full sm:grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="customer-service">Customer Service</TabsTrigger>
        </TabsList>
        {Object.entries(roleExamples).map(([role, examples]) => (
          <TabsContent key={role} value={role}>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 capitalize">
                  {role.replace("-", " ")} Role Examples
                </h3>
                <ul className="space-y-4">
                  {examples.map((example, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}