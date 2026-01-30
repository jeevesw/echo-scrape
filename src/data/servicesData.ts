import { Megaphone, Target, Mail, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  icon: LucideIcon;
  
  // Positioning section
  summary: string;
  bestFor: string[];
  notFor: string[];
  
  // Process/methodology
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  
  // Features/what's included
  features: {
    title: string;
    description: string;
  }[];
  
  // Industry focus
  industries: string[];
  
  // FAQs
  faqs: ServiceFAQ[];
  
  // Related case studies
  relatedCaseStudies: string[];
  
  // Related blog topics
  relatedBlogTopics: string[];
  
  // CTA
  ctaHeadline: string;
  ctaText: string;
}

export const servicesData: Record<string, ServiceData> = {
  "social-media-management": {
    slug: "social-media-management",
    title: "Social Media Management",
    metaTitle: "Social Media Management for Hospitality & Events | Trapeze Media",
    metaDescription: "Expert social media management for UK hospitality, tourism, and events brands. Content strategy, community management, and audience growth by Trapeze Media.",
    heroHeadline: "Social Media Management for Hospitality & Lifestyle Brands",
    heroSubheadline: "Build authentic connections with your audience through strategic content and community engagement.",
    icon: Megaphone,
    
    summary: "We manage social media for restaurants, hotels, venues, and lifestyle brands across the UK. Our approach combines local market knowledge with creative content strategy to build engaged communities that drive footfall and bookings.",
    
    bestFor: [
      "Multi-location hospitality brands needing consistent local presence",
      "Restaurants and venues targeting local audiences",
      "Tourism and events businesses building brand awareness",
      "Lifestyle brands wanting authentic community engagement",
      "Businesses ready to commit to 6+ months of consistent activity",
    ],
    
    notFor: [
      "Brands expecting viral growth overnight",
      "Businesses without budget for quality creative",
      "Companies wanting to fully automate engagement",
      "One-off campaign needs without ongoing support",
    ],
    
    process: [
      {
        step: 1,
        title: "Discovery & Audit",
        description: "We analyse your current social presence, competitor landscape, and audience insights to identify opportunities and set realistic benchmarks.",
      },
      {
        step: 2,
        title: "Strategy Development",
        description: "We create a content strategy aligned with your business goals, defining content pillars, posting cadence, and engagement approach.",
      },
      {
        step: 3,
        title: "Content Planning",
        description: "Monthly content calendars with a mix of brand, promotional, and community content. All content is reviewed and approved before publishing.",
      },
      {
        step: 4,
        title: "Daily Management",
        description: "We handle posting, community management, and reactive content. Your audience gets timely responses and genuine engagement.",
      },
      {
        step: 5,
        title: "Reporting & Optimisation",
        description: "Monthly performance reports with actionable insights. We continuously refine approach based on what's working.",
      },
    ],
    
    features: [
      {
        title: "Content Strategy",
        description: "Bespoke content pillars and themes aligned with your brand voice and business objectives.",
      },
      {
        title: "Content Creation",
        description: "Original graphics, copy, and content curation. Optional photography and video production.",
      },
      {
        title: "Community Management",
        description: "Daily monitoring, response management, and proactive engagement with your audience.",
      },
      {
        title: "Platform Management",
        description: "Coverage across Instagram, Facebook, TikTok, LinkedIn, and X/Twitter as needed.",
      },
      {
        title: "Local Optimisation",
        description: "Content tailored to local markets, events, and seasonal opportunities.",
      },
      {
        title: "Performance Reporting",
        description: "Monthly reports with growth metrics, engagement analysis, and strategic recommendations.",
      },
    ],
    
    industries: [
      "Restaurants & Hospitality",
      "Hotels & Accommodation",
      "Events & Festivals",
      "Tourism & Attractions",
      "Food & Drink Brands",
      "Lifestyle & Wellness",
    ],
    
    faqs: [
      {
        question: "How many posts per week do you recommend?",
        answer: "For most hospitality brands, we recommend 4-5 posts per week on Instagram/Facebook and 1-3 on LinkedIn. TikTok typically needs 3-5 posts weekly to build momentum. We tailor frequency based on your goals and resources.",
      },
      {
        question: "Do you create all the content or do we need to provide assets?",
        answer: "We create all content including graphics and copy. For photography and video, we can either produce this in-house or work with assets you provide. Many clients opt for quarterly photoshoots to keep content fresh.",
      },
      {
        question: "How do you handle local events and timely content?",
        answer: "We monitor local events, holidays, and trending topics relevant to your audience. Our content calendars include planned reactive moments, and we have processes for quick-turnaround content when opportunities arise.",
      },
      {
        question: "What's your minimum contract length?",
        answer: "We recommend a minimum 6-month commitment to see meaningful results. Social media growth is cumulative—the real gains come from consistent, long-term presence. We offer flexible terms after the initial period.",
      },
      {
        question: "How do you measure success?",
        answer: "We track engagement rate, follower growth, reach, and website traffic from social. Most importantly, we align metrics with your business goals—whether that's table bookings, event registrations, or brand awareness.",
      },
      {
        question: "Can you manage multiple locations under one brand?",
        answer: "Yes, this is a core strength. We've managed social for multi-site restaurant groups and hotel chains, creating scalable content systems that maintain brand consistency while allowing local relevance.",
      },
      {
        question: "Do you respond to comments and messages?",
        answer: "Yes, community management is included. We respond to comments and DMs within business hours, escalating customer service issues to your team as needed. We become an extension of your team.",
      },
      {
        question: "What platforms do you specialise in?",
        answer: "We focus on Instagram, Facebook, and TikTok for hospitality and lifestyle brands. We also manage LinkedIn for B2B positioning and X/Twitter for brands where real-time engagement matters.",
      },
    ],
    
    relatedCaseStudies: ["brighton-fringe", "various-eateries"],
    relatedBlogTopics: ["social-media", "content-strategy", "hospitality-marketing"],
    
    ctaHeadline: "Ready to Build Your Social Presence?",
    ctaText: "Let's discuss how we can help your brand connect with local audiences.",
  },
  
  "paid-advertising": {
    slug: "paid-advertising",
    title: "Paid Advertising",
    metaTitle: "Paid Social & Search Advertising for Hospitality | Trapeze Media",
    metaDescription: "Meta, Google, and TikTok advertising for UK hospitality, events, and tourism brands. Strategic campaigns that drive bookings and footfall.",
    heroHeadline: "Paid Advertising That Drives Bookings & Footfall",
    heroSubheadline: "Strategic campaigns across Meta, Google, TikTok, and LinkedIn that reach the right people at the right time.",
    icon: Target,
    
    summary: "We run paid advertising campaigns for hospitality, tourism, and events brands across the UK. Our hyperlocal approach means your ads reach people most likely to visit, book, or engage—not just anyone scrolling past.",
    
    bestFor: [
      "Hospitality brands with physical locations",
      "Events and festivals needing ticket sales",
      "Tourism businesses targeting domestic and international visitors",
      "Multi-location brands needing coordinated local campaigns",
      "Businesses with £2,000+ monthly ad spend",
    ],
    
    notFor: [
      "Brands with less than £1,000 monthly ad budget",
      "Companies expecting guaranteed ROI figures upfront",
      "Businesses without clear conversion tracking",
      "One-off promotions without follow-up strategy",
    ],
    
    process: [
      {
        step: 1,
        title: "Audit & Strategy",
        description: "We review your current ad performance, competitor landscape, and customer journey to identify the highest-impact opportunities.",
      },
      {
        step: 2,
        title: "Account Setup",
        description: "Proper pixel installation, conversion tracking, and audience structure. Many campaigns fail because foundations aren't right.",
      },
      {
        step: 3,
        title: "Creative Development",
        description: "We create ad variations optimised for each platform—static, carousel, video, and Stories formats.",
      },
      {
        step: 4,
        title: "Campaign Launch",
        description: "Structured campaign launches with proper testing frameworks. We start focused and expand what works.",
      },
      {
        step: 5,
        title: "Optimisation & Scaling",
        description: "Daily monitoring and weekly optimisation cycles. We shift budget to top performers and test new opportunities.",
      },
    ],
    
    features: [
      {
        title: "Meta Ads (Facebook & Instagram)",
        description: "Full-funnel campaigns from awareness to conversion. Local targeting, lookalike audiences, and retargeting.",
      },
      {
        title: "Google Ads (Search & Display)",
        description: "Search campaigns capturing high-intent traffic. Local Services Ads and Performance Max for hospitality.",
      },
      {
        title: "TikTok Ads",
        description: "Native-feeling campaigns for younger audiences. Spark Ads, In-Feed, and conversion campaigns.",
      },
      {
        title: "LinkedIn Advertising",
        description: "B2B campaigns for corporate hospitality, event venues, and professional services.",
      },
      {
        title: "Conversion Tracking",
        description: "Proper attribution setup including offline conversion tracking for restaurant reservations and bookings.",
      },
      {
        title: "Creative Production",
        description: "Platform-optimised ad creative including static, video, and UGC-style content.",
      },
    ],
    
    industries: [
      "Restaurants & Hospitality",
      "Events & Festivals",
      "Tourism & Attractions",
      "Hotels & Venues",
      "Food & Drink Brands",
      "Entertainment",
    ],
    
    faqs: [
      {
        question: "What's the minimum ad spend you work with?",
        answer: "We recommend a minimum £2,000/month ad spend to generate meaningful data and results. Below this, the learning phase takes too long and optimisation opportunities are limited. Our management fees are separate from ad spend.",
      },
      {
        question: "How quickly will we see results?",
        answer: "Most campaigns need 2-4 weeks to exit the learning phase and start optimising effectively. For brand awareness campaigns, expect 3-6 months to see compounding effects. Conversion campaigns often show clearer results within 4-6 weeks.",
      },
      {
        question: "Which platform should we advertise on?",
        answer: "It depends on your audience and goals. Meta (Facebook/Instagram) works for most hospitality brands. Google captures high-intent searches. TikTok excels for younger audiences and discovery. We often recommend a multi-platform approach.",
      },
      {
        question: "Do you create the ad creative?",
        answer: "Yes, creative production is included. We create static images, carousels, and video ads optimised for each platform. For larger productions, we can coordinate photoshoots and video production.",
      },
      {
        question: "How do you handle the new HFSS/LHF advertising restrictions?",
        answer: "We're specialists in UK food and drink advertising compliance. We help brands navigate the new less healthy food restrictions, ensuring campaigns are compliant while still effective.",
      },
      {
        question: "Can you track offline conversions like restaurant bookings?",
        answer: "Yes, we set up offline conversion tracking to attribute table bookings, phone calls, and in-store visits back to ad campaigns. This is crucial for understanding true advertising ROI in hospitality.",
      },
      {
        question: "What reporting do you provide?",
        answer: "Weekly performance summaries and detailed monthly reports. We focus on metrics that matter to your business—cost per booking, return on ad spend, and customer acquisition cost—not just vanity metrics.",
      },
      {
        question: "How do you handle multi-location campaigns?",
        answer: "We're experienced in running localised campaigns for multi-site brands. Each location can have tailored messaging and targeting while maintaining brand consistency and efficient budget allocation.",
      },
    ],
    
    relatedCaseStudies: ["various-eateries", "maximiles", "mycelia"],
    relatedBlogTopics: ["paid-advertising", "meta-ads", "google-ads", "tiktok-ads"],
    
    ctaHeadline: "Ready to Scale Your Advertising?",
    ctaText: "Take our Paid Ads Readiness Quiz to see if we're a good fit.",
  },
  
  "email-marketing": {
    slug: "email-marketing",
    title: "Email Marketing",
    metaTitle: "Email Marketing for Hospitality & Events | Trapeze Media",
    metaDescription: "Strategic email marketing for UK restaurants, hotels, and events. Automation, newsletters, and campaigns that drive repeat visits and loyalty.",
    heroHeadline: "Email Marketing That Drives Repeat Business",
    heroSubheadline: "Turn first-time visitors into loyal customers with strategic email campaigns and automation.",
    icon: Mail,
    
    summary: "Email remains the most cost-effective channel for hospitality marketing. We help restaurants, hotels, and events build engaged email lists and create campaigns that drive repeat visits, bookings, and customer loyalty.",
    
    bestFor: [
      "Restaurants and hotels with existing customer databases",
      "Events and venues building subscriber lists",
      "Brands wanting to reduce reliance on paid advertising",
      "Businesses with booking or loyalty systems",
      "Companies ready to commit to consistent communication",
    ],
    
    notFor: [
      "Businesses with email lists under 500 subscribers",
      "Companies expecting email to replace all other marketing",
      "Brands without clear offers or reasons to email",
      "One-off campaign needs without ongoing strategy",
    ],
    
    process: [
      {
        step: 1,
        title: "List Audit & Clean-Up",
        description: "We analyse your current list health, segment subscribers, and clean inactive contacts to improve deliverability.",
      },
      {
        step: 2,
        title: "Platform Setup",
        description: "Proper ESP configuration, template design, and integration with your booking or POS systems.",
      },
      {
        step: 3,
        title: "Automation Setup",
        description: "Welcome sequences, booking confirmations, and re-engagement flows that work automatically.",
      },
      {
        step: 4,
        title: "Campaign Calendar",
        description: "Monthly newsletter planning with seasonal campaigns, promotions, and content themes.",
      },
      {
        step: 5,
        title: "Optimisation",
        description: "Continuous testing of subject lines, send times, and content to improve open and click rates.",
      },
    ],
    
    features: [
      {
        title: "Newsletter Design",
        description: "Beautiful, mobile-optimised templates that reflect your brand and engage readers.",
      },
      {
        title: "Automated Flows",
        description: "Welcome sequences, post-visit follow-ups, birthday campaigns, and re-engagement automation.",
      },
      {
        title: "Segmentation",
        description: "Targeted campaigns based on visit history, preferences, location, and engagement level.",
      },
      {
        title: "List Building",
        description: "Strategies to grow your email list through website capture, in-venue signups, and social.",
      },
      {
        title: "Deliverability",
        description: "Technical setup and list hygiene to ensure your emails reach the inbox, not spam.",
      },
      {
        title: "Performance Analytics",
        description: "Detailed reporting on opens, clicks, conversions, and revenue attribution.",
      },
    ],
    
    industries: [
      "Restaurants & Hospitality",
      "Hotels & Accommodation",
      "Events & Festivals",
      "Food & Drink Brands",
      "Venues & Entertainment",
      "Tourism & Attractions",
    ],
    
    faqs: [
      {
        question: "What email platform do you use?",
        answer: "We're platform-agnostic and work with Mailchimp, Klaviyo, HubSpot, and others. We'll recommend the best fit based on your needs and existing tech stack. For hospitality, we often recommend Klaviyo for its strong automation and integration capabilities.",
      },
      {
        question: "How often should we email our list?",
        answer: "For most hospitality brands, we recommend 2-4 emails per month. This keeps you top-of-mind without causing fatigue. The key is sending valuable content—offers, updates, and stories your subscribers actually want to receive.",
      },
      {
        question: "Our email list is old and hasn't been used. Can you help?",
        answer: "Yes, we specialise in list reactivation. We'll clean your list, segment subscribers, and run re-engagement campaigns to identify who's still interested. It's better to have a smaller, engaged list than a large, inactive one.",
      },
      {
        question: "Can you integrate with our booking system?",
        answer: "Yes, we integrate with major reservation systems like OpenTable, ResDiary, and Resy, as well as hotel booking engines. This enables automated post-booking sequences and behaviour-based campaigns.",
      },
      {
        question: "What kind of results should we expect?",
        answer: "Industry benchmarks for hospitality are around 20-25% open rates and 2-3% click rates. We typically achieve above-average results through better segmentation and content. Revenue attribution varies but email often delivers 20-40x ROI.",
      },
      {
        question: "Do you write the email content?",
        answer: "Yes, copywriting is included. We write all email content, subject lines, and preview text. We work within your brand voice and can incorporate any offers or updates you want to communicate.",
      },
      {
        question: "How do you handle GDPR compliance?",
        answer: "All our email practices are GDPR-compliant. We ensure proper consent capture, maintain clean unsubscribe processes, and help you maintain lawful bases for marketing communications.",
      },
      {
        question: "Can you help with transactional emails?",
        answer: "Yes, we can design and optimise booking confirmations, receipts, and other transactional emails. These have very high open rates and are an underused opportunity to reinforce your brand.",
      },
    ],
    
    relatedCaseStudies: ["various-eateries"],
    relatedBlogTopics: ["email-marketing", "customer-retention", "automation"],
    
    ctaHeadline: "Ready to Unlock the Power of Email?",
    ctaText: "Let's discuss how email can drive repeat business for your brand.",
  },
  
  "creative-services": {
    slug: "creative-services",
    title: "Creative Services",
    metaTitle: "Creative Services for Hospitality Marketing | Trapeze Media",
    metaDescription: "Photography, videography, and graphic design for UK hospitality and lifestyle brands. Scroll-stopping content that captures your brand story.",
    heroHeadline: "Creative That Captures Attention & Tells Your Story",
    heroSubheadline: "Photography, video, and design that makes your brand impossible to scroll past.",
    icon: Palette,
    
    summary: "Great marketing needs great creative. We produce photography, video, and graphic design specifically for hospitality and lifestyle brands—content that performs on social, advertising, and owned channels.",
    
    bestFor: [
      "Restaurants and hotels needing fresh visual content",
      "Brands launching new menus, venues, or experiences",
      "Businesses wanting consistent, on-brand visual identity",
      "Events needing pre-event, live, and post-event content",
      "Companies ready to invest in quality over quantity",
    ],
    
    notFor: [
      "Brands expecting premium creative on minimal budgets",
      "Companies wanting stock-style generic content",
      "One-off needs without strategic context",
      "Businesses without clear brand guidelines",
    ],
    
    process: [
      {
        step: 1,
        title: "Brief & Concepting",
        description: "We understand your brand, objectives, and how the content will be used to create a clear creative brief.",
      },
      {
        step: 2,
        title: "Pre-Production",
        description: "Shot lists, mood boards, talent booking, and location planning to ensure smooth production.",
      },
      {
        step: 3,
        title: "Production",
        description: "On-location shoots with professional equipment and experienced creatives who understand hospitality.",
      },
      {
        step: 4,
        title: "Post-Production",
        description: "Editing, retouching, and formatting for all required platforms and use cases.",
      },
      {
        step: 5,
        title: "Delivery & Asset Library",
        description: "Organised delivery of all assets with proper naming and usage guidelines.",
      },
    ],
    
    features: [
      {
        title: "Food & Drink Photography",
        description: "Mouth-watering imagery that showcases your menu at its best. Styled or in-situ shots.",
      },
      {
        title: "Venue & Interior Photography",
        description: "Atmospheric shots that capture the feeling of your space and encourage visits.",
      },
      {
        title: "Short-Form Video",
        description: "Reels, TikToks, and Stories content designed for social media performance.",
      },
      {
        title: "Event Coverage",
        description: "Live event photography and video for real-time social content and post-event marketing.",
      },
      {
        title: "Graphic Design",
        description: "Social templates, menu design, signage, and brand collateral.",
      },
      {
        title: "Motion Graphics",
        description: "Animated content for social, advertising, and in-venue digital displays.",
      },
    ],
    
    industries: [
      "Restaurants & Hospitality",
      "Hotels & Accommodation",
      "Events & Festivals",
      "Food & Drink Brands",
      "Lifestyle & Wellness",
      "Retail & Experience",
    ],
    
    faqs: [
      {
        question: "Do you have in-house photographers and videographers?",
        answer: "We have a core team of trusted creatives we work with regularly, all with hospitality and lifestyle experience. For larger productions, we bring in additional specialist talent. You get agency-quality work without agency overhead.",
      },
      {
        question: "How much does a typical shoot cost?",
        answer: "A half-day shoot for social content typically starts around £800-1,200. Full-day productions with video start from £2,000. We provide detailed quotes based on your specific requirements—locations, talent, deliverables, and usage rights.",
      },
      {
        question: "Can you shoot at multiple locations?",
        answer: "Yes, we regularly run multi-location shoots for restaurant groups. We plan efficiently to maximise output per day and ensure visual consistency across all sites.",
      },
      {
        question: "What do we need to prepare for a shoot?",
        answer: "We handle all planning and provide a detailed brief. You'll need to ensure the venue is ready, any food is prepared, and key staff are available if needed. We'll send a complete pre-shoot checklist.",
      },
      {
        question: "How quickly do we receive the final assets?",
        answer: "Standard turnaround is 5-7 working days for photography and 10-14 days for video with editing. Rush turnaround is available for urgent needs at additional cost.",
      },
      {
        question: "Can you create content for paid advertising?",
        answer: "Absolutely—much of our creative work is specifically for advertising. We shoot with platform requirements in mind, creating variations optimised for different placements and aspect ratios.",
      },
      {
        question: "Do you provide ongoing creative retainers?",
        answer: "Yes, many clients opt for quarterly or monthly shoot retainers. This ensures a steady stream of fresh content and often works out more cost-effective than ad-hoc bookings.",
      },
      {
        question: "What about licensing and usage rights?",
        answer: "Standard social and web usage is included. Extended licensing for advertising, print, or third-party use is available. We'll clarify all usage rights upfront in our quote.",
      },
    ],
    
    relatedCaseStudies: ["brighton-fringe", "various-eateries"],
    relatedBlogTopics: ["content-creation", "social-media", "brand-photography"],
    
    ctaHeadline: "Ready to Elevate Your Visual Content?",
    ctaText: "Let's discuss your next creative project.",
  },
};

export const servicesList = Object.values(servicesData);
