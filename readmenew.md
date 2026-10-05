"/analytics/campaigns in this route i need to refix the flow i need new nav item siddebar whihc should be my campign herer hsoudb be have the whihc shoud be new page andd which have have "brand-campaign-management and nav sidevbar name is my ccampign it shdou be dashboard so i wnat my campign for brand and for cretaor where in the brand they have theior own campign whihc is running active and leated kind of and for crateo they haev campiggn for whihc they requrest approved pening like that so i want this flow and also "/analytics/campaigns" whn user goes and click view my ccampign  then it shdou be direct naviuaget to their anlytics page not in teh my campign  so fix this flow and 

now comes to next page when i rasie issue thn i am not able to raise issuefor brand becasue how nca i raise issue when i raising issue to go to the paeg for dispute the where i ahev oiption for raise button and whn i click the and write then click submit dispute then hsoieng creator required and for creator brand reuiqrmed so where in this also have the all this and also another option or other filed so then can raise any issue 


now ccomes to nxt for "/brand-deliverables this page i also wnat the card form and when i clcik then it will sho me make it more user fieldly adn also stutured and user na understand easily and they can be able to download the image video and anyhting  nnot able to open image because where tehn can save image 

when i go to user profile for creattoiar and filed the "Handle / Username" this filed with @ thtten saved tehn it removed @ so it shiud not be working like that if i add @ then thier thsoud be thier after saving 



ViralBridge Support System --- Frontend & Backend Implementation Specification

1. Purpose

This document converts the uploaded Viralbridge Support System
requirements into a development-ready specification for the existing
ViralBridge application.

The source requires separate Brand and Creator support experiences, a
reusable support-flow component, database-aware solutions, and an Admin
case/chat handoff so users do not need to repeat their problem.
fileciteturn1file0L531-L563

2. Core Flow

Get Help
  ↓
Identify User Type
  ↓
Brand / Creator
  ↓
Main Categories
  ↓
Subcategory
  ↓
Specific Issue
  ↓
Check Relevant Database Information
  ↓
Show Solution / Action
  ↓
Did this solve the problem?
  ├── Yes → Close
  └── No  → Create Support Case
                    ↓
                 Admin Chat
                    ↓
                 Resolution

Do NOT build hundreds of hard-coded pages. Build one reusable,
configuration/data-driven Support Flow component. This is a central
requirement in the source. fileciteturn1file0L531-L563

3. Roles

Brand

Brand support categories:

My Account

Campaigns

Creators

Applications

Content & Deliverables

Payments & Billing

Messaging

Technical Issues

Report a Problem

Something Else

These categories are defined in the source.
fileciteturn1file0L10-L25

Creator

Creator support categories:

My Profile

Find Campaigns

Campaign Applications

Campaign Invitations

My Campaigns

Content & Deliverables

Payments & Earnings

Messaging

Technical Issues

Report a Problem

Something Else

These categories are defined in the source.
fileciteturn1file0L316-L333

Admin

Admin manages support cases, assignments, messages, notes, priority,
status, attachments, related platform records, and resolution.

4. Frontend Routes

Use Next.js routes:

/support
/support/category/[categoryId]
/support/issue/[issueId]
/support/case/[caseId]
/support/chat/[caseId]

/admin/support
/admin/support/[caseId]

The authenticated user's role determines the support tree.

5. Get Help UI

Both Brand and Creator must have a Get Help entry point.
fileciteturn1file0L3-L9

Desktop layout:

ViralBridge Support
Hi! What can we help you with today?

[ Search for help... ]

[ My Account ] [ Campaigns ] [ Creators ]
[ Payments  ] [ Messaging ] [ Technical ]

Can't find what you need?
[ Chat with Admin ]

Mobile:

Full-screen support page

Back button

Search

Category cards

Breadcrumbs

Sticky Chat with Admin action

6. Search

Support search should search:

Category

Subcategory

Issue title

Keywords

Solution text

Example searches:

payment
campaign stuck
Instagram
withdrawal
creator not responding
upload failed

7. Brand Support Tree

My Account

Profile & Business Information

Account Settings

Login / Password

Verification

Social Media Connections

Account Status

Close Account

Something Else

Profile issues:

Edit Business Information

Business Information Is Incorrect

Profile Isn't Displaying Correctly

