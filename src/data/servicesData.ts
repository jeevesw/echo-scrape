import { Megaphone, Target, Palette, Video, Globe, Search } from "lucide-react";
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
    metaTitle: "Social Media Management Agency UK | Trapeze Media",
    metaDescription: "Expert social media management for UK hospitality, tourism, and events brands. Content strategy, community management, and audience growth by Trapeze Media.",
    heroHeadline: "Social Media Management That Builds Brands and Drives Results",
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
      { step: 1, title: "Discovery & Audit", description: "We analyse your current social presence, competitor landscape, and audience insights to identify opportunities and set realistic benchmarks." },
      { step: 2, title: "Strategy Development", description: "We create a content strategy aligned with your business goals, defining content pillars, posting cadence, and engagement approach." },
      { step: 3, title: "Content Planning", description: "Monthly content calendars with a mix of brand, promotional, and community content. All content is reviewed and approved before publishing." },
      { step: 4, title: "Daily Management", description: "We handle posting, community management, and reactive content. Your audience gets timely responses and genuine engagement." },
      { step: 5, title: "Reporting & Optimisation", description: "Monthly performance reports with actionable insights. We continuously refine approach based on what's working." },
    ],
    
    features: [
      { title: "Content Strategy", description: "Bespoke content pillars and themes aligned with your brand voice and business objectives." },
      { title: "Content Creation", description: "Original graphics, copy, and content curation. Optional photography and video production." },
      { title: "Community Management", description: "Daily monitoring, response management, and proactive engagement with your audience." },
      { title: "Platform Management", description: "Coverage across Instagram, Facebook, TikTok, LinkedIn, and X/Twitter as needed." },
      { title: "Local Optimisation", description: "Content tailored to local markets, events, and seasonal opportunities." },
      { title: "Performance Reporting", description: "Monthly reports with growth metrics, engagement analysis, and strategic recommendations." },
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
      { question: "How many posts per week do you recommend?", answer: "For most hospitality brands, we recommend 4-5 posts per week on Instagram/Facebook and 1-3 on LinkedIn. TikTok typically needs 3-5 posts weekly to build momentum. We tailor frequency based on your goals and resources." },
      { question: "Do you create all the content or do we need to provide assets?", answer: "We create all content including graphics and copy. For photography and video, we can either produce this in-house or work with assets you provide. Many clients opt for quarterly photoshoots to keep content fresh." },
      { question: "How do you handle local events and timely content?", answer: "We monitor local events, holidays, and trending topics relevant to your audience. Our content calendars include planned reactive moments, and we have processes for quick-turnaround content when opportunities arise." },
      { question: "What's your minimum contract length?", answer: "We recommend a minimum 6-month commitment to see meaningful results. Social media growth is cumulative—the real gains come from consistent, long-term presence. We offer flexible terms after the initial period." },
      { question: "How do you measure success?", answer: "We track engagement rate, follower growth, reach, and website traffic from social. Most importantly, we align metrics with your business goals—whether that's table bookings, event registrations, or brand awareness." },
      { question: "Can you manage multiple locations under one brand?", answer: "Yes, this is a core strength. We've managed social for multi-site restaurant groups and hotel chains, creating scalable content systems that maintain brand consistency while allowing local relevance." },
      { question: "Do you respond to comments and messages?", answer: "Yes, community management is included. We respond to comments and DMs within business hours, escalating customer service issues to your team as needed. We become an extension of your team." },
      { question: "What platforms do you specialise in?", answer: "We focus on Instagram, Facebook, and TikTok for hospitality and lifestyle brands. We also manage LinkedIn for B2B positioning and X/Twitter for brands where real-time engagement matters." },
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
    heroHeadline: "Paid Social & Search Campaigns That Fill Venues, Inboxes, and Order Books",
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
      { step: 1, title: "Audit & Strategy", description: "We review your current ad performance, competitor landscape, and customer journey to identify the highest-impact opportunities." },
      { step: 2, title: "Account Setup", description: "Proper pixel installation, conversion tracking, and audience structure. Many campaigns fail because foundations aren't right." },
      { step: 3, title: "Creative Development", description: "We create ad variations optimised for each platform—static, carousel, video, and Stories formats." },
      { step: 4, title: "Campaign Launch", description: "Structured campaign launches with proper testing frameworks. We start focused and expand what works." },
      { step: 5, title: "Optimisation & Scaling", description: "Daily monitoring and weekly optimisation cycles. We shift budget to top performers and test new opportunities." },
    ],
    
    features: [
      { title: "Meta Ads (Facebook & Instagram)", description: "Full-funnel campaigns from awareness to conversion. Local targeting, lookalike audiences, and retargeting." },
      { title: "Google Ads (Search & Display)", description: "Search campaigns capturing high-intent traffic. Local Services Ads and Performance Max for hospitality." },
      { title: "TikTok Ads", description: "Native-feeling campaigns for younger audiences. Spark Ads, In-Feed, and conversion campaigns." },
      { title: "LinkedIn Advertising", description: "B2B campaigns for corporate hospitality, event venues, and professional services." },
      { title: "Conversion Tracking", description: "Proper attribution setup including offline conversion tracking for restaurant reservations and bookings." },
      { title: "Creative Production", description: "Platform-optimised ad creative including static, video, and UGC-style content." },
    ],
    
    industries: [
      "Restaurants & QSR",
      "Hospitality & Hotels",
      "Entertainment & Events",
      "Bars, Clubs & Nightlife",
      "Lifestyle & Consumer Brands",
      "Private Medical & Aesthetics",
    ],
    
    faqs: [
      { question: "How much do I need to spend on paid ads?", answer: "There's no universal minimum, but we typically recommend a testing budget of at least £1,500–£3,000/month per platform to generate meaningful data. We'll be upfront about what's realistic for your goals before any work begins." },
      { question: "Do you manage the ad creative as well as the media buying?", answer: "Yes. Creative is one of the biggest variables in paid performance, and we don't treat it as an afterthought. We brief, direct and produce ad creative — or work with your existing assets — as part of the campaign management process." },
      { question: "Can you run ads across multiple locations?", answer: "Absolutely — this is one of our core specialisms. We use hyperlocal targeting to run geo-specific campaigns that deliver different messages to audiences near different venues, which is particularly powerful for multi-site hospitality groups." },
      { question: "Do you handle the Less Healthy Food (LHF) ad restrictions for food brands?", answer: "Yes. We conduct an LHF compliance review as standard for all food and drink clients. Our team is up to date with ASA guidance and can advise on what's permissible, what needs adjustment, and how to stay creative within the rules." },
      { question: "What platforms do you advertise on?", answer: "We currently run paid campaigns on Meta (Facebook & Instagram), Google (Search, Display, Performance Max, YouTube) and TikTok. We can advise on which mix is right for your goals and budget." },
      { question: "How long before I see results?", answer: "Paid ads can drive results from day one — but the first 4–6 weeks are typically a testing and optimisation phase. We set expectations clearly upfront and report transparently on what's working and why." },
    ],
    
    relatedCaseStudies: ["various-eateries", "maximiles", "mycelia"],
    relatedBlogTopics: ["paid-advertising", "meta-ads", "google-ads", "tiktok-ads"],
    
    ctaHeadline: "Ready to Make Your Ad Budget Work Harder?",
    ctaText: "Whether you're new to paid advertising or looking to get more from an existing agency relationship, let's start with a no-obligation discovery call.",
  },

  "paid-search": {
    slug: "paid-search",
    title: "Paid Search",
    metaTitle: "Google Ads Agency for Hospitality & Lifestyle Brands | Trapeze Media",
    metaDescription: "Google Ads management for UK hospitality, restaurants, and lifestyle brands. PPC campaigns that drive bookings, footfall, and sales. Hyperlocal targeting specialists.",
    heroHeadline: "GOOGLE ADS THAT FILL VENUES, DRIVE LEADS, AND GROW YOUR BUSINESS",
    heroSubheadline: "We design and run PPC campaigns which drive high-intent traffic, convert sales, and generates leads, across Google Search, Display, Performance Max, and beyond.",
    icon: Search,
    summary: "Our paid search campaigns are built to scale, from modest starting points to multi-million pound ad spends. We pair intelligent targeting and engaging storytelling with industry expertise and meaningful reporting. As a hyperlocal marketing agency, we're known for delivering Performance Max campaigns with incredible ROI.",
    bestFor: [
      "Restaurants and venues targeting local searchers",
      "Multi-location hospitality groups needing consistent bookings",
      "Businesses with clear conversion goals (reservations, calls, footfall)",
      "Brands wanting campaigns tied to real revenue outcomes",
      "Businesses ready to invest meaningfully in ad spend",
    ],
    notFor: [
      "Businesses not yet ready to commit to conversion tracking and proper attribution setup",
      "Brands expecting results without conversion tracking",
      "Companies wanting one-off campaigns without ongoing optimisation",
      "Businesses without a clear landing page or booking flow",
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing campaigns (if any), research your competitors, and map the keyword landscape to identify your highest-value opportunities." },
      { step: 2, title: "Campaign Architecture", description: "We build campaigns structured around your goals — search, display, Performance Max, or a combination — with tight ad groups and hyperlocal targeting." },
      { step: 3, title: "Creative & Copy", description: "Our in-house team writes ad copy and designs creative assets that match search intent and represent your brand accurately." },
      { step: 4, title: "Launch & Track", description: "We implement conversion tracking end-to-end — from click to booking — so every pound of ad spend is accounted for." },
      { step: 5, title: "Optimise & Report", description: "Weekly performance snapshots and monthly reports. We continuously refine bids, keywords, and creative based on what's working." },
    ],
    features: [
      { title: "Search Campaigns", description: "Precisely-picked keywords targeting high-intent queries — people ready to book, visit, or buy." },
      { title: "Performance Max", description: "AI-powered campaigns across all Google inventory: Search, Display, YouTube, Maps, and Gmail." },
      { title: "Hyperlocal Targeting", description: "Geo-targeted campaigns reaching audiences within a specific radius of your venue or location." },
      { title: "Conversion Tracking", description: "Full attribution from click to booking. We track calls, form fills, reservations, and transactions." },
      { title: "Ad Creative & Copy", description: "In-house copywriters and designers produce ads that convert — not just ads that appear." },
      { title: "LHF Ad Compliance", description: "For food and drink brands, we navigate Less Healthy Food ad restrictions to keep campaigns running legally." },
    ],
    industries: [
      "Restaurants & QSR",
      "Hotels & Accommodation",
      "Bars, Clubs & Nightlife",
      "Events & Festivals",
      "Private Medical & Aesthetics",
      "D2C & E-commerce",
    ],
    faqs: [
      { question: "How much do I need to spend on Google Ads?", answer: "We recommend a minimum of £1,000/month in ad spend to gather meaningful data. For competitive hospitality markets in London, £2,000–5,000/month is more typical. We're transparent about what budget levels can realistically achieve." },
      { question: "Do you manage the creative as well as the media buying?", answer: "Yes — ad copy, display creative, and landing page recommendations are all included. We don't just buy media; we make sure the ads themselves are worth clicking." },
      { question: "Can you run ads across multiple locations?", answer: "Yes, multi-location campaigns are a core strength. We build scalable campaign structures that maintain brand consistency while targeting each location's local audience." },
      { question: "Do you handle LHF ad restrictions for food brands?", answer: "Yes. We stay current with UK Less Healthy Food advertising regulations and structure campaigns to remain compliant — particularly important for restaurant and QSR brands advertising to broad audiences." },
      { question: "What platforms do you advertise on?", answer: "Primarily Google Search, Performance Max, and Display. We also run Google Shopping for e-commerce clients and YouTube pre-roll where relevant." },
      { question: "How long before I see results?", answer: "Search campaigns can drive traffic from day one. Meaningful optimisation data typically emerges after 4–6 weeks. Performance Max campaigns generally need 6–8 weeks to exit the learning phase." },
    ],
    relatedCaseStudies: ["various-eateries"],
    relatedBlogTopics: ["google-ads", "paid-search", "hyperlocal-marketing"],
    ctaHeadline: "Ready to Make Your Ad Budget Work Harder?",
    ctaText: "Whether you're new to paid search or looking to get more from an existing agency relationship, let's start with a no-obligation discovery call.",
  },
  
  "creative-services": {
    slug: "creative-services",
    title: "Creative Services",
    metaTitle: "Creative Services for Hospitality Marketing | Trapeze Media",
    metaDescription: "Photography, videography, and graphic design for UK hospitality and lifestyle brands. Scroll-stopping content that captures your brand story.",
    heroHeadline: "Creative Services",
    heroSubheadline: "Trapeze Media offers full-service creative solutions: photography, graphic design, video, and branding.",
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
      { step: 1, title: "Brief & Concepting", description: "We understand your brand, objectives, and how the content will be used to create a clear creative brief." },
      { step: 2, title: "Pre-Production", description: "Shot lists, mood boards, talent booking, and location planning to ensure smooth production." },
      { step: 3, title: "Production", description: "On-location shoots with professional equipment and experienced creatives who understand hospitality." },
      { step: 4, title: "Post-Production", description: "Editing, retouching, and formatting for all required platforms and use cases." },
      { step: 5, title: "Delivery & Asset Library", description: "Organised delivery of all assets with proper naming and usage guidelines." },
    ],
    
    features: [
      { title: "Food & Drink Photography", description: "Mouth-watering imagery that showcases your menu at its best. Styled or in-situ shots." },
      { title: "Venue & Interior Photography", description: "Atmospheric shots that capture the feeling of your space and encourage visits." },
      { title: "Short-Form Video", description: "Reels, TikToks, and Stories content designed for social media performance." },
      { title: "Event Coverage", description: "Live event photography and video for real-time social content and post-event marketing." },
      { title: "Graphic Design", description: "Social templates, menu design, signage, and brand collateral." },
      { title: "Motion Graphics", description: "Animated content for social, advertising, and in-venue digital displays." },
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
      { question: "Do you have in-house photographers and videographers?", answer: "We have a core team of trusted creatives we work with regularly, all with hospitality and lifestyle experience. For larger productions, we bring in additional specialist talent." },
      { question: "How much does a typical shoot cost?", answer: "A half-day shoot for social content typically starts around £800-1,200. Full-day productions with video start from £2,000. We provide detailed quotes based on your specific requirements." },
      { question: "Can you shoot at multiple locations?", answer: "Yes, we regularly run multi-location shoots for restaurant groups. We plan efficiently to maximise output per day and ensure visual consistency across all sites." },
      { question: "How quickly do we receive the final assets?", answer: "Standard turnaround is 5-7 working days for photography and 10-14 days for video with editing. Rush turnaround is available for urgent needs." },
      { question: "Can you create content for paid advertising?", answer: "Absolutely—much of our creative work is specifically for advertising. We shoot with platform requirements in mind, creating variations optimised for different placements and aspect ratios." },
    ],
    
    relatedCaseStudies: ["brighton-fringe", "various-eateries"],
    relatedBlogTopics: ["content-creation", "social-media", "brand-photography"],
    
    ctaHeadline: "Ready to Elevate Your Visual Content?",
    ctaText: "Let's discuss your next creative project.",
  },

  "tiktok-production": {
    slug: "tiktok-production",
    title: "Video Production",
    metaTitle: "Video Production for Social & Advertising | Trapeze Media",
    metaDescription: "Your brand, on the fastest-growing social platform in history. TikTok content creation, ads management, and influencer outreach for UK hospitality and events.",
    heroHeadline: "Video Production That Gets Seen and Shared",
    heroSubheadline: "From TikToks to full brand films — we shoot, edit, and deliver content that performs on every platform.",
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
      { step: 1, title: "Platform Strategy", description: "We analyse your audience, competitors, and trending content to develop a TikTok-native strategy that aligns with your brand." },
      { step: 2, title: "Content Creation", description: "Our team scripts, films, and edits content designed for the platform—from trends to original formats." },
      { step: 3, title: "Publishing & Engagement", description: "We handle posting at optimal times and engage with comments to build community and boost algorithm performance." },
      { step: 4, title: "Ads & Spark Ads", description: "We amplify top-performing content with paid campaigns, using Spark Ads to maintain authenticity." },
      { step: 5, title: "Influencer Partnerships", description: "We identify and manage creator collaborations that extend your reach to engaged audiences." },
    ],
    
    features: [
      { title: "Pre-Production", description: "Strategy, scripting, storyboarding, and creative direction for every piece of TikTok content." },
      { title: "Production", description: "On-location filming with professional equipment, capturing authentic, platform-native content." },
      { title: "Post-Production", description: "Editing, captioning, sound design, and thumbnail creation optimised for TikTok's algorithm." },
      { title: "Account Management", description: "Daily posting, community engagement, comment responses, and trend monitoring." },
      { title: "Engagement & Community", description: "Building loyal communities through authentic interaction and creator collaborations." },
      { title: "Ads & Influencers", description: "Paid amplification via Spark Ads, In-Feed, and managed influencer partnerships." },
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
      { question: "How often should we post on TikTok?", answer: "For building momentum, we recommend 3-5 posts per week minimum. TikTok rewards consistent creators, and the algorithm favours accounts with regular activity." },
      { question: "Do we need to show our face on camera?", answer: "Not necessarily. While personality-driven content often performs well, we create successful content featuring food, venues, events, and products without requiring you on camera." },
      { question: "How quickly can we expect results on TikTok?", answer: "TikTok's algorithm can surface content quickly—sometimes a video goes viral within days. However, building a sustainable presence typically takes 3-6 months of consistent posting." },
      { question: "Should we use our own music or trending sounds?", answer: "Trending sounds typically boost reach significantly. We balance trending audio with original content and licensed music, always ensuring commercial usage rights are cleared." },
      { question: "How do you find the right influencers for our brand?", answer: "We use a combination of platform research, creator databases, and industry relationships. We focus on creators whose audience demographics and engagement rates align with your target market." },
      { question: "What's the minimum budget for TikTok ads?", answer: "We recommend starting with at least £1,500/month in ad spend to gather meaningful data. TikTok's cost-per-view is often lower than other platforms, making it efficient for awareness campaigns." },
      { question: "Can you repurpose our TikTok content for other platforms?", answer: "Yes, we optimise content for cross-platform use. However, we recommend creating platform-native content where possible, as TikTok-style videos don't always perform as well on Instagram or YouTube without adaptation." },
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
    heroHeadline: "Website Design & E-Commerce",
    heroSubheadline: "Engaging responsive websites built on WordPress, Shopify, or Squarespace — designed by social-savvy developers and SEO experts.",
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
      { step: 1, title: "Discovery & Planning", description: "We understand your business, audience, and goals to define site structure, features, and content requirements." },
      { step: 2, title: "Design & Wireframing", description: "We create visual mockups and page layouts that reflect your brand and optimise for user experience." },
      { step: 3, title: "Development & Build", description: "We build your site on the chosen platform, ensuring responsive design, fast loading, and SEO foundations." },
      { step: 4, title: "Content & Integration", description: "We populate your site with content and integrate booking systems, e-commerce, and third-party tools." },
      { step: 5, title: "Launch & Training", description: "We handle launch, provide training on managing your site, and offer ongoing support packages." },
    ],
    
    features: [
      { title: "Fully Responsive", description: "Every site offers an optimised experience on phones, tablets, and desktops—responsive to all screen sizes." },
      { title: "Online Shops", description: "Sell products, services, subscriptions, and appointments via integrated e-commerce and booking systems." },
      { title: "On-Brand Design", description: "Our designers ensure your site reflects your visual identity—fonts, colours, textures, and tone of voice." },
      { title: "SEO Optimised", description: "Technical SEO, meta tags, structured data, and content optimisation built in from the start." },
      { title: "Social Integration", description: "Feed embeds, share buttons, and landing pages optimised for traffic from social campaigns." },
      { title: "Ongoing Management", description: "Content updates, security patches, performance monitoring, and technical support as needed." },
      { title: "Hosting & Email Addresses", description: "Domain registration, DNS configuration, SSL certificates, and professional email setup included." },
      { title: "Analytics & Tracking", description: "Google Analytics, conversion tracking, and performance monitoring set up from day one." },
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
      { question: "Which platform do you recommend—WordPress, Shopify, or Squarespace?", answer: "It depends on your needs. WordPress offers maximum flexibility, Shopify excels for e-commerce, and Squarespace provides elegant simplicity. We'll recommend the best fit based on your requirements." },
      { question: "How long does a website project take?", answer: "Typical projects take 6-10 weeks from kickoff to launch. Timeline depends on site complexity, content readiness, and feedback turnaround." },
      { question: "Can you integrate with our booking system?", answer: "Yes, we integrate with major reservation systems like OpenTable, ResDiary, Resy, and hotel booking engines." },
      { question: "Do you provide website hosting?", answer: "We can manage hosting or set up on your preferred provider. For Squarespace and Shopify, hosting is included in the platform." },
      { question: "How much does a website cost?", answer: "Brochure sites start from £3,000-5,000. E-commerce and more complex sites typically range from £5,000-15,000." },
      { question: "Do you offer website maintenance packages?", answer: "Yes, we offer monthly retainers covering content updates, security patches, backups, and technical support." },
      { question: "Will I be able to update the site myself?", answer: "Absolutely. We build sites with user-friendly content management and provide training. You'll be able to update text, images, and basic content." },
    ],
    
    relatedCaseStudies: ["various-eateries"],
    relatedBlogTopics: ["web-design", "seo", "e-commerce"],
    
    ctaHeadline: "Ready for a Website That Works?",
    ctaText: "Let's build a site that converts your visitors into customers.",
  },
};

export const servicesList = Object.values(servicesData);
