import { MessageSquare, Phone } from "lucide-react";
import {
  blackFridayCopy,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  STUDIO_SMS_HREF,
} from "../../lib/blackFridayCampaign";

/** Fallback claim path: tap-to-text and tap-to-call using the studio's existing number. */
export default function HelpLinks() {
  return (
    <div className="bf-help">
      <p className="bf-help__text">{blackFridayCopy.help}</p>
      <div className="bf-help__links">
        <a href={STUDIO_SMS_HREF} className="bf-help__link">
          <MessageSquare size={15} aria-hidden /> Text {PHONE_DISPLAY}
        </a>
        <a href={PHONE_TEL_HREF} className="bf-help__link">
          <Phone size={15} aria-hidden /> Call {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
