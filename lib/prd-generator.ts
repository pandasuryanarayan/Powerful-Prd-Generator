export interface PRDGenerationInput {
  platform?: string;
  customPlatform?: string;
  productType?: string;
  category?: 'gaming' | 'fintech' | 'ecommerce' | 'saas' | 'ai' | 'social' | 'education' | 'custom' | string;
  subCategory?: string;
  targetEntities?: string[];
  keyFeatures?: string[];
  userRoles?: string[];
  authModel?: string;
  stack?: {
    frontend?: string;
    backend?: string;
    database?: string;
    customFrontend?: string;
    customBackend?: string;
    customDatabase?: string;
  };
  designStyle?: string;
  customDesignStyle?: string;
  theme?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  font?: string;
  customFont?: string;
  idea: string;
  guidingNotes?: string;
  regenChanges?: string;
}

export interface GeneratedSection {
  id: string;
  title: string;
  filename: string;
  content: string;
}

export interface PRDGenerationOutput {
  projectName: string;
  domain: string;
  sections: GeneratedSection[];
}

interface DomainBlueprint {
  name: string;
  tagline: string;
  problemPoints: string[];
  valuePillars: { title: string; desc: string }[];
  primaryPersona: { role: string; profile: string; needs: string; frustrations: string };
  secondaryPersona: { role: string; needs: string };
  kpis: { metric: string; baseline: string; target: string; method: string }[];
  defaultEntities: string[];
  defaultFeatures: { area: string; mvp: string; phase2: string; priority: string }[];
  stories: {
    title: string;
    asA: string;
    iWant: string;
    soThat: string;
    gherkin: string;
  }[];
  edgeCases: string[];
  wireframeLayout: string;
  sqlSchema: string;
  apiEndpoints: {
    method: string;
    path: string;
    title: string;
    reqBody?: string;
    resBody: string;
  }[];
}

