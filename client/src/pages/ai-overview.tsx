import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIBackground } from "@/components/AIBackground";
import { Quiz } from "@/components/quiz";
import FAQ from "@/components/faq"; // Changed from named import to default import

export default function AIOverview() {
  return (
    <>
      <AIBackground />
      <div className="container py-8 space-y-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Welcome to AI Learning Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your comprehensive guide to leveraging AI tools for enhanced productivity and innovation
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="transition-all duration-300 hover:shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">What is ChatGPT?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                ChatGPT is your AI-powered assistant designed to help with automation, 
                data analysis, pricing validation, content requests, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">How Can It Help You?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Automate repetitive tasks</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Speed up data validation & reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Draft professional emails & SOPs</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Answer ERP & CRM questions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quiz Section */}
        <motion.section 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Test Your AI Knowledge</h2>
          <Quiz />
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FAQ />
        </motion.section>
      </div>
    </>
  );
}