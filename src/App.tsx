import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Volunteering } from "@/components/sections/Volunteering";
import { Technologies } from "@/components/sections/Technologies";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Subtle grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <main className="relative max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="opacity-0 animate-fade-in">
          <Hero />
        </div>

        {/* Main Content Grid */}
        <div className="mt-12 space-y-12">
          {/* Two column layout for Experience and Tech */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="opacity-0 animate-fade-in animate-delay-2">
                <Experience />
              </div>
              <div className="opacity-0 animate-fade-in animate-delay-3">
                <Volunteering />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 opacity-0 animate-fade-in animate-delay-4">
                <Technologies />
              </div>
            </div>
          </div>

          {/* Certifications full width */}
          <div className="opacity-0 animate-fade-in animate-delay-5">
            <Certifications />
          </div>

          {/* Contact CTA */}
          <div className="opacity-0 animate-fade-in animate-delay-6">
            <Contact />
          </div>
        </div>

        <div className="opacity-0 animate-fade-in animate-delay-6">
          <Footer />
        </div>
      </main>
    </div>
  );
}
