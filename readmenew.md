Implement complete Authentication Integration between the Main Marketing Portal and the Dashboard.

IMPORTANT

The frontend already exists.

Do NOT modify the existing Creator Explore page or Campaign Explore page.

Create NEW routes for development and API integration.

The existing pages must remain unchanged for UI reference.

---

## OBJECTIVE

The Main Marketing Portal should become a public website where visitors can:

• Learn about ViralBridge
• Browse public creators
• Browse public campaigns
• View creator profiles
• View campaign details
• Login
• Sign Up

Once authenticated, users should remain logged in across the Marketing Portal and Dashboard.

---

## AUTHENTICATION FLOW

Use Firebase Authentication.

After successful login:

Store:

Firebase Token

User Information

Role

Refresh Token

Display logged-in state on the Main Portal.

The login session should persist after refresh.

---

## HEADER BEHAVIOUR

NOT LOGGED IN

Display:

Login

Sign Up

---

LOGGED IN

Replace Login button with:

Profile Avatar

First Name

Notification Icon

Dropdown Menu

Dropdown:

Dashboard

Profile

Settings

Logout

Display profile picture if available.

Otherwise display initials.

Example:

NC

---

## ROLE BASED DASHBOARD

Creator

Dashboard →

/creator/dashboard

Brand

Dashboard →

/brand/dashboard

Admin

Dashboard →

/admin/dashboard

---

## NEW ROUTES

Do NOT modify existing pages.

Create:

/explore/creators-v2

/explore/campaigns-v2

/creator/public/:username

/campaign/public/:campaignId

These pages will later integrate with backend APIs.

Existing pages remain untouched.

---

## PUBLIC CREATOR LIST

Display:

Profile Photo

Name

Username

Category

Followers

Engagement Rate

Location

Languages

Premium Badge

Verified Badge

Campaigns Completed

View Profile Button

Invite Creator Button

---

## VIEW PROFILE

Click:

View Profile

Navigate:

/creator/public/:username

Display:

Cover Image

Profile Picture

Bio

Categories

Languages

Followers

Engagement Rate

Completed Campaigns

Brands Worked With

Portfolio

Recent Campaigns

Social Links

Reviews

Invite Creator

---

## INVITE CREATOR

If NOT logged in:

Redirect to:

Login

After successful login:

Automatically return user to the same creator profile.

Open Invite Creator modal.

---

## PUBLIC CAMPAIGN PAGE

Create:

/campaign/public/:campaignId

Display:

Campaign Banner

Brand Logo

Campaign Title

Description

Budget

Deliverables

Platform

Deadline

Creator Requirements

Languages

Location

Skills

Apply Button

---

## APPLY NOW

If NOT logged in:

Redirect to Login.

After successful login:

Return user to:

Same Campaign

Open Apply Campaign modal automatically.

---

## LOGIN REDIRECTION

If user attempts:

Invite Creator

Apply Campaign

Save Campaign

Bookmark Creator

Message Brand

Without login:

Store intended destination.

After login:

Automatically redirect back.

Examples:

/campaign/public/123

/creator/public/neetu

Continue the original action.

---

## PUBLIC PLATFORM STATS

Homepage should display real platform statistics.

Cards:

Verified Creators

Active Brands

Live Campaigns

Campaigns Completed

Total Payouts

Cities Covered

Languages Supported

Premium Members

---

## LIVE COUNTERS

Animate numbers.

Examples:

25,000+

Verified Creators

4,200+

Brands

18,000+

Campaigns

₹8.5 Cr+

Creator Earnings

Update from backend APIs later.

---

## HOMEPAGE SECTIONS

Featured Creators

Trending Campaigns

Popular Categories

Popular Cities

Popular Languages

Success Stories

Top Brands

Testimonials

Platform Statistics

Premium Creators

---

## SEARCH EXPERIENCE

Homepage search.

Search:

Creators

Campaigns

Categories

Cities

Languages

Redirect to:

Explore pages.

---

## EMPTY STATES

If no creators:

"No creators available."

If no campaigns:

"No active campaigns."

---

## UI REQUIREMENTS

