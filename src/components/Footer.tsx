import { FishSymbol } from "lucide-react";
import { Link } from "react-router-dom";
import { footerData } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-app-green text-app-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="mr-8 mb-8 md:mb-1">
            <Link to="/" className="flex items-center gap-2">
              <FishSymbol className="size-10 text-white" />
              <span className="text-xl font-semibold">
                {footerData.brand.name}
              </span>
            </Link>
            <p className="text-app-cream text-sm mb-4">
              {footerData.brand.description}
            </p>
            <div className="flex gap-3">
              {footerData.brand.socials.map((social, index) => {
                // Gán vào biến viết hoa chữ cái đầu để JSX hiểu đúng
                const SocialIcon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    className="size-9 rounded-lg bg-white/10 flex-center hover:bg-white/2"
                  >
                    <SocialIcon className="size-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* dynamic content */}
          {footerData.sections.map((section, index) => (
            <div key={index} className="">
              <h3 className="text-lg font-semibold uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="text-app-cream hover:text-white transition-colors"
                  >
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-white/70 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/70 hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* contact */}
          <div className="">
            <h3 className="text-sm font-semibold uppercase mb-4">Contact Us</h3>
            <ul className="space-y-2">
              {footerData.contact.map((item, i) => {
                const ContactIcon = item.icon;
                return (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <ContactIcon className="size-5 text-white" />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
          <p className="text-center sm:text-left text-sm text-white/70">
            {footerData.bottom.copyright}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {footerData.bottom.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/50 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