Profile Verification

Other

Login issues:

Forgot Password

Can't Log In

Password Reset Not Working

Email / Account Access Issue

Other

Verification:

Verification Pending

Verification Failed

Update Verification Information

Verification Question

Social:

Connect Social Account

Social Account Won't Connect

Wrong Account Connected

Metrics Not Updating

Disconnect Account

Other

Account Status:

Account Suspended

Account Restricted

Account Review

Other

The source defines these flows and actions.
fileciteturn1file0L26-L89

Campaigns

Issues:

Create a Campaign

Edit a Campaign

Campaign Not Showing

Campaign Status

Campaign Budget

Campaign Requirements

Campaign Dates

Campaign Cancellation

Campaign Completion

Campaign Performance

Other

Campaign status should inspect actual campaign state/database
information. If recoverable, offer refresh/recalculation; if
inconsistent, create an Admin case. fileciteturn1file0L90-L146

Creators

Find Creators

Creator Profiles

Invite a Creator

Creator Selection

Creator Isn't Responding

Creator Performance

Report a Creator

Other

For creator recommendations, show the relevant creator
discovery/recommendation action. fileciteturn1file0L157-L176

Applications

View Applications

Application Status

Approve Application

Decline Application

Application Not Showing

Application Issue

Other

For Application Not Showing, check:

campaign active?
application exists?
creator eligible?
application status?

Return the actual state rather than a generic answer.
fileciteturn1file0L185-L199

Content & Deliverables

Deliverable Requirements

Content Submission

Content Review

Request Revision

Approve Content

Content Deadline

Content Doesn't Meet Requirements

Other

Technical issues:

Content Missing

Content Won't Load

Upload Failed

Wrong Content Submitted

Submission Status Incorrect

fileciteturn1file0L200-L223

Payments & Billing

Payment Status

Campaign Payment

Payment Amount

Billing

Fees

Refund

Payment Method

Payment Dispute

Other

Payment Status should query actual transactions and show the user their
real payment state. fileciteturn1file0L224-L249

Payment disputes collect:

Campaign

Creator

Payment

Amount

Reason

Description

Attachments

Then create an Admin case. fileciteturn1file0L250-L260

Messaging

Can't Send Message

Can't Receive Message

Chat Not Loading

Message Was Blocked

Report a Message

Communication With Creator

Other

Report types:

Spam

Harassment

Inappropriate Content

Contact Information

Attempt to Move Off-Platform

Suspicious Activity

Collect description and optional screenshot, then create a moderation
case. fileciteturn1file0L261-L278

Technical Issues

Collect:

Description

Screenshot

Current page

Campaign ID

Browser/device

Timestamp

Error information

Create a Technical Support Case. fileciteturn1file0L280-L298

Report a Problem

Report a Creator

Fraud / Scam

Harassment

Inappropriate Behavior

Campaign Violation

Off-Platform Communication

Payment Manipulation

Other

Collect evidence and create an Admin moderation case.
fileciteturn1file0L299-L310

Something Else

Show:

Can't find what you're looking for? Tell us what you need help with.

Use a text box and provide Chat with Admin.
fileciteturn1file0L311-L315

8. Creator Support Tree

Creator support must remain separate from Brand support because their
problems and available actions differ. fileciteturn1file0L8-L9

My Profile

Edit Profile

Profile Information

Social Media Accounts

Social Metrics

Verification

Profile Visibility

Account Status

Login / Password

Other

Social account issues:

Connect Social Account

Account Won't Connect

Wrong Account Connected

Metrics Not Updating

Disconnect Account

Other

fileciteturn1file0L334-L352

Find Campaigns

Find Campaigns

Campaign Search

Campaign Doesn't Appear

Campaign Eligibility

Campaign Requirements

Campaign Budget

Other

Eligibility must be database-driven.

Example:

You're currently not eligible for this campaign because it requires at
least 10,000 Instagram followers. Your connected account currently
shows 7,850 followers.

Actions:

View Requirements

Browse Other Campaigns

Chat with Admin

fileciteturn1file0L353-L371

Campaign Applications

Apply to a Campaign

Application Status

Withdraw Application

Application Not Showing

Can't Apply

Other

Actual statuses:

Pending
Approved
Declined
Withdrawn
Expired

