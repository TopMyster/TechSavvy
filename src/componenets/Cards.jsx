export default function Cards({ headline, rating, stars, createdTime, product, content, id, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <h2>{headline}</h2>
            <div className="card-middle">
                <h4 className="product">{product}</h4>
                <h4 className="rating">{rating}/10</h4>
                <h4 className="stars">{stars}</h4>
            </div>
            <div className="card-body">
                <h4 className="content">{content}</h4>
                <h4 className="createdTime">{createdTime}</h4>
            </div>
        </div>
    )
}