Modern SaaS Design

Responsive

Tailwind CSS

Framer Motion

Sticky Header

Animated Statistics

Skeleton Loading

Premium Cards

Smooth Page Transitions

Gradient Hero Section

Glassmorphism where appropriate

---

## BACKEND INTEGRATION READY

Prepare pages for future API integration.

Use a dedicated service layer.

Keep mock data separate from components.

Components should consume data through hooks/services.

Easy to replace mock data with APIs later.

---

## DELIVERABLES

Create:

New Routes

Authentication Integration

Protected Actions

Role-based Navigation

Public Creator Profile

Public Campaign Details

Homepage Statistics

Animated Counters

Reusable Components

State Management

Firebase Authentication Integration

Responsive UI

Do NOT modify existing Creator Explore or Campaign Explore pages.

Create separate V2 pages for development while preserving the existing UI.



===========================================================

--------------------------------------------------
LOGGED-IN USER EXPERIENCE
--------------------------------------------------

Once a user logs in, the Main Marketing Portal should immediately reflect the authenticated state without requiring them to navigate to the dashboard.

The login session should be shared across the Marketing Portal and Dashboard.

The header should dynamically update based on the user's role.

--------------------------------------------------
CREATOR HEADER
--------------------------------------------------

Replace Login and Sign Up with:

🔔 Notifications

💬 Messages

❤️ Saved Campaigns

👤 Profile Avatar

Display:

• Profile Picture (if uploaded)
• Otherwise show user's initials
• Display First Name beside the avatar

Example:

👤 Neetu ▼

Profile Dropdown:

My Dashboard

My Profile

Saved Campaigns

Messages

Notifications

Settings

Logout

The creator should feel like they are already inside the platform while browsing the public website.

--------------------------------------------------
BRAND HEADER
--------------------------------------------------

Replace Login and Sign Up with:

🔔 Notifications

❤️ Saved Creators

➕ Create Campaign

👤 Profile Avatar

Display:

• Company Logo if uploaded
• Otherwise profile image
• Otherwise company initials
• Display Company Name or User First Name

Example:

🏢 Acme Pvt Ltd ▼

Dropdown Menu:

Brand Dashboard

Company Profile

My Campaigns

Saved Creators

Notifications

Billing & Subscription

Settings

Logout

--------------------------------------------------
ADMIN HEADER
--------------------------------------------------

If an administrator logs into the Marketing Portal, display:

🔔 Notifications

🛠 Admin Dashboard

👤 Admin Avatar

Dropdown:

Dashboard

Users

Campaigns

Settings

Logout

--------------------------------------------------
GLOBAL AUTHENTICATION
--------------------------------------------------

The authenticated state should be available across every public page including:

Home

Explore Creators

Explore Campaigns

Pricing

Creator Profile

Campaign Details

About

Contact

Footer Pages

The header should never revert back to Login / Sign Up while the user is authenticated.

--------------------------------------------------
PROTECTED ACTIONS
--------------------------------------------------

When a logged-in user performs actions on the public website, they should remain on the same page.

Examples:

Creator:

Apply to Campaign

Save Campaign

Message Brand

View Dashboard

Brand:

Invite Creator

Save Creator

Create Campaign

Message Creator

No unnecessary redirects should occur.

--------------------------------------------------
USER MENU DESIGN
--------------------------------------------------

Create a modern dropdown menu similar to LinkedIn, Fiverr, Upwork, or Airbnb.

Include:

Profile Card

Profile Image

Name

Role Badge

Email

Quick Actions

Navigation Links

Logout Button

Use smooth animations.

Close when clicking outside.

Support keyboard navigation.

--------------------------------------------------
PROFILE DISPLAY
--------------------------------------------------

Avatar Priority:

1. Profile Picture
2. Company Logo (Brand)
3. Initials with colored background

Display role badges such as:

✔ Verified Creator

👑 Premium Creator

🏢 Premium Brand

⭐ Verified Brand

These badges should also appear inside the dropdown menu.

so check this an dcreate it but make sure deisgn and fucnioanlity shuod not be bronken