import { Card, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';
import { categories } from '../../models/filters';
import './dashboard-content.scss';
export function DashboardContent() {
    const videos = [1, 2, 3, 4, 5, 6];
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
    return (
        <div className="dashboard-content-container">
            <div className="dashboard-header">
                Demo Videos
            </div>
            <div className="categories-container">
                {
                    types.map(cat => {
                        return (
                            <div className="category-container" key={cat.name}>
                                <div className="category-title">
                                    {cat.name}
                                </div>
                                <div className="video-tiles-container">
                                    {cat.links.map((link,i) => <VideoTile key={link} data={{ url: link, name: `${cat.name}${i}` }} />)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}



function VideoTile(props: any) {
    return (
        <Card sx={{ minWidth: 300, margin: '20px 20px 20px 0', maxHeight: 200 }}>
            <CardActionArea>
                <CardMedia
                    height="140"
                    component="iframe"
                    image={props.data?.url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.data?.name}
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