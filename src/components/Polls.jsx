import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function Polls() {
    const [allPolls, setAllPolls] = useState([]);

    useEffect(() => {
        fetch("https://polling-api-wurm.onrender.com/api/v1/polls")
            .then((response) => response.json())
            .then((data) => {
                console.log(`polls data : ${JSON.stringify(data)}`);
                setAllPolls(data.polls);
            });
    }, []);

    return (
        <>
            <h1>Active Polls</h1>
            {allPolls &&
                allPolls.length > 0 &&
                allPolls.map((poll) => (
                    <Link to={`/poll/${poll._id}`}>
                        <button key={poll._id}>
                            <p>{poll.question}</p>
                            <p>{poll.totalVotes} total votes.</p>
                        </button>
                        <br />
                    </Link>
                ))}
        </>
    );
}
