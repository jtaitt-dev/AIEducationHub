import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get access to ChatGPT?",
    answer: "Contact IT or the Catalog Team to request ChatGPT access. Once approved, you'll receive login credentials and onboarding instructions."
  },
  {
    question: "Can I use ChatGPT for ERP tasks?",
    answer: "Yes, ChatGPT can help with Dynamics 365, Salespad, and Monday.com tasks. However, never share login credentials or sensitive system information with ChatGPT."
  },
  {
    question: "Is my data secure when using ChatGPT?",
    answer: "Always remove sensitive information (customer details, order numbers, pricing) before using ChatGPT. Clear your chat history after completing tasks with business data."
  },
  {
    question: "What tasks can ChatGPT help with?",
    answer: "ChatGPT can assist with data cleaning, email drafting, Excel formulas, documentation summaries, and basic process automation. Always verify AI outputs before using them."
  }
];

export default function FAQ() {
  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
