import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini API client
// The API key is injected by the environment
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface SearchFilter {
  commodity?: string[];
  location?: string[];
  stage?: string[];
  intention?: string[];
  listingType?: string[];
  priceRange?: { min?: number; max?: number; currency?: string };
}

export interface AIOverviewResponse {
  summary: string;
  keyTakeaways: string[];
  suggestedRefinements: string[];
}

/**
 * Generates an AI overview for search results.
 */
export async function generateSearchOverview(query: string, resultsSummary: string): Promise<AIOverviewResponse> {
  if (!ai) {
    console.warn("Gemini API key not found. Returning mock response.");
    return {
      summary: "AI Overview is unavailable (API Key missing).",
      keyTakeaways: [],
      suggestedRefinements: []
    };
  }

  try {
    const model = "gemini-2.5-flash-latest";
    const prompt = `
      You are an expert mining investment analyst. 
      Analyze the following search query and the summary of the search results found on "The Minexchange".
      
      User Query: "${query}"
      Search Results Summary: ${resultsSummary}
      
      Provide a concise market overview, 3 key takeaways, and 3 suggested search refinements.
      Return the response in JSON format with the following schema:
      {
        "summary": "string",
        "keyTakeaways": ["string", "string", "string"],
        "suggestedRefinements": ["string", "string", "string"]
      }
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AIOverviewResponse;
  } catch (error) {
    console.error("Error generating AI overview:", error);
    return {
      summary: "Unable to generate AI overview at this time.",
      keyTakeaways: [],
      suggestedRefinements: []
    };
  }
}

/**
 * Interprets a natural language search query into structured filters.
 */
export async function interpretSearchQuery(query: string): Promise<SearchFilter> {
  if (!ai) {
    return {};
  }

  try {
    const model = "gemini-2.5-flash-latest";
    const prompt = `
      You are a search query parser for a mining asset marketplace.
      Convert the user's natural language query into structured filters.
      
      Available Commodities: Gold, Copper, Lithium, Nickel, Cobalt, Zinc, Silver, REE, Iron Ore, Coal, Uranium.
      Available Locations: Western Australia, Chile, Peru, Canada, USA, Brazil, Africa.
      Available Stages: Exploration, Development, Production, Care & Maintenance.
      Available Intentions: Asset Sale, Share Sale, Joint Venture, Offtake.
      
      User Query: "${query}"
      
      Return a JSON object with the following optional keys: commodity (array), location (array), stage (array), intention (array).
      Only include keys that are explicitly mentioned or strongly implied.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as SearchFilter;
  } catch (error) {
    console.error("Error interpreting search query:", error);
    return {};
  }
}

/**
 * Chatbot response generation for a specific listing.
 */
export async function generateListingChatResponse(
  query: string, 
  listingData: any, 
  isGated: boolean
): Promise<string> {
  if (!ai) {
    return "I'm sorry, I can't answer that right now (API Key missing).";
  }

  try {
    const model = "gemini-2.5-flash-latest";
    
    // Filter out sensitive data if gated
    const safeListingData = { ...listingData };
    if (isGated) {
      delete safeListingData.documents;
      delete safeListingData.detailedResourceModel;
      delete safeListingData.contactInfo;
      // Add more redactions as needed
    }

    const prompt = `
      You are a helpful assistant on "The Minexchange".
      You are answering questions about a specific mining asset listing.
      
      Listing Context: ${JSON.stringify(safeListingData)}
      
      User Question: "${query}"
      
      Constraints:
      1. Only answer based on the provided listing context.
      2. If the user asks for information that is likely in the "documents" or "detailed data" but is not in the context (because it's gated), politely explain that they need to sign the NDA to access that information.
      3. Be professional, concise, and helpful.
      4. Do not make up facts.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "I'm having trouble connecting to the AI service right now.";
  }
}
