import React from "react";
import {removeTags} from "../common/helper";
import {handleImageError} from "../common/helper";
import fallbackImage from "../image/default.jpg"
// Material UI
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// material UI function
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

/**EpisodeCard
 * Route: used in ("/podcast/:feedid") route
 * shows a episode's audio and info
 * Component using EpisodeCard: PodcastDetailLayout.js
*/
function EpisodeCard({episode}){
    // material UI
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return (
        <Card className={`${episode.id}`} sx={{display:'flex', width:'100%', p:1, m:1}}>
            <Box sx={{display:{xs:'none', md:'flex'}, justifyContent: 'center', alignItems:'center', p:1}} >
                <CardMedia 
                    component="img"
                    sx={{width: 100, height:100}}
                    image={episode.image?episode.image:fallbackImage}
                    alt="episode artwork"
                    onError={handleImageError}
                />
            </Box>
            <Box sx={{display:'flex',flexDirection:'column', flexGrow:1}}>
                <CardContent sx={{display:'flex',flexDirection:'column', justifyContent: 'center', p:0, marginLeft:'10px'}}>
                    <Typography variant='body1' sx={{fontWeight:'bold', textAlign:'left', p:1}}>{episode.title}</Typography>
                    <Typography variant='body2' sx={{textAlign:'left', p:1}}>Published: {episode.datePublishedPretty}</Typography>
                    {/* if not audio, how  can I show no audio? */}
                    <audio
                        controls
                        src={episode.enclosureUrl}
                        type ={episode.enclosureType? episode.enclosureType:''}
                        >
                    </audio>
                </CardContent>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph variant='body2'>{removeTags(episode.description)}</Typography>
                    </CardContent>
                </Collapse>
            </Box>
        </Card>
    );
}

export default EpisodeCard;