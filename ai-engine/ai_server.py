from fastapi import FastAPI
from pydantic import BaseModel

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

app = FastAPI()

print("Loading Model...")

embeddings = HuggingFaceEmbeddings(
    model_name=r"C:\Users\sandesh\banking-rag-chatbot\ai-engine\models\all-MiniLM-L6-v2"
)

db = FAISS.load_local(
    r"C:\Users\sandesh\banking-rag-chatbot\ai-engine\faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)

print("Model Loaded")

class Question(BaseModel):
    question: str

@app.post("/ask")
def ask(q: Question):

    docs = db.similarity_search(q.question, k=1)

    if docs:
        result = docs[0].page_content

        if "A:" in result:
            answer = result.split("A:")[1].strip()
        else:
            answer = result

        return {"answer": answer}

    return {"answer": "No answer found"}