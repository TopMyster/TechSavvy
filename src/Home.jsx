import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import Cards from "./componenets/Cards";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            const { data, error } = await supabase
                .from("reviews")
                .select()

            if (error) {
                setError(error.message)
                return
            }

            if (data) {
                setError(null)
                setReviews(data)
            }
        }
        fetchReviews()
    }, [])

    return (
        <>
            {error && <p>{error}</p>}
            <div className="homepage">
                <h1>Reviews</h1>
                {reviews && reviews.map(review => (
                    <Cards key={review.id} onClick={() => navigate(`/page/${review.id}`)} headline={review.headline} rating={review.rating} stars={review.stars} createdTime={review.created_time} product={review.product} id={review.id} />
                ))}
            </div>
        </>
    )
}