export default function Cards({ headline, rating, stars, createdTime, product, content, id }) {
    return (
        <div className="card">
            <div id="card-header">
                <h1>{headline}</h1>
                <p>{rating}/10</p>
                <p>{product}</p>
                <p>{stars}</p>
            </div>
            <div id="card-body">
                <p>{content}</p>
                <p>{createdTime}</p>
            </div>
        </div>
    )
}