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
  bg: "#F5F7FA",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
  brand: "#059669",
  cardBg: "#ffffff",
  accent: "#10B981",
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
      <Body style={{ margin: 0, padding: 0, backgroundColor: base.bg }}>
        <Container style={{ margin: "32px auto", maxWidth: "600px" }}>
          {/* Card */}
          <Section
            style={{
              backgroundColor: base.cardBg,
              borderRadius: 16,
              border: `1px solid ${base.border}`,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header */}
            <Row>
              <Column
                style={{
                  padding: "24px 28px",
                  borderBottom: `4px solid ${base.accent}`,
                  textAlign: "center",
                }}
              >
                {logoUrl ? (
                  <Img src={logoUrl} width="140" height="40" alt="Dugsi Hub" />
                ) : (
                  <Heading as="h2" style={{ margin: 0, fontSize: 22, color: base.text }}>
                    Dugsi Hub — New Contact
                  </Heading>
                )}
                <Text style={{ margin: "8px 0 0", color: base.muted, fontSize: 14 }}>
                  You received a new message from your website contact form.
                </Text>
              </Column>
            </Row>

            {/* Details */}
            <Row>
              <Column style={{ padding: "20px 28px" }}>
                <Text style={{ margin: "0 0 8px", fontSize: 14, color: base.text }}>
                  <b>Name:</b> {name}
                </Text>
                <Text style={{ margin: "0 0 8px", fontSize: 14, color: base.text }}>
                  <b>Email:</b> {email}
                </Text>
                {phone && (
                  <Text style={{ margin: "0 0 8px", fontSize: 14, color: base.text }}>
                    <b>Phone:</b> {phone}
                  </Text>
                )}
                {about && (
                  <Text style={{ margin: "0 0 8px", fontSize: 14, color: base.text }}>
                    <b>About:</b> {about}
                  </Text>
                )}
              </Column>
            </Row>

            <Hr style={{ borderColor: base.border, margin: "0 28px" }} />

            {/* Message */}
            <Row>
              <Column style={{ padding: "20px 28px 24px" }}>
                <Text style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 14, color: base.text }}>
                  Message:
                </Text>
                <Text
                  style={{
                    whiteSpace: "pre-wrap",
                    color: base.text,
                    fontSize: 14,
                    lineHeight: "1.7",
                    backgroundColor: "#F9FAFB",
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: `1px solid ${base.border}`,
                  }}
                >
                  {message}
                </Text>
              </Column>
            </Row>

            <Hr style={{ borderColor: base.border, margin: "0 28px" }} />

            {/* Footer */}
            <Row>
              <Column style={{ padding: "16px 28px 20px", textAlign: "center" }}>
                <Text style={{ margin: 0, fontSize: 12, color: base.muted }}>
                  Sent from <b>{site}</b> &mdash; All rights reserved © {new Date().getFullYear()}
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
