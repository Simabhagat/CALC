"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useAppDetail } from '@/hooks/useAppDetail';
import {usefetchImage } from "@/hooks/usefetchImage"
import reviewData from "../../../review.json"
import { AiOutlineDownload, AiOutlineStar } from 'react-icons/ai'; 
import { Button } from "@nextui-org/button";
import { useParams } from "next/navigation";
import { Image } from '@/app/type';

const AppDetails = () => {
  const { data: session, status } = useSession();
  const {mutate : fetchAppDetail , data : app,status : useAppDetailStatus, error  : useAppDetailError } = useAppDetail()
  const { mutate: fetchImages, data: Images = [], status : usefetchImageStatus, error : usefetchImageError = "" } = usefetchImage();
  const [loginStatus, setLoginStatus] = useState("");


  const { app_id } = useParams();
  if(!app_id)
    return (
      <div className="app-download-page">
        <h1>Error getting app</h1>
        <p>No app_id is passed for fetching app.</p>
      </div>
    );

    useEffect(() => {
      fetchAppDetail(app_id[0]); //path parameters return string array
    }, [app_id[0], fetchAppDetail]);

    useEffect(() => {
      
      fetchImages(app_id[0]); //path parameters return string array
    }, [app_id[0], fetchImages ]);
    
  // const reviews = reviewData.filter((review) => { //filters reviews from reviewData that matches the app_id
  //   return review.app_id === app_id;
  // })
    if (useAppDetailStatus === "pending") {
    return <p>Loading app details...</p>;
  }

  if (useAppDetailError) {
    return <p>Error: {useAppDetailError.message}</p>;
  }
  
  const handleDownload = async () => {
    if (status === 'authenticated') {
      window.open(app?.apk_url, '_blank');
      console.log('User is logged in:', session.user);
    } else {
      alert("You must log in or sign up to download")
      window.open("/", '_blank');
      console.log('User is not logged in');
    }
  };
  return(
    <div className="app-download-page">
    {/* App Header Section */}
    <header className="app-header glass-effect">
      <img
        src={app?.app_icon || "https://via.placeholder.com/150"} // Placeholder image for the app icon
        alt="App Icon"
        className="app-icon"
      />
      <div className="app-info">
        <h1 className="app-title">{app?.app_name}</h1>
        <p className="app-developer">{app?.app_publisher}</p>
        <div className="app-ratings">
          <AiOutlineStar /> {app?.app_rating} (2000 reviews)
        </div>
        <Button className="download-button" onClick={handleDownload} variant="flat">
          <AiOutlineDownload size={20} /> Download
        </Button>
      </div>
    </header>

    {/* App Screenshots Section */}
    <section className="app-screenshots glass-effect">
      <h2>Screenshots</h2>
      <div className="screenshots-wrapper no-scrollbar">
        {Images?.map((Image : Image) => 
          { 
            return (
              <img key={Image.image_url}
                src={Image.image_url || ""}
                alt="Screenshot 1"
                className="screenshot"
              />
            )
          }
        )}
      </div>
    </section>

    {/* App Description Section */}
    <section className="app-description">
      <h2>About this app</h2>
      <p>
        {app?.app_description}
      </p>
    </section>

    {/* Reviews Section */}
    {/* {(!reviews)? 
      <>No one left a review yet</> :
      <section className="app-reviews glass-effect">
        <h2>Reviews</h2>
      {reviews.map((review) =>
          <div className="review"  key={review.user_id}>
              <div className="flex flex-row gap-2 items-center">
              <h4>{review.user_name}</h4>
              <AiOutlineStar/>
              <h4>{review.review_rating}</h4>
              </div>
            <p>{review.review_desc}.</p>
          </div>
      )}
      </section>
    } */}
  </div>
  )
};

export default AppDetails;
