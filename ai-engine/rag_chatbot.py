from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

with open("data/banking_faqs.txt", "r", encoding="utf-8") as f:
    data = f.read()

# प्रत्येक FAQ वेगळा chunk
chunks = data.split("\n\n")

embeddings = HuggingFaceEmbeddings(
    model_name=r"C:\Users\sandesh\banking-rag-chatbot\ai-engine\models\all-MiniLM-L6-v2"
)

db = FAISS.from_texts(chunks, embeddings)

db.save_local("faiss_index")

print("Vector DB Created Successfully")