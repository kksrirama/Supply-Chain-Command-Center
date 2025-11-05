
import { GoogleGenAI } from "@google/genai";
import type { Coordinates, ExternalEvent } from '../types';

export const fetchExternalEvents = async (location: Coordinates): Promise<ExternalEvent> => {
    if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set.");
        return {
            summary: "API Key not configured. Please set the API_KEY environment variable to fetch real-time event data.",
            sources: []
        };
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = `
            Based on the current location, identify potential supply chain disruptions in Europe.
            Focus on events relevant to consumer product logistics, such as:
            - Extreme weather events (storms, floods, heatwaves)
            - Transportation strikes (port workers, rail, trucking)
            - Major traffic incidents or infrastructure closures
            - Political or social unrest impacting logistics hubs
            - Port congestion
            Summarize the top 3-4 most critical events concisely.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig: {
                    retrievalConfig: {
                        latLng: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }
                    }
                }
            },
        });

        const summary = response.text;
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        return { summary, sources };
    } catch (error) {
        console.error("Error fetching external events from Gemini API:", error);
        throw new Error("Could not fetch data from Google Gemini API.");
    }
};
