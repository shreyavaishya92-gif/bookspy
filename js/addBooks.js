const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/booksdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Book schema
const bookSchema = new mongoose.Schema({
    title: String,
    image: String,
    author: String,
    genre: String,
    summary: String
});

const Book = mongoose.model("Book", bookSchema);

// Books array
const books = [
    { id: 1, title: "Classroom of the Elite", image: "img/home1.png", author: "Syogo Kinugasa", genre: "Drama", summary: "In a prestigious high school where students are ranked strictly by merit, Kiyotaka Ayanokoji is a quiet, unassuming student who hides extraordinary talents. As he navigates the ruthless social hierarchy, he uses his intelligence and strategic thinking to manipulate outcomes behind the scenes. Amid competitions, alliances, and betrayals, Kiyotaka’s true abilities remain hidden from both friends and foes. Can you unravel the layers of his mysterious persona before the other students do?" },
    { id: 2, title: "Bunny Girl Senpai❤️", image: "img/featured.png", author: "Hajime Kamoshida", genre: "Romance", summary: "Sakuta Ayuzawa, a high school student, notices a girl in a bunny costume in the library who seems invisible to everyone else. As he helps her navigate the struggles of being overlooked, he discovers the hidden pains and joys of adolescence, the vulnerability of first love, and the importance of being truly seen. Will Sakuta and the mysterious girl manage to break the barriers of invisibility and connect in a world that refuses to notice them?" },
    { id: 3, title: "Eminence in Shadow", image: "img/featured1.png", author: "Dustin Thao", genre: "Fantasy", summary: "A young boy dreams of becoming a master strategist working from the shadows. He creates a secret organization to battle imagined evils, only to find himself drawn into real conspiracies that exceed his wildest expectations. Between scheming in secret and facing true threats, he must balance illusion and reality. Can he maintain his identity as the mastermind in the shadows while confronting dangers he never imagined?" },
    { id: 4, title: "Solo Leveling vol.3", image: "img/featured3.png", author: "Chugong", genre: "Fantasy", summary: "Sung Jin-Woo, the weakest of all hunters, survives a deadly dungeon that awakens his unique ability to level up independently. As he gains incredible strength, he battles monsters, navigates guild politics, and uncovers mysteries about the world of hunters. How far can Sung Jin-Woo push his limits, and what hidden secrets lie in the dungeons waiting to test him?" },
    { id: 5, title: "It Ends With Us", image: "img/home3.png", author: "Colleen Hoover", genre: "Romance", summary: "Lily finds herself torn between love and painful memories of abuse as she falls for Ryle, a charming neurosurgeon. While confronting her past and lessons from her first love, she must make difficult decisions about her future and her heart. Will Lily find the strength to break free from patterns of the past and embrace the love she deserves?" },
    { id: 6, title: "Atomic Habit", image: "img/featured4.jpg", author: "James Clear", genre: "Motivation", summary: "This book explores the power of small, consistent habits and how they compound over time to produce remarkable results. Through practical strategies and real-life examples, readers learn how to build effective routines, break bad habits, and achieve lasting personal growth. Which tiny habit could you change today that might completely transform your life over time?" },
    { id: 7, title: "Power - The 48 Laws of Power", image: "img/home4.png", author: "Robert Greene", genre: "Motivation", summary: "A guide to understanding, gaining, and defending against power, this book draws lessons from historical figures to reveal strategies for social influence. It teaches how to navigate complex social dynamics, anticipate others’ moves, and act strategically. Which law of power could you apply today to subtly change the way people perceive you?" },
    { id: 8, title: "Oshi No Ko Vol.3", image: "img/featured6.png", author: "Aka Akasaka", genre: "Drama", summary: "Following the hidden struggles of idols behind their glamorous appearances, this volume uncovers ambition, betrayal, and personal challenges in the entertainment world. Secrets and rivalries threaten to surface, changing the lives of the characters forever. Who will survive the harsh realities behind the glittering facade, and what secrets are still waiting to be revealed?" },
    { id: 9, title: "Classroom of the Elite vol.11.5", image: "img/featured7.png", author: "Syogo Kinugasa", genre: "Drama", summary: "This special side story explores personal interactions and hidden motives among Kiyotaka and his classmates that were not fully revealed in the main series. It delves deeper into the psychology, strategies, and conflicts of the students. Which hidden motives will come to light, and how will they change the balance of power among the elite students?" },
    { id: 10, title: "You've Reached Sam", image: "img/featured5.png", author: "Dustin Thao", genre: "Romance", summary: "Grieving the loss of a loved one, Sam discovers love and healing through heartfelt messages and connections that open his heart again. The story emphasizes the power of communication and emotional understanding. Can Sam overcome his grief and truly open himself to love once more?" },
    { id: 11, title: "It Starts With Us", image: "img/home2.png", author: "Colleen Hoover", genre: "Romance", summary: "A continuation of 'It Ends With Us,' this book follows Lily and Ryle as they navigate the complexities of love, forgiveness, and building a future together. Their journey is full of challenges, growth, and heartfelt moments. Will Lily and Ryle overcome past scars and create the life they both dream of?" }
];

// Insert all books into DB
Book.insertMany(books)
    .then(() => {
        console.log("All books added successfully!");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
