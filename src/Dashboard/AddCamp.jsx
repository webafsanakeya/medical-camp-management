import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { CgSpinner } from 'react-icons/cg';
import { HiOutlineDocumentAdd, HiOutlinePhotograph, HiX, HiPlus, HiTrash } from 'react-icons/hi';
import { motion } from 'framer-motion';

import useAxiosSecure from '@/hooks/useAxiosSecure';
import { storage } from '@/firebase/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '@/providers/AuthProvider';

const AddCamp = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [imageUploadError, setImageUploadError] = useState(null);
    const [scheduleItems, setScheduleItems] = useState([{ time: '', activity: '' }]);

    // Upload image to Firebase Storage
    const uploadImageToFirebase = (file) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `camp-images/${Date.now()}-${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                (snapshot) => {}, 
                (error) => reject(error), 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => resolve(url))
                        .catch((err) => reject(err));
                }
            );
        });
    };

    const { mutate, isPending } = useMutation({
        mutationFn: async (campData) => {
            const res = await axiosSecure.post("/camps", campData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Camp Added!",
                text: "The medical camp has been successfully added.",
                confirmButtonColor: '#0d9488',
            }).then(() => {
                reset();
                setUploadedImage(null);
                setFileName("");
                setScheduleItems([{ time: '', activity: '' }]);
                queryClient.invalidateQueries({ queryKey: ['organizer-camps'] });
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: error.response?.data?.message || "Failed to add camp. Please try again.",
            });
        },
    });

    const onSubmit = async (data) => {
        if (!user) {
            Swal.fire("Authentication Error", "Please login again.", "error");
            return;
        }

        if (!uploadedImage) {
            setImageUploadError("Camp image is required.");
            return;
        }

        setIsUploading(true);
        try {
            // Convert comma-separated fields into arrays
            const detailedServicesArray = data.detailedServices.split(',').map(item => item.trim()).filter(Boolean);
            const requiredDocumentsArray = data.requiredDocuments.split(',').map(item => item.trim()).filter(Boolean);
            const validScheduleItems = scheduleItems.filter(item => item.time && item.activity);

            const newCamp = {
                campName: data.campName,
                image: uploadedImage,
                fees: parseFloat(data.fees),
                organizerName: user.displayName,
                organizerEmail: user.email,
                dateTime: data.dateTime,
                location: data.location,
                doctorName: data.doctorName,
                participants: 0,
                detailedServices: detailedServicesArray,
                targetAudience: data.targetAudience,
                schedule: validScheduleItems,
                requiredDocuments: requiredDocumentsArray,
                additionalInfo: data.additionalInfo,
            };

            mutate(newCamp);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to process camp data.", "error");
        } finally {
            setIsUploading(false);
        }
    };

    const handleScheduleChange = (index, event) => {
        const values = [...scheduleItems];
        values[index][event.target.name] = event.target.value;
        setScheduleItems(values);
    };

    const handleAddScheduleItem = () => setScheduleItems([...scheduleItems, { time: '', activity: '' }]);
    const handleRemoveScheduleItem = (index) => {
        if (scheduleItems.length > 1) {
            const values = [...scheduleItems];
            values.splice(index, 1);
            setScheduleItems(values);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <title>Add Camp | MediCamp Dashboard</title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 border-b border-gray-200 dark:border-slate-700 p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-slate-700 dark:text-teal-400">
                            <HiOutlineDocumentAdd className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Add a New Camp</h2>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Create and configure a new camp.</p>
                        </div>
                    </div>

                    {/* FORM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        {/* LEFT COLUMN */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Camp Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Camp Name</label>
                                <input type="text" {...register("campName", { required: true })} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-slate-200" />
                                {errors.campName && <p className="text-xs text-red-500 mt-1">Camp name is required</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Description</label>
                                <textarea {...register("description", { required: true })} rows={3} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-slate-200"></textarea>
                                {errors.description && <p className="text-xs text-red-500 mt-1">Description is required</p>}
                            </div>

                            {/* Detailed Services */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Detailed Services</label>
                                <textarea {...register("detailedServices", { required: true })} placeholder="e.g., Blood Pressure Check, Dental Screening" rows={2} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-slate-200"></textarea>
                                {errors.detailedServices && <p className="text-xs text-red-500 mt-1">At least one service is required</p>}
                            </div>

                            {/* Schedule */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Schedule</label>
                                <div className="space-y-3 mt-1">
                                    {scheduleItems.map((item, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input type="text" name="time" placeholder="Time" value={item.time} onChange={e => handleScheduleChange(idx, e)} className="w-1/3 rounded-lg p-2 bg-gray-100 dark:bg-slate-700 focus:ring-2 focus:ring-teal-500" />
                                            <input type="text" name="activity" placeholder="Activity" value={item.activity} onChange={e => handleScheduleChange(idx, e)} className="w-2/3 rounded-lg p-2 bg-gray-100 dark:bg-slate-700 focus:ring-2 focus:ring-teal-500" />
                                            <button type="button" onClick={() => handleRemoveScheduleItem(idx)} className="text-red-500 hover:text-red-700" disabled={scheduleItems.length === 1}><HiTrash className="h-5 w-5"/></button>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={handleAddScheduleItem} className="text-teal-600 mt-2 flex items-center gap-1 hover:text-teal-800"><HiPlus className="h-4 w-4"/> Add Item</button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="md:col-span-1 space-y-6">
                            {/* Camp Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Camp Image</label>
                                <div className={`mt-1 flex justify-center border-2 border-dashed rounded-lg p-5 ${imageUploadError ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}>
                                    <div className="text-center space-y-2">
                                        {uploadedImage ? (
                                            <div className="relative group">
                                                <img src={uploadedImage} alt="Preview" className="mx-auto h-24 w-24 rounded-md object-cover" />
                                                <button type="button" onClick={() => { setUploadedImage(null); setFileName(""); setImageUploadError(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"><HiX className="h-4 w-4"/></button>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer text-teal-600 hover:text-teal-800">
                                                <HiOutlinePhotograph className="mx-auto h-12 w-12 text-gray-400"/>
                                                <span className="block mt-2 text-sm">Upload Image</span>
                                                <input type="file" className="sr-only" accept="image/*" onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;
                                                    setFileName(file.name);
                                                    setIsUploading(true);
                                                    setImageUploadError(null);
                                                    try {
                                                        const url = await uploadImageToFirebase(file);
                                                        setUploadedImage(url);
                                                    } catch (err) {
                                                        console.error(err);
                                                        setImageUploadError("Image upload failed");
                                                    } finally {
                                                        setIsUploading(false);
                                                    }
                                                }}/>
                                            </label>
                                        )}
                                        {imageUploadError && <p className="text-xs text-red-500">{imageUploadError}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Other camp details */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Fees ($)</label>
                                <input type="number" step="0.01" {...register("fees", { required: true, min: 0 })} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-slate-200" />
                                {errors.fees && <p className="text-xs text-red-500 mt-1">Fees required</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Date & Time</label>
                                <input type="datetime-local" {...register("dateTime", { required: true })} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-slate-200" />
                                {errors.dateTime && <p className="text-xs text-red-500 mt-1">Date and time required</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Location</label>
                                <input type="text" {...register("location", { required: true })} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-slate-200" />
                                {errors.location && <p className="text-xs text-red-500 mt-1">Location required</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Healthcare Professional</label>
                                <input type="text" {...register("doctorName", { required: true })} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-slate-200" />
                                {errors.doctorName && <p className="text-xs text-red-500 mt-1">Doctor's name required</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Target Audience</label>
                                <input type="text" {...register("targetAudience", { required: true })} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-slate-200" />
                                {errors.targetAudience && <p className="text-xs text-red-500 mt-1">Target audience required</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Required Documents</label>
                                <textarea {...register("requiredDocuments")} rows={2} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner dark:bg-slate-700 dark:text-slate-200" />
                                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Additional Info</label>
                                <textarea {...register("additionalInfo")} rows={2} className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner dark:bg-slate-700 dark:text-slate-200" />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-slate-700 px-6 py-4 flex justify-end">
                        <button type="submit" disabled={isPending || isUploading} className="flex items-center justify-center px-6 py-3 rounded-lg bg-teal-700 text-white shadow-sm hover:bg-teal-800 disabled:opacity-60 disabled:cursor-wait">
                            {isPending || isUploading ? <CgSpinner className="h-6 w-6 animate-spin" /> : "Add Camp"}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default AddCamp;
