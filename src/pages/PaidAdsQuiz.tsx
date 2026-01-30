import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { FAQSchema } from "@/components/seo/SchemaMarkup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255);

interface QuizQuestion {
  id: string;
  question: string;
  type: "single" | "multi" | "budget";
  options: {
    value: string;
    label: string;
    score: number;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: "industry",
    question: "What industry is your business in?",
    type: "single",
    options: [
      { value: "hospitality", label: "Restaurants / Hospitality", score: 3 },
      { value: "hotels", label: "Hotels / Accommodation", score: 3 },
      { value: "events", label: "Events / Festivals", score: 3 },
      { value: "tourism", label: "Tourism / Attractions", score: 3 },
      { value: "food-drink", label: "Food & Drink Brands", score: 2 },
      { value: "other", label: "Other", score: 1 },
    ],
  },
  {
    id: "locations",
    question: "How many physical locations do you have?",
    type: "single",
    options: [
      { value: "1", label: "Single location", score: 2 },
      { value: "2-5", label: "2-5 locations", score: 3 },
      { value: "6-20", label: "6-20 locations", score: 3 },
      { value: "20+", label: "20+ locations", score: 2 },
      { value: "online-only", label: "Online only (no physical presence)", score: 1 },
    ],
  },
  {
    id: "budget",
    question: "What's your expected monthly advertising budget?",
    type: "budget",
    options: [
      { value: "under-1k", label: "Under £1,000", score: 0 },
      { value: "1k-2k", label: "£1,000 - £2,000", score: 1 },
      { value: "2k-5k", label: "£2,000 - £5,000", score: 3 },
      { value: "5k-10k", label: "£5,000 - £10,000", score: 3 },
      { value: "10k+", label: "£10,000+", score: 3 },
    ],
  },
  {
    id: "goals",
    question: "What are your primary advertising goals?",
    type: "multi",
    options: [
      { value: "footfall", label: "Drive footfall to locations", score: 3 },
      { value: "bookings", label: "Increase bookings/reservations", score: 3 },
      { value: "awareness", label: "Build brand awareness", score: 2 },
      { value: "events", label: "Promote events or launches", score: 3 },
      { value: "ecommerce", label: "Online sales / e-commerce", score: 2 },
      { value: "leads", label: "Generate leads / enquiries", score: 2 },
    ],
  },
  {
    id: "experience",
    question: "What's your previous experience with paid advertising?",
    type: "single",
    options: [
      { value: "none", label: "Never run paid ads before", score: 2 },
      { value: "tried", label: "Tried it but didn't get results", score: 3 },
      { value: "running", label: "Currently running ads (managing ourselves)", score: 3 },
      { value: "agency", label: "Currently working with another agency", score: 2 },
    ],
  },
  {
    id: "tracking",
    question: "Do you have conversion tracking set up?",
    type: "single",
    options: [
      { value: "yes-full", label: "Yes, fully set up (pixel, conversions, etc.)", score: 3 },
      { value: "yes-basic", label: "Basic tracking only (Google Analytics)", score: 2 },
      { value: "no", label: "No tracking set up", score: 1 },
      { value: "unsure", label: "Not sure", score: 1 },
    ],
  },
  {
    id: "platforms",
    question: "Which platforms are you most interested in?",
    type: "multi",
    options: [
      { value: "meta", label: "Meta (Facebook & Instagram)", score: 3 },
      { value: "google", label: "Google (Search & Display)", score: 3 },
      { value: "tiktok", label: "TikTok", score: 2 },
      { value: "linkedin", label: "LinkedIn", score: 2 },
      { value: "youtube", label: "YouTube", score: 2 },
      { value: "unsure", label: "Not sure - need guidance", score: 2 },
    ],
  },
  {
    id: "timeline",
    question: "When are you looking to start?",
    type: "single",
    options: [
      { value: "asap", label: "As soon as possible", score: 3 },
      { value: "1-month", label: "Within the next month", score: 3 },
      { value: "1-3-months", label: "1-3 months", score: 2 },
      { value: "planning", label: "Just planning ahead", score: 1 },
    ],
  },
];

const faqs = [
  {
    question: "Why take this quiz?",
    answer: "This quiz helps us understand your business and advertising goals so we can give you relevant recommendations. It takes about 2 minutes to complete.",
  },
  {
    question: "What happens after I complete the quiz?",
    answer: "You'll receive an immediate assessment of your paid advertising readiness, plus personalised recommendations. Our team may follow up if there's a good fit.",
  },
];

type QuizAnswers = Record<string, string | string[]>;

const PaidAdsQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  const handleSingleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleMultiAnswer = (value: string, checked: boolean) => {
    setAnswers((prev) => {
      const current = (prev[currentQuestion.id] as string[]) || [];
      if (checked) {
        return { ...prev, [currentQuestion.id]: [...current, value] };
      }
      return { ...prev, [currentQuestion.id]: current.filter((v) => v !== value) };
    });
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "multi") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateScore = (): number => {
    let total = 0;
    let maxPossible = 0;

    questions.forEach((q) => {
      const answer = answers[q.id];
      const maxScore = Math.max(...q.options.map((o) => o.score));

      if (q.type === "multi" && Array.isArray(answer)) {
        answer.forEach((val) => {
          const option = q.options.find((o) => o.value === val);
          if (option) total += option.score;
        });
        maxPossible += maxScore * 2; // Allow for multiple selections
      } else if (typeof answer === "string") {
        const option = q.options.find((o) => o.value === answer);
        if (option) total += option.score;
        maxPossible += maxScore;
      }
    });

    return Math.round((total / maxPossible) * 100);
  };

  const handleSubmit = () => {
    setEmailError("");
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return;
    }

    // In production, this would submit to an API
    console.log("Quiz submitted:", { answers, email, companyName });
    
    toast({
      title: "Assessment complete!",
      description: "Check your results below.",
    });
    
    setIsComplete(true);
  };

  const getReadinessLevel = (score: number) => {
    if (score >= 70) return { level: "High", color: "text-primary", icon: CheckCircle2 };
    if (score >= 40) return { level: "Medium", color: "text-warning", icon: AlertCircle };
    return { level: "Low", color: "text-muted-foreground", icon: AlertCircle };
  };

  const score = calculateScore();
  const readiness = getReadinessLevel(score);

  if (isComplete) {
    return (
      <Layout>
        <Helmet>
          <title>Your Results | Paid Ads Readiness Quiz | Trapeze Media</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center`}>
                <readiness.icon className={`h-10 w-10 ${readiness.color}`} />
              </div>

              <h1 className="heading-display text-4xl md:text-5xl text-primary mb-4">
                Your Readiness Score: {score}%
              </h1>

              <p className="text-xl text-foreground mb-8">
                {score >= 70 && "You're well-positioned for paid advertising success. Your business profile is a great fit for our approach."}
                {score >= 40 && score < 70 && "There's potential here, but some foundations may need attention before scaling your advertising."}
                {score < 40 && "Paid advertising might not be the right focus right now. Let's discuss other options that might work better."}
              </p>

              <Card className="border-0 bg-muted text-left mb-8">
                <CardContent className="p-6">
                  <h2 className="heading-display text-xl text-foreground mb-4">
                    What This Means
                  </h2>
                  <ul className="space-y-3 text-foreground">
                    {answers.budget === "under-1k" && (
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                        <span>Your budget is below our recommended minimum. Consider increasing to £2,000+ for meaningful results.</span>
                      </li>
                    )}
                    {(answers.tracking === "no" || answers.tracking === "unsure") && (
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                        <span>Setting up proper conversion tracking will be essential before launching campaigns.</span>
                      </li>
                    )}
                    {["hospitality", "hotels", "events", "tourism"].includes(answers.industry as string) && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Your industry is a perfect fit for our expertise in hospitality and events marketing.</span>
                      </li>
                    )}
                    {answers.experience === "tried" && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>We often help brands who've struggled with DIY advertising. The right strategy and execution makes all the difference.</span>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" asChild>
                  <a
                    href="https://calendly.com/trapezemedia/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule a Discovery Call
                  </a>
                </Button>
                <Button variant="hero-outline" asChild>
                  <a href="/services/paid-advertising">
                    Learn More About Our Approach
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Paid Ads Readiness Quiz | Trapeze Media</title>
        <meta
          name="description"
          content="Take our 2-minute quiz to assess if your business is ready for paid advertising. Get personalised recommendations from Trapeze Media."
        />
      </Helmet>
      
      <FAQSchema faqs={faqs} />

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Services", href: "/services" },
              { label: "Paid Advertising", href: "/services/paid-advertising" },
              { label: "Readiness Quiz", href: "/paid-ads-quiz" },
            ]}
          />

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h1 className="heading-display text-3xl md:text-4xl text-primary mb-3">
                Paid Ads Readiness Quiz
              </h1>
              <p className="text-muted-foreground">
                Answer 8 quick questions to see if we're a good fit.
              </p>
            </div>

            <Progress value={progress} className="mb-8" />

            <Card className="border-0 bg-muted">
              <CardContent className="p-8">
                {currentStep < questions.length ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-2">
                      Question {currentStep + 1} of {questions.length}
                    </p>
                    <h2 className="heading-display text-xl text-foreground mb-6">
                      {currentQuestion.question}
                    </h2>

                    {currentQuestion.type === "single" || currentQuestion.type === "budget" ? (
                      <RadioGroup
                        value={answers[currentQuestion.id] as string || ""}
                        onValueChange={handleSingleAnswer}
                        className="space-y-3"
                      >
                        {currentQuestion.options.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-3 p-4 bg-background rounded-lg hover:bg-background/80 transition-colors"
                          >
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label
                              htmlFor={option.value}
                              className="flex-1 cursor-pointer text-foreground"
                            >
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option) => {
                          const selected = ((answers[currentQuestion.id] as string[]) || []).includes(option.value);
                          return (
                            <div
                              key={option.value}
                              className="flex items-center space-x-3 p-4 bg-background rounded-lg hover:bg-background/80 transition-colors"
                            >
                              <Checkbox
                                id={option.value}
                                checked={selected}
                                onCheckedChange={(checked) =>
                                  handleMultiAnswer(option.value, checked as boolean)
                                }
                              />
                              <Label
                                htmlFor={option.value}
                                className="flex-1 cursor-pointer text-foreground"
                              >
                                {option.label}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button
                        variant="hero"
                        onClick={handleNext}
                        disabled={!canProceed()}
                      >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="heading-display text-xl text-foreground mb-6">
                      Almost done! Where should we send your results?
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-foreground">
                          Email address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                          }}
                          placeholder="you@company.com"
                          className="mt-2 bg-background"
                          required
                        />
                        {emailError && (
                          <p className="text-sm text-destructive mt-1">{emailError}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-foreground">
                          Company name (optional)
                        </Label>
                        <Input
                          id="company"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value.slice(0, 100))}
                          placeholder="Your company"
                          className="mt-2 bg-background"
                          maxLength={100}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="ghost" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button variant="hero" onClick={handleSubmit}>
                        See My Results <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaidAdsQuiz;
