import React, { useState } from "react";
import { MdEditDocument, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchUpdateCompletedData,
  fetchUpdateItemData,
} from "../redux/slices/apiSlice";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { toast } from "react-toastify";
import { openModal } from "../redux/slices/modalSlice";






const Item = ({ task }) => {
  const [confirm, setConfirm] = useState(false);
  const { _id, title, description, date, iscompleted, isimportant, userid } =
    task;
  // console.log(_id, title, description, date, iscompleted, isimportant, userid);
  const [isCompleted, setIsCompleted] = useState(iscompleted);
  const dispatch = useDispatch();

  const textLengthOverCut = (text, length, lastText) => {
    if (length === "" || length === null) {
      length = 20; // 기본값
    }

    if (lastText === "" || lastText === null) {
      lastText = "...";
    }

    if (text.length > length) {
      text = text.substr(0, length) + lastText;
    }

    return text;
  };

  //custom confirm alert
  const deleteSubmit = () => {
    return new Promise((resolve) => {
      confirmAlert({
        title: "아이템 삭제 확인",
        message: "정말 삭제 하시겠습니까?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              setConfirm(true);
              resolve(true);
            },
          },
          {
            label: "No",
            onClick: () => {
              setConfirm(false);
              resolve(false);
            },
          },
        ],
      });
    });
  };

  //delete item
  const handleDeleteItem = async () => {
    // const confirm = window.alert("아이템을 삭제하시겠습니까?");

    const result = await deleteSubmit();

    if (!result) return;

    if (!_id) {
      toast.alert("잘못된 접근입니다.");
      return;
    }

    try {
      // unwrap() 비동기 함수 await 값 인식 안될때 사용 (포장벗기기); 비동기화도 포장지인가
      await dispatch(fetchDeleteItemData(_id)).unwrap();
      toast.success("아이템이 삭제되었습니다.");
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error("아이템이 삭제실패.");
      console.log("Delete Item error" + error);
    }
  };

  const handleOpenDetailModal = () => {
    dispatch(openModal({ modalType: "details", task }));
  };

  const handleOpenUpdateModal = () => {
    dispatch(openModal({ modalType: "update", task }));
  };

  const changeCompleted = async () => {
    const newIsCompleted = !isCompleted;

    setIsCompleted(newIsCompleted);

    const updateCompletedData = {
      id: _id,
      isCompleted: newIsCompleted,
    };

    try {
      await dispatch(fetchUpdateCompletedData(updateCompletedData)).unwrap();
      newIsCompleted 
        ? toast.success('업데이트완료') 
        : toast.success('미완료');
        await dispatch(fetchUpdateItemData(userid)).unwrap();
    } catch (error) {
      toast.error("미완성입니다");
      console.error("Update failed" + error);
    }
  };

  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md bg-gray-950 py-3 px-4 flex flex-col justify-between">
        <div className="upper">
          <h2 className="item-title text-xl font-normal mb-3 relative pb-2 flex justify-between">
            <span className="item-line w-full absolute bottom-0 left-0 h-[1px] bg-gray-500"></span>
            {title}
            <span
              className="text-sm py-1 px-3 border border-gray-500 rounded-md hover:bg-gray-700 cursor-pointer
            "
              onClick={handleOpenDetailModal}>
              자세히
            </span>
          </h2>
          <p>{textLengthOverCut(description, 60, "...")}</p>
        </div>
        <div className="lower">
          <p className="date text-sm mb-1">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-2">
              {iscompleted ? (
                <button
                  className="item-btn bg-green-400"
                  onClick={changeCompleted}>
                  completed
                </button>
              ) : (
                <button
                  className=" item-btn bg-cyan-500"
                  onClick={changeCompleted}>
                  Incompleted
                </button>
              )}

              {isimportant && (
                <button className="item-btn bg-red-400">Important</button>
              )}
            </div>
            <div className="item-footer-right flex gap-4 items-center">
              <button>
                <MdEditDocument
                  className="w-5 h-5 "
                  onClick={handleOpenUpdateModal}
                />
              </button>
              <button className="delete" onClick={handleDeleteItem}>
                <MdDelete className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
