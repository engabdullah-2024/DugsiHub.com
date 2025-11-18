'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  BadgeCheck,
  Users,
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  Handshake,
  Linkedin,
  Globe,
  Youtube,
} from 'lucide-react';

// ——— tiny helpers ———
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

export default function MentorPage() {
  // >>> You can edit this data easily <<<
  const mentor = {
    name: 'Abdalla Ali Nor',
    title: 'Lead Software Engineer & Founder',
    avatar: '/eng.jpg', // put your image path here
    about:
      "My name is Abdullah Ali, a programmer with 1+ years of experience and 1 years as an online instructor. I'm the founder of Dugsi Hub, an eLearning platform for IT and programming, and Imagingface, a SaaS platform that uses AI to generate high-quality images. Over the years, I’ve mentored students worldwide, many of whom have become skilled developers and instructors. Now in my second year of running a structured mentorship program, my mission is to train world-class developers who can make a real impact in the industry.",
    stats: [
      { icon: Users, label: 'Students', value: '500+' },
      { icon: Briefcase, label: 'Experience', value: '1+yrs' },
      { icon: Star, label: 'Rating', value: '4.9' },
      { icon: CheckCircle2, label: 'Success Rate', value: '98%' },
    ],
    features: [
      { icon: Handshake, text: 'Hands-on Projects' },
      { icon: Clock, text: 'Weekly Live Meetings' },
      { icon: CheckCircle2, text: 'On-Demand Assistance' },
    ],
    highlights: [
      {
        title: 'Lead Instructor',
        desc: 'Aasaasay shirkado startups ah oo ay ka mid yihiin Dugsi Hub iyo Saasify',
      },
      {
        title: 'Industry Expert',
        desc: 'Leh in ka badan 1 sano oo khibrad hands-on software development ah',
      },
      {
        title: 'Community Builder',
        desc: 'Dhisay community weyn oo Somali developers ah oo ku nool wadamada kala duwan',
      },
    ],
    socials: [
      { icon: Globe, href: 'https://dugsihub.com' },
      { icon: Linkedin, href: 'https://www.linkedin.com' },
      { icon: Youtube, href: 'https://www.youtube.com' },
    ],
    ctaWhatsApp: 'https://wa.me/252613169435',
    ctaPortfolio: 'https://eng-abdalla-portfolio.vercel.app/',
  };

  return (
    <motion.main
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14"
      {...fade()}
    >
      {/* GRID: left profile / right about */}
      <div className="grid gap-6 md:grid-cols-[360px_1fr]">
        {/* LEFT: profile card */}
        <motion.div {...fade(0.05)}>
          <Card className="rounded-2xl border-slate-200/70 shadow-sm dark:border-slate-800">
            <CardContent className="p-6">
              {/* Photo */}
              <div className="relative mx-auto h-[220px] w-[220px] overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                <Image
                  src={mentor.avatar}
                  alt={mentor.name}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>

              {/* Name + title */}
              <div className="mt-5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <h1 className="text-xl font-bold tracking-tight">
                    {mentor.name}
                  </h1>
                  <Badge variant="secondary" className="gap-1">
                    <BadgeCheck className="h-4 w-4" />
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mentor.title}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {mentor.stats.map((s, i) => (
                  <StatCard key={i} icon={s.icon} value={s.value} label={s.label} />
                ))}
              </div>

              {/* Socials */}
              <Separator className="my-6" />
              <div className="flex items-center justify-center gap-3">
                {mentor.socials.map((s, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    asChild
                  >
                    <a href={s.href} target="_blank" rel="noreferrer">
                      <s.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Button asChild className="rounded-xl">
                  <a href={mentor.ctaWhatsApp} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <a href={mentor.ctaPortfolio} target="_blank" rel="noreferrer">
                    Portfolio
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT: about + feature pills + highlight cards */}
        <div className="space-y-6">
          {/* About card */}
          <motion.div {...fade(0.1)}>
            <Card className="rounded-2xl border-slate-200/70 shadow-sm dark:border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">About Your Mentor</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm leading-6 text-muted-foreground">
                  {mentor.about}
                </p>

                {/* Feature pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.features.map((f, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="gap-1 rounded-full px-2.5 py-1 text-[12px]"
                    >
                      <f.icon className="h-3.5 w-3.5" />
                      {f.text}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Highlights */}
          <motion.div className="grid gap-4 md:grid-cols-2" {...fade(0.15)}>
            {/* 1st column (two stacked) */}
            <div className="space-y-4">
              <HighlightCard
                title={mentor.highlights[0].title}
                desc={mentor.highlights[0].desc}
              />
              <HighlightCard
                title={mentor.highlights[1].title}
                desc={mentor.highlights[1].desc}
              />
            </div>

            {/* 2nd column (single tall) */}
            <HighlightCard
              title={mentor.highlights[2].title}
              desc={mentor.highlights[2].desc}
              tall
            />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}

/* ——— subcomponents ——— */

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <Card className="rounded-xl border border-emerald-200/60 bg-emerald-50 text-emerald-900 shadow-none dark:border-emerald-400/20 dark:bg-emerald-950/40 dark:text-emerald-100">
      <CardContent className="flex items-center gap-3 p-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/70 ring-1 ring-emerald-200 dark:bg-transparent dark:ring-emerald-700/40">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div>
          <div className="text-sm font-semibold leading-none">{value}</div>
          <div className="mt-0.5 text-[11px] text-emerald-800/80 dark:text-emerald-100/80">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HighlightCard({
  title,
  desc,
  tall = false,
}: {
  title: string;
  desc: string;
  tall?: boolean;
}) {
  return (
    <Card
      className={`rounded-2xl border-slate-200/70 shadow-sm dark:border-slate-800 ${
        tall ? 'md:h-full' : ''
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
