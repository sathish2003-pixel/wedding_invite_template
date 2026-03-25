import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-[#2C1810] pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-script text-[32px] text-[#D4A574]">
              ShaadiPage
            </Link>
            <p className="font-sans text-[14px] text-white/60 mt-2">
              Beautiful invitations for beautiful moments
            </p>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-[#25D366] text-white font-sans text-[14px] px-4 py-2 rounded-full hover:brightness-110 transition-all"
            >
              💬 Chat with us
            </a>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-sans text-[14px] font-semibold text-white/80 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Create Invite", href: "/builder" },
                { label: "Templates", href: "/#templates" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Examples", href: "/wedding/demo" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[14px] text-white/55 hover:text-[#D4A574] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans text-[14px] font-semibold text-white/80 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {["How It Works", "FAQ", "Contact Us", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <span className="font-sans text-[14px] text-white/55 hover:text-[#D4A574] transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="font-sans text-[14px] font-semibold text-white/80 uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {["Instagram", "Facebook", "Pinterest"].map((social) => (
                <span
                  key={social}
                  className="font-sans text-[14px] text-white/55 hover:text-[#D4A574] transition-colors cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#D4A574]/20 pt-6 text-center">
          <p className="font-sans text-[13px] text-white/45">
            Made with ❤️ in India 🇮🇳 · © 2025 ShaadiPage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
