import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, Clock, FileCheck } from "lucide-react";
import { Link } from "wouter";

export default function AIOverview() {
  return (
    <div className="container py-8 space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="hero-gradient absolute inset-0 rounded-3xl" />
        <div className="relative max-w-4xl mx-auto text-center py-16 px-4">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Unlock the Power of AI at Neta Scientific
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Boost productivity, automate tasks, and streamline workflows with ChatGPT
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link href="/lunch-and-learn">
                Try ChatGPT Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What is ChatGPT Section */}
      <section className="max-w-4xl mx-auto">
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">What is ChatGPT?</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              ChatGPT is your AI-powered assistant designed to help with automation, 
              data analysis, pricing validation, content requests, and more.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How Can It Help You Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="card-hover h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Automate Tasks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Generate Python, VBA, or SQL scripts</li>
                <li>Automate data cleaning and validation</li>
                <li>Create workflow automation solutions</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="card-hover h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Save Time</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Draft professional emails & SOPs quickly</li>
                <li>Speed up data validation & reporting</li>
                <li>Get instant answers to ERP & CRM questions</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="card-hover h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Improve Quality</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Cross-check pricing and specifications</li>
                <li>Ensure consistent documentation</li>
                <li>Validate data accuracy</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-2xl mx-auto text-center">
        <Card className="bg-primary/5">
          <CardContent className="py-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join our Lunch & Learn session to discover how ChatGPT can transform your daily workflow.
            </p>
            <Button size="lg" asChild>
              <Link href="/lunch-and-learn">
                View Learning Resources
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}