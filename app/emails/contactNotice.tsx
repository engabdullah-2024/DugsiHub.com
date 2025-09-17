// emails/ContactNotice.tsx
import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
} from "@react-email/components";

export default function ContactNotice(props: {
  name: string;
  email: string;
  phone?: string;
  about?: string;
  message: string;
  site?: string; // e.g., dugsihub.com
}) {
  const { name, email, phone, about, message, site = "your-site.com" } = props;

  return (
    <Html>
      <Head />
      <Preview>New contact message from {name}</Preview>
      <Body
        style={{
          background: "#f6f7f9",
          margin: 0,
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <Container
          style={{
            margin: "24px auto",
            padding: "24px",
            background: "#ffffff",
            borderRadius: 12,
            maxWidth: 580,
          }}
        >
          <Heading style={{ margin: 0, marginBottom: 8 }}>
            Dugsi Hub — New Contact
          </Heading>
          <Text style={{ color: "#334155", marginTop: 0 }}>
            You received a new message from your contact form.
          </Text>

          <Section>
            <Text>
              <b>Name:</b> {name}
            </Text>
            <Text>
              <b>Email:</b> {email}
            </Text>
            {phone ? (
              <Text>
                <b>Phone:</b> {phone}
              </Text>
            ) : null}
            {about ? (
              <Text>
                <b>About:</b> {about}
              </Text>
            ) : null}
          </Section>

          <Hr />
          <Section>
            <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
          </Section>
          <Hr />

          <Text style={{ color: "#64748b", fontSize: 12 }}>
            Sent from {site}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
