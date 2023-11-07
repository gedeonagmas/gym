import React, { useContext, useEffect, useState } from "react";
import { useReadFactoryQuery } from "../../features/api/apiSlice";
import Pending from "../Pending/Pending";
import Error from "../Error/Error";
import { navContext } from "../../App";
import { Close, Visibility } from "@mui/icons-material";

const Classes = () => {
  const context = useContext(navContext);
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({
    type: "class",
    query: `sort=createdAt&type=trainer&visible=true&trainer[eq]=${
      JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))?._id
    }`,
  });

  const [detailPopup, setDetailPopup] = useState();
  const [user, setUser] = useState();
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  return (
    <div className="mx-1 flex flex-col items-center ">
      <div className="w-full my-4 mx-4 flex justify-between">
        <p className="text-xl font-bold my-4 self-start mx-4 uppercase">
          My Classes{" "}
          <span className="">
            {"("}
            {data?.data?.length}
            {")"}
          </span>
        </p>
      </div>
      <table className="w-[1120px]  max-h-[90vh] border">
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <thead
          className={`${context.nightMode ? "bg-gray-800" : "bg-gray-200"}`}
        >
          <th className="px-5 py-4">
            <input
              id="checkboxParent"
              type="checkbox"
              name="value"
              className="w-7 h-7"
            />{" "}
          </th>
          <th className="px-5">Image</th>
          <th className="px-5 ">Title</th>
          <th className="px-5">Difficulty</th>
          <th className="px-5">Members</th>
          <th className="px-5">Amount</th>
          <th className="px-5">Date</th>
          <th className="px-5">Available</th>
          <th className="px-5">Actions</th>
        </thead>
        {data && data?.data?.length > 0 ? (
          data?.data?.map((d, i) => {
            return (
              <tbody key={i} className="py-4 ml-5">
                <tr className="py-5 text-center mt-10 border border-l-0 border-r-0">
                  <td className="px-5 ">
                    <input
                      type="checkbox"
                      name="value"
                      id="checkboxChild"
                      className="w-7 h-7"
                    />
                  </td>
                  <td className="px-5 items-center flex justify-center  py-4">
                    <img
                      src={d.image}
                      alt="profile"
                      className="w-16 h-16  border rounded-full"
                    />
                  </td>
                  <td className="px-5 ">{d.title}</td>
                  <td className="px-5 ">{d.difficulty}</td>
                  <td className="px-5 ">{d.members?.length}</td>
                  <td className="px-5 ">{d.amount}</td>
                  <td className="px-5 ">
                    {d.date.split(" ").splice(0, 4).join(" ")}
                  </td>

                  <td className="px-5 ">{d.visible.toString()}</td>
                  <td className="px-5  py-6 flex items-center justify-center gap-3">
                    <div
                      onClick={() => {
                        setUser(d);
                        setDetailPopup(true);
                      }}
                      className="border flex gap-4 py-1 px-2 cursor-pointer hover:bg-[#ff0336] hover:text-white items-center justify-center rounded-md"
                    >
                      <Visibility fontSize="large" /> Detail
                    </div>{" "}
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <tbody className="py-4">
            <tr className="pl-2 py-5 mt-40 border border-l-0 border-r-0">
              <td className="px-5">There is no data to display</td>
            </tr>
          </tbody>
        )}
      </table>
      {detailPopup && user && (
        <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
          <div
            onClick={() => setDetailPopup(false)}
            className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
          ></div>
          <div
            className={`relative ${
              context.nightMode ? "bg-gray-900" : "bg-white"
            } rounded-lg border w-auto -mt-32 flex flex-col gap-1 items-start justify-center py-14 z-40 px-44 shadow-lg shadow-gray-500`}
          >
            <p className="font-bold text-[16px]">Class Information </p>{" "}
            <img
              src={user.image}
              alt="profile"
              className="w-72 h-64 rounded-md run-bg border"
            />
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Title :</p>{" "}
              <p className="font-normal">{user.title}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Difficulty :</p>{" "}
              <p className="font-normal">{user.difficulty}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Members :</p>{" "}
              <p className="font-normal">{user.members?.length}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Amount :</p>{" "}
              <p className="font-normal">{user.amount} birr</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Date :</p>{" "}
              <p className="font-normal">
                {user.date.split(" ").splice(0, 5).join(" ")}
              </p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Available :</p>{" "}
              <p className="font-normal">{user.visible.toString()}</p>
            </div>
            <Close
              onClick={() => setDetailPopup(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
