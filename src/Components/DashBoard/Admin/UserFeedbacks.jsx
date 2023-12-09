import InfiniteScroll from "react-infinite-scroll-component";
import useFeedBacks from "../../Hooks/useFeedBacks";
import Heading from "../../SharedComponents/Heading";
import Lottie from "lottie-react";
import loadingAnimation from "../../LoadingAnimaiton/Animation - Loading.json"
import { Helmet } from "react-helmet-async";


const UserFeedbacks = () => {

    const { feedbacks, isLoading } = useFeedBacks()


    return (
        <div className="p-5">
            <Helmet><title>User Feedbacks</title></Helmet>
            <Heading subheading={'--Customer Analysis--'} heading={'Feedbacks'} />
            <InfiniteScroll dataLength={feedbacks.length} next={feedbacks} height={600} className="rounded-xl p-8 border-2">
                <div className="grid grid-cols-1">
                    {
                        isLoading ?
                            <div className="max-w-xs mx-auto"><Lottie animationData={loadingAnimation}/></div>
                            :
                            feedbacks.map(feedback => <>
                                <div className="p-6 bg-[#F7BDBE] font-semibold rounded-xl">
                                    <div className="space-y-2 mb-5">
                                        <p>Name : {feedback.name}</p>
                                        <p>Email : {feedback.email}</p>
                                    </div>
                                    <div className="">
                                        <h1 className="text-lg text-center">FeedBack </h1>
                                        <div className="divider -mt-1"></div>
                                        <p className="font-normal border-dashed border-black border-2 p-7 rounded-xl">{feedback.message}</p>
                                    </div>
                                </div>
                            </>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default UserFeedbacks;