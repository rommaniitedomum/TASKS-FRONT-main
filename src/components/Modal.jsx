import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/slices/modalSlice";
import { toast } from "react-toastify";
import {
  fetchGetItemsData,
  fetchPostItemData,
  fetchUpdateItemData,
} from "./../redux/slices/apiSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { modalType, task } = useSelector((state) => state.modal);
  const user = useSelector((state) => state.auth.authData);
  // console.log(user.sub);
  // console.log(modalType, task);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    isCompleted: false,
    isImportant: false,
    userId: user?.sub,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // name 입력값을 받은 후 type이 checkbox인 경우 checked, 아닌 경우 value로 설정
    }));
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault(); // button 클릭 시 새로고침 방지

    if (!user.sub) {
      toast.error("잘못된 사용자 입니다.");
      return;
    }

    if (!formData.title) {
      toast.error("제목을 입력해 주세요.");
      return;
    }

    if (!formData.description) {
      toast.error("내용을 입력해 주세요.");
      return;
    }

    if (!formData.date) {
      toast.error("날짜를 입력해 주세요.");
      return;
    }

    // console.log(task);

    try {
      if (modalType === "create" && task === null) {
        await dispatch(fetchPostItemData(formData)).unwrap();
        toast.success("할일이 추가되었습니다.");
      } else if (modalType === "update" && task) {
        await dispatch(fetchUpdateItemData(formData)).unwrap();
        toast.success("할일이 수정되었습니다.");
      }

      handleCloseModal();

      await dispatch(fetchGetItemsData(user?.sub)).unwrap();
    } catch (error) {
      console.error("Error While Adding Task: ", error);
      toast.error("할일 추가 중 오류가 발생했습니다.");
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const showModalTitle = (modalType, str1, str2, str3) => {
    switch (modalType) {
      case "update":
        return str1;
      case "details":
        return str2;
      default:
        return str3;
    }
  };

  const modalTitle = showModalTitle(
    modalType,
    "할일 수정하기",
    "할일 상세보기",
    "할일 추가하기"
  );

  const btnTitle = showModalTitle(
    modalType,
    "할일 수정하기",
    "",
    "할일 추가하기"
  );

  // console.log(task.isCompleted);

  useEffect(() => {
    if ((modalType === "details" && task) || (modalType === "update" && task)) {
      setFormData({
        title: task.title,
        description: task.description,
        date: task.date,
        isCompleted: task.iscompleted,
        isImportant: task.isimportant,
        id: task._id,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        isCompleted: false,
        isImportant: false,
        userId: user?.sub,
      });
    }
  }, [modalType, task, user?.sub]);

  console.log(task);

  return (
    <div className="modal fixed bg-black bg-opacity-50 w-full h-full left-0 top-0 flex items-center justify-center z-50">
      <div className="form-wrapper bg-gray-700 rounded-md lg:w-1/2 sm:w-3/4 w-4/5 relative p-4">
        <h2 className="lg:text-2xl text-xl py-2 border-b border-gray-300 w-fit font-semibold">
          {modalTitle}
        </h2>
        <IoMdClose
          className="absolute right-5 top-5 cursor-pointer"
          onClick={handleCloseModal}
        />

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="input-control">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              placeholder="제목을 입력해 주세요..."
              onChange={handleChange}
              {...(modalType === "details" && { disabled: true })}
              className="sm:placeholder:text-[1rem] placeholder:text-[0.75rem] sm:text-[1rem] text-[0.75rem]"
            />
          </div>
          <div className="input-control">
            <label htmlFor="description">내용</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              placeholder="내용을 입력해 주세요..."
              onChange={handleChange}
              {...(modalType === "details" && { disabled: true })}
              className="sm:placeholder:text-[1rem] placeholder:text-[0.75rem] sm:text-[1rem] text-[0.75rem]"
            ></textarea>
          </div>
          <div className="input-control">
            <label htmlFor="date">입력 날짜</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              {...(modalType === "details" && { disabled: true })}
              className="sm:placeholder:text-[1rem] placeholder:text-[0.75rem] sm:text-[1rem] text-[0.75rem]"
            />
          </div>
          <div className="input-control toggler">
            <label htmlFor="isCompleted">완료 여부</label>
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleChange}
              {...(modalType === "details" && { disabled: true })}
            />
          </div>
          <div className="input-control toggler">
            <label htmlFor="isImportant">중요성 여부</label>
            <input
              type="checkbox"
              id="isImportant"
              name="isImportant"
              checked={formData.isImportant}
              onChange={handleChange}
              {...(modalType === "details" && { disabled: true })}
            />
          </div>
          <div className="submit-btn flex justify-end">
            <button
              className={`flex justify-end bg-black w-fit py-3 px-6 rounded-md hover:bg-slate-900 lg:text-[1rem] text-[0.875rem] ${
                modalType === "details" ? "hidden" : ""
              }`}
              type="submit"
            >
              {btnTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
