import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Video = ({video}) => {

    const {snippet,id} = video;

    return ( 
        <div className='video' style ={ { backgroundImage: "url("+snippet.thumbnails.medium.url+")" } }>
            <div className='head-video'>
                <h6 className='py-2 pl-3 text-left'>{snippet.channelTitle.substring(0,30)}</h6>
            </div>
            <div className="body-video row justify-content-center align-items-center">
                <div className="col-12">
                    <h6 className='m-0'>{snippet.title.substring(0,15)}</h6>
                    <a rel="noopener noreferrer" target="_blank" href={'https://www.youtube.com/watch?v='+id.videoId}><FontAwesomeIcon icon="play-circle" /></a>
                </div>
            </div>
        </div>
     );
}
 
export default Video;