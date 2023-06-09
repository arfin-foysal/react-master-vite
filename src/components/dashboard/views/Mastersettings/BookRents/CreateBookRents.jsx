import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { useGetItemForSelectFieldQuery } from "../../../../../services/bookItemApi";


import {

  useItemRentCreateMutation,
  useUserListforBookIssueQuery,
} from "../../../../../services/itemRentApi";
import { FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

const CreateBookRents = ({ handleClose }) => {
  const [itemRentCreate, res] = useItemRentCreateMutation();
  const bookItemRes = useGetItemForSelectFieldQuery();
  const userRes = useUserListforBookIssueQuery();



  const [allItem, setAllItem] = useState([]);
  const [item, setItem] = useState();
  const [item_qty, setitem_qty] = useState();
  const [item_return_date, setitem_return_date] = useState();
  const [availableQty, setAvailableQty] = useState();






  const availableQtyHandeler = (e) => {
    setAvailableQty(e.qty);
  };

  const itemHandeler = (e) => {
    const items = {
      item_qty: Number(item_qty),
      item_id: item.id,
      item_name: item.title,
      return_date: item_return_date,
      rental_date: new Date().toISOString().slice(0, 10),
    };

    if (availableQty < item_qty) {
      return toast.warn("Quantity not available");
    }

    if (items.item_qty === 0 || items.item_qty === null) {
      return toast.warn("Quantity is required");
    }

    if (allItem.length > 0) {
      const filterItem = allItem.filter(
        (itemss) => itemss.item_id === items.item_id
      );

      if (filterItem.length > 0) {
        return toast.warn("Item already added");
      }
    }

    if (
      items.return_date === null ||
      items.return_date === "" ||
      items.return_date === undefined ||
      items.return_date === "Invalid Date"
    ) {
      return toast.warn("Return date is required");
    }
    if (items.return_date < items.rental_date) {
      return toast.warn("Return date must be greater than rental date");
    }

    setAllItem([...allItem, items]);
  };

  const qty = allItem.reduce((a, b) => a + b.item_qty, 0);

  const deleteItem = (id) => {
    const filterItem = allItem.filter(
      (itemss) => itemss.item_id !== id.item_id
    );
    setAllItem(filterItem);
  };

  const formik = useFormik({
    initialValues: {
     
      return_date: "",
      user_id: "",
      note: "",
    },

    onSubmit: async (values, { resetForm }) => {
      // let formData = new FormData();

      const data = {
        return_date: values.return_date,
        qty: qty,
        note: values.note,
        user_id: values.user_id,
        items: allItem,
      };

      try {
        const result = await itemRentCreate(data).unwrap();
        toast.success(result.message);
        resetForm();
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  if (res.isSuccess) {
    handleClose();
  }

  const qtyRef = React.useRef();

  return (
    <div>
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="col-12 border border-2">
            <div className="row py-2">


              <div className="col">
                <label className="col-12 col-form-label">Item <span >
                 {availableQty ?  <span className=" badge bg-success ms-1" >{availableQty} Available</span> : <span className=" badge bg-warning ms-1">{"Not available"}</span>}
                </span></label>
                <Select
                  // isMulti
                  name="item_id"
                  placeholder="Select item"
                  classNamePrefix="select"
                  onChange={(e) => {
                    setItem(e);
                    availableQtyHandeler(e);
                    setitem_qty(1);
                  }}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["title"]}( ${option["barcode_or_rfid"]} )`}
                  options={bookItemRes.isSuccess && bookItemRes.data?.data}
                  isLoading={bookItemRes.isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      qtyRef.current.focus();
                    }
                  }}


                />
              </div>

              {/* <div className="col-3">
                <label className="col-12 col-form-label">Quantity</label>
                <div className="col-12">
                  <input
              
                    disabled
                    placeholder="Only 1 Item allowed"
                    type="number"
                    className="form-control"
                    name="item_qty"
                    onChange={(e) => {
                      setitem_qty(e.target.value);
                    }}
                    value={item_qty}
                  />
                </div>
                <p className=" badge bg-danger ms-1">
                  Available:<span>{availableQty ? availableQty : " Not available "}</span>
                </p>
              </div> */}
              <div className="col">
                <label className="col-12 col-form-label">
                  Item Return Date
                </label>
                <div className="col-12">
                  <input
                    placeholder="Enter Return Date"
                    type="date"
                    className="form-control"
                    name="item_return_date"
                    onChange={(e) => setitem_return_date(e.target.value)}
                    value={item_return_date}
                    required

                    ref={qtyRef}

                  />
                </div>
              </div>

              <div className="col-2" style={{ marginTop: "37px" }}>
                <button
                  onClick={itemHandeler}
                  className="btn btn-primary d-block btn-sm w-100 mt-1"
                >
                  <FiPlusCircle size={16} /> Add
                </button>
              </div>

              <div className="py-2 pb-3 my-4 border border-4">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity </th>
                      <th scope="col">Return Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allItem.map((item, i) => (
                      <tr key={i}>
                        <td>{item.item_name}</td>
                        <td>{item.item_qty}</td>
                        <td>{item.return_date}</td>

                        <td>
                          <button
                            onClick={() => deleteItem(item)}
                            className="btn btn-sm btn-danger "
                          >
                           <FaTrash size={13}  />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-8">
                <label className="col-12 col-form-label">
                  Borrower
                </label>
                <div className="col-12">
                  <Select
                    // isMulti
                    name="user_id"
                    placeholder="Select Borrower"
                    classNamePrefix="select"
                    onChange={(e) => {
                      formik.setFieldValue("user_id", e.id);
                    }}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) => `${option["name"]} ( ${option["email"]} )`}
                    options={userRes.isSuccess && userRes.data?.data}
                    isLoading={userRes.isLoading}
                  />
                </div>
              </div>
              {/* <div className="col-8">
                <label className="col-12 col-form-label">Return Date</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Return Date"
                    type="date"
                    className="form-control"
                    name="return_date"
                    onChange={formik.handleChange}
                    value={formik.values.return_date}
                    required
                  />
                </div>
              </div> */}

              <div className="col-8">
                <label className="col-12 col-form-label">Note</label>
                <div className="col-12">
                  <textarea
                    rows={4}
                    placeholder="Enter Note"
                    type="text"
                    className="form-control"
                    name="note"
                    onChange={formik.handleChange}
                    value={formik.values.note}
                    required
                  />
                </div>
              </div>
              <div className="col-4 text-center ">
                <div>
                  Total Item:{" "}
                  <p className="text-success badge fw-500 ">{qty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <Modal.Footer>
          <div className=" d-flex">

            <button className="btn btn-dark me-1" onClick={handleClose}>
              Close
            </button>


            <button type="submit" className="btn btn-success ">
              Submit
            </button>

          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default CreateBookRents;
