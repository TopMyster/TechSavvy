import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

export default function Post() {
    const [headline, setHeadline] = useState("");
    const [rating, setRating] = useState("");
    const [product, setProduct] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!headline || !rating || !product || !content) {
            setError("All fields are required");
            return;
        }

        const { data, error: insertError } = await supabase
            .from("reviews")
            .insert([{
                headline,
                rating: parseInt(rating),
                stars: 0,
                product,
                content,
                created_time: new Date().toISOString()
            }])
            .select();

        if (insertError) {
            console.error(insertError);
            setError(insertError.message);
            return;
        }

        if (data) {
            navigate("/");
        }
    }

    return (
        <div className="post-container">
            <h1>Post a New Review</h1>
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" />
                </div>
                <div className="form-group">
                    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (1-10)" min="1" max="10" />
                </div>
                <div className="form-group">
                    <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product Name" />
                </div>
                <div className="form-group">
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Review Content" rows="5" />
                </div>
                <button type="submit">Post Review</button>
            </form>
        </div>
    )
}