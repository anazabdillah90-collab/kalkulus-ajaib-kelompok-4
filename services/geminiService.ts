import { GoogleGenAI, Type } from "@google/genai";
import { CalculationResult, CalculatorMode, MaterialTopic } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const solveMathProblem = async (
  mode: CalculatorMode,
  expression: string,
  additionalParams: Record<string, string>
): Promise<CalculationResult> => {
  const model = "gemini-3-pro-preview";

  let contextParams = "";
  if (mode === CalculatorMode.LIMIT) {
    contextParams = `Limit mendekati ${additionalParams.limitTo || '0'}.`;
  } else if (mode === CalculatorMode.AREA) {
    contextParams = `Hitung luas dari x=${additionalParams.lowerBound} sampai x=${additionalParams.upperBound}.`;
  } else if (mode === CalculatorMode.VOLUME) {
    contextParams = `Putar mengelilingi sumbu ${additionalParams.axis} dari x=${additionalParams.lowerBound} sampai x=${additionalParams.upperBound}.`;
  }

  const prompt = `
  Bertindaklah sebagai Dosen Matematika Akademis yang profesional, teliti, dan formal.
  Tugas: Selesaikan soal kalkulus berikut dengan ketepatan tinggi.

  Konteks Soal:
  - Mode: ${mode}
  - Fungsi: ${expression}
  - Parameter Tambahan: ${contextParams}

  INSTRUKSI FORMATTING (WAJIB):
  1. **Gaya Bahasa**: Gunakan Bahasa Indonesia yang **formal, baku, dan akademis**. Hindari kata-kata santai atau gaul. Gunakan istilah matematika yang presisi.
  2. **Rumus Matematika (PENTING)**: 
     - Semua ekspresi matematika, variabel, angka, dan rumus WAJIB ditulis dalam format **LaTeX**.
     - Apit semua kode LaTeX dengan tanda dolar satu ($...$).
     - Contoh Benar: "Maka, turunan dari $f(x) = x^2$ adalah $f'(x) = 2x$."
     - Contoh Benar: "Kita gunakan rumus integral $\\int_{a}^{b} f(x) dx$."
     - JANGAN tulis tanpa LaTeX (contoh salah: "integral dari a ke b").

  Output yang diminta (JSON):
  1. "finalAnswer": Hasil akhir matematika dalam format LaTeX (diapit $).
  2. "steps": Array string. Langkah penyelesaian detail menggunakan bahasa formal dan rumus LaTeX.
  3. "explanation": Penjelasan konseptual akademis mengenai metode yang digunakan.
  4. "graphData": Array objek untuk plot grafik (x dari -10 sampai 10). Struktur: [{"x": -5, "y": 25}, ...].

  Pastikan respons valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            finalAnswer: { type: Type.STRING },
            steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            explanation: { type: Type.STRING },
            graphData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  y2: { type: Type.NUMBER, description: "Optional second function value for area between curves" }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as CalculationResult;
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      finalAnswer: "Error",
      steps: ["Terjadi kesalahan sistem saat memproses permintaan Anda."],
      explanation: "Mohon periksa koneksi jaringan Anda atau coba kembali beberapa saat lagi.",
      graphData: []
    };
  }
};

export const getLearningMaterial = async (topic: MaterialTopic): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const prompt = `
  Buatlah materi pembelajaran mendalam mengenai topik kalkulus: "${topic}".
  
  Instruksi:
  1. **Gaya Bahasa**: Formal, akademis, dan edukatif (seperti buku teks perguruan tinggi).
  2. **Format Matematika**: Gunakan **LaTeX** yang diapit tanda dolar ($...$) untuk semua rumus dan simbol matematika agar terlihat indah.
  3. **Struktur**: Gunakan format Markdown (Judul, Daftar, Bold).
  4. Jelaskan definisi, teorema, pembuktian singkat (jika relevan), dan contoh soal.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "Materi tidak tersedia saat ini.";
  } catch (error) {
    return "Gagal memuat materi pembelajaran.";
  }
};