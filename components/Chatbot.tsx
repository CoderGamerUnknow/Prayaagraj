'use client';

import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import Markdown from 'react-markdown';
import { MessageCircle, X, Send, Loader2, BrainCircuit, UtensilsCrossed } from 'lucide-react';

type MenuItem = {
  name: string;
  price: string;
  description: string;
};

type ChatMessage = {
  role: 'user' | 'model';
  text: string;
  menuItems?: MenuItem[];
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am the Cafe Potoba assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      aiRef.current = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !aiRef.current) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = aiRef.current.chats.create({
          model: 'gemini-3.1-pro-preview',
          config: {
            systemInstruction: `You are a helpful, polite, and warm assistant for Cafe Potoba, an authentic Maharashtrian restaurant in Ilupeju, Lagos. 
Always reflect the Cafe Potoba brand: authentic, welcoming, and rooted in Maharashtrian culinary tradition. Use occasional Marathi greetings like 'Namaste' or 'Dhanyawad'.
When a user asks about the menu, specific dishes, or prices, you MUST provide the exact details using the structured menuItems array in your response. 
Here is our menu for reference:
- Vada Pav: ₦1,700 (Spicy potato dumpling fried in gram flour batter, served in a soft bun with chutneys)
- Misal Pav: ₦4,500 (Spicy sprouted moth bean curry topped with farsan, onions, and lemon, served with pav)
- Sabudana Vada: ₦3,000 (Crispy sago and peanut fritters, a fasting favorite)
- Kanda Poha: ₦2,000 (Flattened rice cooked with onions, peanuts, and turmeric)
- Maharashtrian Thali: ₦8,000 (Complete meal with 2 sabzis, dal, rice, 3 chapatis, sweet, and papad)
- Gulab Jamun (3 pcs): ₦2,500 (Soft milk dumplings in rose-scented sugar syrup)
- Puran Poli: ₦2,000 (Sweet stuffed flatbread with chana dal & jaggery filling)
- Fresh Lime Soda: ₦1,200 (Sparkling lime water — sweet, salted or masala)
- Masala Chai: ₦1,000 (Authentic Indian spiced tea brewed with milk)

Provide direct, structured answers for menu items rather than general conversational replies.`,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: { 
                  type: Type.STRING, 
                  description: 'Your polite and helpful conversational reply to the user.' 
                },
                menuItems: {
                  type: Type.ARRAY,
                  description: 'A list of specific menu items if the user asked about food, drinks, or prices. Leave empty if not applicable.',
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      price: { type: Type.STRING },
                      description: { type: Type.STRING }
                    },
                    required: ['name', 'price', 'description']
                  }
                }
              },
              required: ['reply', 'menuItems']
            }
          }
        });
      }

      const response = await chatRef.current.sendMessage({ message: userMessage });
      
      try {
        const data = JSON.parse(response.text);
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: data.reply,
          menuItems: data.menuItems && data.menuItems.length > 0 ? data.menuItems : undefined
        }]);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Kshamaswa (Sorry), I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-orange-600 text-white rounded-full shadow-xl hover:bg-orange-500 transition-all z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`} style={{ height: '500px', maxHeight: '80vh' }}>
        {/* Header */}
        <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
          <div>
            <h3 className="font-medium font-serif text-lg">Potoba Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-orange-200 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-orange-600 text-white rounded-tr-sm' : 'bg-white border border-orange-100 text-gray-800 rounded-tl-sm shadow-sm'}`}>
                {msg.role === 'model' ? (
                  <div className="prose prose-sm prose-orange max-w-none">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
              
              {/* Structured Menu Items Display */}
              {msg.menuItems && msg.menuItems.length > 0 && (
                <div className="mt-2 w-[90%] space-y-2">
                  {msg.menuItems.map((item, i) => (
                    <div key={i} className="bg-white border border-orange-200 rounded-lg p-3 shadow-sm flex flex-col gap-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-serif font-medium text-gray-900">{item.name}</span>
                        <span className="text-orange-600 font-semibold whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-orange-100 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2 text-orange-600 text-sm">
                <BrainCircuit size={16} className="animate-pulse" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-orange-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our menu..."
              className="flex-1 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-sm focus:outline-none focus:border-orange-400"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="p-2 bg-orange-600 text-white rounded-full disabled:opacity-50 hover:bg-orange-500 transition-colors"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