fileciteturn1file0L372-L387

Campaign Invitations

I Received an Invitation

Accept Invitation

Decline Invitation

Invitation Expired

Can't Accept Invitation

Invitation Details

Accept flow:

Show campaign details
→ Confirm acceptance
→ Update campaign/application
→ Notify Brand

fileciteturn1file0L388-L400

My Campaigns

Campaign Details

Campaign Timeline

Campaign Requirements

Campaign Status

Campaign Changes

Brand Isn't Responding

Campaign Cancellation

Campaign Completion

For Brand Isn't Responding:

Send Reminder
→ Wait
→ Chat with Admin if still unresolved

fileciteturn1file0L401-L422

Content & Deliverables

Deliverable Requirements

Submit Content

Upload Problem

Content Approval

Revision Request

Content Deadline

Posting Requirements

Content Approval:

Waiting for Approval

Content Was Rejected

I Don't Understand the Rejection

Brand Requested Changes

Approval Taking Too Long

The system should pull actual campaign/content status.
fileciteturn1file0L423-L440

Payments & Earnings

Payment Status

Payment Not Received

Incorrect Payment Amount

Earnings Not Showing

Payment Method

Withdrawal Issue

Fees

Payment Dispute

Other

Display payment lifecycle:

Campaign Approved ✓
Content Submitted ✓
Brand Approved ✓
Payment Processing ●
Payment Released ○
Paid ○

Check:

Campaign

Payment status

Approval

Payment transaction

Payment method

Escalate to Admin if investigation is required.
fileciteturn1file0L441-L470

Messaging

Can't Send Message

Can't Receive Message

Chat Not Loading

Message Was Blocked

Report a Message

Communication With Brand

Other

Report:

Spam

Harassment

Inappropriate Content

Contact Information

Attempt to Move Off-Platform

Suspicious Activity

fileciteturn1file0L471-L488

Technical Issues

Collect:

Description

Screenshot

Creator ID

Current page

Campaign ID

Browser/device

Timestamp

Error information

The source requires automatic contextual information where available.
fileciteturn1file0L489-L511

Report a Problem

Report a Brand

Brand Isn't Following Requirements

Payment Issue

Harassment

Inappropriate Behavior

Fraud / Scam

Off-Platform Communication

Campaign Violation

Other

Collect description and evidence, then create Admin review.
fileciteturn1file0L512-L525

Something Else

Show a free-text question field and Chat with Admin.
fileciteturn1file0L526-L530

9. Frontend Components

Create reusable components:

SupportHome
SupportSearch
SupportCategoryCard
SupportCategoryGrid
SupportBreadcrumb
SupportIssueList
SupportIssueCard
SupportSolution
SupportActionButton
SupportResolutionPrompt
SupportCaseForm
SupportCaseList
SupportCaseDetail
SupportChat
SupportMessage
SupportAttachment
SupportTimeline
SupportStatusBadge
SupportPriorityBadge
AdminSupportTable
AdminSupportFilters

Use existing ViralBridge design system, Tailwind CSS, responsive
layouts, loading states, empty states, error states, and accessible
keyboard navigation.

10. Database Design

Use Prisma/PostgreSQL.

Recommended entities:

support_categories
support_subcategories
support_issues
support_solutions
support_actions
support_cases
support_case_messages
support_case_attachments
support_case_notes
support_case_events
support_assignments

SupportCategory

id
role
name
slug
description
icon
sortOrder
isActive
createdAt
updatedAt

SupportSubcategory

id
categoryId
name
slug
description
sortOrder
isActive
createdAt
updatedAt

SupportIssue

id
subcategoryId
title
slug
description
keywords
solution
actionType
requiresAdmin
priority
caseType
isActive
createdAt
updatedAt

SupportCase

id
caseNumber
userId
userRole
categoryId
subcategoryId
issueId
caseType
priority
status
subject
description
campaignId
paymentId
transactionId
assignedAdminId
createdAt
updatedAt
resolvedAt

SupportCaseMessage

id
caseId
senderId
senderRole
message
createdAt
readAt

SupportCaseAttachment

id
caseId
uploadedBy
fileName
fileUrl
mimeType
fileSize
createdAt

SupportCaseNote

id
caseId
adminId
note
createdAt
updatedAt

SupportCaseEvent

