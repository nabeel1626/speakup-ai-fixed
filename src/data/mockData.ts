import { QuestionData } from '../types';

export const FRONTEND_QUESTIONS: QuestionData[] = [
  {
    id: 1,
    specId: '801-FE-REACT-STATE',
    topic: 'React State & Lifecycle Architecture',
    question: 'How does React 18 fiber reconciler handle concurrent rendering, automatic batching, and state transitions compared to legacy stack reconciliation?',
    dimensionFocus: 'Core State & Reconciler Architecture',
    weight: 20,
    ttsDuration: '00:12',
    lensDescription: 'Evaluates understanding of React scheduling queues, startTransition API, lane-based prioritization, and synthetic event pooling removals.',
    tags: ['#React18', '#FiberReconciler', '#ConcurrentMode'],
    defaultTranscript: 'Articulated fiber reconciler queues and batching mechanisms accurately. In React 18, automatic batching applies across promises, timeouts, and native event handlers, grouping state updates to minimize unnecessary re-renders.',
    followUpPrompt: 'How would you identify and resolve unintended state synchronization cascades in deeply nested custom hooks?',
    followUpAudioDuration: '00:04',
    scores: {
      overall: 4.0,
      weightedPct: 80.0,
      performanceBadge: 'Strong Performance',
      summary: 'Solid grasp of fiber internal lanes and priority queues. Highlighted how concurrent interrupts work without tearing.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.2,
          percentage: 84,
          description: 'Solid breakdown of lane-based prioritization and cooperative scheduling in concurrent mode.',
          tag: '96% Factual Integrity',
          tier: 'P90 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.0,
          percentage: 80,
          description: 'Stepwise progression comparing legacy synchronous rendering against fiber time-slicing.',
          tag: 'Clear Hierarchy',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.3,
          percentage: 86,
          description: 'High cadence clarity with crisp terminology around reconciler commits vs work loops.',
          tag: '1.2 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 3.7,
          percentage: 74,
          description: 'Good mention of batching boundaries, but could touch more on hydration interrupts.',
          tag: 'Edge Cases Covered',
          tier: 'Sufficient',
          color: 'secondary'
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.1,
          percentage: 82,
          description: 'Strong practical familiarity with modern production React hooks and batching heuristics.',
          tag: 'Practical Intuition',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Articulated fiber reconciler queues and batching mechanisms accurately. Correctly pointed out automatic batching behavior introduced in React 18.',
      latency: '1.2s delay',
      duration: '74s',
      transcriptSync: 'Transcript Synced (00:01:15)'
    }
  },
  {
    id: 2,
    specId: '804-FE-REACT-SSR',
    topic: 'Next.js SSR Architecture & Hydration',
    question: 'Explain the difference between client-side rendering (CSR) and server-side rendering (SSR) in React/Next.js. Under what specific traffic or SEO constraints would you favor SSR over static site generation?',
    dimensionFocus: 'Technical Accuracy & Architecture',
    weight: 25,
    ttsDuration: '00:14',
    lensDescription: 'Interview engine parses conceptual clarity regarding hydration costs, SEO indexing bots, TTFB versus FCP, and Redis/Edge-layer CDN caching dynamics.',
    tags: ['#ServerSideRendering', '#Nextjs', '#CoreWebVitals'],
    defaultTranscript: "Client-side rendering executes the React bundle in the user's browser, which means the initial HTML payload is essentially empty. SSR generates the full HTML on each request, which improves First Contentful Paint and SEO for dynamic content, but adds server overhead compared to static generation.",
    followUpPrompt: '“How would you handle dynamic data caching in Next.js using Incremental Static Regeneration (ISR) to reduce SSR server load?”',
    followUpAudioDuration: '00:04',
    scores: {
      overall: 4.2,
      weightedPct: 84.5,
      performanceBadge: 'Great Performance',
      summary: 'Composite score exceeds target benchmark for Mid-Level Frontend Dev. Architecture logic demonstrates nuanced framework comprehension with actionable micro-optimizations detected in dynamic hydration patterns.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.5,
          percentage: 90,
          description: 'Clear understanding of Next.js SSR vs CSR hydration cycle. Factual correctness verified across hydration mismatch caveats and React Server Component primitives.',
          tag: '100% Factual Integrity',
          tier: 'P94 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.0,
          percentage: 80,
          description: 'Strong comparative framework, clearly addressing both performance and architecture tradeoffs between client bundles and server execution bottlenecks.',
          tag: 'Structured Thesis',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.5,
          percentage: 90,
          description: 'Paced speech, articulate terminology, minimal filler words detected (1 filler per minute). Steady cadence at 134 words per minute with decisive pauses.',
          tag: '1.0 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 3.5,
          percentage: 70,
          description: 'Mentioned SEO and TTFB, but could have discussed cold start serverless latency and CDN caching strategies. Missed cache invalidation nuances.',
          tag: 'Expansion Suggested',
          tier: 'Actionable',
          color: 'secondary',
          isGrowthOpportunity: true
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.5,
          percentage: 90,
          description: 'Demonstrated hands-on familiarity with Next.js App Router, dynamic route constraints, and runtime server configurations. Applied real production mental models seamlessly without consulting artificial scripts.',
          tag: 'Senior Idiomatic Syntax',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Detailed analysis on Time To First Byte (TTFB) vs Time to Interactive (TTI). Referenced SEO indexing implications and edge compute caching layers.',
      latency: '0.9s delay',
      duration: '88s',
      transcriptSync: 'Transcript Synced (00:03:02)'
    }
  },
  {
    id: 3,
    specId: '807-FE-CSS-LAYOUT',
    topic: 'CSS Grid & Responsive Layout Reflows',
    question: 'How do browser layout reflows and repaints occur during heavy CSS Grid or Flexbox recalculations, and how do you optimize animation performance using CSS will-change or composite layers?',
    dimensionFocus: 'CSS Render Pipeline & Performance',
    weight: 15,
    ttsDuration: '00:15',
    lensDescription: 'Assesses depth in browser rendering pipeline (Parsing -> Style -> Layout -> Paint -> Composite), GPU layer promotion, layout thrashing, and subgrid.',
    tags: ['#CSSGrid', '#BrowserRendering', '#LayoutReflow'],
    defaultTranscript: 'Layout reflows trigger geometry recalculations across DOM nodes. By using CSS transform and opacity on promoted composite layers rather than modifying top/left or flex-basis directly, we keep animations strictly within the GPU compositor thread.',
    followUpPrompt: 'What happens when over-promoting elements with will-change: transform causes excessive VRAM consumption on mobile devices?',
    followUpAudioDuration: '00:04',
    scores: {
      overall: 4.4,
      weightedPct: 88.0,
      performanceBadge: 'Distinguished',
      summary: 'Exceptional synthesis of CSS paint mechanics, subgrid, and composite layer boundaries with zero unnecessary layout recalculations.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.7,
          percentage: 94,
          description: 'Accurate distinction between layout reflow triggers and compositor-only property changes.',
          tag: 'Flawless Pipeline Knowledge',
          tier: 'P98 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.3,
          percentage: 86,
          description: 'Logical flow dissecting DOM calculation penalties before proposing containment solutions.',
          tag: 'Root-Cause Analysis',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.5,
          percentage: 90,
          description: 'Crisp vocabulary, no hesitation when discussing contain: layout and subgrid specifics.',
          tag: '0.8 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 4.1,
          percentage: 82,
          description: 'Addressed mobile GPU memory overhead and browser devtools Performance profiling tabs.',
          tag: 'Hardware Awareness',
          tier: 'Advanced',
          color: 'secondary'
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.6,
          percentage: 92,
          description: 'Immediate practical relevance to modern CSS-in-JS vs utility-first Tailwind performance comparisons.',
          tag: 'Real Production Experience',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Clear explanation of composite layers and preventing browser repaints with `contain: layout` and subgrid techniques.',
      latency: '1.1s delay',
      duration: '62s',
      transcriptSync: 'Transcript Synced (00:04:45)'
    }
  },
  {
    id: 4,
    specId: '812-FE-ASYNC-BOUNDARIES',
    topic: 'Async Data Fetching & Error Boundaries',
    question: 'How do React Error Boundaries intercept runtime render errors, and what are their limitations when handling asynchronous promise rejections or event handler exceptions?',
    dimensionFocus: 'Resilience & Asynchronous Boundaries',
    weight: 20,
    ttsDuration: '00:13',
    lensDescription: 'Tests knowledge of componentDidCatch, static getDerivedStateFromError, global unhandledrejection handlers, and query boundary coordination.',
    tags: ['#ErrorBoundaries', '#AsyncHandling', '#ReactQuery'],
    defaultTranscript: 'Error boundaries catch render cycle failures and componentDidMount lifecycle bugs in their tree. However, asynchronous promise rejections in fetch callbacks bypass boundaries unless re-thrown into state during render or routed via custom hook handlers.',
    followUpPrompt: 'How would you architect a circuit-breaker fallback for intermittent GraphQL gateway timeouts in a multi-tenant dashboard?',
    followUpAudioDuration: '00:05',
    scores: {
      overall: 3.8,
      weightedPct: 76.0,
      performanceBadge: 'Good Performance',
      summary: 'Demonstrated sound use of React Query suspense integration, though missed mentioning circuit breakers in edge API failure states.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 3.9,
          percentage: 78,
          description: 'Clear grasp of getDerivedStateFromError and boundary scope limits.',
          tag: 'Accurate Limits',
          tier: 'P80 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 3.8,
          percentage: 76,
          description: 'Structured explanation of render phase vs asynchronous task queue boundaries.',
          tag: 'Systematic',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.1,
          percentage: 82,
          description: 'Clear speaking pace with minimal filler pauses.',
          tag: '1.4 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 3.2,
          percentage: 64,
          description: 'Omitted cascading fallbacks and partial page degradation when secondary widgets crash.',
          tag: 'Fallback Depth Needed',
          tier: 'Growth Area',
          color: 'secondary',
          isGrowthOpportunity: true
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.0,
          percentage: 80,
          description: 'Familiar with React Query query client cache fallbacks in production apps.',
          tag: 'Solid Implementation',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Demonstrated sound use of React Query suspense integration, though missed mentioning circuit breakers in edge API failure states.',
      latency: '2.1s delay',
      duration: '81s',
      transcriptSync: 'Transcript Synced (00:06:50)'
    }
  },
  {
    id: 5,
    specId: '819-FE-PERF-VITALS',
    topic: 'Core Web Vitals (LCP, CLS, INP/FID) Optimization',
    question: 'How do you systematically identify and remediate poor Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS) in high-traffic single-page applications?',
    dimensionFocus: 'Core Web Vitals & Production Diagnostics',
    weight: 20,
    ttsDuration: '00:14',
    lensDescription: 'Analyzes understanding of long animation frames (LoAF), main thread blocking tasks, font display swap shifts, and yield-to-main scheduling strategies.',
    tags: ['#CoreWebVitals', '#INP', '#WebPerformance'],
    defaultTranscript: 'Optimizing INP requires breaking up long JavaScript execution blocks using scheduler.yield or requestIdleCallback so the browser can handle user inputs promptly. For CLS, reserving explicit aspect ratio containers for media and loading font files with size-adjust solves shifting.',
    followUpPrompt: 'How would you measure real-user monitoring (RUM) field data vs synthetic Lighthouse scores when rolling out a canary feature?',
    followUpAudioDuration: '00:04',
    scores: {
      overall: 4.5,
      weightedPct: 90.0,
      performanceBadge: 'Exceptional Performance',
      summary: 'Flawless explanation of image prioritization, critical CSS inline paths, font swap descriptors, and script deferral metrics.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.7,
          percentage: 94,
          description: 'Thorough understanding of INP replacing FID and specific scheduling primitives like scheduler.yield().',
          tag: 'Cutting-Edge Web API',
          tier: 'P98 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.4,
          percentage: 88,
          description: 'Structured into Diagnostic -> Measurement -> Code Remedy -> Verification.',
          tag: 'Executive Framework',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.6,
          percentage: 92,
          description: 'Zero hesitation, clean articulation of Web Vitals metrics thresholds.',
          tag: '0.6 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 4.3,
          percentage: 86,
          description: 'Detailed analysis of third-party ad scripts, tag managers, and iframes inducing layout shifts.',
          tag: 'Third-Party Edge Aware',
          tier: 'Comprehensive',
          color: 'secondary'
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.6,
          percentage: 92,
          description: 'Pragmatic, battle-tested solutions ready for high-scale enterprise frontend environments.',
          tag: 'Principal Caliber',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Flawless explanation of image prioritization, critical CSS inline paths, font swap descriptors, and script deferral metrics.',
      latency: '0.8s delay',
      duration: '92s',
      transcriptSync: 'Transcript Synced (00:08:40)'
    }
  }
];

