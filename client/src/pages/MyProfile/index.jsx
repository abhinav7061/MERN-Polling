import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'sonner';
import { UserContext } from '../../UserContext';
import Card from '../../components/Card';
import { incrementProgress, decrementProgress } from '../../assets';
import styles from '../../styles';
import Button from '../../components/Button';
import DragDropImage from '../../components/DragDropImage';
import { Spinner } from '../../components/Loader/SpinLoader';

const apiUrl = import.meta.env.VITE_API_URL;

const MyProfile = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);
	const [enableChangingAvatar, setEnableChangingAvatar] = useState(false);
	const [enableChangingStatus, setEnableChangingStatus] = useState(false);
	const [enableChangingName, setEnableChangingName] = useState(false);
	const [enableChangingEmail, setEnableChangingEmail] = useState(false);
	const [clicked, setClicked] = useState(false)
	const [avatarChanged, setAvatarChanged] = useState(false);
	const [loading, setLoading] = useState(false)
	const [isUserChanged, setIsUserChanged] = useState(false);
	const initialValues = {
		name: userInfo.name,
		email: userInfo.email,
		myStatus: userInfo.myStatus,
		avatar: userInfo.avatar.url,
	}
	const [user, setUser] = useState(initialValues)

	// Get user info when the component mounts.
	const getUser = async () => {
		try {
			const res = await fetch(`${apiUrl}/user/me`, {
				credentials: 'include',
			});
			const data = await res.json();
			if (data.success && res.status === 200) {
				setUserInfo(data.user);
			}
		} catch (error) {
			console.log('Error: ', error);
		} finally {
			setLoading(false)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((previous) => ({ ...previous, [name]: value }));
		// If the changed field is 'avatar', set avatarChanged to true
		if (name === 'avatar') {
			setAvatarChanged(true);
		}
	}

	const updateProfile = async ({ name, email, myStatus, avatar }) => {
		setLoading(true)
		try {
			const dataForm = new FormData();
			dataForm.set('name', name);
			dataForm.set('email', email);
			dataForm.set('myStatus', myStatus);
			dataForm.set('avatar', avatar);
			const res = await fetch(`${apiUrl}/user/profile/update`, {
				method: "PUT",
				body: dataForm,
				credentials: 'include',
			});
			const data = await res.json();
			if (res.ok) {
				toast.success(data.message);
				setAvatarChanged(false)
				setEnableChangingAvatar(false);
				setEnableChangingEmail(false);
				setEnableChangingName(false);
				getUser();
				setEnableChangingStatus(false);
			} else {
				toast.error("Error while updating", data.message);
			}
		} catch (error) {
			console.log("Error while updating", error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		updateProfile(user);
		setIsUserChanged(false)
	}

	const handleImageSelection = (selectedFile) => {
		setAvatarChanged(true)
		setEnableChangingAvatar(prev => !prev)
		setUser((previous) => ({ ...previous, avatar: selectedFile }));
	};

	const changeImage = () => {
		setClicked(true)
		setEnableChangingAvatar(prev => !prev)
		setUser((previous) => ({ ...previous, avatar: userInfo.avatar.url }));
	}

	const revertImage = () => {
		setAvatarChanged(false);
		setUser((previous) => ({ ...previous, avatar: userInfo.avatar.url }));
	}

	// Check for changes whenever the user state is updated
	useEffect(() => {
		const hasChanged = Object.keys(user).some((key) => user[key] !== initialValues[key]);
		setIsUserChanged(hasChanged);
	}, [user]);

	return (
		<div className='flex justify-around py-6 px-3 sm:p-12  items-center bg-gray-200 flex-col md:flex-row'>
			{loading && <div className='absolute w-full h-full bg-slate-200 opacity-50 z-10 flex justify-center items-center'><Spinner /></div>}
			<form className='rounded-3xl bg-white sm:p-6 p-3 flex flex-col items-center w-full sm:w-auto lg:w-2/3' onSubmit={handleSubmit}>
				{
					!enableChangingAvatar ? (
						<div className='rounded-xl border-[2px]  border-dashed border-stone-300 p-3 flex items-center gap-2'>
							<div className='relative flex justify-center items-center group rounded-full h-48 w-48 overflow-hidden '>
								<img src={avatarChanged ? URL.createObjectURL(user.avatar) : `${apiUrl}/profile-image/${userInfo.avatar.url}`} alt='Profile pic' className=' group-hover:opacity-40 transition-opacity duration-300' />
								<button type='button' onClick={changeImage} className='absolute text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold'>change Image</button></div>
							{avatarChanged && <button type='button' className='bg-slate-400 h-6 px-3 py-1 flex items-center justify-center rounded-md' style={{ whiteSpace: 'nowrap' }} onClick={revertImage}>Revert Image</button>}
						</div>
					) : (
						<DragDropImage onImageSelect={handleImageSelection} clicked={clicked} setClicked={setClicked} />
					)}
				<div className='flex items-center gap-10 my-5 relative'>
					<h1 className={`font-bold ${styles.heading4}`}>My Profile</h1>
					<textarea
						type="text"
						name='myStatus'
						value={user.myStatus}
						onChange={handleChange}
						className='outline-none text-[12px] lg:text-[16px] resize-none py-1 rounded-md border-2 border-transparent focus:border-slate-500 lg:px-3 sm:px-1'
						disabled={enableChangingStatus ? false : true}
					/>
					<div className='px-1 cursor-pointer absolute hover:text-red-600 rounded-sm hover:bg-slate-400 h-6 w-6 right-[-20px] lg:right-0' onClick={() => setEnableChangingStatus(prev => !prev)}><ion-icon name="pencil-outline"></ion-icon></div>
				</div>
				<div className=' rounded-xl p-3 bg-slate-50'>
					<div className='flex flex-wrap items-center my-3'>
						<label htmlFor="name" className='ml-2 font-semibold mr-5' style={{ whiteSpace: 'nowrap' }}>My Name:</label>
						<div className='flex items-center'>
							<input
								type="text"
								name='name'
								value={user.name}
								onChange={handleChange}
								className='outline-none my-[2px] px-3 py-1 rounded-md border-2 focus:border-slate-500 w-full overflow-scroll'
								disabled={enableChangingName ? false : true} />
							<div className='px-1 cursor-pointer ml-3 hover:text-red-600 rounded-sm hover:bg-slate-400' onClick={() => setEnableChangingName(prev => !prev)}><ion-icon name="pencil-outline"></ion-icon></div>
						</div>
					</div>
					<div className='flex flex-wrap items-center my-3'>
						<label htmlFor="email" className='ml-2 font-semibold mr-5' style={{ whiteSpace: 'nowrap' }}>My Email:</label>
						<div className='flex items-center'>
							<input
								type="email"
								name='email'
								value={user.email}
								onChange={handleChange}
								className='outline-none my-[2px] px-3 py-1 rounded-md border-2 focus:border-slate-500 w-full overflow-scroll'
								disabled={enableChangingEmail ? false : true} />
							<div className='px-1 cursor-pointer ml-3 hover:text-red-600 rounded-sm hover:bg-slate-400' onClick={() => setEnableChangingEmail(prev => !prev)}><ion-icon name="pencil-outline"></ion-icon></div>
						</div>
					</div>
				</div>
				{isUserChanged && <Button type="submit" title='Save changes' styles=' px-5 py-1 mb-3' />}
			</form>
			<div className='ml-5 sm:flex flex-col items-center gap-6 md:gap-16 mt-6 md:mt-0 hidden'>
				<Card img={`${apiUrl}/profile-image/${userInfo.avatar.url}`} num={`19`} title={`Votes`} color={`green`} progress={`9`} indicator={incrementProgress} />
				<Card img={`${apiUrl}/profile-image/${userInfo.avatar.url}`} num={`19`} title={`Votes`} color={`red`} progress={`17`} indicator={decrementProgress} />
			</div>
		</div>
	)
}

export default MyProfile