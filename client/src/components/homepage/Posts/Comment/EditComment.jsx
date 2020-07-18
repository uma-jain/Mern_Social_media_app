import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
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
});
export class EditComment extends Component {
  state = {
    postText: this.props.text
  };

  handleChange = (e) => {
    const postText = e.target.value;
    this.setState(() => ({ postText }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { postText } = this.state;
    const { postId,CommentId,editComment,handleModalClose,text } = this.props;
       if (!postText.trim()) return;
    
      editComment(postId,CommentId,postText);
      handleModalClose();
  };
  render() {
    const { postText } = this.state;
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="textarea"
          placeholder="What's on your mind?"
          multiline
          className={classes.textField}
          margin="normal"
          rowsMax="5"
          value={postText}
          onChange={this.handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Update
        </Button>
      </form>
    );
  }
}
export default  withStyles(styles)(EditComment);
