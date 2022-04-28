import { useEffect, useState } from "react"
import ArticleIcon from '@mui/icons-material/Article';
import { Fab } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import store from "../../store";
import { VideoTile } from './customer-dashboard';
import './dashboard-content.scss';
import { storage } from '../../firebase';
import LinearProgress from '@mui/material/LinearProgress';
import { CircularProgress } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";


export function ProfessionalDashboard() {
    const user = store.getState().userDetails;

    const [progress, setProgress] = useState(0);
    const [data, setData] = useState();
    const [file, setFile] = useState();
    
    useEffect(() => {
        getDashboardContent();
    }, [])

    const getDashboardContent = () => {
        const listRef = ref(storage, user._id);
        // Find all the prefixes and items.
        listAll(listRef)
            .then((res) => {
                Promise.all(res.items.map(getDownloadURL)).then(vals=>{
                    const links = []
                    res.items.forEach((item,i)=>links.push({url:vals[i],name:item.name}))
                    setData(links);
                })
                // res.items.forEach((itemRef) => {
                //     getDownloadURL(itemRef).then(res=>setData(prev=>{
                //         return [...prev, {url:res, name: itemRef.name}]
                //     }));
                // });
            }).catch((error) => {

            });
    }

    const submit = async () => {
        const storageRef = ref(storage, `${user._id}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('done');
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProgress(0);
                    console.log('File available at', downloadURL);
                    getDashboardContent();
                    setFile(null);
                });
            }
        );
    }

    return (
        <div className="dashboard-content-container">
            <div className="dashboard-header">
                Your Videos
            </div>
            <div className="videos-container">
                <div style={{fontSize: '30px'}}>
                    {data ?( data.length ? <div className="video-tiles-container">
                        {data.map((link,i) => <VideoTile key={i} data={{ url: link.url, name: link.name }} />)}
                    </div> : <div style={{display:'flex', alignItems:'center', justifyContent:'center',margin:'3em'}}><ArticleIcon style={{ margin: '15px' }} fontSize="large" /> No data Available</div>): <CircularProgress/>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin:'3em', gap: '20px', justifyContent: 'center' }}>
                    <label htmlFor="upload-photo">
                        <input
                            // style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            hidden
                            onChange={(e) => { console.log(e.target.files[0]); setFile(e.target.files[0]); }}
                        />

                        <Fab
                            color="primary"
                            size="medium"
                            component="span"
                            aria-label="add"
                            variant="extended"
                        >
                            <AddCircleIcon /> Browse Files
                        </Fab>
                    </label>
                    <Fab
                        color="secondary"
                        size="medium"
                        component="span"
                        aria-label="add"
                        variant="extended"
                        disabled={!file}
                        onClick={() => submit()}
                    >
                        Upload
                    </Fab>
                    {!!progress && <LinearProgress variant="determinate" style={{width:'250px'}} value={progress} />}
                </div>

            </div>
        </div>
    )
}