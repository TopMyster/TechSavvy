export default function Page({ headline, rating, stars, createdTime, content }) {
    return (
        <div>
            <h1>{headline}</h1>
            <h2>{rating}</h2>
            <p>{stars}</p>
            <h3>{createdTime}</h3>
            <p>{content}</p>
        </div>
    )
}