// import { useState } from "react";
// import { useAppDispatch } from "../../../store/store";
// import { Ilogin, loginAsync } from "../../../store/async/loginAsync";
// import { useNavigate } from "react-router-dom";

// const useLoginForm = () => {
//   const dispatch = useAppDispatch();
//   const [formData, setFormData] = useState<Ilogin>({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(loginAsync(formData));
//     navigate("/");
//   };

//   return {
//     formData,
//     handleChange,
//     handleSubmit,
//   };
// };

// export default useLoginForm;
