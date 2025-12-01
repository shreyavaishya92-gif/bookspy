from flask import Flask, request, jsonify, send_from_directory # type: ignore
from flask_cors import CORS # type: ignore
from pymongo import MongoClient # type: ignore


app = Flask(__name__, static_folder="", static_url_path="")
CORS(app)

# ================== MongoDB Connection ==================
client = MongoClient("mongodb://localhost:27017/")
db = client["bookproject"]
books_collection = db["books"]

# ================== HOME ROUTE (VERY IMPORTANT) =========
@app.route("/")
def home():
    return send_from_directory("", "index.html")

# ================== GET BOOKS API =======================
@app.get("/books")
def get_books():
    author = request.args.get("author")
    genre = request.args.get("genre")
    title = request.args.get("title")

    query = {}

    if author:
        query["author"] = author
    if genre:
        query["genre"] = genre
    if title:
        query["title"] = title

    books = list(books_collection.find(query, {"_id": 0}))
    return jsonify(books)

# ================== START SERVER ========================
if __name__ == "__main__":
    app.run(debug=True)
