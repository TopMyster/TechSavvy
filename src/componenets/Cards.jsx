export default function Cards({ headline, rating, stars, createdTime, product, content, id, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <div id="card-header">
                <h1>{headline}</h1>
                <p className="rating">{rating}/10</p>
                <p className="product">{product}</p>
                <p className="stars">{stars}</p>
            </div>
            <div id="card-body">
                <p className="content">{content}</p>
                <p className="createdTime">{createdTime}</p>
            </div>
        </div>
    )
}