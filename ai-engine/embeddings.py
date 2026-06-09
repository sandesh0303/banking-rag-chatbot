from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

loader = TextLoader("data/banking_faqs.txt")
documents = loader.load()

text_splitter = CharacterTextSplitter(
    separator="---",
    chunk_size=100,
    chunk_overlap=0
)

docs = text_splitter.split_documents(documents)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = FAISS.from_documents(docs, embeddings)

db.save_local("faiss_index")

print("✅ Vector Database Created Successfully!")