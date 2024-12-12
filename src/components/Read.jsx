import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  function getData() {
    axios
      .get("https://66e28ae6494df9a478e2132d.mockapi.io/crud")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://66e28ae6494df9a478e2132d.mockapi.io/crud/${id}`)
      .then(() => {
        getData();
      });
  }

  const setToLoaclStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        <Link to="/">
          <button className="btn btn-primary">Create</button>
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <td>{eachData.id}</td>
                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                    <Link to="/update">
                      <Button
                        variant="success"
                        onClick={() =>
                          setToLoaclStorage(
                            eachData.id,
                            eachData.name,
                            eachData.email
                          )
                        }
                      >
                        Edit
                      </Button>{" "}
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      delete
                    </Button>{" "}
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </Table>
    </div>
  );
};

export default Read;
