import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/case-study/AnimatedStat";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowLeft, Quote, Users, Clock, PoundSterling } from "lucide-react";

const MyceliaCaseStudy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Lead Generation for Mycelia Kickstarter Campaign | Trapeze Media</title>
        <meta
          name="description"
          content="Our lead gen campaign helped board game Mycelia raise £545,804 from 10,492 backers on Kickstarter — 6,000% above its £9,000 goal. Funded in 50 minutes."
        />
        <link rel="canonical" href="https://trapezemedia.co.uk/case-studies/mycelia" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[65vh] max-h-[75vh] min-h-[520px] overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

        <div className="absolute inset-0">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/5b503809-c2fb-402b-9bed-8135c7c2b9fb/Mycelia-Case-Study-Trapeze-Media.jpg"
            alt="Mycelia board game by Jack Neville"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container-content mx-auto px-4 relative z-20 pt-6">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Mycelia", href: "/case-studies/mycelia" },
            ]}
            variant="light"
          />
        </div>

        <div className="container-content mx-auto px-4 relative z-10 h-full flex items-center">
          <ScrollReveal animation="left">
            <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight max-w-3xl">
              Lead Generation for Crowdfunding Campaign on Kickstarter
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mt-6 max-w-2xl leading-relaxed">
              How our lead gen campaign played a vital role in a UK games designer raising over half-a-million pounds from community backers across the world
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Results — directly below hero */}
      <section className="py-14 bg-muted relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container-content mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={0}>
              <div className="text-center space-y-2">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <AnimatedStat
                  value={10492}
                  label="backers"
                  delay={0}
                  formatValue={(v) => v.toLocaleString()}
                  size="compact"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="text-center space-y-2">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="heading-display text-4xl md:text-5xl text-primary">
                  50 mins
                </div>
                <p className="text-foreground text-base md:text-lg mt-3 font-medium">to hit funding target</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="text-center space-y-2">
                <PoundSterling className="w-8 h-8 text-primary mx-auto mb-2" />
                <AnimatedStat
                  value={545804}
                  prefix="£"
                  label="raised"
                  delay={300}
                  formatValue={(v) => v.toLocaleString()}
                  size="compact"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      <section className="py-12 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                'Mycelia' is an innovative, dynamic, area control and resource game all about the life cycle of fungi, conceptualised by graphic designer Jack Neville.
              </p>
              <p>
                We ran a campaign which contributed to a successful crowdfunding project on Kickstarter, driving half-a-million pounds in backing from more than 10,000 fans. That's <span className="text-primary font-semibold">6,000% more</span> than the initial £9,000 goal!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Challenge — flush-left image, centered copy, flush-right image */}
      <section className="py-14 bg-muted overflow-hidden">
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] items-center gap-0">
            {/* Flush-left image */}
            <ScrollReveal animation="left">
              <div className="lg:-ml-0">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/6b05c2f0-7784-46c8-b0c6-b4b473606f1f/Mycelia-Side.png"
                  alt="Mycelia board game box side view"
                  className="w-full h-auto object-cover object-right"
                />
              </div>
            </ScrollReveal>

            {/* Centered copy */}
            <ScrollReveal>
              <div className="space-y-6 px-8 lg:px-12 py-8 lg:py-0">
                <h2 className="heading-display text-3xl md:text-4xl text-foreground">
                  The Challenge
                </h2>
                <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Mycelia is, without a doubt, one of the most beautiful and innovative board games we've ever come across. But the board gaming space is competitive (pun intended), Kickstarter can be quite a saturated platform, and the crowdfunding campaign was set to launch in the midst of a cost-of-living crisis in the UK.
                  </p>
                  <p>
                    But Jack was confident in his creation. When we met a few months prior to the Kickstarter launch, the way he spoke about the game had us enthralled. We ended up literally writing cost-per-lead targets out on a pub napkin! And days later, we had a plan in place for building a database of backers.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Flush-right image */}
            <ScrollReveal animation="right">
              <div>
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/89027574-42b7-4b6b-9616-c8d40b05277a/Mycelia-Board-Game-Cards-Trapeze-Media.png"
                  alt="Mycelia board game cards"
                  className="w-3/4 h-auto object-contain object-left mx-auto lg:mx-0 lg:ml-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Strategy — image left, text right */}
      <section className="py-14 bg-background">
        <div className="container-content mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <ScrollReveal animation="left">
              <div className="overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/e194b6dc-6eb8-43e0-8ab4-9ae180201f2e/Trapeze-Media-Mycelia-Board-Game-Case-Study.png"
                  alt="Mycelia board game case study creative"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="right">
              <div className="space-y-6">
                <h2 className="heading-display text-3xl md:text-4xl text-foreground">
                  Our Approach
                </h2>
                <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    We raised awareness through video view ads across Meta (Facebook, Instagram) and then retargeted a warmed audience with a conversion campaign.
                  </p>
                  <p>
                    We continuously consulted with Jack to fully comprehend the nuances of his audience of board game fanatics, and engaged not just tabletop players, but mushroom enthusiasts and mycologists too.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Ad Localisation — video embed + text */}
      <section className="py-14 bg-muted">
        <div className="container-content mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <ScrollReveal animation="left">
              <div className="space-y-6">
                <h2 className="heading-display text-3xl md:text-4xl text-foreground">
                  Ad Localisation
                </h2>
                <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Jack's gameplay overview videos lent themselves perfectly to our video view awareness campaigns. We tested different voiceovers — US accents vs. UK accents — to connect with different audiences around the world.
                  </p>
                  <p>
                    Ultimately, <span className="text-primary font-semibold">67% of the Kickstarter crowdfunder's backers were based in the US.</span> The videos were created by <a href="https://www.chipcreative.co.uk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">Chip Creative</a>.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="right">
              <div className="overflow-hidden aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/6tKw5jaYF9w"
                  title="How To Play: Mycelia"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Social Videos — staggered images flanking copy */}
      <section className="py-14 bg-background">
        <div className="container-content mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] items-center gap-8">
            {/* Left image — shifted down */}
            <ScrollReveal animation="left">
              <div className="lg:mt-16 rounded-xl overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/d3673216-bba4-41aa-8cae-de27928544a3/Mycelia-Reels-1.jpg"
                  alt="Mycelia social media Reels"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Center copy */}
            <ScrollReveal>
              <div className="space-y-6 py-8 lg:py-0">
                <h2 className="heading-display text-3xl md:text-4xl text-foreground">
                  Social Videos
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Jack's creativity, and the ingenuity of his friends and collaborators, made Mycelia's presence at gaming conferences across the UK vibrant and exciting — which is ideal for Reels and TikToks! <span className="text-primary font-semibold">Strong organic content kept ad-procured followers engaged for the full duration of the campaign</span> and beyond, turning them from leads into investors, then into long-time fans.
                </p>
              </div>
            </ScrollReveal>

            {/* Right image — shifted up */}
            <ScrollReveal animation="right">
              <div className="lg:-mt-16 rounded-xl overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/843d3ddb-f92f-4705-80d7-a16ffa628d65/Mycelia-Reels-2.jpg"
                  alt="Mycelia social video content"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Reddit Marketing */}
      <section className="py-14 bg-muted">
        <div className="container-content mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <ScrollReveal animation="left">
              <div className="space-y-6">
                <h2 className="heading-display text-3xl md:text-4xl text-foreground">
                  Reddit Marketing
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Social aggregation platform Reddit has a thriving community of tabletop gamers. Jack's meticulous attention to detail in designing the look and feel of Mycelia captivated the subreddit. Jack's eagerness in actioning the feedback of commenters was so authentic and attentive, a community moderator made an exception to a subreddit rule which typically prohibits posts about Kickstarter projects.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="right">
              <div className="overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/544cfff8-fd59-490c-ba8f-01f87b4629db/Reddit-Marketing-Mycelia-Trapeze-Media.png"
                  alt="Mycelia Reddit marketing campaign"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-14 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-6">
              Results
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed mb-4">
              These strategies and campaigns resulted in Mycelia surpassing its £9,000 target within the first 50 minutes of the Kickstarter launching, <span className="text-primary font-semibold">ultimately raising an impressive £545,804.</span>
            </p>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed mb-10">
              The success of this project highlights the importance of meticulous campaign alignment, the synergy between physical and digital activations, and the necessity of clear goals, KPIs, and CPLs.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={0}>
              <div className="text-center space-y-2">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <AnimatedStat
                  value={10492}
                  label="backers"
                  delay={0}
                  formatValue={(v) => v.toLocaleString()}
                  size="compact"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="text-center space-y-2">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="heading-display text-4xl md:text-5xl text-primary">
                  50 mins
                </div>
                <p className="text-foreground text-base md:text-lg mt-3 font-medium">to hit funding target</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="text-center space-y-2">
                <PoundSterling className="w-8 h-8 text-primary mx-auto mb-2" />
                <AnimatedStat
                  value={545804}
                  prefix="£"
                  label="raised"
                  delay={300}
                  formatValue={(v) => v.toLocaleString()}
                  size="compact"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-14 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-12 left-12 opacity-10 rotate-180">
          <Quote className="w-32 h-32" />
        </div>
        <div className="absolute bottom-12 right-12 opacity-10">
          <Quote className="w-32 h-32" />
        </div>

        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal animation="scale">
            <h2 className="heading-display text-4xl md:text-5xl text-center mb-12">
              Testimonial
            </h2>

            <blockquote className="text-xl md:text-2xl lg:text-3xl text-center max-w-4xl mx-auto leading-relaxed italic">
              "Working with Trapeze on our Kickstarter campaign was one of the best decisions I made. Their strategy, creativity, and understanding of the tabletop gaming community were invaluable. They didn't just deliver leads — they built a genuine fan community around Mycelia."
            </blockquote>

            <cite className="block text-center mt-8 text-lg not-italic text-primary-foreground/80">
              — <span className="font-semibold text-primary-foreground">Jack Neville</span>, Creator of Mycelia
            </cite>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-4">
                  Ready to become our next success story?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Let's discuss how we can drive similar results for your brand.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" asChild>
                  <a
                    href="https://calendly.com/trapezemedia/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Discovery Call
                  </a>
                </Button>
                <Button variant="hero-outline" asChild>
                  <Link to="/case-studies">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Case Studies
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default MyceliaCaseStudy;
