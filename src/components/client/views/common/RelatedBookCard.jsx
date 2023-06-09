import React from "react";
import { Link } from "react-router-dom";
import Star from "./Star";
const RelatedBookCard = ({ book }) => {
  return (
    <div className="card p-3 border-primary shadow" style={{ width: "10rem" }}>
      <Link to={`/bookdetails/${book?.id}`}>
        <img
          src={`${import.meta.env.VITE_FILE_URL}/${book?.photo}`}
          className="card-img-top rounded"
          alt="..."
          height={100}
        />
      </Link>

      <div className="card-body m-0 p-0 text-center">
        <p className="card-text p-0 m-0 mt-2 text-capitalize">{book?.title}</p>
        <div className="mt-2">
          <p className=" text-muted "> <b>by </b>{book?.authors[0]?.name}</p>
          {
            // rating
            book?.rating ? (
              <Star rating={book?.rating} />
            ) :
              (
                <Star rating={0} />
              )
          }

          <hr />
          <Link to={`/bookdetails/${book?.id}`} className="btn btn-primary btn-sm btn-library">
            View Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedBookCard;
