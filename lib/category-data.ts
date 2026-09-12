export interface CategoryBlueprint {
  id: 'gaming' | 'fintech' | 'ecommerce' | 'saas' | 'ai' | 'social' | 'education' | 'custom';
  name: string;
  icon: string;
  tagline: string;
  defaultEntities: string[];
  suggestedFeatures: string[];
  suggestedRoles: string[];
  defaultIdeaTemplate: string;
}

export const PRODUCT_CATEGORIES: CategoryBlueprint[] = [
  {
    id: 'gaming',
    name: 'Game & Quiz',
    icon: 'Gamepad2',
    tagline: 'Interactive trivia, multiplayer gameplay, turn-based mechanics, and leaderboards',
    defaultEntities: ['Quizzes', 'Questions', 'Question Options', 'Game Sessions', 'Player Answers', 'Leaderboards', 'Achievements'],
    suggestedFeatures: ['15s Countdown Timer', 'Streak Multipliers', 'Solo & Multiplayer Modes', 'Real-time Leaderboard', 'Audio & Haptic Effects', 'Life / Hearts System', 'Category Unlock Progression'],
    suggestedRoles: ['Player', 'Quizmaster / Host', 'Game Admin', 'Guest Player'],
    defaultIdeaTemplate: 'A fast-paced trivia quiz game where players answer timed 15-second questions across topics like Science, History, and Pop Culture. Players earn streak bonuses for consecutive correct answers and compete on daily global leaderboards.',
  },
  {
    id: 'fintech',
    name: 'FinTech & Money',
    icon: 'Wallet',
    tagline: 'Shared ledgers, expense splitting, budgeting, invoices, and payment tracking',
    defaultEntities: ['Expenses', 'Expense Splits', 'Settlements', 'Groups', 'Ledger Balances', 'Receipt Attachments'],
    suggestedFeatures: ['Receipt Photo Upload', 'Penny-Accurate Splits (Equal/Percentage)', 'Debt Simplification Algorithm', 'UPI / Stripe Deep-link Pay', 'Multi-Currency Support', 'Export CSV Reports'],
    suggestedRoles: ['Group Organizer', 'Participant / Payer', 'Group Member', 'Accountant'],
    defaultIdeaTemplate: 'An expense-sharing application for roommates and travel groups to log shared bills, split items with custom percentages, simplify circular debts, and settle balances instantly.',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Store',
    icon: 'ShoppingBag',
    tagline: 'Product catalogs, cart checkout, order fulfillment, and inventory control',
    defaultEntities: ['Products', 'Product Variants (SKU)', 'Cart Items', 'Orders', 'Order Items', 'Customers'],
    suggestedFeatures: ['Slide-out Cart Drawer', 'Stripe / Card Checkout', '15-Minute Inventory Reservation', 'Order Status Tracking', 'Faceted Search & Filters', 'Customer Reviews'],
    suggestedRoles: ['Customer / Buyer', 'Store Manager', 'Fulfillment Operator', 'Admin'],
    defaultIdeaTemplate: 'A modern direct-to-consumer online store featuring categorized catalogs, real-time inventory checks, seamless Stripe checkout, and automated customer order confirmation emails.',
  },
  {
    id: 'saas',
    name: 'SaaS & Operations',
    icon: 'Briefcase',
    tagline: 'Team collaboration, Kanban task boards, milestone tracking, and workflows',
    defaultEntities: ['Workspaces', 'Boards', 'Columns', 'Tasks', 'Activity Logs', 'Workspace Members'],
    suggestedFeatures: ['Drag-and-Drop Kanban Board', 'Role Governance (Admin/Member)', 'Markdown Rich Text & Attachments', 'Activity History Feed', 'Search & Filtering (Cmd+K)', 'CSV / JSON Export'],
    suggestedRoles: ['Project Lead / Owner', 'Team Member', 'Client / Viewer', 'Admin'],
    defaultIdeaTemplate: 'A lightweight project management workspace for fast-moving product teams to organize sprint tasks across Kanban columns, track milestone deadlines, and collaborate in real-time.',
  },
  {
    id: 'ai',
    name: 'AI & Automation',
    icon: 'Sparkles',
    tagline: 'Document analysis, audio transcription, summarization, and prompt pipelines',
    defaultEntities: ['Documents', 'Generation Jobs', 'Transcripts', 'Action Items', 'Token Quotas', 'Prompt Templates'],
    suggestedFeatures: ['Audio & PDF File Ingestion', 'Real-Time Streaming Output', 'Itemized Action Extraction', 'One-Click Slack/Notion Export', 'Token Usage Metering', 'Model Selection (Fast vs Deep)'],
    suggestedRoles: ['Knowledge Worker', 'Workspace Admin', 'API Integrator'],
    defaultIdeaTemplate: 'An AI productivity tool that ingests meeting audio recordings and long PDF reports, generating structured executive summaries, action item tables with assigned owners, and key decisions in seconds.',
  },
  {
    id: 'social',
    name: 'Social & Community',
    icon: 'Users',
    tagline: 'Creator updates, timeline feeds, follower graphs, and discussion threads',
    defaultEntities: ['User Profiles', 'Follows', 'Posts', 'Comments', 'Likes', 'Notifications'],
    suggestedFeatures: ['Chronological Timeline Feed', 'Photo & Media Compression', 'Like & Comment Threads', 'Push Notifications', 'User Follower Graph', 'Content Moderation Flagging'],
    suggestedRoles: ['Content Creator', 'Community Member', 'Moderator', 'Admin'],
    defaultIdeaTemplate: 'A community social platform where enthusiasts can share updates with photos, engage in threaded discussions, follow favorite creators, and receive real-time activity notifications.',
  },
  {
    id: 'education',
    name: 'Education & Learning',
    icon: 'GraduationCap',
    tagline: 'Courses, flashcards, student progress tracking, and interactive lessons',
    defaultEntities: ['Courses', 'Lessons', 'Flashcard Decks', 'Cards', 'Student Enrollments', 'Progress Records'],
    suggestedFeatures: ['Spaced Repetition Review', 'Interactive Chapter Quizzes', 'Certificate of Completion', 'Video Lesson Embeds', 'Streak & Progress Badges', 'Offline Lesson Caching'],
    suggestedRoles: ['Student / Learner', 'Instructor / Teacher', 'School Admin'],
    defaultIdeaTemplate: 'An interactive learning app with bite-sized lessons, spaced-repetition flashcards, chapter review quizzes, and visual progress tracking to help learners master new skills.',
  },
  {
    id: 'custom',
    name: 'Custom / Other',
    icon: 'Layers',
    tagline: 'Bespoke domain architecture tailored to your unique requirements',
    defaultEntities: ['Core Entities', 'Workspaces', 'Records', 'Transactions', 'Reports'],
    suggestedFeatures: ['Custom User Authentication', 'Data Filtering & Search', 'CRUD Operations', 'Reporting Dashboard', 'Automated Notifications', 'Data Export (CSV/JSON)'],
    suggestedRoles: ['Primary User', 'Operator', 'Administrator'],
    defaultIdeaTemplate: 'A specialized application designed with custom entities, business workflows, and data pipelines tailored to our exact operational needs.',
  },
];

