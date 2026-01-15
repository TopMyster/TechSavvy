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
                .order('created_time', { ascending: false })

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
                {reviews && reviews.map(review => (
                    <Cards key={review.id} onClick={() => navigate(`/page/${review.id}`)} headline={review.headline} rating={review.rating} stars={review.stars} createdTime={review.created_time} product={review.product} id={review.id} />
                ))}
            </div>
        </>
    )
}