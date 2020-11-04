import React,{ useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getVideosAction } from '../../actions/dashboardActions'
import Video from './Video'

//redux
import { useDispatch,useSelector } from 'react-redux';

const Videos = () => {

    const dispatch = useDispatch();
    const videos = useSelector(state => state.dash.videos);
    const preferencias = useSelector(state => state.perfil.preferencias);
    const loadVideos = useSelector(state => state.dash.loadVideos);

    useEffect(() => {
        //trae los videos de las preferencias del usuario
        dispatch(getVideosAction(preferencias)); 
    }, [preferencias])

    return ( 
        <div className="videos">
            <div className='dasboard-header head-video row'>
                <h2 className='icon-video'><FontAwesomeIcon icon="play-circle" /></h2>
                <h3>Videos</h3>
            </div>
            <div class="container video-group">
                <div class="row text-center m-0">
                    {loadVideos
                    ?   <div className='w-100 row justify-content-center align-items-center'>                                
                            <Spinner className='mt-5' size="lg" animation="border" role="status">
                            </Spinner>
                        </div>  
                    : 
                        videos.length > 0 ? videos.map((video,index) => (
                                <div class="col-xs-12">
                                    <Video 
                                        key={index}
                                        video={video}
                                    />
                                </div>
                            )) : <h1>No se Encontraron videos relacionados</h1>
                    }   
                    
                </div>
            </div>
        </div>
     );
}
 
export default Videos;