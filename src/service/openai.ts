"use server"

import { handleFetchError } from "@/lib/utils";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'example-key',
    dangerouslyAllowBrowser: true
});

export async function getAIResponse(prompt: string): Promise<string | { error: string }> {
    try {
        const response = await openai.responses.create({
            model: "gpt-4o-mini",
            input: prompt
        });

        return response.output_text ?? '';
    } catch (error) {
        console.error("Error en server action:", error);
        return handleFetchError(error); 
    }
}
    