import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import {
  SiGithub,
  SiLinkedin,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/assets/uploads/nexxtexh-1-1.jpeg"
                alt="NexXTechs"
                className="h-9 object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The premier platform for IT professionals to learn, grow, and
              advance their careers with industry-leading courses.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://wa.me/919217179762"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <SiGithub className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Learn
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/courses", label: "All Courses" },
                { href: "/courses", label: "Web Development" },
                { href: "/courses", label: "AI & Machine Learning" },
                { href: "/courses", label: "Cybersecurity" },
                { href: "/courses", label: "Cloud & DevOps" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/instructors", label: "Instructors" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/", label: "Pricing" },
                { href: "/", label: "Certificates" },
                { href: "/", label: "Community" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                  B 54, First Floor,
                  <br />
                  New Krishna Park,
                  <br />
                  Vikaspuri, Janakpuri,
                  <br />
                  Near Janakpuri West Metro Station
                  <br />
                  Pin Code: 110058
                </address>
              </div>
              {/* Phone / WhatsApp numbers */}
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="https://wa.me/919217179762"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <SiWhatsapp className="h-3.5 w-3.5 text-green-500" />
                    +91 9217179762
                  </a>
                  <a
                    href="https://wa.me/919217179764"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <SiWhatsapp className="h-3.5 w-3.5 text-green-500" />
                    +91 9217179764
                  </a>
                </div>
              </div>
              {/* Collaboration */}
              <p className="text-xs text-muted-foreground pt-1">
                In collaboration with{" "}
                <span className="text-primary font-semibold">
                  CyberHooks Institute
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} NexXTechs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with <span className="text-red-400">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
