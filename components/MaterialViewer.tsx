import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { MaterialTopic } from '../types';
import { getLearningMaterial } from '../services/geminiService';
import { Loader2 } from 'lucide-react';

interface MaterialViewerProps {
  topic: MaterialTopic;
}

export const MaterialViewer: React.FC<MaterialViewerProps> = ({ topic }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMaterial = async () => {
      setLoading(true);
      const data = await getLearningMaterial(topic);
      setContent(data);
      setLoading(false);
    };
    fetchMaterial();
  }, [topic]);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen">
      <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border-4 border-pastel-yellow/30 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pastel-pink/20 rounded-full blur-2xl"></div>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-pastel-pink inline-block pb-2">
          {topic}
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-pastel-pink animate-spin" />
            <p className="text-gray-500 font-medium animate-pulse">Sedang menyusun materi akademis...</p>
          </div>
        ) : (
          <div className="prose prose-lg prose-pink max-w-none text-gray-600">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({node, ...props}) => <h2 className="text-2xl font-bold text-orange-400 mt-6 mb-4" {...props} />,
                h2: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-700 mt-5 mb-3" {...props} />,
                strong: ({node, ...props}) => <span className="font-bold text-pink-500" {...props} />,
                blockquote: ({node, ...props}) => <div className="bg-pastel-cream border-l-4 border-pastel-yellow p-4 italic rounded-r-lg my-4" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};