import React from 'react'
import TimelinePost from './TimelinePost'
import ReactComment from './ReactComment'
import CommentSection from './CommentSection'
// eslint-disable-next-line jsx-a11y/img-redundant-alt
export default function Post({...props}) {
    console.log(props)
  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16 text-left">
      <TimelinePost
      post={props.post}
      />
      <ReactComment/>
      <CommentSection/>
    </div>
  )
}
