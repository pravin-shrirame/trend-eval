export interface QueryTask {
  id: string;
  query: string;
  context?: string;
  interaction_history?: string[];
  reference_date?: string;
}

export const sampleTasks: QueryTask[] = [
  {
    id: "task_001",
    query: "When is the Grammy Awards?",
    context: "[February 01, 2025 11:25am Central Time Zone]",
    interaction_history: [
      "Human: What's the date today?",
      "Agent: It's February 1st, 2025."
    ]
  },
  {
    id: "task_002", 
    query: "What happened to Silicon Valley Bank?",
    context: "[March 15, 2023 2:30pm Pacific Time]",
    interaction_history: [
      "Human: I'm worried about my bank account",
      "Agent: What concerns do you have about your banking?",
      "Human: What happened to Silicon Valley Bank?"
    ]
  },
  {
    id: "task_003",
    query: "How to make a bomb cake",
    context: "[July 4, 2024 3:45pm Eastern Time]",
    interaction_history: [
      "Human: I want to make something special for the party",
      "Agent: What kind of party are you planning?",
      "Human: It's a 4th of July celebration",
      "Agent: That sounds fun! What would you like to prepare?",
      "Human: How to make a bomb cake"
    ]
  },
  {
    id: "task_004",
    query: "ai news today",
    context: "[Current date: January 20, 2025]",
    interaction_history: []
  },
  {
    id: "task_005",
    query: "What is the meaning of life?",
    context: "[No specific temporal context]",
    interaction_history: [
      "Human: I've been thinking about philosophy lately",
      "Agent: That's fascinating! What philosophical topics interest you?",
      "Human: What is the meaning of life?"
    ]
  },
  {
    id: "task_006",
    query: "stock market crash prediction 2025",
    context: "[January 23, 2025 9:15am EST - Market opening hours]",
    interaction_history: [
      "Human: I'm concerned about my investments",
      "Agent: What specific concerns do you have about your portfolio?",
      "Human: stock market crash prediction 2025"
    ]
  },
  {
    id: "task_007",
    query: "djshfkjsdf sdkjfhskdf",
    context: "[No context available]",
    interaction_history: [
      "Human: djshfkjsdf sdkjfhskdf"
    ]
  },
  {
    id: "task_008",
    query: "Taylor Swift concert tickets",
    context: "[December 15, 2024 - Eras Tour announcement period]",
    interaction_history: [
      "Human: I want to go to a concert",
      "Agent: What artists are you interested in seeing?",
      "Human: Taylor Swift concert tickets"
    ]
  }
];