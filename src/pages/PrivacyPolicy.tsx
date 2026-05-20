import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | Trapeze Media</title>
        <meta
          name="description"
          content="How Trapeze Media collects, uses, stores, and protects your personal information."
        />
        <link rel="canonical" href="https://trapezemedia.co.uk/privacy-policy" />
      </Helmet>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="heading-display text-5xl md:text-6xl text-primary mb-12 text-center">
              Privacy Policy
            </h1>

            <div className="space-y-8 text-base md:text-lg text-foreground/90 leading-relaxed [&_a]:text-primary [&_a]:underline [&_a:hover]:no-underline">
              <p>
                Mentions of ‘us’, ‘our’, or ‘we’ refer to{" "}
                <a href="https://trapezemedia.co.uk/">https://trapezemedia.co.uk</a>{" "}
                (inclusive of other access points and domain names or redirects,
                e.g. https://trapezemedia.com). Mentions of ‘you’ or ‘your’ refer
                to you, the visitor to this website, located at
                https://trapezemedia.co.uk. ‘Personal information’ refers to
                information which would identify you, or from which you can be
                identified. It is important to us at Trapeze Media to protect
                your personal information, so we don’t give it away or sell it,
                and we have systems in place to protect it.
              </p>

              <h2 className="heading-display text-3xl md:text-4xl text-foreground pt-4">
                Collection.
              </h2>
              <p>
                We collect personal information about you when you give it to us
                — usually when you fill in, complete, and submit an online form
                embedded in our website.
              </p>
              <p>
                We may also use ‘cookies’ — small pieces of data sent from
                websites to visitors’ computers via the web browser through
                which a visitor is accessing a website — so that upon return
                visits, any customizations you made to tailor our website for
                your own personal use will be maintained and remain consistent
                until such a time when you clear (delete) your browser cookies
                or use a different device (which isn’t synced via cloud services
                to your original device) to access our website. A cookie could
                track the information that you access online, and affect the
                display of advertisements on our website to reflect your
                preferences. Cookies do not necessarily collect information
                which can identify who you are — their purpose is more focused
                on building a profile of what you like. You have the freedom to
                change your browser settings or use anti-virus software to limit
                the ability of cookies to track your Internet usage. Should you
                wish to find our more about cookies,{" "}
                <a
                  href="https://en.wikipedia.org/wiki/HTTP_cookie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clicking here to read the related Wikipedia article
                </a>{" "}
                could be a good starting point. There is also{" "}
                <a
                  href="https://simple.wikipedia.org/wiki/HTTP_cookie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  a ‘Simple English Wikipedia’ entry on cookies
                </a>{" "}
                which is less dense in its technical language.
              </p>

              <h2 className="heading-display text-3xl md:text-4xl text-foreground pt-4">
                Use.
              </h2>
              <p>
                We use your personal information in an effort to tailor your
                experience of our products, services, and information
                specifically for you. We want to offer you products, services,
                and information that you want, not things you have little or no
                interest in.
              </p>

              <h2 className="heading-display text-3xl md:text-4xl text-foreground pt-4">
                Disclosure.
              </h2>
              <p>
                We don’t, wouldn’t, and won’t give away, share, or sell your
                personal information. We will disclose your personal information
                if we are legally compelled to do so, or need to provide
                instruction to our professional advisors. In some cases, we may
                use another provider to deliver our products or services to you,
                and occasionally, they may require your personal information to
                complete the delivery process of those products or services. We
                will always require for them to use your data for that sole
                purpose, and then destroy it.
              </p>

              <h2 className="heading-display text-3xl md:text-4xl text-foreground pt-4">
                Storage Overseas
              </h2>
              <p>
                We may change the host of the Trapeze Media website on occasion,
                in accordance with our requirements. This may mean that the
                information collected through our website ends up being hosted
                overseas. We strive to use reputable companies who have
                appropriate information protection policies to host this
                website.
              </p>

              <h2 className="heading-display text-3xl md:text-4xl text-foreground pt-4">
                Links and public forums.
              </h2>
              <p>
                We have no control over the information accessed through links
                from our site to external Internet locations. Please remain
                aware and vigilant that you use external links at your own risk.
                If you post your personal information in a public forum or any
                external Internet location outside of https://trapezemedia.co.uk
                and its pages (identified by{" "}
                <a
                  href="https://trapezemedia.co.uk/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  our sitemap
                </a>
                ), we have no control over how it is used, and have no
                responsibility to protect it for you.
              </p>

              <h2 className="heading-display text-3xl md:text-4xl text-foreground pt-4">
                Update.
              </h2>
              <p>
                We use a third-party automatic response system to manage our
                mailing and subscriber lists. You have the freedom to update
                your details as a subscriber via the links sent in any email we
                send you.
              </p>

              <h2 className="heading-display text-3xl md:text-4xl text-foreground pt-4">
                Feedback.
              </h2>
              <p>
                Any concerns, feedback, or queries regarding the way we manage
                your personal information should be directed to{" "}
                <a href="mailto:info@trapezemedia.co.uk">
                  info@trapezemedia.co.uk
                </a>
                . We will take action to fix any problems, within reason and at
                our discretion. We may update this policy from time to time, to
                meet potential changes to our legal obligations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;