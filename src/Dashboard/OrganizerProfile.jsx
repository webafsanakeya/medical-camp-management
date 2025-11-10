import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CgSpinner } from 'react-icons/cg';
import { HiOutlineMail, HiOutlinePhone, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { imageUpload } from '@/api/utils';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import toast from 'react-hot-toast';

const OrganizerProfile = () => {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Local state for profile data
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
    contact: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data safely
  useEffect(() => {
    if (!user?.email) return;

    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        if (isMounted) {
          setProfileData({
            displayName: user.displayName,
            photoURL: user.photoURL,
            contact: res.data.contact || '',
            role: res.data.role || 'Organizer'
          });
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('Failed to load profile data.');
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => { isMounted = false; }; // Cleanup
  }, [user?.email, user.displayName, user.photoURL, axiosSecure]);

  // Mutation to update profile
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedData) => {
      let finalPhotoURL = updatedData.photoURL;
      if (updatedData.newImageFile) {
        finalPhotoURL = await imageUpload(updatedData.newImageFile);
      }

      // Update Firebase
      await updateProfile(auth.currentUser, {
        displayName: updatedData.displayName,
        photoURL: finalPhotoURL
      });

      // Update backend
      await axiosSecure.patch('/update-profile', {
        email: user.email,
        name: updatedData.displayName,
        photoURL: finalPhotoURL,
        contact: updatedData.contact
      });

      return { ...updatedData, photoURL: finalPhotoURL };
    },
    onSuccess: (data) => {
      toast.success('Profile updated successfully!');
      setProfileData((prev) => ({ ...prev, ...data }));
      if (setUser) setUser((prev) => ({ ...prev, displayName: data.displayName, photoURL: data.photoURL }));
      setIsModalOpen(false);
      setNewImageFile(null);
      setImagePreview(null);
      queryClient.invalidateQueries(['userProfile', user?.email]);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update profile.')
  });

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateUser({
      displayName: formData.get('name'),
      photoURL: profileData.photoURL,
      contact: formData.get('contact'),
      newImageFile
    });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (loading) return <div className="flex h-full items-center justify-center"><CgSpinner className="h-12 w-12 animate-spin text-teal-500" /></div>;
  if (error) return <div className="text-center text-red-500 dark:text-red-400">{error}</div>;

  return (
    <>
      <title>My Profile | MediCamp Dashboard</title>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg relative pb-8">
            <div className="h-28 rounded-t-xl bg-gradient-to-r from-teal-500 to-blue-500"></div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
              <img src={imagePreview || profileData.photoURL || 'https://placehold.co/128x128/E2E8F0/4A5568?text=User'} alt="Profile" className="h-24 w-24 rounded-full object-cover ring-4 ring-white dark:ring-slate-800" />
            </div>
            <div className="mt-16 text-center px-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">{profileData.displayName}</h2>
              <p className="text-sm capitalize text-gray-500 dark:text-slate-400">{profileData.role} Profile</p>
              <button onClick={() => setIsModalOpen(true)} className="mt-6 w-full rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 border-b border-gray-200 dark:border-slate-700 pb-3 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-700">
                  <HiOutlineMail className="h-6 w-6 text-gray-500 dark:text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Email Address</p>
                  <p className="font-medium text-gray-800 dark:text-slate-200">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-700">
                  <HiOutlinePhone className="h-6 w-6 text-gray-500 dark:text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Contact Number</p>
                  <p className="font-medium text-gray-800 dark:text-slate-200">{profileData.contact || 'Not Provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div className="relative w-full max-w-md rounded-xl bg-white dark:bg-slate-800 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Update Your Profile</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"><HiX className="h-6 w-6" /></button>
              </div>
              <form onSubmit={handleUpdateSubmit}>
                <div className="space-y-5 p-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Full Name</label>
                    <input id="name" name="name" type="text" required defaultValue={profileData.displayName} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-teal-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Profile Photo</label>
                    <div className="mt-1 flex items-center gap-4">
                      <img src={imagePreview || profileData.photoURL} alt="Avatar preview" className="h-16 w-16 rounded-full object-cover"/>
                      <label htmlFor="photo-upload" className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        Change
                        <input id="photo-upload" name="photo" type="file" className="sr-only" onChange={handleImageSelect} accept="image/*"/>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Contact Number</label>
                    <input id="contact" name="contact" type="tel" required defaultValue={profileData.contact} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-teal-500" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">Cancel</button>
                  <button type="submit" disabled={isUpdating} className="flex min-w-[120px] items-center justify-center rounded-lg border bg-teal-700 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">
                    {isUpdating ? <CgSpinner className="h-5 w-5 animate-spin" /> : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrganizerProfile;
