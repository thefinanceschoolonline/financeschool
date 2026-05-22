'use server';
/**
 * @fileOverview An AI-powered tool that recommends a personalized curriculum roadmap based on a student's trading background and financial goals.
 *
 * - personalLearningPathFinder - A function that initiates the personalized learning path recommendation process.
 * - PersonalLearningPathFinderInput - The input type for the personalLearningPathFinder function.
 * - PersonalLearningPathFinderOutput - The return type for the personalLearningPathFinder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalLearningPathFinderInputSchema = z.object({
  tradingBackground: z
    .string()
    .describe(
      'A description of the student\'s current trading knowledge and experience (e.g., "beginner", "intermediate with some options experience", "experienced in crypto but new to NISM").'
    ),
  financialGoals: z
    .string()
    .describe(
      'A description of the student\'s financial goals (e.g., "become a profitable day trader", "pass NISM Series 8", "understand crypto investments", "build long-term wealth").'
    ),
});
export type PersonalLearningPathFinderInput = z.infer<
  typeof PersonalLearningPathFinderInputSchema
>;

const PersonalLearningPathFinderOutputSchema = z.object({
  learningPathDescription: z
    .string()
    .describe('A general description of the recommended personalized learning path.'),
  recommendedCourses: z
    .array(
      z.object({
        courseName: z
          .string()
          .describe('The name of the recommended course.'),
        courseDescription: z
          .string()
          .describe('A brief explanation of why this course is recommended.'),
        relevance: z
          .string()
          .describe('How relevant this course is to the student\'s goals.'),
      })
    )
    .describe('A list of courses recommended for the student.'),
});
export type PersonalLearningPathFinderOutput = z.infer<
  typeof PersonalLearningPathFinderOutputSchema
>;

export async function personalLearningPathFinder(
  input: PersonalLearningPathFinderInput
): Promise<PersonalLearningPathFinderOutput> {
  return personalLearningPathFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalLearningPathFinderPrompt',
  input: {schema: PersonalLearningPathFinderInputSchema},
  output: {schema: PersonalLearningPathFinderOutputSchema},
  prompt: `You are an expert financial education advisor at The Finance School. Your goal is to provide a personalized learning path and course recommendations to students based on their background and financial goals. You must analyze the student's input and recommend the most suitable courses from the list below, explaining your choices clearly.

Here are the available courses:

1.  **NISM ( SEBI ) SERIES 8 – EQUITY AND DERIVATIVES LECTURES WITH BOOKS COMBO**
    *   Syllabus: NISM Series 8 Complete Syllabus, Equity & Derivatives Concepts, Recorded Video Lectures, Study Material Included, Beginner Friendly.
    *   Target Audience: Beginners, those aiming for NISM Series 8 certification, individuals wanting to understand equity and derivatives markets from a foundational level.

2.  **NISM ( SEBI ) SERIES 15 – RESEARCH ANALYST CERTIFICATION EXAM WITH BOOKS COMBO**
    *   Syllabus: NISM Series 15 Full Syllabus, Equity Research & Valuation, Financial Statement Analysis, SEBI Regulations Covered, Hindi + Easy Explanation.
    *   Target Audience: Those interested in financial research, equity valuation, financial statement analysis, and becoming a certified research analyst.

3.  **THE ULTIMATE CRYPTO TRADING COURSE – A TO Z: Beginner to Advanced ( LW Strategy Included )**
    *   Syllabus: Beginner to Advanced Crypto Trading, LW Strategy Included, Market Structure & Liquidity Concepts, Trade Setup & Execution, Real Market Insights.
    *   Target Audience: Anyone from absolute beginners to advanced traders interested in understanding and actively trading cryptocurrencies.


Student Information:
-   Trading Background: {{{tradingBackground}}}
-   Financial Goals: {{{financialGoals}}}


Based on the student's background and goals, provide a personalized learning path and recommend the most relevant courses. Ensure your recommendations are practical and align directly with their stated objectives. Structure your response as a JSON object matching the provided schema.`,
});

const personalLearningPathFinderFlow = ai.defineFlow(
  {
    name: 'personalLearningPathFinderFlow',
    inputSchema: PersonalLearningPathFinderInputSchema,
    outputSchema: PersonalLearningPathFinderOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate learning path recommendations.');
    }
    return output;
  }
);
