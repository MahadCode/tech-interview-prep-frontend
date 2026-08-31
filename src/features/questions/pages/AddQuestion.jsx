import React from "react";
import Container from "../../../components/Container"
import QuestionForm from "../components/QuestionForm"

function AddQuestion() {
    return (
        <div className="py-8">
            <Container>
                <QuestionForm />
            </Container>
        </div>
    );
}

export default AddQuestion;