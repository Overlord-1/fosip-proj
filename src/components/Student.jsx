import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Student = () => {
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});

    // Fetch the test when the component mounts
    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get('http://localhost:3500/test/test');  // Backend URL to get the test
                setTest(response.data);  // Set the fetched test to state
                setLoading(false);  // Stop loading once data is fetched
                console.log(response.data);
                // console.log(JSON.parse(response.data.questions), typeof (response.data.questions));


            } catch (error) {
                setError(error.message);  // Set error message if there's an issue
                setLoading(false);  // Stop loading in case of error
            }
        };

        fetchTest();
    }, []);

    // Handle answer changes
    const handleAnswerChange = (index, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [index]: value,  // Store the answer with the question index
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send answers to the server
            const response = await axios.post('http://localhost:3500/test/evaluate', { answers });
            alert('Test submitted successfully!');
            console.log(response.data);  // You can handle the response as needed
        } catch (error) {
            alert('Error submitting the test!');
            console.error(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;  // Show loading state while fetching test
    }

    if (error) {
        return <div>Error: {error}</div>;  // Show error if fetching test fails
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">{test.name}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {test.questions.map((question, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded-lg bg-gray-50"
                    >
                        <label
                            className="block text-lg font-medium mb-2"
                        >
                            {index + 1}. {question}
                        </label>
                        <textarea
                            rows={4}
                            placeholder={`Enter your answer for: ${question}`}
                            value={answers[index] || ''}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            className="w-full p-2 border rounded focus:outline-blue-500"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Submit Test
                </button>
            </form>
        </div>
    );
};

export default Student;