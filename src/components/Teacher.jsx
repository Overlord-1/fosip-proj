import React, { useState } from 'react';
import { PlusCircle, Trash2, Link as LinkIcon, Save } from 'lucide-react';
import axios from 'axios';

const ClaudeTest = () => {
  const [form, setForm] = useState({
    title: 'Test Name',
    questions: [],
  });
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const addQuestion = () => {
    if (!currentQuestionText.trim()) return;

    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, currentQuestionText],
    }));

    // Reset input field
    setCurrentQuestionText('');
  };

  const removeQuestion = (index) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nameOfTest', form.title);
      formData.append('questions', JSON.stringify(form.questions));

      if (pdfFile) {
        formData.append('pdf', pdfFile);
        console.log('PDF File:', pdfFile);
      }

      // Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post('http://localhost:3500/test/test', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });


      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          className="text-2xl font-bold w-full mr-4 p-2 border rounded focus:outline-blue-500"
        />

        <div className="mb-6 flex space-x-2 mt-4">
          <input
            type="text"
            value={currentQuestionText}
            onChange={(e) => setCurrentQuestionText(e.target.value)}
            placeholder="Enter your question"
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>

        {form.questions.map((question, index) => (
          <div
            key={index}
            className="p-4 mb-6 border border-gray-300 rounded-lg bg-gray-50 flex justify-between items-center"
          >
            <span className="text-lg">{question}</span>
            <button
              onClick={() => removeQuestion(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <div className="mt-6">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="p-2 border rounded focus:outline-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaudeTest;