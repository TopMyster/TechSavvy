import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

export default function Post() {
    const [headline, setHeadline] = useState("");
    const [rating, setRating] = useState("");
    const [stars, setStars] = useState("");
    const [product, setProduct] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("reviews")
            .insert([{
                headline,
                rating,
                stars,
                product,
                content,
            }])

        if (error) {
            console.error(error);
        }

        if (data) {
            navigate("/");
        }
    }
    return (
        <div>
            <h1>Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" />
                <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
                <input type="text" value={stars} onChange={(e) => setStars(e.target.value)} placeholder="Stars" />
                <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product" />
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}