const DOMAIN_CATALOG: Record<string, DomainBlueprint> = {
  gaming: {
    name: 'Gaming & Interactive Quiz Entertainment',
    tagline: 'Real-time gameplay mechanics, countdown trivia rounds, player scoring, and competitive leaderboards',
    problemPoints: [
      'Boring, passive learning and trivia formats lacking excitement, timer tension, and visual feedback.',
      'Unsynchronized multiplayer sessions and latency discrepancies causing unfair question timing.',
      'Lack of competitive progression, streak recognition, and persistent player achievements.'
    ],
    valuePillars: [
      { title: 'Sub-Second Real-Time Responsiveness', desc: 'Instant client-side option selection with micro-animations and zero delay in score validation.' },
      { title: 'Dynamic Streak & Speed Multipliers', desc: 'Algorithmic point scaling rewarding both accuracy and reaction speed.' },
      { title: 'Anti-Cheat Deterministic Verification', desc: 'Server-side answer validation preventing client-side inspection or network spoofing.' }
    ],
    primaryPersona: {
      role: 'Active Player / Competitor',
      profile: 'Mobile gamer seeking fast-paced, 2-to-3 minute trivia sessions during commutes and downtime.',
      needs: 'Fast question transitions, clear feedback on right/wrong answers, score streak counters, and leaderboard rankings.',
      frustrations: 'Laggy timers, unfair question wording, lost streaks due to app disconnects.'
    },
    secondaryPersona: {
      role: 'Quizmaster / Game Host',
      needs: 'Category question editor, custom game room creation, live participant monitoring, and score analytics.'
    },
    kpis: [
      { metric: 'Session Completion Rate', baseline: '64%', target: '> 89%', method: 'Completed vs abandoned quiz sessions' },
      { metric: 'Average Rounds per Daily Active User', baseline: '1.8 rounds', target: '> 5.4 rounds', method: 'Daily game sessions counter' },
      { metric: 'Question Answer Latency (P95)', baseline: '550ms', target: '< 75ms', method: 'Client-to-validation telemetry' },
      { metric: 'Multiplayer Timer Drift', baseline: '320ms', target: '< 15ms', method: 'Server NTP time synchronization' }
    ],
    defaultEntities: ['Quizzes', 'Questions', 'Question Options', 'Game Sessions', 'Player Answers', 'Leaderboards', 'Achievements'],
    defaultFeatures: [
      { area: 'Gameplay Engine & Timer', mvp: '15-second countdown timer per question with instant option feedback and streak bonuses', phase2: 'Live buzzer head-to-head multiplayer battles', priority: 'P0' },
      { area: 'Question Library & Categories', mvp: 'Curated question banks across multiple topics (Tech, Science, Pop Culture, History)', phase2: 'User-generated community quiz creator with review approval', priority: 'P0' },
      { area: 'Scoring & Streak Multiplier', mvp: 'Dynamic base points (100 pts) + speed bonus (up to 50 pts) + streak multiplier (x1.5, x2)', phase2: 'XP level system, unlockable avatars, and coin rewards', priority: 'P0' },
      { area: 'Leaderboards & Rankings', mvp: 'Daily, weekly, and all-time global leaderboards with rank badges', phase2: 'Private friend leagues, seasonal tournaments, and trophies', priority: 'P1' },
      { area: 'Audio & Visual Feedback', mvp: 'Satisfying haptic vibrations, correct/wrong sound effects, and celebration confetti', phase2: 'Custom sound themes and interactive animated mascots', priority: 'P2' }
    ],
    stories: [
      {
        title: 'Timed Question Answering with Speed Bonus',
        asA: 'player in an active quiz round',
        iWant: 'to see a 15-second visual countdown bar and choose 1 of 4 multiple-choice options',
        soThat: 'I get immediate feedback and earn extra points for answering quickly.',
        gherkin: `Scenario: Answering question within 5 seconds
  Given I am on Question 4 of "Science Trivia" with a 15-second countdown timer
  When I tap Option B "Mitochondria" at 11 seconds remaining
  Then Option B glows green with a success chime and haptic pulse
    And my base score increases by +100 points
    And my speed bonus awards +35 points
    And my streak counter advances to 4x
    And the next question automatically loads after 1.5 seconds.`
      },
      {
        title: 'Global & Daily Leaderboard Placement',
        asA: 'competitive player',
        iWant: 'to view my final round score and check my placement on the daily leaderboard',
        soThat: 'I can see how I rank against other players worldwide and share my result.',
        gherkin: `Scenario: Round completion and rank calculation
  Given I finish all 10 questions in the "History Buff" quiz with 1,420 points
  When the game session concludes
  Then the summary screen displays "Final Score: 1,420", "Accuracy: 90%", and "New Personal Best"
    And my rank is updated on the Daily Global Leaderboard
    And a "Share Score" button generates an image card for social sharing.`
      },
      {
        title: 'Streak Multiplier & Combo Mechanic',
        asA: 'player aiming for high scores',
        iWant: 'to receive escalating combo multipliers for consecutive correct answers',
        soThat: 'maintaining a streak creates excitement and unlocks higher score tiers.',
        gherkin: `Scenario: 3 consecutive correct answers trigger 1.5x multiplier
  Given I have answered Question 1 and Question 2 correctly
  When I correctly answer Question 3
  Then the streak badge displays "3x Streak!" with an active fire animation
    And all subsequent points are multiplied by 1.5x until an incorrect answer occurs.`
      }
    ],
    edgeCases: [
      '**Timer Expiration (Timeout)**: If the 15-second timer reaches 0 before the player taps an option, the question is marked incorrect (0 pts), the correct answer is briefly highlighted in yellow, and the game advances.',
      '**Disconnection During Session**: If the network drops mid-quiz, current round progress is cached locally in SQLite/IndexedDB and re-synced upon reconnection.',
      '**Simultaneous Leaderboard Ties**: When two players tie in points, the player who completed their round with the lowest total response time ranks higher.'
    ],
    wireframeLayout: `
+---------------------------------------------------------------------------------+
| [Score: 1,450 pts]          [ 🎯 QUIZ ARENA ]                 [Streak: 🔥 3x]    |
+---------------------------------------------------------------------------------+
| QUESTION 4 OF 10                    CATEGORY: Science & Tech                    |
| [==================================== 11s ========================           ]  |
|                                                                                 |
| +-----------------------------------------------------------------------------+ |
| |                                                                             | |
| |  What is known as the "powerhouse of the cell" in eukaryotic biology?        | |
| |                                                                             | |
| +-----------------------------------------------------------------------------+ |
|                                                                                 |
|  [ A ]  Ribosome                      [ B ]  Mitochondria  (Selected ✓)         |
|  [ C ]  Endoplasmic Reticulum         [ D ]  Golgi Apparatus                    |
|                                                                                 |
| STATUS: Correct! +100 Pts + 35 Speed Bonus                                      |
| +-----------------------------------------------------------------------------+ |
| | [ Exit Game ]                             [ Next Question in 1.5s -> ]      | |
| +-----------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------+`,
    sqlSchema: `-- Gaming & Quiz Domain Schema
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    total_xp INT DEFAULT 0,
    coins INT DEFAULT 100,
    highest_streak INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL, -- e.g. Science, Tech, Pop Culture, History
    difficulty VARCHAR(32) DEFAULT 'medium', -- easy, medium, hard
    time_limit_sec INT DEFAULT 15,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    explanation TEXT,
    points_base INT DEFAULT 100,
    position INT NOT NULL DEFAULT 1
);

CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE RESTRICT,
    total_score INT DEFAULT 0,
    correct_count INT DEFAULT 0,
    highest_streak INT DEFAULT 0,
    status VARCHAR(32) DEFAULT 'IN_PROGRESS', -- IN_PROGRESS, COMPLETED, ABANDONED
    started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ
);

CREATE TABLE player_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE RESTRICT,
    selected_option_id UUID REFERENCES question_options(id),
    is_correct BOOLEAN NOT NULL,
    response_time_ms INT NOT NULL,
    points_awarded INT NOT NULL DEFAULT 0
);

CREATE TABLE leaderboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    high_score INT NOT NULL,
    period VARCHAR(32) DEFAULT 'DAILY', -- DAILY, WEEKLY, ALL_TIME
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(quiz_id, user_id, period)
);

CREATE INDEX idx_questions_quiz ON questions(quiz_id);
CREATE INDEX idx_options_question ON question_options(question_id);
CREATE INDEX idx_leaderboard_score ON leaderboards(quiz_id, high_score DESC);`,
    apiEndpoints: [
      {
        method: 'POST',
        path: '/api/v1/games/start',
        title: 'Initialize New Quiz Game Session',
        reqBody: `{
  "quizId": "qz_science_101",
  "difficulty": "medium"
}`,
        resBody: `{
  "sessionId": "ses_99214a",
  "quizTitle": "Science & Tech Speed Trivia",
  "totalQuestions": 10,
  "timeLimitPerQuestionSec": 15,
  "firstQuestion": {
    "questionId": "qst_001",
    "questionText": "What is known as the powerhouse of the cell?",
    "options": [
      { "id": "opt_1", "text": "Ribosome" },
      { "id": "opt_2", "text": "Mitochondria" },
      { "id": "opt_3", "text": "Endoplasmic Reticulum" },
      { "id": "opt_4", "text": "Golgi Apparatus" }
    ]
  }
}`
      },
      {
        method: 'POST',
        path: '/api/v1/games/:id/submit-answer',
        title: 'Validate Answer & Calculate Score with Speed Bonus',
        reqBody: `{
  "questionId": "qst_001",
  "selectedOptionId": "opt_2",
  "responseTimeMs": 3400
}`,
        resBody: `{
  "isCorrect": true,
  "basePoints": 100,
  "speedBonus": 35,
  "streakMultiplier": 1.5,
  "totalPointsAwarded": 202,
  "currentSessionScore": 202,
  "currentStreak": 3,
  "correctOptionId": "opt_2",
  "explanation": "Mitochondria generate most of the chemical energy needed by cells."
}`
      },
      {
        method: 'GET',
        path: '/api/v1/quizzes/:id/leaderboard',
        title: 'Fetch Global Leaderboard Rankings',
        resBody: `{
  "quizId": "qz_science_101",
  "period": "DAILY",
  "rankings": [
    { "rank": 1, "username": "Quantum_Gamer", "score": 1450, "accuracy": "100%" },
    { "rank": 2, "username": "StarLord88", "score": 1420, "accuracy": "90%" },
    { "rank": 3, "username": "Brainiac", "score": 1380, "accuracy": "90%" }
  ]
}`
      }
    ]
  },

  fintech: {
    name: 'FinTech & Shared Financial Ledger',
    tagline: 'Automated financial tracking, fair-share splitting, and friction-free payment settlement',
    problemPoints: [
      'Disjointed transaction records spread across screenshots, paper receipts, and chat logs.',
      'Complex manual calculations for uneven splits, tax subtotals, and currency conversions.',
      'Awkward social friction and delays in tracking who owes whom and confirming settlements.'
    ],
    valuePillars: [
      { title: 'Mathematical Precision', desc: 'Guaranteed penny-accurate ledger calculations with round-robin fractional cent allocation.' },
      { title: 'Zero Social Friction', desc: 'Automated balance debt simplification algorithms minimizing the net transactions needed to settle.' },
      { title: 'Real-Time Auditability', desc: 'Immutable transaction timeline with digital receipt attachments and instant balance reconciliations.' }
    ],
    primaryPersona: {
      role: 'Group Organizer & Daily Spender',
      profile: 'Tech-savvy individual managing recurring group meals, shared house expenses, or trip finances.',
      needs: 'Fast receipt capture, instant split options (equal, percentage, exact), clean balance breakdown.',
      frustrations: 'Manual math errors, delayed payments from peers, confusing multi-currency rates.'
    },
    secondaryPersona: {
      role: 'Participant / Payer',
      needs: 'One-click verification of what they owe, transparent breakdown of items, and instant deep-link payment.'
    },
    kpis: [
      { metric: 'Ledger Dispute Rate', baseline: '14.2%', target: '< 0.5%', method: 'Flagged transaction counter' },
      { metric: 'Average Time to Settle Debt', baseline: '5.2 days', target: '< 4 hours', method: 'Timestamp diff between expense and settlement' },
      { metric: 'Receipt Parsing Accuracy', baseline: '72%', target: '> 96.5%', method: 'User OCR correction telemetry' },
      { metric: 'Balance Reconciliation Latency', baseline: '450ms', target: '< 60ms', method: 'APM database query latency' }
    ],
    defaultEntities: ['Expenses', 'Expense Splits', 'Settlements', 'Groups', 'Ledger Balances', 'Receipt Attachments'],
    defaultFeatures: [
      { area: 'Expense Entry & Splits', mvp: 'Add title, amount, payer, split members (equal, percentage, exact) and receipts', phase2: 'Automated AI itemized receipt OCR extraction', priority: 'P0' },
      { area: 'Debt Simplification', mvp: 'Net balance graph algorithm reducing circular group debts', phase2: 'Cross-group multi-currency settlement optimization', priority: 'P0' },
      { area: 'Settlement Verification', mvp: 'Record payments with UPI/cash reference and confirm balance update', phase2: 'Direct OpenBanking webhook auto-reconciliation', priority: 'P1' }
    ],
    stories: [
      {
        title: 'Multi-Member Expense Splitting',
        asA: 'group member who paid the check',
        iWant: 'to input a $120 bill and split it among 3 friends (Alice 50%, Bob 25%, Charlie 25%)',
        soThat: 'the system calculates each person’s exact share without manual arithmetic.',
        gherkin: `Scenario: Percentage split
  Given I am in group "Weekend Cabin"
  When I submit a $120.00 expense with Alice: 50%, Bob: 25%, Charlie: 25%
  Then Alice owes $60.00, Bob owes $30.00, Charlie owes $30.00
    And my net balance reflects a positive credit of $120.00.`
      }
    ],
    edgeCases: [
      '**Fractional Cent Rounding**: In an odd split ($100 / 3 = $33.333...), the extra penny is attributed to the primary payer to prevent arithmetic leaks.'
    ],
    wireframeLayout: `
+---------------------------------------------------------------------------------+
| [Logo] ExpenseHub                    [Active Group: Tahoe 2026 v]   [Profile]    |
+---------------------------------------------------------------------------------+
| SUMMARY CARDS: Total Spend: $840 | You are Owed: +$140.00 | You Owe: $0.00      |
| ACTION BAR:  [ + Add Expense ]   [ Settle Up ]   [ Export CSV ]   [ Filter v ]  |
+---------------------------------------------------------------------------------+`,
    sqlSchema: `-- FinTech Schema
CREATE TABLE users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(255) UNIQUE NOT NULL, full_name VARCHAR(128) NOT NULL);
CREATE TABLE groups (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(128) NOT NULL);
CREATE TABLE group_members (group_id UUID REFERENCES groups(id), user_id UUID REFERENCES users(id), net_balance DECIMAL(12,2) DEFAULT 0.00, PRIMARY KEY(group_id, user_id));
CREATE TABLE expenses (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), group_id UUID REFERENCES groups(id), payer_id UUID REFERENCES users(id), title VARCHAR(255) NOT NULL, amount DECIMAL(12,2) NOT NULL);
CREATE TABLE expense_splits (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), expense_id UUID REFERENCES expenses(id), user_id UUID REFERENCES users(id), amount_owed DECIMAL(12,2) NOT NULL);
CREATE TABLE settlements (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), group_id UUID REFERENCES groups(id), from_user_id UUID, to_user_id UUID, amount DECIMAL(12,2) NOT NULL);`,
    apiEndpoints: [
      {
        method: 'POST',
        path: '/api/v1/groups/:id/expenses',
        title: 'Create and Split Expense',
        resBody: `{ "expenseId": "exp_101", "status": "recorded", "amount": 120.00 }`
      }
    ]
  },

  ecommerce: {
    name: 'E-Commerce & Digital Commerce',
    tagline: 'High-conversion product catalogs, cart session management, and secure checkout processing',
    problemPoints: [
      'High shopping cart abandonment caused by multi-step checkout friction.',
      'Inventory race conditions causing overselling during product launches.',
      'Unsynchronized order status updates across fulfillment and customer notifications.'
    ],
    valuePillars: [
      { title: 'Sub-Second Catalog Search', desc: 'Instant client-side filtering and faceted search with zero layout shifts.' },
      { title: 'Deterministic Inventory Locks', desc: 'Atomic stock reservations during checkout sessions preventing overselling.' },
      { title: 'Frictionless Payments', desc: 'Pre-integrated Stripe and digital wallets with localized currency handling.' }
    ],
    primaryPersona: {
      role: 'Online Shopper',
      profile: 'Customer seeking quick product discovery, transparent shipping, and instant 2-click checkout.',
      needs: 'Fast product filtration, live stock indicators, and digital wallet payment options.',
      frustrations: 'Out-of-stock errors after paying and hidden shipping costs.'
    },
    secondaryPersona: {
      role: 'Store Manager',
      needs: 'Inventory stock management, bulk pricing updates, and order fulfillment tracking.'
    },
    kpis: [
      { metric: 'Checkout Conversion Rate', baseline: '1.8%', target: '> 4.2%', method: 'Funnel analytics' },
      { metric: 'Inventory Oversell Rate', baseline: '1.2%', target: '0.00%', method: 'Warehouse stock error logs' }
    ],
    defaultEntities: ['Products', 'Product Variants', 'Cart Items', 'Orders', 'Order Items', 'Customers'],
    defaultFeatures: [
      { area: 'Catalog & Search', mvp: 'Categorized catalog with price, tag, rating filters, and image galleries', phase2: 'AI personalized recommendations', priority: 'P0' },
      { area: 'Cart & Checkout', mvp: 'Persistent cart with 15-minute inventory reservation and Stripe checkout', phase2: 'Buy-Now-Pay-Later (BNPL) support', priority: 'P0' }
    ],
    stories: [
      {
        title: 'Cart Checkout and Inventory Reservation',
        asA: 'buyer',
        iWant: 'to add an item to cart and complete payment via Stripe',
        soThat: 'the product is reserved and shipped to my address.',
        gherkin: `Scenario: Successful checkout
  Given product is in stock
  When I complete checkout via Stripe Payment Element
  Then order status updates to PAID and inventory decrements by 1.`
      }
    ],
    edgeCases: [
      '**Cart Reservation Expiry**: Cart reservations release inventory back to the store after 15 minutes of inactivity.'
    ],
    wireframeLayout: `
+---------------------------------------------------------------------------------+
| [Logo] ModernStore       [ Search products... ]        [Cart (2) - $94]  [Profile] |
| FILTERS: Footwear | Apparel | Accessories              GRID: 3-Column Products   |
+---------------------------------------------------------------------------------+`,
    sqlSchema: `-- E-Commerce Schema
CREATE TABLE products (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(255) NOT NULL, price DECIMAL(10,2) NOT NULL);
CREATE TABLE product_variants (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), product_id UUID REFERENCES products(id), sku VARCHAR(64) UNIQUE, inventory_quantity INT DEFAULT 0);
CREATE TABLE orders (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), total_amount DECIMAL(10,2) NOT NULL, status VARCHAR(32) DEFAULT 'PENDING');
CREATE TABLE order_items (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), order_id UUID REFERENCES orders(id), variant_id UUID REFERENCES product_variants(id), quantity INT NOT NULL);`,
    apiEndpoints: [
      {
        method: 'POST',
        path: '/api/v1/checkout/create-intent',
        title: 'Create Stripe Payment Intent',
        resBody: `{ "clientSecret": "pi_secret_xxx", "orderNumber": "ORD-9921", "total": 94.00 }`
      }
    ]
  },

  saas: {
    name: 'SaaS Workflow & Project Operations',
    tagline: 'Collaborative task pipelines, milestone management, and operational team throughput',
    problemPoints: [
      'Blocked team members due to disconnected task statuses and lack of clear sprint priorities.',
      'Manual status check-ins consuming engineering velocity.'
    ],
    valuePillars: [
      { title: 'Fluid Kanban Views', desc: 'Drag-and-drop workflow progression with keyboard shortcuts for instant triage.' },
      { title: 'Role Governance', desc: 'Owner, Editor, and Viewer permission layers securing confidential workspace data.' }
    ],
    primaryPersona: {
      role: 'Project Lead',
      profile: 'Organizing complex cross-functional sprints across engineers and designers.',
      needs: 'Kanban boards, deadline alerts, and sprint velocity reports.',
      frustrations: 'Cluttered user interfaces and slow ticket search.'
    },
    secondaryPersona: {
      role: 'Team Member',
      needs: 'Distraction-free "My Tasks" view and quick status updates.'
    },
    kpis: [
      { metric: 'Sprint Cycle Time', baseline: '14 days', target: '< 8 days', method: 'Board movement timestamps' }
    ],
    defaultEntities: ['Workspaces', 'Boards', 'Columns', 'Tasks', 'Activity Logs', 'Workspace Members'],
    defaultFeatures: [
      { area: 'Kanban Board', mvp: 'Drag-and-drop columns with task cards, tags, and priorities', phase2: 'Gantt roadmaps', priority: 'P0' },
      { area: 'Workspace Governance', mvp: 'Invite team members with Admin, Member, and Viewer roles', phase2: 'SAML SSO', priority: 'P0' }
    ],
    stories: [
      {
        title: 'Moving Task Across Sprint Columns',
        asA: 'engineer',
        iWant: 'to drag a card from In Progress to Review',
        soThat: 'the team is notified and the board updates in real time.',
        gherkin: `Scenario: Reorder task column
  Given task is in "In Progress"
  When I drag card to "Review"
  Then status updates and real-time event broadcasts to active viewers.`
      }
    ],
    edgeCases: ['**Concurrent Edits**: Last timestamp wins with optimistic UI feedback.'],
    wireframeLayout: `
+---------------------------------------------------------------------------------+
| [Logo] FlowTask    [Workspace: Core Team v]   [ Search... (Cmd+K) ]  [+ New Task] |
| KANBAN: [ Backlog (3) ] | [ In Progress (2) ] | [ Review (1) ] | [ Done (8) ]   |
+---------------------------------------------------------------------------------+`,
    sqlSchema: `-- SaaS Schema
CREATE TABLE workspaces (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(128) NOT NULL);
CREATE TABLE boards (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), workspace_id UUID REFERENCES workspaces(id), title VARCHAR(128) NOT NULL);
CREATE TABLE columns (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), board_id UUID REFERENCES boards(id), name VARCHAR(64) NOT NULL, position INT NOT NULL);
CREATE TABLE tasks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), board_id UUID REFERENCES boards(id), column_id UUID REFERENCES columns(id), title VARCHAR(255) NOT NULL, priority VARCHAR(16) DEFAULT 'medium');`,
    apiEndpoints: [
      {
        method: 'POST',
        path: '/api/v1/boards/:id/tasks',
        title: 'Create Task in Column',
        resBody: `{ "taskId": "tsk_101", "title": "Implement auth", "position": 1 }`
      }
    ]
  },

  ai: {
    name: 'AI Intelligence & Automation Engine',
    tagline: 'Contextual AI synthesis, automated artifact generation, and pipeline observability',
    problemPoints: ['Massive unstructured documents going unanalyzed due to high manual review friction.'],
    valuePillars: [{ title: 'Structured Output', desc: 'Enforces strict JSON schema preventing hallucinations.' }],
    primaryPersona: { role: 'Knowledge Worker', profile: 'Reviewing transcripts and reports.', needs: 'Instant structured summaries.', frustrations: 'Slow response times.' },
    secondaryPersona: { role: 'Admin', needs: 'Token usage metrics and rate limiting.' },
    kpis: [{ metric: 'Time-to-First-Token', baseline: '3.4s', target: '< 650ms', method: 'Server-sent events' }],
    defaultEntities: ['Documents', 'Generation Jobs', 'Transcripts', 'Action Items', 'Token Quotas'],
    defaultFeatures: [
      { area: 'Ingestion & Synthesis', mvp: 'Upload PDF/Audio and extract executive summaries and action items', phase2: 'Live audio stream bots', priority: 'P0' }
    ],
    stories: [
      {
        title: 'Document Analysis to Action Items',
        asA: 'analyst',
        iWant: 'to upload a meeting transcript and receive bulleted action items',
        soThat: 'I can share next steps with the team immediately.',
        gherkin: `Scenario: Synthesizing meeting notes
  Given valid transcript
  When synthesis completes
  Then structured action items with owners and deadlines are rendered.`
      }
    ],
    edgeCases: ['**Upstream Rate Limits**: Exponential backoff retries on HTTP 429.'],
    wireframeLayout: `
+---------------------------------------------------------------------------------+
| [Logo] AI Engine        [ Drag & Drop Audio/PDF ]       [ Summary & Action Items]|
+---------------------------------------------------------------------------------+`,
    sqlSchema: `-- AI Schema
CREATE TABLE documents (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(255) NOT NULL, content TEXT);
CREATE TABLE generation_jobs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), document_id UUID REFERENCES documents(id), tokens_used INT, summary JSONB);`,
    apiEndpoints: [
      {
        method: 'POST',
        path: '/api/v1/ai/synthesize',
        title: 'Synthesize Document',
        resBody: `{ "jobId": "job_101", "tokensUsed": 1200, "status": "completed" }`
      }
    ]
  },

  social: {
    name: 'Social Network & Creator Platform',
    tagline: 'Chronological timeline feeds, user profiles, rich media publishing, and community engagement',
    problemPoints: ['Fragmented community conversations and high latency on timeline scrolling.'],
    valuePillars: [{ title: 'Sub-100ms Feeds', desc: 'Cached chronological timeline updates.' }],
    primaryPersona: { role: 'Content Creator', profile: 'Sharing updates with followers.', needs: 'Smooth image posting.', frustrations: 'Clunky uploads.' },
    secondaryPersona: { role: 'Community Moderator', needs: 'Flagged post review queue.' },
    kpis: [{ metric: 'Daily Feed Interactions', baseline: '4.5', target: '> 18.2', method: 'Likes and comments counter' }],
    defaultEntities: ['User Profiles', 'Follows', 'Posts', 'Comments', 'Likes'],
    defaultFeatures: [
      { area: 'Feed & Posts', mvp: 'Rich text posts with images, like reactions, and threaded comments', phase2: 'Live audio rooms', priority: 'P0' }
    ],
    stories: [
      {
        title: 'Publishing Post to Followers',
        asA: 'creator',
        iWant: 'to post an update with photo',
        soThat: 'it appears on my followers’ feeds immediately.',
        gherkin: `Scenario: Post publish
  Given valid photo post
  When I tap Publish
  Then post is saved and distributed to follower feeds.`
      }
    ],
    edgeCases: ['**Image Compression**: Images over 2MB are converted to WebP on client.'],
    wireframeLayout: `
+---------------------------------------------------------------------------------+
| [Logo] CommunityHub          [Search community...]    [Notifications]  [Profile] |
| TIMELINE: [ What's on your mind? ]   | POSTS: @Alex: Deployed new version!      |
+---------------------------------------------------------------------------------+`,
    sqlSchema: `-- Social Schema
CREATE TABLE users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), username VARCHAR(64) UNIQUE NOT NULL, avatar_url TEXT);
CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id), content TEXT NOT NULL, likes_count INT DEFAULT 0);
CREATE TABLE comments (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), post_id UUID REFERENCES posts(id), user_id UUID REFERENCES users(id), content TEXT NOT NULL);`,
    apiEndpoints: [
      {
        method: 'POST',
        path: '/api/v1/posts',
        title: 'Create Post',
        resBody: `{ "postId": "pst_101", "likesCount": 0 }`
      }
    ]
  },

  education: {
    name: 'Education & Interactive Learning',
    tagline: 'Course modules, spaced-repetition flashcards, student progress tracking, and knowledge checks',
    problemPoints: ['Low completion rates on online courses due to passive non-interactive content.'],
    valuePillars: [{ title: 'Active Recall', desc: 'Interactive review quizzes and spaced-repetition schedules.' }],
    primaryPersona: { role: 'Student / Learner', profile: 'Studying for professional certifications.', needs: 'Bite-sized modules and quizzes.', frustrations: 'Cluttered course portals.' },
    secondaryPersona: { role: 'Instructor', needs: 'Lesson editor and student quiz completion analytics.' },
    kpis: [{ metric: 'Course Completion Rate', baseline: '12%', target: '> 48%', method: 'Module completion timestamp' }],
    defaultEntities: ['Courses', 'Lessons', 'Flashcard Decks', 'Cards', 'Student Enrollments', 'Progress Records'],
    defaultFeatures: [
      { area: 'Lessons & Quizzes', mvp: 'Interactive lesson modules with chapter review quizzes and completion badges', phase2: 'Certificate PDF generator', priority: 'P0' }
    ],
    stories: [
      {
        title: 'Completing Lesson Quiz',
        asA: 'student',
        iWant: 'to take a 5-question chapter quiz and verify mastery',
        soThat: 'I can unlock the next lesson module.',
        gherkin: `Scenario: Passing lesson quiz
  Given I complete Lesson 3 quiz with 80% score or higher
  When the score is submitted
  Then Lesson 4 is unlocked and my completion badge updates.`
      }
    ],
    edgeCases: ['**Offline Learning**: Completed flashcard reviews sync automatically when internet is restored.'],
    wireframeLayout: `
+---------------------------------------------------------------------------------+
| [Logo] LearnHub          [ My Courses ]   [ Flashcards ]   [ Progress: 64% ]     |
| LESSON: Chapter 4 - Async Programming   [ Video / Reading ]   [ Take Quiz -> ]  |
+---------------------------------------------------------------------------------+`,
    sqlSchema: `-- Education Schema
CREATE TABLE courses (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(255) NOT NULL, description TEXT);
CREATE TABLE lessons (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), course_id UUID REFERENCES courses(id), title VARCHAR(128) NOT NULL, position INT);
CREATE TABLE quizzes (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), lesson_id UUID REFERENCES lessons(id), pass_percentage INT DEFAULT 80);
CREATE TABLE student_progress (student_id UUID, lesson_id UUID, is_completed BOOLEAN DEFAULT FALSE, PRIMARY KEY(student_id, lesson_id));`,
    apiEndpoints: [
      {
        method: 'POST',
        path: '/api/v1/lessons/:id/quiz/submit',
        title: 'Submit Lesson Quiz',
        resBody: `{ "passed": true, "scorePercentage": 90, "nextLessonId": "les_105" }`
      }
    ]
  }
};

