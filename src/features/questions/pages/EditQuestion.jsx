import React, { useEffect, useState } from "react";
import Container from "../../../components/Container"
import QuestionForm from "../components/QuestionForm"
import { getQuestion } from "../api/questionService";
import { useNavigate, useParams } from "react-router-dom";

function EditQuestion() {
    const [post, setPosts] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getQuestion(id)
                .then((response) => {
                    if (response?.data) {
                        setPosts(response.data);
                    }
                })
                .catch((error) => {
                    console.error(
                        "Failed to get question:",
                        error.response?.data || error.message
                    );

                    navigate("/");
                });
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <QuestionForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditQuestion;