import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { Star, ThumbsUp } from "lucide-react";

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
    if (!review) return null;

    return (
        <div className="page">
            <div className="container mx-auto max-w-2xl px-4 py-8">
                <article className="rounded-xl border bg-card p-6 shadow-sm">
                    <header className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold leading-tight">
                                {review.headline}
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {review.product} • {new Date(review.created_time).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                <span>{review.rating}/10</span>
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${stared ? "text-yellow-500 font-bold" : "text-yellow-500"}`}>
                                <Star className={`h-4 w-4 ${stared ? "fill-yellow-500" : "fill-transparent"}`} />
                                <span>{review.stars}</span>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-slate max-w-none text-base leading-relaxed text-foreground/90">
                        <p>{review.content}</p>
                    </div>

                    <footer className="mt-8 flex items-center justify-between border-t border-border pt-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button
                                onClick={star}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${stared ? "bg-[#1DA1F2] text-secondary" : "text-[#1DA1F2] hover:bg-muted"}`}
                                disabled={stared}
                            >
                                <ThumbsUp className="h-4 w-4" />
                                <span>{stared ? "Liked" : "Like"}</span>
                            </button>
                            <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 hover:bg-muted" onClick={(e) => {
                                navigator.share({
                                    title: review.headline,
                                    text: `Check out this TechSavvy review: ${review.headline}`,
                                    url: `/page/${review.id}`,
                                })
                            }}>
                                ⤴ <span>Share</span>
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
}