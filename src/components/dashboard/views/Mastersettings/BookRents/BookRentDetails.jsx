import React from "react";

const BookRentDetails = ({ handleClose, values }) => {

  return (
    <div>
      <div className="row">
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Rental No:</th>
                <th>{values?.rental_no}</th>
              </tr>
              <tr>
                <th>Borrower Name :</th>
                <th>{values?.user_name}</th>
              </tr>
              <tr>
                <th>Borrower Photo :</th>
                <th>
                  <img
                    width={40}
                    src={`${import.meta.env.VITE_FILE_URL}${
                      values?.user_photo
                    }`}
                    alt=""
                  />
                </th>
              </tr>
              <tr>
                <th>Rent Date:</th>
                <th>{values?.rental_date}</th>
              </tr>
              <tr>
                <th>Return Date:</th>
                <th>{values?.return_date}</th>
              </tr>
              <tr>
                <th>Qty:</th>
                <th>{values?.qty}</th>
              </tr>

              <tr>
                <th>Status:</th>
                <th>{values?.status}</th>
              </tr>
              <tr>
                <th>Note:</th>
                <th>{values?.note}</th>
              </tr>
            </thead>
          </table>
          
            {values?.item_rents_Detail?.length === 0 && (
              <div class="alert alert-success text-center" role="alert">
              <>All Item Already Return</>
                </div>  
            )}
          {values?.item_rents_Detail?.length !== 0 && (
             <div class="alert alert-warning text-center" role="alert">

              <> All items are not returned</>
              </div> 
            )}
        
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Item Photo</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Status</th>
                <th scope="col">Item Qty</th>
                <th scope="col">Item Return Date</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {values?.item_rents_Detail_show?.map((item) => (
                <tr>
                  <th>
                    <img
                      width={50}
                      src={`${import.meta.env.VITE_FILE_URL}${
                        item?.item_photo
                      }`}
                      alt=""
                    />
                  </th>
                  <td>{item.item_name}</td>
                  <td>{item.status}</td>
                  <td>{item.item_qty}</td>
                  <td>{item.return_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookRentDetails;