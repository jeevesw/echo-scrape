import { Megaphone, Target, Mail, Palette, Video, Globe } from "lucide-react";
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

  "tiktok-production": {
    slug: "tiktok-production",
    title: "TikTok Production",
    metaTitle: "TikTok Marketing: Production, Ads & Influencers | Trapeze Media",
    metaDescription: "Your brand, on the fastest-growing social platform in history. TikTok content creation, ads management, and influencer outreach for UK hospitality and events.",
    heroHeadline: "TikTok Marketing That Drives Discovery & Engagement",
    heroSubheadline: "Content creation, ads management, and influencer partnerships on the platform where trends are born.",
    icon: Video,
    
    summary: "TikTok has become essential for reaching younger audiences and driving discovery. We produce native-feeling content, manage ad campaigns, and connect brands with creators—all designed to build communities and convert views into visits.",
    
    bestFor: [
      "Hospitality brands targeting Gen Z and Millennials",
      "Events and festivals seeking viral awareness",
      "Food and drink brands with photogenic products",
      "Businesses ready to embrace authentic, creative content",
      "Brands wanting to build long-term TikTok presence",
    ],
    
    notFor: [
      "Brands expecting polished, corporate-style content",
      "Companies uncomfortable with creator-driven messaging",
      "Businesses targeting audiences over 45 primarily",
      "One-off viral attempts without ongoing strategy",
    ],
    
    process: [
      {
        step: 1,
        title: "Platform Strategy",
        description: "We analyse your audience, competitors, and trending content to develop a TikTok-native strategy that aligns with your brand.",
      },
      {
        step: 2,
        title: "Content Creation",
        description: "Our team scripts, films, and edits content designed for the platform—from trends to original formats.",
      },
      {
        step: 3,
        title: "Publishing & Engagement",
        description: "We handle posting at optimal times and engage with comments to build community and boost algorithm performance.",
      },
      {
        step: 4,
        title: "Ads & Spark Ads",
        description: "We amplify top-performing content with paid campaigns, using Spark Ads to maintain authenticity.",
      },
      {
        step: 5,
        title: "Influencer Partnerships",
        description: "We identify and manage creator collaborations that extend your reach to engaged audiences.",
      },
    ],
    
    features: [
      {
        title: "Content Production",
        description: "Native TikTok content including trends, behind-the-scenes, tutorials, and brand storytelling.",
      },
      {
        title: "TikTok Ads Management",
        description: "Full-funnel campaigns from awareness to conversion, including In-Feed, TopView, and Spark Ads.",
      },
      {
        title: "Influencer Outreach",
        description: "Creator identification, outreach, negotiation, and campaign management with micro and macro influencers.",
      },
      {
        title: "Engagement Management",
        description: "Daily comment responses and community building to boost algorithm performance and loyalty.",
      },
      {
        title: "Trend Monitoring",
        description: "Real-time tracking of trending sounds, formats, and hashtags relevant to your brand.",
      },
      {
        title: "Performance Analytics",
        description: "Detailed reporting on views, engagement, follower growth, and conversion attribution.",
      },
    ],
    
    industries: [
      "Restaurants & Hospitality",
      "Events & Festivals",
      "Food & Drink Brands",
      "Tourism & Attractions",
      "Entertainment & Nightlife",
      "Lifestyle & Wellness",
    ],
    
    faqs: [
      {
        question: "How often should we post on TikTok?",
        answer: "For building momentum, we recommend 3-5 posts per week minimum. TikTok rewards consistent creators, and the algorithm favours accounts with regular activity. We'll establish a sustainable cadence based on your resources.",
      },
      {
        question: "Do we need to show our face on camera?",
        answer: "Not necessarily. While personality-driven content often performs well, we create successful content featuring food, venues, events, and products without requiring you on camera. We tailor the approach to what works for your brand.",
      },
      {
        question: "How quickly can we expect results on TikTok?",
        answer: "TikTok's algorithm can surface content quickly—sometimes a video goes viral within days. However, building a sustainable presence typically takes 3-6 months of consistent posting. We focus on long-term growth alongside short-term wins.",
      },
      {
        question: "Should we use our own music or trending sounds?",
        answer: "Trending sounds typically boost reach significantly. We balance trending audio with original content and licensed music, always ensuring commercial usage rights are cleared for business accounts.",
      },
      {
        question: "How do you find the right influencers for our brand?",
        answer: "We use a combination of platform research, creator databases, and industry relationships. We focus on creators whose audience demographics and engagement rates align with your target market, not just follower counts.",
      },
      {
        question: "What's the minimum budget for TikTok ads?",
        answer: "We recommend starting with at least £1,500/month in ad spend to gather meaningful data. TikTok's cost-per-view is often lower than other platforms, making it efficient for awareness campaigns.",
      },
      {
        question: "Can you repurpose our TikTok content for other platforms?",
        answer: "Yes, we optimise content for cross-platform use. However, we recommend creating platform-native content where possible, as TikTok-style videos don't always perform as well on Instagram or YouTube without adaptation.",
      },
      {
        question: "What about the potential TikTok ban?",
        answer: "We monitor regulatory developments closely. Our content strategies are designed to be platform-agnostic where possible, and we help brands build audiences across multiple short-form platforms.",
      },
    ],
    
    relatedCaseStudies: ["brighton-fringe"],
    relatedBlogTopics: ["tiktok-marketing", "short-form-video", "influencer-marketing"],
    
    ctaHeadline: "Ready to Go Viral?",
    ctaText: "Let's create TikTok content that builds your brand and drives results.",
  },

  "website-design": {
    slug: "website-design",
    title: "Website Design",
    metaTitle: "Website Design & Management | Trapeze Media",
    metaDescription: "Engaging responsive websites built on WordPress, Shopify, or Squarespace. Social media-conscious design with SEO expertise for UK hospitality and lifestyle brands.",
    heroHeadline: "Websites That Convert Visitors into Customers",
    heroSubheadline: "Beautiful, responsive websites built by social-savvy designers who understand how to drive traffic and bookings.",
    icon: Globe,
    
    summary: "Your website is your digital home—where all your marketing efforts lead. We design and build responsive websites on platforms like WordPress, Shopify, and Squarespace, with social media integration and SEO best practices built in from day one.",
    
    bestFor: [
      "Hospitality businesses needing booking integration",
      "E-commerce brands selling food, drink, or lifestyle products",
      "Businesses wanting sites optimised for social traffic",
      "Companies needing ongoing website management",
      "Brands ready to invest in professional web presence",
    ],
    
    notFor: [
      "Complex custom web applications",
      "Brands expecting free or budget template sites",
      "Projects without clear content and brand guidelines",
      "One-page microsites or landing pages only",
    ],
    
    process: [
      {
        step: 1,
        title: "Discovery & Planning",
        description: "We understand your business, audience, and goals to define site structure, features, and content requirements.",
      },
      {
        step: 2,
        title: "Design & Wireframing",
        description: "We create visual mockups and page layouts that reflect your brand and optimise for user experience.",
      },
      {
        step: 3,
        title: "Development & Build",
        description: "We build your site on the chosen platform, ensuring responsive design, fast loading, and SEO foundations.",
      },
      {
        step: 4,
        title: "Content & Integration",
        description: "We populate your site with content and integrate booking systems, e-commerce, and third-party tools.",
      },
      {
        step: 5,
        title: "Launch & Training",
        description: "We handle launch, provide training on managing your site, and offer ongoing support packages.",
      },
    ],
    
    features: [
      {
        title: "Fully Responsive",
        description: "Every site offers an optimised experience on phones, tablets, and desktops—responsive to all screen sizes.",
      },
      {
        title: "Online Shops",
        description: "Sell products, services, subscriptions, and appointments via integrated e-commerce and booking systems.",
      },
      {
        title: "On-Brand Design",
        description: "Our designers ensure your site reflects your visual identity—fonts, colours, textures, and tone of voice.",
      },
      {
        title: "SEO Optimised",
        description: "Technical SEO, meta tags, structured data, and content optimisation built in from the start.",
      },
      {
        title: "Social Integration",
        description: "Feed embeds, share buttons, and landing pages optimised for traffic from social campaigns.",
      },
      {
        title: "Ongoing Management",
        description: "Content updates, security patches, performance monitoring, and technical support as needed.",
      },
    ],
    
    industries: [
      "Restaurants & Hospitality",
      "Hotels & Accommodation",
      "Events & Festivals",
      "Food & Drink E-commerce",
      "Tourism & Attractions",
      "Lifestyle & Wellness",
    ],
    
    faqs: [
      {
        question: "Which platform do you recommend—WordPress, Shopify, or Squarespace?",
        answer: "It depends on your needs. WordPress offers maximum flexibility, Shopify excels for e-commerce, and Squarespace provides elegant simplicity. We'll recommend the best fit based on your requirements and technical comfort.",
      },
      {
        question: "How long does a website project take?",
        answer: "Typical projects take 6-10 weeks from kickoff to launch. Timeline depends on site complexity, content readiness, and feedback turnaround. We provide detailed timelines during the planning phase.",
      },
      {
        question: "Can you integrate with our booking system?",
        answer: "Yes, we integrate with major reservation systems like OpenTable, ResDiary, Resy, and hotel booking engines. We also build custom booking solutions where needed.",
      },
      {
        question: "Do you provide website hosting?",
        answer: "We can manage hosting or set up on your preferred provider. For Squarespace and Shopify, hosting is included in the platform. For WordPress, we recommend managed hosting solutions.",
      },
      {
        question: "How much does a website cost?",
        answer: "Brochure sites start from £3,000-5,000. E-commerce and more complex sites typically range from £5,000-15,000. We provide detailed quotes based on your specific requirements.",
      },
      {
        question: "Can you help with domain and email setup?",
        answer: "Yes, we handle domain registration, DNS configuration, SSL certificates, and professional email setup. We ensure everything works seamlessly before launch.",
      },
      {
        question: "Do you offer website maintenance packages?",
        answer: "Yes, we offer monthly retainers covering content updates, security patches, backups, and technical support. This ensures your site stays secure and current.",
      },
      {
        question: "Will I be able to update the site myself?",
        answer: "Absolutely. We build sites with user-friendly content management and provide training. You'll be able to update text, images, and basic content. We're always available for more complex changes.",
      },
    ],
    
    relatedCaseStudies: ["various-eateries"],
    relatedBlogTopics: ["web-design", "seo", "e-commerce"],
    
    ctaHeadline: "Ready for a Website That Works?",
    ctaText: "Let's build a site that converts your visitors into customers.",
  },
};

export const servicesList = Object.values(servicesData);
