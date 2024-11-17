import React, { useState } from 'react';
import { PlusCircle, Trash2, Link as LinkIcon, Save } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ClaudeTest = () => {
  const [form, setForm] = useState({
    title: 'Untitled Form',
    description: 'Form description',
    questions: [],
  });

  const [isPreview, setIsPreview] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [responses, setResponses] = useState({});

  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: uuidv4(),
          type: 'text',
          question: 'New Question',
          required: false,
          options: [],
        },
      ],
    }));
  };

  const removeQuestion = (id) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  };

  const updateQuestion = (id, updates) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    }));
  };

  const addOption = (questionId) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                { id: uuidv4(), value: `Option ${q.options.length + 1}` },
              ],
            }
          : q
      ),
    }));
  };

  const removeOption = (questionId, optionId) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((opt) => opt.id !== optionId),
            }
          : q
      ),
    }));
  };

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form responses:', responses);
    alert('Form submitted successfully!');
    setResponses({});
  };

  const QuestionEditor = ({ question }) => (
    <div className="p-4 mb-6 border border-gray-300 rounded-lg bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={question.question}
          onChange={(e) =>
            updateQuestion(question.id, { question: e.target.value })
          }
          className="text-lg font-medium w-full mr-4 p-2 border rounded focus:outline-blue-500"
        />
        <button
          onClick={() => removeQuestion(question.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <select
        value={question.type}
        onChange={(e) => updateQuestion(question.id, { type: e.target.value })}
        className="w-full p-2 border rounded focus:outline-blue-500"
      >
        <option value="text">Short Answer</option>
        <option value="textarea">Long Answer</option>
        <option value="radio">Multiple Choice</option>
        <option value="checkbox">Checkboxes</option>
      </select>

      {(question.type === 'radio' || question.type === 'checkbox') && (
        <div className="mt-4 space-y-2">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center">
              <input type={question.type} disabled className="mr-2" />
              <input
                type="text"
                value={option.value}
                onChange={(e) => {
                  const newOptions = question.options.map((opt) =>
                    opt.id === option.id
                      ? { ...opt, value: e.target.value }
                      : opt
                  );
                  updateQuestion(question.id, { options: newOptions });
                }}
                className="p-1 border rounded focus:outline-blue-500"
              />
              <button
                onClick={() => removeOption(question.id, option.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addOption(question.id)}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            Add Option
          </button>
        </div>
      )}

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={question.required}
          onChange={(e) =>
            updateQuestion(question.id, { required: e.target.checked })
          }
          className="mr-2"
        />
        <label>Required</label>
      </div>
    </div>
  );

  const QuestionDisplay = ({ question }) => (
    <div className="p-4 mb-6 border border-gray-300 rounded-lg bg-white">
      <h3 className="text-lg font-medium mb-4">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </h3>

      {question.type === 'text' && (
        <input
          type="text"
          value={responses[question.id] || ''}
          onChange={(e) => handleResponse(question.id, e.target.value)}
          className="w-full p-2 border rounded focus:outline-blue-500"
        />
      )}

      {question.type === 'textarea' && (
        <textarea
          value={responses[question.id] || ''}
          onChange={(e) => handleResponse(question.id, e.target.value)}
          className="w-full p-2 border rounded focus:outline-blue-500"
          rows={4}
        />
      )}

      {(question.type === 'radio' || question.type === 'checkbox') && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center">
              <input
                type={question.type}
                name={`question-${question.id}`}
                value={option.value}
                checked={
                  question.type === 'radio'
                    ? responses[question.id] === option.value
                    : (responses[question.id] || []).includes(option.value)
                }
                onChange={(e) => {
                  if (question.type === 'radio') {
                    handleResponse(question.id, option.value);
                  } else {
                    const currentResponses = responses[question.id] || [];
                    const newResponses = e.target.checked
                      ? [...currentResponses, option.value]
                      : currentResponses.filter((r) => r !== option.value);
                    handleResponse(question.id, newResponses);
                  }
                }}
                className="mr-2"
              />
              {option.value}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {!isPreview ? (
            <>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="text-2xl font-bold w-full mr-4 p-2 border rounded focus:outline-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowShareLink(!showShareLink)}
                  className="p-2 text-blue-500 hover:text-blue-700"
                >
                  <LinkIcon size={20} />
                </button>
                <button
                  onClick={() => setIsPreview(true)}
                  className="p-2 text-green-500 hover:text-green-700"
                >
                  <Save size={20} />
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{form.title}</h1>
              <button
                onClick={() => setIsPreview(false)}
                className="p-2 text-blue-500 hover:text-blue-700"
              >
                Edit Form
              </button>
            </>
          )}
        </div>

        {showShareLink && !isPreview && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              Share this link to collect responses:
            </p>
            <code className="block mt-2 p-2 bg-white rounded border">
              {`${window.location.origin}/form/${btoa(
                JSON.stringify(form)
              )}`}
            </code>
          </div>
        )}

        {!isPreview && (
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-2 border rounded mb-4 focus:outline-blue-500"
            placeholder="Form description"
          />
        )}
      </div>

      {!isPreview ? (
        <>
          {form.questions.map((question) => (
            <QuestionEditor key={question.id} question={question} />
          ))}
          <button
            onClick={addQuestion}
            className="w-full p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 flex items-center justify-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Question
          </button>
        </>
      ) : (
        <>
          <p className="mb-8 text-gray-600">{form.description}</p>
          {form.questions.map((question) => (
            <QuestionDisplay key={question.id} question={question} />
          ))}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default ClaudeTest;
