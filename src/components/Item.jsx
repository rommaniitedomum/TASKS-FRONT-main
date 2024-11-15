import React, { useState } from "react";
import { MdEditDocument, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchUpdateCompletedData,
} from "../redux/slices/apiSlice";

import { toast } from "react-toastify";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
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

  // custom confirm alert
  const deleteSubmit = () => {
    return new Promise((resolve) => {
      confirmAlert({
        title: "아이템 삭제 확인",
        message: "정말 삭제하시겠습니까?",
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

  // delete item
  const handleDeleteItem = async () => {
    const result = await deleteSubmit();

    if (!result) return;

    if (!_id) {
      toast.error("잘못된 사용자 접근 입니다.");
      return;
    }

    try {
      // unwrap() : 비동기 함수의 await 값이 인식 안될 때 사용(ex: dispatch)
      await dispatch(fetchDeleteItemData(_id)).unwrap();
      toast.success("아이템이 삭제되었습니다.");
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error("아이템 삭제에 실패했습니다.");
      console.error("Delete Item Error: " + error);
    }
  };

  const handleOpenDetailModal = () => {
    dispatch(openModal({ modalType: "details", task }));
  };

  const handleOpenUpdateModal = () => {
    dispatch(openModal({ modalType: "update", task }));
  };

  const changeCompleted = async () => {
    // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
    // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.

    const newIsCompleted = !isCompleted; // 데이터베이스에 있는 iscompleted의 반대값 저장
    setIsCompleted(newIsCompleted);

    // console.log(newIsCompleted);

    const updateCompletedData = {
      id: _id,
      isCompleted: newIsCompleted,
    };

    try {
      await dispatch(fetchUpdateCompletedData(updateCompletedData)).unwrap();
      newIsCompleted
        ? toast.success("완료 처리 되었습니다.")
        : toast.success("미완료 처리 되었습니다.");
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error("완료 처리에 실패했습니다.");
      console.error("Update Completed Error: " + error);
    }
  };

  return (
    <div className="item lg:w-1/3 md:w-1/2 w-full h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md bg-gray-950 py-3 px-4 flex flex-col justify-between">
        <div className="upper">
          <h2 className="item-title lg:text-xl text-[0.875rem] font-normal mb-3 relative pb-2 flex justify-between">
            <span className="item-line w-full absolute bottom-0 left-0 h-[1px] bg-gray-500"></span>
            {title}
            <span
              className="lg:text-sm text-[0.75rem] py-1 px-3 border border-gray-500 rounded-md hover:bg-gray-700 cursor-pointer"
              onClick={handleOpenDetailModal}
            >
              자세히
            </span>
          </h2>
          <p className="text-sm lg:text-[1rem]">
            {textLengthOverCut(description, 60, "...")}
          </p>
        </div>
        <div className="lower">
          <p className="date lg:text-sm text-[0.75rem] mb-1">{date}</p>
          <div className="item-footer flex justify-between flex-col md:flex-row gap-2">
            <div className="item-footer-left flex gap-2">
              {iscompleted ? (
                <button
                  className="item-btn bg-green-400"
                  onClick={changeCompleted}
                >
                  completed
                </button>
              ) : (
                <button
                  className="item-btn bg-cyan-500"
                  onClick={changeCompleted}
                >
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
                  className="w-5 h-5"
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
