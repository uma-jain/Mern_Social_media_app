import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { addComment } from "../../../../actions/Commentactions";
import {connect} from 'react-redux'

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  cardHeaderTitle: {
    display: 'flex'
  },
  commentField: {
    width: '70%',
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  avatar:{
      padding:'10px'
  }
});

class CommentField extends Component {
  state = {
     text: '',loading:false
  };

 

  handleChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ text: value }));
  };

  postComment = (e) => {
    e.preventDefault();
    const { addComment,postId } = this.props;
    const { text } = this.state;

    if (text.trim() === '') return;
    addComment(postId,text);
    this.setState({
      text: ''
    });
  };

  render() {
    const { classes,user,postId } = this.props;
    const {text,loading} = this.state;

    return loading ? (
      <div />
    ) : (
      <CardHeader style={{padding:'20px'}} 
        className={classes.cardHeader}
         
        title={
          <div className={classes.cardHeaderTitle}>
             <Avatar aria-label="Initials" className={classes.avatar} src={user.profileUrl}>
             </Avatar>
            <TextField
              multiline
              placeholder="Write a comment"
              className={classes.commentField}
              onChange={this.handleChange}
              value={text}
              required
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.postComment}
            >
              <SendIcon />
            </Button>
          </div>
        }
      />
    );
  }
}


export default withStyles(styles)(connect(null,{addComment})(CommentField));
