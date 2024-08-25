import React, { useState, useRef, useEffect } from "react";
import profile from "../../assets/profile.png";
import { MdOutlineModeEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProfile } from "../../store/slice/getProfileSlice";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>(profile);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, firstName, lastName });
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
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="relative flex flex-col items-center mb-4">
        <div className="relative">
          <img
            src={profilePic}
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
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
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-900"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default Index;
