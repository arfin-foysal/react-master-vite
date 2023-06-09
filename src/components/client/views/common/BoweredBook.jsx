import React from "react";
import damo from "./../../../../assets/images/img_1.jpg";
import { Link } from "react-router-dom";
import moment from "moment";
const BoweredBook = ({ book }) => {
  return (
    <div className="card p-3 border-primary shadow" style={{ width: "13rem" }}>
      <Link to={`/bookdetails/${book?.id}`}>
        <img
          src={`${import.meta.env.VITE_FILE_URL}/${book?.photo}`}
          className="card-img-top rounded"
          alt="..."
          height={120}
        />
      </Link>

      <div className="card-body m-0 p-0 ">
        <p className="card-text p-0 m-0 mt-2 text-center text-capitalize">
          {book?.title}
        </p>
        <div className="mt-2 text-center">
          {/* <p className="text-muted m-0 m-1">
            <b>by </b>
            {book?.authors[0]?.name}
          </p> */}
          <p className="text-muted ">
            <b>Borrowed Date: </b>
            <br />
            {moment(book?.rental_date).format("MMMM Do YYYY")}
          </p>
          <hr />

          <Link
            to={`/bookdetails/${book?.id}`}
            className="btn btn-primary btn-sm btn-library"
          >
            View Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoweredBook;
