// emails/ContactNotice.tsx
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

interface ContactNoticeProps {
  name: string;
  email: string;
  message: string;
  phone?: string;
  about?: string;
  site?: string;        // e.g., "dugsihub.com"
  logoUrl?: string;     // e.g., "https://yourcdn/logo.png"
}

const base = {
  bg: "#ffffff",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
  brand: "#059669",
  cardBg: "#ffffff",
};

export default function ContactNotice({
  name,
  email,
  message,
  phone,
  about,
  site = "dugsihub.com",
  logoUrl,
}: ContactNoticeProps) {
  const preview = `New contact from ${name}`;
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#F6F7F9" }}>
        <Container style={{ margin: "24px auto", maxWidth: "600px" }}>
          {/* Header */}
          <Section
            style={{
              backgroundColor: base.cardBg,
              borderRadius: 12,
              border: `1px solid ${base.border}`,
              overflow: "hidden",
            }}
          >
            <Row>
              <Column style={{ padding: "20px 24px", borderBottom: `4px solid ${base.brand}` }}>
                {logoUrl ? (
                  <Img src={logoUrl} width="140" height="40" alt="Dugsi Hub" />
                ) : (
                  <Heading as="h2" style={{ margin: 0, fontSize: 20, color: base.text }}>
                    Dugsi Hub — New Contact
                  </Heading>
                )}
                <Text style={{ margin: "6px 0 0", color: base.muted, fontSize: 14 }}>
                  You received a new message from your website contact form.
                </Text>
              </Column>
            </Row>

            {/* Details */}
            <Row>
              <Column style={{ padding: "16px 24px" }}>
                <Text style={{ margin: "0 0 6px", fontSize: 14, color: base.text }}>
                  <b>Name:</b> {name}
                </Text>
                <Text style={{ margin: "0 0 6px", fontSize: 14, color: base.text }}>
                  <b>Email:</b> {email}
                </Text>
                {phone ? (
                  <Text style={{ margin: "0 0 6px", fontSize: 14, color: base.text }}>
                    <b>Phone:</b> {phone}
                  </Text>
                ) : null}
                {about ? (
                  <Text style={{ margin: "0 0 6px", fontSize: 14, color: base.text }}>
                    <b>About:</b> {about}
                  </Text>
                ) : null}
              </Column>
            </Row>

            <Hr style={{ borderColor: base.border, margin: "0 24px" }} />

            {/* Message */}
            <Row>
              <Column style={{ padding: "16px 24px 20px" }}>
                <Text style={{ margin: "0 0 6px", fontWeight: 600, color: base.text, fontSize: 14 }}>
                  Message:
                </Text>
                <Text style={{ whiteSpace: "pre-wrap", color: base.text, fontSize: 14, lineHeight: "1.6" }}>
                  {message}
                </Text>
              </Column>
            </Row>

            <Hr style={{ borderColor: base.border, margin: "0 24px" }} />

            {/* Footer */}
            <Row>
              <Column style={{ padding: "14px 24px 18px" }}>
                <Text style={{ margin: 0, fontSize: 12, color: base.muted }}>
                  Sent from {site}
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
