import { Card, CardActionArea, CardMedia, Typography, CardContent, CircularProgress } from '@mui/material';
import { categories } from '../../models/filters';
import { useRoutes } from 'react-router-dom';
import './dashboard-content.scss';
import { useEffect, useState } from 'react';
import store from '../../store';
import { getProfileData } from '../../services/profile.service';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase';
export function CustomerDashboard() {
    const user = store.getState().userDetails;
    const [info, setInfo] = useState();

    const [recommendedVideos, setRecommendedVideos] = useState();

    useEffect(() => {
        getData();
        getRecommendedVideos();
    }, [])

    const getRecommendedVideos = () => {
        const l_ref = ref(storage, 'recommendations');
        listAll(l_ref).then(vals => {
            Promise.all(vals.items.map(getDownloadURL)).then(links => {
                console.log(links)
                const urls = []
                links.forEach((link, i) => urls.push({ name: vals.items[i].name, url: link }));
                setRecommendedVideos(urls);
            })
        })
    }
    const getProfessionalContent = (id) => {
        const listRef = ref(storage, id);
        // Find all the prefixes and items.
        return listAll(listRef)

    }

    const getData = async () => {
        const { data } = await getProfileData(user);
        setInfo(data.customer_info);
        if (data.customer_info.professionals_enrolled.length) {
            Promise.all(data.customer_info.professionals_enrolled.map(getProfessionalContent)).then(vals => {
                const items = []
                console.log(vals)
                vals.forEach(val => {
                    items.push(...val.items)
                });
                Promise.all(items.map(getDownloadURL)).then(vals => {
                    const links = []
                    items.forEach((item, i) => links.push({ url: vals[i], name: item.name }))
                    setContent(links);
                })
            })
        }
        else {
            setContent(types);
        }
    }
    const types = [
        {
            name: 'Weight Training',
            links: [
                'https://www.youtube.com/embed/-5ztdzyQkSQ',
                'https://www.youtube.com/embed/xqVBoyKXbsA',
                'https://www.youtube.com/embed/WIHy-ZnSndA',
                'https://www.youtube.com/embed/GViX8riaHX4',
                'https://www.youtube.com/embed/U0bhE67HuDY',
                'https://www.youtube.com/embed/l0gDqsSUtWo'
            ]
        },
        {
            name: 'Yoga',
            links: [
                'https://www.youtube.com/embed/4pKly2JojMw',
                'https://www.youtube.com/embed/d8QqXLV3tWM',
                'https://www.youtube.com/embed/rsuO6K2RUtI',
                'https://www.youtube.com/embed/6uVSkvWO7As&list=RDCMUCFKE7WVJfvaHW5q283SxchA&start_radio=1',
                'https://www.youtube.com/embed/UEEsdXn8oG8'
            ]
        },
        {
            name: 'Zumba',
            links: [
                'https://www.youtube.com/embed/8DZktowZo_k',
                'https://www.youtube.com/embed/ZNpCqF9XRqQ',
                'https://www.youtube.com/embed/QRZcZgSgSHI',
                'https://www.youtube.com/embed/HhR9jUIPtnY',
                'https://www.youtube.com/embed/ZWk19OVon2k',
                'https://www.youtube.com/embed/yN3GgCUmmXw'
            ]
        },

        {
            name: 'Mental Health',
            links: [
                'https://www.youtube.com/embed/Ti5NxxAwP-Q',
                'https://www.youtube.com/embed/BHY0FxzoKZE',
                'https://www.youtube.com/embed/CoNchoFOMYA',
                'https://www.youtube.com/embed/t_74usAy7VM',
                'https://www.youtube.com/embed/QRp1BKahWrU',
                'https://www.youtube.com/embed/rkZl2gsLUp4'
            ]
        }
    ]
    const [content, setContent] = useState();
    return (
        <div className="dashboard-content-container">
            {info ? <> <div className="dashboard-header">
                {info.professionals_enrolled.length ? 'Your Videos' : 'Demo Videos'}
            </div>
               { !info.professionals_enrolled.length && <div className="categories-container">
                    {
                        content ? (content.length ? content.map(cat => {
                            return (
                                <div className="category-container" key={cat.name}>
                                    <div className="category-title">
                                        {cat.name}
                                    </div>
                                    <div className="video-tiles-container">
                                        {cat.links.map((link, i) => <VideoTile key={link} data={{ url: link, name: `${cat.name}${i}` }} />)}
                                    </div>
                                </div>
                            )
                        }) : <div>Your professional has not uploaded any videos.</div>) : <CircularProgress />
                    }
                </div>}

                <div className="video-tiles-container">
                    {content ? (content.length ? content.map(cat=><VideoTile key={cat.url} data={{ url: cat.url, name: `${cat.name}` }} />): <div>Your professional has not uploaded any videos.</div> ):<CircularProgress/>  }
                </div>

                <div className='dashboard-header' style={{ marginTop: '2em' }}>
                    Recommended Videos
                </div>

                <div className='video-tiles-container'>
                    {recommendedVideos ? recommendedVideos.map((link, i) => <VideoTile key={i} data={{ url: link.url, name: `${link.name}${i}` }} />) : <CircularProgress />}
                </div>

            </> : <CircularProgress />
            }

        </div>
    )
}



export function VideoTile({ data }) {
    return (
        <Card sx={{ minWidth: 300, margin: '20px 20px 20px 0', maxHeight: 200 }}>
            <CardActionArea>
                <CardMedia
                    height="140"
                    component="iframe"
                    image={data?.url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data?.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}