export const DATA_ANALYST_QUESTIONS: QuestionData[] = [
  {
    id: 1,
    specId: '901-DA-SQL-INDEXING',
    topic: 'SQL Window Functions & Query Execution Plans',
    question: 'How do you optimize an analytical query spanning 20M transaction rows using window functions, partitioning, and index selection without spilling to disk?',
    dimensionFocus: 'Query Optimization & Big Data SQL',
    weight: 20,
    ttsDuration: '00:14',
    lensDescription: 'Assesses mastery of EXPLAIN ANALYZE, hash joins vs nested loops, tempdb disk spillage, and composite index positioning.',
    tags: ['#PostgreSQL', '#WindowFunctions', '#QueryPlans'],
    defaultTranscript: 'By leveraging PARTITION BY with indexed columns, filtering pre-aggregation via CTEs, and tuning work_mem parameters, we prevent sorting operations from spilling to disk buffers.',
    followUpPrompt: 'When would you prefer a lateral join over a standard window function with QUALIFY in modern columnar databases?',
    followUpAudioDuration: '00:05',
    scores: {
      overall: 4.3,
      weightedPct: 86.0,
      performanceBadge: 'Great Performance',
      summary: 'Deep familiarity with relational execution planners, cost thresholds, and memory buffering.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.6,
          percentage: 92,
          description: 'Nuanced explanation of buffer cache hits and sorting algorithms.',
          tag: '100% Query Integrity',
          tier: 'P95 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.2,
          percentage: 84,
          description: 'Methodical diagnostic walkthrough from EXPLAIN output to index reorganization.',
          tag: 'Structured Flow',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.4,
          percentage: 88,
          description: 'Concise syntax descriptions without unnecessary SQL jargon overhead.',
          tag: '1.1 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 3.9,
          percentage: 78,
          description: 'Good discussion of skewed data distributions and hash partition hotspotting.',
          tag: 'Data Skew Covered',
          tier: 'Solid',
          color: 'secondary'
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.5,
          percentage: 90,
          description: 'Demonstrated real enterprise warehouse data manipulation agility.',
          tag: 'Enterprise Fluency',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Demonstrated precise understanding of query planner cost nodes, partitioning keys, and disk spill mitigation.',
      latency: '1.0s delay',
      duration: '80s',
      transcriptSync: 'Transcript Synced (00:01:20)'
    }
  },
  {
    id: 2,
    specId: '904-DA-ETL-IDEMPOTENCY',
    topic: 'ETL Pipeline Resilience & Idempotency',
    question: 'How do you design a high-throughput ETL data pipeline to guarantee idempotency and zero duplicate ingestion under intermittent network retries?',
    dimensionFocus: 'Data Modeling & Pipeline Resilience',
    weight: 25,
    ttsDuration: '00:15',
    lensDescription: 'Evaluates deduping strategies (upsert/merge keys), write-ahead transaction logs, dead letter queues, and Airflow orchestration.',
    tags: ['#ETL', '#DataPipelines', '#Idempotency'],
    defaultTranscript: 'Idempotency is maintained by attaching deterministic hash keys to event payloads and executing atomic MERGE operations within staging transactions, routing corrupted rows to an isolated dead-letter queue.',
    followUpPrompt: 'How do you address late-arriving dimension changes when tracking historical state with Type-2 Slowly Changing Dimensions (SCD2)?',
    followUpAudioDuration: '00:05',
    scores: {
      overall: 4.1,
      weightedPct: 82.0,
      performanceBadge: 'Strong Performance',
      summary: 'Clear architecture design incorporating stage tables, surrogate keys, and deterministic replay loops.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.3,
          percentage: 86,
          description: 'Sound explanation of transactional atomicity and staging table isolation.',
          tag: 'Architecturally Sound',
          tier: 'P90 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.1,
          percentage: 82,
          description: 'Addressed ingestion, transformation, deduplication, and verification systematically.',
          tag: 'End-to-End Logic',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.4,
          percentage: 88,
          description: 'Clean articulate responses with great speech rhythm.',
          tag: '1.0 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 3.6,
          percentage: 72,
          description: 'Could have expanded on schema drift handling and backfilling historical anomalies.',
          tag: 'Schema Drift Nuance',
          tier: 'Actionable',
          color: 'secondary',
          isGrowthOpportunity: true
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.3,
          percentage: 86,
          description: 'Strong practical alignment with modern cloud data warehouse orchestrations.',
          tag: 'Pipeline Production Model',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Explained staging tables, deduplication hashes, and atomic merge mechanics with strong clarity.',
      latency: '1.2s delay',
      duration: '76s',
      transcriptSync: 'Transcript Synced (00:03:10)'
    }
  },
  {
    id: 3,
    specId: '907-DA-METRIC-MODELING',
    topic: 'Cohort & Funnel Metric Modeling',
    question: 'How do you define and model a rolling 30-day user retention cohort in SQL, accounting for timezone offsets and day-0 churn noise?',
    dimensionFocus: 'Business Intelligence & Metrics Definition',
    weight: 20,
    ttsDuration: '00:13',
    lensDescription: 'Assesses retention calculation methodology, UTC conversion conventions, event attribution, and BI dashboard aggregation.',
    tags: ['#UserRetention', '#CohortAnalysis', '#BusinessIntelligence'],
    defaultTranscript: 'We anchor each user by their first verified activity timestamp converted strictly to UTC, bucket them into cohort week/month bins, and join subsequent activity intervals to calculate rolling retention percentages.',
    followUpPrompt: 'How would you differentiate organic retention decay from tracking telemetry dropouts?',
    followUpAudioDuration: '00:04',
    scores: {
      overall: 4.4,
      weightedPct: 88.0,
      performanceBadge: 'Distinguished',
      summary: 'Superb statistical intuition and sharp understanding of retention tracking edge conditions.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.6,
          percentage: 92,
          description: 'Clean formulation of date_trunc and interval arithmetic.',
          tag: 'Mathematically Rigorous',
          tier: 'P96 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.3,
          percentage: 86,
          description: 'Decomposed the problem into definition, cohort segmentation, and metric normalization.',
          tag: 'Decomposed Logic',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.5,
          percentage: 90,
          description: 'Effortless articulation of product telemetry and business KPI alignment.',
          tag: 'Executive Fluency',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 4.1,
          percentage: 82,
          description: 'Discussed daylight savings shifts and leap second timestamp anomalies.',
          tag: 'Timezone Edge Resilient',
          tier: 'Comprehensive',
          color: 'secondary'
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.5,
          percentage: 90,
          description: 'Directly applicable to executive decision dashboards and investor metrics.',
          tag: 'C-Suite Ready',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Clear methodology on UTC conversions, rolling windows, and eliminating day-0 noise.',
      latency: '0.8s delay',
      duration: '85s',
      transcriptSync: 'Transcript Synced (00:04:55)'
    }
  },
  {
    id: 4,
    specId: '912-DA-SCHEMA-TRADEOFFS',
    topic: 'Data Warehousing Schema Tradeoffs (Star vs Snowflake)',
    question: 'What are the architectural tradeoffs between Star Schema and Snowflake Schema in modern columnar analytical warehouses like BigQuery or Snowflake?',
    dimensionFocus: 'Data Architecture & Storage Efficiency',
    weight: 15,
    ttsDuration: '00:14',
    lensDescription: 'Compares denormalization scan penalties, storage costs, join performance in modern columnar engines, and BI reporting simplicity.',
    tags: ['#StarSchema', '#BigQuery', '#DataModeling'],
    defaultTranscript: 'Modern columnar stores heavily optimize wide denormalized tables through columnar compression and partition pruning, making the traditional storage benefits of Snowflake schemas negligible compared to the query join overhead they introduce.',
    followUpPrompt: 'When might deep normalization still be advantageous for compliance governance like GDPR right-to-be-forgotten requests?',
    followUpAudioDuration: '00:05',
    scores: {
      overall: 4.2,
      weightedPct: 84.0,
      performanceBadge: 'Great Performance',
      summary: 'Accurately recognized how cloud columnar architectures inverted traditional database normalization rules.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.4,
          percentage: 88,
          description: 'Understands columnar storage mechanics vs row-oriented RDBMS.',
          tag: 'Accurate Principles',
          tier: 'P92 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.2,
          percentage: 84,
          description: 'Balanced pros and cons before articulating definitive modern recommendations.',
          tag: 'Objective Analysis',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.3,
          percentage: 86,
          description: 'Spoke clearly with high confidence and structured comparisons.',
          tag: '1.2 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 3.8,
          percentage: 76,
          description: 'Addressed nested & repeated records in BigQuery as modern alternatives to joining.',
          tag: 'Modern Primitives',
          tier: 'Strong',
          color: 'secondary'
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.3,
          percentage: 86,
          description: 'Demonstrated direct familiarity with multi-terabyte analytical warehouses.',
          tag: 'Industry Aligned',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Insightful breakdown of columnar compression vs relational join penalties.',
      latency: '1.1s delay',
      duration: '72s',
      transcriptSync: 'Transcript Synced (00:06:40)'
    }
  },
  {
    id: 5,
    specId: '918-DA-ANOMALY-DETECTION',
    topic: 'Anomaly Detection in High-Volume Event Streams',
    question: 'How do you establish statistical control limits and Z-score baselines to detect anomalous revenue or event transaction dropouts in near real-time?',
    dimensionFocus: 'Statistical Modeling & Outlier Detection',
    weight: 20,
    ttsDuration: '00:15',
    lensDescription: 'Assesses knowledge of exponential moving averages (EMA), seasonal decomposition (STL), false-positive dampening, and alerting thresholds.',
    tags: ['#AnomalyDetection', '#Statistics', '#EventStreams'],
    defaultTranscript: 'We model rolling median and interquartile ranges (IQR) or exponentially weighted moving averages to establish dynamic standard deviation bands, adjusting for weekly day-of-week seasonality to prevent false alarm alerts during off-peak hours.',
    followUpPrompt: 'How do you prevent alert fatigue when seasonal marketing campaigns trigger deliberate traffic surges?',
    followUpAudioDuration: '00:04',
    scores: {
      overall: 4.3,
      weightedPct: 86.0,
      performanceBadge: 'Great Performance',
      summary: 'Robust statistical foundation with keen focus on practical false-positive suppression.',
      dimensions: [
        {
          name: '1. Technical Accuracy & Correctness',
          weight: 25,
          score: 4.5,
          percentage: 90,
          description: 'Distinguished non-parametric methods like IQR from Gaussian assumptions on skewed traffic.',
          tag: 'Robust Statistics',
          tier: 'P94 Tier',
          color: 'tertiary'
        },
        {
          name: '2. Problem-Solving Structure',
          weight: 25,
          score: 4.2,
          percentage: 84,
          description: 'Outlined baseline calculation, seasonal adjustment, and alert thresholding.',
          tag: 'Structured Design',
          tier: 'Linear Progression',
          color: 'primary'
        },
        {
          name: '3. Communication Clarity & Conciseness',
          weight: 20,
          score: 4.4,
          percentage: 88,
          description: 'Natural pacing and authoritative command of statistical terminology.',
          tag: '0.9 Fillers/min',
          tier: 'Pacing Optimal',
          color: 'tertiary'
        },
        {
          name: '4. Depth & Edge Cases',
          weight: 15,
          score: 4.0,
          percentage: 80,
          description: 'Good awareness of flash sales and holiday spikes distorting historical baselines.',
          tag: 'Outlier Prone',
          tier: 'Comprehensive',
          color: 'secondary'
        },
        {
          name: '5. Role-Specific Delivery & Practical Fluency',
          weight: 15,
          score: 4.4,
          percentage: 88,
          description: 'Realistic operational awareness of on-call alerting dynamics.',
          tag: 'Production Savvy',
          tier: 'Full Alignment',
          color: 'tertiary'
        }
      ]
    },
    diagnostics: {
      summary: 'Formulated dynamic moving average bands and seasonality correction with great statistical rigor.',
      latency: '0.9s delay',
      duration: '86s',
      transcriptSync: 'Transcript Synced (00:08:35)'
    }
  }
];

export const INITIAL_AUDIO_SETTINGS = {
  micGain: 85,
  noiseSuppression: true,
  echoCancellation: true,
  sampleRate: '48.0kHz' as const,
  audioCodec: 'Opus' as const,
  ttsSpeed: 1.0,
  ttsVoice: 'Neural-Studio-En'
};
