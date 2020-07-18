import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment'
import { deleteComment,editComment } from "../../../../actions/Commentactions";
import {connect} from 'react-redux'
import EditComment from './EditComment'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import { Link } from 'react-router-dom';

const styles = theme => ({
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
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
    transform: 'translate(-50%, -50%)'
  },
  card: {
    margin: '20px auto',
    width: '95%'
  },
  commentContent: {
    backgroundColor: '#CFD8DC',
    borderRadius: '10px',
    padding: 10,
    width:'70%'
  },
  commentText: {
    fontWeight: '400',
    fontSize:'1.2rem'
  },
  commenter: {
    fontSize:'1.35rem',
    fontWeight: '800'
  },
  timestamp: {
    fontWeight: '300'
  },
  link: {
    color: '#000',
    textDecoration: 'none'
  }
});
const options = ['Edit', 'Delete'];
const ITEM_HEIGHT = 48;

class CommentBody extends Component {
  state = {
    loading: false,
    name: '',
    modalOpen:false,
    anchorEl: null,
  };
  //long menu
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  //modal
  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };


  render() {
    const { classes,comment,user,postId,deleteComment,editComment } = this.props;
      const {  loading,modalOpen,anchorEl} = this.state;
    const open = Boolean(anchorEl);
    return loading ? (
      <div />
    ) : (
       
      <CardHeader 
        avatar={
           <Avatar aria-label="Initials" className={classes.avatar} src={comment.commenter.profileUrl}>
            </Avatar>
        }
        title={
          <div className={classes.commentContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flexDirection: 'column' }}>
                <div className={classes.commenter}>
                  <Link className={classes.link} to={`/userprofile/${comment.commenter._id}`}>
                    {comment.commenter.name}
                  </Link>
                </div>
                <div className={classes.commentText}>{comment.text}</div>
                <div className={classes.timestamp}>
                  {moment(comment.timestamp).fromNow()}
                </div>
              </div>
              <div>
                {comment.commenter._id !== user._id? null : (
                  <div>
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
                          maxHeight:ITEM_HEIGHT * 4.5,
                          width: 200
                        }
                      }}
                    >
                      {options.map(option => (
                        <MenuItem
                          key={option}
                          onClick={() =>
                            this.handleClose() ||
                            (option === 'Delete'
                              ? deleteComment( postId,comment._id)
                              : null) ||
                            (option === 'Edit' ? this.handleModalOpen() : null)
                          }
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          
          
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
              <EditComment
               postId={postId}
               CommentId={comment._id}
               editComment={editComment}
               handleModalClose={this.handleModalClose}
               text={comment.text} 
               > 
                             
              </EditComment>
            </Typography>
          </div>
        </Modal>
                      </div>
        }
        className={classes.cardHeader}
      />
      
    );
  }
}

CommentBody.propTypes = {
  classes: PropTypes.object.isRequired,
   text: PropTypes.string.isRequired
};

export default withStyles(styles)(connect(null,{editComment,deleteComment})(CommentBody));