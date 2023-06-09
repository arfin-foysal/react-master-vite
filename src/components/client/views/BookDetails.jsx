import React from "react";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdLanguage } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import avatar from "./../../../../src/assets/images/profile-picture.png/";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBorrow } from "../../../features/borrowSlice";
import ReactPlayer from "react-player";
import Loader from "../../dashboard/common/Loader";
import { useGetItemByIdQuery } from "../../../services/clientSiteApi";
import { AddReviews } from "./common/AddReviews";
import Reviews from "./common/Reviews";
import RelatedBookCard from "./common/RelatedBookCard";
import BrochureView from "./common/BrochureView";
import VirtualBookView from "./common/VirtualBookView";
import Star from "./common/Star";



const BookDetails = () => {
  const authUser = useSelector((state) => state.clientAuth.clientUser);
  const authToken = useSelector((state) => state.clientAuth.clientToken);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalVShow, setModalVShow] = React.useState(false);
  const { id } = useParams();
  const bookDetailsRes = useGetItemByIdQuery(id);
  const book = bookDetailsRes?.data?.data;
  const dispatch = useDispatch();




  //return date today after 7days

  const returnDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  return (
    <>
      <BrochureView
        show={modalShow}
        onHide={() => setModalShow(false)}
        brochure={book?.brochure}
      />
      <VirtualBookView
        show={modalVShow}
        onHide={() => setModalVShow(false)}
        virtual={book?.virtual_book}
      />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="container ">
              <div className="row">
                {bookDetailsRes.isFetching && <Loader />}

                <div className="col-md-4 col-12 ">
                  <div
                    className="card p-3 border-primary shadow w-100 "
                  // style={{ width: "15rem" }}
                  >
                    <div>
                      <img
                        src={`${import.meta.env.VITE_FILE_URL}/${book?.photo}`}
                        className="card-img-top rounded"
                        alt="..."
                        height={200}
                      />
                    </div>



                    <div className="card-body mt-1 p-0 text-center">
                      {
                        // rating
                        book?.rating ? (
                          <Star rating={book?.rating} />
                        ) :
                          (
                            <Star rating={0} />
                          )
                      }

                    </div>
                  </div>

                  <div className="text-center my-3 ">
                    {book?.item_type === "physical" ? (
                      <div>
                        {book?.qty > 0 ? (
                          <button
                            className="btn btn-primary mx-1 btn-sm btn-library"
                            onClick={() =>
                              dispatch(
                                addBorrow({
                                  id: book?.id,
                                  item_id: book?.id,
                                  title: book?.title,
                                  photo: book?.photo,
                                  price: book?.price,
                                  item_qty: 1,
                                  return_date: returnDate ,
                                })
                              )
                            }
                          >
                            Add To Cart
                          </button>
                        ) : (
                          <p className="text-danger">Out of Stock</p>
                        )}

                        <button
                          className="btn btn-info btn-sm mx-1"
                          variant="primary"
                          onClick={() => setModalShow(true)}
                        >
                          View
                        </button>
                      </div>
                    ) : (
                      <div>
                        {authUser && authToken ? (
                          <button
                            className="btn btn-info btn-sm mx-1"
                            variant="primary"
                            onClick={() => setModalVShow(true)}
                          >
                            View E-Book
                          </button>
                        ) : (
                          <Link
                            to="/login"
                            className="btn btn-info btn-sm mx-1"
                          >
                            Login to view
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                  <Reviews reviews={book?.reviews} />

                  {authUser && authToken && (
                    <AddReviews itemId={book?.id} />
                  )}

                </div>
                <div className="col-md-8 col-12">
                  <h3 className="text-capitalize">{book?.title} </h3>
                  <p>
                    Author by <span className="text-primary" >
                      {book?.authors[0]?.name}
                    </span>
                  </p>
                  <p>
                    Category: <span className="text-primary">{book?.category_name}</span>
                  </p>
                  <p>
                    Book Type: <span className="text-primary">{book?.item_type}</span>
                  </p>
                  <p>
                    Originally Published:  <span className="text-primary">
                      {moment(book?.publish_date).format("MMMM Do YYYY")}
                    </span>
                  </p>

                  <div className="row mt-2 border border-1 py-2">
                    <h5>Product Specification</h5>
                    <hr />
                    <div className="my-2">
                      <p>
                        ISBN: {book?.isbn}
                      </p>
                      <p>
                        Edition: {book?.edition}
                      </p>
                      <p>
                        Country: {book?.country_name}
                      </p>
                      <p>
                        Publisher: {book?.publisher_name}
                      </p>
                      <p>
                        Summery: {book?.summary}
                      </p>
                    </div>
                    <hr />
                    <div className="col">
                      <p>
                        Pages
                      </p>
                      <HiOutlineDocumentDuplicate size={20} />
                      <p>{book?.number_of_page}</p>
                    </div>
                    <div className="col">
                      <p>
                        Language
                      </p>
                      <MdLanguage size={20} />
                      <p>{book?.language_name}</p>
                    </div>
                    <div className="col">
                      <p>
                        Publish Date
                      </p>
                      <BsCalendar2Date />

                      <p>{moment(book?.publish_date).format("MMMM Do YYYY")}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h5>About the author</h5>

                    {book?.authors?.map((author, i) => (
                      <div key={i}>
                        {author?.author_photo ? (
                          <img
                            className="img-fluid rounded-circle shadow"
                            style={{ width: "40px", height: "40px" }}
                            src={`${import.meta.env.VITE_FILE_URL}${author?.author_photo
                              }`}
                            alt=""
                          ></img>
                        ) : (
                          <img
                            className="img-fluid rounded-circle shadow"
                            style={{ width: "40px", height: "40px" }}
                            src={avatar}
                            alt=""
                          ></img>
                        )}
                        <Link to={`/authordetails/${author?.id}`} className=" text-primary">
                          <b className="ms-2 ">{author?.name}</b>
                        </Link>

                        <br />
                        {/* <p className="my-2">
                          <b>Biography:</b> {author?.author_bio}
                        </p> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div>
              <h5 className="my-3"> Related Items</h5>
              <div className="d-flex flex-wrap justify-content-between mb-5">
                {book?.related_items?.map((book, i) => (
                  <RelatedBookCard key={i} book={book} />
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {book?.video_url && (
                <ReactPlayer
                  className="react-player
                react-player__shadow
                 border border-2 border-primary
                  rounded
                "
                  url={book?.video_url}
                  controls
                  width="420px"
                  height="220px"
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
