// emails/ContactReceipt.tsx
import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Hr,
  Img,
  Heading,
} from "@react-email/components";

interface ContactReceiptProps {
  name: string;
  message: string;
  site?: string;        // e.g., "Dugsi Hub"
  siteUrl?: string;     // e.g., "https://dugsihubcom.vercel.app"
  logoUrl?: string;
}

const base = {
  bg: "#ffffff",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
  brand: "#059669",
  link: "#059669",
};

export default function ContactReceipt({
  name,
  message,
  site = "Dugsi Hub",
  siteUrl = "https://dugsihubcom.vercel.app",
  logoUrl,
}: ContactReceiptProps) {
  const preview = `Thanks, ${name}! We received your message.`;
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#F6F7F9" }}>
        <Container style={{ margin: "24px auto", maxWidth: "600px" }}>
          <Section
            style={{
              backgroundColor: base.bg,
              borderRadius: 12,
              border: `1px solid ${base.border}`,
              overflow: "hidden",
            }}
          >
            <Row>
              <Column style={{ padding: "20px 24px", borderBottom: `4px solid ${base.brand}` }}>
                {logoUrl ? (
                  <Img src={logoUrl} width="140" height="40" alt={site} />
                ) : (
                  <Heading as="h2" style={{ margin: 0, fontSize: 20, color: base.text }}>
                    {site}
                  </Heading>
                )}
                <Text style={{ margin: "6px 0 0", color: base.muted, fontSize: 14 }}>
                  We’ve received your message — thanks!
                </Text>
              </Column>
            </Row>

            <Row>
              <Column style={{ padding: "16px 24px" }}>
                <Text style={{ margin: "0 0 8px", color: base.text, fontSize: 14 }}>
                  Hi {name},
                </Text>
                <Text style={{ margin: "0 0 12px", color: base.text, fontSize: 14, lineHeight: "1.6" }}>
                  Thanks for contacting us. Our team will reply within <b>24–48 hours</b>.
                </Text>

                <Text style={{ margin: "0 0 6px", fontWeight: 600, color: base.text, fontSize: 14 }}>
                  Your message:
                </Text>
                <Text style={{ whiteSpace: "pre-wrap", color: base.text, fontSize: 14, lineHeight: "1.6" }}>
                  {message}
                </Text>
              </Column>
            </Row>

            <Hr style={{ borderColor: base.border, margin: "0 24px" }} />

            <Row>
              <Column style={{ padding: "14px 24px 18px" }}>
                <Text style={{ margin: 0, fontSize: 14 }}>
                  — {site} •{" "}
                  <a href={siteUrl} style={{ color: base.link, textDecoration: "none" }}>
                    Visit site
                  </a>
                </Text>
                <Text style={{ margin: "6px 0 0", fontSize: 12, color: base.muted }}>
                  Please don’t reply to this automated receipt.
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
