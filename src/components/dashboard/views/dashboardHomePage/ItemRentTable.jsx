import { useCallback, useMemo, useState } from "react";
import { useBookRentActiveMutation, useDeleteRentsMutation, useItemRentsListQuery } from "../../../../services/itemRentApi";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "../../common/Loader";
import { IoReceipt } from "react-icons/io5";
import { confirmHandel } from "../../../../utils/Alert";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import MaterialReactTable from "material-react-table";
const ItemRentTable = ({ rent}) => {
    const res = useItemRentsListQuery();

    const { data, isSuccess, isFetching, isError, error } = res;
    const [deleteRents] = useDeleteRentsMutation();
    const [bookRentActive] = useBookRentActiveMutation();
    const [clickValue, setClickValue] = useState(null);
    const [paramId, setParamId] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelClickValue = useCallback((value) => {
        setClickValue(value);
    }, []);

    const handelDelete = async (id) => {
        const result = await deleteRents(id).unwrap();
        toast.success(result.message);
    };

    const columns = useMemo(
        () => [
            // {
            //   accessorFn: (row) =>
            //     row?.photo ? (
            //       <>
            //         <img
            //           className="img-fluid rounded-circle shadow"
            //           style={{ width: "40px", height: "40px" }}
            //           src={`${import.meta.env.VITE_FILE_URL}${row?.photo}`}
            //           alt=""

            //         ></img>
            //       </>
            //     ) : (
            //       <img
            //         className="img-fluid rounded-circle shadow"
            //         style={{ width: "40px", height: "40px" }}
            //         src={avatar}
            //         alt=""
            //       ></img>
            //     ),

            //   id: "Photo",
            //   header: "Photo",
            //   size: 10,
            // },

            {
                accessorKey: "rental_no", //access nested data with dot notation
                header: "Rental No",
                size: 10,
            },
            {
                accessorKey: "user_name", //access nested data with dot notation
                header: "Borrower Name",
                size: 10,
            },

            {
                accessorKey: "qty", //normal accessorKey
                header: "Qty",
                size: 10,
            },

            {
                accessorFn: (row) =>
                    row?.rental_date && (
                        <>{moment(row.rental_date).format("MMMM Do YYYY")}</>
                    ),

                id: "rental_date",
                header: "Rental Date",
                size: 10,
            },
            {
                accessorFn: (row) =>
                    row?.rental_date && (
                        <>{moment(row.rental_date).format("MMMM Do YYYY")}</>
                    ),

                id: "return_date",
                header: "Return Date",
                size: 10,
            },

            {
                //accessorFn function that combines multiple data together
                accessorFn: (row) =>
                    row?.status === "active" ? (
                        <>
                            <span className="badge bg-info">Active</span>
                        </>
                    ) : (
                        <span className="badge bg-danger">Inactive</span>
                    ),

                id: "order Status",
                header: "Order Status",
            },
            // {
            //   //accessorFn function that combines multiple data together
            //   accessorFn: (row) =>
            //     row?.is_active === true ? (
            //       <>
            //         <span className="badge bg-info">Active</span>
            //       </>
            //     ) : (
            //       <span className="badge bg-danger">Inactive</span>
            //     ),

            //   id: "Status",
            //   header: "Status",
            // },
        ],
        []
    );

    return (
        <>
            {isFetching && <Loader />}
            {/* <AuthorModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      /> */}

            <div class="card border shadow-lg">
                <div class="card-header d-flex justify-content-between ">
                    <div>Book Issue List</div>
                    <div>

                    </div>
                </div>

                <div class="card-body p-0 ">
                    <MaterialReactTable
                        columns={columns}
                        data={isSuccess && rent}
                        enableRowActions
                        enableColumnActions
                        positionActionsColumn="last"
                        muiTopToolbarProps={{
                            style: {
                                backgroundColor: "#3f4d67",
                            },
                        }}
                        // enablePagination="true"
                        renderRowActions={(row, index) => (
                            <>
                                <div className="d-flex ">
                                    <div className="mr-1">
                                        <Link
                                            to="#"
                                            className="btn btn-secondary btn-sm d-flex align-items-center"
                                            onClick={() => {
                                                handleShow();
                                                handelClickValue("Book Issue Information");
                                                setParamId(row?.row?.original);
                                            }}
                                        >
                                            <div>Details</div>
                                        </Link>
                                    </div>

                                    {row?.row?.original?.status === "inactive" && (
                                        <div className=" d-flex">
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        confirmHandel(
                                                            "error",
                                                            "Delete",
                                                            "#FF0000",
                                                            row?.row?.original?.id,
                                                            handelDelete
                                                        )
                                                    }
                                                    className="px-2 mx-2 d-flex align-items-center btn btn-danger btn-sm"
                                                >
                                                    <div> Delete</div>
                                                    <div>
                                                        <FaTrash size={13} />
                                                    </div>
                                                </button>
                                            </div>

                                            <div>
                                                <button
                                                    onClick={() =>
                                                        confirmHandel(
                                                            "success",
                                                            "Active",
                                                            "#198754",
                                                            row?.row?.original?.id,
                                                            bookRentActive
                                                        )
                                                    }
                                                    className="px-2 mx-2 d-flex align-items-center btn btn-success btn-sm"
                                                >
                                                    <div> Active</div>
                                                    <div>{/* <FaTrash size={13} /> */}</div>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {row?.row?.original?.status === "active" && (
                                        <div>
                                            <button
                                                className="px-2 mx-2 d-flex align-items-center btn btn-info btn-sm"
                                                to="#"
                                                onClick={() => {
                                                    handleShow();
                                                    handelClickValue("Return Book");
                                                    setParamId(row?.row?.original);
                                                }}
                                            >
                                                <div>Return</div>
                                                <div>
                                                    <IoReceipt size={13} />
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    />
                </div>
            </div>
        </>
    );
};





export default ItemRentTable