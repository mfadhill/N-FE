import React, { useState, useRef, useEffect } from "react";
import profile from "../../assets/profile.png";
import { MdOutlineModeEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProfile } from "../../store/slice/getProfileSlice";
import axios from "axios";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>(profile);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile.data);
  const data = profileState ? profileState.data : null;

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchProfile());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setEmail(data.email || "");
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      if (data.profile_image) {
        setProfilePic(data.profile_image);
      }
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          first_name: firstName,
          last_name: lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Profile update successful:", response.data);
      setSuccessMessage("Profile berhasil diperbarui!");
    } catch (error) {
      console.error("Profile update failed:", error);
      setErrorMessage("Update profile gagal. Silakan coba lagi.");
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const response = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image upload successful:", response.data);
      setProfilePic(response.data.profile_image || profile);
      setSuccessMessage("Profile image berhasil diperbarui!");
    } catch (error) {
      console.error("Image upload failed:", error);
      setErrorMessage("Update profile image gagal. Silakan coba lagi.");
    }
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
      uploadImage(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="relative flex flex-col items-center mb-4">
        <div className="relative">
          <img
            src={profilePic || profile}
            alt="Profile"
            className="w-32 h-32 rounded-full border border-gray-300"
          />
          <MdOutlineModeEdit
            onClick={handlePhotoClick}
            className="absolute top-20 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
            size={30}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            name="profile_image"
            id="profile_image"
            accept="image/*"
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">{`${firstName} ${lastName}`}</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="first-name" className="block text-gray-700">
            Nama Depan
          </label>
          <input
            id="first-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-gray-700">
            Nama Belakang
          </label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-700"
        >
          Simpan
        </button>
        {/* Pesan Keberhasilan atau Kesalahan */}
        {successMessage && (
          <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-md shadow-md mt-4">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md shadow-md mt-4">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Index;
