
 
import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import UpdatePost from '../Posts/UpdatePost';

import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Comments from './Comment/Comment'
import * as moment from 'moment';
const options = ['Edit', 'Delete'];
const ITEM_HEIGHT = 48;

const styles = theme => ({
  card: {
    margin:'25px auto',
    width: '75%',
    backgroundColor:'#fafafa',
    padding:20,
    [theme.breakpoints.down(670)]:{
      width: '100%',
      margin:0,
      padding:0
    },
    [theme.breakpoints.down(550)]:{
      width: '100%',
      margin:'auto',
      padding:0
    },
    [theme.breakpoints.down(400)]:{
      width: '100%',
      margin:0,
     
    },
    
  },
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: red[800]
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down(600)]:{
     width:'100%',
     padding: 0,
     width:' 100%',
    },
  },
  spacing: {
    marginBottom: '10px'
  },link:{
    textDecoration:'none',
    color:'#607d8b' ,
    fontSize:'20px'

  },
  avatar:{
    height:60,
    width:60,
    padding:'5px 20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  image:{
    width:'400px',height:'300px',  
    boxShadow: '6px 8px 5px #000',
      },
        imageContainer:{
        padding:20,
        [theme.breakpoints.down(400)]:{
          padding:0
         },
      }
});

class Post extends Component {
  state = {
    anchorEl: null,
    modalOpen: false,
    isliked:false,
    expanded: false,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  //-----------------------------------------
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !this.state.expanded }));
  };

  //----------------
  handleModalOpen = () => {
    this.setState({ modalOpen: true });
    };
  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };
  componentDidMount(){
    
    if(this.props.post.likes){
       this.props.post.likes.map((like)=>{
          if(like.toString() === this.props.user._id ){
           this.setState({isliked:true})
          }
       })
      
     }
    }    
 

  render() {
    
    const {post,classes,user,deletePost, updatePost,updatepostlikes} = this.props;
    const { anchorEl, modalOpen,isliked ,expanded} = this.state;
    const open = Boolean(anchorEl);
    const relativeTime = moment(post.timestamp).fromNow();
    
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Initials" className={classes.avatar} src={post.author.profileUrl}>
            </Avatar>
          }
          action={
            user._id !== post.author._id? null :<div>
              <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200
                  }
                }}
              >
                {options.map(option => (
                  <MenuItem
                    key={option}
                    onClick={() =>
                      this.handleClose()
                      || (option === 'Delete' ? deletePost(post._id) : null)
                      || (option === 'Edit' ? this.handleModalOpen() : null)
                    }
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          }
          title={
            <Link className={classes.link} to={`/userprofile/${post.author._id}`}>
              {post.author.name}
            </Link>
          }
          subheader={relativeTime}
        />
        
         {
          post.postimageUrl && 
            <div className={classes.imageContainer}>
            <img 
            className={classes.image}
            src={post.postimageUrl}></img>
            </div>
        
                       
         }
        <CardContent>
          { post.text && <Typography>{post.text}</Typography>}
        </CardContent>
        <CardActions className={classes.actions} >
          <IconButton aria-label="Like" style={this.state.isliked ? { color: '#ad1457' } : null}
          onClick={()=>{
            updatepostlikes(post._id)
            this.setState({isliked:!isliked})
            }
                      
            }>
            <FavoriteIcon />
            </IconButton>{post.likesCount}
            <div style={{ marginLeft: '20px' }}>
            <IconButton onClick={this.handleExpandClick}>
              <CommentIcon style={{color:'#00796b'}}/>
            </IconButton>
            {post.comments.length}
          </div>

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            
          <Comments
           postId={post._id} 
           comments={post.comments} 
           user={user}

           />

        </Collapse>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={modalOpen}
          onClose={this.handleModalClose}
        >
          <div className={classes.paper}>
            <Typography
              variant="title"
              id="modal-title"
              className={classes.spacing}
            >
              Edit this post
            </Typography>
            <Typography variant="heading" id="modal-description">
              <UpdatePost
                 post={post}
                updatePost={updatePost}
                handleModalClose={this.handleModalClose}
              />
            </Typography>
          </div>
        </Modal>
      </Card>
    );
  }
}


export default withStyles(styles)(Post);