// Heuristic keyword classifier if category is not explicitly selected
function resolveBlueprint(input: PRDGenerationInput): DomainBlueprint {
  if (input.category && DOMAIN_CATALOG[input.category]) {
    return DOMAIN_CATALOG[input.category];
  }

  const text = `${input.idea} ${input.productType || ''}`.toLowerCase();

  // Check gaming keywords with high priority
  if (
    text.includes('quiz') ||
    text.includes('game') ||
    text.includes('trivia') ||
    text.includes('player') ||
    text.includes('leaderboard') ||
    text.includes('score') ||
    text.includes('arcade') ||
    text.includes('puzzle')
  ) {
    return DOMAIN_CATALOG.gaming;
  }

  // Check fintech keywords
  if (
    text.includes('expense') ||
    text.includes('split') ||
    text.includes('bill') ||
    text.includes('wallet') ||
    text.includes('budget') ||
    text.includes('payment') ||
    text.includes('settle') ||
    text.includes('invoice')
  ) {
    return DOMAIN_CATALOG.fintech;
  }

  // Check ecommerce keywords
  if (
    text.includes('cart') ||
    text.includes('shop') ||
    text.includes('store') ||
    text.includes('product') ||
    text.includes('checkout') ||
    text.includes('order') ||
    text.includes('inventory')
  ) {
    return DOMAIN_CATALOG.ecommerce;
  }

  // Check AI keywords
  if (
    text.includes('ai') ||
    text.includes('prompt') ||
    text.includes('summariz') ||
    text.includes('transcript') ||
    text.includes('llm') ||
    text.includes('agent')
  ) {
    return DOMAIN_CATALOG.ai;
  }

  // Check education keywords
  if (
    text.includes('course') ||
    text.includes('student') ||
    text.includes('lesson') ||
    text.includes('learn') ||
    text.includes('flashcard')
  ) {
    return DOMAIN_CATALOG.education;
  }

  // Check social keywords
  if (
    text.includes('social') ||
    text.includes('creator') ||
    text.includes('follower') ||
    text.includes('post') ||
    text.includes('feed')
  ) {
    return DOMAIN_CATALOG.social;
  }

  // Default to SaaS workflow
  return DOMAIN_CATALOG.saas;
}

