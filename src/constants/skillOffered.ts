export const MENTOR_SKILL_OFFERED = {
    BRANDING_AND_POSITIONING: 'Branding and Positioning',
    MARKET_RESEARCH_AND_COMPETITOR_ANALYSIS:
        'Market Research and Competitor Analysis',
    PRODUCT_DEVELOPMENT: 'Product Development',
    GO_TO_MARKET_STRATEGY: 'Go-to-Market Strategy',
    SALES_AND_BUSINESS_DEVELOPMENT: 'Sales and Business Development',
    DIGITAL_MARKETING_AND_SEO_SEM: 'Digital Marketing and SEO/SEM',
    FUNDRAISING_STRATEGY_AND_PITCHING: 'Fundraising Strategy and Pitching',
    FINANCIAL_MODELING_AND_PROJECTIONS: 'Financial Modeling and Projections',
    TEAM_BUILDING_AND_HR_MANAGEMENT: 'Team Building and HR Management',
    OPERATIONS_AND_SCALABILITY: 'Operations and Scalability',
    TECHNOLOGY_STACK_AND_ARCHITECTURE_PRIMARILY_SOFTWARE_DIGITAL:
        'Technology Stack and Architecture (Primarily Software/Digital)',
    GROWTH_HACKING: 'Growth Hacking',
    CUSTOMER_ACQUISITION_AND_RETENTION: 'Customer Acquisition and Retention',
    PARTNERSHIP_DEVELOPMENT: 'Partnership Development',
    MANUFACTURING_PROCESS_OPTIMIZATION: 'Manufacturing Process Optimization',
    INVENTORY_MANAGEMENT_BASICS: 'Inventory Management Basics',
} as const;

export type skillOfferedCode = keyof typeof MENTOR_SKILL_OFFERED;
export type SkillOffered = skillOfferedCode[];