import React, { useState, useContext, useEffect } from 'react'
// import BarChart from '../../components/BarChart';
// import LineChart from '../../components/LineChart';
import { toast } from 'sonner';
import { UserContext } from '../../contexts/UserContext';
import Card from '../../components/Card';
import { incrementProgress, decrementProgress } from '../../assets';
import styles from '../../styles';
import Button from '../../components/Button';
import DragDropImage from '../../components/DragDropImage';
import { Spinner } from '../../components/Loader/SpinLoader';
import { polling, vote } from '../../assets';
import Followers from '../../components/Followers/index.jsx';
import Followings from '../../components/Followings/index.jsx';
import ErrorMessage from '../../components/ErrorMessage/index.jsx';

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
	const [dashboardData, setDashboardData] = useState(null);
	const [dasLoading, setDasLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		const getDashoard = async () => {
			setErrorMessage(null);
			setDasLoading(true);
			try {
				const res = await fetch(`${apiUrl}/user/dashboard/${userInfo._id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					},
					credentials: 'include',
				})
				const data = await res.json();
				if (res.ok) {
					setDashboardData(data);
				} else {
					throw new Error(data?.message || "Server Error");
				}
			}
			catch (error) {
				console.log('Error while getting your dashboard', error);
				setErrorMessage(error.message);
			} finally {
				setDasLoading(false);
			}
		}
		getDashoard();
	}, [])

	const initialValues = {
		name: userInfo.name,
		email: userInfo.email,
		myStatus: userInfo.myStatus,
		avatar: userInfo.avatar.url,
	}
	const [user, setUser] = useState(initialValues)

	// Get user info when the component mounts.
	const getUser = async () => {
		setErrorMessage(null);
		setLoading(true);
		try {
			const res = await fetch(`${apiUrl}/user/me`, {
				credentials: 'include',
			});
			const data = await res.json();
			if (data.success && res.ok) {
				setUserInfo(data.user);
			} else {
				throw new Error(data?.message || "Server Error");
			}
		} catch (error) {
			console.log('Error: ', error);
			setErrorMessage(error.message);
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
				toast.error(data.message);
			}
		} catch (error) {
			console.log("Error while updating", error);
			toast.error("Error while updating");
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

	if (errorMessage) {
		return <div className='min-h-screen flex items-center justify-center'><ErrorMessage heading="Error fetching the dashoard" message={errorMessage} action={getDashoard} /></div>
	}

	return (
		<>
			<div className='flex justify-around items-center flex-col xl:flex-row'>
				<form className='rounded-3xl bg-white sm:p-6 p-3 flex flex-col items-center w-full xl:w-2/3' onSubmit={handleSubmit}>
					{loading && <div className='absolute bg-black/20 top-0 right-0 left-0 bottom-0 rounded-3xl w-full h-full z-10 flex justify-center items-center'><Spinner /></div>}
					{
						!enableChangingAvatar ? (
							<div className='rounded-xl border-[2px]  border-dashed border-stone-300 p-3 flex items-center gap-2'>
								<div className='relative flex justify-center items-center group rounded-full h-48 w-48 overflow-hidden '>
									<img src={avatarChanged ? URL.createObjectURL(user.avatar) : userInfo.avatar.url} alt='Profile pic' className=' group-hover:opacity-40 transition-opacity duration-300  object-top object-cover  h-48 w-48' />
									<button type='button' onClick={changeImage} className='absolute text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold'>change Image</button></div>
								{avatarChanged && <button type='button' className='bg-slate-400 h-6 px-3 py-1 flex items-center justify-center rounded-md' style={{ whiteSpace: 'nowrap' }} onClick={revertImage}>Revert Image</button>}
							</div>
						) : (
							<DragDropImage onImageSelect={handleImageSelection} clicked={clicked} setClicked={setClicked} />
						)}
					<div className='flex items-center justify-center flex-wrap gap-5 my-5 relative'>
						<h1 className={`font-bold ${styles.heading4} whitespace-nowrap`}>My Profile</h1>
						<div className='flex items-center flex-grow'>
							<textarea
								type="text"
								name='myStatus'
								value={user.myStatus}
								onChange={handleChange}
								className='outline-none text-[12px] lg:text-[16px] flex-grow resize-none py-1 rounded-md border focus:border-2 focus:border-slate-500 lg:px-3 sm:px-1 text-center'
								disabled={enableChangingStatus ? false : true}
							/>
							<div className='px-1 cursor-pointer hover:text-red-600 rounded-sm hover:bg-slate-400 h-6 w-6 right-[-20px] lg:right-0' onClick={() => setEnableChangingStatus(prev => !prev)}><ion-icon name="pencil-outline"></ion-icon></div>
						</div>
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
				{dasLoading ? <Spinner /> : <div className='xl:ml-5 items-center gap-6 md:gap-8 mt-8 xl:mt-0 flex flex-col lg:flex-row w-full xl:flex-col xl:w-auto'>
					<Card img={polling} num={dashboardData.totalPollsCreated.totalNumber} title='My Total Polls' color={dashboardData.totalPollsCreated.growth ? 'green' : 'red'} progress={dashboardData.totalPollsCreated.growthPercentage} indicator={dashboardData.totalPollsCreated.growth ? incrementProgress : decrementProgress} className='w-full' />
					<Card img={vote} num={dashboardData.lifetimeVotes.totalNumber} title='My Total Votes' color={dashboardData.lifetimeVotes.growth ? 'green' : 'red'} progress={dashboardData.lifetimeVotes.growthPercentage} indicator={dashboardData.lifetimeVotes.growth ? incrementProgress : decrementProgress} className='w-full' />
				</div>}
			</div>
			<div className='flex gap-12 w-full mt-12 xl:flex-row flex-col pb-5 sm:pb-0'>
				<Followers userId={userInfo._id} />
				<Followings userId={userInfo._id} />
			</div>
		</>
	)
}

export default MyProfile