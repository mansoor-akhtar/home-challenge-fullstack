import React from "react";
import { Button, Card } from "react-bootstrap";
// import Details from "./Details/Details";
import ArrowIcon from "../../assets/images/arrow.svg";
 
import "./NewsItem.css"; 

const NewsItem = (props) => {
  const { imageUrl, alt, description, title, channel, published, urlNews } =
    props;

  return (
    <Card className="card">
      <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        {/* <Details channel={channel} published={published} /> */}
        <Button
          className="card-btn"
          href={urlNews}
          target="_blank"
        >
          Read more <img src={ArrowIcon} className="arrow-icon" />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NewsItem;
