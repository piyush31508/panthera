import React, { useState } from "react";
import { X, Bot, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqList = [
    {
      question: "How to register?",
      answer:
        'Click on the "Sign Up" button on the homepage and fill in your details.',
    },
    {
      question: "How to search properties?",
      answer:
        "Go to the Dashboard, then use the search bar or map to find properties.",
    },
    {
      question: "How to contact an agent?",
      answer:
        "Each property listing has an agent contact section with phone and email.",
    },
    {
      question: "How to reset password?",
      answer:
        'On the login page, click on "Forgot password" to receive a reset link.',
    },
    {
      question: "What is Panthera Infotech?",
      answer:
        "Panthera Infotech is a platform to explore, manage, and analyze real estate data.",
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-72 sm:w-80 bg-white border border-yellow-200 shadow-2xl p-4 rounded-xl z-50">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <Bot className="text-amber-500 w-5 h-5" />
              <h3 className="text-amber-700 font-semibold text-lg">
                Panthera Chatbot
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Intro Text */}
          <p className="text-sm text-gray-600 mb-2">
            Hi! How can I assist you today? 👇
          </p>

          {/* FAQs */}
          <div className="space-y-2 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent pr-1">
            {faqList.map((faq, index) => (
              <div
                key={index}
                className="border border-amber-100 rounded-lg bg-amber-50 hover:bg-amber-100 transition"
              >
                <button
                  onClick={() => toggleAnswer(index)}
                  className="w-full flex justify-between items-center px-3 py-2 text-left text-amber-700 font-medium"
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openIndex === index && (
                  <p className="px-3 pb-3 text-sm text-gray-700">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-110 z-40 ${
          isOpen
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 mx-auto" />
        ) : (
          <MessageCircle className="h-6 w-6 mx-auto" />
        )}
      </button>
    </>
  );
}

export default ChatbotWidget;
