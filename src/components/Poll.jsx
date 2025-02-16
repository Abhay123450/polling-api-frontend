import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

export function Poll({ pollId }) {
    const { id } = useParams();

    const [email, setEmail] = useState(null);
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState(null);
    function vote(pollId, optionId, email) {
        if (!email) {
            alert("Please enter your email");
            return;
        }
        fetch("https://polling-api-wurm.onrender.com/api/v1/polls/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ optionId, email })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(`polls data : ${JSON.stringify(data)}`);
                if (data && data.success) {
                    alert(data.message);
                }
            });
    }

    useEffect(() => {
        fetch("https://polling-api-wurm.onrender.com/api/v1/polls/" + id, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(`polls data : ${JSON.stringify(data)}`);
                let poll = data.poll;
                setQuestion(poll.question);
                setOptions(poll.options);
            });
    }, [id]);

    return (
        <>
            <h2>{question}</h2>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <ul>
                {options &&
                    options.length > 0 &&
                    options.map((option) => (
                        <li key={option.id}>
                            <button onClick={() => vote(id, option._id, email)}>
                                {option.option} ({option.votes} votes)
                            </button>
                        </li>
                    ))}
            </ul>
        </>
    );
}
