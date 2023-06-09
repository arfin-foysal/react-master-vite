import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useMembershipCreateOrUpdateMutation } from "../../../../../services/membershipPlanApi";


const CreateMembership = ({ handleClose }) => {

  const [ membershipCreateOrUpdate,res] = useMembershipCreateOrUpdateMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      valid_duration: "",
      fee_amount: "",
      photo: "",
      description: "",
      term_policy: "",
      is_active: false,

    },

    onSubmit: async (values,{resetForm}) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("valid_duration", values.valid_duration);
      formData.append("fee_amount", values.fee_amount);
      formData.append("photo", values.photo);
      formData.append("description", values.description);
      formData.append("term_policy", values.term_policy);
      formData.append("is_active", values.is_active);
      resetForm();


      try {
        const result = await membershipCreateOrUpdate(formData).unwrap();
        toast.success(result.message)
    
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });
    if (res.isSuccess) {
      handleClose();
    }

  return (
    <div>
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Name</label>
            <div className="col-12">
              <input
                placeholder="Enter Name"
                type="text"
                className="form-control"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
          </div>


          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Fee Amount</label>
            <div className="col-12">
              <input
                placeholder="Enter Phone No:"
                type="fee_amount"
                className="form-control"
                name="fee_amount"
                onChange={formik.handleChange}
                value={formik.values.fee_amount}
                required
              />
            </div>
          </div>


          
          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Valid Duration</label>
            <div className="col-12">
              <input
                placeholder="Enter valid_duration"
                type="valid_duration"
                className="form-control"
                name="valid_duration"
                onChange={formik.handleChange}
                value={formik.values.valid_duration}

              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Description</label>
            <div className="col-12">
              <textarea
                placeholder="Enter Contact Person"
                type="text"
                className="form-control"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required
              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Term Policy</label>
            <div className="col-12">
              <textarea
                placeholder="Enter Present Address"
                type="text"
                className="form-control"
                name="term_policy"
                onChange={formik.handleChange}
                value={formik.values.term_policy}
                required
              />
            </div>
          </div>

      

  

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12">
              <input
                className="form-control"
                name="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue("photo", e.currentTarget.files[0]);
                  handelImage(e);
                }}
              />
            </div>
          </div>

   

          <div className="form-group row col-6 mt-4">
            <label className="col-6 col-form-label">Is Active</label>
            <div className="col-6">
              <div class="form-check form-switch mt-2">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Active"
                  name="is_active"
                  onChange={formik.handleChange}
                  value={formik.values.is_active}
                  checked={formik.values.is_active}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="py-2 mt-3"
            src={previewImage}
            width="80px"
            height="80px"
            alt=""
          />
        </div>
        <Modal.Footer>
          <div className=" d-flex">
       
            <div>
              <button className="btn btn-dark" onClick={handleClose}>
                Close
              </button>
            </div>
            <div className="mx-5">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default CreateMembership;
