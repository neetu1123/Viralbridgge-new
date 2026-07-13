Implement a complete "Discover Creators" experience for the ViralBridge frontend.

IMPORTANT

Do NOT implement backend APIs.

Use mock data/static JSON for now.

Focus only on UI/UX, routing, filtering, responsiveness, animations, and page structure.

---

PURPOSE

The footer should help visitors discover creators based on different categories, similar to large creator marketplaces.

Instead of showing only a few footer links, create a scalable discovery experience.

---

FOOTER

Add a new section:

Explore Creators

Links:

Creators by City

Creators by Language

Creators by Category

Creators by Platform

Premium Creators

View All Creators

Each item navigates to its own page.

---

PAGES

Create these routes:

/discover

/discover/city

/discover/language

/discover/category

/discover/platform

/discover/premium

---

VIEW ALL PAGE

Route:

/discover

This page acts as the central discovery hub.

Layout:

Large Hero Section

Search Bar

Popular Categories

Featured Creators

Trending Cities

Popular Languages

Platform Cards

Creator Grid

Modern Filter Sidebar

Responsive Design

---

CITY PAGE

Route:

/discover/city

Hero:

"Find Influencers by City"

Show cards such as:

Delhi

Mumbai

Bangalore

Hyderabad

Pune

Ahmedabad

Chennai

Kolkata

Clicking a city filters the creator grid.

---

LANGUAGE PAGE

Route:

/discover/language

Hero:

"Discover Creators by Language"

Cards:

Hindi

English

Tamil

Telugu

Malayalam

Kannada

Punjabi

Gujarati

Marathi

---

CATEGORY PAGE

Route:

/discover/category

Cards:

Technology

Gaming

Fashion

Beauty

Travel

Fitness

Food

Education

Business

Lifestyle

---

PLATFORM PAGE

Route:

/discover/platform

Cards:

Instagram

YouTube

LinkedIn

Facebook

TikTok

Twitter (X)

---

PREMIUM PAGE

Route:

/discover/premium

Hero:

Premium Verified Creators

Display premium creator cards.

Each card should have:

Premium Badge

Verified Badge

Followers

Engagement Rate

Languages

Location

Categories

Starting Price

View Profile

---

FILTER SIDEBAR

Collapsible on mobile.

Filters:

Search

City

Language

Category

Platform

Followers

Price Range

Verified

Premium

Availability

---

SORT OPTIONS

Most Popular

Highest Followers

Highest Engagement

Newest

Recommended

---

CREATOR CARD

Modern premium UI.

Include:

Profile Image

Creator Name

Username

Followers

Engagement Rate

Languages

Location

Category Chips

Verified Badge

Premium Badge

Starting From ₹XXXX

View Profile Button

---

EMPTY STATE

If no creators found:

Illustration

"No creators match your filters."

Reset Filters Button

---

RESPONSIVE

Desktop

Tablet

Mobile

---

UI REQUIREMENTS

Use:

Modern Card Layout

Tailwind CSS

Smooth Hover Effects

Skeleton Loaders

Framer Motion Animations

Sticky Filter Sidebar

Responsive Grid

Clean White Space

Glassmorphism (optional)

Premium SaaS Design

Do NOT build backend APIs.

Use mock data only.

Focus on creating a polished, premium discovery experience.




Implement a complete Premium Membership experience for ViralBridge.

IMPORTANT

Frontend only.

Do NOT implement backend APIs.

Use mock data.

---

PURPOSE

Allow Brands and Creators to explore and compare subscription plans before purchasing.

---

NEW ROUTE

/pricing

---

HEADER

Title

Choose the Perfect Plan

Subtitle

Unlock premium tools to grow faster with ViralBridge.

---

PLAN TOGGLE

Monthly

Yearly

Show yearly savings.

---

SECTIONS

Creator Plans

Brand Plans

Users can switch between them using tabs.

---

CREATOR PLANS

FREE

STARTER

PRO

PREMIUM

ENTERPRISE

---

BRAND PLANS

FREE

STARTER

PRO

PREMIUM

ENTERPRISE

---

PLAN CARD DESIGN

Each card should include:

Plan Name

Price

Short Description

Feature List

Recommended Badge

Current Plan Badge

Upgrade Button

Compare Features Link

Hover Animation

---

FEATURE COMPARISON TABLE

Rows:

Campaign Applications

Creator Invitations

Analytics

Priority Support

Premium Badge

Verified Badge

Team Members

Advanced Filters

Campaign Insights

Featured Listing

Unlimited Campaigns

Unlimited Applications

---

POPULAR PLAN

Highlight the PRO plan.

Add:

Most Popular Badge

Different background

Glow effect

---

ENTERPRISE

Instead of Buy Now:

Show:

Contact Sales

---

PLAN DETAILS MODAL

Clicking "Compare Features" opens a modal with detailed plan comparison.

---

UPGRADE FLOW (UI ONLY)

Click Upgrade

↓

Confirmation Modal

↓

Success Screen

Mock only.

---

PREMIUM BADGES

Show examples:

Premium Creator

Premium Brand

Throughout the UI.

---

FAQ SECTION

Who should choose Starter?

Who should choose Premium?

Can I upgrade later?

Can I cancel anytime?

---

TESTIMONIAL SECTION

Display sample customer testimonials.

---

RESPONSIVE

Desktop

Tablet

Mobile

---

DESIGN

Modern SaaS pricing page.

Inspired by Stripe, Notion, Framer, Vercel, and Linear.

Use:

Tailwind CSS

Framer Motion

Clean spacing

Gradient backgrounds

Premium UI

Glass cards

Subtle animations

Use mock data only.

Do not implement payment integration or backend APIs.
