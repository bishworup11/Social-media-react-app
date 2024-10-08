import React from "react";
import { AiFillLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likePost } from "../../store/authSlice";
export default function ReactComment({ children }) {
  return <>{children}</>;
}

const FeedInnerTimelineTotalReacts = ({post}) => {
  //console.log(post);
  return (
    <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26 text-left">
        
      <div className="_feed_inner_timeline_total_reacts_image" >
        {/* <img
          src="assets/images/react_img1.png"
          alt="Image"
          className="_react_img1"
        />
        <img
          src="assets/images/react_img2.png"
          alt="Image"
          className="_react_img"
        />
        <img
          src="assets/images/react_img3.png"
          alt="Image"
          className="_react_img _rect_img_mbl_none"
        />
        <img
          src="assets/images/react_img4.png"
          alt="Image"
          className="_react_img _rect_img_mbl_none"
        />
        <img
          src="assets/images/react_img5.png"
          alt="Image"
          className="_react_img _rect_img_mbl_none"
        />
        <p className="_feed_inner_timeline_total_reacts_para">9+</p> */}
        <AiFillLike style={{ fontSize: '1.5rem', color: '#3b82f6' }}
 />
        <p style={{fontSize: "1.2rem" , marginLeft:".5rem"}}>{post.likes.length} {post.likes.length > 1 ? "likes" : "like"}</p>

      </div>
      <div className="_feed_inner_timeline_total_reacts_txt">
        <p className="_feed_inner_timeline_total_reacts_para1" >
          <span>{post.comments.length}</span> {post.comments.length > 1 ? 'Comments' : 'Comment'}
        </p>
        <p className="_feed_inner_timeline_total_reacts_para2">
          <span>122</span> Share
        </p>
      </div>
    </div>
  );
};

const FeedInnerTimelineReaction = ({handleShowComment,postId,userId}) => {
   const dispatch= useDispatch();
   console.log(postId,userId);
   
   function handleReact(){
          dispatch(likePost({postId,userId}));
   }

  return (
    <div className="_feed_inner_timeline_reaction">
      <button className="_feed_inner_timeline_reaction_comment _feed_reaction" onClick={()=>handleReact()}>
        <span className="_feed_inner_timeline_reaction_link ">
          <span
          >
          <AiFillLike style={{ marginRight: ".5rem",fontSize: '1.5rem', color: '#3b82f6' }} />
            React
          </span>
        </span>
      </button>
      <button className="_feed_inner_timeline_reaction_comment _feed_reaction"
        onClick={()=>{handleShowComment()}}
       >
        <span className="_feed_inner_timeline_reaction_link">
          <span >
            <svg
              className="_reaction_svg"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="#000"
                d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
              ></path>
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.938 9.313h7.125M10.5 14.063h3.563"
              ></path>
            </svg>
            Comment
          </span>
        </span>
      </button>
      <button className="_feed_inner_timeline_reaction_share _feed_reaction">
        <span className="_feed_inner_timeline_reaction_link">
          <span className="flex flex-row gap-1">
            <svg
              className="_reaction_svg"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="21"
              fill="none"
              viewBox="0 0 24 21"
            >
              <path
                stroke="#000"
                strokeLinejoin="round"
                d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
              ></path>
            </svg>
            Share
          </span>
        </span>
      </button>
    </div>
  );
};

export {FeedInnerTimelineReaction,FeedInnerTimelineTotalReacts};