export function generatePRDSections(input: PRDGenerationInput): PRDGenerationOutput {
  const {
    platform = 'Website',
    customPlatform,
    stack = { frontend: 'Next.js', backend: 'Node.js', database: 'PostgreSQL' },
    designStyle = 'Minimal',
    theme = 'both',
    colors = {
      primary: '#f97316',
      secondary: '#64748B',
      accent: '#06B6D4',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F8FAFC',
    },
    font = 'Poppins',
    idea = '',
    guidingNotes,
    regenChanges,
    targetEntities,
    keyFeatures,
    userRoles,
  } = input;

  const platformName = platform === 'custom' && customPlatform ? customPlatform : platform;
  const projectName =
    idea.split('\n')[0].replace(/[#*]/g, '').trim().substring(0, 48) || 'Product Specification';

  const frontendTech = stack.frontend || 'Next.js';
  const backendTech = stack.backend || 'Node.js';
  const databaseTech = stack.database || 'PostgreSQL';

  // Resolve domain blueprint
  const bp = resolveBlueprint(input);

  // Entities: use user-selected entities or domain defaults
  const activeEntities = targetEntities && targetEntities.length > 0 ? targetEntities : bp.defaultEntities;

  // Features: inject user-selected features if available
  const featuresList =
    keyFeatures && keyFeatures.length > 0
      ? [
          ...keyFeatures.map((kf, i) => ({
            area: kf,
            mvp: `Core implementation of ${kf} with real-time feedback and state persistence`,
            phase2: `Extended automation, offline enhancements, and integrations for ${kf}`,
            priority: i < 3 ? 'P0' : 'P1',
          })),
          ...bp.defaultFeatures.slice(keyFeatures.length > 2 ? 2 : 0),
        ]
      : bp.defaultFeatures;

  // User Roles: use user-selected roles if available
  const activeRoles = userRoles && userRoles.length > 0 ? userRoles : [bp.primaryPersona.role, bp.secondaryPersona.role];

  const sections: GeneratedSection[] = [
    // 01-PRODUCT-OVERVIEW.md
    {
      id: 'overview',
      title: 'Product Overview',
      filename: '01-PRODUCT-OVERVIEW.md',
      content: `# 01. Product Overview — ${projectName}

## 1. Executive Summary
**${projectName}** is an implementation-ready **${platformName}** application engineered within the **${bp.name}** domain. Designed for high velocity, responsive interaction, and full compatibility with AI coding agents (Claude Code, Cursor Composer), it delivers structured mechanics with measurable user value.

${regenChanges ? `> **Revision Feedback Incorporated**: ${regenChanges}\n` : ''}
${guidingNotes ? `> **Special Architectural Guidelines**: ${guidingNotes}\n` : ''}

### Key Specifications:
- **Product Title**: ${projectName}
- **Domain Category**: ${bp.name}
- **Core Value Promise**: ${bp.tagline}
- **Target Platform**: ${platformName}
- **Architecture Stack**: ${frontendTech} (Frontend) • ${backendTech} (Backend) • ${databaseTech} (Database)
- **Visual Design Paradigm**: ${designStyle} style (${theme} mode)
- **Primary Typography**: ${font}
- **Core Data Entities**: ${activeEntities.join(' • ')}

---

## 2. Core Problem Statement & Market Friction
Users in this domain suffer from fragmented execution, clunky manual workflows, and lack of real-time responsiveness.

### Key Pain Points Solved:
${bp.problemPoints.map((p, i) => `${i + 1}. **${p.split(' ')[0]}**: ${p}`).join('\n')}

---

## 3. Product Vision & Value Pillars
To deliver a high-velocity digital experience that transforms friction into streamlined, intuitive mechanics with measurable outcomes.

### Core Value Pillars:
${bp.valuePillars.map((vp) => `- **${vp.title}**: ${vp.desc}`).join('\n')}

---

## 4. Target User Personas & Roles
${activeRoles
  .map(
    (role, idx) => `### Persona ${idx + 1}: ${role}
- **Role**: Core participant in the ${bp.name} flow
- **Core Needs**: Fast responsiveness, zero friction, intuitive controls, transparent feedback
- **Primary Platform**: ${platformName}`
  )
  .join('\n\n')}

---

## 5. Success Metrics & Quantitative KPIs (90-Day Goals)
| Metric | Baseline | Target (90 Days) | Measurement Method |
| :--- | :--- | :--- | :--- |
${bp.kpis.map((k) => `| **${k.metric}** | ${k.baseline} | \`${k.target}\` | ${k.method} |`).join('\n')}
`,
    },

    // 02-FEATURES-REQUIREMENTS.md
    {
      id: 'features',
      title: 'Features & Requirements',
      filename: '02-FEATURES-REQUIREMENTS.md',
      content: `# 02. Features & Requirements — ${projectName}

## 1. Scope Boundary Matrix (MVP vs. Phase 2)

| Functional Area | In-Scope for Initial MVP | Phase 2 (Future Horizon) | Priority |
| :--- | :--- | :--- | :--- |
${featuresList.map((f) => `| **${f.area}** | ${f.mvp} | ${f.phase2} | \`${f.priority}\` |`).join('\n')}

---

## 2. Detailed User Stories & Acceptance Criteria (Gherkin Syntax)

${bp.stories
  .map(
    (story, idx) => `### Story ${idx + 1}: ${story.title}
**As a** ${story.asA},  
**I want to** ${story.iWant},  
**So that** ${story.soThat}.

#### Acceptance Criteria:
\`\`\`gherkin
${story.gherkin}
\`\`\`
`
  )
  .join('\n---\n\n')}

---

## 3. Edge Cases, Boundary Conditions & Error Recovery
${bp.edgeCases.map((ec) => `- ${ec}`).join('\n')}
`,
    },

    // 03-UI-UX-REQUIREMENTS.md
    {
      id: 'uiux',
      title: 'UI/UX Requirements',
      filename: '03-UI-UX-REQUIREMENTS.md',
      content: `# 03. UI/UX Requirements — ${projectName}

## 1. Visual Design Philosophy & Style Guide
- **Visual Aesthetic**: **${designStyle}**
- **Theme Paradigm**: **${theme.toUpperCase()}** Mode Support
- **Primary Typography**: **${font}**

### Design System Color Tokens:
| Token Name | Hex Code | Visual Swatch Preview | Usage & Surface Guidelines |
| :--- | :--- | :--- | :--- |
| **Primary** | \`${colors.primary}\` | \`[#${colors.primary.replace('#', '')}]\` | Primary CTA buttons, active state indicators, key focus highlights |
| **Secondary** | \`${colors.secondary}\` | \`[#${colors.secondary.replace('#', '')}]\` | Secondary buttons, subtle outlines, active tab borders |
| **Accent** | \`${colors.accent}\` | \`[#${colors.accent.replace('#', '')}]\` | Badges, notifications, metrics highlights, progress bars |
| **Background** | \`${colors.background}\` | \`[#${colors.background.replace('#', '')}]\` | Main viewport canvas and body background |
| **Surface** | \`${colors.surface}\` | \`[#${colors.surface.replace('#', '')}]\` | Card containers, modal sheets, dropdown popovers |
| **Text** | \`${colors.text}\` | \`[#${colors.text.replace('#', '')}]\` | Primary headlines, readable body text, high contrast labels |

---

## 2. Typography Scale Hierarchy
Configured for **${font}**, sans-serif:
- **Display Hero**: 36px / 44px Line Height — Bold (700)
- **Heading 1**: 28px / 36px Line Height — SemiBold (600)
- **Heading 2**: 20px / 28px Line Height — SemiBold (600)
- **Body Standard**: 14px / 22px Line Height — Regular (400)
- **Caption & Tokens**: 12px / 16px Line Height — Medium (500)

---

## 3. Key Screen Layout Wireframe
\`\`\`
${bp.wireframeLayout}
\`\`\`

---

## 4. Accessibility & Micro-Interactions
- **WCAG 2.1 AA Compliance**: Contrast ratios between \`${colors.text}\` and \`${colors.background}\` exceed 4.5:1.
- **Focus Rings**: 2px solid ring using \`${colors.primary}\` with 4px offset on all keyboard interactive elements.
- **Motion Safety**: Respects user's OS preference via \`@media (prefers-reduced-motion: reduce)\`.
`,
    },

    // 04-TECHNICAL-REQUIREMENTS.md
    {
      id: 'technical',
      title: 'Technical Requirements',
      filename: '04-TECHNICAL-REQUIREMENTS.md',
      content: `# 04. Technical Requirements — ${projectName}

## 1. System Architecture & Component Diagram

\`\`\`mermaid
graph TD
    Client["Client UI Application (${frontendTech})"]
    API["API Gateway / Backend Server (${backendTech})"]
    Auth["Session / Auth Provider"]
    DB[("Primary Database (${databaseTech})")]
    Cache[("In-Memory Cache / State Store")]

    Client -->|HTTPS / REST / WebSocket| API
    API -->|Validate Token| Auth
    API -->|Read / Write Queries| DB
    API -->|Fast State / Leaderboards| Cache
\`\`\`

- **Client Runtime**: **${frontendTech}** (${platformName})
- **Server Framework**: **${backendTech}**
- **Persistence Engine**: **${databaseTech}**
- **Core Managed Entities**: ${activeEntities.join(', ')}

---

## 2. Production Database Schema (DDL)

\`\`\`sql
${bp.sqlSchema}
\`\`\`

---

## 3. Core REST API Contracts

${bp.apiEndpoints
  .map(
    (ep) => `### ${ep.method} ${ep.path}
**Description**: ${ep.title}

${ep.reqBody ? `#### Request Payload (JSON):
\`\`\`json
${ep.reqBody}
\`\`\`
` : ''}
#### Response Payload (200 OK):
\`\`\`json
${ep.resBody}
\`\`\`
`
  )
  .join('\n---\n\n')}

---

## 4. Security, Authentication & Deployment Strategy
- **Authentication**: JWT tokens stored in HttpOnly, SameSite=Strict cookies with 15-minute refresh rotation.
- **Input Validation**: All incoming payloads validated via strict schemas (e.g. Zod) rejecting unexpected attributes.
- **Rate Limiting**: Throttles unauthenticated requests at 60 req/min and authenticated mutations at 120 req/min.
- **Deployment**: Production deployment containerized or hosted via Zoho Catalyst AppSail with automated CI/CD pipeline.
`,
    },
  ];

  return {
    projectName,
    domain: bp.name,
    sections,
  };
}