id
caseId
actorId
eventType
oldValue
newValue
metadata
createdAt

11. Statuses

Case statuses:

OPEN
IN_PROGRESS
WAITING_FOR_USER
WAITING_FOR_ADMIN
RESOLVED
CLOSED
REOPENED

Priorities:

LOW
MEDIUM
HIGH
URGENT

Case types:

GENERAL_SUPPORT
TECHNICAL
PAYMENT
PAYMENT_DISPUTE
CAMPAIGN
CONTENT
MODERATION
ACCOUNT
KYC
WITHDRAWAL
FRAUD
SAFETY

12. API Design

Support tree

GET /support/categories
GET /support/categories/:categoryId
GET /support/subcategories/:subcategoryId
GET /support/issues/:issueId
GET /support/search?q=payment

The backend must identify the authenticated user's role from Firebase
authentication and return the correct Brand or Creator support tree.

Database-aware solution

POST /support/resolve

Example:

{
  "issueId": "payment-not-received",
  "campaignId": "campaign_123",
  "paymentId": "payment_456"
}

The service checks actual platform records and returns a contextual
solution/action.

Cases

POST /support/cases
GET /support/cases
GET /support/cases/:caseId
POST /support/cases/:caseId/messages
POST /support/cases/:caseId/attachments

Admin

GET /admin/support/cases
GET /admin/support/cases/:caseId
PATCH /admin/support/cases/:caseId
POST /admin/support/cases/:caseId/assign
POST /admin/support/cases/:caseId/messages
POST /admin/support/cases/:caseId/notes
POST /admin/support/cases/:caseId/resolve
POST /admin/support/cases/:caseId/reopen
POST /admin/support/cases/:caseId/close

13. Case Creation

When a user reaches Admin, do not make them repeat the problem.

Automatically attach:

User
User Type
Category
Concern
Campaign
Payment
Payment Status
User Message
Attachments
Priority
Current Page
Timestamp
Relevant IDs

Example:

CASE #VB-10482

User: Sarah Johnson
User Type: Creator
Category: Payments & Earnings
Concern: Payment Not Received
Campaign: Summer Travel Campaign
Payment: ₹500
Payment Status: Completed
User Message: "I haven't received the payment."
Attachments: 2
Priority: High

This context-preserving handoff is explicitly required by the source.
fileciteturn1file0L589-L614

14. Context Capture

If the user opens support from:

/creator/campaigns/123

automatically capture:

currentPage
campaignId
userId
userRole
timestamp

If opened from a payment page, also capture:

paymentId
transactionId
campaignId

Never expose another user's data.

15. Admin Support Dashboard

Route:

/admin/support

Summary cards:

Open Cases
High Priority
Unassigned
Waiting for User
Resolved Today

Tabs:

All
Open
My Cases
Unassigned
High Priority
Payment
Technical
Disputes
Resolved

Table:

Case #
User
Role
Category
Issue
Case Type
Priority
Status
Assigned To
Created
Updated
Action

16. Admin Case Detail

Show:

Case number
User profile
User role
Category
Issue
Campaign
Payment
Payment status
Description
Attachments
Priority
Status
Assigned admin
Conversation
Internal notes
Timeline

Admin actions:

Assign
Reply
Add Internal Note
Change Priority
Change Status
Resolve
Reopen
Close

Internal notes must never be visible to the end user.

17. Real-Time Chat

Use Socket.IO.

Events:

support:case-created
support:message-created
support:message-read
support:case-assigned
support:status-updated
support:priority-updated
support:case-resolved
support:case-reopened

Persist messages in PostgreSQL.

18. Notifications

User notifications:

Support Case Created
Admin Replied
Case Assigned
Additional Information Requested
Case Resolved
Case Reopened

Admin notifications:

New Support Case
High Priority Case
Payment Dispute
Fraud Report
User Replied
Case Reopened

Use in-app notifications and email for important lifecycle events.

19. Security

Use Firebase Authentication.

Backend must verify Firebase ID tokens.

RBAC:

BRAND
CREATOR
ADMIN
SUPER_ADMIN

Rules:

Brand sees only their own cases.

Creator sees only their own cases.

Admin sees cases according to admin permissions.

Super Admin can manage all cases and support configuration.

