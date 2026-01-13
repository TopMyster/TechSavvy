import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

export default function Page() {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    const [error, setError] = useState(null);
    const [stared, setStared] = useState(false);

    useEffect(() => {
        const isStared = localStorage.getItem(`stared-${id}`);
        if (isStared) {
            setStared(true);
        }

        const fetchReview = async () => {
            const { data, error } = await supabase
                .from("reviews")
                .select()
                .eq("id", id)
                .single();

            if (error) {
                setError(error.message);
                return;
            }

            if (data) {
                setReview(data);
            }
        };

        fetchReview();
    }, [id]);

    async function star() {
        if (!stared && review) {
            const newStars = review.stars + 1;

            setReview(prev => ({ ...prev, stars: newStars }));
            setStared(true);
            localStorage.setItem(`stared-${id}`, 'true');
            const { data, error } = await supabase
                .from("reviews")
                .update({ stars: newStars })
                .eq("id", id)
                .select()
                .single();

            if (error) {
                setReview(prev => ({ ...prev, stars: prev.stars - 1 }));
                setStared(false);
                localStorage.removeItem(`stared-${id}`);
                setError(error.message);
                return;
            }

            if (data) {
                setReview(data);
            }
        }
    }

    if (error) return <p>Error: {error}</p>;
    if (!review) return <p>Loading...</p>;

    return (
        <div className="page-content">
            <h1>{review.headline}</h1>
            <h2>Rating: {review.rating}/10</h2>
            <p>Stars: {review.stars}</p>
            <button
                onClick={star}
                disabled={stared}
                className={stared ? "star-button active" : "star-button"}
            >
                {stared ? "Starred" : "Star"}
            </button>
            <h3>Product: {review.product}</h3>
            <p>Created: {new Date(review.created_time).toLocaleDateString()}</p>
            <div className="content">
                {review.content}
            </div>
        </div>
    );
}