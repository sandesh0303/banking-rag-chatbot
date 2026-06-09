import time
import sys

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

start = time.time()

question = sys.argv[1]

# Embedding Load
embed_start = time.time()

embeddings = HuggingFaceEmbeddings(
    model_name=r"C:\Users\sandesh\banking-rag-chatbot\ai-engine\models\all-MiniLM-L6-v2"
)

print("Embedding Time:", round(time.time() - embed_start, 2))

# FAISS Load
faiss_start = time.time()

db = FAISS.load_local(
    r"C:\Users\sandesh\banking-rag-chatbot\ai-engine\faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)

print("FAISS Time:", round(time.time() - faiss_start, 2))

# Search
search_start = time.time()

docs = db.similarity_search(question, k=1)

print("Search Time:", round(time.time() - search_start, 2))

if docs:
    result = docs[0].page_content

    if "A:" in result:
        answer = result.split("A:")[1].strip()
    else:
        answer = result

    print("\nAnswer:")
    print(answer)
else:
    print("No answer found")

print("\nTotal Time:", round(time.time() - start, 2))

print("Embedding Time:", round(time.time()-embed_start,2))
print("FAISS Time:", round(time.time()-faiss_start,2))
print("Search Time:", round(time.time()-search_start,2))