Never trust frontend-supplied userId, role, campaignId,
paymentId, creatorId, or brandId.

Always verify ownership/authorization server-side.

Payment cases must verify that the payment belongs to the requesting
user or that the user has authorized access to the relevant campaign.

20. Attachments

Use object storage for uploaded files.

PostgreSQL should store metadata and secure file URLs, not large file
binaries.

Validate:

MIME type

File size

Extension

User authorization

21. Audit Logs

Track:

Case Created
Case Assigned
Priority Changed
Status Changed
Admin Replied
User Replied
Internal Note Added
Attachment Added
Case Resolved
Case Reopened
Case Closed

22. Future Integrations

The first version should not depend on AI.

Keep the architecture ready for:

AI intent detection
AI suggested solutions
Automatic categorization
Priority prediction
Duplicate case detection
Admin response suggestions

23. Development Phases

Phase 1 --- Frontend

Get Help

Brand support tree

Creator support tree

Search

Issue pages

Solution pages

Resolution prompt

Case creation form

Case list

Case detail

Admin support dashboard

Admin case detail

Mock data

Phase 2 --- Backend

Prisma schema

Seed support categories/issues

Support APIs

Case APIs

Message APIs

Attachment APIs

Firebase auth guards

RBAC

Phase 3 --- Platform Integration

Connect support to:

Campaigns

Applications

Creator profiles

Deliverables

Wallets

Escrow

Payments

Withdrawals

Messaging

Social accounts

KYC

Phase 4 --- Notifications

Socket.IO

Email

In-app notifications

Phase 5 --- Automation

Auto-priority

Auto-routing

SLA monitoring

Duplicate detection

AI assistance

24. Recommended Project Structure

Next.js

app/
├── support/
│   ├── page.tsx
│   ├── category/[categoryId]/page.tsx
│   ├── issue/[issueId]/page.tsx
│   ├── case/[caseId]/page.tsx
│   └── chat/[caseId]/page.tsx
│
└── admin/
    └── support/
        ├── page.tsx
        └── [caseId]/page.tsx

components/support/
services/support/
hooks/support/
types/support/

NestJS

src/
├── support/
│   ├── support.module.ts
│   ├── support.controller.ts
│   ├── support.service.ts
│   ├── support.repository.ts
│   ├── dto/
│   └── types/
│
├── support-cases/
├── support-chat/
├── notifications/
└── audit/

25. Main Development Prompt

Implement the complete ViralBridge Support System described in this
document.

The existing application uses Next.js on the frontend and NestJS,
PostgreSQL, Prisma, Firebase Authentication, and Socket.IO on the
backend.

Do not modify unrelated existing modules.

First inspect the current authentication, Brand, Creator, Admin/Client
Portal, Campaign, Application, Deliverable, Wallet, Escrow, Payment,
Withdrawal, Messaging, Notification, KYC, and Social Account modules.

Reuse existing models, services, authentication, and UI components
wherever possible. Do not create duplicate user, campaign, payment, or
notification systems.

Implement the Support System as a reusable, configuration/data-driven
module.

Implement separate Brand and Creator support trees using the categories
and issues defined in this specification.

Implement the complete support flow:

Get Help → Role → Category → Subcategory → Issue → Database Check →
Solution/Action → Resolution Question → Close OR Support Case → Admin
Chat → Resolution.

Create all required Prisma models, migrations, seed data, DTOs,
controllers, services, repositories, guards, API validation, Socket.IO
events, notifications, audit logs, and Swagger documentation.

Create the Next.js support routes and reusable components.

Make database-aware support responses wherever the issue relates to real
platform data.

When a support case is created, automatically include all available
context so the Admin does not ask the user to repeat the problem.

Implement secure authorization and ownership validation for every
related platform entity.

Do not hard-code hundreds of separate pages. Support categories, issues,
solutions, actions, priorities, and case types must be
data/configuration driven.

The final module must be production-ready, modular, responsive, secure,
testable, and easy to extend.

Provide:

Database schema

Prisma migration

Seed data

Frontend routes

Backend APIs

Request/response examples

Authentication and RBAC behavior

Socket.IO event documentation

Notification behavior

Admin workflow

Error handling

Test cases

End-to-end Brand flow

End-to-end Creator flow

Deployment/environment configuration

Developer setup instructions