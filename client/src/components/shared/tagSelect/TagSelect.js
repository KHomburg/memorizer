import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { setAlert } from "../../../actions/alert";
import { updateNote, getNote } from "../../../actions/note";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "../../layout/Loading";

export function TagSelect({ value, onChange }) {
  return (
    <CreatableSelect
      className="tagInput"
      name="tags"
      value={value}
      isMulti
      onChange={onChange}
    />
  );
}
